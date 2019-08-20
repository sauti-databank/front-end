const gulp = require('gulp'); 
// Adding gulp-clean-css to minify css
const cleanCSS = require('gulp-clean-css'); 

 gulp.task('default', function() {
     console.log("Gulp js is running")
 });  

// Copies css to publc folder 
gulp.task('css', function () {
    return gulp.src('src/css/index.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
}) 
