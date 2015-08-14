(function(window) {
  'use strict';

  var showButtonNewContent = function(){
    if( $(window).scrollTop() > 500 ) {
      $('.button-new-content').fadeIn().removeClass('is-hidden');
    }
  };

  var TimelineBlocks = {};

  TimelineBlocks = {

    timelineBlocks: null,

    render: function(data, newerContent) {
      var newElement = eval('window.TimeLineBlock' + capitalize(data.type) + '.render( data )');

      if(!!newerContent) {
        $('#timeline').prepend(newElement);
        showButtonNewContent();
      } else {
        $('.timeline-block:last-child').after(newElement);
      }
    },

    getTimelineBlocks: function() {
      TimelineBlocks.timelineBlocks = $('.timeline-block');
      return TimelineBlocks.timelineBlocks;
    },

    elementIsVisibleOnViewport: function(element, defaultOffset) {
      return element.offset().top <= $(window).scrollTop()+$(window).height() * defaultOffset;
    },

    elementIsNotVisibleOnViewport: function(element, defaultOffset) {
      return element.offset().top > $(window).scrollTop()+$(window).height() * defaultOffset;
    },

    hideBlocksOutsideViewport: function(ofset) {
      var self;
      var blocks = TimelineBlocks.getTimelineBlocks();

      blocks.each(function(){
        self = $(this);

        ( TimelineBlocks.elementIsNotVisibleOnViewport(self, ofset) ) &&
          self.find('.timeline-img, .timeline-content').addClass('is-hidden');
      });
    },

    showBlocksInViewport: function(ofset) {
      var self;
      var blocks = TimelineBlocks.getTimelineBlocks();

      blocks.each(function(){
        self = $(this);

        ( TimelineBlocks.elementIsVisibleOnViewport(self, ofset) &&
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
