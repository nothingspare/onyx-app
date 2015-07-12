var gulp = require('gulp');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var yuidoc = require('gulp-yuidoc');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');


var scripts = [
		'./public/app/config/*.js',
		'./public/app/services/*.js',
		'./public/app/filters/*.js',
		'./public/app/directives/*.js',
		'./public/app/controllers/*.js',
	];

var unitTests = [
		'./tests/app/karma/services/*.spec.js'
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
		.pipe(jshint())
		.pipe(jshint.reporter('gulp-jshint-file-reporter', {verbose: true, filename: __dirname + '/lint.log'}))
		.pipe(jshint.reporter('fail'));
});

gulp.task('test', function () {
	return gulp.src(unitTests)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action: 'run'
		}))
		.on('error', function(error) {
			throw error;
		});
});