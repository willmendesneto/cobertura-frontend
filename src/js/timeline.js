$(document).ready(function() {
 /**
    Vertical timeline: https://github.com/CodyHouse/vertical-timeline
  */
  var timelineBlocks = $('.timeline-block'),
    offset = 0.8;

  var hideBlocks = function(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.timeline-img, .timeline-content').addClass('is-hidden');
    });
  }

  var showBlocks = function(blocks, offset) {
    blocks.each(function(){
      ( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.timeline-img').hasClass('is-hidden') ) && $(this).find('.timeline-img, .timeline-content').removeClass('is-hidden').addClass('bounce-in');
    });
  }

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    (!window.requestAnimationFrame)
      ? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
      : window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
  });
  //hide timeline blocks which are outside the viewport
  hideBlocks(timelineBlocks, offset);

});
