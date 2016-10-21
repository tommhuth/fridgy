const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefix = require("gulp-autoprefixer")
const rename = require("gulp-rename")
const svgstore = require("gulp-svgstore")
const svgmin = require("gulp-svgmin") 

gulp.task("default", ["sass:watch", "sass", "icons:watch", "icons"])

gulp.task("build", [ "sass", "icons"])

gulp.task("sass", function () {
    return gulp.src("./resources/sass/app.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest("./public/css"))
})

gulp.task("sass:watch", function () {
    gulp.watch("./resources/sass/**/*.scss", ["sass"])
})

gulp.task("icons:watch", function () {
    gulp.watch("./resources/icons/*", ["icons"])
})

gulp.task("icons", function () {
    return gulp
        .src("resources/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename("iconset.svg"))
        .pipe(gulp.dest("public/gfx"))
})