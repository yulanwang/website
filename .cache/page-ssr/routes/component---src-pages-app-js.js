exports.id = "component---src-pages-app-js";
exports.ids = ["component---src-pages-app-js"];
exports.modules = {

/***/ "./node_modules/@remix-run/router/dist/router.js":
/*!*******************************************************!*\
  !*** ./node_modules/@remix-run/router/dist/router.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* binding */ AbortedDeferredError),
/* harmony export */   "Action": () => (/* binding */ Action),
/* harmony export */   "ErrorResponse": () => (/* binding */ ErrorResponse),
/* harmony export */   "IDLE_BLOCKER": () => (/* binding */ IDLE_BLOCKER),
/* harmony export */   "IDLE_FETCHER": () => (/* binding */ IDLE_FETCHER),
/* harmony export */   "IDLE_NAVIGATION": () => (/* binding */ IDLE_NAVIGATION),
/* harmony export */   "UNSAFE_DEFERRED_SYMBOL": () => (/* binding */ UNSAFE_DEFERRED_SYMBOL),
/* harmony export */   "UNSAFE_DeferredData": () => (/* binding */ DeferredData),
/* harmony export */   "UNSAFE_convertRoutesToDataRoutes": () => (/* binding */ convertRoutesToDataRoutes),
/* harmony export */   "UNSAFE_getPathContributingMatches": () => (/* binding */ getPathContributingMatches),
/* harmony export */   "UNSAFE_invariant": () => (/* binding */ invariant),
/* harmony export */   "UNSAFE_warning": () => (/* binding */ warning),
/* harmony export */   "createBrowserHistory": () => (/* binding */ createBrowserHistory),
/* harmony export */   "createHashHistory": () => (/* binding */ createHashHistory),
/* harmony export */   "createMemoryHistory": () => (/* binding */ createMemoryHistory),
/* harmony export */   "createPath": () => (/* binding */ createPath),
/* harmony export */   "createRouter": () => (/* binding */ createRouter),
/* harmony export */   "createStaticHandler": () => (/* binding */ createStaticHandler),
/* harmony export */   "defer": () => (/* binding */ defer),
/* harmony export */   "generatePath": () => (/* binding */ generatePath),
/* harmony export */   "getStaticContextFromError": () => (/* binding */ getStaticContextFromError),
/* harmony export */   "getToPathname": () => (/* binding */ getToPathname),
/* harmony export */   "isDeferredData": () => (/* binding */ isDeferredData),
/* harmony export */   "isRouteErrorResponse": () => (/* binding */ isRouteErrorResponse),
/* harmony export */   "joinPaths": () => (/* binding */ joinPaths),
/* harmony export */   "json": () => (/* binding */ json),
/* harmony export */   "matchPath": () => (/* binding */ matchPath),
/* harmony export */   "matchRoutes": () => (/* binding */ matchRoutes),
/* harmony export */   "normalizePathname": () => (/* binding */ normalizePathname),
/* harmony export */   "parsePath": () => (/* binding */ parsePath),
/* harmony export */   "redirect": () => (/* binding */ redirect),
/* harmony export */   "resolvePath": () => (/* binding */ resolvePath),
/* harmony export */   "resolveTo": () => (/* binding */ resolveTo),
/* harmony export */   "stripBasename": () => (/* binding */ stripBasename)
/* harmony export */ });
/**
 * @remix-run/router v1.6.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

////////////////////////////////////////////////////////////////////////////////
//#region Types and Constants
////////////////////////////////////////////////////////////////////////////////
/**
 * Actions represent the type of change to a location value.
 */
var Action;
(function (Action) {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Action["Pop"] = "POP";
  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Action["Push"] = "PUSH";
  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Action["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
/**
 * Memory history stores the current location in memory. It is designed for use
 * in stateful non-browser environments like tests and React Native.
 */
function createMemoryHistory(options) {
  if (options === void 0) {
    options = {};
  }
  let {
    initialEntries = ["/"],
    initialIndex,
    v5Compat = false
  } = options;
  let entries; // Declare so we can access from createMemoryLocation
  entries = initialEntries.map((entry, index) => createMemoryLocation(entry, typeof entry === "string" ? null : entry.state, index === 0 ? "default" : undefined));
  let index = clampIndex(initialIndex == null ? entries.length - 1 : initialIndex);
  let action = Action.Pop;
  let listener = null;
  function clampIndex(n) {
    return Math.min(Math.max(n, 0), entries.length - 1);
  }
  function getCurrentLocation() {
    return entries[index];
  }
  function createMemoryLocation(to, state, key) {
    if (state === void 0) {
      state = null;
    }
    let location = createLocation(entries ? getCurrentLocation().pathname : "/", to, state, key);
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in memory history: " + JSON.stringify(to));
    return location;
  }
  function createHref(to) {
    return typeof to === "string" ? to : createPath(to);
  }
  let history = {
    get index() {
      return index;
    },
    get action() {
      return action;
    },
    get location() {
      return getCurrentLocation();
    },
    createHref,
    createURL(to) {
      return new URL(createHref(to), "http://localhost");
    },
    encodeLocation(to) {
      let path = typeof to === "string" ? parsePath(to) : to;
      return {
        pathname: path.pathname || "",
        search: path.search || "",
        hash: path.hash || ""
      };
    },
    push(to, state) {
      action = Action.Push;
      let nextLocation = createMemoryLocation(to, state);
      index += 1;
      entries.splice(index, entries.length, nextLocation);
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 1
        });
      }
    },
    replace(to, state) {
      action = Action.Replace;
      let nextLocation = createMemoryLocation(to, state);
      entries[index] = nextLocation;
      if (v5Compat && listener) {
        listener({
          action,
          location: nextLocation,
          delta: 0
        });
      }
    },
    go(delta) {
      action = Action.Pop;
      let nextIndex = clampIndex(index + delta);
      let nextLocation = entries[nextIndex];
      index = nextIndex;
      if (listener) {
        listener({
          action,
          location: nextLocation,
          delta
        });
      }
    },
    listen(fn) {
      listener = fn;
      return () => {
        listener = null;
      };
    }
  };
  return history;
}
/**
 * Browser history stores the location in regular URLs. This is the standard for
 * most web apps, but it requires some configuration on the server to ensure you
 * serve the same app at multiple URLs.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createbrowserhistory
 */
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window.location;
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createBrowserHref(window, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
/**
 * Hash history stores the location in window.location.hash. This makes it ideal
 * for situations where you don't want to send the location to the server for
 * some reason, either because you do cannot configure it or the URL space is
 * reserved for something else.
 *
 * @see https://github.com/remix-run/history/tree/main/docs/api-reference.md#createhashhistory
 */
function createHashHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createHashLocation(window, globalHistory) {
    let {
      pathname = "/",
      search = "",
      hash = ""
    } = parsePath(window.location.hash.substr(1));
    return createLocation("", {
      pathname,
      search,
      hash
    },
    // state defaults to `null` because `window.history.state` does
    globalHistory.state && globalHistory.state.usr || null, globalHistory.state && globalHistory.state.key || "default");
  }
  function createHashHref(window, to) {
    let base = window.document.querySelector("base");
    let href = "";
    if (base && base.getAttribute("href")) {
      let url = window.location.href;
      let hashIndex = url.indexOf("#");
      href = hashIndex === -1 ? url : url.slice(0, hashIndex);
    }
    return href + "#" + (typeof to === "string" ? to : createPath(to));
  }
  function validateHashLocation(location, to) {
    warning(location.pathname.charAt(0) === "/", "relative pathnames are not supported in hash history.push(" + JSON.stringify(to) + ")");
  }
  return getUrlBasedHistory(createHashLocation, createHashHref, validateHashLocation, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);
    try {
      // Welcome to debugging history!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
/**
 * For browser-based histories, we combine the state and key into an object
 */
function getHistoryState(location, index) {
  return {
    usr: location.state,
    key: location.key,
    idx: index
  };
}
/**
 * Creates a Location object with a unique key from the given Path
 */
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
/**
 * Creates a string URL path from the given pathname, search, and hash components.
 */
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?") pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#") pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
/**
 * Parses a string URL path into its separate pathname, search, and hash components.
 */
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window.history;
  let action = Action.Pop;
  let listener = null;
  let index = getIndex();
  // Index should only be null when we initialize. If not, it's because the
  // user called history.pushState or history.replaceState directly, in which
  // case we should log a warning as it will result in bugs.
  if (index == null) {
    index = 0;
    globalHistory.replaceState(_extends({}, globalHistory.state, {
      idx: index
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index;
    index = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex() + 1;
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    // try...catch because iOS limits us to 100 pushState calls :/
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      // If the exception is because `state` can't be serialized, let that throw
      // outwards just like a replace call would so the dev knows the cause
      // https://html.spec.whatwg.org/multipage/nav-history-apis.html#shared-history-push/replace-state-steps
      // https://html.spec.whatwg.org/multipage/structured-data.html#structuredserializeinternal
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      // They are going to lose state here, but there is no real
      // way to warn them about it since the page will refresh...
      window.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation) validateLocation(location, to);
    index = getIndex();
    let historyState = getHistoryState(location, index);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    // window.location.origin is "null" (the literal string value) in Firefox
    // under certain conditions, notably when serving from a local HTML file
    // See https://bugzilla.mozilla.org/show_bug.cgi?id=878297
    let base = window.location.origin !== "null" ? window.location.origin : window.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window, to);
    },
    createURL,
    encodeLocation(to) {
      // Encode a Location the same way window.location would
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n) {
      return globalHistory.go(n);
    }
  };
  return history;
}
//#endregion

var ResultType;
(function (ResultType) {
  ResultType["data"] = "data";
  ResultType["deferred"] = "deferred";
  ResultType["redirect"] = "redirect";
  ResultType["error"] = "error";
})(ResultType || (ResultType = {}));
const immutableRouteKeys = new Set(["lazy", "caseSensitive", "path", "id", "index", "children"]);
function isIndexRoute(route) {
  return route.index === true;
}
// Walk the route tree generating unique IDs where necessary so we are working
// solely with AgnosticDataRouteObject's within the Router
function convertRoutesToDataRoutes(routes, mapRouteProperties, parentPath, manifest) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  if (manifest === void 0) {
    manifest = {};
  }
  return routes.map((route, index) => {
    let treePath = [...parentPath, index];
    let id = typeof route.id === "string" ? route.id : treePath.join("-");
    invariant(route.index !== true || !route.children, "Cannot specify children on an index route");
    invariant(!manifest[id], "Found a route id collision on id \"" + id + "\".  Route " + "id's must be globally unique within Data Router usages");
    if (isIndexRoute(route)) {
      let indexRoute = _extends({}, route, mapRouteProperties(route), {
        id
      });
      manifest[id] = indexRoute;
      return indexRoute;
    } else {
      let pathOrLayoutRoute = _extends({}, route, mapRouteProperties(route), {
        id,
        children: undefined
      });
      manifest[id] = pathOrLayoutRoute;
      if (route.children) {
        pathOrLayoutRoute.children = convertRoutesToDataRoutes(route.children, mapRouteProperties, treePath, manifest);
      }
      return pathOrLayoutRoute;
    }
  });
}
/**
 * Matches the given routes to a location and returns the match data.
 *
 * @see https://reactrouter.com/utils/match-routes
 */
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(branches[i],
    // Incoming pathnames are generally encoded from either window.location
    // or from router.navigate, but we want to match against the unencoded
    // paths in the route definitions.  Memory router locations won't be
    // encoded here but there also shouldn't be anything to decode so this
    // should be a safe operation.  This avoids needing matchRoutes to be
    // history-aware.
    safelyDecodeURI(pathname));
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index, relativePath) => {
    let meta = {
      relativePath: relativePath === undefined ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), "Absolute route path \"" + meta.relativePath + "\" nested under path " + ("\"" + parentPath + "\" is not valid. An absolute child route path ") + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    // Add the children before adding this route to the array so we traverse the
    // route tree depth-first and child routes appear before their parents in
    // the "flattened" version.
    if (route.children && route.children.length > 0) {
      invariant(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      route.index !== true, "Index routes must not have child routes. Please remove " + ("all child routes from route path \"" + path + "\"."));
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    // Routes without a path shouldn't ever match by themselves unless they are
    // index routes, so don't add them to the list of possible branches.
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index) => {
    var _route$path;
    // coarse-grain check for optional params
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index, exploded);
      }
    }
  });
  return branches;
}
/**
 * Computes all combinations of optional path segments for a given path,
 * excluding combinations that are ambiguous and of lower priority.
 *
 * For example, `/one/:two?/three/:four?/:five?` explodes to:
 * - `/one/three`
 * - `/one/:two/three`
 * - `/one/three/:four`
 * - `/one/three/:five`
 * - `/one/:two/three/:four`
 * - `/one/:two/three/:five`
 * - `/one/three/:four/:five`
 * - `/one/:two/three/:four/:five`
 */
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0) return [];
  let [first, ...rest] = segments;
  // Optional path segments are denoted by a trailing `?`
  let isOptional = first.endsWith("?");
  // Compute the corresponding required segment: `foo?` -> `foo`
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    // Intepret empty string as omitting an optional segment
    // `["one", "", "three"]` corresponds to omitting `:two` from `/one/:two?/three` -> `/one/three`
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  // All child paths with the prefix.  Do this for all children before the
  // optional version for all children so we get consistent ordering where the
  // parent optional aspect is preferred as required.  Otherwise, we can get
  // child sections interspersed where deeper optional segments are higher than
  // parent optional segments, where for example, /:two would explodes _earlier_
  // then /:one.  By always including the parent as required _for all children_
  // first, we avoid this issue
  result.push(...restExploded.map(subpath => subpath === "" ? required : [required, subpath].join("/")));
  // Then if this is an optional value, add all child versions without
  if (isOptional) {
    result.push(...restExploded);
  }
  // for absolute paths, ensure `/` instead of empty segment
  return result.map(exploded => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b) => a.score !== b.score ? b.score - a.score // Higher score first
  : compareIndexes(a.routesMeta.map(meta => meta.childrenIndex), b.routesMeta.map(meta => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = s => s === "*";
function computeScore(path, index) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index) {
    initialScore += indexRouteValue;
  }
  return segments.filter(s => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b) {
  let siblings = a.length === b.length && a.slice(0, -1).every((n, i) => n === b[i]);
  return siblings ?
  // If two routes are siblings, we should try to match the earlier sibling
  // first. This allows people to have fine-grained control over the matching
  // behavior by simply putting routes with identical paths in the order they
  // want them tried.
  a[a.length - 1] - b[b.length - 1] :
  // Otherwise, it doesn't really make sense to rank non-siblings by index,
  // so they sort equally.
  0;
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match) return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */
function generatePath(originalPath, params) {
  if (params === void 0) {
    params = {};
  }
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(false, "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
    path = path.replace(/\*$/, "/*");
  }
  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : "";
  const segments = path.split(/\/+/).map((segment, index, array) => {
    const isLastSegment = index === array.length - 1;
    // only apply the splat if it's the last segment
    if (isLastSegment && segment === "*") {
      const star = "*";
      const starParam = params[star];
      // Apply the splat
      return starParam;
    }
    const keyMatch = segment.match(/^:(\w+)(\??)$/);
    if (keyMatch) {
      const [, key, optional] = keyMatch;
      let param = params[key];
      if (optional === "?") {
        return param == null ? "" : param;
      }
      if (param == null) {
        invariant(false, "Missing \":" + key + "\" param");
      }
      return param;
    }
    // Remove any optional markers from optional static segments
    return segment.replace(/\?$/g, "");
  })
  // Remove empty segments
  .filter(segment => !!segment);
  return prefix + segments.join("/");
}
/**
 * Performs pattern matching on a URL pathname and returns information about
 * the match.
 *
 * @see https://reactrouter.com/utils/match-path
 */
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match) return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index) => {
    // We need to compute the pathnameBase here using the raw splat value
    // instead of using params["*"] later because it will be decoded then
    if (paramName === "*") {
      let splatValue = captureGroups[index] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), "Route path \"" + path + "\" will be treated as if it were " + ("\"" + path.replace(/\*$/, "/*") + "\" because the `*` character must ") + "always follow a `/` in the pattern. To get rid of this warning, " + ("please change the route path to \"" + path.replace(/\*$/, "/*") + "\"."));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "") // Ignore trailing / and /*, we'll handle it below
  .replace(/^\/*/, "/") // Make sure it has a leading /
  .replace(/[\\.*+^$?{}|()[\]]/g, "\\$&") // Escape special regex chars
  .replace(/\/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" // Already matched the initial /, just match the rest
    : "(?:\\/(.+)|\\/*)$"; // Don't include the / in params["*"]
  } else if (end) {
    // When matching to the end, ignore trailing slashes
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    // If our path is non-empty and contains anything beyond an initial slash,
    // then we have _some_ form of path in our regex so we should expect to
    // match only if we find the end of this path segment.  Look for an optional
    // non-captured trailing slash (to match a portion of the URL) or the end
    // of the path (if we've matched to the end).  We used to do this with a
    // word boundary but that gives false positives on routes like
    // /user-preferences since `-` counts as a word boundary.
    regexpSource += "(?:(?=\\/|$))";
  } else ;
  let matcher = new RegExp(regexpSource, caseSensitive ? undefined : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, "The URL path \"" + value + "\" could not be decoded because it is is a " + "malformed URL segment. This is probably due to a bad percent " + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, "The value for the URL param \"" + paramName + "\" will not be decoded because" + (" the string \"" + value + "\" is a malformed URL segment. This is probably") + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
/**
 * @private
 */
function stripBasename(pathname, basename) {
  if (basename === "/") return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  // We want to leave trailing slash behavior in the user's control, so if they
  // specify a basename with a trailing slash, we should support it
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    // pathname does not start with basename/
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
/**
 * Returns a resolved path object relative to the given pathname.
 *
 * @see https://reactrouter.com/utils/resolve-path
 */
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach(segment => {
    if (segment === "..") {
      // Keep the root "" segment so the pathname starts at /
      if (segments.length > 1) segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + "a string in <Link to=\"...\"> and the router will parse it for you.";
}
/**
 * @private
 *
 * When processing relative navigation we want to ignore ancestor routes that
 * do not contribute to the path, such that index/pathless layout routes don't
 * interfere.
 *
 * For example, when moving a route element into an index route and/or a
 * pathless layout route, relative link behavior contained within should stay
 * the same.  Both of the following examples should link back to the root:
 *
 *   <Route path="/">
 *     <Route path="accounts" element={<Link to=".."}>
 *   </Route>
 *
 *   <Route path="/">
 *     <Route path="accounts">
 *       <Route element={<AccountsLayout />}>       // <-- Does not contribute
 *         <Route index element={<Link to=".."} />  // <-- Does not contribute
 *       </Route
 *     </Route>
 *   </Route>
 */
function getPathContributingMatches(matches) {
  return matches.filter((match, index) => index === 0 || match.route.path && match.route.path.length > 0);
}
/**
 * @private
 */
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  // Routing is relative to the current pathname if explicitly requested.
  //
  // If a pathname is explicitly provided in `to`, it should be relative to the
  // route context. This is explained in `Note on `<Link to>` values` in our
  // migration guide from v5 as a means of disambiguation between `to` values
  // that begin with `/` and those that do not. However, this is problematic for
  // `to` values that do not provide a pathname. `to` can simply be a search or
  // hash string, in which case we should assume that the navigation is relative
  // to the current location's pathname and *not* the route pathname.
  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      // Each leading .. segment means "go up one route" instead of "go up one
      // URL segment".  This is a key difference from how <a href> works and a
      // major reason we call this a "to" value instead of a "href".
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    // If there are more ".." segments than parent routes, resolve relative to
    // the root / URL.
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  // Ensure the pathname has a trailing slash if the original "to" had one
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  // Or if this was a link to the current path which has a trailing slash
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
/**
 * @private
 */
function getToPathname(to) {
  // Empty strings should be treated the same as / paths
  return to === "" || to.pathname === "" ? "/" : typeof to === "string" ? parsePath(to).pathname : to.pathname;
}
/**
 * @private
 */
const joinPaths = paths => paths.join("/").replace(/\/\/+/g, "/");
/**
 * @private
 */
const normalizePathname = pathname => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
/**
 * @private
 */
const normalizeSearch = search => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
/**
 * @private
 */
const normalizeHash = hash => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
/**
 * This is a shortcut for creating `application/json` responses. Converts `data`
 * to JSON and sets the `Content-Type` header.
 */
const json = function json(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  let headers = new Headers(responseInit.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json; charset=utf-8");
  }
  return new Response(JSON.stringify(data), _extends({}, responseInit, {
    headers
  }));
};
class AbortedDeferredError extends Error {}
class DeferredData {
  constructor(data, responseInit) {
    this.pendingKeysSet = new Set();
    this.subscribers = new Set();
    this.deferredKeys = [];
    invariant(data && typeof data === "object" && !Array.isArray(data), "defer() only accepts plain objects");
    // Set up an AbortController + Promise we can race against to exit early
    // cancellation
    let reject;
    this.abortPromise = new Promise((_, r) => reject = r);
    this.controller = new AbortController();
    let onAbort = () => reject(new AbortedDeferredError("Deferred data aborted"));
    this.unlistenAbortSignal = () => this.controller.signal.removeEventListener("abort", onAbort);
    this.controller.signal.addEventListener("abort", onAbort);
    this.data = Object.entries(data).reduce((acc, _ref) => {
      let [key, value] = _ref;
      return Object.assign(acc, {
        [key]: this.trackPromise(key, value)
      });
    }, {});
    if (this.done) {
      // All incoming values were resolved
      this.unlistenAbortSignal();
    }
    this.init = responseInit;
  }
  trackPromise(key, value) {
    if (!(value instanceof Promise)) {
      return value;
    }
    this.deferredKeys.push(key);
    this.pendingKeysSet.add(key);
    // We store a little wrapper promise that will be extended with
    // _data/_error props upon resolve/reject
    let promise = Promise.race([value, this.abortPromise]).then(data => this.onSettle(promise, key, null, data), error => this.onSettle(promise, key, error));
    // Register rejection listeners to avoid uncaught promise rejections on
    // errors or aborted deferred values
    promise.catch(() => {});
    Object.defineProperty(promise, "_tracked", {
      get: () => true
    });
    return promise;
  }
  onSettle(promise, key, error, data) {
    if (this.controller.signal.aborted && error instanceof AbortedDeferredError) {
      this.unlistenAbortSignal();
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      return Promise.reject(error);
    }
    this.pendingKeysSet.delete(key);
    if (this.done) {
      // Nothing left to abort!
      this.unlistenAbortSignal();
    }
    if (error) {
      Object.defineProperty(promise, "_error", {
        get: () => error
      });
      this.emit(false, key);
      return Promise.reject(error);
    }
    Object.defineProperty(promise, "_data", {
      get: () => data
    });
    this.emit(false, key);
    return data;
  }
  emit(aborted, settledKey) {
    this.subscribers.forEach(subscriber => subscriber(aborted, settledKey));
  }
  subscribe(fn) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }
  cancel() {
    this.controller.abort();
    this.pendingKeysSet.forEach((v, k) => this.pendingKeysSet.delete(k));
    this.emit(true);
  }
  async resolveData(signal) {
    let aborted = false;
    if (!this.done) {
      let onAbort = () => this.cancel();
      signal.addEventListener("abort", onAbort);
      aborted = await new Promise(resolve => {
        this.subscribe(aborted => {
          signal.removeEventListener("abort", onAbort);
          if (aborted || this.done) {
            resolve(aborted);
          }
        });
      });
    }
    return aborted;
  }
  get done() {
    return this.pendingKeysSet.size === 0;
  }
  get unwrappedData() {
    invariant(this.data !== null && this.done, "Can only unwrap data on initialized and settled deferreds");
    return Object.entries(this.data).reduce((acc, _ref2) => {
      let [key, value] = _ref2;
      return Object.assign(acc, {
        [key]: unwrapTrackedPromise(value)
      });
    }, {});
  }
  get pendingKeys() {
    return Array.from(this.pendingKeysSet);
  }
}
function isTrackedPromise(value) {
  return value instanceof Promise && value._tracked === true;
}
function unwrapTrackedPromise(value) {
  if (!isTrackedPromise(value)) {
    return value;
  }
  if (value._error) {
    throw value._error;
  }
  return value._data;
}
const defer = function defer(data, init) {
  if (init === void 0) {
    init = {};
  }
  let responseInit = typeof init === "number" ? {
    status: init
  } : init;
  return new DeferredData(data, responseInit);
};
/**
 * A redirect response. Sets the status code and the `Location` header.
 * Defaults to "302 Found".
 */
const redirect = function redirect(url, init) {
  if (init === void 0) {
    init = 302;
  }
  let responseInit = init;
  if (typeof responseInit === "number") {
    responseInit = {
      status: responseInit
    };
  } else if (typeof responseInit.status === "undefined") {
    responseInit.status = 302;
  }
  let headers = new Headers(responseInit.headers);
  headers.set("Location", url);
  return new Response(null, _extends({}, responseInit, {
    headers
  }));
};
/**
 * @private
 * Utility class we use to hold auto-unwrapped 4xx/5xx Response bodies
 */
class ErrorResponse {
  constructor(status, statusText, data, internal) {
    if (internal === void 0) {
      internal = false;
    }
    this.status = status;
    this.statusText = statusText || "";
    this.internal = internal;
    if (data instanceof Error) {
      this.data = data.toString();
      this.error = data;
    } else {
      this.data = data;
    }
  }
}
/**
 * Check if the given error is an ErrorResponse generated from a 4xx/5xx
 * Response thrown from an action/loader
 */
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}

const validMutationMethodsArr = ["post", "put", "patch", "delete"];
const validMutationMethods = new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
const validRequestMethods = new Set(validRequestMethodsArr);
const redirectStatusCodes = new Set([301, 302, 303, 307, 308]);
const redirectPreserveMethodStatusCodes = new Set([307, 308]);
const IDLE_NAVIGATION = {
  state: "idle",
  location: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_FETCHER = {
  state: "idle",
  data: undefined,
  formMethod: undefined,
  formAction: undefined,
  formEncType: undefined,
  formData: undefined
};
const IDLE_BLOCKER = {
  state: "unblocked",
  proceed: undefined,
  reset: undefined,
  location: undefined
};
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const defaultMapRouteProperties = route => ({
  hasErrorBoundary: Boolean(route.hasErrorBoundary)
});
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createRouter
////////////////////////////////////////////////////////////////////////////////
/**
 * Create a router and listen to history POP navigations
 */
function createRouter(init) {
  const routerWindow = init.window ? init.window : typeof window !== "undefined" ? window : undefined;
  const isBrowser = typeof routerWindow !== "undefined" && typeof routerWindow.document !== "undefined" && typeof routerWindow.document.createElement !== "undefined";
  const isServer = !isBrowser;
  invariant(init.routes.length > 0, "You must provide a non-empty routes array to createRouter");
  let mapRouteProperties;
  if (init.mapRouteProperties) {
    mapRouteProperties = init.mapRouteProperties;
  } else if (init.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = init.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  // Routes keyed by ID
  let manifest = {};
  // Routes in tree format for matching
  let dataRoutes = convertRoutesToDataRoutes(init.routes, mapRouteProperties, undefined, manifest);
  let inFlightDataRoutes;
  let basename = init.basename || "/";
  // Config driven behavior flags
  let future = _extends({
    v7_normalizeFormMethod: false,
    v7_prependBasename: false
  }, init.future);
  // Cleanup function for history
  let unlistenHistory = null;
  // Externally-provided functions to call on all state changes
  let subscribers = new Set();
  // Externally-provided object to hold scroll restoration locations during routing
  let savedScrollPositions = null;
  // Externally-provided function to get scroll restoration keys
  let getScrollRestorationKey = null;
  // Externally-provided function to get current scroll position
  let getScrollPosition = null;
  // One-time flag to control the initial hydration scroll restoration.  Because
  // we don't get the saved positions from <ScrollRestoration /> until _after_
  // the initial render, we need to manually trigger a separate updateState to
  // send along the restoreScrollPosition
  // Set to true if we have `hydrationData` since we assume we were SSR'd and that
  // SSR did the initial scroll restoration.
  let initialScrollRestored = init.hydrationData != null;
  let initialMatches = matchRoutes(dataRoutes, init.history.location, basename);
  let initialErrors = null;
  if (initialMatches == null) {
    // If we do not match a user-provided-route, fall back to the root
    // to allow the error boundary to take over
    let error = getInternalRouterError(404, {
      pathname: init.history.location.pathname
    });
    let {
      matches,
      route
    } = getShortCircuitMatches(dataRoutes);
    initialMatches = matches;
    initialErrors = {
      [route.id]: error
    };
  }
  let initialized =
  // All initialMatches need to be loaded before we're ready.  If we have lazy
  // functions around still then we'll need to run them in initialize()
  !initialMatches.some(m => m.route.lazy) && (
  // And we have to either have no loaders or have been provided hydrationData
  !initialMatches.some(m => m.route.loader) || init.hydrationData != null);
  let router;
  let state = {
    historyAction: init.history.action,
    location: init.history.location,
    matches: initialMatches,
    initialized,
    navigation: IDLE_NAVIGATION,
    // Don't restore on initial updateState() if we were SSR'd
    restoreScrollPosition: init.hydrationData != null ? false : null,
    preventScrollReset: false,
    revalidation: "idle",
    loaderData: init.hydrationData && init.hydrationData.loaderData || {},
    actionData: init.hydrationData && init.hydrationData.actionData || null,
    errors: init.hydrationData && init.hydrationData.errors || initialErrors,
    fetchers: new Map(),
    blockers: new Map()
  };
  // -- Stateful internal variables to manage navigations --
  // Current navigation in progress (to be committed in completeNavigation)
  let pendingAction = Action.Pop;
  // Should the current navigation prevent the scroll reset if scroll cannot
  // be restored?
  let pendingPreventScrollReset = false;
  // AbortController for the active navigation
  let pendingNavigationController;
  // We use this to avoid touching history in completeNavigation if a
  // revalidation is entirely uninterrupted
  let isUninterruptedRevalidation = false;
  // Use this internal flag to force revalidation of all loaders:
  //  - submissions (completed or interrupted)
  //  - useRevalidator()
  //  - X-Remix-Revalidate (from redirect)
  let isRevalidationRequired = false;
  // Use this internal array to capture routes that require revalidation due
  // to a cancelled deferred on action submission
  let cancelledDeferredRoutes = [];
  // Use this internal array to capture fetcher loads that were cancelled by an
  // action navigation and require revalidation
  let cancelledFetcherLoads = [];
  // AbortControllers for any in-flight fetchers
  let fetchControllers = new Map();
  // Track loads based on the order in which they started
  let incrementingLoadId = 0;
  // Track the outstanding pending navigation data load to be compared against
  // the globally incrementing load when a fetcher load lands after a completed
  // navigation
  let pendingNavigationLoadId = -1;
  // Fetchers that triggered data reloads as a result of their actions
  let fetchReloadIds = new Map();
  // Fetchers that triggered redirect navigations
  let fetchRedirectIds = new Set();
  // Most recent href/match for fetcher.load calls for fetchers
  let fetchLoadMatches = new Map();
  // Store DeferredData instances for active route matches.  When a
  // route loader returns defer() we stick one in here.  Then, when a nested
  // promise resolves we update loaderData.  If a new navigation starts we
  // cancel active deferreds for eliminated routes.
  let activeDeferreds = new Map();
  // Store blocker functions in a separate Map outside of router state since
  // we don't need to update UI state if they change
  let blockerFunctions = new Map();
  // Flag to ignore the next history update, so we can revert the URL change on
  // a POP navigation that was blocked by the user without touching router state
  let ignoreNextHistoryUpdate = false;
  // Initialize the router, all side effects should be kicked off from here.
  // Implemented as a Fluent API for ease of:
  //   let router = createRouter(init).initialize();
  function initialize() {
    // If history informs us of a POP navigation, start the navigation but do not update
    // state.  We'll update our own state once the navigation completes
    unlistenHistory = init.history.listen(_ref => {
      let {
        action: historyAction,
        location,
        delta
      } = _ref;
      // Ignore this event if it was just us resetting the URL from a
      // blocked POP navigation
      if (ignoreNextHistoryUpdate) {
        ignoreNextHistoryUpdate = false;
        return;
      }
      warning(blockerFunctions.size === 0 || delta != null, "You are trying to use a blocker on a POP navigation to a location " + "that was not created by @remix-run/router. This will fail silently in " + "production. This can happen if you are navigating outside the router " + "via `window.history.pushState`/`window.location.hash` instead of using " + "router navigation APIs.  This can also happen if you are using " + "createHashRouter and the user manually changes the URL.");
      let blockerKey = shouldBlockNavigation({
        currentLocation: state.location,
        nextLocation: location,
        historyAction
      });
      if (blockerKey && delta != null) {
        // Restore the URL to match the current UI, but don't update router state
        ignoreNextHistoryUpdate = true;
        init.history.go(delta * -1);
        // Put the blocker into a blocked state
        updateBlocker(blockerKey, {
          state: "blocked",
          location,
          proceed() {
            updateBlocker(blockerKey, {
              state: "proceeding",
              proceed: undefined,
              reset: undefined,
              location
            });
            // Re-do the same POP navigation we just blocked
            init.history.go(delta);
          },
          reset() {
            deleteBlocker(blockerKey);
            updateState({
              blockers: new Map(router.state.blockers)
            });
          }
        });
        return;
      }
      return startNavigation(historyAction, location);
    });
    // Kick off initial data load if needed.  Use Pop to avoid modifying history
    // Note we don't do any handling of lazy here.  For SPA's it'll get handled
    // in the normal navigation flow.  For SSR it's expected that lazy modules are
    // resolved prior to router creation since we can't go into a fallbackElement
    // UI for SSR'd apps
    if (!state.initialized) {
      startNavigation(Action.Pop, state.location);
    }
    return router;
  }
  // Clean up a router and it's side effects
  function dispose() {
    if (unlistenHistory) {
      unlistenHistory();
    }
    subscribers.clear();
    pendingNavigationController && pendingNavigationController.abort();
    state.fetchers.forEach((_, key) => deleteFetcher(key));
    state.blockers.forEach((_, key) => deleteBlocker(key));
  }
  // Subscribe to state updates for the router
  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }
  // Update our state and notify the calling context of the change
  function updateState(newState) {
    state = _extends({}, state, newState);
    subscribers.forEach(subscriber => subscriber(state));
  }
  // Complete a navigation returning the state.navigation back to the IDLE_NAVIGATION
  // and setting state.[historyAction/location/matches] to the new route.
  // - Location is a required param
  // - Navigation will always be set to IDLE_NAVIGATION
  // - Can pass any other state in newState
  function completeNavigation(location, newState) {
    var _location$state, _location$state2;
    // Deduce if we're in a loading/actionReload state:
    // - We have committed actionData in the store
    // - The current navigation was a mutation submission
    // - We're past the submitting state and into the loading state
    // - The location being loaded is not the result of a redirect
    let isActionReload = state.actionData != null && state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && state.navigation.state === "loading" && ((_location$state = location.state) == null ? void 0 : _location$state._isRedirect) !== true;
    let actionData;
    if (newState.actionData) {
      if (Object.keys(newState.actionData).length > 0) {
        actionData = newState.actionData;
      } else {
        // Empty actionData -> clear prior actionData due to an action error
        actionData = null;
      }
    } else if (isActionReload) {
      // Keep the current data if we're wrapping up the action reload
      actionData = state.actionData;
    } else {
      // Clear actionData on any other completed navigations
      actionData = null;
    }
    // Always preserve any existing loaderData from re-used routes
    let loaderData = newState.loaderData ? mergeLoaderData(state.loaderData, newState.loaderData, newState.matches || [], newState.errors) : state.loaderData;
    // On a successful navigation we can assume we got through all blockers
    // so we can start fresh
    for (let [key] of blockerFunctions) {
      deleteBlocker(key);
    }
    // Always respect the user flag.  Otherwise don't reset on mutation
    // submission navigations unless they redirect
    let preventScrollReset = pendingPreventScrollReset === true || state.navigation.formMethod != null && isMutationMethod(state.navigation.formMethod) && ((_location$state2 = location.state) == null ? void 0 : _location$state2._isRedirect) !== true;
    if (inFlightDataRoutes) {
      dataRoutes = inFlightDataRoutes;
      inFlightDataRoutes = undefined;
    }
    updateState(_extends({}, newState, {
      actionData,
      loaderData,
      historyAction: pendingAction,
      location,
      initialized: true,
      navigation: IDLE_NAVIGATION,
      revalidation: "idle",
      restoreScrollPosition: getSavedScrollPosition(location, newState.matches || state.matches),
      preventScrollReset,
      blockers: new Map(state.blockers)
    }));
    if (isUninterruptedRevalidation) ; else if (pendingAction === Action.Pop) ; else if (pendingAction === Action.Push) {
      init.history.push(location, location.state);
    } else if (pendingAction === Action.Replace) {
      init.history.replace(location, location.state);
    }
    // Reset stateful navigation vars
    pendingAction = Action.Pop;
    pendingPreventScrollReset = false;
    isUninterruptedRevalidation = false;
    isRevalidationRequired = false;
    cancelledDeferredRoutes = [];
    cancelledFetcherLoads = [];
  }
  // Trigger a navigation event, which can either be a numerical POP or a PUSH
  // replace with an optional submission
  async function navigate(to, opts) {
    if (typeof to === "number") {
      init.history.go(to);
      return;
    }
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, to, opts == null ? void 0 : opts.fromRouteId, opts == null ? void 0 : opts.relative);
    let {
      path,
      submission,
      error
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, false, normalizedPath, opts);
    let currentLocation = state.location;
    let nextLocation = createLocation(state.location, path, opts && opts.state);
    // When using navigate as a PUSH/REPLACE we aren't reading an already-encoded
    // URL from window.location, so we need to encode it here so the behavior
    // remains the same as POP and non-data-router usages.  new URL() does all
    // the same encoding we'd get from a history.pushState/window.location read
    // without having to touch history
    nextLocation = _extends({}, nextLocation, init.history.encodeLocation(nextLocation));
    let userReplace = opts && opts.replace != null ? opts.replace : undefined;
    let historyAction = Action.Push;
    if (userReplace === true) {
      historyAction = Action.Replace;
    } else if (userReplace === false) ; else if (submission != null && isMutationMethod(submission.formMethod) && submission.formAction === state.location.pathname + state.location.search) {
      // By default on submissions to the current location we REPLACE so that
      // users don't have to double-click the back button to get to the prior
      // location.  If the user redirects to a different location from the
      // action/loader this will be ignored and the redirect will be a PUSH
      historyAction = Action.Replace;
    }
    let preventScrollReset = opts && "preventScrollReset" in opts ? opts.preventScrollReset === true : undefined;
    let blockerKey = shouldBlockNavigation({
      currentLocation,
      nextLocation,
      historyAction
    });
    if (blockerKey) {
      // Put the blocker into a blocked state
      updateBlocker(blockerKey, {
        state: "blocked",
        location: nextLocation,
        proceed() {
          updateBlocker(blockerKey, {
            state: "proceeding",
            proceed: undefined,
            reset: undefined,
            location: nextLocation
          });
          // Send the same navigation through
          navigate(to, opts);
        },
        reset() {
          deleteBlocker(blockerKey);
          updateState({
            blockers: new Map(state.blockers)
          });
        }
      });
      return;
    }
    return await startNavigation(historyAction, nextLocation, {
      submission,
      // Send through the formData serialization error if we have one so we can
      // render at the right error boundary after we match routes
      pendingError: error,
      preventScrollReset,
      replace: opts && opts.replace
    });
  }
  // Revalidate all current loaders.  If a navigation is in progress or if this
  // is interrupted by a navigation, allow this to "succeed" by calling all
  // loaders during the next loader round
  function revalidate() {
    interruptActiveLoads();
    updateState({
      revalidation: "loading"
    });
    // If we're currently submitting an action, we don't need to start a new
    // navigation, we'll just let the follow up loader execution call all loaders
    if (state.navigation.state === "submitting") {
      return;
    }
    // If we're currently in an idle state, start a new navigation for the current
    // action/location and mark it as uninterrupted, which will skip the history
    // update in completeNavigation
    if (state.navigation.state === "idle") {
      startNavigation(state.historyAction, state.location, {
        startUninterruptedRevalidation: true
      });
      return;
    }
    // Otherwise, if we're currently in a loading state, just start a new
    // navigation to the navigation.location but do not trigger an uninterrupted
    // revalidation so that history correctly updates once the navigation completes
    startNavigation(pendingAction || state.historyAction, state.navigation.location, {
      overrideNavigation: state.navigation
    });
  }
  // Start a navigation to the given action/location.  Can optionally provide a
  // overrideNavigation which will override the normalLoad in the case of a redirect
  // navigation
  async function startNavigation(historyAction, location, opts) {
    // Abort any in-progress navigations and start a new one. Unset any ongoing
    // uninterrupted revalidations unless told otherwise, since we want this
    // new navigation to update history normally
    pendingNavigationController && pendingNavigationController.abort();
    pendingNavigationController = null;
    pendingAction = historyAction;
    isUninterruptedRevalidation = (opts && opts.startUninterruptedRevalidation) === true;
    // Save the current scroll position every time we start a new navigation,
    // and track whether we should reset scroll on completion
    saveScrollPosition(state.location, state.matches);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let loadingNavigation = opts && opts.overrideNavigation;
    let matches = matchRoutes(routesToUse, location, basename);
    // Short circuit with a 404 on the root error boundary if we match nothing
    if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(routesToUse);
      // Cancel all pending deferred on 404s since we don't keep any routes
      cancelActiveDeferreds();
      completeNavigation(location, {
        matches: notFoundMatches,
        loaderData: {},
        errors: {
          [route.id]: error
        }
      });
      return;
    }
    // Short circuit if it's only a hash change and not a revalidation or
    // mutation submission.
    //
    // Ignore on initial page loads because since the initial load will always
    // be "same hash".  For example, on /page#hash and submit a <Form method="post">
    // which will default to a navigation to /page
    if (state.initialized && !isRevalidationRequired && isHashChangeOnly(state.location, location) && !(opts && opts.submission && isMutationMethod(opts.submission.formMethod))) {
      completeNavigation(location, {
        matches
      });
      return;
    }
    // Create a controller/Request for this navigation
    pendingNavigationController = new AbortController();
    let request = createClientSideRequest(init.history, location, pendingNavigationController.signal, opts && opts.submission);
    let pendingActionData;
    let pendingError;
    if (opts && opts.pendingError) {
      // If we have a pendingError, it means the user attempted a GET submission
      // with binary FormData so assign here and skip to handleLoaders.  That
      // way we handle calling loaders above the boundary etc.  It's not really
      // different from an actionError in that sense.
      pendingError = {
        [findNearestBoundary(matches).route.id]: opts.pendingError
      };
    } else if (opts && opts.submission && isMutationMethod(opts.submission.formMethod)) {
      // Call action if we received an action submission
      let actionOutput = await handleAction(request, location, opts.submission, matches, {
        replace: opts.replace
      });
      if (actionOutput.shortCircuited) {
        return;
      }
      pendingActionData = actionOutput.pendingActionData;
      pendingError = actionOutput.pendingActionError;
      let navigation = _extends({
        state: "loading",
        location
      }, opts.submission);
      loadingNavigation = navigation;
      // Create a GET request for the loaders
      request = new Request(request.url, {
        signal: request.signal
      });
    }
    // Call loaders
    let {
      shortCircuited,
      loaderData,
      errors
    } = await handleLoaders(request, location, matches, loadingNavigation, opts && opts.submission, opts && opts.fetcherSubmission, opts && opts.replace, pendingActionData, pendingError);
    if (shortCircuited) {
      return;
    }
    // Clean up now that the action/loaders have completed.  Don't clean up if
    // we short circuited because pendingNavigationController will have already
    // been assigned to a new controller for the next navigation
    pendingNavigationController = null;
    completeNavigation(location, _extends({
      matches
    }, pendingActionData ? {
      actionData: pendingActionData
    } : {}, {
      loaderData,
      errors
    }));
  }
  // Call the action matched by the leaf route for this navigation and handle
  // redirects/errors
  async function handleAction(request, location, submission, matches, opts) {
    interruptActiveLoads();
    // Put us in a submitting state
    let navigation = _extends({
      state: "submitting",
      location
    }, submission);
    updateState({
      navigation
    });
    // Call our action and get the result
    let result;
    let actionMatch = getTargetMatch(matches, location);
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      result = {
        type: ResultType.error,
        error: getInternalRouterError(405, {
          method: request.method,
          pathname: location.pathname,
          routeId: actionMatch.route.id
        })
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename);
      if (request.signal.aborted) {
        return {
          shortCircuited: true
        };
      }
    }
    if (isRedirectResult(result)) {
      let replace;
      if (opts && opts.replace != null) {
        replace = opts.replace;
      } else {
        // If the user didn't explicity indicate replace behavior, replace if
        // we redirected to the exact same location we're currently at to avoid
        // double back-buttons
        replace = result.location === state.location.pathname + state.location.search;
      }
      await startRedirectNavigation(state, result, {
        submission,
        replace
      });
      return {
        shortCircuited: true
      };
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      // By default, all submissions are REPLACE navigations, but if the
      // action threw an error that'll be rendered in an errorElement, we fall
      // back to PUSH so that the user can use the back button to get back to
      // the pre-submission form location to try again
      if ((opts && opts.replace) !== true) {
        pendingAction = Action.Push;
      }
      return {
        // Send back an empty object we can use to clear out any prior actionData
        pendingActionData: {},
        pendingActionError: {
          [boundaryMatch.route.id]: result.error
        }
      };
    }
    if (isDeferredResult(result)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    return {
      pendingActionData: {
        [actionMatch.route.id]: result.data
      }
    };
  }
  // Call all applicable loaders for the given matches, handling redirects,
  // errors, etc.
  async function handleLoaders(request, location, matches, overrideNavigation, submission, fetcherSubmission, replace, pendingActionData, pendingError) {
    // Figure out the right navigation we want to use for data loading
    let loadingNavigation = overrideNavigation;
    if (!loadingNavigation) {
      let navigation = _extends({
        state: "loading",
        location,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined
      }, submission);
      loadingNavigation = navigation;
    }
    // If this was a redirect from an action we don't have a "submission" but
    // we have it on the loading navigation so use that if available
    let activeSubmission = submission || fetcherSubmission ? submission || fetcherSubmission : loadingNavigation.formMethod && loadingNavigation.formAction && loadingNavigation.formData && loadingNavigation.formEncType ? {
      formMethod: loadingNavigation.formMethod,
      formAction: loadingNavigation.formAction,
      formData: loadingNavigation.formData,
      formEncType: loadingNavigation.formEncType
    } : undefined;
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, activeSubmission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError);
    // Cancel pending deferreds for no-longer-matched routes or routes we're
    // about to reload.  Note that if this is an action reload we would have
    // already cancelled all pending deferreds so this would be a no-op
    cancelActiveDeferreds(routeId => !(matches && matches.some(m => m.route.id === routeId)) || matchesToLoad && matchesToLoad.some(m => m.route.id === routeId));
    // Short circuit if we have no loaders to run
    if (matchesToLoad.length === 0 && revalidatingFetchers.length === 0) {
      let updatedFetchers = markFetchRedirectsDone();
      completeNavigation(location, _extends({
        matches,
        loaderData: {},
        // Commit pending error if we're short circuiting
        errors: pendingError || null
      }, pendingActionData ? {
        actionData: pendingActionData
      } : {}, updatedFetchers ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      return {
        shortCircuited: true
      };
    }
    // If this is an uninterrupted revalidation, we remain in our current idle
    // state.  If not, we need to switch to our loading state and load data,
    // preserving any new action data or existing action data (in the case of
    // a revalidation interrupting an actionReload)
    if (!isUninterruptedRevalidation) {
      revalidatingFetchers.forEach(rf => {
        let fetcher = state.fetchers.get(rf.key);
        let revalidatingFetcher = {
          state: "loading",
          data: fetcher && fetcher.data,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined,
          " _hasFetcherDoneAnything ": true
        };
        state.fetchers.set(rf.key, revalidatingFetcher);
      });
      let actionData = pendingActionData || state.actionData;
      updateState(_extends({
        navigation: loadingNavigation
      }, actionData ? Object.keys(actionData).length === 0 ? {
        actionData: null
      } : {
        actionData
      } : {}, revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
    }
    pendingNavigationLoadId = ++incrementingLoadId;
    revalidatingFetchers.forEach(rf => {
      if (rf.controller) {
        // Fetchers use an independent AbortController so that aborting a fetcher
        // (via deleteFetcher) does not abort the triggering navigation that
        // triggered the revalidation
        fetchControllers.set(rf.key, rf.controller);
      }
    });
    // Proxy navigation abort through to revalidation fetchers
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(f => abortFetcher(f.key));
    if (pendingNavigationController) {
      pendingNavigationController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    }
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, request);
    if (request.signal.aborted) {
      return {
        shortCircuited: true
      };
    }
    // Clean up _after_ loaders have completed.  Don't clean up if we short
    // circuited because fetchControllers would have been aborted and
    // reassigned to new controllers for the next navigation
    if (pendingNavigationController) {
      pendingNavigationController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    }
    revalidatingFetchers.forEach(rf => fetchControllers.delete(rf.key));
    // If any loaders returned a redirect Response, start a new REPLACE navigation
    let redirect = findRedirect(results);
    if (redirect) {
      await startRedirectNavigation(state, redirect, {
        replace
      });
      return {
        shortCircuited: true
      };
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, matches, matchesToLoad, loaderResults, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Wire up subscribers to update loaderData as promises settle
    activeDeferreds.forEach((deferredData, routeId) => {
      deferredData.subscribe(aborted => {
        // Note: No need to updateState here since the TrackedPromise on
        // loaderData is stable across resolve/reject
        // Remove this instance if we were aborted or if promises have settled
        if (aborted || deferredData.done) {
          activeDeferreds.delete(routeId);
        }
      });
    });
    let updatedFetchers = markFetchRedirectsDone();
    let didAbortFetchLoads = abortStaleFetchLoads(pendingNavigationLoadId);
    let shouldUpdateFetchers = updatedFetchers || didAbortFetchLoads || revalidatingFetchers.length > 0;
    return _extends({
      loaderData,
      errors
    }, shouldUpdateFetchers ? {
      fetchers: new Map(state.fetchers)
    } : {});
  }
  function getFetcher(key) {
    return state.fetchers.get(key) || IDLE_FETCHER;
  }
  // Trigger a fetcher load/submit for the given fetcher key
  function fetch(key, routeId, href, opts) {
    if (isServer) {
      throw new Error("router.fetch() was called during the server render, but it shouldn't be. " + "You are likely calling a useFetcher() method in the body of your component. " + "Try moving it to a useEffect or a callback.");
    }
    if (fetchControllers.has(key)) abortFetcher(key);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let normalizedPath = normalizeTo(state.location, state.matches, basename, future.v7_prependBasename, href, routeId, opts == null ? void 0 : opts.relative);
    let matches = matchRoutes(routesToUse, normalizedPath, basename);
    if (!matches) {
      setFetcherError(key, routeId, getInternalRouterError(404, {
        pathname: normalizedPath
      }));
      return;
    }
    let {
      path,
      submission
    } = normalizeNavigateOptions(future.v7_normalizeFormMethod, true, normalizedPath, opts);
    let match = getTargetMatch(matches, path);
    pendingPreventScrollReset = (opts && opts.preventScrollReset) === true;
    if (submission && isMutationMethod(submission.formMethod)) {
      handleFetcherAction(key, routeId, path, match, matches, submission);
      return;
    }
    // Store off the match so we can call it's shouldRevalidate on subsequent
    // revalidations
    fetchLoadMatches.set(key, {
      routeId,
      path
    });
    handleFetcherLoader(key, routeId, path, match, matches, submission);
  }
  // Call the action for the matched fetcher.submit(), and then handle redirects,
  // errors, and revalidation
  async function handleFetcherAction(key, routeId, path, match, requestMatches, submission) {
    interruptActiveLoads();
    fetchLoadMatches.delete(key);
    if (!match.route.action && !match.route.lazy) {
      let error = getInternalRouterError(405, {
        method: submission.formMethod,
        pathname: path,
        routeId: routeId
      });
      setFetcherError(key, routeId, error);
      return;
    }
    // Put this fetcher into it's submitting state
    let existingFetcher = state.fetchers.get(key);
    let fetcher = _extends({
      state: "submitting"
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, fetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
    // Call the action for the fetcher
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal, submission);
    fetchControllers.set(key, abortController);
    let actionResult = await callLoaderOrAction("action", fetchRequest, match, requestMatches, manifest, mapRouteProperties, basename);
    if (fetchRequest.signal.aborted) {
      // We can delete this so long as we weren't aborted by ou our own fetcher
      // re-submit which would have put _new_ controller is in fetchControllers
      if (fetchControllers.get(key) === abortController) {
        fetchControllers.delete(key);
      }
      return;
    }
    if (isRedirectResult(actionResult)) {
      fetchControllers.delete(key);
      fetchRedirectIds.add(key);
      let loadingFetcher = _extends({
        state: "loading"
      }, submission, {
        data: undefined,
        " _hasFetcherDoneAnything ": true
      });
      state.fetchers.set(key, loadingFetcher);
      updateState({
        fetchers: new Map(state.fetchers)
      });
      return startRedirectNavigation(state, actionResult, {
        submission,
        isFetchActionRedirect: true
      });
    }
    // Process any non-redirect errors thrown
    if (isErrorResult(actionResult)) {
      setFetcherError(key, routeId, actionResult.error);
      return;
    }
    if (isDeferredResult(actionResult)) {
      throw getInternalRouterError(400, {
        type: "defer-action"
      });
    }
    // Start the data load for current matches, or the next location if we're
    // in the middle of a navigation
    let nextLocation = state.navigation.location || state.location;
    let revalidationRequest = createClientSideRequest(init.history, nextLocation, abortController.signal);
    let routesToUse = inFlightDataRoutes || dataRoutes;
    let matches = state.navigation.state !== "idle" ? matchRoutes(routesToUse, state.navigation.location, basename) : state.matches;
    invariant(matches, "Didn't find any matches after fetcher action");
    let loadId = ++incrementingLoadId;
    fetchReloadIds.set(key, loadId);
    let loadFetcher = _extends({
      state: "loading",
      data: actionResult.data
    }, submission, {
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, loadFetcher);
    let [matchesToLoad, revalidatingFetchers] = getMatchesToLoad(init.history, state, matches, submission, nextLocation, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, {
      [match.route.id]: actionResult.data
    }, undefined // No need to send through errors since we short circuit above
    );
    // Put all revalidating fetchers into the loading state, except for the
    // current fetcher which we want to keep in it's current loading state which
    // contains it's action submission info + action data
    revalidatingFetchers.filter(rf => rf.key !== key).forEach(rf => {
      let staleKey = rf.key;
      let existingFetcher = state.fetchers.get(staleKey);
      let revalidatingFetcher = {
        state: "loading",
        data: existingFetcher && existingFetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(staleKey, revalidatingFetcher);
      if (rf.controller) {
        fetchControllers.set(staleKey, rf.controller);
      }
    });
    updateState({
      fetchers: new Map(state.fetchers)
    });
    let abortPendingFetchRevalidations = () => revalidatingFetchers.forEach(rf => abortFetcher(rf.key));
    abortController.signal.addEventListener("abort", abortPendingFetchRevalidations);
    let {
      results,
      loaderResults,
      fetcherResults
    } = await callLoadersAndMaybeResolveData(state.matches, matches, matchesToLoad, revalidatingFetchers, revalidationRequest);
    if (abortController.signal.aborted) {
      return;
    }
    abortController.signal.removeEventListener("abort", abortPendingFetchRevalidations);
    fetchReloadIds.delete(key);
    fetchControllers.delete(key);
    revalidatingFetchers.forEach(r => fetchControllers.delete(r.key));
    let redirect = findRedirect(results);
    if (redirect) {
      return startRedirectNavigation(state, redirect);
    }
    // Process and commit output from loaders
    let {
      loaderData,
      errors
    } = processLoaderData(state, state.matches, matchesToLoad, loaderResults, undefined, revalidatingFetchers, fetcherResults, activeDeferreds);
    // Since we let revalidations complete even if the submitting fetcher was
    // deleted, only put it back to idle if it hasn't been deleted
    if (state.fetchers.has(key)) {
      let doneFetcher = {
        state: "idle",
        data: actionResult.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
    let didAbortFetchLoads = abortStaleFetchLoads(loadId);
    // If we are currently in a navigation loading state and this fetcher is
    // more recent than the navigation, we want the newer data so abort the
    // navigation and complete it with the fetcher data
    if (state.navigation.state === "loading" && loadId > pendingNavigationLoadId) {
      invariant(pendingAction, "Expected pending action");
      pendingNavigationController && pendingNavigationController.abort();
      completeNavigation(state.navigation.location, {
        matches,
        loaderData,
        errors,
        fetchers: new Map(state.fetchers)
      });
    } else {
      // otherwise just update with the fetcher data, preserving any existing
      // loaderData for loaders that did not need to reload.  We have to
      // manually merge here since we aren't going through completeNavigation
      updateState(_extends({
        errors,
        loaderData: mergeLoaderData(state.loaderData, loaderData, matches, errors)
      }, didAbortFetchLoads || revalidatingFetchers.length > 0 ? {
        fetchers: new Map(state.fetchers)
      } : {}));
      isRevalidationRequired = false;
    }
  }
  // Call the matched loader for fetcher.load(), handling redirects, errors, etc.
  async function handleFetcherLoader(key, routeId, path, match, matches, submission) {
    let existingFetcher = state.fetchers.get(key);
    // Put this fetcher into it's loading state
    let loadingFetcher = _extends({
      state: "loading",
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined
    }, submission, {
      data: existingFetcher && existingFetcher.data,
      " _hasFetcherDoneAnything ": true
    });
    state.fetchers.set(key, loadingFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
    // Call the loader for this fetcher route match
    let abortController = new AbortController();
    let fetchRequest = createClientSideRequest(init.history, path, abortController.signal);
    fetchControllers.set(key, abortController);
    let result = await callLoaderOrAction("loader", fetchRequest, match, matches, manifest, mapRouteProperties, basename);
    // Deferred isn't supported for fetcher loads, await everything and treat it
    // as a normal load.  resolveDeferredData will return undefined if this
    // fetcher gets aborted, so we just leave result untouched and short circuit
    // below if that happens
    if (isDeferredResult(result)) {
      result = (await resolveDeferredData(result, fetchRequest.signal, true)) || result;
    }
    // We can delete this so long as we weren't aborted by our our own fetcher
    // re-load which would have put _new_ controller is in fetchControllers
    if (fetchControllers.get(key) === abortController) {
      fetchControllers.delete(key);
    }
    if (fetchRequest.signal.aborted) {
      return;
    }
    // If the loader threw a redirect Response, start a new REPLACE navigation
    if (isRedirectResult(result)) {
      fetchRedirectIds.add(key);
      await startRedirectNavigation(state, result);
      return;
    }
    // Process any non-redirect errors thrown
    if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, routeId);
      state.fetchers.delete(key);
      // TODO: In remix, this would reset to IDLE_NAVIGATION if it was a catch -
      // do we need to behave any differently with our non-redirect errors?
      // What if it was a non-redirect Response?
      updateState({
        fetchers: new Map(state.fetchers),
        errors: {
          [boundaryMatch.route.id]: result.error
        }
      });
      return;
    }
    invariant(!isDeferredResult(result), "Unhandled fetcher deferred data");
    // Put the fetcher back into an idle state
    let doneFetcher = {
      state: "idle",
      data: result.data,
      formMethod: undefined,
      formAction: undefined,
      formEncType: undefined,
      formData: undefined,
      " _hasFetcherDoneAnything ": true
    };
    state.fetchers.set(key, doneFetcher);
    updateState({
      fetchers: new Map(state.fetchers)
    });
  }
  /**
   * Utility function to handle redirects returned from an action or loader.
   * Normally, a redirect "replaces" the navigation that triggered it.  So, for
   * example:
   *
   *  - user is on /a
   *  - user clicks a link to /b
   *  - loader for /b redirects to /c
   *
   * In a non-JS app the browser would track the in-flight navigation to /b and
   * then replace it with /c when it encountered the redirect response.  In
   * the end it would only ever update the URL bar with /c.
   *
   * In client-side routing using pushState/replaceState, we aim to emulate
   * this behavior and we also do not update history until the end of the
   * navigation (including processed redirects).  This means that we never
   * actually touch history until we've processed redirects, so we just use
   * the history action from the original navigation (PUSH or REPLACE).
   */
  async function startRedirectNavigation(state, redirect, _temp) {
    let {
      submission,
      replace,
      isFetchActionRedirect
    } = _temp === void 0 ? {} : _temp;
    if (redirect.revalidate) {
      isRevalidationRequired = true;
    }
    let redirectLocation = createLocation(state.location, redirect.location, // TODO: This can be removed once we get rid of useTransition in Remix v2
    _extends({
      _isRedirect: true
    }, isFetchActionRedirect ? {
      _isFetchActionRedirect: true
    } : {}));
    invariant(redirectLocation, "Expected a location on the redirect navigation");
    // Check if this an absolute external redirect that goes to a new origin
    if (ABSOLUTE_URL_REGEX.test(redirect.location) && isBrowser) {
      let url = init.history.createURL(redirect.location);
      let isDifferentBasename = stripBasename(url.pathname, basename) == null;
      if (routerWindow.location.origin !== url.origin || isDifferentBasename) {
        if (replace) {
          routerWindow.location.replace(redirect.location);
        } else {
          routerWindow.location.assign(redirect.location);
        }
        return;
      }
    }
    // There's no need to abort on redirects, since we don't detect the
    // redirect until the action/loaders have settled
    pendingNavigationController = null;
    let redirectHistoryAction = replace === true ? Action.Replace : Action.Push;
    // Use the incoming submission if provided, fallback on the active one in
    // state.navigation
    let {
      formMethod,
      formAction,
      formEncType,
      formData
    } = state.navigation;
    if (!submission && formMethod && formAction && formData && formEncType) {
      submission = {
        formMethod,
        formAction,
        formEncType,
        formData
      };
    }
    // If this was a 307/308 submission we want to preserve the HTTP method and
    // re-submit the GET/POST/PUT/PATCH/DELETE as a submission navigation to the
    // redirected location
    if (redirectPreserveMethodStatusCodes.has(redirect.status) && submission && isMutationMethod(submission.formMethod)) {
      await startNavigation(redirectHistoryAction, redirectLocation, {
        submission: _extends({}, submission, {
          formAction: redirect.location
        }),
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else if (isFetchActionRedirect) {
      // For a fetch action redirect, we kick off a new loading navigation
      // without the fetcher submission, but we send it along for shouldRevalidate
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: undefined,
          formAction: undefined,
          formEncType: undefined,
          formData: undefined
        },
        fetcherSubmission: submission,
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    } else {
      // Otherwise, we kick off a new loading navigation, preserving the
      // submission info for the duration of this navigation
      await startNavigation(redirectHistoryAction, redirectLocation, {
        overrideNavigation: {
          state: "loading",
          location: redirectLocation,
          formMethod: submission ? submission.formMethod : undefined,
          formAction: submission ? submission.formAction : undefined,
          formEncType: submission ? submission.formEncType : undefined,
          formData: submission ? submission.formData : undefined
        },
        // Preserve this flag across redirects
        preventScrollReset: pendingPreventScrollReset
      });
    }
  }
  async function callLoadersAndMaybeResolveData(currentMatches, matches, matchesToLoad, fetchersToLoad, request) {
    // Call all navigation loaders and revalidating fetcher loaders in parallel,
    // then slice off the results into separate arrays so we can handle them
    // accordingly
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties, basename)), ...fetchersToLoad.map(f => {
      if (f.matches && f.match && f.controller) {
        return callLoaderOrAction("loader", createClientSideRequest(init.history, f.path, f.controller.signal), f.match, f.matches, manifest, mapRouteProperties, basename);
      } else {
        let error = {
          type: ResultType.error,
          error: getInternalRouterError(404, {
            pathname: f.path
          })
        };
        return error;
      }
    })]);
    let loaderResults = results.slice(0, matchesToLoad.length);
    let fetcherResults = results.slice(matchesToLoad.length);
    await Promise.all([resolveDeferredResults(currentMatches, matchesToLoad, loaderResults, loaderResults.map(() => request.signal), false, state.loaderData), resolveDeferredResults(currentMatches, fetchersToLoad.map(f => f.match), fetcherResults, fetchersToLoad.map(f => f.controller ? f.controller.signal : null), true)]);
    return {
      results,
      loaderResults,
      fetcherResults
    };
  }
  function interruptActiveLoads() {
    // Every interruption triggers a revalidation
    isRevalidationRequired = true;
    // Cancel pending route-level deferreds and mark cancelled routes for
    // revalidation
    cancelledDeferredRoutes.push(...cancelActiveDeferreds());
    // Abort in-flight fetcher loads
    fetchLoadMatches.forEach((_, key) => {
      if (fetchControllers.has(key)) {
        cancelledFetcherLoads.push(key);
        abortFetcher(key);
      }
    });
  }
  function setFetcherError(key, routeId, error) {
    let boundaryMatch = findNearestBoundary(state.matches, routeId);
    deleteFetcher(key);
    updateState({
      errors: {
        [boundaryMatch.route.id]: error
      },
      fetchers: new Map(state.fetchers)
    });
  }
  function deleteFetcher(key) {
    let fetcher = state.fetchers.get(key);
    // Don't abort the controller if this is a deletion of a fetcher.submit()
    // in it's loading phase since - we don't want to abort the corresponding
    // revalidation and want them to complete and land
    if (fetchControllers.has(key) && !(fetcher && fetcher.state === "loading" && fetchReloadIds.has(key))) {
      abortFetcher(key);
    }
    fetchLoadMatches.delete(key);
    fetchReloadIds.delete(key);
    fetchRedirectIds.delete(key);
    state.fetchers.delete(key);
  }
  function abortFetcher(key) {
    let controller = fetchControllers.get(key);
    invariant(controller, "Expected fetch controller: " + key);
    controller.abort();
    fetchControllers.delete(key);
  }
  function markFetchersDone(keys) {
    for (let key of keys) {
      let fetcher = getFetcher(key);
      let doneFetcher = {
        state: "idle",
        data: fetcher.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  function markFetchRedirectsDone() {
    let doneKeys = [];
    let updatedFetchers = false;
    for (let key of fetchRedirectIds) {
      let fetcher = state.fetchers.get(key);
      invariant(fetcher, "Expected fetcher: " + key);
      if (fetcher.state === "loading") {
        fetchRedirectIds.delete(key);
        doneKeys.push(key);
        updatedFetchers = true;
      }
    }
    markFetchersDone(doneKeys);
    return updatedFetchers;
  }
  function abortStaleFetchLoads(landedId) {
    let yeetedKeys = [];
    for (let [key, id] of fetchReloadIds) {
      if (id < landedId) {
        let fetcher = state.fetchers.get(key);
        invariant(fetcher, "Expected fetcher: " + key);
        if (fetcher.state === "loading") {
          abortFetcher(key);
          fetchReloadIds.delete(key);
          yeetedKeys.push(key);
        }
      }
    }
    markFetchersDone(yeetedKeys);
    return yeetedKeys.length > 0;
  }
  function getBlocker(key, fn) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    if (blockerFunctions.get(key) !== fn) {
      blockerFunctions.set(key, fn);
    }
    return blocker;
  }
  function deleteBlocker(key) {
    state.blockers.delete(key);
    blockerFunctions.delete(key);
  }
  // Utility function to update blockers, ensuring valid state transitions
  function updateBlocker(key, newBlocker) {
    let blocker = state.blockers.get(key) || IDLE_BLOCKER;
    // Poor mans state machine :)
    // https://mermaid.live/edit#pako:eNqVkc9OwzAMxl8l8nnjAYrEtDIOHEBIgwvKJTReGy3_lDpIqO27k6awMG0XcrLlnz87nwdonESogKXXBuE79rq75XZO3-yHds0RJVuv70YrPlUrCEe2HfrORS3rubqZfuhtpg5C9wk5tZ4VKcRUq88q9Z8RS0-48cE1iHJkL0ugbHuFLus9L6spZy8nX9MP2CNdomVaposqu3fGayT8T8-jJQwhepo_UtpgBQaDEUom04dZhAN1aJBDlUKJBxE1ceB2Smj0Mln-IBW5AFU2dwUiktt_2Qaq2dBfaKdEup85UV7Yd-dKjlnkabl2Pvr0DTkTreM
    invariant(blocker.state === "unblocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "blocked" || blocker.state === "blocked" && newBlocker.state === "proceeding" || blocker.state === "blocked" && newBlocker.state === "unblocked" || blocker.state === "proceeding" && newBlocker.state === "unblocked", "Invalid blocker state transition: " + blocker.state + " -> " + newBlocker.state);
    state.blockers.set(key, newBlocker);
    updateState({
      blockers: new Map(state.blockers)
    });
  }
  function shouldBlockNavigation(_ref2) {
    let {
      currentLocation,
      nextLocation,
      historyAction
    } = _ref2;
    if (blockerFunctions.size === 0) {
      return;
    }
    // We ony support a single active blocker at the moment since we don't have
    // any compelling use cases for multi-blocker yet
    if (blockerFunctions.size > 1) {
      warning(false, "A router only supports one blocker at a time");
    }
    let entries = Array.from(blockerFunctions.entries());
    let [blockerKey, blockerFunction] = entries[entries.length - 1];
    let blocker = state.blockers.get(blockerKey);
    if (blocker && blocker.state === "proceeding") {
      // If the blocker is currently proceeding, we don't need to re-check
      // it and can let this navigation continue
      return;
    }
    // At this point, we know we're unblocked/blocked so we need to check the
    // user-provided blocker function
    if (blockerFunction({
      currentLocation,
      nextLocation,
      historyAction
    })) {
      return blockerKey;
    }
  }
  function cancelActiveDeferreds(predicate) {
    let cancelledRouteIds = [];
    activeDeferreds.forEach((dfd, routeId) => {
      if (!predicate || predicate(routeId)) {
        // Cancel the deferred - but do not remove from activeDeferreds here -
        // we rely on the subscribers to do that so our tests can assert proper
        // cleanup via _internalActiveDeferreds
        dfd.cancel();
        cancelledRouteIds.push(routeId);
        activeDeferreds.delete(routeId);
      }
    });
    return cancelledRouteIds;
  }
  // Opt in to capturing and reporting scroll positions during navigations,
  // used by the <ScrollRestoration> component
  function enableScrollRestoration(positions, getPosition, getKey) {
    savedScrollPositions = positions;
    getScrollPosition = getPosition;
    getScrollRestorationKey = getKey || (location => location.key);
    // Perform initial hydration scroll restoration, since we miss the boat on
    // the initial updateState() because we've not yet rendered <ScrollRestoration/>
    // and therefore have no savedScrollPositions available
    if (!initialScrollRestored && state.navigation === IDLE_NAVIGATION) {
      initialScrollRestored = true;
      let y = getSavedScrollPosition(state.location, state.matches);
      if (y != null) {
        updateState({
          restoreScrollPosition: y
        });
      }
    }
    return () => {
      savedScrollPositions = null;
      getScrollPosition = null;
      getScrollRestorationKey = null;
    };
  }
  function saveScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      savedScrollPositions[key] = getScrollPosition();
    }
  }
  function getSavedScrollPosition(location, matches) {
    if (savedScrollPositions && getScrollRestorationKey && getScrollPosition) {
      let userMatches = matches.map(m => createUseMatchesMatch(m, state.loaderData));
      let key = getScrollRestorationKey(location, userMatches) || location.key;
      let y = savedScrollPositions[key];
      if (typeof y === "number") {
        return y;
      }
    }
    return null;
  }
  function _internalSetRoutes(newRoutes) {
    manifest = {};
    inFlightDataRoutes = convertRoutesToDataRoutes(newRoutes, mapRouteProperties, undefined, manifest);
  }
  router = {
    get basename() {
      return basename;
    },
    get state() {
      return state;
    },
    get routes() {
      return dataRoutes;
    },
    initialize,
    subscribe,
    enableScrollRestoration,
    navigate,
    fetch,
    revalidate,
    // Passthrough to history-aware createHref used by useHref so we get proper
    // hash-aware URLs in DOM paths
    createHref: to => init.history.createHref(to),
    encodeLocation: to => init.history.encodeLocation(to),
    getFetcher,
    deleteFetcher,
    dispose,
    getBlocker,
    deleteBlocker,
    _internalFetchControllers: fetchControllers,
    _internalActiveDeferreds: activeDeferreds,
    // TODO: Remove setRoutes, it's temporary to avoid dealing with
    // updating the tree while validating the update algorithm.
    _internalSetRoutes
  };
  return router;
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region createStaticHandler
////////////////////////////////////////////////////////////////////////////////
const UNSAFE_DEFERRED_SYMBOL = Symbol("deferred");
function createStaticHandler(routes, opts) {
  invariant(routes.length > 0, "You must provide a non-empty routes array to createStaticHandler");
  let manifest = {};
  let basename = (opts ? opts.basename : null) || "/";
  let mapRouteProperties;
  if (opts != null && opts.mapRouteProperties) {
    mapRouteProperties = opts.mapRouteProperties;
  } else if (opts != null && opts.detectErrorBoundary) {
    // If they are still using the deprecated version, wrap it with the new API
    let detectErrorBoundary = opts.detectErrorBoundary;
    mapRouteProperties = route => ({
      hasErrorBoundary: detectErrorBoundary(route)
    });
  } else {
    mapRouteProperties = defaultMapRouteProperties;
  }
  let dataRoutes = convertRoutesToDataRoutes(routes, mapRouteProperties, undefined, manifest);
  /**
   * The query() method is intended for document requests, in which we want to
   * call an optional action and potentially multiple loaders for all nested
   * routes.  It returns a StaticHandlerContext object, which is very similar
   * to the router state (location, loaderData, actionData, errors, etc.) and
   * also adds SSR-specific information such as the statusCode and headers
   * from action/loaders Responses.
   *
   * It _should_ never throw and should report all errors through the
   * returned context.errors object, properly associating errors to their error
   * boundary.  Additionally, it tracks _deepestRenderedBoundaryId which can be
   * used to emulate React error boundaries during SSr by performing a second
   * pass only down to the boundaryId.
   *
   * The one exception where we do not return a StaticHandlerContext is when a
   * redirect response is returned or thrown from any action/loader.  We
   * propagate that out and return the raw Response so the HTTP server can
   * return it directly.
   */
  async function query(request, _temp2) {
    let {
      requestContext
    } = _temp2 === void 0 ? {} : _temp2;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD") {
      let error = getInternalRouterError(405, {
        method
      });
      let {
        matches: methodNotAllowedMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: methodNotAllowedMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    } else if (!matches) {
      let error = getInternalRouterError(404, {
        pathname: location.pathname
      });
      let {
        matches: notFoundMatches,
        route
      } = getShortCircuitMatches(dataRoutes);
      return {
        basename,
        location,
        matches: notFoundMatches,
        loaderData: {},
        actionData: null,
        errors: {
          [route.id]: error
        },
        statusCode: error.status,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    let result = await queryImpl(request, location, matches, requestContext);
    if (isResponse(result)) {
      return result;
    }
    // When returning StaticHandlerContext, we patch back in the location here
    // since we need it for React Context.  But this helps keep our submit and
    // loadRouteData operating on a Request instead of a Location
    return _extends({
      location,
      basename
    }, result);
  }
  /**
   * The queryRoute() method is intended for targeted route requests, either
   * for fetch ?_data requests or resource route requests.  In this case, we
   * are only ever calling a single action or loader, and we are returning the
   * returned value directly.  In most cases, this will be a Response returned
   * from the action/loader, but it may be a primitive or other value as well -
   * and in such cases the calling context should handle that accordingly.
   *
   * We do respect the throw/return differentiation, so if an action/loader
   * throws, then this method will throw the value.  This is important so we
   * can do proper boundary identification in Remix where a thrown Response
   * must go to the Catch Boundary but a returned Response is happy-path.
   *
   * One thing to note is that any Router-initiated Errors that make sense
   * to associate with a status code will be thrown as an ErrorResponse
   * instance which include the raw Error, such that the calling context can
   * serialize the error as they see fit while including the proper response
   * code.  Examples here are 404 and 405 errors that occur prior to reaching
   * any user-defined loaders.
   */
  async function queryRoute(request, _temp3) {
    let {
      routeId,
      requestContext
    } = _temp3 === void 0 ? {} : _temp3;
    let url = new URL(request.url);
    let method = request.method;
    let location = createLocation("", createPath(url), null, "default");
    let matches = matchRoutes(dataRoutes, location, basename);
    // SSR supports HEAD requests while SPA doesn't
    if (!isValidMethod(method) && method !== "HEAD" && method !== "OPTIONS") {
      throw getInternalRouterError(405, {
        method
      });
    } else if (!matches) {
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let match = routeId ? matches.find(m => m.route.id === routeId) : getTargetMatch(matches, location);
    if (routeId && !match) {
      throw getInternalRouterError(403, {
        pathname: location.pathname,
        routeId
      });
    } else if (!match) {
      // This should never hit I don't think?
      throw getInternalRouterError(404, {
        pathname: location.pathname
      });
    }
    let result = await queryImpl(request, location, matches, requestContext, match);
    if (isResponse(result)) {
      return result;
    }
    let error = result.errors ? Object.values(result.errors)[0] : undefined;
    if (error !== undefined) {
      // If we got back result.errors, that means the loader/action threw
      // _something_ that wasn't a Response, but it's not guaranteed/required
      // to be an `instanceof Error` either, so we have to use throw here to
      // preserve the "error" state outside of queryImpl.
      throw error;
    }
    // Pick off the right state value to return
    if (result.actionData) {
      return Object.values(result.actionData)[0];
    }
    if (result.loaderData) {
      var _result$activeDeferre;
      let data = Object.values(result.loaderData)[0];
      if ((_result$activeDeferre = result.activeDeferreds) != null && _result$activeDeferre[match.route.id]) {
        data[UNSAFE_DEFERRED_SYMBOL] = result.activeDeferreds[match.route.id];
      }
      return data;
    }
    return undefined;
  }
  async function queryImpl(request, location, matches, requestContext, routeMatch) {
    invariant(request.signal, "query()/queryRoute() requests must contain an AbortController signal");
    try {
      if (isMutationMethod(request.method.toLowerCase())) {
        let result = await submit(request, matches, routeMatch || getTargetMatch(matches, location), requestContext, routeMatch != null);
        return result;
      }
      let result = await loadRouteData(request, matches, requestContext, routeMatch);
      return isResponse(result) ? result : _extends({}, result, {
        actionData: null,
        actionHeaders: {}
      });
    } catch (e) {
      // If the user threw/returned a Response in callLoaderOrAction, we throw
      // it to bail out and then return or throw here based on whether the user
      // returned or threw
      if (isQueryRouteResponse(e)) {
        if (e.type === ResultType.error && !isRedirectResponse(e.response)) {
          throw e.response;
        }
        return e.response;
      }
      // Redirects are always returned since they don't propagate to catch
      // boundaries
      if (isRedirectResponse(e)) {
        return e;
      }
      throw e;
    }
  }
  async function submit(request, matches, actionMatch, requestContext, isRouteRequest) {
    let result;
    if (!actionMatch.route.action && !actionMatch.route.lazy) {
      let error = getInternalRouterError(405, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: actionMatch.route.id
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    } else {
      result = await callLoaderOrAction("action", request, actionMatch, matches, manifest, mapRouteProperties, basename, true, isRouteRequest, requestContext);
      if (request.signal.aborted) {
        let method = isRouteRequest ? "queryRoute" : "query";
        throw new Error(method + "() call aborted");
      }
    }
    if (isRedirectResult(result)) {
      // Uhhhh - this should never happen, we should always throw these from
      // callLoaderOrAction, but the type narrowing here keeps TS happy and we
      // can get back on the "throw all redirect responses" train here should
      // this ever happen :/
      throw new Response(null, {
        status: result.status,
        headers: {
          Location: result.location
        }
      });
    }
    if (isDeferredResult(result)) {
      let error = getInternalRouterError(400, {
        type: "defer-action"
      });
      if (isRouteRequest) {
        throw error;
      }
      result = {
        type: ResultType.error,
        error
      };
    }
    if (isRouteRequest) {
      // Note: This should only be non-Response values if we get here, since
      // isRouteRequest should throw any Response received in callLoaderOrAction
      if (isErrorResult(result)) {
        throw result.error;
      }
      return {
        matches: [actionMatch],
        loaderData: {},
        actionData: {
          [actionMatch.route.id]: result.data
        },
        errors: null,
        // Note: statusCode + headers are unused here since queryRoute will
        // return the raw Response or value
        statusCode: 200,
        loaderHeaders: {},
        actionHeaders: {},
        activeDeferreds: null
      };
    }
    if (isErrorResult(result)) {
      // Store off the pending error - we use it to determine which loaders
      // to call and will commit it when we complete the navigation
      let boundaryMatch = findNearestBoundary(matches, actionMatch.route.id);
      let context = await loadRouteData(request, matches, requestContext, undefined, {
        [boundaryMatch.route.id]: result.error
      });
      // action status codes take precedence over loader status codes
      return _extends({}, context, {
        statusCode: isRouteErrorResponse(result.error) ? result.error.status : 500,
        actionData: null,
        actionHeaders: _extends({}, result.headers ? {
          [actionMatch.route.id]: result.headers
        } : {})
      });
    }
    // Create a GET request for the loaders
    let loaderRequest = new Request(request.url, {
      headers: request.headers,
      redirect: request.redirect,
      signal: request.signal
    });
    let context = await loadRouteData(loaderRequest, matches, requestContext);
    return _extends({}, context, result.statusCode ? {
      statusCode: result.statusCode
    } : {}, {
      actionData: {
        [actionMatch.route.id]: result.data
      },
      actionHeaders: _extends({}, result.headers ? {
        [actionMatch.route.id]: result.headers
      } : {})
    });
  }
  async function loadRouteData(request, matches, requestContext, routeMatch, pendingActionError) {
    let isRouteRequest = routeMatch != null;
    // Short circuit if we have no loaders to run (queryRoute())
    if (isRouteRequest && !(routeMatch != null && routeMatch.route.loader) && !(routeMatch != null && routeMatch.route.lazy)) {
      throw getInternalRouterError(400, {
        method: request.method,
        pathname: new URL(request.url).pathname,
        routeId: routeMatch == null ? void 0 : routeMatch.route.id
      });
    }
    let requestMatches = routeMatch ? [routeMatch] : getLoaderMatchesUntilBoundary(matches, Object.keys(pendingActionError || {})[0]);
    let matchesToLoad = requestMatches.filter(m => m.route.loader || m.route.lazy);
    // Short circuit if we have no loaders to run (query())
    if (matchesToLoad.length === 0) {
      return {
        matches,
        // Add a null for all matched routes for proper revalidation on the client
        loaderData: matches.reduce((acc, m) => Object.assign(acc, {
          [m.route.id]: null
        }), {}),
        errors: pendingActionError || null,
        statusCode: 200,
        loaderHeaders: {},
        activeDeferreds: null
      };
    }
    let results = await Promise.all([...matchesToLoad.map(match => callLoaderOrAction("loader", request, match, matches, manifest, mapRouteProperties, basename, true, isRouteRequest, requestContext))]);
    if (request.signal.aborted) {
      let method = isRouteRequest ? "queryRoute" : "query";
      throw new Error(method + "() call aborted");
    }
    // Process and commit output from loaders
    let activeDeferreds = new Map();
    let context = processRouteLoaderData(matches, matchesToLoad, results, pendingActionError, activeDeferreds);
    // Add a null for any non-loader matches for proper revalidation on the client
    let executedLoaders = new Set(matchesToLoad.map(match => match.route.id));
    matches.forEach(match => {
      if (!executedLoaders.has(match.route.id)) {
        context.loaderData[match.route.id] = null;
      }
    });
    return _extends({}, context, {
      matches,
      activeDeferreds: activeDeferreds.size > 0 ? Object.fromEntries(activeDeferreds.entries()) : null
    });
  }
  return {
    dataRoutes,
    query,
    queryRoute
  };
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Helpers
////////////////////////////////////////////////////////////////////////////////
/**
 * Given an existing StaticHandlerContext and an error thrown at render time,
 * provide an updated StaticHandlerContext suitable for a second SSR render
 */
function getStaticContextFromError(routes, context, error) {
  let newContext = _extends({}, context, {
    statusCode: 500,
    errors: {
      [context._deepestRenderedBoundaryId || routes[0].id]: error
    }
  });
  return newContext;
}
function isSubmissionNavigation(opts) {
  return opts != null && "formData" in opts;
}
function normalizeTo(location, matches, basename, prependBasename, to, fromRouteId, relative) {
  let contextualMatches;
  let activeRouteMatch;
  if (fromRouteId != null && relative !== "path") {
    // Grab matches up to the calling route so our route-relative logic is
    // relative to the correct source route.  When using relative:path,
    // fromRouteId is ignored since that is always relative to the current
    // location path
    contextualMatches = [];
    for (let match of matches) {
      contextualMatches.push(match);
      if (match.route.id === fromRouteId) {
        activeRouteMatch = match;
        break;
      }
    }
  } else {
    contextualMatches = matches;
    activeRouteMatch = matches[matches.length - 1];
  }
  // Resolve the relative path
  let path = resolveTo(to ? to : ".", getPathContributingMatches(contextualMatches).map(m => m.pathnameBase), stripBasename(location.pathname, basename) || location.pathname, relative === "path");
  // When `to` is not specified we inherit search/hash from the current
  // location, unlike when to="." and we just inherit the path.
  // See https://github.com/remix-run/remix/issues/927
  if (to == null) {
    path.search = location.search;
    path.hash = location.hash;
  }
  // Add an ?index param for matched index routes if we don't already have one
  if ((to == null || to === "" || to === ".") && activeRouteMatch && activeRouteMatch.route.index && !hasNakedIndexQuery(path.search)) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  // If we're operating within a basename, prepend it to the pathname.  If
  // this is a root navigation, then just use the raw basename which allows
  // the basename to have full control over the presence of a trailing slash
  // on root actions
  if (prependBasename && basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
  }
  return createPath(path);
}
// Normalize navigation options by converting formMethod=GET formData objects to
// URLSearchParams so they behave identically to links with query params
function normalizeNavigateOptions(normalizeFormMethod, isFetcher, path, opts) {
  // Return location verbatim on non-submission navigations
  if (!opts || !isSubmissionNavigation(opts)) {
    return {
      path
    };
  }
  if (opts.formMethod && !isValidMethod(opts.formMethod)) {
    return {
      path,
      error: getInternalRouterError(405, {
        method: opts.formMethod
      })
    };
  }
  // Create a Submission on non-GET navigations
  let submission;
  if (opts.formData) {
    let formMethod = opts.formMethod || "get";
    submission = {
      formMethod: normalizeFormMethod ? formMethod.toUpperCase() : formMethod.toLowerCase(),
      formAction: stripHashFromPath(path),
      formEncType: opts && opts.formEncType || "application/x-www-form-urlencoded",
      formData: opts.formData
    };
    if (isMutationMethod(submission.formMethod)) {
      return {
        path,
        submission
      };
    }
  }
  // Flatten submission onto URLSearchParams for GET submissions
  let parsedPath = parsePath(path);
  let searchParams = convertFormDataToSearchParams(opts.formData);
  // On GET navigation submissions we can drop the ?index param from the
  // resulting location since all loaders will run.  But fetcher GET submissions
  // only run a single loader so we need to preserve any incoming ?index params
  if (isFetcher && parsedPath.search && hasNakedIndexQuery(parsedPath.search)) {
    searchParams.append("index", "");
  }
  parsedPath.search = "?" + searchParams;
  return {
    path: createPath(parsedPath),
    submission
  };
}
// Filter out all routes below any caught error as they aren't going to
// render so we don't need to load them
function getLoaderMatchesUntilBoundary(matches, boundaryId) {
  let boundaryMatches = matches;
  if (boundaryId) {
    let index = matches.findIndex(m => m.route.id === boundaryId);
    if (index >= 0) {
      boundaryMatches = matches.slice(0, index);
    }
  }
  return boundaryMatches;
}
function getMatchesToLoad(history, state, matches, submission, location, isRevalidationRequired, cancelledDeferredRoutes, cancelledFetcherLoads, fetchLoadMatches, routesToUse, basename, pendingActionData, pendingError) {
  let actionResult = pendingError ? Object.values(pendingError)[0] : pendingActionData ? Object.values(pendingActionData)[0] : undefined;
  let currentUrl = history.createURL(state.location);
  let nextUrl = history.createURL(location);
  // Pick navigation matches that are net-new or qualify for revalidation
  let boundaryId = pendingError ? Object.keys(pendingError)[0] : undefined;
  let boundaryMatches = getLoaderMatchesUntilBoundary(matches, boundaryId);
  let navigationMatches = boundaryMatches.filter((match, index) => {
    if (match.route.lazy) {
      // We haven't loaded this route yet so we don't know if it's got a loader!
      return true;
    }
    if (match.route.loader == null) {
      return false;
    }
    // Always call the loader on new route instances and pending defer cancellations
    if (isNewLoader(state.loaderData, state.matches[index], match) || cancelledDeferredRoutes.some(id => id === match.route.id)) {
      return true;
    }
    // This is the default implementation for when we revalidate.  If the route
    // provides it's own implementation, then we give them full control but
    // provide this value so they can leverage it if needed after they check
    // their own specific use cases
    let currentRouteMatch = state.matches[index];
    let nextRouteMatch = match;
    return shouldRevalidateLoader(match, _extends({
      currentUrl,
      currentParams: currentRouteMatch.params,
      nextUrl,
      nextParams: nextRouteMatch.params
    }, submission, {
      actionResult,
      defaultShouldRevalidate:
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      isRevalidationRequired ||
      // Clicked the same link, resubmitted a GET form
      currentUrl.pathname + currentUrl.search === nextUrl.pathname + nextUrl.search ||
      // Search params affect all loaders
      currentUrl.search !== nextUrl.search || isNewRouteInstance(currentRouteMatch, nextRouteMatch)
    }));
  });
  // Pick fetcher.loads that need to be revalidated
  let revalidatingFetchers = [];
  fetchLoadMatches.forEach((f, key) => {
    // Don't revalidate if fetcher won't be present in the subsequent render
    if (!matches.some(m => m.route.id === f.routeId)) {
      return;
    }
    let fetcherMatches = matchRoutes(routesToUse, f.path, basename);
    // If the fetcher path no longer matches, push it in with null matches so
    // we can trigger a 404 in callLoadersAndMaybeResolveData
    if (!fetcherMatches) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: null,
        match: null,
        controller: null
      });
      return;
    }
    let fetcherMatch = getTargetMatch(fetcherMatches, f.path);
    if (cancelledFetcherLoads.includes(key)) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
      return;
    }
    // Revalidating fetchers are decoupled from the route matches since they
    // hit a static href, so they _always_ check shouldRevalidate and the
    // default is strictly if a revalidation is explicitly required (action
    // submissions, useRevalidator, X-Remix-Revalidate).
    let shouldRevalidate = shouldRevalidateLoader(fetcherMatch, _extends({
      currentUrl,
      currentParams: state.matches[state.matches.length - 1].params,
      nextUrl,
      nextParams: matches[matches.length - 1].params
    }, submission, {
      actionResult,
      // Forced revalidation due to submission, useRevalidator, or X-Remix-Revalidate
      defaultShouldRevalidate: isRevalidationRequired
    }));
    if (shouldRevalidate) {
      revalidatingFetchers.push({
        key,
        routeId: f.routeId,
        path: f.path,
        matches: fetcherMatches,
        match: fetcherMatch,
        controller: new AbortController()
      });
    }
  });
  return [navigationMatches, revalidatingFetchers];
}
function isNewLoader(currentLoaderData, currentMatch, match) {
  let isNew =
  // [a] -> [a, b]
  !currentMatch ||
  // [a, b] -> [a, c]
  match.route.id !== currentMatch.route.id;
  // Handle the case that we don't have data for a re-used route, potentially
  // from a prior error or from a cancelled pending deferred
  let isMissingData = currentLoaderData[match.route.id] === undefined;
  // Always load if this is a net-new route or we don't yet have data
  return isNew || isMissingData;
}
function isNewRouteInstance(currentMatch, match) {
  let currentPath = currentMatch.route.path;
  return (
    // param change for this match, /users/123 -> /users/456
    currentMatch.pathname !== match.pathname ||
    // splat param changed, which is not present in match.path
    // e.g. /files/images/avatar.jpg -> files/finances.xls
    currentPath != null && currentPath.endsWith("*") && currentMatch.params["*"] !== match.params["*"]
  );
}
function shouldRevalidateLoader(loaderMatch, arg) {
  if (loaderMatch.route.shouldRevalidate) {
    let routeChoice = loaderMatch.route.shouldRevalidate(arg);
    if (typeof routeChoice === "boolean") {
      return routeChoice;
    }
  }
  return arg.defaultShouldRevalidate;
}
/**
 * Execute route.lazy() methods to lazily load route modules (loader, action,
 * shouldRevalidate) and update the routeManifest in place which shares objects
 * with dataRoutes so those get updated as well.
 */
async function loadLazyRouteModule(route, mapRouteProperties, manifest) {
  if (!route.lazy) {
    return;
  }
  let lazyRoute = await route.lazy();
  // If the lazy route function was executed and removed by another parallel
  // call then we can return - first lazy() to finish wins because the return
  // value of lazy is expected to be static
  if (!route.lazy) {
    return;
  }
  let routeToUpdate = manifest[route.id];
  invariant(routeToUpdate, "No route found in manifest");
  // Update the route in place.  This should be safe because there's no way
  // we could yet be sitting on this route as we can't get there without
  // resolving lazy() first.
  //
  // This is different than the HMR "update" use-case where we may actively be
  // on the route being updated.  The main concern boils down to "does this
  // mutation affect any ongoing navigations or any current state.matches
  // values?".  If not, it should be safe to update in place.
  let routeUpdates = {};
  for (let lazyRouteProperty in lazyRoute) {
    let staticRouteValue = routeToUpdate[lazyRouteProperty];
    let isPropertyStaticallyDefined = staticRouteValue !== undefined &&
    // This property isn't static since it should always be updated based
    // on the route updates
    lazyRouteProperty !== "hasErrorBoundary";
    warning(!isPropertyStaticallyDefined, "Route \"" + routeToUpdate.id + "\" has a static property \"" + lazyRouteProperty + "\" " + "defined but its lazy function is also returning a value for this property. " + ("The lazy route property \"" + lazyRouteProperty + "\" will be ignored."));
    if (!isPropertyStaticallyDefined && !immutableRouteKeys.has(lazyRouteProperty)) {
      routeUpdates[lazyRouteProperty] = lazyRoute[lazyRouteProperty];
    }
  }
  // Mutate the route with the provided updates.  Do this first so we pass
  // the updated version to mapRouteProperties
  Object.assign(routeToUpdate, routeUpdates);
  // Mutate the `hasErrorBoundary` property on the route based on the route
  // updates and remove the `lazy` function so we don't resolve the lazy
  // route again.
  Object.assign(routeToUpdate, _extends({}, mapRouteProperties(routeToUpdate), {
    lazy: undefined
  }));
}
async function callLoaderOrAction(type, request, match, matches, manifest, mapRouteProperties, basename, isStaticRequest, isRouteRequest, requestContext) {
  if (isStaticRequest === void 0) {
    isStaticRequest = false;
  }
  if (isRouteRequest === void 0) {
    isRouteRequest = false;
  }
  let resultType;
  let result;
  let onReject;
  let runHandler = handler => {
    // Setup a promise we can race against so that abort signals short circuit
    let reject;
    let abortPromise = new Promise((_, r) => reject = r);
    onReject = () => reject();
    request.signal.addEventListener("abort", onReject);
    return Promise.race([handler({
      request,
      params: match.params,
      context: requestContext
    }), abortPromise]);
  };
  try {
    let handler = match.route[type];
    if (match.route.lazy) {
      if (handler) {
        // Run statically defined handler in parallel with lazy()
        let values = await Promise.all([runHandler(handler), loadLazyRouteModule(match.route, mapRouteProperties, manifest)]);
        result = values[0];
      } else {
        // Load lazy route module, then run any returned handler
        await loadLazyRouteModule(match.route, mapRouteProperties, manifest);
        handler = match.route[type];
        if (handler) {
          // Handler still run even if we got interrupted to maintain consistency
          // with un-abortable behavior of handler execution on non-lazy or
          // previously-lazy-loaded routes
          result = await runHandler(handler);
        } else if (type === "action") {
          let url = new URL(request.url);
          let pathname = url.pathname + url.search;
          throw getInternalRouterError(405, {
            method: request.method,
            pathname,
            routeId: match.route.id
          });
        } else {
          // lazy() route has no loader to run.  Short circuit here so we don't
          // hit the invariant below that errors on returning undefined.
          return {
            type: ResultType.data,
            data: undefined
          };
        }
      }
    } else if (!handler) {
      let url = new URL(request.url);
      let pathname = url.pathname + url.search;
      throw getInternalRouterError(404, {
        pathname
      });
    } else {
      result = await runHandler(handler);
    }
    invariant(result !== undefined, "You defined " + (type === "action" ? "an action" : "a loader") + " for route " + ("\"" + match.route.id + "\" but didn't return anything from your `" + type + "` ") + "function. Please return a value or `null`.");
  } catch (e) {
    resultType = ResultType.error;
    result = e;
  } finally {
    if (onReject) {
      request.signal.removeEventListener("abort", onReject);
    }
  }
  if (isResponse(result)) {
    let status = result.status;
    // Process redirects
    if (redirectStatusCodes.has(status)) {
      let location = result.headers.get("Location");
      invariant(location, "Redirects returned/thrown from loaders/actions must have a Location header");
      // Support relative routing in internal redirects
      if (!ABSOLUTE_URL_REGEX.test(location)) {
        location = normalizeTo(new URL(request.url), matches.slice(0, matches.indexOf(match) + 1), basename, true, location);
      } else if (!isStaticRequest) {
        // Strip off the protocol+origin for same-origin + same-basename absolute
        // redirects. If this is a static request, we can let it go back to the
        // browser as-is
        let currentUrl = new URL(request.url);
        let url = location.startsWith("//") ? new URL(currentUrl.protocol + location) : new URL(location);
        let isSameBasename = stripBasename(url.pathname, basename) != null;
        if (url.origin === currentUrl.origin && isSameBasename) {
          location = url.pathname + url.search + url.hash;
        }
      }
      // Don't process redirects in the router during static requests requests.
      // Instead, throw the Response and let the server handle it with an HTTP
      // redirect.  We also update the Location header in place in this flow so
      // basename and relative routing is taken into account
      if (isStaticRequest) {
        result.headers.set("Location", location);
        throw result;
      }
      return {
        type: ResultType.redirect,
        status,
        location,
        revalidate: result.headers.get("X-Remix-Revalidate") !== null
      };
    }
    // For SSR single-route requests, we want to hand Responses back directly
    // without unwrapping.  We do this with the QueryRouteResponse wrapper
    // interface so we can know whether it was returned or thrown
    if (isRouteRequest) {
      // eslint-disable-next-line no-throw-literal
      throw {
        type: resultType || ResultType.data,
        response: result
      };
    }
    let data;
    let contentType = result.headers.get("Content-Type");
    // Check between word boundaries instead of startsWith() due to the last
    // paragraph of https://httpwg.org/specs/rfc9110.html#field.content-type
    if (contentType && /\bapplication\/json\b/.test(contentType)) {
      data = await result.json();
    } else {
      data = await result.text();
    }
    if (resultType === ResultType.error) {
      return {
        type: resultType,
        error: new ErrorResponse(status, result.statusText, data),
        headers: result.headers
      };
    }
    return {
      type: ResultType.data,
      data,
      statusCode: result.status,
      headers: result.headers
    };
  }
  if (resultType === ResultType.error) {
    return {
      type: resultType,
      error: result
    };
  }
  if (isDeferredData(result)) {
    var _result$init, _result$init2;
    return {
      type: ResultType.deferred,
      deferredData: result,
      statusCode: (_result$init = result.init) == null ? void 0 : _result$init.status,
      headers: ((_result$init2 = result.init) == null ? void 0 : _result$init2.headers) && new Headers(result.init.headers)
    };
  }
  return {
    type: ResultType.data,
    data: result
  };
}
// Utility method for creating the Request instances for loaders/actions during
// client-side navigations and fetches.  During SSR we will always have a
// Request instance from the static handler (query/queryRoute)
function createClientSideRequest(history, location, signal, submission) {
  let url = history.createURL(stripHashFromPath(location)).toString();
  let init = {
    signal
  };
  if (submission && isMutationMethod(submission.formMethod)) {
    let {
      formMethod,
      formEncType,
      formData
    } = submission;
    // Didn't think we needed this but it turns out unlike other methods, patch
    // won't be properly normalized to uppercase and results in a 405 error.
    // See: https://fetch.spec.whatwg.org/#concept-method
    init.method = formMethod.toUpperCase();
    init.body = formEncType === "application/x-www-form-urlencoded" ? convertFormDataToSearchParams(formData) : formData;
  }
  // Content-Type is inferred (https://fetch.spec.whatwg.org/#dom-request)
  return new Request(url, init);
}
function convertFormDataToSearchParams(formData) {
  let searchParams = new URLSearchParams();
  for (let [key, value] of formData.entries()) {
    // https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#converting-an-entry-list-to-a-list-of-name-value-pairs
    searchParams.append(key, value instanceof File ? value.name : value);
  }
  return searchParams;
}
function processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds) {
  // Fill in loaderData/errors from our loaders
  let loaderData = {};
  let errors = null;
  let statusCode;
  let foundError = false;
  let loaderHeaders = {};
  // Process loader results into state.loaderData/state.errors
  results.forEach((result, index) => {
    let id = matchesToLoad[index].route.id;
    invariant(!isRedirectResult(result), "Cannot handle redirect results in processLoaderData");
    if (isErrorResult(result)) {
      // Look upwards from the matched route for the closest ancestor
      // error boundary, defaulting to the root match
      let boundaryMatch = findNearestBoundary(matches, id);
      let error = result.error;
      // If we have a pending action error, we report it at the highest-route
      // that throws a loader error, and then clear it out to indicate that
      // it was consumed
      if (pendingError) {
        error = Object.values(pendingError)[0];
        pendingError = undefined;
      }
      errors = errors || {};
      // Prefer higher error values if lower errors bubble to the same boundary
      if (errors[boundaryMatch.route.id] == null) {
        errors[boundaryMatch.route.id] = error;
      }
      // Clear our any prior loaderData for the throwing route
      loaderData[id] = undefined;
      // Once we find our first (highest) error, we set the status code and
      // prevent deeper status codes from overriding
      if (!foundError) {
        foundError = true;
        statusCode = isRouteErrorResponse(result.error) ? result.error.status : 500;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    } else {
      if (isDeferredResult(result)) {
        activeDeferreds.set(id, result.deferredData);
        loaderData[id] = result.deferredData.data;
      } else {
        loaderData[id] = result.data;
      }
      // Error status codes always override success status codes, but if all
      // loaders are successful we take the deepest status code.
      if (result.statusCode != null && result.statusCode !== 200 && !foundError) {
        statusCode = result.statusCode;
      }
      if (result.headers) {
        loaderHeaders[id] = result.headers;
      }
    }
  });
  // If we didn't consume the pending action error (i.e., all loaders
  // resolved), then consume it here.  Also clear out any loaderData for the
  // throwing route
  if (pendingError) {
    errors = pendingError;
    loaderData[Object.keys(pendingError)[0]] = undefined;
  }
  return {
    loaderData,
    errors,
    statusCode: statusCode || 200,
    loaderHeaders
  };
}
function processLoaderData(state, matches, matchesToLoad, results, pendingError, revalidatingFetchers, fetcherResults, activeDeferreds) {
  let {
    loaderData,
    errors
  } = processRouteLoaderData(matches, matchesToLoad, results, pendingError, activeDeferreds);
  // Process results from our revalidating fetchers
  for (let index = 0; index < revalidatingFetchers.length; index++) {
    let {
      key,
      match,
      controller
    } = revalidatingFetchers[index];
    invariant(fetcherResults !== undefined && fetcherResults[index] !== undefined, "Did not find corresponding fetcher result");
    let result = fetcherResults[index];
    // Process fetcher non-redirect errors
    if (controller && controller.signal.aborted) {
      // Nothing to do for aborted fetchers
      continue;
    } else if (isErrorResult(result)) {
      let boundaryMatch = findNearestBoundary(state.matches, match == null ? void 0 : match.route.id);
      if (!(errors && errors[boundaryMatch.route.id])) {
        errors = _extends({}, errors, {
          [boundaryMatch.route.id]: result.error
        });
      }
      state.fetchers.delete(key);
    } else if (isRedirectResult(result)) {
      // Should never get here, redirects should get processed above, but we
      // keep this to type narrow to a success result in the else
      invariant(false, "Unhandled fetcher revalidation redirect");
    } else if (isDeferredResult(result)) {
      // Should never get here, deferred data should be awaited for fetchers
      // in resolveDeferredResults
      invariant(false, "Unhandled fetcher deferred data");
    } else {
      let doneFetcher = {
        state: "idle",
        data: result.data,
        formMethod: undefined,
        formAction: undefined,
        formEncType: undefined,
        formData: undefined,
        " _hasFetcherDoneAnything ": true
      };
      state.fetchers.set(key, doneFetcher);
    }
  }
  return {
    loaderData,
    errors
  };
}
function mergeLoaderData(loaderData, newLoaderData, matches, errors) {
  let mergedLoaderData = _extends({}, newLoaderData);
  for (let match of matches) {
    let id = match.route.id;
    if (newLoaderData.hasOwnProperty(id)) {
      if (newLoaderData[id] !== undefined) {
        mergedLoaderData[id] = newLoaderData[id];
      }
    } else if (loaderData[id] !== undefined && match.route.loader) {
      // Preserve existing keys not included in newLoaderData and where a loader
      // wasn't removed by HMR
      mergedLoaderData[id] = loaderData[id];
    }
    if (errors && errors.hasOwnProperty(id)) {
      // Don't keep any loader data below the boundary
      break;
    }
  }
  return mergedLoaderData;
}
// Find the nearest error boundary, looking upwards from the leaf route (or the
// route specified by routeId) for the closest ancestor error boundary,
// defaulting to the root match
function findNearestBoundary(matches, routeId) {
  let eligibleMatches = routeId ? matches.slice(0, matches.findIndex(m => m.route.id === routeId) + 1) : [...matches];
  return eligibleMatches.reverse().find(m => m.route.hasErrorBoundary === true) || matches[0];
}
function getShortCircuitMatches(routes) {
  // Prefer a root layout route if present, otherwise shim in a route object
  let route = routes.find(r => r.index || !r.path || r.path === "/") || {
    id: "__shim-error-route__"
  };
  return {
    matches: [{
      params: {},
      pathname: "",
      pathnameBase: "",
      route
    }],
    route
  };
}
function getInternalRouterError(status, _temp4) {
  let {
    pathname,
    routeId,
    method,
    type
  } = _temp4 === void 0 ? {} : _temp4;
  let statusText = "Unknown Server Error";
  let errorMessage = "Unknown @remix-run/router error";
  if (status === 400) {
    statusText = "Bad Request";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method + " request to \"" + pathname + "\" but " + ("did not provide a `loader` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (type === "defer-action") {
      errorMessage = "defer() is not supported in actions";
    }
  } else if (status === 403) {
    statusText = "Forbidden";
    errorMessage = "Route \"" + routeId + "\" does not match URL \"" + pathname + "\"";
  } else if (status === 404) {
    statusText = "Not Found";
    errorMessage = "No route matches URL \"" + pathname + "\"";
  } else if (status === 405) {
    statusText = "Method Not Allowed";
    if (method && pathname && routeId) {
      errorMessage = "You made a " + method.toUpperCase() + " request to \"" + pathname + "\" but " + ("did not provide an `action` for route \"" + routeId + "\", ") + "so there is no way to handle the request.";
    } else if (method) {
      errorMessage = "Invalid request method \"" + method.toUpperCase() + "\"";
    }
  }
  return new ErrorResponse(status || 500, statusText, new Error(errorMessage), true);
}
// Find any returned redirect errors, starting from the lowest match
function findRedirect(results) {
  for (let i = results.length - 1; i >= 0; i--) {
    let result = results[i];
    if (isRedirectResult(result)) {
      return result;
    }
  }
}
function stripHashFromPath(path) {
  let parsedPath = typeof path === "string" ? parsePath(path) : path;
  return createPath(_extends({}, parsedPath, {
    hash: ""
  }));
}
function isHashChangeOnly(a, b) {
  if (a.pathname !== b.pathname || a.search !== b.search) {
    return false;
  }
  if (a.hash === "") {
    // /page -> /page#hash
    return b.hash !== "";
  } else if (a.hash === b.hash) {
    // /page#hash -> /page#hash
    return true;
  } else if (b.hash !== "") {
    // /page#hash -> /page#other
    return true;
  }
  // If the hash is removed the browser will re-perform a request to the server
  // /page#hash -> /page
  return false;
}
function isDeferredResult(result) {
  return result.type === ResultType.deferred;
}
function isErrorResult(result) {
  return result.type === ResultType.error;
}
function isRedirectResult(result) {
  return (result && result.type) === ResultType.redirect;
}
function isDeferredData(value) {
  let deferred = value;
  return deferred && typeof deferred === "object" && typeof deferred.data === "object" && typeof deferred.subscribe === "function" && typeof deferred.cancel === "function" && typeof deferred.resolveData === "function";
}
function isResponse(value) {
  return value != null && typeof value.status === "number" && typeof value.statusText === "string" && typeof value.headers === "object" && typeof value.body !== "undefined";
}
function isRedirectResponse(result) {
  if (!isResponse(result)) {
    return false;
  }
  let status = result.status;
  let location = result.headers.get("Location");
  return status >= 300 && status <= 399 && location != null;
}
function isQueryRouteResponse(obj) {
  return obj && isResponse(obj.response) && (obj.type === ResultType.data || ResultType.error);
}
function isValidMethod(method) {
  return validRequestMethods.has(method.toLowerCase());
}
function isMutationMethod(method) {
  return validMutationMethods.has(method.toLowerCase());
}
async function resolveDeferredResults(currentMatches, matchesToLoad, results, signals, isFetcher, currentLoaderData) {
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    let match = matchesToLoad[index];
    // If we don't have a match, then we can have a deferred result to do
    // anything with.  This is for revalidating fetchers where the route was
    // removed during HMR
    if (!match) {
      continue;
    }
    let currentMatch = currentMatches.find(m => m.route.id === match.route.id);
    let isRevalidatingLoader = currentMatch != null && !isNewRouteInstance(currentMatch, match) && (currentLoaderData && currentLoaderData[match.route.id]) !== undefined;
    if (isDeferredResult(result) && (isFetcher || isRevalidatingLoader)) {
      // Note: we do not have to touch activeDeferreds here since we race them
      // against the signal in resolveDeferredData and they'll get aborted
      // there if needed
      let signal = signals[index];
      invariant(signal, "Expected an AbortSignal for revalidating fetcher deferred result");
      await resolveDeferredData(result, signal, isFetcher).then(result => {
        if (result) {
          results[index] = result || results[index];
        }
      });
    }
  }
}
async function resolveDeferredData(result, signal, unwrap) {
  if (unwrap === void 0) {
    unwrap = false;
  }
  let aborted = await result.deferredData.resolveData(signal);
  if (aborted) {
    return;
  }
  if (unwrap) {
    try {
      return {
        type: ResultType.data,
        data: result.deferredData.unwrappedData
      };
    } catch (e) {
      // Handle any TrackedPromise._error values encountered while unwrapping
      return {
        type: ResultType.error,
        error: e
      };
    }
  }
  return {
    type: ResultType.data,
    data: result.deferredData.data
  };
}
function hasNakedIndexQuery(search) {
  return new URLSearchParams(search).getAll("index").some(v => v === "");
}
// Note: This should match the format exported by useMatches, so if you change
// this please also change that :)  Eventually we'll DRY this up
function createUseMatchesMatch(match, loaderData) {
  let {
    route,
    pathname,
    params
  } = match;
  return {
    id: route.id,
    pathname,
    params,
    data: loaderData[route.id],
    handle: route.handle
  };
}
function getTargetMatch(matches, location) {
  let search = typeof location === "string" ? parsePath(location).search : location.search;
  if (matches[matches.length - 1].route.index && hasNakedIndexQuery(search || "")) {
    // Return the leaf index route when index is present
    return matches[matches.length - 1];
  }
  // Otherwise grab the deepest "path contributing" match (ignoring index and
  // pathless layout routes)
  let pathMatches = getPathContributingMatches(matches);
  return pathMatches[pathMatches.length - 1];
}
//#endregion


//# sourceMappingURL=router.js.map


/***/ }),

/***/ "./node_modules/camelcase/index.js":
/*!*****************************************!*\
  !*** ./node_modules/camelcase/index.js ***!
  \*****************************************/
/***/ ((module) => {

"use strict";


const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const LEADING_CAPITAL = /^[\p{Lu}](?![\p{Lu}])/gu;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp('^' + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, 'gu');
const NUMBERS_AND_IDENTIFIER = new RegExp('\\d+' + IDENTIFIER.source, 'gu');

const preserveCamelCase = (string, toLowerCase, toUpperCase) => {
	let isLastCharLower = false;
	let isLastCharUpper = false;
	let isLastLastCharUpper = false;

	for (let i = 0; i < string.length; i++) {
		const character = string[i];

		if (isLastCharLower && UPPERCASE.test(character)) {
			string = string.slice(0, i) + '-' + string.slice(i);
			isLastCharLower = false;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = true;
			i++;
		} else if (isLastCharUpper && isLastLastCharUpper && LOWERCASE.test(character)) {
			string = string.slice(0, i - 1) + '-' + string.slice(i - 1);
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = false;
			isLastCharLower = true;
		} else {
			isLastCharLower = toLowerCase(character) === character && toUpperCase(character) !== character;
			isLastLastCharUpper = isLastCharUpper;
			isLastCharUpper = toUpperCase(character) === character && toLowerCase(character) !== character;
		}
	}

	return string;
};

const preserveConsecutiveUppercase = (input, toLowerCase) => {
	LEADING_CAPITAL.lastIndex = 0;

	return input.replace(LEADING_CAPITAL, m1 => toLowerCase(m1));
};

const postProcess = (input, toUpperCase) => {
	SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
	NUMBERS_AND_IDENTIFIER.lastIndex = 0;

	return input.replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
		.replace(NUMBERS_AND_IDENTIFIER, m => toUpperCase(m));
};

const camelCase = (input, options) => {
	if (!(typeof input === 'string' || Array.isArray(input))) {
		throw new TypeError('Expected the input to be `string | string[]`');
	}

	options = {
		pascalCase: false,
		preserveConsecutiveUppercase: false,
		...options
	};

	if (Array.isArray(input)) {
		input = input.map(x => x.trim())
			.filter(x => x.length)
			.join('-');
	} else {
		input = input.trim();
	}

	if (input.length === 0) {
		return '';
	}

	const toLowerCase = options.locale === false ?
		string => string.toLowerCase() :
		string => string.toLocaleLowerCase(options.locale);
	const toUpperCase = options.locale === false ?
		string => string.toUpperCase() :
		string => string.toLocaleUpperCase(options.locale);

	if (input.length === 1) {
		return options.pascalCase ? toUpperCase(input) : toLowerCase(input);
	}

	const hasUpperCase = input !== toLowerCase(input);

	if (hasUpperCase) {
		input = preserveCamelCase(input, toLowerCase, toUpperCase);
	}

	input = input.replace(LEADING_SEPARATORS, '');

	if (options.preserveConsecutiveUppercase) {
		input = preserveConsecutiveUppercase(input, toLowerCase);
	} else {
		input = toLowerCase(input);
	}

	if (options.pascalCase) {
		input = toUpperCase(input.charAt(0)) + input.slice(1);
	}

	return postProcess(input, toUpperCase);
};

module.exports = camelCase;
// TODO: Remove this for the next major release
module.exports["default"] = camelCase;


/***/ }),

/***/ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js":
/*!**********************************************************************!*\
  !*** ./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GatsbyImage": () => (/* binding */ G),
/* harmony export */   "MainImage": () => (/* binding */ L),
/* harmony export */   "Placeholder": () => (/* binding */ z),
/* harmony export */   "StaticImage": () => (/* binding */ U),
/* harmony export */   "generateImageData": () => (/* binding */ v),
/* harmony export */   "getImage": () => (/* binding */ S),
/* harmony export */   "getImageData": () => (/* binding */ I),
/* harmony export */   "getLowResolutionImageURL": () => (/* binding */ f),
/* harmony export */   "getSrc": () => (/* binding */ N),
/* harmony export */   "getSrcSet": () => (/* binding */ x),
/* harmony export */   "withArtDirection": () => (/* binding */ W)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! camelcase */ "./node_modules/camelcase/index.js");
/* harmony import */ var camelcase__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(camelcase__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);




function n() {
  return n = Object.assign ? Object.assign.bind() : function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var a = arguments[t];
      for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i]);
    }
    return e;
  }, n.apply(this, arguments);
}
function o(e, t) {
  if (null == e) return {};
  var a,
    i,
    r = {},
    n = Object.keys(e);
  for (i = 0; i < n.length; i++) t.indexOf(a = n[i]) >= 0 || (r[a] = e[a]);
  return r;
}
var s = [.25, .5, 1, 2],
  l = [750, 1080, 1366, 1920],
  u = [320, 654, 768, 1024, 1366, 1600, 1920, 2048, 2560, 3440, 3840, 4096],
  d = 4 / 3,
  c = function (e) {
    return console.warn(e);
  },
  h = function (e, t) {
    return e - t;
  },
  g = function (e) {
    return e.map(function (e) {
      return e.src + " " + e.width + "w";
    }).join(",\n");
  };
function p(e) {
  var t = e.lastIndexOf(".");
  if (-1 !== t) {
    var a = e.slice(t + 1);
    if ("jpeg" === a) return "jpg";
    if (3 === a.length || 4 === a.length) return a;
  }
}
function m(e) {
  var t = e.layout,
    i = void 0 === t ? "constrained" : t,
    r = e.width,
    o = e.height,
    s = e.sourceMetadata,
    l = e.breakpoints,
    u = e.aspectRatio,
    c = e.formats,
    h = void 0 === c ? ["auto", "webp"] : c;
  return h = h.map(function (e) {
    return e.toLowerCase();
  }), i = camelcase__WEBPACK_IMPORTED_MODULE_1___default()(i), r && o ? n({}, e, {
    formats: h,
    layout: i,
    aspectRatio: r / o
  }) : (s.width && s.height && !u && (u = s.width / s.height), "fullWidth" === i ? (r = r || s.width || l[l.length - 1], o = o || Math.round(r / (u || d))) : (r || (r = o && u ? o * u : s.width ? s.width : o ? Math.round(o / d) : 800), u && !o ? o = Math.round(r / u) : u || (u = r / o)), n({}, e, {
    width: r,
    height: o,
    aspectRatio: u,
    layout: i,
    formats: h
  }));
}
function f(e, t) {
  var a;
  return void 0 === t && (t = 20), null == (a = (0, (e = m(e)).generateImageSource)(e.filename, t, Math.round(t / e.aspectRatio), e.sourceMetadata.format || "jpg", e.fit, e.options)) ? void 0 : a.src;
}
function v(e) {
  var t,
    a = (e = m(e)).pluginName,
    i = e.sourceMetadata,
    r = e.generateImageSource,
    o = e.layout,
    u = e.fit,
    d = e.options,
    h = e.width,
    f = e.height,
    v = e.filename,
    k = e.reporter,
    E = void 0 === k ? {
      warn: c
    } : k,
    M = e.backgroundColor,
    S = e.placeholderURL;
  if (a || E.warn('[gatsby-plugin-image] "generateImageData" was not passed a plugin name'), "function" != typeof r) throw new Error("generateImageSource must be a function");
  i && (i.width || i.height) ? i.format || (i.format = p(v)) : i = {
    width: h,
    height: f,
    format: (null == (t = i) ? void 0 : t.format) || p(v) || "auto"
  };
  var N = new Set(e.formats);
  (0 === N.size || N.has("auto") || N.has("")) && (N.delete("auto"), N.delete(""), N.add(i.format)), N.has("jpg") && N.has("png") && (E.warn("[" + a + "] Specifying both 'jpg' and 'png' formats is not supported. Using 'auto' instead"), N.delete("jpg" === i.format ? "png" : "jpg"));
  var x = function (e) {
      var t = e.filename,
        a = e.layout,
        i = void 0 === a ? "constrained" : a,
        r = e.sourceMetadata,
        o = e.reporter,
        u = void 0 === o ? {
          warn: c
        } : o,
        d = e.breakpoints,
        h = void 0 === d ? l : d,
        g = Object.entries({
          width: e.width,
          height: e.height
        }).filter(function (e) {
          var t = e[1];
          return "number" == typeof t && t < 1;
        });
      if (g.length) throw new Error("Specified dimensions for images must be positive numbers (> 0). Problem dimensions you have are " + g.map(function (e) {
        return e.join(": ");
      }).join(", "));
      return "fixed" === i ? function (e) {
        var t = e.filename,
          a = e.sourceMetadata,
          i = e.width,
          r = e.height,
          n = e.fit,
          o = void 0 === n ? "cover" : n,
          l = e.outputPixelDensities,
          u = e.reporter,
          d = void 0 === u ? {
            warn: c
          } : u,
          h = a.width / a.height,
          g = w(void 0 === l ? s : l);
        if (i && r) {
          var p = b(a, {
            width: i,
            height: r,
            fit: o
          });
          i = p.width, r = p.height, h = p.aspectRatio;
        }
        i ? r || (r = Math.round(i / h)) : i = r ? Math.round(r * h) : 800;
        var m = i;
        if (a.width < i || a.height < r) {
          var f = a.width < i ? "width" : "height";
          d.warn("\nThe requested " + f + ' "' + ("width" === f ? i : r) + 'px" for the image ' + t + " was larger than the actual image " + f + " of " + a[f] + "px. If possible, replace the current image with a larger one."), "width" === f ? (i = a.width, r = Math.round(i / h)) : i = (r = a.height) * h;
        }
        return {
          sizes: g.filter(function (e) {
            return e >= 1;
          }).map(function (e) {
            return Math.round(e * i);
          }).filter(function (e) {
            return e <= a.width;
          }),
          aspectRatio: h,
          presentationWidth: m,
          presentationHeight: Math.round(m / h),
          unscaledWidth: i
        };
      }(e) : "constrained" === i ? y(e) : "fullWidth" === i ? y(n({
        breakpoints: h
      }, e)) : (u.warn("No valid layout was provided for the image at " + t + ". Valid image layouts are fixed, fullWidth, and constrained. Found " + i), {
        sizes: [r.width],
        presentationWidth: r.width,
        presentationHeight: r.height,
        aspectRatio: r.width / r.height,
        unscaledWidth: r.width
      });
    }(n({}, e, {
      sourceMetadata: i
    })),
    I = {
      sources: []
    },
    W = e.sizes;
  W || (W = function (e, t) {
    switch (t) {
      case "constrained":
        return "(min-width: " + e + "px) " + e + "px, 100vw";
      case "fixed":
        return e + "px";
      case "fullWidth":
        return "100vw";
      default:
        return;
    }
  }(x.presentationWidth, o)), N.forEach(function (e) {
    var t = x.sizes.map(function (t) {
      var i = r(v, t, Math.round(t / x.aspectRatio), e, u, d);
      if (null != i && i.width && i.height && i.src && i.format) return i;
      E.warn("[" + a + "] The resolver for image " + v + " returned an invalid value.");
    }).filter(Boolean);
    if ("jpg" === e || "png" === e || "auto" === e) {
      var i = t.find(function (e) {
        return e.width === x.unscaledWidth;
      }) || t[0];
      i && (I.fallback = {
        src: i.src,
        srcSet: g(t),
        sizes: W
      });
    } else {
      var n;
      null == (n = I.sources) || n.push({
        srcSet: g(t),
        sizes: W,
        type: "image/" + e
      });
    }
  });
  var j = {
    images: I,
    layout: o,
    backgroundColor: M
  };
  switch (S && (j.placeholder = {
    fallback: S
  }), o) {
    case "fixed":
      j.width = x.presentationWidth, j.height = x.presentationHeight;
      break;
    case "fullWidth":
      j.width = 1, j.height = 1 / x.aspectRatio;
      break;
    case "constrained":
      j.width = e.width || x.presentationWidth || 1, j.height = (j.width || 1) / x.aspectRatio;
  }
  return j;
}
var w = function (e) {
  return Array.from(new Set([1].concat(e))).sort(h);
};
function y(e) {
  var t,
    a = e.sourceMetadata,
    i = e.width,
    r = e.height,
    n = e.fit,
    o = void 0 === n ? "cover" : n,
    l = e.outputPixelDensities,
    u = e.breakpoints,
    d = e.layout,
    c = a.width / a.height,
    g = w(void 0 === l ? s : l);
  if (i && r) {
    var p = b(a, {
      width: i,
      height: r,
      fit: o
    });
    i = p.width, r = p.height, c = p.aspectRatio;
  }
  i = i && Math.min(i, a.width), r = r && Math.min(r, a.height), i || r || (r = (i = Math.min(800, a.width)) / c), i || (i = r * c);
  var m = i;
  return (a.width < i || a.height < r) && (i = a.width, r = a.height), i = Math.round(i), (null == u ? void 0 : u.length) > 0 ? (t = u.filter(function (e) {
    return e <= a.width;
  })).length < u.length && !t.includes(a.width) && t.push(a.width) : t = (t = g.map(function (e) {
    return Math.round(e * i);
  })).filter(function (e) {
    return e <= a.width;
  }), "constrained" !== d || t.includes(i) || t.push(i), {
    sizes: t = t.sort(h),
    aspectRatio: c,
    presentationWidth: m,
    presentationHeight: Math.round(m / c),
    unscaledWidth: i
  };
}
function b(e, t) {
  var a = e.width / e.height,
    i = t.width,
    r = t.height;
  switch (t.fit) {
    case "fill":
      i = t.width ? t.width : e.width, r = t.height ? t.height : e.height;
      break;
    case "inside":
      var n = t.width ? t.width : Number.MAX_SAFE_INTEGER,
        o = t.height ? t.height : Number.MAX_SAFE_INTEGER;
      i = Math.min(n, Math.round(o * a)), r = Math.min(o, Math.round(n / a));
      break;
    case "outside":
      var s = t.width ? t.width : 0,
        l = t.height ? t.height : 0;
      i = Math.max(s, Math.round(l * a)), r = Math.max(l, Math.round(s / a));
      break;
    default:
      t.width && !t.height && (i = t.width, r = Math.round(t.width / a)), t.height && !t.width && (i = Math.round(t.height * a), r = t.height);
  }
  return {
    width: i,
    height: r,
    aspectRatio: i / r
  };
}
var k = ["baseUrl", "urlBuilder", "sourceWidth", "sourceHeight", "pluginName", "formats", "breakpoints", "options"],
  E = ["images", "placeholder"];
function M() {
  return "undefined" != typeof GATSBY___IMAGE && GATSBY___IMAGE;
}
var S = function (e) {
    var t;
    return function (e) {
      var t, a;
      return Boolean(null == e || null == (t = e.images) || null == (a = t.fallback) ? void 0 : a.src);
    }(e) ? e : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImageData);
    }(e) ? e.gatsbyImageData : function (e) {
      return Boolean(null == e ? void 0 : e.gatsbyImage);
    }(e) ? e.gatsbyImage : null == e || null == (t = e.childImageSharp) ? void 0 : t.gatsbyImageData;
  },
  N = function (e) {
    var t, a, i;
    return null == (t = S(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.src;
  },
  x = function (e) {
    var t, a, i;
    return null == (t = S(e)) || null == (a = t.images) || null == (i = a.fallback) ? void 0 : i.srcSet;
  };
function I(e) {
  var t,
    a = e.baseUrl,
    i = e.urlBuilder,
    r = e.sourceWidth,
    s = e.sourceHeight,
    l = e.pluginName,
    d = void 0 === l ? "getImageData" : l,
    c = e.formats,
    h = void 0 === c ? ["auto"] : c,
    g = e.breakpoints,
    p = e.options,
    m = o(e, k);
  return null != (t = g) && t.length || "fullWidth" !== m.layout && "FULL_WIDTH" !== m.layout || (g = u), v(n({}, m, {
    pluginName: d,
    generateImageSource: function (e, t, a, r) {
      return {
        width: t,
        height: a,
        format: r,
        src: i({
          baseUrl: e,
          width: t,
          height: a,
          options: p,
          format: r
        })
      };
    },
    filename: a,
    formats: h,
    breakpoints: g,
    sourceMetadata: {
      width: r,
      height: s,
      format: "auto"
    }
  }));
}
function W(e, t) {
  var a,
    i,
    r,
    s = e.images,
    l = e.placeholder,
    u = n({}, o(e, E), {
      images: n({}, s, {
        sources: []
      }),
      placeholder: l && n({}, l, {
        sources: []
      })
    });
  return t.forEach(function (t) {
    var a,
      i = t.media,
      r = t.image;
    i ? (r.layout !== e.layout && "development" === "development" && console.warn('[gatsby-plugin-image] Mismatched image layout: expected "' + e.layout + '" but received "' + r.layout + '". All art-directed images use the same layout as the default image'), (a = u.images.sources).push.apply(a, r.images.sources.map(function (e) {
      return n({}, e, {
        media: i
      });
    }).concat([{
      media: i,
      srcSet: r.images.fallback.srcSet
    }])), u.placeholder && u.placeholder.sources.push({
      media: i,
      srcSet: r.placeholder.fallback
    })) :  true && console.warn("[gatsby-plugin-image] All art-directed images passed to must have a value set for `media`. Skipping.");
  }), (a = u.images.sources).push.apply(a, s.sources), null != l && l.sources && (null == (i = u.placeholder) || (r = i.sources).push.apply(r, l.sources)), u;
}
var j,
  R = ["src", "srcSet", "loading", "alt", "shouldLoad"],
  _ = ["fallback", "sources", "shouldLoad"],
  A = function (t) {
    var a = t.src,
      i = t.srcSet,
      r = t.loading,
      s = t.alt,
      l = void 0 === s ? "" : s,
      u = t.shouldLoad,
      d = o(t, R);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", n({}, d, {
      decoding: "async",
      loading: r,
      src: u ? a : void 0,
      "data-src": u ? void 0 : a,
      srcSet: u ? i : void 0,
      "data-srcset": u ? void 0 : i,
      alt: l
    }));
  },
  O = function (t) {
    var a = t.fallback,
      i = t.sources,
      r = void 0 === i ? [] : i,
      s = t.shouldLoad,
      l = void 0 === s || s,
      u = o(t, _),
      d = u.sizes || (null == a ? void 0 : a.sizes),
      c = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(A, n({}, u, a, {
        sizes: d,
        shouldLoad: l
      }));
    return r.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("picture", null, r.map(function (t) {
      var a = t.media,
        i = t.srcSet,
        r = t.type;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("source", {
        key: a + "-" + r + "-" + i,
        type: r,
        media: a,
        srcSet: l ? i : void 0,
        "data-srcset": l ? void 0 : i,
        sizes: d
      });
    }), c) : c;
  };
A.propTypes = {
  src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool
}, O.displayName = "Picture", O.propTypes = {
  alt: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
  shouldLoad: prop_types__WEBPACK_IMPORTED_MODULE_2__.bool,
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    src: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string
  }),
  sources: prop_types__WEBPACK_IMPORTED_MODULE_2__.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2__.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  }), prop_types__WEBPACK_IMPORTED_MODULE_2__.exact({
    media: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    type: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired,
    sizes: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
    srcSet: prop_types__WEBPACK_IMPORTED_MODULE_2__.string.isRequired
  })]))
};
var T = ["fallback"],
  z = function (t) {
    var a = t.fallback,
      i = o(t, T);
    return a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, n({}, i, {
      fallback: {
        src: a
      },
      "aria-hidden": !0,
      alt: ""
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", n({}, i));
  };
z.displayName = "Placeholder", z.propTypes = {
  fallback: prop_types__WEBPACK_IMPORTED_MODULE_2__.string,
  sources: null == (j = O.propTypes) ? void 0 : j.sources,
  alt: function (e, t, a) {
    return e[t] ? new Error("Invalid prop `" + t + "` supplied to `" + a + "`. Validation failed.") : null;
  }
};
var L = function (t) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, n({}, t)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("noscript", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(O, n({}, t, {
    shouldLoad: !0
  }))));
};
L.displayName = "MainImage", L.propTypes = O.propTypes;
var q = ["children"],
  C = function () {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("script", {
      type: "module",
      dangerouslySetInnerHTML: {
        __html: 'const t="undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype;if(t){const t=document.querySelectorAll("img[data-main-image]");for(let e of t){e.dataset.src&&(e.setAttribute("src",e.dataset.src),e.removeAttribute("data-src")),e.dataset.srcset&&(e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset"));const t=e.parentNode.querySelectorAll("source[data-srcset]");for(let e of t)e.setAttribute("srcset",e.dataset.srcset),e.removeAttribute("data-srcset");e.complete&&(e.style.opacity=1,e.parentNode.parentNode.querySelector("[data-placeholder-image]").style.opacity=0)}}'
      }
    });
  },
  D = function (t) {
    var a = t.layout,
      i = t.width,
      r = t.height;
    return "fullWidth" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      "aria-hidden": !0,
      style: {
        paddingTop: r / i * 100 + "%"
      }
    }) : "constrained" === a ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      style: {
        maxWidth: i,
        display: "block"
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      alt: "",
      role: "presentation",
      "aria-hidden": "true",
      src: "data:image/svg+xml;charset=utf-8,%3Csvg%20height='" + r + "'%20width='" + i + "'%20xmlns='http://www.w3.org/2000/svg'%20version='1.1'%3E%3C/svg%3E",
      style: {
        maxWidth: "100%",
        display: "block",
        position: "static"
      }
    })) : null;
  },
  P = function (a) {
    var i = a.children,
      r = o(a, q);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(D, n({}, r)), i, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(C, null));
  },
  H = ["as", "className", "class", "style", "image", "loading", "imgClassName", "imgStyle", "backgroundColor", "objectFit", "objectPosition"],
  F = ["style", "className"],
  B = function (e) {
    return e.replace(/\n/g, "");
  },
  G = function (t) {
    var a = t.as,
      i = void 0 === a ? "div" : a,
      r = t.className,
      s = t.class,
      l = t.style,
      u = t.image,
      d = t.loading,
      c = void 0 === d ? "lazy" : d,
      h = t.imgClassName,
      g = t.imgStyle,
      p = t.backgroundColor,
      m = t.objectFit,
      f = t.objectPosition,
      v = o(t, H);
    if (!u) return console.warn("[gatsby-plugin-image] Missing image prop"), null;
    s && (r = s), g = n({
      objectFit: m,
      objectPosition: f,
      backgroundColor: p
    }, g);
    var w = u.width,
      y = u.height,
      b = u.layout,
      k = u.images,
      E = u.placeholder,
      S = u.backgroundColor,
      N = function (e, t, a) {
        var i = {},
          r = "gatsby-image-wrapper";
        return M() || (i.position = "relative", i.overflow = "hidden"), "fixed" === a ? (i.width = e, i.height = t) : "constrained" === a && (M() || (i.display = "inline-block", i.verticalAlign = "top"), r = "gatsby-image-wrapper gatsby-image-wrapper-constrained"), {
          className: r,
          "data-gatsby-image-wrapper": "",
          style: i
        };
      }(w, y, b),
      x = N.style,
      I = N.className,
      W = o(N, F),
      j = {
        fallback: void 0,
        sources: []
      };
    return k.fallback && (j.fallback = n({}, k.fallback, {
      srcSet: k.fallback.srcSet ? B(k.fallback.srcSet) : void 0
    })), k.sources && (j.sources = k.sources.map(function (e) {
      return n({}, e, {
        srcSet: B(e.srcSet)
      });
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(i, n({}, W, {
      style: n({}, x, l, {
        backgroundColor: p
      }),
      className: I + (r ? " " + r : "")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(P, {
      layout: b,
      width: w,
      height: y
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(z, n({}, function (e, t, a, i, r, o, s, l) {
      var u = {};
      o && (u.backgroundColor = o, "fixed" === a ? (u.width = i, u.height = r, u.backgroundColor = o, u.position = "relative") : ("constrained" === a || "fullWidth" === a) && (u.position = "absolute", u.top = 0, u.left = 0, u.bottom = 0, u.right = 0)), s && (u.objectFit = s), l && (u.objectPosition = l);
      var d = n({}, e, {
        "aria-hidden": !0,
        "data-placeholder-image": "",
        style: n({
          opacity: 1,
          transition: "opacity 500ms linear"
        }, u)
      });
      return M() || (d.style = {
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        width: "100%"
      }), d;
    }(E, 0, b, w, y, S, m, f))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(L, n({
      "data-gatsby-image-ssr": "",
      className: h
    }, v, function (e, t, a, i, r) {
      return void 0 === r && (r = {}), M() || (r = n({
        height: "100%",
        left: 0,
        position: "absolute",
        top: 0,
        transform: "translateZ(0)",
        transition: "opacity 250ms linear",
        width: "100%",
        willChange: "opacity"
      }, r)), n({}, a, {
        loading: i,
        shouldLoad: e,
        "data-main-image": "",
        style: n({}, r, {
          opacity: 0
        })
      });
    }("eager" === c, 0, j, c, g)))));
  },
  V = ["src", "__imageData", "__error", "width", "height", "aspectRatio", "tracedSVGOptions", "placeholder", "formats", "quality", "transformOptions", "jpgOptions", "pngOptions", "webpOptions", "avifOptions", "blurredOptions", "breakpoints", "outputPixelDensities"],
  U = function (t) {
    return function (a) {
      var i = a.src,
        r = a.__imageData,
        s = a.__error,
        l = o(a, V);
      return s && console.warn(s), r ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(t, n({
        image: r
      }, l)) : (console.warn("Image not loaded", i), s || "development" !== "development" || console.warn('Please ensure that "gatsby-plugin-image" is included in the plugins array in gatsby-config.js, and that your version of gatsby is at least 2.24.78'), null);
    };
  }(G),
  X = function (e, t) {
    return "fullWidth" !== e.layout || "width" !== t && "height" !== t || !e[t] ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().number.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t].concat([].slice.call(arguments, 2))) : new Error('"' + t + '" ' + e[t] + " may not be passed when layout is fullWidth.");
  },
  Y = new Set(["fixed", "fullWidth", "constrained"]),
  Z = {
    src: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.isRequired),
    alt: function (e, t, a) {
      return e.alt || "" === e.alt ? prop_types__WEBPACK_IMPORTED_MODULE_2___default().string.apply((prop_types__WEBPACK_IMPORTED_MODULE_2___default()), [e, t, a].concat([].slice.call(arguments, 3))) : new Error('The "alt" prop is required in ' + a + '. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html');
    },
    width: X,
    height: X,
    sizes: (prop_types__WEBPACK_IMPORTED_MODULE_2___default().string),
    layout: function (e) {
      if (void 0 !== e.layout && !Y.has(e.layout)) return new Error("Invalid value " + e.layout + '" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".');
    }
  };
U.displayName = "StaticImage", U.propTypes = Z;


/***/ }),

/***/ "./src/LandingPage/DesktopContent.jsx":
/*!********************************************!*\
  !*** ./src/LandingPage/DesktopContent.jsx ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DesktopContent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_CustomImage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/CustomImage */ "./src/components/common/CustomImage.jsx");
/* harmony import */ var _components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Timeline/Timeline */ "./src/components/Timeline/Timeline.jsx");
/* harmony import */ var _components_card_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/card/Card */ "./src/components/card/Card.jsx");
/* harmony import */ var _components_common_ContentBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/common/ContentBlock */ "./src/components/common/ContentBlock.jsx");
/* harmony import */ var _images_OasisCrowd1_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../images/OasisCrowd1.png */ "./src/images/OasisCrowd1.png");
/* harmony import */ var _images_OasisCrowd2_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../images/OasisCrowd2.png */ "./src/images/OasisCrowd2.png");
/* harmony import */ var _components_Footer_Footer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Footer/Footer */ "./src/components/Footer/Footer.jsx");
/* harmony import */ var _components_Footer_Sock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Footer/Sock */ "./src/components/Footer/Sock.jsx");
/* harmony import */ var _DesktopContent_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DesktopContent.css */ "./src/LandingPage/DesktopContent.css");
/* harmony import */ var _DesktopContent_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_DesktopContent_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/Navbar/Navbar.jsx */ "./src/components/Navbar/Navbar.jsx");


// import { container, section1, row, image, text1, text2, col,
//         section2, reverse, grid, title, timelineContainer, section3} from './DesktopContent.module.scss'









function DesktopContent() {
  const AboutSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "aboutContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "grid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: "About",
      body: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam.")
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "image"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      src: _images_OasisCrowd1_png__WEBPACK_IMPORTED_MODULE_5__["default"],
      alt: 'Oasis Hack Session'
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "grid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "image"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
      src: _images_OasisCrowd2_png__WEBPACK_IMPORTED_MODULE_6__["default"],
      alt: 'Oasis Hack Session'
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: "Mission",
      body: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."),
      className: "reverse"
    })));
  };
  const TimelineSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock__WEBPACK_IMPORTED_MODULE_4__["default"], {
      title: "Semester at a Glance"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "timelineContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Timeline_Timeline__WEBPACK_IMPORTED_MODULE_2__["default"], null)));
  };
  const OasisNumbersSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "title"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "Oasis by the Numbers")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_card_Card__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  };
  const Bottom = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "section4"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Footer_Sock__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Footer_Footer__WEBPACK_IMPORTED_MODULE_7__["default"], null));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, AboutSection(), TimelineSection(), OasisNumbersSection(), Bottom());
}

/***/ }),

/***/ "./src/LandingPage/LandingPage.jsx":
/*!*****************************************!*\
  !*** ./src/LandingPage/LandingPage.jsx ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _components_helpers_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _images_ArrowDown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/ArrowDown */ "./src/images/ArrowDown.jsx");
/* harmony import */ var _components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Navbar/Navbar */ "./src/components/Navbar/Navbar.jsx");
/* harmony import */ var _LandingPage_DesktopContent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../LandingPage/DesktopContent */ "./src/LandingPage/DesktopContent.jsx");
/* harmony import */ var _LandingPage_MobileContent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../LandingPage/MobileContent */ "./src/LandingPage/MobileContent.jsx");
/* harmony import */ var _LandingPage_MobileContent__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_LandingPage_MobileContent__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var typewriter_effect__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! typewriter-effect */ "./node_modules/typewriter-effect/dist/react.js");
/* harmony import */ var typewriter_effect__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(typewriter_effect__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _components_parallax__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/parallax */ "./src/components/parallax.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _LandingPage_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./LandingPage.css */ "./src/LandingPage/LandingPage.css");
/* harmony import */ var _LandingPage_css__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_LandingPage_css__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _images_OasisHero__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../images/OasisHero */ "./src/images/OasisHero.jsx");













const LOGO_ZOOM_FULL_SCALE = 3;
const LandingPage = () => {
  const breakpoint = (0,_components_helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const {
    0: scrollAnimationComplete,
    1: setScrollAnimationComplete
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: zoomScale,
    1: setZoomScale
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const logoTransformStyling = {
    transform: `scale(${zoomScale})`
  };
  const navRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const handleClickScroll = () => {
    var _navRef$current;
    return (_navRef$current = navRef.current) === null || _navRef$current === void 0 ? void 0 : _navRef$current.scrollIntoView({
      behavior: 'smooth'
    });
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    let logoZoomScrollDistance = window.innerHeight * 0.75;
    const calculateScale = scrollY => {
      const computedScale = LOGO_ZOOM_FULL_SCALE * (scrollY / logoZoomScrollDistance) + 1;
      if (computedScale > LOGO_ZOOM_FULL_SCALE) {
        return LOGO_ZOOM_FULL_SCALE;
      }
      return computedScale;
    };

    // set correct scale for logo on initial render
    setZoomScale(calculateScale(window.scrollY));
    window.addEventListener('scroll', () => {
      if (window.scrollY <= logoZoomScrollDistance) {
        setZoomScale(calculateScale(window.scrollY));
      }
    });

    // update scroll distance when viewport size changes
    window.addEventListener('resize', () => {
      logoZoomScrollDistance = window.innerHeight * 0.75;
    });
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    setScrollAnimationComplete(zoomScale === LOGO_ZOOM_FULL_SCALE);
  }, [zoomScale]);
  const renderText = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "textSplash"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((typewriter_effect__WEBPACK_IMPORTED_MODULE_7___default()), {
      options: {
        autoStart: true,
        loop: false,
        delay: 100,
        pauseFor: 100000,
        strings: ["Oasis"]
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Ready to make your ideas reality?"));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "landingPage"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "animatedScrollContainer scrollAnimationComplete stickToParentEnd"
  }, renderText(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "bottomRow"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dateAndLocation"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_11__.Link, {
    onClick: handleClickScroll,
    className: "linkContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, "Learn More"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_ArrowDown__WEBPACK_IMPORTED_MODULE_3__["default"], {
    className: "arrow"
  })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: navRef
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Navbar_Navbar__WEBPACK_IMPORTED_MODULE_4__["default"], null), breakpoint === _components_helpers_types__WEBPACK_IMPORTED_MODULE_2__.BREAKPOINT.MOBILE ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((_LandingPage_MobileContent__WEBPACK_IMPORTED_MODULE_6___default()), null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_LandingPage_DesktopContent__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LandingPage);

/***/ }),

/***/ "./src/LandingPage/MobileContent.jsx":
/*!*******************************************!*\
  !*** ./src/LandingPage/MobileContent.jsx ***!
  \*******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Footer/Footer.jsx":
/*!******************************************!*\
  !*** ./src/components/Footer/Footer.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Footer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _images_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/Logo */ "./src/images/Logo.jsx");
/* harmony import */ var _images_GreenLogo_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/GreenLogo.svg */ "./src/images/GreenLogo.svg");
/* harmony import */ var _images_InstagramIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/InstagramIcon */ "./src/images/InstagramIcon.jsx");
/* harmony import */ var _Footer_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Footer.css */ "./src/components/Footer/Footer.css");
/* harmony import */ var _Footer_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_Footer_css__WEBPACK_IMPORTED_MODULE_4__);






function Footer() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("footer", {
    className: "footerContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "logoContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "logo"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "linksContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/"
  }, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/about"
  }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/join"
  }, "Join"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "col"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/mentor"
  }, "Mentor")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://hub.oasisneu.com/resources"
  }, "Resources")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/contact"
  }, "Contact")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "mediaIconContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "iconCol"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "circle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_InstagramIcon__WEBPACK_IMPORTED_MODULE_3__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "iconCol"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "circle"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
    className: "greenLogo",
    src: _images_GreenLogo_svg__WEBPACK_IMPORTED_MODULE_2__["default"]
  }))))));
}

/***/ }),

/***/ "./src/components/Footer/Sock.jsx":
/*!****************************************!*\
  !*** ./src/components/Footer/Sock.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sock)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Sock_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Sock.css */ "./src/components/Footer/Sock.css");
/* harmony import */ var _Sock_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Sock_css__WEBPACK_IMPORTED_MODULE_1__);



function Sock() {
  const {
    email,
    setEmail
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)("");
  const handleChange = e => {
    setEmail(e.target.value);
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "sockContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "formContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, "Join our mailing list!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "Sign up to get the latest updates on Oasis, including application dates for both mentors and participants.")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "inputContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Enter your email:")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("form", {
    className: "emailInput",
    onsubmit: e => {
      e.preventDefault();
      console.log(email);
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", {
    type: "email",
    value: email,
    placeholder: "oasisneu@gmail.com",
    className: "active",
    onChange: handleChange
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", {
    className: "submitButton",
    onclick: () => {
      console.log(email);
      // onsubmit={email}
    }
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Submit")))));
}

/***/ }),

/***/ "./src/components/NavBar/NavBar.jsx":
/*!******************************************!*\
  !*** ./src/components/NavBar/NavBar.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _images_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/Logo */ "./src/images/Logo.jsx");
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _NavBarMobile_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavBarMobile.jsx */ "./src/components/NavBar/NavBarMobile.jsx");
/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavBar.css */ "./src/components/NavBar/NavBar.css");
/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NavBar_css__WEBPACK_IMPORTED_MODULE_5__);







function NavBar(isStatic = false) {
  const breakpoint = (0,_helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_3__["default"])();
  if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_2__.BREAKPOINT.MOBILE) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NavBarMobile_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isStatic: isStatic
  });
  const navStyling = isStatic ? `${'navContainer'} ${'staticNav'}` : 'navContainer';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "navContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "logoContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "logo"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "navLinks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/"
  }, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/about"
  }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/join"
  }, "Join")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/mentor"
  }, "Mentor")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://hub.oasisneu.com/resources"
  }, "Resources")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/contact"
  }, "Contact")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Outlet, null));
}

/***/ }),

/***/ "./src/components/NavBar/NavBarMobile.jsx":
/*!************************************************!*\
  !*** ./src/components/NavBar/NavBarMobile.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBarMobile)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _images_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/Logo */ "./src/images/Logo.jsx");
/* harmony import */ var _images_Close__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/Close */ "./src/images/Close.jsx");
/* harmony import */ var _images_Burger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/Burger */ "./src/images/Burger.jsx");
/* harmony import */ var _NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavBarMobile.css */ "./src/components/NavBar/NavBarMobile.css");
/* harmony import */ var _NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4__);






function NavBarMobile(isStatic = false) {
  const {
    0: isOpen,
    1: setIsOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: scrollY,
    1: setScrollY
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const open = () => {
    setScrollY(window.scrollY);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }
  }, [isOpen, scrollY]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: `
        ${'navWrapper'}
        ${isStatic && 'staticNav'}
        ${isOpen && 'open'}
        `
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `${'navMobileOpenContainer'} ${isOpen && 'open'}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'navMobileContainer'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: 'logo'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: 'navMobileLinks'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    onClick: !isOpen ? open : close
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Close__WEBPACK_IMPORTED_MODULE_2__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: 'navMobileOpenLinks'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link)))));

  // return (
  //     <>
  //     <nav
  //         className='navWrapper isStacxctic staticNav isOpen open'
  //         // ${navWrapper}
  //         // ${isStatic && staticNav}
  //         // ${isOpen && open}
  //         // `}
  //     >
  //         <div
  //             className='navMobileOpenContainer isOpen open'
  //                 // `${navMobileOpenContainer} ${isOpen &&
  //                 // open}`}
  //         >
  //         <div className='navMobileOpenContainer'>
  //             <Logo className='logo' />
  //             <ul className='navMobileLinks'>
  //                 <li onClick={!isOpen ? open : close}>
  //                     <Close /> 
  //                 </li>
  //             </ul>
  //         </div>
  //         <ul className='navMobileOpenLinks'>
  //             <Link href='/' onClick={!isOpen ? open : close}>
  //                 <li>Home</li>
  //             </Link>
  //             <Link href='/about' onClick={!isOpen ? open : close}>
  //                 <li>About</li>
  //             </Link>
  //             <Link href='/join' onClick={!isOpen ? open : close}>
  //                 <li>Join</li>
  //             </Link>
  //             <Link href='/mentor' onClick={!isOpen ? open : close}>
  //                 <li>Mentor</li>
  //             </Link>
  //             <Link href='/resources' onClick={!isOpen ? open : close}>
  //                 <li>Resources</li>
  //             </Link>
  //             <Link href='/Contact' onClick={!isOpen ? open : close}>
  //                 <li>Contact</li>
  //             </Link>
  //         </ul>
  //         </div>
  //         <div className='navMobileContainer isStatic navTopBorder'
  //         // {`
  //         //     ${navMobileContainer}
  //         //     ${isStatic && navTopBorder}`}
  //             >
  //             <Logo className='logo' />
  //             <li className='burger'
  //             onClick={!isOpen ? open : close}>
  //                 <Burger />
  //             </li>
  //         </div>
  //     </nav>
  //     </>
  // )
}

/***/ }),

/***/ "./src/components/Navbar/NavBarMobile.jsx":
/*!************************************************!*\
  !*** ./src/components/Navbar/NavBarMobile.jsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBarMobile)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var _images_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/Logo */ "./src/images/Logo.jsx");
/* harmony import */ var _images_Close__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../images/Close */ "./src/images/Close.jsx");
/* harmony import */ var _images_Burger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/Burger */ "./src/images/Burger.jsx");
/* harmony import */ var _NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavBarMobile.css */ "./src/components/Navbar/NavBarMobile.css");
/* harmony import */ var _NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_NavBarMobile_css__WEBPACK_IMPORTED_MODULE_4__);






function NavBarMobile(isStatic = false) {
  const {
    0: isOpen,
    1: setIsOpen
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const {
    0: scrollY,
    1: setScrollY
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const open = () => {
    setScrollY(window.scrollY);
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (isOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollY);
    }
  }, [isOpen, scrollY]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: `
        ${'navWrapper'}
        ${isStatic && 'staticNav'}
        ${isOpen && 'open'}
        `
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `${'navMobileOpenContainer'} ${isOpen && 'open'}`
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: 'navMobileContainer'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: 'logo'
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: 'navMobileLinks'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    onClick: !isOpen ? open : close
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Close__WEBPACK_IMPORTED_MODULE_2__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: 'navMobileOpenLinks'
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_5__.Link)))));

  // return (
  //     <>
  //     <nav
  //         className='navWrapper isStacxctic staticNav isOpen open'
  //         // ${navWrapper}
  //         // ${isStatic && staticNav}
  //         // ${isOpen && open}
  //         // `}
  //     >
  //         <div
  //             className='navMobileOpenContainer isOpen open'
  //                 // `${navMobileOpenContainer} ${isOpen &&
  //                 // open}`}
  //         >
  //         <div className='navMobileOpenContainer'>
  //             <Logo className='logo' />
  //             <ul className='navMobileLinks'>
  //                 <li onClick={!isOpen ? open : close}>
  //                     <Close /> 
  //                 </li>
  //             </ul>
  //         </div>
  //         <ul className='navMobileOpenLinks'>
  //             <Link href='/' onClick={!isOpen ? open : close}>
  //                 <li>Home</li>
  //             </Link>
  //             <Link href='/about' onClick={!isOpen ? open : close}>
  //                 <li>About</li>
  //             </Link>
  //             <Link href='/join' onClick={!isOpen ? open : close}>
  //                 <li>Join</li>
  //             </Link>
  //             <Link href='/mentor' onClick={!isOpen ? open : close}>
  //                 <li>Mentor</li>
  //             </Link>
  //             <Link href='/resources' onClick={!isOpen ? open : close}>
  //                 <li>Resources</li>
  //             </Link>
  //             <Link href='/Contact' onClick={!isOpen ? open : close}>
  //                 <li>Contact</li>
  //             </Link>
  //         </ul>
  //         </div>
  //         <div className='navMobileContainer isStatic navTopBorder'
  //         // {`
  //         //     ${navMobileContainer}
  //         //     ${isStatic && navTopBorder}`}
  //             >
  //             <Logo className='logo' />
  //             <li className='burger'
  //             onClick={!isOpen ? open : close}>
  //                 <Burger />
  //             </li>
  //         </div>
  //     </nav>
  //     </>
  // )
}

/***/ }),

/***/ "./src/components/Navbar/Navbar.jsx":
/*!******************************************!*\
  !*** ./src/components/Navbar/Navbar.jsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _images_Logo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../images/Logo */ "./src/images/Logo.jsx");
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _NavBarMobile_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NavBarMobile.jsx */ "./src/components/Navbar/NavBarMobile.jsx");
/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./NavBar.css */ "./src/components/Navbar/NavBar.css");
/* harmony import */ var _NavBar_css__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_NavBar_css__WEBPACK_IMPORTED_MODULE_5__);







function NavBar(isStatic = false) {
  const breakpoint = (0,_helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_3__["default"])();
  if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_2__.BREAKPOINT.MOBILE) return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_NavBarMobile_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
    isStatic: isStatic
  });
  const navStyling = isStatic ? `${'navContainer'} ${'staticNav'}` : 'navContainer';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", {
    className: "navContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "logoContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_images_Logo__WEBPACK_IMPORTED_MODULE_1__["default"], {
    className: "logo"
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "navLinks"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/"
  }, "Home")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/about"
  }, "About")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/join"
  }, "Join")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/mentor"
  }, "Mentor")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
    href: "https://hub.oasisneu.com/resources"
  }, "Resources")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__.Link, {
    to: "/contact"
  }, "Contact")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_7__.Outlet, null));
}

/***/ }),

/***/ "./src/components/Table/Table.jsx":
/*!****************************************!*\
  !*** ./src/components/Table/Table.jsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Table_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Table.css */ "./src/components/Table/Table.css");
/* harmony import */ var _Table_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Table_css__WEBPACK_IMPORTED_MODULE_1__);


const tableData = [{
  semester: "Fall",
  infoSession: "September 7th 2022",
  start: "September 14th 2022",
  end: "November 22nd 2022"
}, {
  semester: "Spring",
  infoSession: "January 15th 2023",
  start: "January 22nd 2023",
  end: "April 2nd 2023"
}];
function Table() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "tableContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("table", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, " "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Info Session")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "Start")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("th", {
    className: "endCell"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "End"))), tableData.map((val, key) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("tr", {
      key: key
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      className: "semesterCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, val.semester)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      className: "infoSessionCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, val.infoSession)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      className: "startCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, val.start)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("td", {
      classsName: "endCell"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, val.end)));
  })));
}

/***/ }),

/***/ "./src/components/Timeline/Timeline.jsx":
/*!**********************************************!*\
  !*** ./src/components/Timeline/Timeline.jsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Timeline)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Timeline_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Timeline.css */ "./src/components/Timeline/Timeline.css");
/* harmony import */ var _Timeline_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Timeline_css__WEBPACK_IMPORTED_MODULE_1__);

// import { container, row, col, timelineStep, timelineStepDown,
//         timelineStepUp, dot, text, circle, timelineStepContent} from './Timeline.module.scss'

function Timeline() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineComponent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("ul", {
    className: "container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Git-ting Started")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "0")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Shoot your Shot")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "1")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Data for Design")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "2")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Styling + Swift")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "3")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Data-BASED")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "4")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Mid-Semester Showcase")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "5")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Reeling it in")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "6")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Mindset to Grindset")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "7")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Presentation Preparation")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleUp"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "8")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("li", {
    className: "timelineStepDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "timelineStepContent"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "text"
  }, "Demo Day")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "dot"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
    className: "circleDown"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "D"))))));
}

/***/ }),

/***/ "./src/components/card/Card.jsx":
/*!**************************************!*\
  !*** ./src/components/card/Card.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _Card_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Card.css */ "./src/components/card/Card.css");
/* harmony import */ var _Card_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Card_css__WEBPACK_IMPORTED_MODULE_3__);





const numberData = [{
  number: "75",
  description: "Total Oasis Projects"
}, {
  number: "278",
  description: "Total Oasis Participants"
}, {
  number: "73",
  description: "Participants this Semester"
}, {
  number: "0",
  description: "Projects this Semester"
}];
const PAGE_SIZE_DESKTOP = 4;
const PAGE_SIZE_MIDSIZE = 2;
const PAGE_SIZE_MOBILE = 2;
function Card() {
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
      setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_DESKTOP));
      setPageSize(PAGE_SIZE_DESKTOP);
    } else if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MIDSIZE) {
      setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_MIDSIZE));
      setPageSize(PAGE_SIZE_MIDSIZE);
    } else {
      setTotalPages(Math.ceil(numberData.length / PAGE_SIZE_MOBILE));
      setPageSize(PAGE_SIZE_MOBILE);
    }
  }, [breakpoint]);
  const renderCards = () => {
    const renderCardBlock = (number, description, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "cardBlock",
        key: "key"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, number), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, description));
    };
    const renderedBlocks = [];
    for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize && i < numberData.length; i++) {
      renderedBlocks.push(renderCardBlock(numberData[i].number, numberData[i].description));
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
    className: "cardContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "cardGrid"
  }, renderCards()), breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MOBILE && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "pageController"
  }, renderPageController()));
}

/***/ }),

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

/***/ "./src/components/card/ProjectCard.jsx":
/*!*********************************************!*\
  !*** ./src/components/card/ProjectCard.jsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectCard)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helpers_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helpers/types */ "./src/components/helpers/types.jsx");
/* harmony import */ var _helpers_userBreakpoint__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers/userBreakpoint */ "./src/components/helpers/userBreakpoint.jsx");
/* harmony import */ var _images_Projects_HowBusyIsMarino_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../images/Projects/HowBusyIsMarino.png */ "./src/images/Projects/HowBusyIsMarino.png");
/* harmony import */ var _images_Projects_RoomieHub_png__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../images/Projects/RoomieHub.png */ "./src/images/Projects/RoomieHub.png");
/* harmony import */ var _images_Projects_TransitNU_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../images/Projects/TransitNU.png */ "./src/images/Projects/TransitNU.png");
/* harmony import */ var _ProjectCard_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProjectCard.css */ "./src/components/card/ProjectCard.css");
/* harmony import */ var _ProjectCard_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ProjectCard_css__WEBPACK_IMPORTED_MODULE_6__);








const projectData = [{
  image: _images_Projects_HowBusyIsMarino_png__WEBPACK_IMPORTED_MODULE_3__["default"],
  name: "How Busy is Marino",
  description: "HowBusyIsMarino.com is a website summarizing Marino activity over previous periods of time that produces graphical predictions for future capacity at Marino. We also have information about SquashBusters!",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_Projects_RoomieHub_png__WEBPACK_IMPORTED_MODULE_4__["default"],
  name: "Roomie Hub",
  description: "The essential tool to track chores, groceries, schedules, and more with your roommate!",
  link: "https://www.linkedin.com/feed/"
}, {
  image: _images_Projects_TransitNU_png__WEBPACK_IMPORTED_MODULE_5__["default"],
  name: "TransitNU",
  description: "Public transportation is an important aspect of Northeastern students' lives. Many use it to get to points-of-interest around Boston or commute off campus. ",
  link: "https://www.linkedin.com/feed/"
}];
const PAGE_SIZE_DESKTOP = 3;
const PAGE_SIZE_MIDSIZE = 2;
const PAGE_SIZE_MOBILE = 1;
function ProjectCard() {
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
      setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_DESKTOP));
      setPageSize(PAGE_SIZE_DESKTOP);
    } else if (breakpoint === _helpers_types__WEBPACK_IMPORTED_MODULE_1__.BREAKPOINT.MIDSIZE) {
      setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_MIDSIZE));
      setPageSize(PAGE_SIZE_MIDSIZE);
    } else {
      setTotalPages(Math.ceil(projectData.length / PAGE_SIZE_MOBILE));
      setPageSize(PAGE_SIZE_MOBILE);
    }
  }, [breakpoint]);
  const renderCards = () => {
    const renderCardBlock = (name, description, image, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
        className: "projectCard",
        key: "key"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", {
        src: image
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, description));
    };
    const renderedBlocks = [];
    for (let i = (currentPage - 1) * pageSize; i < currentPage * pageSize && i < projectData.length; i++) {
      renderedBlocks.push(renderCardBlock(projectData[i].name, projectData[i].description, projectData[i].image));
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
    className: "projectCardContainer"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "projectGrid"
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
    className: `${'contentBlockContainerDefault'} ${className}`
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, title), body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, body));
}

/***/ }),

/***/ "./src/components/common/CustomImage.jsx":
/*!***********************************************!*\
  !*** ./src/components/common/CustomImage.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CustomImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! gatsby-plugin-image */ "./node_modules/gatsby-plugin-image/dist/gatsby-image.module.js");
/* harmony import */ var _CustomImage_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CustomImage.css */ "./src/components/common/CustomImage.css");
/* harmony import */ var _CustomImage_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_CustomImage_css__WEBPACK_IMPORTED_MODULE_1__);

// import { customImageDefault } from "./CustomImage.module.scss"



function CustomImage({
  src,
  alt,
  className,
  objectFit = "cover"
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: "customImageDefault"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(gatsby_plugin_image__WEBPACK_IMPORTED_MODULE_2__.GatsbyImage, {
    src: src,
    alt: alt,
    fill: true,
    style: {
      objectFit: objectFit
    }
  }));
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
    className: `${'titleBlockContainerDefault'} ${className}`
  }, title && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, title), body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, body));
}

/***/ }),

/***/ "./src/components/faq/faq.jsx":
/*!************************************!*\
  !*** ./src/components/faq/faq.jsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ FaqComponent)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _faq_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./faq.css */ "./src/components/faq/faq.css");
/* harmony import */ var _faq_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_faq_css__WEBPACK_IMPORTED_MODULE_1__);



function FaqComponent({
  question,
  answer,
  isExpanded,
  onClick,
  className
}) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    className: `${'faqContainer'} ${className} ${isExpanded && 'expanded'}`,
    onClick: onClick
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h3", null, question), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    onClick: onClick,
    className: 'icon'
  }, isExpanded ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "-") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h2", null, "+")), isExpanded && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, answer));
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

/***/ "./src/components/parallax.jsx":
/*!*************************************!*\
  !*** ./src/components/parallax.jsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Parallax)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Parallax({
  children,
  parallaxFactor,
  className
}) {
  const parallaxRef = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_0__.createRef)();
  const handleParallax = () => {
    parallaxRef.current.style.transform = `translateY(${parallaxRef.current.getBoundingClientRect().y * parallaxFactor - parallaxRef.current.getBoundingClientRect().y}px)`;
  };
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    handleParallax();
    window.addEventListener("scroll", handleParallax);
    return function cleanup() {
      window.removeEventListener("scroll", handleParallax);
    };
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    ref: parallaxRef,
    className: className
  }, children);
}

/***/ }),

/***/ "./src/images/ArrowDown.jsx":
/*!**********************************!*\
  !*** ./src/images/ArrowDown.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function ArrowDown() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "20",
    height: "22",
    viewBox: "0 0 20 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M9.11612 20.8839C9.60427 21.372 10.3957 21.372 10.8839 20.8839L18.8388 12.9289C19.327 12.4408 19.327 11.6493 18.8388 11.1612C18.3507 10.673 17.5592 10.673 17.0711 11.1612L10 18.2322L2.92893 11.1612C2.44078 10.673 1.64932 10.673 1.16117 11.1612C0.67301 11.6493 0.67301 12.4408 1.16117 12.9289L9.11612 20.8839ZM8.75 0L8.75 20H11.25L11.25 0L8.75 0Z",
    fill: "currentColor"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ArrowDown);

/***/ }),

/***/ "./src/images/Burger.jsx":
/*!*******************************!*\
  !*** ./src/images/Burger.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Burger() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "29",
    height: "20",
    viewBox: "0 0 29 20",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "1",
    y1: "1",
    x2: "28",
    y2: "1",
    stroke: "#ECF0F1",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "1",
    y1: "9.15625",
    x2: "28",
    y2: "9.15625",
    stroke: "#ECF0F1",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "1",
    y1: "18.2188",
    x2: "28",
    y2: "18.2188",
    stroke: "#ECF0F1",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Burger);

/***/ }),

/***/ "./src/images/Close.jsx":
/*!******************************!*\
  !*** ./src/images/Close.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Close() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "23",
    height: "22",
    viewBox: "0 0 23 22",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "2.41421",
    y1: "1",
    x2: "21.5061",
    y2: "20.0919",
    stroke: "#ECF0F1",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("line", {
    x1: "1",
    y1: "20.0919",
    x2: "20.0919",
    y2: "1.00001",
    stroke: "#ECF0F1",
    "stroke-width": "2",
    "stroke-linecap": "round"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Close);

/***/ }),

/***/ "./src/images/InstagramIcon.jsx":
/*!**************************************!*\
  !*** ./src/images/InstagramIcon.jsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function InstagramIcon() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "46",
    height: "46",
    viewBox: "0 0 46 46",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    d: "M23 0.557373C16.899 0.557373 16.1387 0.586833 13.7511 0.687837C11.3536 0.805676 9.73194 1.17743 8.30105 1.73295C6.82526 2.31092 5.56832 3.07828 4.3268 4.3268C3.07687 5.56832 2.30251 6.82526 1.73295 8.30105C1.17743 9.73194 0.805676 11.3536 0.687837 13.7511C0.579818 16.1401 0.557373 16.899 0.557373 23C0.557373 29.1009 0.586833 29.8613 0.687837 32.2489C0.805676 34.6394 1.17743 36.2681 1.73295 37.6989C2.31092 39.1747 3.07828 40.4317 4.3268 41.6732C5.56832 42.9231 6.82526 43.6975 8.30105 44.267C9.73194 44.8156 11.3606 45.1943 13.7511 45.3122C16.1401 45.4202 16.899 45.4426 23 45.4426C29.1009 45.4426 29.8613 45.4132 32.2489 45.3122C34.6394 45.1943 36.2681 44.8142 37.6989 44.267C39.1747 43.6891 40.4317 42.9217 41.6732 41.6732C42.9231 40.4317 43.6975 39.1818 44.267 37.6989C44.8156 36.2681 45.1943 34.6394 45.3122 32.2489C45.4202 29.8599 45.4426 29.1009 45.4426 23C45.4426 16.899 45.4132 16.1387 45.3122 13.7511C45.1943 11.3606 44.8141 9.72353 44.267 8.30105C43.6891 6.82526 42.9217 5.56832 41.6732 4.3268C40.4317 3.07687 39.1818 2.30251 37.6989 1.73295C36.2681 1.17743 34.6394 0.805676 32.2489 0.687837C29.8599 0.579818 29.1009 0.557373 23 0.557373ZM23 4.59755C28.9915 4.59755 29.707 4.62701 32.075 4.72801C34.2592 4.83042 35.4488 5.19516 36.2386 5.50378C37.2921 5.91201 38.0286 6.39459 38.8254 7.18298C39.6068 7.96437 40.0894 8.70927 40.4976 9.7628C40.8062 10.5526 41.171 11.7422 41.2734 13.9264C41.3744 16.2944 41.4038 17.0113 41.4038 23.0014C41.4038 28.9915 41.3744 29.7084 41.265 32.0764C41.1471 34.2606 40.7824 35.4502 40.4752 36.24C40.0501 37.2935 39.5759 38.03 38.7932 38.8268C38.0034 39.6082 37.2514 40.0908 36.2063 40.499C35.4263 40.8076 34.2199 41.1724 32.0273 41.2748C29.6467 41.3758 28.9452 41.4053 22.9383 41.4053C16.9313 41.4053 16.2313 41.3758 13.8479 41.2664C11.6637 41.1485 10.4586 40.7838 9.66882 40.4766C8.60266 40.0515 7.87178 39.5774 7.08899 38.7946C6.29919 38.0048 5.79698 37.2528 5.40979 36.2077C5.09556 35.4278 4.73643 34.2213 4.62 32.0287C4.54003 29.6761 4.50216 28.9466 4.50216 22.9677C4.50216 16.9916 4.54003 16.2608 4.62 13.8787C4.73643 11.6861 5.09556 10.4825 5.40979 9.69968C5.79698 8.63212 6.3006 7.90264 7.08899 7.11284C7.87038 6.33146 8.60266 5.82644 9.66882 5.43084C10.4586 5.12362 11.6342 4.75888 13.8268 4.64946C16.2075 4.56388 16.9089 4.53302 22.9074 4.53302L23 4.59755ZM23 11.4813C16.6297 11.4813 11.4785 16.6395 11.4785 23.0028C11.4785 29.3731 16.6367 34.5243 23 34.5243C29.3703 34.5243 34.5215 29.3661 34.5215 23.0028C34.5215 16.6325 29.3633 11.4813 23 11.4813ZM23 30.4841C18.8644 30.4841 15.5187 27.1384 15.5187 23.0028C15.5187 18.8672 18.8644 15.5215 23 15.5215C27.1356 15.5215 30.4813 18.8672 30.4813 23.0028C30.4813 27.1384 27.1356 30.4841 23 30.4841ZM37.6793 11.0212C37.6793 12.5124 36.4659 13.716 34.9816 13.716C33.4904 13.716 32.2868 12.511 32.2868 11.0212C32.2868 9.53835 33.4988 8.33191 34.9816 8.33191C36.4645 8.33191 37.6793 9.53835 37.6793 11.0212Z",
    fill: "#397367"
  }));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InstagramIcon);

/***/ }),

/***/ "./src/images/Logo.jsx":
/*!*****************************!*\
  !*** ./src/images/Logo.jsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Logo() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 82 53",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXgalink: "http://www.w3.org/1999/xlink"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    width: "82",
    height: "53",
    fill: "url(#pattern0)"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("pattern", {
    id: "pattern0",
    patternContentUnits: "objectBoundingBox",
    width: "1",
    height: "1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#image0_1_4",
    transform: "matrix(0.00157978 0 0 0.00244419 0 -0.00350234)"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("image", {
    id: "image0_1_4",
    width: "633",
    height: "412",
    xlinkHref: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAnkAAAGcCAYAAAClaLYNAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAQABJREFUeAHtnet108zahmGv7z/eFWAqwFSAUgGmAkwFmApwKnhNBZgKCBVEqQBTAUoFO1TwfvfNK+/tOHZ80mEO16z1xJY0mnmea0aa2zOy8+QJCQIQgAAEIAABCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAIEmCDxtohDKgAAEHhL4+++/R9o7eHjkoD13T58+XR6Uk0wQgAAEIACBLQQQeVugsAsC2whItA2132bhZgHn5FdvO/n9sz/vmv9zqyKruli/2u5kS78iCEWBBAEIQAAC9wgg8u7hYAMC/xCQoJvpncWbhdtQ9lwWeloJQQu/SubXpQTgnV5JEIAABCCQGQFEXmYNTriHEahn7RbK/fqwM4LOZfH3R/DptfR7hJ8okCAAAQgkTgCRl3gDE955BCT2JiphLmtrGfY8B08/+6dOLWUWf1eIPlEgQQACEEiMACIvsQYlnOYJSOgNVKqF3rvmSw+mxJXoKyX4roLxCkcgAAEIQOBkAoi8k9FxYm4EJPYKxbyQxfB8ntw8K33X2RZ7zPKdhZGTIQABCPRHAJHXH3tqjpSAxN5Mrn+K1P1T3EbwnUKNcyAAAQj0TACR13MDUH2cBCT0hvJ8IUvhixkK4+D0R/BpSXdx8BlkhAAEIACBXggg8nrBTqWpEJDYmyqWmSy1L2bsa6LfyuDl3LkE33JfZo5DAAIQgED3BBB53TOnxsQISOgNFNJC9iax0A4N56cyzmU8v3coMfJBAAIQ6IAAIq8DyFSRBwGJvbEitdjJ4YsZ2xrVs3uOf6HZvWpbBvZBAAIQgEB3BBB53bGmpgwI1LN6M4X6IYNwHwvxqw7OEHuPIeIYBCAAgXYJIPLa5UvpmRKQ2CsU+kKW66yeQv+T/EUNP7dX/rPJXwhAAAIQ6IrAv7qqiHogkBMBixrZUDFf5hT3llj9nOK1RG9ZC98tWdgFAQhAAAJtEGAmrw2qlAmBNQISNyNtLmQv13bn+varAmcZN9fWJ24IQKBTAszkdYqbynIkoBm9pcxCL/dZPTf/O9kvCd+FbOAdJAhAAAIQaIcAM3ntcKVUCGwlwKzePSx/vo0rATy7t5cNCEAAAhBohAAirxGMFAKB4whI7M10xlT27Lgzk8x9q6gmEntlktERFAQgAIGeCCDyegJPtRCQ0BuKwkKW279GU8hbk7+JO5XYq7YeZScEIAABCBxFgGfyjsJFZgg0R8BiRlaoxI8yL13mnvxN3KXEr2c4SRCAAAQgcCYBZvLOBMjpEGiCALN6DyjeaI+XcKsHR9gBAQhAAAIHEWAm7yBMZIJAuwTWZvUu260pmtK9hM2sXjTNhaMQgECIBJjJC7FV8ClrAprV88+tLGT8rt4/PYFZvX848BcCEIDAUQSYyTsKF5kh0D4Bzerxu3r3Ma9m9cb3d7MFAQhAAAKPEWAm7zE6HINAzwSY1XvQAJ+1x/8x4+7BEXZAAAIQgMA9Aoi8ezjYgECYBCT25vLsQ5jede7VT9U45ksZnXOnQghAIDICiLzIGgx38yUgoVco+oXsuSz35J+c8bdvr3IHQfwQgAAEdhHgmbxdZNgPgcAISNCUcmkk+xqYa3244/8U8k3Cd9ZH5dQJAQhAIAYCzOTF0Er4CIENAhI3Y+1ayCx2ck/fBcCzene5gyB+CEAAAusEEHnrNHgPgYgISOgN5O6VjH+L9uQJz+lF1HdxFQIQ6IYAy7XdcKYWCDROwDNXskIFf5T5GbWck39T0D+ePMoZArFDAAIQWCfATN46Dd5DIFICtbhZyH2LnZyTxS5fyMi5BxA7BCDwXwLM5P0XBW8gEC8BzeitfkD5c7xRNOL56gsZk0ZKoxAIQAACERNgJi/ixsN1CGwjoFm9Qvv9rF7uX8p4L/G7EAcSBCAAgSwJMJOXZbMTdMoEJGxKxTeUfZflnL5I8M5zBkDsEIBA3gSYycu7/Yk+cQISOVOF+FfiYe4L76uE72RfJo5DAAIQSI0AIi+1FiUeCGwQkNDzN069fJvzf8pA6G30CzYhAIH0CbBcm34bE2HmBDSLtRQCC72vGaN4J7G7yDh+QocABDIkwExeho1OyPkSkNCZKPq5LNcvZTCjl2/3J3IIZEeAmbzsmpyAcyagWb2F4i9kP2U5Js/ozXIMnJghAIH8CDCTl1+bEzEEnkjoDITBM3rvMsXxvha8mYZP2BCAQA4EEHk5tDIxQmAHgXr59suOw6nvRuil3sLEB4HMCSDyMu8AhA8BCT1/KeNKluO3by80o1fSCyAAAQikSACRl2KrEhMEjiRQL99a6L0+8tTYs/t/3RYSesvYA8F/CEAAApsE+OLFJhG2IZAhAYmcO1mh0C8zC9/fMi5rkZtZ6IQLAQikToCZvNRbmPggcCQBCZ6xTlnIcvqZFX/b2DN6d3olQQACEEiCADN5STQjQUCgOQISOl62LWQ5/czKS8U7l5EgAAEIJEMAkZdMUxIIBJojIKG3VGmF7HtzpQZf0jvNYs6C9xIHIQABCBxIgOXaA0GRDQK5EpDw8QzXh4ziv5DILTOKl1AhAIFECSDyEm1YwoJAkwQk9CYqL5ff0/M3bkcSepVeSRCAAASiJYDIi7bpcBwC3RKQ0BupxlKWwxcyfkrkOV4SBCAAgWgJ8ExetE2H4xDoloBEj5/Ts/DJ4QsZL+tl6m4hUxsEIACBBgkwk9cgTIqCQA4EJH4GirOU+Rupqae3ErdXsQVZt5EFudOwNr93Gtbm94+lOx1crmWo9N7mtBQXHydBAAIBE0DkBdw4uAaBkAlISCzk37uQfWzANz+fNwxR0Ij/0L7JCtlANpINZV3+ezrP6lrsLWVV/YoAFAgSBEIggMgLoRXwAQKREshE6H2XyBv32UTibAG3bqH/+zmLYwu/cvUaolCWbyQIJE0AkZd08xIcBNonIAEyUS2pf/P2o0TKvH2a/9QgpoXerSx0QfeP0/v/etZvJfyuEH37gZEDAucSQOSdS5DzIQCBJxkIPc9MtfazKvVMXaE6xrJURJ1CeTRZ9JWyhQSfxR8JAhBomAAir2GgFAeBXAlkIPQaXbYVLwu6leXwszSPXRoW0Vc2CT6/kiAAgQYIIPIagEgREIDAPwQyEHonf9tWbAaitBJ1b+gzOwmsBJ9n+MqduTgAAQjsJYDI24uIDBCAwDEEEhd6FiBHfdu2nrGb6DyE3TEd6Z+8t3pZ2CT4Kr2SIACBIwgg8o6ARVYIQOAwAokLvc8SHNPHSCj+kY47j2fucl+KfQzVMce+K7PF3tUxJ5EXAjkTQOTl3PrEDoEWCSQu9F5sziwp3oFwWtRNZS9bRJt70Z7dm8n4hm7uPYH49xJA5O1FRAYIQOBUAhI+M5376dTzAz7vRiKvsH+KcaiXmcwCj1k7Qegoeel8blNb3HVUJ9VAICoCiLyomgtnIRAfAYmghbx+F5/nez3+qBwWdrn85MleID1lQOz1BJ5qwyeAyAu/jfAQAtETkNBbKgiWMKNvyaADQOwF3Tw41wcBRF4f1KkTApkRkMgbKORKxnJmZm3fQ7iIvR6gU2WYBP4Vplt4BQEIpESgfmbKS5skCLRNwB8k/BzoUh8uJm1XRvkQCJkAIi/k1sE3CCREQEKvVDifEwqJUMIm8FzufZHQK2WjsF3FOwi0Q4Dl2na4UioEILCFgAZblm23cGFXJwT8AWPGN3E7YU0lgRBgJi+QhsANCORAoB5gZznESozBEfggj7yEy2MDwTUNDrVFgJm8tshSLgQgsJUAs3lbsbCzWwLfVd2EWb1uoVNb9wSYyeueOTVCIGsC9cC6yBoCwfdN4I0cqJjV67sZqL9tAoi8tglTPgQgsI1AuW0n+yDQIQF/C/ebhN68nl3usGqqgkA3BFiu7YYztUCgdQIaqPwNQn+xYTPt2r+Z79ztOxWw3FLInWbv7u2Xr4XyXW/Jyy4I9EHgpyr18u29ftqHI9QJgSYJIPKapElZEDiTQD2jMKqLGeh19d67Cv+pk4+9XG1E+OpBNWb/I0SOy3sI/NbxqYTeYk8+DkMgGgKIvGiaCkdjJ7A20zZULLZ1Ecf/PxUQEgQCIPBVQm8SgB+4AIGzCSDyzkZIARD4h8DaLNxQe2yehVsJOT//Q4IABOIg4JnmQmLvLg538RIC2wkg8rZzYS8EdhKQmBvqoK2oX/3egg4hJwgkCCRC4FZxjCX0lonEQxgZEkDkZdjohHw4gXqJ1QJu3RBzhyMkJwRiJuDn9Dyjh9CLuRUz9h2Rl3HjE/p9AvUMXaG9K0HHc3L3EbEFgS4J3GxUdqftJsXWUOXZNtPmdY/Q2yTEdjQE/i8aT3EUAg0TqGfpChW7MmboGmZMcRDYILASbhZrFm3rwq3SjFm1kb/3Td0nit6dwAEInEiAmbwTwXFafAQ2RN2b+CLAYwhEQcBfWqhkFnJ+tS35EoMokCDQMQFEXsfAqa47AhJ1A9U2lhX1KzN1AkGCQIMEPDNXyiqZhZyFHQkCEAiEACIvkIbAjWYIrM3WTVTiy2ZKpRQIQEAEbmVlbQg6gSBBIHQCiLzQWwj/9hKohd1EGT1r93zvCWSAAAQOIeAvHFzJSluIz8vJLxIEIPAIAUTeI3A4FC4BCbuhvJvKEHbhNhOexUfAs3UWdguWXuNrPDyGwCYBRN4mEbaDJVA/YzeRgzaWYgWBBIEGCCDsGoBIERAIkQAiL8RWwad7BCTuCu2YyN7JSBCAwPkEVkuxc2bszodJCRAIlQAiL9SWydyvetbOS7EzGc/ZZd4fCL8xAv55k7nsSuLurrFSKQgCEAiSACIvyGbJ16n6WbuJCExl/ORJvl2ByJslcKPiZhJ2ZbPFUhoEIBAyAUReyK2TkW+1uJspZJZkM2p3Qm2dAOKudcRUAIFwCSDywm2bLDxD3GXRzATZPQHEXffMqRECwRFA5AXXJHk4hLjLo52JsnMCt6pxqmXZq85rpkIIQCA4Aoi84JokbYck7gaK0M/b8cxd2k1NdN0TuFSV/rbsXfdVUyMEIBAiAUReiK2SqE8SeGOFNpfxbdlE25iweiHgb8xOJO6WvdROpRCAQLAEEHnBNk06jtVLswtF9DqdqIgEAkEQ+CovvDzL7F0QzYETEAiLwL/CcgdvUiMggTdTTJ5hQOCl1rjE0ycB/5jxe4k7z+Ah8PpsCeqGQMAEmMkLuHFidq2evbtSDPz7sZgbEt9DJGCBV0jc+cMTCQIQgMBOAszk7UTDgVMJSOBNdK4HIATeqRA5DwLbCSDwtnNhLwQgsIUAM3lboLDrNAISdwOdOZfxg8anIeQsCDxGAIH3GB2OQQACDwgg8h4gYccpBCTwRjpvIWP27hSAnAOBxwkg8B7nw1EIQGALgf/bso9dEDiKgAReoROuZPyv2aPIkRkCBxPw9TXQtTb169pZxdr7Q9+Waxkrvbc5LfkSxz8g+AuBVAgwk5dKS/YUhwadiar+0lP1qVTrWZrljmDKHfv37S62ZBhq3/Mt+9kFgXUCP7VxJytllU3iz+9JEIBAZAQQeZE1WEjuIvAetMa6WPMguRJu6+99UhAzJmq/kXwZ2CGl4s/fJ0+Gel0ZgrCGwssfArf6W8rcr92H/Z4EAQgETACRF3DjhOyaBMJC/uX0BYvV7EaluG3rwi0I0SafGk9rQrBQ4RaEI9lrGQkCJnAjK2VX/KSLKJAgEBgBRF5gDRKDO4kKPM9SVDLPUqwE3J9XnlMSkY2kPjDULgs+WyFD+AlC5skz2Vey0q9cN6JAgkDPBBB5PTdAbNVrcJ/K579i87v2dyXkSm3fyZYyP29U6ZV0JoF61q9QMbY3MlLeBL4rfIs+BF/e/YDoeySAyOsRfmxVaxCfyOcvEfjtpdVKZhG3EnJ+JXVIQP2lUHXj2p53WDVVhUVgNcO30AeqMizX8AYCaRNA5KXdvo1FpwHbg/W3xgpspiDEXDMcWy+lnuWbqCL3IwRf68SDrcCz6XOZBd9dsF7iGAQSIYDIS6Qh2wyjHqBL1dHX7+B5JmC5Zvykg2DEmur+NJX/Y1lffSpWfKn4vZrdm/G4RCpNShwhEkDkhdgqAfmkAXkgd0rZy47c8if9SlbK/gg7BgGRSDDVfctCbyZjdi/BNj4wpK/Kx1LugbDIBoFjCCDyjqGVYV4NxAuF/a6l0FczdKXKtyX7UySKjfQIAfWziQ7bXstIeRK4Udie2SvzDJ+oIdA8AURe80yTKVEDr2dZmnwOzzfxUsYMnSCQHhJQnyu0dyFjZk8QMk1fFTfLuJk2PmE3SwCR1yzPZErTYDtQMJXs1GembnVuKbOgK/Xp3K8kCBxEoJ7Zmyvzqf3voHrIFDSBz/LOYu8uaC9xDgIBE0DkBdw4fbqmQfZK9b85wocb5bWQK23cmEWBdBaB+oPGTIV8OKsgTo6ZgB/psNCz4CdBAAJHEkDkHQksh+waXAvFef1IrPeepdMNuHwkL4cgcBaBuj8uVAhLuGeRjPpkf4ic6l7jD5IkCEDgQAKIvANB5ZRNg6pvpC/XYraoK1fGjXaNDG87IVDP6nk2510nFVJJqAQudf+ZheocfkEgNAKIvNBapGd/NJhO5MIXmT85lzL/SyI+PQsEqX8Ca/2zf2fwoC8CP1XxhPtSX/ipNyYCiLyYWqsDXzWIjrh5dgCaKk4m4D6qk0sZX8o4mWISJ17qXjVLIhKCgEBLBBB5LYGlWAhAoD0CCL322EZWslccxhJ7d5H5jbsQ6ITAvzqphUogAAEINEignm0eN1gkRcVJ4LXcriT6izjdx2sItEsAkdcuX0qHAARaIKBBfaJir1oomiLjI+Bl+2v1iVl8ruMxBNolwHJtu3wpHQIQaJhALfD85SASBDYJfNcOfymD5dtNMmxnSQCRl2WzEzQE4iSAwIuz3Tr22t++LRB6HVOnuiAJIPKCbBacggAENgkg8DaJsP0IAf+2p4Xe8pE8HIJA8gR4Ji/5JiZACMRPAIEXfxt2HIGf0yvVb4qO66U6CARFAJEXVHPgDAQgsEkAgbdJhO0DCay+kDE5MD/ZIJAcAZZrk2tSAoJAOgQQeOm0Zc+RvNfS7aJnH6geAp0TQOR1jpwKIQCBQwgg8A6hRJ4jCCD0joBF1jQIIPLSaEeigEBSBBB4STVnSMEg9EJqDXxpnQAir3XEVAABCBxDAIF3DC3ynkAAoXcCNE6JkwAiL852w2sIJElAAm+kwH4kGRxBhUQAoRdSa+BLawT4dm1raCkYAhA4hkAt8MpjziEvBE4k8KWeMT7xdE6DQBwEEHlxtBNeQiBpAmsCzz97EUq6CcUR/GiFgIWeZ45JEEiWACIv2aYlMAjEQUAD7UCeXslCEnhf5c9YdisjpUvAP5iM0Eu3fbOPjGfysu8CAIBAfwRqgVfKg5f9efGgZv9LrOFT/ZP7WgDwjOADREnt+G97JxUVwUBABJjJoxtAAAJ9EvAMXkgCzyxmFnh+o9elXi79npQsAc8ge0ZvkGyEBJYtAWbysm16AodAvwQ0qC7kwbt+vXhQ+62E3XBzr3y12AtNjG66yfZ5BL6q7SfnFcHZEAiLADN5YbUH3kAgCwISTVMFGprAM/uJ/2xJY+3zsh4pXQLv1C9n6YZHZDkSQOTl2OrEDIEeCWggnaj6v3p0YVfVN5rJKbcd1P5K+2fbjrEvKQKf1D8t6EkQSIIAy7VJNCNBQCAOAhpAR/K0lPk5qNDSK4m55WNOyf9Sx18/lodj0RPwjO2oFvbRB0MAeRNgJi/v9id6CHRGQAJpqMpKWYgC7+s+gSe/nSYylm1NIt3k/nmVbnhElhMBRF5OrU2sEOiJgATeQFV74AxR4Fm0zWR7Uz27M9+bkQyxE3ipPks7x96K+M9PqNAHIACBTggsVMvLTmo6vpL5MUtzyjtTFT+Pr4YzIiPwQUJvHJnPuAuBewR4Ju8eDjYgAIGmCWignKnMT02X21B5nsX788PHx5SnmEbK/+OYc8gbJYGT+keUkeJ0kgRYrk2yWQkKAmEQqGdCQhV4huRZvLtjaemcpc75fOx55I+OAM/nRddkOLxOgJm8dRq8hwAEGiNQz3aVKjDE5/Ac563E2tBvTkmKb6DzKlmo8Z0SFudsJ/BRfWW+/RB7IRAuAWbywm0bPINAtARqAbRQACELoNk5gDXoewZwck4ZnBsNgZn69DAab3EUAjUBZvLoChCAQOMENCBeqdA3jRfcXIFnzeKtu6FYS23z23nrUNJ8fyNhX6QZGlGlSoCZvFRblrgg0BMBiZ6Zqg5Z4JmMfWwqTZoqqMVyblS2v0RAOp3Aa/Xt6emncyYEuieAyOueOTVCIFkCGgQLBRfyFy3M3rN4C79pIqmsSuWE/iUMz6wOZR9ltzLSaQS8bDs47VTOgkD3BFiu7Z45NUIgSQL14FcpuJCfwzP7902KPBcYQew3irmwr07yd6IXG8vMgnBk+i6W4yPPITsEeiGAyOsFO5VCID0CEg6logpdNNxqgB7Kz8ZTLZy+NF5wcwX+W7HfrRcnnwttz2Sht5tcDCpdiGUZlEc4A4EtBFiu3QKFXRCAwHEEJBZmOiMGoWA/W0ka9Bcq+GcrhTdTaLFZjIWKzPsvZN83j7O9k8Bi5xEOQCAgAoi8gBoDVyAQI4F6NuhTBL7f1kKsTVenbRZ+Ztk7lxhrsefjr2Q3Z9aTw+nP6w82OcRKjBETYLk24sbDdQj0TUAD3UA+VLLQn8MzqvcdiDw/73alukL8dvGt4h/Kt71JMRTKNJPFMDsrN3tJv1Xr0f8SrxdPqTRbAoi8bJuewCFwPgGJgVKlxCAEDhY451IRk6HK+HVuOS2d/0JCrzq0bMTeXlJfxXOyNxcZINATAZZrewJPtRCInYAEwEwxxCDwjNq+dpJqEfW5k8qOr2Tnku22ohTL6pm9tzp+uy1P5vve6ToYZc6A8AMmwExewI2DaxAIlUA9sP0I1b8Nv24lVoYb+1rdFJ9Ql7HP+vkPxTUVuJkshuX5Vtt4rfAb9a9ibZu3EAiGADN5wTQFjkAgDgK1gLmKw9s/Xs679lWD/p3q7LzeA+IsDsizM4vickxDWagzlTt9b/HAa10TRYvlUzQETibATN7J6DgRAnkS0IDmgf5DJNH39nB8LYYrcQpt1uuVxNry3PZTfEOVsZDFsmQvV1tLP8V01FrpFAyBEwkwk3ciOE6DQI4ENLCPFXcsAs9NNK9n1TpvrrreaecV76/QbXh2UnyVrFBBF7LbswuMu4CXujYmcYeA9ykSYCYvxVYlJgi0QCDgmald0fY2i7fukLhV2n6+vq/n9ze1OGvUDcU5U4EWtaHNXDYa5yOF3Yrr8JHjHIJA5wSYyescORVCIFoCC3ke0wB+pUH3LgDaswB8WHehleVVsXacI9n39coyev9cQneSUbyEGgEBRF4EjXSKi7rZDPzJWlbJVsnvvW9wSpmcky8B9ZmJon8TGYFZCP5K/CzkR1DLmWrPog02itVLuGOV/Ta0mNuId0uZsy37gtjl+76MMSGI1sAJCJxBQBfyVHYn25WWOoDQO4NxTqeqrwxlj/WnXf2sz/1XIbWRQEz6hLGl7lnbfFTnQDbfUnfquyZtsz22/LotfN/flXx9T48tl/wQgECHBHSRjmSPXcjrF3jZoWtUFTEBdZpyveNE8r4IDbm4VQGx60wEK+Zj7ksBITrZlSrAvnfoNezxYxSa//gDgawJ6KIcyOYn3JKKrMER/F4C6lPTE/pV36cs9wbWQwZBCWk2765rBIp/1nfH6LD+cdd8d9WnmIsT4vZ4MthVJvvjIcAzefG01VZPdSFOdKCSnfKzFsHciOQ/KTAC6ltDuTQLzK1D3JkfkqnrPIE9m/dM7TvqkoHin6m+F7KbLuvtqa5pT/Vuq/aU+7zHk6oeX7aVyb5ICCDyImmoTTc9AMtK7f8iO/Ubj53e5DdjYDt4Agt5eGrf6iu421pM9VX/vnpn+zJ0eLzz619ts/ptvY+K0z9xk2p6rftzEUhwp7azr/0vHmdkw0BiwY0jCSDyjgTWd3ZdbF6ancmPX7JWfgqh7xipv38C6mP+9B9j/1r0T2+3B7UADeWbtsVuT9s9Ig5z1WDxkfKs3rRdip2V7vvAL487skFntVJRIwQQeY1g7KaQeuBdqrZP3dRILTkSqG/ki0hjn0fg9ywQH0d9+rE2q3fZpx8t1v1G19KwxfK7LtrjzrIeh7qum/pOJIDIOxFcl6f5RiG7Up3fZM+7rJu6siSwUNSxLdO6ob5KONz5TchJPi7kXwizef5XXIO+WYnHTD68kv3s25cW6p+2UGafRXr8+ebxyONSn45Q92EEEHmHceotly6kmSpfyt705gQVZ0NA/a1QsLH2tUVEDTULxNdRCH5I6C1l9uVzCP406MNE19SgwfJCKcr3CM/qzUJxCD+2E0DkbefS+14PtrJKjniKPMZZld4Z4sBxBOrBaHHcWcHk/imRUAbjzR5H5OtCWUL44kGxx9VOD4vLVBVeyEKY6Wwidt+7x00UFGAZju2TxylZEaB/uCQCiLzAuoEHWtlCbl3LWJoNrH0Sd8cDbKx9bh5h24Tg8yg0brVYt1/fQ/PtRH9mJ54Xy2m+Z1x73PL4FYvTufiJyAuopXWBTOVOJXsXkFu4kgEB9b2hwvwUaaieEbuK0Pe5fO57Nm8UIjcJvTvZWL69D4DRuYie6/oqzi0kgvM9bnlWbxqBr9m4iMgLoKl1UYxkS7nyl4yl2QDaJEMXFhHHfGVREJv/tc99c/csTLBJjBZyrpD9lMWcJjE7f4TvHr/+8njmce2I88jaEgFEXktgDylWF4GXZufK+0P28pBzyAOBpgmoD05U5uumy+2wvFmHdTVdla//XpPav+jVgT2VS+il8KWMd+I82BNqSoc9nv1QzPPM4g6uDRF5PTWJOv5EVVeyDzISBHohUN+AexcaZwTvL1xUZ5zf66m17197deKfHyXu2YX91YvVVLneyvpe4t7v7PYck+27k97r8c1LuDnGHkTDIvI6bgZ19qGsVLVfZM86rp7qILBJwANnzP0wZoG6aou+YxiuHAn9VULvSj6OZDEu305C59uSf76/fPG45/GvpToodgcBRN4OME3vVuf20uxM5f6Sxbw01jQayuuJQH3D/dRT9U1U6xkdD/pRJwmXpQK46TEIi6Zokmc/Zfb5czRO/+Oof3w6KtYN8/W498vjoGzQcNkUt4MAIm8HmCZ3q0OPVd5SFvOA2iQSygqDwCIMN072IsovXOyIdr5jfxe7R11U0nQdEnpTlRnbt28nTXOIsDyPg/5ixjhC36NzGZHXYpOpE3tp9kpVfJM9b7EqiobAUQTqG6w/Wcec5jE7v+67BIvvE7fr+zp8/0z9YdBhfY1VJW4LFVbIYlm+HctX0j/j4TePj7IhQNojgMhria067kxFL2VvWqqCYiFwDoH5OScHcK6/cOHrK6XUZ5uMYgVZ94NC/vf9BZZDED7X2DA+JGMmeTw+elZvlkm8nYeJyGsYuTprIatUrKek/cApCQJBEahvqLHPLC+CgtqMM47Jzxn2kYZ9VNpUnRJ6/vHkicr72FSZLZaDyLsP1+PkJ4+bsuL+IbbOJYDIO5dgfb46p79YsdDmtSz2AbSOipfUCLifKqZpAnEtEojhXggWKtpxdW9ndxvD7qpqryYxnKv0C1lfYvmQ4MaHZMowj8fNa4+j9X0qQwTNh4zIa4CpOuRUxVSydw0URxEQaJPATIXHPsP8vRZEbXLqq2y3Tx9p1EelbdSpvlGqXMcT6nN6fgYSobe78T2OelbP4yrpTAKIvDMAqhOOZEsV8Zcs9oHzDBKcGgMB9dWh/PwQg697fFzsOR7tYQmUSs7f9BDAoIc6W6uy5lioglCf00PkPd76Hk//8vjqcfbxrBx9jAAi7zE6O46p03lpdq7DP2Qvd2RjNwRCI+A+G3v6rQH8KvYg9vi/2HO8jcOv2yi0zzLVT1bP6V326ceOusc79rP7PgGPrz883nrcvX+IrUMIIPIOobSWRx1tos1K9kFGgkAUBNRvCzn6JgpnH3cydYH3ROJkIQS3j2Pg6KEExHOmvG9lIT2nx5LtoQ34Tz6Pt17CnRx3GrkReQf2AXWuoaxU9i+yZweeRjYIhEJgFoojZ/oxP/P8WE5fdO2o7m+jruvsqr569rdQfSGJ53FX8SdSj8fdLx6HZcNEYmo9DETeHsTqTF6anSnbL1lySxp7wudwAgTUfwuFkULfvdVgvUygSQ4JYXFIpobzDBouL6ji6r5jIRvKFzIQeaf1EN/LfnlcliXdZ0/Dc/8sRN59Hve21IF8ES5ln+4dYAMCcRFYxOXuTm+vdh5J7IAESaWQvncc1rDj+jqvTlz9nN5IFYfwhQwv2RadQ0inQo/L/mKGx2nSDgKIvC1g1Gm8NOsB5Zvs+ZYsqewqUwmEOLYTUD+e6EgqfXi+Pcpk9y46jmzYcX29VSehN1HlIXwhowuBUvYGuv2KfW/75vHa43b71cVXAyJvo83UUWbatZS92TiU4uYixaCI6R6B2b2teDf8b8yqeN0/3nPF6w+aIT1DdnwQAZ8hvjO5975nF7sQeYueY+yieo/XntWbdVFZTHUg8urWUucoZJU2PQXsBzxTTx9zGzRTb9DN+NSfJ9qXyizeYjO+TLYt9LpKw64qCqUe3QMX8uWVrK9v3j7XdTpU/a2l+j7/sbUKwinY4/Yn8axkRThu9etJ9iJPncFfrFioGa5lqQyI+3rVe134832ZOB49gVn0EfwvgC7Fzv9q7f9dl9fpsP9wu/dA98Klai1kfc2ajtuOur7f9z1r2XaYq/I9jl97XPf4vtqZ62vWIk8dYKqGr2TvMukAN4rzlS74RSbxZhum+vZEwafyoSW7pdpVx9W1Wum9r1tSiwRqoTdSFT9brGZX0cWuA03ur+/7nrXMpT95XPesnsf5bFOWIk+NPpIt1ep/yXJYmr1VnG91kRf1zSzbDp9R4LOEYl0kFMspoeQe/ynMjj5H98Y7nVTIvh998nknvDnv9MPP9v3f44DOeCvzuJB68vj+l8d7j/upB7stvqxEnhrZS7Nzgfghe7kNSIL7LhXTSBf2VYKxEdIWAurjE+1OZRbPEebedx3/b4NoOQ1bLj/44i30ZGM5+rVLZ3XNFl3WV48HI9Xp8SGH5PH+h8d/2SCHgFcxZiPy6oGvUuAfVsEn/nqj+F7oYp7J7hKPlfDuE5jd34x6K9ul2lWr1dfv1Wq7xdeUPhichUnMJyrg81mFHHfy+Ljs5+d2v5LNVNILmceLHJLHfy/hTnII1jEmL/LUmENZqVi/yJ7JUk+3CnC1NFulHizx3SdQ37xSGqwX9yPMdqsLkZct3G2BSwBNtf/9tmMt7CtaKPOgIhVnJXP9OS3hfrEukA0PghRxpqcR+/6o62q8gTL4Iv30aMa0Dl4qnLku2Lu0wiKaQwmo31fKm5LIe+FB6ND4U87XRduKdbJjwql9Q9wnOteTBG2nfwt/r/duxs22m7j78pOcyVNHHQvlUpaLwLtRrC90g2BptvtrKJga68EoJYGX/VLtRue62thmswMCuq8uVM2FrO3nIgvV0WtSrDku4Von+IsZ1g3JpaREnhpptTT7TS2V0mC3q+Pd6gBLs7vo5Ld/lljIi8TiOTcceJxL8MTzJX5KnVrI2hR6Lj+IpHhzW8K1XvC/R0tuCTcZkafGmamRPHv3WpZ68o3mUhfiUMan+9Rb+4D41P8LZUvtgw19e63tda37/uYPdqQeCNT8C1XdltBz2UEljy+yoZy6lLUVt4oOJlk/eFZvFoxHZzry9Mzzez+9HtwWciS1AW4X2+86MNWFV+3KwP78COg6KBV1Sh9wvFQ7yq8lH49Y7TxVjr8ez3X6UTGPfkw4PfrDzlQbuF8uZC8PO+OoXL0/l7fLW8U91LG57M2uPIntv1U8E10SZcxxRTuTpw7n37y7EvxrWQ4Czx3uQh1uLKv0ngSBPwR0HRR6k5LAc1yl/5AeEPA9j9QjAd1/l6q+kP1swY1RC2U2UqTHHY8/KuxC5vEo9WRdcW2dIRvEGmyUIk/ApwJeyXL4ROEp8ktdXF6aLfWeBIFNApPNHQlsLxKIofEQdA+oVGgb4qJxX1MuUO1wp/gKWdNt4TKDTh6HZEM5eSnz+JR6ss6oat0RXaxRiTxBLmRLUf5L9iw62sc7/F2njHRBzY4/lTNyIKDrYag43yUW6636vK9z0nYCi+27z97btGA526GQC1AfbUPoFSHHvO5bPS6NtM/jVOrJemP179GKmIKNQuRpIPPS7Fxgr2UvYwJ8oq+eCr/QRcTS7IkAMzptlmCsZYIxNRnSVZOFrZVl0UI6gkALQs+iKZqk+HNbwrX+uLYesS6JoaGCF3kCORHISvZBlnry1PdHXTgszabe0g3EV99kxg0UFVoRV6E5FJI/HljlD7NugTRKw0Lvma7rqISem0EMVku4H7XpcSz1ZD3iJdxJ6IEGK/Lc0WWlAH6RPQsdZAP+fVUZFnfzBsqiiDwITBVmcteGrgFE3v7+u9if5egcd0efwQl/CDQs9EaxYq3Hr6H893iWevK994t1ivVKqMEGJ/IEy0uzMwH7IXsdKrgG/fIn8gtdHJP6RtFg0RSVOIFJgvF9TzCmNkJqQwgv23A0lzJ9/5Z5sD9X4AQrGA5py5rDRHkvZB7fUk/WKT+sW6xfQgs2KJEnQGMBWso+hQaqBX88pe2lWX+xomyhfIpMmICulYnCe55giFcJxtR4SLpnVCo0hwG0cXZtF6i2maiOc4TeqG0fuyjf45rMsXyUebxLPVm3LGsdE0ysQYg8QRnKSlH5Jktx4NpscN8AWJrdpML2MQQmx2SOKG8Zka99u7po2IGy4fKyLe5Mofc6JXBiMVc8Q9k5wjcWJNYvQf17tN5FnsTdTFCWsqQ6tuLZlvzJ+8I3ANndtgzsg8A+Av5QpDwpXi/+LxfVvvg5/l8CV/99x5vgCPg+L6dOEja6xkfBBXSGQx7vah4XKiaHGWjfnz2rNzsDWyOn9ibyFHwhqxTFJ1lyD49vtI6nqt+rk7M0uwGGzZMIzE46K/yTyvBdDMdD3U8qedPYgKnyynCiS8MTMZ0oklOEXlIib9Wa7mMyx/Ze5nEx5WRd88k6x3qnr0A7F3kK1l+s8CfQa9nzvgLvsN7PqstLs4sO66SqRAn4+lFo40TD832BdByB8rjsO3Pf7jzCgbMI1ELvWDE+OqvSwE+ux8Oh3PT4mHqyzrm27qnv353G26nIU4BTRVfJ3nQaZT+V3ajaV+rMU9ldPy5Qa4IExoopxZnv37pOygTbq+2QFg1VsGyoHIrZTqDQ7mOE3mh7Mens9bjo8VERvZJ5vEw9Wfd4Vs8xd5Y6EXkKykuzvon8JUtxgFpvsN/aeK/OW8gcMwkCTRLo9AbRpON7yir3HOfwFgL1PaaJWTjuVVv4NrVL7XSnsgrZoUJv1FTdoZfjPiwzm/cyj58pJ+ufTv89WqsiT8LOS7NzBeWl2Zcpt1wd22e9sjSbQUP3EaKuJd/4U72OrvpgmkidZQNxNFFGA26kW8SRQs//+WKQLo2HkYnPQnuHMo+jqSffx6+tj9pu59ZEnhyfKIhK9kGWevJUM0uzqbdy//FN+3ehNQ/K1kpOv+CzBbIGWPh30E+OFHqjDlwKqgrzkfk+90rmcTX1ZH3kJdxJW4E2LvLk7EhWyuEvsmdtOR5Iubfy4706JUuzgTRIqm7omhootnGi8fHTKWc0rO4/V2ec7lO/n3k+px9BQO11p+yF7Oee00Z7jid7WIzWl3A9zqacrJO+WDfJGm/zxkSeByHZTM7+kL2WpZ4uFeBInXGReqDEFwSBsbxI9UNTGQThuJ04R6jBv+O2P1DoDTp2K7jq6vHVwsfjberJuqnxf4/WiMiTuPMAtJR9Sr0VFN+N7IU630x2l0G8hBgGgWkYbrTiRdlKqXkVenVGuOece0a1eZ9ajx8TUfi9g0SxY39Wu83J462CfiHz+Jt6so5a1rrq7FjPEnlyYigr5cU32fOzvQm7gFu591adzUuzVdiu4l1KBHydKZ6XKcW0EUu5sc3m8QROZXjD/ex42E2dIfZLlVXItgm9ofaTagLup7JCm29lHo9TTtZTjfx7tJNFngaemZxwB30tSz1dKkAvzfKJN/WWDjO+aZhuNeLVja6ru0ZKyrgQMawU/s8TECxOOIdTGiSgtvM4Wsg2hV7qEycnURQvj8Mjmcfl1JP1lWf1ZqcGerTIU2X+zbtKFX6SpfqM0Irnjd68UKeayRiIVlR47ZrAuOsKO6yv7LCu1Ks6lqV/gHqROpQY4lM7LOVnsemrxtrh5j62nzzxeCybicULmcfplJN11ifrLllxbKAHizwV7i9WXKmCa1nqnzBuFSNLs8f2JvI3TkDXnAVeytdb2Ti0fAv0/fmYND8mM3nbJVALvfcbtQw3ttlcIyBmlazQrlyWcK+tw2SDNQyPvj1I5KnAqUqpZG8eLS3+g54uv1SnGcqOvWHGHz0RhEhgHKJTTfmk66xsqqzcyzmSpe9189yZhRa/2nAhn9aF3jA0H0P0x+O1zKwuZZvL3tqVVLIO86yeddne9KjIUyFeml2qlL9knjJMOX1XcH7ubpZykMQWDwFdewN5O47H46M9vTn6DE7YR8D3sUPSXPe6u0MykqdbAmqXhWq0WHEa/vnLn4MI1OP3SJkPvQ4OKjfATNZjB/17tJ0iTwPMTIV4afalLOV0q+Au1DnGsirlQIktOgIWeCl/uLqKrkXCd7g8wEX/+PTsgHxk6YlA3T5fVf2gJxeirdbjuMz3zguZx/eUk/XZda3Xtsa5VeTphKlyf9p6Rjo7PaV7qc7gpdkynbCIJCECvlGlnMqUg+sptkOYTnryjWqPIKBxye20POIUsq4R8Lju8V27LmUe71NOn2rd9iDGp5t7lHGofb829ye27ancqTpAlVhchJMIAV2HA4Xyn0TC2RaGv9npGEkNE1DfqVTkri/rXIr7rOEqKQ4CQROodc1cTr4J2tHznXuh67taL2bbTN5sPUNi728Vz4UgsDSbWMMmGM44wZjWQ1qub/C+UQLljtK+6t4323GM3RBIloD6fS5LuLPNRtwm8lIcXFia3Wx5tkMnkOJ1uM68XN/gfaMEtrG1wJs0WguFQSAyAroGUl/CfTBubFuu/Tuydtvn7ldl8NLs3b6MHIdACAQyWKo15gvfcEPgnZoP9dLU+iM3X8V6klqcxAOBcwjU99m5ynh3Tjmhnatr/Z6u2zaTF5rP5/pTqIDRuYVwPgQ6JPDg01iHdXdSle5DZScVZViJ2FYK24+meAXDP+o+0SsJAhC4T8C6oLi/K72tHESeH0C+lmov60+46bUiEaVGIHWRd5NagwUYz1Q++ZcDrgL0DZcg0BsB6wDrATlwLbM+SDptE3n+BJhieq2gfqlx57JBigESU/wE6r6Z+jfAyvhbKuwILO5kd2F7iXcQ6I6A760e/1XjL5n1QIrpgX7bJvIWKUa+FtMHvT/4X4KsncdbCHRBYNxFJT3XUfZcP9VDAAIZEZC4myrcSubxP+W02Azu6eaOeiah0v5nm8cS3P6pmPyljDLB2AgpQgK6/q7kduozef9mlinCzonLEIiMgO6nhVz27N3LyFw/xV3P4o02760PZvLqDMUpNUR4jhv+2gOrbBih/7icHoEivZDuReR/qXV3bw8bEIAABBok4PHc47qKvJblIPBMb7zt3vpA5DmnMi71ciF7sL7r4wkmz5z8UqeYyQYJxkdIERBQ3xvLzWcRuHqOi+U5J3MuBCAAgV0EPH57HNdxP3fncT2HZJ12Ueu2B/FuFXnOpRNKvYxkl7Jc0icF6uf1JrkETJxBEbDISz0tUw+Q+CAAge4J1ON2pZo9jueSrM+8RFvuCvjprgPr+wVvqO2F7LUsl8Tzerm0dCBx6jqr5MrzQNxpy40XuiE5ThIEIACBswnovlmokLksl2VZM7uRTQ65l+6cyXMpq+SCZIW238puV/sTf3WHuVYHWsiGicdKeD0TUB/zrHnqAu/3ITelnpuC6iEAgQgIeFz2+CxXr2W5CDzrL//AeXHovfQgkadC/yQVeiUbauNS5l9TzyG9U5BLdSae18uhtfuLseiv6s5qLjuriYogAIEkCWgsXj1350c/PD7nkKy3Lq2/rMOOCfgokbcqWJXM9N4zD99X+xJ/fab4Psks9iaJx0p4/RDIoV/5pkyCAAQgcBKBevz1fcTjscflHJJ1lp+7m50S7NNTTlo/R9ALbS9kz2W5pBsFOhV0Bq1cWrzFOP3JVMX/p8UqQin6QtdMGYoz+AEBCMRBQPfIkTydy17H4XEjXt6qFD93V55T2kkzeesV2gHZUPs+yjylmENyR/uhjufn9TxAkyBwDoHinJMjOncZka+4CgEI9EzA46vHWbnxQ5aLwLOO+mhdda7AUzlPzhZ5LsRJzlhlD2VfZbmkdwq0Uiec5RIwcbZCYNxKqWEVyo8gh9UeeAOBoAnU42olJz3O5pKsnyzurKcaSY2JPHsjx+5kE729kN3Ickh/ntdTh7TYy2GwzqFNu46x6LrCHupb9lAnVUIAApER8Djq8VRuf5Ll8tyd9dKF9ZN1lN43lhoVeSuv5GQpK7T9XpbLEu5zxfpNnbOUDfWeBIG9BOq+4r6TekLkpd7CxAeBMwj4XujxU0V8k+VwTzQt66P31kvWTd7RdGpF5K2clNMLvR/KPstySa8V6C911rlskEvQxHkygfHJZ8Z1IiIvrvbCWwh0QsDjpMdLVfZL5vEzl2RdNKx1UmsxP22t5I2C1Ygj7XJD5tSIVukzNaLjJkHgAQFdF1fa+ebBgcR26Bro7F6TGDrCgUCyBHT/myq4mSyXZVm35Y2ss1/n6PzGq0YdK0CLnueyXNKtAp1onCtzCZg4DyOg6+FOOVO/wflLF6PDiJALAhBInYDue4ViXMhy0wEWd1eKu7PU6nLttijqAH3Dv9x2PNF97sjX6thXsmGiMRLWkQTUF3wdpC7wTGV5JBqyQwACCRLw+OdxUKFdy3ISeNY7o64FnrtQ5yLPlSpQfwt3prcvZDeyXJKX5X6pk89kg1yCJs6dBIqdR9I6gMhLqz2JBgJHEfB453FPJ/2SeRzMJVnfvLDekd31EXQvIm8VqIKuZIW2L2S3q/0ZvH5SjJU6/SSDWAlxN4Fi96GkjiDykmpOgoHA4QTqca7SGR73cknWMxfWN9Y5fQb9tM/KN+uulf5U+3NYwlqF/1NvvE5frnbwmgcB9Xd/sku+r6tvB3WfyaN3ESUE+iWg+1shD+ayl/160mnt/rLlXLe8Wae1PlJZrzN5m37VYEba/33zWMLbvgCudUEsZMOE4yS0NQJqa/fz5AWeYvSHGBIEIJAJAY9jHs8U7rUsJ4Fn3eLn7mZ6DSYFJfJMRYC8hDvW2wtZTgPEO8W71MXB83oCkUGyyMshLXMIkhghkDsBjV2r5+58zXs8yyVZp1xYt1i/hBZ0cCJvBUiwSpkHwo+y36v9ib96ZsfPLVjsTRKPNffwikwAIPIyaWjCzJdAPV75Wvf4lcMKhRvbuuSjdYr1ineEmIIVeStYgjfX+6Hs62pfBq/PFeMXXTilzEKXlB6BIr2QtkaEyNuKhZ0QiJ+AxyePU4rki8zjVi7JemRY65OgY34atHcbzqkzFdo1k72W5ZTcoabqUHc5BZ1qrOrHA8X2n1Tj24jr3/TbDSJsQiByAvU9bK4w3kUeyrHu3+iEme5p5bEn9pU/+Jm8dTAGKyu0770slyVcI/CFVOnCmnmDFD2BIvoIDgvgVtcrH0wOY0UuCERBoB6HKjmbk8Cz3nhv/SEr9T6aFJXIW1EV5IXeD2WfZbmkP8/r6QKz2BvnEnSicY4SjWszrGpzB9sQgECcBDzuePyR959kuTx358ayzvDS7MIbsaUoRZ4hC/idbKq3r2SeQs0lPVeg33Sx+Xm9YS5BJxZnkVg8u8Ipdx1gPwQgEAcBjzMeb+TtN5nHn1ySdcUr6wzrjViDjlbkrYAL/lJWaPut7Ha1P4PX14rxly6+uWyQQbwphZjLTN4ypUYjFgjkRMDjiscXxfxL5vEml2Qd8da6wvoi9qCjF3mrBlBjXOn9SHa52pfJ6wfF6SXcaSbxRh2m2mmoAHJZ6qiibiych0CmBOrxpFL4Hl9yStYPo1pPJBH30ySi2AiiHkgX2p3Tpw9T8CeQiTpo6Q1SeATUN8fyysseySf1wyTvL8k3HAFmS0D3p0LBL2TPZTmlGwXrsbNKLehkZvLWG8YNJSu070Jm4ZNL8oV5rQv1SjbMJejI4vRscw7pZw5BEiMEUiDg8cLjhmK5luUk8KwPLqwXrBv0PrmUpMhbtZIarZQNtX0p+y3LJb1RoL900c5kg1yCjiTOIhI/z3VzeW4BnA8BCLRLwOODxwnV8kvmcSOXZD1waX1gnZBy0EmLvFXDqRFneu8ZlO+rfZm8flKcfl5vkkm8MYTpfphDqnIIkhghECuBelyo5L/HiZySdYCfu5vlEHQWIs8NqQatZGO9vZD99L5M0jPF+UUX9FJWZBJzkGGK/1COuT1ySGUOQRIjBGIj4HHA44H8/iLL5X7kZvK4f2EdYD3gHTmkbETeqjHVuF7C9WzKR9nv1f4MXl8qxmtd3H5eb5BBvCGGOAzRqZZ8qloql2IhAIETCPi+7/u/Tr2WeTzIJXmc/+hx3+N/LkGv4sxO5K0CV2PP9X4o+7ral8nrG8XpWb1hJvGGFGYRkjNt+qLrq2qzfMqGAAQOJ1Df75c6w/f/nJLHdz935/E+y5StyHNrq+HvZBO99RLujSyX9FyB+hMdqVsCw26r6622nK6l3iBTMQSOIOD7ve/7uSTfgy48vnuczyXobXFmLfJWQNQJvIRbaPu9LJcl3Jf6dDdRvKTuCIy6q6rXmrK+qfZKnsohsEGgvs/nsjzr8fu9x3OP6xsostxE5K01uzrFQptD2WdZDqnIIciAYszlRrsMiDmuQCB3AkUmADxuD+txPJOQ94eJyNtgpA7iJdypdr+Spb7sNNwIn82WCOjTdC6zeCaIyGupH1EsBE4gMDzhnJhO8Tj9yuO2x++YHO/CV0TeDsrqLEtZocNvZbc7srEbAocSGByaMYF8VQIxEAIEIBA2AY/Lbz1Oe7wO29X+vEPk7WGvznOlLCPZ5Z6sHIbAYwSKxw6mdIwbbkqtSSwQCJKAx+NRPT4H6WAoTiHyDmgJdSQv4c6U9YXs5oBTyAKBTQLDzR2Jbt8mGhdhQQAC/RPw+PvC47Hsrn93wvcAkXdEG6lTVbJCp1zIGMyOYEfWJ8NMGFSZxEmYEIBAdwQ83l54/PU43F218deEyDuhDdXJStlQp17KfstIENhHwEv+OaRlDkESIwQg0AkBj6+XHm897nZSY2KVIPLOaFB1uplO9+D9/YxiODUPAs/yCPMJSyiZNDRhQqBlAh5X/dzdrOV6ki4ekXdm86oDegl3rGIuZD/PLI7TEySgn08pEgxrV0jlrgPshwAEIHAAAY+jFx5XPb4ekJ8sjxBA5D0C55hD6oxewvWs3kfZ72POJW/yBAbJR/i/AKv/veUdBCAAgYMJeNz86HHU4+nBZ5HxUQKIvEfxHH9QnXOus4ayr8efzRmJErD4zyKp/1dZBEqQEIBAkwQ8Xvq5O4+fpAYJIPIahLkqSh3VP7ky0baXcG9W+3nNlkAuM3m32bYwgUMAAqcQ8Ph44fHS4+YpBXDO4wQQeY/zOeuoOq2XcAsV8l7GEu5ZNKM+OZeZvCrqVsJ5CECgKwIeD997fPQ42VWlOdaDyOug1dWJF6pmKPssI+VHIJeZvGV+TUvEEIDAkQQ8DnppdnHkeY7Khs4AAAv3SURBVGQ/gQAi7wRop5yiDu0l3KnOfSXzFDUpHwIvMwn1LpM4CRMCEDiegMe9Vx4HPR4efzpnnEIAkXcKtTPOUedeygoV8VZ2e0ZRnBoBAf18yiACN5tysWyqIMqBAASSIeBx7q3HPY9/yUQVSSCIvJ4aSp39SlWPZJc9uUC13RBwG5MgAAEI5EjA49uoHu9yjL/3mBF5PTaBOr6XcGdy4YXspkdXqBoCZxNQXy7PLoQCIACBFAh4PHvh8U12l0JAscaAyAug5XQRVLJCrlzIbgNwCReaI8BMXnMsKQkCEAibgMevC49nHtfCdjUP7xB5AbWzLopSNpRLl7LfMlL8BAbxh3BQBDcH5SITBCCQIgGPV5cevzyOpRhgrDEh8gJsOV0kM7nlGaDvAbqHS8cRyEXk3R2HhdwQgEAiBDxO+bm7WSLxJBUGIi/Q5tQF4yXcsdy7kP0M1E3c2k/AYj2HtMwhSGKEAAT+S8Dj0oXHKY9X/93Lm6AIIPKCao6Hzuji8RKuhcJH2e+HOdgDAQhAAAIQ6IyAx6GPHpc8PnVWKxWdRACRdxK27k/SxTRXrUPZ1+5rp8YzCAzPODemU8uYnMVXCEDgJAIef/zcnccjUgQEEHkRNNLKRV1Y/smVibZfyW5W+3kNmsDzoL3DOQhAAAL7CXi88X+rmHgc2p+dHKEQQOSF0hJH+KGLbCkrdMp72TlLuFysR3An624C6o/l7qMcgQAEeiRwzn3e48t7jzeyZY8xUPWJBBB5J4IL4TRddAv5MZR9lp2SylNO4pzDCOhfmg0Py0kuCEAAAq0RKE8s2eOKl2YXJ57PaRCAQFMELChkpezQdKeMg6bqp5yHBMS3OLQxIs/HJ/yHzc8eCARBwPd5me/3hyaPI8MgnMeJswkwk3c2wjAK0KetSlbIm7ey2wO8mir/OdP4B1RBlkwI0I8yaWjCjI9AfZ+fHuC5x423Hkdk1QH5yQIBCPRBQJ/C/MltJtv26c37Jn34lVud4pzLTN4it7YlXgjERsD3/UfGBI8Xg9hiwt/9BP5vfxZyxEag/uTmi3Yu38eyYR1Dpder+ni9i5cWCRQtlh1S0VVIzuALBCDwkIDu+wuNCVc6wpjwEE+yexB5yTbtkye1mFskHCKhhUHgLgw38AICEHiMAGPCY3TSPMYzeWm2K1FBoEsCyy4roy4IQAACEDiMACLvME7kggAEIAABCEAAAlERQORF1Vw4GxmBYWT+nuSuloDKk07kJAhAAAIQaJUAIq9VvBSeOYFh5vETPgQgAAEI9EgAkdcjfKqGQAIEDvlNxgTCJAQIQAAC8RFA5MXXZngMgZAIVCE5gy8QgAAEIPA/Aoi8/7HgHQQgAAEIQAACEEiGACIvmaYkEAj0QqDspVYqhQAEIACBvQQQeXsRkQECJxMYnHwmJ0IAAhCAAATOJIDIOxMgp0PgEQIvHzmWyiH+20UqLUkcEIBAcgQQeck1KQFBoFMC/LeLTnFTGQQgAIHDCSDyDmdFTghAAAIQgAAEIBANAUReNE2FoxAIkkAVpFc4BQEIQAACT57CAAIQaIfA30rtlBxOqfqXZtxDwmkOPIEABCBwjwAzefdwsAEBCEAAAhCAAATSIIDIS6MdiQICfRDgX5r1QZ06IQABCBxIAJF3ICiyQQACDwhUD/awAwIQgAAEgiGAyAumKXAEAhCAAAQgAAEINEcAkdccS0qCQG4E+CHk3FqceCEAgagIIPKiai6chUBQBPgh5KCaA2cgAAEI3CeAyLvPgy0IQAACEIAABCCQBAFEXhLNSBAQgAAEIAABCEDgPgFE3n0ebEEAAocTKA/PSk4IQAACEOiaACKva+LUBwEIQAACEIAABDoggMjrADJVQAACEIAABCAAga4JIPK6Jk59EEiHAD+hkk5bEgkEIJAgAf65eIKNSkhhEPhbKQxP2vHiqVI7JVMqBCAAAQg0QYCZvCYoUgYEIAABCEAAAhAIjAAiL7AGwR0IQAACEIAABCDQBAFEXhMUKQMC+RG4zS9kIoYABCAQFwFEXlzthbdxEbiJy92jvK2Oyk1mCEAAAhDonAAir3PkVAgBCEAAAhCAAATaJ4DIa58xNUAAAhCAAAQgAIHOCSDyOkdOhRCAAAQgAAEIQKB9Aoi89hlTAwRSJFCmGBQxQQACEEiJACIvpdYkltAILENzCH8gAAEIQCAfAoi8fNqaSLsnwL/96p45NUIAAhCAQE0AkUdXgAAEIAABCEAAAgkSQOQl2KiEFAwBZvKCaQocgQAEIJAfAURefm1OxN0RSPmZvLI7jNQEAQhAAAKnEEDknUKNcyAAAQhAAAIQgEDgBBB5gTcQ7kVNgOXaqJsP5yEAAQjETQCRF3f74X3ABJ4+fZrycm3A5HENAhCAAARMAJFHP4AABCAAAQhAAAIJEkDkJdiohBQUgZ9BeYMzEIAABCCQDQFEXjZNTaA9EUjyuTwtRZc98aRaCEAAAhA4kAAi70BQZIPAiQSqE8/jNAhAAAIQgMBZBBB5Z+HjZAjsJVDtzUEGCEAAAhCAQAsEEHktQKVICKwRqNbe8xYCEIAABCDQGQFEXmeoqShTAlWmcRM2BCAAAQj0TOBpz/VTPQSSJvD3338PFOB/UgtSX7zg3pFaoxIPBCCQHAFu1Mk1KQGFRkBC7+/QfDrXH0TeuQQ5HwIQgED7BFiubZ8xNUDgBgQQgAAEIACBrgkg8romTn05EqgSC/p3YvEQDgQgAIEkCSDykmxWggqMQGr/wza1eALrLrgDAQhAoBkCiLxmOFIKBB4jgCh6jA7HIAABCECgFQKIvFawUigE7hFA5N3DwQYEIAABCHRBAJHXBWXqyJqAvol6JwC3WUMgeAhAAAIQ6JwAIq9z5FSYKYEy07gJGwIQgAAEeiKAyOsJPNVmR4Al2+yanIAhAAEI9EsAkdcvf2rPh0CZT6hECgEIQAACIRBA5IXQCviQPAE9l+eZPH5fLvmWJkAIQAAC4RBA5IXTFniSPoEy/RCJEAIQgAAEQiGAyAulJfAjBwJlDkESIwQgAAEIhEEAkRdGO+BFHgSu8giTKCEAAQhAIAQCiLwQWgEfsiCg5/IqBcrv5WXR2gQJAQhAoH8CiLz+2wAP8iLAbF5e7U20EIAABHojgMjrDT0VZ0pgkWnchA0BCEAAAh0TQOR1DJzq8iZQ/5RK7Eu2Vd6tSPQQgAAE4iCAyIujnfAyLQKxL9n6N/9IEIAABCAQOIGngfuHexBIjsDff/89VFC/Ig7sVT0jGXEIuA4BCEAgfQLM5KXfxkQYGIH6W7Y3gbl1qDu3CLxDUZEPAhCAQL8EEHn98qf2fAksIg19HqnfuA0BCEAgOwIs12bX5AQcCgEt21by5Xko/hzgh//37lAzeXcH5CULBCAAAQj0TICZvJ4bgOqzJrCILPo5Ai+yFsNdCEAgawLM5GXd/ATfJwHN5A1UfyV71qcfB9btZ/GGB+YlGwQgAAEIBECAmbwAGgEX8iRQz4rNIol+EomfuAkBCEAAAjUBZvLoChDomUAEz+Z9liCd9oyJ6iEAAQhA4EgCiLwjgZEdAk0TkMgrVOZ10+U2VN5PCbxRQ2VRDAQgAAEIdEiA5doOYVMVBLYRkIgqtf/7tmM977tV/UXPPlA9BCAAAQicSICZvBPBcRoEmiQQ4Jcw/HMphQTossk4KQsCEIAABLojwExed6ypCQI7CUhM3engeGeGbg8g8LrlTW0QgAAEIAABCKROQDN6E1mfqVLlPIOXekcjPghAAAIQgAAEuicgkbXoSeUtVe+g+4ipEQIQgAAEIAABCGRCoAehN88ELWFCAAIQgAAEIACBfglI6E07mNHz8mzRb6TUDgEIQAACEIAABDIjYAEmu2tJ7M1ULsuzmfUpwoUABCAAAQhAIBACFmKyeYNCz8/8DQMJDzcgAAEIQAACEIBA3gQszGQWaKfM7FU6bypj5i7vbkT0EIBARgT4MeSMGptQ0yEgsTZWNIVsVNszva6nG21UsqXsSr/D5/ckCEAAAhCAAAQgAAEIQAACEIAABCAAAQhAAAIQgAAEIAABCEAAAhCAAAQgAAEIQKBdAv8P/HVa3JMxZW8AAAAASUVORK5CYII="
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Logo);

/***/ }),

/***/ "./src/images/OasisHero.jsx":
/*!**********************************!*\
  !*** ./src/images/OasisHero.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function OasisHero() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("svg", {
    version: "1.1",
    id: "Layer_1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    viewBox: "0 0 1440 900",
    style: "enable-background:new 0 0 1440 900;",
    xmlSpace: "preserve"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    id: "SVGID_1_",
    x: "1.1",
    y: "0.2",
    width: "1437.8",
    height: "899.7"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000085971025321404479960000009087115282174018236_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_1_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    style: "clip-path:url(#SVGID_00000085971025321404479960000009087115282174018236_);"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st1",
    d: "M712.4,798.7c-0.1-1.3-0.3-3-0.3-5.1c-0.1-4.1-0.3-11.2,0.7-19.7c1-8.5,2.5-13.9,4.7-22.4 c0,0,5.2-20.9,9.3-42.3c1.7-8.9,3.8-22.1,5-38.5c0.8,0.7,2,1.8,3.1,3.4c3,4.4,3.1,9.3,2.8,14.3c-0.7,9.2-2.5,11.7-5.2,26.7 c-0.6,3.3-1.3,7.6-0.3,13c0.6,3.3,1.4,5,2.1,7.1c2.1,6.4,1.3,11.9,0.3,19c-3.3,22.6-6.9,42.7-8.1,48.4 C721.7,801.4,717,800,712.4,798.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st2",
    d: "M531,756.7c-0.3,3.4,12.3,5.9,29.3,15.4c7.6,4.2,13.6,8.3,17.3,11.2c49.7,6.5,99.2,13,148.8,19.5 c18.1-7.2,31-16.4,39.2-23.1c10.9-9.1,34.4-28.9,42.6-61.8c2.1-8.5,2.7-15.6,3-20.5c0-1.8-0.3-5.9-3.1-8.3 c-1.8-1.6-5.1-2.7-13.7-0.3c-9.6,2.7-14.4,6.5-20.4,9.6c-13.3,7.1-26.3,7.1-32.7,7.2c-11.9,0.1-14.7-3.1-28.7-5.9 c-23.1-4.7-42.2-1.6-49.1-0.3c-16.8,3-28.6,8.5-46.5,17.1c-14.7,7.1-17.5,9.9-34.1,18.4c-16.6,8.3-30.6,14.1-39.7,17.7 C533.3,753.6,531.2,755.3,531,756.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "-595",
    y: "0.2",
    class: "st3",
    width: "2037",
    height: "899.7"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st4",
    d: "M1037.6,575.8c20.7-1.4,37.8-3.3,50.1-4.7c31.8-3.8,39.9-6.5,43.9-7.8c12-4.2,14.9-7.4,39.9-21.9 c21.6-12.6,32.4-18.8,46.1-25c18-8.1,35.2-15.8,58.7-18c8.8-0.8,20.8,0.3,44.6,2.4c18.2,1.6,31.7,2.8,50.1,6.2 c16.8,3.3,29.4,5.5,45.4,11.7c7.9,3.1,25.6,10.5,25.6,10.5l0,0v267.6l0,0c0,0-260.8,37.2-359.7-73.4 C1058.4,696.6,1036.2,652.4,1037.6,575.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st5",
    d: "M113.5,680c16.1-9.6,38.6-22.5,66.2-36.5c34.7-17.7,62.2-31.8,99.3-44.6c54.7-18.8,99.4-24,108.5-25.2 c42.6-4.8,57.6-0.6,122.2-7.9c19.4-2.3,31.1-3.5,48-6.8c25.3-5,38.6-9.6,92.5-25.2c27.2-7.8,40.7-11.7,44.6-12.6 c50.5-11.5,91.1-9.6,100.4-9.2c23.2,1.3,77.7,4.2,105,26.3c2.3,1.8,10,8.3,21.6,16c12,7.9,24.2,14.3,30.8,17.1 c22.1,9.3,34.9,0.7,68.5,0c32.5-0.7,55.9,6.8,84.4,16c17.1,5.5,40.5,14.6,51.3,30.8c1,1.6,3.3,5.1,6.9,9.9 c1.6,2.1,10.8,14.1,22.1,23.9c0,0,8.9,7.6,49.8,26.5c0,0,2.1,21.9,6.1,62.8c-100.6,46.8-234.1,92.8-394.8,108.4 c-293.2,28.4-513.8-59.7-573-85C204.7,735,150.4,703.3,113.5,680z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st6",
    d: "M730.8,803.2c20.5-6.5,38.2-13.2,52.6-19c0,0,9.6-4,47-26.7c3.3-2,6.8-4.2,8.5-8.5c1.7-4.2,0.1-7.5,1.4-17.5 c0.3-2.3,0.7-4.2,0.7-4.8c3.8-17.4,74.8-22.5,97.2-33.1c7.4-3.4,10.9-4.4,17.8-6.4c5.8-1.6,8.2-1.8,10.3-1.7c5.8,0,8.8,2,15,3.7 c4,1.1,8.1,1.6,16.4,2.4c35.8,3.8,57,3.3,57,3.3c26.7-0.7,47.2-4.7,57.3-6.6c9.1-1.7,24.5-5.1,44.3-5.1c5.9,0,13.2,0.3,21.8,2.7 c10.3,2.8,16.7,7.2,21.5,10c10.6,6.2,21.9,8.9,44.3,14.4c31.4,7.6,30.7,2.5,54.2,8.8c28.7,7.6,49.2,20.4,58.8,26.5 c12.2,7.8,21.8,15.4,28.7,21.5c-43.9,27.2-87.6,54.2-131.4,81.3c-91.5,3.7-183,7.4-274.6,11C896.7,840.8,813.7,822,730.8,803.2z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st7",
    d: "M1429.1,699.8c-7.5-11.7-11.5-18-11.5-18l0,0c0,0-8.9-40.3-9.9-44.4c-4.7-21.2-11.6-58.3-20.9-127.5 c2.7,0.3,5.4,0.6,8.1,0.8c0.4,1.6,1.4,5,2.7,9.3c13.9,49.5,19.2,79.4,36.8,155c0.8,3.7,2.5,10.6,4.5,19.7 C1435.6,696.4,1432.4,698.1,1429.1,699.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st8",
    d: "M1309.3,247.7c9.1,29.4,14.9,53.6,18.4,69.3c9.2,41.3,14.7,90,25.2,185.7c3.4,30.8,4.5,42.2,5.1,57.9 c1.4,32.4,0,59-1.7,92.2c-1.1,22.2-2.7,41.6-4,57.3c25.6-3.4,51.2-6.9,76.8-10.3c-6.1-25.5-12.2-50.8-18.4-76.2 c-9.3-52.8-18.7-105.4-28-158.1c-2.5-21.5-6.5-45.5-13.2-71.6c-8.1-31.8-18.1-59.4-28-82.5c-4.8-26-9.6-51.9-14.3-77.9 C1321.2,238.1,1315.3,242.9,1309.3,247.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st9",
    d: "M1320.4,235c0,0,18.7-7.6,31.5-10.2c22.4-4.5,44.8-8.9,72.7-3.3c7.6,1.6,13.7,3.4,17.5,4.7 c0,34.7,0,56.9,0,56.9s0,0-0.1,0c-19.8-4.1-34.9-7.2-36.1-7.5C1376.4,269.2,1320.4,235,1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st10",
    d: "M1320.4,235c-7.4,14.9,14.4-30,22.2-44.7c3.5-6.6,24.3-45.1,53.8-74.5c7.2-7.4,18-17,33.9-22.4 c4.8-1.7,9.1-2.5,11.7-3c0,69.5,0,106.7,0,106.7l0,0c0,0-9.2,4.4-10,4.8c-8.8,4.1-27.4,12.4-34.9,15.6 C1361.8,231.7,1320.4,235,1320.4,235L1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st11",
    d: "M1320.4,235c0,0,14-73.1,50.2-122.6c13-18,34.7-40.3,71.6-59.3c0,109.8,0,167.3,0,167.3s-25.6,1.4-44.4,3.3 C1356.9,227.3,1320.4,235,1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st8",
    d: "M868.8,231.3c8.1-5.5,16-10.9,24-16.4c8.3,12.7,10,23.1,10,30.3c-0.1,10.5-4.2,25.9-4.2,25.9 c-1,9.9-2.4,25-4.2,43.6c-12.4,125.9-18.8,162.7-23.1,219.5c-2.7,35.9-5.1,88-2.7,152.3c-24.2,7.1-48.5,14.1-72.7,21.2 c2.3-16.4,4.5-33,6.9-49.4c9.6-53.8,19.2-107.5,28.9-161.3c12.2-66.8,24.2-133.7,36.4-200.4C868.3,274.9,868.5,253.1,868.8,231.3z "
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st12",
    d: "M796,707.9c-4.1,0.8-8.1,1.6-12.2,2.4l0,0l0,0c14.4-62.4,28.9-124.8,43.1-187.1l0,0 C816.6,584.8,806.3,646.3,796,707.9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st13",
    d: "M1006.9,150.4c0,0,44.1-0.6,90.5,0.6c44.8,1,47.8,2.5,48.4,4.5c2.3,8.9-43.6,33.8-91.7,43.3 c-38.3,7.6-37.1-2.7-108.1,4.7c-7.8,0.8-17.7,2-19-1.3C923.6,192.4,1006.9,150.4,1006.9,150.4L1006.9,150.4z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st14",
    d: "M892.9,214.9c8.9-18.1,17-32.5,22.6-42.2c23.5-40.5,38.6-66.1,67.1-86.6c12.3-8.9,19.9-14.1,29.4-16.7 c11.2-2.8,19.8-1.7,44.4,2.3c19.2,3.1,35.8,5.9,48.8,8.3c-3.8,11.9-11,29.4-25.5,46.5c-8.3,9.8-16.4,16.4-30,26 c-42.6,30.3-64.9,46.3-99.9,55.5C937.2,211.6,917.6,215.3,892.9,214.9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st13",
    d: "M892.9,214.9c0,0,11-37.9,16-52.8c7.1-21.2,21.5-64.8,59.3-98.7c13.3-11.9,40.2-35.4,82-40.5 c38.3-4.7,68.5,8.6,80.9,15c-39.2,36.6-59.8,56-59.8,56l-4.4,1.1c-6.1,1.6-80.6,62.7-97,75.4C935.6,196.9,892.9,214.9,892.9,214.9 z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st14",
    d: "M892.9,214.9c2,5.1,5.4,12.2,10.6,20.1c21.6,32.3,55.2,43.9,89.7,55.9c35.4,12.3,64.6,15.8,83,17.8 c18.2,2.1,33.8,2.7,45,2.7c-5.1-10.6-10-21.2-15.1-31.8l0,0c-27.4-13.3-59.8-26.7-96.9-38.5C966.2,227.6,926.7,219.7,892.9,214.9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st13",
    d: "M892.9,214.9c0,0-0.4,27.9,1,44.4c0.8,8.9,3.3,33.9,18.2,59.6c6.1,10.5,23.8,39.9,60.3,53 c20.8,7.6,39.3,6.9,49.9,5.7c-1.3-10-4.1-24-10.3-39.9c-3-7.5-11.9-28.4-35.5-55C939.7,241.5,892.9,214.9,892.9,214.9L892.9,214.9 z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st13",
    d: "M892.9,214.9c-0.3-22.5,2.4-39.9,5.1-51.8c2.4-11.2,5-18.5,4.4-30.1c-0.8-16.1-7.1-28-10.3-33.8 c-4.7-8.6-19.5-32.4-90.4-69.2C752.1,4.4,737.6,4.7,731.9,5c-31.5,2-55.5,22.1-58.8,25c-8.9,7.8-15,15.7-18.7,21.4 c2-1.4,5.1-3.3,9.1-4.4c8.9-2.3,16.4,0.7,19,1.8c-3.8,17.8-7.6,35.6-11.5,53.5c-5.5,4.7-13.2,11.5-21.5,20.5 c-10.5,11.3-18.7,20.1-24.5,32c-3.8,7.8-10.3,24.8-6.9,49.9c10.5-5.2,24.6-11.6,42-17c3.3-1,39-11.9,80.5-12.4 C811.4,174.3,872.1,203.9,892.9,214.9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st14",
    d: "M892.9,214.9c-4.8-16.6-12.7-40.5-24.6-68.5c-19.1-44.3-30.1-69.3-55.7-91.7c-12-10.5-33.7-29.3-64.8-31.7 c-24.5-1.8-43,7.2-74,22.5c-27,13.3-47.4,27.7-60.7,38.1c2.4,4,6.5,9.5,12.7,14.9c3.5,3,12.7,10.3,30.3,14.9 c16.3,4.1,27.7,2.8,36.6,2.8c15.1,0,36.9,4,64.1,21.8c-13,0.6-29.8,3.4-46.5,12.7c-56.7,31.7-58.4,108.1-58.6,113.4 c17,4.4,37.6,7.9,61.4,8.5c58.3,1.1,104-17.3,129.7-30.3C859.5,233.3,876.2,224.1,892.9,214.9"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st15",
    d: "M990.5,735.7c-1.8,0.4-0.1,0.1-26.2,11.5c-2.5,1.1-7.9,3.5-8.2,7.1c-0.1,1.4,0.7,2.5,1,3.1 c2.8,4.2,9.8,4,11.7,4c6.9-0.3,7.5-3.1,14.6-3.4c2.1-0.1,6.2-0.3,10.5,1.7c2.4,1.1,2.4,1.7,9.3,7.2c5.1,4,6.4,4.7,7.5,5.1 c3,1.3,4.4,1,8.5,1.8c5.2,1,8.1,2.3,10.9,3.1c9.8,3,21.4,2.3,24.6,2c11.9-0.8,20.5-4.2,33.7-9.6c10.8-4.2,11.7-5.8,18.7-7.2 c6.9-1.4,12.4-1.1,23.5-0.4c9.9,0.6,19.8,0.8,29.8,1.6c2.3,0.1,6.1,0.4,10-1.4c3.3-1.6,3.3-3,7.1-5.4c2.7-1.6,7.1-4.2,11.9-3.4 c3.4,0.7,4.7,2.7,7.8,2.1c0.6-0.1,2.8-0.4,3.7-2.1c0.3-0.6,0.7-2.1-2.7-7.1c-2.7-4-5.4-6.6-5.9-7.1c-1.4-1.4-6.2-5.9-11.2-8.9 c-7.2-4.4-17-5.5-36.2-7.5c-11.7-1.3-17.7-1.3-24.6,0.4c-4.4,1-7.2,2.3-9.6,3.3c-11.7,4.7-22.2,5.7-35.6,6.9 c-14,1.3-13.9-0.1-44.3,0C1006.8,732.8,998.8,733.8,990.5,735.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st16",
    d: "M945.8,809.6c9.8-4.1,23.9-9.2,41.6-11.9c5.8-0.8,19.1-2.7,42.2-1.3c20.5,1.1,25.9,3.4,62,9.2 c36.6,5.9,54.3,7.4,68.6,7.9c25.6,1,34.8-0.8,39.6-2c12-3,16-6.2,43.6-21.8c49.1-27.7,25.5-10.9,64.6-31.7c5.7-3,18.4-9.9,33-7.2 c4.2,0.7,3.4,1.4,9.5,2.7c0,0,8.8,2,32.8,1.4c0,0-42.3,51.9-70.4,75.7c-52.9,44.6-121.7,45.3-161.4,45.7 C1049.9,877.2,975.6,830.8,945.8,809.6z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "-630.2",
    y: "-52.3",
    class: "st17",
    width: "2121.7",
    height: "1326"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st18",
    d: "M892.9,214.9c-27.3,27.3-49.1,52.1-65.6,72.1c-38.1,46.1-52.1,71.4-59.7,86.7c-5.2,10.5-9.1,19.4-11.6,25.7 c-2.8-5.9-6.2-14.4-9.1-24.9c-3.5-13.2-11.3-42.4-1.3-72.1c8.2-24.3,25-38.5,37.8-48.9C823.8,220.4,870.8,215.6,892.9,214.9z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st18",
    d: "M892.9,214.9c0,0,8.1,6.8,8.6,7.4c6.1,5.1,23.8,16.1,58,27.9c8.8,3,18.1,6.2,31.4,9.5 c22.6,5.4,24.6,3.1,43.3,7.8c15,3.7,17.3,6.1,46,15.8c13.7,4.7,25,8.2,32.3,10.3c-4.5-11.6-13.6-30.8-31.8-49.4 c-21.8-22.4-45.1-31.7-53.6-34.8c-31.7-11.5-59.1-8.3-75.5-6.5C925.8,205.8,895.3,214.5,892.9,214.9z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st13",
    d: "M892.9,214.9c-1,7.6-2.8,19.2-5.5,33.2c-8.8,45-15.6,80.3-37.1,113.2c-8.9,13.7-25.2,34.1-53.9,53 c-3.8-7.8-8.8-19.5-10.9-34.5c-4.5-30.1,4.7-53.6,10.9-69.9c5.7-14.7,17.3-43.3,46.3-67.6C861.8,226.6,880.7,218.9,892.9,214.9z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st11",
    d: "M1320.4,235c-1,11-1.6,26.5,0.8,44.8c1.8,13.7,4.1,31,14,50.2c16.3,32.1,42.2,48.1,51.9,54 c7.4,4.4,23.3,13.9,46,17.4c3.7,0.6,6.8,0.8,8.9,1c0-12,0-23.9,0-35.9c-4.5-11.3-10.9-24.2-19.4-37.6 c-15.3-24-32.5-41.4-46.4-53.3C1357.7,262,1339,248.6,1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st19",
    d: "M646.7,695.6c12.6-3.1,25.5-5.2,38.3-6.4c6.4-0.8,12.9-0.8,19.2,0c8.5,1.4,11.3,3.7,22.4,6.4 c6.2,1.8,12.7,3,19.2,3.1c11.3-0.6,22.2-3.8,32-9.6c4.1-2.3,8.5-4.2,12.7-6.4c5.7-2.8,7.5-3.8,9.6-3.1c5,1.4,6.1,10.5,6.4,12.7 c-1,65.9-0.7,86.3,0,86.3c0.6-1,0.6-2.1,0-3.1c-12.4,10.8-28.4,21.2-48,28.7c-82.9,31.8-164.2-17.4-178-26 c-32.4-15.8-53.2-26-53.2-26l0,0c0,0,41.7-22.4,86.7-42.6C628.1,703.3,639.4,698.5,646.7,695.6z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st1",
    d: "M730.6,671.7c-1.6,0.4-0.3,7.6-0.7,16.6c-0.3,7.5-1.7,11.5-3.8,20.9c-7.6,32.5-5,39.7-10.5,53.9 c-0.7,2-3.3,8.1-4.2,16.1c-0.3,2-0.4,4.4-0.7,9.2c-0.4,8.5-0.1,9.5,0.3,10.2c2.5,4,11.6,3.8,16.1,1.7c16.1-7.5,13.3-47.2,7.5-57.9 c-0.4-0.8-2.1-3.8-3.3-8.2c-0.6-2.4-1.4-6.5-1-11.5c0.4-5.9,2.1-6.6,4.2-14.9c1.7-6.5,2.1-11.7,2.3-14.1 c0.6-9.8-1.3-14.6-2.3-16.8C734.3,676.2,732,671.4,730.6,671.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    id: "SVGID_00000140728227335028499340000010561973871340852098_",
    x: "1321.9",
    y: "625",
    width: "120.1",
    height: "192.4"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000001653208401024494850000011613416817857236615_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000140728227335028499340000010561973871340852098_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    style: "clip-path:url(#SVGID_00000001653208401024494850000011613416817857236615_);fill:#1A5E53;",
    d: "M1321.2,720.7 c4.5-3.3,11-7.8,19.2-12.7c13.4-8.3,20.2-12.6,28.7-16c10.2-4.1,30.3-12.3,51.2-6.4c6.8,1.8,8.9,4,19.2,6.4 c8.3,2,17,3,25.6,3.1c11.7,26.6,23.5,53.2,35.1,79.8l-140.6-3.1l-48-38.3L1321.2,720.7z"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st21",
    d: "M998,647.3c-1.1-4.2-1.1-8.6,0-12.7c2.1-6.8,6.6-12.4,12.7-16c12.3-8.3,26.3-6.9,32-6.4 c12,1.3,14,5.1,35.1,12.7c11.2,4.1,9.5,2.5,32,9.6c22.5,7.1,33.9,10.6,41.6,16c6.4,4.5,7.2,6.6,22.4,22.4 c10.8,11.2,19.8,19.9,25.6,25.6c0.6-6.8,2.7-13.4,6.4-19.1c1.1-1.8,4.8-7.2,19.2-16c16.3-10,25.9-15.8,35.2-12.7 c6.4,2.1,9.5,7.5,12.7,12.7c6.9,11.3,17.1,27.2,32,48c19.4-8.2,27.6-12,28.4-12.6c0,0,0.3-0.1,0.3,0c0.1,0.1-2.1,3.3-3.1,6.4 c-1.1,3.1-1.1,6.5,0,9.6c1,2.3,3.3,4.7,9.6,6.4c10,2.8,16.1,0.3,25.6,0c4,0,18.1-0.7,28.9,6.4c11.7,7.8,15,22.1,16,28.9l-32,12.7 l-127.9-25.6l-249.4-28.9C1000.1,692.2,999,669.7,998,647.3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st22",
    d: "M726.2,800.8c0.7-4.7,2-12.4,3.1-22.4c2.4-18.7,2.3-24.2,6.4-32c2.4-4.8,7.2-14,16-16 c3.1-0.7,8.5,0.6,19.2,3.1c11.7,2.8,12.7,3.7,16,3.1c10-1.7,15.6-12,16-12.7c4.2-8.2,0-11.3,3.1-22.4c0.7-2.8,4.8-17.1,16-22.4 c6.8-3.1,9.6,0,19.2-3.1c5.9-1.8,11.5-5.2,16-9.6c12.6-13.2,4.2-30.1,16-38.3c3.8-2.4,8.3-3.5,12.7-3.1 c8.2,0.6,15.4,5.4,19.2,12.7c4.1,8.8-0.6,17.1,3.1,19.2c2.7,1.4,5.2-2.7,12.7-3.1c2.5-0.1,9.1-0.7,12.7,3.1 c4.2,4.4,2.4,11.3,6.4,12.7c1,0.3,2.1,0.3,3.1,0c8.8-2.3,7.6-19,19.2-28.7c4.5-3.8,10.2-5.9,16-6.4c9.9-0.7,21.2,4.2,25.6,12.7 c2.1,4.2,2.5,10.2,3.1,22.4c0.3,5.8,0.3,9.8,3.1,12.7c2.7,2.3,6.1,3.3,9.6,3.1c4.1,0,11.3-2,32-28.9c7.9-10.3,10.2-14.3,16-16 c8.8-2.5,17.4,2.1,19.2,3.1c6.6,3.7,5,6.5,12.7,12.7c5.5,4.4,7.1,3.8,22.4,12.7c3.4,1.7,6.6,3.8,9.6,6.4c0,0,7.1,8.8,0,28.9 C1122.2,733.3,835.7,782.4,726.2,800.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st23",
    d: "M1263.4,727.3c12.3-26.5,20.8-54.3,25.6-83.2c-1.6,16-2.7,33.1-3.1,51.1c-0.3,12.3-0.3,23.9,0,35.2 L1263.4,727.3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st24",
    d: "M819,772V663.3c2.7,10.5,4.8,21.2,6.1,32c1.6,12.3,1.6,18.4,6.4,25.6c4.8,7.2,8.9,6.1,12.7,12.7 c4.8,8.3,5.9,23.1-3.1,32C832.8,773.9,820.6,772.2,819,772z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st25",
    d: "M726.2,807c24.6-10.5,44.3-17.7,57.6-22.4c20.4-7.2,43-14.1,51.2-28.7c3.3-5.9,5.5-12.4,6.4-19.2 c0.7-6.9-1-9.2,0-12.7c3.1-11.7,27.6-14.9,35.2-16c28.1-4.2,56-10.6,83.2-19.2c3.7-0.8,9.2-2.1,16-3.1c40.3-6.5,52.8,3.1,92.7,3.1 c31-0.3,62-2.4,92.7-6.4c4.2-0.7,8.5-0.7,12.7,0c10,1.8,14,7.9,22.4,12.7s15.8,5.2,25.6,6.4c30.3,4.2,60.1,10.6,89.5,19.2 c18.4,5.8,43.4,17.7,70.3,44.7l-73.7,70.3l-233.3,28.7L726.2,807z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st26",
    d: "M934,810.3c22.8-7.1,46.4-11.5,70.3-12.7c21.4-1.1,42.7-0.1,63.9,3.1c34.5,4.8,35.2,9.8,63.9,12.7 c17.7,1.8,42.2,4.2,70.3-3.1c18.8-5,31.4-12.3,54.3-25.6c38.5-22.4,55.5-40.7,76.7-35.2c5.9,1.6,6.1,3.4,16,6.4 c13.4,4,27.6,5,41.6,3.1L1260,842.1l-115.1,22.4l-127.9-12.7L934,810.3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st23",
    d: "M1404,752.7c-6.2-18.7-10.5-37.9-12.7-57.6c-2-17.4-4.2-36.5,0-60.7c3-16.7,8.3-32.8,16-48 c1.8,5.4,4,11.9,6.4,19.2c6.1,19.1,6.8,21.6,6.4,25.6c-1.1,9.6-6.6,10.9-9.6,22.4c-1.7,7.4-1.7,15,0,22.4 c3.1,19.2,7.4,44.1,12.7,73.7"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st27",
    d: "M1442,734.8L1442,734.8c-0.1,0-12.2,4-25.6,7.8c-6.5,1.8-9.8,2.7-12.9,3.4c-5.8,1.3-8.2,1.6-14.4,3.5 c-16,5-27.3,11.9-35.1,16.6c-18.1,11-17.7,15.3-33.7,25.5c-13.7,8.8-25.2,12.7-38.3,17.4c-22.6,7.9-42.9,11.3-58.4,12.6 c-10.2,1-17.3,0.8-20.4,1C1138.2,824,1049,900,1048.9,900c131,0,262,0,393.1,0l0,0C1442,844.8,1442,789.8,1442,734.8L1442,734.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st28",
    d: "M146,672.8c-82.2-8.5-132.5-13.7-201.9-10.9c-121.1,5-239.6,32.7-275.3,40.6c-62.1,13.9-107.6,27-174.7,19.4 c-37.9-4.2-68.6-13.7-89-21.2c0,66.3,0,132.8,0,199.2c679,0,1358,0,2037,0c-128.4-12.6-224.5-32.1-290.4-48.4 c-17.8-4.4-52.6-13.3-105.1-25.3c-93.4-21.4-141-32.1-187.7-36.1c-84.9-7.1-73.7,11.5-162.1,6.1c-90.1-5.4-164.5-28.3-217.6-45 c-58.3-18.4-49.8-20.7-101.1-36.5C292.3,688.4,224.1,680.9,146,672.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "965.3",
    y: "501.6",
    class: "st29",
    width: "6.1",
    height: "262.4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st30",
    d: "M942.2,492.3c0,0,0,3,0,8.5c2.4,0.6,6.1,1.4,10.6,2.3c19,3.5,33.7,4.5,42.3,5c40.7,2.3,61.1,3.3,88.1,3.3 c26.6-0.1,49.4-0.1,80.1-3.3c0,0,3.7-0.4,50.2-5.5l0,0l0,0l0.6-10.2l0,0H942.2L942.2,492.3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st29",
    d: "M1214.1,492.3c0,4.2-75.7,10-149.1,9.2c-57.6-0.6-122.9-5.4-122.8-9.2c0-4.2,77.1-7.2,135.9-7.2 C1134.5,485.1,1214.1,487.9,1214.1,492.3z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000012439180065345530840000010075545576816329371_",
    d: "M1214.1,492.3c0,4.2-75.7,10-149.1,9.2 c-57.6-0.6-122.9-5.4-122.8-9.2c0-4.2,77.1-7.2,135.9-7.2C1134.5,485.1,1214.1,487.9,1214.1,492.3z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000047774492835828390440000012841791237664032898_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000012439180065345530840000010075545576816329371_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    style: "clip-path:url(#SVGID_00000047774492835828390440000012841791237664032898_);fill:#A1826E;",
    d: "M996.3,475 c1.8,3.8,5.5,9.8,11.9,14.1c5.5,3.8,10.8,5,13.9,5.5c22.9,4.4,62,3,76.2,2.7c24.5-0.7,35.9,0,52.1-6.9 c6.1-2.5,16.3-6.9,16-10.3C1166,475,1128.3,471.8,996.3,475z"
  }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "958.9",
    y: "501.5",
    class: "st32",
    width: "6.4",
    height: "253.2"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st33",
    d: "M1125.6,449c0,10.2,0,20.2,0,30.4c0,2,0,4,0,5.9c0,0.8,0,1.6,0,2.4c0,0.6,0,1.4,0.4,2.1 c0.8,1.4,2.7,2.3,4.7,2.1c2.5,0,6.1,0,10.5,0c3.4,0,13.4,0.1,32.3,1.4c7.8,0.6,17.8,1.3,29.7,2.3c2.1,0.1,5.4,0.6,9.3,1.4 c3.7,0.8,5.5,1.3,6.9,2.5c2.5,2.1,3.3,5.4,4,9.3c0.4,2.3,0.6,4.1,0.7,5.5c0.6,12.7,1.3,25.7,2.1,38.8c1.4,21.8,3,43,4.8,63.9 c6.9,0,13.9,0.1,20.8,0.1c0.3-27.7-0.1-56.3-1.6-85.9c-0.4-8.2-0.8-16.1-1.3-24.2c-0.7-5.1-1.4-10.3-2.1-15.4 c-0.4-2-1.6-5.5-4.5-8.9c-5.2-5.8-12.2-6.5-13.9-6.6c-7.6-0.4-52.8-2.7-52.8-2.7l-26.7-3c-0.6-0.1-1.7-0.4-2.5-1.3 c-1.8-1.7-1.8-4.5-1.7-8.3c0.3-9.3,0.8-10,0.3-11.2C1143.5,447.7,1139.3,446,1125.6,449z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st34",
    d: "M1007.6,733.6c-2.4,0.4-10.2,2.4-25.6,6.4c-5.7,1.3-11,3.4-16,6.4c-4.2,2.5-10,6.1-9.6,9.6 c0.4,3.5,7.6,5.9,12.7,6.4c8.1,0.7,9.9-3.4,19.2-3.1c4.5-0.3,8.9,0.7,12.7,3.1c4.5,3.1,4.7,6.4,9.6,9.6c3,1.7,6.2,2.7,9.6,3.1 c13.7,2.3,20.5,3.4,28.9,3.3c12.3-0.4,27.3-0.7,41.6-9.6c6.8-4.2,8.6-7.4,16-9.6c4.2-1.3,8.6-1.8,22.4,0c25,3.3,34.7,8.1,41.6,3.1 c3.1-2.3,6.5-4.2,9.6-6.4c1.8-1.6,4.1-2.7,6.4-3.3c2.1-0.3,4.2-0.3,6.4,0c5,0.3,5.8,0.7,6.4,0c1.8-2-2.7-8.8-3.1-9.6 c-2.5-3.8-5.8-7.1-9.6-9.6c-5.9-4-12.4-7.1-19.2-9.2c-9.9-3.1-26.9-8.8-44.7-3.1c-7.9,2.4-9.5,5-20.8,7.9 c-6.2,1.7-12.7,2.7-19.2,3.1C1050,734.6,1034.5,729.1,1007.6,733.6z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "1184",
    y: "502.5",
    class: "st29",
    width: "7.9",
    height: "251.5"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st35",
    d: "M1060.5,451.7c0,1.7,0,20.7,0,20.7s0.1,3.3-0.4,6.2c-0.3,1.6-0.7,3.7-2.4,5.7c-0.4,0.6-1.7,2-3.8,2.8 c-1.1,0.4-2.1,0.6-7.1,0.3c-4.5-0.1-6.2-0.4-6.9,0.6c-0.6,0.7-0.6,1.7-0.3,2.4c1,2.8,7.6,2.8,17.7,2.8c13.3,0,19.9,0,20.7,0 c0,0,7.4,0.1,22.4-0.3c0.7,0-0.3,0,5.5-0.6c3.5-0.3,5.4-0.4,6.8-1.8c0.3-0.3,1.3-1.3,1-2.3c-0.3-1-1.8-1.4-2.7-1.7 c-2.4-0.6-4.2-0.3-5.9-0.1c-0.6,0-5,0.4-7.2-0.4c-1-0.4-4.7-2.3-5.4-13.2c0-7.2,0-14.4,0-21.6 C1081.9,451.4,1071.3,451.6,1060.5,451.7z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "1191.9",
    y: "499.5",
    class: "st32",
    width: "6.4",
    height: "254.5"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000029028859104771847270000012938221800444758454_",
    d: "M1007.6,733.6c-2.4,0.4-10.2,2.4-25.6,6.4 c-5.7,1.3-11,3.4-16,6.4c-4.2,2.5-10,6.1-9.6,9.6c0.4,3.5,7.6,5.9,12.7,6.4c8.1,0.7,9.9-3.4,19.2-3.1 c4.5-0.3,8.9,0.7,12.7,3.1c4.5,3.1,4.7,6.4,9.6,9.6c3,1.7,6.2,2.7,9.6,3.1c13.7,2.3,20.5,3.4,28.9,3.3 c12.3-0.4,27.3-0.7,41.6-9.6c6.8-4.2,8.6-7.4,16-9.6c4.2-1.3,8.6-1.8,22.4,0c25,3.3,34.7,8.1,41.6,3.1 c3.1-2.3,6.5-4.2,9.6-6.4c1.8-1.6,4.1-2.7,6.4-3.3c2.1-0.3,4.2-0.3,6.4,0c5,0.3,5.8,0.7,6.4,0c1.8-2-2.7-8.8-3.1-9.6 c-2.5-3.8-5.8-7.1-9.6-9.6c-5.9-4-12.4-7.1-19.2-9.2c-9.9-3.1-26.9-8.8-44.7-3.1c-7.9,2.4-9.5,5-20.8,7.9 c-6.2,1.7-12.7,2.7-19.2,3.1C1050,734.6,1034.5,729.1,1007.6,733.6z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000054981768476070243810000014146152155174666922_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000029028859104771847270000012938221800444758454_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("rect", {
    x: "958.9",
    y: "501.5",
    style: "clip-path:url(#SVGID_00000054981768476070243810000014146152155174666922_);fill:#E2B38E;",
    width: "6.4",
    height: "262.4"
  })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st11",
    d: "M1320.4,235c1-9.2,2.4-23.5,4.4-41c3.7-32.1,4.5-34.8,3.8-42.2c-2.8-25.9-19.2-44-28.1-54 c-8.9-9.9-22.2-18.5-48.4-35.2c-29-18.5-43.9-27.9-59.7-32.4c-12.7-3.7-30.3-8.6-51.2-4.2c-34.5,7.4-53.8,35.5-59.4,44.3 c8.2-1.8,16.3-3.7,24.5-5.5c-6.5,22.9-12.9,45.8-19.4,68.7l0,0c-4.2,3.4-9.5,7.9-14.9,13.9c-3.1,3.4-8.9,9.8-14.6,19.4 c-4.5,7.6-11.5,19.4-13,35.8c-0.8,9.5,0.4,17.5,1.6,22.8c3.7-2.7,7.6-5.2,11.9-7.6c26.7-15.1,53.9-17.7,73-17.3 c13.4,28,26.9,56.2,40.3,84.2c-1.6,3.8-4.1,10.3-7.2,18.5c0,0-7.2,18.8-21.9,60.7l0,0c24.6-5.2,49.1-10.5,73.7-15.6 c-2.4,8.6-4.7,20.4-4.7,34.4c0.1,22.2,6.4,39.6,11,49.9c9.6-5,23.2-13.2,36.4-26.6c23.3-23.8,31.5-49.7,43.6-89.3 C1308.2,296.5,1315.4,268.8,1320.4,235"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st10",
    d: "M1320.4,235c3.3-12-10.2-39.3-36.9-93.9c-13.7-28-22.5-43.3-37.2-59.3c-11.9-13-23.8-25.7-43.9-33.2 c-24.9-9.3-47.4-5-60.1-2.4c-20.8,4.1-34.9,12-52.1,21.5c-14.3,7.9-31.3,19.1-49.1,34.7c0.7,1.3,1.7,2.8,3,4.8 c6.2,9.1,13.4,14,16.4,16.1c12.6,8.8,26,11,37.1,12.9c13.2,2.1,20.9,1.7,28.1,2.1c14.1,0.7,34.5,5,59.6,21.5 c-8.1-1.1-22.1-1.8-37.5,4.2c-3.7,1.4-18.1,7.6-35.4,30c-19.9,25.9-28.1,53.8-31.7,74c3.4,5,9.3,12,18.5,17.1 c10.6,5.8,20.7,6.5,37.5,6.2c14.7-0.1,33.9-1,56.6-3.3C1258.8,286.2,1311.7,267,1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st9",
    d: "M1320.4,235c0,0-24.6,4.1-27.2,4.5c-8.2,1.4-96.6,16.4-117.8,74.4c-2.4,6.6-3.1,11.6-4.4,19.8 c-5.2,35.8,3.7,65.5,10.8,82.9c4.7-8.9,11.6-21.6,20.5-36.5c16.8-28.1,37.5-62.7,70.3-97.9C1272.5,282.2,1273.8,280.8,1320.4,235 L1320.4,235z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st37",
    d: "M1156.6,456.8H998.1c-10.6,0-19.1-8.6-19.1-19.1v-77.9c0-10.6,8.6-19.1,19.1-19.1h158.4 c10.6,0,19.1,8.6,19.1,19.1v77.9C1175.6,448.2,1167.2,456.8,1156.6,456.8z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    class: "st38",
    d: "M1148.2,445.6h-141.7c-10.6,0-19.1-8.6-19.1-19.1V368c0-10.6,8.6-19.1,19.1-19.1h141.7 c10.6,0,19.1,8.6,19.1,19.1v58.6C1167.3,437.1,1158.8,445.6,1148.2,445.6z"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000049911033430325100450000008510546870516492940_",
    d: "M1148.1,445.6h-141.7c-10.6,0-19.1-8.6-19.1-19.1 V368c0-10.6,8.6-19.1,19.1-19.1h141.7c10.6,0,19.1,8.6,19.1,19.1v58.6C1167.2,437.1,1158.7,445.6,1148.1,445.6z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000031199662389937159480000012783867269819733126_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000049911033430325100450000008510546870516492940_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", {
    style: "clip-path:url(#SVGID_00000031199662389937159480000012783867269819733126_);"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000132800868899699922120000000172203737416156585_",
    class: "st40",
    d: "M984.3,399.4c2.1-4.7,4.8-6.4,6.4-7.1 c8.1-3.7,22.4,2.5,27.9,11c0.7,1.1,2.1,3.7,5,4.7c2.5,1,5.8,0.4,8.2-1c0.7-0.4,2.4-1.6,3.4-3.7c1.6-3.3-0.4-5.7,1.3-8.2 c0.8-1.3,2.3-1.7,3.1-2.1c5-1.8,10.8,0.7,14.4,2.7c11.5,5.9,12,11.2,20.9,13.6c2.8,0.8,6.6,1.8,10.2,0c4-2,6.8-6.8,7.4-11.3 c0.3-3.1-0.6-4.4,0.6-5.8c1.6-1.8,4.2-0.8,9.5-1c3.7-0.1,6.4-0.8,11.7-2.1c7.6-1.8,8.3-3.1,12.3-2.8c3.7,0.3,6.6,1.7,8.2,2.4 c4.1,2,3.8,3,7.1,4.5c0.8,0.4,6.9,3,13.4,1.3c3.1-0.8,3.7-2,6.5-2.1c3.1-0.1,5.7,0.8,7.4,1.8c0.1,10.2,0.3,20.5,0.6,30.7 c-32.7,2.3-65.2,4.5-97.9,6.8c-29.7-1.4-59.4-2.8-89.3-4.2C983.1,418,983.7,408.7,984.3,399.4z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000170961644307425945980000006861379305495374723_",
    d: "M984.3,399.4c2.1-4.7,4.8-6.4,6.4-7.1 c8.1-3.7,22.4,2.5,27.9,11c0.7,1.1,2.1,3.7,5,4.7c2.5,1,5.8,0.4,8.2-1c0.7-0.4,2.4-1.6,3.4-3.7c1.6-3.3-0.4-5.7,1.3-8.2 c0.8-1.3,2.3-1.7,3.1-2.1c5-1.8,10.8,0.7,14.4,2.7c11.5,5.9,12,11.2,20.9,13.6c2.8,0.8,6.6,1.8,10.2,0 c4-2,6.8-6.8,7.4-11.3c0.3-3.1-0.6-4.4,0.6-5.8c1.6-1.8,4.2-0.8,9.5-1c3.7-0.1,6.4-0.8,11.7-2.1c7.6-1.8,8.3-3.1,12.3-2.8 c3.7,0.3,6.6,1.7,8.2,2.4c4.1,2,3.8,3,7.1,4.5c0.8,0.4,6.9,3,13.4,1.3c3.1-0.8,3.7-2,6.5-2.1c3.1-0.1,5.7,0.8,7.4,1.8 c0.1,10.2,0.3,20.5,0.6,30.7c-32.7,2.3-65.2,4.5-97.9,6.8c-29.7-1.4-59.4-2.8-89.3-4.2C983.1,418,983.7,408.7,984.3,399.4z "
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000090284115568046587990000006888556242473202615_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000170961644307425945980000006861379305495374723_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    style: "clip-path:url(#SVGID_00000090284115568046587990000006888556242473202615_);fill:#ADDDF1;",
    d: "M1148.2,445.6 h-141.7c-10.6,0-19.1-8.6-19.1-19.1V368c0-10.6,8.6-19.1,19.1-19.1h141.7c10.6,0,19.1,8.6,19.1,19.1v58.6 C1167.3,437.1,1158.8,445.6,1148.2,445.6z"
  }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("g", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("defs", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    id: "SVGID_00000011009675772465204870000005940691187370001571_",
    d: "M1148.2,445.6h-141.7c-10.6,0-19.1-8.6-19.1-19.1 V368c0-10.6,8.6-19.1,19.1-19.1h141.7c10.6,0,19.1,8.6,19.1,19.1v58.6C1167.3,437.1,1158.8,445.6,1148.2,445.6z"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("clipPath", {
    id: "SVGID_00000022524863047871096330000003825119521263497349_"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("use", {
    xlinkHref: "#SVGID_00000011009675772465204870000005940691187370001571_",
    style: "overflow:visible;"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("path", {
    style: "clip-path:url(#SVGID_00000022524863047871096330000003825119521263497349_);fill:#90D4F1;",
    d: "M983,404 c6.4,4.4,12.2,7.2,16.6,9.2c9.8,4.4,18.4,6.4,25.7,7.1c7.2,0.7,9.8,0,11-0.6c5.4-2,5.5-5.4,11.3-7.4c1.4-0.4,4.7-0.7,11-1 c7.8-0.4,7.4-0.1,8.9-0.6c7.5-2,10-8.3,12.3-7.4c1.1,0.6,1.4,3.8,1.8,10.2c0.4,6.1,0.1,7.9,1.6,9.2c2,1.7,5.4,0.8,7.6,0.3 c5.4-1.4,9.2-4.4,13.6-8.3c6.9-6.2,8.5-9.1,16-15.7c5.8-5.1,7.8-6.1,9.9-6.4c5.1-0.4,9.5,3,12.6,5.5c5.2,4.2,4.7,6.4,11.3,11.7 c3,2.4,5.2,3.8,8.2,4.5c2.8,0.7,5.2,0.6,6.8,0.3c5.1,7.6,5.2,17.3,0.6,24.5c-5.7,8.5-15.6,9.3-16.8,9.5 c-53.8,0.3-107.4,0.6-161.1,0.8c-3.5-5.9-6.9-11.9-10.5-17.8C982,422.4,982.4,413.2,983,404z"
  })))))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (OasisHero);

/***/ }),

/***/ "./src/pages/about.jsx":
/*!*****************************!*\
  !*** ./src/pages/about.jsx ***!
  \*****************************/
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
/* harmony import */ var _components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Navbar/Navbar.jsx */ "./src/components/Navbar/Navbar.jsx");
/* harmony import */ var _components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Footer/Sock.jsx */ "./src/components/Footer/Sock.jsx");
/* harmony import */ var _components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/Footer/Footer.jsx */ "./src/components/Footer/Footer.jsx");









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
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,_components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_6__["default"])(), renderTop(), OasisMission(), OasisTeam(), (0,_components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_7__["default"])(), (0,_components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_8__["default"])());
}

/***/ }),

/***/ "./src/pages/app.js?export=default":
/*!*****************************************!*\
  !*** ./src/pages/app.js?export=default ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "react-dom/client");
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _LandingPage_LandingPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../LandingPage/LandingPage */ "./src/LandingPage/LandingPage.jsx");
/* harmony import */ var _about__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./about */ "./src/pages/about.jsx");
/* harmony import */ var _join__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./join */ "./src/pages/join.jsx");
/* harmony import */ var _mentor__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mentor */ "./src/pages/mentor.jsx");
/* harmony import */ var _contact__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contact */ "./src/pages/contact.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/dist/index.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _components_NavBar_NavBar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/NavBar/NavBar */ "./src/components/NavBar/NavBar.jsx");









function App() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_8__.BrowserRouter, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Routes, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_LandingPage_LandingPage__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    index: true,
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_LandingPage_LandingPage__WEBPACK_IMPORTED_MODULE_2__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "about",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_about__WEBPACK_IMPORTED_MODULE_3__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "join",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_join__WEBPACK_IMPORTED_MODULE_4__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "mentor",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mentor__WEBPACK_IMPORTED_MODULE_5__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "resources",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_mentor__WEBPACK_IMPORTED_MODULE_5__["default"], null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__.Route, {
    path: "contact",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_contact__WEBPACK_IMPORTED_MODULE_6__["default"], null)
  }))));
}

/***/ }),

/***/ "./src/pages/contact.jsx":
/*!*******************************!*\
  !*** ./src/pages/contact.jsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Contact)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _contact_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./contact.css */ "./src/pages/contact.css");
/* harmony import */ var _contact_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_contact_css__WEBPACK_IMPORTED_MODULE_1__);


function Contact() {}

/***/ }),

/***/ "./src/pages/join.jsx":
/*!****************************!*\
  !*** ./src/pages/join.jsx ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Join)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_faq_faq__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/faq/faq */ "./src/components/faq/faq.jsx");
/* harmony import */ var _components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/common/Title.jsx */ "./src/components/common/Title.jsx");
/* harmony import */ var _components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/common/ContentBlock.jsx */ "./src/components/common/ContentBlock.jsx");
/* harmony import */ var _components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Table/Table.jsx */ "./src/components/Table/Table.jsx");
/* harmony import */ var _components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Navbar/Navbar.jsx */ "./src/components/Navbar/Navbar.jsx");
/* harmony import */ var _components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Footer/Sock.jsx */ "./src/components/Footer/Sock.jsx");
/* harmony import */ var _components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/Footer/Footer.jsx */ "./src/components/Footer/Footer.jsx");
/* harmony import */ var _join_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.css */ "./src/pages/join.css");
/* harmony import */ var _join_css__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_join_css__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_card_ProjectCard_jsx__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/card/ProjectCard.jsx */ "./src/components/card/ProjectCard.jsx");











function Join() {
  const JoinTopSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinSectionOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      title: "Join",
      body: "With support from our mentors, your group, and the Oasis community,  bring your software idea to life."
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridColumn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      body: "Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas.  Nemo enim ipsam voluptatem quia voluptas."
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridColumn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      body: "Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas.  Nemo enim ipsam voluptatem quia voluptas."
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinGridColumn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      body: "Bridge the gap between classes and co-op. Nemo enim ipsam voluptatem quia voluptas.  Nemo enim ipsam voluptatem quia voluptas."
    })))));
  };
  const JoinTimeline = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "timelineContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Timeline"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_Table_Table_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("p", null, "* Dates are subject to change."));
  };
  const JoinProjects = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "projectsContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "Projects",
      body: "Featured Projects"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_card_ProjectCard_jsx__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("a", {
      class: "projectButton",
      href: "https://hub.oasisneu.com/",
      target: "_blank"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h4", null, "All Projects")));
  };
  const JoinFAQ = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "joinFAQContainer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_3__["default"], {
      title: "FAQ"
    }));
  };
  const RenderFaqs = () => {
    const faqData = [{
      question: "Lorem ipsum dolor sit amet?",
      answer: "Bla bla bla."
    }, {
      question: "Lorem ipsum dolor sit amet?",
      answer: "Bla bla bla."
    }, {
      question: "Lorem ipsum dolor sit amet?",
      answer: "Bla bla bla."
    }, {
      question: "Lorem ipsum dolor sit amet?",
      answer: "Bla bla bla."
    }];
    const {
      0: expandedFaq,
      1: setExpandedFaq
    } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
    const expandFaq = index => {
      setExpandedFaq(index);
    };
    const minimizeFaq = () => {
      setExpandedFaq(null);
    };
    const handleFaqClick = index => {
      expandedFaq === index ? minimizeFaq() : expandFaq(index);
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: 'faqsContainer'
    }, faqData.map((faq, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_faq_faq__WEBPACK_IMPORTED_MODULE_1__["default"], {
        key: index,
        question: faq.question,
        answer: faq.answer,
        button: faq === null || faq === void 0 ? void 0 : faq.button,
        isExpanded: expandedFaq === index,
        onClick: () => {
          handleFaqClick(index);
        },
        className: faq === null || faq === void 0 ? void 0 : faq.className
      });
    }));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,_components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])(), JoinTopSection(), JoinTimeline(), JoinProjects(), JoinFAQ(), RenderFaqs(), (0,_components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_6__["default"])(), (0,_components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_7__["default"])());
}

/***/ }),

/***/ "./src/pages/mentor.jsx":
/*!******************************!*\
  !*** ./src/pages/mentor.jsx ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Mentor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/common/Title.jsx */ "./src/components/common/Title.jsx");
/* harmony import */ var _components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/common/ContentBlock.jsx */ "./src/components/common/ContentBlock.jsx");
/* harmony import */ var _components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/Navbar/Navbar.jsx */ "./src/components/Navbar/Navbar.jsx");
/* harmony import */ var _components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Footer/Footer.jsx */ "./src/components/Footer/Footer.jsx");
/* harmony import */ var _components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Footer/Sock.jsx */ "./src/components/Footer/Sock.jsx");
/* harmony import */ var _mentor_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mentor.css */ "./src/pages/mentor.css");
/* harmony import */ var _mentor_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_mentor_css__WEBPACK_IMPORTED_MODULE_6__);







function Mentor() {
  const MentorTopSection = () => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "mentorSectionOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_Title_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
      title: "Mentor",
      body: "Teach participants how to learn the skills  they need to bring their projects to life! If you've  completed a co-op and are free from 12-2pm on Sundays,  then you're ready to mentor."
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "memberGridOne"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "memberGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Any Northeastern student who has completed at least one computer science co-op."
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "memberGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "Mentors work with two teams to guide them through their making first web app."
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "memberGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "A low-commitment chance to mentor students and help them make their ideas into reality!"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "memberGridRow"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
      className: "circlePosition"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      className: "circleTurquoise"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_common_ContentBlock_jsx__WEBPACK_IMPORTED_MODULE_2__["default"], {
      body: "There are 8 weekly hack sessions. Mentors must be available most Sundays from 11:30 AM to 2PM."
    }))));
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, (0,_components_Navbar_Navbar_jsx__WEBPACK_IMPORTED_MODULE_3__["default"])(), MentorTopSection(), (0,_components_Footer_Sock_jsx__WEBPACK_IMPORTED_MODULE_5__["default"])(), (0,_components_Footer_Footer_jsx__WEBPACK_IMPORTED_MODULE_4__["default"])());
}

/***/ }),

/***/ "./src/LandingPage/DesktopContent.css":
/*!********************************************!*\
  !*** ./src/LandingPage/DesktopContent.css ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/LandingPage/LandingPage.css":
/*!*****************************************!*\
  !*** ./src/LandingPage/LandingPage.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Footer/Footer.css":
/*!******************************************!*\
  !*** ./src/components/Footer/Footer.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Footer/Sock.css":
/*!****************************************!*\
  !*** ./src/components/Footer/Sock.css ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/NavBar/NavBar.css":
/*!******************************************!*\
  !*** ./src/components/NavBar/NavBar.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/NavBar/NavBarMobile.css":
/*!************************************************!*\
  !*** ./src/components/NavBar/NavBarMobile.css ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Navbar/NavBar.css":
/*!******************************************!*\
  !*** ./src/components/Navbar/NavBar.css ***!
  \******************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Navbar/NavBarMobile.css":
/*!************************************************!*\
  !*** ./src/components/Navbar/NavBarMobile.css ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Table/Table.css":
/*!****************************************!*\
  !*** ./src/components/Table/Table.css ***!
  \****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/Timeline/Timeline.css":
/*!**********************************************!*\
  !*** ./src/components/Timeline/Timeline.css ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/card/Card.css":
/*!**************************************!*\
  !*** ./src/components/card/Card.css ***!
  \**************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/card/MemberCard.css":
/*!********************************************!*\
  !*** ./src/components/card/MemberCard.css ***!
  \********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/card/ProjectCard.css":
/*!*********************************************!*\
  !*** ./src/components/card/ProjectCard.css ***!
  \*********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/common/ContentBlock.css":
/*!************************************************!*\
  !*** ./src/components/common/ContentBlock.css ***!
  \************************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/common/CustomImage.css":
/*!***********************************************!*\
  !*** ./src/components/common/CustomImage.css ***!
  \***********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/common/Title.css":
/*!*****************************************!*\
  !*** ./src/components/common/Title.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./src/components/faq/faq.css":
/*!************************************!*\
  !*** ./src/components/faq/faq.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/about.css":
/*!*****************************!*\
  !*** ./src/pages/about.css ***!
  \*****************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/contact.css":
/*!*******************************!*\
  !*** ./src/pages/contact.css ***!
  \*******************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/join.css":
/*!****************************!*\
  !*** ./src/pages/join.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "./src/pages/mentor.css":
/*!******************************!*\
  !*** ./src/pages/mentor.css ***!
  \******************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-router-dom/dist/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-router-dom/dist/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Await),
/* harmony export */   "BrowserRouter": () => (/* binding */ BrowserRouter),
/* harmony export */   "Form": () => (/* binding */ Form),
/* harmony export */   "HashRouter": () => (/* binding */ HashRouter),
/* harmony export */   "Link": () => (/* binding */ Link),
/* harmony export */   "MemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.MemoryRouter),
/* harmony export */   "NavLink": () => (/* binding */ NavLink),
/* harmony export */   "Navigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   "Outlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Outlet),
/* harmony export */   "Route": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Route),
/* harmony export */   "Router": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Router),
/* harmony export */   "RouterProvider": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.RouterProvider),
/* harmony export */   "Routes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.Routes),
/* harmony export */   "ScrollRestoration": () => (/* binding */ ScrollRestoration),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext),
/* harmony export */   "UNSAFE_useRouteId": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_useRouteId),
/* harmony export */   "UNSAFE_useScrollRestoration": () => (/* binding */ useScrollRestoration),
/* harmony export */   "createBrowserRouter": () => (/* binding */ createBrowserRouter),
/* harmony export */   "createHashRouter": () => (/* binding */ createHashRouter),
/* harmony export */   "createMemoryRouter": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.createRoutesFromElements),
/* harmony export */   "createSearchParams": () => (/* binding */ createSearchParams),
/* harmony export */   "defer": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   "renderMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   "unstable_HistoryRouter": () => (/* binding */ HistoryRouter),
/* harmony export */   "unstable_useBlocker": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.unstable_useBlocker),
/* harmony export */   "unstable_usePrompt": () => (/* binding */ usePrompt),
/* harmony export */   "useActionData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useActionData),
/* harmony export */   "useAsyncError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useAsyncValue),
/* harmony export */   "useBeforeUnload": () => (/* binding */ useBeforeUnload),
/* harmony export */   "useFetcher": () => (/* binding */ useFetcher),
/* harmony export */   "useFetchers": () => (/* binding */ useFetchers),
/* harmony export */   "useFormAction": () => (/* binding */ useFormAction),
/* harmony export */   "useHref": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useHref),
/* harmony export */   "useInRouterContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useInRouterContext),
/* harmony export */   "useLinkClickHandler": () => (/* binding */ useLinkClickHandler),
/* harmony export */   "useLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLoaderData),
/* harmony export */   "useLocation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation),
/* harmony export */   "useMatch": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatch),
/* harmony export */   "useMatches": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches),
/* harmony export */   "useNavigate": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate),
/* harmony export */   "useNavigation": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation),
/* harmony export */   "useNavigationType": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigationType),
/* harmony export */   "useOutlet": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutlet),
/* harmony export */   "useOutletContext": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useOutletContext),
/* harmony export */   "useParams": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useParams),
/* harmony export */   "useResolvedPath": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRevalidator),
/* harmony export */   "useRouteError": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* reexport safe */ react_router__WEBPACK_IMPORTED_MODULE_2__.useRoutes),
/* harmony export */   "useSearchParams": () => (/* binding */ useSearchParams),
/* harmony export */   "useSubmit": () => (/* binding */ useSubmit)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router DOM v6.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */





function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}

const defaultMethod = "get";
const defaultEncType = "application/x-www-form-urlencoded";
function isHtmlElement(object) {
  return object != null && typeof object.tagName === "string";
}
function isButtonElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "button";
}
function isFormElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "form";
}
function isInputElement(object) {
  return isHtmlElement(object) && object.tagName.toLowerCase() === "input";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && (
  // Ignore everything but left clicks
  !target || target === "_self") &&
  // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event) // Ignore clicks with modifier keys
  ;
}
/**
 * Creates a URLSearchParams object using the given initializer.
 *
 * This is identical to `new URLSearchParams(init)` except it also
 * supports arrays as values in the object form of the initializer
 * instead of just strings. This is convenient when you need multiple
 * values for a given key, but don't want to use an array initializer.
 *
 * For example, instead of:
 *
 *   let searchParams = new URLSearchParams([
 *     ['sort', 'name'],
 *     ['sort', 'price']
 *   ]);
 *
 * you can do:
 *
 *   let searchParams = createSearchParams({
 *     sort: ['name', 'price']
 *   });
 */
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map(v => [key, v]) : [[key, value]]);
  }, []));
}
function getSearchParamsForLocation(locationSearch, defaultSearchParams) {
  let searchParams = createSearchParams(locationSearch);
  if (defaultSearchParams) {
    for (let key of defaultSearchParams.keys()) {
      if (!searchParams.has(key)) {
        defaultSearchParams.getAll(key).forEach(value => {
          searchParams.append(key, value);
        });
      }
    }
  }
  return searchParams;
}
function getFormSubmissionInfo(target, options, basename) {
  let method;
  let action = null;
  let encType;
  let formData;
  if (isFormElement(target)) {
    let submissionTrigger = options.submissionTrigger;
    if (options.action) {
      action = options.action;
    } else {
      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("action");
      action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(attr, basename) : null;
    }
    method = options.method || target.getAttribute("method") || defaultMethod;
    encType = options.encType || target.getAttribute("enctype") || defaultEncType;
    formData = new FormData(target);
    if (submissionTrigger && submissionTrigger.name) {
      formData.append(submissionTrigger.name, submissionTrigger.value);
    }
  } else if (isButtonElement(target) || isInputElement(target) && (target.type === "submit" || target.type === "image")) {
    let form = target.form;
    if (form == null) {
      throw new Error("Cannot submit a <button> or <input type=\"submit\"> without a <form>");
    }
    // <button>/<input type="submit"> may override attributes of <form>
    if (options.action) {
      action = options.action;
    } else {
      // When grabbing the action from the element, it will have had the basename
      // prefixed to ensure non-JS scenarios work, so strip it since we'll
      // re-prefix in the router
      let attr = target.getAttribute("formaction") || form.getAttribute("action");
      action = attr ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(attr, basename) : null;
    }
    method = options.method || target.getAttribute("formmethod") || form.getAttribute("method") || defaultMethod;
    encType = options.encType || target.getAttribute("formenctype") || form.getAttribute("enctype") || defaultEncType;
    formData = new FormData(form);
    // Include name + value from a <button>, appending in case the button name
    // matches an existing input name
    if (target.name) {
      formData.append(target.name, target.value);
    }
  } else if (isHtmlElement(target)) {
    throw new Error("Cannot submit element that is not <form>, <button>, or " + "<input type=\"submit|image\">");
  } else {
    method = options.method || defaultMethod;
    action = options.action || null;
    encType = options.encType || defaultEncType;
    if (target instanceof FormData) {
      formData = target;
    } else {
      formData = new FormData();
      if (target instanceof URLSearchParams) {
        for (let [name, value] of target) {
          formData.append(name, value);
        }
      } else if (target != null) {
        for (let name of Object.keys(target)) {
          formData.append(name, target[name]);
        }
      }
    }
  }
  return {
    action,
    method: method.toLowerCase(),
    encType,
    formData
  };
}

const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"],
  _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"],
  _excluded3 = ["reloadDocument", "replace", "method", "action", "onSubmit", "fetcherKey", "routeId", "relative", "preventScrollReset"];
function createBrowserRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_mapRouteProperties
  }).initialize();
}
function createHashRouter(routes, opts) {
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window: opts == null ? void 0 : opts.window
    }),
    hydrationData: (opts == null ? void 0 : opts.hydrationData) || parseHydrationData(),
    routes,
    mapRouteProperties: react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_mapRouteProperties
  }).initialize();
}
function parseHydrationData() {
  var _window;
  let state = (_window = window) == null ? void 0 : _window.__staticRouterHydrationData;
  if (state && state.errors) {
    state = _extends({}, state, {
      errors: deserializeErrors(state.errors)
    });
  }
  return state;
}
function deserializeErrors(errors) {
  if (!errors) return null;
  let entries = Object.entries(errors);
  let serialized = {};
  for (let [key, val] of entries) {
    // Hey you!  If you change this, please change the corresponding logic in
    // serializeErrors in react-router-dom/server.tsx :)
    if (val && val.__type === "RouteErrorResponse") {
      serialized[key] = new react_router__WEBPACK_IMPORTED_MODULE_1__.ErrorResponse(val.status, val.statusText, val.data, val.internal === true);
    } else if (val && val.__type === "Error") {
      let error = new Error(val.message);
      // Wipe away the client-side stack trace.  Nothing to fill it in with
      // because we don't serialize SSR stack traces for security reasons
      error.stack = "";
      serialized[key] = error;
    } else {
      serialized[key] = val;
    }
  }
  return serialized;
}
// Webpack + React 17 fails to compile on the usage of `React.startTransition` or
// `React["startTransition"]` even if it's behind a feature detection of
// `"startTransition" in React`. Moving this to a constant avoids the issue :/
const START_TRANSITION = "startTransition";
/**
 * A `<Router>` for use in web browsers. Provides the cleanest URLs.
 */
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createBrowserHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    START_TRANSITION in react__WEBPACK_IMPORTED_MODULE_0__ ? react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION](() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` for use in web browsers. Stores the location in the hash
 * portion of the URL so it is not sent to the server.
 */
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createHashHistory)({
      window,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    START_TRANSITION in react__WEBPACK_IMPORTED_MODULE_0__ ? react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION](() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * A `<Router>` that accepts a pre-instantiated history object. It's important
 * to note that using your own history object is highly discouraged and may add
 * two versions of the history library to your bundles unless you use the same
 * version of the history library that React Router uses internally.
 */
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    START_TRANSITION in react__WEBPACK_IMPORTED_MODULE_0__ ? react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION](() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__.Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
/**
 * The public API for rendering a history-aware <a>.
 */
const Link = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      to,
      preventScrollReset
    } = _ref4,
    rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  // Rendered into <a href> for absolute URLs
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    // Render the absolute href server- and client-side
    absoluteHref = to;
    // Only check for external origins client-side
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = (0,react_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          // Strip the protocol/origin/basename for same-origin absolute URLs
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e) {
        // We can't do external URL detection without a valid URL
         true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "<Link to=\"" + to + "\"> contains an invalid URL which will probably break " + "when clicked - please update to a valid URL path.") : 0;
      }
    }
  }
  // Rendered into <a href> for relative URLs
  let href = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useHref)(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });
  function handleClick(event) {
    if (onClick) onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    /*#__PURE__*/
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    react__WEBPACK_IMPORTED_MODULE_0__.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref: ref,
      target: target
    }))
  );
});
if (true) {
  Link.displayName = "Link";
}
/**
 * A <Link> wrapper that knows if it's "active" or not.
 */
const NavLink = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
      "aria-current": ariaCurrentProp = "page",
      caseSensitive = false,
      className: classNameProp = "",
      end = false,
      style: styleProp,
      to,
      children
    } = _ref5,
    rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative: rest.relative
  });
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let routerState = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let toPathname = navigator.encodeLocation ? navigator.encodeLocation(path).pathname : path.pathname;
  let locationPathname = location.pathname;
  let nextLocationPathname = routerState && routerState.navigation && routerState.navigation.location ? routerState.navigation.location.pathname : null;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    nextLocationPathname = nextLocationPathname ? nextLocationPathname.toLowerCase() : null;
    toPathname = toPathname.toLowerCase();
  }
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let isPending = nextLocationPathname != null && (nextLocationPathname === toPathname || !end && nextLocationPathname.startsWith(toPathname) && nextLocationPathname.charAt(toPathname.length) === "/");
  let ariaCurrent = isActive ? ariaCurrentProp : undefined;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive,
      isPending
    });
  } else {
    // If the className prop is not a function, we use a default `active`
    // class for <NavLink />s that are active. In v5 `active` was the default
    // value for `activeClassName`, but we are removing that API and can still
    // use the old default behavior for a cleaner upgrade path and keep the
    // simple styling rules working as they currently do.
    className = [classNameProp, isActive ? "active" : null, isPending ? "pending" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp({
    isActive,
    isPending
  }) : styleProp;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className: className,
    ref: ref,
    style: style,
    to: to
  }), typeof children === "function" ? children({
    isActive,
    isPending
  }) : children);
});
if (true) {
  NavLink.displayName = "NavLink";
}
/**
 * A `@remix-run/router`-aware `<form>`. It behaves like a normal form except
 * that the interaction with the server is with `fetch` instead of new document
 * requests, allowing components to add nicer UX to the page as the form is
 * submitted and returns with data.
 */
const Form = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
    ref: ref
  }));
});
if (true) {
  Form.displayName = "Form";
}
const FormImpl = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((_ref6, forwardedRef) => {
  let {
      reloadDocument,
      replace,
      method = defaultMethod,
      action,
      onSubmit,
      fetcherKey,
      routeId,
      relative,
      preventScrollReset
    } = _ref6,
    props = _objectWithoutPropertiesLoose(_ref6, _excluded3);
  let submit = useSubmitImpl(fetcherKey, routeId);
  let formMethod = method.toLowerCase() === "get" ? "get" : "post";
  let formAction = useFormAction(action, {
    relative
  });
  let submitHandler = event => {
    onSubmit && onSubmit(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    let submitter = event.nativeEvent.submitter;
    let submitMethod = (submitter == null ? void 0 : submitter.getAttribute("formmethod")) || method;
    submit(submitter || event.currentTarget, {
      method: submitMethod,
      replace,
      relative,
      preventScrollReset
    });
  };
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("form", _extends({
    ref: forwardedRef,
    method: formMethod,
    action: formAction,
    onSubmit: reloadDocument ? onSubmit : submitHandler
  }, props));
});
if (true) {
  FormImpl.displayName = "FormImpl";
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 */
function ScrollRestoration(_ref7) {
  let {
    getKey,
    storageKey
  } = _ref7;
  useScrollRestoration({
    getKey,
    storageKey
  });
  return null;
}
if (true) {
  ScrollRestoration.displayName = "ScrollRestoration";
}
//#endregion
////////////////////////////////////////////////////////////////////////////////
//#region Hooks
////////////////////////////////////////////////////////////////////////////////
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook["UseSubmitImpl"] = "useSubmitImpl";
  DataRouterHook["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseFetchers"] = "useFetchers";
  DataRouterStateHook["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterContext);
  !ctx ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_DataRouterStateContext);
  !state ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
/**
 * Handles the click behavior for router `<Link>` components. This is useful if
 * you need to create custom `<Link>` components with the same click behavior we
 * use in our exported `<Link>`.
 */
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let path = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(to, {
    relative
  });
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(event => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      // If the URL hasn't changed, a regular <a> will do a replace instead of
      // a push, so do the same here unless the replace prop is explicitly set
      let replace = replaceProp !== undefined ? replaceProp : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(location) === (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
/**
 * A convenient wrapper for reading and writing search parameters via the
 * URLSearchParams interface.
 */
function useSearchParams(defaultInit) {
   true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not " + "support the URLSearchParams API. If you need to support Internet " + "Explorer 11, we recommend you load a polyfill such as " + "https://github.com/ungap/url-search-params\n\n" + "If you're unsure how to load polyfills, we recommend you check out " + "https://polyfill.io/v3/ which provides some recommendations about how " + "to load polyfills only for users that need them, instead of for every " + "user.") : 0;
  let defaultSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(createSearchParams(defaultInit));
  let hasSetSearchParamsRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let searchParams = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() =>
  // Only merge in the defaults if we haven't yet called setSearchParams.
  // Once we call that we want those to take precedence, otherwise you can't
  // remove a param with setSearchParams({}) if it has an initial value
  getSearchParamsForLocation(location.search, hasSetSearchParamsRef.current ? null : defaultSearchParamsRef.current), [location.search]);
  let navigate = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigate)();
  let setSearchParams = react__WEBPACK_IMPORTED_MODULE_0__.useCallback((nextInit, navigateOptions) => {
    const newSearchParams = createSearchParams(typeof nextInit === "function" ? nextInit(searchParams) : nextInit);
    hasSetSearchParamsRef.current = true;
    navigate("?" + newSearchParams, navigateOptions);
  }, [navigate, searchParams]);
  return [searchParams, setSearchParams];
}
/**
 * Returns a function that may be used to programmatically submit a form (or
 * some arbitrary data) to the server.
 */
function useSubmit() {
  return useSubmitImpl();
}
function useSubmitImpl(fetcherKey, fetcherRouteId) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseSubmitImpl);
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let currentRouteId = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_useRouteId)();
  return react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (target, options) {
    if (options === void 0) {
      options = {};
    }
    if (typeof document === "undefined") {
      throw new Error("You are calling submit during the server render. " + "Try calling submit within a `useEffect` or callback instead.");
    }
    let {
      action,
      method,
      encType,
      formData
    } = getFormSubmissionInfo(target, options, basename);
    // Base options shared between fetch() and navigate()
    let opts = {
      preventScrollReset: options.preventScrollReset,
      formData,
      formMethod: method,
      formEncType: encType
    };
    if (fetcherKey) {
      !(fetcherRouteId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for useFetcher()") : 0 : void 0;
      router.fetch(fetcherKey, fetcherRouteId, action, opts);
    } else {
      router.navigate(action, _extends({}, opts, {
        replace: options.replace,
        fromRouteId: currentRouteId
      }));
    }
  }, [router, basename, fetcherKey, fetcherRouteId, currentRouteId]);
}
// v7: Eventually we should deprecate this entirely in favor of using the
// router method directly?
function useFormAction(action, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    basename
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_NavigationContext);
  let routeContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !routeContext ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFormAction must be used inside a RouteContext") : 0 : void 0;
  let [match] = routeContext.matches.slice(-1);
  // Shallow clone path so we can modify it below, otherwise we modify the
  // object referenced by useMemo inside useResolvedPath
  let path = _extends({}, (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useResolvedPath)(action ? action : ".", {
    relative
  }));
  // Previously we set the default action to ".". The problem with this is that
  // `useResolvedPath(".")` excludes search params and the hash of the resolved
  // URL. This is the intended behavior of when "." is specifically provided as
  // the form action, but inconsistent w/ browsers when the action is omitted.
  // https://github.com/remix-run/remix/issues/927
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  if (action == null) {
    // Safe to write to these directly here since if action was undefined, we
    // would have called useResolvedPath(".") which will never include a search
    // or hash
    path.search = location.search;
    path.hash = location.hash;
    // When grabbing search params from the URL, remove the automatically
    // inserted ?index param so we match the useResolvedPath search behavior
    // which would not include ?index
    if (match.route.index) {
      let params = new URLSearchParams(path.search);
      params.delete("index");
      path.search = params.toString() ? "?" + params.toString() : "";
    }
  }
  if ((!action || action === ".") && match.route.index) {
    path.search = path.search ? path.search.replace(/^\?/, "?index&") : "?index";
  }
  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the form action.  If this is a root navigation, then just use
  // the raw basename which allows the basename to have full control over the
  // presence of a trailing slash on root actions
  if (basename !== "/") {
    path.pathname = path.pathname === "/" ? basename : (0,react_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
  }
  return (0,react_router__WEBPACK_IMPORTED_MODULE_1__.createPath)(path);
}
function createFetcherForm(fetcherKey, routeId) {
  let FetcherForm = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.forwardRef((props, ref) => {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(FormImpl, _extends({}, props, {
      ref: ref,
      fetcherKey: fetcherKey,
      routeId: routeId
    }));
  });
  if (true) {
    FetcherForm.displayName = "fetcher.Form";
  }
  return FetcherForm;
}
let fetcherId = 0;
/**
 * Interacts with route loaders and actions without causing a navigation. Great
 * for any interaction that stays on the same page.
 */
function useFetcher() {
  var _route$matches;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseFetcher);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(react_router__WEBPACK_IMPORTED_MODULE_2__.UNSAFE_RouteContext);
  !route ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFetcher must be used inside a RouteContext") : 0 : void 0;
  let routeId = (_route$matches = route.matches[route.matches.length - 1]) == null ? void 0 : _route$matches.route.id;
  !(routeId != null) ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useFetcher can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  let [fetcherKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => String(++fetcherId));
  let [Form] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => {
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for fetcher.Form()") : 0 : void 0;
    return createFetcherForm(fetcherKey, routeId);
  });
  let [load] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => href => {
    !router ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No router available for fetcher.load()") : 0 : void 0;
    !routeId ?  true ? (0,react_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "No routeId available for fetcher.load()") : 0 : void 0;
    router.fetch(fetcherKey, routeId, href);
  });
  let submit = useSubmitImpl(fetcherKey, routeId);
  let fetcher = router.getFetcher(fetcherKey);
  let fetcherWithComponents = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => _extends({
    Form,
    submit,
    load
  }, fetcher), [fetcher, Form, submit, load]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    // Is this busted when the React team gets real weird and calls effects
    // twice on mount?  We really just need to garbage collect here when this
    // fetcher is no longer around.
    return () => {
      if (!router) {
        console.warn("No router available to clean up from useFetcher()");
        return;
      }
      router.deleteFetcher(fetcherKey);
    };
  }, [router, fetcherKey]);
  return fetcherWithComponents;
}
/**
 * Provides all fetchers currently on the page. Useful for layouts and parent
 * routes that need to provide pending/optimistic UI regarding the fetch.
 */
function useFetchers() {
  let state = useDataRouterState(DataRouterStateHook.UseFetchers);
  return [...state.fetchers.values()];
}
const SCROLL_RESTORATION_STORAGE_KEY = "react-router-scroll-positions";
let savedScrollPositions = {};
/**
 * When rendered inside a RouterProvider, will restore scroll positions on navigations
 */
function useScrollRestoration(_temp3) {
  let {
    getKey,
    storageKey
  } = _temp3 === void 0 ? {} : _temp3;
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseScrollRestoration);
  let {
    restoreScrollPosition,
    preventScrollReset
  } = useDataRouterState(DataRouterStateHook.UseScrollRestoration);
  let location = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useLocation)();
  let matches = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useMatches)();
  let navigation = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.useNavigation)();
  // Trigger manual scroll restoration while we're active
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);
  // Save positions on pagehide
  usePageHide(react__WEBPACK_IMPORTED_MODULE_0__.useCallback(() => {
    if (navigation.state === "idle") {
      let key = (getKey ? getKey(location, matches) : null) || location.key;
      savedScrollPositions[key] = window.scrollY;
    }
    sessionStorage.setItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY, JSON.stringify(savedScrollPositions));
    window.history.scrollRestoration = "auto";
  }, [storageKey, getKey, navigation.state, location, matches]));
  // Read in any saved scroll locations
  if (typeof document !== "undefined") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      try {
        let sessionPositions = sessionStorage.getItem(storageKey || SCROLL_RESTORATION_STORAGE_KEY);
        if (sessionPositions) {
          savedScrollPositions = JSON.parse(sessionPositions);
        }
      } catch (e) {
        // no-op, use default empty object
      }
    }, [storageKey]);
    // Enable scroll restoration in the router
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      let disableScrollRestoration = router == null ? void 0 : router.enableScrollRestoration(savedScrollPositions, () => window.scrollY, getKey);
      return () => disableScrollRestoration && disableScrollRestoration();
    }, [router, getKey]);
    // Restore scrolling when state.restoreScrollPosition changes
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => {
      // Explicit false means don't do anything (used for submissions)
      if (restoreScrollPosition === false) {
        return;
      }
      // been here before, scroll to it
      if (typeof restoreScrollPosition === "number") {
        window.scrollTo(0, restoreScrollPosition);
        return;
      }
      // try to scroll to the hash
      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1));
        if (el) {
          el.scrollIntoView();
          return;
        }
      }
      // Don't reset if this navigation opted out
      if (preventScrollReset === true) {
        return;
      }
      // otherwise go to the top on new locations
      window.scrollTo(0, 0);
    }, [location, restoreScrollPosition, preventScrollReset]);
  }
}
/**
 * Setup a callback to be fired on the window's `beforeunload` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function useBeforeUnload(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("beforeunload", callback, opts);
    return () => {
      window.removeEventListener("beforeunload", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Setup a callback to be fired on the window's `pagehide` event. This is
 * useful for saving some data to `window.localStorage` just before the page
 * refreshes.  This event is better supported than beforeunload across browsers.
 *
 * Note: The `callback` argument should be a function created with
 * `React.useCallback()`.
 */
function usePageHide(callback, options) {
  let {
    capture
  } = options || {};
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    let opts = capture != null ? {
      capture
    } : undefined;
    window.addEventListener("pagehide", callback, opts);
    return () => {
      window.removeEventListener("pagehide", callback, opts);
    };
  }, [callback, capture]);
}
/**
 * Wrapper around useBlocker to show a window.confirm prompt to users instead
 * of building a custom UI with useBlocker.
 *
 * Warning: This has *a lot of rough edges* and behaves very differently (and
 * very incorrectly in some cases) across browsers if user click addition
 * back/forward navigations while the confirm is open.  Use at your own risk.
 */
function usePrompt(_ref8) {
  let {
    when,
    message
  } = _ref8;
  let blocker = (0,react_router__WEBPACK_IMPORTED_MODULE_2__.unstable_useBlocker)(when);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked" && !when) {
      blocker.reset();
    }
  }, [blocker, when]);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    if (blocker.state === "blocked") {
      let proceed = window.confirm(message);
      if (proceed) {
        setTimeout(blocker.proceed, 0);
      } else {
        blocker.reset();
      }
    }
  }, [blocker, message]);
}
//#endregion


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/react-router/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/react-router/dist/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AbortedDeferredError": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError),
/* harmony export */   "Await": () => (/* binding */ Await),
/* harmony export */   "MemoryRouter": () => (/* binding */ MemoryRouter),
/* harmony export */   "Navigate": () => (/* binding */ Navigate),
/* harmony export */   "NavigationType": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action),
/* harmony export */   "Outlet": () => (/* binding */ Outlet),
/* harmony export */   "Route": () => (/* binding */ Route),
/* harmony export */   "Router": () => (/* binding */ Router),
/* harmony export */   "RouterProvider": () => (/* binding */ RouterProvider),
/* harmony export */   "Routes": () => (/* binding */ Routes),
/* harmony export */   "UNSAFE_DataRouterContext": () => (/* binding */ DataRouterContext),
/* harmony export */   "UNSAFE_DataRouterStateContext": () => (/* binding */ DataRouterStateContext),
/* harmony export */   "UNSAFE_LocationContext": () => (/* binding */ LocationContext),
/* harmony export */   "UNSAFE_NavigationContext": () => (/* binding */ NavigationContext),
/* harmony export */   "UNSAFE_RouteContext": () => (/* binding */ RouteContext),
/* harmony export */   "UNSAFE_mapRouteProperties": () => (/* binding */ mapRouteProperties),
/* harmony export */   "UNSAFE_useRouteId": () => (/* binding */ useRouteId),
/* harmony export */   "UNSAFE_useRoutesImpl": () => (/* binding */ useRoutesImpl),
/* harmony export */   "createMemoryRouter": () => (/* binding */ createMemoryRouter),
/* harmony export */   "createPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createPath),
/* harmony export */   "createRoutesFromChildren": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "createRoutesFromElements": () => (/* binding */ createRoutesFromChildren),
/* harmony export */   "defer": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.defer),
/* harmony export */   "generatePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.generatePath),
/* harmony export */   "isRouteErrorResponse": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse),
/* harmony export */   "json": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.json),
/* harmony export */   "matchPath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath),
/* harmony export */   "matchRoutes": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes),
/* harmony export */   "parsePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath),
/* harmony export */   "redirect": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.redirect),
/* harmony export */   "renderMatches": () => (/* binding */ renderMatches),
/* harmony export */   "resolvePath": () => (/* reexport safe */ _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolvePath),
/* harmony export */   "unstable_useBlocker": () => (/* binding */ useBlocker),
/* harmony export */   "useActionData": () => (/* binding */ useActionData),
/* harmony export */   "useAsyncError": () => (/* binding */ useAsyncError),
/* harmony export */   "useAsyncValue": () => (/* binding */ useAsyncValue),
/* harmony export */   "useHref": () => (/* binding */ useHref),
/* harmony export */   "useInRouterContext": () => (/* binding */ useInRouterContext),
/* harmony export */   "useLoaderData": () => (/* binding */ useLoaderData),
/* harmony export */   "useLocation": () => (/* binding */ useLocation),
/* harmony export */   "useMatch": () => (/* binding */ useMatch),
/* harmony export */   "useMatches": () => (/* binding */ useMatches),
/* harmony export */   "useNavigate": () => (/* binding */ useNavigate),
/* harmony export */   "useNavigation": () => (/* binding */ useNavigation),
/* harmony export */   "useNavigationType": () => (/* binding */ useNavigationType),
/* harmony export */   "useOutlet": () => (/* binding */ useOutlet),
/* harmony export */   "useOutletContext": () => (/* binding */ useOutletContext),
/* harmony export */   "useParams": () => (/* binding */ useParams),
/* harmony export */   "useResolvedPath": () => (/* binding */ useResolvedPath),
/* harmony export */   "useRevalidator": () => (/* binding */ useRevalidator),
/* harmony export */   "useRouteError": () => (/* binding */ useRouteError),
/* harmony export */   "useRouteLoaderData": () => (/* binding */ useRouteLoaderData),
/* harmony export */   "useRoutes": () => (/* binding */ useRoutes)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _remix_run_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @remix-run/router */ "./node_modules/@remix-run/router/dist/router.js");
/**
 * React Router v6.12.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */




function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

// Create react-specific types from the agnostic types in @remix-run/router to
// export from react-router
const DataRouterContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterContext.displayName = "DataRouter";
}
const DataRouterStateContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  DataRouterStateContext.displayName = "DataRouterState";
}
const AwaitContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  AwaitContext.displayName = "Await";
}

/**
 * A Navigator is a "location changer"; it's how you get to different locations.
 *
 * Every history instance conforms to the Navigator interface, but the
 * distinction is useful primarily when it comes to the low-level <Router> API
 * where both the location and a navigator must be provided separately in order
 * to avoid "tearing" that may occur in a suspense-enabled app if the action
 * and/or location were to be read directly from the history instance.
 */

const NavigationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  NavigationContext.displayName = "Navigation";
}
const LocationContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  LocationContext.displayName = "Location";
}
const RouteContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
if (true) {
  RouteContext.displayName = "Route";
}
const RouteErrorContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
if (true) {
  RouteErrorContext.displayName = "RouteError";
}

/**
 * Returns the full href for the given "to" value. This is useful for building
 * custom links that are also accessible and preserve right-click behavior.
 *
 * @see https://reactrouter.com/hooks/use-href
 */
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useHref() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;

  // If we're operating within a basename, prepend it to the pathname prior
  // to creating the href.  If this is a root navigation, then just use the raw
  // basename which allows the basename to have full control over the presence
  // of a trailing slash on root links
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, pathname]);
  }
  return navigator.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}

/**
 * Returns true if this component is a descendant of a <Router>.
 *
 * @see https://reactrouter.com/hooks/use-in-router-context
 */
function useInRouterContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext) != null;
}

/**
 * Returns the current location object, which represents the current URL in web
 * browsers.
 *
 * Note: If you're using this it may mean you're doing some of your own
 * "routing" in your app, and we'd like to know what your use case is. We may
 * be able to provide something higher-level to better suit your needs.
 *
 * @see https://reactrouter.com/hooks/use-location
 */
function useLocation() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useLocation() may be used only in the context of a <Router> component.") : 0 : void 0;
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).location;
}

/**
 * Returns the current navigation action which describes how the router came to
 * the current location, either by a pop, push, or replace on the history stack.
 *
 * @see https://reactrouter.com/hooks/use-navigation-type
 */
function useNavigationType() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(LocationContext).navigationType;
}

/**
 * Returns a PathMatch object if the given pattern matches the current URL.
 * This is useful for components that need to know "active" state, e.g.
 * <NavLink>.
 *
 * @see https://reactrouter.com/hooks/use-match
 */
function useMatch(pattern) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useMatch() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    pathname
  } = useLocation();
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchPath)(pattern, pathname), [pathname, pattern]);
}

/**
 * The interface for the navigate() function returned from useNavigate().
 */

const navigateEffectWarning = "You should call navigate() in a React.useEffect(), not when " + "your component is first rendered.";

// Mute warnings for calls to useNavigate in SSR environments
function useIsomorphicLayoutEffect(cb) {
  let isStatic = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static;
  if (!isStatic) {
    // We should be able to get rid of this once react 18.3 is released
    // See: https://github.com/facebook/react/pull/26395
    // eslint-disable-next-line react-hooks/rules-of-hooks
    react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(cb);
  }
}

/**
 * Returns an imperative method for changing the location. Used by <Link>s, but
 * may also be used by other elements to change the location.
 *
 * @see https://reactrouter.com/hooks/use-navigate
 */
function useNavigate() {
  let {
    isDataRoute
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useNavigate() may be used only in the context of a <Router> component.") : 0 : void 0;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  let {
    basename,
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our history listener yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      navigator.go(to);
      return;
    }
    let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");

    // If we're operating within a basename, prepend it to the pathname prior
    // to handing off to history (but only if we're not in a data router,
    // otherwise it'll prepend the basename inside of the router).
    // If this is a root navigation, then we navigate to the raw basename
    // which allows the basename to have full control over the presence of a
    // trailing slash on root links
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([basename, path.pathname]);
    }
    (!!options.replace ? navigator.replace : navigator.push)(path, options.state, options);
  }, [basename, navigator, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);

/**
 * Returns the context (if provided) for the child route at this level of the route
 * hierarchy.
 * @see https://reactrouter.com/hooks/use-outlet-context
 */
function useOutletContext() {
  return react__WEBPACK_IMPORTED_MODULE_0__.useContext(OutletContext);
}

/**
 * Returns the element for the child route at this level of the route
 * hierarchy. Used internally by <Outlet> to render child routes.
 *
 * @see https://reactrouter.com/hooks/use-outlet
 */
function useOutlet(context) {
  let outlet = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext).outlet;
  if (outlet) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}

/**
 * Returns an object of key/value pairs of the dynamic params from the current
 * URL that were matched by the route path.
 *
 * @see https://reactrouter.com/hooks/use-params
 */
function useParams() {
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}

/**
 * Resolves the pathname of the given `to` value against the current location.
 *
 * @see https://reactrouter.com/hooks/use-resolved-path
 */
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify((0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase));
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}

/**
 * Returns the element of the route that matched the current location, prepared
 * with the correct context to render the remainder of the route tree. Route
 * elements in the tree must render an <Outlet> to render their child route's
 * element.
 *
 * @see https://reactrouter.com/hooks/use-routes
 */
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}

// Internal implementation with accept optional param for RouterProvider usage
function useRoutesImpl(routes, locationArg, dataRouterState) {
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of the
  // router loaded. We can help them understand how to avoid that.
  "useRoutes() may be used only in the context of a <Router> component.") : 0 : void 0;
  let {
    navigator
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  let parentPathname = routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  let parentRoute = routeMatch && routeMatch.route;
  if (true) {
    // You won't get a warning about 2 different <Routes> under a <Route>
    // without a trailing *, but this is a best-effort warning anyway since we
    // cannot even give the warning unless they land at the parent route.
    //
    // Example:
    //
    // <Routes>
    //   {/* This route path MUST end with /* because otherwise
    //       it will never match /blog/post/123 */}
    //   <Route path="blog" element={<Blog />} />
    //   <Route path="blog/feed" element={<BlogFeed />} />
    // </Routes>
    //
    // function Blog() {
    //   return (
    //     <Routes>
    //       <Route path="post/:id" element={<Post />} />
    //     </Routes>
    //   );
    // }
    let parentPath = parentRoute && parentRoute.path || "";
    warningOnce(parentPathname, !parentRoute || parentPath.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ("\"" + parentPathname + "\" (under <Route path=\"" + parentPath + "\">) but the ") + "parent route path has no trailing \"*\". This means if you navigate " + "deeper, the parent won't match anymore and therefore the child " + "routes will never render.\n\n" + ("Please change the parent <Route path=\"" + parentPath + "\"> to <Route ") + ("path=\"" + (parentPath === "/" ? "*" : parentPath + "/*") + "\">."));
  }
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, " + "the location pathname must begin with the portion of the URL pathname that was " + ("matched by all parent routes. The current pathname base is \"" + parentPathnameBase + "\" ") + ("but pathname \"" + parsedLocationArg.pathname + "\" was given in the `location` prop.")) : 0 : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.matchRoutes)(routes, {
    pathname: remainingPathname
  });
  if (true) {
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(parentRoute || matches != null, "No routes matched location \"" + location.pathname + location.search + location.hash + "\" ") : 0;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(matches == null || matches[matches.length - 1].route.element !== undefined || matches[matches.length - 1].route.Component !== undefined, "Matched leaf route at location \"" + location.pathname + location.search + location.hash + "\" " + "does not have an element or Component. This means it will render an <Outlet /> with a " + "null value by default resulting in an \"empty\" page.") : 0;
  }
  let renderedMatches = _renderMatches(matches && matches.map(match => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathname).pathname : match.pathname]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.joinPaths)([parentPathnameBase,
    // Re-encode pathnames that were decoded inside matchRoutes
    navigator.encodeLocation ? navigator.encodeLocation(match.pathnameBase).pathname : match.pathnameBase])
  })), parentMatches, dataRouterState);

  // When a user passes in a `locationArg`, the associated routes need to
  // be wrapped in a new `LocationContext.Provider` in order for `useLocation`
  // to use the scoped location instead of the global location.
  if (locationArg && renderedMatches) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
      value: {
        location: _extends({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.isRouteErrorResponse)(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let codeStyles = {
    padding: "2px 4px",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  if (true) {
    console.error("Error handled by React Router default ErrorBoundary:", error);
    devInfo = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "\uD83D\uDCBF Hey developer \uD83D\uDC4B"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "ErrorBoundary"), " or", " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("code", {
      style: codeStyles
    }, "errorElement"), " prop on your route."));
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h2", null, "Unexpected Application Error!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error: error
    };
  }
  static getDerivedStateFromProps(props, state) {
    // When we get into an error state, the user will likely click "back" to the
    // previous page that didn't have an error. Because this wraps the entire
    // application, that will have no effect--the error page continues to display.
    // This gives us a mechanism to recover from the error when the location changes.
    //
    // Whether we're in an error state or not, we update the location in state
    // so that when we are in an error state, it gets reset when a new location
    // comes in and the user recovers from the error.
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }

    // If we're not changing locations, preserve the location but still surface
    // any new errors that may come through. We retain the existing error, we do
    // this because the error provided from the app state may be cleared without
    // the location changing.
    return {
      error: props.error || state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);

  // Track how deep we got in our render pass to emulate SSR componentDidCatch
  // in a DataStaticRouter
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
      // Don't bail if we have data router errors so we can render them in the
      // boundary.  Use the pre-matched (or shimmed) matches
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;

  // If we have data errors, trim matches to the highest error boundary
  let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex(m => m.route.id && (errors == null ? void 0 : errors[m.route.id]));
    !(errorIndex >= 0) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "Could not find a matching route for errors on route IDs: " + Object.keys(errors).join(",")) : 0 : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null;
    // Only data routers handle errors
    let errorElement = null;
    if (dataRouterState) {
      errorElement = match.route.errorElement || defaultErrorElement;
    }
    let matches = parentMatches.concat(renderedMatches.slice(0, index + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (match.route.Component) {
        // Note: This is a de-optimized path since React won't re-use the
        // ReactElement since it's identity changes with each new
        // React.createElement call.  We keep this so folks can use
        // `<Route Component={...}>` in `<Routes>` but generally `Component`
        // usage is only advised in `RouterProvider` when we can convert it to
        // `element` ahead of time.
        children = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderedRoute, {
        match: match,
        routeContext: {
          outlet,
          matches,
          isDataRoute: dataRouterState != null
        },
        children: children
      });
    };
    // Only wrap in an error boundary within data router usages when we have an
    // ErrorBoundary/errorElement on this route.  Otherwise let it bubble up to
    // an ancestor ErrorBoundary/errorElement
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index === 0) ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error: error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook;
(function (DataRouterHook) {
  DataRouterHook["UseBlocker"] = "useBlocker";
  DataRouterHook["UseRevalidator"] = "useRevalidator";
  DataRouterHook["UseNavigateStable"] = "useNavigate";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function (DataRouterStateHook) {
  DataRouterStateHook["UseBlocker"] = "useBlocker";
  DataRouterStateHook["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook["UseActionData"] = "useActionData";
  DataRouterStateHook["UseRouteError"] = "useRouteError";
  DataRouterStateHook["UseNavigation"] = "useNavigation";
  DataRouterStateHook["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook["UseMatches"] = "useMatches";
  DataRouterStateHook["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook["UseRouteId"] = "useRouteId";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function getDataRouterConsoleError(hookName) {
  return hookName + " must be used within a data router.  See https://reactrouter.com/routers/picking-a-router.";
}
function useDataRouterContext(hookName) {
  let ctx = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterContext);
  !ctx ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = react__WEBPACK_IMPORTED_MODULE_0__.useContext(DataRouterStateContext);
  !state ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, getDataRouterConsoleError(hookName)) : 0 : void 0;
  return route;
}

// Internal version with hookName-aware debugging
function useCurrentRouteId(hookName) {
  let route = useRouteContext(hookName);
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, hookName + " can only be used on routes that contain a unique \"id\"") : 0 : void 0;
  return thisRoute.route.id;
}

/**
 * Returns the ID for the nearest contextual route
 */
function useRouteId() {
  return useCurrentRouteId(DataRouterStateHook.UseRouteId);
}

/**
 * Returns the current navigation, defaulting to an "idle" navigation when
 * no navigation is in progress
 */
function useNavigation() {
  let state = useDataRouterState(DataRouterStateHook.UseNavigation);
  return state.navigation;
}

/**
 * Returns a revalidate function for manually triggering revalidation, as well
 * as the current state of any manual revalidations
 */
function useRevalidator() {
  let dataRouterContext = useDataRouterContext(DataRouterHook.UseRevalidator);
  let state = useDataRouterState(DataRouterStateHook.UseRevalidator);
  return {
    revalidate: dataRouterContext.router.revalidate,
    state: state.revalidation
  };
}

/**
 * Returns the active route matches, useful for accessing loaderData for
 * parent/child routes or the route "handle" property
 */
function useMatches() {
  let {
    matches,
    loaderData
  } = useDataRouterState(DataRouterStateHook.UseMatches);
  return react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => matches.map(match => {
    let {
      pathname,
      params
    } = match;
    // Note: This structure matches that created by createUseMatchesMatch
    // in the @remix-run/router , so if you change this please also change
    // that :)  Eventually we'll DRY this up
    return {
      id: match.route.id,
      pathname,
      params,
      data: loaderData[match.route.id],
      handle: match.route.handle
    };
  }), [matches, loaderData]);
}

/**
 * Returns the loader data for the nearest ancestor Route loader
 */
function useLoaderData() {
  let state = useDataRouterState(DataRouterStateHook.UseLoaderData);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseLoaderData);
  if (state.errors && state.errors[routeId] != null) {
    console.error("You cannot `useLoaderData` in an errorElement (routeId: " + routeId + ")");
    return undefined;
  }
  return state.loaderData[routeId];
}

/**
 * Returns the loaderData for the given routeId
 */
function useRouteLoaderData(routeId) {
  let state = useDataRouterState(DataRouterStateHook.UseRouteLoaderData);
  return state.loaderData[routeId];
}

/**
 * Returns the action data for the nearest ancestor Route action
 */
function useActionData() {
  let state = useDataRouterState(DataRouterStateHook.UseActionData);
  let route = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  !route ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "useActionData must be used inside a RouteContext") : 0 : void 0;
  return Object.values((state == null ? void 0 : state.actionData) || {})[0];
}

/**
 * Returns the nearest ancestor Route error, which could be a loader/action
 * error or a render error.  This is intended to be called from your
 * ErrorBoundary/errorElement to display a proper error message.
 */
function useRouteError() {
  var _state$errors;
  let error = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook.UseRouteError);

  // If this was a render error, we put it in a RouteError context inside
  // of RenderErrorBoundary
  if (error) {
    return error;
  }

  // Otherwise look for errors from our data router state
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}

/**
 * Returns the happy-path data from the nearest ancestor <Await /> value
 */
function useAsyncValue() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._data;
}

/**
 * Returns the error from the nearest ancestor <Await /> value
 */
function useAsyncError() {
  let value = react__WEBPACK_IMPORTED_MODULE_0__.useContext(AwaitContext);
  return value == null ? void 0 : value._error;
}
let blockerId = 0;

/**
 * Allow the application to block navigations within the SPA and present the
 * user a confirmation dialog to confirm the navigation.  Mostly used to avoid
 * using half-filled form data.  This does not handle hard-reloads or
 * cross-origin navigations.
 */
function useBlocker(shouldBlock) {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseBlocker);
  let state = useDataRouterState(DataRouterStateHook.UseBlocker);
  let [blockerKey] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => String(++blockerId));
  let blockerFunction = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(args => {
    return typeof shouldBlock === "function" ? !!shouldBlock(args) : !!shouldBlock;
  }, [shouldBlock]);
  let blocker = router.getBlocker(blockerKey, blockerFunction);

  // Cleanup on unmount
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => () => router.deleteBlocker(blockerKey), [router, blockerKey]);

  // Prefer the blocker from state since DataRouterContext is memoized so this
  // ensures we update on blocker state updates
  return state.blockers.get(blockerKey) || blocker;
}

/**
 * Stable version of useNavigate that is used when we are in the context of
 * a RouterProvider.
 */
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook.UseNavigateStable);
  let id = useCurrentRouteId(DataRouterStateHook.UseNavigateStable);
  let activeRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(function (to, options) {
    if (options === void 0) {
      options = {};
    }
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(activeRef.current, navigateEffectWarning) : 0;

    // Short circuit here since if this happens on first render the navigate
    // is useless because we haven't wired up our router subscriber yet
    if (!activeRef.current) return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends({
        fromRouteId: id
      }, options));
    }
  }, [router, id]);
  return navigate;
}
const alreadyWarned = {};
function warningOnce(key, cond, message) {
  if (!cond && !alreadyWarned[key]) {
    alreadyWarned[key] = true;
     true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, message) : 0;
  }
}

// Webpack + React 17 fails to compile on the usage of `React.startTransition` or
// `React["startTransition"]` even if it's behind a feature detection of
// `"startTransition" in React`. Moving this to a constant avoids the issue :/
const START_TRANSITION = "startTransition";

/**
 * Given a Remix Router instance, render the appropriate UI
 */
function RouterProvider(_ref) {
  let {
    fallbackElement,
    router
  } = _ref;
  // Need to use a layout effect here so we are subscribed early enough to
  // pick up on any render-driven redirects/navigations (useEffect/<Navigate>)
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState(router.state);
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    START_TRANSITION in react__WEBPACK_IMPORTED_MODULE_0__ ? react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION](() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => router.subscribe(setState), [router, setState]);
  let navigator = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    return {
      createHref: router.createHref,
      encodeLocation: router.encodeLocation,
      go: n => router.navigate(n),
      push: (to, state, opts) => router.navigate(to, {
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      }),
      replace: (to, state, opts) => router.navigate(to, {
        replace: true,
        state,
        preventScrollReset: opts == null ? void 0 : opts.preventScrollReset
      })
    };
  }, [router]);
  let basename = router.basename || "/";
  let dataRouterContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    router,
    navigator,
    static: false,
    basename
  }), [router, navigator, basename]);

  // The fragment and {null} here are important!  We need them to keep React 18's
  // useId happy when we are server-rendering since we may have a <script> here
  // containing the hydrated server-side staticContext (from StaticRouterProvider).
  // useId relies on the component tree structure to generate deterministic id's
  // so we need to ensure it remains the same on the client even though
  // we don't need the <script> tag
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterContext.Provider, {
    value: dataRouterContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRouterStateContext.Provider, {
    value: state
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    location: state.location,
    navigationType: state.historyAction,
    navigator: navigator
  }, state.initialized ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(DataRoutes, {
    routes: router.routes,
    state: state
  }) : fallbackElement))), null);
}
function DataRoutes(_ref2) {
  let {
    routes,
    state
  } = _ref2;
  return useRoutesImpl(routes, undefined, state);
}
/**
 * A <Router> that stores all entries in memory.
 *
 * @see https://reactrouter.com/router-components/memory-router
 */
function MemoryRouter(_ref3) {
  let {
    basename,
    children,
    initialEntries,
    initialIndex
  } = _ref3;
  let historyRef = react__WEBPACK_IMPORTED_MODULE_0__.useRef();
  if (historyRef.current == null) {
    historyRef.current = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries,
      initialIndex,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = react__WEBPACK_IMPORTED_MODULE_0__.useState({
    action: history.action,
    location: history.location
  });
  let setState = react__WEBPACK_IMPORTED_MODULE_0__.useCallback(newState => {
    START_TRANSITION in react__WEBPACK_IMPORTED_MODULE_0__ ? react__WEBPACK_IMPORTED_MODULE_0__[START_TRANSITION](() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl]);
  react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(Router, {
    basename: basename,
    children: children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
/**
 * Changes the current location.
 *
 * Note: This API is mostly useful in React.Component subclasses that are not
 * able to use hooks. In functional components, we recommend you use the
 * `useNavigate` hook instead.
 *
 * @see https://reactrouter.com/components/navigate
 */
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, // TODO: This error is probably because they somehow have 2 versions of
  // the router loaded. We can help them understand how to avoid that.
  "<Navigate> may be used only in the context of a <Router> component.") : 0 : void 0;
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(!react__WEBPACK_IMPORTED_MODULE_0__.useContext(NavigationContext).static, "<Navigate> must not be used on the initial render in a <StaticRouter>. " + "This is a no-op, but you should modify your code so the <Navigate> is " + "only ever rendered in response to some user interaction or state change.") : 0;
  let {
    matches
  } = react__WEBPACK_IMPORTED_MODULE_0__.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();

  // Resolve the path outside of the effect so that when effects run twice in
  // StrictMode they navigate to the same place
  let path = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.resolveTo)(to, (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_getPathContributingMatches)(matches).map(match => match.pathnameBase), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
/**
 * Renders the child route's element, if there is one.
 *
 * @see https://reactrouter.com/components/outlet
 */
function Outlet(props) {
  return useOutlet(props.context);
}
/**
 * Declares an element that should be rendered at a certain URL path.
 *
 * @see https://reactrouter.com/components/route
 */
function Route(_props) {
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "A <Route> is only ever to be used as the child of <Routes> element, " + "never rendered directly. Please wrap your <Route> in a <Routes>.") : 0 ;
}
/**
 * Provides location context for the rest of the app.
 *
 * Note: You usually won't render a <Router> directly. Instead, you'll render a
 * router that is more specific to your environment such as a <BrowserRouter>
 * in web browsers or a <StaticRouter> for server rendering.
 *
 * @see https://reactrouter.com/router-components/router
 */
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.Action.Pop,
    navigator,
    static: staticProp = false
  } = _ref5;
  !!useInRouterContext() ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "You cannot render a <Router> inside another <Router>." + " You should never have more than one in your app.") : 0 : void 0;

  // Preserve trailing slashes on basename, so we can let the user control
  // the enforcement of trailing slashes throughout the app
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => ({
    basename,
    navigator,
    static: staticProp
  }), [basename, navigator, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.parsePath)(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = react__WEBPACK_IMPORTED_MODULE_0__.useMemo(() => {
    let trailingPathname = (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.stripBasename)(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
   true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(locationContext != null, "<Router basename=\"" + basename + "\"> is not able to match the URL " + ("\"" + pathname + search + hash + "\" because it does not start with the ") + "basename, so the <Router> won't render anything.") : 0;
  if (locationContext == null) {
    return null;
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(LocationContext.Provider, {
    children: children,
    value: locationContext
  }));
}
/**
 * A container for a nested tree of <Route> elements that renders the branch
 * that best matches the current location.
 *
 * @see https://reactrouter.com/components/routes
 */
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
/**
 * Component to use for rendering lazily loaded data from returning defer()
 * in a loader function
 */
function Await(_ref7) {
  let {
    children,
    errorElement,
    resolve
  } = _ref7;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitErrorBoundary, {
    resolve: resolve,
    errorElement: errorElement
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(ResolveAwait, null, children));
}
var AwaitRenderStatus;
(function (AwaitRenderStatus) {
  AwaitRenderStatus[AwaitRenderStatus["pending"] = 0] = "pending";
  AwaitRenderStatus[AwaitRenderStatus["success"] = 1] = "success";
  AwaitRenderStatus[AwaitRenderStatus["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
const neverSettledPromise = new Promise(() => {});
class AwaitErrorBoundary extends react__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("<Await> caught the following error during render", error, errorInfo);
  }
  render() {
    let {
      children,
      errorElement,
      resolve
    } = this.props;
    let promise = null;
    let status = AwaitRenderStatus.pending;
    if (!(resolve instanceof Promise)) {
      // Didn't get a promise - provide as a resolved promise
      status = AwaitRenderStatus.success;
      promise = Promise.resolve();
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_data", {
        get: () => resolve
      });
    } else if (this.state.error) {
      // Caught a render error, provide it as a rejected promise
      status = AwaitRenderStatus.error;
      let renderError = this.state.error;
      promise = Promise.reject().catch(() => {}); // Avoid unhandled rejection warnings
      Object.defineProperty(promise, "_tracked", {
        get: () => true
      });
      Object.defineProperty(promise, "_error", {
        get: () => renderError
      });
    } else if (resolve._tracked) {
      // Already tracked promise - check contents
      promise = resolve;
      status = promise._error !== undefined ? AwaitRenderStatus.error : promise._data !== undefined ? AwaitRenderStatus.success : AwaitRenderStatus.pending;
    } else {
      // Raw (untracked) promise - track it
      status = AwaitRenderStatus.pending;
      Object.defineProperty(resolve, "_tracked", {
        get: () => true
      });
      promise = resolve.then(data => Object.defineProperty(resolve, "_data", {
        get: () => data
      }), error => Object.defineProperty(resolve, "_error", {
        get: () => error
      }));
    }
    if (status === AwaitRenderStatus.error && promise._error instanceof _remix_run_router__WEBPACK_IMPORTED_MODULE_1__.AbortedDeferredError) {
      // Freeze the UI by throwing a never resolved promise
      throw neverSettledPromise;
    }
    if (status === AwaitRenderStatus.error && !errorElement) {
      // No errorElement, throw to the nearest route-level error boundary
      throw promise._error;
    }
    if (status === AwaitRenderStatus.error) {
      // Render via our errorElement
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: errorElement
      });
    }
    if (status === AwaitRenderStatus.success) {
      // Render children with resolved value
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(AwaitContext.Provider, {
        value: promise,
        children: children
      });
    }

    // Throw to the suspense boundary
    throw promise;
  }
}

/**
 * @private
 * Indirection to leverage useAsyncValue for a render-prop API on <Await>
 */
function ResolveAwait(_ref8) {
  let {
    children
  } = _ref8;
  let data = useAsyncValue();
  let toRender = typeof children === "function" ? children(data) : children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, toRender);
}

///////////////////////////////////////////////////////////////////////////////
// UTILS
///////////////////////////////////////////////////////////////////////////////

/**
 * Creates a route config from a React "children" object, which is usually
 * either a `<Route>` element or an array of them. Used internally by
 * `<Routes>` to create a route config from its children.
 *
 * @see https://reactrouter.com/utils/create-routes-from-children
 */
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  react__WEBPACK_IMPORTED_MODULE_0__.Children.forEach(children, (element, index) => {
    if (! /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.isValidElement(element)) {
      // Ignore non-elements. This allows people to more easily inline
      // conditionals in their route config.
      return;
    }
    let treePath = [...parentPath, index];
    if (element.type === react__WEBPACK_IMPORTED_MODULE_0__.Fragment) {
      // Transparently support React.Fragment and its children.
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "[" + (typeof element.type === "string" ? element.type : element.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : 0 : void 0;
    !(!element.props.index || !element.props.children) ?  true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_invariant)(false, "An index route cannot have child routes.") : 0 : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}

/**
 * Renders the result of `matchRoutes()` into a React element.
 */
function renderMatches(matches) {
  return _renderMatches(matches);
}

function mapRouteProperties(route) {
  let updates = {
    // Note: this check also occurs in createRoutesFromChildren so update
    // there if you change this -- please and thank you!
    hasErrorBoundary: route.ErrorBoundary != null || route.errorElement != null
  };
  if (route.Component) {
    if (true) {
      if (route.element) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `Component` and `element` on your route - " + "`Component` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.Component),
      Component: undefined
    });
  }
  if (route.ErrorBoundary) {
    if (true) {
      if (route.errorElement) {
         true ? (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.UNSAFE_warning)(false, "You should not include both `ErrorBoundary` and `errorElement` on your route - " + "`ErrorBoundary` will be used.") : 0;
      }
    }
    Object.assign(updates, {
      errorElement: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(route.ErrorBoundary),
      ErrorBoundary: undefined
    });
  }
  return updates;
}
function createMemoryRouter(routes, opts) {
  return (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createRouter)({
    basename: opts == null ? void 0 : opts.basename,
    future: _extends({}, opts == null ? void 0 : opts.future, {
      v7_prependBasename: true
    }),
    history: (0,_remix_run_router__WEBPACK_IMPORTED_MODULE_1__.createMemoryHistory)({
      initialEntries: opts == null ? void 0 : opts.initialEntries,
      initialIndex: opts == null ? void 0 : opts.initialIndex
    }),
    hydrationData: opts == null ? void 0 : opts.hydrationData,
    routes,
    mapRouteProperties
  }).initialize();
}


//# sourceMappingURL=index.js.map


/***/ }),

/***/ "./node_modules/typewriter-effect/dist/react.js":
/*!******************************************************!*\
  !*** ./node_modules/typewriter-effect/dist/react.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(/*! react */ "react")):0}("undefined"!=typeof self?self:this,(e=>(()=>{var t={7403:(e,t,r)=>{"use strict";r.d(t,{default:()=>T});var n=r(4087),o=r.n(n);const a=function(e){return new RegExp(/<[a-z][\s\S]*>/i).test(e)},i=function(e){var t=document.createElement("div");return t.innerHTML=e,t.childNodes},s=function(e,t){return Math.floor(Math.random()*(t-e+1))+e};var u="TYPE_CHARACTER",c="REMOVE_CHARACTER",p="REMOVE_ALL",l="REMOVE_LAST_VISIBLE_NODE",f="PAUSE_FOR",v="CALL_FUNCTION",d="ADD_HTML_TAG_ELEMENT",h="CHANGE_DELETE_SPEED",y="CHANGE_DELAY",b="CHANGE_CURSOR",_="PASTE_STRING",m="HTML_TAG";function g(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function w(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?g(Object(r),!0).forEach((function(t){O(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):g(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function x(e){return function(e){if(Array.isArray(e))return j(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return j(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?j(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function j(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function E(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function O(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}const T=function(){function e(t,r){var g=this;if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,"state",{cursorAnimation:null,lastFrameTime:null,pauseUntil:null,eventQueue:[],eventLoop:null,eventLoopPaused:!1,reverseCalledEvents:[],calledEvents:[],visibleNodes:[],initialOptions:null,elements:{container:null,wrapper:document.createElement("span"),cursor:document.createElement("span")}}),O(this,"options",{strings:null,cursor:"|",delay:"natural",pauseFor:1500,deleteSpeed:"natural",loop:!1,autoStart:!1,devMode:!1,skipAddStyles:!1,wrapperClassName:"Typewriter__wrapper",cursorClassName:"Typewriter__cursor",stringSplitter:null,onCreateTextNode:null,onRemoveNode:null}),O(this,"setupWrapperElement",(function(){g.state.elements.container&&(g.state.elements.wrapper.className=g.options.wrapperClassName,g.state.elements.cursor.className=g.options.cursorClassName,g.state.elements.cursor.innerHTML=g.options.cursor,g.state.elements.container.innerHTML="",g.state.elements.container.appendChild(g.state.elements.wrapper),g.state.elements.container.appendChild(g.state.elements.cursor))})),O(this,"start",(function(){return g.state.eventLoopPaused=!1,g.runEventLoop(),g})),O(this,"pause",(function(){return g.state.eventLoopPaused=!0,g})),O(this,"stop",(function(){return g.state.eventLoop&&((0,n.cancel)(g.state.eventLoop),g.state.eventLoop=null),g})),O(this,"pauseFor",(function(e){return g.addEventToQueue(f,{ms:e}),g})),O(this,"typeOutAllStrings",(function(){return"string"==typeof g.options.strings?(g.typeString(g.options.strings).pauseFor(g.options.pauseFor),g):(g.options.strings.forEach((function(e){g.typeString(e).pauseFor(g.options.pauseFor).deleteAll(g.options.deleteSpeed)})),g)})),O(this,"typeString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(a(e))return g.typeOutHTMLString(e,t);if(e){var r=g.options||{},n=r.stringSplitter,o="function"==typeof n?n(e):e.split("");g.typeCharacters(o,t)}return g})),O(this,"pasteString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return a(e)?g.typeOutHTMLString(e,t,!0):(e&&g.addEventToQueue(_,{character:e,node:t}),g)})),O(this,"typeOutHTMLString",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=arguments.length>2?arguments[2]:void 0,n=i(e);if(n.length>0)for(var o=0;o<n.length;o++){var a=n[o],s=a.innerHTML;a&&3!==a.nodeType?(a.innerHTML="",g.addEventToQueue(d,{node:a,parentNode:t}),r?g.pasteString(s,a):g.typeString(s,a)):a.textContent&&(r?g.pasteString(a.textContent,t):g.typeString(a.textContent,t))}return g})),O(this,"deleteAll",(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"natural";return g.addEventToQueue(p,{speed:e}),g})),O(this,"changeDeleteSpeed",(function(e){if(!e)throw new Error("Must provide new delete speed");return g.addEventToQueue(h,{speed:e}),g})),O(this,"changeDelay",(function(e){if(!e)throw new Error("Must provide new delay");return g.addEventToQueue(y,{delay:e}),g})),O(this,"changeCursor",(function(e){if(!e)throw new Error("Must provide new cursor");return g.addEventToQueue(b,{cursor:e}),g})),O(this,"deleteChars",(function(e){if(!e)throw new Error("Must provide amount of characters to delete");for(var t=0;t<e;t++)g.addEventToQueue(c);return g})),O(this,"callFunction",(function(e,t){if(!e||"function"!=typeof e)throw new Error("Callbak must be a function");return g.addEventToQueue(v,{cb:e,thisArg:t}),g})),O(this,"typeCharacters",(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(e){g.addEventToQueue(u,{character:e,node:t})})),g})),O(this,"removeCharacters",(function(e){if(!e||!Array.isArray(e))throw new Error("Characters must be an array");return e.forEach((function(){g.addEventToQueue(c)})),g})),O(this,"addEventToQueue",(function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return g.addEventToStateProperty(e,t,r,"eventQueue")})),O(this,"addReverseCalledEvent",(function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=g.options.loop;return n?g.addEventToStateProperty(e,t,r,"reverseCalledEvents"):g})),O(this,"addEventToStateProperty",(function(e,t){var r=arguments.length>2&&void 0!==arguments[2]&&arguments[2],n=arguments.length>3?arguments[3]:void 0,o={eventName:e,eventArgs:t||{}};return g.state[n]=r?[o].concat(x(g.state[n])):[].concat(x(g.state[n]),[o]),g})),O(this,"runEventLoop",(function(){g.state.lastFrameTime||(g.state.lastFrameTime=Date.now());var e=Date.now(),t=e-g.state.lastFrameTime;if(!g.state.eventQueue.length){if(!g.options.loop)return;g.state.eventQueue=x(g.state.calledEvents),g.state.calledEvents=[],g.options=w({},g.state.initialOptions)}if(g.state.eventLoop=o()(g.runEventLoop),!g.state.eventLoopPaused){if(g.state.pauseUntil){if(e<g.state.pauseUntil)return;g.state.pauseUntil=null}var r,n=x(g.state.eventQueue),a=n.shift();if(!(t<=(r=a.eventName===l||a.eventName===c?"natural"===g.options.deleteSpeed?s(40,80):g.options.deleteSpeed:"natural"===g.options.delay?s(120,160):g.options.delay))){var i=a.eventName,j=a.eventArgs;switch(g.logInDevMode({currentEvent:a,state:g.state,delay:r}),i){case _:case u:var E=j.character,O=j.node,T=document.createTextNode(E),A=T;g.options.onCreateTextNode&&"function"==typeof g.options.onCreateTextNode&&(A=g.options.onCreateTextNode(E,T)),A&&(O?O.appendChild(A):g.state.elements.wrapper.appendChild(A)),g.state.visibleNodes=[].concat(x(g.state.visibleNodes),[{type:"TEXT_NODE",character:E,node:A}]);break;case c:n.unshift({eventName:l,eventArgs:{removingCharacterNode:!0}});break;case f:var S=a.eventArgs.ms;g.state.pauseUntil=Date.now()+parseInt(S);break;case v:var N=a.eventArgs,C=N.cb,P=N.thisArg;C.call(P,{elements:g.state.elements});break;case d:var L=a.eventArgs,k=L.node,D=L.parentNode;D?D.appendChild(k):g.state.elements.wrapper.appendChild(k),g.state.visibleNodes=[].concat(x(g.state.visibleNodes),[{type:m,node:k,parentNode:D||g.state.elements.wrapper}]);break;case p:var M=g.state.visibleNodes,R=j.speed,F=[];R&&F.push({eventName:h,eventArgs:{speed:R,temp:!0}});for(var z=0,Q=M.length;z<Q;z++)F.push({eventName:l,eventArgs:{removingCharacterNode:!1}});R&&F.push({eventName:h,eventArgs:{speed:g.options.deleteSpeed,temp:!0}}),n.unshift.apply(n,F);break;case l:var I=a.eventArgs.removingCharacterNode;if(g.state.visibleNodes.length){var U=g.state.visibleNodes.pop(),H=U.type,q=U.node,B=U.character;g.options.onRemoveNode&&"function"==typeof g.options.onRemoveNode&&g.options.onRemoveNode({node:q,character:B}),q&&q.parentNode.removeChild(q),H===m&&I&&n.unshift({eventName:l,eventArgs:{}})}break;case h:g.options.deleteSpeed=a.eventArgs.speed;break;case y:g.options.delay=a.eventArgs.delay;break;case b:g.options.cursor=a.eventArgs.cursor,g.state.elements.cursor.innerHTML=a.eventArgs.cursor}g.options.loop&&(a.eventName===l||a.eventArgs&&a.eventArgs.temp||(g.state.calledEvents=[].concat(x(g.state.calledEvents),[a]))),g.state.eventQueue=n,g.state.lastFrameTime=e}}})),t)if("string"==typeof t){var j=document.querySelector(t);if(!j)throw new Error("Could not find container element");this.state.elements.container=j}else this.state.elements.container=t;r&&(this.options=w(w({},this.options),r)),this.state.initialOptions=w({},this.options),this.init()}var t,r;return t=e,(r=[{key:"init",value:function(){var e,t;this.setupWrapperElement(),this.addEventToQueue(b,{cursor:this.options.cursor},!0),this.addEventToQueue(p,null,!0),!window||window.___TYPEWRITER_JS_STYLES_ADDED___||this.options.skipAddStyles||(e=".Typewriter__cursor{-webkit-animation:Typewriter-cursor 1s infinite;animation:Typewriter-cursor 1s infinite;margin-left:1px}@-webkit-keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}@keyframes Typewriter-cursor{0%{opacity:0}50%{opacity:1}100%{opacity:0}}",(t=document.createElement("style")).appendChild(document.createTextNode(e)),document.head.appendChild(t),window.___TYPEWRITER_JS_STYLES_ADDED___=!0),!0===this.options.autoStart&&this.options.strings&&this.typeOutAllStrings().start()}},{key:"logInDevMode",value:function(e){this.options.devMode&&console.log(e)}}])&&E(t.prototype,r),Object.defineProperty(t,"prototype",{writable:!1}),e}()},8552:(e,t,r)=>{var n=r(852)(r(5639),"DataView");e.exports=n},1989:(e,t,r)=>{var n=r(1789),o=r(401),a=r(7667),i=r(1327),s=r(1866);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},8407:(e,t,r)=>{var n=r(7040),o=r(4125),a=r(2117),i=r(7518),s=r(4705);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},7071:(e,t,r)=>{var n=r(852)(r(5639),"Map");e.exports=n},3369:(e,t,r)=>{var n=r(4785),o=r(1285),a=r(6e3),i=r(9916),s=r(5265);function u(e){var t=-1,r=null==e?0:e.length;for(this.clear();++t<r;){var n=e[t];this.set(n[0],n[1])}}u.prototype.clear=n,u.prototype.delete=o,u.prototype.get=a,u.prototype.has=i,u.prototype.set=s,e.exports=u},3818:(e,t,r)=>{var n=r(852)(r(5639),"Promise");e.exports=n},8525:(e,t,r)=>{var n=r(852)(r(5639),"Set");e.exports=n},8668:(e,t,r)=>{var n=r(3369),o=r(619),a=r(2385);function i(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new n;++t<r;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=a,e.exports=i},6384:(e,t,r)=>{var n=r(8407),o=r(7465),a=r(3779),i=r(7599),s=r(4758),u=r(4309);function c(e){var t=this.__data__=new n(e);this.size=t.size}c.prototype.clear=o,c.prototype.delete=a,c.prototype.get=i,c.prototype.has=s,c.prototype.set=u,e.exports=c},2705:(e,t,r)=>{var n=r(5639).Symbol;e.exports=n},1149:(e,t,r)=>{var n=r(5639).Uint8Array;e.exports=n},577:(e,t,r)=>{var n=r(852)(r(5639),"WeakMap");e.exports=n},4963:e=>{e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length,o=0,a=[];++r<n;){var i=e[r];t(i,r,e)&&(a[o++]=i)}return a}},4636:(e,t,r)=>{var n=r(2545),o=r(5694),a=r(1469),i=r(4144),s=r(5776),u=r(6719),c=Object.prototype.hasOwnProperty;e.exports=function(e,t){var r=a(e),p=!r&&o(e),l=!r&&!p&&i(e),f=!r&&!p&&!l&&u(e),v=r||p||l||f,d=v?n(e.length,String):[],h=d.length;for(var y in e)!t&&!c.call(e,y)||v&&("length"==y||l&&("offset"==y||"parent"==y)||f&&("buffer"==y||"byteLength"==y||"byteOffset"==y)||s(y,h))||d.push(y);return d}},2488:e=>{e.exports=function(e,t){for(var r=-1,n=t.length,o=e.length;++r<n;)e[o+r]=t[r];return e}},2908:e=>{e.exports=function(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1}},8470:(e,t,r)=>{var n=r(7813);e.exports=function(e,t){for(var r=e.length;r--;)if(n(e[r][0],t))return r;return-1}},8866:(e,t,r)=>{var n=r(2488),o=r(1469);e.exports=function(e,t,r){var a=t(e);return o(e)?a:n(a,r(e))}},4239:(e,t,r)=>{var n=r(2705),o=r(9607),a=r(2333),i=n?n.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":i&&i in Object(e)?o(e):a(e)}},9454:(e,t,r)=>{var n=r(4239),o=r(7005);e.exports=function(e){return o(e)&&"[object Arguments]"==n(e)}},939:(e,t,r)=>{var n=r(2492),o=r(7005);e.exports=function e(t,r,a,i,s){return t===r||(null==t||null==r||!o(t)&&!o(r)?t!=t&&r!=r:n(t,r,a,i,e,s))}},2492:(e,t,r)=>{var n=r(6384),o=r(7114),a=r(8351),i=r(6096),s=r(4160),u=r(1469),c=r(4144),p=r(6719),l="[object Arguments]",f="[object Array]",v="[object Object]",d=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,h,y,b){var _=u(e),m=u(t),g=_?f:s(e),w=m?f:s(t),x=(g=g==l?v:g)==v,j=(w=w==l?v:w)==v,E=g==w;if(E&&c(e)){if(!c(t))return!1;_=!0,x=!1}if(E&&!x)return b||(b=new n),_||p(e)?o(e,t,r,h,y,b):a(e,t,g,r,h,y,b);if(!(1&r)){var O=x&&d.call(e,"__wrapped__"),T=j&&d.call(t,"__wrapped__");if(O||T){var A=O?e.value():e,S=T?t.value():t;return b||(b=new n),y(A,S,r,h,b)}}return!!E&&(b||(b=new n),i(e,t,r,h,y,b))}},8458:(e,t,r)=>{var n=r(3560),o=r(5346),a=r(3218),i=r(346),s=/^\[object .+?Constructor\]$/,u=Function.prototype,c=Object.prototype,p=u.toString,l=c.hasOwnProperty,f=RegExp("^"+p.call(l).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");e.exports=function(e){return!(!a(e)||o(e))&&(n(e)?f:s).test(i(e))}},8749:(e,t,r)=>{var n=r(4239),o=r(1780),a=r(7005),i={};i["[object Float32Array]"]=i["[object Float64Array]"]=i["[object Int8Array]"]=i["[object Int16Array]"]=i["[object Int32Array]"]=i["[object Uint8Array]"]=i["[object Uint8ClampedArray]"]=i["[object Uint16Array]"]=i["[object Uint32Array]"]=!0,i["[object Arguments]"]=i["[object Array]"]=i["[object ArrayBuffer]"]=i["[object Boolean]"]=i["[object DataView]"]=i["[object Date]"]=i["[object Error]"]=i["[object Function]"]=i["[object Map]"]=i["[object Number]"]=i["[object Object]"]=i["[object RegExp]"]=i["[object Set]"]=i["[object String]"]=i["[object WeakMap]"]=!1,e.exports=function(e){return a(e)&&o(e.length)&&!!i[n(e)]}},280:(e,t,r)=>{var n=r(5726),o=r(6916),a=Object.prototype.hasOwnProperty;e.exports=function(e){if(!n(e))return o(e);var t=[];for(var r in Object(e))a.call(e,r)&&"constructor"!=r&&t.push(r);return t}},2545:e=>{e.exports=function(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r);return n}},1717:e=>{e.exports=function(e){return function(t){return e(t)}}},4757:e=>{e.exports=function(e,t){return e.has(t)}},4429:(e,t,r)=>{var n=r(5639)["__core-js_shared__"];e.exports=n},7114:(e,t,r)=>{var n=r(8668),o=r(2908),a=r(4757);e.exports=function(e,t,r,i,s,u){var c=1&r,p=e.length,l=t.length;if(p!=l&&!(c&&l>p))return!1;var f=u.get(e),v=u.get(t);if(f&&v)return f==t&&v==e;var d=-1,h=!0,y=2&r?new n:void 0;for(u.set(e,t),u.set(t,e);++d<p;){var b=e[d],_=t[d];if(i)var m=c?i(_,b,d,t,e,u):i(b,_,d,e,t,u);if(void 0!==m){if(m)continue;h=!1;break}if(y){if(!o(t,(function(e,t){if(!a(y,t)&&(b===e||s(b,e,r,i,u)))return y.push(t)}))){h=!1;break}}else if(b!==_&&!s(b,_,r,i,u)){h=!1;break}}return u.delete(e),u.delete(t),h}},8351:(e,t,r)=>{var n=r(2705),o=r(1149),a=r(7813),i=r(7114),s=r(8776),u=r(1814),c=n?n.prototype:void 0,p=c?c.valueOf:void 0;e.exports=function(e,t,r,n,c,l,f){switch(r){case"[object DataView]":if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case"[object ArrayBuffer]":return!(e.byteLength!=t.byteLength||!l(new o(e),new o(t)));case"[object Boolean]":case"[object Date]":case"[object Number]":return a(+e,+t);case"[object Error]":return e.name==t.name&&e.message==t.message;case"[object RegExp]":case"[object String]":return e==t+"";case"[object Map]":var v=s;case"[object Set]":var d=1&n;if(v||(v=u),e.size!=t.size&&!d)return!1;var h=f.get(e);if(h)return h==t;n|=2,f.set(e,t);var y=i(v(e),v(t),n,c,l,f);return f.delete(e),y;case"[object Symbol]":if(p)return p.call(e)==p.call(t)}return!1}},6096:(e,t,r)=>{var n=r(8234),o=Object.prototype.hasOwnProperty;e.exports=function(e,t,r,a,i,s){var u=1&r,c=n(e),p=c.length;if(p!=n(t).length&&!u)return!1;for(var l=p;l--;){var f=c[l];if(!(u?f in t:o.call(t,f)))return!1}var v=s.get(e),d=s.get(t);if(v&&d)return v==t&&d==e;var h=!0;s.set(e,t),s.set(t,e);for(var y=u;++l<p;){var b=e[f=c[l]],_=t[f];if(a)var m=u?a(_,b,f,t,e,s):a(b,_,f,e,t,s);if(!(void 0===m?b===_||i(b,_,r,a,s):m)){h=!1;break}y||(y="constructor"==f)}if(h&&!y){var g=e.constructor,w=t.constructor;g==w||!("constructor"in e)||!("constructor"in t)||"function"==typeof g&&g instanceof g&&"function"==typeof w&&w instanceof w||(h=!1)}return s.delete(e),s.delete(t),h}},1957:(e,t,r)=>{var n="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=n},8234:(e,t,r)=>{var n=r(8866),o=r(9551),a=r(3674);e.exports=function(e){return n(e,a,o)}},5050:(e,t,r)=>{var n=r(7019);e.exports=function(e,t){var r=e.__data__;return n(t)?r["string"==typeof t?"string":"hash"]:r.map}},852:(e,t,r)=>{var n=r(8458),o=r(7801);e.exports=function(e,t){var r=o(e,t);return n(r)?r:void 0}},9607:(e,t,r)=>{var n=r(2705),o=Object.prototype,a=o.hasOwnProperty,i=o.toString,s=n?n.toStringTag:void 0;e.exports=function(e){var t=a.call(e,s),r=e[s];try{e[s]=void 0;var n=!0}catch(e){}var o=i.call(e);return n&&(t?e[s]=r:delete e[s]),o}},9551:(e,t,r)=>{var n=r(4963),o=r(479),a=Object.prototype.propertyIsEnumerable,i=Object.getOwnPropertySymbols,s=i?function(e){return null==e?[]:(e=Object(e),n(i(e),(function(t){return a.call(e,t)})))}:o;e.exports=s},4160:(e,t,r)=>{var n=r(8552),o=r(7071),a=r(3818),i=r(8525),s=r(577),u=r(4239),c=r(346),p="[object Map]",l="[object Promise]",f="[object Set]",v="[object WeakMap]",d="[object DataView]",h=c(n),y=c(o),b=c(a),_=c(i),m=c(s),g=u;(n&&g(new n(new ArrayBuffer(1)))!=d||o&&g(new o)!=p||a&&g(a.resolve())!=l||i&&g(new i)!=f||s&&g(new s)!=v)&&(g=function(e){var t=u(e),r="[object Object]"==t?e.constructor:void 0,n=r?c(r):"";if(n)switch(n){case h:return d;case y:return p;case b:return l;case _:return f;case m:return v}return t}),e.exports=g},7801:e=>{e.exports=function(e,t){return null==e?void 0:e[t]}},1789:(e,t,r)=>{var n=r(4536);e.exports=function(){this.__data__=n?n(null):{},this.size=0}},401:e=>{e.exports=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t}},7667:(e,t,r)=>{var n=r(4536),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;if(n){var r=t[e];return"__lodash_hash_undefined__"===r?void 0:r}return o.call(t,e)?t[e]:void 0}},1327:(e,t,r)=>{var n=r(4536),o=Object.prototype.hasOwnProperty;e.exports=function(e){var t=this.__data__;return n?void 0!==t[e]:o.call(t,e)}},1866:(e,t,r)=>{var n=r(4536);e.exports=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=n&&void 0===t?"__lodash_hash_undefined__":t,this}},5776:e=>{var t=/^(?:0|[1-9]\d*)$/;e.exports=function(e,r){var n=typeof e;return!!(r=null==r?9007199254740991:r)&&("number"==n||"symbol"!=n&&t.test(e))&&e>-1&&e%1==0&&e<r}},7019:e=>{e.exports=function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}},5346:(e,t,r)=>{var n,o=r(4429),a=(n=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"";e.exports=function(e){return!!a&&a in e}},5726:e=>{var t=Object.prototype;e.exports=function(e){var r=e&&e.constructor;return e===("function"==typeof r&&r.prototype||t)}},7040:e=>{e.exports=function(){this.__data__=[],this.size=0}},4125:(e,t,r)=>{var n=r(8470),o=Array.prototype.splice;e.exports=function(e){var t=this.__data__,r=n(t,e);return!(r<0||(r==t.length-1?t.pop():o.call(t,r,1),--this.size,0))}},2117:(e,t,r)=>{var n=r(8470);e.exports=function(e){var t=this.__data__,r=n(t,e);return r<0?void 0:t[r][1]}},7518:(e,t,r)=>{var n=r(8470);e.exports=function(e){return n(this.__data__,e)>-1}},4705:(e,t,r)=>{var n=r(8470);e.exports=function(e,t){var r=this.__data__,o=n(r,e);return o<0?(++this.size,r.push([e,t])):r[o][1]=t,this}},4785:(e,t,r)=>{var n=r(1989),o=r(8407),a=r(7071);e.exports=function(){this.size=0,this.__data__={hash:new n,map:new(a||o),string:new n}}},1285:(e,t,r)=>{var n=r(5050);e.exports=function(e){var t=n(this,e).delete(e);return this.size-=t?1:0,t}},6e3:(e,t,r)=>{var n=r(5050);e.exports=function(e){return n(this,e).get(e)}},9916:(e,t,r)=>{var n=r(5050);e.exports=function(e){return n(this,e).has(e)}},5265:(e,t,r)=>{var n=r(5050);e.exports=function(e,t){var r=n(this,e),o=r.size;return r.set(e,t),this.size+=r.size==o?0:1,this}},8776:e=>{e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e,n){r[++t]=[n,e]})),r}},4536:(e,t,r)=>{var n=r(852)(Object,"create");e.exports=n},6916:(e,t,r)=>{var n=r(5569)(Object.keys,Object);e.exports=n},1167:(e,t,r)=>{e=r.nmd(e);var n=r(1957),o=t&&!t.nodeType&&t,a=o&&e&&!e.nodeType&&e,i=a&&a.exports===o&&n.process,s=function(){try{return a&&a.require&&a.require("util").types||i&&i.binding&&i.binding("util")}catch(e){}}();e.exports=s},2333:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},5569:e=>{e.exports=function(e,t){return function(r){return e(t(r))}}},5639:(e,t,r)=>{var n=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,a=n||o||Function("return this")();e.exports=a},619:e=>{e.exports=function(e){return this.__data__.set(e,"__lodash_hash_undefined__"),this}},2385:e=>{e.exports=function(e){return this.__data__.has(e)}},1814:e=>{e.exports=function(e){var t=-1,r=Array(e.size);return e.forEach((function(e){r[++t]=e})),r}},7465:(e,t,r)=>{var n=r(8407);e.exports=function(){this.__data__=new n,this.size=0}},3779:e=>{e.exports=function(e){var t=this.__data__,r=t.delete(e);return this.size=t.size,r}},7599:e=>{e.exports=function(e){return this.__data__.get(e)}},4758:e=>{e.exports=function(e){return this.__data__.has(e)}},4309:(e,t,r)=>{var n=r(8407),o=r(7071),a=r(3369);e.exports=function(e,t){var r=this.__data__;if(r instanceof n){var i=r.__data__;if(!o||i.length<199)return i.push([e,t]),this.size=++r.size,this;r=this.__data__=new a(i)}return r.set(e,t),this.size=r.size,this}},346:e=>{var t=Function.prototype.toString;e.exports=function(e){if(null!=e){try{return t.call(e)}catch(e){}try{return e+""}catch(e){}}return""}},7813:e=>{e.exports=function(e,t){return e===t||e!=e&&t!=t}},5694:(e,t,r)=>{var n=r(9454),o=r(7005),a=Object.prototype,i=a.hasOwnProperty,s=a.propertyIsEnumerable,u=n(function(){return arguments}())?n:function(e){return o(e)&&i.call(e,"callee")&&!s.call(e,"callee")};e.exports=u},1469:e=>{var t=Array.isArray;e.exports=t},8612:(e,t,r)=>{var n=r(3560),o=r(1780);e.exports=function(e){return null!=e&&o(e.length)&&!n(e)}},4144:(e,t,r)=>{e=r.nmd(e);var n=r(5639),o=r(5062),a=t&&!t.nodeType&&t,i=a&&e&&!e.nodeType&&e,s=i&&i.exports===a?n.Buffer:void 0,u=(s?s.isBuffer:void 0)||o;e.exports=u},8446:(e,t,r)=>{var n=r(939);e.exports=function(e,t){return n(e,t)}},3560:(e,t,r)=>{var n=r(4239),o=r(3218);e.exports=function(e){if(!o(e))return!1;var t=n(e);return"[object Function]"==t||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}},1780:e=>{e.exports=function(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}},3218:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},6719:(e,t,r)=>{var n=r(8749),o=r(1717),a=r(1167),i=a&&a.isTypedArray,s=i?o(i):n;e.exports=s},3674:(e,t,r)=>{var n=r(4636),o=r(280),a=r(8612);e.exports=function(e){return a(e)?n(e):o(e)}},479:e=>{e.exports=function(){return[]}},5062:e=>{e.exports=function(){return!1}},75:function(e){(function(){var t,r,n,o,a,i;"undefined"!=typeof performance&&null!==performance&&performance.now?e.exports=function(){return performance.now()}:"undefined"!=typeof process&&null!==process&&process.hrtime?(e.exports=function(){return(t()-a)/1e6},r=process.hrtime,o=(t=function(){var e;return 1e9*(e=r())[0]+e[1]})(),i=1e9*process.uptime(),a=o-i):Date.now?(e.exports=function(){return Date.now()-n},n=Date.now()):(e.exports=function(){return(new Date).getTime()-n},n=(new Date).getTime())}).call(this)},4087:(e,t,r)=>{for(var n=r(75),o="undefined"==typeof window?r.g:window,a=["moz","webkit"],i="AnimationFrame",s=o["request"+i],u=o["cancel"+i]||o["cancelRequest"+i],c=0;!s&&c<a.length;c++)s=o[a[c]+"Request"+i],u=o[a[c]+"Cancel"+i]||o[a[c]+"CancelRequest"+i];if(!s||!u){var p=0,l=0,f=[];s=function(e){if(0===f.length){var t=n(),r=Math.max(0,16.666666666666668-(t-p));p=r+t,setTimeout((function(){var e=f.slice(0);f.length=0;for(var t=0;t<e.length;t++)if(!e[t].cancelled)try{e[t].callback(p)}catch(e){setTimeout((function(){throw e}),0)}}),Math.round(r))}return f.push({handle:++l,callback:e,cancelled:!1}),l},u=function(e){for(var t=0;t<f.length;t++)f[t].handle===e&&(f[t].cancelled=!0)}}e.exports=function(e){return s.call(o,e)},e.exports.cancel=function(){u.apply(o,arguments)},e.exports.polyfill=function(e){e||(e=o),e.requestAnimationFrame=s,e.cancelAnimationFrame=u}},8156:t=>{"use strict";t.exports=e}},r={};function n(e){var o=r[e];if(void 0!==o)return o.exports;var a=r[e]={id:e,loaded:!1,exports:{}};return t[e].call(a.exports,a,a.exports,n),a.loaded=!0,a.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.nmd=e=>(e.paths=[],e.children||(e.children=[]),e);var o={};return(()=>{"use strict";n.d(o,{default:()=>y});var e=n(8156),t=n.n(e),r=n(7403),a=n(8446),i=n.n(a);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function c(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function p(e,t){return p=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},p(e,t)}function l(e,t){if(t&&("object"===s(t)||"function"==typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return f(e)}function f(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function d(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var h=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&p(e,t)}(y,e);var n,o,a,s,h=(a=y,s=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(a);if(s){var r=v(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return l(this,e)});function y(){var e;u(this,y);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return d(f(e=h.call.apply(h,[this].concat(r))),"state",{instance:null}),e}return n=y,(o=[{key:"componentDidMount",value:function(){var e=this,t=new r.default(this.typewriter,this.props.options);this.setState({instance:t},(function(){var r=e.props.onInit;r&&r(t)}))}},{key:"componentDidUpdate",value:function(e){i()(this.props.options,e.options)||this.setState({instance:new r.default(this.typewriter,this.props.options)})}},{key:"componentWillUnmount",value:function(){this.state.instance&&this.state.instance.stop()}},{key:"render",value:function(){var e=this,r=this.props.component;return t().createElement(r,{ref:function(t){return e.typewriter=t},className:"Typewriter","data-testid":"typewriter-wrapper"})}}])&&c(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),y}(e.Component);h.defaultProps={component:"div"};const y=h})(),o.default})()));

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

/***/ }),

/***/ "./src/images/GreenLogo.svg":
/*!**********************************!*\
  !*** ./src/images/GreenLogo.svg ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGlkPSJhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzOTQuODkgMjU1LjE5Ij48ZGVmcz48c3R5bGU+LmJ7ZmlsbDojM2E3MzY3O308L3N0eWxlPjwvZGVmcz48cGF0aCBjbGFzcz0iYiIgZD0iTTI3OC42NSw1MC4xNGMtMTguNzIsLjczLTI4LjA3LDEuMDktMzUuOTQsNC4xNC0zLjgzLDEuNDgtOS4yLDQuMTctMTQuOTYsOS4zOSw1LjIyLDAsNS41MiwwLDUuNTIsMCwyLjMxLC4wMyw1LjYsLjI3LDkuODEsMS4yLDExLjY2LC44NywyMS45MSw1LjQ4LDMwLjUxLDEzLjA2LDIwLjI4LDE3Ljg2LDI3Ljk0LDQxLjc5LDMxLjMsNjcuODktMjAuMjQtMTkuOC00MC45OC0zOC42NC02Ny44OS01MSwyLjU1LDE5LjQ1LDExLjQ0LDM4LjU2LTIuNzUsNTguMjktNy4xMS0yNS4zMy0xNS41NC00Ny45LTMwLjMxLTY4LjY0LTkuNjYsMTYuMzUtMTYuNCwzMi45OS0yMS42MSw1MC4zMS0xMC4xNCwzMy42Ni0xNC4wMyw2OC4yNS0xNC44NywxMDMuMjQtLjEzLDUuNTktMi4xNyw5LjcxLTYuMzEsMTMuMDctOC4yNiw2LjctMTYuNTcsNS4xMy0yMS43OS00LjI0LTUuNjktMTAuMjEtNi4yNC0yMS42My02LjM2LTMyLjgtLjUzLTUxLjE5LDE2LjQxLTk1Ljg4LDUxLjU2LTEzMy4yOSw0LjQ2LTQuNzUsMy41NC02LjU0LTEuNDgtOS4xNy04LjM2LTQuMzctMTcuMjktNi4wMy0yNi41Mi02LjQ5LTIyLjY4LTEuMTQtNDQuODYsMi40NS02Ni44NSw3LjQ5LTIuNDUsLjU2LTQuOCwxLjMyLTcuNzcsLjIzLDUuMzktOC43NiwxMy40NS0xMy43OSwyMi41LTE3LjMsMjEuMzktOC4zMiw0My44My05LjMyLDY2LjQzLTkuMDMsMi4zMywuMDMsNS41NywxLjk2LDYuNzYtLjg3LDEuMDItMi40NC0xLjgyLTQuNDYtMy41NC02LjIyLTE0LjU4LTE0Ljk0LTMyLjMyLTI1LjYxLTQ5Ljg5LTM3LjAyLDEuMDQtMS41MywyLjc3LTEuOTIsNC42OS0yLjA2LDMyLjAxLTIuMzYsNTguMjksOC4xMSw3Ni44OSwzNC45NiwyLjc5LDQuMDMsNC42OSw0LjQxLDkuMTksMi44LDI0Ljg5LTguOSw0OC4yOS02LjI4LDY5LjQ3LDEwLjM5LC43OCwuODUsMS4yOSwxLjQsMS4yOSwxLjRsLTcuMDcsLjI3WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNMzMuMTMsMTUwLjg4YzEzLjM0LDcuNzIsMjUuNzgsMTQuOTMsMzguMjMsMjIuMTEsNi4yNSwzLjYxLDkuOTIsMTUuODIsNi40NywyMS45My0yLjIzLDMuOTctNS4wMSwxLjk1LTcuNTgsLjQ1LTE0LjQ0LTguNDctMjguODYtMTYuOTktNDMuMjgtMjUuNDktNy41MS00LjQyLTE1LjA5LTguNzMtMjIuNS0xMy4zMS01Ljk1LTMuNjgtNS45OC03LjExLS4wOS0xMC43NCwyMS44OC0xMy40Niw0My44Mi0yNi44NSw2NS43OS00MC4xNyw1LjY3LTMuNDQsNy41OC0yLjE0LDguMzYsNC4yNiwxLjE3LDkuNjMtMS4zNiwxNi4yLTEwLjk3LDIwLjc5LTExLjY5LDUuNTgtMjIuNDgsMTMuMDUtMzQuNDQsMjAuMTdaIi8+PHBhdGggY2xhc3M9ImIiIGQ9Ik0zNjEuNzcsMTUwLjg4Yy0xMy4yOS03LjktMjUuNjctMTUuMjYtMzguMDQtMjIuNjItNi42Ny0zLjk3LTEwLjIxLTE0Ljg4LTYuODUtMjEuODUsMi40NS01LjA3LDUuNzgtMi4wNCw4LjU1LS4zNywxNC45Miw5LjAyLDI5Ljc2LDE4LjE4LDQ0LjYzLDI3LjI5LDYuODUsNC4yLDEzLjc0LDguMzIsMjAuNTMsMTIuNjEsNS41OCwzLjUzLDUuODEsNi45NywuMjQsMTAuMzEtMjIuNDMsMTMuNDUtNDQuOTcsMjYuNjktNjcuNTIsMzkuOTQtNC40LDIuNTktNi4zNSwuMjctNi45My00LjAyLTEuNzMtMTIuNzItLjgxLTE0LjU0LDEwLjIxLTIwLjg5LDExLjMyLTYuNTMsMjIuNjEtMTMuMSwzNS4xOS0yMC4zOVoiLz48L3N2Zz4=");

/***/ }),

/***/ "./src/images/OasisCrowd1.png":
/*!************************************!*\
  !*** ./src/images/OasisCrowd1.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/OasisCrowd1-1e9d696e902d198dd7f0901d40f291e3.png");

/***/ }),

/***/ "./src/images/OasisCrowd2.png":
/*!************************************!*\
  !*** ./src/images/OasisCrowd2.png ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/OasisCrowd2-fde0118cacf8d93dd9492889b467b663.png");

/***/ }),

/***/ "./src/images/Projects/HowBusyIsMarino.png":
/*!*************************************************!*\
  !*** ./src/images/Projects/HowBusyIsMarino.png ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/HowBusyIsMarino-64beb1b340f6b958af54cd6ce55445d6.png");

/***/ }),

/***/ "./src/images/Projects/RoomieHub.png":
/*!*******************************************!*\
  !*** ./src/images/Projects/RoomieHub.png ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/RoomieHub-d57f6bb2a445fc1a202558bddfab9ef5.png");

/***/ }),

/***/ "./src/images/Projects/TransitNU.png":
/*!*******************************************!*\
  !*** ./src/images/Projects/TransitNU.png ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("/static/TransitNU-a2f3673d6163ed8fc0478437d81ec034.png");

/***/ })

};
;
//# sourceMappingURL=component---src-pages-app-js.js.map