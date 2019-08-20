const gulp = require('gulp'); 
// Adding gulp-clean-css to minify css
const cleanCSS = require('gulp-clean-css'); 
// Compiles sass
const sass = require('gulp-sass'); 
// Minify js 
const uglify = require('gulp-uglify'); 

 gulp.task('default', function() {
     console.log("Gulp js is running")
 });  

// Copies css to publc folder 
gulp.task('css', function () {
    return gulp.src('src/css/index.css')
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
}) 

gulp.task('jsMinify', function() {
    return gulp.src('src/js/App.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});
