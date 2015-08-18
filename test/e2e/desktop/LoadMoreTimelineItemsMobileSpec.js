// spec.js
describe('Cobertura', function() {

  require('../helpers/WaitReady');

  describe('Load page time: Laptops and Desktops', function(){
    it ('Should have show for new user all the content based in limit of 10 items', function(){
      browser.driver.manage().window().setSize(900, 800);
      browser.get('http://localhost:4000/cobertura-do-ato-16-de-agosto/');

      element(by.css('.timeline-block:nth-child(10)')).waitReady().then(function() {
        element.all(by.css('.timeline-block')).then(function(data) {

          expect(data.length > 0).toBe(true);
          expect(data.length <= 10).toBe(true);

          browser.executeScript('window.scrollTo(0, document.body.scrollHeight);').then(function () {
            element(by.css('.timeline-block:nth-child(12)')).waitReady().then(function(newData) {
              element.all(by.css('.timeline-block')).then(function(newData) {
                expect(newData.length > 10).toBe(true);
              });
            });
          });
        });
      });
    });
  });

});
