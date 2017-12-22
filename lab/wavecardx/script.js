
// MAIN CLASS FUNCTION FOR WAVE CARD X
// ACCEPT 4 ARGUMENTS:
// 1) THE ELEMENT TO APPEND THE WAVE INTO
// 2) THE COLOR OF THE 1ST WAVE
// 3) THE COLOR OF THE 2ND WAVE
// 4) THE COLOR OF THE 3RD WAVE
var WaveCardX = function($e, c1, c2, c3) {
	var self = this;
	var colors = ['#00AAFF','#00AAFF','#00AAFF'];
			colors[0] = (typeof c1 !== 'undefined') ? c1 : '#00AAFF';
			colors[1] = (typeof c2 !== 'undefined') ? c2 : '#00AAFF';
			colors[2] = (typeof c3 !== 'undefined') ? c3 : '#00AAFF';
	
	function init() {
		var elementWidth = $e.outerWidth();
		var elementHeight = $e.outerHeight();
		
		var size = 0;
		if(elementWidth < elementHeight) size = elementHeight * 2;
		if(elementWidth >= elementHeight) size = elementWidth * 2;
		
		var $wave = $('<div />', { 'class' : 'card-wave-x' });
		for(var i = 0; i < 3; i++) {
			var color = (typeof colors[i] !== 'undefined') ? colors[i] : '#00AAFF';
			var $span = $('<span />');
					$span.css({
						'width' : size + 'px',
						'height' : size + 'px',
						'margin-left' : (-1 * (size / 2)) + 'px',
						'background-color' : color
					});
					$span.appendTo($wave);
		}
		$wave.appendTo($e);
		
		$e.off('mouseenter').on('mouseenter',function() {
			$e.find('.card-wave-x').css('opacity',1);
		}).off('mouseleave').on('mouseleave',function() {
			$e.find('.card-wave-x').css('opacity',0);
		});
		
		return self;
	}
	
	return init();
};

// EXTEND JQUERY FUNCTION TO EQUALIZE COLUMN HEIGHT ON EACH ROW
$.fn.equalizeColHeight = function() {
	return this.each(function() {
		var $cols = $(this).find('[class*="col"]');
		if($cols.length) {
			var height = 0;
			$cols.each(function() {
				if($(this).height() > height) height = $(this).height();
			});
			
			$cols.each(function() {
				if($(this).height() < height) $(this).height(height);
			});
		}
	});
};


// DOCUMENT READY
$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');		
  }, 1000);
	
	// EQUALIZE COL HEIGHT
	$('.row').equalizeColHeight();
	
	// ADD WAVE CARD X EFFECT INTO EACH CARD HEADER
	$('.card').each(function() {
		var $header = $(this).find('.card-header').eq(0);
		if($header.length) new WaveCardX(	$header, '#5D7711', '#EE22BB', '#00AAFF'	);
	});
});




















