describe('Config.js', function () {
  'use strict';

  var CONFIG;

  beforeEach(function () {
    CONFIG = window.CONFIG;
  });

  it('Initial configurations', function () {
    expect(CONFIG.FACEBOOK_ID).toBe(1500652936893411);
    expect(CONFIG.URL_COBERTURA).toBe('http://localhost:4000');
    expect(CONFIG.URL_SOCIAL_SHARE_IMAGE).toBe('http://localhost:4000/assets/img/logo.jpg');
  });

});
