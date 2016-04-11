/*
 * jQuery Nivo Slider v2.5.1
 * http://nivo.dev7studios.com
 *
 * Copyright 2011, Gilbert Pellegrom
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * March 2010
 */
(function(c) {
	var t = function(m, p) {
		var d = c.extend({}, c.fn.nivoSlider.defaults, p),
			g = {
				currentSlide: 0,
				currentImage: "",
				totalSlides: 0,
				running: !1,
				paused: !1,
				stop: !1
			},
			f = c(m);
		f.data("nivo:vars", g);
		f.css("position", "relative");
		f.addClass("nivoSlider");
		var k = f.children();
		k.each(function() {
			var b = c(this),
				l = "";
			b.is("img") || (b.is("a") && (b.addClass("nivo-imageLink"), l = b), b =
				b.find("img:first"));
			var e = b.width();
			e == 0 && (e = b.attr("width"));
			var i = b.height();
			i == 0 && (i = b.attr("height"));
			e > f.width() && f.width(e);
			i > f.height() && f.height(i);
			l != "" && l.css("display", "none");
			b.css("display", "none");
			g.totalSlides++
		});
		if (d.startSlide > 0) {
			if (d.startSlide >= g.totalSlides) d.startSlide = g.totalSlides - 1;
			g.currentSlide = d.startSlide
		}
		g.currentImage = c(k[g.currentSlide]).is("img") ? c(k[g.currentSlide]) : c(
			k[g.currentSlide]).find("img:first");
		c(k[g.currentSlide]).is("a") && c(k[g.currentSlide]).css("display", "block");
		f.css("background", 'url("' + g.currentImage.attr("src") + '") no-repeat');
		f.append(c('<div class="nivo-caption"><p></p></div>').css({
			display: "none",
			opacity: d.captionOpacity
		}));
		var u = function(b) {
			var l = c(".nivo-caption", f);
			if (g.currentImage.attr("title") != "") {
				var e = g.currentImage.attr("title");
				e.substr(0, 1) == "#" && (e = c(e).html());
				l.css("display") == "block" ? l.find("p").fadeOut(b.animSpeed, function() {
					c(this).html(e);
					c(this).fadeIn(b.animSpeed)
				}) : l.find("p").html(e);
				l.fadeIn(b.animSpeed)
			} else l.fadeOut(b.animSpeed)
		};
		u(d);
		var j = 0;
		!d.manualAdvance && k.length > 1 && (j = setInterval(function() {
			n(f, k, d, !1)
		}, d.pauseTime));
		d.directionNav && (f.append(
				'<div class="nivo-directionNav"><a class="nivo-prevNav">' + d.prevText +
				'</a><a class="nivo-nextNav">' + d.nextText + "</a></div>"), d.directionNavHide &&
			(c(".nivo-directionNav", f).hide(), f.hover(function() {
				c(".nivo-directionNav", f).show()
			}, function() {
				c(".nivo-directionNav", f).hide()
			})), c("a.nivo-prevNav", f).live("click", function() {
				if (g.running) return !1;
				clearInterval(j);
				j = "";
				g.currentSlide -= 2;
				n(f, k, d, "prev")
			}), c("a.nivo-nextNav", f).live("click", function() {
				if (g.running) return !1;
				clearInterval(j);
				j = "";
				n(f, k, d, "next")
			}));
		if (d.controlNav) {
			var s = c('<div class="nivo-controlNav"></div>');
			f.append(s);
			for (var o = 0; o < k.length; o++)
				if (d.controlNavThumbs) {
					var r = k.eq(o);
					r.is("img") || (r = r.find("img:first"));
					d.controlNavThumbsFromRel ? s.append('<a class="nivo-control" rel="' + o +
						'"><img src="' + r.attr("rel") + '" alt="" /></a>') : s.append(
						'<a class="nivo-control" rel="' + o + '"><img src="' + r.attr("src").replace(
							d.controlNavThumbsSearch, d.controlNavThumbsReplace) +
						'" alt="" /></a>')
				} else s.append('<a class="nivo-control" rel="' + o + '">' + (o + 1) +
					"</a>");
			c(".nivo-controlNav a:eq(" + g.currentSlide + ")", f).addClass("active");
			c(".nivo-controlNav a", f).live("click", function() {
				if (g.running) return !1;
				if (c(this).hasClass("active")) return !1;
				clearInterval(j);
				j = "";
				f.css("background", 'url("' + g.currentImage.attr("src") +
					'") no-repeat');
				g.currentSlide = c(this).attr("rel") - 1;
				n(f, k, d, "control")
			})
		}
		d.keyboardNav && c(window).keypress(function(b) {
			if (b.keyCode == "37") {
				if (g.running) return !1;
				clearInterval(j);
				j = "";
				g.currentSlide -= 2;
				n(f, k, d, "prev")
			}
			if (b.keyCode == "39") {
				if (g.running) return !1;
				clearInterval(j);
				j = "";
				n(f, k, d, "next")
			}
		});
		d.pauseOnHover && f.hover(function() {
			g.paused = !0;
			clearInterval(j);
			j = ""
		}, function() {
			g.paused = !1;
			j == "" && !d.manualAdvance && (j = setInterval(function() {
				n(f, k, d, !1)
			}, d.pauseTime))
		});
		f.bind("nivo:animFinished", function() {
			g.running = !1;
			c(k).each(function() {
				c(this).is("a") && c(this).css("display", "none")
			});
			c(k[g.currentSlide]).is("a") && c(k[g.currentSlide]).css("display",
				"block");
			j == "" && !g.paused && !d.manualAdvance && (j = setInterval(function() {
				n(f, k, d, !1)
			}, d.pauseTime));
			d.afterChange.call(this)
		});
		var q = function(b, l, e) {
				for (var i = 0; i < l.slices; i++) {
					var a = Math.round(b.width() / l.slices);
					i == l.slices - 1 ? b.append(c('<div class="nivo-slice"></div>').css({
						left: a * i + "px",
						width: b.width() - a * i + "px",
						height: "0px",
						opacity: "0",
						background: 'url("' + e.currentImage.attr("src") + '") no-repeat -' +
							(a + i * a - a) + "px 0%"
					})) : b.append(c('<div class="nivo-slice"></div>').css({
						left: a * i + "px",
						width: a + "px",
						height: "0px",
						opacity: "0",
						background: 'url("' + e.currentImage.attr("src") + '") no-repeat -' +
							(a + i * a - a) + "px 0%"
					}))
				}
			},
			v = function(b, l, e) {
				for (var i = Math.round(b.width() / l.boxCols),
					a = Math.round(b.height() / l.boxRows), h = 0; h < l.boxRows; h++)
					for (var d = 0; d < l.boxCols; d++) d == l.boxCols - 1 ? b.append(c(
						'<div class="nivo-box"></div>').css({
						opacity: 0,
						left: i * d + "px",
						top: a * h + "px",
						width: b.width() - i * d + "px",
						height: a + "px",
						background: 'url("' + e.currentImage.attr("src") + '") no-repeat -' +
							(i + d * i - i) + "px -" + (a + h * a - a) + "px"
					})) : b.append(c('<div class="nivo-box"></div>').css({
						opacity: 0,
						left: i * d + "px",
						top: a * h + "px",
						width: i + "px",
						height: a + "px",
						background: 'url("' + e.currentImage.attr("src") + '") no-repeat -' +
							(i + d * i - i) + "px -" + (a + h * a - a) + "px"
					}))
			},
			n = function(b, d, e, i) {
				var a = b.data("nivo:vars");
				a && a.currentSlide == a.totalSlides - 1 && e.lastSlide.call(this);
				if ((!a || a.stop) && !i) return !1;
				e.beforeChange.call(this);
				i ? (i == "prev" && b.css("background", 'url("' + a.currentImage.attr(
					"src") + '") no-repeat'), i == "next" && b.css("background", 'url("' +
					a.currentImage.attr("src") + '") no-repeat')) : b.css("background",
					'url("' + a.currentImage.attr("src") + '") no-repeat');
				a.currentSlide++;
				if (a.currentSlide == a.totalSlides) a.currentSlide = 0, e.slideshowEnd.call(
					this);
				if (a.currentSlide < 0) a.currentSlide = a.totalSlides - 1;
				a.currentImage = c(d[a.currentSlide]).is("img") ? c(d[a.currentSlide]) :
					c(d[a.currentSlide]).find("img:first");
				e.controlNav && (c(".nivo-controlNav a", b).removeClass("active"), c(
					".nivo-controlNav a:eq(" + a.currentSlide + ")", b).addClass("active"));
				u(e);
				c(".nivo-slice", b).remove();
				c(".nivo-box", b).remove();
				var h = e.effect;
				if (i)
					if (i == "next" && e.effectNext != null) h = e.effectNext;
					else if (i == "prev" && e.effectPrevious != null) h = e.effectPrevious;
				else if (i == "control" && e.effectControl != null) h = e.effectControl;
				h == "random" && (d = ["sliceDownRight", "sliceDownLeft", "sliceUpRight",
					"sliceUpLeft", "sliceUpDown", "sliceUpDownLeft", "fold", "fade",
					"boxRandom", "boxRain", "boxRainReverse", "boxRainGrow",
					"boxRainGrowReverse"
				], h = d[Math.floor(Math.random() * (d.length + 1))], h == void 0 && (h =
					"fade"));
				h.indexOf(",") != -1 && (d = h.split(","), h = d[Math.floor(Math.random() *
					d.length)], h == void 0 && (h = "fade"));
				a.running = !0;
				if (h == "sliceDown" || h == "sliceDownRight" || h == "sliceDownLeft") {
					q(b, e, a);
					var f = 0,
						g = 0;
					a = c(".nivo-slice", b);
					h == "sliceDownLeft" && (a = c(".nivo-slice", b)._reverse());
					a.each(function() {
						var a = c(this);
						a.css({
							top: "0px"
						});
						g == e.slices - 1 ? setTimeout(function() {
							a.animate({
								height: "100%",
								opacity: "1.0"
							}, e.animSpeed, "", function() {
								b.trigger("nivo:animFinished")
							})
						}, 100 + f) : setTimeout(function() {
							a.animate({
								height: "100%",
								opacity: "1.0"
							}, e.animSpeed)
						}, 100 + f);
						f += 50;
						g++
					})
				} else if (h == "sliceUp" || h == "sliceUpRight" || h == "sliceUpLeft") q(
					b, e, a), g = f = 0, a = c(".nivo-slice", b), h == "sliceUpLeft" && (a =
					c(".nivo-slice", b)._reverse()), a.each(function() {
					var a = c(this);
					a.css({
						bottom: "0px"
					});
					g == e.slices - 1 ? setTimeout(function() {
						a.animate({
							height: "100%",
							opacity: "1.0"
						}, e.animSpeed, "", function() {
							b.trigger("nivo:animFinished")
						})
					}, 100 + f) : setTimeout(function() {
						a.animate({
							height: "100%",
							opacity: "1.0"
						}, e.animSpeed)
					}, 100 + f);
					f += 50;
					g++
				});
				else if (h == "sliceUpDown" || h == "sliceUpDownRight" || h ==
					"sliceUpDownLeft") {
					q(b, e, a);
					var k = g = f = 0;
					a = c(".nivo-slice", b);
					h == "sliceUpDownLeft" && (a = c(".nivo-slice", b)._reverse());
					a.each(function() {
						var a = c(this);
						g == 0 ? (a.css("top", "0px"), g++) : (a.css("bottom", "0px"), g = 0);
						k == e.slices - 1 ? setTimeout(function() {
							a.animate({
								height: "100%",
								opacity: "1.0"
							}, e.animSpeed, "", function() {
								b.trigger("nivo:animFinished")
							})
						}, 100 + f) : setTimeout(function() {
							a.animate({
								height: "100%",
								opacity: "1.0"
							}, e.animSpeed)
						}, 100 + f);
						f += 50;
						k++
					})
				} else if (h == "fold") q(b, e, a), g = f = 0, c(".nivo-slice", b).each(
					function() {
						var a = c(this),
							d = a.width();
						a.css({
							top: "0px",
							height: "100%",
							width: "0px"
						});
						g == e.slices - 1 ? setTimeout(function() {
							a.animate({
								width: d,
								opacity: "1.0"
							}, e.animSpeed, "", function() {
								b.trigger("nivo:animFinished")
							})
						}, 100 + f) : setTimeout(function() {
							a.animate({
								width: d,
								opacity: "1.0"
							}, e.animSpeed)
						}, 100 + f);
						f += 50;
						g++
					});
				else if (h == "fade") {
					q(b, e, a);
					var j = c(".nivo-slice:first", b);
					j.css({
						height: "100%",
						width: b.width() + "px"
					});
					j.animate({
						opacity: "1.0"
					}, e.animSpeed * 2, "", function() {
						b.trigger("nivo:animFinished")
					})
				} else if (h == "slideInRight") q(b, e, a), j = c(".nivo-slice:first", b),
					j.css({
						height: "100%",
						width: "0px",
						opacity: "1",
						"background-position": "top right"
					}), j.animate({
						width: b.width() + "px"
					}, e.animSpeed * 2, "", function() {
						b.trigger("nivo:animFinished")
					});
				else if (h == "slideInLeft") q(b, e, a), j = c(".nivo-slice:first", b), j
					.css({
						height: "100%",
						width: "0px",
						opacity: "1",
						left: "",
						right: "0px"
					}), j.animate({
						width: b.width() + "px"
					}, e.animSpeed * 2, "", function() {
						j.css({
							left: "0px",
							right: ""
						});
						b.trigger("nivo:animFinished")
					});
				else if (h == "boxRandom") {
					v(b, e, a);
					var n = e.boxCols * e.boxRows;
					f = g = 0;
					a = t(c(".nivo-box", b));
					a.each(function() {
						var a = c(this);
						g == n - 1 ? setTimeout(function() {
							a.animate({
								opacity: "1"
							}, e.animSpeed, "", function() {
								b.trigger("nivo:animFinished")
							})
						}, 100 + f) : setTimeout(function() {
							a.animate({
								opacity: "1"
							}, e.animSpeed)
						}, 100 + f);
						f += 20;
						g++
					})
				} else if (h == "boxRain" || h == "boxRainReverse" || h == "boxRainGrow" ||
					h == "boxRainGrowReverse") {
					v(b, e, a);
					n = e.boxCols * e.boxRows;
					var m = f = g = 0,
						o = 0,
						p = [];
					p[m] = [];
					a = c(".nivo-box", b);
					if (h == "boxRainReverse" || h == "boxRainGrowReverse") a = c(
						".nivo-box", b)._reverse();
					a.each(function() {
						p[m][o] = c(this);
						o++;
						o == e.boxCols && (m++, o = 0, p[m] = [])
					});
					for (a = 0; a < e.boxCols * 2; a++) {
						d = a;
						for (i = 0; i < e.boxRows; i++) d >= 0 && d < e.boxCols && (function(a,
							d, f, g, i) {
							var j = c(p[a][d]),
								k = j.width(),
								l = j.height();
							(h == "boxRainGrow" || h == "boxRainGrowReverse") && j.width(0).height(
								0);
							g == i - 1 ? setTimeout(function() {
								j.animate({
									opacity: "1",
									width: k,
									height: l
								}, e.animSpeed / 1.3, "", function() {
									b.trigger("nivo:animFinished")
								})
							}, 100 + f) : setTimeout(function() {
								j.animate({
									opacity: "1",
									width: k,
									height: l
								}, e.animSpeed / 1.3)
							}, 100 + f)
						}(i, d, f, g, n), g++), d--;
						f += 100
					}
				}
			},
			t = function(b) {
				for (var c, e, d = b.length; d; c = parseInt(Math.random() * d), e = b[--
					d], b[d] = b[c], b[c] = e);
				return b
			},
			w = function(b) {
				this.console && typeof console.log != "undefined" && console.log(b)
			};
		this.stop = function() {
			if (!c(m).data("nivo:vars").stop) c(m).data("nivo:vars").stop = !0, w(
				"Stop Slider")
		};
		this.start = function() {
			if (c(m).data("nivo:vars").stop) c(m).data("nivo:vars").stop = !1, w(
				"Start Slider")
		};
		d.afterLoad.call(this);
		return this
	};
	c.fn.nivoSlider = function(m) {
		return this.each(function() {
			var p = c(this);
			if (p.data("nivoslider")) return p.data("nivoslider");
			var d = new t(this, m);
			p.data("nivoslider", d)
		})
	};
	c.fn.nivoSlider.defaults = {
		effect: "random",
		effectPrevious: null,
		effectNext: null,
		effectControl: null,
		slices: 15,
		boxCols: 8,
		boxRows: 4,
		animSpeed: 500,
		pauseTime: 3E3,
		startSlide: 0,
		directionNav: !0,
		directionNavHide: !0,
		controlNav: !0,
		controlNavThumbs: !1,
		controlNavThumbsFromRel: !1,
		controlNavThumbsSearch: ".jpg",
		controlNavThumbsReplace: "_thumb.jpg",
		keyboardNav: !0,
		pauseOnHover: !0,
		manualAdvance: !1,
		captionOpacity: 0.8,
		prevText: "Prev",
		nextText: "Next",
		beforeChange: function() {},
		afterChange: function() {},
		slideshowEnd: function() {},
		lastSlide: function() {},
		afterLoad: function() {}
	};
	c.fn._reverse = [].reverse
})(jQuery);
