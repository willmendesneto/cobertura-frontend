$(document).ready(function() {
  // Mock of data
  var DATA_MOCK = [
    {
      timestamp: '2015-08-11 12:12:12',
      type: 'text',
      content: 'Mais de 250 mil pessoas participaram de protestos em várias cidades de norte a sul do Brasil nesta segunda-feira. A onda de protestos, que nas últimas semanas tinha como foco principal a redução de tarifas do transporte coletivo, ganhou proporções maiores e passou a incluir gritos de descontentamento'
    },
    {
      timestamp: '2015-08-11 12:12:12',
      type: 'video',
      url: 'https://www.youtube.com/embed/aOYoRbyABaU',
      content: 'Mais de 250 mil pessoas participaram de protestos em várias cidades de norte a sul do Brasil nesta segunda-feira. A onda de protestos, que nas últimas semanas tinha como foco principal a redução de tarifas do transporte coletivo, ganhou proporções maiores e passou a incluir gritos de descontentamento'
    },
    {
      timestamp: '2015-08-11 12:12:12',
      type: 'photo',
      url: 'http://www.pco.org.br/banco_arquivos/conoticias/img/2015/1/4055/48347/48347.jpg',
      content: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis.'
    },
    {
      timestamp: '2015-08-11 12:12:12',
      type: 'quote',
      url: '//avatars0.githubusercontent.com/u/3452187?v=3&s=460',
      content: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis.'
    },
    {
      timestamp: '2015-08-11 12:12:12',
      type: 'gallery',
      content: [
        {
          url: 'http://farm9.staticflickr.com/8747/16740020286_75906afcea_b.jpg',
          description: 'Mussum ipsum cacilds, vidis litro abertis.'
        },
        {
          url: 'http://farm9.staticflickr.com/8741/16558651317_50284b475d_b.jpg',
          description: 'manifestação'
        },
        {
          url: 'http://farm9.staticflickr.com/8747/16740020286_75906afcea_b.jpg',
          description: 'Mussum ipsum cacilds, vidis litro abertis.'
        },
        {
          url: 'http://farm9.staticflickr.com/8741/16558651317_50284b475d_b.jpg',
          description: 'manifestação'
        }
      ]
    }
  ];

 /**
    Vertical timeline: https://github.com/CodyHouse/vertical-timeline
  */
  var OFFSET = 0.8;

  function capitalize(element) {
      return element.charAt(0).toUpperCase() + element.slice(1);
  }

  function extend(target, source) {
      target = target || {};
      for (var prop in source) {
          if (typeof source[prop] === 'object') {
              target[prop] = this.extend(target[prop], source[prop]);
          } else {
              target[prop] = source[prop];
          }
      }
      return target;
  }

  var TimelineBlocks = {};

  var TimeLineBlockText = {};
  var TimeLineBlockVideo = {};
  var TimeLineBlockGallery = {};
  var TimeLineBlockPhoto = {};
  var TimeLineBlockQuote = {};

  // Exception
  function RenderException(message) {
     this.message = message;
     this.name = 'RenderException';
  }

  // Interface
  var ITimeLineBlock = {
    render: function(data) {
      throw new RenderException('Render method wasn\'t implemented!');
    }
  };

  extend(TimeLineBlockText, ITimeLineBlock);
  extend(TimeLineBlockVideo, ITimeLineBlock);
  extend(TimeLineBlockPhoto, ITimeLineBlock);
  extend(TimeLineBlockGallery, ITimeLineBlock);
  extend(TimeLineBlockQuote, ITimeLineBlock);

  function getMonthName(month) {
    var month = parseInt(month);
    var currentMonth = '';
    if (month === 1) {
      currentMonth = 'JAN';
    } else if (month === 2) {
      currentMonth = 'FEV';
    } else if (month === 3) {
      currentMonth = 'MAR';
    } else if (month === 4) {
      currentMonth = 'ABR';
    } else if (month === 5) {
      currentMonth = 'MAI';
    } else if (month === 6) {
      currentMonth = 'JUN';
    } else if (month === 7) {
      currentMonth = 'JUL';
    } else if (month === 8) {
      currentMonth = 'AGO';
    } else if (month === 9) {
      currentMonth = 'SET';
    } else if (month === 10) {
      currentMonth = 'OUT';
    } else if (month === 11) {
      currentMonth = 'NOV';
    } else if (month === 12) {
      currentMonth = 'DEZ';
    }
    return currentMonth;
  }

  function getFormattedDate(timestamp) {
    var date = timestamp.split(' ')[0].split('-', 3);
    date.shift();
    date.reverse();
    return date[0] + ' ' + getMonthName(date[1]);
  }

  function getFormattedDateHour(timestamp) {
    var hoursAndMinutes = timestamp.split(' ')[1].split(':', 2).join(':');
    var newDate = new Date();
    return newDate.getHours() + ':' + newDate.getMinutes();
  }

  TimeLineBlockQuote.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedDateHour(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
      '  <i class="fa fa-quote-left"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content quote">' +
      '  <img class="perfil" src="' + data.url + '" alt="foto perfil"/>' +
      '  <p>' + data.content + '</p>' +
      '</article>' +
    '</div>';
  };

  TimeLineBlockText.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedDateHour(data.timestamp);

    return '<div class="timeline-block">' +
    '  <figure class="timeline-img">' +
    '    <i class="fa fa-align-justify"></i>' +
    '  </figure>' +
    '<time class="data-hora">' + formattedDate +
    '    <strong class="hora">' + formattedDateHour + '</strong>' +
    '</time>' +
      '<article class="timeline-content text">' +
    '    <p>' + data.content + '</p>' +
    '  </article>' +
    '</div>';
  };

  TimeLineBlockVideo.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedDateHour(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-video-camera fa-4"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content video">' +
        '<iframe src="' + data.url + '"></iframe>' +
        '<p>' + data.content + '</p>' +
      '</article>' +
    '</div>';
  };

  TimeLineBlockPhoto.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedDateHour(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-camera-retro"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content photo">' +
        '<img src="' + data.url + '" alt="manifestação"/>' +
        '<p>' + data.content + '</p>' +
      '</article>' +
    '</div>';
  }

  TimeLineBlockGallery.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedDateHour(data.timestamp);

    var images = data.content.map(function(item){
      return '<img src="' + item.url + '" alt="' + item.description + '"/>';
    });

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
          '<i class="fa fa-picture-o"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content gallery">' +
        '<section class="photos">' +
          images.join('') +
        '</section>' +
      '</article>' +
    '</div>';
  };

  TimelineBlocks = {

    timelineBlocks: null,

    render: function(data, newerContent) {
      var newElement = eval('TimeLineBlock' + capitalize(data.type) + '.render( data )');

      if(!!newerContent) {
        $('#timeline').prepend(newElement);
      } else {
        $('.timeline-block:last-child').after(newElement);
      }
    },

    getTimelineBlocks: function() {
      TimelineBlocks.timelineBlocks = $('.timeline-block');
      return TimelineBlocks.timelineBlocks;
    },

    elementIsVisibleOnViewport: function(element) {
      return element.offset().top <= $(window).scrollTop()+$(window).height() * OFFSET;
    },

    elementIsNotVisibleOnViewport: function(element) {
      return element.offset().top > $(window).scrollTop()+$(window).height() * OFFSET;
    },

    hideBlocksOutsideViewport: function() {
      var self,
        blocks = TimelineBlocks.getTimelineBlocks();
      blocks.each(function(){
        self = $(this);

        ( TimelineBlocks.elementIsNotVisibleOnViewport(self) ) &&
          self.find('.timeline-img, .timeline-content').addClass('is-hidden');
      });
    },

    showBlocksInViewport: function() {
      var self,
        blocks = TimelineBlocks.getTimelineBlocks();
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

  //hide timeline blocks which are outside the viewport
  TimelineBlocks.hideBlocksOutsideViewport();

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    return false;
  });

  //on scolling, show/animate timeline blocks when enter the viewport
  $(window).on('scroll', function(){
    var containsSomegallery = false;
    var lastElementIsVisible = TimelineBlocks.elementIsVisibleOnViewport($('.timeline-block:last-child'));
    if (!window.requestAnimationFrame) {

        setTimeout(function(){
            TimelineBlocks.showBlocksInViewport();
            if (lastElementIsVisible) {
              $.each(DATA_MOCK, function(item, element){
                TimelineBlocks.render(element, false);
                if(!containsSomegallery) {
                  containsSomegallery = element.type === 'gallery';
                }
              });

              if (!!containsSomegallery) {
                Galleria.run('.gallery section.photos:not(.gallery-on)');
                $('.gallery section.photos:not(.gallery-on)').addClass('gallery-on');
                containsSomegallery = false;
              }

              TimelineBlocks.hideBlocksOutsideViewport();

              $(window).trigger('scroll');
            }
          }, 100);
    } else {
        window.requestAnimationFrame(function(){
          TimelineBlocks.showBlocksInViewport();
          if (lastElementIsVisible) {
            $.each(DATA_MOCK, function(item, element){
              TimelineBlocks.render(element, false);
              if(!containsSomegallery) {
                containsSomegallery = element.type === 'gallery';
              }
            });

            if (!!containsSomegallery) {
              Galleria.run('.gallery section.photos:not(.gallery-on)');
              $('.gallery section.photos:not(.gallery-on)').addClass('gallery-on');
              containsSomegallery = false;
            }

            TimelineBlocks.hideBlocksOutsideViewport();

            $(window).trigger('scroll');
          }
        });
    }

  });

});
