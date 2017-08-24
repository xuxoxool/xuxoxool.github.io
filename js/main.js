var direction = 'DOWN';
var tick = 0;
var hash = null;
$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');
		$('#totalYears').html(	(new Date().getFullYear() - 2007)	);
		$('#careerYears').html(	(new Date().getFullYear() - 2010)	);
		$("#profile .profile-content").mCustomScrollbar({ theme : 'dark-thin', mouseWheel:{ scrollAmount: 200 }});
		
		initScrollEffect();
		
		hash = window.location.hash;
		if($.trim(hash.replace('#','')) !== "") jumpTo(	hash.replace('#','')	);
  }, 1000);
	
});

function toggleNav() {
	$('#main_logo, #main_nav').toggleClass('in');
}

function initScrollEffect() {		
	
	$('html').on('swipeup',function(e){ console.log('swipeup');
		if(noScrollEffect(	$(e.target)	)) return false;
		
		var maxSwipe = 15;
		tick = (tick >= maxSwipe) ? maxSwipe : (tick+3);
		direction = 'DOWN';
		animate();
	});
	
	$('html').on('swipedown',function(e){
		if(noScrollEffect(	$(e.target)	)) return false;
		
		var maxSwipe = 5;
		tick = (tick <= 0) ? 0 : (tick-3);
		tick = (tick <= 0) ? 0 : tick;
		direction = 'UP';
		animate();
	});
	
	$('html:not(.profile-content):not([class*="overlay"])').on('mousewheel', $.debounce(100,function(e) {
		if(noScrollEffect(	$(e.target)	)) return false;
		
		var sbHeight = Math.round(	(window.innerHeight * (window.innerHeight / document.body.offsetHeight))	);
		var totalHeight = Math.round(	($('#height_detect').position().top + $('#height_detect').outerHeight() - sbHeight)	);
		var dX = e.deltaX, dY = e.deltaY, factor = e.deltaFactor;
		var maxTick = (6 + (3*getMaxWorkRows()));	//Math.round(	(totalHeight / factor)	);
		
		if(dY < 0) tick = (tick >= maxTick) ? maxTick : (tick+1);
		if(dY > 0) tick = (tick <= 0) ? 0 : (tick-1);
		direction = (dY < 0) ? 'DOWN' : 'UP';
		
		animate();
	}));
}

function noScrollEffect($t) {
	if($t.hasClass('profile-content')) return true;
	
	if($t.parents('.profile-content').length) return true;
	
	if($t.is('[class*="overlay"]')) return true;
	
	if($t.parents('.overlay').length) return true;
}

function animate() {
	//console.log(tick, direction);
	
	$('#scroller').css({ top: (3+(6*tick))+'vh' });
	
	if(tick%3==0) {
		$('#scroller').addClass('spin');
	} else {
		$('#scroller').removeClass('spin');
	}
		
	var r = getMaxWorkRows();
	
	if(tick > 3) {
		$('.frame, #scroller').removeClass('black').addClass('white');
		$('#main_logo').addClass('white');
	} else {
		$('.frame, #scroller').removeClass('white').addClass('black');
		$('#main_logo').removeClass('white');
	}
	
	if(tick <= 3) {			
		var $tagline = $('#intro_tagline');				
		var $spanElems = [ $('#intro_tagline span:nth-child(1)'), $('#intro_tagline span:nth-child(2)'), $('#intro_tagline span:nth-child(3)') ];
		var spanProps = [{},{},{}];				
		for(var i = 0; i < $spanElems.length; i++) {
			var j = (i == 0) ? 72 : j*0.5;
			var k = (i == 0) ? 144 : (k-72);
			var b = Math.round(($tagline.outerHeight() - ((Math.round($spanElems[i].position().top*100)/100) + $spanElems[i].outerHeight()))*100)/100;
					b = (direction == 'DOWN') ? (b+j) : ((tick == 0) ? k : (b-j));
					
			$spanElems[i].css('bottom',b+'px');
		}
	}
	
	if(tick <= (3 + (r*3)))	{
		if(tick >= 3) {
			$('.frame, #scroller').removeClass('black').addClass('white');
			$('#main_logo').addClass('white');
		} else {
			$('.frame, #scroller').removeClass('white').addClass('black');
			$('#main_logo').removeClass('white');
		}
		
		var o = (tick >= 3) ? 1 : 0;		
		
		if(tick <= 3) {
			$('.cell').each(function(i,e) {				
				setTimeout(function() {
					$(e).find('.cell-item.start').css({
						opacity: o
					});
				},( ((i-1) + ((direction == 'DOWN') ? 0 : 8)) * 125 ));
			});
		}
	
		var y = Math.floor(tick/3);
		$('.cell').each(function(i,e) {		
			var n = $(e).find('.cell-item.work').length;
			if(n <= ((tick-3)/3)) return;
					
			setTimeout(function() {
				$(e).find('.cell-item:not(.start,.end)').css({
					top : (o*(-1*y*100))+'%',
					opacity: o
				});
			},( ((i-1) + ((direction == 'DOWN') ? 8 : 0)) * 125 ));
		});
		
		var eo = (tick >= (3+(r*3))) ? 1 : 0;
		$('.cell').each(function(i,e) {		
			var n = $(e).find('.cell-item.work').length;
			setTimeout(function() {
				$(e).find('.cell-item.end').css({
					top : (eo*(-1*(n+1)*100))+'%',
					opacity: eo
				});
			},( ((i-1) + ((direction == 'DOWN') ? 8 : 0)) * 125 ));
		});
	}
	
	if(tick >= (3 + (r*3)))	{		
		if(tick == (3+(r*3))) turnProfileTo('front');
		
		if(tick >= (3 + (r*3))) {
			$('.frame, #scroller').removeClass('white').addClass('black');
			$('#main_logo').removeClass('white');
		} else {
			$('.frame, #scroller').removeClass('black').addClass('white');
			$('#main_logo').addClass('white');
		}
		
		if(tick >= (3 + (r*3)) && tick < (6 + (r*3)))	{	
			setTimeout(function() {
				if(tick < (3 + (r*3))) {
					$('#profile').css({
						top: '100%'
					});
				} else {
					$('#profile').css({
						top: '0'
					});
				}
			}, ((direction == 'DOWN') ? (250+(8*250)) :0));
		}
		
		if(tick == (6 + (r*3)))	{
			turnProfileTo('front');
			setTimeout(function() {
				$('#profile').css({
					top: '-100%'
				});
			}, ((direction == 'DOWN') ? (250+(8*250)) :0));
		}
	} else {
		turnProfileTo('front');
		$('#profile').css({
			top: '100%'
		});
	}
	
	if(tick >= (6 + (r*3)))	{
		$('.frame, #scroller').removeClass('black').addClass('white');
		$('#main_logo').addClass('white');
				
		if(tick == (6 + (r*3)))	{			
			setTimeout(function() {
				if(tick < (6 + (r*3))) {
					$('#contact').css({
						top: '100%'
					});
				} else {
					$('#contact').css({
						top: '0%'
					});
				}
			}, ((direction == 'DOWN') ? 500 :0));
		}
	} else {
		//turnProfileTo('front');
		$('#contact').css({
			top: '100%'
		});
	}
}

