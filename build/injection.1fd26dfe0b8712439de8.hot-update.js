webpackHotUpdate("injection",{

/***/ "./components/ReactionTray/ReactionsButton.jsx":
/*!*****************************************************!*\
  !*** ./components/ReactionTray/ReactionsButton.jsx ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "../node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! styled-components */ "../node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var recoil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recoil */ "../node_modules/recoil/es/recoil.js");
/* harmony import */ var _atoms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../atoms */ "./atoms/index.js");
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles */ "./components/ReactionTray/styles.js");
/* harmony import */ var _ReactionsDropdown__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ReactionsDropdown */ "./components/ReactionTray/ReactionsDropdown.jsx");
/* harmony import */ var _assets_images_nod_notification_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../assets/images/nod/notification.png */ "./assets/images/nod/notification.png");
/* harmony import */ var _assets_images_nod_notification_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_images_nod_notification_png__WEBPACK_IMPORTED_MODULE_6__);
(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};








const Wrapper = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].div`
  &:focus > ${_styles__WEBPACK_IMPORTED_MODULE_4__["TrayButton"]} {
    background-color: rgba(2, 191, 165, 0.15);
  }
`;
const Image = styled_components__WEBPACK_IMPORTED_MODULE_1__["default"].img`
  height: 42px;
`;

