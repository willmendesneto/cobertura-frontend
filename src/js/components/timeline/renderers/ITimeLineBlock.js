(function(window) {
  'use strict';

  var ITimeLineBlock = {
    render: function(data) {
      throw new RenderException('Render method wasn\'t implemented!');
    }
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return ITimeLineBlock;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = ITimeLineBlock.attach;
    module.exports.ITimeLineBlock = ITimeLineBlock;
  } else {
    window.ITimeLineBlock = ITimeLineBlock;
  }

})(window);
