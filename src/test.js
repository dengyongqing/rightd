/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-11-05 10:58:00 
 * @Last Modified by:   mikey.zhaopeng 
 * @Last Modified time: 2018-11-05 10:58:00 
 */
webpackHotUpdate(0, {

  /** */ 81(module, exports, __webpack_require__) {
    
        'use strict';
        
        Object.defineProperty(exports, "__esModule", {
          value: true
        });
        exports.default = undefined;
        
        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
        
        var _react = __webpack_require__(79);
        
        var _react2 = _interopRequireDefault(_react);
        
        var _reactDom = __webpack_require__(80);
        
        var _reactDom2 = _interopRequireDefault(_reactDom);
        
        __webpack_require__(82);
        
        var _validation = __webpack_require__(86);
        
        var _validation2 = _interopRequireDefault(_validation);
        
        var _validation3 = __webpack_require__(87);
        
        var _validation4 = _interopRequireDefault(_validation3);
        
        var _validation5 = __webpack_require__(88);
        
        var _validation6 = _interopRequireDefault(_validation5);
        
        var _lodash = __webpack_require__(89);
        
        var _lodash2 = _interopRequireDefault(_lodash);
        
        var _utils = __webpack_require__(90);
        
        var _utils2 = _interopRequireDefault(_utils);
        
        var _Controls = __webpack_require__(119);
        
        var _Controls2 = _interopRequireDefault(_Controls);
        
        var _reactTapEventPlugin = __webpack_require__(309);
        
        var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);
        
        var _darkBaseTheme = __webpack_require__(321);
        
        var _darkBaseTheme2 = _interopRequireDefault(_darkBaseTheme);
        
        var _MuiThemeProvider = __webpack_require__(223);
        
        var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
        
        var _getMuiTheme = __webpack_require__(224);
        
        var _getMuiTheme2 = _interopRequireDefault(_getMuiTheme);
        
        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
        
        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
        
        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
        
        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
        // import validationCompare from './validationCompare';
        // let validation1 = validation;
        
        // import object      from './object';
        
        
        // import ControlsRow from './../components/ControlsRow';
        
        var validationColumn = _validation4.default; //d.toValidation(object);
        // let validationColumn2 = validation2;//d.toValidation(object);
        // let validationRow    = validation;
        
        // const validationFromObject = d.toValidation(object);
        // console.log(validationFromObject, 'validationFromObject');
        
        // import MuiEditor from './MuiEditor';
        // import TextEditor from './TextEditor';
        // import JsonEditor from './JsonEditor';
        
        // import ComControl from './ComControl';
        
        var theme = _darkBaseTheme2.default;
        // const themeCopy = _.cloneDeep(theme);
        // const themeValidation = d.toValidation(themeCopy);
        
        (0, _reactTapEventPlugin2.default)();
        
        //<JsonEditor data={object} onChange={(options, diff, validation) => console.log(validation)}/>
        //<Controls data={validation} onChange={(a, b, c) => console.log(a)}/>
        // let json = d.toValidation(object);
        //<ComControl component={Controls} datas={{data: validation}}/>
        
        // console.log(d.toObject(validation1), 'validation1 | toObject')
        // const objv = d.toValidation(object);
        
        //		  <div className="row-container">
        //		    <ControlsRow 
        //		      data={ validation }
        //		      editable={ false }
        //		      height={ 60 }
        //		    />
        //		  </div>
        
        // const vv1 =   {
        //     name: '字段过滤(measure)',
        //     key: 'filterColumn',
        //     uiType: 'filterColumn',
        //     valueType: 'filter',
        //     desc: '字段过滤(measure)',
        //     expand: true,
        //     // expandable: false,
        //     value: null,
        //     validate: {
        //       type: 'measure',
        //       options: ['a', 'b', 'c', 'd']
        //     }
        //   };
        
        // const vv2 =   {
        //     name: '字段过滤(category)',
        //     key: 'filterColumn',
        //     uiType: 'filterColumn',
        //     valueType: 'filter',
        //     desc: '字段过滤(category)',
        //     expand: false,
        //     expandable: true,
        //     value: null,
        //     validate: {
        //       type: 'category',
        //       options: ['a', 'b', 'c', 'd']
        //     }
        //   };
        
        var validationRender = void 0;
        var redraw = function redraw(validation) {
          validationRender = validation || validationRender || validationColumn;
        };
        redraw(_validation2.default);
        
        var Root = function (_Component) {
          _inherits(Root, _Component);
        
          function Root(props, context) {
            _classCallCheck(this, Root);
        
            var _this = _possibleConstructorReturn(this, (Root.__proto__ || Object.getPrototypeOf(Root)).call(this, props, context));
        
            _this.state = {};
            return _this;
          }
        
          _createClass(Root, [{
            key: 'render',
            value: function render() {
              return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  _MuiThemeProvider2.default,
                  { muiTheme: (0, _getMuiTheme2.default)(theme) },
                  _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(
                      'div',
                      { className: 'column-container' },
                      _react2.default.createElement(_Controls2.default, {
                        offset: { x: 0, y: 0 },
                        data: validationRender,
                        expand: true,
                        editable: false,
                        height: 60,
                        onConfirm: function onConfirm(a, b) {
                          // console.log('onConfirm', a, b);
                        },
                        onDelete: function onDelete(d) {
                          // console.log('onDelete', d);
                        },
                        nameStyle: { width: '40px' },
                        onChange: function onChange(a, b, c) {
                          console.log(a, '==');
                          validationRender = _lodash2.default.cloneDeep(c);
                          {/* redraw(); */}
                        }
                      })
                    )
                  )
                )
              );
            }
          }]);
        
          return Root;
        }(_react.Component);
        
        //<MuiEditor data={_.cloneDeep(themeCopy)} onChange={onThemeChange} />
        // const d1 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}];
        // const d2 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}]
        // const d3 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}] 
        // redraw(d1);
        // redraw(d2);
        // redraw(d3);
        
        // redraw(validation1);
        // export default redraw(validation);
        
        // setTimeout(d => redraw([validationCompare.b[0]]), 1000);
        
        
        // const vals = [{"key":"distance","value":0,"valueType":"float","uiType":"input","name":"距离"},{"key":"subway_site","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"line_name","name":"线路","uiType":"group","valueType":"group","children":[{"uiType":"multiSelect","valueType":"string","key":"$in","value":["1号线"],"name":"包含","validate":{"options":["1号线"]}}]}]}];
        // console.log(vals);
        // var pth = 'subway_site.line_name.$in';
        // const vv = Utils.getValidation(vals, pth);
        // console.log(vv);
        
        
        exports.default = Root;
    
    /***/ },

});
    // # sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvYXBwLmpzPzdhYzkiXSwibmFtZXMiOlsidmFsaWRhdGlvbkNvbHVtbiIsInRoZW1lIiwidmFsaWRhdGlvblJlbmRlciIsInJlZHJhdyIsInZhbGlkYXRpb24iLCJSb290IiwicHJvcHMiLCJjb250ZXh0Iiwic3RhdGUiLCJ4IiwieSIsImEiLCJiIiwiZCIsIndpZHRoIiwiYyIsImNvbnNvbGUiLCJsb2ciLCJjbG9uZURlZXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUdBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQVVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OztBQWxCQTtBQUNBOztBQUdBOzs7QUFFQTs7QUFFQSxLQUFJQSx1Q0FBSixDLENBQW1DO0FBQ25DO0FBQ0E7O0FBRUE7QUFDQTs7QUFRQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsS0FBSUMsK0JBQUo7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUlDLHlCQUFKO0FBQ0EsS0FBTUMsU0FBUyxTQUFUQSxNQUFTLENBQUNDLFVBQUQsRUFBZ0I7QUFDN0JGLHNCQUFtQkUsY0FBY0YsZ0JBQWQsSUFBa0NGLGdCQUFyRDtBQUNELEVBRkQ7QUFHQUc7O0tBRXFCRSxJOzs7QUFDbkIsaUJBQVlDLEtBQVosRUFBbUJDLE9BQW5CLEVBQTRCO0FBQUE7O0FBQUEsNkdBQ3BCRCxLQURvQixFQUNiQyxPQURhOztBQUUxQixXQUFLQyxLQUFMLEdBQWEsRUFBYjtBQUYwQjtBQUczQjs7Ozs4QkFDTztBQUNOLGNBQ0U7QUFBQTtBQUFBO0FBQ0U7QUFBQTtBQUFBLGFBQWtCLFVBQVUsMkJBQVlQLEtBQVosQ0FBNUI7QUFDQTtBQUFBO0FBQUE7QUFDRTtBQUFBO0FBQUEsaUJBQUssV0FBVSxrQkFBZjtBQUNFO0FBQ0UseUJBQVEsRUFBRVEsR0FBRSxDQUFKLEVBQU9DLEdBQUUsQ0FBVCxFQURWO0FBRUUsdUJBQU9SLGdCQUZUO0FBR0UseUJBQVEsSUFIVjtBQUlFLDJCQUFXLEtBSmI7QUFLRSx5QkFBUyxFQUxYO0FBTUUsNEJBQVcsbUJBQUNTLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQ25CO0FBQ0Qsa0JBUkg7QUFTRSwyQkFBVSxrQkFBQ0MsQ0FBRCxFQUFPO0FBQ2Y7QUFDRCxrQkFYSDtBQVlFLDRCQUFXLEVBQUVDLE9BQU8sTUFBVCxFQVpiO0FBYUUsMkJBQVUsa0JBQUNILENBQUQsRUFBSUMsQ0FBSixFQUFPRyxDQUFQLEVBQWE7QUFDckJDLDJCQUFRQyxHQUFSLENBQVlOLENBQVosRUFBZSxJQUFmO0FBQ0FULHNDQUFtQixpQkFBRWdCLFNBQUYsQ0FBWUgsQ0FBWixDQUFuQjtBQUNBLG9CQUFDLGVBQWdCO0FBQ2xCO0FBakJIO0FBREY7QUFERjtBQURBO0FBREYsUUFERjtBQTZCRDs7Ozs7O0FBR0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O21CQXhEcUJWLEkiLCJmaWxlIjoiMC4zMTFjODMyYjc3OGQ3ZmU4NmE2Ni5ob3QtdXBkYXRlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBQcm9wVHlwZXMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gICAgZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCAnLi9hcHAuY3NzJztcbmltcG9ydCB2YWxpZGF0aW9uICBmcm9tICcuL3ZhbGlkYXRpb24nO1xuaW1wb3J0IHZhbGlkYXRpb24xIGZyb20gJy4vdmFsaWRhdGlvbjEnO1xuaW1wb3J0IHZhbGlkYXRpb24yIGZyb20gJy4vdmFsaWRhdGlvbjInO1xuLy8gaW1wb3J0IHZhbGlkYXRpb25Db21wYXJlIGZyb20gJy4vdmFsaWRhdGlvbkNvbXBhcmUnO1xuLy8gbGV0IHZhbGlkYXRpb24xID0gdmFsaWRhdGlvbjtcbmltcG9ydCBfICAgICAgICAgICBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGQgICAgICAgZnJvbSAnLi8uLi9saWIvdXRpbHMnO1xuLy8gaW1wb3J0IG9iamVjdCAgICAgIGZyb20gJy4vb2JqZWN0JztcbmltcG9ydCBDb250cm9scyAgICBmcm9tICcuLy4uL2NvbXBvbmVudHMvQ29udHJvbHMnO1xuLy8gaW1wb3J0IENvbnRyb2xzUm93IGZyb20gJy4vLi4vY29tcG9uZW50cy9Db250cm9sc1Jvdyc7XG5cbmxldCB2YWxpZGF0aW9uQ29sdW1uID0gdmFsaWRhdGlvbjE7Ly9kLnRvVmFsaWRhdGlvbihvYmplY3QpO1xuLy8gbGV0IHZhbGlkYXRpb25Db2x1bW4yID0gdmFsaWRhdGlvbjI7Ly9kLnRvVmFsaWRhdGlvbihvYmplY3QpO1xuLy8gbGV0IHZhbGlkYXRpb25Sb3cgICAgPSB2YWxpZGF0aW9uO1xuXG4vLyBjb25zdCB2YWxpZGF0aW9uRnJvbU9iamVjdCA9IGQudG9WYWxpZGF0aW9uKG9iamVjdCk7XG4vLyBjb25zb2xlLmxvZyh2YWxpZGF0aW9uRnJvbU9iamVjdCwgJ3ZhbGlkYXRpb25Gcm9tT2JqZWN0Jyk7XG5cbmltcG9ydCBpbmplY3RUYXBFdmVudFBsdWdpbiBmcm9tICdyZWFjdC10YXAtZXZlbnQtcGx1Z2luJztcbmltcG9ydCBkYXJrQmFzZVRoZW1lICAgICAgICBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvYmFzZVRoZW1lcy9kYXJrQmFzZVRoZW1lJztcbmltcG9ydCBNdWlUaGVtZVByb3ZpZGVyICAgICBmcm9tICdtYXRlcmlhbC11aS9zdHlsZXMvTXVpVGhlbWVQcm92aWRlcic7XG5pbXBvcnQgZ2V0TXVpVGhlbWUgICAgICAgICAgZnJvbSAnbWF0ZXJpYWwtdWkvc3R5bGVzL2dldE11aVRoZW1lJztcblxuXG4vLyBpbXBvcnQgTXVpRWRpdG9yIGZyb20gJy4vTXVpRWRpdG9yJztcbi8vIGltcG9ydCBUZXh0RWRpdG9yIGZyb20gJy4vVGV4dEVkaXRvcic7XG4vLyBpbXBvcnQgSnNvbkVkaXRvciBmcm9tICcuL0pzb25FZGl0b3InO1xuXG4vLyBpbXBvcnQgQ29tQ29udHJvbCBmcm9tICcuL0NvbUNvbnRyb2wnO1xuXG5sZXQgdGhlbWUgPSBkYXJrQmFzZVRoZW1lO1xuLy8gY29uc3QgdGhlbWVDb3B5ID0gXy5jbG9uZURlZXAodGhlbWUpO1xuLy8gY29uc3QgdGhlbWVWYWxpZGF0aW9uID0gZC50b1ZhbGlkYXRpb24odGhlbWVDb3B5KTtcblxuaW5qZWN0VGFwRXZlbnRQbHVnaW4oKTtcblxuLy88SnNvbkVkaXRvciBkYXRhPXtvYmplY3R9IG9uQ2hhbmdlPXsob3B0aW9ucywgZGlmZiwgdmFsaWRhdGlvbikgPT4gY29uc29sZS5sb2codmFsaWRhdGlvbil9Lz5cbi8vPENvbnRyb2xzIGRhdGE9e3ZhbGlkYXRpb259IG9uQ2hhbmdlPXsoYSwgYiwgYykgPT4gY29uc29sZS5sb2coYSl9Lz5cbi8vIGxldCBqc29uID0gZC50b1ZhbGlkYXRpb24ob2JqZWN0KTtcbi8vPENvbUNvbnRyb2wgY29tcG9uZW50PXtDb250cm9sc30gZGF0YXM9e3tkYXRhOiB2YWxpZGF0aW9ufX0vPlxuXG4vLyBjb25zb2xlLmxvZyhkLnRvT2JqZWN0KHZhbGlkYXRpb24xKSwgJ3ZhbGlkYXRpb24xIHwgdG9PYmplY3QnKVxuLy8gY29uc3Qgb2JqdiA9IGQudG9WYWxpZGF0aW9uKG9iamVjdCk7XG5cblx0Ly9cdFx0ICA8ZGl2IGNsYXNzTmFtZT1cInJvdy1jb250YWluZXJcIj5cblx0Ly9cdFx0ICAgIDxDb250cm9sc1JvdyBcblx0Ly9cdFx0ICAgICAgZGF0YT17IHZhbGlkYXRpb24gfVxuXHQvL1x0XHQgICAgICBlZGl0YWJsZT17IGZhbHNlIH1cblx0Ly9cdFx0ICAgICAgaGVpZ2h0PXsgNjAgfVxuXHQvL1x0XHQgICAgLz5cblx0Ly9cdFx0ICA8L2Rpdj5cblxuLy8gY29uc3QgdnYxID0gICB7XG4vLyAgICAgbmFtZTogJ+Wtl+autei/h+a7pChtZWFzdXJlKScsXG4vLyAgICAga2V5OiAnZmlsdGVyQ29sdW1uJyxcbi8vICAgICB1aVR5cGU6ICdmaWx0ZXJDb2x1bW4nLFxuLy8gICAgIHZhbHVlVHlwZTogJ2ZpbHRlcicsXG4vLyAgICAgZGVzYzogJ+Wtl+autei/h+a7pChtZWFzdXJlKScsXG4vLyAgICAgZXhwYW5kOiB0cnVlLFxuLy8gICAgIC8vIGV4cGFuZGFibGU6IGZhbHNlLFxuLy8gICAgIHZhbHVlOiBudWxsLFxuLy8gICAgIHZhbGlkYXRlOiB7XG4vLyAgICAgICB0eXBlOiAnbWVhc3VyZScsXG4vLyAgICAgICBvcHRpb25zOiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuLy8gICAgIH1cbi8vICAgfTtcblxuLy8gY29uc3QgdnYyID0gICB7XG4vLyAgICAgbmFtZTogJ+Wtl+autei/h+a7pChjYXRlZ29yeSknLFxuLy8gICAgIGtleTogJ2ZpbHRlckNvbHVtbicsXG4vLyAgICAgdWlUeXBlOiAnZmlsdGVyQ29sdW1uJyxcbi8vICAgICB2YWx1ZVR5cGU6ICdmaWx0ZXInLFxuLy8gICAgIGRlc2M6ICflrZfmrrXov4fmu6QoY2F0ZWdvcnkpJyxcbi8vICAgICBleHBhbmQ6IGZhbHNlLFxuLy8gICAgIGV4cGFuZGFibGU6IHRydWUsXG4vLyAgICAgdmFsdWU6IG51bGwsXG4vLyAgICAgdmFsaWRhdGU6IHtcbi8vICAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4vLyAgICAgICBvcHRpb25zOiBbJ2EnLCAnYicsICdjJywgJ2QnXVxuLy8gICAgIH1cbi8vICAgfTtcblxubGV0IHZhbGlkYXRpb25SZW5kZXI7XG5jb25zdCByZWRyYXcgPSAodmFsaWRhdGlvbikgPT4ge1xuICB2YWxpZGF0aW9uUmVuZGVyID0gdmFsaWRhdGlvbiB8fCB2YWxpZGF0aW9uUmVuZGVyIHx8IHZhbGlkYXRpb25Db2x1bW5cbn1cbnJlZHJhdyh2YWxpZGF0aW9uKVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb290IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMsIGNvbnRleHQpIHtcbiAgICBzdXBlcihwcm9wcywgY29udGV4dCk7XG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICB9XG4gIHJlbmRlcigpe1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8TXVpVGhlbWVQcm92aWRlciBtdWlUaGVtZT17Z2V0TXVpVGhlbWUodGhlbWUpfT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbHVtbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxDb250cm9sc1xuICAgICAgICAgICAgICBvZmZzZXQ9e3sgeDowLCB5OjAgfX1cbiAgICAgICAgICAgICAgZGF0YT17IHZhbGlkYXRpb25SZW5kZXIgfVxuICAgICAgICAgICAgICBleHBhbmQ9e3RydWV9XG4gICAgICAgICAgICAgIGVkaXRhYmxlPXsgZmFsc2UgfVxuICAgICAgICAgICAgICBoZWlnaHQ9eyA2MCB9XG4gICAgICAgICAgICAgIG9uQ29uZmlybT17KGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb25Db25maXJtJywgYSwgYik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIG9uRGVsZXRlPXsoZCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvbkRlbGV0ZScsIGQpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBuYW1lU3R5bGU9e3sgd2lkdGg6ICc0MHB4JyB9fVxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGEsIGIsIGMpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhhLCAnPT0nKTtcbiAgICAgICAgICAgICAgICB2YWxpZGF0aW9uUmVuZGVyID0gXy5jbG9uZURlZXAoYyk7XG4gICAgICAgICAgICAgICAgey8qIHJlZHJhdygpOyAqL31cbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8L011aVRoZW1lUHJvdmlkZXI+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuLy88TXVpRWRpdG9yIGRhdGE9e18uY2xvbmVEZWVwKHRoZW1lQ29weSl9IG9uQ2hhbmdlPXtvblRoZW1lQ2hhbmdlfSAvPlxuLy8gY29uc3QgZDEgPSBbe1wia2V5XCI6XCJob3VzZV9yZW50X2xvbmdodV9iZWlqaW5nXCIsXCJuYW1lXCI6XCLlnLDpk4HmlbDmja5cIixcInVpVHlwZVwiOlwiZ3JvdXBcIixcInZhbHVlVHlwZVwiOlwiZ3JvdXBcIixcImNoaWxkcmVuXCI6W3tcImtleVwiOlwiYXZnX3JlbnRfcHJpY2VcIixcIm5hbWVcIjpcIuW5s+Wdh+S7t+agvFwiLFwidWlUeXBlXCI6XCJncm91cFwiLFwidmFsdWVUeXBlXCI6XCJncm91cFwiLFwiY2hpbGRyZW5cIjpbe1wia2V5XCI6XCJtaW5cIixcInZhbHVlXCI6MTAwMCxcIm5hbWVcIjpcIuacgOWwj+WAvFwiLFwidWlUeXBlXCI6XCJzbGlkZXJcIixcInZhbHVlVHlwZVwiOlwiaW50XCIsXCJ2YWxpZGF0ZVwiOntcInJhbmdlXCI6e1wibWluXCI6MCxcIm1heFwiOjMwMDAwfX19LHtcImtleVwiOlwibWF4XCIsXCJ2YWx1ZVwiOjIwMDAwLFwibmFtZVwiOlwi5pyA5aSn5YC8XCIsXCJ1aVR5cGVcIjpcInNsaWRlclwiLFwidmFsdWVUeXBlXCI6XCJpbnRcIixcInZhbGlkYXRlXCI6e1wicmFuZ2VcIjp7XCJtaW5cIjowLFwibWF4XCI6MzAwMDB9fX1dfV19XTtcbi8vIGNvbnN0IGQyID0gW3tcImtleVwiOlwiaG91c2VfcmVudF9sb25naHVfYmVpamluZ1wiLFwibmFtZVwiOlwi5Zyw6ZOB5pWw5o2uXCIsXCJ1aVR5cGVcIjpcImdyb3VwXCIsXCJ2YWx1ZVR5cGVcIjpcImdyb3VwXCIsXCJjaGlsZHJlblwiOlt7XCJrZXlcIjpcImF2Z19yZW50X3ByaWNlXCIsXCJuYW1lXCI6XCLlubPlnYfku7fmoLxcIixcInVpVHlwZVwiOlwiZ3JvdXBcIixcInZhbHVlVHlwZVwiOlwiZ3JvdXBcIixcImNoaWxkcmVuXCI6W3tcImtleVwiOlwibWluXCIsXCJ2YWx1ZVwiOjEwMDAsXCJuYW1lXCI6XCLmnIDlsI/lgLxcIixcInVpVHlwZVwiOlwic2xpZGVyXCIsXCJ2YWx1ZVR5cGVcIjpcImludFwiLFwidmFsaWRhdGVcIjp7XCJyYW5nZVwiOntcIm1pblwiOjAsXCJtYXhcIjozMDAwMH19fSx7XCJrZXlcIjpcIm1heFwiLFwidmFsdWVcIjoyMDAwMCxcIm5hbWVcIjpcIuacgOWkp+WAvFwiLFwidWlUeXBlXCI6XCJzbGlkZXJcIixcInZhbHVlVHlwZVwiOlwiaW50XCIsXCJ2YWxpZGF0ZVwiOntcInJhbmdlXCI6e1wibWluXCI6MCxcIm1heFwiOjMwMDAwfX19XX1dfV1cbi8vIGNvbnN0IGQzID0gW3tcImtleVwiOlwiaG91c2VfcmVudF9sb25naHVfYmVpamluZ1wiLFwibmFtZVwiOlwi5Zyw6ZOB5pWw5o2uXCIsXCJ1aVR5cGVcIjpcImdyb3VwXCIsXCJ2YWx1ZVR5cGVcIjpcImdyb3VwXCIsXCJjaGlsZHJlblwiOlt7XCJrZXlcIjpcImF2Z19yZW50X3ByaWNlXCIsXCJuYW1lXCI6XCLlubPlnYfku7fmoLxcIixcInVpVHlwZVwiOlwiZ3JvdXBcIixcInZhbHVlVHlwZVwiOlwiZ3JvdXBcIixcImNoaWxkcmVuXCI6W3tcImtleVwiOlwibWluXCIsXCJ2YWx1ZVwiOjEwMDAsXCJuYW1lXCI6XCLmnIDlsI/lgLxcIixcInVpVHlwZVwiOlwic2xpZGVyXCIsXCJ2YWx1ZVR5cGVcIjpcImludFwiLFwidmFsaWRhdGVcIjp7XCJyYW5nZVwiOntcIm1pblwiOjAsXCJtYXhcIjozMDAwMH19fSx7XCJrZXlcIjpcIm1heFwiLFwidmFsdWVcIjoyMDAwMCxcIm5hbWVcIjpcIuacgOWkp+WAvFwiLFwidWlUeXBlXCI6XCJzbGlkZXJcIixcInZhbHVlVHlwZVwiOlwiaW50XCIsXCJ2YWxpZGF0ZVwiOntcInJhbmdlXCI6e1wibWluXCI6MCxcIm1heFwiOjMwMDAwfX19XX1dfV0gXG4vLyByZWRyYXcoZDEpO1xuLy8gcmVkcmF3KGQyKTtcbi8vIHJlZHJhdyhkMyk7XG5cbi8vIHJlZHJhdyh2YWxpZGF0aW9uMSk7XG4vLyBleHBvcnQgZGVmYXVsdCByZWRyYXcodmFsaWRhdGlvbik7XG5cbi8vIHNldFRpbWVvdXQoZCA9PiByZWRyYXcoW3ZhbGlkYXRpb25Db21wYXJlLmJbMF1dKSwgMTAwMCk7XG5cblxuLy8gY29uc3QgdmFscyA9IFt7XCJrZXlcIjpcImRpc3RhbmNlXCIsXCJ2YWx1ZVwiOjAsXCJ2YWx1ZVR5cGVcIjpcImZsb2F0XCIsXCJ1aVR5cGVcIjpcImlucHV0XCIsXCJuYW1lXCI6XCLot53nprtcIn0se1wia2V5XCI6XCJzdWJ3YXlfc2l0ZVwiLFwibmFtZVwiOlwi5Zyw6ZOB5pWw5o2uXCIsXCJ1aVR5cGVcIjpcImdyb3VwXCIsXCJ2YWx1ZVR5cGVcIjpcImdyb3VwXCIsXCJjaGlsZHJlblwiOlt7XCJrZXlcIjpcImxpbmVfbmFtZVwiLFwibmFtZVwiOlwi57q/6LevXCIsXCJ1aVR5cGVcIjpcImdyb3VwXCIsXCJ2YWx1ZVR5cGVcIjpcImdyb3VwXCIsXCJjaGlsZHJlblwiOlt7XCJ1aVR5cGVcIjpcIm11bHRpU2VsZWN0XCIsXCJ2YWx1ZVR5cGVcIjpcInN0cmluZ1wiLFwia2V5XCI6XCIkaW5cIixcInZhbHVlXCI6W1wiMeWPt+e6v1wiXSxcIm5hbWVcIjpcIuWMheWQq1wiLFwidmFsaWRhdGVcIjp7XCJvcHRpb25zXCI6W1wiMeWPt+e6v1wiXX19XX1dfV07XG4vLyBjb25zb2xlLmxvZyh2YWxzKTtcbi8vIHZhciBwdGggPSAnc3Vid2F5X3NpdGUubGluZV9uYW1lLiRpbic7XG4vLyBjb25zdCB2diA9IFV0aWxzLmdldFZhbGlkYXRpb24odmFscywgcHRoKTtcbi8vIGNvbnNvbGUubG9nKHZ2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9hcHAuanMiXSwic291cmNlUm9vdCI6IiJ9
