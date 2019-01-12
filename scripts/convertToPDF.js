const puppeteer = require('puppeteer');

const convertToPDF =  async (url, parsedTitle) => {
  return await puppeteer.launch().then(async browser => {
    const page = await browser.newPage();
    await page.goto(url);
    await page.pdf({
      path: `./results/${parsedTitle}.pdf`,
    })
    await browser.close();
  });
}

module.exports = {
  convertToPDF: convertToPDF
}