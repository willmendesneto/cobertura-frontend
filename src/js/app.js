$(document).ready(function() {

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    $(this).fadeOut().addClass('is-hidden');
    return false;
  });

  if (window.location.origin.indexOf('cobertura') === -1) {
    $(window).load(function(){
      var measureCRP = function() {
        var t = window.performance.timing,
          interactive = t.domInteractive - t.domLoading,
          dcl = t.domContentLoadedEventStart - t.domLoading,
          complete = t.domComplete - t.domLoading;
        var stats = 'interactive: ' + interactive + 'ms, ' +
            'dcl: ' + dcl + 'ms, complete: ' + complete + 'ms';
        console.log(stats);
      }

      measureCRP();
    });
  }

  var addedBuzzInTimeline = function (event, buzz) {

    if (buzz.type === 'photo') {

      var imageHTML = '<img class="highlight-photo" src="' + getOptmizedImageUrl(buzz.url) + '" alt="' + buzz.content + '" width="90" height="auto">';
      if (!$('.photo[data-uuid="' + buzz._id + '"]')[0]) {
        $('.choose-photos').html(
          $('.choose-photos').html() +
          '<a class="photo" data-uuid="' + buzz._id + '" href="' + getOptmizedImageUrl(buzz.url) + '">' +
            imageHTML +
          '</a>');
      } else {
        $('.photo[data-uuid="' + buzz._id + '"]').html(imageHTML);
        $('.photo[data-uuid="' + buzz._id + '"]').attr('href', getOptmizedImageUrl(buzz.url));
      }
    }
  };

  var offline  = window.offline || false;
  Timeline.onAddBuzz(addedBuzzInTimeline)
          .init(offline);

});
