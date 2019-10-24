let isText = filterLayers(
  figma.currentPage.selection,
  i => i.type == "TEXT"
)

function generateDataKey(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function generatePasswordKey(length) {
  let result = ""
  const characters =
    "`~!@#$%^&*()-_=+[{]}\|;:',<.>/?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function generateCertificateKey(length) {
  let result = ""
  const characters =
    "/+=_-\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function chunk(str, n) {
  var value = []
  var i
  var len

  for(i = 0, len = str.length; i < len; i += n) {
     value.push(str.substr(i, n))
  }

  return value
}

function generateAddressKey(length) {
  let result = ""
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
  const charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}



function generateIPKey(length) {
  let result = ""
  const symbols = "0123456789"
  const symbolsLength = symbols.length
  for (var i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbolsLength))
  }
  return result
}

function generateInitialsKey(length) {
  let result = ""
  const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const symbolsLength = symbols.length
  for (var i = 0; i < length; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbolsLength))
  }
  return result
}

figma.showUI(__html__, {
  width: 320,
  height: 640
})

if (!isText.length)
  figma.closePlugin("Please select a text layer to use the plugin.")

figma.ui.postMessage({

})

figma.ui.onmessage = async msg => {
  console.log(msg)

  if (msg.type == "generate-data-key") {
    console.log(isText)

    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = generateDataKey(msg.value)
      }
    }
  } else if (msg.type == "generate-password-key") {
    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = generatePasswordKey(msg.value)
      }
    }
  } else if (msg.type == "generate-certificate-key") {
    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = generateCertificateKey(msg.value)
      }
    }
  } else if (msg.type == "generate-address-key") {
    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = chunk(generateAddressKey(msg.value), 2).join(':')
      }
    }
  } else if (msg.type == "generate-ip-key") {
    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = generateIPKey(msg.valueOne) + "." + generateIPKey(msg.valueTwo) + "." + generateIPKey(msg.valueThree) + "." + generateIPKey(msg.valueFour)
      }
    }
  } else if (msg.type == "generate-initials-key") {
    for (const n of isText) {
      await figma.loadFontAsync(n.fontName as FontName)
      if (n.type === "TEXT" && n.characters) {
        n.characters = generateInitialsKey(msg.value)
      }
    }
  } else {
    figma.closePlugin()
  }
}

function filterLayers(data, predicate) {
  return !!!data
    ? null
    : data.reduce((list, entry) => {
        let clone = null
        if (predicate(entry)) {
          clone = entry
          list.push(clone)
        } else if (entry.children != null) {
          let children = filterLayers(entry.children, predicate)
          if (children.length > 0) {
            list.push(...children)
          }
        }
        return list
      }, [])
}