const ReactionsButton = () => {
  const [isDropdownOpen, setDropdown] = Object(recoil__WEBPACK_IMPORTED_MODULE_2__["useRecoilState"])(_atoms__WEBPACK_IMPORTED_MODULE_3__["default"].isReactionsDropdownOpen);
  const tone = Object(recoil__WEBPACK_IMPORTED_MODULE_2__["useRecoilValue"])(_atoms__WEBPACK_IMPORTED_MODULE_3__["default"].emojiTone); // const thumbImage = React.lazy(() =>
  //   import(`../../assets/images/nod/tones/thumb-0.gif`)
  // );

  const handleKeyPress = e => {
    switch (e.code) {
      case 'Enter':
        setDropdown(true);
        break;

      case 'Escape':
        setDropdown(false);
        break;

      default:
        break;
    }
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Wrapper, {
    tabIndex: 0,
    onMouseOver: () => setDropdown(true),
    onMouseLeave: () => setDropdown(false),
    onKeyUp: handleKeyPress
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles__WEBPACK_IMPORTED_MODULE_4__["TrayButton"], {
    tabIndex: -1,
    "aria-label": "Open Nod extension"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_styles__WEBPACK_IMPORTED_MODULE_4__["TrayButtonBackground"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Image, {
    src: _assets_images_nod_notification_png__WEBPACK_IMPORTED_MODULE_6___default.a
  }), isDropdownOpen && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ReactionsDropdown__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};

__signature__(ReactionsButton, "useRecoilState{[isDropdownOpen, setDropdown]}\nuseRecoilValue{tone}", () => [recoil__WEBPACK_IMPORTED_MODULE_2__["useRecoilState"], recoil__WEBPACK_IMPORTED_MODULE_2__["useRecoilValue"]]);

const _default = ReactionsButton;
/* harmony default export */ __webpack_exports__["default"] = (_default);
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Wrapper, "Wrapper", "/home/markusz/Code/js/edupal/edupal-extension/src/components/ReactionTray/ReactionsButton.jsx");
  reactHotLoader.register(Image, "Image", "/home/markusz/Code/js/edupal/edupal-extension/src/components/ReactionTray/ReactionsButton.jsx");
  reactHotLoader.register(ReactionsButton, "ReactionsButton", "/home/markusz/Code/js/edupal/edupal-extension/src/components/ReactionTray/ReactionsButton.jsx");
  reactHotLoader.register(_default, "default", "/home/markusz/Code/js/edupal/edupal-extension/src/components/ReactionTray/ReactionsButton.jsx");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../node_modules/webpack/buildin/harmony-module.js */ "../node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0aW9uLjFmZDI2ZGZlMGI4NzEyNDM5ZGU4LmhvdC11cGRhdGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL1JlYWN0aW9uVHJheS9SZWFjdGlvbnNCdXR0b24uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IHVzZVJlY29pbFN0YXRlLCB1c2VSZWNvaWxWYWx1ZSB9IGZyb20gJ3JlY29pbCc7XG5pbXBvcnQgYXRvbXMgZnJvbSAnLi4vLi4vYXRvbXMnO1xuaW1wb3J0IHsgVHJheUJ1dHRvbiwgVHJheUJ1dHRvbkJhY2tncm91bmQgfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQgUmVhY3Rpb25zRHJvcGRvd24gZnJvbSAnLi9SZWFjdGlvbnNEcm9wZG93bic7XG5cbmltcG9ydCB0aHVtYkltYWdlIGZyb20gJy4uLy4uL2Fzc2V0cy9pbWFnZXMvbm9kL25vdGlmaWNhdGlvbi5wbmcnO1xuXG5jb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgJjpmb2N1cyA+ICR7VHJheUJ1dHRvbn0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMiwgMTkxLCAxNjUsIDAuMTUpO1xuICB9XG5gO1xuXG5jb25zdCBJbWFnZSA9IHN0eWxlZC5pbWdgXG4gIGhlaWdodDogNDJweDtcbmA7XG5cbmNvbnN0IFJlYWN0aW9uc0J1dHRvbiA9ICgpID0+IHtcbiAgY29uc3QgW2lzRHJvcGRvd25PcGVuLCBzZXREcm9wZG93bl0gPSB1c2VSZWNvaWxTdGF0ZShcbiAgICBhdG9tcy5pc1JlYWN0aW9uc0Ryb3Bkb3duT3BlblxuICApO1xuICBjb25zdCB0b25lID0gdXNlUmVjb2lsVmFsdWUoYXRvbXMuZW1vamlUb25lKTtcblxuICAvLyBjb25zdCB0aHVtYkltYWdlID0gUmVhY3QubGF6eSgoKSA9PlxuICAvLyAgIGltcG9ydChgLi4vLi4vYXNzZXRzL2ltYWdlcy9ub2QvdG9uZXMvdGh1bWItMC5naWZgKVxuICAvLyApO1xuXG4gIGNvbnN0IGhhbmRsZUtleVByZXNzID0gKGUpID0+IHtcbiAgICBzd2l0Y2ggKGUuY29kZSkge1xuICAgICAgY2FzZSAnRW50ZXInOlxuICAgICAgICBzZXREcm9wZG93bih0cnVlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFc2NhcGUnOlxuICAgICAgICBzZXREcm9wZG93bihmYWxzZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFdyYXBwZXJcbiAgICAgIHRhYkluZGV4PXswfVxuICAgICAgb25Nb3VzZU92ZXI9eygpID0+IHNldERyb3Bkb3duKHRydWUpfVxuICAgICAgb25Nb3VzZUxlYXZlPXsoKSA9PiBzZXREcm9wZG93bihmYWxzZSl9XG4gICAgICBvbktleVVwPXtoYW5kbGVLZXlQcmVzc31cbiAgICA+XG4gICAgICA8VHJheUJ1dHRvbiB0YWJJbmRleD17LTF9IGFyaWEtbGFiZWw9XCJPcGVuIE5vZCBleHRlbnNpb25cIj5cbiAgICAgICAgPFRyYXlCdXR0b25CYWNrZ3JvdW5kIC8+XG4gICAgICAgIDxJbWFnZSBzcmM9e3RodW1iSW1hZ2V9IC8+XG4gICAgICAgIHtpc0Ryb3Bkb3duT3BlbiAmJiA8UmVhY3Rpb25zRHJvcGRvd24gLz59XG4gICAgICA8L1RyYXlCdXR0b24+XG4gICAgPC9XcmFwcGVyPlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgUmVhY3Rpb25zQnV0dG9uO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBUkE7QUFVQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBTUE7QUFBQTtBQUFBO0FBRUE7QUFBQTtBQUtBO0FBQ0E7QUF0Q0E7QUFDQTtBQXNDQTtBQUFBOzs7Ozs7Ozs7O0FBakRBO0FBTUE7QUFJQTs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==