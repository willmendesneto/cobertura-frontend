
  function getOptmizedImageUrl(url) {
    return !window.UA.isMobile() ? url : url.replace('_b.jpg', '_n.jpg');
  }

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

  function getFormattedHourAndMinutes(timestamp) {
    return timestamp.split(' ')[1].split(':', 2).join(':');
  }

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

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'hammerjs'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'), require('hammerjs'));
    } else {
        factory(jQuery, Hammer);
    }
}(function($, Hammer) {
    function hammerify(el, options) {
        var $el = $(el);
        if(!$el.data("hammer")) {
            $el.data("hammer", new Hammer($el[0], options));
        }
    }

    $.fn.hammer = function(options) {
        return this.each(function() {
            hammerify(this, options);
        });
    };

    // extend the emit method to also trigger jQuery events
    Hammer.Manager.prototype.emit = (function(originalEmit) {
        return function(type, data) {
            originalEmit.call(this, type, data);
            $(this.element).trigger({
                type: type,
                gesture: data
            });
        };
    })(Hammer.Manager.prototype.emit);
}));

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

$(document).ready(function() {
  Galleria.loadTheme('//cdnjs.cloudflare.com/ajax/libs/galleria/1.4.2/themes/classic/galleria.classic.min.js');
});

/*jslint browser: true, regexp: true, maxerr: 50, indent: 4 */
/**
 * A UserAgent detection library.
 *
 * This library relies on the navigator.userAgent property and hence does not
 * work for custom UserAgent settings.
 *
 * Apart from supporting detection of major browser vendors, the library also
 * supports detection of various devices.
 *
 * Copyright (c) 2012-2014, Gopalarathnam Venkatesan
 * All rights reserved.
 *
 * @module UA
 */
(function (window, navigator) {
    "use strict";

    var userAgent = (window.navigator && navigator.userAgent) || "";

    function detect(pattern) {
        return function () {
            return (pattern).test(userAgent);
        };
    }

    var UA =  {
        /**
         * Return true if the browser is Chrome or compatible.
         *
         * @method isChrome
         */
        isChrome: detect(/webkit\W.*(chrome|chromium)\W/i),

        /**
         * Return true if the browser is Firefox.
         *
         * @method isFirefox
         */
        isFirefox: detect(/mozilla.*\Wfirefox\W/i),

        /**
         * Return true if the browser is using the Gecko engine.
         *
         * This is probably a better way to identify Firefox and other browsers
         * that use XulRunner.
         *
         * @method isGecko
         */
        isGecko: detect(/mozilla(?!.*webkit).*\Wgecko\W/i),

        /**
         * Return true if the browser is Internet Explorer.
         *
         * @method isIE
         */
        isIE: function () {
            if (navigator.appName === "Microsoft Internet Explorer") {
                return true;
            } else if (detect(/\bTrident\b/)) {
                return true;
            } else {
                return false;
            }
        },


        /**
         * Return true if the browser is running on Kindle.
         *
         * @method isKindle
         */
        isKindle: detect(/\W(kindle|silk)\W/i),

        /**
         * Return true if the browser is running on a mobile device.
         *
         * @method isMobile
         */
        isMobile: detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),

        /**
         * Return true if we are running on Opera.
         *
         * @method isOpera
         */
        isOpera: detect(/opera.*\Wpresto\W|OPR/i),

        /**
         * Return true if the browser is Safari.
         *
         * @method isSafari
         */
        isSafari: detect(/webkit\W(?!.*chrome).*safari\W/i),

        /**
         * Return true if the browser is running on a tablet.
         *
         * One way to distinguish Android mobiles from tablets is that the
         * mobiles contain the string "mobile" in their UserAgent string.
         * If the word "Android" isn't followed by "mobile" then its a
         * tablet.
         *
         * @method isTablet
         */
        isTablet: detect(/(ipad|android(?!.*mobile)|tablet)/i),

        /**
         * Return true if the browser is running on a TV!
         *
         * @method isTV
         */
        isTV: detect(/googletv|sonydtv/i),

        /**
         * Return true if the browser is running on a WebKit browser.
         *
         * @method isWebKit
         */
        isWebKit: detect(/webkit\W/i),

        /**
         * Return true if the browser is running on an Android browser.
         *
         * @method isAndroid
         */
        isAndroid: detect(/android/i),

        /**
         * Return true if the browser is running on any iOS device.
         *
         * @method isIOS
         */
        isIOS: detect(/(ipad|iphone|ipod)/i),

        /**
         * Return true if the browser is running on an iPad.
         *
         * @method isIPad
         */
        isIPad: detect(/ipad/i),

        /**
         * Return true if the browser is running on an iPhone.
         *
         * @method isIPhone
         */
        isIPhone: detect(/iphone/i),

        /**
         * Return true if the browser is running on an iPod touch.
         *
         * @method isIPod
         */
        isIPod: detect(/ipod/i),

        /**
         * Return the complete UserAgent string verbatim.
         *
         * @method whoami
         */
        whoami: function () {
            return userAgent;
        }
    };

    if ( typeof define === 'function' && define.amd ) {
        // AMD
        define( [], function() {
            return UA;
        } );
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = UA.attach;
        module.exports.UA = UA;
    } else {
        // browser global
        window.UA = UA;
    }

}(window, navigator));

