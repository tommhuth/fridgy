const gulp = require("gulp")
const sass = require("gulp-sass")
const autoprefix = require("gulp-autoprefixer")
const rename = require("gulp-rename")
const svgstore = require("gulp-svgstore")
const svgmin = require("gulp-svgmin")

// derived
gulp.task("default", ["sass:watch", "sass", "icons:watch", "icons", "copy-static:watch", "copy-static"])

gulp.task("build", ["sass", "icons", "copy-static"])

// partials
gulp.task("sass", () => {
    return gulp.src("./resources/sass/app.scss")
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefix())
        .pipe(gulp.dest("./public/css"))
})

gulp.task("sass:watch", () => {
    gulp.watch("./resources/sass/**/*.scss", ["sass"])
})

gulp.task("icons", () => {
    return gulp.src("./resources/icons/*.svg")
        .pipe(svgmin())
        .pipe(svgstore())
        .pipe(rename("iconset.svg"))
        .pipe(gulp.dest("public/gfx"))
})

gulp.task("icons:watch", () => {
    gulp.watch("./resources/icons/*", ["icons"])
})

gulp.task("copy-static", () => {
    return Promise.all([
        gulp.src("./resources/fonts/*", { base: "resources" }).pipe(gulp.dest("public")),
        gulp.src("./resources/font-tracking.js", { base: "resources" }).pipe(gulp.dest("public/js")),
        gulp.src("./resources/pwa/*", { base: "resources/pwa" }).pipe(gulp.dest("public"))
    ])
})

gulp.task("copy-static:watch", () => {
    gulp.watch("./resources/**/*", ["copy-static"])
})
