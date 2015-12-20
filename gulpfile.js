var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('www/css/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/css/'));
});

gulp.task('default',function() {
    gulp.watch('./www/css/sass/**/*.scss',['styles']);
});