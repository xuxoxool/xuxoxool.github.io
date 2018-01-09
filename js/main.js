var gameon = false;

$(function() {
	setTimeout(function() {
		$('body').removeClass('loading');
  }, 1000);
	
	$('.frame').off('mouseenter').on('mouseenter',function() {
		var $content = $(this).find('.frame-content').eq(0);
		var src = $content.attr('data-src');
		
		$('.frame').css('opacity','1');
		$('.preview').css({
			'background-image' : 'none',
			'box-shadow' : 'none'
		}).removeClass('in');
		
		if(typeof src !== 'undefined' && !$('.greet-menu').hasClass('in') && !gameon) {
			$('.frame').css('opacity','0.2');
			$(this).css('opacity',1);
			$('.preview').css({
				'background-image' : 'url('+src+')',
				'box-shadow' : '2px 2px 200px 2px #222 inset'
			}).addClass('in');
		}
	}).off('mouseleave').on('mouseleave',function() {
		$('.frame').css('opacity','1');
		$('.preview').css({
			'background-image' : 'none',
			'box-shadow' : 'none'
		}).removeClass('in');
	}).off('click').on('click', function() {
		var $content = $(this).find('.frame-content').eq(0);
		var action = $content.attr('data-action');
		if(typeof action !== 'undefined') openpage(action);
	});
	
	$('.greet-menu').off('click').on('click',function() {
		$(this).toggleClass('in');
		$('.menu').toggleClass('in');
	});
	
	var typed = {};
			typed['right'] = new Typed('#greet_left', {
				strings: ["Welcome to Xuxo", "I am Zul Zolkaffly"],
				typeSpeed: 60,
				loop: true
			});
			typed['left'] = new Typed('#greet_right', {
				strings: ["Front End Web Developer.", "UI/UX Developer.", "PHP Programmer", "Cool Father"],
				typeSpeed: 60,
				loop: true
			});
			
	$('.wrapper').on('scroll',debounce(bgLoad,250));
	
	bgLoad();
});

function bgLoad() {
	$('.frame').each(function() {
		var vpBottom = Math.round($('.wrapper').scrollTop() + $('.wrapper').outerHeight() - ($(this).outerHeight()/2));
		var frameTop = $(this).offset().top;
		
		if(frameTop <= vpBottom) {
			var $content = $(this).find('.frame-content').eq(0);
			var src = $content.attr('data-src');
			
			if(typeof src !== 'undefined' && !$('.greet-menu').hasClass('in') && !$content.hasClass('loaded')) {
				var img = new Image();
						img.onload = function() {
							setTimeout(function() {
								$content.css('background-image', 'url('+src+')');
								$content.addClass('loaded');
							}, 250);
						}
						img.src = src;
				if (img.complete) img.onload();
			}
		}
	});
}

function workBgLoad() {
	$('.work').each(function() {
		var vpBottom = Math.round($('.page-body').scrollTop() + $('.page-body').outerHeight());	// - ($(this).outerHeight()/2));
		var frameTop = $(this).offset().top;
		
		if(frameTop <= vpBottom) {
			var $wrapper = $(this).find('.work-wrapper').eq(0);
			var src = $wrapper.attr('data-src');
			
			if(typeof src !== 'undefined' && !$('.greet-menu').hasClass('in') && !$wrapper.hasClass('loaded')) {
				var img = new Image();
						img.onload = function() {
							setTimeout(function() {
								$wrapper.css('background-image', 'url('+src+')');
								$wrapper.addClass('loaded');
							}, 250);
						}
						img.src = src;
				if (img.complete) img.onload();
			}
		}
	});
}

