var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var yuidoc = require('gulp-yuidoc');
var jshint = require('gulp-jshint');


var scripts = [
		'./public/app/config/*.js',
		'./public/app/services/*.js',
		'./public/app/filters/*.js',
		'./public/app/directives/*.js',
		'./public/app/controllers/*.js',
	];

gulp.task('concat', function () {
	return gulp.src(scripts)
		.pipe(concat('application.js'))
		.pipe(gulp.dest('./public/dest/'));
});

gulp.task('inject', function () {
	var target = gulp.src('./index.html');
	var sources = gulp.src('./public/dest/application.js', {read: false});

	return target.pipe(inject(sources, {ignorePath: 'public/', addRootSlash: false}))
		.pipe(gulp.dest('./'));
});

gulp.task('doc', function () {
	return gulp.src(scripts)
		.pipe(yuidoc())
		.pipe(gulp.dest('./docs'));
});

gulp.task('lint', function () {
	return gulp.src(scripts)
		.pipe.(jshint())
		.pipe(jshint.reporter('default'));
});