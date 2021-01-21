document.addEventListener('DOMContentLoaded', function() {
	
	// .section-slider-promo
	if ( document.querySelector('.section-slider-promo') != null && window.innerWidth > 767 ) {
		(function() {
			var slider       = document.querySelector('.section-slider-promo .slider');
			var items        = gsap.utils.toArray('.section-slider-promo .slider .item');
			var content      = gsap.utils.toArray('.section-slider-promo .slider .item .content');
			var btnTopBottom = document.querySelector('.section-slider-promo .slider .btn-top-bottom');
			
			gsap.to(items, {
				scrollTrigger: {
					trigger: slider,
					scrub: true,
					ease: 'none',
					start: 'top top',
					end: 'bottom top'
				},
				yPercent: 25
			});
			
			gsap.to(content, {
				scrollTrigger: {
					trigger: slider,
					scrub: true,
					ease: 'none',
					start: 'top top',
					end: 'bottom top'
				},
				opacity: 0.3
			});
			
			gsap.to(btnTopBottom, {
				scrollTrigger: {
					trigger: slider,
					scrub: true,
					ease: 'none',
					start: 'top top',
					end: 'bottom 20%'
				},
				opacity: 0
			});
			
			gsap.timeline({repeat: -1, repeatDelay: 2})
				.to(btnTopBottom, {y: -50,  duration: 0.5})
				.to(btnTopBottom, {y: 0, duration: 1, ease: 'bounce.out'});
					
		}());
	}
	
});