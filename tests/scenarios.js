const path = require('path');

module.exports = {
  'openHomePage': function ({browser, stepOptions}) {
    browser
      .url(browser.launchUrl)
      .waitForElementVisible(stepOptions.rootTag, 1000);
  },
  'scrollToAnchor': function ({browser, stepOptions}) {

    if (!stepOptions) {
      return;
    }

    const eHeader = `${stepOptions.element}#${stepOptions.id}`;

    browser
      .url(path.join(browser.launchUrl, stepOptions.path + '#' + stepOptions.id))
      .waitForElementVisible(stepOptions.rootTag, 1000)
      .assert.visible(eHeader);

    browser
      .getLocationInView(eHeader, (result) => {
        browser.assert.equal(typeof result, 'object');
        browser.assert.equal(result.status, 0);
        browser.assert.equal(result.value.y, 0, 'anchor header should be at the top of the page view');
      });
  }
};
