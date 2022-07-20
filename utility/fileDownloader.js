//https://scrapingant.com/blog/playwright-download-file
const playwright = require('playwright');
const pageWithFiles = 'https://file-examples.com/index.php/sample-video-files/sample-avi-files-download/';


exports.FileHelper = class FileHelper {
    constructor(browser) {
        this.browser = browser;
        this.filePath = "";
    }
    // not tested
    async clickAnddownloadFile(fileName, filePath = this.filePath) {

        const context = await this.browser.newContext({ acceptDownloads: true });
        const page = await context.newPage();
        await page.goto(pageWithFiles);
        const [download] = await Promise.all([
            page.waitForEvent('download'), // wait for download to start
            page.click('.download-button')  
        ]);
        // save into the desired path
        await download.saveAs(filePath + fileName);
        // wait for the download and delete the temporary file
        await download.delete()
        await browser.close();
    }
}