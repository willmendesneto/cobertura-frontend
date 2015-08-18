$(document).ready(function() {

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    $(this).fadeOut().addClass('is-hidden');
    return false;
  });

  function addImageInHightlightsContent(element) {
    if (element.type === 'photo') {
      $('.choose-photos').html(
        $('.choose-photos').html() +
        '<a class="photo" href="' + getOptmizedImageUrl(element.url) + '">' +
          '<img class="highlight-photo" src="' + getOptmizedImageUrl(element.url) + '" alt="' + element.content + '" width="90" height="auto">' +
        '</a>');
    }
  }

  Timeline.init();

});