function openpage(action) {
	if(gameon) return false;
	
	$('.frame').each(function() {
		var $frame = $(this);
		var timing = Math.floor(Math.random() * 3);
		var direction = Math.floor(Math.random() * 2) + 1;
		setTimeout(function() {
			var angle = (direction == 2) ? -90 : 90;
			$frame.css('transform', 'rotateY('+angle+'deg)');
		}, (timing * 250));
	});
	
	var $page = $('.page').eq(0);
	var title = { 'about' : 'About Me', 'work' : 'My Work', 'lab' : 'Experiment Lab', 'contact' : 'Contact Me' };
	var url = 'pages/'+(action.toLowerCase())+'.html';
	
	$page.find('.page-title').eq(0).html(title[action.toLowerCase()]);
	$page.find('.page-body').eq(0).load(url, function() {
		if(action.toLowerCase() == 'about') {
			var thisyear = new Date();
			var birthdate = new Date(1988,12,06);
			var careerstart = new Date(2010,09,01);
			var ageYears = diff_years(thisyear, birthdate);
			var careerYears = diff_years(thisyear, careerstart);
			var totalYears = careerYears + 3;
			
			$('#ageYears').html(ageYears);
			$('#totalYears').html(totalYears);
			$('#careerYears').html(careerYears);
			
			$('#skills').skillx({
				'maxPoints' : 5,
				'showValueAs' : 'percentage',
				'flatEdge' : true,
				'items' : [
					{ 'name' : 'PHP', 'value' : 4 },
					{ 'name' : 'Java', 'value' : 2 },
					{ 'name' : 'Dot Net', 'value' : 2 },
					{ 'name' : 'HTML', 'value' : 5 },
					{ 'name' : 'jQuery', 'value' : 5 },
					{ 'name' : 'CSS', 'value' : 5 },
					{ 'name' : 'Bootstrap', 'value' : 3 },
					{ 'name' : 'SASS/LESS', 'value' : 1 },
					{ 'name' : 'Angular', 'value' : 1 },
					{ 'name' : 'React', 'value' : 1 },
					{ 'name' : 'Xuxo', 'value' : 5 },
					{ 'name' : 'Code Igniter', 'value' : 4 },
					{ 'name' : 'Zend', 'value' : 3 },
					{ 'name' : 'Wordpress', 'value' : 3 },
					{ 'name' : 'Laravel', 'value' : 1 },
					{ 'name' : 'Malay', 'value' : 5 },
					{ 'name' : 'English', 'value' : 4 }
				]
			});
		}
		
		if(action.toLowerCase() == 'work' || action.toLowerCase() == 'lab') {
			$('.page-body').off('scroll').on('scroll',debounce(workBgLoad,250));
			workBgLoad();
		}
		
		if(action.toLowerCase() == 'contact') {
		}
	});
	
	setTimeout(function() {
		$page.addClass('in');
	}, 1000);
	
	$('.wrapper').addClass('no-overflow');
	$('.greet-menu, .menu').removeClass('in');
}

function closepage() {
	$('.page, .greet-menu, .menu').removeClass('in');
	$('.wrapper').removeClass('no-overflow');
		
	$('.frame').each(function() {
		var $frame = $(this);
		var timing = Math.floor(Math.random() * 3);
		setTimeout(function() {
			$frame.css('transform', 'rotateY(0deg)');
		}, (timing * 250) + 500);
	});
	
	setTimeout(function() {
		$('.page .page-title').html('');
		$('.page .page-body').html('');
	}, 500);
}

function viewwork(project, title) {
	var content = 'projects/'+(project.toLowerCase())+'.html';

	$('#overlay').find('.overlay-content').eq(0).load(content);
	$('#overlay').find('.overlay-title').eq(0).html(title);
	
	$('.overlay-backdrop, .overlay-close').off('click').on('click',function() {
		$('#overlay').removeClass('in');
		setTimeout(function() {
			$('#overlay').find('.overlay-title').eq(0).html('');
			$('#overlay').find('.overlay-content').eq(0).html('');
		}, 250);
	});

	setTimeout(function() {
		$('#overlay').addClass('in');
	}, 250);
}

function diff_years(dt2, dt1) {
	//https://www.w3resource.com/javascript-exercises/javascript-date-exercise-49.php
	var diff =(dt2.getTime() - dt1.getTime()) / 1000;
			diff /= (60 * 60 * 24);
	return Math.abs(Math.round(diff/365.25));
}

function isMobile() { return $('#mobile_detect').is(':hidden'); }

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};



















