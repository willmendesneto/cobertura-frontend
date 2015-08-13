(function(window) {
  'use strict';

  var _data = [];
  var _pageSize = 10;
  var _currentPage = 0;

  var TimeLineStore = {};

  function startFrom () {
    _currentPage += 1;
    var filteredData = [];
    if(_data.length > 0) {
      for(var i = 0; _pageSize > i; i++) {
        filteredData.push(_data[i]);
        _data.shift();
      }
    }
    return filteredData;
  }

  TimeLineStore = {

    loadServerData: function() {
      TimeLineStore.getOldestInformations().then(function(data) {
        _data = data;
      });
    },

    getLocalOldestInformations: function() {
      return startFrom();
    },

    numberOfPages: function() {
      return Math.ceil(_data.length / _pageSize);
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
