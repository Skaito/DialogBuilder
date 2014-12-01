
require.config({
	baseUrl: './js',
	paths: {
		angular: 'libs/angular/angular.min',
		bootstrap: 'libs/bootstrap/js/bootstrap.min',
		jquery: 'libs/jquery/jquery.min',
		snapsvg: 'libs/Snap.svg/snap.svg-min'
	},
	shim: {
		angular: { exports: 'angular' },
		jquery: { exports: 'jQuery' },
		bootstrap: { deps: ['jquery'] },
		snapsvg: { exports: 'Snap' }
	}
});

require(['jquery', 'DialogBuilder', 'bootstrap'], function($, DialogBuilder) {
	DialogBuilder.init();
});

