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

  var scrollEvent = function(){
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
      renderBuzzInScreen(buzzes[index], false);
    }
  };

  var triggerBuzzEvent = function (buzz) {
    $(document).trigger('addedBuzzInTimeline', buzz);
  };

  var renderBuzzInScreen = function(buzz, isANewElement) {
    blocks.render(buzz, isANewElement);
    store.remove(buzz);
    triggerBuzzEvent(buzz);
  };

  var addBuzzToStore = function(data){
    var buzz = data.message;
    store.remove(buzz);

    blocks.showBlocksInViewport();
    renderBuzzInScreen(buzz, true);

    blocks.hideBlocksOutsideViewport();
  };

  var firstLoad = function(buzzes){

    var firstRenderToLocalBuzzes = function() {
      var localBuzzes = store.getLocalOldestInformations();

      if (localBuzzes.length > 0) {
        addBuzzToScreen(localBuzzes);
      }
    };

    store.setData(buzzes);
    firstRenderToLocalBuzzes();

    var socket = io.connect(window.CONFIG.URL_SOCKET_IO);
    socket.on('burburinho', addBuzzToStore);

    var addEventToMobile = function() {
      $('.button-load-more').on('click', clickEvent ).removeClass('is-hidden');
    };

    var addEventToDesktop = function() {
      $(window).on('scroll', scrollEvent );
    };

    window.UA.isMobile() ? addEventToMobile() : addEventToDesktop();
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
