(function(e) {
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = e()
	} else if (typeof define === "function" && define.amd) {
		define([], e)
	} else {
		var t;
		if (typeof window !== "undefined") {
			t = window
		} else if (typeof global !== "undefined") {
			t = global
		} else if (typeof self !== "undefined") {
			t = self
		} else {
			t = this
		}
		t.flvjs = e()
	}
})(function() {
	var e, t, r;
	return function e(t, r, n) {
		function i(s, o) {
			if (!r[s]) {
				if (!t[s]) {
					var u = typeof require == "function" && require;
					if (!o && u) return u(s, !0);
					if (a) return a(s, !0);
					var l = new Error("Cannot find module '" + s + "'");
					throw l.code = "MODULE_NOT_FOUND", l
				}
				var f = r[s] = {
					exports: {}
				};
				t[s][0].call(f.exports, function(e) {
					var r = t[s][1][e];
					return i(r ? r : e)
				}, f, f.exports, e, t, r, n)
			}
			return r[s].exports
		}
		var a = typeof require == "function" && require;
		for (var s = 0; s < n.length; s++) i(n[s]);
		return i
	}({
		1: [
			function(t, r, n) {
				(function(i, a) {
					(function(t, i) {
						typeof n === "object" && typeof r !== "undefined" ? r.exports = i() : typeof e === "function" && e.amd ? e(i) : t.ES6Promise = i()
					})(this, function() {
						"use strict";

						function e(e) {
							return typeof e === "function" || typeof e === "object" && e !== null
						}

						function r(e) {
							return typeof e === "function"
						}
						var n = undefined;
						if (!Array.isArray) {
							n = function(e) {
								return Object.prototype.toString.call(e) === "[object Array]"
							}
						} else {
							n = Array.isArray
						}
						var s = n;
						var o = 0;
						var u = undefined;
						var l = undefined;
						var f = function e(t, r) {
							k[o] = t;
							k[o + 1] = r;
							o += 2;
							if (o === 2) {
								if (l) {
									l(w)
								} else {
									T()
								}
							}
						};

						function d(e) {
							l = e
						}

						function h(e) {
							f = e
						}
						var c = typeof window !== "undefined" ? window : undefined;
						var _ = c || {};
						var v = _.MutationObserver || _.WebKitMutationObserver;
						var m = typeof self === "undefined" && typeof i !== "undefined" && {}.toString.call(i) === "[object process]";
						var p = typeof Uint8ClampedArray !== "undefined" && typeof importScripts !== "undefined" && typeof MessageChannel !== "undefined";

						function g() {
							return function() {
								return i.nextTick(w)
							}
						}

						function y() {
							if (typeof u !== "undefined") {
								return function() {
									u(w)
								}
							}
							return S()
						}

						function E() {
							var e = 0;
							var t = new v(w);
							var r = document.createTextNode("");
							t.observe(r, {
								characterData: true
							});
							return function() {
								r.data = e = ++e % 2
							}
						}

						function b() {
							var e = new MessageChannel;
							e.port1.onmessage = w;
							return function() {
								return e.port2.postMessage(0)
							}
						}

						function S() {
							var e = setTimeout;
							return function() {
								return e(w, 1)
							}
						}
						var k = new Array(1e3);

						function w() {
							for (var e = 0; e < o; e += 2) {
								var t = k[e];
								var r = k[e + 1];
								t(r);
								k[e] = undefined;
								k[e + 1] = undefined
							}
							o = 0
						}

						function L() {
							try {
								var e = t;
								var r = e("vertx");
								u = r.runOnLoop || r.runOnContext;
								return y()
							} catch (e) {
								return S()
							}
						}
						var T = undefined;
						if (m) {
							T = g()
						} else if (v) {
							T = E()
						} else if (p) {
							T = b()
						} else if (c === undefined && typeof t === "function") {
							T = L()
						} else {
							T = S()
						}

						function O(e, t) {
							var r = arguments;
							var n = this;
							var i = new this.constructor(I);
							if (i[R] === undefined) {
								te(i)
							}
							var a = n._state;
							if (a) {
								(function() {
									var e = r[a - 1];
									f(function() {
										return Q(a, i, e, n._result)
									})
								})()
							} else {
								W(n, i, e, t)
							}
							return i
						}

						function A(e) {
							var t = this;
							if (e && typeof e === "object" && e.constructor === t) {
								return e
							}
							var r = new t(I);
							z(r, e);
							return r
						}
						var R = Math.random().toString(36).substring(16);

						function I() {}
						var C = void 0;
						var x = 1;
						var M = 2;
						var D = new X;

						function j() {
							return new TypeError("You cannot resolve a promise with itself")
						}

						function P() {
							return new TypeError("A promises callback cannot return that same promise.")
						}

						function B(e) {
							try {
								return e.then
							} catch (e) {
								D.error = e;
								return D
							}
						}

						function N(e, t, r, n) {
							try {
								e.call(t, r, n)
							} catch (e) {
								return e
							}
						}

						function U(e, t, r) {
							f(function(e) {
								var n = false;
								var i = N(r, t, function(r) {
									if (n) {
										return
									}
									n = true;
									if (t !== r) {
										z(e, r)
									} else {
										H(e, r)
									}
								}, function(t) {
									if (n) {
										return
									}
									n = true;
									K(e, t)
								}, "Settle: " + (e._label || " unknown promise"));
								if (!n && i) {
									n = true;
									K(e, i)
								}
							}, e)
						}

						function F(e, t) {
							if (t._state === x) {
								H(e, t._result)
							} else if (t._state === M) {
								K(e, t._result)
							} else {
								W(t, undefined, function(t) {
									return z(e, t)
								}, function(t) {
									return K(e, t)
								})
							}
						}

						function G(e, t, n) {
							if (t.constructor === e.constructor && n === O && t.constructor.resolve === A) {
								F(e, t)
							} else {
								if (n === D) {
									K(e, D.error)
								} else if (n === undefined) {
									H(e, t)
								} else if (r(n)) {
									U(e, t, n)
								} else {
									H(e, t)
								}
							}
						}

						function z(t, r) {
							if (t === r) {
								K(t, j())
							} else if (e(r)) {
								G(t, r, B(r))
							} else {
								H(t, r)
							}
						}

						function V(e) {
							if (e._onerror) {
								e._onerror(e._result)
							}
							q(e)
						}

						function H(e, t) {
							if (e._state !== C) {
								return
							}
							e._result = t;
							e._state = x;
							if (e._subscribers.length !== 0) {
								f(q, e)
							}
						}

						function K(e, t) {
							if (e._state !== C) {
								return
							}
							e._state = M;
							e._result = t;
							f(V, e)
						}

						function W(e, t, r, n) {
							var i = e._subscribers;
							var a = i.length;
							e._onerror = null;
							i[a] = t;
							i[a + x] = r;
							i[a + M] = n;
							if (a === 0 && e._state) {
								f(q, e)
							}
						}

						function q(e) {
							var t = e._subscribers;
							var r = e._state;
							if (t.length === 0) {
								return
							}
							var n = undefined,
								i = undefined,
								a = e._result;
							for (var s = 0; s < t.length; s += 3) {
								n = t[s];
								i = t[s + r];
								if (n) {
									Q(r, n, i, a)
								} else {
									i(a)
								}
							}
							e._subscribers.length = 0
						}

						function X() {
							this.error = null
						}
						var Y = new X;

						function Z(e, t) {
							try {
								return e(t)
							} catch (e) {
								Y.error = e;
								return Y
							}
						}

						function Q(e, t, n, i) {
							var a = r(n),
								s = undefined,
								o = undefined,
								u = undefined,
								l = undefined;
							if (a) {
								s = Z(n, i);
								if (s === Y) {
									l = true;
									o = s.error;
									s = null
								} else {
									u = true
								} if (t === s) {
									K(t, P());
									return
								}
							} else {
								s = i;
								u = true
							} if (t._state !== C) {} else if (a && u) {
								z(t, s)
							} else if (l) {
								K(t, o)
							} else if (e === x) {
								H(t, s)
							} else if (e === M) {
								K(t, s)
							}
						}

						function J(e, t) {
							try {
								t(function t(r) {
									z(e, r)
								}, function t(r) {
									K(e, r)
								})
							} catch (t) {
								K(e, t)
							}
						}
						var $ = 0;

						function ee() {
							return $++
						}

						function te(e) {
							e[R] = $++;
							e._state = undefined;
							e._result = undefined;
							e._subscribers = []
						}

						function re(e, t) {
							this._instanceConstructor = e;
							this.promise = new e(I);
							if (!this.promise[R]) {
								te(this.promise)
							}
							if (s(t)) {
								this._input = t;
								this.length = t.length;
								this._remaining = t.length;
								this._result = new Array(this.length);
								if (this.length === 0) {
									H(this.promise, this._result)
								} else {
									this.length = this.length || 0;
									this._enumerate();
									if (this._remaining === 0) {
										H(this.promise, this._result)
									}
								}
							} else {
								K(this.promise, ne())
							}
						}

						function ne() {
							return new Error("Array Methods must be provided an Array")
						}
						re.prototype._enumerate = function() {
							var e = this.length;
							var t = this._input;
							for (var r = 0; this._state === C && r < e; r++) {
								this._eachEntry(t[r], r)
							}
						};
						re.prototype._eachEntry = function(e, t) {
							var r = this._instanceConstructor;
							var n = r.resolve;
							if (n === A) {
								var i = B(e);
								if (i === O && e._state !== C) {
									this._settledAt(e._state, t, e._result)
								} else if (typeof i !== "function") {
									this._remaining--;
									this._result[t] = e
								} else if (r === le) {
									var a = new r(I);
									G(a, e, i);
									this._willSettleAt(a, t)
								} else {
									this._willSettleAt(new r(function(t) {
										return t(e)
									}), t)
								}
							} else {
								this._willSettleAt(n(e), t)
							}
						};
						re.prototype._settledAt = function(e, t, r) {
							var n = this.promise;
							if (n._state === C) {
								this._remaining--;
								if (e === M) {
									K(n, r)
								} else {
									this._result[t] = r
								}
							}
							if (this._remaining === 0) {
								H(n, this._result)
							}
						};
						re.prototype._willSettleAt = function(e, t) {
							var r = this;
							W(e, undefined, function(e) {
								return r._settledAt(x, t, e)
							}, function(e) {
								return r._settledAt(M, t, e)
							})
						};

						function ie(e) {
							return new re(this, e).promise
						}

						function ae(e) {
							var t = this;
							if (!s(e)) {
								return new t(function(e, t) {
									return t(new TypeError("You must pass an array to race."))
								})
							} else {
								return new t(function(r, n) {
									var i = e.length;
									for (var a = 0; a < i; a++) {
										t.resolve(e[a]).then(r, n)
									}
								})
							}
						}

						function se(e) {
							var t = this;
							var r = new t(I);
							K(r, e);
							return r
						}

						function oe() {
							throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
						}

						function ue() {
							throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
						}

						function le(e) {
							this[R] = ee();
							this._result = this._state = undefined;
							this._subscribers = [];
							if (I !== e) {
								typeof e !== "function" && oe();
								this instanceof le ? J(this, e) : ue()
							}
						}
						le.all = ie;
						le.race = ae;
						le.resolve = A;
						le.reject = se;
						le._setScheduler = d;
						le._setAsap = h;
						le._asap = f;
						le.prototype = {
							constructor: le,
							then: O,
							catch: function e(t) {
								return this.then(null, t)
							}
						};

						function fe() {
							var e = undefined;
							if (typeof a !== "undefined") {
								e = a
							} else if (typeof self !== "undefined") {
								e = self
							} else {
								try {
									e = Function("return this")()
								} catch (e) {
									throw new Error("polyfill failed because global object is unavailable in this environment")
								}
							}
							var t = e.Promise;
							if (t) {
								var r = null;
								try {
									r = Object.prototype.toString.call(t.resolve())
								} catch (e) {}
								if (r === "[object Promise]" && !t.cast) {
									return
								}
							}
							e.Promise = le
						}
						le.polyfill = fe;
						le.Promise = le;
						return le
					})
				}).call(this, t("_process"), typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
			}, {
				_process: 3
			}
		],
		2: [
			function(e, t, r) {
				function n() {
					this._events = this._events || {};
					this._maxListeners = this._maxListeners || undefined
				}
				t.exports = n;
				n.EventEmitter = n;
				n.prototype._events = undefined;
				n.prototype._maxListeners = undefined;
				n.defaultMaxListeners = 10;
				n.prototype.setMaxListeners = function(e) {
					if (!a(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
					this._maxListeners = e;
					return this
				};
				n.prototype.emit = function(e) {
					var t, r, n, a, u, l;
					if (!this._events) this._events = {};
					if (e === "error") {
						if (!this._events.error || s(this._events.error) && !this._events.error.length) {
							t = arguments[1];
							if (t instanceof Error) {
								throw t
							} else {
								var f = new Error('Uncaught, unspecified "error" event. (' + t + ")");
								f.context = t;
								throw f
							}
						}
					}
					r = this._events[e];
					if (o(r)) return false;
					if (i(r)) {
						switch (arguments.length) {
							case 1:
								r.call(this);
								break;
							case 2:
								r.call(this, arguments[1]);
								break;
							case 3:
								r.call(this, arguments[1], arguments[2]);
								break;
							default:
								a = Array.prototype.slice.call(arguments, 1);
								r.apply(this, a)
						}
					} else if (s(r)) {
						a = Array.prototype.slice.call(arguments, 1);
						l = r.slice();
						n = l.length;
						for (u = 0; u < n; u++) l[u].apply(this, a)
					}
					return true
				};
				n.prototype.addListener = function(e, t) {
					var r;
					if (!i(t)) throw TypeError("listener must be a function");
					if (!this._events) this._events = {};
					if (this._events.newListener) this.emit("newListener", e, i(t.listener) ? t.listener : t);
					if (!this._events[e]) this._events[e] = t;
					else if (s(this._events[e])) this._events[e].push(t);
					else this._events[e] = [this._events[e], t]; if (s(this._events[e]) && !this._events[e].warned) {
						if (!o(this._maxListeners)) {
							r = this._maxListeners
						} else {
							r = n.defaultMaxListeners
						} if (r && r > 0 && this._events[e].length > r) {
							this._events[e].warned = true;
							console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
							if (typeof console.trace === "function") {
								console.trace()
							}
						}
					}
					return this
				};
				n.prototype.on = n.prototype.addListener;
				n.prototype.once = function(e, t) {
					if (!i(t)) throw TypeError("listener must be a function");
					var r = false;

					function n() {
						this.removeListener(e, n);
						if (!r) {
							r = true;
							t.apply(this, arguments)
						}
					}
					n.listener = t;
					this.on(e, n);
					return this
				};
				n.prototype.removeListener = function(e, t) {
					var r, n, a, o;
					if (!i(t)) throw TypeError("listener must be a function");
					if (!this._events || !this._events[e]) return this;
					r = this._events[e];
					a = r.length;
					n = -1;
					if (r === t || i(r.listener) && r.listener === t) {
						delete this._events[e];
						if (this._events.removeListener) this.emit("removeListener", e, t)
					} else if (s(r)) {
						for (o = a; o-- > 0;) {
							if (r[o] === t || r[o].listener && r[o].listener === t) {
								n = o;
								break
							}
						}
						if (n < 0) return this;
						if (r.length === 1) {
							r.length = 0;
							delete this._events[e]
						} else {
							r.splice(n, 1)
						} if (this._events.removeListener) this.emit("removeListener", e, t)
					}
					return this
				};
				n.prototype.removeAllListeners = function(e) {
					var t, r;
					if (!this._events) return this;
					if (!this._events.removeListener) {
						if (arguments.length === 0) this._events = {};
						else if (this._events[e]) delete this._events[e];
						return this
					}
					if (arguments.length === 0) {
						for (t in this._events) {
							if (t === "removeListener") continue;
							this.removeAllListeners(t)
						}
						this.removeAllListeners("removeListener");
						this._events = {};
						return this
					}
					r = this._events[e];
					if (i(r)) {
						this.removeListener(e, r)
					} else if (r) {
						while (r.length) this.removeListener(e, r[r.length - 1])
					}
					delete this._events[e];
					return this
				};
				n.prototype.listeners = function(e) {
					var t;
					if (!this._events || !this._events[e]) t = [];
					else if (i(this._events[e])) t = [this._events[e]];
					else t = this._events[e].slice();
					return t
				};
				n.prototype.listenerCount = function(e) {
					if (this._events) {
						var t = this._events[e];
						if (i(t)) return 1;
						else if (t) return t.length
					}
					return 0
				};
				n.listenerCount = function(e, t) {
					return e.listenerCount(t)
				};

				function i(e) {
					return typeof e === "function"
				}

				function a(e) {
					return typeof e === "number"
				}

				function s(e) {
					return typeof e === "object" && e !== null
				}

				function o(e) {
					return e === void 0
				}
			}, {}
		],
		3: [
			function(e, t, r) {
				var n = t.exports = {};
				var i;
				var a;

				function s() {
					throw new Error("setTimeout has not been defined")
				}

				function o() {
					throw new Error("clearTimeout has not been defined")
				}(function() {
					try {
						if (typeof setTimeout === "function") {
							i = setTimeout
						} else {
							i = s
						}
					} catch (e) {
						i = s
					}
					try {
						if (typeof clearTimeout === "function") {
							a = clearTimeout
						} else {
							a = o
						}
					} catch (e) {
						a = o
					}
				})();

				function u(e) {
					if (i === setTimeout) {
						return setTimeout(e, 0)
					}
					if ((i === s || !i) && setTimeout) {
						i = setTimeout;
						return setTimeout(e, 0)
					}
					try {
						return i(e, 0)
					} catch (t) {
						try {
							return i.call(null, e, 0)
						} catch (t) {
							return i.call(this, e, 0)
						}
					}
				}

				function l(e) {
					if (a === clearTimeout) {
						return clearTimeout(e)
					}
					if ((a === o || !a) && clearTimeout) {
						a = clearTimeout;
						return clearTimeout(e)
					}
					try {
						return a(e)
					} catch (t) {
						try {
							return a.call(null, e)
						} catch (t) {
							return a.call(this, e)
						}
					}
				}
				var f = [];
				var d = false;
				var h;
				var c = -1;

				function _() {
					if (!d || !h) {
						return
					}
					d = false;
					if (h.length) {
						f = h.concat(f)
					} else {
						c = -1
					} if (f.length) {
						v()
					}
				}

				function v() {
					if (d) {
						return
					}
					var e = u(_);
					d = true;
					var t = f.length;
					while (t) {
						h = f;
						f = [];
						while (++c < t) {
							if (h) {
								h[c].run()
							}
						}
						c = -1;
						t = f.length
					}
					h = null;
					d = false;
					l(e)
				}
				n.nextTick = function(e) {
					var t = new Array(arguments.length - 1);
					if (arguments.length > 1) {
						for (var r = 1; r < arguments.length; r++) {
							t[r - 1] = arguments[r]
						}
					}
					f.push(new m(e, t));
					if (f.length === 1 && !d) {
						u(v)
					}
				};

				function m(e, t) {
					this.fun = e;
					this.array = t
				}
				m.prototype.run = function() {
					this.fun.apply(null, this.array)
				};
				n.title = "browser";
				n.browser = true;
				n.env = {};
				n.argv = [];
				n.version = "";
				n.versions = {};

				function p() {}
				n.on = p;
				n.addListener = p;
				n.once = p;
				n.off = p;
				n.removeListener = p;
				n.removeAllListeners = p;
				n.emit = p;
				n.binding = function(e) {
					throw new Error("process.binding is not supported")
				};
				n.cwd = function() {
					return "/"
				};
				n.chdir = function(e) {
					throw new Error("process.chdir is not supported")
				};
				n.umask = function() {
					return 0
				}
			}, {}
		],
		4: [
			function(e, t, r) {
				var n = arguments[3];
				var i = arguments[4];
				var a = arguments[5];
				var s = JSON.stringify;
				t.exports = function(e, t) {
					var r;
					var o = Object.keys(a);
					for (var u = 0, l = o.length; u < l; u++) {
						var f = o[u];
						var d = a[f].exports;
						if (d === e || d && d.
							default === e) {
							r = f;
							break
						}
					}
					if (!r) {
						r = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
						var h = {};
						for (var u = 0, l = o.length; u < l; u++) {
							var f = o[u];
							h[f] = f
						}
						i[r] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), h]
					}
					var c = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
					var _ = {};
					_[r] = r;
					i[c] = [Function(["require"], "var f = require(" + s(r) + ");" + "(f.default ? f.default : f)(self);"), _];
					var v = {};
					m(c);

					function m(e) {
						v[e] = true;
						for (var t in i[e][1]) {
							var r = i[e][1][t];
							if (!v[r]) {
								m(r)
							}
						}
					}
					var p = "(" + n + ")({" + Object.keys(v).map(function(e) {
						return s(e) + ":[" + i[e][0] + "," + s(i[e][1]) + "]"
					}).join(",") + "},{},[" + s(c) + "])";
					var g = window.URL || window.webkitURL || window.mozURL || window.msURL;
					var y = new Blob([p], {
						type: "text/javascript"
					});
					if (t && t.bare) {
						return y
					}
					var E = g.createObjectURL(y);
					var b = new Worker(E);
					b.objectURL = E;
					return b
				}
			}, {}
		],
		5: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				r.createDefaultConfig = i;
				var n = r.defaultConfig = {
					enableWorker: false,
					enableStashBuffer: true,
					stashInitialSize: undefined,
					isLive: false,
					lazyLoad: true,
					lazyLoadMaxDuration: 3 * 60,
					deferLoadAfterSourceOpen: true,
					statisticsInfoReportInterval: 600,
					accurateSeek: false,
					seekType: "range",
					seekParamStart: "bstart",
					seekParamEnd: "bend",
					rangeLoadZeroStart: false,
					customSeekHandler: undefined
				};

				function i() {
					return Object.assign({}, n)
				}
			}, {}
		],
		6: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../io/io-controller.js");
				var a = o(i);
				var s = e("../config.js");

				function o(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function u(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var l = function() {
					function e() {
						u(this, e)
					}
					n(e, null, [{
						key: "supportMSEH264Playback",
						value: function e() {
							return window.MediaSource && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
						}
					}, {
						key: "supportNetworkStreamIO",
						value: function e() {
							var t = new a.
							default ({}, (0, s.createDefaultConfig)());
							var r = t.loaderType;
							t.destroy();
							return r == "fetch-stream-loader" || r == "xhr-moz-chunked-loader"
						}
					}, {
						key: "getNetworkLoaderTypeName",
						value: function e() {
							var t = new a.
							default ({}, (0, s.createDefaultConfig)());
							var r = t.loaderType;
							t.destroy();
							return r
						}
					}, {
						key: "supportNativeMediaPlayback",
						value: function t(r) {
							if (e.videoElement == undefined) {
								e.videoElement = window.document.createElement("video")
							}
							var n = e.videoElement.canPlayType(r);
							return n === "probably" || n == "maybe"
						}
					}, {
						key: "getFeatureList",
						value: function t() {
							var r = {
								mseFlvPlayback: false,
								mseLiveFlvPlayback: false,
								networkStreamIO: false,
								networkLoaderName: "",
								nativeMP4H264Playback: false,
								nativeWebmVP8Playback: false,
								nativeWebmVP9Playback: false
							};
							r.mseFlvPlayback = e.supportMSEH264Playback();
							r.networkStreamIO = e.supportNetworkStreamIO();
							r.networkLoaderName = e.getNetworkLoaderTypeName();
							r.mseLiveFlvPlayback = r.mseFlvPlayback && r.networkStreamIO;
							r.nativeMP4H264Playback = e.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
							r.nativeWebmVP8Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"');
							r.nativeWebmVP9Playback = e.supportNativeMediaPlayback('video/webm; codecs="vp9"');
							return r
						}
					}]);
					return e
				}();
				r.
				default = l
			}, {
				"../config.js": 5,
				"../io/io-controller.js": 23
			}
		],
		7: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e() {
						i(this, e);
						this.mimeType = null;
						this.duration = null;
						this.hasAudio = null;
						this.hasVideo = null;
						this.audioCodec = null;
						this.videoCodec = null;
						this.audioDataRate = null;
						this.videoDataRate = null;
						this.audioSampleRate = null;
						this.audioChannelCount = null;
						this.width = null;
						this.height = null;
						this.fps = null;
						this.profile = null;
						this.level = null;
						this.chromaFormat = null;
						this.sarNum = null;
						this.sarDen = null;
						this.metadata = null;
						this.segments = null;
						this.segmentCount = null;
						this.hasKeyframesIndex = null;
						this.keyframesIndex = null
					}
					n(e, [{
						key: "isComplete",
						value: function e() {
							var t = this.hasAudio === false || this.hasAudio === true && this.audioCodec != null && this.audioSampleRate != null && this.audioChannelCount != null;
							var r = this.hasVideo === false || this.hasVideo === true && this.videoCodec != null && this.width != null && this.height != null && this.fps != null && this.profile != null && this.level != null && this.chromaFormat != null && this.sarNum != null && this.sarDen != null;
							return this.mimeType != null && this.duration != null && this.metadata != null && this.hasKeyframesIndex != null && t && r
						}
					}, {
						key: "isSeekable",
						value: function e() {
							return this.hasKeyframesIndex === true
						}
					}, {
						key: "getNearestKeyframe",
						value: function e(t) {
							if (this.keyframesIndex == null) {
								return null
							}
							var r = this.keyframesIndex;
							var n = this._search(r.times, t);
							return {
								index: n,
								milliseconds: r.times[n],
								fileposition: r.filepositions[n]
							}
						}
					}, {
						key: "_search",
						value: function e(t, r) {
							var n = 0;
							var i = t.length - 1;
							var a = 0;
							var s = 0;
							var o = i;
							if (r < t[0]) {
								n = 0;
								s = o + 1
							}
							while (s <= o) {
								a = s + Math.floor((o - s) / 2);
								if (a === i || r >= t[a] && r < t[a + 1]) {
									n = a;
									break
								} else if (t[a] < r) {
									s = a + 1
								} else {
									o = a - 1
								}
							}
							return n
						}
					}]);
					return e
				}();
				r.
				default = a
			}, {}
		],
		8: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = r.SampleInfo = function e(t, r, n, a, s) {
					i(this, e);
					this.dts = t;
					this.pts = r;
					this.duration = n;
					this.originalDts = a;
					this.isSyncPoint = s;
					this.fileposition = null
				};
				var s = r.MediaSegmentInfo = function() {
					function e() {
						i(this, e);
						this.beginDts = 0;
						this.endDts = 0;
						this.beginPts = 0;
						this.endPts = 0;
						this.originalBeginDts = 0;
						this.originalEndDts = 0;
						this.syncPoints = [];
						this.firstSample = null;
						this.lastSample = null
					}
					n(e, [{
						key: "appendSyncPoint",
						value: function e(t) {
							t.isSyncPoint = true;
							this.syncPoints.push(t)
						}
					}]);
					return e
				}();
				var o = r.IDRSampleList = function() {
					function e() {
						i(this, e);
						this._list = []
					}
					n(e, [{
						key: "clear",
						value: function e() {
							this._list = []
						}
					}, {
						key: "appendArray",
						value: function e(t) {
							var r = this._list;
							if (t.length === 0) {
								return
							}
							if (r.length > 0 && t[0].originalDts < r[r.length - 1].originalDts) {
								this.clear()
							}
							Array.prototype.push.apply(r, t)
						}
					}, {
						key: "getLastSyncPointBeforeDts",
						value: function e(t) {
							if (this._list.length == 0) {
								return null
							}
							var r = this._list;
							var n = 0;
							var i = r.length - 1;
							var a = 0;
							var s = 0;
							var o = i;
							if (t < r[0].dts) {
								n = 0;
								s = o + 1
							}
							while (s <= o) {
								a = s + Math.floor((o - s) / 2);
								if (a === i || t >= r[a].dts && t < r[a + 1].dts) {
									n = a;
									break
								} else if (r[a].dts < t) {
									s = a + 1
								} else {
									o = a - 1
								}
							}
							return this._list[n]
						}
					}]);
					return e
				}();
				var u = r.MediaSegmentInfoList = function() {
					function e(t) {
						i(this, e);
						this._type = t;
						this._list = [];
						this._lastAppendLocation = -1
					}
					n(e, [{
						key: "isEmpty",
						value: function e() {
							return this._list.length === 0
						}
					}, {
						key: "clear",
						value: function e() {
							this._list = [];
							this._lastAppendLocation = -1
						}
					}, {
						key: "_searchNearestSegmentBefore",
						value: function e(t) {
							var r = this._list;
							if (r.length === 0) {
								return -2
							}
							var n = r.length - 1;
							var i = 0;
							var a = 0;
							var s = n;
							var o = 0;
							if (t < r[0].originalBeginDts) {
								o = -1;
								return o
							}
							while (a <= s) {
								i = a + Math.floor((s - a) / 2);
								if (i === n || t > r[i].lastSample.originalDts && t < r[i + 1].originalBeginDts) {
									o = i;
									break
								} else if (r[i].originalBeginDts < t) {
									a = i + 1
								} else {
									s = i - 1
								}
							}
							return o
						}
					}, {
						key: "_searchNearestSegmentAfter",
						value: function e(t) {
							return this._searchNearestSegmentBefore(t) + 1
						}
					}, {
						key: "append",
						value: function e(t) {
							var r = this._list;
							var n = t;
							var i = this._lastAppendLocation;
							var a = 0;
							if (i !== -1 && i < r.length && n.originalBeginDts >= r[i].lastSample.originalDts && (i === r.length - 1 || i < r.length - 1 && n.originalBeginDts < r[i + 1].originalBeginDts)) {
								a = i + 1
							} else {
								if (r.length > 0) {
									a = this._searchNearestSegmentBefore(n.originalBeginDts) + 1
								}
							}
							this._lastAppendLocation = a;
							this._list.splice(a, 0, n)
						}
					}, {
						key: "getLastSegmentBefore",
						value: function e(t) {
							var r = this._searchNearestSegmentBefore(t);
							if (r >= 0) {
								return this._list[r]
							} else {
								return null
							}
						}
					}, {
						key: "getLastSampleBefore",
						value: function e(t) {
							var r = this.getLastSegmentBefore(t);
							if (r != null) {
								return r.lastSample
							} else {
								return null
							}
						}
					}, {
						key: "getLastSyncPointBefore",
						value: function e(t) {
							var r = this._searchNearestSegmentBefore(t);
							var n = this._list[r].syncPoints;
							while (n.length === 0 && r > 0) {
								r--;
								n = this._list[r].syncPoints
							}
							if (n.length > 0) {
								return n[n.length - 1]
							} else {
								return null
							}
						}
					}, {
						key: "type",
						get: function e() {
							return this._type
						}
					}, {
						key: "length",
						get: function e() {
							return this._list.length
						}
					}]);
					return e
				}()
			}, {}
		],
		9: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("events");
				var a = _(i);
				var s = e("../utils/logger.js");
				var o = _(s);
				var u = e("../utils/browser.js");
				var l = _(u);
				var f = e("./mse-events.js");
				var d = _(f);
				var h = e("./media-segment-info.js");
				var c = e("../utils/exception.js");

				function _(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function v(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var m = function() {
					function e() {
						v(this, e);
						this.TAG = "MSEController";
						this._emitter = new a.
						default;
						this.e = {
							onSourceOpen: this._onSourceOpen.bind(this),
							onSourceEnded: this._onSourceEnded.bind(this),
							onSourceClose: this._onSourceClose.bind(this),
							onSourceBufferError: this._onSourceBufferError.bind(this),
							onSourceBufferUpdateEnd: this._onSourceBufferUpdateEnd.bind(this)
						};
						this._mediaSource = null;
						this._mediaSourceObjectURL = null;
						this._mediaElement = null;
						this._isBufferFull = false;
						this._hasPendingEos = false;
						this._pendingSourceBufferInit = [];
						this._mimeTypes = {
							video: null,
							audio: null
						};
						this._sourceBuffers = {
							video: null,
							audio: null
						};
						this._lastInitSegments = {
							video: null,
							audio: null
						};
						this._pendingSegments = {
							video: [],
							audio: []
						};
						this._pendingRemoveRanges = {
							video: [],
							audio: []
						};
						this._idrList = new h.IDRSampleList
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							if (this._mediaElement || this._mediaSource) {
								this.detachMediaElement()
							}
							this.e = null;
							this._emitter.removeAllListeners();
							this._emitter = null
						}
					}, {
						key: "on",
						value: function e(t, r) {
							this._emitter.addListener(t, r)
						}
					}, {
						key: "off",
						value: function e(t, r) {
							this._emitter.removeListener(t, r)
						}
					}, {
						key: "attachMediaElement",
						value: function e(t) {
							if (this._mediaSource) {
								throw new c.IllegalStateException("MediaSource has been attached to an HTMLMediaElement!")
							}
							var r = this._mediaSource = new window.MediaSource;
							r.addEventListener("sourceopen", this.e.onSourceOpen);
							r.addEventListener("sourceended", this.e.onSourceEnded);
							r.addEventListener("sourceclose", this.e.onSourceClose);
							this._mediaElement = t;
							this._mediaSourceObjectURL = window.URL.createObjectURL(this._mediaSource);
							console.log(this);
							t.src = this._mediaSourceObjectURL
						}
					}, {
						key: "detachMediaElement",
						value: function e() {
							if (this._mediaSource) {
								var t = this._mediaSource;
								for (var r in this._sourceBuffers) {
									var n = this._pendingSegments[r];
									n.splice(0, n.length);
									this._pendingSegments[r] = null;
									this._pendingRemoveRanges[r] = null;
									this._lastInitSegments[r] = null;
									var i = this._sourceBuffers[r];
									if (i) {
										if (t.readyState !== "closed") {
											t.removeSourceBuffer(i);
											i.removeEventListener("error", this.e.onSourceBufferError);
											i.removeEventListener("updateend", this.e.onSourceBufferUpdateEnd)
										}
										this._mimeTypes[r] = null;
										this._sourceBuffers[r] = null
									}
								}
								if (t.readyState === "open") {
									try {
										t.endOfStream()
									} catch (e) {
										o.
										default.e(this.TAG, e.message)
									}
								}
								t.removeEventListener("sourceopen", this.e.onSourceOpen);
								t.removeEventListener("sourceended", this.e.onSourceEnded);
								t.removeEventListener("sourceclose", this.e.onSourceClose);
								this._pendingSourceBufferInit = [];
								this._isBufferFull = false;
								this._idrList.clear();
								this._mediaSource = null
							}
							if (this._mediaElement) {
								// this._mediaElement.src = "";
								// this._mediaElement.removeAttribute("src");
								this._mediaElement = null
							}
							if (this._mediaSourceObjectURL) {
								window.URL.revokeObjectURL(this._mediaSourceObjectURL);
								this._mediaSourceObjectURL = null
							}
						}
					}, {
						key: "appendInitSegment",
						value: function e(t, r) {
							if (!this._mediaSource || this._mediaSource.readyState !== "open") {
								this._pendingSourceBufferInit.push(t);
								this._pendingSegments[t.type].push(t);
								return
							}
							var n = t;
							var i = n.container + ";codecs=" + n.codec;
							var a = false;
							o.
							default.v(this.TAG, "Received Initialization Segment, mimeType: " + i);
							this._lastInitSegments[n.type] = n;
							if (i !== this._mimeTypes[n.type]) {
								if (!this._mimeTypes[n.type]) {
									a = true;
									try {
										var s = this._sourceBuffers[n.type] = this._mediaSource.addSourceBuffer(i);
										s.addEventListener("error", this.e.onSourceBufferError);
										s.addEventListener("updateend", this.e.onSourceBufferUpdateEnd)
									} catch (e) {
										o.
										default.e(this.TAG, e.message);
										this._emitter.emit(d.
											default.ERROR, {
												code: e.code,
												msg: e.message
											});
										return
									}
								} else {
									o.
									default.v(this.TAG, "Notice: " + n.type + " mimeType changed, origin: " + this._mimeTypes[n.type] + ", target: " + i)
								}
								this._mimeTypes[n.type] = i
							}
							if (!r) {
								this._pendingSegments[n.type].push(n)
							}
							if (!a) {
								if (this._sourceBuffers[n.type] && !this._sourceBuffers[n.type].updating) {
									this._doAppendSegments()
								}
							}
						}
					}, {
						key: "appendMediaSegment",
						value: function e(t) {
							var r = t;
							this._pendingSegments[r.type].push(r);
							var n = this._sourceBuffers[r.type];
							if (n && !n.updating && !this._hasPendingRemoveRanges()) {
								this._doAppendSegments()
							}
						}
					}, {
						key: "seek",
						value: function e(t) {
							for (var r in this._sourceBuffers) {
								if (!this._sourceBuffers[r]) {
									continue
								}
								var n = this._sourceBuffers[r];
								if (this._mediaSource.readyState === "open") {
									try {
										n.abort()
									} catch (e) {
										o.
										default.e(this.TAG, e.message)
									}
								}
								this._idrList.clear();
								var i = this._pendingSegments[r];
								i.splice(0, i.length);
								if (this._mediaSource.readyState === "closed") {
									continue
								}
								for (var a = 0; a < n.buffered.length; a++) {
									var s = n.buffered.start(a);
									var u = n.buffered.end(a);
									this._pendingRemoveRanges[r].push({
										start: s,
										end: u
									})
								}
								if (!n.updating) {
									this._doRemoveRanges()
								}
								if (l.
									default.safari) {
									var f = this._lastInitSegments[r];
									if (f) {
										this._pendingSegments[r].push(f);
										if (!n.updating) {
											this._doAppendSegments()
										}
									}
								}
							}
						}
					}, {
						key: "endOfStream",
						value: function e() {
							var t = this._mediaSource;
							var r = this._sourceBuffers;
							if (!t || t.readyState !== "open") {
								if (t && t.readyState === "closed" && this._hasPendingSegments()) {
									this._hasPendingEos = true
								}
								return
							}
							if (r.video && r.video.updating || r.audio && r.audio.updating) {
								this._hasPendingEos = true
							} else {
								this._hasPendingEos = false;
								t.endOfStream()
							}
						}
					}, {
						key: "getNearestKeyframe",
						value: function e(t) {
							return this._idrList.getLastSyncPointBeforeDts(t)
						}
					}, {
						key: "update",
						value: function e(t) {
							function r(e) {
								var t = e;
								var r = ["video", "audio"];
								for (var n = 0; n < r.length; n++) {
									var i = t._sourceBuffers[r[n]];
									if (!i) continue;
									var a = 0;
									var s = 0;
									for (var o = 0; o < i.buffered.length; o++) {
										a = i.buffered.start(o);
										s = i.buffered.end(o);
										console.debug(r[n] + "start:" + a + "end:" + s)
									}
								}
								console.debug("time:" + t._mediaElement.currentTime)
							}

							function n(e) {
								var t = e;
								var r = ["video", "audio"];
								for (var n = 0; n < r.length; n++) {
									var i = t._sourceBuffers[r[n]];
									if (!i) continue;
									for (var a = 0; a < i.buffered.length; a++) {
										var s = i.buffered.start(a);
										var o = i.buffered.end(a);
										t._pendingRemoveRanges[r[n]].push({
											start: s,
											end: o
										})
									}
								}
							}
							if (t) {
								var i = ["video", "audio"];
								var a = 0;
								var s = 0;
								for (var o = 0; o < i.length; o++) {
									var u = this._sourceBuffers[i[o]];
									if (!u) continue;
									for (var l = 0; l < u.buffered.length; l++) {
										if (a == 0) a = u.buffered.start(l);
										else a = Math.min(u.buffered.start(l), a);
										s = Math.max(u.buffered.end(l), s)
									}
								}
								if (s - a > 20) {
									for (var o = 0; o < i.length; o++) {
										var u = this._sourceBuffers[i[o]];
										if (!u) continue;
										var f = s - 10;
										this._pendingRemoveRanges[i[o]].push({
											start: 0,
											end: f
										});
										this._doRemoveRanges()
									}
								} {
									if (this._mediaElement.currentTime > s + 2) {
										this._mediaElement.currentTime = s - .2
									}
									if (s - this._mediaElement.currentTime > 4) {
										this._mediaElement.currentTime = s - .5
									}
									if (s - this._mediaElement.currentTime > 10) {}
									if (this._mediaElement.playbackRate == 2) {
										if (s - this._mediaElement.currentTime < 1) this._mediaElement.playbackRate = 1
									}
								}
							}
						}
					}, {
						key: "_doRemoveRanges",
						value: function e() {
							for (var t in this._pendingRemoveRanges) {
								if (!this._sourceBuffers[t] || this._sourceBuffers[t].updating) {
									continue
								}
								var r = this._sourceBuffers[t];
								var n = this._pendingRemoveRanges[t];
								while (n.length && !r.updating) {
									var i = n.shift();
									r.remove(i.start, i.end)
								}
							}
						}
					}, {
						key: "_doAppendSegments",
						value: function e() {
							var t = this._pendingSegments;
							for (var r in t) {
								if (!this._sourceBuffers[r] || this._sourceBuffers[r].updating) {
									continue
								}
								if (t[r].length > 0) {
									var n = t[r].shift();
									try {
										this._sourceBuffers[r].appendBuffer(n.data);
										this._isBufferFull = false;
										if (r === "video" && n.hasOwnProperty("info")) {
											this._idrList.appendArray(n.info.syncPoints)
										}
									} catch (e) {
										this._pendingSegments[r].unshift(n);
										if (e.code === 22) {
											if (!this._isBufferFull) {
												this._emitter.emit(d.
													default.BUFFER_FULL)
											}
											this._isBufferFull = true
										} else {
											o.
											default.e(this.TAG, e.message);
											this._emitter.emit(d.
												default.ERROR, {
													code: e.code,
													msg: e.message
												})
										}
									}
								}
							}
						}
					}, {
						key: "_onSourceOpen",
						value: function e() {
							o.
							default.v(this.TAG, "MediaSource onSourceOpen");
							this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen);
							if (this._pendingSourceBufferInit.length > 0) {
								var t = this._pendingSourceBufferInit;
								while (t.length) {
									var r = t.shift();
									this.appendInitSegment(r, true)
								}
							}
							if (this._hasPendingSegments()) {
								this._doAppendSegments()
							}
							this._emitter.emit(d.
								default.SOURCE_OPEN)
						}
					}, {
						key: "_onSourceEnded",
						value: function e() {
							o.
							default.v(this.TAG, "MediaSource onSourceEnded")
						}
					}, {
						key: "_onSourceClose",
						value: function e() {
							o.
							default.v(this.TAG, "MediaSource onSourceClose");
							if (this._mediaSource && this.e != null) {
								this._mediaSource.removeEventListener("sourceopen", this.e.onSourceOpen);
								this._mediaSource.removeEventListener("sourceended", this.e.onSourceEnded);
								this._mediaSource.removeEventListener("sourceclose", this.e.onSourceClose)
							}
						}
					}, {
						key: "_hasPendingSegments",
						value: function e() {
							var t = this._pendingSegments;
							return t.video.length > 0 || t.audio.length > 0
						}
					}, {
						key: "_hasPendingRemoveRanges",
						value: function e() {
							var t = this._pendingRemoveRanges;
							return t.video.length > 0 || t.audio.length > 0
						}
					}, {
						key: "_onSourceBufferUpdateEnd",
						value: function e() {
							if (this._hasPendingRemoveRanges()) {
								this._doRemoveRanges()
							} else if (this._hasPendingSegments()) {
								this._doAppendSegments()
							} else if (this._hasPendingEos) {
								this.endOfStream()
							}
							this._emitter.emit(d.
								default.UPDATE_END)
						}
					}, {
						key: "_onSourceBufferError",
						value: function e(t) {
							o.
							default.e(this.TAG, "SourceBuffer Error: " + t)
						}
					}]);
					return e
				}();
				r.
				default = m
			}, {
				"../utils/browser.js": 39,
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./media-segment-info.js": 8,
				"./mse-events.js": 10,
				events: 2
			}
		],
		10: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = {
					ERROR: "error",
					SOURCE_OPEN: "source_open",
					UPDATE_END: "update_end",
					BUFFER_FULL: "buffer_full"
				};
				r.
				default = n
			}, {}
		],
		11: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("events");
				var a = g(i);
				var s = e("../utils/logger.js");
				var o = g(s);
				var u = e("../utils/logging-control.js");
				var l = g(u);
				var f = e("./transmuxing-controller.js");
				var d = g(f);
				var h = e("./transmuxing-events.js");
				var c = g(h);
				var _ = e("./transmuxing-worker.js");
				var v = g(_);
				var m = e("./media-info.js");
				var p = g(m);

				function g(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function y(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var E = function() {
					function t(r, n) {
						y(this, t);
						this.TAG = "Transmuxer";
						this._emitter = new a.
						default;
						if (n.enableWorker && typeof Worker !== "undefined") {
							try {
								var i = e("webworkify");
								this._worker = i(v.
									default);
								this._workerDestroying = false;
								this._worker.addEventListener("message", this._onWorkerMessage.bind(this));
								this._worker.postMessage({
									cmd: "init",
									param: [r, n]
								});
								this.e = {
									onLoggingConfigChanged: this._onLoggingConfigChanged.bind(this)
								};
								l.
								default.registerListener(this.e.onLoggingConfigChanged);
								this._worker.postMessage({
									cmd: "logging_config",
									param: l.
									default.getConfig()
								})
							} catch (e) {
								o.
								default.e(this.TAG, "Error while initialize transmuxing worker, fallback to inline transmuxing");
								this._worker = null;
								this._controller = new d.
								default (r, n)
							}
						} else {
							this._controller = new d.
							default (r, n)
						} if (this._controller) {
							var s = this._controller;
							s.on(c.
								default.IO_ERROR, this._onIOError.bind(this));
							s.on(c.
								default.DEMUX_ERROR, this._onDemuxError.bind(this));
							s.on(c.
								default.INIT_SEGMENT, this._onInitSegment.bind(this));
							s.on(c.
								default.MEDIA_SEGMENT, this._onMediaSegment.bind(this));
							s.on(c.
								default.LOADING_COMPLETE, this._onLoadingComplete.bind(this));
							s.on(c.
								default.RECOVERED_EARLY_EOF, this._onRecoveredEarlyEof.bind(this));
							s.on(c.
								default.MEDIA_INFO, this._onMediaInfo.bind(this));
							s.on(c.
								default.STATISTICS_INFO, this._onStatisticsInfo.bind(this));
							s.on(c.
								default.RECOMMEND_SEEKPOINT, this._onRecommendSeekpoint.bind(this))
						}
					}
					n(t, [{
						key: "destroy",
						value: function e() {
							if (this._worker) {
								if (!this._workerDestroying) {
									this._workerDestroying = true;
									this._worker.postMessage({
										cmd: "destroy"
									});
									l.
									default.removeListener(this.e.onLoggingConfigChanged);
									this.e = null
								}
							} else {
								this._controller.destroy();
								this._controller = null
							}
							this._emitter.removeAllListeners();
							this._emitter = null
						}
					}, {
						key: "on",
						value: function e(t, r) {
							this._emitter.addListener(t, r)
						}
					}, {
						key: "off",
						value: function e(t, r) {
							this._emitter.removeListener(t, r)
						}
					}, {
						key: "hasWorker",
						value: function e() {
							return this._worker != null
						}
					}, {
						key: "open",
						value: function e() {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "start"
								})
							} else {
								this._controller.start()
							}
						}
					}, {
						key: "close",
						value: function e() {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "stop"
								})
							} else {
								this._controller.stop()
							}
						}
					}, {
						key: "seek",
						value: function e(t) {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "seek",
									param: t
								})
							} else {
								this._controller.seek(t)
							}
						}
					}, {
						key: "pause",
						value: function e() {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "pause"
								})
							} else {
								this._controller.pause()
							}
						}
					}, {
						key: "resume",
						value: function e(t) {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "resume"
								})
							} else {
								this._controller.resume(t)
							}
						}
					}, {
						key: "_onInitSegment",
						value: function e(t, r) {
							var n = this;
							Promise.resolve().then(function() {
								n._emitter.emit(c.
									default.INIT_SEGMENT, t, r)
							})
						}
					}, {
						key: "_onMediaSegment",
						value: function e(t, r) {
							var n = this;
							Promise.resolve().then(function() {
								n._emitter.emit(c.
									default.MEDIA_SEGMENT, t, r)
							})
						}
					}, {
						key: "_onLoadingComplete",
						value: function e() {
							var t = this;
							Promise.resolve().then(function() {
								t._emitter.emit(c.
									default.LOADING_COMPLETE)
							})
						}
					}, {
						key: "_onRecoveredEarlyEof",
						value: function e() {
							var t = this;
							Promise.resolve().then(function() {
								t._emitter.emit(c.
									default.RECOVERED_EARLY_EOF)
							})
						}
					}, {
						key: "_onMediaInfo",
						value: function e(t) {
							var r = this;
							Promise.resolve().then(function() {
								r._emitter.emit(c.
									default.MEDIA_INFO, t)
							})
						}
					}, {
						key: "_onStatisticsInfo",
						value: function e(t) {
							var r = this;
							Promise.resolve().then(function() {
								r._emitter.emit(c.
									default.STATISTICS_INFO, t)
							})
						}
					}, {
						key: "_onIOError",
						value: function e(t, r) {
							var n = this;
							Promise.resolve().then(function() {
								n._emitter.emit(c.
									default.IO_ERROR, t, r)
							})
						}
					}, {
						key: "_onDemuxError",
						value: function e(t, r) {
							var n = this;
							Promise.resolve().then(function() {
								n._emitter.emit(c.
									default.DEMUX_ERROR, t, r)
							})
						}
					}, {
						key: "_onRecommendSeekpoint",
						value: function e(t) {
							var r = this;
							Promise.resolve().then(function() {
								r._emitter.emit(c.
									default.RECOMMEND_SEEKPOINT, t)
							})
						}
					}, {
						key: "_onLoggingConfigChanged",
						value: function e(t) {
							if (this._worker) {
								this._worker.postMessage({
									cmd: "logging_config",
									param: t
								})
							}
						}
					}, {
						key: "_onWorkerMessage",
						value: function e(t) {
							var r = t.data;
							var n = r.data;
							if (r.msg === "destroyed" || this._workerDestroying) {
								this._workerDestroying = false;
								this._worker.terminate();
								this._worker = null;
								return
							}
							switch (r.msg) {
								case c.
								default.INIT_SEGMENT:
								case c.
								default.MEDIA_SEGMENT:
									this._emitter.emit(r.msg, n.type, n.data);
									break;
								case c.
								default.LOADING_COMPLETE:
								case c.
								default.RECOVERED_EARLY_EOF:
									this._emitter.emit(r.msg);
									break;
								case c.
								default.MEDIA_INFO:
									Object.setPrototypeOf(n, p.
										default.prototype);
									this._emitter.emit(r.msg, n);
									break;
								case c.
								default.STATISTICS_INFO:
									this._emitter.emit(r.msg, n);
									break;
								case c.
								default.IO_ERROR:
								case c.
								default.DEMUX_ERROR:
									this._emitter.emit(r.msg, n.type, n.info);
									break;
								case c.
								default.RECOMMEND_SEEKPOINT:
									this._emitter.emit(r.msg, n);
									break;
								default:
									break
							}
						}
					}]);
					return t
				}();
				r.
				default = E
			}, {
				"../utils/logger.js": 41,
				"../utils/logging-control.js": 42,
				"./media-info.js": 7,
				"./transmuxing-controller.js": 12,
				"./transmuxing-events.js": 13,
				"./transmuxing-worker.js": 14,
				events: 2,
				webworkify: 4
			}
		],
		12: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("events");
				var a = k(i);
				var s = e("../utils/logger.js");
				var o = k(s);
				var u = e("../utils/browser.js");
				var l = k(u);
				var f = e("./media-info.js");
				var d = k(f);
				var h = e("../demux/flv-demuxer.js");
				var c = k(h);
				var _ = e("../remux/mp4-remuxer.js");
				var v = k(_);
				var m = e("../demux/demux-errors.js");
				var p = k(m);
				var g = e("../io/io-controller.js");
				var y = k(g);
				var E = e("./transmuxing-events.js");
				var b = k(E);
				var S = e("../io/loader.js");

				function k(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function w(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var L = function() {
					function e(t, r) {
						w(this, e);
						this.TAG = "TransmuxingController";
						this._emitter = new a.
						default;
						this._config = r;
						if (!t.segments) {
							t.segments = [{
								duration: t.duration,
								filesize: t.filesize,
								url: t.url
							}]
						}
						if (typeof t.cors !== "boolean") {
							t.cors = true
						}
						if (typeof t.withCredentials !== "boolean") {
							t.withCredentials = false
						}
						this._mediaDataSource = t;
						this._currentSegmentIndex = 0;
						var n = 0;
						this._mediaDataSource.segments.forEach(function(e) {
							e.timestampBase = n;
							n += e.duration;
							e.cors = t.cors;
							e.withCredentials = t.withCredentials
						});
						if (!isNaN(n) && this._mediaDataSource.duration !== n) {
							this._mediaDataSource.duration = n
						}
						this._mediaInfo = null;
						this._demuxer = null;
						this._remuxer = null;
						this._ioctl = null;
						this._pendingSeekTime = null;
						this._pendingResolveSeekPoint = null;
						this._statisticsReporter = null
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							this._mediaInfo = null;
							this._mediaDataSource = null;
							if (this._statisticsReporter) {
								this._disableStatisticsReporter()
							}
							if (this._ioctl) {
								this._ioctl.destroy();
								this._ioctl = null
							}
							if (this._demuxer) {
								this._demuxer.destroy();
								this._demuxer = null
							}
							if (this._remuxer) {
								this._remuxer.destroy();
								this._remuxer = null
							}
							this._emitter.removeAllListeners();
							this._emitter = null
						}
					}, {
						key: "on",
						value: function e(t, r) {
							this._emitter.addListener(t, r)
						}
					}, {
						key: "off",
						value: function e(t, r) {
							this._emitter.removeListener(t, r)
						}
					}, {
						key: "start",
						value: function e() {
							this._loadSegment(0);
							this._enableStatisticsReporter()
						}
					}, {
						key: "_loadSegment",
						value: function e(t, r) {
							this._currentSegmentIndex = t;
							var n = this._mediaDataSource.segments[t];
							var i = this._ioctl = new y.
							default (n, this._config, t);
							i.onError = this._onIOException.bind(this);
							i.onSeeked = this._onIOSeeked.bind(this);
							i.onComplete = this._onIOComplete.bind(this);
							i.onRecoveredEarlyEof = this._onIORecoveredEarlyEof.bind(this);
							if (r) {
								this._demuxer.bindDataSource(this._ioctl)
							} else {
								i.onDataArrival = this._onInitChunkArrival.bind(this)
							}
							i.open(r)
						}
					}, {
						key: "stop",
						value: function e() {
							this._internalAbort();
							this._disableStatisticsReporter()
						}
					}, {
						key: "_internalAbort",
						value: function e() {
							if (this._ioctl) {
								this._ioctl.destroy();
								this._ioctl = null
							}
						}
					}, {
						key: "pause",
						value: function e() {
							if (this._ioctl && this._ioctl.isWorking()) {
								this._ioctl.pause();
								this._disableStatisticsReporter()
							}
						}
					}, {
						key: "resume",
						value: function e(t) {
							if (this._ioctl && this._ioctl.isPaused()) {
								this._ioctl.resume(t);
								this._enableStatisticsReporter()
							}
						}
					}, {
						key: "seek",
						value: function e(t) {
							if (!this._config.isLive) {
								if (this._mediaInfo == undefined) {
									this._pendingSeekTime = t
								} else {
									this._remuxer.seek(t);
									this._ioctl.seek(t);
									this._pendingResolveSeekPoint = t
								}
								return
							}
							if (this._mediaInfo == null || !this._mediaInfo.isSeekable()) {
								return
							}
							var r = this._searchSegmentIndexContains(t);
							if (r === this._currentSegmentIndex) {
								var n = this._mediaInfo.segments[r];
								if (n == undefined) {
									this._pendingSeekTime = t
								} else {
									var i = n.getNearestKeyframe(t);
									this._remuxer.seek(i.milliseconds);
									this._ioctl.seek(i.fileposition);
									this._pendingResolveSeekPoint = i.milliseconds
								}
							} else {
								var a = this._mediaInfo.segments[r];
								if (a == undefined) {
									this._pendingSeekTime = t;
									this._internalAbort();
									this._remuxer.seek();
									this._remuxer.insertDiscontinuity();
									this._loadSegment(r)
								} else {
									var s = a.getNearestKeyframe(t);
									this._internalAbort();
									this._remuxer.seek(t);
									this._remuxer.insertDiscontinuity();
									this._demuxer.resetMediaInfo();
									this._demuxer.timestampBase = this._mediaDataSource.segments[r].timestampBase;
									this._loadSegment(r, s.fileposition);
									this._pendingResolveSeekPoint = s.milliseconds;
									this._reportSegmentMediaInfo(r)
								}
							}
							this._enableStatisticsReporter()
						}
					}, {
						key: "_searchSegmentIndexContains",
						value: function e(t) {
							var r = this._mediaDataSource.segments;
							var n = r.length - 1;
							for (var i = 0; i < r.length; i++) {
								if (t < r[i].timestampBase) {
									n = i - 1;
									break
								}
							}
							return n
						}
					}, {
						key: "_onInitChunkArrival",
						value: function e(t, r) {
							var n = this;
							var i = null;
							var a = 0;
							if (r > 0) {
								this._demuxer.bindDataSource(this._ioctl);
								this._demuxer.timestampBase = this._mediaDataSource.segments[this._currentSegmentIndex].timestampBase;
								a = this._demuxer.parseChunks(t, r)
							} else if ((i = c.
								default.probe(t)).match) {
								this._demuxer = new c.
								default (i, this._config);
								if (!this._remuxer) {
									this._remuxer = new v.
									default (this._config)
								}
								var s = this._mediaDataSource;
								if (s.duration != undefined && !isNaN(s.duration)) {
									this._demuxer.overridedDuration = s.duration
								}
								this._demuxer.timestampBase = s.segments[this._currentSegmentIndex].timestampBase;
								this._demuxer.onError = this._onDemuxException.bind(this);
								this._demuxer.onMediaInfo = this._onMediaInfo.bind(this);
								this._remuxer.bindDataSource(this._demuxer.bindDataSource(this._ioctl));
								this._remuxer.onInitSegment = this._onRemuxerInitSegmentArrival.bind(this);
								this._remuxer.onMediaSegment = this._onRemuxerMediaSegmentArrival.bind(this);
								a = this._demuxer.parseChunks(t, r)
							} else {
								i = null;
								o.
								default.e(this.TAG, "Non-FLV, Unsupported media type!");
								Promise.resolve().then(function() {
									n._internalAbort()
								});
								this._emitter.emit(b.
									default.DEMUX_ERROR, p.
									default.FORMAT_UNSUPPORTED, "Non-FLV, Unsupported media type");
								a = 0
							}
							return a
						}
					}, {
						key: "_onMediaInfo",
						value: function e(t) {
							var r = this;
							if (this._mediaInfo == null) {
								this._mediaInfo = Object.assign({}, t);
								this._mediaInfo.keyframesIndex = null;
								this._mediaInfo.segments = [];
								this._mediaInfo.segmentCount = this._mediaDataSource.segments.length;
								Object.setPrototypeOf(this._mediaInfo, d.
									default.prototype)
							}
							var n = Object.assign({}, t);
							Object.setPrototypeOf(n, d.
								default.prototype);
							this._mediaInfo.segments[this._currentSegmentIndex] = n;
							this._reportSegmentMediaInfo(this._currentSegmentIndex);
							if (this._pendingSeekTime != null) {
								Promise.resolve().then(function() {
									var e = r._pendingSeekTime;
									r._pendingSeekTime = null;
									r.seek(e)
								})
							}
						}
					}, {
						key: "_onIOSeeked",
						value: function e() {
							this._remuxer.insertDiscontinuity()
						}
					}, {
						key: "_onIOComplete",
						value: function e(t) {
							var r = t;
							var n = r + 1;
							if (n < this._mediaDataSource.segments.length) {
								this._internalAbort();
								this._loadSegment(n)
							} else {
								this._emitter.emit(b.
									default.LOADING_COMPLETE);
								this._disableStatisticsReporter()
							}
						}
					}, {
						key: "_onIORecoveredEarlyEof",
						value: function e() {
							this._emitter.emit(b.
								default.RECOVERED_EARLY_EOF)
						}
					}, {
						key: "_onIOException",
						value: function e(t, r) {
							o.
							default.e(this.TAG, "IOException: type = " + t + ", code = " + r.code + ", msg = " + r.msg);
							this._emitter.emit(b.
								default.IO_ERROR, t, r);
							this._disableStatisticsReporter()
						}
					}, {
						key: "_onDemuxException",
						value: function e(t, r) {
							o.
							default.e(this.TAG, "DemuxException: type = " + t + ", info = " + r);
							this._emitter.emit(b.
								default.DEMUX_ERROR, t, r)
						}
					}, {
						key: "_onRemuxerInitSegmentArrival",
						value: function e(t, r) {
							this._emitter.emit(b.
								default.INIT_SEGMENT, t, r)
						}
					}, {
						key: "_onRemuxerMediaSegmentArrival",
						value: function e(t, r) {
							if (this._pendingSeekTime != null) {
								return
							}
							this._emitter.emit(b.
								default.MEDIA_SEGMENT, t, r);
							if (this._pendingResolveSeekPoint != null && t === "video") {
								var n = r.info.syncPoints;
								var i = this._pendingResolveSeekPoint;
								this._pendingResolveSeekPoint = null;
								if (l.
									default.safari && n.length > 0 && n[0].originalDts === i) {
									i = n[0].pts
								}
								this._emitter.emit(b.
									default.RECOMMEND_SEEKPOINT, i)
							}
						}
					}, {
						key: "_enableStatisticsReporter",
						value: function e() {
							if (this._statisticsReporter == null) {
								this._statisticsReporter = self.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval)
							}
						}
					}, {
						key: "_disableStatisticsReporter",
						value: function e() {
							if (this._statisticsReporter) {
								self.clearInterval(this._statisticsReporter);
								this._statisticsReporter = null
							}
						}
					}, {
						key: "_reportSegmentMediaInfo",
						value: function e(t) {
							var r = this._mediaInfo.segments[t];
							var n = Object.assign({}, r);
							n.duration = this._mediaInfo.duration;
							n.segmentCount = this._mediaInfo.segmentCount;
							delete n.segments;
							delete n.keyframesIndex;
							this._emitter.emit(b.
								default.MEDIA_INFO, n)
						}
					}, {
						key: "_reportStatisticsInfo",
						value: function e() {
							var t = {};
							t.url = this._ioctl.currentUrl;
							t.speed = this._ioctl.currentSpeed;
							t.loaderType = this._ioctl.loaderType;
							t.currentSegmentIndex = this._currentSegmentIndex;
							t.totalSegmentCount = this._mediaDataSource.segments.length;
							this._emitter.emit(b.
								default.STATISTICS_INFO, t)
						}
					}]);
					return e
				}();
				r.
				default = L
			}, {
				"../demux/demux-errors.js": 16,
				"../demux/flv-demuxer.js": 18,
				"../io/io-controller.js": 23,
				"../io/loader.js": 24,
				"../remux/mp4-remuxer.js": 38,
				"../utils/browser.js": 39,
				"../utils/logger.js": 41,
				"./media-info.js": 7,
				"./transmuxing-events.js": 13,
				events: 2
			}
		],
		13: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = {
					IO_ERROR: "io_error",
					DEMUX_ERROR: "demux_error",
					INIT_SEGMENT: "init_segment",
					MEDIA_SEGMENT: "media_segment",
					LOADING_COMPLETE: "loading_complete",
					RECOVERED_EARLY_EOF: "recovered_early_eof",
					MEDIA_INFO: "media_info",
					STATISTICS_INFO: "statistics_info",
					RECOMMEND_SEEKPOINT: "recommend_seekpoint"
				};
				r.
				default = n
			}, {}
		],
		14: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = e("../utils/logger.js");
				var i = c(n);
				var a = e("../utils/logging-control.js");
				var s = c(a);
				var o = e("../utils/polyfill.js");
				var u = c(o);
				var l = e("./transmuxing-controller.js");
				var f = c(l);
				var d = e("./transmuxing-events.js");
				var h = c(d);

				function c(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}
				var _ = function e(t) {
					var r = "TransmuxingWorker";
					var n = null;
					u.
					default.install();
					t.addEventListener("message", function(e) {
						switch (e.data.cmd) {
							case "init":
								n = new f.
							default (e.data.param[0], e.data.param[1]);
							n.on(h.
								default.IO_ERROR, _.bind(this));
							n.on(h.
								default.DEMUX_ERROR, v.bind(this));
							n.on(h.
								default.INIT_SEGMENT, i.bind(this));
							n.on(h.
								default.MEDIA_SEGMENT, a.bind(this));
							n.on(h.
								default.LOADING_COMPLETE, o.bind(this));
							n.on(h.
								default.RECOVERED_EARLY_EOF, l.bind(this));
							n.on(h.
								default.MEDIA_INFO, d.bind(this));
							n.on(h.
								default.STATISTICS_INFO, c.bind(this));
							n.on(h.
								default.RECOMMEND_SEEKPOINT, m.bind(this));
							break;
							case "destroy":
								if (n) {
									n.destroy();
									n = null
								}
								t.postMessage({
									msg: "destroyed"
								});
								break;
							case "start":
								n.start();
								break;
							case "stop":
								n.stop();
								break;
							case "seek":
								n.seek(e.data.param);
								break;
							case "pause":
								n.pause();
								break;
							case "resume":
								n.resume();
								break;
							case "logging_config":
								s.
							default.applyConfig(e.data.param);
							break
						}
					});

					function i(e, r) {
						var n = {
							msg: h.
							default.INIT_SEGMENT,
							data: {
								type: e,
								data: r
							}
						};
						t.postMessage(n, [r.data])
					}

					function a(e, r) {
						var n = {
							msg: h.
							default.MEDIA_SEGMENT,
							data: {
								type: e,
								data: r
							}
						};
						t.postMessage(n, [r.data])
					}

					function o() {
						var e = {
							msg: h.
							default.LOADING_COMPLETE
						};
						t.postMessage(e)
					}

					function l() {
						var e = {
							msg: h.
							default.RECOVERED_EARLY_EOF
						};
						t.postMessage(e)
					}

					function d(e) {
						var r = {
							msg: h.
							default.MEDIA_INFO,
							data: e
						};
						t.postMessage(r)
					}

					function c(e) {
						var r = {
							msg: h.
							default.STATISTICS_INFO,
							data: e
						};
						t.postMessage(r)
					}

					function _(e, r) {
						t.postMessage({
							msg: h.
							default.IO_ERROR,
							data: {
								type: e,
								info: r
							}
						})
					}

					function v(e, r) {
						t.postMessage({
							msg: h.
							default.DEMUX_ERROR,
							data: {
								type: e,
								info: r
							}
						})
					}

					function m(e) {
						t.postMessage({
							msg: h.
							default.RECOMMEND_SEEKPOINT,
							data: e
						})
					}
				};
				r.
				default = _
			}, {
				"../utils/logger.js": 41,
				"../utils/logging-control.js": 42,
				"../utils/polyfill.js": 43,
				"./transmuxing-controller.js": 12,
				"./transmuxing-events.js": 13
			}
		],
		15: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../utils/logger.js");
				var a = l(i);
				var s = e("../utils/utf8-conv.js");
				var o = l(s);
				var u = e("../utils/exception.js");

				function l(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function f(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var d = function() {
					var e = new ArrayBuffer(2);
					new DataView(e).setInt16(0, 256, true);
					return new Int16Array(e)[0] === 256
				}();
				var h = function() {
					function e() {
						f(this, e)
					}
					n(e, null, [{
						key: "parseScriptData",
						value: function t(r, n, i) {
							var s = {};
							try {
								var o = e.parseValue(r, n, i);
								var u = e.parseValue(r, n + o.size, i - o.size);
								s[o.data] = u.data
							} catch (e) {
								a.
								default.e("AMF", e.toString())
							}
							return s
						}
					}, {
						key: "parseObject",
						value: function t(r, n, i) {
							if (i < 3) {
								throw new u.IllegalStateException("Data not enough when parse ScriptDataObject")
							}
							var a = e.parseString(r, n, i);
							var s = e.parseValue(r, n + a.size, i - a.size);
							var o = s.objectEnd;
							return {
								data: {
									name: a.data,
									value: s.data
								},
								size: a.size + s.size,
								objectEnd: o
							}
						}
					}, {
						key: "parseVariable",
						value: function t(r, n, i) {
							return e.parseObject(r, n, i)
						}
					}, {
						key: "parseString",
						value: function e(t, r, n) {
							if (n < 2) {
								throw new u.IllegalStateException("Data not enough when parse String")
							}
							var i = new DataView(t, r, n);
							var a = i.getUint16(0, !d);
							var s = void 0;
							if (a > 0) {
								s = (0, o.
									default)(new Uint8Array(t, r + 2, a))
							} else {
								s = ""
							}
							return {
								data: s,
								size: 2 + a
							}
						}
					}, {
						key: "parseLongString",
						value: function e(t, r, n) {
							if (n < 4) {
								throw new u.IllegalStateException("Data not enough when parse LongString")
							}
							var i = new DataView(t, r, n);
							var a = i.getUint32(0, !d);
							var s = void 0;
							if (a > 0) {
								s = (0, o.
									default)(new Uint8Array(t, r + 4, a))
							} else {
								s = ""
							}
							return {
								data: s,
								size: 4 + a
							}
						}
					}, {
						key: "parseDate",
						value: function e(t, r, n) {
							if (n < 10) {
								throw new u.IllegalStateException("Data size invalid when parse Date")
							}
							var i = new DataView(t, r, n);
							var a = i.getFloat64(0, !d);
							var s = i.getInt16(8, !d);
							a += s * 60 * 1e3;
							return {
								data: new Date(a),
								size: 8 + 2
							}
						}
					}, {
						key: "parseValue",
						value: function t(r, n, i) {
							if (i < 1) {
								throw new u.IllegalStateException("Data not enough when parse Value")
							}
							var s = new DataView(r, n, i);
							var o = 1;
							var l = s.getUint8(0);
							var f = void 0;
							var h = false;
							try {
								switch (l) {
									case 0:
										f = s.getFloat64(1, !d);
										o += 8;
										break;
									case 1:
										{
											var c = s.getUint8(1);
											f = c ? true : false;
											o += 1;
											break
										}
									case 2:
										{
											var _ = e.parseString(r, n + 1, i - 1);
											f = _.data;
											o += _.size;
											break
										}
									case 3:
										{
											f = {};
											var v = 0;
											if ((s.getUint32(i - 4, !d) & 16777215) === 9) {
												v = 3
											}
											while (o < i - 4) {
												var m = e.parseObject(r, n + o, i - o - v);
												if (m.objectEnd) break;
												f[m.data.name] = m.data.value;
												o += m.size
											}
											if (o <= i - 3) {
												var p = s.getUint32(o - 1, !d) & 16777215;
												if (p === 9) {
													o += 3
												}
											}
											break
										}
									case 8:
										{
											f = {};
											o += 4;
											var g = 0;
											if ((s.getUint32(i - 4, !d) & 16777215) === 9) {
												g = 3
											}
											while (o < i - 8) {
												var y = e.parseVariable(r, n + o, i - o - g);
												if (y.objectEnd) break;
												f[y.data.name] = y.data.value;
												o += y.size
											}
											if (o <= i - 3) {
												var E = s.getUint32(o - 1, !d) & 16777215;
												if (E === 9) {
													o += 3
												}
											}
											break
										}
									case 9:
										f = undefined;
										o = 1;
										h = true;
										break;
									case 10:
										{
											f = [];
											var b = s.getUint32(1, !d);
											o += 4;
											for (var S = 0; S < b; S++) {
												var k = e.parseValue(r, n + o, i - o);
												f.push(k.data);
												o += k.size
											}
											break
										}
									case 11:
										{
											var w = e.parseDate(r, n + 1, i - 1);
											f = w.data;
											o += w.size;
											break
										}
									case 12:
										{
											var L = e.parseString(r, n + 1, i - 1);
											f = L.data;
											o += L.size;
											break
										}
									default:
										o = i;
										a.
									default.w("AMF", "Unsupported AMF value type " + l)
								}
							} catch (e) {
								a.
								default.e("AMF", e.toString())
							}
							return {
								data: f,
								size: o,
								objectEnd: h
							}
						}
					}]);
					return e
				}();
				r.
				default = h
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"../utils/utf8-conv.js": 44
			}
		],
		16: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = {
					OK: "OK",
					FORMAT_ERROR: "FormatError",
					FORMAT_UNSUPPORTED: "FormatUnsupported",
					CODEC_UNSUPPORTED: "CodecUnsupported"
				};
				r.
				default = n
			}, {}
		],
		17: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../utils/exception.js");

				function a(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var s = function() {
					function e(t) {
						a(this, e);
						this.TAG = "ExpGolomb";
						this._buffer = t;
						this._buffer_index = 0;
						this._total_bytes = t.byteLength;
						this._total_bits = t.byteLength * 8;
						this._current_word = 0;
						this._current_word_bits_left = 0
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							this._buffer = null
						}
					}, {
						key: "_fillCurrentWord",
						value: function e() {
							var t = this._total_bytes - this._buffer_index;
							if (t <= 0) throw new i.IllegalStateException("ExpGolomb: _fillCurrentWord() but no bytes available");
							var r = Math.min(4, t);
							var n = new Uint8Array(4);
							n.set(this._buffer.subarray(this._buffer_index, this._buffer_index + r));
							this._current_word = new DataView(n.buffer).getUint32(0, false);
							this._buffer_index += r;
							this._current_word_bits_left = r * 8
						}
					}, {
						key: "readBits",
						value: function e(t) {
							if (t > 32) throw new i.InvalidArgumentException("ExpGolomb: readBits() bits exceeded max 32bits!");
							if (t <= this._current_word_bits_left) {
								var r = this._current_word >>> 32 - t;
								this._current_word <<= t;
								this._current_word_bits_left -= t;
								return r
							}
							var n = this._current_word_bits_left ? this._current_word : 0;
							n = n >>> 32 - this._current_word_bits_left;
							var a = t - this._current_word_bits_left;
							this._fillCurrentWord();
							var s = Math.min(a, this._current_word_bits_left);
							var o = this._current_word >>> 32 - s;
							this._current_word <<= s;
							this._current_word_bits_left -= s;
							n = n << s | o;
							return n
						}
					}, {
						key: "readBool",
						value: function e() {
							return this.readBits(1) === 1
						}
					}, {
						key: "readByte",
						value: function e() {
							return this.readBits(8)
						}
					}, {
						key: "_skipLeadingZero",
						value: function e() {
							var t = void 0;
							for (t = 0; t < this._current_word_bits_left; t++) {
								if (0 !== (this._current_word & 2147483648 >>> t)) {
									this._current_word <<= t;
									this._current_word_bits_left -= t;
									return t
								}
							}
							this._fillCurrentWord();
							return t + this._skipLeadingZero()
						}
					}, {
						key: "readUEG",
						value: function e() {
							var t = this._skipLeadingZero();
							return this.readBits(t + 1) - 1
						}
					}, {
						key: "readSEG",
						value: function e() {
							var t = this.readUEG();
							if (t & 1) {
								return t + 1 >>> 1
							} else {
								return -1 * (t >>> 1)
							}
						}
					}]);
					return e
				}();
				r.
				default = s
			}, {
				"../utils/exception.js": 40
			}
		],
		18: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var a = e("../utils/logger.js");
				var s = m(a);
				var o = e("./amf-parser.js");
				var u = m(o);
				var l = e("./sps-parser.js");
				var f = m(l);
				var d = e("./demux-errors.js");
				var h = m(d);
				var c = e("../core/media-info.js");
				var _ = m(c);
				var v = e("../utils/exception.js");

				function m(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function p(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function g(e) {
					return e >>> 8 & 255 | (e & 255) << 8
				}

				function y(e) {
					return (e & 4278190080) >>> 24 | (e & 16711680) >>> 8 | (e & 65280) << 8 | (e & 255) << 24
				}

				function E(e, t) {
					return e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]
				}
				var b = function() {
					function e(t, r) {
						p(this, e);
						this.TAG = "FLVDemuxer";
						this._config = r;
						this._onError = null;
						this._onMediaInfo = null;
						this._onTrackMetadata = null;
						this._onDataAvailable = null;
						this._dataOffset = t.dataOffset;
						this._firstParse = true;
						this._dispatch = false;
						this._hasAudio = t.hasAudioTrack;
						this._hasVideo = t.hasVideoTrack;
						this._audioInitialMetadataDispatched = false;
						this._videoInitialMetadataDispatched = false;
						this._mediaInfo = new _.
						default;
						this._mediaInfo.hasAudio = this._hasAudio;
						this._mediaInfo.hasVideo = this._hasVideo;
						this._metadata = null;
						this._audioMetadata = null;
						this._videoMetadata = null;
						this._naluLengthSize = 4;
						this._timestampBase = 0;
						this._timescale = 1e3;
						this._duration = 0;
						this._durationOverrided = false;
						this._referenceFrameRate = {
							fixed: true,
							fps: 23.976,
							fps_num: 23976,
							fps_den: 1e3
						};
						this._videoTrack = {
							type: "video",
							id: 1,
							sequenceNumber: 0,
							samples: [],
							length: 0
						};
						this._audioTrack = {
							type: "audio",
							id: 2,
							sequenceNumber: 0,
							samples: [],
							length: 0
						};
						this._littleEndian = function() {
							var e = new ArrayBuffer(2);
							new DataView(e).setInt16(0, 256, true);
							return new Int16Array(e)[0] === 256
						}()
					}
					i(e, [{
						key: "destroy",
						value: function e() {
							this._mediaInfo = null;
							this._metadata = null;
							this._audioMetadata = null;
							this._videoMetadata = null;
							this._videoTrack = null;
							this._audioTrack = null;
							this._onError = null;
							this._onMediaInfo = null;
							this._onTrackMetadata = null;
							this._onDataAvailable = null
						}
					}, {
						key: "bindDataSource",
						value: function e(t) {
							t.onDataArrival = this.parseChunks.bind(this);
							return this
						}
					}, {
						key: "resetMediaInfo",
						value: function e() {
							this._mediaInfo = new _.
							default
						}
					}, {
						key: "_isInitialMetadataDispatched",
						value: function e() {
							if (this._hasAudio && this._hasVideo) {
								return this._audioInitialMetadataDispatched && this._videoInitialMetadataDispatched
							}
							if (this._hasAudio && !this._hasVideo) {
								return this._audioInitialMetadataDispatched
							}
							if (!this._hasAudio && this._hasVideo) {
								return this._videoInitialMetadataDispatched
							}
						}
					}, {
						key: "parseChunks",
						value: function t(r, n) {
							if (!this._onError || !this._onMediaInfo || !this._onTrackMetadata || !this._onDataAvailable) {
								throw new v.IllegalStateException("Flv: onError & onMediaInfo & onTrackMetadata & onDataAvailable callback must be specified")
							}
							var i = 0;
							var a = this._littleEndian;
							if (n === 0) {
								if (r.byteLength > 13) {
									var o = e.probe(r);
									i = o.dataOffset;
									n = o.dataOffset
								} else {
									return 0
								}
							}
							if (this._firstParse) {
								this._firstParse = false;
								if (n !== this._dataOffset) {
									s.
									default.w(this.TAG, "First time parsing but chunk byteStart invalid!")
								}
								var u = new DataView(r, i);
								var l = u.getUint32(0, !a);
								if (l !== 0) {
									s.
									default.w(this.TAG, "PrevTagSize0 !== 0 !!!")
								}
								i += 4
							}
							while (i < r.byteLength) {
								this._dispatch = true;
								var f = new DataView(r, i);
								if (i + 11 + 4 > r.byteLength) {
									break
								}
								var d = f.getUint8(0);
								var h = f.getUint32(0, !a) & 16777215;
								if (i + 11 + h + 4 > r.byteLength) {
									break
								}
								if (d !== 8 && d !== 9 && d !== 18) {
									s.
									default.w(this.TAG, "Unsupported tag type " + d + ", skipped");
									i += 11 + h + 4;
									continue
								}
								var c = f.getUint8(4);
								var _ = f.getUint8(5);
								var m = f.getUint8(6);
								var p = f.getUint8(7);
								var g = m | _ << 8 | c << 16 | p << 24;
								var y = f.getUint32(7, !a) & 16777215;
								if (y !== 0) {
									s.
									default.w(this.TAG, "Meet tag which has StreamID != 0!")
								}
								var E = i + 11;
								switch (d) {
									case 8:
										this._parseAudioData(r, E, h, g);
										break;
									case 9:
										this._parseVideoData(r, E, h, g, n + i);
										break;
									case 18:
										this._parseScriptData(r, E, h);
										break
								}
								var b = f.getUint32(11 + h, !a);
								if (b !== 11 + h) {
									s.
									default.w(this.TAG, "Invalid PrevTagSize " + b)
								}
								i += 11 + h + 4
							}
							if (this._isInitialMetadataDispatched()) {
								if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
									this._onDataAvailable(this._audioTrack, this._videoTrack)
								}
							}
							return i
						}
					}, {
						key: "_parseScriptData",
						value: function e(t, r, i) {
							var a = u.
							default.parseScriptData(t, r, i);
							if (a.hasOwnProperty("onMetaData")) {
								if (this._metadata) {
									s.
									default.w(this.TAG, "Found another onMetaData tag!")
								}
								this._metadata = a;
								var o = this._metadata.onMetaData;
								if (typeof o.hasAudio === "boolean") {
									this._hasAudio = o.hasAudio;
									this._mediaInfo.hasAudio = this._hasAudio
								}
								if (typeof o.hasVideo === "boolean") {
									this._hasVideo = o.hasVideo;
									this._mediaInfo.hasVideo = this._hasVideo
								}
								if (typeof o.audiodatarate === "number") {
									this._mediaInfo.audioDataRate = o.audiodatarate
								}
								if (typeof o.videodatarate === "number") {
									this._mediaInfo.videoDataRate = o.videodatarate
								}
								if (typeof o.width === "number") {
									this._mediaInfo.width = o.width
								}
								if (typeof o.height === "number") {
									this._mediaInfo.height = o.height
								}
								if (typeof o.duration === "number") {
									if (!this._durationOverrided) {
										var l = Math.floor(o.duration * this._timescale);
										this._duration = l;
										this._mediaInfo.duration = l
									}
								} else {
									this._mediaInfo.duration = 0
								} if (typeof o.framerate === "number") {
									var f = Math.floor(o.framerate * 1e3);
									if (f > 0) {
										var d = f / 1e3;
										this._referenceFrameRate.fixed = true;
										this._referenceFrameRate.fps = d;
										this._referenceFrameRate.fps_num = f;
										this._referenceFrameRate.fps_den = 1e3;
										this._mediaInfo.fps = d
									}
								}
								if (n(o.keyframes) === "object") {
									this._mediaInfo.hasKeyframesIndex = true;
									var h = o.keyframes;
									this._mediaInfo.keyframesIndex = this._parseKeyframesIndex(h);
									o.keyframes = null
								} else {
									this._mediaInfo.hasKeyframesIndex = false
								}
								this._dispatch = false;
								this._mediaInfo.metadata = o;
								s.
								default.v(this.TAG, "Parsed onMetaData");
								if (this._mediaInfo.isComplete()) {
									this._onMediaInfo(this._mediaInfo)
								}
							}
						}
					}, {
						key: "_parseKeyframesIndex",
						value: function e(t) {
							var r = [];
							var n = [];
							for (var i = 1; i < t.times.length; i++) {
								var a = this._timestampBase + Math.floor(t.times[i] * 1e3);
								r.push(a);
								n.push(t.filepositions[i])
							}
							return {
								times: r,
								filepositions: n
							}
						}
					}, {
						key: "_parseAudioData",
						value: function e(t, r, n, i) {
							if (n <= 1) {
								s.
								default.w(this.TAG, "Flv: Invalid audio packet, missing SoundData payload!");
								return
							}
							var a = this._audioMetadata;
							var o = this._audioTrack;
							if (!a || !a.codec) {
								a = this._audioMetadata = {};
								a.type = "audio";
								a.id = o.id;
								a.timescale = this._timescale;
								a.duration = this._duration;
								var u = this._littleEndian;
								var l = new DataView(t, r, n);
								var f = l.getUint8(0);
								var d = f >>> 4;
								if (d !== 10) {
									this._onError(h.
										default.CODEC_UNSUPPORTED, "Flv: Unsupported audio codec idx: " + d);
									return
								}
								var c = 0;
								var _ = (f & 12) >>> 2;
								var v = [5500, 11025, 22050, 44100, 48e3];
								if (_ < v.length) {
									c = v[_]
								} else {
									this._onError(h.
										default.FORMAT_ERROR, "Flv: Invalid audio sample rate idx: " + _);
									return
								}
								var m = (f & 2) >>> 1;
								var p = f & 1;
								a.audioSampleRate = c;
								a.channelCount = p === 0 ? 1 : 2;
								a.refSampleDuration = Math.floor(1024 / a.audioSampleRate * a.timescale);
								a.codec = "mp4a.40.5"
							}
							var g = this._parseAACAudioData(t, r + 1, n - 1);
							if (g == undefined) {
								return
							}
							if (g.packetType === 0) {
								if (a.config) {
									s.
									default.w(this.TAG, "Found another AudioSpecificConfig!")
								}
								var y = g.data;
								a.audioSampleRate = y.samplingRate;
								a.channelCount = y.channelCount;
								a.codec = y.codec;
								a.config = y.config;
								a.refSampleDuration = Math.floor(1024 / a.audioSampleRate * a.timescale);
								s.
								default.v(this.TAG, "Parsed AudioSpecificConfig");
								if (this._isInitialMetadataDispatched()) {
									if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
										this._onDataAvailable(this._audioTrack, this._videoTrack)
									}
								} else {
									this._audioInitialMetadataDispatched = true
								}
								this._dispatch = false;
								this._onTrackMetadata("audio", a);
								var E = this._mediaInfo;
								E.audioCodec = "mp4a.40." + y.originalAudioObjectType;
								E.audioSampleRate = a.audioSampleRate;
								E.audioChannelCount = a.channelCount;
								if (E.hasVideo) {
									if (E.videoCodec != null) {
										E.mimeType = 'video/x-flv; codecs="' + E.videoCodec + "," + E.audioCodec + '"'
									}
								} else {
									E.mimeType = 'video/x-flv; codecs="' + E.audioCodec + '"'
								} if (E.isComplete()) {
									this._onMediaInfo(E)
								}
								return
							} else if (g.packetType === 1) {
								var b = this._timestampBase + i;
								var S = {
									unit: g.data,
									dts: b,
									pts: b
								};
								o.samples.push(S);
								o.length += g.data.length
							} else {
								s.
								default.e(this.TAG, "Flv: Unsupported AAC data type " + g.packetType)
							}
						}
					}, {
						key: "_parseAACAudioData",
						value: function e(t, r, n) {
							if (n <= 1) {
								s.
								default.w(this.TAG, "Flv: Invalid AAC packet, missing AACPacketType or/and Data!");
								return
							}
							var i = {};
							var a = new Uint8Array(t, r, n);
							i.packetType = a[0];
							if (a[0] === 0) {
								i.data = this._parseAACAudioSpecificConfig(t, r + 1, n - 1)
							} else {
								i.data = a.subarray(1)
							}
							return i
						}
					}, {
						key: "_parseAACAudioSpecificConfig",
						value: function e(t, r, n) {
							var i = new Uint8Array(t, r, n);
							var a = null;
							var s = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
							var o = 0;
							var u = 0;
							var l = null;
							var f = 0;
							var d = null;
							o = u = i[0] >>> 3;
							f = (i[0] & 7) << 1 | i[1] >>> 7;
							if (f < 0 || f >= s.length) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: AAC invalid sampling frequency index!");
								return
							}
							var c = s[f];
							var _ = (i[1] & 120) >>> 3;
							if (_ < 0 || _ >= 8) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: AAC invalid channel configuration");
								return
							}
							if (o === 5) {
								d = (i[1] & 7) << 1 | i[2] >>> 7;
								l = (i[2] & 124) >>> 2
							}
							var v = self.navigator.userAgent.toLowerCase();
							if (v.indexOf("firefox") !== -1) {
								if (f >= 6) {
									o = 5;
									a = new Array(4);
									d = f - 3
								} else {
									o = 2;
									a = new Array(2);
									d = f
								}
							} else if (v.indexOf("android") !== -1) {
								o = 2;
								a = new Array(2);
								d = f
							} else {
								o = 5;
								d = f;
								a = new Array(4);
								if (f >= 6) {
									d = f - 3
								} else if (_ === 1) {
									o = 2;
									a = new Array(2);
									d = f
								}
							}
							a[0] = o << 3;
							a[0] |= (f & 15) >>> 1;
							a[1] = (f & 15) << 7;
							a[1] |= (_ & 15) << 3;
							if (o === 5) {
								a[1] |= (d & 15) >>> 1;
								a[2] = (d & 1) << 7;
								a[2] |= 2 << 2;
								a[3] = 0
							}
							return {
								config: a,
								samplingRate: c,
								channelCount: _,
								codec: "mp4a.40." + o,
								originalAudioObjectType: u
							}
						}
					}, {
						key: "_parseVideoData",
						value: function e(t, r, n, i, a) {
							if (n <= 1) {
								s.
								default.w(this.TAG, "Flv: Invalid video packet, missing VideoData payload!");
								return
							}
							var o = new Uint8Array(t, r, n)[0];
							var u = (o & 240) >>> 4;
							var l = o & 15;
							if (l !== 7) {
								this._onError(h.
									default.CODEC_UNSUPPORTED, "Flv: Unsupported codec in video frame: " + l);
								return
							}
							this._parseAVCVideoPacket(t, r + 1, n - 1, i, a, u)
						}
					}, {
						key: "_parseAVCVideoPacket",
						value: function e(t, r, n, i, a, o) {
							if (n < 4) {
								s.
								default.w(this.TAG, "Flv: Invalid AVC packet, missing AVCPacketType or/and CompositionTime");
								return
							}
							var u = this._littleEndian;
							var l = new DataView(t, r, n);
							var f = l.getUint8(0);
							var d = l.getUint32(0, !u) & 16777215;
							if (f === 0) {
								this._parseAVCDecoderConfigurationRecord(t, r + 4, n - 4)
							} else if (f === 1) {
								this._parseAVCVideoData(t, r + 4, n - 4, i, a, o, d)
							} else if (f === 2) {} else {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: Invalid video packet type " + f);
								return
							}
						}
					}, {
						key: "_parseAVCDecoderConfigurationRecord",
						value: function e(t, r, n) {
							if (n < 7) {
								s.
								default.w(this.TAG, "Flv: Invalid AVCDecoderConfigurationRecord, lack of data!");
								return
							}
							var i = this._videoMetadata;
							var a = this._videoTrack;
							var o = this._littleEndian;
							var u = new DataView(t, r, n);
							if (!i) {
								i = this._videoMetadata = {};
								i.type = "video";
								i.id = a.id;
								i.timescale = this._timescale;
								i.duration = this._duration
							} else {
								if (typeof i.avcc !== "undefined") {
									s.
									default.w(this.TAG, "Found another AVCDecoderConfigurationRecord!")
								}
							}
							console.log(this);
							var l = u.getUint8(0);
							var d = u.getUint8(1);
							var c = u.getUint8(2);
							var _ = u.getUint8(3);
							if (l !== 1 || d === 0) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: Invalid AVCDecoderConfigurationRecord");
								return
							}
							this._naluLengthSize = (u.getUint8(4) & 3) + 1;
							if (this._naluLengthSize !== 3 && this._naluLengthSize !== 4) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: Strange NaluLengthSizeMinusOne: " + (this._naluLengthSize - 1));
								return
							}
							var v = u.getUint8(5) & 31;
							if (v === 0 || v > 1) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: Invalid H264 SPS count: " + v);
								return
							}
							var m = 6;
							for (var p = 0; p < v; p++) {
								var g = u.getUint16(m, !o);
								m += 2;
								if (g === 0) {
									continue
								}
								var y = new Uint8Array(t, r + m, g);
								m += g;
								var E = f.
								default.parseSPS(y);
								i.codecWidth = E.codec_size.width;
								i.codecHeight = E.codec_size.height;
								i.presentWidth = E.present_size.width;
								i.presentHeight = E.present_size.height;
								i.profile = E.profile_string;
								i.level = E.level_string;
								i.bitDepth = E.bit_depth;
								i.chromaFormat = E.chroma_format;
								i.sarRatio = E.sar_ratio;
								i.frameRate = E.frame_rate;
								if (E.frame_rate.fixed === false || E.frame_rate.fps_num === 0 || E.frame_rate.fps_den === 0) {
									i.frameRate = this._referenceFrameRate
								}
								var b = i.frameRate.fps_den;
								var S = i.frameRate.fps_num;
								i.refSampleDuration = Math.floor(i.timescale * (b / S));
								var k = y.subarray(1, 4);
								var w = "avc1.";
								for (var L = 0; L < 3; L++) {
									var T = k[L].toString(16);
									if (T.length < 2) {
										T = "0" + T
									}
									w += T
								}
								i.codec = w;
								var O = this._mediaInfo;
								O.width = i.codecWidth;
								O.height = i.codecHeight;
								O.fps = i.frameRate.fps;
								O.profile = i.profile;
								O.level = i.level;
								O.chromaFormat = E.chroma_format_string;
								O.sarNum = i.sarRatio.width;
								O.sarDen = i.sarRatio.height;
								O.videoCodec = w;
								if (O.hasAudio) {
									if (O.audioCodec != null) {
										O.mimeType = 'video/x-flv; codecs="' + O.videoCodec + "," + O.audioCodec + '"'
									}
								} else {
									O.mimeType = 'video/x-flv; codecs="' + O.videoCodec + '"'
								} if (O.isComplete()) {
									this._onMediaInfo(O)
								}
							}
							var A = u.getUint8(m);
							if (A === 0 || A > 1) {
								this._onError(h.
									default.FORMAT_ERROR, "Flv: Invalid H264 PPS count: " + A);
								return
							}
							m++;
							for (var R = 0; R < A; R++) {
								var I = u.getUint16(m, !o);
								m += 2;
								if (I === 0) {
									continue
								}
								m += I
							}
							i.avcc = new Uint8Array(n);
							i.avcc.set(new Uint8Array(t, r, n), 0);
							s.
							default.v(this.TAG, "Parsed AVCDecoderConfigurationRecord");
							if (this._isInitialMetadataDispatched()) {
								if (this._dispatch && (this._audioTrack.length || this._videoTrack.length)) {
									this._onDataAvailable(this._audioTrack, this._videoTrack)
								}
							} else {
								this._videoInitialMetadataDispatched = true
							}
							this._dispatch = false;
							this._onTrackMetadata("video", i)
						}
					}, {
						key: "_parseAVCVideoData",
						value: function e(t, r, n, i, a, o, u) {
							var l = this._littleEndian;
							var f = new DataView(t, r, n);
							var d = [],
								h = 0;
							var c = 0;
							var _ = this._naluLengthSize;
							var v = this._timestampBase + i;
							var m = o === 1;
							while (c < n) {
								if (c + 4 >= n) {
									s.
									default.w(this.TAG, "Malformed Nalu near timestamp " + v + ", offset = " + c + ", dataSize = " + n);
									break
								}
								var p = f.getUint32(c, !l);
								if (_ === 3) {
									p >>>= 8
								}
								if (p > n - _) {
									s.
									default.w(this.TAG, "Malformed Nalus near timestamp " + v + ", NaluSize > DataSize!");
									return
								}
								var g = f.getUint8(c + _) & 31;
								if (g === 5) {
									m = true
								}
								var y = new Uint8Array(t, r + c, _ + p);
								var E = {
									type: g,
									data: y
								};
								d.push(E);
								h += y.byteLength;
								c += _ + p
							}
							if (d.length) {
								var b = this._videoTrack;
								var S = {
									units: d,
									length: h,
									isKeyframe: m,
									dts: v,
									cts: u,
									pts: v + u
								};
								if (m) {
									S.fileposition = a
								}
								b.samples.push(S);
								b.length += h
							}
						}
					}, {
						key: "onTrackMetadata",
						get: function e() {
							return this._onTrackMetadata
						},
						set: function e(t) {
							this._onTrackMetadata = t
						}
					}, {
						key: "onMediaInfo",
						get: function e() {
							return this._onMediaInfo
						},
						set: function e(t) {
							this._onMediaInfo = t
						}
					}, {
						key: "onError",
						get: function e() {
							return this._onError
						},
						set: function e(t) {
							this._onError = t
						}
					}, {
						key: "onDataAvailable",
						get: function e() {
							return this._onDataAvailable
						},
						set: function e(t) {
							this._onDataAvailable = t
						}
					}, {
						key: "timestampBase",
						get: function e() {
							return this._timestampBase
						},
						set: function e(t) {
							this._timestampBase = t
						}
					}, {
						key: "overridedDuration",
						get: function e() {
							return this._duration
						},
						set: function e(t) {
							this._durationOverrided = true;
							this._duration = t;
							this._mediaInfo.duration = t
						}
					}], [{
						key: "probe",
						value: function e(t) {
							var r = new Uint8Array(t);
							var n = {
								match: false
							};
							if (r[0] !== 70 || r[1] !== 76 || r[2] !== 86 || r[3] !== 1) {
								return n
							}
							var i = (r[4] & 4) >>> 2 !== 0;
							var a = (r[4] & 1) !== 0;
							if (!i && !a) {
								return n
							}
							var s = E(r, 5);
							if (s < 9) {
								return n
							}
							return {
								match: true,
								consumed: s,
								dataOffset: s,
								hasAudioTrack: i,
								hasVideoTrack: a
							}
						}
					}]);
					return e
				}();
				r.
				default = b
			}, {
				"../core/media-info.js": 7,
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./amf-parser.js": 15,
				"./demux-errors.js": 16,
				"./sps-parser.js": 19
			}
		],
		19: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("./exp-golomb.js");
				var a = s(i);

				function s(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function o(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var u = function() {
					function e() {
						o(this, e)
					}
					n(e, null, [{
						key: "_ebsp2rbsp",
						value: function e(t) {
							var r = t;
							var n = r.byteLength;
							var i = new Uint8Array(n);
							var a = 0;
							for (var s = 0; s < n; s++) {
								if (s >= 2) {
									if (r[s] === 3 && r[s - 1] === 0 && r[s - 2] === 0) {
										continue
									}
								}
								i[a] = r[s];
								a++
							}
							return new Uint8Array(i.buffer, 0, a)
						}
					}, {
						key: "parseSPS",
						value: function t(r) {
							var n = e._ebsp2rbsp(r);
							var i = new a.
							default (n);
							i.readByte();
							var s = i.readByte();
							i.readByte();
							var o = i.readByte();
							i.readUEG();
							var u = e.getProfileString(s);
							var l = e.getLevelString(o);
							var f = 1;
							var d = 420;
							var h = [0, 420, 422, 444];
							var c = 8;
							if (s === 100 || s === 110 || s === 122 || s === 244 || s === 44 || s === 83 || s === 86 || s === 118 || s === 128 || s === 138 || s === 144) {
								f = i.readUEG();
								if (f === 3) {
									i.readBits(1)
								}
								if (f <= 3) {
									d = h[f]
								}
								c = i.readUEG() + 8;
								i.readUEG();
								i.readBits(1);
								if (i.readBool()) {
									var _ = f !== 3 ? 8 : 12;
									for (var v = 0; v < _; v++) {
										if (i.readBool()) {
											if (v < 6) {
												e._skipScalingList(i, 16)
											} else {
												e._skipScalingList(i, 64)
											}
										}
									}
								}
							}
							i.readUEG();
							var m = i.readUEG();
							if (m === 0) {
								i.readUEG()
							} else if (m === 1) {
								i.readBits(1);
								i.readSEG();
								i.readSEG();
								var p = i.readUEG();
								for (var g = 0; g < p; g++) {
									i.readSEG()
								}
							}
							i.readUEG();
							i.readBits(1);
							var y = i.readUEG();
							var E = i.readUEG();
							var b = i.readBits(1);
							if (b === 0) {
								i.readBits(1)
							}
							i.readBits(1);
							var S = 0;
							var k = 0;
							var w = 0;
							var L = 0;
							var T = i.readBool();
							if (T) {
								S = i.readUEG();
								k = i.readUEG();
								w = i.readUEG();
								L = i.readUEG()
							}
							var O = 1,
								A = 1;
							var R = 0,
								I = true,
								C = 0,
								x = 0;
							var M = i.readBool();
							if (M) {
								if (i.readBool()) {
									var D = i.readByte();
									var j = [1, 12, 10, 16, 40, 24, 20, 32, 80, 18, 15, 64, 160, 4, 3, 2];
									var P = [1, 11, 11, 11, 33, 11, 11, 11, 33, 11, 11, 33, 99, 3, 2, 1];
									if (D > 0 && D < 16) {
										O = j[D - 1];
										A = P[D - 1]
									} else if (D === 255) {
										O = i.readByte() << 8 | i.readByte();
										A = i.readByte() << 8 | i.readByte()
									}
								}
								if (i.readBool()) {
									i.readBool()
								}
								if (i.readBool()) {
									i.readBits(4);
									if (i.readBool()) {
										i.readBits(24)
									}
								}
								if (i.readBool()) {
									i.readUEG();
									i.readUEG()
								}
								if (i.readBool()) {
									var B = i.readBits(32);
									var N = i.readBits(32);
									I = i.readBool();
									C = N;
									x = B * 2;
									R = C / x
								}
							}
							var U = 1;
							if (O !== 1 || A !== 1) {
								U = O / A
							}
							var F = 0,
								G = 0;
							if (f === 0) {
								F = 1;
								G = 2 - b
							} else {
								var z = f === 3 ? 1 : 2;
								var V = f === 1 ? 2 : 1;
								F = z;
								G = V * (2 - b)
							}
							var H = (y + 1) * 16;
							var K = (2 - b) * ((E + 1) * 16);
							H -= (S + k) * F;
							K -= (w + L) * G;
							var W = Math.ceil(H * U);
							i.destroy();
							i = null;
							return {
								profile_string: u,
								level_string: l,
								bit_depth: c,
								chroma_format: d,
								chroma_format_string: e.getChromaFormatString(d),
								frame_rate: {
									fixed: I,
									fps: R,
									fps_den: x,
									fps_num: C
								},
								sar_ratio: {
									width: O,
									height: A
								},
								codec_size: {
									width: H,
									height: K
								},
								present_size: {
									width: W,
									height: K
								}
							}
						}
					}, {
						key: "_skipScalingList",
						value: function e(t, r) {
							var n = 8,
								i = 8;
							var a = 0;
							for (var s = 0; s < r; s++) {
								if (i !== 0) {
									a = t.readSEG();
									i = (n + a + 256) % 256
								}
								n = i === 0 ? n : i
							}
						}
					}, {
						key: "getProfileString",
						value: function e(t) {
							switch (t) {
								case 66:
									return "Baseline";
								case 77:
									return "Main";
								case 88:
									return "Extended";
								case 100:
									return "High";
								case 110:
									return "High10";
								case 122:
									return "High422";
								case 244:
									return "High444";
								default:
									return "Unknown"
							}
						}
					}, {
						key: "getLevelString",
						value: function e(t) {
							return (t / 10).toFixed(1)
						}
					}, {
						key: "getChromaFormatString",
						value: function e(t) {
							switch (t) {
								case 420:
									return "4:2:0";
								case 422:
									return "4:2:2";
								case 444:
									return "4:4:4";
								default:
									return "Unknown"
							}
						}
					}]);
					return e
				}();
				r.
				default = u
			}, {
				"./exp-golomb.js": 17
			}
		],
		20: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = e("./utils/polyfill.js");
				var a = g(i);
				var s = e("./core/features.js");
				var o = g(s);
				var u = e("./player/flv-player.js");
				var l = g(u);
				var f = e("./player/native-player.js");
				var d = g(f);
				var h = e("./player/player-events.js");
				var c = g(h);
				var _ = e("./player/player-errors.js");
				var v = e("./utils/logging-control.js");
				var m = g(v);
				var p = e("./utils/exception.js");

				function g(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}
				a.
				default.install();

				function y(e, t) {
					var r = e;
					if (r == null || (typeof r === "undefined" ? "undefined" : n(r)) !== "object") {
						throw new p.InvalidArgumentException("MediaDataSource must be an javascript object!")
					}
					if (!r.hasOwnProperty("type")) {
						throw new p.InvalidArgumentException("MediaDataSource must has type field to indicate video file type!")
					}
					switch (r.type) {
						case "flv":
							return new l.
						default (r, t);
						default:
							return new d.
						default (r, t)
					}
				}

				function E() {
					return o.
					default.supportMSEH264Playback()
				}

				function b() {
					return o.
					default.getFeatureList()
				}
				var S = {};
				S.createPlayer = y;
				S.isSupported = E;
				S.getFeatureList = b;
				S.Events = c.
				default;
				S.ErrorTypes = _.ErrorTypes;
				S.ErrorDetails = _.ErrorDetails;
				S.FlvPlayer = l.
				default;
				S.NativePlayer = d.
				default;
				S.LoggingControl = m.
				default;
				Object.defineProperty(S, "version", {
					enumerable: true,
					get: function e() {
						return "1.1.0"
					}
				});
				r.
				default = S
			}, {
				"./core/features.js": 6,
				"./player/flv-player.js": 32,
				"./player/native-player.js": 33,
				"./player/player-errors.js": 34,
				"./player/player-events.js": 35,
				"./utils/exception.js": 40,
				"./utils/logging-control.js": 42,
				"./utils/polyfill.js": 43
			}
		],
		21: [
			function(e, t, r) {
				"use strict";
				t.exports = e("./flv.js").
				default
			}, {
				"./flv.js": 20
			}
		],
		22: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function e(t, r, n) {
					if (t === null) t = Function.prototype;
					var i = Object.getOwnPropertyDescriptor(t, r);
					if (i === undefined) {
						var a = Object.getPrototypeOf(t);
						if (a === null) {
							return undefined
						} else {
							return e(a, r, n)
						}
					} else if ("value" in i) {
						return i.value
					} else {
						var s = i.get;
						if (s === undefined) {
							return undefined
						}
						return s.call(n)
					}
				};
				var a = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var s = e("../utils/logger.js");
				var o = h(s);
				var u = e("../utils/browser.js");
				var l = h(u);
				var f = e("./loader.js");
				var d = e("../utils/exception.js");

				function h(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function c(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function _(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function v(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}
				var m = function(e) {
					v(t, e);
					a(t, null, [{
						key: "isSupported",
						value: function e() {
							try {
								return self.fetch && self.ReadableStream && !l.
								default.msedge
							} catch (e) {
								return false
							}
						}
					}]);

					function t(e) {
						c(this, t);
						var r = _(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "fetch-stream-loader"));
						r.TAG = "FetchStreamLoader";
						r._seekHandler = e;
						r._needStash = true;
						r._requestAbort = false;
						r._contentLength = null;
						r._receivedLength = 0;
						return r
					}
					a(t, [{
						key: "destroy",
						value: function e() {
							if (this.isWorking()) {
								this.abort()
							}
							i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
						}
					}, {
						key: "open",
						value: function e(t, r) {
							var i = this;
							this._dataSource = t;
							this._range = r;
							var a = this._seekHandler.getConfig(t.url, r);
							var s = new self.Headers;
							if (n(a.headers) === "object") {
								var o = a.headers;
								for (var u in o) {
									if (o.hasOwnProperty(u)) {
										s.append(u, o[u])
									}
								}
							}
							var l = a.url;
							var h = {
								method: "GET",
								headers: s,
								mode: "cors",
								cache: "default"
							};
							if (t.cors === false) {
								h.mode = "same-origin"
							}
							if (t.withCredentials) {
								h.credentials = "include"
							}
							this._status = f.LoaderStatus.kConnecting;
							self.fetch(l, h).then(function(e) {
								if (i._requestAbort) {
									i._requestAbort = false;
									i._status = f.LoaderStatus.kIdle;
									return
								}
								if (e.ok && e.status >= 200 && e.status <= 299) {
									var t = e.headers.get("Content-Length");
									if (t != null) {
										i._contentLength = parseInt(t);
										if (i._contentLength !== 0) {
											if (i._onContentLengthKnown) {
												i._onContentLengthKnown(i._contentLength)
											}
										}
									}
									return i._pump.call(i, e.body.getReader())
								} else {
									i._status = f.LoaderStatus.kError;
									if (i._onError) {
										i._onError(f.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
											code: e.status,
											msg: e.statusText
										})
									} else {
										throw new d.RuntimeException("FetchStreamLoader: Http code invalid, " + e.status + " " + e.statusText)
									}
								}
							}).
							catch (function(e) {
								i._status = f.LoaderStatus.kError;
								if (i._onError) {
									i._onError(f.LoaderErrors.EXCEPTION, {
										code: -1,
										msg: e.message
									})
								} else {
									throw e
								}
							})
						}
					}, {
						key: "pause",
						value: function e(e) {
							this._paused = e;
							if (!e && this.reader) this._pump(this.reader)
						}
					}, {
						key: "abort",
						value: function e() {
							this._requestAbort = true
						}
					}, {
						key: "_pump",
						value: function e(t) {
							var r = this;
							this.reader = t;
							return t.read().then(function(e) {
								if (e.done) {
									r._status = f.LoaderStatus.kComplete;
									if (r._onComplete) {
										r._onComplete(r._range.from, r._range.from + r._receivedLength - 1)
									}
								} else {
									if (r._requestAbort === true) {
										r._requestAbort = false;
										r._status = f.LoaderStatus.kComplete;
										return t.cancel()
									}
									r._status = f.LoaderStatus.kBuffering;
									var n = e.value.buffer;
									var i = r._range.from + r._receivedLength;
									r._receivedLength += n.byteLength;
									if (r._onDataArrival) {
										r._onDataArrival(n, i, r._receivedLength)
									}
									if (r._paused) return;
									r._pump(t)
								}
							}).
							catch (function(e) {
								r._status = f.LoaderStatus.kError;
								var t = 0;
								var n = null;
								if (e.code === 19 && (r._contentLength === null || r._contentLength !== null && r._receivedLength < r._contentLength)) {
									t = f.LoaderErrors.EARLY_EOF;
									n = {
										code: e.code,
										msg: "Fetch stream meet Early-EOF"
									}
								} else {
									t = f.LoaderErrors.EXCEPTION;
									n = {
										code: e.code,
										msg: e.message
									}
								} if (r._onError) {
									r._onError(t, n)
								} else {
									throw new d.RuntimeException(n.msg)
								}
							})
						}
					}]);
					return t
				}(f.BaseLoader);
				r.
				default = m
			}, {
				"../utils/browser.js": 39,
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./loader.js": 24
			}
		],
		23: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../utils/logger.js");
				var a = w(i);
				var s = e("./speed-sampler.js");
				var o = w(s);
				var u = e("./loader.js");
				var l = e("./fetch-stream-loader.js");
				var f = w(l);
				var d = e("./xhr-moz-chunked-loader.js");
				var h = w(d);
				var c = e("./xhr-msstream-loader.js");
				var _ = w(c);
				var v = e("./xhr-range-loader.js");
				var m = w(v);
				var p = e("./websocket-loader.js");
				var g = w(p);
				var y = e("./range-seek-handler.js");
				var E = w(y);
				var b = e("./param-seek-handler.js");
				var S = w(b);
				var k = e("../utils/exception.js");

				function w(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function L(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var T = function() {
					function e(t, r, n) {
						L(this, e);
						this.TAG = "IOController";
						this._config = r;
						this._extraData = n;
						this._stashInitialSize = 1024 * 384;
						if (r.isLive === true) {
							this._stashInitialSize = 1024 * 512
						}
						if (r.stashInitialSize != undefined && r.stashInitialSize > 0) {
							this._stashInitialSize = r.stashInitialSize
						}
						this._stashUsed = 0;
						this._stashSize = this._stashInitialSize;
						this._bufferSize = 1024 * 1024 * 3;
						this._stashBuffer = new ArrayBuffer(this._bufferSize);
						this._stashByteStart = 0;
						this._enableStash = true;
						if (r.enableStashBuffer === false) {
							this._enableStash = false
						}
						this._loader = null;
						this._loaderClass = null;
						this._seekHandler = null;
						this._dataSource = t;
						this._isWebSocketURL = /wss?:\/\/(.+?)/.test(t.url);
						this._refTotalLength = t.filesize ? t.filesize : null;
						this._totalLength = this._refTotalLength;
						this._fullRequestFlag = false;
						this._currentRange = null;
						this._speedNormalized = 0;
						this._speedSampler = new o.
						default;
						this._speedNormalizeList = [64, 128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096];
						this._isEarlyEofReconnecting = false;
						this._paused = false;
						this._resumeFrom = 0;
						this._onDataArrival = null;
						this._onSeeked = null;
						this._onError = null;
						this._onComplete = null;
						this._onRecoveredEarlyEof = null;
						this._selectSeekHandler();
						this._selectLoader();
						this._createLoader()
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							if (this._loader.isWorking()) {
								this._loader.abort()
							}
							this._loader.destroy();
							this._loader = null;
							this._loaderClass = null;
							this._dataSource = null;
							this._stashBuffer = null;
							this._stashUsed = this._stashSize = this._bufferSize = this._stashByteStart = 0;
							this._currentRange = null;
							this._speedSampler = null;
							this._isEarlyEofReconnecting = false;
							this._onDataArrival = null;
							this._onSeeked = null;
							this._onError = null;
							this._onComplete = null;
							this._onRecoveredEarlyEof = null;
							this._extraData = null
						}
					}, {
						key: "isWorking",
						value: function e() {
							return this._loader && this._loader.isWorking() && !this._paused
						}
					}, {
						key: "isPaused",
						value: function e() {
							return this._paused
						}
					}, {
						key: "_selectSeekHandler",
						value: function e() {
							var t = this._config;
							if (t.seekType === "range") {
								this._seekHandler = new E.
								default (this._config.rangeLoadZeroStart)
							} else if (t.seekType === "param") {
								var r = t.seekParamStart || "bstart";
								var n = t.seekParamEnd || "bend";
								this._seekHandler = new S.
								default (r, n)
							} else if (t.seekType === "custom") {
								if (typeof t.customSeekHandler !== "function") {
									throw new k.InvalidArgumentException("Custom seekType specified in config but invalid customSeekHandler!")
								}
								this._seekHandler = new t.customSeekHandler
							} else {
								throw new k.InvalidArgumentException("Invalid seekType in config: " + t.seekType)
							}
						}
					}, {
						key: "_selectLoader",
						value: function e() {
							if (this._isWebSocketURL) {
								this._loaderClass = g.
								default
							} else if (f.
								default.isSupported()) {
								this._loaderClass = f.
								default
							} else if (h.
								default.isSupported()) {
								this._loaderClass = h.
								default
							} else if (m.
								default.isSupported()) {
								this._loaderClass = m.
								default
							} else {
								throw new k.RuntimeException("Your browser doesn't support xhr with arraybuffer responseType!")
							}
						}
					}, {
						key: "_createLoader",
						value: function e() {
							this._loader = new this._loaderClass(this._seekHandler);
							if (this._loader.needStashBuffer === false) {
								this._enableStash = false
							}
							this._loader.onContentLengthKnown = this._onContentLengthKnown.bind(this);
							this._loader.onDataArrival = this._onLoaderChunkArrival.bind(this);
							this._loader.onComplete = this._onLoaderComplete.bind(this);
							this._loader.onError = this._onLoaderError.bind(this)
						}
					}, {
						key: "open",
						value: function e(t) {
							this._currentRange = {
								from: 0,
								to: -1
							};
							if (t) {
								this._currentRange.from = t
							}
							this._speedSampler.reset();
							if (!t) {
								this._fullRequestFlag = true
							}
							this._loader.open(this._dataSource, Object.assign({}, this._currentRange))
						}
					}, {
						key: "abort",
						value: function e() {
							this._loader.abort();
							if (this._paused) {
								this._paused = false;
								this._resumeFrom = 0
							}
						}
					}, {
						key: "pause",
						value: function e() {
							this._loader.pause(true);
							this._paused = true
						}
					}, {
						key: "resume",
						value: function e(t) {
							if (this._paused) {
								this._loader.pause(false);
								this._paused = false
							}
						}
					}, {
						key: "seek",
						value: function e(t) {
							this._paused = false;
							this._stashUsed = 0;
							this._stashByteStart = 0;
							this._internalSeek(t, true)
						}
					}, {
						key: "_internalSeek",
						value: function e(t, r) {
							if (this._loader.isWorking()) {
								this._loader.abort()
							}
							this._flushStashBuffer(r);
							this._loader.destroy();
							this._loader = null;
							var n = {
								from: t,
								to: -1
							};
							this._currentRange = {
								from: n.from,
								to: -1
							};
							this._speedSampler.reset();
							this._stashSize = this._stashInitialSize;
							this._createLoader();
							this._loader.open(this._dataSource, n);
							if (this._onSeeked) {
								this._onSeeked()
							}
						}
					}, {
						key: "updateUrl",
						value: function e(t) {
							if (!t || typeof t !== "string" || t.length === 0) {
								throw new k.InvalidArgumentException("Url must be a non-empty string!")
							}
							this._dataSource.url = t
						}
					}, {
						key: "_expandBuffer",
						value: function e(t) {
							var r = this._stashSize;
							while (r + 1024 * 1024 * 1 < t) {
								r *= 2
							}
							r += 1024 * 1024 * 1;
							if (r === this._bufferSize) {
								return
							}
							var n = new ArrayBuffer(r);
							if (this._stashUsed > 0) {
								var i = new Uint8Array(this._stashBuffer, 0, this._stashUsed);
								var a = new Uint8Array(n, 0, r);
								a.set(i, 0)
							}
							this._stashBuffer = n;
							this._bufferSize = r
						}
					}, {
						key: "_normalizeSpeed",
						value: function e(t) {
							var r = this._speedNormalizeList;
							var n = r.length - 1;
							var i = 0;
							var a = 0;
							var s = n;
							if (t < r[0]) {
								return r[0]
							}
							while (a <= s) {
								i = a + Math.floor((s - a) / 2);
								if (i === n || t >= r[i] && t < r[i + 1]) {
									return r[i]
								} else if (r[i] < t) {
									a = i + 1
								} else {
									s = i - 1
								}
							}
						}
					}, {
						key: "_adjustStashSize",
						value: function e(t) {
							var r = 0;
							if (this._config.isLive) {
								r = t
							} else {
								if (t < 512) {
									r = t
								} else if (t >= 512 && t <= 1024) {
									r = Math.floor(t * 1.5)
								} else {
									r = t * 2
								}
							} if (r > 8192) {
								r = 8192
							}
							var n = r * 1024 + 1024 * 1024 * 1;
							if (this._bufferSize < n) {
								this._expandBuffer(n)
							}
							this._stashSize = r * 1024
						}
					}, {
						key: "_dispatchChunks",
						value: function e(t, r) {
							this._currentRange.to = r + t.byteLength - 1;
							return this._onDataArrival(t, r)
						}
					}, {
						key: "_onContentLengthKnown",
						value: function e(t) {
							if (t && this._fullRequestFlag) {
								this._totalLength = t;
								this._fullRequestFlag = false
							}
						}
					}, {
						key: "_onLoaderChunkArrival",
						value: function e(t, r, n) {
							if (!this._onDataArrival) {
								throw new k.IllegalStateException("IOController: No existing consumer (onDataArrival) callback!")
							}
							if (this._isEarlyEofReconnecting) {
								this._isEarlyEofReconnecting = false;
								if (this._onRecoveredEarlyEof) {
									this._onRecoveredEarlyEof()
								}
							}
							this._speedSampler.addBytes(t.byteLength);
							var i = this._speedSampler.lastSecondKBps;
							if (i !== 0) {
								var a = this._normalizeSpeed(i);
								if (this._speedNormalized !== a) {
									this._speedNormalized = a;
									this._adjustStashSize(a)
								}
							}
							if (!this._enableStash) {
								if (this._stashUsed === 0) {
									var s = this._dispatchChunks(t, r);
									if (s < t.byteLength) {
										var o = t.byteLength - s;
										if (o > this._bufferSize) {
											this._expandBuffer(o)
										}
										var u = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
										u.set(new Uint8Array(t, s), 0);
										this._stashUsed += o;
										this._stashByteStart = r + s
									}
								} else {
									if (this._stashUsed + t.byteLength > this._bufferSize) {
										this._expandBuffer(this._stashUsed + t.byteLength)
									}
									var l = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
									l.set(new Uint8Array(t), this._stashUsed);
									this._stashUsed += t.byteLength;
									var f = this._dispatchChunks(this._stashBuffer.slice(0, this._stashUsed), this._stashByteStart);
									if (f < this._stashUsed && f > 0) {
										var d = new Uint8Array(this._stashBuffer, f);
										l.set(d, 0)
									}
									this._stashUsed -= f;
									this._stashByteStart += f
								}
							} else {
								if (this._stashUsed === 0 && this._stashByteStart === 0) {
									this._stashByteStart = r
								}
								if (this._stashUsed + t.byteLength <= this._stashSize) {
									var h = new Uint8Array(this._stashBuffer, 0, this._stashSize);
									h.set(new Uint8Array(t), this._stashUsed);
									this._stashUsed += t.byteLength
								} else {
									var c = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
									if (this._stashUsed > 0) {
										var _ = this._stashBuffer.slice(0, this._stashUsed);
										var v = this._dispatchChunks(_, this._stashByteStart);
										if (v < _.byteLength) {
											if (v > 0) {
												var m = new Uint8Array(_, v);
												c.set(m, 0);
												this._stashUsed = m.byteLength;
												this._stashByteStart += v
											}
										} else {
											this._stashUsed = 0;
											this._stashByteStart += v
										} if (this._stashUsed + t.byteLength > this._bufferSize) {
											this._expandBuffer(this._stashUsed + t.byteLength);
											c = new Uint8Array(this._stashBuffer, 0, this._bufferSize)
										}
										c.set(new Uint8Array(t), this._stashUsed);
										this._stashUsed += t.byteLength
									} else {
										var p = this._dispatchChunks(t, r);
										if (p < t.byteLength) {
											var g = t.byteLength - p;
											if (g > this._bufferSize) {
												this._expandBuffer(g);
												c = new Uint8Array(this._stashBuffer, 0, this._bufferSize)
											}
											c.set(new Uint8Array(t, p), 0);
											this._stashUsed += g;
											this._stashByteStart = r + p
										}
									}
								}
							}
						}
					}, {
						key: "_flushStashBuffer",
						value: function e(t) {
							if (this._stashUsed > 0) {
								var r = this._stashBuffer.slice(0, this._stashUsed);
								var n = this._dispatchChunks(r, this._stashByteStart);
								var i = r.byteLength - n;
								if (n < r.byteLength) {
									if (t) {
										a.
										default.w(this.TAG, i + " bytes unconsumed data remain when flush buffer, dropped")
									} else {
										if (n > 0) {
											var s = new Uint8Array(this._stashBuffer, 0, this._bufferSize);
											var o = new Uint8Array(r, n);
											s.set(o, 0);
											this._stashUsed = o.byteLength;
											this._stashByteStart += n
										}
										return 0
									}
								}
								this._stashUsed = 0;
								this._stashByteStart = 0;
								return i
							}
							return 0
						}
					}, {
						key: "_onLoaderComplete",
						value: function e(t, r) {
							this._flushStashBuffer(true);
							if (this._onComplete) {
								this._onComplete(this._extraData)
							}
						}
					}, {
						key: "_onLoaderError",
						value: function e(t, r) {
							a.
							default.e(this.TAG, "Loader error, code = " + r.code + ", msg = " + r.msg);
							this._flushStashBuffer(false);
							if (this._isEarlyEofReconnecting) {
								this._isEarlyEofReconnecting = false;
								t = u.LoaderErrors.UNRECOVERABLE_EARLY_EOF
							}
							switch (t) {
								case u.LoaderErrors.EARLY_EOF:
									{
										if (!this._config.isLive) {
											if (this._totalLength) {
												var n = this._currentRange.to + 1;
												if (n < this._totalLength) {
													a.
													default.w(this.TAG, "Connection lost, trying reconnect...");
													this._isEarlyEofReconnecting = true;
													this._internalSeek(n, false)
												}
												return
											}
										}
										t = u.LoaderErrors.UNRECOVERABLE_EARLY_EOF;
										break
									}
								case u.LoaderErrors.UNRECOVERABLE_EARLY_EOF:
								case u.LoaderErrors.CONNECTING_TIMEOUT:
								case u.LoaderErrors.HTTP_STATUS_CODE_INVALID:
								case u.LoaderErrors.EXCEPTION:
									break
							}
							if (this._onError) {
								this._onError(t, r)
							} else {
								throw new k.RuntimeException("IOException: " + r.msg)
							}
						}
					}, {
						key: "status",
						get: function e() {
							return this._loader.status
						}
					}, {
						key: "extraData",
						get: function e() {
							return this._extraData
						},
						set: function e(t) {
							this._extraData = t
						}
					}, {
						key: "onDataArrival",
						get: function e() {
							return this._onDataArrival
						},
						set: function e(t) {
							this._onDataArrival = t
						}
					}, {
						key: "onSeeked",
						get: function e() {
							return this._onSeeked
						},
						set: function e(t) {
							this._onSeeked = t
						}
					}, {
						key: "onError",
						get: function e() {
							return this._onError
						},
						set: function e(t) {
							this._onError = t
						}
					}, {
						key: "onComplete",
						get: function e() {
							return this._onComplete
						},
						set: function e(t) {
							this._onComplete = t
						}
					}, {
						key: "onRecoveredEarlyEof",
						get: function e() {
							return this._onRecoveredEarlyEof
						},
						set: function e(t) {
							this._onRecoveredEarlyEof = t
						}
					}, {
						key: "currentUrl",
						get: function e() {
							return this._dataSource.url
						}
					}, {
						key: "currentSpeed",
						get: function e() {
							if (this._loaderClass === m.
								default) {
								return this._loader.currentSpeed
							}
							return this._speedSampler.lastSecondKBps
						}
					}, {
						key: "loaderType",
						get: function e() {
							return this._loader.type
						}
					}]);
					return e
				}();
				r.
				default = T
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./fetch-stream-loader.js": 22,
				"./loader.js": 24,
				"./param-seek-handler.js": 25,
				"./range-seek-handler.js": 26,
				"./speed-sampler.js": 27,
				"./websocket-loader.js": 28,
				"./xhr-moz-chunked-loader.js": 29,
				"./xhr-msstream-loader.js": 30,
				"./xhr-range-loader.js": 31
			}
		],
		24: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				r.BaseLoader = r.LoaderErrors = r.LoaderStatus = undefined;
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../utils/exception.js");

				function a(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var s = r.LoaderStatus = {
					kIdle: 0,
					kConnecting: 1,
					kBuffering: 2,
					kError: 3,
					kComplete: 4
				};
				var o = r.LoaderErrors = {
					OK: "OK",
					EXCEPTION: "Exception",
					HTTP_STATUS_CODE_INVALID: "HttpStatusCodeInvalid",
					CONNECTING_TIMEOUT: "ConnectingTimeout",
					EARLY_EOF: "EarlyEof",
					UNRECOVERABLE_EARLY_EOF: "UnrecoverableEarlyEof"
				};
				var u = r.BaseLoader = function() {
					function e(t) {
						a(this, e);
						this._type = t || "undefined";
						this._status = s.kIdle;
						this._needStash = false;
						this._onContentLengthKnown = null;
						this._onDataArrival = null;
						this._onError = null;
						this._onComplete = null
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							this._status = s.kIdle;
							this._onContentLengthKnown = null;
							this._onDataArrival = null;
							this._onError = null;
							this._onComplete = null
						}
					}, {
						key: "isWorking",
						value: function e() {
							return this._status === s.kConnecting || this._status === s.kBuffering
						}
					}, {
						key: "open",
						value: function e(t, r) {
							throw new i.NotImplementedException("Unimplemented abstract function!")
						}
					}, {
						key: "abort",
						value: function e() {
							throw new i.NotImplementedException("Unimplemented abstract function!")
						}
					}, {
						key: "type",
						get: function e() {
							return this._type
						}
					}, {
						key: "status",
						get: function e() {
							return this._status
						}
					}, {
						key: "needStashBuffer",
						get: function e() {
							return this._needStash
						}
					}, {
						key: "onContentLengthKnown",
						get: function e() {
							return this._onContentLengthKnown
						},
						set: function e(t) {
							this._onContentLengthKnown = t
						}
					}, {
						key: "onDataArrival",
						get: function e() {
							return this._onDataArrival
						},
						set: function e(t) {
							this._onDataArrival = t
						}
					}, {
						key: "onError",
						get: function e() {
							return this._onError
						},
						set: function e(t) {
							this._onError = t
						}
					}, {
						key: "onComplete",
						get: function e() {
							return this._onComplete
						},
						set: function e(t) {
							this._onComplete = t
						}
					}]);
					return e
				}()
			}, {
				"../utils/exception.js": 40
			}
		],
		25: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e(t, r) {
						i(this, e);
						this._startName = t;
						this._endName = r
					}
					n(e, [{
						key: "getConfig",
						value: function e(t, r) {
							var n = t;
							if (r.from !== 0 || r.to !== -1) {
								var i = true;
								if (n.indexOf("?") === -1) {
									n += "?";
									i = false
								}
								if (i) {
									n += "&"
								}
								n += this._startName + "=" + r.from.toString();
								if (r.to !== -1) {
									n += "&" + this._endName + "=" + r.to.toString()
								}
							}
							return {
								url: n,
								headers: {}
							}
						}
					}]);
					return e
				}();
				r.
				default = a
			}, {}
		],
		26: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e(t) {
						i(this, e);
						this._zeroStart = t || false
					}
					n(e, [{
						key: "getConfig",
						value: function e(t, r) {
							var n = {};
							if (r.from !== 0 || r.to !== -1) {
								var i = void 0;
								if (r.to !== -1) {
									i = "bytes=" + r.from.toString() + "-" + r.to.toString()
								} else {
									i = "bytes=" + r.from.toString() + "-"
								}
								n["Range"] = i
							} else if (this._zeroStart) {
								n["Range"] = "bytes=0-"
							}
							return {
								url: t,
								headers: n
							}
						}
					}]);
					return e
				}();
				r.
				default = a
			}, {}
		],
		27: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e() {
						i(this, e);
						this._firstCheckpoint = 0;
						this._lastCheckpoint = 0;
						this._intervalBytes = 0;
						this._totalBytes = 0;
						this._lastSecondBytes = 0;
						if (self.performance && self.performance.now) {
							this._now = self.performance.now.bind(self.performance)
						} else {
							this._now = Date.now
						}
					}
					n(e, [{
						key: "reset",
						value: function e() {
							this._firstCheckpoint = this._lastCheckpoint = 0;
							this._totalBytes = this._intervalBytes = 0;
							this._lastSecondBytes = 0
						}
					}, {
						key: "addBytes",
						value: function e(t) {
							if (this._firstCheckpoint === 0) {
								this._firstCheckpoint = this._now();
								this._lastCheckpoint = this._firstCheckpoint;
								this._intervalBytes += t;
								this._totalBytes += t
							} else if (this._now() - this._lastCheckpoint < 1e3) {
								this._intervalBytes += t;
								this._totalBytes += t
							} else {
								this._lastSecondBytes = this._intervalBytes;
								this._intervalBytes = t;
								this._totalBytes += t;
								this._lastCheckpoint = this._now()
							}
						}
					}, {
						key: "currentKBps",
						get: function e() {
							this.addBytes(0);
							var t = (this._now() - this._lastCheckpoint) / 1e3;
							if (t == 0) t = 1;
							return this._intervalBytes / t / 1024
						}
					}, {
						key: "lastSecondKBps",
						get: function e() {
							this.addBytes(0);
							if (this._lastSecondBytes !== 0) {
								return this._lastSecondBytes / 1024
							} else {
								if (this._now() - this._lastCheckpoint >= 500) {
									return this.currentKBps
								} else {
									return 0
								}
							}
						}
					}, {
						key: "averageKBps",
						get: function e() {
							var t = (this._now() - this._firstCheckpoint) / 1e3;
							return this._totalBytes / t / 1024
						}
					}]);
					return e
				}();
				r.
				default = a
			}, {}
		],
		28: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function e(t, r, n) {
					if (t === null) t = Function.prototype;
					var i = Object.getOwnPropertyDescriptor(t, r);
					if (i === undefined) {
						var a = Object.getPrototypeOf(t);
						if (a === null) {
							return undefined
						} else {
							return e(a, r, n)
						}
					} else if ("value" in i) {
						return i.value
					} else {
						var s = i.get;
						if (s === undefined) {
							return undefined
						}
						return s.call(n)
					}
				};
				var i = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var a = e("../utils/logger.js");
				var s = l(a);
				var o = e("./loader.js");
				var u = e("../utils/exception.js");

				function l(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function f(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function d(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function h(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}
				var c = function(e) {
					h(t, e);
					i(t, null, [{
						key: "isSupported",
						value: function e() {
							try {
								return typeof self.WebSocket !== "undefined"
							} catch (e) {
								return false
							}
						}
					}]);

					function t() {
						f(this, t);
						var e = d(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "websocket-loader"));
						e.TAG = "WebSocketLoader";
						e._needStash = true;
						e._ws = null;
						e._requestAbort = false;
						e._receivedLength = 0;
						return e
					}
					i(t, [{
						key: "destroy",
						value: function e() {
							if (this._ws) {
								this.abort()
							}
							n(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
						}
					}, {
						key: "open",
						value: function e(t) {
							try {
								var r = this._ws = new self.WebSocket(t.url);
								r.binaryType = "arraybuffer";
								r.onopen = this._onWebSocketOpen.bind(this);
								r.onclose = this._onWebSocketClose.bind(this);
								r.onmessage = this._onWebSocketMessage.bind(this);
								r.onerror = this._onWebSocketError.bind(this);
								this._status = o.LoaderStatus.kConnecting
							} catch (e) {
								this._status = o.LoaderStatus.kError;
								var n = {
									code: e.code,
									msg: e.message
								};
								if (this._onError) {
									this._onError(o.LoaderErrors.EXCEPTION, n)
								} else {
									throw new u.RuntimeException(n.msg)
								}
							}
						}
					}, {
						key: "abort",
						value: function e() {
							var t = this._ws;
							if (t && (t.readyState === 0 || t.readyState === 1)) {
								this._requestAbort = true;
								t.close()
							}
							this._ws = null;
							this._status = o.LoaderStatus.kComplete
						}
					}, {
						key: "_onWebSocketOpen",
						value: function e(t) {
							this._status = o.LoaderStatus.kBuffering
						}
					}, {
						key: "_onWebSocketClose",
						value: function e(t) {
							if (this._requestAbort === true) {
								this._requestAbort = false;
								return
							}
							this._status = o.LoaderStatus.kComplete;
							if (this._onComplete) {
								this._onComplete(0, this._receivedLength - 1)
							}
						}
					}, {
						key: "_onWebSocketMessage",
						value: function e(t) {
							var r = this;
							if (t.data instanceof ArrayBuffer) {
								this._dispatchArrayBuffer(t.data)
							} else if (t.data instanceof Blob) {
								(function() {
									var e = new FileReader;
									e.onload = function() {
										r._dispatchArrayBuffer(e.result)
									};
									e.readAsArrayBuffer(t.data)
								})()
							} else {
								this._status = o.LoaderStatus.kError;
								var n = {
									code: -1,
									msg: "Unsupported WebSocket message type: " + t.data.constructor.name
								};
								if (this._onError) {
									this._onError(o.LoaderErrors.EXCEPTION, n)
								} else {
									throw new u.RuntimeException(n.msg)
								}
							}
						}
					}, {
						key: "_dispatchArrayBuffer",
						value: function e(t) {
							var r = t;
							var n = this._receivedLength;
							this._receivedLength += r.byteLength;
							if (this._onDataArrival) {
								this._onDataArrival(r, n, this._receivedLength)
							}
						}
					}, {
						key: "_onWebSocketError",
						value: function e(t) {
							this._status = o.LoaderStatus.kError;
							var r = {
								code: t.code,
								msg: t.message
							};
							if (this._onError) {
								this._onError(o.LoaderErrors.EXCEPTION, r)
							} else {
								throw new u.RuntimeException(r.msg)
							}
						}
					}]);
					return t
				}(o.BaseLoader);
				r.
				default = c
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./loader.js": 24
			}
		],
		29: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function e(t, r, n) {
					if (t === null) t = Function.prototype;
					var i = Object.getOwnPropertyDescriptor(t, r);
					if (i === undefined) {
						var a = Object.getPrototypeOf(t);
						if (a === null) {
							return undefined
						} else {
							return e(a, r, n)
						}
					} else if ("value" in i) {
						return i.value
					} else {
						var s = i.get;
						if (s === undefined) {
							return undefined
						}
						return s.call(n)
					}
				};
				var a = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var s = e("../utils/logger.js");
				var o = f(s);
				var u = e("./loader.js");
				var l = e("../utils/exception.js");

				function f(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function d(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function h(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function c(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}
				var _ = function(e) {
					c(t, e);
					a(t, null, [{
						key: "isSupported",
						value: function e() {
							try {
								var t = new XMLHttpRequest;
								t.open("GET", "https://example.com", true);
								t.responseType = "moz-chunked-arraybuffer";
								return t.responseType === "moz-chunked-arraybuffer"
							} catch (e) {
								o.
								default.w("MozChunkedLoader", e.message);
								return false
							}
						}
					}]);

					function t(e) {
						d(this, t);
						var r = h(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-moz-chunked-loader"));
						r.TAG = "MozChunkedLoader";
						r._seekHandler = e;
						r._needStash = true;
						r._xhr = null;
						r._requestAbort = false;
						r._contentLength = null;
						r._receivedLength = 0;
						return r
					}
					a(t, [{
						key: "destroy",
						value: function e() {
							if (this.isWorking()) {
								this.abort()
							}
							if (this._xhr) {
								this._xhr.onreadystatechange = null;
								this._xhr.onprogress = null;
								this._xhr.onloadend = null;
								this._xhr.onerror = null;
								this._xhr = null
							}
							i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
						}
					}, {
						key: "open",
						value: function e(t, r) {
							this._dataSource = t;
							this._range = r;
							var i = this._seekHandler.getConfig(t.url, r);
							var a = this._xhr = new XMLHttpRequest;
							a.open("GET", i.url, true);
							a.responseType = "moz-chunked-arraybuffer";
							a.onreadystatechange = this._onReadyStateChange.bind(this);
							a.onprogress = this._onProgress.bind(this);
							a.onloadend = this._onLoadEnd.bind(this);
							a.onerror = this._onXhrError.bind(this);
							if (t.withCredentials && a["withCredentials"]) {
								a.withCredentials = true
							}
							if (n(i.headers) === "object") {
								var s = i.headers;
								for (var o in s) {
									if (s.hasOwnProperty(o)) {
										a.setRequestHeader(o, s[o])
									}
								}
							}
							this._status = u.LoaderStatus.kConnecting;
							a.send()
						}
					}, {
						key: "abort",
						value: function e() {
							this._requestAbort = true;
							if (this._xhr) {
								this._xhr.abort()
							}
							this._status = u.LoaderStatus.kComplete
						}
					}, {
						key: "_onReadyStateChange",
						value: function e(t) {
							var r = t.target;
							if (r.readyState === 2) {
								if (r.status !== 0 && (r.status < 200 || r.status > 299)) {
									this._status = u.LoaderStatus.kError;
									if (this._onError) {
										this._onError(u.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
											code: r.status,
											msg: r.statusText
										})
									} else {
										throw new l.RuntimeException("MozChunkedLoader: Http code invalid, " + r.status + " " + r.statusText)
									}
								} else {
									this._status = u.LoaderStatus.kBuffering
								}
							}
						}
					}, {
						key: "_onProgress",
						value: function e(t) {
							if (this._contentLength === null) {
								if (t.total !== null && t.total !== 0) {
									this._contentLength = t.total;
									if (this._onContentLengthKnown) {
										this._onContentLengthKnown(this._contentLength)
									}
								}
							}
							var r = t.target.response;
							var n = this._range.from + this._receivedLength;
							this._receivedLength += r.byteLength;
							if (this._onDataArrival) {
								this._onDataArrival(r, n, this._receivedLength)
							}
						}
					}, {
						key: "_onLoadEnd",
						value: function e(t) {
							if (this._requestAbort === true) {
								this._requestAbort = false;
								return
							} else if (this._status === u.LoaderStatus.kError) {
								return
							}
							this._status = u.LoaderStatus.kComplete;
							if (this._onComplete) {
								this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)
							}
						}
					}, {
						key: "_onXhrError",
						value: function e(t) {
							this._status = u.LoaderStatus.kError;
							var r = 0;
							var n = null;
							if (this._contentLength && t.loaded < this._contentLength) {
								r = u.LoaderErrors.EARLY_EOF;
								n = {
									code: -1,
									msg: "Moz-Chunked stream meet Early-Eof"
								}
							} else {
								r = u.LoaderErrors.EXCEPTION;
								n = {
									code: -1,
									msg: t.constructor.name + " " + t.type
								}
							} if (this._onError) {
								this._onError(r, n)
							} else {
								throw new l.RuntimeException(n.msg)
							}
						}
					}]);
					return t
				}(u.BaseLoader);
				r.
				default = _
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./loader.js": 24
			}
		],
		30: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function e(t, r, n) {
					if (t === null) t = Function.prototype;
					var i = Object.getOwnPropertyDescriptor(t, r);
					if (i === undefined) {
						var a = Object.getPrototypeOf(t);
						if (a === null) {
							return undefined
						} else {
							return e(a, r, n)
						}
					} else if ("value" in i) {
						return i.value
					} else {
						var s = i.get;
						if (s === undefined) {
							return undefined
						}
						return s.call(n)
					}
				};
				var a = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var s = e("../utils/logger.js");
				var o = f(s);
				var u = e("./loader.js");
				var l = e("../utils/exception.js");

				function f(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function d(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function h(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function c(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}
				var _ = function(e) {
					c(t, e);
					a(t, null, [{
						key: "isSupported",
						value: function e() {
							try {
								if (typeof self.MSStream === "undefined" || typeof self.MSStreamReader === "undefined") {
									return false
								}
								var t = new XMLHttpRequest;
								t.open("GET", "https://example.com", true);
								t.responseType = "ms-stream";
								return t.responseType === "ms-stream"
							} catch (e) {
								o.
								default.w("MSStreamLoader", e.message);
								return false
							}
						}
					}]);

					function t(e) {
						d(this, t);
						var r = h(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-msstream-loader"));
						r.TAG = "MSStreamLoader";
						r._seekHandler = e;
						r._needStash = true;
						r._xhr = null;
						r._reader = null;
						r._totalRange = null;
						r._currentRange = null;
						r._contentLength = null;
						r._receivedLength = 0;
						r._bufferLimit = 16 * 1024 * 1024;
						r._lastTimeBufferSize = 0;
						r._isReconnecting = false;
						return r
					}
					a(t, [{
						key: "destroy",
						value: function e() {
							if (this.isWorking()) {
								this.abort()
							}
							if (this._reader) {
								this._reader.onprogress = null;
								this._reader.onload = null;
								this._reader.onerror = null;
								this._reader = null
							}
							if (this._xhr) {
								this._xhr.onreadystatechange = null;
								this._xhr = null
							}
							i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
						}
					}, {
						key: "open",
						value: function e(t, r) {
							this._internalOpen(t, r, false)
						}
					}, {
						key: "_internalOpen",
						value: function e(t, r, i) {
							this._dataSource = t;
							if (!i) {
								this._totalRange = r
							} else {
								this._currentRange = r
							}
							var a = this._seekHandler.getConfig(t.url, r);
							var s = this._reader = new self.MSStreamReader;
							s.onprogress = this._msrOnProgress.bind(this);
							s.onload = this._msrOnLoad.bind(this);
							s.onerror = this._msrOnError.bind(this);
							var o = this._xhr = new XMLHttpRequest;
							o.open("GET", a.url, true);
							o.responseType = "ms-stream";
							o.onreadystatechange = this._xhrOnReadyStateChange.bind(this);
							o.onerror = this._xhrOnError.bind(this);
							if (t.withCredentials) {
								o.withCredentials = true
							}
							if (n(a.headers) === "object") {
								var l = a.headers;
								for (var f in l) {
									if (l.hasOwnProperty(f)) {
										o.setRequestHeader(f, l[f])
									}
								}
							}
							if (this._isReconnecting) {
								this._isReconnecting = false
							} else {
								this._status = u.LoaderStatus.kConnecting
							}
							o.send()
						}
					}, {
						key: "abort",
						value: function e() {
							this._internalAbort();
							this._status = u.LoaderStatus.kComplete
						}
					}, {
						key: "_internalAbort",
						value: function e() {
							if (this._reader) {
								if (this._reader.readyState === 1) {
									this._reader.abort()
								}
								this._reader.onprogress = null;
								this._reader.onload = null;
								this._reader.onerror = null;
								this._reader = null
							}
							if (this._xhr) {
								this._xhr.abort();
								this._xhr.onreadystatechange = null;
								this._xhr = null
							}
						}
					}, {
						key: "_xhrOnReadyStateChange",
						value: function e(t) {
							var r = t.target;
							if (r.readyState === 3) {
								if (r.status >= 200 && r.status <= 299) {
									this._status = u.LoaderStatus.kBuffering;
									var n = r.getResponseHeader("Content-Length");
									if (n != null && this._contentLength == null) {
										var i = parseInt(n);
										if (i > 0) {
											this._contentLength = i;
											if (this._onContentLengthKnown) {
												this._onContentLengthKnown(this._contentLength)
											}
										}
									}
									var a = r.response;
									this._reader.readAsArrayBuffer(a)
								} else {
									this._status = u.LoaderStatus.kError;
									if (this._onError) {
										this._onError(u.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
											code: r.status,
											msg: r.statusText
										})
									} else {
										throw new l.RuntimeException("MSStreamLoader: Http code invalid, " + r.status + " " + r.statusText)
									}
								}
							}
						}
					}, {
						key: "_xhrOnError",
						value: function e(t) {
							this._status = u.LoaderStatus.kError;
							var r = u.LoaderErrors.EXCEPTION;
							var n = {
								code: -1,
								msg: t.constructor.name + " " + t.type
							};
							if (this._onError) {
								this._onError(r, n)
							} else {
								throw new l.RuntimeException(n.msg)
							}
						}
					}, {
						key: "_msrOnProgress",
						value: function e(t) {
							var r = t.target;
							var n = r.result;
							if (n == null) {
								this._doReconnectIfNeeded();
								return
							}
							var i = n.slice(this._lastTimeBufferSize);
							this._lastTimeBufferSize = n.byteLength;
							var a = this._totalRange.from + this._receivedLength;
							this._receivedLength += i.byteLength;
							if (this._onDataArrival) {
								this._onDataArrival(i, a, this._receivedLength)
							}
							if (n.byteLength >= this._bufferLimit) {
								o.
								default.v(this.TAG, "MSStream buffer exceeded max size near " + (a + i.byteLength) + ", reconnecting...");
								this._doReconnectIfNeeded()
							}
						}
					}, {
						key: "_doReconnectIfNeeded",
						value: function e() {
							if (this._contentLength == null || this._receivedLength < this._contentLength) {
								this._isReconnecting = true;
								this._lastTimeBufferSize = 0;
								this._internalAbort();
								var t = {
									from: this._totalRange.from + this._receivedLength,
									to: -1
								};
								this._internalOpen(this._dataSource, t, true)
							}
						}
					}, {
						key: "_msrOnLoad",
						value: function e(t) {
							this._status = u.LoaderStatus.kComplete;
							if (this._onComplete) {
								this._onComplete(this._totalRange.from, this._totalRange.from + this._receivedLength - 1)
							}
						}
					}, {
						key: "_msrOnError",
						value: function e(t) {
							this._status = u.LoaderStatus.kError;
							var r = 0;
							var n = null;
							if (this._contentLength && this._receivedLength < this._contentLength) {
								r = u.LoaderErrors.EARLY_EOF;
								n = {
									code: -1,
									msg: "MSStream meet Early-Eof"
								}
							} else {
								r = u.LoaderErrors.EARLY_EOF;
								n = {
									code: -1,
									msg: t.constructor.name + " " + t.type
								}
							} if (this._onError) {
								this._onError(r, n)
							} else {
								throw new l.RuntimeException(n.msg)
							}
						}
					}]);
					return t
				}(u.BaseLoader);
				r.
				default = _
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./loader.js": 24
			}
		],
		31: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function e(t, r, n) {
					if (t === null) t = Function.prototype;
					var i = Object.getOwnPropertyDescriptor(t, r);
					if (i === undefined) {
						var a = Object.getPrototypeOf(t);
						if (a === null) {
							return undefined
						} else {
							return e(a, r, n)
						}
					} else if ("value" in i) {
						return i.value
					} else {
						var s = i.get;
						if (s === undefined) {
							return undefined
						}
						return s.call(n)
					}
				};
				var a = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var s = e("../utils/logger.js");
				var o = h(s);
				var u = e("./speed-sampler.js");
				var l = h(u);
				var f = e("./loader.js");
				var d = e("../utils/exception.js");

				function h(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function c(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}

				function _(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function v(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}
				var m = function(e) {
					v(t, e);
					a(t, null, [{
						key: "isSupported",
						value: function e() {
							try {
								var t = new XMLHttpRequest;
								t.open("GET", "https://example.com", true);
								t.responseType = "arraybuffer";
								return t.responseType === "arraybuffer"
							} catch (e) {
								o.
								default.w("RangeLoader", e.message);
								return false
							}
						}
					}]);

					function t(e) {
						c(this, t);
						var r = _(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "xhr-range-loader"));
						r.TAG = "RangeLoader";
						r._seekHandler = e;
						r._needStash = false;
						r._chunkSizeKBList = [128, 256, 384, 512, 768, 1024, 1536, 2048, 3072, 4096, 5120, 6144, 7168, 8192];
						r._currentChunkSizeKB = 384;
						r._currentSpeedNormalized = 0;
						r._zeroSpeedChunkCount = 0;
						r._xhr = null;
						r._speedSampler = new l.
						default;
						r._requestAbort = false;
						r._waitForTotalLength = false;
						r._totalLengthReceived = false;
						r._currentRequestRange = null;
						r._totalLength = null;
						r._contentLength = null;
						r._receivedLength = 0;
						r._lastTimeLoaded = 0;
						return r
					}
					a(t, [{
						key: "destroy",
						value: function e() {
							if (this.isWorking()) {
								this.abort()
							}
							if (this._xhr) {
								this._xhr.onreadystatechange = null;
								this._xhr.onprogress = null;
								this._xhr.onload = null;
								this._xhr.onerror = null;
								this._xhr = null
							}
							i(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "destroy", this).call(this)
						}
					}, {
						key: "open",
						value: function e(t, r) {
							this._dataSource = t;
							this._range = r;
							this._status = f.LoaderStatus.kConnecting;
							if (!this._totalLengthReceived) {
								this._waitForTotalLength = true;
								this._internalOpen(this._dataSource, {
									from: 0,
									to: -1
								})
							} else {
								this._openSubRange()
							}
						}
					}, {
						key: "_openSubRange",
						value: function e() {
							var t = this._currentChunkSizeKB * 1024;
							var r = this._range.from + this._receivedLength;
							var n = r + t;
							if (this._contentLength != null) {
								if (n - this._range.from >= this._contentLength) {
									n = this._range.from + this._contentLength - 1
								}
							}
							this._currentRequestRange = {
								from: r,
								to: n
							};
							this._internalOpen(this._dataSource, this._currentRequestRange)
						}
					}, {
						key: "_internalOpen",
						value: function e(t, r) {
							this._lastTimeLoaded = 0;
							var i = this._seekHandler.getConfig(t.url, r);
							var a = this._xhr = new XMLHttpRequest;
							a.open("GET", i.url, true);
							a.responseType = "arraybuffer";
							a.onreadystatechange = this._onReadyStateChange.bind(this);
							a.onprogress = this._onProgress.bind(this);
							a.onload = this._onLoad.bind(this);
							a.onerror = this._onXhrError.bind(this);
							if (t.withCredentials && a["withCredentials"]) {
								a.withCredentials = true
							}
							if (n(i.headers) === "object") {
								var s = i.headers;
								for (var o in s) {
									if (s.hasOwnProperty(o)) {
										a.setRequestHeader(o, s[o])
									}
								}
							}
							a.send()
						}
					}, {
						key: "abort",
						value: function e() {
							this._requestAbort = true;
							this._internalAbort();
							this._status = f.LoaderStatus.kComplete
						}
					}, {
						key: "_internalAbort",
						value: function e() {
							if (this._xhr) {
								this._xhr.onreadystatechange = null;
								this._xhr.onprogress = null;
								this._xhr.onload = null;
								this._xhr.onerror = null;
								this._xhr.abort();
								this._xhr = null
							}
						}
					}, {
						key: "_onReadyStateChange",
						value: function e(t) {
							var r = t.target;
							if (r.readyState === 2) {
								if (r.status >= 200 && r.status < 300) {
									if (this._waitForTotalLength) {
										return
									}
									this._status = f.LoaderStatus.kBuffering
								} else {
									this._status = f.LoaderStatus.kError;
									if (this._onError) {
										this._onError(f.LoaderErrors.HTTP_STATUS_CODE_INVALID, {
											code: r.status,
											msg: r.statusText
										})
									} else {
										throw new d.RuntimeException("RangeLoader: Http code invalid, " + r.status + " " + r.statusText)
									}
								}
							}
						}
					}, {
						key: "_onProgress",
						value: function e(t) {
							if (this._contentLength === null) {
								var r = false;
								if (this._waitForTotalLength) {
									this._waitForTotalLength = false;
									this._totalLengthReceived = true;
									r = true;
									var n = t.total;
									this._internalAbort();
									if (n != null & n !== 0) {
										this._totalLength = n
									}
								}
								if (this._range.to === -1) {
									this._contentLength = this._totalLength - this._range.from
								} else {
									this._contentLength = this._range.to - this._range.from + 1
								} if (r) {
									this._openSubRange();
									return
								}
								if (this._onContentLengthKnown) {
									this._onContentLengthKnown(this._contentLength)
								}
							}
							var i = t.loaded - this._lastTimeLoaded;
							this._lastTimeLoaded = t.loaded;
							this._speedSampler.addBytes(i)
						}
					}, {
						key: "_normalizeSpeed",
						value: function e(t) {
							var r = this._chunkSizeKBList;
							var n = r.length - 1;
							var i = 0;
							var a = 0;
							var s = n;
							if (t < r[0]) {
								return r[0]
							}
							while (a <= s) {
								i = a + Math.floor((s - a) / 2);
								if (i === n || t >= r[i] && t < r[i + 1]) {
									return r[i]
								} else if (r[i] < t) {
									a = i + 1
								} else {
									s = i - 1
								}
							}
						}
					}, {
						key: "_onLoad",
						value: function e(t) {
							if (this._waitForTotalLength) {
								this._waitForTotalLength = false;
								return
							}
							this._lastTimeLoaded = 0;
							var r = this._speedSampler.lastSecondKBps;
							if (r === 0) {
								this._zeroSpeedChunkCount++;
								if (this._zeroSpeedChunkCount >= 3) {
									r = this._speedSampler.currentKBps
								}
							}
							if (r !== 0) {
								var n = this._normalizeSpeed(r);
								if (this._currentSpeedNormalized !== n) {
									this._currentSpeedNormalized = n;
									this._currentChunkSizeKB = n
								}
							}
							var i = t.target.response;
							var a = this._range.from + this._receivedLength;
							this._receivedLength += i.byteLength;
							var s = false;
							if (this._contentLength != null && this._receivedLength < this._contentLength) {
								this._openSubRange()
							} else {
								s = true
							} if (this._onDataArrival) {
								this._onDataArrival(i, a, this._receivedLength)
							}
							if (s) {
								this._status = f.LoaderStatus.kComplete;
								if (this._onComplete) {
									this._onComplete(this._range.from, this._range.from + this._receivedLength - 1)
								}
							}
						}
					}, {
						key: "_onXhrError",
						value: function e(t) {
							this._status = f.LoaderStatus.kError;
							var r = 0;
							var n = null;
							if (this._contentLength && this._receivedLength > 0 && this._receivedLength < this._contentLength) {
								r = f.LoaderErrors.EARLY_EOF;
								n = {
									code: -1,
									msg: "RangeLoader meet Early-Eof"
								}
							} else {
								r = f.LoaderErrors.EXCEPTION;
								n = {
									code: -1,
									msg: t.constructor.name + " " + t.type
								}
							} if (this._onError) {
								this._onError(r, n)
							} else {
								throw new d.RuntimeException(n.msg)
							}
						}
					}, {
						key: "currentSpeed",
						get: function e() {
							return this._speedSampler.lastSecondKBps
						}
					}]);
					return t
				}(f.BaseLoader);
				r.
				default = m
			}, {
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./loader.js": 24,
				"./speed-sampler.js": 27
			}
		],
		32: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var a = e("events");
				var s = w(a);
				var o = e("../utils/logger.js");
				var u = w(o);
				var l = e("../utils/browser.js");
				var f = w(l);
				var d = e("./player-events.js");
				var h = w(d);
				var c = e("../core/transmuxer.js");
				var _ = w(c);
				var v = e("../core/transmuxing-events.js");
				var m = w(v);
				var p = e("../core/mse-controller.js");
				var g = w(p);
				var y = e("../core/mse-events.js");
				var E = w(y);
				var b = e("./player-errors.js");
				var S = e("../config.js");
				var k = e("../utils/exception.js");

				function w(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function L(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var T = function() {
					function e(t, r) {
						L(this, e);
						this.TAG = "FlvPlayer";
						this._type = "FlvPlayer";
						this._emitter = new s.
						default;
						this._config = (0, S.createDefaultConfig)();
						if ((typeof r === "undefined" ? "undefined" : n(r)) === "object") {
							Object.assign(this._config, r)
						}
						if (t.type.toLowerCase() !== "flv") {
							throw new k.InvalidArgumentException("FlvPlayer requires an flv MediaDataSource input!")
						}
						if (t.isLive === true) {
							this._config.isLive = true
						}
						this.e = {
							onvLoadedMetadata: this._onvLoadedMetadata.bind(this),
							onvSeeking: this._onvSeeking.bind(this),
							onvCanPlay: this._onvCanPlay.bind(this),
							onvStalled: this._onvStalled.bind(this),
							onvProgress: this._onvProgress.bind(this)
						};
						if (self.performance && self.performance.now) {
							this._now = self.performance.now.bind(self.performance)
						} else {
							this._now = Date.now
						}
						this._pendingSeekTime = null;
						this._requestSetTime = false;
						this._seekpointRecord = null;
						this._progressChecker = null;
						this._mediaDataSource = t;
						this._mediaElement = null;
						this._msectl = null;
						this._transmuxer = null;
						this._mseSourceOpened = false;
						this._hasPendingLoad = false;
						this._receivedCanPlay = false;
						this._mediaInfo = null;
						this._statisticsInfo = null;
						var i = f.
						default.chrome && (f.
							default.version.major < 50 || f.
							default.version.major === 50 && f.
							default.version.build < 2661);
						this._alwaysSeekKeyframe = i || f.
						default.msedge || f.
						default.msie ? true : false;
						if (this._alwaysSeekKeyframe) {
							this._config.accurateSeek = false
						}
					}
					i(e, [{
						key: "destroy",
						value: function e() {
							if (this._progressChecker != null) {
								window.clearInterval(this._progressChecker);
								this._progressChecker = null
							}
							if (this._transmuxer) {
								this.unload()
							}
							if (this._mediaElement) {
								this.detachMediaElement()
							}
							this.e = null;
							this._mediaDataSource = null;
							this._emitter.removeAllListeners();
							this._emitter = null
						}
					}, {
						key: "on",
						value: function e(t, r) {
							var n = this;
							if (t === h.
								default.MEDIA_INFO) {
								if (this._mediaInfo != null) {
									Promise.resolve().then(function() {
										n._emitter.emit(h.
											default.MEDIA_INFO, n.mediaInfo)
									})
								}
							} else if (t === h.
								default.STATISTICS_INFO) {
								if (this._statisticsInfo != null) {
									Promise.resolve().then(function() {
										n._emitter.emit(h.
											default.STATISTICS_INFO, n.statisticsInfo)
									})
								}
							}
							this._emitter.addListener(t, r)
						}
					}, {
						key: "off",
						value: function e(t, r) {
							this._emitter.removeListener(t, r)
						}
					}, {
						key: "attachMediaElement",
						value: function e(t) {
							var r = this;
							this._mediaElement = t;
							t.addEventListener("loadedmetadata", this.e.onvLoadedMetadata);
							t.addEventListener("seeking", this.e.onvSeeking);
							t.addEventListener("canplay", this.e.onvCanPlay);
							t.addEventListener("stalled", this.e.onvStalled);
							t.addEventListener("progress", this.e.onvProgress);
							this._msectl = new g.
							default;
							this._msectl.on(E.
								default.UPDATE_END, this._onmseUpdateEnd.bind(this));
							this._msectl.on(E.
								default.BUFFER_FULL, this._onmseBufferFull.bind(this));
							this._msectl.on(E.
								default.SOURCE_OPEN, function() {
									r._mseSourceOpened = true;
									if (r._hasPendingLoad) {
										r._hasPendingLoad = false;
										r.load()
									}
								});
							this._msectl.on(E.
								default.ERROR, function(e) {
									r._emitter.emit(h.
										default.ERROR, b.ErrorTypes.MEDIA_ERROR, b.ErrorDetails.MEDIA_MSE_ERROR, e)
								});
							this._msectl.attachMediaElement(t);
							if (this._pendingSeekTime != null) {
								try {
									t.currentTime = this._pendingSeekTime;
									this._pendingSeekTime = null
								} catch (e) {}
							}
						}
					}, {
						key: "detachMediaElement",
						value: function e() {
							if (this._mediaElement) {
								this._msectl.detachMediaElement();
								this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata);
								this._mediaElement.removeEventListener("seeking", this.e.onvSeeking);
								this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay);
								this._mediaElement.removeEventListener("stalled", this.e.onvStalled);
								this._mediaElement.removeEventListener("progress", this.e.onvProgress);
								this._mediaElement = null
							}
							if (this._msectl) {
								this._msectl.destroy();
								this._msectl = null
							}
						}
					}, {
						key: "load",
						value: function e() {
							var t = this;
							if (!this._mediaElement) {
								throw new k.IllegalStateException("HTMLMediaElement must be attached before load()!")
							}
							if (this._transmuxer) {
								throw new k.IllegalStateException("FlvPlayer.load() has been called, please call unload() first!")
							}
							if (this._hasPendingLoad) {
								return
							}
							if (this._config.deferLoadAfterSourceOpen && this._mseSourceOpened === false) {
								this._hasPendingLoad = true;
								return
							}
							if (this._mediaElement.readyState > 0) {
								this._requestSetTime = true;
								this._mediaElement.currentTime = 0
							}
							this._transmuxer = new _.
							default (this._mediaDataSource, this._config);
							this._transmuxer.on(m.
								default.INIT_SEGMENT, function(e, r) {
									t._msectl.appendInitSegment(r)
								});
							this._transmuxer.on(m.
								default.MEDIA_SEGMENT, function(e, r) {
									t._msectl.appendMediaSegment(r);
									if (t._config.isLive) {
										t._msectl.update(1)
									}
									if (t._config.lazyLoad && !t._config.isLive) {
										var n = t._mediaElement.currentTime;
										if (r.info.endDts >= (n + t._config.lazyLoadMaxDuration) * 1e3) {
											if (t._progressChecker == null) {
												u.
												default.v(t.TAG, "Maximum buffering duration exceeded, suspend transmuxing task");
												t._suspendTransmuxer()
											}
										}
									}
								});
							this._transmuxer.on(m.
								default.LOADING_COMPLETE, function() {
									t._msectl.endOfStream();
									t._emitter.emit(h.
										default.LOADING_COMPLETE)
								});
							this._transmuxer.on(m.
								default.RECOVERED_EARLY_EOF, function() {
									t._emitter.emit(h.
										default.RECOVERED_EARLY_EOF)
								});
							this._transmuxer.on(m.
								default.IO_ERROR, function(e, r) {
									t._emitter.emit(h.
										default.ERROR, b.ErrorTypes.NETWORK_ERROR, e, r)
								});
							this._transmuxer.on(m.
								default.DEMUX_ERROR, function(e, r) {
									t._emitter.emit(h.
										default.ERROR, b.ErrorTypes.MEDIA_ERROR, e, {
											code: -1,
											msg: r
										})
								});
							this._transmuxer.on(m.
								default.MEDIA_INFO, function(e) {
									t._mediaInfo = e;
									t._emitter.emit(h.
										default.MEDIA_INFO, Object.assign({}, e))
								});
							this._transmuxer.on(m.
								default.STATISTICS_INFO, function(e) {
									t._statisticsInfo = t._fillStatisticsInfo(e);
									t._emitter.emit(h.
										default.STATISTICS_INFO, Object.assign({}, t._statisticsInfo))
								});
							this._transmuxer.on(m.
								default.RECOMMEND_SEEKPOINT, function(e) {
									if (t._mediaElement && !t._config.accurateSeek) {
										t._requestSetTime = true;
										t._mediaElement.currentTime = e / 1e3
									}
								});
							this._transmuxer.open()
						}
					}, {
						key: "unload",
						value: function e() {
							if (this._mediaElement) {
								this._mediaElement.pause()
							}
							if (this._msectl) {
								this._msectl.seek(0)
							}
							if (this._transmuxer) {
								this._transmuxer.close();
								this._transmuxer.destroy();
								this._transmuxer = null
							}
						}
					}, {
						key: "play",
						value: function e() {
							this._mediaElement.play()
						}
					}, {
						key: "changestream",
						value: function e(t) {
							var r = this._mediaDataSource.url;
							var n;
							if (t) {
								if (r.indexOf("st=") > 0) n = r.replace("st=0", "st=1");
								else n = r + "&st=1"
							} else {
								if (r.indexOf("st=") > 0) n = r.replace("st=1", "st=0");
								else n = r + "&st=0"
							}
							this.unload();
							this._mediaDataSource.url = n;
							this._mediaDataSource.segments[0].url = n;
							this.load();
							this.play()
						}
					}, {
						key: "pause",
						value: function e() {
							this._mediaElement.pause()
						}
					}, {
						key: "_fillStatisticsInfo",
						value: function e(t) {
							t.playerType = this._type;
							if (!(this._mediaElement instanceof HTMLVideoElement)) {
								return t
							}
							var r = true;
							var n = 0;
							var i = 0;
							if (this._mediaElement.getVideoPlaybackQuality) {
								var a = this._mediaElement.getVideoPlaybackQuality();
								n = a.totalVideoFrames;
								i = a.droppedVideoFrames
							} else if (this._mediaElement.webkitDecodedFrameCount != undefined) {
								n = this._mediaElement.webkitDecodedFrameCount;
								i = this._mediaElement.webkitDroppedFrameCount
							} else {
								r = false
							} if (r) {
								t.decodedFrames = n;
								t.droppedFrames = i
							}
							return t
						}
					}, {
						key: "_onmseUpdateEnd",
						value: function e() {
							if (!this._config.lazyLoad || this._config.isLive) {
								return
							}
							var t = this._mediaElement.buffered;
							var r = this._mediaElement.currentTime;
							var n = 0;
							var i = 0;
							for (var a = 0; a < t.length; a++) {
								var s = t.start(a);
								var o = t.end(a);
								if (s <= r && r < o) {
									n = s;
									i = o;
									break
								}
							}
							if (i >= r + this._config.lazyLoadMaxDuration && this._progressChecker == null) {
								u.
								default.v(this.TAG, "Maximum buffering duration exceeded, suspend transmuxing task");
								this._suspendTransmuxer()
							}
						}
					}, {
						key: "_onmseBufferFull",
						value: function e() {
							u.
							default.v(this.TAG, "MSE SourceBuffer is full, suspend transmuxing task");
							if (this._progressChecker == null) {
								this._suspendTransmuxer()
							}
						}
					}, {
						key: "_suspendTransmuxer",
						value: function e() {
							if (this._transmuxer) {
								this._transmuxer.pause();
								if (this._progressChecker == null) {
									this._progressChecker = window.setInterval(this._checkProgressAndResume.bind(this), 1e3)
								}
							}
						}
					}, {
						key: "_checkProgressAndResume",
						value: function e() {
							var t = this._mediaElement.currentTime;
							var r = this._mediaElement.buffered;
							var n = 0;
							for (var i = 0; i < r.length; i++) {
								var a = r.start(i);
								var s = r.end(i);
								if (t >= a) {
									if (t >= s - this._config.lazyLoadRecoverDuration) {
										n = s
									}
									break
								}
							}
							if (n) {
								window.clearInterval(this._progressChecker);
								this._progressChecker = null;
								if (n) {
									u.
									default.v(this.TAG, "Continue loading from paused position");
									this._transmuxer.resume(n * 1e3)
								}
							}
						}
					}, {
						key: "_isTimepointBuffered",
						value: function e(t) {
							var r = this._mediaElement.buffered;
							for (var n = 0; n < r.length; n++) {
								var i = r.start(n);
								var a = r.end(n);
								if (t >= i && t < a) {
									return true
								}
							}
							return false
						}
					}, {
						key: "_internalSeek",
						value: function e(t) {
							var r = this._isTimepointBuffered(t);
							var n = false;
							var i = 0;
							if (t < 1 && this._mediaElement.buffered.length > 0) {
								var a = this._mediaElement.buffered.start(0);
								if (a < 1 && t < a || f.
									default.safari) {
									n = true;
									i = f.
									default.safari ? .1 : a
								}
							}
							if (n) {
								this._requestSetTime = true;
								this._mediaElement.currentTime = i
							} else if (r) {
								if (!this._alwaysSeekKeyframe) {
									this._requestSetTime = true;
									this._mediaElement.currentTime = t
								} else {
									var s = this._msectl.getNearestKeyframe(Math.floor(t * 1e3));
									this._requestSetTime = true;
									if (s != null) {
										this._mediaElement.currentTime = s.dts / 1e3
									} else {
										this._mediaElement.currentTime = t
									}
								} if (this._progressChecker != null) {
									this._checkProgressAndResume()
								}
							} else {
								if (this._progressChecker != null) {
									window.clearInterval(this._progressChecker);
									this._progressChecker = null
								}
								this._msectl.seek(t);
								this._transmuxer.seek(Math.floor(t * 1e3));
								if (this._config.accurateSeek) {
									this._requestSetTime = true;
									this._mediaElement.currentTime = t
								}
							}
						}
					}, {
						key: "_checkAndApplyUnbufferedSeekpoint",
						value: function e() {
							if (this._seekpointRecord) {
								if (this._seekpointRecord.recordTime <= this._now() - 100) {
									var t = this._mediaElement.currentTime;
									this._seekpointRecord = null;
									if (!this._isTimepointBuffered(t)) {
										if (this._progressChecker != null) {
											window.clearTimeout(this._progressChecker);
											this._progressChecker = null
										}
										this._msectl.seek(t);
										this._transmuxer.seek(Math.floor(t * 1e3));
										if (this._config.accurateSeek) {
											this._requestSetTime = true;
											this._mediaElement.currentTime = t
										}
									}
								} else {
									window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
								}
							}
						}
					}, {
						key: "_checkAndResumeStuckPlayback",
						value: function e(t) {
							var r = this._mediaElement;
							if (t || !this._receivedCanPlay || r.readyState < 2) {
								var n = r.buffered;
								if (n.length > 0 && r.currentTime < n.start(0)) {
									u.
									default.w(this.TAG, "Playback seems stuck at " + r.currentTime + ", seek to " + n.start(0));
									this._requestSetTime = true;
									this._mediaElement.currentTime = n.start(0);
									this._mediaElement.removeEventListener("progress", this.e.onvProgress)
								}
							} else {
								this._mediaElement.removeEventListener("progress", this.e.onvProgress)
							}
						}
					}, {
						key: "_onvLoadedMetadata",
						value: function e(t) {
							if (this._pendingSeekTime != null) {
								this._mediaElement.currentTime = this._pendingSeekTime;
								this._pendingSeekTime = null
							}
						}
					}, {
						key: "_onvSeeking",
						value: function e(t) {
							var r = this._mediaElement.currentTime;
							var n = this._mediaElement.buffered;
							if (this._requestSetTime) {
								this._requestSetTime = false;
								return
							}
							if (r < 1 && n.length > 0) {
								var i = n.start(0);
								if (i < 1 && r < i || f.
									default.safari) {
									this._requestSetTime = true;
									this._mediaElement.currentTime = f.
									default.safari ? .1 : i;
									return
								}
							}
							if (this._isTimepointBuffered(r)) {
								if (this._alwaysSeekKeyframe) {
									var a = this._msectl.getNearestKeyframe(Math.floor(r * 1e3));
									if (a != null) {
										this._requestSetTime = true;
										this._mediaElement.currentTime = a.dts / 1e3
									}
								}
								if (this._progressChecker != null) {
									this._checkProgressAndResume()
								}
								return
							}
							this._seekpointRecord = {
								seekPoint: r,
								recordTime: this._now()
							};
							window.setTimeout(this._checkAndApplyUnbufferedSeekpoint.bind(this), 50)
						}
					}, {
						key: "_onvCanPlay",
						value: function e(t) {
							this._receivedCanPlay = true;
							this._mediaElement.removeEventListener("canplay", this.e.onvCanPlay)
						}
					}, {
						key: "_onvStalled",
						value: function e(t) {
							this._checkAndResumeStuckPlayback(true)
						}
					}, {
						key: "_onvProgress",
						value: function e(t) {
							this._checkAndResumeStuckPlayback()
						}
					}, {
						key: "type",
						get: function e() {
							return this._type
						}
					}, {
						key: "buffered",
						get: function e() {
							return this._mediaElement.buffered
						}
					}, {
						key: "duration",
						get: function e() {
							return this._mediaElement.duration
						}
					}, {
						key: "volume",
						get: function e() {
							return this._mediaElement.volume
						},
						set: function e(t) {
							this._mediaElement.volume = t
						}
					}, {
						key: "muted",
						get: function e() {
							return this._mediaElement.muted
						},
						set: function e(t) {
							this._mediaElement.muted = t
						}
					}, {
						key: "currentTime",
						get: function e() {
							if (this._mediaElement) {
								return this._mediaElement.currentTime
							}
							return 0
						},
						set: function e(t) {
							if (this._mediaElement) {
								this._internalSeek(t)
							} else {
								this._pendingSeekTime = t
							}
						}
					}, {
						key: "mediaInfo",
						get: function e() {
							return Object.assign({}, this._mediaInfo)
						}
					}, {
						key: "statisticsInfo",
						get: function e() {
							if (this._statisticsInfo == null) {
								this._statisticsInfo = {}
							}
							this._statisticsInfo = this._fillStatisticsInfo(this._statisticsInfo);
							return Object.assign({}, this._statisticsInfo)
						}
					}]);
					return e
				}();
				r.
				default = T
			}, {
				"../config.js": 5,
				"../core/mse-controller.js": 9,
				"../core/mse-events.js": 10,
				"../core/transmuxer.js": 11,
				"../core/transmuxing-events.js": 13,
				"../utils/browser.js": 39,
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./player-errors.js": 34,
				"./player-events.js": 35,
				events: 2
			}
		],
		33: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(e) {
						return typeof e
					} : function(e) {
						return e && typeof Symbol === "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
					};
				var i = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var a = e("events");
				var s = d(a);
				var o = e("./player-events.js");
				var u = d(o);
				var l = e("../config.js");
				var f = e("../utils/exception.js");

				function d(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function h(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var c = function() {
					function e(t, r) {
						h(this, e);
						this.TAG = "NativePlayer";
						this._type = "NativePlayer";
						this._emitter = new s.
						default;
						this._config = (0, l.createDefaultConfig)();
						if ((typeof r === "undefined" ? "undefined" : n(r)) === "object") {
							Object.assign(this._config, r)
						}
						if (t.type.toLowerCase() === "flv") {
							throw new f.InvalidArgumentException("NativePlayer does't support flv MediaDataSource input!")
						}
						if (t.hasOwnProperty("segments")) {
							throw new f.InvalidArgumentException("NativePlayer(" + t.type + ") doesn't support multipart playback!")
						}
						this.e = {
							onvLoadedMetadata: this._onvLoadedMetadata.bind(this)
						};
						this._pendingSeekTime = null;
						this._statisticsReporter = null;
						this._mediaDataSource = t;
						this._mediaElement = null
					}
					i(e, [{
						key: "destroy",
						value: function e() {
							if (this._mediaElement) {
								this.unload();
								this.detachMediaElement()
							}
							this.e = null;
							this._mediaDataSource = null;
							this._emitter.removeAllListeners();
							this._emitter = null
						}
					}, {
						key: "on",
						value: function e(t, r) {
							var n = this;
							if (t === u.
								default.MEDIA_INFO) {
								if (this._mediaElement != null && this._mediaElement.readyState !== 0) {
									Promise.resolve().then(function() {
										n._emitter.emit(u.
											default.MEDIA_INFO, n.mediaInfo)
									})
								}
							} else if (t === u.
								default.STATISTICS_INFO) {
								if (this._mediaElement != null && this._mediaElement.readyState !== 0) {
									Promise.resolve().then(function() {
										n._emitter.emit(u.
											default.STATISTICS_INFO, n.statisticsInfo)
									})
								}
							}
							this._emitter.addListener(t, r)
						}
					}, {
						key: "off",
						value: function e(t, r) {
							this._emitter.removeListener(t, r)
						}
					}, {
						key: "attachMediaElement",
						value: function e(t) {
							this._mediaElement = t;
							t.addEventListener("loadedmetadata", this.e.onvLoadedMetadata);
							if (this._pendingSeekTime != null) {
								try {
									t.currentTime = this._pendingSeekTime;
									this._pendingSeekTime = null
								} catch (e) {}
							}
						}
					}, {
						key: "detachMediaElement",
						value: function e() {
							if (this._mediaElement) {
								this._mediaElement.src = "";
								this._mediaElement.removeAttribute("src");
								this._mediaElement.removeEventListener("loadedmetadata", this.e.onvLoadedMetadata);
								this._mediaElement = null
							}
							if (this._statisticsReporter != null) {
								window.clearInterval(this._statisticsReporter);
								this._statisticsReporter = null
							}
						}
					}, {
						key: "load",
						value: function e() {
							if (!this._mediaElement) {
								throw new f.IllegalStateException("HTMLMediaElement must be attached before load()!")
							}
							this._mediaElement.src = this._mediaDataSource.url;
							if (this._mediaElement.readyState > 0) {
								this._mediaElement.currentTime = 0
							}
							this._mediaElement.preload = "auto";
							this._mediaElement.load();
							this._statisticsReporter = window.setInterval(this._reportStatisticsInfo.bind(this), this._config.statisticsInfoReportInterval)
						}
					}, {
						key: "unload",
						value: function e() {
							if (this._mediaElement) {
								this._mediaElement.src = "";
								this._mediaElement.removeAttribute("src")
							}
							if (this._statisticsReporter != null) {
								window.clearInterval(this._statisticsReporter);
								this._statisticsReporter = null
							}
						}
					}, {
						key: "play",
						value: function e() {
							this._mediaElement.play()
						}
					}, {
						key: "pause",
						value: function e() {
							this._mediaElement.pause()
						}
					}, {
						key: "_onvLoadedMetadata",
						value: function e(t) {
							if (this._pendingSeekTime != null) {
								this._mediaElement.currentTime = this._pendingSeekTime;
								this._pendingSeekTime = null
							}
							this._emitter.emit(u.
								default.MEDIA_INFO, this.mediaInfo)
						}
					}, {
						key: "_reportStatisticsInfo",
						value: function e() {
							this._emitter.emit(u.
								default.STATISTICS_INFO, this.statisticsInfo)
						}
					}, {
						key: "type",
						get: function e() {
							return this._type
						}
					}, {
						key: "buffered",
						get: function e() {
							return this._mediaElement.buffered
						}
					}, {
						key: "duration",
						get: function e() {
							return this._mediaElement.duration
						}
					}, {
						key: "volume",
						get: function e() {
							return this._mediaElement.volume
						},
						set: function e(t) {
							this._mediaElement.volume = t
						}
					}, {
						key: "muted",
						get: function e() {
							return this._mediaElement.muted
						},
						set: function e(t) {
							this._mediaElement.muted = t
						}
					}, {
						key: "currentTime",
						get: function e() {
							if (this._mediaElement) {
								return this._mediaElement.currentTime
							}
							return 0
						},
						set: function e(t) {
							if (this._mediaElement) {
								this._mediaElement.currentTime = t
							} else {
								this._pendingSeekTime = t
							}
						}
					}, {
						key: "mediaInfo",
						get: function e() {
							var t = this._mediaElement instanceof HTMLAudioElement ? "audio/" : "video/";
							var r = {
								mimeType: t + this._mediaDataSource.type
							};
							if (this._mediaElement) {
								r.duration = Math.floor(this._mediaElement.duration * 1e3);
								if (this._mediaElement instanceof HTMLVideoElement) {
									r.width = this._mediaElement.videoWidth;
									r.height = this._mediaElement.videoHeight
								}
							}
							return r
						}
					}, {
						key: "statisticsInfo",
						get: function e() {
							var t = {
								playerType: this._type,
								url: this._mediaDataSource.url
							};
							if (!(this._mediaElement instanceof HTMLVideoElement)) {
								return t
							}
							var r = true;
							var n = 0;
							var i = 0;
							if (this._mediaElement.getVideoPlaybackQuality) {
								var a = this._mediaElement.getVideoPlaybackQuality();
								n = a.totalVideoFrames;
								i = a.droppedVideoFrames
							} else if (this._mediaElement.webkitDecodedFrameCount != undefined) {
								n = this._mediaElement.webkitDecodedFrameCount;
								i = this._mediaElement.webkitDroppedFrameCount
							} else {
								r = false
							} if (r) {
								t.decodedFrames = n;
								t.droppedFrames = i
							}
							return t
						}
					}]);
					return e
				}();
				r.
				default = c
			}, {
				"../config.js": 5,
				"../utils/exception.js": 40,
				"./player-events.js": 35,
				events: 2
			}
		],
		34: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				r.ErrorDetails = r.ErrorTypes = undefined;
				var n = e("../io/loader.js");
				var i = e("../demux/demux-errors.js");
				var a = s(i);

				function s(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}
				var o = r.ErrorTypes = {
					NETWORK_ERROR: "NetworkError",
					MEDIA_ERROR: "MediaError",
					OTHER_ERROR: "OtherError"
				};
				var u = r.ErrorDetails = {
					NETWORK_EXCEPTION: n.LoaderErrors.EXCEPTION,
					NETWORK_STATUS_CODE_INVALID: n.LoaderErrors.HTTP_STATUS_CODE_INVALID,
					NETWORK_TIMEOUT: n.LoaderErrors.CONNECTING_TIMEOUT,
					NETWORK_UNRECOVERABLE_EARLY_EOF: n.LoaderErrors.UNRECOVERABLE_EARLY_EOF,
					MEDIA_MSE_ERROR: "MediaMSEError",
					MEDIA_FORMAT_ERROR: a.
					default.FORMAT_ERROR,
					MEDIA_FORMAT_UNSUPPORTED: a.
					default.FORMAT_UNSUPPORTED,
					MEDIA_CODEC_UNSUPPORTED: a.
					default.CODEC_UNSUPPORTED
				}
			}, {
				"../demux/demux-errors.js": 16,
				"../io/loader.js": 24
			}
		],
		35: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = {
					ERROR: "error",
					LOADING_COMPLETE: "loading_complete",
					RECOVERED_EARLY_EOF: "recovered_early_eof",
					MEDIA_INFO: "media_info",
					STATISTICS_INFO: "statistics_info"
				};
				r.
				default = n
			}, {}
		],
		36: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e() {
						i(this, e)
					}
					n(e, null, [{
						key: "getSilentFrame",
						value: function e(t) {
							if (t === 1) {
								return new Uint8Array([0, 200, 0, 128, 35, 128])
							} else if (t === 2) {
								return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128])
							} else if (t === 3) {
								return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142])
							} else if (t === 4) {
								return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56])
							} else if (t === 5) {
								return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56])
							} else if (t === 6) {
								return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224])
							}
							return null
						}
					}]);
					return e
				}();
				r.
				default = a
			}, {}
		],
		37: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e() {
						i(this, e)
					}
					n(e, null, [{
						key: "init",
						value: function t() {
							e.types = {
								avc1: [],
								avcC: [],
								btrt: [],
								dinf: [],
								dref: [],
								esds: [],
								ftyp: [],
								hdlr: [],
								mdat: [],
								mdhd: [],
								mdia: [],
								mfhd: [],
								minf: [],
								moof: [],
								moov: [],
								mp4a: [],
								mvex: [],
								mvhd: [],
								sdtp: [],
								stbl: [],
								stco: [],
								stsc: [],
								stsd: [],
								stsz: [],
								stts: [],
								tfdt: [],
								tfhd: [],
								traf: [],
								trak: [],
								trun: [],
								trex: [],
								tkhd: [],
								vmhd: [],
								smhd: []
							};
							for (var r in e.types) {
								if (e.types.hasOwnProperty(r)) {
									e.types[r] = [r.charCodeAt(0), r.charCodeAt(1), r.charCodeAt(2), r.charCodeAt(3)]
								}
							}
							var n = e.constants = {};
							n.FTYP = new Uint8Array([105, 115, 111, 109, 0, 0, 0, 1, 105, 115, 111, 109, 97, 118, 99, 49]);
							n.STSD_PREFIX = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
							n.STTS = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
							n.STSC = n.STCO = n.STTS;
							n.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
							n.HDLR_VIDEO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]);
							n.HDLR_AUDIO = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
							n.DREF = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]);
							n.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
							n.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0])
						}
					}, {
						key: "box",
						value: function e(t) {
							var r = 8;
							var n = null;
							var i = Array.prototype.slice.call(arguments, 1);
							var a = i.length;
							for (var s = 0; s < a; s++) {
								r += i[s].byteLength
							}
							n = new Uint8Array(r);
							n[0] = r >>> 24 & 255;
							n[1] = r >>> 16 & 255;
							n[2] = r >>> 8 & 255;
							n[3] = r & 255;
							n.set(t, 4);
							var o = 8;
							for (var u = 0; u < a; u++) {
								n.set(i[u], o);
								o += i[u].byteLength
							}
							return n
						}
					}, {
						key: "generateInitSegment",
						value: function t(r) {
							var n = e.box(e.types.ftyp, e.constants.FTYP);
							var i = e.moov(r);
							var a = new Uint8Array(n.byteLength + i.byteLength);
							a.set(n, 0);
							a.set(i, n.byteLength);
							return a
						}
					}, {
						key: "moov",
						value: function t(r) {
							var n = e.mvhd(r.timescale, r.duration);
							var i = e.trak(r);
							var a = e.mvex(r);
							return e.box(e.types.moov, n, i, a)
						}
					}, {
						key: "mvhd",
						value: function t(r, n) {
							return e.box(e.types.mvhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r & 255, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]))
						}
					}, {
						key: "trak",
						value: function t(r) {
							return e.box(e.types.trak, e.tkhd(r), e.mdia(r))
						}
					}, {
						key: "tkhd",
						value: function t(r) {
							var n = r.id,
								i = r.duration;
							var a = r.presentWidth,
								s = r.presentHeight;
							return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255, 0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >>> 8 & 255, a & 255, 0, 0, s >>> 8 & 255, s & 255, 0, 0]))
						}
					}, {
						key: "mdia",
						value: function t(r) {
							return e.box(e.types.mdia, e.mdhd(r), e.hdlr(r), e.minf(r))
						}
					}, {
						key: "mdhd",
						value: function t(r) {
							var n = r.timescale;
							var i = r.duration;
							return e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255, 85, 196, 0, 0]))
						}
					}, {
						key: "hdlr",
						value: function t(r) {
							var n = null;
							if (r.type === "audio") {
								n = e.constants.HDLR_AUDIO
							} else {
								n = e.constants.HDLR_VIDEO
							}
							return e.box(e.types.hdlr, n)
						}
					}, {
						key: "minf",
						value: function t(r) {
							var n = null;
							if (r.type === "audio") {
								n = e.box(e.types.smhd, e.constants.SMHD)
							} else {
								n = e.box(e.types.vmhd, e.constants.VMHD)
							}
							return e.box(e.types.minf, n, e.dinf(), e.stbl(r))
						}
					}, {
						key: "dinf",
						value: function t() {
							var r = e.box(e.types.dinf, e.box(e.types.dref, e.constants.DREF));
							return r
						}
					}, {
						key: "stbl",
						value: function t(r) {
							var n = e.box(e.types.stbl, e.stsd(r), e.box(e.types.stts, e.constants.STTS), e.box(e.types.stsc, e.constants.STSC), e.box(e.types.stsz, e.constants.STSZ), e.box(e.types.stco, e.constants.STCO));
							return n
						}
					}, {
						key: "stsd",
						value: function t(r) {
							if (r.type === "audio") {
								return e.box(e.types.stsd, e.constants.STSD_PREFIX, e.mp4a(r))
							} else {
								return e.box(e.types.stsd, e.constants.STSD_PREFIX, e.avc1(r))
							}
						}
					}, {
						key: "mp4a",
						value: function t(r) {
							var n = r.channelCount;
							var i = r.audioSampleRate;
							var a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, n, 0, 16, 0, 0, 0, 0, i >>> 8 & 255, i & 255, 0, 0]);
							return e.box(e.types.mp4a, a, e.esds(r))
						}
					}, {
						key: "esds",
						value: function t(r) {
							var n = r.config;
							var i = n.length;
							var a = new Uint8Array([0, 0, 0, 0, 3, 23 + i, 0, 1, 0, 4, 15 + i, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([i]).concat(n).concat([6, 1, 2]));
							return e.box(e.types.esds, a)
						}
					}, {
						key: "avc1",
						value: function t(r) {
							var n = r.avcc;
							var i = r.codecWidth,
								a = r.codecHeight;
							var s = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, i >>> 8 & 255, i & 255, a >>> 8 & 255, a & 255, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 10, 120, 113, 113, 47, 102, 108, 118, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 255, 255]);
							return e.box(e.types.avc1, s, e.box(e.types.avcC, n))
						}
					}, {
						key: "mvex",
						value: function t(r) {
							return e.box(e.types.mvex, e.trex(r))
						}
					}, {
						key: "trex",
						value: function t(r) {
							var n = r.id;
							var i = new Uint8Array([0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]);
							return e.box(e.types.trex, i)
						}
					}, {
						key: "moof",
						value: function t(r, n) {
							return e.box(e.types.moof, e.mfhd(r.sequenceNumber), e.traf(r, n))
						}
					}, {
						key: "mfhd",
						value: function t(r) {
							var n = new Uint8Array([0, 0, 0, 0, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, r & 255]);
							return e.box(e.types.mfhd, n)
						}
					}, {
						key: "traf",
						value: function t(r, n) {
							var i = r.id;
							var a = e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, i >>> 24 & 255, i >>> 16 & 255, i >>> 8 & 255, i & 255]));
							var s = e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255]));
							var o = e.sdtp(r);
							var u = e.trun(r, o.byteLength + 16 + 16 + 8 + 16 + 8 + 8);
							return e.box(e.types.traf, a, s, u, o)
						}
					}, {
						key: "sdtp",
						value: function t(r) {
							var n = r.samples || [];
							var i = n.length;
							var a = new Uint8Array(4 + i);
							for (var s = 0; s < i; s++) {
								var o = n[s].flags;
								a[s + 4] = o.isLeading << 6 | o.dependsOn << 4 | o.isDependedOn << 2 | o.hasRedundancy
							}
							return e.box(e.types.sdtp, a)
						}
					}, {
						key: "trun",
						value: function t(r, n) {
							var i = r.samples || [];
							var a = i.length;
							var s = 12 + 16 * a;
							var o = new Uint8Array(s);
							n += 8 + s;
							o.set([0, 0, 15, 1, a >>> 24 & 255, a >>> 16 & 255, a >>> 8 & 255, a & 255, n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, n & 255], 0);
							for (var u = 0; u < a; u++) {
								var l = i[u].duration;
								var f = i[u].size;
								var d = i[u].flags;
								var h = i[u].cts;
								o.set([l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, l & 255, f >>> 24 & 255, f >>> 16 & 255, f >>> 8 & 255, f & 255, d.isLeading << 2 | d.dependsOn, d.isDependedOn << 6 | d.hasRedundancy << 4 | d.isNonSync, 0, 0, h >>> 24 & 255, h >>> 16 & 255, h >>> 8 & 255, h & 255], 12 + 16 * u)
							}
							return e.box(e.types.trun, o)
						}
					}, {
						key: "mdat",
						value: function t(r) {
							return e.box(e.types.mdat, r)
						}
					}]);
					return e
				}();
				a.init();
				r.
				default = a
			}, {}
		],
		38: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("../utils/logger.js");
				var a = _(i);
				var s = e("./mp4-generator.js");
				var o = _(s);
				var u = e("./aac-silent.js");
				var l = _(u);
				var f = e("../utils/browser.js");
				var d = _(f);
				var h = e("../core/media-segment-info.js");
				var c = e("../utils/exception.js");

				function _(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function v(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var m = function() {
					function e(t) {
						v(this, e);
						this.TAG = "MP4Remuxer";
						this._config = t;
						this._isLive = t.isLive === true ? true : false;
						this._dtsBase = -1;
						this._dtsBaseInited = false;
						this._audioDtsBase = Infinity;
						this._videoDtsBase = Infinity;
						this._audioNextDts = undefined;
						this._videoNextDts = undefined;
						this._audioMeta = null;
						this._videoMeta = null;
						this._audioSegmentInfoList = new h.MediaSegmentInfoList("audio");
						this._videoSegmentInfoList = new h.MediaSegmentInfoList("video");
						this._onInitSegment = null;
						this._onMediaSegment = null;
						this._forceFirstIDR = d.
						default.chrome && (d.
							default.version.major < 50 || d.
							default.version.major === 50 && d.
							default.version.build < 2661) ? true : false;
						this._fillSilentAfterSeek = d.
						default.msedge || d.
						default.msie
					}
					n(e, [{
						key: "destroy",
						value: function e() {
							this._dtsBase = -1;
							this._dtsBaseInited = false;
							this._audioMeta = null;
							this._videoMeta = null;
							this._audioSegmentInfoList.clear();
							this._audioSegmentInfoList = null;
							this._videoSegmentInfoList.clear();
							this._videoSegmentInfoList = null;
							this._onInitSegment = null;
							this._onMediaSegment = null
						}
					}, {
						key: "bindDataSource",
						value: function e(t) {
							t.onDataAvailable = this.remux.bind(this);
							t.onTrackMetadata = this._onTrackMetadataReceived.bind(this);
							return this
						}
					}, {
						key: "insertDiscontinuity",
						value: function e() {
							this._audioNextDts = this._videoNextDts = undefined
						}
					}, {
						key: "seek",
						value: function e(t) {
							this._videoSegmentInfoList.clear();
							this._audioSegmentInfoList.clear()
						}
					}, {
						key: "remux",
						value: function e(t, r) {
							if (!this._onMediaSegment) {
								throw new c.IllegalStateException("MP4Remuxer: onMediaSegment callback must be specificed!")
							}
							if (!this._dtsBaseInited) {
								this._calculateDtsBase(t, r)
							}
							this._remuxVideo(r);
							this._remuxAudio(t)
						}
					}, {
						key: "_onTrackMetadataReceived",
						value: function e(t, r) {
							var n = null;
							if (t === "audio") {
								this._audioMeta = r;
								n = o.
								default.generateInitSegment(r)
							} else if (t === "video") {
								this._videoMeta = r;
								n = o.
								default.generateInitSegment(r)
							} else {
								return
							} if (!this._onInitSegment) {
								throw new c.IllegalStateException("MP4Remuxer: onInitSegment callback must be specified!")
							}
							this._onInitSegment(t, {
								type: t,
								data: n.buffer,
								codec: r.codec,
								container: t + "/mp4"
							})
						}
					}, {
						key: "_calculateDtsBase",
						value: function e(t, r) {
							if (this._dtsBaseInited) {
								return
							}
							if (t.samples && t.samples.length) {
								this._audioDtsBase = t.samples[0].dts
							}
							if (r.samples && r.samples.length) {
								this._videoDtsBase = r.samples[0].dts
							}
							this._dtsBase = Math.min(this._audioDtsBase, this._videoDtsBase);
							this._dtsBaseInited = true
						}
					}, {
						key: "_remuxAudio",
						value: function e(t) {
							var r = t;
							var n = r.samples;
							var i = undefined;
							var a = -1,
								s = -1,
								u = -1;
							if (n.length < 2) return;
							var l = false;
							var f = -1;
							if (!n || n.length === 0) {
								return
							}
							var d = 8 + r.length;
							var c = new Uint8Array(d);
							c[0] = d >>> 24 & 255;
							c[1] = d >>> 16 & 255;
							c[2] = d >>> 8 & 255;
							c[3] = d & 255;
							c.set(o.
								default.types.mdat, 4);
							var _ = 8;
							var v = [];
							while (n.length) {
								var m = n.shift();
								var p = m.unit;
								var g = m.dts - this._dtsBase;
								if (i == undefined) {
									if (this._audioNextDts == undefined) {
										if (this._audioSegmentInfoList.isEmpty()) {
											i = 0;
											if (this._fillSilentAfterSeek && !this._videoSegmentInfoList.isEmpty()) {
												l = true
											}
										} else {
											var y = this._audioSegmentInfoList.getLastSampleBefore(g);
											if (y != null) {
												var E = g - (y.originalDts + y.duration);
												if (E <= 3) {
													E = 0
												}
												var b = y.dts + y.duration + E;
												i = g - b
											} else {
												i = 0
											}
										}
									} else {
										i = g - this._audioNextDts
									}
								}
								var S = g - i;
								if (l) {
									var k = this._videoSegmentInfoList.getLastSegmentBefore(g);
									if (k != null && k.beginDts < S) {
										f = S - k.beginDts;
										S = k.beginDts
									} else {
										l = false
									}
								}
								if (a === -1) {
									a = S
								}
								if (l) {
									l = false;
									n.unshift(m);
									var w = this._generateSilentAudio(S, f);
									if (w == null) {
										continue
									}
									var L = w.mp4Sample;
									var T = w.unit;
									v.push(L);
									d += T.byteLength;
									c = new Uint8Array(d);
									c[0] = d >>> 24 & 255;
									c[1] = d >>> 16 & 255;
									c[2] = d >>> 8 & 255;
									c[3] = d & 255;
									c.set(o.
										default.types.mdat, 4);
									c.set(T, _);
									_ += T.byteLength;
									continue
								}
								var O = 0;
								if (n.length >= 1) {
									var A = n[0].dts - this._dtsBase - i;
									O = A - S
								} else {
									if (v.length >= 1) {
										O = v[v.length - 1].duration
									} else {
										O = this._audioMeta.refSampleDuration
									}
								}
								var R = {
									dts: S,
									pts: S,
									cts: 0,
									size: p.byteLength,
									duration: O,
									originalDts: g,
									flags: {
										isLeading: 0,
										dependsOn: 1,
										isDependedOn: 0,
										hasRedundancy: 0
									}
								};
								v.push(R);
								c.set(p, _);
								_ += p.byteLength
							}
							var I = v[v.length - 1];
							s = I.dts + I.duration;
							this._audioNextDts = s;
							var C = new h.MediaSegmentInfo;
							C.beginDts = a;
							C.endDts = s;
							C.beginPts = a;
							C.endPts = s;
							C.originalBeginDts = v[0].originalDts;
							C.originalEndDts = I.originalDts + I.duration;
							C.firstSample = new h.SampleInfo(v[0].dts, v[0].pts, v[0].duration, v[0].originalDts, false);
							C.lastSample = new h.SampleInfo(I.dts, I.pts, I.duration, I.originalDts, false);
							if (!this._isLive) {
								this._audioSegmentInfoList.append(C)
							}
							r.samples = v;
							r.sequenceNumber++;
							var x = o.
							default.moof(r, a);
							r.samples = [];
							r.length = 0;
							this._onMediaSegment("audio", {
								type: "audio",
								data: this._mergeBoxes(x, c).buffer,
								sampleCount: v.length,
								info: C
							})
						}
					}, {
						key: "_generateSilentAudio",
						value: function e(t, r) {
							a.
							default.v(this.TAG, "GenerateSilentAudio: dts = " + t + ", duration = " + r);
							var n = l.
							default.getSilentFrame(this._audioMeta.channelCount);
							if (n == null) {
								a.
								default.w(this.TAG, "Cannot generate silent aac frame for channelCount = " + this._audioMeta.channelCount);
								return null
							}
							var i = {
								dts: t,
								pts: t,
								cts: 0,
								size: n.byteLength,
								duration: r,
								originalDts: t,
								flags: {
									isLeading: 0,
									dependsOn: 1,
									isDependedOn: 0,
									hasRedundancy: 0
								}
							};
							return {
								unit: n,
								mp4Sample: i
							}
						}
					}, {
						key: "_remuxVideo",
						value: function e(t) {
							var r = t;
							var n = r.samples;
							var i = undefined;
							var a = -1,
								s = -1;
							var u = -1,
								l = -1;
							if (!n || n.length === 0) {
								return
							}
							if (n.length < 2) return;
							var f = 8 + t.length;
							var d = new Uint8Array(f);
							d[0] = f >>> 24 & 255;
							d[1] = f >>> 16 & 255;
							d[2] = f >>> 8 & 255;
							d[3] = f & 255;
							d.set(o.
								default.types.mdat, 4);
							var c = 8;
							var _ = [];
							var v = new h.MediaSegmentInfo;
							while (n.length > 1) {
								var m = n.shift();
								var p = m.isKeyframe;
								var g = m.dts - this._dtsBase;
								if (i == undefined) {
									if (this._videoNextDts == undefined) {
										if (this._videoSegmentInfoList.isEmpty()) {
											i = 0
										} else {
											var y = this._videoSegmentInfoList.getLastSampleBefore(g);
											if (y != null) {
												var E = g - (y.originalDts + y.duration);
												if (E <= 3) {
													E = 0
												}
												var b = y.dts + y.duration + E;
												i = g - b
											} else {
												i = 0
											}
										}
									} else {
										i = g - this._videoNextDts
									}
								}
								var S = g - i;
								var k = m.cts;
								var w = S + k;
								if (a === -1) {
									a = S;
									u = w
								}
								var L = 0;
								while (m.units.length) {
									var T = m.units.shift();
									var O = T.data;
									d.set(O, c);
									c += O.byteLength;
									L += O.byteLength
								}
								var A = 0;
								if (n.length >= 1) {
									var R = n[0].dts - this._dtsBase - i;
									A = R - S
								} else {
									if (_.length >= 1) {
										A = _[_.length - 1].duration
									} else {
										A = this._videoMeta.refSampleDuration
									}
								} if (p) {
									var I = new h.SampleInfo(S, w, A, m.dts, true);
									I.fileposition = m.fileposition;
									v.appendSyncPoint(I)
								}
								var C = {
									dts: S,
									pts: w,
									cts: k,
									size: L,
									isKeyframe: p,
									duration: A,
									originalDts: g,
									flags: {
										isLeading: 0,
										dependsOn: p ? 2 : 1,
										isDependedOn: p ? 1 : 0,
										hasRedundancy: 0,
										isNonSync: p ? 0 : 1
									}
								};
								_.push(C)
							}
							var x = _[_.length - 1];
							s = x.dts + x.duration;
							l = x.pts + x.duration;
							this._videoNextDts = s;
							v.beginDts = a;
							v.endDts = s;
							v.beginPts = u;
							v.endPts = l;
							v.originalBeginDts = _[0].originalDts;
							v.originalEndDts = x.originalDts + x.duration;
							v.firstSample = new h.SampleInfo(_[0].dts, _[0].pts, _[0].duration, _[0].originalDts, _[0].isKeyframe);
							v.lastSample = new h.SampleInfo(x.dts, x.pts, x.duration, x.originalDts, x.isKeyframe);
							if (!this._isLive) {
								this._videoSegmentInfoList.append(v)
							}
							var M = r.samples[0];
							r.samples = _;
							r.sequenceNumber++;
							if (this._forceFirstIDR) {
								var D = _[0].flags;
								D.dependsOn = 2;
								D.isNonSync = 0
							}
							var j = o.
							default.moof(r, a);
							r.samples = [];
							r.length = 0;
							r.samples.push(M);
							r.length = M.length;
							this._onMediaSegment("video", {
								type: "video",
								data: this._mergeBoxes(j, d).buffer,
								sampleCount: _.length,
								info: v
							})
						}
					}, {
						key: "_mergeBoxes",
						value: function e(t, r) {
							var n = new Uint8Array(t.byteLength + r.byteLength);
							n.set(t, 0);
							n.set(r, t.byteLength);
							return n
						}
					}, {
						key: "onInitSegment",
						get: function e() {
							return this._onInitSegment
						},
						set: function e(t) {
							this._onInitSegment = t
						}
					}, {
						key: "onMediaSegment",
						get: function e() {
							return this._onMediaSegment
						},
						set: function e(t) {
							this._onMediaSegment = t
						}
					}]);
					return e
				}();
				r.
				default = m
			}, {
				"../core/media-segment-info.js": 8,
				"../utils/browser.js": 39,
				"../utils/exception.js": 40,
				"../utils/logger.js": 41,
				"./aac-silent.js": 36,
				"./mp4-generator.js": 37
			}
		],
		39: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = {};

				function i() {
					var e = self.navigator.userAgent.toLowerCase();
					var t = /(edge)\/([\w.]+)/.exec(e) || /(opr)[\/]([\w.]+)/.exec(e) || /(chrome)[ \/]([\w.]+)/.exec(e) || /(iemobile)[\/]([\w.]+)/.exec(e) || /(version)(applewebkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+).*(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];
					var r = /(ipad)/.exec(e) || /(ipod)/.exec(e) || /(windows phone)/.exec(e) || /(iphone)/.exec(e) || /(kindle)/.exec(e) || /(android)/.exec(e) || /(windows)/.exec(e) || /(mac)/.exec(e) || /(linux)/.exec(e) || /(cros)/.exec(e) || [];
					var i = {
						browser: t[5] || t[3] || t[1] || "",
						version: t[2] || t[4] || "0",
						majorVersion: t[4] || t[2] || "0",
						platform: r[0] || ""
					};
					var a = {};
					if (i.browser) {
						a[i.browser] = true;
						var s = i.majorVersion.split(".");
						a.version = {
							major: parseInt(i.majorVersion, 10),
							string: i.version
						};
						if (s.length > 1) {
							a.version.minor = parseInt(s[1], 10)
						}
						if (s.length > 2) {
							a.version.build = parseInt(s[2], 10)
						}
					}
					if (i.platform) {
						a[i.platform] = true
					}
					if (a.chrome || a.opr || a.safari) {
						a.webkit = true
					}
					if (a.rv || a.iemobile) {
						if (a.rv) {
							delete a.rv
						}
						var o = "msie";
						i.browser = o;
						a[o] = true
					}
					if (a.edge) {
						delete a.edge;
						var u = "msedge";
						i.browser = u;
						a[u] = true
					}
					if (a.opr) {
						var l = "opera";
						i.browser = l;
						a[l] = true
					}
					if (a.safari && a.android) {
						var f = "android";
						i.browser = f;
						a[f] = true
					}
					a.name = i.browser;
					a.platform = i.platform;
					for (var d in n) {
						if (n.hasOwnProperty(d)) {
							delete n[d]
						}
					}
					Object.assign(n, a)
				}
				i();
				r.
				default = n
			}, {}
		],
		40: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!e) {
						throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
					}
					return t && (typeof t === "object" || typeof t === "function") ? t : e
				}

				function a(e, t) {
					if (typeof t !== "function" && t !== null) {
						throw new TypeError("Super expression must either be null or a function, not " + typeof t)
					}
					e.prototype = Object.create(t && t.prototype, {
						constructor: {
							value: e,
							enumerable: false,
							writable: true,
							configurable: true
						}
					});
					if (t) Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t
				}

				function s(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var o = r.RuntimeException = function() {
					function e(t) {
						s(this, e);
						this._message = t
					}
					n(e, [{
						key: "toString",
						value: function e() {
							return this.name + ": " + this.message
						}
					}, {
						key: "name",
						get: function e() {
							return "RuntimeException"
						}
					}, {
						key: "message",
						get: function e() {
							return this._message
						}
					}]);
					return e
				}();
				var u = r.IllegalStateException = function(e) {
					a(t, e);

					function t(e) {
						s(this, t);
						return i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
					}
					n(t, [{
						key: "name",
						get: function e() {
							return "IllegalStateException"
						}
					}]);
					return t
				}(o);
				var l = r.InvalidArgumentException = function(e) {
					a(t, e);

					function t(e) {
						s(this, t);
						return i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
					}
					n(t, [{
						key: "name",
						get: function e() {
							return "InvalidArgumentException"
						}
					}]);
					return t
				}(o);
				var f = r.NotImplementedException = function(e) {
					a(t, e);

					function t(e) {
						s(this, t);
						return i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e))
					}
					n(t, [{
						key: "name",
						get: function e() {
							return "NotImplementedException"
						}
					}]);
					return t
				}(o)
			}, {}
		],
		41: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function e() {
						i(this, e)
					}
					n(e, null, [{
						key: "e",
						value: function t(r, n) {
							if (!e.ENABLE_ERROR) {
								return
							}
							if (!r || e.FORCE_GLOBAL_TAG) r = e.GLOBAL_TAG;
							var i = "[" + r + "] > " + n;
							if (console.error) {
								console.error(i)
							} else if (console.warn) {
								console.warn(i)
							} else {
								console.log(i)
							}
						}
					}, {
						key: "i",
						value: function t(r, n) {
							if (!e.ENABLE_INFO) {
								return
							}
							if (!r || e.FORCE_GLOBAL_TAG) r = e.GLOBAL_TAG;
							var i = "[" + r + "] > " + n;
							if (console.info) {
								console.info(i)
							} else {
								console.log(i)
							}
						}
					}, {
						key: "w",
						value: function t(r, n) {
							if (!e.ENABLE_WARN) {
								return
							}
							if (!r || e.FORCE_GLOBAL_TAG) r = e.GLOBAL_TAG;
							var i = "[" + r + "] > " + n;
							if (console.warn) {
								console.warn(i)
							} else {
								console.log(i)
							}
						}
					}, {
						key: "d",
						value: function t(r, n) {
							if (!e.ENABLE_DEBUG) {
								return
							}
							if (!r || e.FORCE_GLOBAL_TAG) r = e.GLOBAL_TAG;
							var i = "[" + r + "] > " + n;
							if (console.debug) {
								console.debug(i)
							} else {
								console.log(i)
							}
						}
					}, {
						key: "v",
						value: function t(r, n) {
							if (!e.ENABLE_VERBOSE) {
								return
							}
							if (!r || e.FORCE_GLOBAL_TAG) r = e.GLOBAL_TAG;
							console.log("[" + r + "] > " + n)
						}
					}]);
					return e
				}();
				a.GLOBAL_TAG = "flv.js";
				a.FORCE_GLOBAL_TAG = false;
				a.ENABLE_ERROR = true;
				a.ENABLE_INFO = true;
				a.ENABLE_WARN = true;
				a.ENABLE_DEBUG = true;
				a.ENABLE_VERBOSE = true;
				r.
				default = a
			}, {}
		],
		42: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();
				var i = e("events");
				var a = u(i);
				var s = e("./logger.js");
				var o = u(s);

				function u(e) {
					return e && e.__esModule ? e : {
						default: e
					}
				}

				function l(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var f = function() {
					function e() {
						l(this, e)
					}
					n(e, null, [{
						key: "getConfig",
						value: function e() {
							return {
								globalTag: o.
								default.GLOBAL_TAG,
								forceGlobalTag: o.
								default.FORCE_GLOBAL_TAG,
								enableVerbose: o.
								default.ENABLE_VERBOSE,
								enableDebug: o.
								default.ENABLE_DEBUG,
								enableInfo: o.
								default.ENABLE_INFO,
								enableWarn: o.
								default.ENABLE_WARN,
								enableError: o.
								default.ENABLE_ERROR
							}
						}
					}, {
						key: "applyConfig",
						value: function e(t) {
							o.
							default.GLOBAL_TAG = t.globalTag;
							o.
							default.FORCE_GLOBAL_TAG = t.forceGlobalTag;
							o.
							default.ENABLE_VERBOSE = t.enableVerbose;
							o.
							default.ENABLE_DEBUG = t.enableDebug;
							o.
							default.ENABLE_INFO = t.enableInfo;
							o.
							default.ENABLE_WARN = t.enableWarn;
							o.
							default.ENABLE_ERROR = t.enableError
						}
					}, {
						key: "_notifyChange",
						value: function t() {
							var r = e.emitter;
							if (r.listenerCount("change") > 0) {
								var n = e.getConfig();
								r.emit("change", n)
							}
						}
					}, {
						key: "registerListener",
						value: function t(r) {
							e.emitter.addListener("change", r)
						}
					}, {
						key: "removeListener",
						value: function t(r) {
							e.emitter.removeListener("change", r)
						}
					}, {
						key: "forceGlobalTag",
						get: function e() {
							return o.
							default.FORCE_GLOBAL_TAG
						},
						set: function t(r) {
							o.
							default.FORCE_GLOBAL_TAG = r;
							e._notifyChange()
						}
					}, {
						key: "globalTag",
						get: function e() {
							return o.
							default.GLOBAL_TAG
						},
						set: function t(r) {
							o.
							default.GLOBAL_TAG = r;
							e._notifyChange()
						}
					}, {
						key: "enableAll",
						get: function e() {
							return o.
							default.ENABLE_VERBOSE && o.
							default.ENABLE_DEBUG && o.
							default.ENABLE_INFO && o.
							default.ENABLE_WARN && o.
							default.ENABLE_ERROR
						},
						set: function t(r) {
							o.
							default.ENABLE_VERBOSE = r;
							o.
							default.ENABLE_DEBUG = r;
							o.
							default.ENABLE_INFO = r;
							o.
							default.ENABLE_WARN = r;
							o.
							default.ENABLE_ERROR = r;
							e._notifyChange()
						}
					}, {
						key: "enableDebug",
						get: function e() {
							return o.
							default.ENABLE_DEBUG
						},
						set: function t(r) {
							o.
							default.ENABLE_DEBUG = r;
							e._notifyChange()
						}
					}, {
						key: "enableVerbose",
						get: function e() {
							return o.
							default.ENABLE_VERBOSE
						},
						set: function t(r) {
							o.
							default.ENABLE_VERBOSE = r;
							e._notifyChange()
						}
					}, {
						key: "enableInfo",
						get: function e() {
							return o.
							default.ENABLE_INFO
						},
						set: function t(r) {
							o.
							default.ENABLE_INFO = r;
							e._notifyChange()
						}
					}, {
						key: "enableWarn",
						get: function e() {
							return o.
							default.ENABLE_WARN
						},
						set: function t(r) {
							o.
							default.ENABLE_WARN = r;
							e._notifyChange()
						}
					}, {
						key: "enableError",
						get: function e() {
							return o.
							default.ENABLE_ERROR
						},
						set: function t(r) {
							o.
							default.ENABLE_ERROR = r;
							e._notifyChange()
						}
					}]);
					return e
				}();
				f.emitter = new a.
				default;
				r.
				default = f
			}, {
				"./logger.js": 41,
				events: 2
			}
		],
		43: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});
				var n = function() {
					function e(e, t) {
						for (var r = 0; r < t.length; r++) {
							var n = t[r];
							n.enumerable = n.enumerable || false;
							n.configurable = true;
							if ("value" in n) n.writable = true;
							Object.defineProperty(e, n.key, n)
						}
					}
					return function(t, r, n) {
						if (r) e(t.prototype, r);
						if (n) e(t, n);
						return t
					}
				}();

				function i(e, t) {
					if (!(e instanceof t)) {
						throw new TypeError("Cannot call a class as a function")
					}
				}
				var a = function() {
					function t() {
						i(this, t)
					}
					n(t, null, [{
						key: "install",
						value: function t() {
							Object.setPrototypeOf = Object.setPrototypeOf || function(e, t) {
								e.__proto__ = t;
								return e
							};
							Object.assign = Object.assign || function(e) {
								if (e === undefined || e === null) {
									throw new TypeError("Cannot convert undefined or null to object")
								}
								var t = Object(e);
								for (var r = 1; r < arguments.length; r++) {
									var n = arguments[r];
									if (n !== undefined && n !== null) {
										for (var i in n) {
											if (n.hasOwnProperty(i)) {
												t[i] = n[i]
											}
										}
									}
								}
								return t
							};
							if (typeof self.Promise !== "function") {
								e("es6-promise").polyfill()
							}
						}
					}]);
					return t
				}();
				a.install();
				r.
				default = a
			}, {
				"es6-promise": 1
			}
		],
		44: [
			function(e, t, r) {
				"use strict";
				Object.defineProperty(r, "__esModule", {
					value: true
				});

				function n(e, t, r) {
					var n = e;
					if (t + r < n.length) {
						while (r--) {
							if ((n[++t] & 192) !== 128) return false
						}
						return true
					} else {
						return false
					}
				}

				function i(e) {
					var t = [];
					var r = e;
					var i = 0;
					var a = e.length;
					while (i < a) {
						if (r[i] < 128) {
							t.push(String.fromCharCode(r[i]));
							++i;
							continue
						} else if (r[i] < 192) {} else if (r[i] < 224) {
							if (n(r, i, 1)) {
								var s = (r[i] & 31) << 6 | r[i + 1] & 63;
								if (s >= 128) {
									t.push(String.fromCharCode(s & 65535));
									i += 2;
									continue
								}
							}
						} else if (r[i] < 240) {
							if (n(r, i, 2)) {
								var o = (r[i] & 15) << 12 | (r[i + 1] & 63) << 6 | r[i + 2] & 63;
								if (o >= 2048 && (o & 63488) !== 55296) {
									t.push(String.fromCharCode(o & 65535));
									i += 3;
									continue
								}
							}
						} else if (r[i] < 248) {
							if (n(r, i, 3)) {
								var u = (r[i] & 7) << 18 | (r[i + 1] & 63) << 12 | (r[i + 2] & 63) << 6 | r[i + 3] & 63;
								if (u > 65536 && u < 1114112) {
									u -= 65536;
									t.push(String.fromCharCode(u >>> 10 | 55296));
									t.push(String.fromCharCode(u & 1023 | 56320));
									i += 4;
									continue
								}
							}
						}
						t.push(String.fromCharCode(65533));
						++i
					}
					return t.join("")
				}
				r.
				default = i
			}, {}
		]
	}, {}, [21])(21)
});

