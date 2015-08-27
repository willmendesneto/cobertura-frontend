(function(window) {
  'use strict';
  var TimeLineBlockText = {};
  var CONFIG = window.CONFIG;

  extend(TimeLineBlockText, window.AbstractTimeLineBlock);

  TimeLineBlockText.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block" data-uuid="' + data._id + '">' +
    '  <figure class="timeline-img">' +
    '    <i class="fa fa-align-justify"></i>' +
    '  </figure>' +
    '<time class="data-hora">' + formattedDate +
    '    <strong class="hora">' + formattedDateHour + '</strong>' +
    '</time>' +
      '<article class="timeline-content text">' +
        '<h2 class="estado">' + data.local + '</h2>' +
    '    <p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
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
