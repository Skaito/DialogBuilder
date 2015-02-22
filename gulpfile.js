
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

gulp.task('bootstrap_icons', function() { 
    return gulp.src('./node_modules/bootstrap/dist/fonts/**.*') 
        .pipe(gulp.dest('./web/css/libs/bootstrap/fonts')); 
});
gulp.task('bootstrap_css', function() { 
    return gulp.src('./node_modules/bootstrap/dist/css/**.*') 
        .pipe(gulp.dest('./web/css/libs/bootstrap/css')); 
});

gulp.task('bootstrap', ['bootstrap_icons', 'bootstrap_css']);

gulp.task('watch', function() {
	var bundler = watchify(browserify(mainFile, watchify.args));
	//bundler.transform('brfs');
	bundler.on('update', function() { rebuild(bundler); });
	rebuild(bundler);
});

gulp.task('build', ['bootstrap'], function() {
	var bundler = browserify(mainFile);
	rebuild(bundler);
});

gulp.task('default', ['build']);
