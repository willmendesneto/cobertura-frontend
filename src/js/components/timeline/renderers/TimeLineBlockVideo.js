(function(window) {
  'use strict';

  var TimeLineBlockVideo = {};

  extend(TimeLineBlockVideo, window.AbstractTimeLineBlock);

  TimeLineBlockVideo.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-video-camera fa-4"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content video">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<div class="video-wrapper">' +
          '<iframe src="' + data.url + '"></iframe>' +
        '</div>' +
        '<p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockVideo;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockVideo.attach;
    module.exports.TimeLineBlockVideo = TimeLineBlockVideo;
  } else {
    window.TimeLineBlockVideo = TimeLineBlockVideo;
  }

})(window);
