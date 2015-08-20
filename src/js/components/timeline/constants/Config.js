(function(window) {
  'use strict';

  function getSocketIOUrl(){
    return window.location.origin.indexOf('localhost') === -1 ?
            '//burburinho.herokuapp.com' :
            '//localhost:5000';
  }

  function checkUrlBufferInfoWhenAppIsOffline(){
    var offline = window.offline || false;
    return !!offline ?
            '/assets/json/'+offline.data :
            getSocketIOUrl()+'/api/buzzes';
  }

  var CONFIG = {
    FACEBOOK_ID: 1500652936893411,
    URL_COBERTURA: 'http://cobertura.brasildefato.com.br',
    URL_SOCIAL_SHARE_IMAGE: 'http://cobertura.brasildefato.com.br/assets/img/logo.jpg',
    URL_BUFFER_INFO: checkUrlBufferInfoWhenAppIsOffline(),
    URL_SOCKET_IO: getSocketIOUrl()
  };

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
