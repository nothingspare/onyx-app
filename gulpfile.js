var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('concat', function () {
	return gulp.src([
			'./public/app/config/*.js',
			'./public/app/services/*.js',
			'./public/app/filters/*.js',
			'./public/app/directives/*.js',
			'./public/app/controllers/*.js',
		])
		.pipe(concat('application.js'))
		.pipe(gulp.dest('./public/dest/'));
});