function liveplay(e, t, r) {
	if (!flvjs.isSupported()) console.log("flv dont supported");
	var n = flvjs.createPlayer({
		type: "flv",
		isLive: true,
		url: t
	}, {
		enableStashBuffer: true
	});
	n.attachMediaElement(e);
	n.load();
	n.play();
	e.flvPlayer = n;
	if (r) {
		e.fivPlayerTimer = setTimeout(function() {
			liveplaystop(e);
			liveplay(e, t)
		}, r)
	}
	n.on(flvjs.Events.ERROR, function(r, i) {
		console.log("type:" + r + " details:" + i);
		switch (r) {
			case "NetworkError":
				n.unload();
				setTimeout(function() {
					n.load();
					n.play()
				}, 1e3);
				break;
			case "MediaError":
				n.pause();
				n.unload();
				setTimeout(function() {
					liveplaystop(e);
					liveplay(e, t)
				}, 1e3);
				break;
			default:
		}
	});
	return n
}

function playstart(e, t, r) {
	if (!flvjs.isSupported()) console.log("flv dont supported");
	var n = flvjs.createPlayer({
		type: "flv",
		isLive: false,
		url: t,
		duration: r
	}, {
		enableStashBuffer: false,
		lazyLoad: true,
		lazyLoadMaxDuration: 40,
		lazyLoadRecoverDuration: 5,
		seekType: "param",
		seekParamStart: "start"
	});
	n.attachMediaElement(e);
	n.load();
	n.play();
	e.flvPlayer = n;
	n.on(flvjs.Events.ERROR, function(e, t) {
		console.log("type:" + e + " details:" + t)
	});
	return n
}

function liveplaystop(e) {
	if (e.flvPlayer) {
		e.flvPlayer.destroy();
		e.flvPlayer = null
	}
	if (e.fivPlayerTimer) {
		clearTimeout(e.fivPlayerTimer)
	}
}

function captureimage(e, t) {
	var r = document.createElement("canvas");
	var n = r.getContext("2d");
	r.width = e.videoWidth;
	r.height = e.videoHeight;
	n.drawImage(e, 0, 0, r.width, r.height);
	var i = r.toDataURL();
	var a = function(e, t) {
		var r = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
		r.href = e;
		r.download = t;
		var n = document.createEvent("MouseEvents");
		n.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		r.dispatchEvent(n)
	};
	a(i, t)
}

function showsub(e, t) {
	var r = e.textTracks[0];
	if (!r) {
		r = e.addTextTrack("subtitles", "sample");
		r.mode = "showing";
		window["VTTCue"] = window["VTTCue"] || window["TextTrackCue"]
	}
	var n = r.cues[0];
	if (n) {
		r.removeCue(n)
	}
	n = new VTTCue(0, 99999, t);
	n.line = 0;
	n.align = "start";
	r.addCue(n)
}