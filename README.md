![alt text](https://github.com/madebyankur/figma-random-key-generator/raw/master/assets/cover.png "Figma Random Key Generator")

# Figma Random Key Generator
Quickly generate a random data string with alphabets, numerals and symbols depending on your needs for use as IDs and secrets in your mocks.

## Installation
1. Download the repository
2. Unzip the repository to folder `figma-random-key-generator`
3. Go to Plugins in Figma
4. Scroll to the **Development** section and click the `+` icon
5. Click to add `manifest.json`
6. Select the `manifest.json` file from the folder `figma-random-key-generator`

## Usage
1. Open any Figma file
2. Select a shape on your canvas.
3. Press `command + /` and search for **'Figma Random Key Generator'**
4. Run the plugin
5. `command + shift + p` to re-run the plugin instantly

## Installation and contributing
1. Clone the repository: `git clone https://github.com/madebyankur/figma-random-key-generator.git`
2. Go to the directory: `cd figma-random-key-generator`
3. Install figplug: `npm i -g figplug`
4. Build the plugin: `figplug build -w -o=build`
5. Add a new development plugin to Figma
6. Select the `figma-/build/manifest.json` file as the manifest

## Credits
- [figma-plugin-ds](https://github.com/thomas-lowry/figma-plugin-ds) for providing a design system for the plugins UI.