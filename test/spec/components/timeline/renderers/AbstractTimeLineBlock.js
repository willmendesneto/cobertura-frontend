describe('AbstractTimeLineBlock.js', function () {
  'use strict';

  var buzz;

  beforeEach(function () {
    buzz = {
      type: 'text',
      content: 'This is a test',
      local: 'Local test',
      timestamp: '2015-08-25 00:11:22'
    };
  });

  it('Should return a Exception when call render() method', function(){
    try {
      window.AbstractTimeLineBlock.render(buzz);
    } catch(error) {
      expect(error instanceof RenderException).toBe(true);
    }
  });

});
