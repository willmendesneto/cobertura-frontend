describe('TimeLineBlock.js', function () {
  'use strict';
  var timelineBlock, mockTopValue, buzz, element;

  beforeEach(function () {
    timelineBlock =  window.TimelineBlocks;
    mockTopValue = 1000000;
    element = {
      offset: function(){
        return {
          top: mockTopValue
        }
      }
    };
    buzz = {
      type: 'text',
      content: 'This is a test',
      local: 'Local test',
      timestamp: '2015-08-25 00:11:22'
    };

  });

  it('#render', function(){
    spyOn(window.TimeLineBlockText, 'render');
    timelineBlock.render(buzz, false);
    expect(window.TimeLineBlockText.render).toHaveBeenCalled();
  });

  it('#elementIsVisibleOnViewport', function(){
    expect(timelineBlock.elementIsVisibleOnViewport(element)).toBe(false);
    mockTopValue = 0;
    expect(timelineBlock.elementIsVisibleOnViewport(element)).toBe(true);
  });

  it('#elementIsNotVisibleOnViewport', function(){
    expect(timelineBlock.elementIsNotVisibleOnViewport(element)).toBe(true);
    mockTopValue = 0;
    expect(timelineBlock.elementIsNotVisibleOnViewport(element)).toBe(false);
  });
});
