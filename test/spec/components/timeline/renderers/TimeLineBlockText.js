describe('TimeLineBlockText.js', function () {
  'use strict';

  var timelineBlock, buzz;

  beforeEach(function () {
    timelineBlock =  window.TimeLineBlockText;
    buzz = {
      type: 'text',
      content: 'This is a test',
      local: 'Local test',
      timestamp: '2015-08-25 00:11:22'
    };
  });

  it('#render', function(){
    var newElement = timelineBlock.render(buzz);

    expect(newElement.indexOf(buzz.content) !== -1).toBe(true);
    expect(newElement.indexOf('25') !== -1).toBe(true);
    expect(newElement.indexOf(buzz.local) !== -1).toBe(true);
    expect(newElement.indexOf('00:11') !== -1).toBe(true);
    expect(newElement.indexOf('2015') !== -1).toBe(false);
  });


});
