const gulp = require('gulp'); 

 gulp.task('default', function() {
     console.log("Gulp js is running")
 });  

// Copies css to publc folder 
gulp.task('css', function () {
    return gulp.src('src/css/index.css')
        .pipe(gulp.dest('public/css'));
}) 
