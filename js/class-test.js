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
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TEST = function () {
		function TEST(options) {
			_classCallCheck(this, TEST);
	
			if ((typeof opstions === 'undefined' ? 'undefined' : _typeof(opstions)) !== 'object' && Array.isArray(options)) return undefined;
			var a = options.a;
			var b = options.b;
			var c = options.c;
			var d = options.d;
	
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
		}
	
		_createClass(TEST, [{
			key: 'log',
			get: function get() {
				console.log(this.a, this.b, this.c, this.d);
			}
		}]);
	
		return TEST;
	}();
	
	var opts = { a: 1, b: 2, c: 3, d: 4 },
	    a = new TEST(opts);
	console.log(a.log);

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmRhNGE1MDdjZTI1MzdjYTIwNjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NsYXNzLXRlc3QuanMiXSwibmFtZXMiOlsiVEVTVCIsIm9wdGlvbnMiLCJvcHN0aW9ucyIsIkFycmF5IiwiaXNBcnJheSIsInVuZGVmaW5lZCIsImEiLCJiIiwiYyIsImQiLCJjb25zb2xlIiwibG9nIiwib3B0cyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztLQ3BDTUEsSTtBQUNMLGdCQUFhQyxPQUFiLEVBQXNCO0FBQUE7O0FBQ3JCLE9BQUssUUFBT0MsUUFBUCx5Q0FBT0EsUUFBUCxPQUFvQixRQUFwQixJQUFnQ0MsTUFBTUMsT0FBTixDQUFjSCxPQUFkLENBQXJDLEVBQThELE9BQU9JLFNBQVA7QUFEekMsT0FFaEJDLENBRmdCLEdBRUZMLE9BRkUsQ0FFaEJLLENBRmdCO0FBQUEsT0FFYkMsQ0FGYSxHQUVGTixPQUZFLENBRWJNLENBRmE7QUFBQSxPQUVWQyxDQUZVLEdBRUZQLE9BRkUsQ0FFVk8sQ0FGVTtBQUFBLE9BRVBDLENBRk8sR0FFRlIsT0FGRSxDQUVQUSxDQUZPOztBQUdyQixRQUFLSCxDQUFMLEdBQVNBLENBQVQ7QUFDQSxRQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxRQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQSxRQUFLQyxDQUFMLEdBQVNBLENBQVQ7QUFDQTs7Ozt1QkFFUztBQUNUQyxZQUFRQyxHQUFSLENBQVksS0FBS0wsQ0FBakIsRUFBb0IsS0FBS0MsQ0FBekIsRUFBNEIsS0FBS0MsQ0FBakMsRUFBb0MsS0FBS0MsQ0FBekM7QUFDQTs7Ozs7O0FBR0YsS0FBSUcsT0FBTyxFQUFDTixHQUFHLENBQUosRUFBT0MsR0FBRyxDQUFWLEVBQWFDLEdBQUcsQ0FBaEIsRUFBbUJDLEdBQUcsQ0FBdEIsRUFBWDtBQUFBLEtBQ0VILElBQUksSUFBSU4sSUFBSixDQUFTWSxJQUFULENBRE47QUFFQUYsU0FBUUMsR0FBUixDQUFZTCxFQUFFSyxHQUFkLEUiLCJmaWxlIjoiY2xhc3MtdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDJkYTRhNTA3Y2UyNTM3Y2EyMDYzXG4gKiovIiwiXG5cbmNsYXNzIFRFU1Qge1xuXHRjb25zdHJ1Y3Rvciggb3B0aW9ucyApe1xuXHRcdGlmICggdHlwZW9mIG9wc3Rpb25zICE9PSAnb2JqZWN0JyAmJiBBcnJheS5pc0FycmF5KG9wdGlvbnMpICkgcmV0dXJuIHVuZGVmaW5lZDtcblx0XHR2YXIge2EsIGIsIGMsIGR9ID0gb3B0aW9ucztcblx0XHR0aGlzLmEgPSBhO1xuXHRcdHRoaXMuYiA9IGI7XG5cdFx0dGhpcy5jID0gYztcblx0XHR0aGlzLmQgPSBkO1xuXHR9XG5cblx0Z2V0IGxvZygpIHtcblx0XHRjb25zb2xlLmxvZyh0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQpO1xuXHR9XG59XG5cbnZhciBvcHRzID0ge2E6IDEsIGI6IDIsIGM6IDMsIGQ6IDR9LFxuXHQgYSA9IG5ldyBURVNUKG9wdHMpO1xuY29uc29sZS5sb2coYS5sb2cpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NsYXNzLXRlc3QuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9