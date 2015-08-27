describe('TimelineStore.js', function () {
  'use strict';

  var store;
  var data;

  beforeEach(function () {
    store = window.TimeLineStore;
    data = [{ title:1 , timestamp: 1}, {title:2, timestamp: 2}, { title:3 , timestamp: 3}, {title:4, timestamp: 4}, { title:5 , timestamp: 5}, {title:6, timestamp: 6}, { title:7 , timestamp: 7},
      {title:8, timestamp: 8}, { title:9 , timestamp: 9}, {title:10, timestamp: 10}, {title:11, timestamp: 11},
      {title:12, timestamp: 12}, { title:13 , timestamp: 13}, {title:14, timestamp: 14}];

  });

  it('should save data', function () {
    expect(store.setData(data)).toBe(true);
  });

  it('should calc number of pages to pagination', function () {
    store.setData(data);
    expect(store.numberOfPages()).toBe(2);
  });

  it('#remove', function () {
    store.setData(data);
    var currentLength = data.length - 1;

    store.remove(data[0]);

    var dataStore = [];
    var localStore;
    localStore = store.getLocalOldestInformations();
    while (localStore.length > 0) {
      localStore.forEach(function(element, index) {
        dataStore.push(element);
        store.remove(element);
      });
      localStore = store.getLocalOldestInformations();
    }

    expect(currentLength).toBe(dataStore.length);
  });

  it('#update', function () {
    store.setData(data);

    var newData = data[0];
    newData.author = 'Test';

    store.update(newData);

    var localStore = store.getLocalOldestInformations();
    expect(newData.author).toBe(localStore[0].author);
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
