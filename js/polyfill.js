/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	/**
	 * Polyfill
	 *      Object.keys
	 *      Array.prototype.isArray
	 *      String.prototype.trim
	 *
	 * @see: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/keys
	 */
	if (!Object.keys) {
	    Object.keys = function () {
	        var hasOwnProperty = Object.prototype.hasOwnProperty,
	            hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	            dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	            dontEnumsLength = dontEnums.length;
	
	        return function (obj) {
	            if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && typeof obj !== 'function' || obj === null) throw new TypeError('Object.keys called on non-object');
	
	            var result = [];
	
	            for (var prop in obj) {
	                if (hasOwnProperty.call(obj, prop)) result.push(prop);
	            }
	
	            if (hasDontEnumBug) {
	                for (var i = 0; i < dontEnumsLength; i++) {
	                    if (hasOwnProperty.call(obj, dontEnums[i])) result.push(dontEnums[i]);
	                }
	            }
	            return result;
	        };
	    }();
	};
	
	if (!Array.isArray) {
	    Array.isArray = function (arg) {
	        return Object.prototype.toString.call(arg) === '[object Array]';
	    };
	}
	
	if (!String.prototype.trim) {
	    String.prototype.trim = function () {
	        return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	    };
	}
	
	// ECMA-262 5판, 15.4.4.21항의 작성 과정
	// 참고: http://es5.github.io/#x15.4.4.21
	if (!Array.prototype.reduce) {
	    Array.prototype.reduce = function (callback /*, initialValue*/) {
	        'use strict';
	
	        if (this == null) {
	            throw new TypeError('Array.prototype.reduce called on null or undefined');
	        }
	        if (typeof callback !== 'function') {
	            throw new TypeError(callback + ' is not a function');
	        }
	        var t = Object(this),
	            len = t.length >>> 0,
	            k = 0,
	            value;
	        if (arguments.length == 2) {
	            value = arguments[1];
	        } else {
	            while (k < len && !(k in t)) {
	                k++;
	            }
	            if (k >= len) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }
	            value = t[k++];
	        }
	        for (; k < len; k++) {
	            if (k in t) {
	                value = callback(value, t[k], k, t);
	            }
	        }
	        return value;
	    };
	}
	
	/*
	 * classList.js: Cross-browser full element.classList implementation.
	 * 1.1.20150312
	 *
	 * By Eli Grey, http://eligrey.com
	 * License: Dedicated to the public domain.
	 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
	 */
	
	/*global self, document, DOMException */
	
	/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */
	
	if ("document" in self) {
	
	    // Full polyfill for browsers with no classList support
	    // Including IE < Edge missing SVGElement.classList
	    if (!("classList" in document.createElement("_")) || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg", "g"))) {
	
	        (function (view) {
	
	            "use strict";
	
	            if (!('Element' in view)) return;
	
	            var classListProp = "classList",
	                protoProp = "prototype",
	                elemCtrProto = view.Element[protoProp],
	                objCtr = Object,
	                strTrim = String[protoProp].trim || function () {
	                return this.replace(/^\s+|\s+$/g, "");
	            },
	                arrIndexOf = Array[protoProp].indexOf || function (item) {
	                var i = 0,
	                    len = this.length;
	                for (; i < len; i++) {
	                    if (i in this && this[i] === item) {
	                        return i;
	                    }
	                }
	                return -1;
	            }
	            // Vendors: please allow content code to instantiate DOMExceptions
	            ,
	                DOMEx = function DOMEx(type, message) {
	                this.name = type;
	                this.code = DOMException[type];
	                this.message = message;
	            },
	                checkTokenAndGetIndex = function checkTokenAndGetIndex(classList, token) {
	                if (token === "") {
	                    throw new DOMEx("SYNTAX_ERR", "An invalid or illegal string was specified");
	                }
	                if (/\s/.test(token)) {
	                    throw new DOMEx("INVALID_CHARACTER_ERR", "String contains an invalid character");
	                }
	                return arrIndexOf.call(classList, token);
	            },
	                ClassList = function ClassList(elem) {
	                var trimmedClasses = strTrim.call(elem.getAttribute("class") || ""),
	                    classes = trimmedClasses ? trimmedClasses.split(/\s+/) : [],
	                    i = 0,
	                    len = classes.length;
	                for (; i < len; i++) {
	                    this.push(classes[i]);
	                }
	                this._updateClassName = function () {
	                    elem.setAttribute("class", this.toString());
	                };
	            },
	                classListProto = ClassList[protoProp] = [],
	                classListGetter = function classListGetter() {
	                return new ClassList(this);
	            };
	            // Most DOMException implementations don't allow calling DOMException's toString()
	            // on non-DOMExceptions. Error's toString() is sufficient here.
	            DOMEx[protoProp] = Error[protoProp];
	            classListProto.item = function (i) {
	                return this[i] || null;
	            };
	            classListProto.contains = function (token) {
	                token += "";
	                return checkTokenAndGetIndex(this, token) !== -1;
	            };
	            classListProto.add = function () {
	                var tokens = arguments,
	                    i = 0,
	                    l = tokens.length,
	                    token,
	                    updated = false;
	                do {
	                    token = tokens[i] + "";
	                    if (checkTokenAndGetIndex(this, token) === -1) {
	                        this.push(token);
	                        updated = true;
	                    }
	                } while (++i < l);
	
	                if (updated) {
	                    this._updateClassName();
	                }
	            };
	            classListProto.remove = function () {
	                var tokens = arguments,
	                    i = 0,
	                    l = tokens.length,
	                    token,
	                    updated = false,
	                    index;
	                do {
	                    token = tokens[i] + "";
	                    index = checkTokenAndGetIndex(this, token);
	                    while (index !== -1) {
	                        this.splice(index, 1);
	                        updated = true;
	                        index = checkTokenAndGetIndex(this, token);
	                    }
	                } while (++i < l);
	
	                if (updated) {
	                    this._updateClassName();
	                }
	            };
	            classListProto.toggle = function (token, force) {
	                token += "";
	
	                var result = this.contains(token),
	                    method = result ? force !== true && "remove" : force !== false && "add";
	
	                if (method) {
	                    this[method](token);
	                }
	
	                if (force === true || force === false) {
	                    return force;
	                } else {
	                    return !result;
	                }
	            };
	            classListProto.toString = function () {
	                return this.join(" ");
	            };
	
	            if (objCtr.defineProperty) {
	                var classListPropDesc = {
	                    get: classListGetter,
	                    enumerable: true,
	                    configurable: true
	                };
	                try {
	                    objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	                } catch (ex) {
	                    // IE 8 doesn't support enumerable:true
	                    if (ex.number === -0x7FF5EC54) {
	                        classListPropDesc.enumerable = false;
	                        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
	                    }
	                }
	            } else if (objCtr[protoProp].__defineGetter__) {
	                elemCtrProto.__defineGetter__(classListProp, classListGetter);
	            }
	        })(self);
	    } else {
	        // There is full or partial native classList support, so just check if we need
	        // to normalize the add/remove and toggle APIs.
	
	        (function () {
	            "use strict";
	
	            var testElement = document.createElement("_");
	
	            testElement.classList.add("c1", "c2");
	
	            // Polyfill for IE 10/11 and Firefox <26, where classList.add and
	            // classList.remove exist but support only one argument at a time.
	            if (!testElement.classList.contains("c2")) {
	                var createMethod = function createMethod(method) {
	                    var original = DOMTokenList.prototype[method];
	
	                    DOMTokenList.prototype[method] = function (token) {
	                        var i,
	                            len = arguments.length;
	
	                        for (i = 0; i < len; i++) {
	                            token = arguments[i];
	                            original.call(this, token);
	                        }
	                    };
	                };
	                createMethod('add');
	                createMethod('remove');
	            }
	
	            testElement.classList.toggle("c3", false);
	
	            // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
	            // support the second argument.
	            if (testElement.classList.contains("c3")) {
	                var _toggle = DOMTokenList.prototype.toggle;
	
	                DOMTokenList.prototype.toggle = function (token, force) {
	                    if (1 in arguments && !this.contains(token) === !force) {
	                        return force;
	                    } else {
	                        return _toggle.call(this, token);
	                    }
	                };
	            }
	
	            testElement = null;
	        })();
	    }
	}
	
	/*! Overthrow v.0.1.0. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
	(function (w, undefined) {
	
	    var doc = w.document,
	        docElem = doc.documentElement,
	        classtext = "overthrow-enabled",
	
	
	    // Touch events are used in the polyfill, and thus are a prerequisite
	    canBeFilledWithPoly = "ontouchmove" in doc,
	
	
	    // The following attempts to determine whether the browser has native overflow support
	    // so we can enable it but not polyfill
	    overflowProbablyAlreadyWorks =
	    // Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
	    "WebkitOverflowScrolling" in docElem.style ||
	    // Touch events aren't supported and screen width is greater than X
	    // ...basically, this is a loose "desktop browser" check. 
	    // It may wrongly opt-in very large tablets with no touch support.
	    !canBeFilledWithPoly && w.screen.width > 1200 ||
	    // Hang on to your hats.
	    // Whitelist some popular, overflow-supporting mobile browsers for now and the future
	    // These browsers are known to get overlow support right, but give us no way of detecting it.
	    function () {
	        var ua = w.navigator.userAgent,
	
	        // Webkit crosses platforms, and the browsers on our list run at least version 534
	        webkit = ua.match(/AppleWebKit\/([0-9]+)/),
	            wkversion = webkit && webkit[1],
	            wkLte534 = webkit && wkversion >= 534;
	
	        return (
	            /* Android 3+ with webkit gte 534
	            ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
	            ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 ||
	            /* Blackberry 7+ with webkit gte 534
	            ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
	            ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
	            /* Blackberry Playbook with webkit gte 534
	            ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
	            ua.indexOf(/PlayBook/) > -1 && RegExp.$1 >= 0 && wkLte534 ||
	            /* Firefox Mobile (Fennec) 4 and up
	            ~: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:2.1.1) Gecko/ Firefox/4.0.2pre Fennec/4.0. */
	            ua.match(/Fennec\/([0-9]+)/) && RegExp.$1 >= 4 ||
	            /* WebOS 3 and up (TouchPad too)
	            ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
	            ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 ||
	            /* Nokia Browser N8
	            ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba 
	            ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
	            ua.match(/NokiaBrowser\/([0-9\.]+)/) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
	        );
	    }(),
	
	
	    // Easing can use any of Robert Penner's equations (http://www.robertpenner.com/easing_terms_of_use.html). By default, overthrow includes ease-out-cubic
	    // arguments: t = current iteration, b = initial value, c = end value, d = total iterations
	    // use w.overthrow.easing to provide a custom function externally, or pass an easing function as a callback to the toss method
	    defaultEasing = function defaultEasing(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    },
	        enabled = false,
	
	
	    // Keeper of intervals
	    timeKeeper,
	
	
	    /* toss scrolls and element with easing
	     
	    // elem is the element to scroll
	    // options hash:
	        * left is the desired horizontal scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
	        * top is the desired vertical scroll. Default is "+0". For relative distances, pass a string with "+" or "-" in front.
	        * duration is the number of milliseconds the throw will take. Default is 100.
	        * easing is an optional custom easing function. Default is w.overthrow.easing. Must follow the easing function signature 
	    */
	    toss = function toss(elem, options) {
	        var i = 0,
	            sLeft = elem.scrollLeft,
	            sTop = elem.scrollTop,
	
	        // Toss defaults
	        o = {
	            top: "+0",
	            left: "+0",
	            duration: 100,
	            easing: w.overthrow.easing
	        },
	            endLeft,
	            endTop;
	
	        // Mixin based on predefined defaults
	        if (options) {
	            for (var j in o) {
	                if (options[j] !== undefined) {
	                    o[j] = options[j];
	                }
	            }
	        }
	
	        // Convert relative values to ints
	        // First the left val
	        if (typeof o.left === "string") {
	            o.left = parseFloat(o.left);
	            endLeft = o.left + sLeft;
	        } else {
	            endLeft = o.left;
	            o.left = o.left - sLeft;
	        }
	        // Then the top val
	        if (typeof o.top === "string") {
	            o.top = parseFloat(o.top);
	            endTop = o.top + sTop;
	        } else {
	            endTop = o.top;
	            o.top = o.top - sTop;
	        }
	
	        timeKeeper = setInterval(function () {
	            if (i++ < o.duration) {
	                elem.scrollLeft = o.easing(i, sLeft, o.left, o.duration);
	                elem.scrollTop = o.easing(i, sTop, o.top, o.duration);
	            } else {
	                if (endLeft !== elem.scrollLeft) {
	                    elem.scrollLeft = endLeft;
	                }
	                if (endTop !== elem.scrollTop) {
	                    elem.scrollTop = endTop;
	                }
	                intercept();
	            }
	        }, 1);
	
	        // Return the values, post-mixin, with end values specified
	        return { top: endTop, left: endLeft, duration: o.duration, easing: o.easing };
	    },
	
	
	    // find closest overthrow (elem or a parent)
	    closest = function closest(target, ascend) {
	        return !ascend && target.className && target.className.indexOf("overthrow") > -1 && target || closest(target.parentNode);
	    },
	
	
	    // Intercept any throw in progress
	    intercept = function intercept() {
	        clearInterval(timeKeeper);
	    },
	
	
	    // Enable and potentially polyfill overflow
	    enable = function enable() {
	
	        // If it's on, 
	        if (enabled) {
	            return;
	        }
	        // It's on.
	        enabled = true;
	
	        // If overflowProbablyAlreadyWorks or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
	        if (overflowProbablyAlreadyWorks || canBeFilledWithPoly) {
	            docElem.className += " " + classtext;
	        }
	
	        // Destroy everything later. If you want to.
	        w.overthrow.forget = function () {
	            // Strip the class name from docElem
	            docElem.className = docElem.className.replace(classtext, "");
	            // Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
	            if (doc.removeEventListener) {
	                doc.removeEventListener("touchstart", start, false);
	            }
	            // reset easing to default
	            w.overthrow.easing = defaultEasing;
	
	            // Let 'em know
	            enabled = false;
	        };
	
	        // If overflowProbablyAlreadyWorks or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
	        if (overflowProbablyAlreadyWorks || !canBeFilledWithPoly) {
	            return;
	        }
	
	        // Fill 'er up!
	        // From here down, all logic is associated with touch scroll handling
	        // elem references the overthrow element in use
	        var elem,
	
	
	        // The last several Y values are kept here
	        lastTops = [],
	
	
	        // The last several X values are kept here
	        lastLefts = [],
	
	
	        // lastDown will be true if the last scroll direction was down, false if it was up
	        lastDown,
	
	
	        // lastRight will be true if the last scroll direction was right, false if it was left
	        lastRight,
	
	
	        // For a new gesture, or change in direction, reset the values from last scroll
	        resetVertTracking = function resetVertTracking() {
	            lastTops = [];
	            lastDown = null;
	        },
	            resetHorTracking = function resetHorTracking() {
	            lastLefts = [];
	            lastRight = null;
	        },
	
	
	        // After releasing touchend, throw the overthrow element, depending on momentum
	        finishScroll = function finishScroll() {
	            // Come up with a distance and duration based on how 
	            // Multipliers are tweaked to a comfortable balance across platforms
	            var top = (lastTops[0] - lastTops[lastTops.length - 1]) * 8,
	                left = (lastLefts[0] - lastLefts[lastLefts.length - 1]) * 8,
	                duration = Math.max(Math.abs(left), Math.abs(top)) / 8;
	
	            // Make top and left relative-style strings (positive vals need "+" prefix)
	            top = (top > 0 ? "+" : "") + top;
	            left = (left > 0 ? "+" : "") + left;
	
	            // Make sure there's a significant amount of throw involved, otherwise, just stay still
	            if (!isNaN(duration) && duration > 0 && (Math.abs(left) > 80 || Math.abs(top) > 80)) {
	                toss(elem, { left: left, top: top, duration: duration });
	            }
	        },
	
	
	        // On webkit, touch events hardly trickle through textareas and inputs
	        // Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
	        // Toggling pointer events at the right moments seems to do the trick
	        // Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
	        inputs,
	            setPointers = function setPointers(val) {
	            inputs = elem.querySelectorAll("textarea, input");
	            for (var i = 0, il = inputs.length; i < il; i++) {
	                inputs[i].style.pointerEvents = val;
	            }
	        },
	
	
	        // For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
	        changeScrollTarget = function changeScrollTarget(startEvent, ascend) {
	            if (doc.createEvent) {
	                var newTarget = (!ascend || ascend === undefined) && elem.parentNode || elem.touchchild || elem,
	                    tEnd;
	
	                if (newTarget !== elem) {
	                    tEnd = doc.createEvent("HTMLEvents");
	                    tEnd.initEvent("touchend", true, true);
	                    elem.dispatchEvent(tEnd);
	                    newTarget.touchchild = elem;
	                    elem = newTarget;
	                    newTarget.dispatchEvent(startEvent);
	                }
	            }
	        },
	
	
	        // Touchstart handler
	        // On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
	        // Touchend unbinds them again, until next time
	        start = function start(e) {
	
	            // Stop any throw in progress
	            intercept();
	
	            // Reset the distance and direction tracking
	            resetVertTracking();
	            resetHorTracking();
	
	            elem = closest(e.target);
	
	            if (!elem || elem === docElem || e.touches.length > 1) {
	                return;
	            }
	
	            setPointers("none");
	            var touchStartE = e,
	                scrollT = elem.scrollTop,
	                scrollL = elem.scrollLeft,
	                height = elem.offsetHeight,
	                width = elem.offsetWidth,
	                startY = e.touches[0].pageY,
	                startX = e.touches[0].pageX,
	                scrollHeight = elem.scrollHeight,
	                scrollWidth = elem.scrollWidth,
	
	
	            // Touchmove handler
	            move = function move(e) {
	
	                var ty = scrollT + startY - e.touches[0].pageY,
	                    tx = scrollL + startX - e.touches[0].pageX,
	                    down = ty >= (lastTops.length ? lastTops[0] : 0),
	                    right = tx >= (lastLefts.length ? lastLefts[0] : 0);
	
	                // If there's room to scroll the current container, prevent the default window scroll
	                if (ty > 0 && ty < scrollHeight - height || tx > 0 && tx < scrollWidth - width) {
	                    e.preventDefault();
	                }
	                // This bubbling is dumb. Needs a rethink.
	                else {
	                        changeScrollTarget(touchStartE);
	                    }
	
	                // If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
	                if (lastDown && down !== lastDown) {
	                    resetVertTracking();
	                }
	
	                // If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
	                if (lastRight && right !== lastRight) {
	                    resetHorTracking();
	                }
	
	                // remember the last direction in which we were headed
	                lastDown = down;
	                lastRight = right;
	
	                // set the container's scroll
	                elem.scrollTop = ty;
	                elem.scrollLeft = tx;
	
	                lastTops.unshift(ty);
	                lastLefts.unshift(tx);
	
	                if (lastTops.length > 3) {
	                    lastTops.pop();
	                }
	                if (lastLefts.length > 3) {
	                    lastLefts.pop();
	                }
	            },
	
	
	            // Touchend handler
	            end = function end(e) {
	                // Apply momentum based easing for a graceful finish
	                finishScroll();
	                // Bring the pointers back
	                setPointers("auto");
	                setTimeout(function () {
	                    setPointers("none");
	                }, 450);
	                elem.removeEventListener("touchmove", move, false);
	                elem.removeEventListener("touchend", end, false);
	            };
	
	            elem.addEventListener("touchmove", move, false);
	            elem.addEventListener("touchend", end, false);
	        };
	
	        // Bind to touch, handle move and end within
	        doc.addEventListener("touchstart", start, false);
	    };
	
	    // Expose overthrow API
	    w.overthrow = {
	        set: enable,
	        forget: function forget() {},
	        easing: defaultEasing,
	        toss: toss,
	        intercept: intercept,
	        closest: closest,
	        support: overflowProbablyAlreadyWorks ? "native" : canBeFilledWithPoly && "polyfilled" || "none"
	    };
	
	    // Auto-init
	    enable();
	})(window);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODFhMmQ0MjRjYWFlNWRhYTMzY2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3BvbHlmaWxsLmpzIl0sIm5hbWVzIjpbIk9iamVjdCIsImtleXMiLCJoYXNPd25Qcm9wZXJ0eSIsInByb3RvdHlwZSIsImhhc0RvbnRFbnVtQnVnIiwidG9TdHJpbmciLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImRvbnRFbnVtcyIsImRvbnRFbnVtc0xlbmd0aCIsImxlbmd0aCIsIm9iaiIsIlR5cGVFcnJvciIsInJlc3VsdCIsInByb3AiLCJjYWxsIiwicHVzaCIsImkiLCJBcnJheSIsImlzQXJyYXkiLCJhcmciLCJTdHJpbmciLCJ0cmltIiwicmVwbGFjZSIsInJlZHVjZSIsImNhbGxiYWNrIiwidCIsImxlbiIsImsiLCJ2YWx1ZSIsImFyZ3VtZW50cyIsInNlbGYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJjcmVhdGVFbGVtZW50TlMiLCJ2aWV3IiwiY2xhc3NMaXN0UHJvcCIsInByb3RvUHJvcCIsImVsZW1DdHJQcm90byIsIkVsZW1lbnQiLCJvYmpDdHIiLCJzdHJUcmltIiwiYXJySW5kZXhPZiIsImluZGV4T2YiLCJpdGVtIiwiRE9NRXgiLCJ0eXBlIiwibWVzc2FnZSIsIm5hbWUiLCJjb2RlIiwiRE9NRXhjZXB0aW9uIiwiY2hlY2tUb2tlbkFuZEdldEluZGV4IiwiY2xhc3NMaXN0IiwidG9rZW4iLCJ0ZXN0IiwiQ2xhc3NMaXN0IiwiZWxlbSIsInRyaW1tZWRDbGFzc2VzIiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NlcyIsInNwbGl0IiwiX3VwZGF0ZUNsYXNzTmFtZSIsInNldEF0dHJpYnV0ZSIsImNsYXNzTGlzdFByb3RvIiwiY2xhc3NMaXN0R2V0dGVyIiwiRXJyb3IiLCJjb250YWlucyIsImFkZCIsInRva2VucyIsImwiLCJ1cGRhdGVkIiwicmVtb3ZlIiwiaW5kZXgiLCJzcGxpY2UiLCJ0b2dnbGUiLCJmb3JjZSIsIm1ldGhvZCIsImpvaW4iLCJkZWZpbmVQcm9wZXJ0eSIsImNsYXNzTGlzdFByb3BEZXNjIiwiZ2V0IiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsImV4IiwibnVtYmVyIiwiX19kZWZpbmVHZXR0ZXJfXyIsInRlc3RFbGVtZW50IiwiY3JlYXRlTWV0aG9kIiwib3JpZ2luYWwiLCJET01Ub2tlbkxpc3QiLCJfdG9nZ2xlIiwidyIsInVuZGVmaW5lZCIsImRvYyIsImRvY0VsZW0iLCJkb2N1bWVudEVsZW1lbnQiLCJjbGFzc3RleHQiLCJjYW5CZUZpbGxlZFdpdGhQb2x5Iiwib3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyIsInN0eWxlIiwic2NyZWVuIiwid2lkdGgiLCJ1YSIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsIndlYmtpdCIsIm1hdGNoIiwid2t2ZXJzaW9uIiwid2tMdGU1MzQiLCJSZWdFeHAiLCIkMSIsImJsYWNrYmVycnkiLCJwYXJzZUZsb2F0IiwiZGVmYXVsdEVhc2luZyIsImIiLCJjIiwiZCIsImVuYWJsZWQiLCJ0aW1lS2VlcGVyIiwidG9zcyIsIm9wdGlvbnMiLCJzTGVmdCIsInNjcm9sbExlZnQiLCJzVG9wIiwic2Nyb2xsVG9wIiwibyIsInRvcCIsImxlZnQiLCJkdXJhdGlvbiIsImVhc2luZyIsIm92ZXJ0aHJvdyIsImVuZExlZnQiLCJlbmRUb3AiLCJqIiwic2V0SW50ZXJ2YWwiLCJpbnRlcmNlcHQiLCJjbG9zZXN0IiwidGFyZ2V0IiwiYXNjZW5kIiwiY2xhc3NOYW1lIiwicGFyZW50Tm9kZSIsImNsZWFySW50ZXJ2YWwiLCJlbmFibGUiLCJmb3JnZXQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic3RhcnQiLCJsYXN0VG9wcyIsImxhc3RMZWZ0cyIsImxhc3REb3duIiwibGFzdFJpZ2h0IiwicmVzZXRWZXJ0VHJhY2tpbmciLCJyZXNldEhvclRyYWNraW5nIiwiZmluaXNoU2Nyb2xsIiwiTWF0aCIsIm1heCIsImFicyIsImlzTmFOIiwiaW5wdXRzIiwic2V0UG9pbnRlcnMiLCJ2YWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwiaWwiLCJwb2ludGVyRXZlbnRzIiwiY2hhbmdlU2Nyb2xsVGFyZ2V0Iiwic3RhcnRFdmVudCIsImNyZWF0ZUV2ZW50IiwibmV3VGFyZ2V0IiwidG91Y2hjaGlsZCIsInRFbmQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiZSIsInRvdWNoZXMiLCJ0b3VjaFN0YXJ0RSIsInNjcm9sbFQiLCJzY3JvbGxMIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0Iiwib2Zmc2V0V2lkdGgiLCJzdGFydFkiLCJwYWdlWSIsInN0YXJ0WCIsInBhZ2VYIiwic2Nyb2xsSGVpZ2h0Iiwic2Nyb2xsV2lkdGgiLCJtb3ZlIiwidHkiLCJ0eCIsImRvd24iLCJyaWdodCIsInByZXZlbnREZWZhdWx0IiwidW5zaGlmdCIsInBvcCIsImVuZCIsInNldFRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwic2V0Iiwic3VwcG9ydCIsIndpbmRvdyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDdENBOzs7Ozs7OztBQVFBLEtBQUksQ0FBQ0EsT0FBT0MsSUFBWixFQUFrQjtBQUNoQkQsWUFBT0MsSUFBUCxHQUFlLFlBQVk7QUFDekIsYUFBSUMsaUJBQWlCRixPQUFPRyxTQUFQLENBQWlCRCxjQUF0QztBQUFBLGFBQ0lFLGlCQUFpQixDQUFFLEVBQUNDLFVBQVUsSUFBWCxFQUFELENBQW1CQyxvQkFBbkIsQ0FBd0MsVUFBeEMsQ0FEdEI7QUFBQSxhQUVJQyxZQUFZLENBQ1YsVUFEVSxFQUVWLGdCQUZVLEVBR1YsU0FIVSxFQUlWLGdCQUpVLEVBS1YsZUFMVSxFQU1WLHNCQU5VLEVB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U0FBRixHQUFjO0FBQ1ZrRSxjQUFLdEQsTUFESztBQUVWQyxpQkFBUSxrQkFBVSxDQUFFLENBRlY7QUFHVmQsaUJBQVFoQixhQUhFO0FBSVZNLGVBQU1BLElBSkk7QUFLVmdCLG9CQUFXQSxTQUxEO0FBTVZDLGtCQUFTQSxPQU5DO0FBT1Y2RCxrQkFBU25HLCtCQUErQixRQUEvQixHQUEwQ0QsdUJBQXVCLFlBQXZCLElBQXVDO0FBUGhGLE1BQWQ7O0FBVUE7QUFDQTZDO0FBRUgsRUE1V0QsRUE0V0l3RCxNQTVXSixFIiwiZmlsZSI6InBvbHlmaWxsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODFhMmQ0MjRjYWFlNWRhYTMzY2RcbiAqKi8iLCIvKipcbiAqIFBvbHlmaWxsXG4gKiAgICAgIE9iamVjdC5rZXlzXG4gKiAgICAgIEFycmF5LnByb3RvdHlwZS5pc0FycmF5XG4gKiAgICAgIFN0cmluZy5wcm90b3R5cGUudHJpbVxuICpcbiAqIEBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2tleXNcbiAqL1xuaWYgKCFPYmplY3Qua2V5cykge1xuICBPYmplY3Qua2V5cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxcbiAgICAgICAgaGFzRG9udEVudW1CdWcgPSAhKHt0b1N0cmluZzogbnVsbH0pLnByb3BlcnR5SXNFbnVtZXJhYmxlKCd0b1N0cmluZycpLFxuICAgICAgICBkb250RW51bXMgPSBbXG4gICAgICAgICAgJ3RvU3RyaW5nJyxcbiAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcnLFxuICAgICAgICAgICd2YWx1ZU9mJyxcbiAgICAgICAgICAnaGFzT3duUHJvcGVydHknLFxuICAgICAgICAgICdpc1Byb3RvdHlwZU9mJyxcbiAgICAgICAgICAncHJvcGVydHlJc0VudW1lcmFibGUnLFxuICAgICAgICAgICdjb25zdHJ1Y3RvcidcbiAgICAgICAgXSxcbiAgICAgICAgZG9udEVudW1zTGVuZ3RoID0gZG9udEVudW1zLmxlbmd0aDtcbiBcbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbicgfHwgb2JqID09PSBudWxsKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdPYmplY3Qua2V5cyBjYWxsZWQgb24gbm9uLW9iamVjdCcpO1xuIFxuICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuIFxuICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkgcmVzdWx0LnB1c2gocHJvcCk7XG4gICAgICB9XG4gXG4gICAgICBpZiAoaGFzRG9udEVudW1CdWcpIHtcbiAgICAgICAgZm9yICh2YXIgaT0wOyBpIDwgZG9udEVudW1zTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGRvbnRFbnVtc1tpXSkpIHJlc3VsdC5wdXNoKGRvbnRFbnVtc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9KSgpXG59O1xuXG5pZiAoIUFycmF5LmlzQXJyYXkpIHtcbiAgQXJyYXkuaXNBcnJheSA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfTtcbn1cblxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnRyaW0pIHtcbiAgU3RyaW5nLnByb3RvdHlwZS50cmltID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nLCAnJyk7XG4gIH07XG59XG5cbi8vIEVDTUEtMjYyIDXtjJAsIDE1LjQuNC4yMe2VreydmCDsnpHshLEg6rO87KCVXG4vLyDssLjqs6A6IGh0dHA6Ly9lczUuZ2l0aHViLmlvLyN4MTUuNC40LjIxXG5pZiAoIUFycmF5LnByb3RvdHlwZS5yZWR1Y2UpIHtcbiAgQXJyYXkucHJvdG90eXBlLnJlZHVjZSA9IGZ1bmN0aW9uKGNhbGxiYWNrIC8qLCBpbml0aWFsVmFsdWUqLykge1xuICAgICd1c2Ugc3RyaWN0JztcbiAgICBpZiAodGhpcyA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcnJheS5wcm90b3R5cGUucmVkdWNlIGNhbGxlZCBvbiBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGNhbGxiYWNrICsgJyBpcyBub3QgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICB2YXIgdCA9IE9iamVjdCh0aGlzKSwgbGVuID0gdC5sZW5ndGggPj4+IDAsIGsgPSAwLCB2YWx1ZTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSB7XG4gICAgICB2YWx1ZSA9IGFyZ3VtZW50c1sxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKGsgPCBsZW4gJiYgIShrIGluIHQpKSB7XG4gICAgICAgIGsrKztcbiAgICAgIH1cbiAgICAgIGlmIChrID49IGxlbikge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdSZWR1Y2Ugb2YgZW1wdHkgYXJyYXkgd2l0aCBubyBpbml0aWFsIHZhbHVlJyk7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHRbaysrXTtcbiAgICB9XG4gICAgZm9yICg7IGsgPCBsZW47IGsrKykge1xuICAgICAgaWYgKGsgaW4gdCkge1xuICAgICAgICB2YWx1ZSA9IGNhbGxiYWNrKHZhbHVlLCB0W2tdLCBrLCB0KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9O1xufVxuXG4vKlxuICogY2xhc3NMaXN0LmpzOiBDcm9zcy1icm93c2VyIGZ1bGwgZWxlbWVudC5jbGFzc0xpc3QgaW1wbGVtZW50YXRpb24uXG4gKiAxLjEuMjAxNTAzMTJcbiAqXG4gKiBCeSBFbGkgR3JleSwgaHR0cDovL2VsaWdyZXkuY29tXG4gKiBMaWNlbnNlOiBEZWRpY2F0ZWQgdG8gdGhlIHB1YmxpYyBkb21haW4uXG4gKiAgIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZWxpZ3JleS9jbGFzc0xpc3QuanMvYmxvYi9tYXN0ZXIvTElDRU5TRS5tZFxuICovXG5cbi8qZ2xvYmFsIHNlbGYsIGRvY3VtZW50LCBET01FeGNlcHRpb24gKi9cblxuLyohIEBzb3VyY2UgaHR0cDovL3B1cmwuZWxpZ3JleS5jb20vZ2l0aHViL2NsYXNzTGlzdC5qcy9ibG9iL21hc3Rlci9jbGFzc0xpc3QuanMgKi9cblxuaWYgKFwiZG9jdW1lbnRcIiBpbiBzZWxmKSB7XG5cbi8vIEZ1bGwgcG9seWZpbGwgZm9yIGJyb3dzZXJzIHdpdGggbm8gY2xhc3NMaXN0IHN1cHBvcnRcbi8vIEluY2x1ZGluZyBJRSA8IEVkZ2UgbWlzc2luZyBTVkdFbGVtZW50LmNsYXNzTGlzdFxuaWYgKCEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiX1wiKSkgXG4gICAgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TICYmICEoXCJjbGFzc0xpc3RcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLFwiZ1wiKSkpIHtcblxuKGZ1bmN0aW9uICh2aWV3KSB7XG5cblwidXNlIHN0cmljdFwiO1xuXG5pZiAoISgnRWxlbWVudCcgaW4gdmlldykpIHJldHVybjtcblxudmFyXG4gICAgICBjbGFzc0xpc3RQcm9wID0gXCJjbGFzc0xpc3RcIlxuICAgICwgcHJvdG9Qcm9wID0gXCJwcm90b3R5cGVcIlxuICAgICwgZWxlbUN0clByb3RvID0gdmlldy5FbGVtZW50W3Byb3RvUHJvcF1cbiAgICAsIG9iakN0ciA9IE9iamVjdFxuICAgICwgc3RyVHJpbSA9IFN0cmluZ1twcm90b1Byb3BdLnRyaW0gfHwgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCBcIlwiKTtcbiAgICB9XG4gICAgLCBhcnJJbmRleE9mID0gQXJyYXlbcHJvdG9Qcm9wXS5pbmRleE9mIHx8IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSB0aGlzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gVmVuZG9yczogcGxlYXNlIGFsbG93IGNvbnRlbnQgY29kZSB0byBpbnN0YW50aWF0ZSBET01FeGNlcHRpb25zXG4gICAgLCBET01FeCA9IGZ1bmN0aW9uICh0eXBlLCBtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY29kZSA9IERPTUV4Y2VwdGlvblt0eXBlXTtcbiAgICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG4gICAgLCBjaGVja1Rva2VuQW5kR2V0SW5kZXggPSBmdW5jdGlvbiAoY2xhc3NMaXN0LCB0b2tlbikge1xuICAgICAgICBpZiAodG9rZW4gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBET01FeChcbiAgICAgICAgICAgICAgICAgIFwiU1lOVEFYX0VSUlwiXG4gICAgICAgICAgICAgICAgLCBcIkFuIGludmFsaWQgb3IgaWxsZWdhbCBzdHJpbmcgd2FzIHNwZWNpZmllZFwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvXFxzLy50ZXN0KHRva2VuKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IERPTUV4KFxuICAgICAgICAgICAgICAgICAgXCJJTlZBTElEX0NIQVJBQ1RFUl9FUlJcIlxuICAgICAgICAgICAgICAgICwgXCJTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXJcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXJySW5kZXhPZi5jYWxsKGNsYXNzTGlzdCwgdG9rZW4pO1xuICAgIH1cbiAgICAsIENsYXNzTGlzdCA9IGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgICAgICB0cmltbWVkQ2xhc3NlcyA9IHN0clRyaW0uY2FsbChlbGVtLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpXG4gICAgICAgICAgICAsIGNsYXNzZXMgPSB0cmltbWVkQ2xhc3NlcyA/IHRyaW1tZWRDbGFzc2VzLnNwbGl0KC9cXHMrLykgOiBbXVxuICAgICAgICAgICAgLCBpID0gMFxuICAgICAgICAgICAgLCBsZW4gPSBjbGFzc2VzLmxlbmd0aFxuICAgICAgICA7XG4gICAgICAgIGZvciAoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHVzaChjbGFzc2VzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBlbGVtLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMudG9TdHJpbmcoKSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgICwgY2xhc3NMaXN0UHJvdG8gPSBDbGFzc0xpc3RbcHJvdG9Qcm9wXSA9IFtdXG4gICAgLCBjbGFzc0xpc3RHZXR0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2xhc3NMaXN0KHRoaXMpO1xuICAgIH1cbjtcbi8vIE1vc3QgRE9NRXhjZXB0aW9uIGltcGxlbWVudGF0aW9ucyBkb24ndCBhbGxvdyBjYWxsaW5nIERPTUV4Y2VwdGlvbidzIHRvU3RyaW5nKClcbi8vIG9uIG5vbi1ET01FeGNlcHRpb25zLiBFcnJvcidzIHRvU3RyaW5nKCkgaXMgc3VmZmljaWVudCBoZXJlLlxuRE9NRXhbcHJvdG9Qcm9wXSA9IEVycm9yW3Byb3RvUHJvcF07XG5jbGFzc0xpc3RQcm90by5pdGVtID0gZnVuY3Rpb24gKGkpIHtcbiAgICByZXR1cm4gdGhpc1tpXSB8fCBudWxsO1xufTtcbmNsYXNzTGlzdFByb3RvLmNvbnRhaW5zID0gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgdG9rZW4gKz0gXCJcIjtcbiAgICByZXR1cm4gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKSAhPT0gLTE7XG59O1xuY2xhc3NMaXN0UHJvdG8uYWRkID0gZnVuY3Rpb24gKCkge1xuICAgIHZhclxuICAgICAgICAgIHRva2VucyA9IGFyZ3VtZW50c1xuICAgICAgICAsIGkgPSAwXG4gICAgICAgICwgbCA9IHRva2Vucy5sZW5ndGhcbiAgICAgICAgLCB0b2tlblxuICAgICAgICAsIHVwZGF0ZWQgPSBmYWxzZVxuICAgIDtcbiAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaWYgKGNoZWNrVG9rZW5BbmRHZXRJbmRleCh0aGlzLCB0b2tlbikgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2godG9rZW4pO1xuICAgICAgICAgICAgdXBkYXRlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUgKCsraSA8IGwpO1xuXG4gICAgaWYgKHVwZGF0ZWQpIHtcbiAgICAgICAgdGhpcy5fdXBkYXRlQ2xhc3NOYW1lKCk7XG4gICAgfVxufTtcbmNsYXNzTGlzdFByb3RvLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXJcbiAgICAgICAgICB0b2tlbnMgPSBhcmd1bWVudHNcbiAgICAgICAgLCBpID0gMFxuICAgICAgICAsIGwgPSB0b2tlbnMubGVuZ3RoXG4gICAgICAgICwgdG9rZW5cbiAgICAgICAgLCB1cGRhdGVkID0gZmFsc2VcbiAgICAgICAgLCBpbmRleFxuICAgIDtcbiAgICBkbyB7XG4gICAgICAgIHRva2VuID0gdG9rZW5zW2ldICsgXCJcIjtcbiAgICAgICAgaW5kZXggPSBjaGVja1Rva2VuQW5kR2V0SW5kZXgodGhpcywgdG9rZW4pO1xuICAgICAgICB3aGlsZSAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgICB1cGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGluZGV4ID0gY2hlY2tUb2tlbkFuZEdldEluZGV4KHRoaXMsIHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB3aGlsZSAoKytpIDwgbCk7XG5cbiAgICBpZiAodXBkYXRlZCkge1xuICAgICAgICB0aGlzLl91cGRhdGVDbGFzc05hbWUoKTtcbiAgICB9XG59O1xuY2xhc3NMaXN0UHJvdG8udG9nZ2xlID0gZnVuY3Rpb24gKHRva2VuLCBmb3JjZSkge1xuICAgIHRva2VuICs9IFwiXCI7XG5cbiAgICB2YXJcbiAgICAgICAgICByZXN1bHQgPSB0aGlzLmNvbnRhaW5zKHRva2VuKVxuICAgICAgICAsIG1ldGhvZCA9IHJlc3VsdCA/XG4gICAgICAgICAgICBmb3JjZSAhPT0gdHJ1ZSAmJiBcInJlbW92ZVwiXG4gICAgICAgIDpcbiAgICAgICAgICAgIGZvcmNlICE9PSBmYWxzZSAmJiBcImFkZFwiXG4gICAgO1xuXG4gICAgaWYgKG1ldGhvZCkge1xuICAgICAgICB0aGlzW21ldGhvZF0odG9rZW4pO1xuICAgIH1cblxuICAgIGlmIChmb3JjZSA9PT0gdHJ1ZSB8fCBmb3JjZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGZvcmNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAhcmVzdWx0O1xuICAgIH1cbn07XG5jbGFzc0xpc3RQcm90by50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5qb2luKFwiIFwiKTtcbn07XG5cbmlmIChvYmpDdHIuZGVmaW5lUHJvcGVydHkpIHtcbiAgICB2YXIgY2xhc3NMaXN0UHJvcERlc2MgPSB7XG4gICAgICAgICAgZ2V0OiBjbGFzc0xpc3RHZXR0ZXJcbiAgICAgICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICAgICwgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfTtcbiAgICB0cnkge1xuICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgfSBjYXRjaCAoZXgpIHsgLy8gSUUgOCBkb2Vzbid0IHN1cHBvcnQgZW51bWVyYWJsZTp0cnVlXG4gICAgICAgIGlmIChleC5udW1iZXIgPT09IC0weDdGRjVFQzU0KSB7XG4gICAgICAgICAgICBjbGFzc0xpc3RQcm9wRGVzYy5lbnVtZXJhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICBvYmpDdHIuZGVmaW5lUHJvcGVydHkoZWxlbUN0clByb3RvLCBjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RQcm9wRGVzYyk7XG4gICAgICAgIH1cbiAgICB9XG59IGVsc2UgaWYgKG9iakN0cltwcm90b1Byb3BdLl9fZGVmaW5lR2V0dGVyX18pIHtcbiAgICBlbGVtQ3RyUHJvdG8uX19kZWZpbmVHZXR0ZXJfXyhjbGFzc0xpc3RQcm9wLCBjbGFzc0xpc3RHZXR0ZXIpO1xufVxuXG59KHNlbGYpKTtcblxufSBlbHNlIHtcbi8vIFRoZXJlIGlzIGZ1bGwgb3IgcGFydGlhbCBuYXRpdmUgY2xhc3NMaXN0IHN1cHBvcnQsIHNvIGp1c3QgY2hlY2sgaWYgd2UgbmVlZFxuLy8gdG8gbm9ybWFsaXplIHRoZSBhZGQvcmVtb3ZlIGFuZCB0b2dnbGUgQVBJcy5cblxuKGZ1bmN0aW9uICgpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciB0ZXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJfXCIpO1xuXG4gICAgdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImMxXCIsIFwiYzJcIik7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAvMTEgYW5kIEZpcmVmb3ggPDI2LCB3aGVyZSBjbGFzc0xpc3QuYWRkIGFuZFxuICAgIC8vIGNsYXNzTGlzdC5yZW1vdmUgZXhpc3QgYnV0IHN1cHBvcnQgb25seSBvbmUgYXJndW1lbnQgYXQgYSB0aW1lLlxuICAgIGlmICghdGVzdEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYzJcIikpIHtcbiAgICAgICAgdmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgICAgICAgdmFyIG9yaWdpbmFsID0gRE9NVG9rZW5MaXN0LnByb3RvdHlwZVttZXRob2RdO1xuXG4gICAgICAgICAgICBET01Ub2tlbkxpc3QucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgICAgIHZhciBpLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbC5jYWxsKHRoaXMsIHRva2VuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBjcmVhdGVNZXRob2QoJ2FkZCcpO1xuICAgICAgICBjcmVhdGVNZXRob2QoJ3JlbW92ZScpO1xuICAgIH1cblxuICAgIHRlc3RFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoXCJjM1wiLCBmYWxzZSk7XG5cbiAgICAvLyBQb2x5ZmlsbCBmb3IgSUUgMTAgYW5kIEZpcmVmb3ggPDI0LCB3aGVyZSBjbGFzc0xpc3QudG9nZ2xlIGRvZXMgbm90XG4gICAgLy8gc3VwcG9ydCB0aGUgc2Vjb25kIGFyZ3VtZW50LlxuICAgIGlmICh0ZXN0RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJjM1wiKSkge1xuICAgICAgICB2YXIgX3RvZ2dsZSA9IERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlO1xuXG4gICAgICAgIERPTVRva2VuTGlzdC5wcm90b3R5cGUudG9nZ2xlID0gZnVuY3Rpb24odG9rZW4sIGZvcmNlKSB7XG4gICAgICAgICAgICBpZiAoMSBpbiBhcmd1bWVudHMgJiYgIXRoaXMuY29udGFpbnModG9rZW4pID09PSAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9yY2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfdG9nZ2xlLmNhbGwodGhpcywgdG9rZW4pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgfVxuXG4gICAgdGVzdEVsZW1lbnQgPSBudWxsO1xufSgpKTtcblxufVxuXG59XG5cblxuLyohIE92ZXJ0aHJvdyB2LjAuMS4wLiBBbiBvdmVyZmxvdzphdXRvIHBvbHlmaWxsIGZvciByZXNwb25zaXZlIGRlc2lnbi4gKGMpIDIwMTI6IFNjb3R0IEplaGwsIEZpbGFtZW50IEdyb3VwLCBJbmMuIGh0dHA6Ly9maWxhbWVudGdyb3VwLmdpdGh1Yi5jb20vT3ZlcnRocm93L2xpY2Vuc2UudHh0ICovXG4oZnVuY3Rpb24oIHcsIHVuZGVmaW5lZCApe1xuICAgICBcbiAgICB2YXIgZG9jID0gdy5kb2N1bWVudCxcbiAgICAgICAgZG9jRWxlbSA9IGRvYy5kb2N1bWVudEVsZW1lbnQsXG4gICAgICAgIGNsYXNzdGV4dCA9IFwib3ZlcnRocm93LWVuYWJsZWRcIixcbiAgICAgXG4gICAgICAgIC8vIFRvdWNoIGV2ZW50cyBhcmUgdXNlZCBpbiB0aGUgcG9seWZpbGwsIGFuZCB0aHVzIGFyZSBhIHByZXJlcXVpc2l0ZVxuICAgICAgICBjYW5CZUZpbGxlZFdpdGhQb2x5ID0gXCJvbnRvdWNobW92ZVwiIGluIGRvYyxcbiAgICAgICAgIFxuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGF0dGVtcHRzIHRvIGRldGVybWluZSB3aGV0aGVyIHRoZSBicm93c2VyIGhhcyBuYXRpdmUgb3ZlcmZsb3cgc3VwcG9ydFxuICAgICAgICAvLyBzbyB3ZSBjYW4gZW5hYmxlIGl0IGJ1dCBub3QgcG9seWZpbGxcbiAgICAgICAgb3ZlcmZsb3dQcm9iYWJseUFscmVhZHlXb3JrcyA9IFxuICAgICAgICAgICAgLy8gRmVhdHVyZXMtZmlyc3QuIGlPUzUgb3ZlcmZsb3cgc2Nyb2xsaW5nIHByb3BlcnR5IGNoZWNrIC0gbm8gVUEgbmVlZGVkIGhlcmUuIHRoYW5rcyBBcHBsZSA6KVxuICAgICAgICAgICAgXCJXZWJraXRPdmVyZmxvd1Njcm9sbGluZ1wiIGluIGRvY0VsZW0uc3R5bGUgfHxcbiAgICAgICAgICAgIC8vIFRvdWNoIGV2ZW50cyBhcmVuJ3Qgc3VwcG9ydGVkIGFuZCBzY3JlZW4gd2lkdGggaXMgZ3JlYXRlciB0aGFuIFhcbiAgICAgICAgICAgIC8vIC4uLmJhc2ljYWxseSwgdGhpcyBpcyBhIGxvb3NlIFwiZGVza3RvcCBicm93c2VyXCIgY2hlY2suIFxuICAgICAgICAgICAgLy8gSXQgbWF5IHdyb25nbHkgb3B0LWluIHZlcnkgbGFyZ2UgdGFibGV0cyB3aXRoIG5vIHRvdWNoIHN1cHBvcnQuXG4gICAgICAgICAgICAoICFjYW5CZUZpbGxlZFdpdGhQb2x5ICYmIHcuc2NyZWVuLndpZHRoID4gMTIwMCApIHx8XG4gICAgICAgICAgICAvLyBIYW5nIG9uIHRvIHlvdXIgaGF0cy5cbiAgICAgICAgICAgIC8vIFdoaXRlbGlzdCBzb21lIHBvcHVsYXIsIG92ZXJmbG93LXN1cHBvcnRpbmcgbW9iaWxlIGJyb3dzZXJzIGZvciBub3cgYW5kIHRoZSBmdXR1cmVcbiAgICAgICAgICAgIC8vIFRoZXNlIGJyb3dzZXJzIGFyZSBrbm93biB0byBnZXQgb3ZlcmxvdyBzdXBwb3J0IHJpZ2h0LCBidXQgZ2l2ZSB1cyBubyB3YXkgb2YgZGV0ZWN0aW5nIGl0LlxuICAgICAgICAgICAgKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdmFyIHVhID0gdy5uYXZpZ2F0b3IudXNlckFnZW50LFxuICAgICAgICAgICAgICAgICAgICAvLyBXZWJraXQgY3Jvc3NlcyBwbGF0Zm9ybXMsIGFuZCB0aGUgYnJvd3NlcnMgb24gb3VyIGxpc3QgcnVuIGF0IGxlYXN0IHZlcnNpb24gNTM0XG4gICAgICAgICAgICAgICAgICAgIHdlYmtpdCA9IHVhLm1hdGNoKCAvQXBwbGVXZWJLaXRcXC8oWzAtOV0rKS8gKSxcbiAgICAgICAgICAgICAgICAgICAgd2t2ZXJzaW9uID0gd2Via2l0ICYmIHdlYmtpdFsxXSxcbiAgICAgICAgICAgICAgICAgICAgd2tMdGU1MzQgPSB3ZWJraXQgJiYgd2t2ZXJzaW9uID49IDUzNDtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIC8qIEFuZHJvaWQgMysgd2l0aCB3ZWJraXQgZ3RlIDUzNFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoTGludXg7IFU7IEFuZHJvaWQgMy4wOyBlbi11czsgWG9vbSBCdWlsZC9IUkkzOSkgQXBwbGVXZWJLaXQvNTM0LjEzIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi80LjAgU2FmYXJpLzUzNC4xMyAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL0FuZHJvaWQgKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDMgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogQmxhY2tiZXJyeSA3KyB3aXRoIHdlYmtpdCBndGUgNTM0XG4gICAgICAgICAgICAgICAgICAgIH46IE1vemlsbGEvNS4wIChCbGFja0JlcnJ5OyBVOyBCbGFja0JlcnJ5IDk5MDA7IGVuLVVTKSBBcHBsZVdlYktpdC81MzQuMTErIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi83LjAuMCBNb2JpbGUgU2FmYXJpLzUzNC4xMSsgKi9cbiAgICAgICAgICAgICAgICAgICAgdWEubWF0Y2goIC8gVmVyc2lvblxcLyhbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSAwICYmIHcuYmxhY2tiZXJyeSAmJiB3a0x0ZTUzNCB8fFxuICAgICAgICAgICAgICAgICAgICAvKiBCbGFja2JlcnJ5IFBsYXlib29rIHdpdGggd2Via2l0IGd0ZSA1MzRcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKFBsYXlCb29rOyBVOyBSSU0gVGFibGV0IE9TIDEuMC4wOyBlbi1VUykgQXBwbGVXZWJLaXQvNTM0LjgrIChLSFRNTCwgbGlrZSBHZWNrbykgVmVyc2lvbi8wLjAuMSBTYWZhcmkvNTM0LjgrICovICBcbiAgICAgICAgICAgICAgICAgICAgdWEuaW5kZXhPZiggL1BsYXlCb29rLyApID4gLTEgJiYgUmVnRXhwLiQxID49IDAgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogRmlyZWZveCBNb2JpbGUgKEZlbm5lYykgNCBhbmQgdXBcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKE1hY2ludG9zaDsgSW50ZWwgTWFjIE9TIFggMTAuNzsgcnY6Mi4xLjEpIEdlY2tvLyBGaXJlZm94LzQuMC4ycHJlIEZlbm5lYy80LjAuICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvRmVubmVjXFwvKFswLTldKykvICkgJiYgUmVnRXhwLiQxID49IDQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogV2ViT1MgMyBhbmQgdXAgKFRvdWNoUGFkIHRvbylcbiAgICAgICAgICAgICAgICAgICAgfjogTW96aWxsYS81LjAgKGhwLXRhYmxldDsgTGludXg7IGhwd09TLzMuMC4wOyBVOyBlbi1VUykgQXBwbGVXZWJLaXQvNTM0LjYgKEtIVE1MLCBsaWtlIEdlY2tvKSB3T1NCcm93c2VyLzIzMy40OCBTYWZhcmkvNTM0LjYgVG91Y2hQYWQvMS4wICovXG4gICAgICAgICAgICAgICAgICAgIHVhLm1hdGNoKCAvd09TQnJvd3NlclxcLyhbMC05XSspLyApICYmIFJlZ0V4cC4kMSA+PSAyMzMgJiYgd2tMdGU1MzQgfHxcbiAgICAgICAgICAgICAgICAgICAgLyogTm9raWEgQnJvd3NlciBOOFxuICAgICAgICAgICAgICAgICAgICB+OiBNb3ppbGxhLzUuMCAoU3ltYmlhbi8zOyBTZXJpZXM2MC81LjIgTm9raWFOOC0wMC8wMTIuMDAyOyBQcm9maWxlL01JRFAtMi4xIENvbmZpZ3VyYXRpb24vQ0xEQy0xLjEgKSBBcHBsZVdlYktpdC81MzMuNCAoS0hUTUwsIGxpa2UgR2Vja28pIE5va2lhQnJvd3Nlci83LjMuMCBNb2JpbGUgU2FmYXJpLzUzMy40IDNncHAtZ2JhIFxuICAgICAgICAgICAgICAgICAgICB+OiBOb3RlOiB0aGUgTjkgZG9lc24ndCBoYXZlIG5hdGl2ZSBvdmVyZmxvdyB3aXRoIG9uZS1maW5nZXIgdG91Y2guIHd0ZiAqL1xuICAgICAgICAgICAgICAgICAgICB1YS5tYXRjaCggL05va2lhQnJvd3NlclxcLyhbMC05XFwuXSspLyApICYmIHBhcnNlRmxvYXQoUmVnRXhwLiQxKSA9PT0gNy4zICYmIHdlYmtpdCAmJiB3a3ZlcnNpb24gPj0gNTMzXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICAgXG4gICAgICAgIC8vIEVhc2luZyBjYW4gdXNlIGFueSBvZiBSb2JlcnQgUGVubmVyJ3MgZXF1YXRpb25zIChodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vZWFzaW5nX3Rlcm1zX29mX3VzZS5odG1sKS4gQnkgZGVmYXVsdCwgb3ZlcnRocm93IGluY2x1ZGVzIGVhc2Utb3V0LWN1YmljXG4gICAgICAgIC8vIGFyZ3VtZW50czogdCA9IGN1cnJlbnQgaXRlcmF0aW9uLCBiID0gaW5pdGlhbCB2YWx1ZSwgYyA9IGVuZCB2YWx1ZSwgZCA9IHRvdGFsIGl0ZXJhdGlvbnNcbiAgICAgICAgLy8gdXNlIHcub3ZlcnRocm93LmVhc2luZyB0byBwcm92aWRlIGEgY3VzdG9tIGZ1bmN0aW9uIGV4dGVybmFsbHksIG9yIHBhc3MgYW4gZWFzaW5nIGZ1bmN0aW9uIGFzIGEgY2FsbGJhY2sgdG8gdGhlIHRvc3MgbWV0aG9kXG4gICAgICAgIGRlZmF1bHRFYXNpbmcgPSBmdW5jdGlvbiAodCwgYiwgYywgZCkge1xuICAgICAgICAgICAgcmV0dXJuIGMqKCh0PXQvZC0xKSp0KnQgKyAxKSArIGI7XG4gICAgICAgIH0sICBcbiAgICAgICAgICAgICBcbiAgICAgICAgZW5hYmxlZCA9IGZhbHNlLFxuICAgICAgICAgXG4gICAgICAgIC8vIEtlZXBlciBvZiBpbnRlcnZhbHNcbiAgICAgICAgdGltZUtlZXBlcixcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgIC8qIHRvc3Mgc2Nyb2xscyBhbmQgZWxlbWVudCB3aXRoIGVhc2luZ1xuICAgICAgICAgXG4gICAgICAgIC8vIGVsZW0gaXMgdGhlIGVsZW1lbnQgdG8gc2Nyb2xsXG4gICAgICAgIC8vIG9wdGlvbnMgaGFzaDpcbiAgICAgICAgICAgICogbGVmdCBpcyB0aGUgZGVzaXJlZCBob3Jpem9udGFsIHNjcm9sbC4gRGVmYXVsdCBpcyBcIiswXCIuIEZvciByZWxhdGl2ZSBkaXN0YW5jZXMsIHBhc3MgYSBzdHJpbmcgd2l0aCBcIitcIiBvciBcIi1cIiBpbiBmcm9udC5cbiAgICAgICAgICAgICogdG9wIGlzIHRoZSBkZXNpcmVkIHZlcnRpY2FsIHNjcm9sbC4gRGVmYXVsdCBpcyBcIiswXCIuIEZvciByZWxhdGl2ZSBkaXN0YW5jZXMsIHBhc3MgYSBzdHJpbmcgd2l0aCBcIitcIiBvciBcIi1cIiBpbiBmcm9udC5cbiAgICAgICAgICAgICogZHVyYXRpb24gaXMgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhlIHRocm93IHdpbGwgdGFrZS4gRGVmYXVsdCBpcyAxMDAuXG4gICAgICAgICAgICAqIGVhc2luZyBpcyBhbiBvcHRpb25hbCBjdXN0b20gZWFzaW5nIGZ1bmN0aW9uLiBEZWZhdWx0IGlzIHcub3ZlcnRocm93LmVhc2luZy4gTXVzdCBmb2xsb3cgdGhlIGVhc2luZyBmdW5jdGlvbiBzaWduYXR1cmUgXG4gICAgICAgICovXG4gICAgICAgIHRvc3MgPSBmdW5jdGlvbiggZWxlbSwgb3B0aW9ucyApe1xuICAgICAgICAgICAgdmFyIGkgPSAwLFxuICAgICAgICAgICAgICAgIHNMZWZ0ID0gZWxlbS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgIHNUb3AgPSBlbGVtLnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAvLyBUb3NzIGRlZmF1bHRzXG4gICAgICAgICAgICAgICAgbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBcIiswXCIsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IFwiKzBcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiB3Lm92ZXJ0aHJvdy5lYXNpbmdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZExlZnQsIGVuZFRvcDtcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIE1peGluIGJhc2VkIG9uIHByZWRlZmluZWQgZGVmYXVsdHNcbiAgICAgICAgICAgIGlmKCBvcHRpb25zICl7XG4gICAgICAgICAgICAgICAgZm9yKCB2YXIgaiBpbiBvICl7XG4gICAgICAgICAgICAgICAgICAgIGlmKCBvcHRpb25zWyBqIF0gIT09IHVuZGVmaW5lZCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgb1sgaiBdID0gb3B0aW9uc1sgaiBdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQ29udmVydCByZWxhdGl2ZSB2YWx1ZXMgdG8gaW50c1xuICAgICAgICAgICAgLy8gRmlyc3QgdGhlIGxlZnQgdmFsXG4gICAgICAgICAgICBpZiggdHlwZW9mIG8ubGVmdCA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgICAgICAgICAgIG8ubGVmdCA9IHBhcnNlRmxvYXQoIG8ubGVmdCApO1xuICAgICAgICAgICAgICAgIGVuZExlZnQgPSBvLmxlZnQgKyBzTGVmdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZExlZnQgPSBvLmxlZnQ7XG4gICAgICAgICAgICAgICAgby5sZWZ0ID0gby5sZWZ0IC0gc0xlZnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGVuIHRoZSB0b3AgdmFsXG4gICAgICAgICAgICBpZiggdHlwZW9mIG8udG9wID09PSBcInN0cmluZ1wiICl7XG4gICAgICAgICAgICAgICAgby50b3AgPSBwYXJzZUZsb2F0KCBvLnRvcCApO1xuICAgICAgICAgICAgICAgIGVuZFRvcCA9IG8udG9wICsgc1RvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuZFRvcCA9IG8udG9wO1xuICAgICAgICAgICAgICAgIG8udG9wID0gby50b3AgLSBzVG9wO1xuICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgdGltZUtlZXBlciA9IHNldEludGVydmFsKGZ1bmN0aW9uKCl7ICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiggaSsrIDwgby5kdXJhdGlvbiApe1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgPSBvLmVhc2luZyggaSwgc0xlZnQsIG8ubGVmdCwgby5kdXJhdGlvbiApO1xuICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IG8uZWFzaW5nKCBpLCBzVG9wLCBvLnRvcCwgby5kdXJhdGlvbiApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBpZiggZW5kTGVmdCAhPT0gZWxlbS5zY3JvbGxMZWZ0ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbExlZnQgPSBlbmRMZWZ0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCBlbmRUb3AgIT09IGVsZW0uc2Nyb2xsVG9wICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IGVuZFRvcDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAxICk7XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBSZXR1cm4gdGhlIHZhbHVlcywgcG9zdC1taXhpbiwgd2l0aCBlbmQgdmFsdWVzIHNwZWNpZmllZFxuICAgICAgICAgICAgcmV0dXJuIHsgdG9wOiBlbmRUb3AsIGxlZnQ6IGVuZExlZnQsIGR1cmF0aW9uOiBvLmR1cmF0aW9uLCBlYXNpbmc6IG8uZWFzaW5nIH07XG4gICAgICAgIH0sXG4gICAgICAgICBcbiAgICAgICAgLy8gZmluZCBjbG9zZXN0IG92ZXJ0aHJvdyAoZWxlbSBvciBhIHBhcmVudClcbiAgICAgICAgY2xvc2VzdCA9IGZ1bmN0aW9uKCB0YXJnZXQsIGFzY2VuZCApe1xuICAgICAgICAgICAgcmV0dXJuICFhc2NlbmQgJiYgdGFyZ2V0LmNsYXNzTmFtZSAmJiB0YXJnZXQuY2xhc3NOYW1lLmluZGV4T2YoIFwib3ZlcnRocm93XCIgKSA+IC0xICYmIHRhcmdldCB8fCBjbG9zZXN0KCB0YXJnZXQucGFyZW50Tm9kZSApO1xuICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gSW50ZXJjZXB0IGFueSB0aHJvdyBpbiBwcm9ncmVzc1xuICAgICAgICBpbnRlcmNlcHQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCggdGltZUtlZXBlciApO1xuICAgICAgICB9LFxuICAgICAgICAgICAgIFxuICAgICAgICAvLyBFbmFibGUgYW5kIHBvdGVudGlhbGx5IHBvbHlmaWxsIG92ZXJmbG93XG4gICAgICAgIGVuYWJsZSA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gSWYgaXQncyBvbiwgXG4gICAgICAgICAgICBpZiggZW5hYmxlZCApe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEl0J3Mgb24uXG4gICAgICAgICAgICBlbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBJZiBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIG9yIGF0IGxlYXN0IHRoZSBlbGVtZW50IGNhbkJlRmlsbGVkV2l0aFBvbHksIGFkZCBhIGNsYXNzIHRvIGN1ZSBDU1MgdGhhdCBhc3N1bWVzIG92ZXJmbG93IHNjcm9sbGluZyB3aWxsIHdvcmsgKHNldHRpbmcgaGVpZ2h0IG9uIGVsZW1lbnRzIGFuZCBzdWNoKVxuICAgICAgICAgICAgaWYoIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3MgfHwgY2FuQmVGaWxsZWRXaXRoUG9seSApe1xuICAgICAgICAgICAgICAgIGRvY0VsZW0uY2xhc3NOYW1lICs9IFwiIFwiICsgY2xhc3N0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIERlc3Ryb3kgZXZlcnl0aGluZyBsYXRlci4gSWYgeW91IHdhbnQgdG8uXG4gICAgICAgICAgICB3Lm92ZXJ0aHJvdy5mb3JnZXQgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIC8vIFN0cmlwIHRoZSBjbGFzcyBuYW1lIGZyb20gZG9jRWxlbVxuICAgICAgICAgICAgICAgIGRvY0VsZW0uY2xhc3NOYW1lID0gZG9jRWxlbS5jbGFzc05hbWUucmVwbGFjZSggY2xhc3N0ZXh0LCBcIlwiICk7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRvdWNoIGJpbmRpbmcgKGNoZWNrIGZvciBtZXRob2Qgc3VwcG9ydCBzaW5jZSB0aGlzIHBhcnQgaXNuJ3QgcXVhbGlmaWVkIGJ5IHRvdWNoIHN1cHBvcnQgbGlrZSB0aGUgcmVzdClcbiAgICAgICAgICAgICAgICBpZiggZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIgKXtcbiAgICAgICAgICAgICAgICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoIFwidG91Y2hzdGFydFwiLCBzdGFydCwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgZWFzaW5nIHRvIGRlZmF1bHRcbiAgICAgICAgICAgICAgICB3Lm92ZXJ0aHJvdy5lYXNpbmcgPSBkZWZhdWx0RWFzaW5nO1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBMZXQgJ2VtIGtub3dcbiAgICAgICAgICAgICAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9O1xuICAgICBcbiAgICAgICAgICAgIC8vIElmIG92ZXJmbG93UHJvYmFibHlBbHJlYWR5V29ya3Mgb3IgaXQgZG9lc24ndCBsb29rIGxpa2UgdGhlIGJyb3dzZXIgY2FuQmVGaWxsZWRXaXRoUG9seSwgb3VyIGpvYiBpcyBkb25lIGhlcmUuIEV4aXQgdmlld3BvcnQgbGVmdC5cbiAgICAgICAgICAgIGlmKCBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzIHx8ICFjYW5CZUZpbGxlZFdpdGhQb2x5ICl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuIFxuICAgICAgICAgICAgLy8gRmlsbCAnZXIgdXAhXG4gICAgICAgICAgICAvLyBGcm9tIGhlcmUgZG93biwgYWxsIGxvZ2ljIGlzIGFzc29jaWF0ZWQgd2l0aCB0b3VjaCBzY3JvbGwgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICAvLyBlbGVtIHJlZmVyZW5jZXMgdGhlIG92ZXJ0aHJvdyBlbGVtZW50IGluIHVzZVxuICAgICAgICAgICAgdmFyIGVsZW0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IHNldmVyYWwgWSB2YWx1ZXMgYXJlIGtlcHQgaGVyZVxuICAgICAgICAgICAgICAgIGxhc3RUb3BzID0gW10sXG4gICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBUaGUgbGFzdCBzZXZlcmFsIFggdmFsdWVzIGFyZSBrZXB0IGhlcmVcbiAgICAgICAgICAgICAgICBsYXN0TGVmdHMgPSBbXSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gbGFzdERvd24gd2lsbCBiZSB0cnVlIGlmIHRoZSBsYXN0IHNjcm9sbCBkaXJlY3Rpb24gd2FzIGRvd24sIGZhbHNlIGlmIGl0IHdhcyB1cFxuICAgICAgICAgICAgICAgIGxhc3REb3duLFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBsYXN0UmlnaHQgd2lsbCBiZSB0cnVlIGlmIHRoZSBsYXN0IHNjcm9sbCBkaXJlY3Rpb24gd2FzIHJpZ2h0LCBmYWxzZSBpZiBpdCB3YXMgbGVmdFxuICAgICAgICAgICAgICAgIGxhc3RSaWdodCxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRm9yIGEgbmV3IGdlc3R1cmUsIG9yIGNoYW5nZSBpbiBkaXJlY3Rpb24sIHJlc2V0IHRoZSB2YWx1ZXMgZnJvbSBsYXN0IHNjcm9sbFxuICAgICAgICAgICAgICAgIHJlc2V0VmVydFRyYWNraW5nID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRvcHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdERvd24gPSBudWxsO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJlc2V0SG9yVHJhY2tpbmcgPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBsYXN0TGVmdHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFJpZ2h0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBBZnRlciByZWxlYXNpbmcgdG91Y2hlbmQsIHRocm93IHRoZSBvdmVydGhyb3cgZWxlbWVudCwgZGVwZW5kaW5nIG9uIG1vbWVudHVtXG4gICAgICAgICAgICAgICAgZmluaXNoU2Nyb2xsID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgLy8gQ29tZSB1cCB3aXRoIGEgZGlzdGFuY2UgYW5kIGR1cmF0aW9uIGJhc2VkIG9uIGhvdyBcbiAgICAgICAgICAgICAgICAgICAgLy8gTXVsdGlwbGllcnMgYXJlIHR3ZWFrZWQgdG8gYSBjb21mb3J0YWJsZSBiYWxhbmNlIGFjcm9zcyBwbGF0Zm9ybXNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvcCA9ICggbGFzdFRvcHNbIDAgXSAtIGxhc3RUb3BzWyBsYXN0VG9wcy5sZW5ndGggLTEgXSApICogOCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoIGxhc3RMZWZ0c1sgMCBdIC0gbGFzdExlZnRzWyBsYXN0TGVmdHMubGVuZ3RoIC0xIF0gKSAqIDgsXG4gICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IE1hdGgubWF4KCBNYXRoLmFicyggbGVmdCApLCBNYXRoLmFicyggdG9wICkgKSAvIDg7XG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gTWFrZSB0b3AgYW5kIGxlZnQgcmVsYXRpdmUtc3R5bGUgc3RyaW5ncyAocG9zaXRpdmUgdmFscyBuZWVkIFwiK1wiIHByZWZpeClcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gKCB0b3AgPiAwID8gXCIrXCIgOiBcIlwiICkgKyB0b3A7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSAoIGxlZnQgPiAwID8gXCIrXCIgOiBcIlwiICkgKyBsZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGVyZSdzIGEgc2lnbmlmaWNhbnQgYW1vdW50IG9mIHRocm93IGludm9sdmVkLCBvdGhlcndpc2UsIGp1c3Qgc3RheSBzdGlsbFxuICAgICAgICAgICAgICAgICAgICBpZiggIWlzTmFOKCBkdXJhdGlvbiApICYmIGR1cmF0aW9uID4gMCAmJiAoIE1hdGguYWJzKCBsZWZ0ICkgPiA4MCB8fCBNYXRoLmFicyggdG9wICkgPiA4MCApICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b3NzKCBlbGVtLCB7IGxlZnQ6IGxlZnQsIHRvcDogdG9wLCBkdXJhdGlvbjogZHVyYXRpb24gfSApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBPbiB3ZWJraXQsIHRvdWNoIGV2ZW50cyBoYXJkbHkgdHJpY2tsZSB0aHJvdWdoIHRleHRhcmVhcyBhbmQgaW5wdXRzXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsaW5nIENTUyBwb2ludGVyIGV2ZW50cyBtYWtlcyBzdXJlIHRoZXkgZG8sIGJ1dCBpdCBhbHNvIG1ha2VzIHRoZSBjb250cm9scyBpbm5hY2Nlc3NpYmxlXG4gICAgICAgICAgICAgICAgLy8gVG9nZ2xpbmcgcG9pbnRlciBldmVudHMgYXQgdGhlIHJpZ2h0IG1vbWVudHMgc2VlbXMgdG8gZG8gdGhlIHRyaWNrXG4gICAgICAgICAgICAgICAgLy8gVGhhbmtzIFRob21hcyBCYWNoZW0gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNTc5ODY4MSBmb3IgdGhlIGZvbGxvd2luZ1xuICAgICAgICAgICAgICAgIGlucHV0cyxcbiAgICAgICAgICAgICAgICBzZXRQb2ludGVycyA9IGZ1bmN0aW9uKCB2YWwgKXtcbiAgICAgICAgICAgICAgICAgICAgaW5wdXRzID0gZWxlbS5xdWVyeVNlbGVjdG9yQWxsKCBcInRleHRhcmVhLCBpbnB1dFwiICk7XG4gICAgICAgICAgICAgICAgICAgIGZvciggdmFyIGkgPSAwLCBpbCA9IGlucHV0cy5sZW5ndGg7IGkgPCBpbDsgaSsrICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXRzWyBpIF0uc3R5bGUucG9pbnRlckV2ZW50cyA9IHZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIEZvciBuZXN0ZWQgb3ZlcnRocm93cywgY2hhbmdlU2Nyb2xsVGFyZ2V0IHJlc3RhcnRzIGEgdG91Y2ggZXZlbnQgY3ljbGUgb24gYSBwYXJlbnQgb3IgY2hpbGQgb3ZlcnRocm93XG4gICAgICAgICAgICAgICAgY2hhbmdlU2Nyb2xsVGFyZ2V0ID0gZnVuY3Rpb24oIHN0YXJ0RXZlbnQsIGFzY2VuZCApe1xuICAgICAgICAgICAgICAgICAgICBpZiggZG9jLmNyZWF0ZUV2ZW50ICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VGFyZ2V0ID0gKCAhYXNjZW5kIHx8IGFzY2VuZCA9PT0gdW5kZWZpbmVkICkgJiYgZWxlbS5wYXJlbnROb2RlIHx8IGVsZW0udG91Y2hjaGlsZCB8fCBlbGVtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRFbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBuZXdUYXJnZXQgIT09IGVsZW0gKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0RW5kID0gZG9jLmNyZWF0ZUV2ZW50KCBcIkhUTUxFdmVudHNcIiApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRFbmQuaW5pdEV2ZW50KCBcInRvdWNoZW5kXCIsIHRydWUsIHRydWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLmRpc3BhdGNoRXZlbnQoIHRFbmQgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXQudG91Y2hjaGlsZCA9IGVsZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbSA9IG5ld1RhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdUYXJnZXQuZGlzcGF0Y2hFdmVudCggc3RhcnRFdmVudCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gVG91Y2hzdGFydCBoYW5kbGVyXG4gICAgICAgICAgICAgICAgLy8gT24gdG91Y2hzdGFydCwgdG91Y2htb3ZlIGFuZCB0b3VjaGVuZCBhcmUgZnJlc2hseSBib3VuZCwgYW5kIGFsbCB0aHJlZSBzaGFyZSBhIGJ1bmNoIG9mIHZhcnMgc2V0IGJ5IHRvdWNoc3RhcnRcbiAgICAgICAgICAgICAgICAvLyBUb3VjaGVuZCB1bmJpbmRzIHRoZW0gYWdhaW4sIHVudGlsIG5leHQgdGltZVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBTdG9wIGFueSB0aHJvdyBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgICAgICAgICBpbnRlcmNlcHQoKTtcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBSZXNldCB0aGUgZGlzdGFuY2UgYW5kIGRpcmVjdGlvbiB0cmFja2luZ1xuICAgICAgICAgICAgICAgICAgICByZXNldFZlcnRUcmFja2luZygpO1xuICAgICAgICAgICAgICAgICAgICByZXNldEhvclRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW0gPSBjbG9zZXN0KCBlLnRhcmdldCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiggIWVsZW0gfHwgZWxlbSA9PT0gZG9jRWxlbSB8fCBlLnRvdWNoZXMubGVuZ3RoID4gMSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9ICAgICAgICAgICBcbiBcbiAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwibm9uZVwiICk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0b3VjaFN0YXJ0RSA9IGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxUID0gZWxlbS5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxMID0gZWxlbS5zY3JvbGxMZWZ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydFkgPSBlLnRvdWNoZXNbIDAgXS5wYWdlWSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WCA9IGUudG91Y2hlc1sgMCBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsSGVpZ2h0ID0gZWxlbS5zY3JvbGxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxXaWR0aCA9IGVsZW0uc2Nyb2xsV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRvdWNobW92ZSBoYW5kbGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb3ZlID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHkgPSBzY3JvbGxUICsgc3RhcnRZIC0gZS50b3VjaGVzWyAwIF0ucGFnZVksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gc2Nyb2xsTCArIHN0YXJ0WCAtIGUudG91Y2hlc1sgMCBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3duID0gdHkgPj0gKCBsYXN0VG9wcy5sZW5ndGggPyBsYXN0VG9wc1sgMCBdIDogMCApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByaWdodCA9IHR4ID49ICggbGFzdExlZnRzLmxlbmd0aCA/IGxhc3RMZWZ0c1sgMCBdIDogMCApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUncyByb29tIHRvIHNjcm9sbCB0aGUgY3VycmVudCBjb250YWluZXIsIHByZXZlbnQgdGhlIGRlZmF1bHQgd2luZG93IHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCAoIHR5ID4gMCAmJiB0eSA8IHNjcm9sbEhlaWdodCAtIGhlaWdodCApIHx8ICggdHggPiAwICYmIHR4IDwgc2Nyb2xsV2lkdGggLSB3aWR0aCApICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhpcyBidWJibGluZyBpcyBkdW1iLiBOZWVkcyBhIHJldGhpbmsuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoYW5nZVNjcm9sbFRhcmdldCggdG91Y2hTdGFydEUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIGRvd24gYW5kIGxhc3REb3duIGFyZSBpbmVxdWFsLCB0aGUgeSBzY3JvbGwgaGFzIGNoYW5nZWQgZGlyZWN0aW9uLiBSZXNldCB0cmFja2luZy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggbGFzdERvd24gJiYgZG93biAhPT0gbGFzdERvd24gKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzZXRWZXJ0VHJhY2tpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElmIHJpZ2h0IGFuZCBsYXN0UmlnaHQgYXJlIGluZXF1YWwsIHRoZSB4IHNjcm9sbCBoYXMgY2hhbmdlZCBkaXJlY3Rpb24uIFJlc2V0IHRyYWNraW5nLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0UmlnaHQgJiYgcmlnaHQgIT09IGxhc3RSaWdodCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNldEhvclRyYWNraW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyByZW1lbWJlciB0aGUgbGFzdCBkaXJlY3Rpb24gaW4gd2hpY2ggd2Ugd2VyZSBoZWFkZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0RG93biA9IGRvd247XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFJpZ2h0ID0gcmlnaHQ7ICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHRoZSBjb250YWluZXIncyBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtLnNjcm9sbFRvcCA9IHR5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uc2Nyb2xsTGVmdCA9IHR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RUb3BzLnVuc2hpZnQoIHR5ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdExlZnRzLnVuc2hpZnQoIHR4ICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGxhc3RUb3BzLmxlbmd0aCA+IDMgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdFRvcHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBsYXN0TGVmdHMubGVuZ3RoID4gMyApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0TGVmdHMucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVG91Y2hlbmQgaGFuZGxlclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gZnVuY3Rpb24oIGUgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBtb21lbnR1bSBiYXNlZCBlYXNpbmcgZm9yIGEgZ3JhY2VmdWwgZmluaXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmluaXNoU2Nyb2xsKCk7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJyaW5nIHRoZSBwb2ludGVycyBiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwiYXV0b1wiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0UG9pbnRlcnMoIFwibm9uZVwiICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDUwICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKCBcInRvdWNobW92ZVwiLCBtb3ZlLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lciggXCJ0b3VjaGVuZFwiLCBlbmQsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaG1vdmVcIiwgbW92ZSwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKCBcInRvdWNoZW5kXCIsIGVuZCwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEJpbmQgdG8gdG91Y2gsIGhhbmRsZSBtb3ZlIGFuZCBlbmQgd2l0aGluXG4gICAgICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggXCJ0b3VjaHN0YXJ0XCIsIHN0YXJ0LCBmYWxzZSApO1xuICAgICAgICB9O1xuICAgICAgICAgXG4gICAgLy8gRXhwb3NlIG92ZXJ0aHJvdyBBUElcbiAgICB3Lm92ZXJ0aHJvdyA9IHtcbiAgICAgICAgc2V0OiBlbmFibGUsXG4gICAgICAgIGZvcmdldDogZnVuY3Rpb24oKXt9LFxuICAgICAgICBlYXNpbmc6IGRlZmF1bHRFYXNpbmcsXG4gICAgICAgIHRvc3M6IHRvc3MsXG4gICAgICAgIGludGVyY2VwdDogaW50ZXJjZXB0LFxuICAgICAgICBjbG9zZXN0OiBjbG9zZXN0LFxuICAgICAgICBzdXBwb3J0OiBvdmVyZmxvd1Byb2JhYmx5QWxyZWFkeVdvcmtzID8gXCJuYXRpdmVcIiA6IGNhbkJlRmlsbGVkV2l0aFBvbHkgJiYgXCJwb2x5ZmlsbGVkXCIgfHwgXCJub25lXCJcbiAgICB9O1xuICAgICBcbiAgICAvLyBBdXRvLWluaXRcbiAgICBlbmFibGUoKTtcbiAgICAgICAgIFxufSkoIHdpbmRvdyApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL3BvbHlmaWxsLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==