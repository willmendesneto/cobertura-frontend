describe('TimeLineBlockQuote.js', function () {
  'use strict';

  var timelineQuote, buzz;

  beforeEach(function () {
    timelineQuote =  window.TimeLineBlockQuote;
    buzz = {
      type: 'text',
      content: 'This is a test',
      url: 'this-is-a-fake-image.jpg',
      local: 'Local test',
      timestamp: '2015-08-25 00:11:22'
    };
  });

  it('#render', function(){
    var newElement = timelineQuote.render(buzz);

    expect(newElement.indexOf(buzz.content) !== -1).toBe(true);
    expect(newElement.indexOf('25') !== -1).toBe(true);
    expect(newElement.indexOf(buzz.local) !== -1).toBe(true);
    expect(newElement.indexOf(buzz.url) !== -1).toBe(true);
    expect(newElement.indexOf('00:11') !== -1).toBe(true);
    expect(newElement.indexOf('2015') !== -1).toBe(false);
  });


});
