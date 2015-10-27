require.config({
	'baseUrl': '/js/lib',
	'paths': {
		'jquery' : 'jquery-1.11.0.min',
		'bPopup': 'jquery.bpopup.min',
		'timelineMax': 'TimelineMax.min',
		'tweenMax': 'TweenMax.min',
		'gsap': 'jquery.gsap.min',
		'underscore': 'underscore-min',
		'underscoreTemplate': 'underscoreTemplateConfig',
		'oliverApp' : '../oliverApp'
	},
	'shim': {
		'underscore' : {},
		'underscoreTemplate': {},
		'bPopup': {
			deps: ['jquery']
		},
		'gsap': {
			deps: ['jquery', 'timelineMax', 'tweenMax']
		}
	}
});

require(['underscore', 'jquery', 'oliverApp', 'bPopup', 'gsap', 'underscoreTemplate'], function(_, $, OliverApp) {
	'use strict';

	OliverApp.init({});
    
});

function pop(dom_id){
	$(dom_id).bPopup({
		transition: 'slideDown',
		speed: 'slow'
	});
}