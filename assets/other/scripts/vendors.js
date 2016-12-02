! function(a, b) { "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b(require, exports, module) : a.CountUp = b() }(this, function(a, b, c) {
    var d = function(a, b, c, d, e, f) {
        for (var g = 0, h = ["webkit", "moz", "ms", "o"], i = 0; i < h.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[h[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[h[i] + "CancelAnimationFrame"] || window[h[i] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(a, b) {
            var c = (new Date).getTime(),
                d = Math.max(0, 16 - (c - g)),
                e = window.setTimeout(function() { a(c + d) }, d);
            return g = c + d, e
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) { clearTimeout(a) }), this.options = { useEasing: !0, useGrouping: !0, separator: ",", decimal: "." };
        for (var j in f) f.hasOwnProperty(j) && (this.options[j] = f[j]);
        "" === this.options.separator && (this.options.useGrouping = !1), this.options.prefix || (this.options.prefix = ""), this.options.suffix || (this.options.suffix = ""), this.d = "string" == typeof a ? document.getElementById(a) : a, this.startVal = Number(b), this.endVal = Number(c), this.countDown = this.startVal > this.endVal, this.frameVal = this.startVal, this.decimals = Math.max(0, d || 0), this.dec = Math.pow(10, this.decimals), this.duration = 1e3 * Number(e) || 2e3;
        var k = this;
        this.version = function() {
            return "1.6.1"
        }, this.printValue = function(a) {
            var b = isNaN(a) ? "--" : k.formatNumber(a);
            "INPUT" == k.d.tagName ? this.d.value = b : "text" == k.d.tagName || "tspan" == k.d.tagName ? this.d.textContent = b : this.d.innerHTML = b
        }, this.easeOutExpo = function(a, b, c, d) {
            return c * (-Math.pow(2, -10 * a / d) + 1) * 1024 / 1023 + b
        }, this.count = function(a) {
            k.startTime || (k.startTime = a), k.timestamp = a;
            var b = a - k.startTime;
            k.remaining = k.duration - b, k.options.useEasing ? k.countDown ? k.frameVal = k.startVal - k.easeOutExpo(b, 0, k.startVal - k.endVal, k.duration) : k.frameVal = k.easeOutExpo(b, k.startVal, k.endVal - k.startVal, k.duration) : k.countDown ? k.frameVal = k.startVal - (k.startVal - k.endVal) * (b / k.duration) : k.frameVal = k.startVal + (k.endVal - k.startVal) * (b / k.duration), k.countDown ? k.frameVal = k.frameVal < k.endVal ? k.endVal : k.frameVal : k.frameVal = k.frameVal > k.endVal ? k.endVal : k.frameVal, k.frameVal = Math.floor(k.frameVal * k.dec) / k.dec, k.printValue(k.frameVal), b < k.duration ? k.rAF = requestAnimationFrame(k.count) : k.callback && k.callback()
        }, this.start = function(a) {
            return k.callback = a, k.rAF = requestAnimationFrame(k.count), !1
        }, this.pauseResume = function() { k.paused ? (k.paused = !1, delete k.startTime, k.duration = k.remaining, k.startVal = k.frameVal, requestAnimationFrame(k.count)) : (k.paused = !0, cancelAnimationFrame(k.rAF)) }, this.reset = function() { k.paused = !1, delete k.startTime, k.startVal = b, cancelAnimationFrame(k.rAF), k.printValue(k.startVal) }, this.update = function(a) { cancelAnimationFrame(k.rAF), k.paused = !1, delete k.startTime, k.startVal = k.frameVal, k.endVal = Number(a), k.countDown = k.startVal > k.endVal, k.rAF = requestAnimationFrame(k.count) }, this.formatNumber = function(a) {
            a = a.toFixed(k.decimals), a += "";
            var b, c, d, e;
            if (b = a.split("."), c = b[0], d = b.length > 1 ? k.options.decimal + b[1] : "", e = /(\d+)(\d{3})/, k.options.useGrouping)
                for (; e.test(c);) c = c.replace(e, "$1" + k.options.separator + "$2");
            return k.options.prefix + c + d + k.options.suffix
        }, k.printValue(k.startVal)
    };
    return d
});
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";

        function a(a, b, c, d) {
            return c = parseFloat(c) - parseFloat(a), d = parseFloat(d) - parseFloat(b), Math.sqrt(c * c + d * d)
        }

        function b(a) {
            return "string" != typeof a && a.nodeType || (a = _gsScope.TweenLite.selector(a), a.length && (a = a[0])), a
        }

        function c(a, b, c) {
            var d, e, f = a.indexOf(" ");
            return -1 === f ? (d = void 0 !== c ? c + "" : a, e = a) : (d = a.substr(0, f), e = a.substr(f + 1)), d = -1 !== d.indexOf("%") ? parseFloat(d) / 100 * b : parseFloat(d), e = -1 !== e.indexOf("%") ? parseFloat(e) / 100 * b : parseFloat(e), d > e ? [e, d] : [d, e]
        }

        function d(c) {
            if (!c) return 0;
            c = b(c);
            var d, e, f, g, h, i, j, k, l = c.tagName.toLowerCase();
            if ("path" === l) h = c.style.strokeDasharray, c.style.strokeDasharray = "none", d = c.getTotalLength() || 0, e = c.getBBox(), c.style.strokeDasharray = h;
            else if ("rect" === l) e = c.getBBox(), d = 2 * (e.width + e.height);
            else if ("circle" === l) d = 2 * Math.PI * parseFloat(c.getAttribute("r"));
            else if ("line" === l) d = a(c.getAttribute("x1"), c.getAttribute("y1"), c.getAttribute("x2"), c.getAttribute("y2"));
            else if ("polyline" === l || "polygon" === l)
                for (f = c.getAttribute("points").split(" "), d = 0, h = f[0].split(","), "polygon" === l && (f.push(f[0]), -1 === f[0].indexOf(",") && f.push(f[1])), i = 1; i < f.length; i++) g = f[i].split(","), 1 === g.length && (g[1] = f[i++]), 2 === g.length && (d += a(h[0], h[1], g[0], g[1]) || 0, h = g);
            else "ellipse" === l && (j = parseFloat(c.getAttribute("rx")), k = parseFloat(c.getAttribute("ry")), d = Math.PI * (3 * (j + k) - Math.sqrt((3 * j + k) * (j + 3 * k))));
            return d || 0
        }

        function e(a, c) {
            if (!a) return [0, 0];
            a = b(a), c = c || d(a) + 1;
            var e = g(a),
                f = e.strokeDasharray || "",
                h = parseFloat(e.strokeDashoffset),
                i = f.indexOf(",");
            return 0 > i && (i = f.indexOf(" ")), f = 0 > i ? c : parseFloat(f.substr(0, i)) || 1e-5, f > c && (f = c), [Math.max(0, -h), Math.max(0, f - h)]
        }
        var f, g = document.defaultView ? document.defaultView.getComputedStyle : function() {};
        f = _gsScope._gsDefine.plugin({
            propName: "drawSVG",
            API: 2,
            version: "0.0.7",
            global: !0,
            overwriteProps: ["drawSVG"],
            init: function(a, b, f) {
                if (!a.getBBox) return !1;
                var g, h, i, j = d(a) + 1;
                return this._style = a.style, b === !0 || "true" === b ? b = "0 100%" : b ? -1 === (b + "").indexOf(" ") && (b = "0 " + b) : b = "0 0", g = e(a, j), h = c(b, j, g[0]), this._length = j + 10, 0 === g[0] && 0 === h[0] ? (i = Math.max(1e-5, h[1] - j), this._dash = j + i, this._offset = j - g[1] + i, this._addTween(this, "_offset", this._offset, j - h[1] + i, "drawSVG")) : (this._dash = g[1] - g[0] || 1e-6, this._offset = -g[0], this._addTween(this, "_dash", this._dash, h[1] - h[0] || 1e-5, "drawSVG"), this._addTween(this, "_offset", this._offset, -h[0], "drawSVG")), !0
            },
            set: function(a) { this._firstPT && (this._super.setRatio.call(this, a), this._style.strokeDashoffset = this._offset, 1 === a || 0 === a ? this._style.strokeDasharray = this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._style.strokeDasharray = this._dash + "px," + this._length + "px") }
        }), f.getLength = d, f.getPosition = e
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function() {
        "use strict";

        function a(b, d) {
            function e(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            }
            var f;
            if (d = d || {}, this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = d.touchBoundary || 10, this.layer = b, this.tapDelay = d.tapDelay || 200, this.tapTimeout = d.tapTimeout || 700, !a.notNeeded(b)) {
                for (var g = ["onMouse", "onClick", "onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel"], h = this, i = 0, j = g.length; j > i; i++) h[g[i]] = e(h[g[i]], h);
                c && (b.addEventListener("mouseover", this.onMouse, !0), b.addEventListener("mousedown", this.onMouse, !0), b.addEventListener("mouseup", this.onMouse, !0)), b.addEventListener("click", this.onClick, !0), b.addEventListener("touchstart", this.onTouchStart, !1), b.addEventListener("touchmove", this.onTouchMove, !1), b.addEventListener("touchend", this.onTouchEnd, !1), b.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (b.removeEventListener = function(a, c, d) {
                    var e = Node.prototype.removeEventListener;
                    "click" === a ? e.call(b, a, c.hijacked || c, d) : e.call(b, a, c, d)
                }, b.addEventListener = function(a, c, d) {
                    var e = Node.prototype.addEventListener;
                    "click" === a ? e.call(b, a, c.hijacked || (c.hijacked = function(a) { a.propagationStopped || c(a) }), d) : e.call(b, a, c, d)
                }), "function" == typeof b.onclick && (f = b.onclick, b.addEventListener("click", function(a) { f(a) }, !1), b.onclick = null)
            }
        }
        var b = navigator.userAgent.indexOf("Windows Phone") >= 0,
            c = navigator.userAgent.indexOf("Android") > 0 && !b,
            d = /iP(ad|hone|od)/.test(navigator.userAgent) && !b,
            e = d && /OS 4_\d(_\d)?/.test(navigator.userAgent),
            f = d && /OS [6-7]_\d/.test(navigator.userAgent),
            g = navigator.userAgent.indexOf("BB10") > 0;
        a.prototype.needsClick = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "button":
                case "select":
                case "textarea":
                    if (a.disabled) return !0;
                    break;
                case "input":
                    if (d && "file" === a.type || a.disabled) return !0;
                    break;
                case "label":
                case "iframe":
                case "video":
                    return !0
            }
            return /\bneedsclick\b/.test(a.className)
        }, a.prototype.needsFocus = function(a) {
            switch (a.nodeName.toLowerCase()) {
                case "textarea":
                    return !0;
                case "select":
                    return !c;
                case "input":
                    switch (a.type) {
                        case "button":
                        case "checkbox":
                        case "file":
                        case "image":
                        case "radio":
                        case "submit":
                            return !1
                    }
                    return !a.disabled && !a.readOnly;
                default:
                    return /\bneedsfocus\b/.test(a.className)
            }
        }, a.prototype.sendClick = function(a, b) {
            var c, d;
            document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c)
        }, a.prototype.determineEventType = function(a) {
            return c && "select" === a.tagName.toLowerCase() ? "mousedown" : "click"
        }, a.prototype.focus = function(a) {
            var b;
            d && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type && "month" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus()
        }, a.prototype.updateScrollParent = function(a) {
            var b, c;
            if (b = a.fastClickScrollParent, !b || !b.contains(a)) {
                c = a;
                do {
                    if (c.scrollHeight > c.offsetHeight) {
                        b = c, a.fastClickScrollParent = c;
                        break
                    }
                    c = c.parentElement
                } while (c)
            }
            b && (b.fastClickLastScrollTop = b.scrollTop)
        }, a.prototype.getTargetElementFromEventTarget = function(a) {
            return a.nodeType === Node.TEXT_NODE ? a.parentNode : a
        }, a.prototype.onTouchStart = function(a) {
            var b, c, f;
            if (a.targetTouches.length > 1) return !0;
            if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], d) {
                if (f = window.getSelection(), f.rangeCount && !f.isCollapsed) return !0;
                if (!e) {
                    if (c.identifier && c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1;
                    this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b)
                }
            }
            return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < this.tapDelay && a.preventDefault(), !0
        }, a.prototype.touchHasMoved = function(a) {
            var b = a.changedTouches[0],
                c = this.touchBoundary;
            return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c
        }, a.prototype.onTouchMove = function(a) {
            return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0
        }, a.prototype.findControl = function(a) {
            return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")
        }, a.prototype.onTouchEnd = function(a) {
            var b, g, h, i, j, k = this.targetElement;
            if (!this.trackingClick) return !0;
            if (a.timeStamp - this.lastClickTime < this.tapDelay) return this.cancelNextClick = !0, !0;
            if (a.timeStamp - this.trackingClickStart > this.tapTimeout) return !0;
            if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, g = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, f && (j = a.changedTouches[0], k = document.elementFromPoint(j.pageX - window.pageXOffset, j.pageY - window.pageYOffset) || k, k.fastClickScrollParent = this.targetElement.fastClickScrollParent), h = k.tagName.toLowerCase(), "label" === h) {
                if (b = this.findControl(k)) {
                    if (this.focus(k), c) return !1;
                    k = b
                }
            } else if (this.needsFocus(k)) return a.timeStamp - g > 100 || d && window.top !== window && "input" === h ? (this.targetElement = null, !1) : (this.focus(k), this.sendClick(k, a), d && "select" === h || (this.targetElement = null, a.preventDefault()), !1);
            return d && !e && (i = k.fastClickScrollParent, i && i.fastClickLastScrollTop !== i.scrollTop) ? !0 : (this.needsClick(k) || (a.preventDefault(), this.sendClick(k, a)), !1)
        }, a.prototype.onTouchCancel = function() { this.trackingClick = !1, this.targetElement = null }, a.prototype.onMouse = function(a) {
            return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable && (!this.needsClick(this.targetElement) || this.cancelNextClick) ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0
        }, a.prototype.onClick = function(a) {
            var b;
            return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b)
        }, a.prototype.destroy = function() {
            var a = this.layer;
            c && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1)
        }, a.notNeeded = function(a) {
            var b, d, e, f;
            if ("undefined" == typeof window.ontouchstart) return !0;
            if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) {
                if (!c) return !0;
                if (b = document.querySelector("meta[name=viewport]")) {
                    if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                    if (d > 31 && document.documentElement.scrollWidth <= window.outerWidth) return !0
                }
            }
            if (g && (e = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/), e[1] >= 10 && e[2] >= 3 && (b = document.querySelector("meta[name=viewport]")))) {
                if (-1 !== b.content.indexOf("user-scalable=no")) return !0;
                if (document.documentElement.scrollWidth <= window.outerWidth) return !0
            }
            return "none" === a.style.msTouchAction || "manipulation" === a.style.touchAction ? !0 : (f = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1], f >= 27 && (b = document.querySelector("meta[name=viewport]"), b && (-1 !== b.content.indexOf("user-scalable=no") || document.documentElement.scrollWidth <= window.outerWidth)) ? !0 : "none" === a.style.touchAction || "manipulation" === a.style.touchAction)
        }, a.attach = function(b, c) {
            return new a(b, c)
        }, "function" == typeof define && "object" == typeof define.amd && define.amd ? define(function() {
            return a
        }) : "undefined" != typeof module && module.exports ? (module.exports = a.attach, module.exports.FastClick = a) : window.FastClick = a
    }(),
    function(a, b) {
        "use strict";

        function c(a) { this.callback = a, this.ticking = !1 }

        function d(b) {
            return b && "undefined" != typeof a && (b === a || b.nodeType)
        }

        function e(a) {
            if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
            var b, c, f = a || {};
            for (c = 1; c < arguments.length; c++) {
                var g = arguments[c] || {};
                for (b in g) "object" != typeof f[b] || d(f[b]) ? f[b] = f[b] || g[b] : f[b] = e(f[b], g[b])
            }
            return f
        }

        function f(a) {
            return a === Object(a) ? a : { down: a, up: a }
        }

        function g(a, b) { b = e(b, g.options), this.lastKnownScrollY = 0, this.elem = a, this.debouncer = new c(this.update.bind(this)), this.tolerance = f(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop }
        var h = { bind: !! function() {}.bind, classList: "classList" in b.documentElement, rAF: !!(a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame) };
        a.requestAnimationFrame = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame, c.prototype = { constructor: c, update: function() { this.callback && this.callback(), this.ticking = !1 }, requestTick: function() { this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0) }, handleEvent: function() { this.requestTick() } }, g.prototype = {
            constructor: g,
            init: function() {
                return g.cutsTheMustard ? (this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this) : void 0
            },
            destroy: function() {
                var a = this.classes;
                this.initialised = !1, this.elem.classList.remove(a.unpinned, a.pinned, a.top, a.initial), this.scroller.removeEventListener("scroll", this.debouncer, !1)
            },
            attachEvent: function() { this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent()) },
            unpin: function() {
                var a = this.elem.classList,
                    b = this.classes;
                !a.contains(b.pinned) && a.contains(b.unpinned) || (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
            },
            pin: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
            },
            top: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
            },
            notTop: function() {
                var a = this.elem.classList,
                    b = this.classes;
                a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
            },
            getScrollY: function() {
                return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (b.documentElement || b.body.parentNode || b.body).scrollTop
            },
            getViewportHeight: function() {
                return a.innerHeight || b.documentElement.clientHeight || b.body.clientHeight
            },
            getDocumentHeight: function() {
                var a = b.body,
                    c = b.documentElement;
                return Math.max(a.scrollHeight, c.scrollHeight, a.offsetHeight, c.offsetHeight, a.clientHeight, c.clientHeight)
            },
            getElementHeight: function(a) {
                return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
            },
            getScrollerHeight: function() {
                return this.scroller === a || this.scroller === b.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
            },
            isOutOfBounds: function(a) {
                var b = 0 > a,
                    c = a + this.getViewportHeight() > this.getScrollerHeight();
                return b || c
            },
            toleranceExceeded: function(a, b) {
                return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
            },
            shouldUnpin: function(a, b) {
                var c = a > this.lastKnownScrollY,
                    d = a >= this.offset;
                return c && d && b
            },
            shouldPin: function(a, b) {
                var c = a < this.lastKnownScrollY,
                    d = a <= this.offset;
                return c && b || d
            },
            update: function() {
                var a = this.getScrollY(),
                    b = a > this.lastKnownScrollY ? "down" : "up",
                    c = this.toleranceExceeded(a, b);
                this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
            }
        }, g.options = { tolerance: { up: 0, down: 0 }, offset: 0, scroller: a, classes: { pinned: "headroom--pinned", unpinned: "headroom--unpinned", top: "headroom--top", notTop: "headroom--not-top", initial: "headroom" } }, g.cutsTheMustard = "undefined" != typeof h && h.rAF && h.bind && h.classList, a.Headroom = g
    }(window, document),
    function(a) {
        a.fn.attrs = function(b) {
            var c = a(this);
            if (b) return c.each(function(c, d) { a(d).attr(b) }), c;
            var d = {},
                e = c.get(0);
            if (e) {
                e = e.attributes;
                for (var f in e) {
                    var g = e[f];
                    "undefined" != typeof g.nodeValue && (d[g.nodeName] = g.nodeValue)
                }
            }
            return d
        }
    }(jQuery), ! function(a, b, c, d) {
        var e = a(b);
        a.fn.lazyload = function(f) {
            function g() {
                var b = 0;
                i.each(function() {
                    var c = a(this);
                    if (!j.skip_invisible || c.is(":visible"))
                        if (a.abovethetop(this, j) || a.leftofbegin(this, j));
                        else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
                        if (++b > j.failure_limit) return !1
                    } else c.trigger("appear"), b = 0
                })
            }
            var h, i = this,
                j = { threshold: 0, failure_limit: 0, event: "scroll", effect: "show", container: b, data_attribute: "original", skip_invisible: !1, appear: null, load: null, placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" };
            return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
                return g()
            }), this.each(function() {
                var b = this,
                    c = a(b);
                b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
                    if (!this.loaded) {
                        if (j.appear) {
                            var d = i.length;
                            j.appear.call(b, d, j)
                        }
                        a("<img />").bind("load", function() {
                            var d = c.attr("data-" + j.data_attribute);
                            c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
                            var e = a.grep(i, function(a) {
                                return !a.loaded
                            });
                            if (i = a(e), j.load) {
                                var f = i.length;
                                j.load.call(b, f, j)
                            }
                        }).attr("src", c.attr("data-" + j.data_attribute))
                    }
                }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() { b.loaded || c.trigger("appear") })
            }), e.bind("resize", function() { g() }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) { b.originalEvent && b.originalEvent.persisted && i.each(function() { a(this).trigger("appear") }) }), a(c).ready(function() { g() }), this
        }, a.belowthefold = function(c, f) {
            var g;
            return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
        }, a.rightoffold = function(c, f) {
            var g;
            return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
        }, a.abovethetop = function(c, f) {
            var g;
            return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
        }, a.leftofbegin = function(c, f) {
            var g;
            return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
        }, a.inviewport = function(b, c) {
            return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
        }, a.extend(a.expr[":"], {
            "below-the-fold": function(b) {
                return a.belowthefold(b, { threshold: 0 })
            },
            "above-the-top": function(b) {
                return !a.belowthefold(b, { threshold: 0 })
            },
            "right-of-screen": function(b) {
                return a.rightoffold(b, { threshold: 0 })
            },
            "left-of-screen": function(b) {
                return !a.rightoffold(b, { threshold: 0 })
            },
            "in-viewport": function(b) {
                return a.inviewport(b, { threshold: 0 })
            },
            "above-the-fold": function(b) {
                return !a.belowthefold(b, { threshold: 0 })
            },
            "right-of-fold": function(b) {
                return a.rightoffold(b, { threshold: 0 })
            },
            "left-of-fold": function(b) {
                return !a.rightoffold(b, { threshold: 0 })
            }
        })
    }(jQuery, window, document),
    function(a, b, c, d) {
        function e(b, c) { this.element = b, this.options = a.extend({}, h, c), this._defaults = h, this._name = g, this.init() }
        var f, g = "parallaxify",
            h = { positionProperty: "position", horizontalParallax: !0, verticalParallax: !0, parallaxBackgrounds: !0, parallaxElements: !0, responsive: !1, useMouseMove: !0, useGyroscope: !0, alphaFilter: .9, motionType: "natural", mouseMotionType: "gaussian", inputPriority: "mouse", motionAngleX: 80, motionAngleY: 80, adjustBasePosition: !0, alphaPosition: .05 },
            i = { position: { setLeft: function(a, b) { a.css("left", b) }, setTop: function(a, b) { a.css("top", b) } }, transform: { setPosition: function(a, b, c, d, e) { a[0].style[p] = "translate3d(" + (b - c) + "px, " + (d - e) + "px, 0)" } } },
            j = function(a, b, c) {
                return null === b ? a : ("undefined" == typeof c && (c = .5), c * a + (1 - c) * b)
            },
            k = [],
            l = {
                linear: function(a, b) {
                    return -b >= a ? 1 : a >= b ? -1 : -a / b
                },
                natural: function(a, b) {
                    return -b >= a ? 1 : a >= b ? -1 : (k["n" + b] === d && (k["n" + b] = Math.tan(.01745 * b)), -Math.tan(.01745 * a) / k["n" + b])
                },
                performance: function(a, b) {
                    return -b >= a ? 1 : a >= b ? -1 : (k["p" + b] === d && (k["p" + b] = b / 90 + 4.2 * Math.pow(b / 90, 7)), -(a / 90 + 4.2 * Math.pow(a / 90, 7)) / k["p" + b])
                },
                gaussian: function(a, b) {
                    return 1 - 2 * (1 / (1 + Math.exp(-(.07056 * (135 / b) * (a / 90 ^ 3)) - 1.5976 * (135 / b) * (a / 90))))
                }
            },
            m = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
            n = a("script")[0].style,
            o = "";
        for (f in n)
            if (m.test(f)) {
                o = f.match(m)[0];
                break
            }
            "WebkitOpacity" in n && (o = "Webkit"), "KhtmlOpacity" in n && (o = "Khtml");
        var p = o + (0 < o.length ? "T" + "transform".slice(1) : "transform"),
            q = (m = a("<div />", { style: "background:#fff" }).css("background-position-x") !== d) ? function(a, b, c) { a.css({ "background-position-x": b, "background-position-y": c }) } : function(a, b, c) { a.css("background-position", b + " " + c) },
            r = m ? function(a) {
                return [a.css("background-position-x"), a.css("background-position-y")]
            } : function(a) {
                return a.css("background-position").split(" ")
            },
            s = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame || b.oRequestAnimationFrame || b.msRequestAnimationFrame || function(a) { setTimeout(a, 1e3 / 30) };
        e.prototype = {
            init: function() { this.options.name = g + "_" + Math.floor(1e9 * Math.random()), this.tilt = { beta: 0, gamma: 0 }, this._defineElements(), this._defineGetters(), this._defineSetters(), this._detectMobile(), this._detectMotionType(), this._detectViewport(), this._handleWindowLoadAndResize(), this.refresh({ firstLoad: !0 }), this._startAnimation() },
            _defineElements: function() { this.$element = a(this.element === c.body || this.element === b ? "body" : this.element), this.$viewportElement = a(b) },
            _defineGetters: function() {
                var a = l[this.options.motionType],
                    b = l[this.options.mouseMotionType];
                this._getMoveHorizontal = function() {
                    if (this.useMouseMove && null !== this.clientX && this.clientX !== this.oldClientX) return b(this.options.motionAngleX * (1 - 2 * this.clientX / this.viewportWidth), this.options.motionAngleX);
                    if (this.useSensor && null !== this.beta && null !== this.gamma) {
                        var c = this.tilt;
                        return this.viewportLandscape ? this.viewportFlipped ? a(-c.beta, this.options.motionAngleX) : a(c.beta, this.options.motionAngleX) : this.viewportFlipped ? a(-c.gamma, this.options.motionAngleX) : a(c.gamma, this.options.motionAngleX)
                    }
                    return this.useSensor = !1, b(this.options.motionAngleX * (1 - 2 * this.oldClientX / this.viewportWidth), this.options.motionAngleX)
                }, this._getMoveVertical = function() {
                    if (this.options.useMouseMove && null !== this.clientY && this.clientY !== this.oldClientY) return b(this.options.motionAngleY * (1 - 2 * this.clientY / this.viewportHeight), this.options.motionAngleY);
                    if (this.useSensor && null !== this.beta && null !== this.gamma) {
                        var c = this.tilt;
                        return this.viewportLandscape ? this.viewportFlipped ? a(-c.gamma, this.options.motionAngleY) : a(c.gamma, this.options.motionAngleY) : this.viewportFlipped ? a(-c.beta, this.options.motionAngleY) : a(c.beta, this.options.motionAngleY)
                    }
                    return this.useSensor = !1, b(this.options.motionAngleY * (1 - 2 * this.oldClientY / this.viewportHeight), this.options.motionAngleY)
                }
            },
            _defineSetters: function() {
                var a = this,
                    b = i[a.options.positionProperty];
                this._setPosition = b.setPosition || function(c, d, e, f, g) { a.options.horizontalParallax && b.setLeft(c, d, e), a.options.verticalParallax && b.setTop(c, f, g) }
            },
            refresh: function(c) {
                (!c || !c.firstLoad) && this._reset(), this._findElements(), this._findBackgrounds(), c && c.firstLoad && /WebKit/.test(navigator.userAgent) && a(b).load(function() {
                    var b = a("body");
                    oldLeft = b.scrollLeft(), oldTop = b.scrollTop(), b.scrollLeft(oldLeft + 1), b.scrollTop(oldTop + 1), b.scrollLeft(oldLeft), b.scrollTop(oldTop)
                })
            },
            _detectViewport: function() { this.viewportWidth = this.$viewportElement.width(), this.viewportHeight = this.$viewportElement.height(), this.useSensor && (this.viewportFlipped = 180 === b.orientation, this.viewportLandscape = 90 === Math.abs(b.orientation)) },
            _detectMobile: function() {
                var a = navigator.userAgent || navigator.vendor || b.opera;
                this.isMobile = /(bb\d+|meego).+mobile|android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|playbook|plucker|pocket|psp|series(4|6)0|silk|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
            },
            _detectMotionType: function() { this.useMouseMove = this.useSensorMoz = this.useSensorWebkit = this.useSensor = !1, this.options.useGyroscope && (this.isMobile || "gyroscope" === this.options.inputPriority) && (this.useSensorWebkit = b.DeviceOrientationEvent !== d, this.useSensorMoz = b.OrientationEvent !== d, this.useSensor = this.useSensorWebkit || this.useSensorMoz), this.options.useMouseMove && !this.isMobile && (this.useMouseMove = this.$viewportElement.mousemove !== d) },
            _findElements: function() {
                var b = this;
                if (this.elements !== d)
                    for (var c = this.elements.length - 1; c >= 0; c--) this.elements[c].$element.data("parallaxify-ElementIsActive", d);
                this.elements = [], this.options.parallaxElements && this.$element.find("[data-parallaxify-range],[data-parallaxify-range-x],[data-parallaxify-range-y]").each(function() {
                    var c = a(this);
                    if (c.data("parallaxify-ElementIsActive")) {
                        if (c.data("parallaxify-ElementIsActive") !== this) return
                    } else c.data("parallaxify-ElementIsActive", this);
                    c.data("parralaxify-originalLeft") ? (c.css("left", c.data("parallaxify-originalLeft")), c.css("top", c.data("parallaxify-originalTop"))) : (c.data("parallaxify-originalLeft", c.css("left")), c.data("parallaxify-originalTop", c.css("top"))), b.elements.push({ $element: c, originalPositionLeft: c.position().left, originalPositionTop: c.position().top, parallaxDistanceX: c.data("parallaxify-range-x") !== d ? c.data("parallaxify-range-x") : c.data("parallaxify-range") !== d ? c.data("parallaxify-range") : 0, parallaxDistanceY: c.data("parallaxify-range-y") !== d ? c.data("parallaxify-range-y") : c.data("parallaxify-range") !== d ? c.data("parallaxify-range") : 0, width: c.outerWidth(!0), height: c.outerHeight(!0) })
                })
            },
            _findBackgrounds: function() {
                var b, c = this;
                this.backgrounds = [], this.options.parallaxBackgrounds && (b = this.$element.find("[data-parallaxify-background-range],[data-parallaxify-background-range-x],[data-parallaxify-background-range-y]"), (this.$element.data("parallaxify-background-range") || this.$element.data("parallaxify-background-range-x") || this.$element.data("parallaxify-background-range-y")) && (b = b.add(this.$element)), b.each(function() {
                    var b = a(this),
                        e = r(b);
                    if (b.data("parallaxify-backgroundIsActive")) {
                        if (b.data("parallaxify-backgroundIsActive") !== this) return
                    } else b.data("parallaxify-backgroundIsActive", this);
                    b.data("parralaxify-backgroundOriginalLeft") ? q(b, b.data("parallaxify-backgroundOriginalLeft"), b.data("parallaxify-backgroundOriginalTop")) : (b.data("parallaxify-backgroundOriginalLeft", e[0]), b.data("parallaxify-backgroundOriginalTop", e[1])), c.backgrounds.push({ $element: b, originalValueLeft: e[0], originalValueTop: e[1], originalBackgroundPositionLeft: isNaN(parseInt(e[0], 10)) ? 0 : parseInt(e[0], 10), originalBackgroundPositionTop: isNaN(parseInt(e[1], 10)) ? 0 : parseInt(e[1], 10), originalPositionLeft: b.position().left, originalPositionTop: b.position().top, parallaxDistanceX: b.data("parallaxify-background-range-x") !== d ? b.data("parallaxify-background-range-x") : b.data("parallaxify-background-range") !== d ? b.data("parallaxify-background-range") : 0, parallaxDistanceY: b.data("parallaxify-background-range-y") !== d ? b.data("parallaxify-background-range-y") : b.data("parallaxify-background-range") !== d ? b.data("parallaxify-background-range") : 0 })
                }))
            },
            _reset: function() {
                var a, b, c, d;
                for (d = this.elements.length - 1; d >= 0; d--) a = this.elements[d], b = a.$element.data("parallaxify-originalLeft"), c = a.$element.data("parallaxify-originalTop"), this._setPosition(a.$element, b, b, c, c), a.$element.data("parallaxify-originalLeft", null).data("parallaxify-originalLeft", null).data("parallaxify-elementIsActive", null).data("parallaxify-backgroundIsActive", null);
                for (d = this.backgrounds.length - 1; d >= 0; d--) a = this.backgrounds[d], a.$element.data("parallaxify-backgroundOriginalLeft", null).data("parallaxify-backgroundOriginalTop", null).data("parallaxify-backgroundIsActive", null), q(a.$element, a.originalValueLeft, a.originalValueTop)
            },
            destroy: function() {
                this._reset(), this.useMouseMove && this.$viewportElement.unbind("mousemove." + this.name),
                    this.useSensorWebkit && b.removeEventListener("deviceorientation", this._handleSensorWebkit, !1), this.useSensorMoz && b.removeEventListener("MozOrientation", this._handleSensorMoz, !1), a(b).unbind("load." + this.name).unbind("resize." + this.name).unbind("orientationchange." + this.name)
            },
            _processSensorData: function() {
                if (this.useSensor) {
                    var a = this.beta,
                        b = this.gamma,
                        c = 0,
                        e = 0;
                    a > 90 && (a -= 180), b > 180 && (b -= 360), this.initialBeta === d && null !== a && (this.initialBeta = a, this.useSensor && "gyroscope" === this.options.inputPriority && (this.useMouseMove = !1)), this.initialGamma === d && null !== b && (this.initialGamma = b, this.useSensor && "gyroscope" === this.options.inputPriority && (this.useMouseMove = !1)), this.options.adjustBasePosition && this.initialGamma !== d && this.initialBeta !== d && (this.initialGamma = -180 > b - this.initialGamma ? j(b + 360, this.initialGamma, this.options.alphaPosition) : 180 < b - this.initialGamma ? j(b - 360, this.initialGamma, this.options.alphaPosition) : j(b, this.initialGamma, this.options.alphaPosition), this.initialBeta = -90 > a - this.initialBeta ? j(a + 180, this.initialBeta, this.options.alphaPosition) : 90 < a - this.initialBeta ? j(a - 180, this.initialBeta, this.options.alphaPosition) : j(a, this.initialBeta, this.options.alphaPosition)), c = this.initialBeta !== d ? a - this.initialBeta : a, e = this.initialGamma !== d ? b - this.initialGamma : b, c > 100 ? c -= 180 : -100 > c && (c += 180), e > 200 ? e -= 360 : -200 > e && (e += 360), c = j(c, this.tilt.beta, this.options.alphaFilter), e = j(e, this.tilt.gamma, this.options.alphaFilter), this.tilt.beta = c, this.tilt.gamma = e
                }
            },
            _repositionElements: function() {
                var a, b, c, d, e = this._getMoveHorizontal(),
                    f = this._getMoveVertical();
                if (this.currentMoveHorizontal !== e || this.currentMoveVertical !== f || this.currentWidth !== this.viewportWidth || this.currentHeight !== this.viewportHeight) {
                    for (this.currentMoveHorizontal = e, this.currentMoveVertical = f, this.currentWidth = this.viewportWidth, this.currentHeight = this.viewportHeight, d = this.elements.length - 1; d >= 0; d--) a = this.elements[d], b = this.options.horizontalParallax ? Math.floor(e * a.parallaxDistanceX / 2) + a.originalPositionLeft : a.originalPositionLeft, c = this.options.verticalParallax ? Math.floor(f * a.parallaxDistanceY / 2) + a.originalPositionTop : a.originalPositionTop, this._setPosition(a.$element, b, a.originalPositionLeft, c, a.originalPositionTop);
                    for (d = this.backgrounds.length - 1; d >= 0; d--) a = this.backgrounds[d], b = this.options.horizontalParallax ? Math.floor(e * a.parallaxDistanceX / 2) + a.originalBackgroundPositionLeft + "px" : a.originalValueLeft, c = this.options.verticalParallax ? Math.floor(f * a.parallaxDistanceY / 2) + a.originalBackgroundPositionTop + "px" : a.originalValueTop, q(a.$element, b, c)
                }
            },
            _handleWindowLoadAndResize: function() {
                var c = this,
                    d = a(b);
                c.options.responsive && d.bind("load." + this.name, function() { c.refresh() }), d.bind("resize." + this.name, function() { c._detectViewport(), c.options.responsive && c.refresh() }), d.bind("orientationchange." + this.name, function() { c._detectViewport(), c.options.responsive && c.refresh() })
            },
            _startAnimation: function() {
                var a = this,
                    c = !1;
                this.gamma = this.beta = 0, this.clientX = this.oldClientX = Math.round(a.viewportWidth / 2), this.clientY = this.oldClientY = Math.round(a.viewportHeight / 2);
                var e = function() { a._processSensorData(), a._repositionElements(), c = !1 },
                    f = function() { c || (s(e), c = !0) };
                this._handleSensorWebkit = function(b) { a.gamma = b.gamma, a.beta = b.beta, f() }, this._handleSensorMoz = function(b) { a.gamma = 180 * b.x, a.beta = -90 * b.y, f() }, this._handleMouseMove = function(b) { a.oldClientX = a.clientX, a.oldClientY = a.clientY, b.clientX !== d ? a.clientX = b.clientX : a.clientX = b.pageX, b.clientY !== d ? a.clientY = b.clientY : a.clientY = b.pageY, f() }, this.useSensorWebkit ? b.addEventListener("deviceorientation", a._handleSensorWebkit, !1) : this.useSensorMoz && b.addEventListener("MozOrientation", a._handleSensorMoz, !1), this.useMouseMove && this.$viewportElement.bind("mousemove." + this.name, a._handleMouseMove), f()
            }
        }, a.fn[g] = function(b) {
            var c = arguments;
            return b === d || "object" == typeof b ? this.each(function() { a.data(this, "plugin_" + g) || a.data(this, "plugin_" + g, new e(this, b)) }) : "string" == typeof b && "_" !== b[0] && "init" !== b ? this.each(function() {
                var d = a.data(this, "plugin_" + g);
                d instanceof e && "function" == typeof d[b] && d[b].apply(d, Array.prototype.slice.call(c, 1)), "destroy" === b && a.data(this, "plugin_" + g, null)
            }) : void 0
        }, a[g] = function(c) {
            var d = a(b);
            return d[g].apply(d, Array.prototype.slice.call(arguments, 0))
        }, a[g].positionProperty = i, a[g].motionType = l, b[g] = e
    }(jQuery, this, document), ! function(a) {
        "use strict";
        var b = "selectric",
            c = "Input Items Open Disabled TempShow HideSelect Wrapper Focus Hover Responsive Above Scroll Group GroupLabel",
            d = ".sl",
            e = { onChange: function(b) { a(b).change() }, maxHeight: 300, keySearchTimeout: 500, keys: { select: "9|13|27|32", open: "32|37|38|39|40", close: "9|27" }, arrowButtonMarkup: '<b class="button">&#x25be;</b>', disableOnMobile: !0, openOnFocus: !0, openOnHover: !1, hoverIntentTimeout: 500, expandToItemText: !1, responsive: !1, preventWindowScroll: !0, inheritOriginalWidth: !1, allowWrap: !0, customClass: { prefix: b, camelCase: !1, overwrite: !0 }, optionsItemBuilder: "{text}", labelBuilder: "{text}" },
            f = { add: function(a, b, c) { this[a] || (this[a] = {}), this[a][b] = c }, remove: function(a, b) { delete this[a][b] } },
            g = {
                escapeRegExp: function(a) {
                    return a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                },
                replaceDiacritics: function(a) {
                    for (var b = "40-46 50-53 54-57 62-70 71-74 61 47 77".replace(/\d+/g, "\\3$&").split(" "), c = b.length; c--;) a = a.toLowerCase().replace(RegExp("[" + b[c] + "]", "g"), "aeiouncy".charAt(c));
                    return a
                },
                format: function(a) {
                    var b = arguments;
                    return ("" + a).replace(/{(\d+|(\w+))}/g, function(a, c, d) {
                        return d && b[1] ? b[1][d] : b[c]
                    })
                },
                nextEnabledItem: function(a, b) {
                    for (; a[b = (b + 1) % a.length].disabled;);
                    return b
                },
                previousEnabledItem: function(a, b) {
                    for (; a[b = (b > 0 ? b : a.length) - 1].disabled;);
                    return b
                },
                toDash: function(a) {
                    return a.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
                },
                triggerCallback: function(c, d) {
                    var e = d.element,
                        h = d.options["on" + c];
                    a.isFunction(h) && h.call(e, e, d), f[c] && a.each(f[c], function() { this.call(e, e, d) }), a(e).trigger(b + "-" + g.toDash(c), d)
                }
            },
            h = a(document),
            i = a(window),
            j = function(f, j) {
                function k(b) {
                    if (N.options = a.extend(!0, {}, e, N.options, b), N.classes = {}, N.element = f, g.triggerCallback("BeforeInit", N), N.options.disableOnMobile && R) return void(N.disableOnMobile = !0);
                    w(!0);
                    var d = N.options.customClass,
                        h = c.split(" "),
                        i = O.width();
                    a.each(h, function(a, b) {
                        var c = d.prefix + "-" + b;
                        N.classes[b.toLowerCase()] = d.camelCase ? c : g.toDash(c)
                    }), x = a("<input/>", { "class": N.classes.input, readonly: R }), y = a("<div/>", { "class": N.classes.items, tabindex: -1 }), z = a("<div/>", { "class": N.classes.scroll }), A = a("<div/>", { "class": d.prefix, html: N.options.arrowButtonMarkup }), B = a('<p class="label"/>'), C = O.wrap("<div>").parent().append(A.prepend(B), y, x), K = { open: p, close: r, destroy: w, refresh: m, init: k }, O.on(K).wrap('<div class="' + N.classes.hideselect + '">'), a.extend(N, K), L = { open: !1, close: !1, select: !1 }, a.each(N.options.keys, function(b, c) { c && (a.isArray(c) && (c = c.join("|")), L[b] = new RegExp("^(" + c + ")$", "i")) }), M = N.options.labelBuilder, N.options.inheritOriginalWidth && i > 0 && C.width(i), l()
                }

                function l() {
                    N.items = [];
                    var b = O.children(),
                        c = "<ul>",
                        e = O.find("option"),
                        f = e.index(e.filter(":selected")),
                        h = 0;
                    F = E = ~f ? f : 0, (J = b.length) && (b.each(function() {
                        function b() {
                            var b = a(this),
                                d = b.html(),
                                e = b.prop("disabled"),
                                f = b.attr("class"),
                                i = N.options.optionsItemBuilder;
                            N.items[h] = { element: b, value: b.val(), text: d, slug: g.replaceDiacritics(d), classes: f, disabled: e }, c += g.format('<li data-index="{1}" class="{2}">{3}</li>', h, a.trim([f, h == F ? "selected" : "", h == J - 1 ? "last" : "", e ? "disabled" : ""].join(" ")), a.isFunction(i) ? i(N.items[h], b, h) : g.format(i, N.items[h])), h++
                        }
                        var d = a(this);
                        if (d.is("optgroup")) {
                            var e = d.prop("disabled"),
                                f = d.children();
                            c += g.format('<ul class="{1}"><li class="{2}">{3}</li>', a.trim([N.classes.group, e ? "disabled" : "", d.prop("class")].join(" ")), N.classes.grouplabel, d.prop("label")), e && f.prop("disabled", !0), f.each(b), c += "</ul>"
                        } else b.call(d)
                    }), y.append(z.html(c + "</ul>")), B.html(a.isFunction(M) ? M(N.items[F]) : g.format(M, N.items[F]))), A.add(O).add(C).add(x).off(d), C.prop("class", [N.classes.wrapper, N.options.customClass.overwrite ? O.prop("class").replace(/\S+/g, N.options.customClass.prefix + "-$&") : O.prop("class"), N.options.responsive ? N.classes.responsive : ""].join(" ")), O.prop("disabled") ? (C.addClass(N.classes.disabled), x.prop("disabled", !0)) : (Q = !0, C.removeClass(N.classes.disabled).on("mouseenter" + d, function(b) { a(this).addClass(N.classes.hover), N.options.openOnHover && (clearTimeout(N.closeTimer), p()) }).on("mouseleave" + d, function(b) { a(this).removeClass(N.classes.hover), N.options.openOnHover && (clearTimeout(N.closeTimer), N.closeTimer = setTimeout(r, N.options.hoverIntentTimeout)) }), A.on("click" + d, function(a) { P ? r() : p(a) }), x.prop({ tabindex: S, disabled: !1 }).on("keypress" + d, n).on("keydown" + d, function(a) {
                        n(a), clearTimeout(N.resetStr), N.resetStr = setTimeout(function() { x.val("") }, N.options.keySearchTimeout);
                        var b = a.keyCode || a.which,
                            c = P ? s : t;
                        if (b > 36 && 41 > b) {
                            if (!N.options.allowWrap && (39 > b && 0 == E || b > 38 && E + 1 == N.items.length)) return;
                            c(g[(39 > b ? "previous" : "next") + "EnabledItem"](N.items, E))
                        }
                    }).on("focusin" + d, function(a) { C.addClass(N.classes.focus), x.one("blur", function() { x.blur() }), N.options.openOnFocus && (P || p(a)) }).on("focusout" + d, function(a) { C.removeClass(N.classes.focus) }).on("oninput" in x[0] ? "input" : "keyup", function() {
                        x.val().length && a.each(N.items, function(a, b) {
                            if (RegExp("^" + g.escapeRegExp(x.val()), "i").test(b.slug) && !b.disabled) {
                                var c = P ? s : t;
                                return c(a), !1
                            }
                        })
                    }), O.prop("tabindex", -1).on("focusin" + d, function(a) { C.addClass(N.classes.focus), N.options.openOnFocus ? P || p(a) : x.focus() }).on("focusout" + d, function(a) { C.removeClass(N.classes.focus) }), D = a("li", y.removeAttr("style")).on({
                        mousedown: function(a) { a.preventDefault(), a.stopPropagation() },
                        click: function() {
                            return t(a(this).data("index"), !0), !1
                        }
                    }).filter("[data-index]")), g.triggerCallback("Init", N)
                }

                function m() { g.triggerCallback("Refresh", N), l() }

                function n(a) {
                    var b = a.keyCode || a.which;
                    (13 == b || 32 == b) && a.preventDefault(), P ? L.select && L.select.test(b) ? (a.stopPropagation(), t(E, !0)) : L.close && L.close.test(b) && (a.stopPropagation(), E = F, r()) : L.open && L.open.test(b) && p()
                }

                function o() {
                    var a = y.closest(":visible").children(":hidden").addClass(N.classes.tempshow),
                        b = N.options.maxHeight,
                        c = y.outerWidth(),
                        d = A.outerWidth() - (c - y.width());
                    !N.options.expandToItemText || d > c ? I = d : (y.css("overflow", "scroll"), C.width(9e4), I = y.width(), y.css("overflow", ""), C.width("")), y.width(I).height() > b && y.height(b), a.removeClass(N.classes.tempshow)
                }

                function p(c) {
                    g.triggerCallback("BeforeOpen", N), c && (c.preventDefault(), c.stopPropagation()), Q && (o(), a("." + N.classes.hideselect, "." + N.classes.open).children()[b]("close"), P = !0, G = y.outerHeight(), H = y.height(), C.addClass(N.classes.open), x.val("").is(":focus") || x.focus(), h.on("click" + d, function(b) {
                        var c = a(b.target);
                        return c.closest("." + N.classes.items).length || c.is("html") ? !1 : void r()
                    }).on("scroll" + d, q), q(), N.options.preventWindowScroll && h.on("mousewheel" + d + " DOMMouseScroll" + d, "." + N.classes.scroll, function(b) {
                        var c = b.originalEvent,
                            d = a(this).scrollTop(),
                            e = 0;
                        "detail" in c && (e = -1 * c.detail), "wheelDelta" in c && (e = c.wheelDelta), "wheelDeltaY" in c && (e = c.wheelDeltaY), "deltaY" in c && (e = -1 * c.deltaY), (d == this.scrollHeight - H && 0 > e || 0 == d && e > 0) && b.preventDefault()
                    }), v(E), g.triggerCallback("Open", N))
                }

                function q() { C.toggleClass(N.classes.above, G <= C.offset().top && C.offset().top + C.outerHeight() + G > i.scrollTop() + i.height()) }

                function r() { g.triggerCallback("BeforeClose", N), h.off(d), C.removeClass(N.classes.open), P = !1, g.triggerCallback("Close", N) }

                function s(a, b) { void 0 != a && (N.items[a].disabled || (D.removeClass("focused").eq(E = a).addClass("focused"), v(a), b && t(a))) }

                function t(a, b) { void 0 != a && (N.items[a].disabled || (D.removeClass("selected").eq(E = a).addClass("selected"), v(a), u(), b && r())) }

                function u() {
                    if (F != E) {
                        g.triggerCallback("BeforeChange", N);
                        var b = N.items[E].text;
                        O.prop("selectedIndex", F = E).data("value", b), B.html(a.isFunction(M) ? M(N.items[E]) : g.format(M, N.items[E])), g.triggerCallback("Change", N)
                    }
                }

                function v(a) {
                    var b = D.eq(a).outerHeight(),
                        c = D[a].offsetTop,
                        d = z.scrollTop(),
                        e = c + 2 * b;
                    z.scrollTop(e > d + G ? e - G : d > c - b ? c - b : d)
                }

                function w(a) { Q && (y.add(A).add(x).remove(), !a && O.removeData(b).removeData("value"), O.prop("tabindex", S).off(d).off(K).unwrap().unwrap(), Q = !1) }
                var x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = this,
                    O = a(f),
                    P = !1,
                    Q = !1,
                    R = /android|ip(hone|od|ad)/i.test(navigator.userAgent),
                    S = O.prop("tabindex");
                k(j)
            };
        a.fn[b] = function(c) {
            return this.each(function() {
                var d = a.data(this, b);
                d && !d.disableOnMobile ? "" + c === c && d[c] ? d[c]() : d.init(c) : a.data(this, b, new j(this, c))
            })
        }, a.fn[b].hooks = f
    }(jQuery),
    function(a) { "use strict"; "object" == typeof module && "object" == typeof module.exports ? a(require("jquery"), window, document) : a(jQuery, window, document) }(function(a, b, c, d) {
        "use strict";
        if (!b.history.pushState) return a.fn.smoothState = function() {
            return this
        }, void(a.fn.smoothState.options = {});
        if (!a.fn.smoothState) {
            var e = a("html, body"),
                f = b.console,
                g = {
                    debug: !1,
                    anchors: "a",
                    hrefRegex: "",
                    forms: "form",
                    allowFormCaching: !1,
                    repeatDelay: 500,
                    blacklist: ".no-smoothState",
                    prefetch: !1,
                    prefetchOn: "mouseover touchstart",
                    prefetchBlacklist: ".no-prefetch",
                    locationHeader: "X-SmoothState-Location",
                    cacheLength: 0,
                    loadingClass: "is-loading",
                    scroll: !0,
                    alterRequest: function(a) {
                        return a
                    },
                    alterChangeState: function(a, b, c) {
                        return a
                    },
                    onBefore: function(a, b) {},
                    onStart: { duration: 0, render: function(a) {} },
                    onProgress: { duration: 0, render: function(a) {} },
                    onReady: { duration: 0, render: function(a, b) { a.html(b) } },
                    onAfter: function(a, b) {}
                },
                h = {
                    isExternal: function(a) {
                        var c = a.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/);
                        return "string" == typeof c[1] && c[1].length > 0 && c[1].toLowerCase() !== b.location.protocol ? !0 : "string" == typeof c[2] && c[2].length > 0 && c[2].replace(new RegExp(":(" + { "http:": 80, "https:": 443 }[b.location.protocol] + ")?$"), "") !== b.location.host
                    },
                    stripHash: function(a) {
                        return a.replace(/#.*/, "")
                    },
                    isHash: function(a, c) {
                        c = c || b.location.href;
                        var d = a.indexOf("#") > -1,
                            e = h.stripHash(a) === h.stripHash(c);
                        return d && e
                    },
                    translate: function(b) {
                        var c = { dataType: "html", type: "GET" };
                        return b = "string" == typeof b ? a.extend({}, c, { url: b }) : a.extend({}, c, b)
                    },
                    shouldLoadAnchor: function(a, b, c) {
                        var e = a.prop("href");
                        return !(h.isExternal(e) || h.isHash(e) || a.is(b) || a.prop("target") || typeof c !== d && "" !== c && -1 === a.prop("href").search(c))
                    },
                    clearIfOverCapacity: function(a, b) {
                        return Object.keys || (Object.keys = function(a) {
                            var b, c = [];
                            for (b in a) Object.prototype.hasOwnProperty.call(a, b) && c.push(b);
                            return c
                        }), Object.keys(a).length > b && (a = {}), a
                    },
                    storePageIn: function(b, c, d, e, f, g) {
                        var h = a("<html></html>").append(a(d));
                        return "undefined" == typeof f && (f = {}), "undefined" == typeof g && (g = c), b[c] = { status: "loaded", title: h.find("title").first().text(), html: h.find("#" + e), doc: d, state: f, destUrl: g }, b
                    },
                    triggerAllAnimationEndEvent: function(b, c) {
                        c = " " + c || "";
                        var d = 0,
                            e = "animationstart webkitAnimationStart oanimationstart MSAnimationStart",
                            f = "animationend webkitAnimationEnd oanimationend MSAnimationEnd",
                            g = "allanimationend",
                            i = function(c) { a(c.delegateTarget).is(b) && (c.stopPropagation(), d++) },
                            j = function(c) { a(c.delegateTarget).is(b) && (c.stopPropagation(), d--, 0 === d && b.trigger(g)) };
                        b.on(e, i), b.on(f, j), b.on("allanimationend" + c, function() { d = 0, h.redraw(b) })
                    },
                    redraw: function(a) { a.height() }
                },
                i = function(c) {
                    if (null !== c.state) {
                        var d = b.location.href,
                            e = a("#" + c.state.id),
                            f = e.data("smoothState"),
                            g = f.href !== d && !h.isHash(d, f.href),
                            i = c.state !== f.cache[f.href].state;
                        (g || i) && (i && f.clear(f.href), f.load(d, !1))
                    }
                },
                j = function(g, i) {
                    var j = a(g),
                        k = j.prop("id"),
                        l = null,
                        m = !1,
                        n = {},
                        o = {},
                        p = b.location.href,
                        q = function(a) { a = a || !1, a && n.hasOwnProperty(a) ? delete n[a] : n = {}, j.data("smoothState").cache = n },
                        r = function(b, c) {
                            c = c || a.noop;
                            var d = h.translate(b);
                            if (n = h.clearIfOverCapacity(n, i.cacheLength), !n.hasOwnProperty(d.url) || "undefined" != typeof d.data) {
                                n[d.url] = { status: "fetching" };
                                var e = a.ajax(d);
                                e.done(function(a) { h.storePageIn(n, d.url, a, k), j.data("smoothState").cache = n }), e.fail(function() { n[d.url].status = "error" }), i.locationHeader && e.always(function(a, b, c) {
                                    var e = a.statusCode ? a : c,
                                        f = e.getResponseHeader(i.locationHeader);
                                    f && (n[d.url].destUrl = f)
                                }), c && e.always(c)
                            }
                        },
                        s = function() {
                            if (l) {
                                var b = a(l, j);
                                if (b.length) {
                                    var c = b.offset().top;
                                    e.scrollTop(c)
                                }
                                l = null
                            }
                        },
                        t = function(d) {
                            var g = "#" + k,
                                h = n[d] ? a(n[d].html.html()) : null;
                            h.length ? (c.title = n[d].title, j.data("smoothState").href = d, i.loadingClass && e.removeClass(i.loadingClass), i.onReady.render(j, h), j.one("ss.onReadyEnd", function() { m = !1, i.onAfter(j, h), i.scroll && s() }), b.setTimeout(function() { j.trigger("ss.onReadyEnd") }, i.onReady.duration)) : !h && i.debug && f ? f.warn("No element with an id of " + g + " in response from " + d + " in " + n) : b.location = d
                        },
                        u = function(a, c, d) {
                            var g = h.translate(a);
                            "undefined" == typeof c && (c = !0), "undefined" == typeof d && (d = !0);
                            var l = !1,
                                m = !1,
                                p = {
                                    loaded: function() {
                                        var a = l ? "ss.onProgressEnd" : "ss.onStartEnd";
                                        if (m && l ? m && t(g.url) : j.one(a, function() { t(g.url), d || q(g.url) }), c) {
                                            var e = n[g.url].destUrl;
                                            o = i.alterChangeState({ id: k }, n[g.url].title, e), n[g.url].state = o, b.history.pushState(o, n[g.url].title, e)
                                        }
                                        m && !d && q(g.url)
                                    },
                                    fetching: function() { l || (l = !0, j.one("ss.onStartEnd", function() { i.loadingClass && e.addClass(i.loadingClass), i.onProgress.render(j), b.setTimeout(function() { j.trigger("ss.onProgressEnd"), m = !0 }, i.onProgress.duration) })), b.setTimeout(function() { n.hasOwnProperty(g.url) && p[n[g.url].status]() }, 10) },
                                    error: function() { i.debug && f ? f.log("There was an error loading: " + g.url) : b.location = g.url }
                                };
                            n.hasOwnProperty(g.url) || r(g), i.onStart.render(j), b.setTimeout(function() { i.scroll && e.scrollTop(0), j.trigger("ss.onStartEnd") }, i.onStart.duration), p[n[g.url].status]()
                        },
                        v = function(b) {
                            var c, d = a(b.currentTarget);
                            h.shouldLoadAnchor(d, i.blacklist, i.hrefRegex) && !m && (b.stopPropagation(), c = h.translate(d.prop("href")), c = i.alterRequest(c), r(c))
                        },
                        w = function(b) {
                            var c = a(b.currentTarget);
                            if (!b.metaKey && !b.ctrlKey && h.shouldLoadAnchor(c, i.blacklist, i.hrefRegex) && (b.stopPropagation(), b.preventDefault(), !z())) {
                                A();
                                var d = h.translate(c.prop("href"));
                                m = !0, l = c.prop("hash"), d = i.alterRequest(d), i.onBefore(c, j), u(d)
                            }
                        },
                        x = function(b) {
                            var c = a(b.currentTarget);
                            if (!c.is(i.blacklist) && (b.preventDefault(), b.stopPropagation(), !z())) {
                                A();
                                var e = { url: c.prop("action"), data: c.serialize(), type: c.prop("method") };
                                m = !0, e = i.alterRequest(e), "get" === e.type.toLowerCase() && (e.url = e.url + "?" + e.data), i.onBefore(c, j), u(e, d, i.allowFormCaching)
                            }
                        },
                        y = 0,
                        z = function() {
                            var a = null === i.repeatDelay,
                                b = parseInt(Date.now()) > y;
                            return !(a || b)
                        },
                        A = function() { y = parseInt(Date.now()) + parseInt(i.repeatDelay) },
                        B = function(a) { i.anchors && (a.on("click", i.anchors, w), i.prefetch && a.find(i.anchors).not(i.prefetchBlacklist).on(i.prefetchOn, null, v)), i.forms && a.on("submit", i.forms, x) },
                        C = function() {
                            var a = j.prop("class");
                            j.removeClass(a), h.redraw(j), j.addClass(a)
                        };
                    return i = a.extend({}, a.fn.smoothState.options, i), null === b.history.state ? (o = i.alterChangeState({ id: k }, c.title, p), b.history.replaceState(o, c.title, p)) : o = {}, h.storePageIn(n, p, c.documentElement.outerHTML, k, o), h.triggerAllAnimationEndEvent(j, "ss.onStartEnd ss.onProgressEnd ss.onEndEnd"), B(j), { href: p, cache: n, clear: q, load: u, fetch: r, restartCSSAnimations: C }
                },
                k = function(b) {
                    return this.each(function() {
                        var c = this.tagName.toLowerCase();
                        this.id && "body" !== c && "html" !== c && !a.data(this, "smoothState") ? a.data(this, "smoothState", new j(this, b)) : !this.id && f ? f.warn("Every smoothState container needs an id but the following one does not have one:", this) : "body" !== c && "html" !== c || !f || f.warn("The smoothstate container cannot be the " + this.tagName + " tag")
                    })
                };
            b.onpopstate = i, a.smoothStateUtility = h, a.fn.smoothState = k, a.fn.smoothState.options = g
        }
    }),
    function(a) {
        var b, c, d, e = a.event,
            f = { _: 0 },
            g = 0;
        b = e.special.throttledresize = {
            setup: function() { a(this).on("resize", b.handler) },
            teardown: function() { a(this).off("resize", b.handler) },
            handler: function(h, i) {
                var j = this,
                    k = arguments;
                c = !0, d || (setInterval(function() { g++, (g > b.threshold && c || i) && (h.type = "throttledresize", e.dispatch.apply(j, k), c = !1, g = 0), g > 9 && (a(f).stop(), d = !1, g = 0) }, 30), d = !0)
            },
            threshold: 0
        }
    }(jQuery),
    function() {
        for (var a = 0, b = ["ms", "moz", "webkit", "o"], c = 0; c < b.length && !window.requestAnimationFrame; ++c) window.requestAnimationFrame = window[b[c] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[b[c] + "CancelAnimationFrame"] || window[b[c] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(b, c) {
            var d = (new Date).getTime(),
                e = Math.max(0, 16 - (d - a)),
                f = window.setTimeout(function() { b(d + e) }, e);
            return a = d + e, f
        }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) { clearTimeout(a) })
    }(), ! function(a, b, c) {
        "use strict";

        function d(c) {
            if (e = b.documentElement, f = b.body, T(), ha = this, c = c || {}, ma = c.constants || {}, c.easing)
                for (var d in c.easing) W[d] = c.easing[d];
            ta = c.edgeStrategy || "set", ka = { beforerender: c.beforerender, render: c.render, keyframe: c.keyframe }, la = c.forceHeight !== !1, la && (Ka = c.scale || 1), na = c.mobileDeceleration || y, pa = c.smoothScrolling !== !1, qa = c.smoothScrollingDuration || A, ra = { targetTop: ha.getScrollTop() }, Sa = (c.mobileCheck || function() {
                return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || a.opera)
            })(), Sa ? (ja = b.getElementById(c.skrollrBody || z), ja && ga(), X(), Ea(e, [s, v], [t])) : Ea(e, [s, u], [t]), ha.refresh(), wa(a, "resize orientationchange", function() {
                var a = e.clientWidth,
                    b = e.clientHeight;
                (b !== Pa || a !== Oa) && (Pa = b, Oa = a, Qa = !0)
            });
            var g = U();
            return function h() { $(), va = g(h) }(), ha
        }
        var e, f, g = {
                get: function() {
                    return ha
                },
                init: function(a) {
                    return ha || new d(a)
                },
                VERSION: "0.6.30"
            },
            h = Object.prototype.hasOwnProperty,
            i = a.Math,
            j = a.getComputedStyle,
            k = "touchstart",
            l = "touchmove",
            m = "touchcancel",
            n = "touchend",
            o = "skrollable",
            p = o + "-before",
            q = o + "-between",
            r = o + "-after",
            s = "skrollr",
            t = "no-" + s,
            u = s + "-desktop",
            v = s + "-mobile",
            w = "linear",
            x = 1e3,
            y = .004,
            z = "skrollr-body",
            A = 200,
            B = "start",
            C = "end",
            D = "center",
            E = "bottom",
            F = "___skrollable_id",
            G = /^(?:input|textarea|button|select)$/i,
            H = /^\s+|\s+$/g,
            I = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
            J = /\s*(@?[\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
            K = /^(@?[a-z\-]+)\[(\w+)\]$/,
            L = /-([a-z0-9_])/g,
            M = function(a, b) {
                return b.toUpperCase()
            },
            N = /[\-+]?[\d]*\.?[\d]+/g,
            O = /\{\?\}/g,
            P = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
            Q = /[a-z\-]+-gradient/g,
            R = "",
            S = "",
            T = function() {
                var a = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
                if (j) {
                    var b = j(f, null);
                    for (var c in b)
                        if (R = c.match(a) || +c == c && b[c].match(a)) break;
                    if (!R) return void(R = S = "");
                    R = R[0], "-" === R.slice(0, 1) ? (S = R, R = { "-webkit-": "webkit", "-moz-": "Moz", "-ms-": "ms", "-o-": "O" }[R]) : S = "-" + R.toLowerCase() + "-"
                }
            },
            U = function() {
                var b = a.requestAnimationFrame || a[R.toLowerCase() + "RequestAnimationFrame"],
                    c = Ha();
                return (Sa || !b) && (b = function(b) {
                    var d = Ha() - c,
                        e = i.max(0, 1e3 / 60 - d);
                    return a.setTimeout(function() { c = Ha(), b() }, e)
                }), b
            },
            V = function() {
                var b = a.cancelAnimationFrame || a[R.toLowerCase() + "CancelAnimationFrame"];
                return (Sa || !b) && (b = function(b) {
                    return a.clearTimeout(b)
                }), b
            },
            W = {
                begin: function() {
                    return 0
                },
                end: function() {
                    return 1
                },
                linear: function(a) {
                    return a
                },
                quadratic: function(a) {
                    return a * a
                },
                cubic: function(a) {
                    return a * a * a
                },
                swing: function(a) {
                    return -i.cos(a * i.PI) / 2 + .5
                },
                sqrt: function(a) {
                    return i.sqrt(a)
                },
                outCubic: function(a) {
                    return i.pow(a - 1, 3) + 1
                },
                bounce: function(a) {
                    var b;
                    if (.5083 >= a) b = 3;
                    else if (.8489 >= a) b = 9;
                    else if (.96208 >= a) b = 27;
                    else {
                        if (!(.99981 >= a)) return 1;
                        b = 91
                    }
                    return 1 - i.abs(3 * i.cos(a * b * 1.028) / b)
                }
            };
        d.prototype.refresh = function(a) {
            var d, e, f = !1;
            for (a === c ? (f = !0, ia = [], Ra = 0, a = b.getElementsByTagName("*")) : a.length === c && (a = [a]), d = 0, e = a.length; e > d; d++) {
                var g = a[d],
                    h = g,
                    i = [],
                    j = pa,
                    k = ta,
                    l = !1;
                if (f && F in g && delete g[F], g.attributes) {
                    for (var m = 0, n = g.attributes.length; n > m; m++) {
                        var p = g.attributes[m];
                        if ("data-anchor-target" !== p.name)
                            if ("data-smooth-scrolling" !== p.name)
                                if ("data-edge-strategy" !== p.name)
                                    if ("data-emit-events" !== p.name) {
                                        var q = p.name.match(I);
                                        if (null !== q) {
                                            var r = { props: p.value, element: g, eventType: p.name.replace(L, M) };
                                            i.push(r);
                                            var s = q[1];
                                            s && (r.constant = s.substr(1));
                                            var t = q[2];
                                            /p$/.test(t) ? (r.isPercentage = !0, r.offset = (0 | t.slice(0, -1)) / 100) : r.offset = 0 | t;
                                            var u = q[3],
                                                v = q[4] || u;
                                            u && u !== B && u !== C ? (r.mode = "relative", r.anchors = [u, v]) : (r.mode = "absolute", u === C ? r.isEnd = !0 : r.isPercentage || (r.offset = r.offset * Ka))
                                        }
                                    } else l = !0;
                        else k = p.value;
                        else j = "off" !== p.value;
                        else if (h = b.querySelector(p.value), null === h) throw 'Unable to find anchor target "' + p.value + '"'
                    }
                    if (i.length) {
                        var w, x, y;
                        !f && F in g ? (y = g[F], w = ia[y].styleAttr, x = ia[y].classAttr) : (y = g[F] = Ra++, w = g.style.cssText, x = Da(g)), ia[y] = { element: g, styleAttr: w, classAttr: x, anchorTarget: h, keyFrames: i, smoothScrolling: j, edgeStrategy: k, emitEvents: l, lastFrameIndex: -1 }, Ea(g, [o], [])
                    }
                }
            }
            for (Aa(), d = 0, e = a.length; e > d; d++) {
                var z = ia[a[d][F]];
                z !== c && (_(z), ba(z))
            }
            return ha
        }, d.prototype.relativeToAbsolute = function(a, b, c) {
            var d = e.clientHeight,
                f = a.getBoundingClientRect(),
                g = f.top,
                h = f.bottom - f.top;
            return b === E ? g -= d : b === D && (g -= d / 2), c === E ? g += h : c === D && (g += h / 2), g += ha.getScrollTop(), g + .5 | 0
        }, d.prototype.animateTo = function(a, b) {
            b = b || {};
            var d = Ha(),
                e = ha.getScrollTop(),
                f = b.duration === c ? x : b.duration;
            return oa = { startTop: e, topDiff: a - e, targetTop: a, duration: f, startTime: d, endTime: d + f, easing: W[b.easing || w], done: b.done }, oa.topDiff || (oa.done && oa.done.call(ha, !1), oa = c), ha
        }, d.prototype.stopAnimateTo = function() { oa && oa.done && oa.done.call(ha, !0), oa = c }, d.prototype.isAnimatingTo = function() {
            return !!oa
        }, d.prototype.isMobile = function() {
            return Sa
        }, d.prototype.setScrollTop = function(b, c) {
            return sa = c === !0, Sa ? Ta = i.min(i.max(b, 0), Ja) : a.scrollTo(0, b), ha
        }, d.prototype.getScrollTop = function() {
            return Sa ? Ta : a.pageYOffset || e.scrollTop || f.scrollTop || 0
        }, d.prototype.getMaxScrollTop = function() {
            return Ja
        }, d.prototype.on = function(a, b) {
            return ka[a] = b, ha
        }, d.prototype.off = function(a) {
            return delete ka[a], ha
        }, d.prototype.destroy = function() {
            var a = V();
            a(va), ya(), Ea(e, [t], [s, u, v]);
            for (var b = 0, d = ia.length; d > b; b++) fa(ia[b].element);
            e.style.overflow = f.style.overflow = "", e.style.height = f.style.height = "", ja && g.setStyle(ja, "transform", "none"), ha = c, ja = c, ka = c, la = c, Ja = 0, Ka = 1, ma = c, na = c, La = "down", Ma = -1, Oa = 0, Pa = 0, Qa = !1, oa = c, pa = c, qa = c, ra = c, sa = c, Ra = 0, ta = c, Sa = !1, Ta = 0, ua = c
        };
        var X = function() {
                var d, g, h, j, o, p, q, r, s, t, u, v;
                wa(e, [k, l, m, n].join(" "), function(a) {
                    var e = a.changedTouches[0];
                    for (j = a.target; 3 === j.nodeType;) j = j.parentNode;
                    switch (o = e.clientY, p = e.clientX, t = a.timeStamp, G.test(j.tagName) || a.preventDefault(), a.type) {
                        case k:
                            d && d.blur(), ha.stopAnimateTo(), d = j, g = q = o, h = p, s = t;
                            break;
                        case l:
                            G.test(j.tagName) && b.activeElement !== j && a.preventDefault(), r = o - q, v = t - u, ha.setScrollTop(Ta - r, !0), q = o, u = t;
                            break;
                        default:
                        case m:
                        case n:
                            var f = g - o,
                                w = h - p,
                                x = w * w + f * f;
                            if (49 > x) {
                                if (!G.test(d.tagName)) {
                                    d.focus();
                                    var y = b.createEvent("MouseEvents");
                                    y.initMouseEvent("click", !0, !0, a.view, 1, e.screenX, e.screenY, e.clientX, e.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, null), d.dispatchEvent(y)
                                }
                                return
                            }
                            d = c;
                            var z = r / v;
                            z = i.max(i.min(z, 3), -3);
                            var A = i.abs(z / na),
                                B = z * A + .5 * na * A * A,
                                C = ha.getScrollTop() - B,
                                D = 0;
                            C > Ja ? (D = (Ja - C) / B, C = Ja) : 0 > C && (D = -C / B, C = 0), A *= 1 - D, ha.animateTo(C + .5 | 0, { easing: "outCubic", duration: A })
                    }
                }), a.scrollTo(0, 0), e.style.overflow = f.style.overflow = "hidden"
            },
            Y = function() {
                var a, b, c, d, f, g, h, j, k, l, m, n = e.clientHeight,
                    o = Ba();
                for (j = 0, k = ia.length; k > j; j++)
                    for (a = ia[j], b = a.element, c = a.anchorTarget, d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], l = h.offset, m = o[h.constant] || 0, h.frame = l, h.isPercentage && (l *= n, h.frame = l), "relative" === h.mode && (fa(b), h.frame = ha.relativeToAbsolute(c, h.anchors[0], h.anchors[1]) - l, fa(b, !0)), h.frame += m, la && !h.isEnd && h.frame > Ja && (Ja = h.frame);
                for (Ja = i.max(Ja, Ca()), j = 0, k = ia.length; k > j; j++) {
                    for (a = ia[j], d = a.keyFrames, f = 0, g = d.length; g > f; f++) h = d[f], m = o[h.constant] || 0, h.isEnd && (h.frame = Ja - h.offset + m);
                    a.keyFrames.sort(Ia)
                }
            },
            Z = function(a, b) {
                for (var c = 0, d = ia.length; d > c; c++) {
                    var e, f, i = ia[c],
                        j = i.element,
                        k = i.smoothScrolling ? a : b,
                        l = i.keyFrames,
                        m = l.length,
                        n = l[0],
                        s = l[l.length - 1],
                        t = k < n.frame,
                        u = k > s.frame,
                        v = t ? n : s,
                        w = i.emitEvents,
                        x = i.lastFrameIndex;
                    if (t || u) {
                        if (t && -1 === i.edge || u && 1 === i.edge) continue;
                        switch (t ? (Ea(j, [p], [r, q]), w && x > -1 && (za(j, n.eventType, La), i.lastFrameIndex = -1)) : (Ea(j, [r], [p, q]), w && m > x && (za(j, s.eventType, La), i.lastFrameIndex = m)), i.edge = t ? -1 : 1, i.edgeStrategy) {
                            case "reset":
                                fa(j);
                                continue;
                            case "ease":
                                k = v.frame;
                                break;
                            default:
                            case "set":
                                var y = v.props;
                                for (e in y) h.call(y, e) && (f = ea(y[e].value), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f));
                                continue
                        }
                    } else 0 !== i.edge && (Ea(j, [o, q], [p, r]), i.edge = 0);
                    for (var z = 0; m - 1 > z; z++)
                        if (k >= l[z].frame && k <= l[z + 1].frame) {
                            var A = l[z],
                                B = l[z + 1];
                            for (e in A.props)
                                if (h.call(A.props, e)) {
                                    var C = (k - A.frame) / (B.frame - A.frame);
                                    C = A.props[e].easing(C), f = da(A.props[e].value, B.props[e].value, C), f = ea(f), 0 === e.indexOf("@") ? j.setAttribute(e.substr(1), f) : g.setStyle(j, e, f)
                                }
                            w && x !== z && ("down" === La ? za(j, A.eventType, La) : za(j, B.eventType, La), i.lastFrameIndex = z);
                            break
                        }
                }
            },
            $ = function() {
                Qa && (Qa = !1, Aa());
                var a, b, d = ha.getScrollTop(),
                    e = Ha();
                if (oa) e >= oa.endTime ? (d = oa.targetTop, a = oa.done, oa = c) : (b = oa.easing((e - oa.startTime) / oa.duration), d = oa.startTop + b * oa.topDiff | 0), ha.setScrollTop(d, !0);
                else if (!sa) {
                    var f = ra.targetTop - d;
                    f && (ra = { startTop: Ma, topDiff: d - Ma, targetTop: d, startTime: Na, endTime: Na + qa }), e <= ra.endTime && (b = W.sqrt((e - ra.startTime) / qa), d = ra.startTop + b * ra.topDiff | 0)
                }
                if (sa || Ma !== d) {
                    La = d > Ma ? "down" : Ma > d ? "up" : La, sa = !1;
                    var h = { curTop: d, lastTop: Ma, maxTop: Ja, direction: La },
                        i = ka.beforerender && ka.beforerender.call(ha, h);
                    i !== !1 && (Z(d, ha.getScrollTop()), Sa && ja && g.setStyle(ja, "transform", "translate(0, " + -Ta + "px) " + ua), Ma = d, ka.render && ka.render.call(ha, h)), a && a.call(ha, !1)
                }
                Na = e
            },
            _ = function(a) {
                for (var b = 0, c = a.keyFrames.length; c > b; b++) {
                    for (var d, e, f, g, h = a.keyFrames[b], i = {}; null !== (g = J.exec(h.props));) f = g[1], e = g[2], d = f.match(K), null !== d ? (f = d[1], d = d[2]) : d = w, e = e.indexOf("!") ? aa(e) : [e.slice(1)], i[f] = { value: e, easing: W[d] };
                    h.props = i
                }
            },
            aa = function(a) {
                var b = [];
                return P.lastIndex = 0, a = a.replace(P, function(a) {
                    return a.replace(N, function(a) {
                        return a / 255 * 100 + "%"
                    })
                }), S && (Q.lastIndex = 0, a = a.replace(Q, function(a) {
                    return S + a
                })), a = a.replace(N, function(a) {
                    return b.push(+a), "{?}"
                }), b.unshift(a), b
            },
            ba = function(a) {
                var b, c, d = {};
                for (b = 0, c = a.keyFrames.length; c > b; b++) ca(a.keyFrames[b], d);
                for (d = {}, b = a.keyFrames.length - 1; b >= 0; b--) ca(a.keyFrames[b], d)
            },
            ca = function(a, b) {
                var c;
                for (c in b) h.call(a.props, c) || (a.props[c] = b[c]);
                for (c in a.props) b[c] = a.props[c]
            },
            da = function(a, b, c) {
                var d, e = a.length;
                if (e !== b.length) throw "Can't interpolate between \"" + a[0] + '" and "' + b[0] + '"';
                var f = [a[0]];
                for (d = 1; e > d; d++) f[d] = a[d] + (b[d] - a[d]) * c;
                return f
            },
            ea = function(a) {
                var b = 1;
                return O.lastIndex = 0, a[0].replace(O, function() {
                    return a[b++]
                })
            },
            fa = function(a, b) {
                a = [].concat(a);
                for (var c, d, e = 0, f = a.length; f > e; e++) d = a[e], c = ia[d[F]], c && (b ? (d.style.cssText = c.dirtyStyleAttr, Ea(d, c.dirtyClassAttr)) : (c.dirtyStyleAttr = d.style.cssText, c.dirtyClassAttr = Da(d), d.style.cssText = c.styleAttr, Ea(d, c.classAttr)))
            },
            ga = function() {
                ua = "translateZ(0)", g.setStyle(ja, "transform", ua);
                var a = j(ja),
                    b = a.getPropertyValue("transform"),
                    c = a.getPropertyValue(S + "transform"),
                    d = b && "none" !== b || c && "none" !== c;
                d || (ua = "")
            };
        g.setStyle = function(a, b, c) {
            var d = a.style;
            if (b = b.replace(L, M).replace("-", ""), "zIndex" === b) isNaN(c) ? d[b] = c : d[b] = "" + (0 | c);
            else if ("float" === b) d.styleFloat = d.cssFloat = c;
            else try { R && (d[R + b.slice(0, 1).toUpperCase() + b.slice(1)] = c), d[b] = c } catch (e) {}
        };
        var ha, ia, ja, ka, la, ma, na, oa, pa, qa, ra, sa, ta, ua, va, wa = g.addEvent = function(b, c, d) {
                var e = function(b) {
                    return b = b || a.event, b.target || (b.target = b.srcElement), b.preventDefault || (b.preventDefault = function() { b.returnValue = !1, b.defaultPrevented = !0 }), d.call(this, b)
                };
                c = c.split(" ");
                for (var f, g = 0, h = c.length; h > g; g++) f = c[g], b.addEventListener ? b.addEventListener(f, d, !1) : b.attachEvent("on" + f, e), Ua.push({ element: b, name: f, listener: d })
            },
            xa = g.removeEvent = function(a, b, c) {
                b = b.split(" ");
                for (var d = 0, e = b.length; e > d; d++) a.removeEventListener ? a.removeEventListener(b[d], c, !1) : a.detachEvent("on" + b[d], c)
            },
            ya = function() {
                for (var a, b = 0, c = Ua.length; c > b; b++) a = Ua[b], xa(a.element, a.name, a.listener);
                Ua = []
            },
            za = function(a, b, c) { ka.keyframe && ka.keyframe.call(ha, a, b, c) },
            Aa = function() {
                var a = ha.getScrollTop();
                Ja = 0, la && !Sa && (f.style.height = ""), Y(), la && !Sa && (f.style.height = Ja + e.clientHeight + "px"), Sa ? ha.setScrollTop(i.min(ha.getScrollTop(), Ja)) : ha.setScrollTop(a, !0), sa = !0
            },
            Ba = function() {
                var a, b, c = e.clientHeight,
                    d = {};
                for (a in ma) b = ma[a], "function" == typeof b ? b = b.call(ha) : /p$/.test(b) && (b = b.slice(0, -1) / 100 * c), d[a] = b;
                return d
            },
            Ca = function() {
                var a, b = 0;
                return ja && (b = i.max(ja.offsetHeight, ja.scrollHeight)), a = i.max(b, f.scrollHeight, f.offsetHeight, e.scrollHeight, e.offsetHeight, e.clientHeight), a - e.clientHeight
            },
            Da = function(b) {
                var c = "className";
                return a.SVGElement && b instanceof a.SVGElement && (b = b[c], c = "baseVal"), b[c]
            },
            Ea = function(b, d, e) {
                var f = "className";
                if (a.SVGElement && b instanceof a.SVGElement && (b = b[f], f = "baseVal"),
                    e === c) return void(b[f] = d);
                for (var g = b[f], h = 0, i = e.length; i > h; h++) g = Ga(g).replace(Ga(e[h]), " ");
                g = Fa(g);
                for (var j = 0, k = d.length; k > j; j++) - 1 === Ga(g).indexOf(Ga(d[j])) && (g += " " + d[j]);
                b[f] = Fa(g)
            },
            Fa = function(a) {
                return a.replace(H, "")
            },
            Ga = function(a) {
                return " " + a + " "
            },
            Ha = Date.now || function() {
                return +new Date
            },
            Ia = function(a, b) {
                return a.frame - b.frame
            },
            Ja = 0,
            Ka = 1,
            La = "down",
            Ma = -1,
            Na = Ha(),
            Oa = 0,
            Pa = 0,
            Qa = !1,
            Ra = 0,
            Sa = !1,
            Ta = 0,
            Ua = [];
        "function" == typeof define && define.amd ? define([], function() {
            return g
        }) : "undefined" != typeof module && module.exports ? module.exports = g : a.skrollr = g
    }(window, document), ! function(a, b) {
        "function" == typeof define && define.amd ? define([], function() {
            return a.svg4everybody = b()
        }) : "object" == typeof exports ? module.exports = b() : a.svg4everybody = b()
    }(this, function() {
        function a(a, b) {
            if (b) {
                var c = !a.getAttribute("viewBox") && b.getAttribute("viewBox"),
                    d = document.createDocumentFragment(),
                    e = b.cloneNode(!0);
                for (c && a.setAttribute("viewBox", c); e.childNodes.length;) d.appendChild(e.firstChild);
                a.appendChild(d)
            }
        }

        function b(b) {
            b.onreadystatechange = function() {
                if (4 === b.readyState) {
                    var c = document.createElement("x");
                    c.innerHTML = b.responseText, b.s.splice(0).map(function(b) { a(b[0], c.querySelector("#" + b[1].replace(/(\W)/g, "\\$1"))) })
                }
            }, b.onreadystatechange()
        }

        function c(c) {
            function d() {
                for (var c, j, k = 0; k < e.length;)
                    if (c = e[k], j = c.parentNode, j && /svg/i.test(j.nodeName)) {
                        var l = c.getAttribute("xlink:href");
                        if (f && (!g || g(l, j, c))) {
                            var m = l.split("#"),
                                n = m[0],
                                o = m[1];
                            if (j.removeChild(c), n.length) {
                                var p = i[n] = i[n] || new XMLHttpRequest;
                                p.s || (p.s = [], p.open("GET", n), p.send()), p.s.push([j, o]), b(p)
                            } else a(j, document.getElementById(o))
                        }
                    } else k += 1;
                h(d, 17)
            }
            c = c || {};
            var e = document.getElementsByTagName("use"),
                f = "polyfill" in c ? c.polyfill : /\bEdge\/12\b|\bTrident\/[567]\b|\bVersion\/7.0 Safari\b/.test(navigator.userAgent) || (navigator.userAgent.match(/AppleWebKit\/(\d+)/) || [])[1] < 537,
                g = c.validate,
                h = window.requestAnimationFrame || setTimeout,
                i = {};
            f && d()
        }
        return c
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    "use strict";
    var a = Math.PI / 180,
        b = 180 / Math.PI,
        c = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        d = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        e = /[achlmqstvz]/gi,
        f = _gsScope.TweenLite,
        g = "MorphSVGPlugin",
        h = String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109),
        i = (String.fromCharCode(47, 114, 101, 113, 117, 105, 114, 101, 115, 45, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 47), function(a) {
            for (var b = -1 !== (window ? window.location.href : "").indexOf(String.fromCharCode(103, 114, 101, 101, 110, 115, 111, 99, 107)) && -1 !== a.indexOf(String.fromCharCode(108, 111, 99, 97, 108, 104, 111, 115, 116)), c = [h, String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 105, 111), String.fromCharCode(99, 111, 100, 101, 112, 101, 110, 46, 100, 101, 118), String.fromCharCode(99, 115, 115, 45, 116, 114, 105, 99, 107, 115, 46, 99, 111, 109), String.fromCharCode(99, 100, 112, 110, 46, 105, 111), String.fromCharCode(103, 97, 110, 110, 111, 110, 46, 116, 118), String.fromCharCode(99, 111, 100, 101, 99, 97, 110, 121, 111, 110, 46, 110, 101, 116), String.fromCharCode(116, 104, 101, 109, 101, 102, 111, 114, 101, 115, 116, 46, 110, 101, 116), String.fromCharCode(99, 101, 114, 101, 98, 114, 97, 120, 46, 99, 111, 46, 117, 107), String.fromCharCode(116, 121, 109, 112, 97, 110, 117, 115, 46, 110, 101, 116), String.fromCharCode(116, 119, 101, 101, 110, 109, 97, 120, 46, 99, 111, 109), String.fromCharCode(116, 119, 101, 101, 110, 108, 105, 116, 101, 46, 99, 111, 109), String.fromCharCode(112, 108, 110, 107, 114, 46, 99, 111), String.fromCharCode(104, 111, 116, 106, 97, 114, 46, 99, 111, 109), String.fromCharCode(106, 115, 102, 105, 100, 100, 108, 101, 46, 110, 101, 116)], d = c.length; --d > -1;)
                if (-1 !== a.indexOf(c[d])) return !0;
            return b && window && window.console && console.log(String.fromCharCode(87, 65, 82, 78, 73, 78, 71, 58, 32, 97, 32, 115, 112, 101, 99, 105, 97, 108, 32, 118, 101, 114, 115, 105, 111, 110, 32, 111, 102, 32) + g + String.fromCharCode(32, 105, 115, 32, 114, 117, 110, 110, 105, 110, 103, 32, 108, 111, 99, 97, 108, 108, 121, 44, 32, 98, 117, 116, 32, 105, 116, 32, 119, 105, 108, 108, 32, 110, 111, 116, 32, 119, 111, 114, 107, 32, 111, 110, 32, 97, 32, 108, 105, 118, 101, 32, 100, 111, 109, 97, 105, 110, 32, 98, 101, 99, 97, 117, 115, 101, 32, 105, 116, 32, 105, 115, 32, 97, 32, 109, 101, 109, 98, 101, 114, 115, 104, 105, 112, 32, 98, 101, 110, 101, 102, 105, 116, 32, 111, 102, 32, 67, 108, 117, 98, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 46, 32, 80, 108, 101, 97, 115, 101, 32, 115, 105, 103, 110, 32, 117, 112, 32, 97, 116, 32, 104, 116, 116, 112, 58, 47, 47, 103, 114, 101, 101, 110, 115, 111, 99, 107, 46, 99, 111, 109, 47, 99, 108, 117, 98, 47, 32, 97, 110, 100, 32, 116, 104, 101, 110, 32, 100, 111, 119, 110, 108, 111, 97, 100, 32, 116, 104, 101, 32, 39, 114, 101, 97, 108, 39, 32, 118, 101, 114, 115, 105, 111, 110, 32, 102, 114, 111, 109, 32, 121, 111, 117, 114, 32, 71, 114, 101, 101, 110, 83, 111, 99, 107, 32, 97, 99, 99, 111, 117, 110, 116, 32, 119, 104, 105, 99, 104, 32, 104, 97, 115, 32, 110, 111, 32, 115, 117, 99, 104, 32, 108, 105, 109, 105, 116, 97, 116, 105, 111, 110, 115, 46, 32, 84, 104, 101, 32, 102, 105, 108, 101, 32, 121, 111, 117, 39, 114, 101, 32, 117, 115, 105, 110, 103, 32, 119, 97, 115, 32, 108, 105, 107, 101, 108, 121, 32, 100, 111, 119, 110, 108, 111, 97, 100, 101, 100, 32, 102, 114, 111, 109, 32, 101, 108, 115, 101, 119, 104, 101, 114, 101, 32, 111, 110, 32, 116, 104, 101, 32, 119, 101, 98, 32, 97, 110, 100, 32, 105, 115, 32, 114, 101, 115, 116, 114, 105, 99, 116, 101, 100, 32, 116, 111, 32, 108, 111, 99, 97, 108, 32, 117, 115, 101, 32, 111, 114, 32, 111, 110, 32, 115, 105, 116, 101, 115, 32, 108, 105, 107, 101, 32, 99, 111, 100, 101, 112, 101, 110, 46, 105, 111, 46)), b
        }(window ? window.location.host : "")),
        j = function(a) { window.console && console.log(a) },
        k = function(b, c) {
            var d, e, f, g, h, i, j = Math.ceil(Math.abs(c) / 90),
                k = 0,
                l = [];
            for (b *= a, c *= a, d = c / j, e = 4 / 3 * Math.sin(d / 2) / (1 + Math.cos(d / 2)), i = 0; j > i; i++) f = b + i * d, g = Math.cos(f), h = Math.sin(f), l[k++] = g - e * h, l[k++] = h + e * g, f += d, g = Math.cos(f), h = Math.sin(f), l[k++] = g + e * h, l[k++] = h - e * g, l[k++] = g, l[k++] = h;
            return l
        },
        l = function(c, d, e, f, g, h, i, j, l) {
            if (c !== j || d !== l) {
                e = Math.abs(e), f = Math.abs(f);
                var m = g % 360 * a,
                    n = Math.cos(m),
                    o = Math.sin(m),
                    p = (c - j) / 2,
                    q = (d - l) / 2,
                    r = n * p + o * q,
                    s = -o * p + n * q,
                    t = e * e,
                    u = f * f,
                    v = r * r,
                    w = s * s,
                    x = v / t + w / u;
                x > 1 && (e = Math.sqrt(x) * e, f = Math.sqrt(x) * f, t = e * e, u = f * f);
                var y = h === i ? -1 : 1,
                    z = (t * u - t * w - u * v) / (t * w + u * v);
                0 > z && (z = 0);
                var A = y * Math.sqrt(z),
                    B = A * (e * s / f),
                    C = A * -(f * r / e),
                    D = (c + j) / 2,
                    E = (d + l) / 2,
                    F = D + (n * B - o * C),
                    G = E + (o * B + n * C),
                    H = (r - B) / e,
                    I = (s - C) / f,
                    J = (-r - B) / e,
                    K = (-s - C) / f,
                    L = Math.sqrt(H * H + I * I),
                    M = H;
                y = 0 > I ? -1 : 1;
                var N = y * Math.acos(M / L) * b;
                L = Math.sqrt((H * H + I * I) * (J * J + K * K)), M = H * J + I * K, y = 0 > H * K - I * J ? -1 : 1;
                var O = y * Math.acos(M / L) * b;
                !i && O > 0 ? O -= 360 : i && 0 > O && (O += 360), O %= 360, N %= 360;
                var P, Q, R, S = k(N, O),
                    T = n * e,
                    U = o * e,
                    V = o * -f,
                    W = n * f,
                    X = S.length - 2;
                for (P = 0; X > P; P += 2) Q = S[P], R = S[P + 1], S[P] = Q * T + R * V + F, S[P + 1] = Q * U + R * W + G;
                return S[S.length - 2] = j, S[S.length - 1] = l, S
            }
        },
        m = function(a) {
            var b, d, e, f, g, h, i, k, m, n, o, p, q, r = (a + "").match(c) || [],
                s = [],
                t = 0,
                u = 0,
                v = r.length,
                w = 2,
                x = 0;
            if (!a || !isNaN(r[0]) || isNaN(r[1])) return j("ERROR: malformed path data: " + a), s;
            for (b = 0; v > b; b++)
                if (q = g, isNaN(r[b]) ? (g = r[b].toUpperCase(), h = g !== r[b]) : b--, e = +r[b + 1], f = +r[b + 2], h && (e += t, f += u), 0 === b && (k = e, m = f), "M" === g) i && i.length < 8 && (s.length -= 1, w = 0), t = k = e, u = m = f, i = [e, f], x += w, w = 2, s.push(i), b += 2, g = "L";
                else if ("C" === g) i || (i = [0, 0]), i[w++] = e, i[w++] = f, h || (t = u = 0), i[w++] = t + 1 * r[b + 3], i[w++] = u + 1 * r[b + 4], i[w++] = t += 1 * r[b + 5], i[w++] = u += 1 * r[b + 6], b += 6;
            else if ("S" === g) "C" === q || "S" === q ? (n = t - i[w - 4], o = u - i[w - 3], i[w++] = t + n, i[w++] = u + o) : (i[w++] = t, i[w++] = u), i[w++] = e, i[w++] = f, h || (t = u = 0), i[w++] = t += 1 * r[b + 3], i[w++] = u += 1 * r[b + 4], b += 4;
            else if ("Q" === g) n = e - t, o = f - u, i[w++] = t + 2 * n / 3, i[w++] = u + 2 * o / 3, h || (t = u = 0), t += 1 * r[b + 3], u += 1 * r[b + 4], n = e - t, o = f - u, i[w++] = t + 2 * n / 3, i[w++] = u + 2 * o / 3, i[w++] = t, i[w++] = u, b += 4;
            else if ("T" === g) n = t - i[w - 4], o = u - i[w - 3], i[w++] = t + n, i[w++] = u + o, n = t + 1.5 * n - e, o = u + 1.5 * o - f, i[w++] = e + 2 * n / 3, i[w++] = f + 2 * o / 3, i[w++] = t = e, i[w++] = u = f, b += 2;
            else if ("H" === g) f = u, i[w++] = t + (e - t) / 3, i[w++] = u + (f - u) / 3, i[w++] = t + 2 * (e - t) / 3, i[w++] = u + 2 * (f - u) / 3, i[w++] = t = e, i[w++] = f, b += 1;
            else if ("V" === g) f = e, e = t, h && (f += u - t), i[w++] = e, i[w++] = u + (f - u) / 3, i[w++] = e, i[w++] = u + 2 * (f - u) / 3, i[w++] = e, i[w++] = u = f, b += 1;
            else if ("L" === g || "Z" === g) "Z" === g && (e = k, f = m, i.closed = !0), ("L" === g || Math.abs(t - e) > .5 || Math.abs(u - f) > .5) && (i[w++] = t + (e - t) / 3, i[w++] = u + (f - u) / 3, i[w++] = t + 2 * (e - t) / 3, i[w++] = u + 2 * (f - u) / 3, i[w++] = e, i[w++] = f, "L" === g && (b += 2)), t = e, u = f;
            else if ("A" === g) {
                for (p = l(t, u, 1 * r[b + 1], 1 * r[b + 2], 1 * r[b + 3], 1 * r[b + 4], 1 * r[b + 5], (h ? t : 0) + 1 * r[b + 6], (h ? u : 0) + 1 * r[b + 7]), d = 0; d < p.length; d++) i[w++] = p[d];
                t = i[w - 2], u = i[w - 1], b += 7
            } else j("Error: malformed path data: " + a);
            return s.totalPoints = x + w, s
        },
        n = function(a, b) {
            var c, d, e, f, g, h, i, j, k, l, m, n, o, p, q = 0,
                r = .999999,
                s = a.length,
                t = b / ((s - 2) / 6);
            for (o = 2; s > o; o += 6)
                for (q += t; q > r;) c = a[o - 2], d = a[o - 1], e = a[o], f = a[o + 1], g = a[o + 2], h = a[o + 3], i = a[o + 4], j = a[o + 5], p = 1 / (Math.floor(q) + 1), k = c + (e - c) * p, m = e + (g - e) * p, k += (m - k) * p, m += (g + (i - g) * p - m) * p, l = d + (f - d) * p, n = f + (h - f) * p, l += (n - l) * p, n += (h + (j - h) * p - n) * p, a.splice(o, 4, c + (e - c) * p, d + (f - d) * p, k, l, k + (m - k) * p, l + (n - l) * p, m, n, g + (i - g) * p, h + (j - h) * p), o += 6, s += 6, q--;
            return a
        },
        o = function(a) {
            var b, c, d, e, f = "",
                g = a.length,
                h = 100;
            for (c = 0; g > c; c++) {
                for (e = a[c], f += "M" + e[0] + "," + e[1] + " C", b = e.length, d = 2; b > d; d++) f += (e[d++] * h | 0) / h + "," + (e[d++] * h | 0) / h + " " + (e[d++] * h | 0) / h + "," + (e[d++] * h | 0) / h + " " + (e[d++] * h | 0) / h + "," + (e[d] * h | 0) / h + " ";
                e.closed && (f += "z")
            }
            return f
        },
        p = function(a) {
            for (var b = [], c = a.length - 1, d = 0; --c > -1;) b[d++] = a[c], b[d++] = a[c + 1], c--;
            for (c = 0; d > c; c++) a[c] = b[c];
            a.reversed = !a.reversed
        },
        q = function(a) {
            var b, c = a.length,
                d = 0,
                e = 0;
            for (b = 0; c > b; b++) d += a[b++], e += a[b];
            return [d / (c / 2), e / (c / 2)]
        },
        r = function(a) {
            var b, c, d, e = a.length,
                f = a[0],
                g = f,
                h = a[1],
                i = h;
            for (d = 6; e > d; d += 6) b = a[d], c = a[d + 1], b > f ? f = b : g > b && (g = b), c > h ? h = c : i > c && (i = c);
            return a.centerX = (f + g) / 2, a.centerY = (h + i) / 2, a.size = (f - g) * (h - i)
        },
        s = function(a) {
            for (var b, c, d, e, f, g = a.length, h = a[0][0], i = h, j = a[0][1], k = j; --g > -1;)
                for (f = a[g], b = f.length, e = 6; b > e; e += 6) c = f[e], d = f[e + 1], c > h ? h = c : i > c && (i = c), d > j ? j = d : k > d && (k = d);
            return a.centerX = (h + i) / 2, a.centerY = (j + k) / 2, a.size = (h - i) * (j - k)
        },
        t = function(a, b) {
            return b.length - a.length
        },
        u = function(a, b) {
            var c = a.size || r(a),
                d = b.size || r(b);
            return Math.abs(d - c) < (c + d) / 20 ? b.centerX - a.centerX || b.centerY - a.centerY : d - c
        },
        v = function(a, b) {
            var c, d, e = a.slice(0),
                f = a.length,
                g = f - 2;
            for (b = 0 | b, c = 0; f > c; c++) d = (c + b) % g, a[c++] = e[d], a[c] = e[d + 1]
        },
        w = function(a, b, c, d, e) {
            var f, g, h, i, j = a.length,
                k = 0,
                l = j - 2;
            for (c *= 6, g = 0; j > g; g += 6) f = (g + c) % l, i = a[f] - (b[g] - d), h = a[f + 1] - (b[g + 1] - e), k += Math.sqrt(h * h + i * i);
            return k
        },
        x = function(a, b, c) {
            var d, e, f, g = a.length,
                h = q(a),
                i = q(b),
                j = i[0] - h[0],
                k = i[1] - h[1],
                l = w(a, b, 0, j, k),
                m = 0;
            for (f = 6; g > f; f += 6) e = w(a, b, f / 6, j, k), l > e && (l = e, m = f);
            if (c)
                for (d = a.slice(0), p(d), f = 6; g > f; f += 6) e = w(d, b, f / 6, j, k), l > e && (l = e, m = -f);
            return m / 6
        },
        y = function(a, b, c) {
            for (var d, e, f, g, h, i, j = a.length, k = 99999999999, l = 0, m = 0; --j > -1;)
                for (d = a[j], i = d.length, h = 0; i > h; h += 6) e = d[h] - b, f = d[h + 1] - c, g = Math.sqrt(e * e + f * f), k > g && (k = g, l = d[h], m = d[h + 1]);
            return [l, m]
        },
        z = function(a, b, c, d, e, f) {
            var g, h, i, j, k, l = b.length,
                m = 0,
                n = Math.min(a.size || r(a), b[c].size || r(b[c])) * d,
                o = 999999999999,
                p = a.centerX + e,
                q = a.centerY + f;
            for (h = c; l > h && (g = b[h].size || r(b[h]), !(n > g)); h++) i = b[h].centerX - p, j = b[h].centerY - q, k = Math.sqrt(i * i + j * j), o > k && (m = h, o = k);
            return k = b[m], b.splice(m, 1), k
        },
        A = function(a, b, c, d) {
            var e, f, g, h, i, k, l, m = b.length - a.length,
                o = m > 0 ? b : a,
                q = m > 0 ? a : b,
                w = 0,
                A = "complexity" === d ? t : u,
                B = "position" === d ? 0 : "number" == typeof d ? d : .8,
                C = q.length,
                D = "object" == typeof c && c.push ? c.slice(0) : [c],
                E = "reverse" === D[0] || D[0] < 0,
                F = "log" === c;
            if (q[0]) {
                if (o.length > 1 && (a.sort(A), b.sort(A), k = o.size || s(o), k = q.size || s(q), k = o.centerX - q.centerX, l = o.centerY - q.centerY, A === u))
                    for (C = 0; C < q.length; C++) o.splice(C, 0, z(q[C], o, C, B, k, l));
                if (m)
                    for (0 > m && (m = -m), o[0].length > q[0].length && n(q[0], (o[0].length - q[0].length) / 6 | 0), C = q.length; m > w;) h = o[C].size || r(o[C]), g = y(q, o[C].centerX, o[C].centerY), h = g[0], i = g[1], q[C++] = [h, i, h, i, h, i, h, i], q.totalPoints += 8, w++;
                for (C = 0; C < a.length; C++) e = b[C], f = a[C], m = e.length - f.length, 0 > m ? n(e, -m / 6 | 0) : m > 0 && n(f, m / 6 | 0), E && !f.reversed && p(f), c = D[C] || 0 === D[C] ? D[C] : "auto", c && (f.closed || Math.abs(f[0] - f[f.length - 2]) < .5 && Math.abs(f[1] - f[f.length - 1]) < .5 ? "auto" === c || "log" === c ? (D[C] = c = x(f, e, 0 === C), 0 > c && (E = !0, p(f), c = -c), v(f, 6 * c)) : "reverse" !== c && (C && 0 > c && p(f), v(f, 6 * (0 > c ? -c : c))) : !E && ("auto" === c && Math.abs(e[0] - f[0]) + Math.abs(e[1] - f[1]) + Math.abs(e[e.length - 2] - f[f.length - 2]) + Math.abs(e[e.length - 1] - f[f.length - 1]) > Math.abs(e[0] - f[f.length - 2]) + Math.abs(e[1] - f[f.length - 1]) + Math.abs(e[e.length - 2] - f[0]) + Math.abs(e[e.length - 1] - f[1]) || c % 2) ? (p(f), D[C] = -1, E = !0) : "auto" === c ? D[C] = 0 : "reverse" === c && (D[C] = -1), f.closed !== e.closed && (f.closed = e.closed = !1));
                return F && j("shapeIndex: " + D), D
            }
        },
        B = function(a, b, c, d) {
            var e = m(a[0]),
                f = m(a[1]);
            A(e, f, b || 0 === b ? b : "auto", c) && (a[0] = o(e), a[1] = o(f), ("log" === d || d === !0) && j('precompile:["' + a[0] + '","' + a[1] + '"]'))
        },
        C = function(a, b, c) {
            return b || c || a || 0 === a ? function(d) { B(d, a, b, c) } : B
        },
        D = function(a, b) {
            if (!b) return a;
            var c, e, f, g = a.match(d) || [],
                h = g.length,
                i = "";
            for ("reverse" === b ? (e = h - 1, c = -2) : (e = (2 * (parseInt(b, 10) || 0) + 1 + 100 * h) % h, c = 2), f = 0; h > f; f += 2) i += g[e - 1] + "," + g[e] + " ", e = (e + c) % h;
            return i
        },
        E = function(a, b) {
            var c, d, e, f, g, h, i, j = 0,
                k = parseFloat(a[0]),
                l = parseFloat(a[1]),
                m = k + "," + l + " ",
                n = .999999;
            for (e = a.length, c = .5 * b / (.5 * e - 1), d = 0; e - 2 > d; d += 2) {
                if (j += c, h = parseFloat(a[d + 2]), i = parseFloat(a[d + 3]), j > n)
                    for (g = 1 / (Math.floor(j) + 1), f = 1; j > n;) m += (k + (h - k) * g * f).toFixed(2) + "," + (l + (i - l) * g * f).toFixed(2) + " ", j--, f++;
                m += h + "," + i + " ", k = h, l = i
            }
            return m
        },
        F = function(a) {
            var b = a[0].match(d) || [],
                c = a[1].match(d) || [],
                e = c.length - b.length;
            e > 0 ? a[0] = E(b, e) : a[1] = E(c, -e)
        },
        G = function(a) {
            return isNaN(a) ? F : function(b) { F(b), b[1] = D(b[1], parseInt(a, 10)) }
        },
        H = function(a, b) {
            var c = document.createElementNS("http://www.w3.org/2000/svg", "path"),
                d = Array.prototype.slice.call(a.attributes),
                e = d.length;
            for (b = "," + b + ","; --e > -1;) - 1 === b.indexOf("," + d[e].nodeName + ",") && c.setAttributeNS(null, d[e].nodeName, d[e].nodeValue);
            return c
        },
        I = function(a, b) {
            var c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = a.tagName.toLowerCase(),
                z = .552284749831;
            return "path" !== y && a.getBBox ? (i = H(a, "x,y,width,height,cx,cy,rx,ry,r,x1,x2,y1,y2,points"), "rect" === y ? (g = +a.getAttribute("rx") || 0, h = +a.getAttribute("ry") || 0, e = +a.getAttribute("x") || 0, f = +a.getAttribute("y") || 0, m = (+a.getAttribute("width") || 0) - 2 * g, n = (+a.getAttribute("height") || 0) - 2 * h, g || h ? (o = e + g * (1 - z), p = e + g, q = p + m, r = q + g * z, s = q + g, t = f + h * (1 - z), u = f + h, v = u + n, w = v + h * z, x = v + h, c = "M" + s + "," + u + " V" + v + " C" + [s, w, r, x, q, x, q - (q - p) / 3, x, p + (q - p) / 3, x, p, x, o, x, e, w, e, v, e, v - (v - u) / 3, e, u + (v - u) / 3, e, u, e, t, o, f, p, f, p + (q - p) / 3, f, q - (q - p) / 3, f, q, f, r, f, s, t, s, u].join(",") + "z") : c = "M" + (e + m) + "," + f + " v" + n + " h" + -m + " v" + -n + " h" + m + "z") : "circle" === y || "ellipse" === y ? ("circle" === y ? (g = h = +a.getAttribute("r") || 0, k = g * z) : (g = +a.getAttribute("rx") || 0, h = +a.getAttribute("ry") || 0, k = h * z), e = +a.getAttribute("cx") || 0, f = +a.getAttribute("cy") || 0, j = g * z, c = "M" + (e + g) + "," + f + " C" + [e + g, f + k, e + j, f + h, e, f + h, e - j, f + h, e - g, f + k, e - g, f, e - g, f - k, e - j, f - h, e, f - h, e + j, f - h, e + g, f - k, e + g, f].join(",") + "z") : "line" === y ? c = "M" + a.getAttribute("x1") + "," + a.getAttribute("y1") + " L" + a.getAttribute("x2") + "," + a.getAttribute("y2") : ("polyline" === y || "polygon" === y) && (l = (a.getAttribute("points") + "").match(d) || [], e = l.shift(), f = l.shift(), c = "M" + e + "," + f + " L" + l.join(","), "polygon" === y && (c += "," + e + "," + f + "z")), i.setAttribute("d", c), b && a.parentNode && (a.parentNode.insertBefore(i, a), a.parentNode.removeChild(a)), i) : a
        },
        J = function(a, b, c) {
            var e, g, h = "string" == typeof a;
            return (!h || (a.match(d) || []).length < 3) && (e = h ? f.selector(a) : [a], e && e[0] ? (e = e[0], g = e.nodeName.toUpperCase(), b && "PATH" !== g && (e = I(e, !1), g = "PATH"), a = e.getAttribute("PATH" === g ? "d" : "points") || "", e === c && (a = e.getAttributeNS(null, "data-original") || a)) : (j("WARNING: invalid morph to: " + a), a = !1)), a
        },
        K = "Use MorphSVGPlugin.convertToPath(elementOrSelectorText) to convert to a path before morphing.",
        L = _gsScope._gsDefine.plugin({
            propName: "morphSVG",
            API: 2,
            global: !0,
            version: "0.8.1",
            init: function(a, b, c) {
                var d, f, g, h, k;
                return "function" != typeof a.setAttribute ? !1 : i ? (d = a.nodeName.toUpperCase(), k = "POLYLINE" === d || "POLYGON" === d, "PATH" === d || k ? (f = "PATH" === d ? "d" : "points", ("string" == typeof b || b.getBBox || b[0]) && (b = { shape: b }), h = J(b.shape || b.d || b.points || "", "d" === f, a), k && e.test(h) ? (j("WARNING: a <" + d + "> cannot accept path data. " + K), !1) : (h && (this._target = a, a.getAttributeNS(null, "data-original") || a.setAttributeNS(null, "data-original", a.getAttribute(f)), g = this._addTween(a, "setAttribute", a.getAttribute(f) + "", h + "", "morphSVG", !1, f, "object" == typeof b.precompile ? function(a) { a[0] = b.precompile[0], a[1] = b.precompile[1] } : "d" === f ? C(b.shapeIndex, b.map || L.defaultMap, b.precompile) : G(b.shapeIndex)), g && (this._overwriteProps.push("morphSVG"), g.end = h, g.endProp = f)), i)) : (j("WARNING: cannot morph a <" + d + "> SVG element. " + K), !1)) : (console.log("good"), !1)
            },
            set: function(a) {
                var b;
                if (this._super.setRatio.call(this, a), 1 === a)
                    for (b = this._firstPT; b;) b.end && this._target.setAttribute(b.endProp, b.end), b = b._next
            }
        });
    L.pathFilter = B, L.pointsFilter = F, L.subdivideRawBezier = n, L.defaultMap = "size", L.pathDataToRawBezier = function(a) {
        return m(J(a, !0))
    }, L.equalizeSegmentQuantity = A, L.convertToPath = function(a, b) {
        "string" == typeof a && (a = f.selector(a));
        for (var c = a && 0 !== a.length ? a.length && a[0] && a[0].nodeType ? Array.prototype.slice.call(a, 0) : [a] : [], d = c.length; --d > -1;) c[d] = I(c[d], b !== !1);
        return c
    }, L.pathDataToBezier = function(a, b) {
        var c, d, e, g, h, i, j, k, l = m(J(a, !0))[0] || [],
            n = 0;
        if (b = b || {}, k = b.align || b.relative, g = b.matrix || [1, 0, 0, 1, 0, 0], h = b.offsetX || 0, i = b.offsetY || 0, "relative" === k || k === !0 ? (h -= l[0] * g[0] + l[1] * g[2], i -= l[0] * g[1] + l[1] * g[3], n = "+=") : (h += g[4], i += g[5], k && (k = "string" == typeof k ? f.selector(k) : [k], k && k[0] && (j = k[0].getBBox() || { x: 0, y: 0 }, h -= j.x, i -= j.y))), c = [], e = l.length, g)
            for (d = 0; e > d; d += 2) c.push({ x: n + (l[d] * g[0] + l[d + 1] * g[2] + h), y: n + (l[d] * g[1] + l[d + 1] * g[3] + i) });
        else
            for (d = 0; e > d; d += 2) c.push({ x: n + (l[d] + h), y: n + (l[d + 1] + i) });
        return c
    }
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()();
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
                var d = function(a) {
                        var b, c = [],
                            d = a.length;
                        for (b = 0; b !== d; c.push(a[b++]));
                        return c
                    },
                    e = function(a, b, d) { c.call(this, a, b, d), this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = e.prototype.render },
                    f = 1e-10,
                    g = c._internals,
                    h = g.isSelector,
                    i = g.isArray,
                    j = e.prototype = c.to({}, .1, {}),
                    k = [];
                e.version = "1.15.1", j.constructor = e, j.kill()._gc = !1, e.killTweensOf = e.killDelayedCallsTo = c.killTweensOf, e.getTweensOf = c.getTweensOf, e.lagSmoothing = c.lagSmoothing, e.ticker = c.ticker, e.render = c.render, j.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), c.prototype.invalidate.call(this)
                }, j.updateTo = function(a, b) {
                    var d, e = this.ratio,
                        f = this.vars.immediateRender || a.immediateRender;
                    b && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay));
                    for (d in a) this.vars[d] = a[d];
                    if (this._initted || f)
                        if (b) this._initted = !1, f && this.render(0, !0, !0);
                        else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && c._onPluginEvent("_onDisable", this), this._time / this._duration > .998) {
                        var g = this._time;
                        this.render(0, !0, !1), this._initted = !1, this.render(g, !0, !1)
                    } else if (this._time > 0 || f) {
                        this._initted = !1, this._init();
                        for (var h, i = 1 / (1 - e), j = this._firstPT; j;) h = j.s + j.c, j.c *= i, j.s = h - j.c, j = j._next
                    }
                    return this
                }, j.render = function(a, b, c) {
                    this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
                    var d, e, h, i, j, l, m, n, o = this._dirty ? this.totalDuration() : this._totalDuration,
                        p = this._time,
                        q = this._totalTime,
                        r = this._cycle,
                        s = this._duration,
                        t = this._rawPrevTime;
                    if (a >= o ? (this._totalTime = o, this._cycle = this._repeat, this._yoyo && 0 !== (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = s, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (d = !0, e = "onComplete"), 0 === s && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 === a || 0 > t || t === f) && t !== a && (c = !0, t > f && (e = "onReverseComplete")), this._rawPrevTime = n = !b || a || t === a ? a : f)) : 1e-7 > a ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== q || 0 === s && t > 0 && t !== f) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === s && (this._initted || !this.vars.lazy || c) && (t >= 0 && (c = !0), this._rawPrevTime = n = !b || a || t === a ? a : f)), this._initted || (c = !0)) : (this._totalTime = this._time = a, 0 !== this._repeat && (i = s + this._repeatDelay, this._cycle = this._totalTime / i >> 0, 0 !== this._cycle && this._cycle === this._totalTime / i && this._cycle--, this._time = this._totalTime - this._cycle * i, this._yoyo && 0 !== (1 & this._cycle) && (this._time = s - this._time), this._time > s ? this._time = s : 0 > this._time && (this._time = 0)), this._easeType ? (j = this._time / s, l = this._easeType, m = this._easePower, (1 === l || 3 === l && j >= .5) && (j = 1 - j), 3 === l && (j *= 2), 1 === m ? j *= j : 2 === m ? j *= j * j : 3 === m ? j *= j * j * j : 4 === m && (j *= j * j * j * j), this.ratio = 1 === l ? 1 - j : 2 === l ? j : .5 > this._time / s ? j / 2 : 1 - j / 2) : this.ratio = this._ease.getRatio(this._time / s)), p === this._time && !c && r === this._cycle) return void(q !== this._totalTime && this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || k)));
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = p, this._totalTime = q, this._rawPrevTime = t, this._cycle = r, g.lazyTweens.push(this), void(this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / s) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== p && a >= 0 && (this._active = !0), 0 === q && (2 === this._initted && a > 0 && this._init(), this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === s) && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || k))), h = this._firstPT; h;) h.f ? h.t[h.p](h.c * this.ratio + h.s) : h.t[h.p] = h.c * this.ratio + h.s, h = h._next;
                    this._onUpdate && (0 > a && this._startAt && this._startTime && this._startAt.render(a, b, c), b || (this._totalTime !== q || d) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || k)), this._cycle !== r && (b || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || k)), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || k), 0 === s && this._rawPrevTime === f && n !== f && (this._rawPrevTime = 0))
                }, e.to = function(a, b, c) {
                    return new e(a, b, c)
                }, e.from = function(a, b, c) {
                    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new e(a, b, c)
                }, e.fromTo = function(a, b, c, d) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new e(a, b, d)
                }, e.staggerTo = e.allTo = function(a, b, f, g, j, l, m) {
                    g = g || 0;
                    var n, o, p, q, r = f.delay || 0,
                        s = [],
                        t = function() { f.onComplete && f.onComplete.apply(f.onCompleteScope || this, arguments), j.apply(m || this, l || k) };
                    for (i(a) || ("string" == typeof a && (a = c.selector(a) || a), h(a) && (a = d(a))), a = a || [], 0 > g && (a = d(a), a.reverse(), g *= -1), n = a.length - 1, p = 0; n >= p; p++) {
                        o = {};
                        for (q in f) o[q] = f[q];
                        o.delay = r, p === n && j && (o.onComplete = t), s[p] = new e(a[p], b, o), r += g
                    }
                    return s
                }, e.staggerFrom = e.allFrom = function(a, b, c, d, f, g, h) {
                    return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, e.staggerTo(a, b, c, d, f, g, h)
                }, e.staggerFromTo = e.allFromTo = function(a, b, c, d, f, g, h, i) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, e.staggerTo(a, b, d, f, g, h, i)
                }, e.delayedCall = function(a, b, c, d, f) {
                    return new e(b, 0, { delay: a, onComplete: b, onCompleteParams: c, onCompleteScope: d, onReverseComplete: b, onReverseCompleteParams: c, onReverseCompleteScope: d, immediateRender: !1, useFrames: f, overwrite: 0 })
                }, e.set = function(a, b) {
                    return new e(a, 0, b)
                }, e.isTweening = function(a) {
                    return c.getTweensOf(a, !0).length > 0
                };
                var l = function(a, b) {
                        for (var d = [], e = 0, f = a._first; f;) f instanceof c ? d[e++] = f : (b && (d[e++] = f), d = d.concat(l(f, b)), e = d.length), f = f._next;
                        return d
                    },
                    m = e.getAllTweens = function(b) {
                        return l(a._rootTimeline, b).concat(l(a._rootFramesTimeline, b))
                    };
                e.killAll = function(a, c, d, e) {
                    null == c && (c = !0), null == d && (d = !0);
                    var f, g, h, i = m(0 != e),
                        j = i.length,
                        k = c && d && e;
                    for (h = 0; j > h; h++) g = i[h], (k || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && (a ? g.totalTime(g._reversed ? 0 : g.totalDuration()) : g._enabled(!1, !1))
                }, e.killChildTweensOf = function(a, b) {
                    if (null != a) {
                        var f, j, k, l, m, n = g.tweenLookup;
                        if ("string" == typeof a && (a = c.selector(a) || a), h(a) && (a = d(a)), i(a))
                            for (l = a.length; --l > -1;) e.killChildTweensOf(a[l], b);
                        else {
                            f = [];
                            for (k in n)
                                for (j = n[k].target.parentNode; j;) j === a && (f = f.concat(n[k].tweens)), j = j.parentNode;
                            for (m = f.length, l = 0; m > l; l++) b && f[l].totalTime(f[l].totalDuration()), f[l]._enabled(!1, !1)
                        }
                    }
                };
                var n = function(a, c, d, e) {
                    c = c !== !1, d = d !== !1, e = e !== !1;
                    for (var f, g, h = m(e), i = c && d && e, j = h.length; --j > -1;) g = h[j], (i || g instanceof b || (f = g.target === g.vars.onComplete) && d || c && !f) && g.paused(a)
                };
                return e.pauseAll = function(a, b, c) { n(!0, a, b, c) }, e.resumeAll = function(a, b, c) { n(!1, a, b, c) }, e.globalTimeScale = function(b) {
                    var d = a._rootTimeline,
                        e = c.ticker.time;
                    return arguments.length ? (b = b || f, d._startTime = e - (e - d._startTime) * d._timeScale / b, d = a._rootFramesTimeline, e = c.ticker.frame, d._startTime = e - (e - d._startTime) * d._timeScale / b, d._timeScale = a._rootTimeline._timeScale = b, b) : d._timeScale
                }, j.progress = function(a) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), !1) : this._time / this.duration()
                }, j.totalProgress = function(a) {
                    return arguments.length ? this.totalTime(this.totalDuration() * a, !1) : this._totalTime / this.totalDuration()
                }, j.time = function(a, b) {
                    return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                }, j.duration = function(b) {
                    return arguments.length ? a.prototype.duration.call(this, b) : this._duration
                }, j.totalDuration = function(a) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((a - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
                }, j.repeat = function(a) {
                    return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                }, j.repeatDelay = function(a) {
                    return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                }, j.yoyo = function(a) {
                    return arguments.length ? (this._yoyo = a, this) : this._yoyo
                }, e
            }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(a, b, c) {
                var d = function(a) {
                        b.call(this, a), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var c, d, e = this.vars;
                        for (d in e) c = e[d], i(c) && -1 !== c.join("").indexOf("{self}") && (e[d] = this._swapSelfInParams(c));
                        i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger)
                    },
                    e = 1e-10,
                    f = c._internals,
                    g = d._internals = {},
                    h = f.isSelector,
                    i = f.isArray,
                    j = f.lazyTweens,
                    k = f.lazyRender,
                    l = [],
                    m = _gsScope._gsDefine.globals,
                    n = function(a) {
                        var b, c = {};
                        for (b in a) c[b] = a[b];
                        return c
                    },
                    o = g.pauseCallback = function(a, b, c, d) {
                        var e = a._timeline,
                            f = e._totalTime;
                        !b && this._forcingPlayhead || e._rawPrevTime === a._startTime || (e.pause(a._startTime), b && b.apply(d || e, c || l), this._forcingPlayhead && e.seek(f))
                    },
                    p = function(a) {
                        var b, c = [],
                            d = a.length;
                        for (b = 0; b !== d; c.push(a[b++]));
                        return c
                    },
                    q = d.prototype = new b;
                return d.version = "1.15.1", q.constructor = d, q.kill()._gc = q._forcingPlayhead = !1, q.to = function(a, b, d, e) {
                    var f = d.repeat && m.TweenMax || c;
                    return b ? this.add(new f(a, b, d), e) : this.set(a, d, e)
                }, q.from = function(a, b, d, e) {
                    return this.add((d.repeat && m.TweenMax || c).from(a, b, d), e)
                }, q.fromTo = function(a, b, d, e, f) {
                    var g = e.repeat && m.TweenMax || c;
                    return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f)
                }, q.staggerTo = function(a, b, e, f, g, i, j, k) {
                    var l, m = new d({ onComplete: i, onCompleteParams: j, onCompleteScope: k, smoothChildTiming: this.smoothChildTiming });
                    for ("string" == typeof a && (a = c.selector(a) || a), a = a || [], h(a) && (a = p(a)), f = f || 0, 0 > f && (a = p(a), a.reverse(), f *= -1), l = 0; a.length > l; l++) e.startAt && (e.startAt = n(e.startAt)), m.to(a[l], b, n(e), l * f);
                    return this.add(m, g)
                }, q.staggerFrom = function(a, b, c, d, e, f, g, h) {
                    return c.immediateRender = 0 != c.immediateRender, c.runBackwards = !0, this.staggerTo(a, b, c, d, e, f, g, h)
                }, q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
                    return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, this.staggerTo(a, b, d, e, f, g, h, i)
                }, q.call = function(a, b, d, e) {
                    return this.add(c.delayedCall(0, a, b, d), e)
                }, q.set = function(a, b, d) {
                    return d = this._parseTimeOrLabel(d, 0, !0), null == b.immediateRender && (b.immediateRender = d === this._time && !this._paused), this.add(new c(a, 0, b), d)
                }, d.exportRoot = function(a, b) {
                    a = a || {}, null == a.smoothChildTiming && (a.smoothChildTiming = !0);
                    var e, f, g = new d(a),
                        h = g._timeline;
                    for (null == b && (b = !0), h._remove(g, !0), g._startTime = 0, g._rawPrevTime = g._time = g._totalTime = h._time, e = h._first; e;) f = e._next, b && e instanceof c && e.target === e.vars.onComplete || g.add(e, e._startTime - e._delay), e = f;
                    return h.add(g, 0), g
                }, q.add = function(e, f, g, h) {
                    var j, k, l, m, n, o;
                    if ("number" != typeof f && (f = this._parseTimeOrLabel(f, 0, !0, e)), !(e instanceof a)) {
                        if (e instanceof Array || e && e.push && i(e)) {
                            for (g = g || "normal", h = h || 0, j = f, k = e.length, l = 0; k > l; l++) i(m = e[l]) && (m = new d({ tweens: m })), this.add(m, j), "string" != typeof m && "function" != typeof m && ("sequence" === g ? j = m._startTime + m.totalDuration() / m._timeScale : "start" === g && (m._startTime -= m.delay())), j += h;
                            return this._uncache(!0)
                        }
                        if ("string" == typeof e) return this.addLabel(e, f);
                        if ("function" != typeof e) throw "Cannot add " + e + " into the timeline; it is not a tween, timeline, function, or string.";
                        e = c.delayedCall(0, e)
                    }
                    if (b.prototype.add.call(this, e, f), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (n = this, o = n.rawTime() > e._startTime; n._timeline;) o && n._timeline.smoothChildTiming ? n.totalTime(n._totalTime, !0) : n._gc && n._enabled(!0, !1), n = n._timeline;
                    return this
                }, q.remove = function(b) {
                    if (b instanceof a) return this._remove(b, !1);
                    if (b instanceof Array || b && b.push && i(b)) {
                        for (var c = b.length; --c > -1;) this.remove(b[c]);
                        return this
                    }
                    return "string" == typeof b ? this.removeLabel(b) : this.kill(null, b)
                }, q._remove = function(a, c) {
                    b.prototype._remove.call(this, a, c);
                    var d = this._last;
                    return d ? this._time > d._startTime + d._totalDuration / d._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
                }, q.append = function(a, b) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a))
                }, q.insert = q.insertMultiple = function(a, b, c, d) {
                    return this.add(a, b || 0, c, d)
                }, q.appendMultiple = function(a, b, c, d) {
                    return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d)
                }, q.addLabel = function(a, b) {
                    return this._labels[a] = this._parseTimeOrLabel(b), this
                }, q.addPause = function(a, b, d, e) {
                    var f = c.delayedCall(0, o, ["{self}", b, d, e], this);
                    return f.data = "isPause", this.add(f, a)
                }, q.removeLabel = function(a) {
                    return delete this._labels[a], this
                }, q.getLabelTime = function(a) {
                    return null != this._labels[a] ? this._labels[a] : -1
                }, q._parseTimeOrLabel = function(b, c, d, e) {
                    var f;
                    if (e instanceof a && e.timeline === this) this.remove(e);
                    else if (e && (e instanceof Array || e.push && i(e)))
                        for (f = e.length; --f > -1;) e[f] instanceof a && e[f].timeline === this && this.remove(e[f]);
                    if ("string" == typeof c) return this._parseTimeOrLabel(c, d && "number" == typeof b && null == this._labels[c] ? b - this.duration() : 0, d);
                    if (c = c || 0, "string" != typeof b || !isNaN(b) && null == this._labels[b]) null == b && (b = this.duration());
                    else {
                        if (f = b.indexOf("="), -1 === f) return null == this._labels[b] ? d ? this._labels[b] = this.duration() + c : c : this._labels[b] + c;
                        c = parseInt(b.charAt(f - 1) + "1", 10) * Number(b.substr(f + 1)), b = f > 1 ? this._parseTimeOrLabel(b.substr(0, f - 1), 0, d) : this.duration()
                    }
                    return Number(b) + c
                }, q.seek = function(a, b) {
                    return this.totalTime("number" == typeof a ? a : this._parseTimeOrLabel(a), b !== !1)
                }, q.stop = function() {
                    return this.paused(!0)
                }, q.gotoAndPlay = function(a, b) {
                    return this.play(a, b)
                }, q.gotoAndStop = function(a, b) {
                    return this.pause(a, b)
                }, q.render = function(a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, f, g, h, i, m = this._dirty ? this.totalDuration() : this._totalDuration,
                        n = this._time,
                        o = this._startTime,
                        p = this._timeScale,
                        q = this._paused;
                    if (a >= m ? (this._totalTime = this._time = m, this._reversed || this._hasPausedChild() || (f = !0, h = "onComplete",
                            0 === this._duration && (0 === a || 0 > this._rawPrevTime || this._rawPrevTime === e) && this._rawPrevTime !== a && this._first && (i = !0, this._rawPrevTime > e && (h = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = m + 1e-4) : 1e-7 > a ? (this._totalTime = this._time = 0, (0 !== n || 0 === this._duration && this._rawPrevTime !== e && (this._rawPrevTime > 0 || 0 > a && this._rawPrevTime >= 0)) && (h = "onReverseComplete", f = this._reversed), 0 > a ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (i = !0), this._rawPrevTime = a) : (this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, a = 0, this._initted || (i = !0))) : this._totalTime = this._time = this._rawPrevTime = a, this._time !== n && this._first || c || i) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== n && a > 0 && (this._active = !0), 0 === n && this.vars.onStart && 0 !== this._time && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || l)), this._time >= n)
                            for (d = this._first; d && (g = d._next, !this._paused || q);)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                        else
                            for (d = this._last; d && (g = d._prev, !this._paused || q);)(d._active || n >= d._startTime && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = g;
                        this._onUpdate && (b || (j.length && k(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || l))), h && (this._gc || (o === this._startTime || p !== this._timeScale) && (0 === this._time || m >= this.totalDuration()) && (f && (j.length && k(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[h] && this.vars[h].apply(this.vars[h + "Scope"] || this, this.vars[h + "Params"] || l)))
                    }
                }, q._hasPausedChild = function() {
                    for (var a = this._first; a;) {
                        if (a._paused || a instanceof d && a._hasPausedChild()) return !0;
                        a = a._next
                    }
                    return !1
                }, q.getChildren = function(a, b, d, e) {
                    e = e || -9999999999;
                    for (var f = [], g = this._first, h = 0; g;) e > g._startTime || (g instanceof c ? b !== !1 && (f[h++] = g) : (d !== !1 && (f[h++] = g), a !== !1 && (f = f.concat(g.getChildren(!0, b, d)), h = f.length))), g = g._next;
                    return f
                }, q.getTweensOf = function(a, b) {
                    var d, e, f = this._gc,
                        g = [],
                        h = 0;
                    for (f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length; --e > -1;)(d[e].timeline === this || b && this._contains(d[e])) && (g[h++] = d[e]);
                    return f && this._enabled(!1, !0), g
                }, q.recent = function() {
                    return this._recent
                }, q._contains = function(a) {
                    for (var b = a.timeline; b;) {
                        if (b === this) return !0;
                        b = b.timeline
                    }
                    return !1
                }, q.shiftChildren = function(a, b, c) {
                    c = c || 0;
                    for (var d, e = this._first, f = this._labels; e;) e._startTime >= c && (e._startTime += a), e = e._next;
                    if (b)
                        for (d in f) f[d] >= c && (f[d] += a);
                    return this._uncache(!0)
                }, q._kill = function(a, b) {
                    if (!a && !b) return this._enabled(!1, !1);
                    for (var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1), d = c.length, e = !1; --d > -1;) c[d]._kill(a, b) && (e = !0);
                    return e
                }, q.clear = function(a) {
                    var b = this.getChildren(!1, !0, !0),
                        c = b.length;
                    for (this._time = this._totalTime = 0; --c > -1;) b[c]._enabled(!1, !1);
                    return a !== !1 && (this._labels = {}), this._uncache(!0)
                }, q.invalidate = function() {
                    for (var b = this._first; b;) b.invalidate(), b = b._next;
                    return a.prototype.invalidate.call(this)
                }, q._enabled = function(a, c) {
                    if (a === this._gc)
                        for (var d = this._first; d;) d._enabled(a, !0), d = d._next;
                    return b.prototype._enabled.call(this, a, c)
                }, q.totalTime = function() {
                    this._forcingPlayhead = !0;
                    var b = a.prototype.totalTime.apply(this, arguments);
                    return this._forcingPlayhead = !1, b
                }, q.duration = function(a) {
                    return arguments.length ? (0 !== this.duration() && 0 !== a && this.timeScale(this._duration / a), this) : (this._dirty && this.totalDuration(), this._duration)
                }, q.totalDuration = function(a) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var b, c, d = 0, e = this._last, f = 999999999999; e;) b = e._prev, e._dirty && e.totalDuration(), e._startTime > f && this._sortChildren && !e._paused ? this.add(e, e._startTime - e._delay) : f = e._startTime, 0 > e._startTime && !e._paused && (d -= e._startTime, this._timeline.smoothChildTiming && (this._startTime += e._startTime / this._timeScale), this.shiftChildren(-e._startTime, !1, -9999999999), f = 0), c = e._startTime + e._totalDuration / e._timeScale, c > d && (d = c), e = b;
                            this._duration = this._totalDuration = d, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== a && this.timeScale(this._totalDuration / a), this
                }, q.usesFrames = function() {
                    for (var b = this._timeline; b._timeline;) b = b._timeline;
                    return b === a._rootFramesTimeline
                }, q.rawTime = function() {
                    return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
                }, d
            }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function(a, b, c) {
                var d = function(b) { a.call(this, b), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = this.vars.yoyo === !0, this._dirty = !0 },
                    e = 1e-10,
                    f = [],
                    g = b._internals,
                    h = g.lazyTweens,
                    i = g.lazyRender,
                    j = new c(null, null, 1, 0),
                    k = d.prototype = new a;
                return k.constructor = d, k.kill()._gc = !1, d.version = "1.15.1", k.invalidate = function() {
                    return this._yoyo = this.vars.yoyo === !0, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), a.prototype.invalidate.call(this)
                }, k.addCallback = function(a, c, d, e) {
                    return this.add(b.delayedCall(0, a, d, e), c)
                }, k.removeCallback = function(a, b) {
                    if (a)
                        if (null == b) this._kill(null, a);
                        else
                            for (var c = this.getTweensOf(a, !1), d = c.length, e = this._parseTimeOrLabel(b); --d > -1;) c[d]._startTime === e && c[d]._enabled(!1, !1);
                    return this
                }, k.removePause = function(b) {
                    return this.removeCallback(a._internals.pauseCallback, b)
                }, k.tweenTo = function(a, c) {
                    c = c || {};
                    var d, e, g, h = { ease: j, useFrames: this.usesFrames(), immediateRender: !1 };
                    for (e in c) h[e] = c[e];
                    return h.time = this._parseTimeOrLabel(a), d = Math.abs(Number(h.time) - this._time) / this._timeScale || .001, g = new b(this, d, h), h.onStart = function() { g.target.paused(!0), g.vars.time !== g.target.time() && d === g.duration() && g.duration(Math.abs(g.vars.time - g.target.time()) / g.target._timeScale), c.onStart && c.onStart.apply(c.onStartScope || g, c.onStartParams || f) }, g
                }, k.tweenFromTo = function(a, b, c) {
                    c = c || {}, a = this._parseTimeOrLabel(a), c.startAt = { onComplete: this.seek, onCompleteParams: [a], onCompleteScope: this }, c.immediateRender = c.immediateRender !== !1;
                    var d = this.tweenTo(b, c);
                    return d.duration(Math.abs(d.vars.time - a) / this._timeScale || .001)
                }, k.render = function(a, b, c) {
                    this._gc && this._enabled(!0, !1);
                    var d, g, j, k, l, m, n = this._dirty ? this.totalDuration() : this._totalDuration,
                        o = this._duration,
                        p = this._time,
                        q = this._totalTime,
                        r = this._startTime,
                        s = this._timeScale,
                        t = this._rawPrevTime,
                        u = this._paused,
                        v = this._cycle;
                    if (a >= n ? (this._locked || (this._totalTime = n, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (g = !0, k = "onComplete", 0 === this._duration && (0 === a || 0 > t || t === e) && t !== a && this._first && (l = !0, t > e && (k = "onReverseComplete"))), this._rawPrevTime = this._duration || !b || a || this._rawPrevTime === a ? a : e, this._yoyo && 0 !== (1 & this._cycle) ? this._time = a = 0 : (this._time = o, a = o + 1e-4)) : 1e-7 > a ? (this._locked || (this._totalTime = this._cycle = 0), this._time = 0, (0 !== p || 0 === o && t !== e && (t > 0 || 0 > a && t >= 0) && !this._locked) && (k = "onReverseComplete", g = this._reversed), 0 > a ? (this._active = !1, t >= 0 && this._first && (l = !0), this._rawPrevTime = a) : (this._rawPrevTime = o || !b || a || this._rawPrevTime === a ? a : e, a = 0, this._initted || (l = !0))) : (0 === o && 0 > t && (l = !0), this._time = this._rawPrevTime = a, this._locked || (this._totalTime = a, 0 !== this._repeat && (m = o + this._repeatDelay, this._cycle = this._totalTime / m >> 0, 0 !== this._cycle && this._cycle === this._totalTime / m && this._cycle--, this._time = this._totalTime - this._cycle * m, this._yoyo && 0 !== (1 & this._cycle) && (this._time = o - this._time), this._time > o ? (this._time = o, a = o + 1e-4) : 0 > this._time ? this._time = a = 0 : a = this._time))), this._cycle !== v && !this._locked) {
                        var w = this._yoyo && 0 !== (1 & v),
                            x = w === (this._yoyo && 0 !== (1 & this._cycle)),
                            y = this._totalTime,
                            z = this._cycle,
                            A = this._rawPrevTime,
                            B = this._time;
                        if (this._totalTime = v * o, v > this._cycle ? w = !w : this._totalTime += o, this._time = p, this._rawPrevTime = 0 === o ? t - 1e-4 : t, this._cycle = v, this._locked = !0, p = w ? 0 : o, this.render(p, b, 0 === o), b || this._gc || this.vars.onRepeat && this.vars.onRepeat.apply(this.vars.onRepeatScope || this, this.vars.onRepeatParams || f), x && (p = w ? o + 1e-4 : -1e-4, this.render(p, !0, !1)), this._locked = !1, this._paused && !u) return;
                        this._time = B, this._totalTime = y, this._cycle = z, this._rawPrevTime = A
                    }
                    if (!(this._time !== p && this._first || c || l)) return void(q !== this._totalTime && this._onUpdate && (b || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || f)));
                    if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== q && a > 0 && (this._active = !0), 0 === q && this.vars.onStart && 0 !== this._totalTime && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || f)), this._time >= p)
                        for (d = this._first; d && (j = d._next, !this._paused || u);)(d._active || d._startTime <= this._time && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = j;
                    else
                        for (d = this._last; d && (j = d._prev, !this._paused || u);)(d._active || p >= d._startTime && !d._paused && !d._gc) && (d._reversed ? d.render((d._dirty ? d.totalDuration() : d._totalDuration) - (a - d._startTime) * d._timeScale, b, c) : d.render((a - d._startTime) * d._timeScale, b, c)), d = j;
                    this._onUpdate && (b || (h.length && i(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || f))), k && (this._locked || this._gc || (r === this._startTime || s !== this._timeScale) && (0 === this._time || n >= this.totalDuration()) && (g && (h.length && i(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[k] && this.vars[k].apply(this.vars[k + "Scope"] || this, this.vars[k + "Params"] || f)))
                }, k.getActive = function(a, b, c) {
                    null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
                    var d, e, f = [],
                        g = this.getChildren(a, b, c),
                        h = 0,
                        i = g.length;
                    for (d = 0; i > d; d++) e = g[d], e.isActive() && (f[h++] = e);
                    return f
                }, k.getLabelAfter = function(a) {
                    a || 0 !== a && (a = this._time);
                    var b, c = this.getLabelsArray(),
                        d = c.length;
                    for (b = 0; d > b; b++)
                        if (c[b].time > a) return c[b].name;
                    return null
                }, k.getLabelBefore = function(a) {
                    null == a && (a = this._time);
                    for (var b = this.getLabelsArray(), c = b.length; --c > -1;)
                        if (a > b[c].time) return b[c].name;
                    return null
                }, k.getLabelsArray = function() {
                    var a, b = [],
                        c = 0;
                    for (a in this._labels) b[c++] = { time: this._labels[a], name: a };
                    return b.sort(function(a, b) {
                        return a.time - b.time
                    }), b
                }, k.progress = function(a, b) {
                    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) + this._cycle * (this._duration + this._repeatDelay), b) : this._time / this.duration()
                }, k.totalProgress = function(a, b) {
                    return arguments.length ? this.totalTime(this.totalDuration() * a, b) : this._totalTime / this.totalDuration()
                }, k.totalDuration = function(b) {
                    return arguments.length ? -1 === this._repeat ? this : this.duration((b - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (a.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
                }, k.time = function(a, b) {
                    return arguments.length ? (this._dirty && this.totalDuration(), a > this._duration && (a = this._duration), this._yoyo && 0 !== (1 & this._cycle) ? a = this._duration - a + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (a += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(a, b)) : this._time
                }, k.repeat = function(a) {
                    return arguments.length ? (this._repeat = a, this._uncache(!0)) : this._repeat
                }, k.repeatDelay = function(a) {
                    return arguments.length ? (this._repeatDelay = a, this._uncache(!0)) : this._repeatDelay
                }, k.yoyo = function(a) {
                    return arguments.length ? (this._yoyo = a, this) : this._yoyo
                }, k.currentLabel = function(a) {
                    return arguments.length ? this.seek(a, !0) : this.getLabelBefore(this._time + 1e-8)
                }, d
            }, !0),
            function() {
                var a = 180 / Math.PI,
                    b = [],
                    c = [],
                    d = [],
                    e = {},
                    f = _gsScope._gsDefine.globals,
                    g = function(a, b, c, d) { this.a = a, this.b = b, this.c = c, this.d = d, this.da = d - a, this.ca = c - a, this.ba = b - a },
                    h = ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,",
                    i = function(a, b, c, d) {
                        var e = { a: a },
                            f = {},
                            g = {},
                            h = { c: d },
                            i = (a + b) / 2,
                            j = (b + c) / 2,
                            k = (c + d) / 2,
                            l = (i + j) / 2,
                            m = (j + k) / 2,
                            n = (m - l) / 8;
                        return e.b = i + (a - i) / 4, f.b = l + n, e.c = f.a = (e.b + f.b) / 2, f.c = g.a = (l + m) / 2, g.b = m - n, h.b = k + (d - k) / 4, g.c = h.a = (g.b + h.b) / 2, [e, f, g, h]
                    },
                    j = function(a, e, f, g, h) {
                        var j, k, l, m, n, o, p, q, r, s, t, u, v, w = a.length - 1,
                            x = 0,
                            y = a[0].a;
                        for (j = 0; w > j; j++) n = a[x], k = n.a, l = n.d, m = a[x + 1].d, h ? (t = b[j], u = c[j], v = .25 * (u + t) * e / (g ? .5 : d[j] || .5), o = l - (l - k) * (g ? .5 * e : 0 !== t ? v / t : 0), p = l + (m - l) * (g ? .5 * e : 0 !== u ? v / u : 0), q = l - (o + ((p - o) * (3 * t / (t + u) + .5) / 4 || 0))) : (o = l - .5 * (l - k) * e, p = l + .5 * (m - l) * e, q = l - (o + p) / 2), o += q, p += q, n.c = r = o, n.b = 0 !== j ? y : y = n.a + .6 * (n.c - n.a), n.da = l - k, n.ca = r - k, n.ba = y - k, f ? (s = i(k, y, r, l), a.splice(x, 1, s[0], s[1], s[2], s[3]), x += 4) : x++, y = p;
                        n = a[x], n.b = y, n.c = y + .4 * (n.d - y), n.da = n.d - n.a, n.ca = n.c - n.a, n.ba = y - n.a, f && (s = i(n.a, y, n.c, n.d), a.splice(x, 1, s[0], s[1], s[2], s[3]))
                    },
                    k = function(a, d, e, f) {
                        var h, i, j, k, l, m, n = [];
                        if (f)
                            for (a = [f].concat(a), i = a.length; --i > -1;) "string" == typeof(m = a[i][d]) && "=" === m.charAt(1) && (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
                        if (h = a.length - 2, 0 > h) return n[0] = new g(a[0][d], 0, 0, a[-1 > h ? 0 : 1][d]), n;
                        for (i = 0; h > i; i++) j = a[i][d], k = a[i + 1][d], n[i] = new g(j, 0, 0, k), e && (l = a[i + 2][d], b[i] = (b[i] || 0) + (k - j) * (k - j), c[i] = (c[i] || 0) + (l - k) * (l - k));
                        return n[i] = new g(a[i][d], 0, 0, a[i + 1][d]), n
                    },
                    l = function(a, f, g, i, l, m) {
                        var n, o, p, q, r, s, t, u, v = {},
                            w = [],
                            x = m || a[0];
                        l = "string" == typeof l ? "," + l + "," : h, null == f && (f = 1);
                        for (o in a[0]) w.push(o);
                        if (a.length > 1) {
                            for (u = a[a.length - 1], t = !0, n = w.length; --n > -1;)
                                if (o = w[n], Math.abs(x[o] - u[o]) > .05) {
                                    t = !1;
                                    break
                                }
                            t && (a = a.concat(), m && a.unshift(m), a.push(a[1]), m = a[a.length - 3])
                        }
                        for (b.length = c.length = d.length = 0, n = w.length; --n > -1;) o = w[n], e[o] = -1 !== l.indexOf("," + o + ","), v[o] = k(a, o, e[o], m);
                        for (n = b.length; --n > -1;) b[n] = Math.sqrt(b[n]), c[n] = Math.sqrt(c[n]);
                        if (!i) {
                            for (n = w.length; --n > -1;)
                                if (e[o])
                                    for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) r = p[q + 1].da / c[q] + p[q].da / b[q], d[q] = (d[q] || 0) + r * r;
                            for (n = d.length; --n > -1;) d[n] = Math.sqrt(d[n])
                        }
                        for (n = w.length, q = g ? 4 : 1; --n > -1;) o = w[n], p = v[o], j(p, f, g, i, e[o]), t && (p.splice(0, q), p.splice(p.length - q, q));
                        return v
                    },
                    m = function(a, b, c) {
                        b = b || "soft";
                        var d, e, f, h, i, j, k, l, m, n, o, p = {},
                            q = "cubic" === b ? 3 : 2,
                            r = "soft" === b,
                            s = [];
                        if (r && c && (a = [c].concat(a)), null == a || q + 1 > a.length) throw "invalid Bezier data";
                        for (m in a[0]) s.push(m);
                        for (j = s.length; --j > -1;) {
                            for (m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0; l > k; k++) d = null == c ? a[k][m] : "string" == typeof(o = a[k][m]) && "=" === o.charAt(1) ? c[m] + Number(o.charAt(0) + o.substr(2)) : Number(o), r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2), i[n++] = d;
                            for (l = n - q + 1, n = 0, k = 0; l > k; k += q) d = i[k], e = i[k + 1], f = i[k + 2], h = 2 === q ? 0 : i[k + 3], i[n++] = o = 3 === q ? new g(d, e, f, h) : new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f);
                            i.length = n
                        }
                        return p
                    },
                    n = function(a, b, c) {
                        for (var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length; --p > -1;)
                            for (m = a[p], f = m.a, g = m.d - f, h = m.c - f, i = m.b - f, d = e = 0, k = 1; c >= k; k++) j = o * k, l = 1 - j, d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j), n = p * c + k - 1, b[n] = (b[n] || 0) + d * d
                    },
                    o = function(a, b) {
                        b = b >> 0 || 6;
                        var c, d, e, f, g = [],
                            h = [],
                            i = 0,
                            j = 0,
                            k = b - 1,
                            l = [],
                            m = [];
                        for (c in a) n(a[c], g, b);
                        for (e = g.length, d = 0; e > d; d++) i += Math.sqrt(g[d]), f = d % b, m[f] = i, f === k && (j += i, f = d / b >> 0, l[f] = m, h[f] = j, i = 0, m = []);
                        return { length: j, lengths: h, segments: l }
                    },
                    p = _gsScope._gsDefine.plugin({
                        propName: "bezier",
                        priority: -1,
                        version: "1.3.4",
                        API: 2,
                        global: !0,
                        init: function(a, b, c) {
                            this._target = a, b instanceof Array && (b = { values: b }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10);
                            var d, e, f, g, h, i = b.values || [],
                                j = {},
                                k = i[0],
                                n = b.autoRotate || c.vars.orientToBezier;
                            this._autoRotate = n ? n instanceof Array ? n : [
                                ["x", "y", "rotation", n === !0 ? 0 : Number(n) || 0]
                            ] : null;
                            for (d in k) this._props.push(d);
                            for (f = this._props.length; --f > -1;) d = this._props[f], this._overwriteProps.push(d), e = this._func[d] = "function" == typeof a[d], j[d] = e ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)]() : parseFloat(a[d]), h || j[d] !== i[0][d] && (h = j);
                            if (this._beziers = "cubic" !== b.type && "quadratic" !== b.type && "soft" !== b.type ? l(i, isNaN(b.curviness) ? 1 : b.curviness, !1, "thruBasic" === b.type, b.correlate, h) : m(i, b.type, j), this._segCount = this._beziers[d].length, this._timeRes) {
                                var p = o(this._beziers, this._timeRes);
                                this._length = p.length, this._lengths = p.lengths, this._segments = p.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
                            }
                            if (n = this._autoRotate)
                                for (this._initialRotations = [], n[0] instanceof Array || (this._autoRotate = n = [n]), f = n.length; --f > -1;) {
                                    for (g = 0; 3 > g; g++) d = n[f][g], this._func[d] = "function" == typeof a[d] ? a[d.indexOf("set") || "function" != typeof a["get" + d.substr(3)] ? d : "get" + d.substr(3)] : !1;
                                    d = n[f][2], this._initialRotations[f] = this._func[d] ? this._func[d].call(this._target) : this._target[d]
                                }
                            return this._startRatio = c.vars.runBackwards ? 1 : 0, !0
                        },
                        set: function(b) {
                            var c, d, e, f, g, h, i, j, k, l, m = this._segCount,
                                n = this._func,
                                o = this._target,
                                p = b !== this._startRatio;
                            if (this._timeRes) {
                                if (k = this._lengths, l = this._curSeg, b *= this._length, e = this._li, b > this._l2 && m - 1 > e) {
                                    for (j = m - 1; j > e && b >= (this._l2 = k[++e]););
                                    this._l1 = k[e - 1], this._li = e, this._curSeg = l = this._segments[e], this._s2 = l[this._s1 = this._si = 0]
                                } else if (this._l1 > b && e > 0) {
                                    for (; e > 0 && (this._l1 = k[--e]) >= b;);
                                    0 === e && this._l1 > b ? this._l1 = 0 : e++, this._l2 = k[e], this._li = e, this._curSeg = l = this._segments[e], this._s1 = l[(this._si = l.length - 1) - 1] || 0, this._s2 = l[this._si]
                                }
                                if (c = e, b -= this._l1, e = this._si, b > this._s2 && l.length - 1 > e) {
                                    for (j = l.length - 1; j > e && b >= (this._s2 = l[++e]););
                                    this._s1 = l[e - 1], this._si = e
                                } else if (this._s1 > b && e > 0) {
                                    for (; e > 0 && (this._s1 = l[--e]) >= b;);
                                    0 === e && this._s1 > b ? this._s1 = 0 : e++, this._s2 = l[e], this._si = e
                                }
                                h = (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec
                            } else c = 0 > b ? 0 : b >= 1 ? m - 1 : m * b >> 0, h = (b - c * (1 / m)) * m;
                            for (d = 1 - h, e = this._props.length; --e > -1;) f = this._props[e], g = this._beziers[f][c], i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a, this._round[f] && (i = Math.round(i)), n[f] ? o[f](i) : o[f] = i;
                            if (this._autoRotate) {
                                var q, r, s, t, u, v, w, x = this._autoRotate;
                                for (e = x.length; --e > -1;) f = x[e][2], v = x[e][3] || 0, w = x[e][4] === !0 ? 1 : a, g = this._beziers[x[e][0]], q = this._beziers[x[e][1]], g && q && (g = g[c], q = q[c], r = g.a + (g.b - g.a) * h, t = g.b + (g.c - g.b) * h, r += (t - r) * h, t += (g.c + (g.d - g.c) * h - t) * h, s = q.a + (q.b - q.a) * h, u = q.b + (q.c - q.b) * h, s += (u - s) * h, u += (q.c + (q.d - q.c) * h - u) * h, i = p ? Math.atan2(u - s, t - r) * w + v : this._initialRotations[e], n[f] ? o[f](i) : o[f] = i)
                            }
                        }
                    }),
                    q = p.prototype;
                p.bezierThrough = l, p.cubicToQuadratic = i, p._autoCSS = !0, p.quadraticToCubic = function(a, b, c) {
                    return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c)
                }, p._cssRegister = function() {
                    var a = f.CSSPlugin;
                    if (a) {
                        var b = a._internals,
                            c = b._parseToProxy,
                            d = b._setPluginRatio,
                            e = b.CSSPropTween;
                        b._registerComplexSpecialProp("bezier", {
                            parser: function(a, b, f, g, h, i) {
                                b instanceof Array && (b = { values: b }), i = new p;
                                var j, k, l, m = b.values,
                                    n = m.length - 1,
                                    o = [],
                                    q = {};
                                if (0 > n) return h;
                                for (j = 0; n >= j; j++) l = c(a, m[j], g, h, i, n !== j), o[j] = l.end;
                                for (k in b) q[k] = b[k];
                                return q.values = o, h = new e(a, "bezier", 0, 0, l.pt, 2), h.data = l, h.plugin = i, h.setRatio = d, 0 === q.autoRotate && (q.autoRotate = !0), !q.autoRotate || q.autoRotate instanceof Array || (j = q.autoRotate === !0 ? 0 : Number(q.autoRotate), q.autoRotate = null != l.end.left ? [
                                    ["left", "top", "rotation", j, !1]
                                ] : null != l.end.x ? [
                                    ["x", "y", "rotation", j, !1]
                                ] : !1), q.autoRotate && (g._transform || g._enableTransforms(!1), l.autoRotate = g._target._gsTransform), i._onInitTween(l.proxy, q, g._tween), h
                            }
                        })
                    }
                }, q._roundProps = function(a, b) {
                    for (var c = this._overwriteProps, d = c.length; --d > -1;)(a[c[d]] || a.bezier || a.bezierThrough) && (this._round[c[d]] = b)
                }, q._kill = function(a) {
                    var b, c, d = this._props;
                    for (b in this._beziers)
                        if (b in a)
                            for (delete this._beziers[b], delete this._func[b], c = d.length; --c > -1;) d[c] === b && d.splice(c, 1);
                    return this._super._kill.call(this, a)
                }
            }(), _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a, b) {
                var c, d, e, f, g = function() { a.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = g.prototype.setRatio },
                    h = _gsScope._gsDefine.globals,
                    i = {},
                    j = g.prototype = new a("css");
                j.constructor = g, g.version = "1.15.1", g.API = 2, g.defaultTransformPerspective = 0, g.defaultSkewType = "compensated", j = "px", g.suffixMap = { top: j, right: j, bottom: j, left: j, width: j, height: j, fontSize: j, padding: j, margin: j, perspective: j, lineHeight: "" };
                var k, l, m, n, o, p, q = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                    r = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                    s = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                    t = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
                    u = /(?:\d|\-|\+|=|#|\.)*/g,
                    v = /opacity *= *([^)]*)/i,
                    w = /opacity:([^;]*)/i,
                    x = /alpha\(opacity *=.+?\)/i,
                    y = /^(rgb|hsl)/,
                    z = /([A-Z])/g,
                    A = /-([a-z])/gi,
                    B = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                    C = function(a, b) {
                        return b.toUpperCase()
                    },
                    D = /(?:Left|Right|Width)/i,
                    E = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                    F = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                    G = /,(?=[^\)]*(?:\(|$))/gi,
                    H = Math.PI / 180,
                    I = 180 / Math.PI,
                    J = {},
                    K = document,
                    L = function(a) {
                        return K.createElementNS ? K.createElementNS("http://www.w3.org/1999/xhtml", a) : K.createElement(a)
                    },
                    M = L("div"),
                    N = L("img"),
                    O = g._internals = { _specialProps: i },
                    P = navigator.userAgent,
                    Q = function() {
                        var a = P.indexOf("Android"),
                            b = L("a");
                        return m = -1 !== P.indexOf("Safari") && -1 === P.indexOf("Chrome") && (-1 === a || Number(P.substr(a + 8, 1)) > 3), o = m && 6 > Number(P.substr(P.indexOf("Version/") + 8, 1)), n = -1 !== P.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(P) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(P)) && (p = parseFloat(RegExp.$1)), b ? (b.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(b.style.opacity)) : !1
                    }(),
                    R = function(a) {
                        return v.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
                    },
                    S = function(a) { window.console && console.log(a) },
                    T = "",
                    U = "",
                    V = function(a, b) {
                        b = b || M;
                        var c, d, e = b.style;
                        if (void 0 !== e[a]) return a;
                        for (a = a.charAt(0).toUpperCase() + a.substr(1), c = ["O", "Moz", "ms", "Ms", "Webkit"], d = 5; --d > -1 && void 0 === e[c[d] + a];);
                        return d >= 0 ? (U = 3 === d ? "ms" : c[d], T = "-" + U.toLowerCase() + "-", U + a) : null
                    },
                    W = K.defaultView ? K.defaultView.getComputedStyle : function() {},
                    X = g.getStyle = function(a, b, c, d, e) {
                        var f;
                        return Q || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || W(a)) ? f = c[b] || c.getPropertyValue(b) || c.getPropertyValue(b.replace(z, "-$1").toLowerCase()) : a.currentStyle && (f = a.currentStyle[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : R(a)
                    },
                    Y = O.convertToPixels = function(a, c, d, e, f) {
                        if ("px" === e || !e) return d;
                        if ("auto" === e || !d) return 0;
                        var h, i, j, k = D.test(c),
                            l = a,
                            m = M.style,
                            n = 0 > d;
                        if (n && (d = -d), "%" === e && -1 !== c.indexOf("border")) h = d / 100 * (k ? a.clientWidth : a.clientHeight);
                        else {
                            if (m.cssText = "border:0 solid red;position:" + X(a, "position") + ";line-height:0;", "%" !== e && l.appendChild) m[k ? "borderLeftWidth" : "borderTopWidth"] = d + e;
                            else {
                                if (l = a.parentNode || K.body, i = l._gsCache, j = b.ticker.frame, i && k && i.time === j) return i.width * d / 100;
                                m[k ? "width" : "height"] = d + e
                            }
                            l.appendChild(M), h = parseFloat(M[k ? "offsetWidth" : "offsetHeight"]), l.removeChild(M), k && "%" === e && g.cacheWidths !== !1 && (i = l._gsCache = l._gsCache || {}, i.time = j, i.width = 100 * (h / d)), 0 !== h || f || (h = Y(a, c, d, e, !0))
                        }
                        return n ? -h : h
                    },
                    Z = O.calculateOffset = function(a, b, c) {
                        if ("absolute" !== X(a, "position", c)) return 0;
                        var d = "left" === b ? "Left" : "Top",
                            e = X(a, "margin" + d, c);
                        return a["offset" + d] - (Y(a, b, parseFloat(e), e.replace(u, "")) || 0)
                    },
                    $ = function(a, b) {
                        var c, d, e = {};
                        if (b = b || W(a, null))
                            for (c in b)(-1 === c.indexOf("Transform") || wa === c) && (e[c] = b[c]);
                        else if (b = a.currentStyle || a.style)
                            for (c in b) "string" == typeof c && void 0 === e[c] && (e[c.replace(A, C)] = b[c]);
                        return Q || (e.opacity = R(a)), d = Ga(a, b, !1), e.rotation = d.rotation, e.skewX = d.skewX, e.scaleX = d.scaleX, e.scaleY = d.scaleY, e.x = d.x, e.y = d.y, za && (e.z = d.z, e.rotationX = d.rotationX, e.rotationY = d.rotationY, e.scaleZ = d.scaleZ), e.filters && delete e.filters, e
                    },
                    _ = function(a, b, c, d, e) {
                        var f, g, h, i = {},
                            j = a.style;
                        for (g in c) "cssText" !== g && "length" !== g && isNaN(g) && (b[g] !== (f = c[g]) || e && e[g]) && -1 === g.indexOf("Origin") && ("number" == typeof f || "string" == typeof f) && (i[g] = "auto" !== f || "left" !== g && "top" !== g ? "" !== f && "auto" !== f && "none" !== f || "string" != typeof b[g] || "" === b[g].replace(t, "") ? f : 0 : Z(a, g), void 0 !== j[g] && (h = new na(j, g, j[g], h)));
                        if (d)
                            for (g in d) "className" !== g && (i[g] = d[g]);
                        return { difs: i, firstMPT: h }
                    },
                    aa = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
                    ba = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                    ca = function(a, b, c) {
                        var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                            e = aa[b],
                            f = e.length;
                        for (c = c || W(a, null); --f > -1;) d -= parseFloat(X(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(X(a, "border" + e[f] + "Width", c, !0)) || 0;
                        return d
                    },
                    da = function(a, b) {
                        (null == a || "" === a || "auto" === a || "auto auto" === a) && (a = "0 0");
                        var c = a.split(" "),
                            d = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0],
                            e = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
                        return null == e ? e = "center" === d ? "50%" : "0" : "center" === e && (e = "50%"), ("center" === d || isNaN(parseFloat(d)) && -1 === (d + "").indexOf("=")) && (d = "50%"), b && (b.oxp = -1 !== d.indexOf("%"), b.oyp = -1 !== e.indexOf("%"), b.oxr = "=" === d.charAt(1), b.oyr = "=" === e.charAt(1), b.ox = parseFloat(d.replace(t, "")), b.oy = parseFloat(e.replace(t, ""))), d + " " + e + (c.length > 2 ? " " + c[2] : "")
                    },
                    ea = function(a, b) {
                        return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b)
                    },
                    fa = function(a, b) {
                        return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + b : parseFloat(a)
                    },
                    ga = function(a, b, c, d) {
                        var e, f, g, h, i, j = 1e-6;
                        return null == a ? h = b : "number" == typeof a ? h = a : (e = 360, f = a.split("_"), i = "=" === a.charAt(1), g = (i ? parseInt(a.charAt(0) + "1", 10) * parseFloat(f[0].substr(2)) : parseFloat(f[0])) * (-1 === a.indexOf("rad") ? 1 : I) - (i ? 0 : b), f.length && (d && (d[c] = b + g), -1 !== a.indexOf("short") && (g %= e, g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)), -1 !== a.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * e) % e - (0 | g / e) * e : -1 !== a.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * e) % e - (0 | g / e) * e)), h = b + g), j > h && h > -j && (h = 0), h
                    },
                    ha = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
                    ia = function(a, b, c) {
                        return a = 0 > a ? a + 1 : a > 1 ? a - 1 : a, 0 | 255 * (1 > 6 * a ? b + 6 * (c - b) * a : .5 > a ? c : 2 > 3 * a ? b + 6 * (c - b) * (2 / 3 - a) : b) + .5
                    },
                    ja = g.parseColor = function(a) {
                        var b, c, d, e, f, g;
                        return a && "" !== a ? "number" == typeof a ? [a >> 16, 255 & a >> 8, 255 & a] : ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)), ha[a] ? ha[a] : "#" === a.charAt(0) ? (4 === a.length && (b = a.charAt(1), c = a.charAt(2), d = a.charAt(3), a = "#" + b + b + c + c + d + d), a = parseInt(a.substr(1), 16), [a >> 16, 255 & a >> 8, 255 & a]) : "hsl" === a.substr(0, 3) ? (a = a.match(q), e = Number(a[0]) % 360 / 360, f = Number(a[1]) / 100, g = Number(a[2]) / 100, c = .5 >= g ? g * (f + 1) : g + f - g * f, b = 2 * g - c, a.length > 3 && (a[3] = Number(a[3])), a[0] = ia(e + 1 / 3, b, c), a[1] = ia(e, b, c), a[2] = ia(e - 1 / 3, b, c), a) : (a = a.match(q) || ha.transparent, a[0] = Number(a[0]), a[1] = Number(a[1]), a[2] = Number(a[2]), a.length > 3 && (a[3] = Number(a[3])), a)) : ha.black
                    },
                    ka = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#.+?\\b";
                for (j in ha) ka += "|" + j + "\\b";
                ka = RegExp(ka + ")", "gi");
                var la = function(a, b, c, d) {
                        if (null == a) return function(a) {
                            return a
                        };
                        var e, f = b ? (a.match(ka) || [""])[0] : "",
                            g = a.split(f).join("").match(s) || [],
                            h = a.substr(0, a.indexOf(g[0])),
                            i = ")" === a.charAt(a.length - 1) ? ")" : "",
                            j = -1 !== a.indexOf(" ") ? " " : ",",
                            k = g.length,
                            l = k > 0 ? g[0].replace(q, "") : "";
                        return k ? e = b ? function(a) {
                            var b, m, n, o;
                            if ("number" == typeof a) a += l;
                            else if (d && G.test(a)) {
                                for (o = a.replace(G, "|").split("|"), n = 0; o.length > n; n++) o[n] = e(o[n]);
                                return o.join(",")
                            }
                            if (b = (a.match(ka) || [f])[0], m = a.split(b).join("").match(s) || [], n = m.length, k > n--)
                                for (; k > ++n;) m[n] = c ? m[0 | (n - 1) / 2] : g[n];
                            return h + m.join(j) + j + b + i + (-1 !== a.indexOf("inset") ? " inset" : "")
                        } : function(a) {
                            var b, f, m;
                            if ("number" == typeof a) a += l;
                            else if (d && G.test(a)) {
                                for (f = a.replace(G, "|").split("|"), m = 0; f.length > m; m++) f[m] = e(f[m]);
                                return f.join(",")
                            }
                            if (b = a.match(s) || [], m = b.length, k > m--)
                                for (; k > ++m;) b[m] = c ? b[0 | (m - 1) / 2] : g[m];
                            return h + b.join(j) + i
                        } : function(a) {
                            return a
                        }
                    },
                    ma = function(a) {
                        return a = a.split(","),
                            function(b, c, d, e, f, g, h) {
                                var i, j = (c + "").split(" ");
                                for (h = {}, i = 0; 4 > i; i++) h[a[i]] = j[i] = j[i] || j[(i - 1) / 2 >> 0];
                                return e.parse(b, h, f, g)
                            }
                    },
                    na = (O._setPluginRatio = function(a) {
                        this.plugin.setRatio(a);
                        for (var b, c, d, e, f = this.data, g = f.proxy, h = f.firstMPT, i = 1e-6; h;) b = g[h.v], h.r ? b = Math.round(b) : i > b && b > -i && (b = 0), h.t[h.p] = b, h = h._next;
                        if (f.autoRotate && (f.autoRotate.rotation = g.rotation), 1 === a)
                            for (h = f.firstMPT; h;) {
                                if (c = h.t, c.type) {
                                    if (1 === c.type) {
                                        for (e = c.xs0 + c.s + c.xs1, d = 1; c.l > d; d++) e += c["xn" + d] + c["xs" + (d + 1)];
                                        c.e = e
                                    }
                                } else c.e = c.s + c.xs0;
                                h = h._next
                            }
                    }, function(a, b, c, d, e) { this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d) }),
                    oa = (O._parseToProxy = function(a, b, c, d, e, f) {
                        var g, h, i, j, k, l = d,
                            m = {},
                            n = {},
                            o = c._transform,
                            p = J;
                        for (c._transform = null, J = b, d = k = c.parse(a, b, d, e), J = p, f && (c._transform = o, l && (l._prev = null, l._prev && (l._prev._next = null))); d && d !== l;) {
                            if (1 >= d.type && (h = d.p, n[h] = d.s + d.c, m[h] = d.s, f || (j = new na(d, "s", h, j, d.r), d.c = 0), 1 === d.type))
                                for (g = d.l; --g > 0;) i = "xn" + g, h = d.p + "_" + i, n[h] = d.data[i], m[h] = d[i], f || (j = new na(d, i, h, j, d.rxp[i]));
                            d = d._next
                        }
                        return { proxy: m, end: n, firstMPT: j, pt: k }
                    }, O.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) { this.t = a, this.p = b, this.s = d, this.c = e, this.n = i || b, a instanceof oa || f.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, c = !0), this.b = void 0 === l ? d : l, this.e = void 0 === m ? d + e : m, g && (this._next = g, g._prev = this) }),
                    pa = g.parseComplex = function(a, b, c, d, e, f, g, h, i, j) {
                        c = c || f || "", g = new oa(a, b, 0, 0, g, j ? 2 : 1, null, !1, h, c, d), d += "";
                        var l, m, n, o, p, s, t, u, v, w, x, z, A = c.split(", ").join(",").split(" "),
                            B = d.split(", ").join(",").split(" "),
                            C = A.length,
                            D = k !== !1;
                        for ((-1 !== d.indexOf(",") || -1 !== c.indexOf(",")) && (A = A.join(" ").replace(G, ", ").split(" "), B = B.join(" ").replace(G, ", ").split(" "), C = A.length), C !== B.length && (A = (f || "").split(" "), C = A.length), g.plugin = i, g.setRatio = j, l = 0; C > l; l++)
                            if (o = A[l], p = B[l], u = parseFloat(o), u || 0 === u) g.appendXtra("", u, ea(p, u), p.replace(r, ""), D && -1 !== p.indexOf("px"), !0);
                            else if (e && ("#" === o.charAt(0) || ha[o] || y.test(o))) z = "," === p.charAt(p.length - 1) ? ")," : ")", o = ja(o), p = ja(p), v = o.length + p.length > 6, v && !Q && 0 === p[3] ? (g["xs" + g.l] += g.l ? " transparent" : "transparent", g.e = g.e.split(B[l]).join("transparent")) : (Q || (v = !1), g.appendXtra(v ? "rgba(" : "rgb(", o[0], p[0] - o[0], ",", !0, !0).appendXtra("", o[1], p[1] - o[1], ",", !0).appendXtra("", o[2], p[2] - o[2], v ? "," : z, !0), v && (o = 4 > o.length ? 1 : o[3], g.appendXtra("", o, (4 > p.length ? 1 : p[3]) - o, z, !1)));
                        else if (s = o.match(q)) {
                            if (t = p.match(r), !t || t.length !== s.length) return g;
                            for (n = 0, m = 0; s.length > m; m++) x = s[m], w = o.indexOf(x, n), g.appendXtra(o.substr(n, w - n), Number(x), ea(t[m], x), "", D && "px" === o.substr(w + x.length, 2), 0 === m), n = w + x.length;
                            g["xs" + g.l] += o.substr(n)
                        } else g["xs" + g.l] += g.l ? " " + o : o;
                        if (-1 !== d.indexOf("=") && g.data) {
                            for (z = g.xs0 + g.data.s, l = 1; g.l > l; l++) z += g["xs" + l] + g.data["xn" + l];
                            g.e = z + g["xs" + l]
                        }
                        return g.l || (g.type = -1, g.xs0 = g.e), g.xfirst || g
                    },
                    qa = 9;
                for (j = oa.prototype, j.l = j.pr = 0; --qa > 0;) j["xn" + qa] = 0, j["xs" + qa] = "";
                j.xs0 = "", j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null, j.appendXtra = function(a, b, c, d, e, f) {
                    var g = this,
                        h = g.l;
                    return g["xs" + h] += f && h ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new oa(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = { s: b + c }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
                };
                var ra = function(a, b) { b = b || {}, this.p = b.prefix ? V(a) || a : a, i[a] = i[this.p] = this, this.format = b.formatter || la(b.defaultValue, b.color, b.collapsible, b.multi), b.parser && (this.parse = b.parser), this.clrs = b.color, this.multi = b.multi, this.keyword = b.keyword, this.dflt = b.defaultValue, this.pr = b.priority || 0 },
                    sa = O._registerComplexSpecialProp = function(a, b, c) {
                        "object" != typeof b && (b = { parser: c });
                        var d, e, f = a.split(","),
                            g = b.defaultValue;
                        for (c = c || [g], d = 0; f.length > d; d++) b.prefix = 0 === d && b.prefix, b.defaultValue = c[d] || g, e = new ra(f[d], b)
                    },
                    ta = function(a) {
                        if (!i[a]) {
                            var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                            sa(a, {
                                parser: function(a, c, d, e, f, g, j) {
                                    var k = h.com.greensock.plugins[b];
                                    return k ? (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) : (S("Error: " + b + " js file not loaded."), f)
                                }
                            })
                        }
                    };
                j = ra.prototype, j.parseComplex = function(a, b, c, d, e, f) {
                    var g, h, i, j, k, l, m = this.keyword;
                    if (this.multi && (G.test(c) || G.test(b) ? (h = b.replace(G, "|").split("|"), i = c.replace(G, "|").split("|")) : m && (h = [b], i = [c])), i) {
                        for (j = i.length > h.length ? i.length : h.length, g = 0; j > g; g++) b = h[g] = h[g] || this.dflt, c = i[g] = i[g] || this.dflt, m && (k = b.indexOf(m), l = c.indexOf(m), k !== l && (c = -1 === l ? i : h, c[g] += " " + m));
                        b = h.join(", "), c = i.join(", ")
                    }
                    return pa(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f)
                }, j.parse = function(a, b, c, d, f, g) {
                    return this.parseComplex(a.style, this.format(X(a, this.p, e, !1, this.dflt)), this.format(b), f, g)
                }, g.registerSpecialProp = function(a, b, c) {
                    sa(a, {
                        parser: function(a, d, e, f, g, h) {
                            var i = new oa(a, e, 0, 0, g, 2, e, !1, c);
                            return i.plugin = h, i.setRatio = b(a, d, f._tween, e), i
                        },
                        priority: c
                    })
                };
                var ua, va = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
                    wa = V("transform"),
                    xa = T + "transform",
                    ya = V("transformOrigin"),
                    za = null !== V("perspective"),
                    Aa = O.Transform = function() { this.perspective = parseFloat(g.defaultTransformPerspective) || 0, this.force3D = g.defaultForce3D !== !1 && za ? g.defaultForce3D || "auto" : !1 },
                    Ba = window.SVGElement,
                    Ca = function(a, b, c) {
                        var d, e = K.createElementNS("http://www.w3.org/2000/svg", a),
                            f = /([a-z])([A-Z])/g;
                        for (d in c) e.setAttributeNS(null, d.replace(f, "$1-$2").toLowerCase(), c[d]);
                        return b.appendChild(e), e
                    },
                    Da = document.documentElement,
                    Ea = function() {
                        var a, b, c, d = p || /Android/i.test(P) && !window.chrome;
                        return K.createElementNS && !d && (a = Ca("svg", Da), b = Ca("rect", a, { width: 100, height: 50, x: 100 }), c = b.getBoundingClientRect().width, b.style[ya] = "50% 50%", b.style[wa] = "scaleX(0.5)", d = c === b.getBoundingClientRect().width && !(n && za), Da.removeChild(a)), d
                    }(),
                    Fa = function(a, b, c) {
                        var d = a.getBBox();
                        b = da(b).split(" "), c.xOrigin = (-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * d.width : parseFloat(b[0])) + d.x, c.yOrigin = (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * d.height : parseFloat(b[1])) + d.y
                    },
                    Ga = O.getTransform = function(a, b, c, d) {
                        if (a._gsTransform && c && !d) return a._gsTransform;
                        var f, h, i, j, k, l, m, n, o, p, q = c ? a._gsTransform || new Aa : new Aa,
                            r = 0 > q.scaleX,
                            s = 2e-5,
                            t = 1e5,
                            u = za ? parseFloat(X(a, ya, b, !1, "0 0 0").split(" ")[2]) || q.zOrigin || 0 : 0,
                            v = parseFloat(g.defaultTransformPerspective) || 0;
                        if (wa ? h = X(a, xa, b, !0) : a.currentStyle && (h = a.currentStyle.filter.match(E), h = h && 4 === h.length ? [h[0].substr(4), Number(h[2].substr(4)), Number(h[1].substr(4)), h[3].substr(4), q.x || 0, q.y || 0].join(",") : ""), f = !h || "none" === h || "matrix(1, 0, 0, 1, 0, 0)" === h, q.svg = !!(Ba && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM)), q.svg && (Fa(a, X(a, ya, e, !1, "50% 50%") + "", q), ua = g.useSVGTransformAttr || Ea, i = a.getAttribute("transform"), f && i && -1 !== i.indexOf("matrix") && (h = i, f = 0)), !f) {
                            for (i = (h || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], j = i.length; --j > -1;) k = Number(i[j]), i[j] = (l = k - (k |= 0)) ? (0 | l * t + (0 > l ? -.5 : .5)) / t + k : k;
                            if (16 === i.length) {
                                var w, x, y, z, A, B = i[0],
                                    C = i[1],
                                    D = i[2],
                                    F = i[3],
                                    G = i[4],
                                    H = i[5],
                                    J = i[6],
                                    K = i[7],
                                    L = i[8],
                                    M = i[9],
                                    N = i[10],
                                    O = i[12],
                                    P = i[13],
                                    Q = i[14],
                                    R = i[11],
                                    S = Math.atan2(J, N);
                                q.zOrigin && (Q = -q.zOrigin, O = L * Q - i[12], P = M * Q - i[13], Q = N * Q + q.zOrigin - i[14]), q.rotationX = S * I, S && (z = Math.cos(-S), A = Math.sin(-S), w = G * z + L * A, x = H * z + M * A, y = J * z + N * A, L = G * -A + L * z, M = H * -A + M * z, N = J * -A + N * z, R = K * -A + R * z, G = w, H = x, J = y), S = Math.atan2(L, N), q.rotationY = S * I, S && (z = Math.cos(-S), A = Math.sin(-S), w = B * z - L * A, x = C * z - M * A, y = D * z - N * A, M = C * A + M * z, N = D * A + N * z, R = F * A + R * z, B = w, C = x, D = y), S = Math.atan2(C, B), q.rotation = S * I, S && (z = Math.cos(-S), A = Math.sin(-S), B = B * z + G * A, x = C * z + H * A, H = C * -A + H * z, J = D * -A + J * z, C = x), q.rotationX && Math.abs(q.rotationX) + Math.abs(q.rotation) > 359.9 && (q.rotationX = q.rotation = 0, q.rotationY += 180), q.scaleX = (0 | Math.sqrt(B * B + C * C) * t + .5) / t, q.scaleY = (0 | Math.sqrt(H * H + M * M) * t + .5) / t, q.scaleZ = (0 | Math.sqrt(J * J + N * N) * t + .5) / t, q.skewX = 0, q.perspective = R ? 1 / (0 > R ? -R : R) : 0, q.x = O, q.y = P, q.z = Q
                            } else if (!(za && !d && i.length && q.x === i[4] && q.y === i[5] && (q.rotationX || q.rotationY) || void 0 !== q.x && "none" === X(a, "display", b))) {
                                var T = i.length >= 6,
                                    U = T ? i[0] : 1,
                                    V = i[1] || 0,
                                    W = i[2] || 0,
                                    Y = T ? i[3] : 1;
                                q.x = i[4] || 0, q.y = i[5] || 0, m = Math.sqrt(U * U + V * V), n = Math.sqrt(Y * Y + W * W), o = U || V ? Math.atan2(V, U) * I : q.rotation || 0, p = W || Y ? Math.atan2(W, Y) * I + o : q.skewX || 0, Math.abs(p) > 90 && 270 > Math.abs(p) && (r ? (m *= -1, p += 0 >= o ? 180 : -180, o += 0 >= o ? 180 : -180) : (n *= -1, p += 0 >= p ? 180 : -180)), q.scaleX = m, q.scaleY = n, q.rotation = o, q.skewX = p, za && (q.rotationX = q.rotationY = q.z = 0, q.perspective = v, q.scaleZ = 1)
                            }
                            q.zOrigin = u;
                            for (j in q) s > q[j] && q[j] > -s && (q[j] = 0)
                        }
                        return c && (a._gsTransform = q), q
                    },
                    Ha = function(a) {
                        var b, c, d = this.data,
                            e = -d.rotation * H,
                            f = e + d.skewX * H,
                            g = 1e5,
                            h = (0 | Math.cos(e) * d.scaleX * g) / g,
                            i = (0 | Math.sin(e) * d.scaleX * g) / g,
                            j = (0 | Math.sin(f) * -d.scaleY * g) / g,
                            k = (0 | Math.cos(f) * d.scaleY * g) / g,
                            l = this.t.style,
                            m = this.t.currentStyle;
                        if (m) {
                            c = i, i = -j, j = -c, b = m.filter, l.filter = "";
                            var n, o, q = this.t.offsetWidth,
                                r = this.t.offsetHeight,
                                s = "absolute" !== m.position,
                                t = "progid:DXImageTransform.Microsoft.Matrix(M11=" + h + ", M12=" + i + ", M21=" + j + ", M22=" + k,
                                w = d.x + q * d.xPercent / 100,
                                x = d.y + r * d.yPercent / 100;
                            if (null != d.ox && (n = (d.oxp ? .01 * q * d.ox : d.ox) - q / 2, o = (d.oyp ? .01 * r * d.oy : d.oy) - r / 2, w += n - (n * h + o * i), x += o - (n * j + o * k)), s ? (n = q / 2, o = r / 2, t += ", Dx=" + (n - (n * h + o * i) + w) + ", Dy=" + (o - (n * j + o * k) + x) + ")") : t += ", sizingMethod='auto expand')", l.filter = -1 !== b.indexOf("DXImageTransform.Microsoft.Matrix(") ? b.replace(F, t) : t + " " + b, (0 === a || 1 === a) && 1 === h && 0 === i && 0 === j && 1 === k && (s && -1 === t.indexOf("Dx=0, Dy=0") || v.test(b) && 100 !== parseFloat(RegExp.$1) || -1 === b.indexOf(b.indexOf("Alpha")) && l.removeAttribute("filter")), !s) {
                                var y, z, A, B = 8 > p ? 1 : -1;
                                for (n = d.ieOffsetX || 0, o = d.ieOffsetY || 0, d.ieOffsetX = Math.round((q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 + w), d.ieOffsetY = Math.round((r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 + x), qa = 0; 4 > qa; qa++) z = ba[qa], y = m[z], c = -1 !== y.indexOf("px") ? parseFloat(y) : Y(this.t, z, parseFloat(y), y.replace(u, "")) || 0, A = c !== d[z] ? 2 > qa ? -d.ieOffsetX : -d.ieOffsetY : 2 > qa ? n - d.ieOffsetX : o - d.ieOffsetY, l[z] = (d[z] = Math.round(c - A * (0 === qa || 2 === qa ? 1 : B))) + "px"
                            }
                        }
                    },
                    Ia = O.set3DTransformRatio = function(a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m, o, p, q, r, s, t, u, v, w, x = this.data,
                            y = this.t.style,
                            z = x.rotation * H,
                            A = x.scaleX,
                            B = x.scaleY,
                            C = x.scaleZ,
                            D = x.x,
                            E = x.y,
                            F = x.z,
                            G = x.perspective;
                        if (!(1 !== a && 0 !== a && x.force3D || x.force3D === !0 || x.rotationY || x.rotationX || 1 !== C || G || F)) return void Ja.call(this, a);
                        if (n && (p = 1e-4, p > A && A > -p && (A = C = 2e-5), p > B && B > -p && (B = C = 2e-5), !G || x.z || x.rotationX || x.rotationY || (G = 0)), z || x.skewX) q = b = Math.cos(z), r = e = Math.sin(z), x.skewX && (z -= x.skewX * H, q = Math.cos(z), r = Math.sin(z), "simple" === x.skewType && (s = Math.tan(x.skewX * H), s = Math.sqrt(1 + s * s), q *= s, r *= s)), c = -r, f = q;
                        else {
                            if (!(x.rotationY || x.rotationX || 1 !== C || G || x.svg)) return void(y[wa] = (x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) translate3d(" : "translate3d(") + D + "px," + E + "px," + F + "px)" + (1 !== A || 1 !== B ? " scale(" + A + "," + B + ")" : ""));
                            b = f = 1, c = e = 0
                        }
                        j = 1, d = g = h = i = k = l = 0, m = G ? -1 / G : 0, o = x.zOrigin, p = 1e-6, v = ",", w = "0", z = x.rotationY * H, z && (q = Math.cos(z), r = Math.sin(z), h = -r, k = m * -r, d = b * r, g = e * r, j = q, m *= q, b *= q, e *= q), z = x.rotationX * H, z && (q = Math.cos(z), r = Math.sin(z), s = c * q + d * r, t = f * q + g * r, i = j * r, l = m * r, d = c * -r + d * q, g = f * -r + g * q, j *= q, m *= q, c = s, f = t), 1 !== C && (d *= C, g *= C, j *= C, m *= C), 1 !== B && (c *= B, f *= B, i *= B, l *= B), 1 !== A && (b *= A, e *= A, h *= A, k *= A), (o || x.svg) && (o && (D += d * -o, E += g * -o, F += j * -o + o), x.svg && (D += x.xOrigin - (x.xOrigin * b + x.yOrigin * c), E += x.yOrigin - (x.xOrigin * e + x.yOrigin * f)), p > D && D > -p && (D = w), p > E && E > -p && (E = w), p > F && F > -p && (F = 0)), u = x.xPercent || x.yPercent ? "translate(" + x.xPercent + "%," + x.yPercent + "%) matrix3d(" : "matrix3d(", u += (p > b && b > -p ? w : b) + v + (p > e && e > -p ? w : e) + v + (p > h && h > -p ? w : h), u += v + (p > k && k > -p ? w : k) + v + (p > c && c > -p ? w : c) + v + (p > f && f > -p ? w : f), x.rotationX || x.rotationY ? (u += v + (p > i && i > -p ? w : i) + v + (p > l && l > -p ? w : l) + v + (p > d && d > -p ? w : d), u += v + (p > g && g > -p ? w : g) + v + (p > j && j > -p ? w : j) + v + (p > m && m > -p ? w : m) + v) : u += ",0,0,0,0,1,0,", u += D + v + E + v + F + v + (G ? 1 + -F / G : 1) + ")", y[wa] = u
                    },
                    Ja = O.set2DTransformRatio = function(a) {
                        var b, c, d, e, f, g, h, i, j, k, l, m = this.data,
                            n = this.t,
                            o = n.style,
                            p = m.x,
                            q = m.y;
                        return !(m.rotationX || m.rotationY || m.z || m.force3D === !0 || "auto" === m.force3D && 1 !== a && 0 !== a) || m.svg && ua || !za ? (e = m.scaleX, f = m.scaleY, void(m.rotation || m.skewX || m.svg ? (b = m.rotation * H, c = b - m.skewX * H, d = 1e5, g = Math.cos(b) * e, h = Math.sin(b) * e, i = Math.sin(c) * -f, j = Math.cos(c) * f, m.svg && (p += m.xOrigin - (m.xOrigin * g + m.yOrigin * i), q += m.yOrigin - (m.xOrigin * h + m.yOrigin * j), l = 1e-6, l > p && p > -l && (p = 0), l > q && q > -l && (q = 0)), k = (0 | g * d) / d + "," + (0 | h * d) / d + "," + (0 | i * d) / d + "," + (0 | j * d) / d + "," + p + "," + q + ")", m.svg && ua ? n.setAttribute("transform", "matrix(" + k) : o[wa] = (m.xPercent || m.yPercent ? "translate(" + m.xPercent + "%," + m.yPercent + "%) matrix(" : "matrix(") + k) : o[wa] = (m.xPercent || m.yPercent ? "translate(" + m.xPercent + "%," + m.yPercent + "%) matrix(" : "matrix(") + e + ",0,0," + f + "," + p + "," + q + ")")) : (this.setRatio = Ia, void Ia.call(this, a))
                    };
                j = Aa.prototype, j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = 0, j.scaleX = j.scaleY = j.scaleZ = 1, sa("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent", {
                    parser: function(a, b, c, d, f, h, i) {
                        if (d._lastParsedTransform === i) return f;
                        d._lastParsedTransform = i;
                        var j, k, l, m, n, o, p, q = d._transform = Ga(a, e, !0, i.parseTransform),
                            r = a.style,
                            s = 1e-6,
                            t = va.length,
                            u = i,
                            v = {};
                        if ("string" == typeof u.transform && wa) l = M.style, l[wa] = u.transform, l.display = "block", l.position = "absolute", K.body.appendChild(M), j = Ga(M, null, !1), K.body.removeChild(M);
                        else if ("object" == typeof u) {
                            if (j = { scaleX: fa(null != u.scaleX ? u.scaleX : u.scale, q.scaleX), scaleY: fa(null != u.scaleY ? u.scaleY : u.scale, q.scaleY), scaleZ: fa(u.scaleZ, q.scaleZ), x: fa(u.x, q.x), y: fa(u.y, q.y), z: fa(u.z, q.z), xPercent: fa(u.xPercent, q.xPercent), yPercent: fa(u.yPercent, q.yPercent), perspective: fa(u.transformPerspective, q.perspective) }, p = u.directionalRotation, null != p)
                                if ("object" == typeof p)
                                    for (l in p) u[l] = p[l];
                                else u.rotation = p;
                                "string" == typeof u.x && -1 !== u.x.indexOf("%") && (j.x = 0, j.xPercent = fa(u.x, q.xPercent)), "string" == typeof u.y && -1 !== u.y.indexOf("%") && (j.y = 0, j.yPercent = fa(u.y, q.yPercent)), j.rotation = ga("rotation" in u ? u.rotation : "shortRotation" in u ? u.shortRotation + "_short" : "rotationZ" in u ? u.rotationZ : q.rotation, q.rotation, "rotation", v), za && (j.rotationX = ga("rotationX" in u ? u.rotationX : "shortRotationX" in u ? u.shortRotationX + "_short" : q.rotationX || 0, q.rotationX, "rotationX", v), j.rotationY = ga("rotationY" in u ? u.rotationY : "shortRotationY" in u ? u.shortRotationY + "_short" : q.rotationY || 0, q.rotationY, "rotationY", v)), j.skewX = null == u.skewX ? q.skewX : ga(u.skewX, q.skewX), j.skewY = null == u.skewY ? q.skewY : ga(u.skewY, q.skewY), (k = j.skewY - q.skewY) && (j.skewX += k, j.rotation += k)
                        }
                        for (za && null != u.force3D && (q.force3D = u.force3D, o = !0), q.skewType = u.skewType || q.skewType || g.defaultSkewType, n = q.force3D || q.z || q.rotationX || q.rotationY || j.z || j.rotationX || j.rotationY || j.perspective, n || null == u.scale || (j.scaleZ = 1); --t > -1;) c = va[t], m = j[c] - q[c], (m > s || -s > m || null != u[c] || null != J[c]) && (o = !0, f = new oa(q, c, q[c], m, f), c in v && (f.e = v[c]), f.xs0 = 0, f.plugin = h, d._overwriteProps.push(f.n));
                        return m = u.transformOrigin, m && q.svg && (Fa(a, da(m), j), f = new oa(q, "xOrigin", q.xOrigin, j.xOrigin - q.xOrigin, f, -1, "transformOrigin"), f.b = q.xOrigin, f.e = f.xs0 = j.xOrigin, f = new oa(q, "yOrigin", q.yOrigin, j.yOrigin - q.yOrigin, f, -1, "transformOrigin"), f.b = q.yOrigin, f.e = f.xs0 = j.yOrigin, m = "0px 0px"), (m || za && n && q.zOrigin) && (wa ? (o = !0, c = ya, m = (m || X(a, c, e, !1, "50% 50%")) + "", f = new oa(r, c, 0, 0, f, -1, "transformOrigin"), f.b = r[c], f.plugin = h, za ? (l = q.zOrigin, m = m.split(" "), q.zOrigin = (m.length > 2 && (0 === l || "0px" !== m[2]) ? parseFloat(m[2]) : l) || 0, f.xs0 = f.e = m[0] + " " + (m[1] || "50%") + " 0px", f = new oa(q, "zOrigin", 0, 0, f, -1, f.n), f.b = l, f.xs0 = f.e = q.zOrigin) : f.xs0 = f.e = m) : da(m + "", q)), o && (d._transformType = q.svg && ua || !n && 3 !== this._transformType ? 2 : 3), f
                    },
                    prefix: !0
                }), sa("boxShadow", { defaultValue: "0px 0px 0px 0px #999", prefix: !0, color: !0, multi: !0, keyword: "inset" }), sa("borderRadius", {
                    defaultValue: "0px",
                    parser: function(a, b, c, f, g) {
                        b = this.format(b);
                        var h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                            y = a.style;
                        for (p = parseFloat(a.offsetWidth), q = parseFloat(a.offsetHeight), h = b.split(" "), i = 0; x.length > i; i++) this.p.indexOf("border") && (x[i] = V(x[i])), l = k = X(a, x[i], e, !1, "0px"), -1 !== l.indexOf(" ") && (k = l.split(" "), l = k[0], k = k[1]), m = j = h[i], n = parseFloat(l), s = l.substr((n + "").length), t = "=" === m.charAt(1), t ? (o = parseInt(m.charAt(0) + "1", 10), m = m.substr(2), o *= parseFloat(m), r = m.substr((o + "").length - (0 > o ? 1 : 0)) || "") : (o = parseFloat(m), r = m.substr((o + "").length)), "" === r && (r = d[c] || s), r !== s && (u = Y(a, "borderLeft", n, s), v = Y(a, "borderTop", n, s), "%" === r ? (l = 100 * (u / p) + "%", k = 100 * (v / q) + "%") : "em" === r ? (w = Y(a, "borderLeft", 1, "em"), l = u / w + "em", k = v / w + "em") : (l = u + "px", k = v + "px"), t && (m = parseFloat(l) + o + r, j = parseFloat(k) + o + r)), g = pa(y, x[i], l + " " + k, m + " " + j, !1, "0px", g);
                        return g
                    },
                    prefix: !0,
                    formatter: la("0px 0px 0px 0px", !1, !0)
                }), sa("backgroundPosition", {
                    defaultValue: "0 0",
                    parser: function(a, b, c, d, f, g) {
                        var h, i, j, k, l, m, n = "background-position",
                            o = e || W(a, null),
                            q = this.format((o ? p ? o.getPropertyValue(n + "-x") + " " + o.getPropertyValue(n + "-y") : o.getPropertyValue(n) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                            r = this.format(b);
                        if (-1 !== q.indexOf("%") != (-1 !== r.indexOf("%")) && (m = X(a, "backgroundImage").replace(B, ""), m && "none" !== m)) {
                            for (h = q.split(" "), i = r.split(" "), N.setAttribute("src", m), j = 2; --j > -1;) q = h[j], k = -1 !== q.indexOf("%"), k !== (-1 !== i[j].indexOf("%")) && (l = 0 === j ? a.offsetWidth - N.width : a.offsetHeight - N.height, h[j] = k ? parseFloat(q) / 100 * l + "px" : 100 * (parseFloat(q) / l) + "%");
                            q = h.join(" ")
                        }
                        return this.parseComplex(a.style, q, r, f, g)
                    },
                    formatter: da
                }), sa("backgroundSize", { defaultValue: "0 0", formatter: da }), sa("perspective", { defaultValue: "0px", prefix: !0 }), sa("perspectiveOrigin", { defaultValue: "50% 50%", prefix: !0 }), sa("transformStyle", { prefix: !0 }), sa("backfaceVisibility", { prefix: !0 }), sa("userSelect", { prefix: !0 }), sa("margin", { parser: ma("marginTop,marginRight,marginBottom,marginLeft") }), sa("padding", { parser: ma("paddingTop,paddingRight,paddingBottom,paddingLeft") }), sa("clip", {
                    defaultValue: "rect(0px,0px,0px,0px)",
                    parser: function(a, b, c, d, f, g) {
                        var h, i, j;
                        return 9 > p ? (i = a.currentStyle, j = 8 > p ? " " : ",", h = "rect(" + i.clipTop + j + i.clipRight + j + i.clipBottom + j + i.clipLeft + ")", b = this.format(b).split(",").join(j)) : (h = this.format(X(a, this.p, e, !1, this.dflt)), b = this.format(b)), this.parseComplex(a.style, h, b, f, g)
                    }
                }), sa("textShadow", { defaultValue: "0px 0px 0px #999", color: !0, multi: !0 }), sa("autoRound,strictUnits", {
                    parser: function(a, b, c, d, e) {
                        return e
                    }
                }), sa("border", {
                    defaultValue: "0px solid #000",
                    parser: function(a, b, c, d, f, g) {
                        return this.parseComplex(a.style, this.format(X(a, "borderTopWidth", e, !1, "0px") + " " + X(a, "borderTopStyle", e, !1, "solid") + " " + X(a, "borderTopColor", e, !1, "#000")), this.format(b), f, g)
                    },
                    color: !0,
                    formatter: function(a) {
                        var b = a.split(" ");
                        return b[0] + " " + (b[1] || "solid") + " " + (a.match(ka) || ["#000"])[0]
                    }
                }), sa("borderWidth", { parser: ma("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth") }), sa("float,cssFloat,styleFloat", {
                    parser: function(a, b, c, d, e) {
                        var f = a.style,
                            g = "cssFloat" in f ? "cssFloat" : "styleFloat";
                        return new oa(f, g, 0, 0, e, -1, c, !1, 0, f[g], b)
                    }
                });
                var Ka = function(a) {
                    var b, c = this.t,
                        d = c.filter || X(this.data, "filter") || "",
                        e = 0 | this.s + this.c * a;
                    100 === e && (-1 === d.indexOf("atrix(") && -1 === d.indexOf("radient(") && -1 === d.indexOf("oader(") ? (c.removeAttribute("filter"), b = !X(this.data, "filter")) : (c.filter = d.replace(x, ""), b = !0)), b || (this.xn1 && (c.filter = d = d || "alpha(opacity=" + e + ")"), -1 === d.indexOf("pacity") ? 0 === e && this.xn1 || (c.filter = d + " alpha(opacity=" + e + ")") : c.filter = d.replace(v, "opacity=" + e))
                };
                sa("opacity,alpha,autoAlpha", {
                    defaultValue: "1",
                    parser: function(a, b, c, d, f, g) {
                        var h = parseFloat(X(a, "opacity", e, !1, "1")),
                            i = a.style,
                            j = "autoAlpha" === c;
                        return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h), j && 1 === h && "hidden" === X(a, "visibility", e) && 0 !== b && (h = 0), Q ? f = new oa(i, "opacity", h, b - h, f) : (f = new oa(i, "opacity", 100 * h, 100 * (b - h), f), f.xn1 = j ? 1 : 0, i.zoom = 1, f.type = 2, f.b = "alpha(opacity=" + f.s + ")", f.e = "alpha(opacity=" + (f.s + f.c) + ")", f.data = a, f.plugin = g, f.setRatio = Ka), j && (f = new oa(i, "visibility", 0, 0, f, -1, null, !1, 0, 0 !== h ? "inherit" : "hidden", 0 === b ? "hidden" : "inherit"), f.xs0 = "inherit", d._overwriteProps.push(f.n), d._overwriteProps.push(c)), f
                    }
                });
                var La = function(a, b) { b && (a.removeProperty ? ("ms" === b.substr(0, 2) && (b = "M" + b.substr(1)), a.removeProperty(b.replace(z, "-$1").toLowerCase())) : a.removeAttribute(b)) },
                    Ma = function(a) {
                        if (this.t._gsClassPT = this, 1 === a || 0 === a) {
                            this.t.setAttribute("class", 0 === a ? this.b : this.e);
                            for (var b = this.data, c = this.t.style; b;) b.v ? c[b.p] = b.v : La(c, b.p), b = b._next;
                            1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                        } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
                    };
                sa("className", {
                    parser: function(a, b, d, f, g, h, i) {
                        var j, k, l, m, n, o = a.getAttribute("class") || "",
                            p = a.style.cssText;
                        if (g = f._classNamePT = new oa(a, d, 0, 0, g, 2), g.setRatio = Ma, g.pr = -11, c = !0, g.b = o, k = $(a, e), l = a._gsClassPT) {
                            for (m = {}, n = l.data; n;) m[n.p] = 1, n = n._next;
                            l.setRatio(1)
                        }
                        return a._gsClassPT = g, g.e = "=" !== b.charAt(1) ? b : o.replace(RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""), f._tween._duration && (a.setAttribute("class", g.e), j = _(a, k, $(a), i, m), a.setAttribute("class", o), g.data = j.firstMPT, a.style.cssText = p, g = g.xfirst = f.parse(a, j.difs, g, h)), g
                    }
                });
                var Na = function(a) {
                    if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                        var b, c, d, e, f = this.t.style,
                            g = i.transform.parse;
                        if ("all" === this.e) f.cssText = "", e = !0;
                        else
                            for (b = this.e.split(" ").join("").split(","), d = b.length; --d > -1;) c = b[d], i[c] && (i[c].parse === g ? e = !0 : c = "transformOrigin" === c ? ya : i[c].p), La(f, c);
                        e && (La(f, wa), this.t._gsTransform && delete this.t._gsTransform)
                    }
                };
                for (sa("clearProps", {
                        parser: function(a, b, d, e, f) {
                            return f = new oa(a, d, 0, 0, f, 2), f.setRatio = Na, f.e = b, f.pr = -10, f.data = e._tween, c = !0, f
                        }
                    }), j = "bezier,throwProps,physicsProps,physics2D".split(","), qa = j.length; qa--;) ta(j[qa]);
                j = g.prototype, j._firstPT = j._lastParsedTransform = j._transform = null, j._onInitTween = function(a, b, h) {
                    if (!a.nodeType) return !1;
                    this._target = a, this._tween = h, this._vars = b, k = b.autoRound, c = !1, d = b.suffixMap || g.suffixMap, e = W(a, ""), f = this._overwriteProps;
                    var i, j, n, p, q, r, s, t, u, v = a.style;
                    if (l && "" === v.zIndex && (i = X(a, "zIndex", e), ("auto" === i || "" === i) && this._addLazySet(v, "zIndex", 0)), "string" == typeof b && (p = v.cssText, i = $(a, e), v.cssText = p + ";" + b, i = _(a, i, $(a)).difs, !Q && w.test(b) && (i.opacity = parseFloat(RegExp.$1)), b = i, v.cssText = p), this._firstPT = j = this.parse(a, b, null), this._transformType) {
                        for (u = 3 === this._transformType, wa ? m && (l = !0, "" === v.zIndex && (s = X(a, "zIndex", e), ("auto" === s || "" === s) && this._addLazySet(v, "zIndex", 0)), o && this._addLazySet(v, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (u ? "visible" : "hidden"))) : v.zoom = 1, n = j; n && n._next;) n = n._next;
                        t = new oa(a, "transform", 0, 0, null, 2), this._linkCSSP(t, null, n), t.setRatio = u && za ? Ia : wa ? Ja : Ha, t.data = this._transform || Ga(a, e, !0), f.pop()
                    }
                    if (c) {
                        for (; j;) {
                            for (r = j._next, n = p; n && n.pr > j.pr;) n = n._next;
                            (j._prev = n ? n._prev : q) ? j._prev._next = j: p = j, (j._next = n) ? n._prev = j : q = j, j = r
                        }
                        this._firstPT = p
                    }
                    return !0
                }, j.parse = function(a, b, c, f) {
                    var g, h, j, l, m, n, o, p, q, r, s = a.style;
                    for (g in b) n = b[g], h = i[g], h ? c = h.parse(a, n, g, this, c, f, b) : (m = X(a, g, e) + "", q = "string" == typeof n, "color" === g || "fill" === g || "stroke" === g || -1 !== g.indexOf("Color") || q && y.test(n) ? (q || (n = ja(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = pa(s, g, m, n, !0, "transparent", c, 0, f)) : !q || -1 === n.indexOf(" ") && -1 === n.indexOf(",") ? (j = parseFloat(m), o = j || 0 === j ? m.substr((j + "").length) : "", ("" === m || "auto" === m) && ("width" === g || "height" === g ? (j = ca(a, g, e), o = "px") : "left" === g || "top" === g ? (j = Z(a, g, e), o = "px") : (j = "opacity" !== g ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.replace(u, "")) : (l = parseFloat(n), p = q ? n.replace(u, "") : ""), "" === p && (p = g in d ? d[g] : o), n = l || 0 === l ? (r ? l + j : l) + p : b[g], o !== p && "" !== p && (l || 0 === l) && j && (j = Y(a, g, j, o), "%" === p ? (j /= Y(a, g, 100, "%") / 100, b.strictUnits !== !0 && (m = j + "%")) : "em" === p ? j /= Y(a, g, 1, "em") : "px" !== p && (l = Y(a, g, l, p), p = "px"), r && (l || 0 === l) && (n = l + j + p)), r && (l += j), !j && 0 !== j || !l && 0 !== l ? void 0 !== s[g] && (n || "NaN" != n + "" && null != n) ? (c = new oa(s, g, l || j || 0, 0, c, -1, g, !1, 0, m, n), c.xs0 = "none" !== n || "display" !== g && -1 === g.indexOf("Style") ? n : m) : S("invalid " + g + " tween value: " + b[g]) : (c = new oa(s, g, j, l - j, c, 0, g, k !== !1 && ("px" === p || "zIndex" === g), 0, m, n), c.xs0 = p)) : c = pa(s, g, m, n, !0, null, c, 0, f)), f && c && !c.plugin && (c.plugin = f);
                    return c
                }, j.setRatio = function(a) {
                    var b, c, d, e = this._firstPT,
                        f = 1e-6;
                    if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                        if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                            for (; e;) {
                                if (b = e.c * a + e.s, e.r ? b = Math.round(b) : f > b && b > -f && (b = 0), e.type)
                                    if (1 === e.type)
                                        if (d = e.l, 2 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                        else if (3 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === d) e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    for (c = e.xs0 + b + e.xs1, d = 1; e.l > d; d++) c += e["xn" + d] + e["xs" + (d + 1)];
                                    e.t[e.p] = c
                                } else -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                                else e.t[e.p] = b + e.xs0;
                                e = e._next
                            } else
                                for (; e;) 2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a), e = e._next;
                        else
                            for (; e;) 2 !== e.type ? e.t[e.p] = e.e : e.setRatio(a), e = e._next
                }, j._enableTransforms = function(a) { this._transform = this._transform || Ga(this._target, e, !0), this._transformType = this._transform.svg && ua || !a && 3 !== this._transformType ? 2 : 3 };
                var Oa = function() { this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0) };
                j._addLazySet = function(a, b, c) {
                    var d = this._firstPT = new oa(a, b, 0, 0, this._firstPT, 2);
                    d.e = c, d.setRatio = Oa, d.data = this
                }, j._linkCSSP = function(a, b, c, d) {
                    return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next, d = !0), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._next = b, a._prev = c), a
                }, j._kill = function(b) {
                    var c, d, e, f = b;
                    if (b.autoAlpha || b.alpha) {
                        f = {};
                        for (d in b) f[d] = b[d];
                        f.opacity = 1, f.autoAlpha && (f.visibility = 1)
                    }
                    return b.className && (c = this._classNamePT) && (e = c.xfirst, e && e._prev ? this._linkCSSP(e._prev, c._next, e._prev._prev) : e === this._firstPT && (this._firstPT = c._next), c._next && this._linkCSSP(c._next, c._next._next, e._prev), this._classNamePT = null), a.prototype._kill.call(this, f)
                };
                var Pa = function(a, b, c) {
                    var d, e, f, g;
                    if (a.slice)
                        for (e = a.length; --e > -1;) Pa(a[e], b, c);
                    else
                        for (d = a.childNodes, e = d.length; --e > -1;) f = d[e], g = f.type, f.style && (b.push($(f)), c && c.push(f)), 1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Pa(f, b, c)
                };
                return g.cascadeTo = function(a, c, d) {
                    var e, f, g, h = b.to(a, c, d),
                        i = [h],
                        j = [],
                        k = [],
                        l = [],
                        m = b._internals.reservedProps;
                    for (a = h._targets || h.target, Pa(a, j, l), h.render(c, !0), Pa(a, k), h.render(0, !0), h._enabled(!0), e = l.length; --e > -1;)
                        if (f = _(l[e], j[e], k[e]), f.firstMPT) {
                            f = f.difs;
                            for (g in d) m[g] && (f[g] = d[g]);
                            i.push(b.to(l[e], c, f))
                        }
                    return i
                }, a.activate([g]), g
            }, !0),
            function() {
                var a = _gsScope._gsDefine.plugin({
                        propName: "roundProps",
                        priority: -1,
                        API: 2,
                        init: function(a, b, c) {
                            return this._tween = c, !0
                        }
                    }),
                    b = a.prototype;
                b._onInitAllProps = function() {
                    for (var a, b, c, d = this._tween, e = d.vars.roundProps instanceof Array ? d.vars.roundProps : d.vars.roundProps.split(","), f = e.length, g = {}, h = d._propLookup.roundProps; --f > -1;) g[e[f]] = 1;
                    for (f = e.length; --f > -1;)
                        for (a = e[f], b = d._firstPT; b;) c = b._next, b.pg ? b.t._roundProps(g, !0) : b.n === a && (this._add(b.t, a, b.s, b.c), c && (c._prev = b._prev), b._prev ? b._prev._next = c : d._firstPT === b && (d._firstPT = c), b._next = b._prev = null, d._propLookup[a] = h), b = c;
                    return !1
                }, b._add = function(a, b, c, d) { this._addTween(a, b, c, c + d, b, !0), this._overwriteProps.push(b) }
            }(), _gsScope._gsDefine.plugin({
                propName: "attr",
                API: 2,
                version: "0.3.3",
                init: function(a, b) {
                    var c, d, e;
                    if ("function" != typeof a.setAttribute) return !1;
                    this._target = a, this._proxy = {}, this._start = {}, this._end = {};
                    for (c in b) this._start[c] = this._proxy[c] = d = a.getAttribute(c), e = this._addTween(this._proxy, c, parseFloat(d), b[c], c), this._end[c] = e ? e.s + e.c : b[c], this._overwriteProps.push(c);
                    return !0
                },
                set: function(a) {
                    this._super.setRatio.call(this, a);
                    for (var b, c = this._overwriteProps, d = c.length, e = 1 === a ? this._end : a ? this._proxy : this._start; --d > -1;) b = c[d], this._target.setAttribute(b, e[b] + "")
                }
            }), _gsScope._gsDefine.plugin({
                propName: "directionalRotation",
                version: "0.2.1",
                API: 2,
                init: function(a, b) {
                    "object" != typeof b && (b = { rotation: b }), this.finals = {};
                    var c, d, e, f, g, h, i = b.useRadians === !0 ? 2 * Math.PI : 360,
                        j = 1e-6;
                    for (c in b) "useRadians" !== c && (h = (b[c] + "").split("_"), d = h[0], e = parseFloat("function" != typeof a[c] ? a[c] : a[c.indexOf("set") || "function" != typeof a["get" + c.substr(3)] ? c : "get" + c.substr(3)]()), f = this.finals[c] = "string" == typeof d && "=" === d.charAt(1) ? e + parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2)) : Number(d) || 0, g = f - e, h.length && (d = h.join("_"), -1 !== d.indexOf("short") && (g %= i, g !== g % (i / 2) && (g = 0 > g ? g + i : g - i)), -1 !== d.indexOf("_cw") && 0 > g ? g = (g + 9999999999 * i) % i - (0 | g / i) * i : -1 !== d.indexOf("ccw") && g > 0 && (g = (g - 9999999999 * i) % i - (0 | g / i) * i)), (g > j || -j > g) && (this._addTween(a, c, e, e + g, c), this._overwriteProps.push(c)));
                    return !0
                },
                set: function(a) {
                    var b;
                    if (1 !== a) this._super.setRatio.call(this, a);
                    else
                        for (b = this._firstPT; b;) b.f ? b.t[b.p](this.finals[b.p]) : b.t[b.p] = this.finals[b.p], b = b._next
                }
            })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(a) {
                var b, c, d, e = _gsScope.GreenSockGlobals || _gsScope,
                    f = e.com.greensock,
                    g = 2 * Math.PI,
                    h = Math.PI / 2,
                    i = f._class,
                    j = function(b, c) {
                        var d = i("easing." + b, function() {}, !0),
                            e = d.prototype = new a;
                        return e.constructor = d, e.getRatio = c, d
                    },
                    k = a.register || function() {},
                    l = function(a, b, c, d) {
                        var e = i("easing." + a, { easeOut: new b, easeIn: new c, easeInOut: new d }, !0);
                        return k(e, a), e
                    },
                    m = function(a, b, c) { this.t = a, this.v = b, c && (this.next = c, c.prev = this, this.c = c.v - b, this.gap = c.t - a) },
                    n = function(b, c) {
                        var d = i("easing." + b, function(a) { this._p1 = a || 0 === a ? a : 1.70158, this._p2 = 1.525 * this._p1 }, !0),
                            e = d.prototype = new a;
                        return e.constructor = d, e.getRatio = c, e.config = function(a) {
                            return new d(a)
                        }, d
                    },
                    o = l("Back", n("BackOut", function(a) {
                        return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1
                    }), n("BackIn", function(a) {
                        return a * a * ((this._p1 + 1) * a - this._p1)
                    }), n("BackInOut", function(a) {
                        return 1 > (a *= 2) ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
                    })),
                    p = i("easing.SlowMo", function(a, b, c) { b = b || 0 === b ? b : .7, null == a ? a = .7 : a > 1 && (a = 1), this._p = 1 !== a ? b : 0, this._p1 = (1 - a) / 2, this._p2 = a, this._p3 = this._p1 + this._p2, this._calcEnd = c === !0 }, !0),
                    q = p.prototype = new a;
                return q.constructor = p, q.getRatio = function(a) {
                    var b = a + (.5 - a) * this._p;
                    return this._p1 > a ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
                }, p.ease = new p(.7, .7), q.config = p.config = function(a, b, c) {
                    return new p(a, b, c)
                }, b = i("easing.SteppedEase", function(a) { a = a || 1, this._p1 = 1 / a, this._p2 = a + 1 }, !0), q = b.prototype = new a, q.constructor = b, q.getRatio = function(a) {
                    return 0 > a ? a = 0 : a >= 1 && (a = .999999999), (this._p2 * a >> 0) * this._p1
                }, q.config = b.config = function(a) {
                    return new b(a)
                }, c = i("easing.RoughEase", function(b) {
                    b = b || {};
                    for (var c, d, e, f, g, h, i = b.taper || "none", j = [], k = 0, l = 0 | (b.points || 20), n = l, o = b.randomize !== !1, p = b.clamp === !0, q = b.template instanceof a ? b.template : null, r = "number" == typeof b.strength ? .4 * b.strength : .4; --n > -1;) c = o ? Math.random() : 1 / l * n, d = q ? q.getRatio(c) : c, "none" === i ? e = r : "out" === i ? (f = 1 - c, e = f * f * r) : "in" === i ? e = c * c * r : .5 > c ? (f = 2 * c, e = .5 * f * f * r) : (f = 2 * (1 - c), e = .5 * f * f * r), o ? d += Math.random() * e - .5 * e : n % 2 ? d += .5 * e : d -= .5 * e, p && (d > 1 ? d = 1 : 0 > d && (d = 0)), j[k++] = { x: c, y: d };
                    for (j.sort(function(a, b) {
                            return a.x - b.x
                        }), h = new m(1, 1, null), n = l; --n > -1;) g = j[n], h = new m(g.x, g.y, h);
                    this._prev = new m(0, 0, 0 !== h.t ? h : h.next)
                }, !0), q = c.prototype = new a, q.constructor = c, q.getRatio = function(a) {
                    var b = this._prev;
                    if (a > b.t) {
                        for (; b.next && a >= b.t;) b = b.next;
                        b = b.prev
                    } else
                        for (; b.prev && b.t >= a;) b = b.prev;
                    return this._prev = b, b.v + (a - b.t) / b.gap * b.c
                }, q.config = function(a) {
                    return new c(a)
                }, c.ease = new c, l("Bounce", j("BounceOut", function(a) {
                    return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
                }), j("BounceIn", function(a) {
                    return 1 / 2.75 > (a = 1 - a) ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
                }), j("BounceInOut", function(a) {
                    var b = .5 > a;
                    return a = b ? 1 - 2 * a : 2 * a - 1, a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375, b ? .5 * (1 - a) : .5 * a + .5
                })), l("Circ", j("CircOut", function(a) {
                    return Math.sqrt(1 - (a -= 1) * a)
                }), j("CircIn", function(a) {
                    return -(Math.sqrt(1 - a * a) - 1)
                }), j("CircInOut", function(a) {
                    return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
                })), d = function(b, c, d) {
                    var e = i("easing." + b, function(a, b) { this._p1 = a || 1, this._p2 = b || d, this._p3 = this._p2 / g * (Math.asin(1 / this._p1) || 0) }, !0),
                        f = e.prototype = new a;
                    return f.constructor = e, f.getRatio = c, f.config = function(a, b) {
                        return new e(a, b)
                    }, e
                }, l("Elastic", d("ElasticOut", function(a) {
                    return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * g / this._p2) + 1
                }, .3), d("ElasticIn", function(a) {
                    return -(this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2))
                }, .3), d("ElasticInOut", function(a) {
                    return 1 > (a *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (a -= 1)) * Math.sin((a - this._p3) * g / this._p2) + 1
                }, .45)), l("Expo", j("ExpoOut", function(a) {
                    return 1 - Math.pow(2, -10 * a)
                }), j("ExpoIn", function(a) {
                    return Math.pow(2, 10 * (a - 1)) - .001
                }), j("ExpoInOut", function(a) {
                    return 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
                })), l("Sine", j("SineOut", function(a) {
                    return Math.sin(a * h)
                }), j("SineIn", function(a) {
                    return -Math.cos(a * h) + 1
                }), j("SineInOut", function(a) {
                    return -.5 * (Math.cos(Math.PI * a) - 1)
                })), i("easing.EaseLookup", {
                    find: function(b) {
                        return a.map[b]
                    }
                }, !0), k(e.SlowMo, "SlowMo", "ease,"), k(c, "RoughEase", "ease,"), k(b, "SteppedEase", "ease,"), o
            }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function(a, b) {
        "use strict";
        var c = a.GreenSockGlobals = a.GreenSockGlobals || a;
        if (!c.TweenLite) {
            var d, e, f, g, h, i = function(a) {
                    var b, d = a.split("."),
                        e = c;
                    for (b = 0; d.length > b; b++) e[d[b]] = e = e[d[b]] || {};
                    return e
                },
                j = i("com.greensock"),
                k = 1e-10,
                l = function(a) {
                    var b, c = [],
                        d = a.length;
                    for (b = 0; b !== d; c.push(a[b++]));
                    return c
                },
                m = function() {},
                n = function() {
                    var a = Object.prototype.toString,
                        b = a.call([]);
                    return function(c) {
                        return null != c && (c instanceof Array || "object" == typeof c && !!c.push && a.call(c) === b)
                    }
                }(),
                o = {},
                p = function(d, e, f, g) {
                    this.sc = o[d] ? o[d].sc : [], o[d] = this, this.gsClass = null, this.func = f;
                    var h = [];
                    this.check = function(j) {
                        for (var k, l, m, n, q = e.length, r = q; --q > -1;)(k = o[e[q]] || new p(e[q], [])).gsClass ? (h[q] = k.gsClass, r--) : j && k.sc.push(this);
                        if (0 === r && f)
                            for (l = ("com.greensock." + d).split("."), m = l.pop(), n = i(l.join("."))[m] = this.gsClass = f.apply(f, h), g && (c[m] = n, "function" == typeof define && define.amd ? define((a.GreenSockAMDPath ? a.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
                                    return n
                                }) : d === b && "undefined" != typeof module && module.exports && (module.exports = n)), q = 0; this.sc.length > q; q++) this.sc[q].check()
                    }, this.check(!0)
                },
                q = a._gsDefine = function(a, b, c, d) {
                    return new p(a, b, c, d)
                },
                r = j._class = function(a, b, c) {
                    return b = b || function() {}, q(a, [], function() {
                        return b
                    }, c), b
                };
            q.globals = c;
            var s = [0, 0, 1, 1],
                t = [],
                u = r("easing.Ease", function(a, b, c, d) { this._func = a, this._type = c || 0, this._power = d || 0, this._params = b ? s.concat(b) : s }, !0),
                v = u.map = {},
                w = u.register = function(a, b, c, d) {
                    for (var e, f, g, h, i = b.split(","), k = i.length, l = (c || "easeIn,easeOut,easeInOut").split(","); --k > -1;)
                        for (f = i[k], e = d ? r("easing." + f, null, !0) : j.easing[f] || {}, g = l.length; --g > -1;) h = l[g], v[f + "." + h] = v[h + f] = e[h] = a.getRatio ? a : a[h] || new a
                };
            for (f = u.prototype, f._calcEnd = !1, f.getRatio = function(a) {
                    if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
                    var b = this._type,
                        c = this._power,
                        d = 1 === b ? 1 - a : 2 === b ? a : .5 > a ? 2 * a : 2 * (1 - a);
                    return 1 === c ? d *= d : 2 === c ? d *= d * d : 3 === c ? d *= d * d * d : 4 === c && (d *= d * d * d * d), 1 === b ? 1 - d : 2 === b ? d : .5 > a ? d / 2 : 1 - d / 2
                }, d = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], e = d.length; --e > -1;) f = d[e] + ",Power" + e, w(new u(null, null, 1, e), f, "easeOut", !0), w(new u(null, null, 2, e), f, "easeIn" + (0 === e ? ",easeNone" : "")), w(new u(null, null, 3, e), f, "easeInOut");
            v.linear = j.easing.Linear.easeIn, v.swing = j.easing.Quad.easeInOut;
            var x = r("events.EventDispatcher", function(a) { this._listeners = {}, this._eventTarget = a || this });
            f = x.prototype, f.addEventListener = function(a, b, c, d, e) {
                e = e || 0;
                var f, i, j = this._listeners[a],
                    k = 0;
                for (null == j && (this._listeners[a] = j = []), i = j.length; --i > -1;) f = j[i], f.c === b && f.s === c ? j.splice(i, 1) : 0 === k && e > f.pr && (k = i + 1);
                j.splice(k, 0, { c: b, s: c, up: d, pr: e }), this !== g || h || g.wake()
            }, f.removeEventListener = function(a, b) {
                var c, d = this._listeners[a];
                if (d)
                    for (c = d.length; --c > -1;)
                        if (d[c].c === b) return void d.splice(c, 1)
            }, f.dispatchEvent = function(a) {
                var b, c, d, e = this._listeners[a];
                if (e)
                    for (b = e.length, c = this._eventTarget; --b > -1;) d = e[b], d && (d.up ? d.c.call(d.s || c, { type: a, target: c }) : d.c.call(d.s || c))
            };
            var y = a.requestAnimationFrame,
                z = a.cancelAnimationFrame,
                A = Date.now || function() {
                    return (new Date).getTime()
                },
                B = A();
            for (d = ["ms", "moz", "webkit", "o"], e = d.length; --e > -1 && !y;) y = a[d[e] + "RequestAnimationFrame"], z = a[d[e] + "CancelAnimationFrame"] || a[d[e] + "CancelRequestAnimationFrame"];
            r("Ticker", function(a, b) {
                var c, d, e, f, i, j = this,
                    l = A(),
                    n = b !== !1 && y,
                    o = 500,
                    p = 33,
                    q = "tick",
                    r = function(a) {
                        var b, g, h = A() - B;
                        h > o && (l += h - p), B += h, j.time = (B - l) / 1e3, b = j.time - i, (!c || b > 0 || a === !0) && (j.frame++, i += b + (b >= f ? .004 : f - b), g = !0), a !== !0 && (e = d(r)), g && j.dispatchEvent(q)
                    };
                x.call(j), j.time = j.frame = 0, j.tick = function() { r(!0) }, j.lagSmoothing = function(a, b) { o = a || 1 / k, p = Math.min(b, o, 0) }, j.sleep = function() { null != e && (n && z ? z(e) : clearTimeout(e), d = m, e = null, j === g && (h = !1)) }, j.wake = function() {
                    null !== e ? j.sleep() : j.frame > 10 && (B = A() - o + 5), d = 0 === c ? m : n && y ? y : function(a) {
                        return setTimeout(a, 0 | 1e3 * (i - j.time) + 1)
                    }, j === g && (h = !0), r(2)
                }, j.fps = function(a) {
                    return arguments.length ? (c = a, f = 1 / (c || 60), i = this.time + f, void j.wake()) : c
                }, j.useRAF = function(a) {
                    return arguments.length ? (j.sleep(), n = a, void j.fps(c)) : n
                }, j.fps(a), setTimeout(function() { n && (!e || 5 > j.frame) && j.useRAF(!1) }, 1500)
            }), f = j.Ticker.prototype = new j.events.EventDispatcher, f.constructor = j.Ticker;
            var C = r("core.Animation", function(a, b) {
                if (this.vars = b = b || {}, this._duration = this._totalDuration = a || 0, this._delay = Number(b.delay) || 0, this._timeScale = 1, this._active = b.immediateRender === !0, this.data = b.data, this._reversed = b.reversed === !0, R) {
                    h || g.wake();
                    var c = this.vars.useFrames ? Q : R;
                    c.add(this, c._time), this.vars.paused && this.paused(!0)
                }
            });
            g = C.ticker = new j.Ticker, f = C.prototype, f._dirty = f._gc = f._initted = f._paused = !1, f._totalTime = f._time = 0, f._rawPrevTime = -1, f._next = f._last = f._onUpdate = f._timeline = f.timeline = null, f._paused = !1;
            var D = function() { h && A() - B > 2e3 && g.wake(), setTimeout(D, 2e3) };
            D(), f.play = function(a, b) {
                return null != a && this.seek(a, b), this.reversed(!1).paused(!1)
            }, f.pause = function(a, b) {
                return null != a && this.seek(a, b), this.paused(!0)
            }, f.resume = function(a, b) {
                return null != a && this.seek(a, b), this.paused(!1)
            }, f.seek = function(a, b) {
                return this.totalTime(Number(a), b !== !1)
            }, f.restart = function(a, b) {
                return this.reversed(!1).paused(!1).totalTime(a ? -this._delay : 0, b !== !1, !0)
            }, f.reverse = function(a, b) {
                return null != a && this.seek(a || this.totalDuration(), b), this.reversed(!0).paused(!1)
            }, f.render = function() {}, f.invalidate = function() {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, f.isActive = function() {
                var a, b = this._timeline,
                    c = this._startTime;
                return !b || !this._gc && !this._paused && b.isActive() && (a = b.rawTime()) >= c && c + this.totalDuration() / this._timeScale > a
            }, f._enabled = function(a, b) {
                return h || g.wake(), this._gc = !a, this._active = this.isActive(), b !== !0 && (a && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !a && this.timeline && this._timeline._remove(this, !0)), !1
            }, f._kill = function() {
                return this._enabled(!1, !1)
            }, f.kill = function(a, b) {
                return this._kill(a, b), this
            }, f._uncache = function(a) {
                for (var b = a ? this : this.timeline; b;) b._dirty = !0, b = b.timeline;
                return this
            }, f._swapSelfInParams = function(a) {
                for (var b = a.length, c = a.concat(); --b > -1;) "{self}" === a[b] && (c[b] = this);
                return c
            }, f.eventCallback = function(a, b, c, d) {
                if ("on" === (a || "").substr(0, 2)) {
                    var e = this.vars;
                    if (1 === arguments.length) return e[a];
                    null == b ? delete e[a] : (e[a] = b, e[a + "Params"] = n(c) && -1 !== c.join("").indexOf("{self}") ? this._swapSelfInParams(c) : c, e[a + "Scope"] = d), "onUpdate" === a && (this._onUpdate = b)
                }
                return this
            }, f.delay = function(a) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay), this._delay = a, this) : this._delay
            }, f.duration = function(a) {
                return arguments.length ? (this._duration = this._totalDuration = a, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== a && this.totalTime(this._totalTime * (a / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, f.totalDuration = function(a) {
                return this._dirty = !1, arguments.length ? this.duration(a) : this._totalDuration
            }, f.time = function(a, b) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(a > this._duration ? this._duration : a, b)) : this._time
            }, f.totalTime = function(a, b, c) {
                if (h || g.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > a && !c && (a += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var d = this._totalDuration,
                            e = this._timeline;
                        if (a > d && !c && (a = d), this._startTime = (this._paused ? this._pauseTime : e._time) - (this._reversed ? d - a : a) / this._timeScale, e._dirty || this._uncache(!1), e._timeline)
                            for (; e._timeline;) e._timeline._time !== (e._startTime + e._totalTime) / e._timeScale && e.totalTime(e._totalTime, !0), e = e._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== a || 0 === this._duration) && (this.render(a, b, !1), I.length && S())
                }
                return this
            }, f.progress = f.totalProgress = function(a, b) {
                return arguments.length ? this.totalTime(this.duration() * a, b) : this._time / this.duration()
            }, f.startTime = function(a) {
                return arguments.length ? (a !== this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.add(this, a - this._delay)), this) : this._startTime
            }, f.endTime = function(a) {
                return this._startTime + (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
            }, f.timeScale = function(a) {
                if (!arguments.length) return this._timeScale;
                if (a = a || k, this._timeline && this._timeline.smoothChildTiming) {
                    var b = this._pauseTime,
                        c = b || 0 === b ? b : this._timeline.totalTime();
                    this._startTime = c - (c - this._startTime) * this._timeScale / a
                }
                return this._timeScale = a, this._uncache(!1)
            }, f.reversed = function(a) {
                return arguments.length ? (a != this._reversed && (this._reversed = a, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, f.paused = function(a) {
                if (!arguments.length) return this._paused;
                if (a != this._paused && this._timeline) {
                    h || a || g.wake();
                    var b = this._timeline,
                        c = b.rawTime(),
                        d = c - this._pauseTime;
                    !a && b.smoothChildTiming && (this._startTime += d, this._uncache(!1)), this._pauseTime = a ? c : null, this._paused = a, this._active = this.isActive(), !a && 0 !== d && this._initted && this.duration() && this.render(b.smoothChildTiming ? this._totalTime : (c - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !a && this._enabled(!0, !1), this
            };
            var E = r("core.SimpleTimeline", function(a) { C.call(this, 0, a), this.autoRemoveChildren = this.smoothChildTiming = !0 });
            f = E.prototype = new C, f.constructor = E, f.kill()._gc = !1, f._first = f._last = f._recent = null, f._sortChildren = !1, f.add = f.insert = function(a, b) {
                var c, d;
                if (a._startTime = Number(b || 0) + a._delay, a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale), a.timeline && a.timeline._remove(a, !0), a.timeline = a._timeline = this, a._gc && a._enabled(!0, !0), c = this._last, this._sortChildren)
                    for (d = a._startTime; c && c._startTime > d;) c = c._prev;
                return c ? (a._next = c._next, c._next = a) : (a._next = this._first, this._first = a), a._next ? a._next._prev = a : this._last = a, a._prev = c, this._recent = a, this._timeline && this._uncache(!0), this
            }, f._remove = function(a, b) {
                return a.timeline === this && (b || a._enabled(!1, !0), a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), a._next = a._prev = a.timeline = null, a === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, f.render = function(a, b, c) {
                var d, e = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = a; e;) d = e._next, (e._active || a >= e._startTime && !e._paused) && (e._reversed ? e.render((e._dirty ? e.totalDuration() : e._totalDuration) - (a - e._startTime) * e._timeScale, b, c) : e.render((a - e._startTime) * e._timeScale, b, c)), e = d
            }, f.rawTime = function() {
                return h || g.wake(), this._totalTime
            };
            var F = r("TweenLite", function(b, c, d) {
                    if (C.call(this, c, d), this.render = F.prototype.render, null == b) throw "Cannot tween a null target.";
                    this.target = b = "string" != typeof b ? b : F.selector(b) || b;
                    var e, f, g, h = b.jquery || b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType),
                        i = this.vars.overwrite;
                    if (this._overwrite = i = null == i ? P[F.defaultOverwrite] : "number" == typeof i ? i >> 0 : P[i], (h || b instanceof Array || b.push && n(b)) && "number" != typeof b[0])
                        for (this._targets = g = l(b), this._propLookup = [], this._siblings = [], e = 0; g.length > e; e++) f = g[e], f ? "string" != typeof f ? f.length && f !== a && f[0] && (f[0] === a || f[0].nodeType && f[0].style && !f.nodeType) ? (g.splice(e--, 1), this._targets = g = g.concat(l(f))) : (this._siblings[e] = T(f, this, !1), 1 === i && this._siblings[e].length > 1 && V(f, this, null, 1, this._siblings[e])) : (f = g[e--] = F.selector(f), "string" == typeof f && g.splice(e + 1, 1)) : g.splice(e--, 1);
                    else this._propLookup = {}, this._siblings = T(b, this, !1), 1 === i && this._siblings.length > 1 && V(b, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === c && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -k, this.render(-this._delay))
                }, !0),
                G = function(b) {
                    return b && b.length && b !== a && b[0] && (b[0] === a || b[0].nodeType && b[0].style && !b.nodeType)
                },
                H = function(a, b) {
                    var c, d = {};
                    for (c in a) O[c] || c in b && "transform" !== c && "x" !== c && "y" !== c && "width" !== c && "height" !== c && "className" !== c && "border" !== c || !(!L[c] || L[c] && L[c]._autoCSS) || (d[c] = a[c], delete a[c]);
                    a.css = d
                };
            f = F.prototype = new C, f.constructor = F, f.kill()._gc = !1, f.ratio = 0, f._firstPT = f._targets = f._overwrittenProps = f._startAt = null, f._notifyPluginsOfEnabled = f._lazy = !1, F.version = "1.15.1", F.defaultEase = f._ease = new u(null, null, 1, 1), F.defaultOverwrite = "auto", F.ticker = g, F.autoSleep = !0, F.lagSmoothing = function(a, b) { g.lagSmoothing(a, b) }, F.selector = a.$ || a.jQuery || function(b) {
                var c = a.$ || a.jQuery;
                return c ? (F.selector = c, c(b)) : "undefined" == typeof document ? b : document.querySelectorAll ? document.querySelectorAll(b) : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b)
            };
            var I = [],
                J = {},
                K = F._internals = { isArray: n, isSelector: G, lazyTweens: I },
                L = F._plugins = {},
                M = K.tweenLookup = {},
                N = 0,
                O = K.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1, onOverwrite: 1 },
                P = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 },
                Q = C._rootFramesTimeline = new E,
                R = C._rootTimeline = new E,
                S = K.lazyRender = function() {
                    var a, b = I.length;
                    for (J = {}; --b > -1;) a = I[b], a && a._lazy !== !1 && (a.render(a._lazy[0], a._lazy[1], !0), a._lazy = !1);
                    I.length = 0
                };
            R._startTime = g.time, Q._startTime = g.frame, R._active = Q._active = !0, setTimeout(S, 1), C._updateRoot = F.render = function() {
                var a, b, c;
                if (I.length && S(), R.render((g.time - R._startTime) * R._timeScale, !1, !1), Q.render((g.frame - Q._startTime) * Q._timeScale, !1, !1), I.length && S(), !(g.frame % 120)) {
                    for (c in M) {
                        for (b = M[c].tweens, a = b.length; --a > -1;) b[a]._gc && b.splice(a, 1);
                        0 === b.length && delete M[c]
                    }
                    if (c = R._first, (!c || c._paused) && F.autoSleep && !Q._first && 1 === g._listeners.tick.length) {
                        for (; c && c._paused;) c = c._next;
                        c || g.sleep()
                    }
                }
            }, g.addEventListener("tick", C._updateRoot);
            var T = function(a, b, c) {
                    var d, e, f = a._gsTweenID;
                    if (M[f || (a._gsTweenID = f = "t" + N++)] || (M[f] = { target: a, tweens: [] }), b && (d = M[f].tweens, d[e = d.length] = b, c))
                        for (; --e > -1;) d[e] === b && d.splice(e, 1);
                    return M[f].tweens
                },
                U = function(a, b, c, d) {
                    var e, f, g = a.vars.onOverwrite;
                    return g && (e = g(a, b, c, d)), g = F.onOverwrite, g && (f = g(a, b, c, d)), e !== !1 && f !== !1
                },
                V = function(a, b, c, d, e) {
                    var f, g, h, i;
                    if (1 === d || d >= 4) {
                        for (i = e.length, f = 0; i > f; f++)
                            if ((h = e[f]) !== b) h._gc || U(h, b) && h._enabled(!1, !1) && (g = !0);
                            else if (5 === d) break;
                        return g
                    }
                    var j, l = b._startTime + k,
                        m = [],
                        n = 0,
                        o = 0 === b._duration;
                    for (f = e.length; --f > -1;)(h = e[f]) === b || h._gc || h._paused || (h._timeline !== b._timeline ? (j = j || W(b, 0, o), 0 === W(h, j, o) && (m[n++] = h)) : l >= h._startTime && h._startTime + h.totalDuration() / h._timeScale > l && ((o || !h._initted) && 2e-10 >= l - h._startTime || (m[n++] = h)));
                    for (f = n; --f > -1;)
                        if (h = m[f], 2 === d && h._kill(c, a, b) && (g = !0), 2 !== d || !h._firstPT && h._initted) {
                            if (2 !== d && !U(h, b)) continue;
                            h._enabled(!1, !1) && (g = !0)
                        }
                    return g
                },
                W = function(a, b, c) {
                    for (var d = a._timeline, e = d._timeScale, f = a._startTime; d._timeline;) {
                        if (f += d._startTime, e *= d._timeScale, d._paused) return -100;
                        d = d._timeline
                    }
                    return f /= e, f > b ? f - b : c && f === b || !a._initted && 2 * k > f - b ? k : (f += a.totalDuration() / a._timeScale / e) > b + k ? 0 : f - b - k
                };
            f._init = function() {
                var a, b, c, d, e, f = this.vars,
                    g = this._overwrittenProps,
                    h = this._duration,
                    i = !!f.immediateRender,
                    j = f.ease;
                if (f.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), e = {};
                    for (d in f.startAt) e[d] = f.startAt[d];
                    if (e.overwrite = !1, e.immediateRender = !0, e.lazy = i && f.lazy !== !1, e.startAt = e.delay = null, this._startAt = F.to(this.target, 0, e), i)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== h) return
                } else if (f.runBackwards && 0 !== h)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        0 !== this._time && (i = !1), c = {};
                        for (d in f) O[d] && "autoCSS" !== d || (c[d] = f[d]);
                        if (c.overwrite = 0, c.data = "isFromStart", c.lazy = i && f.lazy !== !1, c.immediateRender = i, this._startAt = F.to(this.target, 0, c), i) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    }
                if (this._ease = j = j ? j instanceof u ? j : "function" == typeof j ? new u(j, f.easeParams) : v[j] || F.defaultEase : F.defaultEase, f.easeParams instanceof Array && j.config && (this._ease = j.config.apply(j, f.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (a = this._targets.length; --a > -1;) this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], g ? g[a] : null) && (b = !0);
                else b = this._initProps(this.target, this._propLookup, this._siblings, g);
                if (b && F._onPluginEvent("_onInitAllProps", this), g && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), f.runBackwards)
                    for (c = this._firstPT; c;) c.s += c.c, c.c = -c.c, c = c._next;
                this._onUpdate = f.onUpdate, this._initted = !0
            }, f._initProps = function(b, c, d, e) {
                var f, g, h, i, j, k;
                if (null == b) return !1;
                J[b._gsTweenID] && S(), this.vars.css || b.style && b !== a && b.nodeType && L.css && this.vars.autoCSS !== !1 && H(this.vars, b);
                for (f in this.vars) {
                    if (k = this.vars[f], O[f]) k && (k instanceof Array || k.push && n(k)) && -1 !== k.join("").indexOf("{self}") && (this.vars[f] = k = this._swapSelfInParams(k, this));
                    else if (L[f] && (i = new L[f])._onInitTween(b, this.vars[f], this)) {
                        for (this._firstPT = j = { _next: this._firstPT, t: i, p: "setRatio", s: 0, c: 1, f: !0, n: f, pg: !0, pr: i._priority }, g = i._overwriteProps.length; --g > -1;) c[i._overwriteProps[g]] = this._firstPT;
                        (i._priority || i._onInitAllProps) && (h = !0), (i._onDisable || i._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = c[f] = j = { _next: this._firstPT, t: b, p: f, f: "function" == typeof b[f], n: f, pg: !1, pr: 0 }, j.s = j.f ? b[f.indexOf("set") || "function" != typeof b["get" + f.substr(3)] ? f : "get" + f.substr(3)]() : parseFloat(b[f]), j.c = "string" == typeof k && "=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * Number(k.substr(2)) : Number(k) - j.s || 0;
                    j && j._next && (j._next._prev = j)
                }
                return e && this._kill(e, b) ? this._initProps(b, c, d, e) : this._overwrite > 1 && this._firstPT && d.length > 1 && V(b, this, c, this._overwrite, d) ? (this._kill(c, b), this._initProps(b, c, d, e)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (J[b._gsTweenID] = !0), h)
            }, f.render = function(a, b, c) {
                var d, e, f, g, h = this._time,
                    i = this._duration,
                    j = this._rawPrevTime;
                if (a >= i) this._totalTime = this._time = i, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (d = !0, e = "onComplete"), 0 === i && (this._initted || !this.vars.lazy || c) && (this._startTime === this._timeline._duration && (a = 0), (0 === a || 0 > j || j === k && "isPause" !== this.data) && j !== a && (c = !0, j > k && (e = "onReverseComplete")), this._rawPrevTime = g = !b || a || j === a ? a : k);
                else if (1e-7 > a) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== h || 0 === i && j > 0 && j !== k) && (e = "onReverseComplete", d = this._reversed), 0 > a && (this._active = !1, 0 === i && (this._initted || !this.vars.lazy || c) && (j >= 0 && (j !== k || "isPause" !== this.data) && (c = !0), this._rawPrevTime = g = !b || a || j === a ? a : k)), this._initted || (c = !0);
                else if (this._totalTime = this._time = a, this._easeType) {
                    var l = a / i,
                        m = this._easeType,
                        n = this._easePower;
                    (1 === m || 3 === m && l >= .5) && (l = 1 - l), 3 === m && (l *= 2), 1 === n ? l *= l : 2 === n ? l *= l * l : 3 === n ? l *= l * l * l : 4 === n && (l *= l * l * l * l), this.ratio = 1 === m ? 1 - l : 2 === m ? l : .5 > a / i ? l / 2 : 1 - l / 2
                } else this.ratio = this._ease.getRatio(a / i);
                if (this._time !== h || c) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!c && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = h, this._rawPrevTime = j, I.push(this), void(this._lazy = [a, b]);
                        this._time && !d ? this.ratio = this._ease.getRatio(this._time / i) : d && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== h && a >= 0 && (this._active = !0), 0 === h && (this._startAt && (a >= 0 ? this._startAt.render(a, b, c) : e || (e = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === i) && (b || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || t))), f = this._firstPT; f;) f.f ? f.t[f.p](f.c * this.ratio + f.s) : f.t[f.p] = f.c * this.ratio + f.s, f = f._next;
                    this._onUpdate && (0 > a && this._startAt && a !== -1e-4 && this._startAt.render(a, b, c), b || (this._time !== h || d) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || t)), e && (!this._gc || c) && (0 > a && this._startAt && !this._onUpdate && a !== -1e-4 && this._startAt.render(a, b, c), d && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !b && this.vars[e] && this.vars[e].apply(this.vars[e + "Scope"] || this, this.vars[e + "Params"] || t), 0 === i && this._rawPrevTime === k && g !== k && (this._rawPrevTime = 0))
                }
            }, f._kill = function(a, b, c) {
                if ("all" === a && (a = null), null == a && (null == b || b === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                b = "string" != typeof b ? b || this._targets || this.target : F.selector(b) || b;
                var d, e, f, g, h, i, j, k, l;
                if ((n(b) || G(b)) && "number" != typeof b[0])
                    for (d = b.length; --d > -1;) this._kill(a, b[d]) && (i = !0);
                else {
                    if (this._targets) {
                        for (d = this._targets.length; --d > -1;)
                            if (b === this._targets[d]) {
                                h = this._propLookup[d] || {}, this._overwrittenProps = this._overwrittenProps || [], e = this._overwrittenProps[d] = a ? this._overwrittenProps[d] || {} : "all";
                                break
                            }
                    } else {
                        if (b !== this.target) return !1;
                        h = this._propLookup, e = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                    }
                    if (h) {
                        if (j = a || h, k = a !== e && "all" !== e && a !== h && ("object" != typeof a || !a._tempKill), c && (F.onOverwrite || this.vars.onOverwrite)) {
                            for (f in j) h[f] && (l || (l = []), l.push(f));
                            if (!U(this, c, b, l)) return !1
                        }
                        for (f in j)(g = h[f]) && (g.pg && g.t._kill(j) && (i = !0), g.pg && 0 !== g.t._overwriteProps.length || (g._prev ? g._prev._next = g._next : g === this._firstPT && (this._firstPT = g._next), g._next && (g._next._prev = g._prev), g._next = g._prev = null), delete h[f]), k && (e[f] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return i
            }, f.invalidate = function() {
                return this._notifyPluginsOfEnabled && F._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -k, this.render(-this._delay)), this
            }, f._enabled = function(a, b) {
                if (h || g.wake(), a && this._gc) {
                    var c, d = this._targets;
                    if (d)
                        for (c = d.length; --c > -1;) this._siblings[c] = T(d[c], this, !0);
                    else this._siblings = T(this.target, this, !0)
                }
                return C.prototype._enabled.call(this, a, b), this._notifyPluginsOfEnabled && this._firstPT ? F._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
            }, F.to = function(a, b, c) {
                return new F(a, b, c)
            }, F.from = function(a, b, c) {
                return c.runBackwards = !0, c.immediateRender = 0 != c.immediateRender, new F(a, b, c)
            }, F.fromTo = function(a, b, c, d) {
                return d.startAt = c, d.immediateRender = 0 != d.immediateRender && 0 != c.immediateRender, new F(a, b, d)
            }, F.delayedCall = function(a, b, c, d, e) {
                return new F(b, 0, { delay: a, onComplete: b, onCompleteParams: c, onCompleteScope: d, onReverseComplete: b, onReverseCompleteParams: c, onReverseCompleteScope: d, immediateRender: !1, lazy: !1, useFrames: e, overwrite: 0 })
            }, F.set = function(a, b) {
                return new F(a, 0, b)
            }, F.getTweensOf = function(a, b) {
                if (null == a) return [];
                a = "string" != typeof a ? a : F.selector(a) || a;
                var c, d, e, f;
                if ((n(a) || G(a)) && "number" != typeof a[0]) {
                    for (c = a.length, d = []; --c > -1;) d = d.concat(F.getTweensOf(a[c], b));
                    for (c = d.length; --c > -1;)
                        for (f = d[c], e = c; --e > -1;) f === d[e] && d.splice(c, 1)
                } else
                    for (d = T(a).concat(), c = d.length; --c > -1;)(d[c]._gc || b && !d[c].isActive()) && d.splice(c, 1);
                return d
            }, F.killTweensOf = F.killDelayedCallsTo = function(a, b, c) {
                "object" == typeof b && (c = b, b = !1);
                for (var d = F.getTweensOf(a, b), e = d.length; --e > -1;) d[e]._kill(c, a)
            };
            var X = r("plugins.TweenPlugin", function(a, b) { this._overwriteProps = (a || "").split(","), this._propName = this._overwriteProps[0], this._priority = b || 0, this._super = X.prototype }, !0);
            if (f = X.prototype, X.version = "1.10.1", X.API = 2, f._firstPT = null, f._addTween = function(a, b, c, d, e, f) {
                    var g, h;
                    return null != d && (g = "number" == typeof d || "=" !== d.charAt(1) ? Number(d) - c : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2))) ? (this._firstPT = h = { _next: this._firstPT, t: a, p: b, s: c, c: g, f: "function" == typeof a[b], n: e || b, r: f }, h._next && (h._next._prev = h), h) : void 0
                }, f.setRatio = function(a) {
                    for (var b, c = this._firstPT, d = 1e-6; c;) b = c.c * a + c.s, c.r ? b = Math.round(b) : d > b && b > -d && (b = 0), c.f ? c.t[c.p](b) : c.t[c.p] = b, c = c._next
                }, f._kill = function(a) {
                    var b, c = this._overwriteProps,
                        d = this._firstPT;
                    if (null != a[this._propName]) this._overwriteProps = [];
                    else
                        for (b = c.length; --b > -1;) null != a[c[b]] && c.splice(b, 1);
                    for (; d;) null != a[d.n] && (d._next && (d._next._prev = d._prev), d._prev ? (d._prev._next = d._next, d._prev = null) : this._firstPT === d && (this._firstPT = d._next)), d = d._next;
                    return !1
                }, f._roundProps = function(a, b) {
                    for (var c = this._firstPT; c;)(a[this._propName] || null != c.n && a[c.n.split(this._propName + "_").join("")]) && (c.r = b), c = c._next
                }, F._onPluginEvent = function(a, b) {
                    var c, d, e, f, g, h = b._firstPT;
                    if ("_onInitAllProps" === a) {
                        for (; h;) {
                            for (g = h._next, d = e; d && d.pr > h.pr;) d = d._next;
                            (h._prev = d ? d._prev : f) ? h._prev._next = h: e = h, (h._next = d) ? d._prev = h : f = h, h = g
                        }
                        h = b._firstPT = e
                    }
                    for (; h;) h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0), h = h._next;
                    return c
                }, X.activate = function(a) {
                    for (var b = a.length; --b > -1;) a[b].API === X.API && (L[(new a[b])._propName] = a[b]);
                    return !0
                }, q.plugin = function(a) {
                    if (!(a && a.propName && a.init && a.API)) throw "illegal plugin definition.";
                    var b, c = a.propName,
                        d = a.priority || 0,
                        e = a.overwriteProps,
                        f = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
                        g = r("plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin", function() { X.call(this, c, d), this._overwriteProps = e || [] }, a.global === !0),
                        h = g.prototype = new X(c);
                    h.constructor = g, g.API = a.API;
                    for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
                    return g.version = a.version, X.activate([g]), g
                }, d = a._gsQueue) {
                for (e = 0; d.length > e; e++) d[e]();
                for (f in o) o[f].func || a.console.log("GSAP encountered missing dependency: com.greensock." + f)
            }
            h = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenMax"), ! function(a) {
        "use strict";
        var b = function(b, c) { this.el = a(b), this.options = a.extend({}, a.fn.typed.defaults, c), this.isInput = this.el.is("input"), this.attr = this.options.attr, this.showCursor = this.isInput ? !1 : this.options.showCursor, this.elContent = this.attr ? this.el.attr(this.attr) : this.el.text(), this.contentType = this.options.contentType, this.typeSpeed = this.options.typeSpeed, this.startDelay = this.options.startDelay, this.backSpeed = this.options.backSpeed, this.backDelay = this.options.backDelay, this.stringsElement = this.options.stringsElement, this.strings = this.options.strings, this.strPos = 0, this.arrayPos = 0, this.stopNum = 0, this.loop = this.options.loop, this.loopCount = this.options.loopCount, this.curLoop = 0, this.stop = !1, this.cursorChar = this.options.cursorChar, this.shuffle = this.options.shuffle, this.sequence = [], this.build() };
        b.prototype = {
            constructor: b,
            init: function() {
                var a = this;
                a.timeout = setTimeout(function() {
                    for (var b = 0; b < a.strings.length; ++b) a.sequence[b] = b;
                    a.shuffle && (a.sequence = a.shuffleArray(a.sequence)), a.typewrite(a.strings[a.sequence[a.arrayPos]], a.strPos)
                }, a.startDelay)
            },
            build: function() {
                var b = this;
                if (this.showCursor === !0 && (this.cursor = a('<span class="typed-cursor">' + this.cursorChar + "</span>"), this.el.after(this.cursor)), this.stringsElement) {
                    b.strings = [], this.stringsElement.hide();
                    var c = this.stringsElement.find("p");
                    a.each(c, function(c, d) { b.strings.push(a(d).html()) })
                }
                this.init()
            },
            typewrite: function(a, b) {
                if (this.stop !== !0) {
                    var c = Math.round(70 * Math.random()) + this.typeSpeed,
                        d = this;
                    d.timeout = setTimeout(function() {
                        var c = 0,
                            e = a.substr(b);
                        if ("^" === e.charAt(0)) {
                            var f = 1;
                            /^\^\d+/.test(e) && (e = /\d+/.exec(e)[0], f += e.length, c = parseInt(e)), a = a.substring(0, b) + a.substring(b + f)
                        }
                        if ("html" === d.contentType) {
                            var g = a.substr(b).charAt(0);
                            if ("<" === g || "&" === g) {
                                var h = "",
                                    i = "";
                                for (i = "<" === g ? ">" : ";"; a.substr(b).charAt(0) !== i;) h += a.substr(b).charAt(0), b++;
                                b++, h += i
                            }
                        }
                        d.timeout = setTimeout(function() {
                            if (b === a.length) {
                                if (d.options.onStringTyped(d.arrayPos), d.arrayPos === d.strings.length - 1 && (d.options.callback(), d.curLoop++, d.loop === !1 || d.curLoop === d.loopCount)) return;
                                d.timeout = setTimeout(function() { d.backspace(a, b) }, d.backDelay)
                            } else {
                                0 === b && d.options.preStringTyped(d.arrayPos);
                                var c = a.substr(0, b + 1);
                                d.attr ? d.el.attr(d.attr, c) : d.isInput ? d.el.val(c) : "html" === d.contentType ? d.el.html(c) : d.el.text(c), b++, d.typewrite(a, b)
                            }
                        }, c)
                    }, c)
                }
            },
            backspace: function(a, b) {
                if (this.stop !== !0) {
                    var c = Math.round(70 * Math.random()) + this.backSpeed,
                        d = this;
                    d.timeout = setTimeout(function() {
                        if ("html" === d.contentType && ">" === a.substr(b).charAt(0)) {
                            for (var c = "";
                                "<" !== a.substr(b).charAt(0);) c -= a.substr(b).charAt(0), b--;
                            b--, c += "<"
                        }
                        var e = a.substr(0, b);
                        d.attr ? d.el.attr(d.attr, e) : d.isInput ? d.el.val(e) : "html" === d.contentType ? d.el.html(e) : d.el.text(e), b > d.stopNum ? (b--, d.backspace(a, b)) : b <= d.stopNum && (d.arrayPos++, d.arrayPos === d.strings.length ? (d.arrayPos = 0, d.shuffle && (d.sequence = d.shuffleArray(d.sequence)), d.init()) : d.typewrite(d.strings[d.sequence[d.arrayPos]], b))
                    }, c)
                }
            },
            shuffleArray: function(a) {
                var b, c, d = a.length;
                if (d)
                    for (; --d;) c = Math.floor(Math.random() * (d + 1)), b = a[c], a[c] = a[d], a[d] = b;
                return a
            },
            reset: function() {
                var a = this;
                clearInterval(a.timeout), this.el.empty(), "undefined" != typeof this.cursor && this.cursor.remove(), a.strPos = 0, a.arrayPos = 0, a.curLoop = 0, a.options.resetCallback()
            },
            destroy: function() {
                var a = this;
                a.stop = !0, clearInterval(a.timeout), "undefined" != typeof this.cursor && this.cursor.remove()
            }
        }, a.fn.typed = function(c) {
            return this.each(function() {
                var d = a(this),
                    e = d.data("typed"),
                    f = "object" == typeof c && c;
                e && e.reset(), d.data("typed", e = new b(this, f)), "string" == typeof c && e[c]()
            })
        }, a.fn.typed.defaults = { strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"], stringsElement: null, typeSpeed: 0, startDelay: 0, backSpeed: 0, shuffle: !1, backDelay: 500, loop: !1, loopCount: !1, showCursor: !0, cursorChar: "|", attr: null, contentType: "html", callback: function() {}, preStringTyped: function() {}, onStringTyped: function() {}, resetCallback: function() {} }
    }(window.jQuery),
    function() {
        var a, b, c, d, e, f = function(a, b) {
                return function() {
                    return a.apply(b, arguments)
                }
            },
            g = [].indexOf || function(a) {
                for (var b = 0, c = this.length; c > b; b++)
                    if (b in this && this[b] === a) return b;
                return -1
            };
        b = function() {
            function a() {}
            return a.prototype.extend = function(a, b) {
                var c, d;
                for (c in b) d = b[c], null == a[c] && (a[c] = d);
                return a
            }, a.prototype.isMobile = function(a) {
                return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
            }, a.prototype.createEvent = function(a, b, c, d) {
                var e;
                return null == b && (b = !1), null == c && (c = !1), null == d && (d = null), null != document.createEvent ? (e = document.createEvent("CustomEvent"), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a, e
            }, a.prototype.emitEvent = function(a, b) {
                return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : "on" + b in (null != a) ? a["on" + b]() : void 0
            }, a.prototype.addEvent = function(a, b, c) {
                return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent("on" + b, c) : a[b] = c
            }, a.prototype.removeEvent = function(a, b, c) {
                return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent("on" + b, c) : delete a[b]
            }, a.prototype.innerHeight = function() {
                return "innerHeight" in window ? window.innerHeight : document.documentElement.clientHeight
            }, a
        }(), c = this.WeakMap || this.MozWeakMap || (c = function() {
            function a() { this.keys = [], this.values = [] }
            return a.prototype.get = function(a) {
                var b, c, d, e, f;
                for (f = this.keys, b = d = 0, e = f.length; e > d; b = ++d)
                    if (c = f[b], c === a) return this.values[b]
            }, a.prototype.set = function(a, b) {
                var c, d, e, f, g;
                for (g = this.keys, c = e = 0, f = g.length; f > e; c = ++e)
                    if (d = g[c], d === a) return void(this.values[c] = b);
                return this.keys.push(a), this.values.push(b)
            }, a
        }()), a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function() {
            function a() { "undefined" != typeof console && null !== console && console.warn("MutationObserver is not supported by your browser."), "undefined" != typeof console && null !== console && console.warn("WOW.js cannot detect dom mutations, please call .sync() after loading new content.") }
            return a.notSupported = !0, a.prototype.observe = function() {}, a
        }()), d = this.getComputedStyle || function(a, b) {
            return this.getPropertyValue = function(b) {
                var c;
                return "float" === b && (b = "styleFloat"), e.test(b) && b.replace(e, function(a, b) {
                    return b.toUpperCase()
                }), (null != (c = a.currentStyle) ? c[b] : void 0) || null
            }, this
        }, e = /(\-([a-z]){1})/g, this.WOW = function() {
            function e(a) { null == a && (a = {}), this.scrollCallback = f(this.scrollCallback, this), this.scrollHandler = f(this.scrollHandler, this), this.resetAnimation = f(this.resetAnimation, this), this.start = f(this.start, this), this.scrolled = !0, this.config = this.util().extend(a, this.defaults), null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)), this.animationNameCache = new c, this.wowEvent = this.util().createEvent(this.config.boxClass) }
            return e.prototype.defaults = { boxClass: "wow", animateClass: "animated", offset: 0, mobile: !0, live: !0, callback: null, scrollContainer: null }, e.prototype.init = function() {
                var a;
                return this.element = window.document.documentElement, "interactive" === (a = document.readyState) || "complete" === a ? this.start() : this.util().addEvent(document, "DOMContentLoaded", this.start), this.finished = []
            }, e.prototype.start = function() {
                var b, c, d, e;
                if (this.stopped = !1, this.boxes = function() {
                        var a, c, d, e;
                        for (d = this.element.querySelectorAll("." + this.config.boxClass), e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.all = function() {
                        var a, c, d, e;
                        for (d = this.boxes, e = [], a = 0, c = d.length; c > a; a++) b = d[a], e.push(b);
                        return e
                    }.call(this), this.boxes.length)
                    if (this.disabled()) this.resetStyle();
                    else
                        for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c], this.applyStyle(b, !0);
                return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().addEvent(window, "resize", this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)), this.config.live ? new a(function(a) {
                    return function(b) {
                        var c, d, e, f, g;
                        for (g = [], c = 0, d = b.length; d > c; c++) f = b[c], g.push(function() {
                            var a, b, c, d;
                            for (c = f.addedNodes || [], d = [], a = 0, b = c.length; b > a; a++) e = c[a], d.push(this.doSync(e));
                            return d
                        }.call(a));
                        return g
                    }
                }(this)).observe(document.body, { childList: !0, subtree: !0 }) : void 0
            }, e.prototype.stop = function() {
                return this.stopped = !0, this.util().removeEvent(this.config.scrollContainer || window, "scroll", this.scrollHandler), this.util().removeEvent(window, "resize", this.scrollHandler), null != this.interval ? clearInterval(this.interval) : void 0
            }, e.prototype.sync = function(b) {
                return a.notSupported ? this.doSync(this.element) : void 0
            }, e.prototype.doSync = function(a) {
                var b, c, d, e, f;
                if (null == a && (a = this.element), 1 === a.nodeType) {
                    for (a = a.parentNode || a, e = a.querySelectorAll("." + this.config.boxClass), f = [], c = 0, d = e.length; d > c; c++) b = e[c], g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
                    return f
                }
            }, e.prototype.show = function(a) {
                return this.applyStyle(a), a.className = a.className + " " + this.config.animateClass, null != this.config.callback && this.config.callback(a), this.util().emitEvent(a, this.wowEvent), this.util().addEvent(a, "animationend", this.resetAnimation), this.util().addEvent(a, "oanimationend", this.resetAnimation), this.util().addEvent(a, "webkitAnimationEnd", this.resetAnimation), this.util().addEvent(a, "MSAnimationEnd", this.resetAnimation), a
            }, e.prototype.applyStyle = function(a, b) {
                var c, d, e;
                return d = a.getAttribute("data-wow-duration"), c = a.getAttribute("data-wow-delay"), e = a.getAttribute("data-wow-iteration"), this.animate(function(f) {
                    return function() {
                        return f.customStyle(a, b, d, c, e)
                    }
                }(this))
            }, e.prototype.animate = function() {
                return "requestAnimationFrame" in window ? function(a) {
                    return window.requestAnimationFrame(a)
                } : function(a) {
                    return a()
                }
            }(), e.prototype.resetStyle = function() {
                var a, b, c, d, e;
                for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], e.push(a.style.visibility = "visible");
                return e
            }, e.prototype.resetAnimation = function(a) {}, e.prototype.customStyle = function(a, b, c, d, e) {
                return b && this.cacheAnimationName(a), a.style.visibility = b ? "hidden" : "visible", c && this.vendorSet(a.style, { animationDuration: c }), d && this.vendorSet(a.style, { animationDelay: d }), e && this.vendorSet(a.style, { animationIterationCount: e }), this.vendorSet(a.style, { animationName: b ? "none" : this.cachedAnimationName(a) }), a
            }, e.prototype.vendors = ["moz", "webkit"], e.prototype.vendorSet = function(a, b) {
                var c, d, e, f;
                d = [];
                for (c in b) e = b[c], a["" + c] = e, d.push(function() {
                    var b, d, g, h;
                    for (g = this.vendors, h = [], b = 0, d = g.length; d > b; b++) f = g[b], h.push(a["" + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
                    return h
                }.call(this));
                return d
            }, e.prototype.vendorCSS = function(a, b) {
                var c, e, f, g, h, i;
                for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c], g = g || h.getPropertyCSSValue("-" + i + "-" + b);
                return g
            }, e.prototype.animationName = function(a) {
                var b;
                try { b = this.vendorCSS(a, "animation-name").cssText } catch (c) { b = d(a).getPropertyValue("animation-name") }
                return "none" === b ? "" : b
            }, e.prototype.cacheAnimationName = function(a) {
                return this.animationNameCache.set(a, this.animationName(a))
            }, e.prototype.cachedAnimationName = function(a) {
                return this.animationNameCache.get(a)
            }, e.prototype.scrollHandler = function() {
                return this.scrolled = !0
            }, e.prototype.scrollCallback = function() {
                var a;
                return !this.scrolled || (this.scrolled = !1, this.boxes = function() {
                    var b, c, d, e;
                    for (d = this.boxes, e = [], b = 0, c = d.length; c > b; b++) a = d[b], a && (this.isVisible(a) ? this.show(a) : e.push(a));
                    return e
                }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
            }, e.prototype.offsetTop = function(a) {
                for (var b; void 0 === a.offsetTop;) a = a.parentNode;
                for (b = a.offsetTop; a = a.offsetParent;) b += a.offsetTop;
                return b
            }, e.prototype.isVisible = function(a) {
                var b, c, d, e, f;
                return c = a.getAttribute("data-wow-offset") || this.config.offset, f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset, e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c, d = this.offsetTop(a), b = d + a.clientHeight, e >= d && b >= f
            }, e.prototype.util = function() {
                return null != this._util ? this._util : this._util = new b
            }, e.prototype.disabled = function() {
                return !this.config.mobile && this.util().isMobile(navigator.userAgent)
            }, e
        }()
    }.call(this);
