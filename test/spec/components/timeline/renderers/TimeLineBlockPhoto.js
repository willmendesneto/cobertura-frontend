describe('TimeLineBlockPhoto.js', function () {
  'use strict';

  var timelinePhoto, buzz;

  beforeEach(function () {
    timelinePhoto =  window.TimeLineBlockPhoto;
    buzz = {
      type: 'text',
      content: 'This is a galleria test',
      url: 'https://media2.giphy.com/media/icPNQ6OuRtlew/200.gif',
      local: 'Video local test',
      timestamp: '2015-08-25 00:11:22'
    };
  });

  it('#render', function(){
    var newElement = timelinePhoto.render(buzz);

    expect(newElement.indexOf(buzz.content) !== -1).toBe(true);
    expect(newElement.indexOf('25') !== -1).toBe(true);
    expect(newElement.indexOf(buzz.local) !== -1).toBe(true);
    expect(newElement.indexOf(buzz.url) !== -1).toBe(true);
    expect(newElement.indexOf('00:11') !== -1).toBe(true);
    expect(newElement.indexOf('2015') !== -1).toBe(false);
  });


});
