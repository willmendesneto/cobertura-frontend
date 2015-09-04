(function(window) {
  'use strict';

  var TimeLineBlockQuote = {};

  extend(TimeLineBlockQuote, window.AbstractTimeLineBlock);

  TimeLineBlockQuote.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);
    if( typeof data.content === 'undefined'){
      data.content = '';
    };

    return '<div class="timeline-block" data-uuid="' + data._id + '">' +
      '<figure class="timeline-img">' +
      '  <i class="fa fa-quote-left"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content quote">' +
        '<h2 class="estado">' + data.local + '</h2>' +
      '  <img class="perfil" src="' + getOptmizedImageUrl(data.url) + '" alt="foto perfil"/>' +
      '  <p>' + data.content + '</p>' +
      TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockQuote;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockQuote.attach;
    module.exports.TimeLineBlockQuote = TimeLineBlockQuote;
  } else {
    window.TimeLineBlockQuote = TimeLineBlockQuote;
  }

})(window);
