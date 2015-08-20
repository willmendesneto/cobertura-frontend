describe('TimeLineBlockGallery.js', function () {
  'use strict';

  var timelineGalleria, buzz;

  beforeEach(function () {
    timelineGalleria =  window.TimeLineBlockGallery;
    buzz = {
      type: 'text',
      content: [{
        description: 'This is a galeria test',
        url: 'https://media2.giphy.com/media/icPNQ6OuRtlew/200.gif'
      },
      {
        description: 'This is a galeria test',
        url: 'https://media2.giphy.com/media/icPNQ6OuRtlew/200.gif'
      }
      ],
      local: 'Gallery local test',
      timestamp: '2015-08-25 00:11:22'
    };
  });

  it('#render', function(){
    var newElement = timelineGalleria.render(buzz);

    buzz.content.forEach(function(element){
      expect(newElement.indexOf(element.url) !== -1).toBe(true);
      expect(newElement.indexOf(element.description) !== -1).toBe(true);
    });

    expect(newElement.indexOf('25') !== -1).toBe(true);
    expect(newElement.indexOf(buzz.local) !== -1).toBe(true);
    expect(newElement.indexOf('00:11') !== -1).toBe(true);
    expect(newElement.indexOf('2015') !== -1).toBe(false);
  });


});
