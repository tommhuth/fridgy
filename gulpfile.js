/**
 * Created by tomm.huth on 11/04/16.
 */
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const minify = require("gulp-uglify");

gulp.task('default', ['sass:watch', 'sass', "js:watch"]);

gulp.task('sass', function () {
    return gulp.src('./resources/sass/app.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./resources/sass/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
    gulp.watch('./public/js/bundle.js', ['minify']);
});
gulp.task('minify', function () {
    return gulp.src('./public/js/bundle.js')
        .pipe(minify())
        .pipe(rename("bundle.min.js"))
        .pipe(gulp.dest('./public/js/'));
});
