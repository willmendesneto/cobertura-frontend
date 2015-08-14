(function(window) {
  'use strict';

  var _data = [];
  var _pageSize = 10;
  var _currentPage = 0;
  var CONFIG = window.CONFIG;

  var TimeLineStore = {};

  function startFrom () {
    _currentPage += 1;
    var filteredData = [];
    if(_data.length > 0) {
      for(var i = 0; _pageSize > i; i++) {
        if (!!_data[i]){
          filteredData.push(_data[i]);
          _data.shift();
        }
      }
    }
    return filteredData;
  }

  TimeLineStore = {

    setData: function(data) {
      _data = data;
    },

    remove: function(item) {
      var index = _data.filter( function (element, pos) {
        if(element.timestamp === item.timestamp) {
          return pos;
        }
      });
      _data.splice(index, 1);
    },

    getLocalOldestInformations: function() {
      return startFrom();
    },

    numberOfPages: function() {
      return Math.ceil(_data.length / _pageSize);
    },

    getBufferInformations: function() {
      return $.getJSON(CONFIG.URL_BUFFER_INFO);
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
