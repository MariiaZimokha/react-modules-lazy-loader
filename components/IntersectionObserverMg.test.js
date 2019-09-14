"use strict";

var _IntersectionObserverMg = _interopRequireDefault(require("./IntersectionObserverMg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('IntersectionObserverMg', function () {
  var IntersectionObserverOriginal = global.IntersectionObserver;
  var window = global.window;
  beforeEach(function () {
    global.IntersectionObserver = jest.fn();
    global.window.IntersectionObserver = jest.fn();
    delete _IntersectionObserverMg["default"].observer;

    _IntersectionObserverMg["default"].allObservers.clear();
  });
  afterEach(function () {
    global.IntersectionObserver = IntersectionObserverOriginal;
    global.window = window;
  });
  describe('onChange', function () {
    test('if callback exists', function () {
      var mapKey = {
        key: 'target'
      };
      var entries = [{
        target: mapKey
      }];
      var onIntersection = jest.fn();

      _IntersectionObserverMg["default"].allTargets.set(mapKey, {
        onIntersection: onIntersection
      });

      _IntersectionObserverMg["default"].onChange(entries);

      expect(onIntersection).toBeCalled();
    });
    test('if callback does not exist', function () {
      var mapKey = {
        key: 'target'
      };
      var entries = [{
        target: {
          key: 'target1'
        }
      }];
      var onIntersection = jest.fn();

      _IntersectionObserverMg["default"].allTargets.set(mapKey, {
        onIntersection: onIntersection
      });

      _IntersectionObserverMg["default"].onChange(entries);

      expect(onIntersection).not.toBeCalled();
    });
  });
  describe('getInstance', function () {
    test('creates new instance', function () {
      var options = {
        root: null,
        margin: '0px',
        threshold: 0
      };
      var onIntersection = jest.fn();
      var observe = jest.fn();
      var target = {};
      global.IntersectionObserver.mockReturnValue({
        observe: observe
      });

      _IntersectionObserverMg["default"].getInstance(onIntersection, options, target);

      expect(global.IntersectionObserver).toBeCalled();
    });
    test('uses existing instance', function () {
      var options = {
        root: null,
        margin: '0px',
        threshold: 0
      };
      var onIntersection = jest.fn();
      var observe = jest.fn();
      var target = {};
      global.IntersectionObserver.mockReturnValue({
        observe: observe
      });

      _IntersectionObserverMg["default"].getInstance(onIntersection, options, target);

      _IntersectionObserverMg["default"].getInstance(onIntersection, options, target);

      expect(global.IntersectionObserver.mock.calls.length).toEqual(1);
    });
  });
});