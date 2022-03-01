$(function() {
	/*------------ block question -------------------*/
	$('.question__item-question').on('click', function() {
		var answer = $(this).next();
		
		$('.question__item-answer').not(answer).slideUp(300);
		answer.slideToggle(300);
	});
	
	/*------------ block hidden services -------------------*/
	$('.service__box').on('click', function() {
		var box = $(this).attr('data-service');
		var hiddenBox = $('.service__hidden-box--' + box);
		var popupBox = $('.popup__service-box--' + box);
		var widthScreen = $('.wrapper').width();
		
		if(widthScreen > 738) {
			$('.service__hidden-box').not(hiddenBox).slideUp(300);
			hiddenBox.slideToggle(300);
			
			$('.service__box').not(this).removeClass('service__box--active').find('.service__img-hidden').text('РџРѕРґСЂРѕР±РЅРµРµ');
			if ($(this).hasClass('service__box--active')) {
				$(this).find('.service__img-hidden').text('РџРѕРґСЂРѕР±РЅРµРµ');
			} else {
				$(this).find('.service__img-hidden').text('Р—Р°РєСЂС‹С‚СЊ');
			}
			$(this).toggleClass('service__box--active');
	    } else if (widthScreen <= 738 && box != 8) {
			popup__service();
			$('.popup__service-box').hide();
			popupBox.show();
	    }
	});
	
	$(window).resize(function() {
		var widthWrapper = $('.wrapper').width();
		if (widthWrapper < 738) {
			$('.service__hidden-box').hide();
	    }
		if (widthWrapper > 738) {
			$('.popup__service').hide();
			$('.popup_overlay-service').not('.popup_overlay-document').hide();
		}
	});
	
	/*------ to disable the links device --------*/
	/*$("a.footer__device").click(function(e) {
		e.preventDefault();
	});*/
	
	/*------------ popup video ------------*/
	$('.director__button-video').on('click', function() {
		$('.video__block').addClass('video__active').find('.video__elem').html('<iframe src="http://www.youtube.com/embed/3a4QH_3EooA?feature=player_detailpage&amp;rel=0&amp;showinfo=0&amp;autoplay=1;hd=1" width="100%" height="100%" frameborder="0" wmode="opaque" allowfullscreen></iframe>');
	});
	
	$('.video__block-back, .video__close').on('click', function () {
		$(this).closest('.video__block').removeClass('video__active').find('.video__elem').html('<iframe></iframe>');
	});
	
	/*----------- input phone --------------*/
    $('.director__input--one').keyup(function() {
        if($(this).val().length == 2) {
            $(this).next().focus();
        }
    });

	$('.director__input--two').keyup(function() {
		if($(this).val().length == 3) {
			$(this).next().focus();
		}
	});
	
});