/*!
 * viewport-units-buggyfill v0.5.0
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Rodney Rehm - http://rodneyrehm.de/en/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfill = factory();
  }
}(this, function () {
  'use strict';
  /*global document, window, navigator, location, XMLHttpRequest, XDomainRequest*/

  var initialized = false;
  var options;
  var userAgent = window.navigator.userAgent;
  var viewportUnitExpression = /([+-]?[0-9.]+)(vh|vw|vmin|vmax)/g;
  var forEach = [].forEach;
  var dimensions;
  var declarations;
  var styleNode;
  var isOldInternetExplorer = false;
  var isOperaMini = userAgent.indexOf('Opera Mini') > -1;

  var isMobileSafari = /(iPhone|iPod|iPad).+AppleWebKit/i.test(userAgent) && (function() {
    // Regexp for iOS-version tested against the following userAgent strings:
    // Example WebView UserAgents:
    // * iOS Chrome on iOS8: "Mozilla/5.0 (iPad; CPU OS 8_1 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) CriOS/39.0.2171.50 Mobile/12B410 Safari/600.1.4"
    // * iOS Facebook on iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_1_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Mobile/11D201 [FBAN/FBIOS;FBAV/12.1.0.24.20; FBBV/3214247; FBDV/iPhone6,1;FBMD/iPhone; FBSN/iPhone OS;FBSV/7.1.1; FBSS/2; FBCR/AT&T;FBID/phone;FBLC/en_US;FBOP/5]"
    // Example Safari UserAgents:
    // * Safari iOS8: "Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4"
    // * Safari iOS7: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A4449d Safari/9537.53"
    var iOSversion = userAgent.match(/OS (\d)/);
    // viewport units work fine in mobile Safari and webView on iOS 8+
    return iOSversion && iOSversion.length>1 && parseInt(iOSversion[1]) < 8;
  })();

  var isBadStockAndroid = (function() {
    // Android stock browser test derived from
    // http://stackoverflow.com/questions/24926221/distinguish-android-chrome-from-stock-browser-stock-browsers-user-agent-contai
    var isAndroid = userAgent.indexOf(' Android ') > -1;
    if (!isAndroid) {
      return false;
    }

    var isStockAndroid = userAgent.indexOf('Version/') > -1;
    if (!isStockAndroid) {
      return false;
    }

    var versionNumber = parseFloat((userAgent.match('Android ([0-9.]+)') || [])[1]);
    // anything below 4.4 uses WebKit without *any* viewport support,
    // 4.4 has issues with viewport units within calc()
    return versionNumber <= 4.4;
  })();

  // Do not remove the following comment!
  // It is a conditional comment used to
  // identify old Internet Explorer versions

  /*@cc_on
  @if (@_jscript_version <= 10)
    isOldInternetExplorer = true;
  @end
  @*/

  // added check for IE11, since it *still* doesn't understand vmax!!!
  if (!isOldInternetExplorer) {
    isOldInternetExplorer = !!navigator.userAgent.match(/Trident.*rv[ :]*11\./);
  }
  function debounce(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      var callback = function() {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(callback, wait);
    };
  }

  // from http://stackoverflow.com/questions/326069/how-to-identify-if-a-webpage-is-being-loaded-inside-an-iframe-or-directly-into-t
  function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      return true;
    }
  }

  function initialize(initOptions) {
    if (initialized) {
      return;
    }

    if (initOptions === true) {
      initOptions = {
        force: true
      };
    }

    options = initOptions || {};
    options.isMobileSafari = isMobileSafari;
    options.isBadStockAndroid = isBadStockAndroid;

    if (!options.force && !isMobileSafari && !isOldInternetExplorer && !isBadStockAndroid && !isOperaMini && (!options.hacks || !options.hacks.required(options))) {
      // this buggyfill only applies to mobile safari, IE9-10 and the Stock Android Browser.
      return;
    }

    options.hacks && options.hacks.initialize(options);

    initialized = true;
    styleNode = document.createElement('style');
    styleNode.id = 'patched-viewport';
    document.head.appendChild(styleNode);

    // Issue #6: Cross Origin Stylesheets are not accessible through CSSOM,
    // therefore download and inject them as <style> to circumvent SOP.
    importCrossOriginLinks(function() {
      var _refresh = debounce(refresh, options.refreshDebounceWait || 100);
      // doing a full refresh rather than updateStyles because an orientationchange
      // could activate different stylesheets
      window.addEventListener('orientationchange', _refresh, true);
      // orientationchange might have happened while in a different window
      window.addEventListener('pageshow', _refresh, true);

      if (options.force || isOldInternetExplorer || inIframe()) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }

      options.hacks && options.hacks.initializeEvents(options, refresh, _refresh);

      refresh();
    });
  }

  function updateStyles() {
    styleNode.textContent = getReplacedViewportUnits();
  }

  function refresh() {
    if (!initialized) {
      return;
    }

    findProperties();

    // iOS Safari will report window.innerWidth and .innerHeight as 0 unless a timeout is used here.
    // TODO: figure out WHY innerWidth === 0
    setTimeout(function() {
      updateStyles();
    }, 1);
  }

  function findProperties() {
    declarations = [];
    forEach.call(document.styleSheets, function(sheet) {
      if (sheet.ownerNode.id === 'patched-viewport' || !sheet.cssRules || sheet.ownerNode.getAttribute('data-viewport-units-buggyfill') === 'ignore') {
        // skip entire sheet because no rules are present, it's supposed to be ignored or it's the target-element of the buggyfill
        return;
      }

      if (sheet.media && sheet.media.mediaText && window.matchMedia && !window.matchMedia(sheet.media.mediaText).matches) {
        // skip entire sheet because media attribute doesn't match
        return;
      }

      forEach.call(sheet.cssRules, findDeclarations);
    });

    return declarations;
  }

  function findDeclarations(rule) {
    if (rule.type === 7) {
      var value;

      // there may be a case where accessing cssText throws an error.
      // I could not reproduce this issue, but the worst that can happen
      // this way is an animation not running properly.
      // not awesome, but probably better than a script error
      // see https://github.com/rodneyrehm/viewport-units-buggyfill/issues/21
      try {
        value = rule.cssText;
      } catch(e) {
        return;
      }

      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        // KeyframesRule does not have a CSS-PropertyName
        declarations.push([rule, null, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, null, value);
      }

      return;
    }

    if (!rule.style) {
      if (!rule.cssRules) {
        return;
      }

      forEach.call(rule.cssRules, function(_rule) {
        findDeclarations(_rule);
      });

      return;
    }

    forEach.call(rule.style, function(name) {
      var value = rule.style.getPropertyValue(name);
      viewportUnitExpression.lastIndex = 0;
      if (viewportUnitExpression.test(value)) {
        declarations.push([rule, name, value]);
        options.hacks && options.hacks.findDeclarations(declarations, rule, name, value);
      }
    });
  }

  function getReplacedViewportUnits() {
    dimensions = getViewport();

    var css = [];
    var buffer = [];
    var open;
    var close;

    declarations.forEach(function(item) {
      var _item = overwriteDeclaration.apply(null, item);
      var _open = _item.selector.length ? (_item.selector.join(' {\n') + ' {\n') : '';
      var _close = new Array(_item.selector.length + 1).join('\n}');

      if (!_open || _open !== open) {
        if (buffer.length) {
          css.push(open + buffer.join('\n') + close);
          buffer.length = 0;
        }

        if (_open) {
          open = _open;
          close = _close;
          buffer.push(_item.content);
        } else {
          css.push(_item.content);
          open = null;
          close = null;
        }

        return;
      }

      if (_open && !open) {
        open = _open;
        close = _close;
      }

      buffer.push(_item.content);
    });

    if (buffer.length) {
      css.push(open + buffer.join('\n') + close);
    }

    // Opera Mini messes up on the content hack (it replaces the DOM node's innerHTML with the value).
    // This fixes it. We test for Opera Mini only since it is the most expensive CSS selector
    // see https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors
    if (isOperaMini) {
      css.push('* { content: normal !important; }');
    }

    return css.join('\n\n');
  }

  function overwriteDeclaration(rule, name, value) {
    var _value;
    var _selectors = [];

    _value = value.replace(viewportUnitExpression, replaceValues);

    if (options.hacks) {
      _value = options.hacks.overwriteDeclaration(rule, name, _value);
    }

    if (name) {
      // skipping KeyframesRule
      _selectors.push(rule.selectorText);
      _value = name + ': ' + _value + ';';
    }

    var _rule = rule.parentRule;
    while (_rule) {
      _selectors.unshift('@media ' + _rule.media.mediaText);
      _rule = _rule.parentRule;
    }

    return {
      selector: _selectors,
      content: _value
    };
  }

  function replaceValues(match, number, unit) {
    var _base = dimensions[unit];
    var _number = parseFloat(number) / 100;
    return (_number * _base) + 'px';
  }

  function getViewport() {
    var vh = window.innerHeight;
    var vw = window.innerWidth;

    return {
      vh: vh,
      vw: vw,
      vmax: Math.max(vw, vh),
      vmin: Math.min(vw, vh)
    };
  }

  function importCrossOriginLinks(next) {
    var _waiting = 0;
    var decrease = function() {
      _waiting--;
      if (!_waiting) {
        next();
      }
    };

    forEach.call(document.styleSheets, function(sheet) {
      if (!sheet.href || origin(sheet.href) === origin(location.href)) {
        // skip <style> and <link> from same origin
        return;
      }

      _waiting++;
      convertLinkToStyle(sheet.ownerNode, decrease);
    });

    if (!_waiting) {
      next();
    }
  }

  function origin(url) {
    return url.slice(0, url.indexOf('/', url.indexOf('://') + 3));
  }

  function convertLinkToStyle(link, next) {
    getCors(link.href, function() {
      var style = document.createElement('style');
      style.media = link.media;
      style.setAttribute('data-href', link.href);
      style.textContent = this.responseText;
      link.parentNode.replaceChild(style, link);
      next();
    }, next);
  }

  function getCors(url, success, error) {
    var xhr = new XMLHttpRequest();
    if ('withCredentials' in xhr) {
      // XHR for Chrome/Firefox/Opera/Safari.
      xhr.open('GET', url, true);
    } else if (typeof XDomainRequest !== 'undefined') {
      // XDomainRequest for IE.
      xhr = new XDomainRequest();
      xhr.open('GET', url);
    } else {
      throw new Error('cross-domain XHR not supported');
    }

    xhr.onload = success;
    xhr.onerror = error;
    xhr.send();
    return xhr;
  }

  return {
    version: '0.5.0',
    findProperties: findProperties,
    getCss: getReplacedViewportUnits,
    init: initialize,
    refresh: refresh
  };

}));
/*!
 * viewport-units-buggyfill.hacks v0.5.0
 * @web: https://github.com/rodneyrehm/viewport-units-buggyfill/
 * @author: Zoltan Hawryluk - http://www.useragentman.com/
 */

