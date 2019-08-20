const gulp = require('gulp'); 

gulp.task('process-css', function() {
    return gulp.src('./src/index.css')
    .pipe(gulp.dest('./src/dist'));
});  


gulp.task('default', ['process-css']); 