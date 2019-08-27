Optical Character Recognition - Copy text from any image, video or PDF
===========

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
2. Wait until the tool to extract the text for you and load it into your Clipboard
3. Ctrl + V to paste it anywhere
4. You can define the targeted ORC language on the options page.

If you need text translation, check out this [Chrome Extension](https://chrome.google.com/webstore/detail/condlopdddofpgcdjfnoepbdkcgckmgb)

Install extension:
-----------
* [Chrome's web store](https://chrome.google.com/webstore/detail/condlopdddofpgcdjfnoepbdkcgckmgb)