(function (root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.viewportUnitsBuggyfillHacks = factory();
  }
}(this, function () {
  'use strict';

  var options;
  var calcExpression = /calc\(/g;
  var quoteExpression = /[\"\']/g;
  var urlExpression = /url\([^\)]*\)/g;
  var isOldInternetExplorer = false;
  var supportsVminmax = true;
  var supportsVminmaxCalc = true;

  // WARNING!
  // Do not remove the following conditional comment.
  // It is required to identify the current version of IE

  /*@cc_on
  @if (@_jscript_version <= 10)
    isOldInternetExplorer = true;
    supportsVminmaxCalc = false;
    supportsVminmax = false;
  @end
  @*/

  // iOS SAFARI, IE9, or Stock Android: abuse "content" if "viewport-units-buggyfill" specified
  function checkHacks(declarations, rule, name, value) {
    var needsHack = name === 'content' && value.indexOf('viewport-units-buggyfill') > -1;
    if (!needsHack) {
      return;
    }

    var fakeRules = value.replace(quoteExpression, '');
    fakeRules.split(';').forEach(function(fakeRuleElement) {
      var fakeRule = fakeRuleElement.split(':');
      if (fakeRule.length !== 2) {
        return;
      }

      var name = fakeRule[0].trim();
      if (name === 'viewport-units-buggyfill') {
        return;
      }

      var value = fakeRule[1].trim();
      declarations.push([rule, name, value]);
      if (calcExpression.test(value)) {
        var webkitValue = value.replace(calcExpression, '-webkit-calc(');
        declarations.push([rule, name, webkitValue]);
      }
    });
  }

  return {
    required: function(options) {
      return options.isMobileSafari || isOldInternetExplorer;
    },

    initialize: function(initOptions) {
      options = initOptions;

      // Test viewport units support in calc() expressions
      var div = document.createElement('div');
      div.style.width = '1vmax';
      supportsVminmax = div.style.width !== '';

      // there is no accurate way to detect this programmatically.
      if (options.isMobileSafari || options.isBadStockAndroid) {
        supportsVminmaxCalc = false;
      }

    },

    initializeEvents: function(options, refresh, _refresh) {
      if (options.force) {
        return;
      }

      if (isOldInternetExplorer && !options._listeningToResize) {
        window.addEventListener('resize', _refresh, true);
        options._listeningToResize = true;
      }
    },

    findDeclarations: function(declarations, rule, name, value) {
      if (name === null) {
        // KeyframesRule does not have a CSS-PropertyName
        return;
      }

      checkHacks(declarations, rule, name, value);
    },

    overwriteDeclaration: function(rule, name, _value) {
      if (isOldInternetExplorer && name === 'filter') {
        // remove unit "px" from complex value, e.g.:
        // filter: progid:DXImageTransform.Microsoft.DropShadow(OffX=5.4px, OffY=3.9px, Color=#000000);
        _value = _value.replace(/px/g, '');
      }

      return _value;
    }
  };

}));
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
      } else if ( !$('.timeline-block:last-child')[0] ) {
        $('#timeline').html(newElement);
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

(function(window) {
  'use strict';

  function getSocketIOUrl(){
    return window.location.origin.indexOf('localhost') === -1 ?
            '//burburinho.herokuapp.com' :
            '//localhost:5000';
  }

  var CONFIG = {
    FACEBOOK_ID: 1500652936893411,
    OFFSET: 0.8,
    URL_COBERTURA: 'http://cobertura.brasildefato.com.br',
    URL_SOCIAL_SHARE_IMAGE: 'http://cobertura.brasildefato.com.br/assets/img/logo.jpg',
    URL_BUFFER_INFO: getSocketIOUrl()+'/api/burburinhos',
    URL_SOCKET_IO: getSocketIOUrl()
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


function RenderException(message) {
   this.message = message;
   this.name = 'RenderException';
}

(function(window) {
  'use strict';

  var AbstractTimeLineBlock = {
    render: function(data) {
      throw new RenderException('Render method wasn\'t implemented!');
    },
    getSocialNetworkHTML: function(data) {
      var imageToShare;

      if (data.type === 'photo' || data.type === 'quote') {
        imageToShare = data.url;
      } else if(data.type === 'gallery') {
        imageToShare = data.content[0].url;
      } else {
        imageToShare = CONFIG.URL_SOCIAL_SHARE_IMAGE;
      }

      return '<div class="logos">'+
        '<div class="social-small">'+
          '<a target="_blank" href="//www.twitter.com/share?url=' + CONFIG.URL_COBERTURA + '&via=Brasil_de_Fato&related=Brasil_de_Fato&text=' + document.title + '" >' +
            '<i class="fa fa-twitter"></i>'+
          '</a>' +
        '</div>'+
        '<div class="social-small">' +
          '<a href="//www.facebook.com/dialog/feed?app_id=' + CONFIG.FACEBOOK_ID + '&display=popup&href=' + CONFIG.URL_COBERTURA + '&redirect_uri=' + CONFIG.URL_COBERTURA + '&picture=' + imageToShare + '&name=' + document.title + '&description=' + escape(data.content) + '&link=' + CONFIG.URL_COBERTURA + '" target="_blank">' +
            '<i class="fa fa-facebook"></i>' +
          '</a>' +
        '</div>' +
      '</div>';
    }
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return AbstractTimeLineBlock;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = AbstractTimeLineBlock.attach;
    module.exports.AbstractTimeLineBlock = AbstractTimeLineBlock;
  } else {
    window.AbstractTimeLineBlock = AbstractTimeLineBlock;
  }

})(window);

(function(window) {
  'use strict';

  var TimeLineBlockGallery = {};

  extend(TimeLineBlockGallery, window.AbstractTimeLineBlock);

  TimeLineBlockGallery.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    var images = data.content.map(function(item){
      return '<img src="' + getOptmizedImageUrl(item.url) + '" alt="' + item.description + '"/>';
    });

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
          '<i class="fa fa-picture-o"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content gallery">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<section class="photos">' +
          images.join('') +
        '</section>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockGallery;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockGallery.attach;
    module.exports.TimeLineBlockGallery = TimeLineBlockGallery;
  } else {
    window.TimeLineBlockGallery = TimeLineBlockGallery;
  }

})(window);

(function(window) {
  'use strict';

  var TimeLineBlockPhoto = {};

  extend(TimeLineBlockPhoto, window.AbstractTimeLineBlock);

  TimeLineBlockPhoto.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-camera-retro"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content photo">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<img src="' + getOptmizedImageUrl(data.url) + '" alt="manifestação"/>' +
        '<p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockPhoto;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockPhoto.attach;
    module.exports.TimeLineBlockPhoto = TimeLineBlockPhoto;
  } else {
    window.TimeLineBlockPhoto = TimeLineBlockPhoto;
  }

})(window);

(function(window) {
  'use strict';

  var TimeLineBlockQuote = {};

  extend(TimeLineBlockQuote, window.AbstractTimeLineBlock);

  TimeLineBlockQuote.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
      '  <i class="fa fa-quote-left"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content quote">' +
        '<h2 class="estado">' + data.local + '</h2>' +
      '  <img class="perfil" src="' + getOptmizedImageUrl(data.url) + '" alt="foto perfil"/>' +
      '  <p>' + data.content + '</p>' +
      TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockQuote;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockQuote.attach;
    module.exports.TimeLineBlockQuote = TimeLineBlockQuote;
  } else {
    window.TimeLineBlockQuote = TimeLineBlockQuote;
  }

})(window);

(function(window) {
  'use strict';
  var TimeLineBlockText = {};
  var CONFIG = window.CONFIG;

  extend(TimeLineBlockText, window.AbstractTimeLineBlock);

  TimeLineBlockText.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
    '  <figure class="timeline-img">' +
    '    <i class="fa fa-align-justify"></i>' +
    '  </figure>' +
    '<time class="data-hora">' + formattedDate +
    '    <strong class="hora">' + formattedDateHour + '</strong>' +
    '</time>' +
      '<article class="timeline-content text">' +
        '<h2 class="estado">' + data.local + '</h2>' +
    '    <p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
    '  </article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockText;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockText.attach;
    module.exports.TimeLineBlockText = TimeLineBlockText;
  } else {
    window.TimeLineBlockText = TimeLineBlockText;
  }

})(window);

