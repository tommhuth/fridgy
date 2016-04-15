/**
 * Created by tomm.huth on 11/04/16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function () {
    gulp.run('sass:watch');
    gulp.run('sass');
});

gulp.task('sass', function () {
    return gulp.src('./resources/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
});
