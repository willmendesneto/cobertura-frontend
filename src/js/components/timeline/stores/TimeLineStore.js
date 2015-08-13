(function(window) {
  'use strict';

  var _data = [];
  var TimeLineStore = {
    setData: function(data) {
      _data = data;
    },

    getBufferInformations: function() {
      return $.getJSON('http://burburinho.herokuapp.com/api/burburinhos');
    },
    getOldestInformations: function() {
      return $.getJSON('http://burburinho.herokuapp.com/api/test');
    }
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineStore;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineStore.attach;
    module.exports.TimeLineStore = TimeLineStore;
  } else {
    window.TimeLineStore = TimeLineStore;
  }

})(window);
