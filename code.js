var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let isText = filterLayers(figma.currentPage.selection, i => i.type == "TEXT");
function generateDataKey(length) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function generatePasswordKey(length) {
    let result = "";
    const symbols = "`~!@#$%^&*()-_=+[{]}\|;:',<.>/?";
    const symbolsLength = symbols.length;
    for (var i = 0; i < length; i++) {
        result += symbols.charAt(Math.floor(Math.random() * symbolsLength));
    }
    return result;
}
figma.showUI(__html__, {
    width: 320,
    height: 560
});
if (!isText.length)
    figma.closePlugin("Please select a text layer to use the plugin.");
figma.ui.postMessage({});
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    console.log(msg);
    if (msg.type == "generate-data-key") {
        console.log(isText);
        for (const n of isText) {
            yield figma.loadFontAsync(n.fontName);
            if (n.type === "TEXT" && n.characters) {
                n.characters = generateDataKey(msg.value);
            }
        }
    }
    else if (msg.type == "generate-password-key") {
        for (const n of isText) {
            yield figma.loadFontAsync(n.fontName);
            if (n.type === "TEXT" && n.characters) {
                n.characters = generatePasswordKey(msg.value / 2) + generateDataKey(msg.value / 2);
            }
        }
    }
    else {
        figma.closePlugin();
    }
});
function filterLayers(data, predicate) {
    return !!!data
        ? null
        : data.reduce((list, entry) => {
            let clone = null;
            if (predicate(entry)) {
                clone = entry;
                list.push(clone);
            }
            else if (entry.children != null) {
                let children = filterLayers(entry.children, predicate);
                if (children.length > 0) {
                    list.push(...children);
                }
            }
            return list;
        }, []);
}
