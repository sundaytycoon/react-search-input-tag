'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./SearchInputTag.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SearchInputTag = function (_Component) {
  _inherits(SearchInputTag, _Component);

  function SearchInputTag() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SearchInputTag);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SearchInputTag.__proto__ || Object.getPrototypeOf(SearchInputTag)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      findList: [],
      cursor: -2
    }, _this.onKeyDown = function (e) {
      _this.props.onKeyDown(e);
      var keyCode = e.keyCode;

      if (keyCode === 38) {
        if (_this.state.cursor > 0) {
          // up
          _this.setState({ cursor: _this.state.cursor - 1 });
          var activeElement = _this.areaFindList.getElementsByTagName('li');
          if (activeElement.length !== 0) {
            activeElement = activeElement[_this.state.cursor - 1];
            _this.areaFindList.scrollTo(0, activeElement.offsetTop);
          }
        }
      } else if (keyCode === 40) {
        // down
        if (_this.state.cursor < _this.state.findList.length - 1) {
          _this.setState({ cursor: _this.state.cursor + 1 });
          var _activeElement = _this.areaFindList.getElementsByTagName('li');
          if (_this.state.cursor !== -2 && _activeElement.length !== 0) {
            _activeElement = _activeElement[_this.state.cursor + 1];
            _this.areaFindList.scrollTo(0, _activeElement.offsetTop);
          }
        }
      } else if (keyCode === 13) {
        // enter
        if (_this.state.findList.length !== 0 && _this.state.cursor > -1) {
          _this.onSelect(_this.state.findList[_this.state.cursor].value, _this.state.findList[_this.state.cursor].id);
        }
      } else if (keyCode === 27) _this.onSelect('', ''); // esc
    }, _this.onSelect = function (value, id) {
      _this.props.onSelect(value, id);
      _this.setState({ cursor: -2, findList: _this.findList(value) });
    }, _this.onChange = function (value) {
      var findList = _this.findList(value);
      var correct = _this.props.itemList.filter(function (v) {
        return v.value === value;
      });
      if (correct.length === 1) {
        _this.setState({ cursor: -2, findList: findList });
        _this.props.onSelect(correct[0].value, correct[0].id);
        return false;
      }

      if (!value) {
        _this.setState({ cursor: -2, findList: findList });
        return false;
      }
      _this.setState({ cursor: -1, findList: findList });
      return true;
    }, _this.onFocus = function (e) {
      _this.props.onFocus(e);
      _this.setState({ cursor: -1 });
    }, _this.onBlur = function (e) {
      _this.props.onBlur(e);
      _this.setState({ cursor: -2 });
    }, _this.makeList = function (list) {
      return list.map(function (v, index) {
        return _react2.default.createElement(
          'li',
          {
            className: 'ist-li ' + _this.props.liClassName + ' ' + (_this.state.cursor === index ? 'active' : ''),
            key: index,
            value: v.id,
            onClick: function onClick() {
              _this.onSelect(v.value, v.id);
            }
          },
          v.labelEl
        );
      });
    }, _this.findList = function (text) {
      if (!_this.props.itemList.length) return [];
      var list = _this.props.itemList.map(function (item) {
        var itemTemp = item;

        var labelSpells = itemTemp.value.replace(/\s/g, ' ').split('');
        var inputSpells = text.replace(/\s/g, ' ').split('');
        var inputsIndex = 0;
        var incorrectIndexOfs = [];
        var correctIndexOfs = [];
        var labelEl = labelSpells.map(function (labelSpell, labelIndex) {
          if (inputSpells[inputsIndex] === labelSpell) {
            inputsIndex += 1;
            correctIndexOfs.push(labelIndex);
            return _react2.default.createElement(
              'span',
              { key: labelIndex, className: 'match ' + _this.props.matchedWordClassName },
              labelSpell
            );
          }
          incorrectIndexOfs.push(labelIndex);
          return _react2.default.createElement(
            'span',
            { key: labelIndex, className: '' + _this.props.unmatchedWordClassName },
            labelSpell
          );
        });
        itemTemp.labelEl = labelEl;
        itemTemp.incorrectIndexOfs = incorrectIndexOfs;
        itemTemp.correctIndexOfs = correctIndexOfs;
        itemTemp.incorrectPriority = incorrectIndexOfs.reduce(function (a, b) {
          return a + b;
        }, 0);
        itemTemp.correctPriority = correctIndexOfs.reduce(function (a, b) {
          return a + b;
        }, 0);

        return itemTemp;
      }).filter(function (item) {
        return item.correctIndexOfs !== 0 && item.correctIndexOfs.length === text.length;
      });

      var obj = {};
      var result = [];
      list.forEach(function (item) {
        if (obj[item.correctPriority]) {
          obj[item.correctPriority].push(item);
        } else {
          obj[item.correctPriority] = [item];
        }
        obj[item.correctPriority].sort(function (prev, curr) {
          if (prev.incorrectPriority < curr.incorrectPriority) return -1;
          if (curr.incorrectPriority < prev.incorrectPriority) return 1;
          return 0;
        });
      });

      Object.keys(obj).map(function (v) {
        return parseInt(v, 10);
      }).forEach(function (v) {
        result.push.apply(result, _toConsumableArray(obj[v]));
      });

      return result;
    }, _this.updateThrottle = function (value) {
      _this.props.onChange(value);
      if (_this.throttleTimeout) clearTimeout(_this.throttleTimeout);
      _this.throttleTimeout = setTimeout(function () {
        _this.onChange(value);
      }, _this.props.throttle);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SearchInputTag, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var itemList = this.props.itemList;

      this.setState({ itemList: itemList, findList: itemList.map(function (v) {
          return _extends({ labelEl: v.value }, v);
        }) });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          InputElement = _props.InputElement,
          wrapperClassName = _props.wrapperClassName,
          className = _props.className,
          ulClassName = _props.ulClassName,
          notExist = _props.notExist,
          restProps = _objectWithoutProperties(_props, ['value', 'InputElement', 'wrapperClassName', 'className', 'ulClassName', 'notExist']);

      Object.keys(SearchInputTag.defaultProps).forEach(function (v) {
        delete restProps[v];
      });
      var liFindList = this.makeList(this.state.findList);
      return _react2.default.createElement(
        'div',
        {
          className: 'ist-div ' + wrapperClassName,
          onFocus: this.onFocus,
          onBlur: this.onBlur,
          tabIndex: '-1'
        },
        _react2.default.cloneElement(InputElement, _extends({
          className: 'ist-input ' + className,
          type: 'search',
          value: value,
          onChange: function onChange(event) {
            return _this2.updateThrottle(event.target.value);
          },
          onKeyDown: this.onKeyDown
        }, restProps)),
        _react2.default.createElement(
          'ul',
          {
            className: 'ist-ul ' + ulClassName + ' ' + (this.state.cursor === -2 ? 'hide' : ''),
            ref: function ref(_ref2) {
              return _this2.areaFindList = _ref2;
            }
          },
          notExist ? liFindList.concat(_react2.default.createElement(
            'li',
            {
              className: 'ist-li not-exist ' + this.props.liClassName,
              key: liFindList.length
            },
            notExist
          )) : liFindList
        )
      );
    }
  }]);

  return SearchInputTag;
}(_react.Component);

