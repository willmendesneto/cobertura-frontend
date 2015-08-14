(function(window) {
  'use strict';

  function getSocketIOUrl(){
    return window.location.origin.indexOf('localhost') === -1 ?
            '//burburinho.herokuapp.com' :
            '//localhost:5000';
  }

  var CONFIG = {
    OFFSET: 0.8,
    URL_BUFFER_INFO: 'http://burburinho.herokuapp.com/api/burburinhos',
    URL_OLDEST_INFO: 'http://burburinho.herokuapp.com/api/test',
    URL_SOCKET_IO: getSocketIOUrl(),
    DATA_MOCK: [
      {
        timestamp: '2015-08-11 12:12:12',
        type: 'text',
        local: 'Minas Gerais',
        content: 'Mais de 250 mil pessoas participaram de protestos em várias cidades de norte a sul do Brasil nesta segunda-feira. A onda de protestos, que nas últimas semanas tinha como foco principal a redução de tarifas do transporte coletivo, ganhou proporções maiores e passou a incluir gritos de descontentamento'
      },
      {
        timestamp: '2015-08-11 12:12:12',
        type: 'video',
        local: 'Amazonas',
        url: 'https://www.youtube.com/embed/aOYoRbyABaU',
        content: 'Mais de 250 mil pessoas participaram de protestos em várias cidades de norte a sul do Brasil nesta segunda-feira. A onda de protestos, que nas últimas semanas tinha como foco principal a redução de tarifas do transporte coletivo, ganhou proporções maiores e passou a incluir gritos de descontentamento'
      },
      {
        timestamp: '2015-08-11 12:12:12',
        type: 'photo',
        local: 'Bahia',
        url: 'http://www.pco.org.br/banco_arquivos/conoticias/img/2015/1/4055/48347/48347.jpg',
        content: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis.'
      },
      {
        timestamp: '2015-08-11 12:12:12',
        type: 'quote',
        local: 'Goiás',
        url: '//avatars0.githubusercontent.com/u/3452187?v=3&s=460',
        content: 'Mussum ipsum cacilds, vidis litro abertis. Consetis adipiscings elitis. Pra lá , depois divoltis porris, paradis.'
      },
      {
        timestamp: '2015-08-11 12:12:12',
        type: 'gallery',
        local: 'São Paulo',
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
    ]
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return CONFIG;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG.attach;
    module.exports.CONFIG = CONFIG;
  } else {
    window.CONFIG = CONFIG;
  }

})(window);
