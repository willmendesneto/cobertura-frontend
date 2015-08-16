(function(window) {
  'use strict';
  var TimeLineBlockText = {};
  var CONFIG = window.CONFIG;

  extend(TimeLineBlockText, window.ITimeLineBlock);

  TimeLineBlockText.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
    '  <figure class="timeline-img">' +
    '    <i class="fa fa-align-justify"></i>' +
    '  </figure>' +
    '<time class="data-hora">' + formattedDate +
    '    <strong class="hora">' + formattedDateHour + '</strong>' +
    '</time>' +
      '<article class="timeline-content text">' +
        '<h2 class="estado">' + data.local + '</h2>' +
    '    <p>' + data.content + '</p>' +
        '<div class="logos">'+
          '<div class="social-small">'+
            '<a target="_blank" href="//www.twitter.com/share?url=' + CONFIG.URL_COBERTURA + '&via=Brasil_de_Fato&related=Brasil_de_Fato&text=' + document.title + '" >' +
              '<i class="fa fa-twitter"></i>'+
            '</a>' +
          '</div>'+
          '<div class="social-small">' +
            '<a href="//www.facebook.com/dialog/feed?app_id=' + CONFIG.FACEBOOK_ID + '&display=popup&href=' + CONFIG.URL_COBERTURA + '&redirect_uri=' + CONFIG.URL_COBERTURA + '&picture=' + CONFIG.URL_SOCIAL_SHARE_IMAGE + '&name=' + document.title + '&description=' + data.content + '&link=' + CONFIG.URL_COBERTURA + '" target="_blank">' +
              '<i class="fa fa-facebook"></i>' +
            '</a>' +
          '</div>' +
        '</div>' +
    '  </article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockText;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockText.attach;
    module.exports.TimeLineBlockText = TimeLineBlockText;
  } else {
    window.TimeLineBlockText = TimeLineBlockText;
  }

})(window);
