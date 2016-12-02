var app = window.app || {};
app.globals = {
    lastTimeOfDay: {},
    windowW: 0,
    windowH: 0,
    isInit: !1,
    isMobile: !1,
    init: function() {
        var a = this;
        a.isInit || (a.isMobile = /Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent || navigator.vendor || window.opera), a.isMobile && app.elements.$body.addClass("has-touch"), app.pageTransitions.init(), app.scrollAnimations.init(), app.svg.init(), app.widgets.headerMain.init(), app.widgets.navMain.init(), a.timeOfDay((new Date).getHours()), FastClick.attach(document.body), a.resize(), $(window).on("throttledresize", function() { a.resize() }), a.isInit = !0)
    },
    resize: function() { this.windowW = window.innerWidth, this.windowH = window.innerHeight },
    timeOfDay: function(a) {
        if ("undefined" == typeof a && this.lastTimeOfDay) return this.lastTimeOfDay;
        var b = {};
        return b.now = b.morning = b.afternoon = b.lunchtime = b.daytime = b.nighttime = !1, a >= 4 && 6 > a ? b.now = "early" : a >= 6 && 8 > a ? (b.now = "earlymorning", b.morning = !0) : a >= 8 && 11 > a ? (b.now = "latemorning", b.morning = !0) : a >= 11 && 13 > a ? (b.now = "noonish", b.afternoon = !0, b.lunchtime = !0) : a >= 13 && 16 > a ? (b.now = "afternoon", b.afternoon = !0) : a >= 16 && 19 > a ? (b.now = "earlyevening", b.afternoon = !0) : a >= 19 && 21 > a ? b.now = "evening" : a >= 21 && 23 > a ? b.now = "night" : (a >= 23 || 4 > a) && (b.now = "latenight"), a >= 6 && 19 > a ? b.daytime = !0 : b.nighttime = !0, this.lastTimeOfDay = b, b
    },
    parseRequestArgs: function() {
        var a = { failed: !0, jqXHR: {}, textStatus: "", errorThrown: "", response: null };
        return arguments[2] && "string" === $.type(arguments[2]) ? (a.jqXHR = arguments[0] || null, a.textStatus = arguments[1] || null, a.errorThrown = arguments[2] || null, a.response = arguments[3] || null, a.failed = a.response.success || !0) : (a.response = arguments[0] || null, a.textStatus = arguments[1] || null, a.jqXHR = arguments[2] || null, a.errorThrown = null, a.failed = !a.response.success || !1), a
    }
};
var app = window.app || {};
app.pageTransitions = {
        vars: { navID: "nav-main", switchID: "nav-switch", frontID: "nav-front", language: null, section: null, tempalte: null, duration: 1e3 },
        options: null,
        init: function() {
            var a, b = app.elements.$html,
                c = app.elements.$body,
                d = app.elements.$main;
            $("#" + this.vars.navID);
            this.vars.section = c.data("section"), this.vars.template = c.data("template"), this.vars.language = b.attr("lang"), this.options = this.initOptions(), $.smoothStateUtility.storePageIn = $.proxy(this.storePageIn, this), window.onpopstate = $.proxy(this.onPopState, this), app.elements.$document.on("click.loco.smoothState", ".js-link", $.proxy(this.onClickAnchor, this)), a = d.smoothState(this.options).data("smoothState")
        },
        initOptions: function() {
            if (!this.options) {
                var a = this,
                    b = app.elements.$html,
                    c = app.elements.$body,
                    d = (app.elements.$main, $("#" + this.vars.navID));
                this.options = {
                    scroll: !1,
                    blacklist: [app.widgets.scrollto.ANCHOR_SELECTOR, app.widgets.work.FILTER_SELECTOR].join(),
                    alterRequest: function(a) {
                        var b = { headers: { "X-Locomotive-Referer-Section": c.data("section") } };
                        return a = "string" == typeof a ? $.extend({}, b, { url: a }) : $.extend({}, b, a)
                    },
                    alterChangeState: function(b, c, d) {
                        return b.section = a.vars.section, b.template = a.vars.template, b.language = a.vars.language, b.url = d, b
                    },
                    onBefore: function(b, d) { b && (b.hasClass("js-next-link") ? c.addClass("is-next") : c.removeClass("is-next"), a.changeColors(b)) },
                    onStart: {
                        duration: a.vars.duration,
                        render: function(d) {
                            var e = d.data("smoothState");
                            "play" === c.data("section") && app.widgets.play.destroy();
                            var f = app.params.current_template || !1;
                            switch (f && (f.destroy ? f.destroy() : f.removeEventHandlers && f.removeEventHandlers()), app.params.current_widgets.length && $.each(app.params.current_widgets, function(a, b) {
                                var c = app.widgets[b] || !1;
                                c && (c.destroy ? c.destroy() : c.removeEventHandlers && c.removeEventHandlers())
                            }), c.removeClass("is-loaded has-nav-open"), c.addClass("is-loading is-exiting"), a.vars.section) {
                                case c.data("section"):
                                    a.vars.language !== b.attr("lang") && c.addClass("is-translating");
                                    break;
                                case "work":
                                    c.addClass("is-moving has-work");
                                    break;
                                case "play":
                                    c.addClass("is-moving has-play")
                            }
                            app.widgets.contact.vars.open = !1, $(".js-header-background").removeClass("u-background-accent is-unpinned").addClass("is-pinned"), e.restartCSSAnimations()
                        }
                    },
                    onReady: {
                        duration: 0,
                        render: function(e, f) {
                            var g = e.data("smoothState"),
                                h = (history.state, g.cache[g.href] || {}),
                                i = h.menu ? $(h.menu).html() : null,
                                j = $("#" + a.vars.switchID),
                                k = h.switcher ? $(h.switcher) : null,
                                l = $("#" + a.vars.frontID),
                                m = h.front ? $(h.front) : null;
                            switch (e.html(f), $(window).scrollTop(0), d && i && d.html(i), j && k && b.attr("lang") !== a.vars.language && (j.find(".for-play").attr("href", k.find(".for-play").attr("href")).find(".c-header-main_switch_label").text(k.find(".for-play .c-header-main_switch_label").text()), j.find(".for-work").attr("href", k.find(".for-work").attr("href")).find(".c-header-main_switch_label").text(k.find(".for-work .c-header-main_switch_label").text())), l && m && (l.attr(m.attrs()), l.children(".o-ripple").attr("style", m.children(".o-ripple").attr("style"))), c.addClass("is-loaded").removeClass("is-exiting is-moving is-translating has-work has-play"), a.vars.section) {
                                case c.data("section"):
                                    break;
                                case "work":
                                    c.addClass("t-work").removeClass("t-play");
                                    break;
                                case "play":
                                    c.addClass("t-play").removeClass("t-work")
                            }
                            h.section && (a.vars.section = h.section), h.template && (a.vars.template = h.template), b.attr("lang", a.vars.language), c.data("section", a.vars.section).attr("data-section", a.vars.section), c.data("template", a.vars.template).attr("data-template", a.vars.template), c.removeClass("has-next is-loading-next")
                        }
                    },
                    onAfter: function(b, c) { app.init(), window.ga && window.location.pathname && window.ga("send", "pageview", window.location.pathname), a.removeColors() }
                }
            }
            return this.options
        },
        storePageIn: function(a, b, c, d, e, f) {
            var g = document.implementation.createHTMLDocument("");
            return g.documentElement.innerHTML = c, "undefined" == typeof e && (e = {}), "undefined" == typeof f && (f = b), a[b] = { status: "loaded", title: g.title, section: g.body.getAttribute("data-section"), template: g.body.getAttribute("data-template"), doc: c, state: e, destUrl: f, html: $(g.getElementById(d)), front: g.getElementById(this.vars.frontID), menu: g.getElementById(this.vars.navID), switcher: g.getElementById(this.vars.switchID) }, a
        },
        onPopState: function(a) {
            if (null !== a.state) {
                var b, c = window.location.href,
                    d = $("#" + a.state.id),
                    e = d.data("smoothState"),
                    f = $.smoothStateUtility,
                    g = e.href !== c && !f.isHash(c, e.href),
                    h = a.state !== e.cache[e.href].state;
                (g || h) && (this.vars.template = a.state.template, this.vars.section = a.state.section, this.vars.language = a.state.language, h && e.clear(e.href), b = f.translate(c), b = this.options.alterRequest(b), b.headers["X-Locomotive-Referer-Section"] = this.vars.section, e.load(b, !1))
            }
        },
        onClickAnchor: function(a) {
            var b = $(a.currentTarget),
                c = $.smoothStateUtility,
                d = a.altKey || a.ctrlKey || a.metaKey || a.shiftKey;
            if (!d && c.shouldLoadAnchor(b, [])) {
                var e = app.elements.$main,
                    f = e.smoothState(this.options).data("smoothState"),
                    g = c.translate(b.prop("href"));
                a.stopPropagation(), a.preventDefault(), this.options.alterRequest && (g = this.options.alterRequest(g)), this.options.onBefore && this.options.onBefore(b, e), f.load(g)
            }
        },
        changeColors: function(a) {
            var b = this,
                c = app.elements.$body,
                d = (app.elements.$main, a.attr("hreflang") || b.vars.language),
                e = a.data("section") || b.vars.section,
                f = (a.data("template") || b.vars.template, a.data("foreground")),
                g = a.data("background"),
                h = a.data("backgroundAccent"),
                i = a.data("foregroundAccent"),
                j = a.data("theme");
            switch ($(".js-link").removeClass("is-active"), a.addClass("is-active"), $(".u-foreground").css("color", f), $(".u-background").css("background-color", g), $(".u-background-accent").css("background-color", h), $(".u-foreground-accent").css("color", i), $(".u-foreground-accent-reverse").css("color", h), $('meta[name="theme-color"]').attr("content", j), d !== b.vars.language && (b.vars.language = d), e) {
                case c.data("section"):
                    b.vars.duration = 600;
                    break;
                case "work":
                    b.vars.section = "work", b.vars.duration = 1500;
                    break;
                case "play":
                    b.vars.section = "play", b.vars.duration = 1500;
                    break;
                default:
                    b.vars.duration = 1200
            }
            return b.options.onStart.duration = b.vars.duration, c.removeClass("is-first-visit is-welcoming-visitor"), c.hasClass("has-contact-open") && (c.toggleClass("has-contact-open u-foreground u-foreground-accent has-fab-delay"), $(".js-fab").toggleClass("u-background-accent u-foreground-accent u-background-accent-reverse u-foreground-accent-reverse"), b.removeColors(), app.widgets.contact.vars.open = !1, $(".js-header-background").removeClass("u-background-accent is-unpinned").addClass("is-pinned")), this
        },
        removeColors: function() {
            return $(".u-foreground").css("color", ""), $(".u-background").css("background-color", ""), $(".u-background-accent").css("background-color", ""), $(".u-foreground-accent").css("color", ""), $(".u-foreground-accent-reverse").css("color", ""), this
        }
    },
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.parcel = {
            xhr: null,
            working: !1,
            submitForm: function(b) {
                if (b.preventDefault(), !this.working) {
                    this.working = !0;
                    var c, d, f, g = {};
                    if (c = a(b.currentTarget), d = a(b.delegateTarget), c.prop("disabled")) return !1;
                    c.data("form-parcel") && (g.parcel = c.data("form-parcel")), d.find("[data-form-parcel]").prop("disabled", !0), f = { type: b.formMethod || d.prop("method") || d.data("form-method"), url: b.formAction || d.data("action") || d.data("form-action"), dataType: "json", data: g }, this.xhr = a.ajax(f).done(a.proxy(e.parcel.requestDone, this, d, c)).fail(a.proxy(e.parcel.requestFailed, this, d, c)).always(a.proxy(e.parcel.requestComplete, this, d, c))
                }
            },
            requestDone: function(b, c, d, f, g) {
                var h;
                return "object" === a.type(d) && d.success ? void 0 : (h = d.errors && 1 === d.errors.length ? d.errors[0].message.replace("<strong>ERROR</strong>: ", "") : "Unsuccessful Response", e.parcel.requestFailed(b, c, g, f, h, d))
            },
            requestFailed: function(a, b) {},
            requestComplete: function(a, b) {
                var c, d, f, g, h, i;
                c = e.globals.parseRequestArgs.apply(this, Array.prototype.slice.call(arguments, 2)), d = c.jqXHR, g = c.textStatus, h = c.errorThrown, f = c.response, i = c.failed, a.find("[data-form-parcel]").removeProp("disabled"), this.working = !1
            }
        }
    }(jQuery, window, document);
