"use strict";

var _react = _interopRequireDefault(require("react"));

var _LazyLoader = _interopRequireDefault(require("./LazyLoader"));

var _enzyme = require("enzyme");

var _IntersectionObserverMg = _interopRequireDefault(require("./IntersectionObserverMg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

describe('LazyLoader', function () {
  var windowOriginal = global.window;
  var getInstanceOriginal = _IntersectionObserverMg["default"].getInstance;

  var children = _react["default"].createElement("div", null, " This is children ");

  beforeEach(function () {
    global.window.IntersectionObserver = {};
    _IntersectionObserverMg["default"].getInstance = jest.fn();
  });
  afterEach(function () {
    global.window = windowOriginal;
    _IntersectionObserverMg["default"].getInstance = getInstanceOriginal;
  });
  describe('renders ', function () {
    test('when element is not in view', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      expect(wrapper.length).toBe(1);
      expect(wrapper.find('div').prop('style')).toEqual({
        height: '300px'
      });
    });
    test('when element is in view', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      expect(wrapper.length).toBe(1);
      wrapper.setState({
        hasIntersected: true
      });
      expect(wrapper.contains(children)).toEqual(true);
    });
    test('with custom placeholder', function () {
      var placeholder = _react["default"].createElement("div", {
        style: {
          height: '200px'
        }
      });

      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children,
        placeholder: placeholder
      }), {
        disableLifecycleMethods: true
      });
      expect(wrapper.contains(placeholder)).toEqual(true);
    });
  });
  describe('componentDidMount', function () {
    test('when polyfill exists', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.createObserver = jest.fn();
      instance.componentDidMount();
      expect(instance.createObserver).toBeCalled();
    });
  });
  test('componentWillUnmount', function () {
    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
      children: children
    }), {
      disableLifecycleMethods: true
    });
    var unobserve = jest.fn();
    var instance = wrapper.instance();
    instance.observer = {
      unobserve: unobserve
    };
    instance.target = {
      current: null
    };
    instance.componentWillUnmount();
    expect(unobserve).toBeCalled();
  });
  describe('onIntersection', function () {
    var target = 'target';
    test('when element is visible', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      var entry = {
        target: target,
        isIntersecting: true
      };
      var instance = wrapper.instance();
      var unobserve = jest.fn();
      instance.observer = {
        unobserve: unobserve
      };
      instance.target = {
        current: target
      };
      instance.setState = jest.fn();
      instance.onIntersection(entry);
      expect(unobserve).toBeCalled();
      expect(instance.setState).toBeCalled();
    });
    test('when element is not visible', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      var entries = {
        target: target,
        isIntersecting: false
      };
      var instance = wrapper.instance();
      var unobserve = jest.fn();
      instance.observer = {
        unobserve: unobserve
      };
      instance.target = {
        current: target
      };
      instance.setState = jest.fn();
      instance.onIntersection(entries);
      expect(unobserve).not.toBeCalled();
      expect(instance.setState).not.toBeCalled();
    });
    test('does nothing if element has been loaded', function () {
      var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], {
        children: children
      }), {
        disableLifecycleMethods: true
      });
      var instance = wrapper.instance();
      instance.setState({
        hasIntersected: true
      });
      var unobserve = jest.fn();
      instance.observer = {
        unobserve: unobserve
      };
      instance.onIntersection();
      expect(unobserve).not.toBeCalled();
    });
  });
  test('createObserver', function () {
    var props = {
      root: null,
      margin: '0px',
      threshold: 0
    };
    var observe = jest.fn();

    _IntersectionObserverMg["default"].getInstance.mockReturnValue({
      observe: observe
    });

    var wrapper = (0, _enzyme.shallow)(_react["default"].createElement(_LazyLoader["default"], _extends({
      children: children
    }, props)), {
      disableLifecycleMethods: true
    });
    var instance = wrapper.instance();
    instance.createObserver();
    expect(observe).toBeCalled();
  });
});