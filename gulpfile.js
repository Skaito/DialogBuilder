
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var watchify = require('watchify');
var browserify = require('browserify');
var mainFile = './web/js/main.js';
var distFolder = './web/js/';
var destFile = 'bundle.js';

function rebuild(bundler) {
	return bundler.bundle()
			.on('error', gutil.log.bind(gutil, 'Browserify Error'))
			.pipe(source(destFile))
			// optional, remove if you dont want sourcemaps
			.pipe(buffer())
			.pipe(sourcemaps.init({loadMaps: true}))
			.pipe(sourcemaps.write('./'))
			//
			.pipe(gulp.dest(distFolder));
}

gulp.task('watch', function() {
	var bundler = watchify(browserify(mainFile, watchify.args));
	//bundler.transform('brfs');
	bundler.on('update', function() { rebuild(bundler); });
	rebuild(bundler);
});

gulp.task('build', function() {
	var bundler = browserify(mainFile);
	rebuild(bundler);
});

gulp.task('default', ['build']);