(function(window) {
  'use strict';

  var TimeLineBlockVideo = {};

  extend(TimeLineBlockVideo, window.AbstractTimeLineBlock);

  TimeLineBlockVideo.render = function(data) {
    var formattedDate = getFormattedDate(data.timestamp);
    var formattedDateHour = getFormattedHourAndMinutes(data.timestamp);

    return '<div class="timeline-block">' +
      '<figure class="timeline-img">' +
        '<i class="fa fa-video-camera fa-4"></i>' +
      '</figure>' +
      '<time class="data-hora">' + formattedDate +
      '    <strong class="hora">' + formattedDateHour + '</strong>' +
      '</time>' +
      '<article class="timeline-content video">' +
        '<h2 class="estado">' + data.local + '</h2>' +
        '<div class="video-wrapper">' +
          '<iframe src="' + data.url + '"></iframe>' +
        '</div>' +
        '<p>' + data.content + '</p>' +
        TimeLineBlockText.getSocialNetworkHTML(data) +
      '</article>' +
    '</div>';
  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineBlockVideo;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineBlockVideo.attach;
    module.exports.TimeLineBlockVideo = TimeLineBlockVideo;
  } else {
    window.TimeLineBlockVideo = TimeLineBlockVideo;
  }

})(window);

(function(window) {
  'use strict';

  var _data = [];
  var _pageSize = 10;
  var _currentPage = 0;
  var CONFIG = window.CONFIG;

  var TimeLineStore = {};

  function startFrom () {
    _currentPage += 1;
    var filteredData = [];
    if(_data.length > 0) {
      for(var i = 0; _pageSize > i; i++) {
        if (!!_data[i]){
          filteredData.push(_data[i]);
          _data.shift();
        }
      }
    }
    return filteredData;
  }

  TimeLineStore = {

    setData: function(data) {
      _data = data;
    },

    remove: function(item) {
      var index = _data.filter( function (element, pos) {
        if(element.timestamp === item.timestamp) {
          return pos;
        }
      });
      _data.splice(index, 1);
    },

    getLocalOldestInformations: function() {
      return startFrom();
    },

    numberOfPages: function() {
      return Math.ceil(_data.length / _pageSize);
    },

    getBufferInformations: function() {
      return $.getJSON(CONFIG.URL_BUFFER_INFO);
    }

  };

  if (typeof define !== 'undefined' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function() {
      return TimeLineStore;
    });
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimeLineStore.attach;
    module.exports.TimeLineStore = TimeLineStore;
  } else {
    window.TimeLineStore = TimeLineStore;
  }

})(window);

