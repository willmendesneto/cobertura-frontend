(function(window) {
  'use strict';

  var showButtonNewContent = function(){
    if( $(window).scrollTop() > 500 ) {
      $('.button-new-content').fadeIn().removeClass('is-hidden');
    }
  };

  function getTimelineRenderer(type) {
    return window['TimeLineBlock' + capitalize(type) ];
  }

  var TimelineBlocks = {};
  var defaultOffset = 0.8;
  TimelineBlocks = {

    timelineBlocks: null,

    getTimelineOutputHTML: function(data) {
      return getTimelineRenderer(data.type).render( data );
    },

    render: function(data, newerContent) {
      var newElement = TimelineBlocks.getTimelineOutputHTML(data);

      if(!!newerContent) {
        $('#timeline').prepend(newElement);
        showButtonNewContent();
      } else if ( !$('.timeline-block').last()[0] ) {
        $('.button-load-more').before(newElement);
      } else {
        $('.timeline-block').last().after(newElement);
      }
    },

    getTimelineBlocks: function() {
      TimelineBlocks.timelineBlocks = $('.timeline-block');
      return TimelineBlocks.timelineBlocks;
    },

    elementIsVisibleOnViewport: function(element) {
      return element.offset().top <= $(window).scrollTop()+$(window).height() * defaultOffset;
    },

    elementIsNotVisibleOnViewport: function(element) {
      return element.offset().top > $(window).scrollTop()+$(window).height() * defaultOffset;
    },

    hideBlocksOutsideViewport: function() {
      var self;
      var blocks = TimelineBlocks.getTimelineBlocks();

      blocks.each(function(){
        self = $(this);

        ( TimelineBlocks.elementIsNotVisibleOnViewport(self) ) &&
          self.find('.timeline-img, .timeline-content').addClass('is-hidden');
      });
    },

    showBlocksInViewport: function() {
      var self;
      var blocks = TimelineBlocks.getTimelineBlocks();

      blocks.each(function(){
        self = $(this);

        ( TimelineBlocks.elementIsVisibleOnViewport(self) &&
        self.find('.timeline-img').hasClass('is-hidden') ) &&
        self.find('.timeline-img, .timeline-content')
          .removeClass('is-hidden')
          .addClass('bounce-in');
      });
    }

  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimelineBlocks;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimelineBlocks.attach;
    module.exports.TimelineBlocks = TimelineBlocks;
  } else {
    window.TimelineBlocks = TimelineBlocks;
  }

})(window);
