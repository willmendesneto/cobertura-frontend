(function(window) {
  'use strict';

  var store = window.TimeLineStore;
  var blocks = window.TimelineBlocks;


  var lastElementIsVisible = function(){
    var $lastTimelineItem = $('.timeline-block:last-child');
    if ($lastTimelineItem.size() > 0){
      return blocks.elementIsVisibleOnViewport($lastTimelineItem);
    }

    return true;
  };

  var scrollEvent =  function(){
    blocks.showBlocksInViewport();
    if (!lastElementIsVisible()) {
      return;
    }

    var buzzes = store.getLocalOldestInformations();

    if (buzzes.length === 0) {
      return;
    }

    addBuzzToScreen(buzzes);

    blocks.hideBlocksOutsideViewport();
  };

  var clickEvent = function(element){
    var $self = $(element);
    $self.addClass('m-progress');

    blocks.showBlocksInViewport();

    var buzzes = store.getLocalOldestInformations();

    if (buzzes.length === 0) {
      $self.attr('disabled', true).removeClass('m-progress');
      return;
    }

    addBuzzToScreen(buzzes);

    $self.removeClass('m-progress');
  };

  var addBuzzToScreen = function(buzzes) {
    var index, buzzesLength = buzzes.length;
    for (index = 0; index < buzzesLength; index++) {
      blocks.render(buzzes[index], false);
      store.remove(buzzes[index]);
      $(document).trigger('addedBuzzInTimeline', buzzes[index]);
    }
  };

  var addBuzzToStore = function(data){
    var buzz = data.message;
    store.remove(buzz);

    store.showBlocksInViewport();
    store.render(buzz, true);
    addImageInHightlightsContent(buzz);

    blocks.hideBlocksOutsideViewport();
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

      blocks.hideBlocksOutsideViewport();
      store.getBufferInformations().then(firstLoad);
      return true;
    },
    onAddBuzz: function(callback) {
      $(document).on('addedBuzzInTimeline', callback);
      return this;
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
