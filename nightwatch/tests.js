const path = require('path');

module.exports = {
  async before(browser, done, hexo){
    await hexo.init();
    await hexo.load();
    done();
  },
  'openHomePage': function (browser) {
    const page = browser.page.home();

    page
      .navigate()
      .waitForElementVisible('@root', 1000);
  },
  'scrollToAnchor': function (browser) {

    const page = browser.page.gettingStarted();

    page
      .navigate()
      .waitForElementVisible('@root', 1000)
      .assert
      .visible('@anchor');


    page
      .getLocationInView('@anchor', (result) => {
        page.assert.equal(typeof result, 'object');
        page.assert.equal(result.status, 0);
        page.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  },
  after(browser, done){
    browser.end();
    done();
  }
};
