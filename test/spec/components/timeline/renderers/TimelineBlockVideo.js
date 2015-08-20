describe('TimeLineBlockVideo.js', function () {
  'use strict';

  var timelineQuote, buzz;

  beforeEach(function () {
    timelineQuote =  window.TimeLineBlockVideo;
    buzz = {
      type: 'text',
      content: 'This is a video test',
      url: 'https://www.youtube.com/watch?v=mIQToVqDMb8',
      local: 'Video local test',
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
