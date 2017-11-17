const path = require('path');

module.exports = {
  async before(browser, done, hexo){
    await hexo.init();
    await hexo.load();
    done();
  },
  'openHomePage': function (browser) {
    const home = browser.page.home();

    home
      .navigate()
      .waitForElementVisible('@root', 1000);
  },
  'scrollToAnchor': function (browser) {

    const gettingStarted = browser.page.gettingStarted();

    gettingStarted
      .navigate()
      .waitForElementVisible('@root', 1000)
      .assert
      .visible('@anchor');


    gettingStarted
      .getLocationInView('@anchor', (result) => {
        gettingStarted.assert.equal(typeof result, 'object');
        gettingStarted.assert.equal(result.status, 0);
        gettingStarted.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  },
  after(browser, done){
    browser.end();
    done();
  }
};
