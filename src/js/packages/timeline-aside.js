$(document).ready(function() {
  $('.choose-photos').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Carregando #%curr%...',
    mainClass: 'mfp-img-mobile',
    tCounter: '<span class="mfp-counter">%curr% de %total%</span>',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1] // Will preload 0 - before current, and 1 after the current image
    }
  });
});
