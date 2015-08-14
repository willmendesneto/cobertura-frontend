$(document).ready(function() {
  $("[data-toggle]").click(function() {
    var toggle_el = $(this).data("toggle");
    $(toggle_el).toggleClass("open");
    $(this).toggleClass('open');
  });

  $('main > aside').hammer().on('swipe',function(){
    $(this).toggleClass('open');
    $("[data-toggle]").toggleClass('open');
  });
});
