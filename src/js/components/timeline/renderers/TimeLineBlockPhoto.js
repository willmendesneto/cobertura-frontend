(function(window) {
  'use strict';

  var TimeLineBlockPhoto = {};

  extend(TimeLineBlockPhoto, window.AbstractTimeLineBlock);

  TimeLineBlockPhoto.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);
    if( typeof data.content === 'undefined'){
      data.content = '';
    };

    return '<div class="timeline-block" data-uuid="' + data._id + '">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-camera-retro"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content photo">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<img src="' + getOptmizedImageUrl(data.url) + '" alt="manifestação"/>' +
        '<p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockPhoto;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockPhoto.attach;
    module.exports.TimeLineBlockPhoto = TimeLineBlockPhoto;
  } else {
    window.TimeLineBlockPhoto = TimeLineBlockPhoto;
  }

})(window);
