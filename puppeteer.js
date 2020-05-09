const puppeteer = require("puppeteer");
const moment = require("moment");
const path = require("path");
const fs = require("fs");

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    const downloadPath = path.normalize(__dirname + "/data");

    let now = new moment().format("YYYYMMDD");
    let actualSelector = `div:contains(${now})[jsaction*=click]`

    console.log('Going to the website...');
    await page.goto('https://drive.google.com/drive/folders/1PEJZur082d2oLp9ZWaBfp1sj5WIlVBRI', { timeout: 60000, waitUntil: 'networkidle0' })
    await page.addScriptTag({url: "https://code.jquery.com/jquery-3.5.1.min.js"});
    await page.waitFor(1000);
    
    
    try {
        await Promise.all([
            page.evaluate((actualSelector) =>
            {
                return $(actualSelector).click();
            }, actualSelector),

            page.waitForNavigation({ waitUntil: 'networkidle0' })]);
    } catch {
        console.log("Today's data drop doesn't seem to be present yet...")
        actualSelector = `div:contains(${new moment().subtract(1, "days").format("YYYYMMDD")})[jsaction*=click]`
        await Promise.all([
            page.evaluate((actualSelector) =>
            {
                return $(actualSelector).click();
            }, actualSelector),

            page.waitForNavigation({ waitUntil: 'networkidle0' })]);
    }

    await page.waitFor(1000);

    await Promise.all([
        page.evaluate(() =>
        {
            return $('div:contains(Case Information.csv)[jsaction*=click]').click();
        }),
        page.waitForNavigation({ waitUntil: 'networkidle0' })]);

    fs.readdirSync(downloadPath).forEach(file => fs.unlinkSync(path.join(downloadPath, file)));

    await page._client.send("Page.setDownloadBehavior", {behavior: "allow", downloadPath: downloadPath});

    await page.click("div[data-tooltip=I-download]");

    await page.waitFor(10000)

    console.log("Done!")

    await browser.close();
})();