// BY ZUL ZOLKAFFLY
(function ($) {
	var Carouselex = function($e, options) {
		var self = this;
		var zoomThenSlide = false;
		var backfaceInvisible = true;
		var axis = 'Y';
		var numPanels = 0;
		var size = null;
		var rotateFn = 'rotateY';
		var theta = 360;
		var radius = 0;
		var rotation = 0;
		var shownIndex = 0;
		var ready = false;
		
		self.goNext = function() {
			var i = (shownIndex >= (numPanels-1)) ? 0 : (shownIndex + 1);
			self.goToIndex(i, 'NEXT');
		};
		
		self.goPrev = function() {
			var i = (shownIndex <= 0) ? (numPanels-1) : (shownIndex - 1);
			self.goToIndex(i, 'PREV');
		};
		
		self.goToIndex = function(i, d) {
			if(ready && i == shownIndex) return self;
			
			var $wrapper = $e.find('.carouselex-wrapper').eq(0);
			if(!$wrapper.length) return self;
			
			if(ready && zoomThenSlide) {
				$wrapper.css('transform', 'translateZ(-1100px) ' + rotateFn + '(' + rotation + 'deg)');
				
				setTimeout(function() {
					var p = 0;
					$wrapper.find('.carouselex-item').each(function() {
						var angle = theta * p;
						var percent = ((360 - angle) / 360) * 100;
						$(this).attr('data-oribg', $(this).css('background-color'));
						$(this).css('background-color', 'hsla(0, 0%, ' + percent + '%, 0.8)');
						$(this).css('opacity',1);
						
						p++;
					});
				}, 500);
			}
			
			var diff = Math.abs((shownIndex - i));
			var dirMult = (typeof d !== 'undefined') ? ((d.toUpperCase() == 'NEXT') ? -1 : 1) : ((i > shownIndex) ? -1 : 1);
			
			if(i == 0 && shownIndex == (numPanels - 1)) {
				rotation += theta * ((typeof d !== 'undefined') ? 1 : -1 * dirMult);
			} else if(i == (numPanels - 1) && shownIndex == 0) {
				rotation -= theta * ((typeof d !== 'undefined') ? -1 : dirMult);
			} else {
				rotation += diff * theta * dirMult;
			}
			
			shownIndex = i;
			
			if(ready && zoomThenSlide) {
				setTimeout(function() {
					$wrapper.css('transform', 'translateZ(-1100px) ' + rotateFn + '(' + rotation + 'deg)');
					setTimeout(function() {
						$wrapper.css('transform', 'translateZ(-' + radius + 'px) ' + rotateFn + '(' + rotation + 'deg)');
						
						setTimeout(function() {
							var p = 0;
							$wrapper.find('.carouselex-item').each(function() {
								var angle = theta * p;
								$(this).css('background-color', $(this).attr('data-oribg'));
								$(this).removeAttr('data-oribg');
								if(p !== shownIndex) $(this).css('opacity',0);
								p++;
							});
						}, 500);
					}, 500);
				}, 500);
			} else {
				$wrapper.css('transform', 'translateZ(-' + radius + 'px) ' + rotateFn + '(' + rotation + 'deg)');
			}
			
			return self;
		}
		
		function init() {
			if(!$e.hasClass('.carouselex')) $e.addClass('carouselex');
			
			axis = (options && options.hasOwnProperty('direction') && options.direction.toUpperCase() == 'VERTICAL') ? 'X' : 'Y';
			zoomThenSlide = (options && options.hasOwnProperty('zoomThenSlide') && options.zoomThenSlide) ? true : false;
			backfaceInvisible = (options && options.hasOwnProperty('backfaceInvisible') && !options.backfaceInvisible) ? false : true;
			
			var $wrapper = $e.find('.carouselex-wrapper').eq(0);
			if(!$wrapper.length) return self;
			var $panels = $wrapper.find('.carouselex-item');
			if(!$panels.length) return self;
			numPanels = $panels.length;
			if(!numPanels) return self;
			
			size = (axis == 'X') ? $wrapper.outerHeight() : $wrapper.outerWidth();
			rotateFn = 'rotate'+axis;
      theta = 360 / numPanels;
      radius = Math.round( ( size / 2) / Math.tan( Math.PI / numPanels ) );
			
			var i = 0;
			$panels.each(function() {
        var angle = theta * i;
				
				$(this).css('transform', rotateFn + '(' + angle + 'deg) translateZ(' + radius + 'px)');
				$(this).css('opacity',1);
				
				i++;
			});
			
			if(backfaceInvisible) $wrapper.addClass('backface-invisible');
			
			self.goToIndex(0, 'NEXT');
      setTimeout( function(){
        $e.addClass('ready');
				ready = true;
      }, 0);
			
			return self;
		}
		
		function callback (name, context /*, args */) {
			/*http://stackoverflow.com/a/359910*/
			var args = [].slice.call(arguments).splice(2);
			var namespaces = name.split(".");
			var func = namespaces.pop();
			for(var i = 0; i < namespaces.length; i++) {
				context = context[namespaces[i]];
			}
			var exists = (typeof context[func] === "function");
			return exists ? context[func].apply(context, args) : null;
		}
		
		// RETURN
		return init();
	};
	

	$.carouselex = $.fn.carouselex = function(options) {
		return new Carouselex(this, options);
	};
	
})(jQuery);