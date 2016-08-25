

$(document).ready(function($) {
  "use strict";
	window.ios = navigator.userAgent.match(/(iPod|iPhone|iPad|Android)/);
	
	$('.colours > a > span').each(function() {
		$(this).addClass('colour').css({'background-color': $(this).attr('data-colour')});
	});
	
	var window_height = ($(window).height() > 600) ? $(window).height() : 600;
	
	$('.colours').css({'height': window_height});
	$('.colour').css('height', Math.floor(window_height/5) );
	$('.colour').last().css('height', Math.floor(window_height/5) + window_height%5);
	
	$('.circle, .home-block').height($('.colours').height());
	
	$(window).resize(function() {
		var window_height = ($(window).height() > 700) ? $(window).height() : 700;
		
		$('.colour').css('height', Math.floor(window_height/5) );
		$('.colour').last().css('height', Math.floor(window_height/5) + window_height%5);
		$('.colours').css({'height': window_height});
		$('.circle, .home-block').height($('.colours').height());
		
		$('.circle.png img').height(window_height);
		if ($('.colours.moved').length)
		{
			$('.content-panel').css({minHeight: Math.max($('.colours').height(), $('.content-box').outerHeight()), maxHeight: Math.max($('.content-box').outerHeight(), $('.colours').height(), $(window).height()), overflow: 'auto'});
		}
		else
		{
			$('.content-panel').css({maxHeight: $(window).height(), minHeight: 0});
		}
	});
	
	setInterval(function() { $(window).trigger('resize') }, 1000);
	
	$('.colour_link').click(function(event) {
		event.preventDefault();
		
		$('.colour_link').attr('data-current', 'false');
		$(this).attr('data-current', 'true');
		
		var this_name = $(this).children().first().attr('data-name');
		$('.content-box > h1').html($('.' + this_name + ' > h1').html());
		$('.content-box > .page_name').html($('.' + this_name + ' > .page_name').html());
		$('.content-box .paragraphs').first().html($('.' + this_name + ' .paragraphs').first().html());
		$('.content-box .paragraphs.second-block').first().html($('.' + this_name + ' .paragraphs.second-block').first().html());
		$('.content-box .quick-links').first().html($('.' + this_name + ' .quick-links').first().html());
		$('.content-panel').css({minHeight: $('.content-box').outerHeight(), overflow: 'auto'});
		
		if ($('.' + this_name + ' .paragraphs').is('.no-columns'))
		{
			$('.content-box .paragraphs').addClass('no-columns');
		}
		else
		{
			$('.content-box .paragraphs').removeClass('no-columns');
		}
		
		$('.content-box').attr('data-page', this_name);
		
		if ($('.colours').is('.moved') == false)
		{
			$('.colours').addClass('moving').delay(500).addClass('moved', 500) //.removeClass('moving');
			$('#home_wrapper').stop().animate({'right': '100%'}, 1000, function() {
				$('.content-box').addClass('moved');
				$('.icon-home').fadeIn();
			});
			$('.content-panel, .content-box, body').stop().find('span').attr('data-colour'), 1000;
			$('#home_wrapper').addClass('moved');
		}
		else
		{
			$('.content-panel, .content-box, body').stop().find('span').attr('data-colour'), 500;
		}
		
		if (History.enabled)
		{
			window.manualStateChange = false;
			History.pushState({page:this_name}, $(this).find('span span').text() + ' | ' + 'Coloured Lines', $(this).attr('href'));
		}
	});
		
	$('body').on('click', '.quick-links a', function(event) {
		event.preventDefault();
		
		window.manualStateChange = false;
		$('.colour_link.' + $(this).attr('data-url')).trigger('click');
		
		return false;
	});
	
	$('.colours .colour_link').hover(function() {
		if ($('.colours').is('.moved') && $(this).attr('data-current') == "false" && !window.ios)
		{
			$('.content-box').addClass('moved-back');
			$(this).children().first().stop().animate({'margin-left': 200});
			$(this).addClass('hover', 1000);
		}
	}, function() {
		$(this).children().first().stop().animate({'margin-left': 0});
		$(this).removeClass('hover', 1000);
		$('.content-box').removeClass('moved-back');
	});
	
	$('.colours:not(.moving) a').hover(function() {
		if ($('.colours:not(.moving)').length)
		{
			$(this).children().first().css({'padding-top': '5px', 'margin-top': '0px'});
		}
	}, function() {
		$(this).children().first().css({'padding-top': '0', 'margin-top': '0'});
	});
	
	$('.icon-home a').on('click', function(event) {
		event.preventDefault();
		event.stopPropagation();
		
		if (History.enabled)
		{
			History.replaceState({page:'home'}, 'Coloured Lines', '/');
			//$(window).trigger('statechange');
		}
		
		$('.colours').stop().removeClass('moved').delay(500).removeClass('moving');
		$('.icon-home').stop().fadeOut();
		$('.content-box').stop().removeClass('moved');
		$('.content-panel').css({minHeight: 5, overflow: 'hidden'});
		$('#home_wrapper').stop().animate({right: 0});
		
		$('#home_wrapper').removeClass('moved');
		$('.content-panel').css({maxHeight: $(window).height(), minHeight: 0});
	});
	
	$('.colours').one('click', function() {
		$('label').addClass('tk-museo-sans');
	});
	
	
	
	$('.circle.png img').height($(window).height());
	
	$(window).bind('statechange', function() {
		if ($('html.ie8').length || $('html.ie7').length || $('html.ie9').length)
		{
			return false;
		}
		
		if (window.location.pathname == '/')
		{
			$('.icon-home').stop().fadeOut();
			$('.content-box').removeClass('moved');
			$('#home_wrapper').stop().animate({right: 0});
			$('.colours').stop().removeClass('moved').delay(500).removeClass('moving');
			
			$('#home_wrapper').removeClass('moved');
		}
		else if (window.manualStateChange)
		{
			$('a[href="' + window.location.href + '"]').click();
		}
		
		window.manualStateChange = true;
	});
	
	$('form[method="post"]').submit(function(event) {
		event.preventDefault();
		
		$.post($(this).attr('action'), $(this).serialize(), function(data) {
			alert(data);
		}, 'json');
		
		return false;
	});
	
	$(window).scroll(function() {
		var diff = $('.colours').height() - $(window).height();
		
		if ($(window).scrollTop() > diff && $('.colours:not(.stuck)').length)
		{
			$('.colours').addClass('stuck');
		}
		else if ($(window).scrollTop() < diff)
		{
			$('.colours.stuck').removeClass('stuck');
		}
	});
});
