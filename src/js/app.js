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


  function runGalleria(containsSomegallery) {
    if (!!containsSomegallery) {
      window.Galleria.run('.gallery section.photos:not(.gallery-on)');
      $('.gallery section.photos:not(.gallery-on)').addClass('gallery-on');
      containsSomegallery = false;
    }
  }

  function timeLineItemHasGalleryType(element){
    return element.type === 'gallery';
  }

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

    timeLineStore.setData(items);

    if (items.length > 0) {
      for(var i = 0; items.length > i; i++) {
        timelineBlocks.render(items[i], false);
        addImageInHightlightsContent(items[i]);
        timeLineStore.remove(items[i]);
      }
    }

    socket.on('burburinho', function (data) {

      timeLineStore.remove(data.message);

      timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
      timelineBlocks.render(data.message, true);
      addImageInHightlightsContent(data.message);
      containsSomegallery = timeLineItemHasGalleryType(data.message);

      runGalleria(!!containsSomegallery);
      timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);
    });

    $(window).on('scroll', function(){
      var containsSomegallery = false;
      var $lastTimelineItem = $('.timeline-block:last-child');
      var lastElementIsVisible = ($lastTimelineItem.size() > 0) ?
                                  timelineBlocks.elementIsVisibleOnViewport($lastTimelineItem, CONFIG.OFFSET) :
                                  true;

      timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
      if (!lastElementIsVisible) {
        return;
      }

      var localData = timeLineStore.getLocalOldestInformations();

      if (localData.length === 0) {
        return;
      }

      $.each(localData, function(item, element){

        timelineBlocks.render(element, false);
        addImageInHightlightsContent(element);

        if(!containsSomegallery) {
          containsSomegallery = timeLineItemHasGalleryType(element);
        }
      });

      runGalleria(!!containsSomegallery);
      timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

    });
  });

});
