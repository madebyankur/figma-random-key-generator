let isText = filterData(
  figma.currentPage.selection,
  i => i.type == "TEXT"
);

function makeData(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

figma.showUI(__html__, {
  width: 320,
  height: 560
});

if (!isText.length)
  figma.closePlugin("Please select a text layer to use the plugin.");

figma.ui.postMessage({

});

figma.ui.onmessage = async msg => {
  console.log(msg);

  if (msg.type == "generate-key") {
    console.log(isText);

    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName);
      if (n.type === "TEXT" && n.characters) {
        n.characters = makeData(msg.value)
      }
    }
    figma.closePlugin("🔥 Yay! Your random key has been generated.");
  } else {
    figma.closePlugin();
  }
};

function filterData(data, predicate) {
  return !!!data
    ? null
    : data.reduce((list, entry) => {
        let clone = null;
        if (predicate(entry)) {
          clone = entry;
          list.push(clone);
        } else if (entry.children != null) {
          let children = filterData(entry.children, predicate);
          if (children.length > 0) {
            list.push(...children);
          }
        }
        return list;
      }, []);
}