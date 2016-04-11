/**
 * Created by tomm.huth on 11/04/16.
 */
var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function () {
    return gulp.src('app/components/app.jsx')
        .pipe(react({harmony: false}))  // enable harmony features
        .pipe(gulp.dest('build/js'));
});