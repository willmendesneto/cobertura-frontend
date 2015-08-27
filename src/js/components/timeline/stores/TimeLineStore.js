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
      var item;
      var i = 0;
      while( _pageSize > i) {
        item = _data[i];
        if (!!item){
          filteredData.push(item);
        }
        ++i;
      }
    }
    return filteredData;
  }

  TimeLineStore = {

    setData: function(data) {
      _data = data;
      return true;
    },

    remove: function(item) {
      var index = _data.filter( function (element, pos) {
        if(element.timestamp === item.timestamp) {
          return pos;
        }
      });
      _data.splice(index, 1);
    },

    update: function(item) {
      var oldData = _data;

      _data = oldData.map( function (element) {
        if(element.timestamp === item.timestamp) {
          element = item;
        }
        return element;
      });
    },

    getLocalOldestInformations: function() {
      return startFrom();
    },

    numberOfPages: function() {
      return Math.ceil(_data.length / _pageSize);
    },

    getBufferInformations: function() {
      return $.when($.getJSON(CONFIG.URL_BUFFER_INFO));
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
