(function(window) {
  'use strict';

  var AbstractTimeLineBlock = {
    render: function(data) {
      throw new RenderException('Render method wasn\'t implemented!');
    },
    getSocialNetworkHTML: function(data) {
      var imageToShare;

      if (data.type === 'photo' || data.type === 'quote') {
        imageToShare = data.url;
      } else if(data.type === 'gallery') {
        imageToShare = data.content[0].url;
      } else {
        imageToShare = CONFIG.URL_SOCIAL_SHARE_IMAGE;
      }

      return '<div class="logos">'+
        '<div class="social-small">'+
          '<a target="_blank" href="//www.twitter.com/share?url=' + CONFIG.URL_COBERTURA + '&via=Brasil_de_Fato&related=Brasil_de_Fato&text=' + document.title + '" >' +
            '<i class="fa fa-twitter"></i>'+
          '</a>' +
        '</div>'+
        '<div class="social-small">' +
          '<a href="//www.facebook.com/dialog/feed?app_id=' + CONFIG.FACEBOOK_ID + '&display=popup&href=' + CONFIG.URL_COBERTURA + '&redirect_uri=' + CONFIG.URL_COBERTURA + '&picture=' + imageToShare + '&name=' + document.title + '&description=' + data.content + '&link=' + CONFIG.URL_COBERTURA + '" target="_blank">' +
            '<i class="fa fa-facebook"></i>' +
          '</a>' +
        '</div>' +
      '</div>';
    }
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return AbstractTimeLineBlock;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = AbstractTimeLineBlock.attach;
    module.exports.AbstractTimeLineBlock = AbstractTimeLineBlock;
  } else {
    window.AbstractTimeLineBlock = AbstractTimeLineBlock;
  }

})(window);