var app = window.app || {};
app.scrollAnimations = {
    manager: null,
    init: function() {
        var a = this;
        $("body").hasClass("is-welcoming-visitor") ? setTimeout(function() { a.wow() }, 6100) : a.wow()
    },
    wow: function() { this.manager = new WOW({ boxClass: "js-wow", animateClass: "is-animated" }), this.manager.init() }
};
var app = window.app || {};
app.svg = { init: function() { svg4everybody() } },
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.widgets = e.widgets || {}, e.widgets.about = {
            EVENT_NAMESPACE: e.EVENT_NAMESPACE + ".about",
            CONTAINER_SELECTOR: ".js-triangle",
            MEMBER_SELECTOR: ".js-about-member",
            MEMBER_SPRITE_SELECTOR: ".js-about-member-sprite",
            SPRITE_CONTAINER_SELECTOR: ".js-about-member-sprite-container",
            AWARD_SUMS_SELECTOR: ".c-about_wins",
            AWARD_COUNT_SELECTOR: ".js-count",
            DEFAULTS: { countUp: { useEasing: !1, useGrouping: !0, separator: ",", decimal: ".", prefix: "", suffix: "" } },
            elements: { $container: [], $members: [], $awardSums: [] },
            interval: null,
            frameIndex: null,
            init: function() { this.hasDependencies() && (this.addEventHandlers(), this.scroll(), this.elements.$members.each(this.updateSprite.bind(this))) },
            destroy: function() {
                return this.removeEventHandlers(), this
            },
            hasDependencies: function() {
                return this.elements.$container = a(this.CONTAINER_SELECTOR).first(), this.elements.$members = a(this.MEMBER_SELECTOR), this.elements.$awardSums = a(this.AWARD_SUMS_SELECTOR), this.elements.$container.length && this.elements.$members.length
            },
            addEventHandlers: function() {
                var a = this;
                return a.elements.$members.length && e.elements.$window.on("resize." + this.EVENT_NAMESPACE, function() { a.elements.$members.each(a.updateSprite.bind(a)) }), this.elements.$awardSums.length && e.elements.$window.on("scroll." + this.EVENT_NAMESPACE, this.scroll.bind(a)), e.elements.$body.hasClass("has-touch") || e.elements.$document.on("mouseenter." + this.EVENT_NAMESPACE, this.MEMBER_SELECTOR, a.mouseenter.bind(a)).on("mouseleave." + this.EVENT_NAMESPACE, this.MEMBER_SELECTOR, a.mouseleave.bind(a)), this
            },
            removeEventHandlers: function() {
                return e.elements.$window.off(this.EVENT_NAMESPACE), e.elements.$document.off(this.EVENT_NAMESPACE), this.elements.$container.off(this.EVENT_NAMESPACE), this
            },
            scroll: function() {
                var a = this.elements.$awardSums;
                a.length && b.pageYOffset > a.offset().top - b.innerHeight / 2 && (e.elements.$window.off("scroll." + this.EVENT_NAMESPACE), this.count())
            },
            count: function() {
                var b = this;
                a(this.AWARD_COUNT_SELECTOR, this.elements.$awardSums).each(function(c, d) {
                    var e = a(d),
                        f = e.data("number"),
                        g = new CountUp(this, 0, f, 0, 1, b.DEFAULTS.countUp);
                    g.start()
                })
            },
            updateSprite: function(b, c) {
                var d = a(this.MEMBER_SPRITE_SELECTOR, c);
                d.width(30 * d.parent().width())
            },
            mouseenter: function(b) {
                var c = this,
                    d = a(b.currentTarget);
                clearInterval(c.interval), c.frameIndex || (c.frameIndex = 0), c.interval = setInterval(function() { TweenLite.to(d.find(c.MEMBER_SPRITE_SELECTOR), 0, { x: -d.find(c.SPRITE_CONTAINER_SELECTOR).width() * c.frameIndex }), c.frameIndex++, c.frameIndex > 28 && (clearInterval(c.interval), c.frameIndex = 29) }, 10)
            },
            mouseleave: function(b) {
                var c = this,
                    d = a(b.currentTarget);
                clearInterval(c.interval), c.frameIndex || (c.frameIndex = 29), c.interval = setInterval(function() { TweenLite.to(d.find(c.MEMBER_SPRITE_SELECTOR), 0, { x: -d.find(c.SPRITE_CONTAINER_SELECTOR).width() * c.frameIndex }), c.frameIndex--, c.frameIndex <= 0 && (clearInterval(c.interval), c.frameIndex = 0) }, 10)
            }
        }
    }(jQuery, window, document);
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.accordion = {
        init: function() {
            var a, b = this,
                c = $(".js-accordion");
            c.on("click.loco.accordion", ".js-accordion-header", function() {
                var a = $(this).parent(".js-accordion-item");
                a.hasClass("is-open") ? b.slideUp(a) : b.slideDown(a)
            }), a = c.children(".is-current-item").first(), a.length && app.widgets.scrollto.scroll(a.offset().top, 450)
        },
        slideUp: function(a) { a.removeClass("is-open").children(".js-accordion-content").stop().slideUp(300) },
        slideDown: function(a) { this.slideUp($(".js-accordion-item.is-open")), a.addClass("is-open").children(".js-accordion-content").stop().slideDown(300, function() { app.widgets.scrollto.scroll(a.offset().top, 450) }) }
    },
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.widgets = e.widgets || {}, e.widgets.awards = {
            CONTAINER_SELECTOR: '[data-widget="awards"]',
            ITEM_SELECTOR: "[data-award-item]",
            BUTTON_SELECTOR: "[data-award-more]",
            DEFAULTS: {},
            elements: { $container: [], $items: [], $button: [] },
            init: function() { this.hasDependencies() && this.addEventHandlers() },
            hasDependencies: function() {
                return this.elements.$container = a(this.CONTAINER_SELECTOR), this.elements.$items = a(this.ITEM_SELECTOR), this.elements.$container.length && this.elements.$items.length
            },
            addEventHandlers: function() {
                var b = this;
                return this.elements.$container.on("click.loco.awards", b.BUTTON_SELECTOR, function(c) {
                    c.preventDefault();
                    var d = a(c.currentTarget),
                        f = b.elements.$items.filter(".is-hidden");
                    f.length > 13 ? f.slice(0, 9).removeClass("is-hidden") : f.removeClass("is-hidden"), f.slice(10).length || (d.addClass("is-hidden"), b.removeEventHandlers()), e.scrollAnimations.manager.scrolled = !0, e.scrollAnimations.manager.scrollCallback()
                }), this
            },
            removeEventHandlers: function() {
                return this.elements.$container.off("click.loco.awards"), this
            }
        }
    }(jQuery, window, document);
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.block = {
    vars: { swap: !1, hover: !1, target: !1 },
    init: function() {
        var a = this,
            b = !1;
        app.globals.isMobile || $(".js-mouse-parallax").hover(function() { b || ($(this).parallaxify({ positionProperty: "transform", mouseMotionType: "performance" }), b = !0) }, function() { b && ($(this).parallaxify("destroy"), b = !1) }), $(".js-swap-text").hover(function() { $this = $(this), $this.hasClass("is-swapping") || a.swapIn($this, "text-hover") }, function() { $this = $(this), $this.hasClass("is-swapping") && a.swapOut($this, "text") })
    },
    swapIn: function(a, b) {
        var c = this;
        a.removeClass("is-out"), a.addClass("is-in"), this.swapText(a, b), setTimeout(function() { a.is(":hover") || c.swapOut(a, "text"), a.addClass("is-swapping") }, 800)
    },
    swapOut: function(a, b) {
        var c = this;
        a.addClass("is-out"), a.removeClass("is-in"), this.swapText(a, b), setTimeout(function() { a.is(":hover") && c.swapIn(a, "text-hover"), a.removeClass("is-swapping") }, 800)
    },
    swapText: function(a, b) {
        var c = 400;
        a.find(".js-swap-line").each(function() {
            var a = $(this);
            setTimeout(function() {
                var c = a.data(b);
                a.html(c)
            }, c), c += 100
        })
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.contact = {
    vars: { change: !0, open: !1 },
    init: function() { $(".js-contact-open").unbind(), this.events(), $("body").hasClass("is-welcoming-visitor") && (this.changePage("home"), this.vars.open = !0) },
    open: function(a) {
        var b = this,
            c = $("body"),
            d = $('meta[name="theme-color"]');
        if (a) {
            var e = $(a.data("input-target")),
                f = a.data("input-value");
            if (d.attr("content", a.css("background-color")), e.length)
                if ("SELECT" === e.prop("tagName").toUpperCase()) {
                    if (e.find("option").filter(function() {
                            return $(this).val() == f
                        }).prop("selected", !0), e.data("selectric")) try { e.data("selectric").refresh() } catch (g) { console.log(g.message) }
                } else e.val(f)
        }
        var h;
        c.toggleClass("has-contact-open u-foreground u-foreground-accent").removeClass("has-nav-open"), $(".js-fab").toggleClass("u-background-accent u-foreground-accent u-background-accent-reverse u-foreground-accent-reverse"), b.vars.open ? (b.vars.open = !1, b.type(null), clearTimeout(h), $(".js-fab").removeClass("is-invisible"), h = setTimeout(function() { c.removeClass("has-fab-delay") }, 700), $(".c-contact_content").removeClass("is-active"), $(".c-contact_item").removeClass("is-active"), $(".js-header-background").removeClass("u-background-accent"), $(".js-header-background").addClass("is-pinned"), $(".js-header-background").removeClass("is-unpinned")) : (b.vars.open = !0, c.addClass("has-fab-delay"), b.type(null), a.data("page") ? this.changePage(a.data("page")) : this.changePage("menu"), $(".js-header-background").addClass("u-background-accent"), $(".js-header-background").removeClass("is-unpinned"), $(".js-nav-main").addClass("is-pinned"), $(".js-nav-main").removeClass("is-unpinned"))
    },
    type: function(a) {
        function b() { d.text("").data("typed", null), clearInterval(c.intervalTyped), c.timeoutTyped = setTimeout(function() { d.typed({ strings: [e], typeSpeed: 10, showCursor: !1 }) }, 200) }
        var c = this,
            d = $(".js-contact-text"),
            e = a;
        if (null == e) d.text(""), clearInterval(c.intervalTyped), clearTimeout(c.timeoutTyped), d.typed("destroy");
        else if (d.text().length > 0) {
            var f = d.text().length,
                g = 0;
            c.intervalTyped = setInterval(function() {
                if (f > g) {
                    var a;
                    a = d.text(), a = a.slice(0, -1), d.text(a)
                } else b();
                g++
            }, 15)
        } else d.text("").data("typed", null), c.timeoutTyped = setTimeout(function() { d.typed({ strings: [e], typeSpeed: 10, showCursor: !1 }) }, 600)
    },
    cursor: function(a) {
        if ("undefined" != typeof window.getSelection && "undefined" != typeof document.createRange) {
            var b = document.createRange();
            b.selectNodeContents(a), b.collapse(!1);
            var c = window.getSelection();
            c.removeAllRanges(), c.addRange(b)
        } else if ("undefined" != typeof document.body.createTextRange) {
            var d = document.body.createTextRange();
            d.moveToElementText(a), d.collapse(!1), d.select()
        }
    },
    button: function(a, b) {
        var c = this;
        c.vars.change && a.on("blur keyup paste", function() { b !== a.html() && ($(".js-contact-submit").removeClass("is-invisible is-hidden"), c.vars.change = !1) })
    },
    validate: function(a) {
        $("[required]", a).each(function() {
            var a = $(this);
            a.val() || a.addClass("has-error")
        })
    },
    send: function() {},
    greetVisitor: function(a) {
        var b = app.globals.timeOfDay((new Date).getHours());
        switch (b.now) {
            case "earlymorning":
            case "latemorning":
                return a.data("greeting-morning");
            case "noonish":
            case "afternoon":
            case "earlyevening":
                return a.data("greeting-afternoon");
            case "evening":
            case "night":
                return a.data("greeting-evening");
            case "latenight":
            case "early":
                return a.data("greeting-night")
        }
        return null
    },
    changePage: function(a) {
        $(".c-contact_content").removeClass("is-active"), $(".c-contact_item").removeClass("is-active");
        var b = this,
            c = (app.globals.timeOfDay((new Date).getHours()), $('.c-contact_content[data-param="' + a + '" ]')),
            d = c.data("text-type"),
            e = c.data("text"),
            f = c.find(".c-contact_item");
        "greeting" === d && (greeting = this.greetVisitor(c)) && (e = greeting), c.addClass("is-active"), this.type(e), "menu" !== a && "home" !== a ? $(".js-contact-back").addClass("is-active") : $(".js-contact-back").removeClass("is-active"), "home" === a && setTimeout(function() { $(".js-header-main").addClass("-visible"), $(".js-fab").removeClass("is-hidden"), $("body").addClass("has-fab-delay"), b.open($(".js-contact-open")), $(".js-header-background").addClass("u-background") }, 6e3);
        var g = c.find(".js-recaptcha");
        if (g.length && g.is(":empty")) {
            var h = g.attr("id"),
                i = g.data("sitekey");
            window.grecaptcha.render(h, { sitekey: i })
        }
        f.each(function() {
            if ($(this).attr("data-delay")) {
                var b = $(this),
                    c = 1e3 * $(this).data("delay");
                "menu" == a && (c += 1e3), setTimeout(function() { b.addClass("is-active") }, c)
            } else $(this).addClass("is-active")
        })
    },
    fail: function(a) {
        for (var b = 0; b < a.length; b++) $("input[name=" + a[b] + "]").addClass("has-error"), $("select[name=" + a[b] + "]").parent().parent().find(".selectric").addClass("has-error");
        $(".js-contact-error").fadeIn(), setTimeout(function() { $(".js-contact-error").fadeOut() }, 2e3)
    },
    success: function() {
        var a = this;
        $(".c-contact_content").removeClass("is-active"), $(".c-contact_item").removeClass("is-active");
        var b = $(".js-contact").data("success");
        this.type(b), setTimeout(function() { a.open() }, 5e3)
    },
    events: function() {
        var a = this;
        $(".js-contact-open").click(function(b) { b.preventDefault(), a.open($(this)) }), $(".js-contact-step").click(function() { a.changePage($(this).data("page")) }), $(".js-contact-back").click(function() { a.changePage("menu") }), $(".js-contact-form").data("form-working", !1).on("focus.loco.contact", "[required].has-error", function(a) { $(a.currentTarget).removeClass("has-error") }).on("submit.loco.contact", function(b) {
            b.preventDefault(), b.stopPropagation();
            var c, d, e, f = $(b.currentTarget);
            f.data("form-working") || f.prop("disabled") || (c = f.find('[type="submit"]').first(), f.data("form-working", !0).prop("disabled", !0), c.addClass("is-loading"), d = new FormData(b.currentTarget), a.validate(f), e = {
                type: b.formMethod || f.prop("method") || "POST",
                url: b.formAction || f.prop("action"),
                processData: !1,
                contentType: !1,
                dataType: "json",
                data: d,
                success: function(b) { 1 == b.success ? (a.success(), f.trigger("reset")) : a.fail() },
                error: function(b) {
                    var c = b.responseText;
                    c = JSON.parse(c), c = c.errors, a.fail(c)
                },
                complete: function(a) { f.data("form-working", !1).removeProp("disabled"), c.removeClass("is-loading") }
            }, $.ajax(e))
        }), document.getElementById("career-resume").onchange = function() {
            var a = $(this)[0].files[0].name;
            $(".js-contact-filename").text(a)
        }
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.headerMain = {
    init: function() {
        var a = this;
        a.headroomReset(), a.headroom(), $(window).on("throttledresize", function(b) { a.headroom() });
        var b = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        b && $("body").toggleClass("is-ios")
    },
    headroomObjects: { header: !1, background: !1, container: !1, nav: !1 },
    headroomOptions: { classes: { initial: "js-headroom", pinned: "is-pinned", unpinned: "is-unpinned", top: "is-top", notTop: "is-not-top" } },
    headroom: function() {
        var a = this,
            b = (document.querySelector(".js-header-main"), document.querySelector(".js-header-background")),
            c = document.querySelector(".js-header-container"),
            d = document.querySelector(".js-nav-main");
        a.headroomObjects.background = new Headroom(b, a.headroomOptions), a.headroomObjects.background.init(), window.matchMedia("(max-width: 1199px)").matches ? (a.headroomObjects.nav && (a.headroomObjects.nav.destroy(), a.headroomObjects.nav = !1), a.headroomObjects.container || (a.headroomObjects.container = new Headroom(c, a.headroomOptions), a.headroomObjects.container.init())) : window.matchMedia("(min-width: 1200px)").matches && (a.headroomObjects.container && (a.headroomObjects.container.destroy(), a.headroomObjects.container = !1), a.headroomObjects.nav || (a.headroomObjects.nav = new Headroom(d, a.headroomOptions), a.headroomObjects.nav.init()))
    },
    headroomReset: function() {
        var a = this;
        a.headroomObjects.header = !1, a.headroomObjects.background = !1, a.headroomObjects.nav = !1
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.lazyLoad = {
        init: function() {
            app.globals.isMobile || ($(".js-lazy-load").each(function() {
                var a = $(this),
                    b = a.data("lazy-image"),
                    c = a.data("lazy-class");
                a.append('<img class="' + c + '" src="' + b + '">')
            }), $(".js-home-morphing").each(function() {
                var a = $(this);
                a.attr("src", a.data("src"))
            })), $(".js-home-random-image").each(function() {
                var a = $(this);
                switch (basePath = a.data("path-base"), src = "", min = 0, max = 15, Math.floor(Math.random() * (max - min + 1)) + min) {
                    case 0:
                        src = "antoine1.jpg";
                        break;
                    case 1:
                        src = "ben1.jpg";
                        break;
                    case 2:
                        src = "charles1.jpg";
                        break;
                    case 3:
                        src = "chauncey1.jpg";
                        break;
                    case 4:
                        src = "dan1.jpg";
                        break;
                    case 5:
                        src = "delphine1.jpg";
                        break;
                    case 6:
                        src = "dimitri1.jpg";
                        break;
                    case 7:
                        src = "dom1.jpg";
                        break;
                    case 8:
                        src = "emilie1.jpg";
                        break;
                    case 9:
                        src = "fred1.jpg";
                        break;
                    case 10:
                        src = "jeff1.jpg";
                        break;
                    case 11:
                        src = "laura1.jpg";
                        break;
                    case 12:
                        src = "mat1.jpg";
                        break;
                    case 13:
                        src = "max1.jpg";
                        break;
                    case 14:
                        src = "quentin1.jpg";
                        break;
                    case 15:
                        src = "seb1.jpg"
                }
                a.attr("src", basePath + src)
            })
        }
    },
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.widgets = e.widgets || {}, e.widgets.map = {
            CONTAINER_SELECTOR: '[data-widget="map"]',
            DEFAULTS: { map: { center: null, zoom: 17, scrollwheel: !1 }, marker: { map: null, position: null, title: null }, disc: { path: "M0,3a3,3 0 1,0 6,0a3,3 0 1,0 -6,0", anchor: { x: 3, y: 3 }, fillColor: "#4D84F1", fillOpacity: 1, strokeWeight: 0, scale: 5 }, styles: [{ featureType: "all", elementType: "labels.text.fill", stylers: [{ saturation: 36 }, { color: "#000000" }, { lightness: 60 }] }, { featureType: "all", elementType: "labels.text.stroke", stylers: [{ visibility: "on" }, { color: "#000000" }, { lightness: 16 }] }, { featureType: "all", elementType: "labels.icon", stylers: [{ visibility: "off" }] }, { featureType: "administrative", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 20 }] }, { featureType: "administrative", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }] }, { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 20 }] }, { featureType: "poi", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 21 }] }, { featureType: "road.highway", elementType: "geometry.fill", stylers: [{ color: "#000000" }, { lightness: 17 }] }, { featureType: "road.highway", elementType: "geometry.stroke", stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: .2 }] }, { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 18 }] }, { featureType: "road.local", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 16 }] }, { featureType: "transit", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 19 }] }, { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }, { lightness: 17 }] }] },
            elements: { $container: [] },
            objects: { map: null, marker: null, styles: null },
            init: function() { this.elements.$container = a(this.CONTAINER_SELECTOR).first(), this.elements.$container.length && (this.hasDependencies() ? this.make() : this.load()) },
            hasDependencies: function() {
                return this.hasApi()
            },
            hasApi: function() {
                return b.google && b.google.maps
            },
            load: function() {
                var a, b, d, e, f = "google-maps-api";
                if (!c.getElementById(f)) return d = this.elements.$container.data("google-api-key"), d && (d = "key=" + d + "&"), e = c.documentElement.getAttribute("lang"), e && (e = "hl=" + e + "&"), b = c.getElementsByTagName("script")[0], a = c.createElement("script"), a.id = f, a.src = "//maps.googleapis.com/maps/api/js?" + e + d + "callback=app.widgets.map.make", b.parentNode.insertBefore(a, b), this
            },
            make: function() {
                var b, c, d, e;
                return b = new google.maps.LatLng({ lat: this.elements.$container.data("map-position-lat"), lng: this.elements.$container.data("map-position-lng") }), c = a.extend({}, this.DEFAULTS.map, { center: b }), this.objects.map = new google.maps.Map(this.elements.$container[0], c), this.objects.map.set("styles", this.DEFAULTS.styles), d = a.extend({}, this.DEFAULTS.disc, { anchor: new google.maps.Point(this.DEFAULTS.disc.anchor.x, this.DEFAULTS.disc.anchor.y) }), e = a.extend({}, this.DEFAULTS.marker, { map: this.objects.map, position: b, icon: d, title: this.elements.$container.data("map-marker-title") }), this.objects.marker = new google.maps.Marker(e), this
            }
        }
    }(jQuery, window, document);
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.memberMorphing = {
    init: function() {
        var a = this;
        a.nbImage = 30;
        var b = "ontouchstart" in document.documentElement;
        $(".js-member").each(function() { a.intervals = new Array, $(".c-member_sprite", this).width($(this).width() / 2 * 30), b ? $(this).on("click", a.tap.bind(this)) : $(this).on("mousemove", a.mousemove.bind(this)), $(this).on("mouseleave", a.mouseout.bind(this)) }), $(window).on("resize", function() { $(".js-member").each(function() { $(".c-member_sprite", this).width($(this).width() / 2 * 30) }) })
    },
    mousemove: function(a) {
        a.stopPropagation();
        var b = a.pageX - $(this).offset().left,
            c = a.pageY - $(this).offset().top;
        this.val = (-Math.abs(2 * (100 * b / $(this).width() - 50)) + 100 + (-Math.abs(2 * (100 * c / $(this).height() - 50)) + 100)) / 2, this.val = parseInt(this.val * app.widgets.memberMorphing.nbImage / 100), this.val < 0 && (this.val = 0), TweenLite.to($(".c-member_sprite", this), 0, { x: -($(this).width() / 2) * this.val }), $(this).data("active", !0)
    },
    mouseout: function(a) {
        var b = $(this),
            c = this;
        c.val < 0 && (c.val = 0), b.data("active", !1);
        var d = setInterval(function() { 0 == b.data("active") ? (TweenLite.to(b.find(".c-member_sprite"), 0, { x: -(b.width() / 2) * c.val }), c.val--, c.val <= 0 && (clearInterval(d), b.data("active", !1))) : clearInterval(d) }, 25)
    },
    tap: function(a) {
        var b = $(this),
            c = this;
        b.data("active") ? b.data("active", !1) : b.data("active", !0), clearInterval(c.interval), 1 == $(this).data("active") ? (c.val || (c.val = 0), c.interval = setInterval(function() { TweenLite.to(b.find(".c-member_sprite"), 0, { x: -(b.width() / 2) * c.val }), c.val++, c.val > 28 && (clearInterval(c.interval), c.val = 29) }, 10)) : (c.val || (c.val = 29), c.interval = setInterval(function() { TweenLite.to(b.find(".c-member_sprite"), 0, { x: -(b.width() / 2) * c.val }), c.val--, c.val <= 0 && (clearInterval(c.interval), c.val = 0) }, 10))
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.navMain = {
    init: function() {
        var a = this;
        $(".js-nav-main-button").click(function(b) { a.open() })
    },
    open: function() { $("body").toggleClass("has-nav-open") }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.navPage = { init: function() { $(".js-nav-page-button").click(function(a) { $("body").toggleClass("has-nav-page-open") }) } };
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.next = {
    init: function() { $(".js-next").hover(function() { app.pageTransitions.changeColors($(this)), app.elements.$body.addClass("has-next") }, function() { app.elements.$body.hasClass("is-loading") || (app.elements.$body.removeClass("has-next"), app.pageTransitions.removeColors()) }), this.events() },
    events: function() {
        var a = this;
        $(".js-next-link").click(a.launch)
    },
    launch: function(a) { app.elements.$body.addClass("is-loading-next") }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.parallax = {
    manager: null,
    isBooted: !1,
    init: function() {
        var a = this;
        app.globals.isMobile || setTimeout(function() { a.skrollr() }, 100)
    },
    skrollr: function() { this.isBooted ? this.manager.refresh() : (this.manager = skrollr.init({ forceHeight: !1 }), this.isBooted = !0) }
};
var app = window.app || {};
app.widgets = app.widgets || {};
var mouse, isMousedown, isAnimating, intervalTicker, NB_POINTS, countMove = NB_POINTS,
    headerHeight, raf, points, tolerance, ticker, pointsPlay, tlBuzz;
app.widgets.play = {
    isBooted: !1,
    init: function() {
        if (!this.isBooted) {
            this.isBooted = !0, $(document) && (headerHeight = $(".c-header-main").outerHeight()), mouse = { x: 0, y: 0 }, isMousedown = !1, isAnimating = !1, NB_POINTS = 46, countMove = NB_POINTS, points = new Array, tolerance = 20, ticker = 0;
            document.getElementsByTagName("body")[0];
            pointsPlay = [{ x: 153.6, y: 472.2 }, { x: 120.9, y: 761.8 }, { x: 180.3, y: 524.4 }, { x: 226.3, y: 452.3 }, { x: 234.7, y: 537 }, { x: 267.6, y: 569.5 }, { x: 420.6, y: 451.8 }, { x: 521, y: 259.8 }, { x: 500.1, y: 250.1 }, { x: 460.7, y: 308.1 }, { x: 434, y: 428.2 }, { x: 421.2, y: 513.5 }, { x: 440.4, y: 551.1 }, { x: 639.9, y: 386.1 }, { x: 680.3, y: 340.2 }, { x: 677.8, y: 389 }, { x: 662.1, y: 431.7 }, { x: 640, y: 475.5 }, { x: 630.5, y: 490.5 }, { x: 620, y: 501.75 }, { x: 613, y: 506.75 }, { x: 607.3, y: 507.2 }, { x: 602.75, y: 499.5 }, { x: 603, y: 487.5 }, { x: 606, y: 472.75 }, { x: 607.5, y: 468.75 }, { x: 614.5, y: 443.5 }, { x: 626.6, y: 415.7 }, { x: 639.9, y: 386.1 }, { x: 636.4, y: 392.7 }, { x: 680.3, y: 340.2 }, { x: 677.8, y: 389 }, { x: 678.1, y: 389 }, { x: 705.1, y: 484.7 }, { x: 757.1, y: 448.7 }, { x: 881.4, y: 326.7 }, { x: 882, y: 321.5 }, { x: 891.7, y: 284.6 }, { x: 868.5, y: 428.3 }, { x: 918.3, y: 383.1 }, { x: 969.7, y: 266.8 }, { x: 938, y: 552.5 }, { x: 924.8, y: 566.7 }, { x: 892.5, y: 539.8 }, { x: 895.8, y: 512.3 }, { x: 1087.6, y: 311.6 }];
            var a = this;
            NB_POINTS = pointsPlay.length, this.canvas = document.getElementById("canvas_play"), this.canvas.width = app.globals.windowW, this.canvas.height = app.globals.windowH, this.ctx = this.canvas.getContext("2d"), this.ctx.clearRect(0, 0, app.globals.windowW, app.globals.windowH), this.color = "#3fd67e", this.ctx.lineWidth = 10, this.ctx.lineJoin = "round", this.ctx.lineCap = "round", this.ctx.shadowColor = "#00ff00", this.ctx.shadowBlur = 70, this.ctx.shadowOffsetX = 0, this.ctx.shadowOffsetY = 0,
                this.ctx.strokeStyle = this.color, this.ctx.fillStyle = this.color, this.ctx.lineJoin = "round", this.ctx.imageSmoothingEnabled = !0;
            for (var b = 0; b < pointsPlay.length; b++) pointsPlay[b].x = 100 * (pointsPlay[b].x - 120.9) / 1900 * app.globals.windowW / 100, pointsPlay[b].y = 100 * pointsPlay[b].y / 1900 * app.globals.windowW / 100;
            for (var c = pointsPlay[pointsPlay.length - 1].x - pointsPlay[0].x, b = 0; b < pointsPlay.length; b++) pointsPlay[b].x = pointsPlay[b].x + app.globals.windowW / 2 - c / 2, points.push({ x: pointsPlay[0].x, y: pointsPlay[0].y });
            a.drawPlay(), a.events(), a.handleRaf()
        }
    },
    reload: function() { this.resize() },
    resize: function() {
        var a = document.getElementsByTagName("body")[0];
        this.canvas = document.getElementById("canvas_play"), this.canvas && (this.canvas.removeEventListener("mousemove", this.mousemove), this.canvas.removeEventListener("mousedown", this.mousedown), this.canvas.removeEventListener("mouseup", this.mouseup)), a.removeEventListener("mousemove", this.mouseBlur), TweenMax.killAll(!1, !0, !1), headerHeight = $(".c-header-main").outerHeight(), mouse = { x: 0, y: 0 }, isMousedown = !1, isAnimating = !1, countMove = NB_POINTS, points = new Array, tolerance = 20, ticker = 0;
        var a = document.getElementsByTagName("body")[0];
        pointsPlay = [{ x: 153.6, y: 472.2 }, { x: 120.9, y: 761.8 }, { x: 180.3, y: 524.4 }, { x: 226.3, y: 452.3 }, { x: 234.7, y: 537 }, { x: 267.6, y: 569.5 }, { x: 420.6, y: 451.8 }, { x: 521, y: 259.8 }, { x: 500.1, y: 250.1 }, { x: 460.7, y: 308.1 }, { x: 434, y: 428.2 }, { x: 421.2, y: 513.5 }, { x: 440.4, y: 551.1 }, { x: 639.9, y: 386.1 }, { x: 680.3, y: 340.2 }, { x: 677.8, y: 389 }, { x: 662.1, y: 431.7 }, { x: 640, y: 475.5 }, { x: 630.5, y: 490.5 }, { x: 620, y: 501.75 }, { x: 613, y: 506.75 }, { x: 607.3, y: 507.2 }, { x: 602.75, y: 499.5 }, { x: 603, y: 487.5 }, { x: 606, y: 472.75 }, { x: 607.5, y: 468.75 }, { x: 614.5, y: 443.5 }, { x: 626.6, y: 415.7 }, { x: 639.9, y: 386.1 }, { x: 636.4, y: 392.7 }, { x: 680.3, y: 340.2 }, { x: 677.8, y: 389 }, { x: 678.1, y: 389 }, { x: 705.1, y: 484.7 }, { x: 757.1, y: 448.7 }, { x: 881.4, y: 326.7 }, { x: 882, y: 321.5 }, { x: 891.7, y: 284.6 }, { x: 868.5, y: 428.3 }, { x: 918.3, y: 383.1 }, { x: 969.7, y: 266.8 }, { x: 938, y: 552.5 }, { x: 924.8, y: 566.7 }, { x: 892.5, y: 539.8 }, { x: 895.8, y: 512.3 }, { x: 1087.6, y: 311.6 }];
        NB_POINTS = pointsPlay.length, this.canvas && (this.canvas.width = app.globals.windowW, this.canvas.height = app.globals.windowH), this.ctx = this.canvas.getContext("2d"), this.ctx.clearRect(0, 0, app.globals.windowW, app.globals.windowH), this.color = "#3fd67e", this.ctx.lineWidth = 10, this.ctx.lineJoin = "round", this.ctx.lineCap = "round", this.ctx.shadowColor = "#00ff00", this.ctx.shadowBlur = 70, this.ctx.shadowOffsetX = 0, this.ctx.shadowOffsetY = 0, this.ctx.strokeStyle = this.color, this.ctx.fillStyle = this.color, this.ctx.lineJoin = "round", this.ctx.imageSmoothingEnabled = !0;
        for (var b = 0; b < pointsPlay.length; b++) pointsPlay[b].x = 100 * (pointsPlay[b].x - 120.9) / 1900 * app.globals.windowW / 100, pointsPlay[b].y = 100 * pointsPlay[b].y / 1900 * app.globals.windowW / 100;
        for (var c = pointsPlay[pointsPlay.length - 1].x - pointsPlay[0].x, b = 0; b < pointsPlay.length; b++) pointsPlay[b].x = pointsPlay[b].x + app.globals.windowW / 2 - c / 2, points.push({ x: pointsPlay[0].x, y: pointsPlay[0].y });
        for (var b = 0; b < points.length; b++) TweenMax.set(points[b], { clearProps: "all" }), points[b].x = pointsPlay[b].x, points[b].y = pointsPlay[b].y;
        app.widgets.play.events()
    },
    handleRaf: function() {
        this.ctx.clearRect(0, 0, app.globals.windowW, app.globals.windowH), this.ctx.beginPath(), this.ctx.moveTo(points[0].x, points[0].y);
        var a;
        for (a = 1; a < points.length - 2; a++) {
            var b = (points[a].x + points[a + 1].x) / 2,
                c = (points[a].y + points[a + 1].y) / 2;
            this.ctx.quadraticCurveTo(points[a].x, points[a].y, b, c)
        }
        this.ctx.quadraticCurveTo(points[a].x, points[a].y, points[a + 1].x, points[a + 1].y), this.ctx.stroke(), this.ctx.closePath(), this.handleRequest = requestAnimationFrame(this.handleRaf.bind(this))
    },
    mousedown: function(a) {
        $(".o-container").css("zIndex", 1e4), "ontouchstart" in document.documentElement ? $.fn.disableSelection = function() {
            return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1).css("overflow", "hidden")
        } : $.fn.disableSelection = function() {
            return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1)
        }, $("body").disableSelection(), 0 == isAnimating && (isMousedown = !0, TweenLite.to(points[NB_POINTS - 1], .6, { x: a.offsetX, y: a.clientY, ease: Power3.easeOut }), $("body").addClass("play-is-drawing"), TweenLite.to($(".js-play-cursor"), 0, { x: a.offsetX, y: a.offsetY }))
    },
    mouseup: function(a) {
        isMousedown = !1, 0 == isAnimating && (setTimeout(function() {
            $(".o-container").css("zIndex", 10), $.fn.enableSelection = function() {
                return this.attr("unselectable", "off").css("user-select", "text").on("selectstart", !0).css("overflow", "auto")
            }, $("body").enableSelection(), app.widgets.play.ctx.clearRect(0, 0, app.globals.windowW, app.globals.windowH), ticker = 0, clearInterval(intervalTicker), app.widgets.play.redrawPlay()
        }, 150), $("body").removeClass("play-is-drawing"))
    },
    mousemove: function(a) { mouse.x = a.offsetX, mouse.y = a.offsetY, isMousedown && (isAnimating = !1, app.widgets.play.movedelay(a.offsetX, a.offsetY)), TweenLite.to($(".js-play-cursor"), 0, { x: a.offsetX, y: a.offsetY }) },
    mouseBlur: function(a) {
        var b = 100 * (a.offsetX - app.globals.windowW / 2) / app.globals.windowW / 10,
            c = 100 * (a.offsetY - app.globals.windowH / 2) / app.globals.windowH / 10;
        app.widgets.play.ctx.shadowOffsetX = -b, app.widgets.play.ctx.shadowOffsetY = -c
    },
    movedelay: function(a, b) {
        if (isMousedown) {
            TweenLite.to(this.ctx, .3, { shadowBlur: 50 });
            setTimeout(function() { points.push({ x: a, y: b }), countMove++, countMove >= NB_POINTS && points.splice(0, 1) }, 150)
        }
    },
    touchstart: function(a) {
        a.preventDefault(), $(".o-container").css("zIndex", 1e4), "ontouchstart" in document.documentElement ? $.fn.disableSelection = function() {
            return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1).css("overflow", "hidden")
        } : $.fn.disableSelection = function() {
            return this.attr("unselectable", "on").css("user-select", "none").on("selectstart", !1)
        }, $("body").disableSelection(), 0 == isAnimating && (isMousedown = !0, TweenLite.to(points[NB_POINTS - 1], .6, { x: a.changedTouches[0].pageX, y: a.changedTouches[0].pageY + headerHeight, ease: Power3.easeOut }))
    },
    touchend: function(a) {
        isMousedown = !1, 0 == isAnimating && setTimeout(function() {
            $(".o-container").css("zIndex", 10), $.fn.enableSelection = function() {
                return this.attr("unselectable", "off").css("user-select", "text").on("selectstart", !0).css("overflow", "auto")
            }, $("body").enableSelection(), app.widgets.play.ctx.clearRect(0, 0, app.globals.windowW, app.globals.windowH), ticker = 0, clearInterval(intervalTicker), app.widgets.play.redrawPlay()
        }, 150)
    },
    touchmove: function(a) { mouse.x = a.changedTouches[0].pageX, mouse.y = a.changedTouches[0].pageY + headerHeight, isMousedown && (isAnimating = !1, app.widgets.play.movedelay(mouse.x, mouse.y)) },
    drawPlay: function() {
        function a() {
            function a() {
                if (c % 4 == 0) {
                    if (d < points.length) {
                        for (var e = new TimelineMax, f = d; f < pointsPlay.length; f++) 10 >= d || d >= 30 ? e.to(points[d], .1, { x: pointsPlay[d].x, y: pointsPlay[d].y, ease: Power2.easeInOut }) : (c += 2, e.to(points[d], .1, { x: pointsPlay[d].x, y: pointsPlay[d].y, ease: Power2.easeInOut }));
                        if (d > 0)
                            for (var g = d; g < pointsPlay.length; g++) points[g].x = points[d - 1].x, points[g].y = points[d - 1].y
                    } else d == points.length && ($(".c-play-overlay-canvas_play").css("zIndex", 99), isAnimating = !1);
                    d++
                }
                c++, b = requestAnimationFrame(a)
            }
            var c = 0,
                d = 0;
            a()
        }
        isAnimating = !0, $(".c-play-overlay-canvas_play").css("zIndex", 101);
        for (var b, c = 0; c < pointsPlay.length; c++) TweenLite.to(points[c], 1, { x: pointsPlay[0].x, y: pointsPlay[0].y, ease: Power2.easeInOut, delay: .01 * c }), c == pointsPlay.length - 1 ? TweenLite.to(points[c], .3, { x: pointsPlay[0].x, y: pointsPlay[0].y, ease: Power2.easeInOut, delay: .01 * c, onComplete: a }) : TweenLite.to(points[c], .3, { x: pointsPlay[0].x, y: pointsPlay[0].y, ease: Power2.easeInOut, delay: .01 * c });
        setTimeout(function() { cancelAnimationFrame(b) }, 5e3)
    },
    redrawPlay: function() {
        TweenLite.to(this.ctx, 1, { shadowBlur: 70 });
        for (var a = 0; a < points.length; a++) TweenLite.to(points[a], 1, { x: pointsPlay[a].x, y: pointsPlay[a].y, ease: Power2.easeInOut, delay: .01 * a })
    },
    events: function() { this.canvas.addEventListener("mousemove", this.mousemove), this.canvas.addEventListener("mousedown", this.mousedown), this.canvas.addEventListener("mouseup", this.mouseup), this.canvas.addEventListener("touchmove", this.touchmove), this.canvas.addEventListener("touchstart", this.touchstart), this.canvas.addEventListener("touchend", this.touchend), app.elements.$window.on("resize.loco.play", this.resize), app.elements.$document.on("click.loco.play", ".js-link.is-current-page", this.reload.bind(this)) },
    destroy: function() {
        var a = document.getElementsByTagName("body")[0];
        a.removeEventListener("mousemove", this.mouseBlur), TweenMax.killAll(!1, !0, !1), cancelAnimationFrame(this.handleRequest), app.elements.$document.off(".loco.play", this.reload), app.elements.$window.off(".loco.play"), this.isBooted = !1
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.scrollto = {
    ANCHOR_SELECTOR: ".js-scrollto",
    elements: { $anchors: [] },
    init: function() { this.elements.$anchors = $(this.ANCHOR_SELECTOR), this.elements.$anchors.on("click.loco.scrollable", this.onScroll.bind(this)) },
    onScroll: function(a) {
        a.preventDefault();
        var b = $(a.currentTarget).attr("href"),
            c = $(b).offset().top;
        this.scroll(c)
    },
    scroll: function(a, b) { b = b || 1e3, app.elements.$scrolled.animate({ scrollTop: a }, b) }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.select = {
    init: function() {
        $(".js-select").selectric({
            optionsItemBuilder: function(a, b, c) {
                return '<div class="selectric-item u-background-accent"></div><span class="selectric-text u-foreground-accent">' + a.text + "</span>"
            }
        })
    }
};
var app = window.app || {};
app.widgets = app.widgets || {}, app.widgets.share = { isBooted: !1, init: function() { this.isBooted || (this.isBooted = !0, app.elements.$document.on("click.loco.share", ".js-share-button", function(a) { $(this).parents(".js-share").toggleClass("is-open") })) } },
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.widgets = e.widgets || {}, e.widgets.work = {
            EVENT_NAMESPACE: e.EVENT_NAMESPACE + ".work",
            CONTAINER_SELECTOR: '[data-widget="work"]',
            FILTER_SELECTOR: "[data-work-filter]",
            ITEM_SELECTOR: "[data-work-item]",
            DEFAULTS: { smoothState: null },
            elements: { $container: [], $filters: [], $items: [] },
            init: function() { this.hasDependencies() && (this.initOptions(), this.addEventHandlers()) },
            hasDependencies: function() {
                return this.elements.$container = a(this.CONTAINER_SELECTOR).first(), this.elements.$filters = a(this.FILTER_SELECTOR), this.elements.$container.length && this.elements.$filters.length
            },
            addEventHandlers: function() {
                return this.elements.$container.smoothState(this.DEFAULTS.smoothState).data("smoothState"), this
            },
            removeEventHandlers: function() {
                return this.elements.$container.off("click." + this.EVENT_NAMESPACE), this
            },
            initOptions: function() {
                if (!this.DEFAULTS.smoothState) {
                    var a = e.elements.$body,
                        c = e.pageTransitions.initOptions();
                    this.DEFAULTS.smoothState = { a: "[data-work-filter]", forms: !1, scroll: !1, alterRequest: c.alterRequest, alterChangeState: c.alterChangeState, onStart: { duration: e.pageTransitions.vars.duration, render: function(b) { a.removeClass("is-loaded").addClass("is-loading"), b.addClass("u-fadeOut") } }, onReady: { duration: 0, render: function(b, c) { b.html(c).removeClass("u-fadeOut"), a.addClass("is-loaded") } }, onAfter: function(a, c) { b.ga && b.location.pathname && b.ga("send", "pageview", b.location.pathname), e.scrollAnimations && (e.scrollAnimations.manager.scrolled = !0, e.scrollAnimations.manager.scrollCallback()) } }
                }
                return this.DEFAULTS.smoothState
            }
        }
    }(jQuery, window, document),
    function(a, b, c, d) {
        "use strict";
        var e = b.app || {};
        e.templates = e.templates || {}, e.templates.event = {
            WALL_CONTAINER_SELECTOR: "#event-container",
            WALL_GRID_SELECTOR: "#event-wall",
            WALL_EOT_SELECTOR: "#event-eot",
            DEFAULTS: {},
            firstBlood: !1,
            elements: { $container: [], $wall: [], $eot: [] },
            init: function() {
                if (this.hasDependencies() && (this.addEventHandlers(), this.elements.$container.hasClass("js-first-blood"))) {
                    this.firstBlood = !0;
                    var b = a.Event("init.loco.event.feed", { formMethod: "POST", target: this.elements.$container, currentTarget: this.elements.$container, delegateTarget: this.elements.$container });
                    e.parcel.submitForm(b), e.parcel.xhr.always(a.proxy(this.injectFeed, this))
                }
            },
            hasDependencies: function() {
                return this.elements.$container = a(this.WALL_CONTAINER_SELECTOR), this.elements.$container.length
            },
            addEventHandlers: function() {
                var b = this;
                return this.elements.$container.on("click.loco.feed", '[data-toggle~="feed"]', function(c) { c.preventDefault(), c.formMethod = "POST", e.parcel.submitForm(c), e.parcel.xhr.always(a.proxy(b.injectFeed, b)) }), this
            },
            removeEventHandlers: function() {
                return this
            },
            injectFeed: function() {
                var a, b, c;
                return a = e.globals.parseRequestArgs.apply(this, arguments), b = a.response, c = a.failed, this.firstBlood ? (this.firstBlood = !1, b.body && (this.elements.$container.html(b.body), this.elements.$wall = this.elements.$container.children(this.WALL_GRID_SELECTOR), this.elements.$eot = this.elements.$container.children(this.WALL_EOT_SELECTOR))) : (b.body && this.elements.$wall.append(b.body), b.parcel ? this.elements.$eot.children("[data-form-parcel]").data("form-parcel", b.parcel) : this.elements.$eot.remove()), b.bodyEOT && this.elements.$container.append(b.bodyEOT), this
            }
        }
    }(jQuery, window, document);
var app = window.app || {};
app.templates = app.templates || {}, app.templates.project = { init: function() { $(".js-wow-halfHeight").each(function() { $(this).attr("data-wow-offset", $(window).height() / 2) }) } };
var app = window.app || {};
app.init = function() {
    "use strict";
    var a = this;
    a.EVENT_NAMESPACE = "loco", a.params = {}, a.templates = a.templates || {}, a.widgets = a.widgets || {}, "object" == typeof a.globals && a.globals.init(), a.params.current_modules = [];
    for (var b = document.querySelectorAll("[data-app]"), c = 0; c < b.length; c++) {
        var d = b[c].getAttribute("data-app");
        "object" == typeof a[d] && -1 === a.params.current_modules.indexOf(d) && (a[d].init(), a.params.current_modules.push(d))
    }
    a.params.current_template = document.body.getAttribute("data-template"), "object" == typeof a.templates[a.params.current_template] && a.templates[a.params.current_template].init(), a.params.current_widgets = [];
    for (var e = document.querySelectorAll("[data-widget]"), f = 0; f < e.length; f++) {
        var g = e[f].getAttribute("data-widget");
        "object" == typeof a.widgets[g] && -1 === a.params.current_widgets.indexOf(g) && (a.widgets[g].init(), a.params.current_widgets.push(g))
    }
}, $(function() {
    function a() { app.elements.$body.removeClass("is-loading is-initial-load").addClass("is-loaded"), app.init() }
    var b = !1,
        c = 3e3;
    app.elements = { $window: $(window), $document: $(document), $html: $(document.documentElement), $body: $(document.body), $scrolled: $("html,body"), $main: $("#main") }, $(window).load(function() { b || (b = !0, a()) }), setTimeout(function() { b || (b = !0, a()) }, c)
});
