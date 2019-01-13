module.exports = function initConvertToPDF(webDriver){
  return async function convertToPDF(url, parsedTitle) {
    return await webDriver.launch().then(async browser => {
      const page = await browser.newPage();
      await page.goto(url);
      await page.pdf({
        path: `./results/${parsedTitle}.pdf`,
      })
      await browser.close();
    });
  }
};
