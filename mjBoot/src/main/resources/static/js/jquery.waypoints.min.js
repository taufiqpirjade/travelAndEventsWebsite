!function(){"use strict";function t(o){if(!o)throw new Error("No options passed to Waypoint constructor");if(!o.element)throw new Error("No element option passed to Waypoint constructor");if(!o.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,o),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=o.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),i[this.key]=this,e+=1}var e=0,i={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete i[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var o in i)e.push(i[o]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+i,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,o[t.waypointContextKey]=this,i+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var i=0,o={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete o[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var i in e){var o=e[i],n=o.newScroll>o.oldScroll,r=n?o.forward:o.backward;for(var s in this.waypoints[i]){var a=this.waypoints[i][s],l=o.oldScroll<a.triggerPoint,h=o.newScroll>=a.triggerPoint,p=l&&h,u=!l&&!h;(p||u)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var i in this.waypoints[e])t.push(this.waypoints[e][i]);for(var o=0,n=t.length;n>o;o++)t[o].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,i=e?void 0:this.adapter.offset(),o={};this.handleScroll(),t={horizontal:{contextOffset:e?0:i.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:i.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,h,p,u,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,h=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,u=h&&p,c=!h&&!p,!g&&u?(d.queueTrigger(s.backward),o[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),o[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),o[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in o)o[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in o)o[t].refresh()},e.findByElement=function(t){return o[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var i=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;i.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function i(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),o[this.axis][this.name]=this}var o={vertical:{},horizontal:{}},n=window.Waypoint;i.prototype.add=function(t){this.waypoints.push(t)},i.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},i.prototype.flushTriggers=function(){for(var i in this.triggerQueues){var o=this.triggerQueues[i],n="up"===i||"left"===i;o.sort(n?e:t);for(var r=0,s=o.length;s>r;r+=1){var a=o[r];(a.options.continuous||r===o.length-1)&&a.trigger([i])}}this.clearTriggerQueues()},i.prototype.next=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints),o=i===this.waypoints.length-1;return o?null:this.waypoints[i+1]},i.prototype.previous=function(e){this.waypoints.sort(t);var i=n.Adapter.inArray(e,this.waypoints);return i?this.waypoints[i-1]:null},i.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},i.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},i.prototype.first=function(){return this.waypoints[0]},i.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},i.findOrCreate=function(t){return o[t.axis][t.name]||new i(t)},n.Group=i}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,i=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,i){t.prototype[i]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[i].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(i,o){t[o]=e[o]}),i.adapters.push({name:"jquery",Adapter:t}),i.Adapter=t}(),function(){"use strict";function t(t){return function(){var i=[],o=arguments[0];return t.isFunction(arguments[0])&&(o=t.extend({},arguments[1]),o.handler=arguments[0]),this.each(function(){var n=t.extend({},o,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),i.push(new e(n))}),i}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}();

(function( $ ){
	  "use strict";

	  $.fn.countUp = function( options ) {

	    // Defaults
	    var settings = $.extend({
	        'time': 2000,
	        'delay': 10
	    }, options);

	    return this.each(function(){

	        // Store the object
	        var $this = $(this);
	        var $settings = settings;

	        var counterUpper = function() {
	            if(!$this.data('counterupTo')) {
	                $this.data('counterupTo',$this.text());
	            }
	            var time = parseInt($this.data("counter-time")) > 0 ? parseInt($this.data("counter-time")) : $settings.time;
	            var delay = parseInt($this.data("counter-delay")) > 0 ? parseInt($this.data("counter-delay")) : $settings.delay;
	            var divisions = time / delay;
	            var num = $this.data('counterupTo');
	            var nums = [num];
	            var isComma = /[0-9]+,[0-9]+/.test(num);
	            num = num.replace(/,/g, '');
	            var isInt = /^[0-9]+$/.test(num);
	            var isFloat = /^[0-9]+\.[0-9]+$/.test(num);
	            var decimalPlaces = isFloat ? (num.split('.')[1] || []).length : 0;

	            // Generate list of incremental numbers to display
	            for (var i = divisions; i >= 1; i--) {

	                // Preserve as int if input was int
	                var newNum = parseInt(Math.round(num / divisions * i));

	                // Preserve float if input was float
	                if (isFloat) {
	                    newNum = parseFloat(num / divisions * i).toFixed(decimalPlaces);
	                }

	                // Preserve commas if input had commas
	                if (isComma) {
	                    while (/(\d+)(\d{3})/.test(newNum.toString())) {
	                        newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
	                    }
	                }

	                nums.unshift(newNum);
	            }

	            $this.data('counterup-nums', nums);
	            $this.text('0');

	            // Updates the number until we're done
	            var f = function() {
	                $this.text($this.data('counterup-nums').shift());
	                if ($this.data('counterup-nums').length) {
	                    setTimeout($this.data('counterup-func'),delay);
	                } else {
	                    delete $this.data('counterup-nums');
	                    $this.data('counterup-nums', null);
	                    $this.data('counterup-func', null);
	                }
	            };
	            $this.data('counterup-func', f);

	            // Start the count up
	            setTimeout($this.data('counterup-func'),delay);
	        };

	        // Perform counts when the element gets into view
	        $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
	    });

	  };

	})( jQuery );


(function ($) {
	$.fn.JiSlider = function (options) {
		// prohibit stacking
		var JiSlider = this;
		var then = new Date().getTime();
		// var UP = 'up', DOWN = 'down';

		// animation
		var Animate = function (slides, start, auto, time, stay, easing, reverse) {
			this.slider = JiSlider;
			this.slides = slides;
			this.width = this.slider.width();
			this.ul = this.slider.find('ul');
			this.index = start;
			this.auto = auto;
			this.time = time;
			this.stay = stay;
			this.easing = easing;
			this.reverse = reverse ? -1 : 1;
			this.play = setInterval(this.autoroll.bind(this), this.stay);
		}

		Animate.prototype = {
			init: function (options) {
				$.extend(this, options);
			},
			roll: function (time) {
				var left = -(this.index * this.width);

				ul.css({
					'-webkit-transform': 'translateX(' + left + 'px)',
					'-webkit-transition': '-webkit-transform ' + time / 1000 + 's ' + this.easing,
					'-ms-transform': 'translateX(' + left + 'px)',
					'-ms-transition': '-ms-transform ' + time / 1000 + 's ' + this.easing,
					'transform': 'translateX(' + left + 'px)',
					'transition': 'transform ' + time / 1000 + 's ' + this.easing,
				});

				this.check();

				if (this.controller) {
					this.controller.find('.jislider__button[data-index=' + this.index + ']').addClass('jislider__on').css('background-color', setting.color);
					this.controller.find('.jislider__button[data-index!=' + this.index + ']').removeClass('jislider__on').css('background-color', 'transparent');
				}
			},
			autoroll: function () {
				if (this.auto)
					this.index += this.reverse;
				this.roll(this.time);
			},
			check: function () {
				var t = this;
				if (this.index > this.slides) {
					this.index = 1;
					setTimeout(function () {
						t.roll(0);
					}, this.time);
				} else if (this.index < 1) {
					this.index = slides;
					setTimeout(function () {
						t.roll(0);
					}, this.time);
				}
			},
			control: function (index) {
				if (this.timeCheck()) {
					this.index = index;
					this.reset();
					this.roll(this.time);
				}
			},
			timeCheck: function () {
				var now = new Date().getTime();
				if (now - then > this.time) {
					then = now;
					return true;
				} else {
					return false;
				}
			},
			reset: function () {
				clearInterval(this.play);
				this.play = setInterval(this.autoroll.bind(this), this.stay);
			},
			resize: function (width) {
				this.width = width;
				this.reset();
				this.roll(0);
			}
		}

		// jquery element variable
		var ul = this.find('ul');
		var li = this.find('ul li');

		// setting
		var setting = $.extend({
			auto: true,
			start: 1,
			time: 600,
			stay: 3000,
			controller: true,
			easing: 'ease',
			color: '#fff',
			reverse: false,
		}, options);
		var jw = this.width();
		var slides = this.find('ul li').length;

		if (setting.start > slides) {
			throw "Start value is bigger than number of slides";
		}

		// slider setup
		var first = li.first().clone();
		var last = li.last().clone();
		ul.prepend(last);
		ul.append(first);

		this.css({
			position: 'relative',
			overflow: 'hidden'
		});

		ul.css({
			width: (100 * (slides + 2)) + '%',
			'-webkit-transform': 'translateX(' + -(setting.start * jw) + 'px)',
			'-ms-transform': 'translateX(' + -(setting.start * jw) + 'px)',
			'transform': 'translateX(' + -(setting.start * jw) + 'px)',
		});

		// selecting li tags with two clones
		li = this.find('ul li');
		var img = this.find('ul li img');

		li.css({
			width: (100 / (slides + 2)) + '%',
		});

		img.each(function () {
			var div = $('<div>', {'class': 'jislider__img'}).css({
				backgroundImage: 'url(' + $(this).attr('src') + ')',
			});
			$(this).after(div);
			$(this).remove();
		});

		// animation
		var animate = new Animate(slides, setting.start, setting.auto, setting.time, setting.stay, setting.easing, setting.reverse);

		// controller
		if (setting.controller) {
			var leftArrow = $('<div>', {'class': 'jislider__left-arrow'}).click(function () {
				animate.control(--animate.index);
			});
			var leftArrowTop = $('<div>', {'class': 'jislider__left-arrow__top'}).css({
				backgroundColor: setting.color,
			});
			var leftArrowBottom = $('<div>', {'class': 'jislider__left-arrow__bottom'}).css({
				backgroundColor: setting.color,
			});

			var rightArrow = $('<div>', {'class': 'jislider__right-arrow'}).click(function () {
				animate.control(++animate.index);
			});
			var rightArrowTop = $('<div>', {'class': 'jislider__right-arrow__top'}).css({
				backgroundColor: setting.color,
			});
			var rightArrowBottom = $('<div>', {'class': 'jislider__right-arrow__bottom'}).css({
				backgroundColor: setting.color,
			});

			var controller = $('<div>', {'class': 'jislider__controller'}).css({
				width: 20 * slides,
			});
			
			var buttons = new Array();
			for (var i = 0; i < slides; i++) {
				buttons[i] = $('<div>', {'class': 'jislider__button', 'data-index': (i + 1)}).css({
					border: '1px solid ' + setting.color,
				}).click(function () {
					var index = $(this).data('index')
					animate.control(index)
				});
			}
			this.append(leftArrow, rightArrow, controller);
			leftArrow.append(leftArrowTop, leftArrowBottom);
			rightArrow.append(rightArrowTop, rightArrowBottom);
			controller.append(buttons);
			animate.init({controller: controller});
		}

		animate.roll(0);

		$(window).resize(function () {
			jw = JiSlider.width();
			animate.resize(jw);
		});

		return this;
	}
}(jQuery));

(function ($) {

    $.fn.flexisel = function (options) {

        var defaults = $.extend({
    		visibleItems: 4,
    		animationSpeed: 200,
    		autoPlay: false,
    		autoPlaySpeed: 3000,    		
    		pauseOnHover: true,
			setMaxWidthAndHeight: false,
    		enableResponsiveBreakpoints: false,
    		responsiveBreakpoints: { 
	    		portrait: { 
	    			changePoint:480,
	    			visibleItems: 1
	    		}, 
	    		landscape: { 
	    			changePoint:640,
	    			visibleItems: 2
	    		},
	    		tablet: { 
	    			changePoint:768,
	    			visibleItems: 3
	    		}
        	}
        }, options);
        
		/******************************
		Private Variables
		*******************************/         
        
        var object = $(this);
		var settings = $.extend(defaults, options);        
		var itemsWidth; // Declare the global width of each item in carousel
		var canNavigate = true; 
        var itemsVisible = settings.visibleItems; 
        
		/******************************
		Public Methods
		*******************************/        
        
        var methods = {
        		
			init: function() {
				
        		return this.each(function () {
        			methods.appendHTML();
        			methods.setEventHandlers();      			
        			methods.initializeItems();
				});
			},

			/******************************
			Initialize Items
			*******************************/			
			
			initializeItems: function() {
				
				var listParent = object.parent();
				var innerHeight = listParent.height(); 
				var childSet = object.children();
				
    			var innerWidth = listParent.width(); // Set widths
    			itemsWidth = (innerWidth)/itemsVisible;
    			childSet.width(itemsWidth);
    			childSet.last().insertBefore(childSet.first());
    			childSet.last().insertBefore(childSet.first());
    			object.css({'left' : -itemsWidth}); 

    			object.fadeIn();
				$(window).trigger("resize"); // needed to position arrows correctly

			},
			
			
			/******************************
			Append HTML
			*******************************/			
			
			appendHTML: function() {
				
   			 	object.addClass("nbs-flexisel-ul");
   			 	object.wrap("<div class='nbs-flexisel-container'><div class='nbs-flexisel-inner'></div></div>");
   			 	object.find("li").addClass("nbs-flexisel-item");
 
   			 	if(settings.setMaxWidthAndHeight) {
	   			 	var baseWidth = $(".nbs-flexisel-item > img").width();
	   			 	var baseHeight = $(".nbs-flexisel-item > img").height();
	   			 	$(".nbs-flexisel-item > img").css("max-width", baseWidth);
	   			 	$(".nbs-flexisel-item > img").css("max-height", baseHeight);
   			 	}
 
   			 	$("<div class='nbs-flexisel-nav-left'></div><div class='nbs-flexisel-nav-right'></div>").insertAfter(object);
   			 	var cloneContent = object.children().clone();
   			 	object.append(cloneContent);
			},
					
			
			/******************************
			Set Event Handlers
			*******************************/
			setEventHandlers: function() {
				
				var listParent = object.parent();
				var childSet = object.children();
				var leftArrow = listParent.find($(".nbs-flexisel-nav-left"));
				var rightArrow = listParent.find($(".nbs-flexisel-nav-right"));
				
				$(window).on("resize", function(event){
					
					methods.setResponsiveEvents();
					
					var innerWidth = $(listParent).width();
					var innerHeight = $(listParent).height(); 
					
					itemsWidth = (innerWidth)/itemsVisible;
					
					childSet.width(itemsWidth);
					object.css({'left' : -itemsWidth});
					
					var halfArrowHeight = (leftArrow.height())/2;
					var arrowMargin = (innerHeight/2) - halfArrowHeight;
					leftArrow.css("top", arrowMargin + "px");
					rightArrow.css("top", arrowMargin + "px");
					
				});					
				
				$(leftArrow).on("click", function (event) {
					methods.scrollLeft();
				});
				
				$(rightArrow).on("click", function (event) {
					methods.scrollRight();
				});
				
				if(settings.pauseOnHover == true) {
					$(".nbs-flexisel-item").on({
						mouseenter: function () {
							canNavigate = false;
						}, 
						mouseleave: function () {
							canNavigate = true;
						}
					 });
				}

				if(settings.autoPlay == true) {
					
					setInterval(function () {
						if(canNavigate == true)
							methods.scrollRight();
					}, settings.autoPlaySpeed);
				}
				
			},
			
			/******************************
			Set Responsive Events
			*******************************/			
			
			setResponsiveEvents: function() {
				var contentWidth = $('html').width();
				
				if(settings.enableResponsiveBreakpoints == true) {
					if(contentWidth < settings.responsiveBreakpoints.portrait.changePoint) {
						itemsVisible = settings.responsiveBreakpoints.portrait.visibleItems;
					}
					else if(contentWidth > settings.responsiveBreakpoints.portrait.changePoint && contentWidth < settings.responsiveBreakpoints.landscape.changePoint) {
						itemsVisible = settings.responsiveBreakpoints.landscape.visibleItems;
					}
					else if(contentWidth > settings.responsiveBreakpoints.landscape.changePoint && contentWidth < settings.responsiveBreakpoints.tablet.changePoint) {
						itemsVisible = settings.responsiveBreakpoints.tablet.visibleItems;
					}
					else {
						itemsVisible = settings.visibleItems;
					}
				}
			},			
			
			/******************************
			Scroll Left
			*******************************/				
			
			scrollLeft:function() {

				if(canNavigate == true) {
					canNavigate = false;
					
					var listParent = object.parent();
					var innerWidth = listParent.width();
					
					itemsWidth = (innerWidth)/itemsVisible;
					
					var childSet = object.children();
					
					object.animate({
							'left' : "+=" + itemsWidth
						},
						{
							queue:false, 
							duration:settings.animationSpeed,
							easing: "linear",
							complete: function() {  
								childSet.last().insertBefore(childSet.first()); // Get the first list item and put it after the last list item (that's how the infinite effects is made)   								
								methods.adjustScroll();
								canNavigate = true; 
							}
						}
					);
				}
			},
			
			/******************************
			Scroll Right
			*******************************/				
			
			scrollRight:function() {
				
				if(canNavigate == true) {
					canNavigate = false;
					
					var listParent = object.parent();
					var innerWidth = listParent.width();
					
					itemsWidth = (innerWidth)/itemsVisible;
					
					var childSet = object.children();
					
					object.animate({
							'left' : "-=" + itemsWidth
						},
						{
							queue:false, 
							duration:settings.animationSpeed,
							easing: "linear",
							complete: function() {  
								childSet.first().insertAfter(childSet.last()); // Get the first list item and put it after the last list item (that's how the infinite effects is made)   
								methods.adjustScroll();
								canNavigate = true; 
							}
						}
					);
				}
			},
			
			/******************************
			Adjust Scroll 
			*******************************/
			
			adjustScroll: function() {
				
				var listParent = object.parent();
				var childSet = object.children();				
				
				var innerWidth = listParent.width(); 
				itemsWidth = (innerWidth)/itemsVisible;
				childSet.width(itemsWidth);
				object.css({'left' : -itemsWidth});		
			}			
        
        };
        
        if (methods[options]) { 	// $("#element").pluginName('methodName', 'arg1', 'arg2');
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) { 	// $("#element").pluginName({ option: 1, option:2 });
            return methods.init.apply(this);  
        } else {
            $.error( 'Method "' +  method + '" does not exist in flexisel plugin!');
        }        
};

})(jQuery);
