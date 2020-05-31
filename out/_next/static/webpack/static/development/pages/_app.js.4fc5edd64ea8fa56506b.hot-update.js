webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/slicedToArray */ \"./node_modules/@babel/runtime/helpers/esm/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/esm/defineProperty */ \"./node_modules/@babel/runtime/helpers/esm/defineProperty.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ \"./node_modules/@material-ui/core/esm/styles/index.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/AppBar */ \"./node_modules/@material-ui/core/esm/AppBar/index.js\");\n/* harmony import */ var _material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/Toolbar */ \"./node_modules/@material-ui/core/esm/Toolbar/index.js\");\n/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Typography */ \"./node_modules/@material-ui/core/esm/Typography/index.js\");\n/* harmony import */ var _material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/IconButton */ \"./node_modules/@material-ui/core/esm/IconButton/index.js\");\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/icons/AccountCircle */ \"./node_modules/@material-ui/icons/AccountCircle.js\");\n/* harmony import */ var _material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/MenuItem */ \"./node_modules/@material-ui/core/esm/MenuItem/index.js\");\n/* harmony import */ var _material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/Menu */ \"./node_modules/@material-ui/core/esm/Menu/index.js\");\n/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/icons/Menu */ \"./node_modules/@material-ui/icons/Menu.js\");\n/* harmony import */ var _material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _ApplicationContext__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./ApplicationContext */ \"./components/ApplicationContext.js\");\n\n\n\nvar _this = undefined,\n    _jsxFileName = \"/Users/rilwanmohamedhanifa/Code/cocon-invoice-frontend/components/Header.js\",\n    _s = $RefreshSig$();\n\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;\n\n\n\n\n\n\n\n\n\n\n\n\nvar useStyles = Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__[\"makeStyles\"])(function (theme) {\n  return {\n    root: {\n      flexGrow: 1\n    },\n    appBar: {\n      zIndex: theme.zIndex.drawer + 1\n    },\n    menuButton: Object(_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n      marginRight: theme.spacing(2)\n    }, theme.breakpoints.up('sm'), {\n      display: 'none'\n    }),\n    title: {\n      flexGrow: 1\n    }\n  };\n});\n\nvar Header = function Header(props) {\n  _s();\n\n  var classes = useStyles();\n\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_2__[\"useContext\"])(_ApplicationContext__WEBPACK_IMPORTED_MODULE_13__[\"ApplicationContext\"]),\n      authenticated = _useContext.authenticated,\n      logout = _useContext.logout;\n\n  var _React$useState = react__WEBPACK_IMPORTED_MODULE_2___default.a.useState(null),\n      _React$useState2 = Object(_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(_React$useState, 2),\n      anchorEl = _React$useState2[0],\n      setAnchorEl = _React$useState2[1];\n\n  var open = Boolean(anchorEl);\n\n  var handleChange = function handleChange(event) {\n    setAuth(event.target.checked);\n  };\n\n  var handleMenu = function handleMenu(event) {\n    setAnchorEl(event.currentTarget);\n  };\n\n  var handleClose = function handleClose() {\n    setAnchorEl(null);\n  };\n\n  var handleLogout = function handleLogout() {\n    logout();\n  };\n\n  return __jsx(_material_ui_core_AppBar__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n    position: \"fixed\",\n    className: classes.appBar,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 64,\n      columnNumber: 9\n    }\n  }, __jsx(_material_ui_core_Toolbar__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 65,\n      columnNumber: 13\n    }\n  }, __jsx(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    color: \"inherit\",\n    \"aria-label\": \"open drawer\",\n    edge: \"start\",\n    onClick: props.handleDrawerToggle,\n    className: classes.menuButton,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 66,\n      columnNumber: 17\n    }\n  }, __jsx(_material_ui_icons_Menu__WEBPACK_IMPORTED_MODULE_12___default.a, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 73,\n      columnNumber: 21\n    }\n  })), __jsx(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n    variant: \"h6\",\n    className: classes.title,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 75,\n      columnNumber: 17\n    }\n  }, \"Company Logo\"), authenticated && __jsx(\"div\", {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 78,\n      columnNumber: 21\n    }\n  }, __jsx(_material_ui_core_IconButton__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n    \"aria-label\": \"account of current user\",\n    \"aria-controls\": \"menu-appbar\",\n    \"aria-haspopup\": \"true\",\n    onClick: handleMenu,\n    color: \"inherit\",\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 79,\n      columnNumber: 25\n    }\n  }, __jsx(_material_ui_icons_AccountCircle__WEBPACK_IMPORTED_MODULE_9___default.a, {\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 86,\n      columnNumber: 29\n    }\n  })), __jsx(_material_ui_core_Menu__WEBPACK_IMPORTED_MODULE_11__[\"default\"], {\n    id: \"menu-appbar\",\n    anchorEl: anchorEl,\n    anchorOrigin: {\n      vertical: 'top',\n      horizontal: 'right'\n    },\n    keepMounted: true,\n    transformOrigin: {\n      vertical: 'top',\n      horizontal: 'right'\n    },\n    open: open,\n    onClose: handleClose,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 88,\n      columnNumber: 25\n    }\n  }, __jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    onClick: handleClose,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 103,\n      columnNumber: 29\n    }\n  }, \"Profile\"), __jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    onClick: handleClose,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 104,\n      columnNumber: 29\n    }\n  }, \"My account\"), __jsx(_material_ui_core_MenuItem__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n    onClick: handleLogout,\n    __self: _this,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 105,\n      columnNumber: 29\n    }\n  }, \"Logout\")))));\n};\n\n_s(Header, \"x0g2pWUhxRLvcKAYZ2muaIl4y0A=\", false, function () {\n  return [useStyles];\n});\n\n_c = Header;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Header);\n\nvar _c;\n\n$RefreshReg$(_c, \"Header\");\n\n;\n    var _a, _b;\n    // Legacy CSS implementations will `eval` browser code in a Node.js context\n    // to extract CSS. For backwards compatibility, we need to check we're in a\n    // browser context before continuing.\n    if (typeof self !== 'undefined' &&\n        // AMP / No-JS mode does not inject these helpers:\n        '$RefreshHelpers$' in self) {\n        var currentExports_1 = module.__proto__.exports;\n        var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n        // This cannot happen in MainTemplate because the exports mismatch between\n        // templating and execution.\n        self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports_1, module.i);\n        // A module can be accepted automatically based on its exports, e.g. when\n        // it is a Refresh Boundary.\n        if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports_1)) {\n            // Save the previous exports on update so we can compare the boundary\n            // signatures.\n            module.hot.dispose(function (data) {\n                data.prevExports = currentExports_1;\n            });\n            // Unconditionally accept an update to this module, we'll check if it's\n            // still a Refresh Boundary later.\n            module.hot.accept();\n            // This field is set when the previous version of this module was a\n            // Refresh Boundary, letting us know we need to check for invalidation or\n            // enqueue an update.\n            if (prevExports !== null) {\n                // A boundary can become ineligible if its exports are incompatible\n                // with the previous exports.\n                //\n                // For example, if you add/remove/change exports, we'll want to\n                // re-execute the importing modules, and force those components to\n                // re-render. Similarly, if you convert a class component to a\n                // function, we want to invalidate the boundary.\n                if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports_1)) {\n                    module.hot.invalidate();\n                }\n                else {\n                    self.$RefreshHelpers$.scheduleUpdate();\n                }\n            }\n        }\n        else {\n            // Since we just executed the code for the module, it's possible that the\n            // new exports made it ineligible for being a boundary.\n            // We only care about the case when we were _previously_ a boundary,\n            // because we already accepted this update (accidental side effect).\n            var isNoLongerABoundary = prevExports !== null;\n            if (isNoLongerABoundary) {\n                module.hot.invalidate();\n            }\n        }\n    }\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0hlYWRlci5qcz82ZjRhIl0sIm5hbWVzIjpbInVzZVN0eWxlcyIsIm1ha2VTdHlsZXMiLCJ0aGVtZSIsInJvb3QiLCJmbGV4R3JvdyIsImFwcEJhciIsInpJbmRleCIsImRyYXdlciIsIm1lbnVCdXR0b24iLCJtYXJnaW5SaWdodCIsInNwYWNpbmciLCJicmVha3BvaW50cyIsInVwIiwiZGlzcGxheSIsInRpdGxlIiwiSGVhZGVyIiwicHJvcHMiLCJjbGFzc2VzIiwidXNlQ29udGV4dCIsIkFwcGxpY2F0aW9uQ29udGV4dCIsImF1dGhlbnRpY2F0ZWQiLCJsb2dvdXQiLCJSZWFjdCIsInVzZVN0YXRlIiwiYW5jaG9yRWwiLCJzZXRBbmNob3JFbCIsIm9wZW4iLCJCb29sZWFuIiwiaGFuZGxlQ2hhbmdlIiwiZXZlbnQiLCJzZXRBdXRoIiwidGFyZ2V0IiwiY2hlY2tlZCIsImhhbmRsZU1lbnUiLCJjdXJyZW50VGFyZ2V0IiwiaGFuZGxlQ2xvc2UiLCJoYW5kbGVMb2dvdXQiLCJoYW5kbGVEcmF3ZXJUb2dnbGUiLCJ2ZXJ0aWNhbCIsImhvcml6b250YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFFQSxJQUFNQSxTQUFTLEdBQUdDLDJFQUFVLENBQUMsVUFBQ0MsS0FBRDtBQUFBLFNBQVk7QUFDckNDLFFBQUksRUFBRTtBQUNGQyxjQUFRLEVBQUU7QUFEUixLQUQrQjtBQUlyQ0MsVUFBTSxFQUFFO0FBQ0pDLFlBQU0sRUFBRUosS0FBSyxDQUFDSSxNQUFOLENBQWFDLE1BQWIsR0FBc0I7QUFEMUIsS0FKNkI7QUFPckNDLGNBQVUsRUFBRTtBQUNSQyxpQkFBVyxFQUFFUCxLQUFLLENBQUNRLE9BQU4sQ0FBYyxDQUFkO0FBRFAsT0FFTFIsS0FBSyxDQUFDUyxXQUFOLENBQWtC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QWJiO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FlSSxNQUFDLG1FQUFEO0FBQVUsV0FBTyxFQUFFQSxXQUFuQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBZkosRUFnQkksTUFBQyxtRUFBRDtBQUFVLFdBQU8sRUFBRUEsV0FBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFoQkosRUFpQkksTUFBQyxtRUFBRDtBQUFVLFdBQU8sRUFBRUMsWUFBbkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxjQWpCSixDQVZKLENBYlIsQ0FESixDQURKO0FBaURILENBN0VEOztHQUFNckIsTTtVQUVjZixTOzs7S0FGZGUsTTtBQStFU0EscUVBQWYiLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWRlci5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUNvbnRleHQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBtYWtlU3R5bGVzIH0gZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvc3R5bGVzJztcbmltcG9ydCBMaW5rIGZyb20gXCJuZXh0L2xpbmtcIjtcblxuaW1wb3J0IEFwcEJhciBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9BcHBCYXInO1xuaW1wb3J0IFRvb2xiYXIgZnJvbSAnQG1hdGVyaWFsLXVpL2NvcmUvVG9vbGJhcic7XG5pbXBvcnQgVHlwb2dyYXBoeSBmcm9tICdAbWF0ZXJpYWwtdWkvY29yZS9UeXBvZ3JhcGh5JztcbmltcG9ydCBJY29uQnV0dG9uIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL0ljb25CdXR0b24nO1xuaW1wb3J0IEFjY291bnRDaXJjbGUgZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL0FjY291bnRDaXJjbGUnO1xuaW1wb3J0IE1lbnVJdGVtIGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL01lbnVJdGVtJztcbmltcG9ydCBNZW51IGZyb20gJ0BtYXRlcmlhbC11aS9jb3JlL01lbnUnO1xuXG5pbXBvcnQgTWVudUljb24gZnJvbSAnQG1hdGVyaWFsLXVpL2ljb25zL01lbnUnO1xuXG5pbXBvcnQgeyBBcHBsaWNhdGlvbkNvbnRleHQgfSBmcm9tICcuL0FwcGxpY2F0aW9uQ29udGV4dCdcblxuY29uc3QgdXNlU3R5bGVzID0gbWFrZVN0eWxlcygodGhlbWUpID0+ICh7XG4gICAgcm9vdDoge1xuICAgICAgICBmbGV4R3JvdzogMSxcbiAgICB9LFxuICAgIGFwcEJhcjoge1xuICAgICAgICB6SW5kZXg6IHRoZW1lLnpJbmRleC5kcmF3ZXIgKyAxLFxuICAgIH0sXG4gICAgbWVudUJ1dHRvbjoge1xuICAgICAgICBtYXJnaW5SaWdodDogdGhlbWUuc3BhY2luZygyKSxcbiAgICAgICAgW3RoZW1lLmJyZWFrcG9pbnRzLnVwKCdzbScpXToge1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnLFxuICAgICAgICB9LFxuICAgIH0sXG4gICAgdGl0bGU6IHtcbiAgICAgICAgZmxleEdyb3c6IDEsXG4gICAgfSxcbn0pKTtcblxuY29uc3QgSGVhZGVyID0gKHByb3BzKSA9PiB7XG5cbiAgICBjb25zdCBjbGFzc2VzID0gdXNlU3R5bGVzKCk7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIGF1dGhlbnRpY2F0ZWQsXG4gICAgICAgIGxvZ291dFxuICAgIH0gPSB1c2VDb250ZXh0KEFwcGxpY2F0aW9uQ29udGV4dClcblxuICAgIGNvbnN0IFthbmNob3JFbCwgc2V0QW5jaG9yRWxdID0gUmVhY3QudXNlU3RhdGUobnVsbCk7XG4gICAgY29uc3Qgb3BlbiA9IEJvb2xlYW4oYW5jaG9yRWwpO1xuXG4gICAgY29uc3QgaGFuZGxlQ2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHNldEF1dGgoZXZlbnQudGFyZ2V0LmNoZWNrZWQpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVNZW51ID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIHNldEFuY2hvckVsKGV2ZW50LmN1cnJlbnRUYXJnZXQpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVDbG9zZSA9ICgpID0+IHtcbiAgICAgICAgc2V0QW5jaG9yRWwobnVsbCk7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUxvZ291dCA9ICgpID0+IHtcbiAgICAgICAgbG9nb3V0KClcbiAgICB9O1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPEFwcEJhciBwb3NpdGlvbj1cImZpeGVkXCIgY2xhc3NOYW1lPXtjbGFzc2VzLmFwcEJhcn0+XG4gICAgICAgICAgICA8VG9vbGJhcj5cbiAgICAgICAgICAgICAgICA8SWNvbkJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjb2xvcj1cImluaGVyaXRcIlxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwib3BlbiBkcmF3ZXJcIlxuICAgICAgICAgICAgICAgICAgICBlZGdlPVwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtwcm9wcy5oYW5kbGVEcmF3ZXJUb2dnbGV9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3Nlcy5tZW51QnV0dG9ufVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPE1lbnVJY29uIC8+XG4gICAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5IHZhcmlhbnQ9XCJoNlwiIGNsYXNzTmFtZT17Y2xhc3Nlcy50aXRsZX0+Q29tcGFueSBMb2dvPC9UeXBvZ3JhcGh5PlxuXG4gICAgICAgICAgICAgICAge2F1dGhlbnRpY2F0ZWQgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEljb25CdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPVwiYWNjb3VudCBvZiBjdXJyZW50IHVzZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyaWEtY29udHJvbHM9XCJtZW51LWFwcGJhclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZU1lbnV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I9XCJpbmhlcml0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8QWNjb3VudENpcmNsZSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9JY29uQnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZD1cIm1lbnUtYXBwYmFyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JFbD17YW5jaG9yRWx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yT3JpZ2luPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtlZXBNb3VudGVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtT3JpZ2luPXt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZlcnRpY2FsOiAndG9wJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9yaXpvbnRhbDogJ3JpZ2h0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wZW49e29wZW59XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbG9zZT17aGFuZGxlQ2xvc2V9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPE1lbnVJdGVtIG9uQ2xpY2s9e2hhbmRsZUNsb3NlfT5Qcm9maWxlPC9NZW51SXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8TWVudUl0ZW0gb25DbGljaz17aGFuZGxlQ2xvc2V9Pk15IGFjY291bnQ8L01lbnVJdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNZW51SXRlbSBvbkNsaWNrPXtoYW5kbGVMb2dvdXR9PkxvZ291dDwvTWVudUl0ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L01lbnU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L1Rvb2xiYXI+XG4gICAgICAgIDwvQXBwQmFyPlxuICAgIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSGVhZGVyOyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Header.js\n");

/***/ })

})