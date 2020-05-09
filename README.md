## What is this?
This piece of software downloads the latest Data Drop published by the DOH and generates an infographic from the data. It's powered by node-html-to-image, which uses Puppeteer to generate an image from HTML/CSS. 
## Is it reliable?
Covidian downloads the latest data drop published by the DOH, accessible here: [https://drive.google.com/drive/folders/1PEJZur082d2oLp9ZWaBfp1sj5WIlVBRI](https://drive.google.com/drive/folders/1PEJZur082d2oLp9ZWaBfp1sj5WIlVBRI).
Along with the image, Covidian displays the file name that the image was generated from as well as its MD5 hash.

 If you don't feel that the results are accurate, or if you fear they may be forged or manipulated in some way, you can download the latest Case Information csv file from the data drop and generate your own MD5 hash to compare it with Covidian's MD5 hash. 

Regardless of this, though, you can still compare and fact check Covidian's statistics with the source itself manually.
## Why can't it show testing data?
The data drop that the DOH publishes currently doesn't have testing data associated with it.
## Can this be adapted to other countries?
Sure, but it's not a drop-in replacement. The software is specifically designed to take in the DOH Data Drop formatting, which isn't a standard. Other countries use different labels and different methods for storing their statistics and Covidian will need to be adapted as well.
## Ultimately
This is ultimately just a personal project developed by some dude. It may break, become unreliable or explode in your face inexplicably, although I hope to God none of those things happen. In trying times, we all need to help each other. This is just my way of doing so. 

Keep safe! Stay home. 

Love, Ben Jude ♥