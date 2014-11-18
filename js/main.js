
require.config({
	baseUrl: './js',
	paths: {
		angular: '../bower_components/angular/angular.min',
		bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
		jquery: '../bower_components/jquery/dist/jquery.min',
		snapsvg: '../bower_components/snap.svg/dist/snap.svg-min'
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

