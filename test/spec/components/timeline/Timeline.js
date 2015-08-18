describe('Timeline.js', function () {
  'use strict';

  var timeline;

  beforeEach(function () {
    timeline =  window.Timeline;
  });

  it('should init', function(){
    expect(timeline.init()).toBe(true);
  });


});