SearchInputTag.defaultProps = {
  value: '', // value
  onSelect: function onSelect() {}, // onSelect
  onChange: function onChange() {}, // onChange
  itemList: [], // search List
  InputElement: _react2.default.createElement('input', null), // default `input` tag
  placeholder: '',
  throttle: 200, // setTimeout then execute `onChange`
  notExist: null,
  onFocus: function onFocus() {}, // when this input focused in
  onBlur: function onBlur() {}, // when this input focused out
  onKeyDown: function onKeyDown() {}, // when you typed arrow keys

  wrapperClassName: '', // wrapper's className
  className: '', // input's className
  ulClassName: '', // ul's className
  liClassName: '', // li's className
  matchedWordClassName: '', // matched word's className
  unmatchedWordClassName: '', // un-matched word's classNamee
  notExistClassName: '' // If any user can't find the item on your results, You can show one `li` tag
};

SearchInputTag.propTypes = {
  // required
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  itemList: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.string.isRequired,
    id: _propTypes2.default.string
  })),

  // not required
  notExist: _propTypes2.default.element,
  InputElement: _propTypes2.default.element,
  placeholder: _propTypes2.default.string,
  throttle: _propTypes2.default.number,

  onKeyDown: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  onFocus: _propTypes2.default.func,

  wrapperClassName: _propTypes2.default.string,
  className: _propTypes2.default.string,
  ulClassName: _propTypes2.default.string,
  liClassName: _propTypes2.default.string,
  matchedWordClassName: _propTypes2.default.string,
  unmatchedWordClassName: _propTypes2.default.string,
  notExistClassName: _propTypes2.default.string
};

exports.default = SearchInputTag;