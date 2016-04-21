/**
 * Created by tomm.huth on 11/04/16.
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefix = require("gulp-autoprefixer");

gulp.task('default', ['sass:watch', 'sass']);

gulp.task('sass', function () {
    return gulp.src('./resources/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
});
