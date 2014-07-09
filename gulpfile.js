// include gulp
var gulp    = require('gulp'),
    util    = require('gulp-util'),
    coffee  = require('gulp-coffee'),
    concat  = require('gulp-concat');

var paths = {
  coffeeSrc: ['./src/components/coffee/tagline.coffee'],
  coffeeDst: ['./src/components/js'],
  jsSrc: [
    'src/components/js/rclick.js',
    'src/components/js/pixgrid.js'
  ],
  jsDevDst: 'src/js/'
//    imgSrc: './src/images/**/*',
//    imgDst: './build/images',
//    htmlSrc: './src/*.html',
//    htmlDst: './build',
//    scssSrc: ['./src/scss/**/*.scss', '!./src/scss/core/**/*.scss'],
//    scssDst: './src/css/',
//    cssSrc: './src/css/**/*.css',
//    cssDst: './build/css'
};


// Preprocessing Coffee Script
// FIXME: Revisit why Coffee is processing since
// changing src and dest to the path variables instead
// of the inline paths.
gulp.task('coffee', function() {
  gulp.src(paths.coffeeSrc)
    .pipe(coffee({ bare: true })
      .on('error', util.log))
    .pipe(gulp.dest(paths.coffeeDst));
});

gulp.task('js', function() {
  gulp.src(paths.jsSrc)
    .pipe(concat('script.js'))
    .pipe(gulp.dest(paths.jsDevDst));
});