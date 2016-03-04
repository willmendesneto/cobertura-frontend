(function(window) {
  'use strict';

  function checkUrlBufferInfoWhenAppIsOffline(){
    var offline = window.offline || false;
    return !!offline ?
            '/assets/json/' + offline.data :
            CONFIG.URL_SOCKET_IO + '/api/buzzes';
  }

  var CONFIG_LOCAL = {
    FACEBOOK_ID: 1500652936893411,
    URL_COBERTURA: 'http://localhost:4000',
    URL_SOCIAL_SHARE_IMAGE: 'http://localhost:4000/assets/img/logo.jpg',
    URL_SOCKET_IO: '//localhost:5000'
  };

  var CONFIG_STAGING = {
    FACEBOOK_ID: 1500652936893411,
    URL_COBERTURA: 'https://test-cobertura.herokuapp.com',
    URL_SOCIAL_SHARE_IMAGE: 'https://test-cobertura.herokuapp.com/assets/img/logo.jpg',
    URL_SOCKET_IO: '//test-burburinho.herokuapp.com'
  };

  var CONFIG_PRODUCTION = {
    FACEBOOK_ID: 1500652936893411,
    URL_COBERTURA: 'http://cobertura.brasildefato.com.br',
    URL_SOCIAL_SHARE_IMAGE: 'http://cobertura.brasildefato.com.br/assets/img/logo.jpg',
    URL_SOCKET_IO: '//cpmidias-teste.brasildefato.com.br:5001'
  };

  function getConfiguration(){
    var origin = window.location.origin;
    if(origin.indexOf('localhost') !== -1) {
        return CONFIG_LOCAL;
    } else if(origin.indexOf('test') !== -1) {
        return CONFIG_STAGING;
    } else {
        return CONFIG_PRODUCTION;
    }
  };

  var CONFIG = getConfiguration();
  CONFIG.URL_BUFFER_INFO = checkUrlBufferInfoWhenAppIsOffline();

  CONFIG.getUrlBufferInfo = function() {
    var offline = window.offline || false;
    return !!offline ?
            '/assets/json/'+offline.data :
            CONFIG.URL_SOCKET_IO + '/api/buzzes';
  }

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return CONFIG;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG.attach;
    module.exports.CONFIG = CONFIG;
  } else {
    window.CONFIG = CONFIG;
  }

})(window);
