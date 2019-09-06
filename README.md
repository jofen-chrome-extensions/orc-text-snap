Optical Character Recognition - Copy text from any image, video or PDF
===============

A handy tool to extract text from images, videos or PDF with just one click and crop instead of retyping the text character by character. A tipical use case is to copy any text from youtube videos, image formatted tutorials.

This tool copies text from images using the lightweight OCR engine [Tesseract.js](https://github.com/naptha/tesseract.js).

## Building

In the project root directory execute:
```bash
$ npm install
$ npm run webpack
```
Webpack will bundle the Javascript files into `./dist/main.js` which will be used as starting point for the extension.

### Loading into the browser

1. Enter `chrome://extensions` in the Address bar.
2. Click `Load unpacked` and select the project root folder.

How to use it:
1. Click the icon, then select the area/image containing the text. 
2. Wait until the tool to extract the text for you.
3. Extracted result will show in a text box. You can then click the copy button to load it into your Clipboard and Ctrl + V to paste it anywhere.
4. There is an option to translate the extracted text into your selected language.
5. You can define the ORC language and targeted translation languages on the options page.

Install extension:
-----------
* [Chrome's web store](https://chrome.google.com/webstore/detail/orc-text-snap/cjcbfnbbhjipgbbncobdgdpphnlalife)
