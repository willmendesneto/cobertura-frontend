(function(window) {
  'use strict';

  var store = window.TimeLineStore;
  var blocks = window.TimelineBlocks;

  var lastElementIsVisible = function(){
    var $lastTimelineItem = $('.timeline-block:last-child');
    if ($lastTimelineItem.size() > 0){
      return store.elementIsVisibleOnViewport($lastTimelineItem, window.CONFIG.OFFSET);
    }

    return true;
  };

  var scrollEvent =  function(){
    blocks.showBlocksInViewport(window.CONFIG.OFFSET);
    if (!lastElementIsVisible()) {
      return;
    }

    var buzzes = store.getLocalOldestInformations();

    if (buzzes.length === 0) {
      return;
    }

    addBuzzToScreen(buzzes);

    blocks.hideBlocksOutsideViewport(window.CONFIG.OFFSET);
  };

  var clickEvent = function(element){
    var $self = $(element);
    $self.addClass('m-progress');

    store.showBlocksInViewport(window.CONFIG.OFFSET);

    var buzzes = store.getLocalOldestInformations();

    if (buzzes.length === 0) {
      $self.attr('disabled', true).removeClass('m-progress');
      return;
    }

    addTimelineBlockInDOM(buzzes);

    $self.removeClass('m-progress');
  };

  var addBuzzToScreen = function(buzzes) {
    var index;
    for (index = 0; index < buzzes.length; index++) {
      blocks.render(buzzes[index], false);
      store.remove(buzzes[index]);
    }
  }

  var addBuzzToStore = function(data){
    var buzz = data.message;
    store.remove(buzz);

    store.showBlocksInViewport(window.CONFIG.OFFSET);
    store.render(buzz, true);
    addImageInHightlightsContent(buzz);

    blocks.hideBlocksOutsideViewport(window.CONFIG.OFFSET);
  };

  var firstLoad = function(buzzes){
    store.setData(buzzes);
    buzzes = store.getLocalOldestInformations();

    if (buzzes.length > 0) {
      addBuzzToScreen(buzzes);
    }

    buzzes = null;

    var socket = io.connect(window.CONFIG.URL_SOCKET_IO);
    socket.on('burburinho', addBuzzToStore);

    if (!window.UA.isMobile()) {
      $('.button-load-more').remove();
      $(window).on('scroll', scrollEvent );
    } else {
      $('.button-load-more').click( clickEvent );
    }
  };


  var Timeline = {};
  Timeline = {
    init: function(){
      store = window.TimeLineStore;
      blocks = window.TimelineBlocks;

      blocks.hideBlocksOutsideViewport(window.CONFIG.OFFSET);
      store.getBufferInformations(window.CONFIG.URL_BUFFER_INFO).then(firstLoad);
      return true;
    }
  };




  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return Timeline;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = Timeline.attach;
    module.exports.Timeline = Timeline;
  } else {
    window.Timeline = Timeline;
  }

})(window);
