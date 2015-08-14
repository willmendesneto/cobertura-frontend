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

  timeLineStore.loadServerData();

  timeLineStore.getBufferInformations().then(function(data) {
    if (data.length > 0) {
      $.each(data, function(item, element){
        timelineBlocks.render(element, true);
      });
    }
  });

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

  function loadOldestTimelineItems(lastElementIsVisible, newestInformation, socketIOData) {
    newestInformation = typeof newestInformation !== 'undefined' ? newestInformation : false;
    var containsSomegallery = false;
    timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
    if (!lastElementIsVisible) {
      return;
    }

    if (!newestInformation) {
      var localData = timeLineStore.getLocalOldestInformations();

      if (localData.length === 0) {
        return;
      }

      $.each(timeLineStore.getLocalOldestInformations(), function(item, element){
        timelineBlocks.render(element, newestInformation);
        if(!containsSomegallery) {
          containsSomegallery = timeLineItemHasGalleryType(element);
        }
      });

    } else {
      timelineBlocks.render(socketIOData, newestInformation);
      containsSomegallery = timeLineItemHasGalleryType(socketIOData);
    }

    runGalleria(!!containsSomegallery);
    timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

    $(window).trigger('scroll');
  }

  var socket = io.connect(CONFIG.URL_SOCKET_IO);

  socket.on('burburinho', function (data) {
    var $lastTimelineItem = $('.timeline-block:last-child');
    var lastElementIsVisible = ($lastTimelineItem.size() > 0) ?
                                timelineBlocks.elementIsVisibleOnViewport($lastTimelineItem, CONFIG.OFFSET) :
                                true;
    loadOldestTimelineItems(lastElementIsVisible, true, data.message);
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    var $lastTimelineItem = $('.timeline-block:last-child');
    var lastElementIsVisible = ($lastTimelineItem.size() > 0) ?
                                timelineBlocks.elementIsVisibleOnViewport($lastTimelineItem, CONFIG.OFFSET) :
                                true;

    if (!window.requestAnimationFrame) {

      setTimeout(function(){
        loadOldestTimelineItems(lastElementIsVisible);
      }, 100);
    } else {
      window.requestAnimationFrame(function(){
        loadOldestTimelineItems(lastElementIsVisible);
      });
    }

  });

});
