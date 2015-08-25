describe('Timeline.js', function () {
  'use strict';

  var timeline;
  var buzz;

  beforeEach(function () {
    timeline =  window.Timeline;
    var deferredAjax = jQuery.Deferred();
    buzz = {
      _id: '55d629bd03448703003bd003',
      content: 'Em nota, Beth Carvalho repudia uso de sua música - "Vou Festejar" - no protesto contra o governo federal realizado no último domingo, dia 16.↵Leia <a target="_blank" href="//brasildefato.com.br/node/32728">aqui</a>.',
      date: '2015-08-20T19:25:49.312Z',
      local: 'Redes sociais',
      timestamp: '2015-08-20 16:25:38',
      type: 'text'
    };

    deferredAjax.resolve([buzz]);

    spyOn(window.TimelineBlocks, 'hideBlocksOutsideViewport');
    spyOn(window.jQuery, 'getJSON').and.returnValue(deferredAjax.promise());
  });



  it('#init offline', function(){

    window.TimelineStore = {
        getLocalOldestInformations: function() {
        return [buzz, buzz, buzz, buzz];
      }
    };

    expect(timeline.init(true)).toBe(true);
    expect(jQuery.getJSON).toHaveBeenCalled();
    expect(window.TimelineBlocks.hideBlocksOutsideViewport).toHaveBeenCalled();
  });

  it('#init online', function(){

    var mockIO = {
      on: function(channel, callback) {
        return callback({ message: buzz });
      }
    };

    spyOn(mockIO, 'on');
    window.io = {
      connect: function() {
        return mockIO;
      },
    };

    expect(timeline.init()).toBe(true);
    expect(jQuery.getJSON).toHaveBeenCalled();
    expect(mockIO.on).toHaveBeenCalled();
    expect(window.TimelineBlocks.hideBlocksOutsideViewport).toHaveBeenCalled();
  });

  it('#onAddBuzz', function() {
    spyOnEvent($(document), 'addedBuzzInTimeline');
    var counter = false;
    timeline.onAddBuzz(function(){
      counter = true;
    });
    $(document).trigger('addedBuzzInTimeline', buzz);

    expect('addedBuzzInTimeline').toHaveBeenTriggeredOn($(document));
  });

});
