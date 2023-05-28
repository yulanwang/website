exports.id = "component---src-pages-join-jsx";
exports.ids = ["component---src-pages-join-jsx"];
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

/***/ "./src/pages/join.jsx?export=default":
/*!*******************************************!*\
  !*** ./src/pages/join.jsx?export=default ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Join)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/Title.jsx */ "./src/components/common/Title.jsx");
/* harmony import */ var _components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/common/ContentBlock.jsx */ "./src/components/common/ContentBlock.jsx");
/* harmony import */ var _join_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./join.css */ "./src/pages/join.css");
/* harmony import */ var _join_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_join_css__WEBPACK_IMPORTED_MODULE_3__);




function Join() {
  const JoinTopSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Join",
      body: "With support from our mentors, your group, and the Oasis community,  bring your software idea to life."
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "grid1"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas. Nemo enim ipsam voluptatem quia voluptas.")
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Pursue project ideas together. Nemo enim ipsam voluptatem quia voluptas. Nemo enim ipsam voluptatem quia voluptas.")
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Designed for any experience level. Nemo enim ipsam voluptatem quia voluptas.  Nemo enim ipsam voluptatem quia voluptas."
    })))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, JoinTopSection());
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

/***/ "./src/pages/join.css":
/*!****************************!*\
  !*** ./src/pages/join.css ***!
  \****************************/
/***/ (() => {



/***/ })

};
;
//# sourceMappingURL=component---src-pages-join-jsx.js.map