jQuery(function($) {
	
	if ( !!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ) {
		$('body').addClass('body-mobile-device');
	} else {
		$('body').addClass('body-desktop-device');
	}

	svg4everybody({ polyfill: true });
	
	$('.scroll-y').scrollbar();
	
	$.fancybox.defaults.image.preload = true;
	$.fancybox.defaults.transitionEffect = "fade";
	$.fancybox.defaults.transitionDuration = 600;
	
	$(window).on('load scroll resize', function() {
		if ( !! $(window).scrollTop() ) {
			$('body').addClass('body-scrolled');
		} else {
			$('body').removeClass('body-scrolled');
		}
	});
	
	// .btn-top-page
	$('.btn-top-page').each(function() {
		var $btnTopPage = $(this);
		$(window).on('load scroll', function() {
			if ( $(window).scrollTop() > window.innerHeight ) {
				$btnTopPage.addClass('visible');
			} else {
				$btnTopPage.removeClass('visible');
			}
		});
		$btnTopPage.on('click', function(e) {
			e.preventDefault();
			if ( $btnTopPage.is('.visible') ) {
				$('html, body').animate({scrollTop: 0}, 600);
			}
		});
	});
	
	// .next-other-background
	$('[class *= "section-"]').each(function() {
		if ( $(this).next('[class *= "section-"]').length && $(this).css('background-color') != $(this).next().css('background-color') ) {
			$(this).next('[class *= "section-"]').addClass('next-other-background');
		}
	});
	
	// [data-rel]
	$('body').on('click', '[data-rel]', function(e) {
		e.preventDefault();
		var rel = $(this).attr('data-rel');
		var target = '.' + rel;
		$('body').find('a[data-rel]').parent().removeClass('active');
		$('body').find('a[data-rel=' + rel + ']').parent().addClass('active');
		if ( !! $(target).length ) {
			$('body').removeClass('body-mobile-menu-open');
			$('html, body').animate({scrollTop: $(target).offset().top}, 600);
		}
	});
	
	// .mobile-menu
	$('.mobile-menu').each(function() {
		$('.btn-mobile-menu').on('click', function(e) {
			e.preventDefault();
			$('body').toggleClass('body-mobile-menu-open');
		});
		$('body > .wrapper > .overlay').on('click', function() {
			$('body').removeClass('body-mobile-menu-open');
		});
	});
	
	// .section-slider-promo
	$('.section-slider-promo').each(function() {
		var $slider = $('.slider', this);
		var $sliderList = $('.list', $slider);
		var $btnLeft = $('.nav-left', $slider);
		var $btnRight = $('.nav-right', $slider);
		
		$sliderList.on('init', function() {
			setPreviews();
		})
		.slick({
			infinite: true,
			adaptiveHeight: true,
			fade: true,
			autoplay: true,
			draggable: false,
			touchMove: false,
			pauseOnFocus: true,
			pauseOnHover: true,
			speed: 1000,
			autoplaySpeed: 6000,
			prevArrow: $btnLeft,
			nextArrow: $btnRight,
			responsive: [
				{
					breakpoint: 992,
					settings: {
						draggable: true,
						touchMove: true
					}
				 }
			]
		})
		.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
			var curSlide = $sliderList.find('.slick-slide[data-slick-index=' + currentSlide + ']').find('.item')[0];
			var nextSlide = $sliderList.find('.slick-slide[data-slick-index=' + nextSlide + ']').find('.item')[0];
			aminContentHide(curSlide, nextSlide);
			$btnLeft.removeClass('show-thumb');
			$btnRight.removeClass('show-thumb');
		})
		.on('afterChange', function(event, slick, currentSlide) {
			var curSlide = $sliderList.find('.slick-slide[data-slick-index=' + currentSlide + ']').find('.item')[0];
			aminContentShow(curSlide);
			setPreviews();
			$btnLeft.filter('.active').addClass('show-thumb');
			$btnRight.filter('.active').addClass('show-thumb');
		});
		
		$([$btnLeft, $btnRight]).each(function() {
			$(this).on('mouseenter', function(){
				$(this).addClass('show-thumb active');
			}).on('mouseleave', function(){
				$(this).removeClass('show-thumb active');
			});
		});
		
		function setPreviews() {
			var $leftThumb = $btnLeft.find('.thumbnail');
			var $rightThumb = $btnRight.find('.thumbnail');
			var $leftTitle = $btnLeft.find('.title');
			var $rightTitle = $btnRight.find('.title');
			var curIndex = parseInt($sliderList.find('.slick-current').attr('data-slick-index'));
			var prevIndex = (curIndex != 0) ? curIndex - 1 : $sliderList.find('.slick-slide').length - 1;
			var nextIndex = (curIndex != $sliderList.find('.slick-slide').length - 1) ? curIndex + 1 : 0;
			var prevThumb = $sliderList.find('.slick-slide[data-slick-index=' + prevIndex + ']').find('.item .background').attr('data-bgr');
			var nextThumb = $sliderList.find('.slick-slide[data-slick-index=' + nextIndex + ']').find('.item .background').attr('data-bgr');
			var prevTitle = $sliderList.find('.slick-slide[data-slick-index=' + prevIndex + ']').find('.item .title').text();
			var nextTitle = $sliderList.find('.slick-slide[data-slick-index=' + nextIndex + ']').find('.item .title').text();
			$leftThumb.css('background-image', 'url("' + prevThumb + '")');
			$rightThumb.css('background-image', 'url("' + nextThumb + '")');
			$leftTitle.text(prevTitle);
			$rightTitle.text(nextTitle);
		}
		
		function aminContentHide(curSlide, nextSlide) {
			var curElems = gsap.utils.toArray(curSlide.querySelectorAll('.title, .text, .bottom'));
			var nextElems = gsap.utils.toArray(nextSlide.querySelectorAll('.title, .text, .bottom'));
			gsap.to(curElems, {opacity: 0, duration: 0.6, y: -100, stagger: 0.2});
			gsap.to(nextElems, {opacity: 0, duration: 0.1, y: -100, stagger: 0});
		}
		
		function aminContentShow(curSlide) {
			var curElems = gsap.utils.toArray(curSlide.querySelectorAll('.title, .text, .bottom'));
			gsap.to(curElems, {opacity: 1, duration: 0.6, y: 0, stagger: -0.2})
		}
	});
	
	// .section-some-work
	$('.section-some-work').each(function() {
		var $toggler = $('.slider-toggler .toggler', this);
		var $slider = $('.slider-content ul', this);
		
		$slider.on('init', function() {
			$toggler.filter(':first').addClass('active').addClass('active').siblings().removeClass('active');
		})
		.slick({
			arrows: false,
			dots: true,
			autoplay: false,
			autoplaySpeed: 6000,
			speed: 600,
			//adaptiveHeight: true,
			infinite: false
		})
		.on('afterChange', function(event, slick, currentSlide) {
			$toggler.filter(':eq(' + currentSlide + ')').addClass('active').addClass('active').siblings().removeClass('active');
		});
		
		$toggler.on('click', function() { // ??? или mouseenter ???
			var idx = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			$slider.slick('slickGoTo', idx);
		});
	});
	
	// .section-portfolio
	$('.section-portfolio').each(function() {
		var $list = $('.content > .list', this);
		
		$list.find('.item').each(function(){
			var caption = $(this).attr('data-caption') || '';
			var partner = $(this).attr('data-partner') || '';
			var date    = $(this).attr('data-date') || '';
			var index   = $(this).index() || 0;
			var s;
			s = '<span class="info">\n' +
					'<span class="caption">' + caption + '</span>\n' +
					'<span class="partner">' + partner + '</span>\n' +
					'<span class="date">' + date + '</span>\n' +
				'</span>';
			$(this).children('a:first-child').append(s);
			$(this).children('a').attr({
				'data-fancybox': 'portfolio-' + index,
				'data-caption': caption
			});
		})
		
		$(window).on('resize', function() {
			if ( $(window).innerWidth() < 640 && ! $list.is('.slick-slider') ) {
				$list.slick({
					arrows: false,
					dots: true,
					autoplay: false
				});
			} else if ( $(window).innerWidth() >= 640 && $list.is('.slick-slider') ) {
				$list.slick('unslick');
			}
			$list.find('.item').each(function() {
				$(this).css('background-image', 'url("' +$(this).attr('data-thumbnail') + '")');
			});
		}).trigger('resize');
	});
	
	// .section-partners
	$('.section-partners').each(function() {
		var $list = $('.content > .list', this);
		var $btnPrev = $('.content > .btn-slide-prev', this);
		var $btnNext = $('.content > .btn-slide-next', this);
		$list.slick({
			arrows: true,
			dots: false,
			slidesToShow: 6,
			slidesToScroll: 6,
			autoplay: false,
			prevArrow: $btnPrev,
			nextArrow: $btnNext,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
					  slidesToShow: 5,
					  slidesToScroll: 5
					}
				},
				{
					breakpoint: 992,
					settings: {
					  slidesToShow: 4,
					  slidesToScroll: 4
					}
				},
				{
					breakpoint: 768,
					settings: {
					  slidesToShow: 3,
					  slidesToScroll: 3
					}
				},
				{
					breakpoint: 640,
					settings: {
					  slidesToShow: 2,
					  slidesToScroll: 2
					}
				},
				{
					breakpoint: 500,
					settings: {
					  slidesToShow: 1,
					  slidesToScroll: 1
					}
				},
			]
		});
	});


});












