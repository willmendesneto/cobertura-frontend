describe('TimelineStore.js', function () {
  'use strict';

  var store;
  var data = [{ title:1 }, {title:2}, { title:3 }, {title:4}, { title:5 }, {title:6}, { title:7 }, {title:8}, { title:9 }, {title:10}, {title:11}, { title:10 }, {title:11}, {title:12}, { title:13 }, {title:14}];

  beforeEach(function () {
    store = window.TimeLineStore;
  });

  it('should save data', function () {
    expect(store.setData(data)).toBe(true);
  });

  it('should calc number of pages to pagination', function () {
    store.setData(data);
    expect(store.numberOfPages()).toBe(2);
  });

  describe('getLocalOldestInformations',function(){
    it('should get first ten itens', function () {
      store.setData(data);
      expect(store.getLocalOldestInformations().length).toBe(10);
    });

    it('should get the first ten itens', function () {
      store.setData(data);
      var result = store.getLocalOldestInformations();

      expect(result[0].title).toBe(1);
      expect(result[result.length-1].title).toBe(10);
    });
  });


});
