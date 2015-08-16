$(document).ready(function() {

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    $(this).fadeOut().addClass('is-hidden');
    return false;
  });

  var timeLineStore = window.TimeLineStore;
  var timelineBlocks = window.TimelineBlocks;
  var CONFIG = window.CONFIG;

  timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

  function addImageInHightlightsContent(element) {
    if (element.type === 'photo') {
      $('.choose-photos').html(
        $('.choose-photos').html() +
        '<a class="photo" href="' + getOptmizedImageUrl(element.url) + '">' +
          '<img class="highlight-photo" src="' + getOptmizedImageUrl(element.url) + '" alt="' + element.content + '" width="90" height="60">' +
        '</a>');
    }
  }

  var socket = io.connect(CONFIG.URL_SOCKET_IO);

  timeLineStore.getBufferInformations(CONFIG.URL_BUFFER_INFO).then(function(items){

    if (items.length > 0) {
      for(var i = 0; items.length > i; i++) {
        timelineBlocks.render(items[i], false);
        addImageInHightlightsContent(items[i]);
      }
    }

    socket.on('burburinho', function (data) {
      timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
      timelineBlocks.render(data.message, true);
      addImageInHightlightsContent(data.message);
    });

  });

});
