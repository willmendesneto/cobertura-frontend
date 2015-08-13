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

  timeLineStore.getBufferInformations().then(function(data) {
    if (data.length > 0) {
      $.each(data, function(item, element){
        TimelineBlocks.render(element, true);
      });
    }
  });

  timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

  function checkGalleryRender(containsSomegallery, containsSomegallery) {
    if (!!containsSomegallery) {

      window.Galleria.run('.gallery section.photos:not(.gallery-on)');
      $('.gallery section.photos:not(.gallery-on)').addClass('gallery-on');
      containsSomegallery = false;
    }
  }

  var socket = io.connect('//burburinho.herokuapp.com');

  socket.on('burburinho', function (data) {
    timeLineStore.render(data.message, true);
  });

  function loadOldestTimelineItems(lastElementIsVisible, containsSomegallery) {

    timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
    timelineBlocks.showBlocksInViewport();
    if (lastElementIsVisible) {

      $.each(CONFIG.DATA_MOCK, function(item, element){
        timelineBlocks.render(element, false);
        if(!containsSomegallery) {
          containsSomegallery = element.type === 'gallery';
        }
      });

      if (!!containsSomegallery) {
        Galleria.run('.gallery section.photos:not(.gallery-on)');
        $('.gallery section.photos:not(.gallery-on)').addClass('gallery-on');
        containsSomegallery = false;
      }

      timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

      $(window).trigger('scroll');
    }
  }

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    var containsSomegallery = false;
    var $lastTimelineItem = $('.timeline-block:last-child');
    var lastElementIsVisible = timelineBlocks.elementIsVisibleOnViewport($lastTimelineItem, CONFIG.OFFSET);

    if (!window.requestAnimationFrame) {

      setTimeout(function(){
        loadOldestTimelineItems(lastElementIsVisible, containsSomegallery);
      }, 100);
    } else {
      window.requestAnimationFrame(function(){
        loadOldestTimelineItems(lastElementIsVisible, containsSomegallery);
      });
    }

  });

});
