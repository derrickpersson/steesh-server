const puppeteer = require('puppeteer');
const parseTitle = require('./parseTitle.js');

// TODO: write adapter, define generic API to use.
const puppeteerAdapater = function(){
  return {};
}

function makePdfService(webDriver){
  return {
      convertToPDF: async function convertToPDF(url) {
        const parsedTitle = this.parseTitle(url);
        return await webDriver.launch().then(async browser => {
          const page = await browser.newPage();
          await page.goto(url);
          await page.pdf({
            path: `./results/${parsedTitle}.pdf`,
          });
          await browser.close();
        });
      },
      parseTitle,
  }
};

const pdfService = makePdfService(puppeteer);

module.exports = pdfService;
