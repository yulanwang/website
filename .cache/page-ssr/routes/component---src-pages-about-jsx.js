exports.id = "component---src-pages-about-jsx";
exports.ids = ["component---src-pages-about-jsx"];
exports.modules = {

/***/ "./src/components/common/ContentBlock.jsx":
/*!************************************************!*\
  !*** ./src/components/common/ContentBlock.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ContentBlock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ContentBlock_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContentBlock.css */ "./src/components/common/ContentBlock.css");
/* harmony import */ var _ContentBlock_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_ContentBlock_css__WEBPACK_IMPORTED_MODULE_1__);


function ContentBlock({
  title = "",
  body = "",
  className = ""
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "contentBlockContainerDefault"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, body));
}

/***/ }),

/***/ "./src/components/common/Title.jsx":
/*!*****************************************!*\
  !*** ./src/components/common/Title.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TitleBlock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Title_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Title.css */ "./src/components/common/Title.css");
/* harmony import */ var _Title_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Title_css__WEBPACK_IMPORTED_MODULE_1__);


function TitleBlock({
  title = "",
  body = "",
  className = ""
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "titleBlockContainerDefault"
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, title), body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, body));
}

/***/ }),

/***/ "./src/pages/about.jsx?export=default":
/*!********************************************!*\
  !*** ./src/pages/about.jsx?export=default ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ About)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/Title.jsx */ "./src/components/common/Title.jsx");
/* harmony import */ var _components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/common/ContentBlock.jsx */ "./src/components/common/ContentBlock.jsx");
/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about.css */ "./src/pages/about.css");
/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_about_css__WEBPACK_IMPORTED_MODULE_3__);




function About() {
  const renderTop = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "aboutSectionOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "About",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.   Nemo enim ipsam voluptatem quia voluptas"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mission"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Mission"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "gridMission"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleYellow"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione  voluptatem sequi nesciunt."
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleYellow"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione  voluptatem sequi nesciunt."
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleYellow"
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor  incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas  sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione  voluptatem sequi nesciunt."
    })))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, renderTop());
}

/***/ }),

/***/ "./src/components/common/ContentBlock.css":
/*!************************************************!*\
  !*** ./src/components/common/ContentBlock.css ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/common/Title.css":
/*!*****************************************!*\
  !*** ./src/components/common/Title.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/about.css":
/*!*****************************!*\
  !*** ./src/pages/about.css ***!
  \*****************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=component---src-pages-about-jsx.js.map