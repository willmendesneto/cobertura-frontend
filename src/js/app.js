$(document).ready(function() {

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    $(this).fadeOut().addClass('is-hidden');
    return false;
  });


  var addedBuzzInTimeline = function (event, buzz) {

    if (buzz.type === 'photo') {
      $('.choose-photos').html(
        $('.choose-photos').html() +
        '<a class="photo" href="' + getOptmizedImageUrl(buzz.url) + '">' +
          '<img class="highlight-photo" src="' + getOptmizedImageUrl(buzz.url) + '" alt="' + buzz.content + '" width="90" height="auto">' +
        '</a>');
    }
  };

  Timeline.onAddBuzz(addedBuzzInTimeline)
          .init();

});
