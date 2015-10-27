var gulp = require('gulp');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');

var sassSources = 'styles/sass/**/*.scss';
var jsSources = 'scripts/**/*.js';

gulp.task('styles', function() {
    gulp.src(sassSources)
    	.pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('styles/css/'));
});

gulp.task('scripts', function(){
	gulp.src(jsSources)
		.pipe(browserify({ debug: true }))
		.pipe(gulp.dest('build/js'));
});

//Watch task
gulp.task('watch', function() {
	gulp.watch(jsSources,['scripts']);
    gulp.watch(sassSources,['styles']);
});

gulp.task('default', ['styles', 'watch']);