"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IntersectionObserverSingleton =
/*#__PURE__*/
function () {
  function IntersectionObserverSingleton() {
    _classCallCheck(this, IntersectionObserverSingleton);
  }

  _createClass(IntersectionObserverSingleton, null, [{
    key: "getInstance",
    value: function getInstance(onIntersection, options, ref) {
      var key = Object.values(options).join(',');
      var observer = IntersectionObserverSingleton.allObservers.get(key);
      IntersectionObserverSingleton.allTargets.set(ref, {
        onIntersection: onIntersection
      });

      if (!observer) {
        var newObserver = new IntersectionObserver(IntersectionObserverSingleton.onChange, options);
        IntersectionObserverSingleton.allObservers.set(key, newObserver);
        return newObserver;
      }

      return observer;
    }
  }, {
    key: "onChange",
    value: function onChange(entries) {
      entries.forEach(function (entry) {
        var target = entry.target;
        var instance = IntersectionObserverSingleton.allTargets.get(target);

        if (instance) {
          instance.onIntersection(entry);
        }
      });
    }
  }]);

  return IntersectionObserverSingleton;
}();

exports["default"] = IntersectionObserverSingleton;

_defineProperty(IntersectionObserverSingleton, "allTargets", new Map());

_defineProperty(IntersectionObserverSingleton, "allObservers", new Map());