// include gulp
var gulp    = require('gulp'),
    util    = require('gulp-util'),
    coffee  = require('gulp-coffee');
 
// include plug-ins
//var jshint = require('gulp-jshint'),
//    changed = require('gulp-changed'),
//    imagemin = require('gulp-imagemin'),
//    minifyHTML = require('gulp-minify-html'),
//    concat = require('gulp-concat'),
//    stripDebug = require('gulp-strip-debug'),
//    uglify = require('gulp-uglify'),
//    sass = require('gulp-sass'),
//    compass = require('gulp-compass'),
//    autoprefix = require('gulp-autoprefixer'),
//    minifyCSS = require('gulp-minify-css');

var paths = {
  coffeeSrc: ['src/scripts/coffee/*.coffee'],
  coffeeDst: ['src/scripts/']
//    jsSrc: ['./src/js/foundation.js', './src/js/foundation/*.js'],
//    jsDst: './build/js',
//    imgSrc: './src/images/**/*',
//    imgDst: './build/images',
//    htmlSrc: './src/*.html',
//    htmlDst: './build',
//    scssSrc: ['./src/scss/**/*.scss', '!./src/scss/core/**/*.scss'],
//    scssDst: './src/css/',
//    cssSrc: './src/css/**/*.css',
//    cssDst: './build/css'
};

gulp.task('coffee', function() {
  gulp.src('paths.coffeeSrc')
    .pipe(coffee({ bare: true })
      .on('error', util.log))
    .pipe(gulp.dest('paths.coffeeDst'));
});