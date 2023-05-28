exports.id = "component---src-pages-about-jsx";
exports.ids = ["component---src-pages-about-jsx"];
exports.modules = {

/***/ "./src/components/card/MemberCard.jsx":
/*!********************************************!*\
  !*** ./src/components/card/MemberCard.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MemberCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/EBoard/Frank.png */ "./src/images/EBoard/Frank.png");
/* harmony import */ var _MemberCard_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./MemberCard.css */ "./src/components/card/MemberCard.css");
/* harmony import */ var _MemberCard_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_MemberCard_css__WEBPACK_IMPORTED_MODULE_4__);






const memberData = [{
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_EBoard_Frank_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "John Doe",
  description: "Position",
  link: "https://www.linkedin.com/feed/"
}];
const PAGE_SIZE_DESKTOP = 8;
const PAGE_SIZE_MIDSIZE = 8;
const PAGE_SIZE_MOBILE = 8;
function MemberCard() {
  const breakpoint = (0,_helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_2__["default"])();
  const {
    0: currentPage,
    1: setCurrentPage
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const {
    0: totalPages,
    1: setTotalPages
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const {
    0: pageSize,
    1: setPageSize
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(PAGE_SIZE_DESKTOP);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.DESKTOP) {
      setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_DESKTOP));
      setPageSize(PAGE_SIZE_DESKTOP);
    } else if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MIDSIZE) {
      setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_MIDSIZE));
      setPageSize(PAGE_SIZE_MIDSIZE);
    } else {
      setTotalPages(Math.ceil(memberData.length / PAGE_SIZE_MOBILE));
      setPageSize(PAGE_SIZE_MOBILE);
    }
  }, [breakpoint]);
  const renderCards = () => {
    const renderCardBlock = (name, description, image, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "memberCard",
        key: "key"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
        src: image
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, description));
    };
    const renderedBlocks = [];
    for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize && i < memberData.length; i++) {
      renderedBlocks.push(renderCardBlock(memberData[i].name, memberData[i].description, memberData[i].image));
    }
    return renderedBlocks;
  };
  const renderPageController = () => {
    const renderedPages = [];
    for (let i = 1; i <= totalPages; i++) {
      renderedPages.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: currentPage === i ? 'selected' : "",
        onClick: () => {
          setCurrentPage(i);
        }
      }));
    }
    return renderedPages;
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("section", {
    className: "memberCardContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "memberGrid"
  }, renderCards()), breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MOBILE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pageController"
  }, renderPageController()));
}

/***/ }),

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

/***/ "./src/components/helpers/types.jsx":
/*!******************************************!*\
  !*** ./src/components/helpers/types.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BREAKPOINT": () => (/* binding */ BREAKPOINT)
/* harmony export */ });
const BREAKPOINT = {
  MOBILE: 640,
  MIDSIZE: 1000,
  DESKTOP: 1200
};

/***/ }),

/***/ "./src/components/helpers/userBreakpoint.jsx":
/*!***************************************************!*\
  !*** ./src/components/helpers/userBreakpoint.jsx ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ useBreakpoint)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/components/helpers/types.jsx");


function useBreakpoint() {
  const {
    0: breakpoint,
    1: setBreakpoint
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const validateBreakpoint = () => {
    if (window.matchMedia(`(max-width: ${_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MOBILE}px)`).matches) {
      setBreakpoint(_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MOBILE);
      return breakpoint;
    }
    if (window.matchMedia(`(max-width: ${_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MIDSIZE}px)`).matches) {
      setBreakpoint(_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MIDSIZE);
      return breakpoint;
    } else setBreakpoint(_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.DESKTOP);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    validateBreakpoint();
    window.addEventListener("resize", validateBreakpoint);
    return () => {
      window.removeEventListener("resize", validateBreakpoint);
    };
  });
  return breakpoint;
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
/* harmony import */ var _images_ComputerGraphic_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/ComputerGraphic.svg */ "./src/images/ComputerGraphic.svg");
/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./about.css */ "./src/pages/about.css");
/* harmony import */ var _about_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_about_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_card_MemberCard_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/card/MemberCard.jsx */ "./src/components/card/MemberCard.jsx");






function About() {
  const renderTop = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "aboutSectionOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "About",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.   Nemo enim ipsam voluptatem quia voluptas"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      className: "aboutHero",
      src: _images_ComputerGraphic_svg__WEBPACK_IMPORTED_MODULE_3__["default"]
    })));
  };
  const OasisMission = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
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
    }))));
  };
  const OasisTeam = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "ourTeam"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Our Team"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "teamGridContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_card_MemberCard_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, renderTop(), OasisMission(), OasisTeam());
}

/***/ }),

/***/ "./src/components/card/MemberCard.css":
/*!********************************************!*\
  !*** ./src/components/card/MemberCard.css ***!
  \********************************************/
/***/ (() => {



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



/***/ }),

/***/ "./src/images/ComputerGraphic.svg":
/*!****************************************!*\
  !*** ./src/images/ComputerGraphic.svg ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/ComputerGraphic-7e728fcc878d13acee0d70d79ce03fce.svg");

/***/ }),

/***/ "./src/images/EBoard/Frank.png":
/*!*************************************!*\
  !*** ./src/images/EBoard/Frank.png ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/Frank-2ab4a353571daf277440ea5d0798d713.png");

/***/ })

};
;
//# sourceMappingURL=component---src-pages-about-jsx.js.map