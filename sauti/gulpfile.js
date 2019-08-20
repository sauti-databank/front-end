const gulp = require('gulp'); 

// Minifying styling 
const cleanCSS = require('gulp-clean-css'); 
const sass = require('gulp-sass'); 

// Minifying JS 
const babel = require('gulp-babel'); 
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');  
const uglify = require('gulp-uglify'); 

// Copies css to publc folder 
gulp.task('css', function () {
    return gulp.src('src/css/index.css')
        .pipe(sass())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('public/css'));
}) 

// Minifies JS 
gulp.task('jsMinify', function() {
    return gulp.src('src/js/App.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ["@babel/preset-react", 
        "@babel/preset-env"], 
        plugins: ["@babel/plugin-proposal-class-properties"]
    }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

// Test 
gulp.task('default', function() {
    console.log("Gulp js is running")
}); 