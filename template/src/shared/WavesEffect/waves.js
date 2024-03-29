/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable strict */
(function (window) {
  "use strict";
  var Waves = Waves || {};
  var $$ = document.querySelectorAll.bind(document);
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }
  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  function offset(elem) {
    var docElem,
      win,
      box = { top: 0, left: 0 },
      doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft,
    };
  }
  function convertStyle(obj) {
    var style = "";
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ":" + obj[a] + ";";
      }
    }
    return style;
  }
  var Effect = {
    duration: 750,
    show: function (e, element) {
      if (e.button === 2) {
        return !1;
      }
      var el = element || this;
      var ripple = document.createElement("div");
      ripple.className = "waves-ripple";
      el.appendChild(ripple);
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = "scale(" + (el.clientWidth / 100) * 10 + ")";
      if ("touches" in e) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }
      ripple.setAttribute("data-hold", Date.now());
      ripple.setAttribute("data-scale", scale);
      ripple.setAttribute("data-x", relativeX);
      ripple.setAttribute("data-y", relativeY);
      var rippleStyle = { top: relativeY + "px", left: relativeX + "px" };
      ripple.className = ripple.className + " waves-notransition";
      ripple.setAttribute("style", convertStyle(rippleStyle));
      ripple.className = ripple.className.replace("waves-notransition", "");
      rippleStyle["-webkit-transform"] = scale;
      rippleStyle["-moz-transform"] = scale;
      rippleStyle["-ms-transform"] = scale;
      rippleStyle["-o-transform"] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = "1";
      rippleStyle["-webkit-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-moz-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-o-transition-duration"] = Effect.duration + "ms";
      rippleStyle["transition-duration"] = Effect.duration + "ms";
      rippleStyle["-webkit-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-moz-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-o-transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["transition-timing-function"] =
        "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      ripple.setAttribute("style", convertStyle(rippleStyle));
    },
    hide: function (e) {
      TouchHandler.touchup(e);
      var el = this;
      var width = el.clientWidth * 1.4;
      var ripple = null;
      var ripples = el.getElementsByClassName("waves-ripple");
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return !1;
      }
      var relativeX = ripple.getAttribute("data-x");
      var relativeY = ripple.getAttribute("data-y");
      var scale = ripple.getAttribute("data-scale");
      var diff = Date.now() - Number(ripple.getAttribute("data-hold"));
      var delay = 350 - diff;
      if (delay < 0) {
        delay = 0;
      }
      setTimeout(function () {
        var style = {
          top: relativeY + "px",
          left: relativeX + "px",
          opacity: "0",
          "-webkit-transition-duration": Effect.duration + "ms",
          "-moz-transition-duration": Effect.duration + "ms",
          "-o-transition-duration": Effect.duration + "ms",
          "transition-duration": Effect.duration + "ms",
          "-webkit-transform": scale,
          "-moz-transform": scale,
          "-ms-transform": scale,
          "-o-transform": scale,
          transform: scale,
        };
        ripple.setAttribute("style", convertStyle(style));
        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return !1;
          }
        }, Effect.duration);
      }, delay);
    },
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];
        if (el.tagName.toLowerCase() === "input") {
          var parent = el.parentNode;
          if (
            parent.tagName.toLowerCase() === "i" &&
            parent.className.indexOf("waves-effect") !== -1
          ) {
            continue;
          }
          var wrapper = document.createElement("i");
          wrapper.className = el.className + " waves-input-wrapper";
          var elementStyle = el.getAttribute("style");
          if (!elementStyle) {
            elementStyle = "";
          }
          wrapper.setAttribute("style", elementStyle);
          el.className = "waves-button-input";
          el.removeAttribute("style");
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    },
  };
  var TouchHandler = {
    touches: 0,
    allowEvent: function (e) {
      var allow = !0;
      if (e.type === "touchstart") {
        TouchHandler.touches += 1;
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      } else if (e.type === "mousedown" && TouchHandler.touches > 0) {
        allow = !1;
      }
      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    },
  };
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === !1) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;
    while (target.parentElement !== null) {
      if (
        !(target instanceof SVGElement) &&
        target.className.indexOf("waves-effect") !== -1
      ) {
        element = target;
        break;
      } else if (target.classList.contains("waves-effect")) {
        element = target;
        break;
      }
      target = target.parentElement;
    }
    return element;
  }
  function showEffect(e) {
    var element = getWavesEffectElement(e);
    if (element !== null) {
      Effect.show(e, element);
      if ("ontouchstart" in window) {
        element.addEventListener("touchend", Effect.hide, !1);
        element.addEventListener("touchcancel", Effect.hide, !1);
      }
      element.addEventListener("mouseup", Effect.hide, !1);
      element.addEventListener("mouseleave", Effect.hide, !1);
    }
  }
  Waves.displayEffect = function (options) {
    options = options || {};
    if ("duration" in options) {
      Effect.duration = options.duration;
    }
    Effect.wrapInput($$(".waves-effect"));
    if ("ontouchstart" in window) {
      document.body.addEventListener("touchstart", showEffect, !1);
    }
    document.body.addEventListener("mousedown", showEffect, !1);
  };
  Waves.attach = function (element) {
    if (element.tagName.toLowerCase() === "input") {
      Effect.wrapInput([element]);
      element = element.parentElement;
    }
    if ("ontouchstart" in window) {
      element.addEventListener("touchstart", showEffect, !1);
    }
    element.addEventListener("mousedown", showEffect, !1);
  };
  window.Waves = Waves;
  document.addEventListener(
    "DOMContentLoaded",
    function () {
      Waves.displayEffect();
    },
    !1
  );
})(window);