$(document).ready(function() {

  $('.button-new-content').click(function() {
    $('html, body').animate({
      scrollTop: $('main').offset().top
    }, 800);
    $(this).fadeOut().addClass('is-hidden');
    return false;
  });

  var timeLineStore = window.TimeLineStore;
  var timelineBlocks = window.TimelineBlocks;
  var CONFIG = window.CONFIG;

  timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

  function addImageInHightlightsContent(element) {
    if (element.type === 'photo') {
      $('.choose-photos').html(
        $('.choose-photos').html() +
        '<a class="photo" href="' + getOptmizedImageUrl(element.url) + '">' +
          '<img class="highlight-photo" src="' + getOptmizedImageUrl(element.url) + '" alt="' + element.content + '" width="90" height="60">' +
        '</a>');
    }
  }

  var socket = io.connect(CONFIG.URL_SOCKET_IO);

  timeLineStore.getBufferInformations(CONFIG.URL_BUFFER_INFO).then(function(items){

    timeLineStore.setData(items);

    if (items.length > 0) {
      for(var i = 0; items.length > i; i++) {
        timelineBlocks.render(items[i], false);
        addImageInHightlightsContent(items[i]);
        timeLineStore.remove(items[i]);
      }
    }

    socket.on('burburinho', function (data) {

      timeLineStore.remove(data.message);

      timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
      timelineBlocks.render(data.message, true);
      addImageInHightlightsContent(data.message);

      timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);
    });

    $(window).on('scroll', function(){
      var containsSomegallery = false;
      var $lastTimelineItem = $('.timeline-block:last-child');
      var lastElementIsVisible = ($lastTimelineItem.size() > 0) ?
                                  timelineBlocks.elementIsVisibleOnViewport($lastTimelineItem, CONFIG.OFFSET) :
                                  true;

      timelineBlocks.showBlocksInViewport(CONFIG.OFFSET);
      if (!lastElementIsVisible) {
        return;
      }

      var localData = timeLineStore.getLocalOldestInformations();

      if (localData.length === 0) {
        return;
      }

      $.each(localData, function(item, element){

        timelineBlocks.render(element, false);
        addImageInHightlightsContent(element);
      });

      timelineBlocks.hideBlocksOutsideViewport(CONFIG.OFFSET);

    });
  });

});