function getMaxWorkRows() {
	var m = 0;
	$('.cell').each(function() {
		var r = $(this).find('.cell-item.work').length;
		
		if(r > m) m = r;
	});
	return m;
}

function turnProfileTo(face) {
	$('#profile_wrapper').removeClass('front back left right top bottom');
	$('#profile_wrapper').addClass(face);
	$('.profile-content, [class*="profile-nav-"]').css('opacity',0);
	$('#profile_'+face+' .profile-content, #profile_'+face+' [class*="profile-nav-"]').css('opacity',1);
}

function isMobile() { return $('#mobile_detect').is(':hidden'); }

function jumpTo(id) {
	if(typeof id === 'undefined' || id === null) {
		return false;
	} else {
		
		var $item = $('#'+id);
		if (!$item.length) return false;
		
		var tickprop = {
			'intro' : { 'start' : 0, 'end' : 3 },
			'work' : { 'start' : 3, 'end' : (3 + (3*getMaxWorkRows())) },
			'profile' : { 'start' : (3 + (3*getMaxWorkRows())), 'end' : (6 + (3*getMaxWorkRows())) },
			'contact' : { 'start' : (6 + (3*getMaxWorkRows())), 'end' : (9 + (3*getMaxWorkRows())) }
		}
		
		if(tick >= tickprop[id]['end']) {
			for(var i = tick; i >= tickprop[id]['start']; i--) {
				tick = i;
				direction = 'UP';
				animate();
			}
		} else if(tick <= tickprop[id]['start']) {
			for(var i = tick; i <= tickprop[id]['start']; i++) {
				tick = i;
				direction = 'DOWN';
				animate();
			}
		}
		
		$('#main_logo, #main_nav').removeClass('in');
		
		history.pushState({},'','#'+id);
		return true;
	}
}

function viewWork(project, title) {
	var content = 'projects/'+(project.toLowerCase())+'.html';

	$('#overlay').find('.overlay-content').eq(0).load(content);
	$('#overlay').find('.overlay-title').eq(0).html(title);
	
	$('.overlay-backdrop, .overlay-close').off('click').on('click',function() {
		$('#overlay').removeClass('in');
		setTimeout(function() {
			$('#overlay').find('.overlay-title').eq(0).html('');
			$('#overlay').find('.overlay-content').eq(0).html('');
			$('#overlay').find('.overlay-dialog').eq(0).mCustomScrollbar('destroy');
		}, 250);
	});

	$('#overlay').find('.overlay-dialog').eq(0).mCustomScrollbar({ theme : 'dark-thin', mouseWheel:{ scrollAmount: 200 }});
	setTimeout(function() {
		$('#overlay').addClass('in');
	}, 250);
}





















