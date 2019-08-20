const gulp = require('gulp'); 

// Minifying styling 
const cleanCSS = require('gulp-clean-css'); 
const sass = require('gulp-sass'); 

// Copies css to publc folder 
gulp.task('css', function () {
    return gulp.src('src/css/index.css')
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
}); 

// Test 
gulp.task('default', function() {
    console.log("Gulp js is running")
}); 