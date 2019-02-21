const puppeteer = require('puppeteer');
const parseTitle = require('./parseTitle.js');

function makePdfService(webCrawler){
  return {
      convertToPDF: async function convertToPDF(url) {
        const parsedTitle = this.parseTitle(url);
        return await webCrawler.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }).then(async browser => {
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

module.exports = {
  pdfService,
  makePdfService,
};
