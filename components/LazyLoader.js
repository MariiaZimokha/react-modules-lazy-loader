"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _IntersectionObserverMg = _interopRequireDefault(require("./IntersectionObserverMg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var LazyLoader =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LazyLoader, _React$Component);

  function LazyLoader(props) {
    var _this;

    _classCallCheck(this, LazyLoader);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LazyLoader).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "onIntersection", function (entry) {
      if (!_this.state.hasIntersected && entry && entry.isIntersecting) {
        _this.setState({
          hasIntersected: true
        });

        _this.observer.unobserve(entry.target);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "createObserver", function () {
      var _this$props = _this.props,
          root = _this$props.root,
          margin = _this$props.margin,
          threshold = _this$props.threshold;
      var options = {
        root: root,
        margin: margin,
        threshold: threshold
      };
      _this.observer = _IntersectionObserverMg["default"].getInstance(_this.onIntersection, options, _this.target.current);

      _this.observer.observe(_this.target.current);
    });

    _this.target = _react["default"].createRef();
    _this.state = {
      hasIntersected: false
    };
    return _this;
  }

  _createClass(LazyLoader, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (typeof window.IntersectionObserver === 'undefined') {
        console.log('this is somethinf');
        Promise.resolve().then(function () {
          return _interopRequireWildcard(require("intersection-observer"));
        }).then(this.createObserver);
      } else {
        this.createObserver();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.observer.unobserve(this.target.current);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          placeholder = _this$props2.placeholder;
      var hasIntersected = this.state.hasIntersected;

      var showPlaceholder = placeholder || _react["default"].createElement("div", {
        style: {
          height: '300px'
        }
      });

      return _react["default"].cloneElement(hasIntersected ? children : showPlaceholder, {
        ref: this.target
      });
    }
  }]);

  return LazyLoader;
}(_react["default"].Component);

exports["default"] = LazyLoader;

_defineProperty(LazyLoader, "defaultProps", {
  root: null,
  margin: '0px',
  threshold: 0,
  children: null
});