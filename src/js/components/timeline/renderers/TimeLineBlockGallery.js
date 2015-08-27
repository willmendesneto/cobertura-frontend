(function(window) {
  'use strict';

  var TimeLineBlockGallery = {};

  extend(TimeLineBlockGallery, window.AbstractTimeLineBlock);

  TimeLineBlockGallery.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    var images = data.content.map(function(item){
      return '<img src="' + getOptmizedImageUrl(item.url) + '" alt="' + item.description + '"/>';
    });

    return '<div class="timeline-block" data-uuid="' + data._id + '">' +
      '<figure class="timeline-img">' +
          '<i class="fa fa-picture-o"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content gallery">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<section class="photos">' +
          images.join('') +
        '</section>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockGallery;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockGallery.attach;
    module.exports.TimeLineBlockGallery = TimeLineBlockGallery;
  } else {
    window.TimeLineBlockGallery = TimeLineBlockGallery;
  }

})(window);
