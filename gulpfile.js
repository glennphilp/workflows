// include gulp
var gulp        = require('gulp'),
    util        = require('gulp-util'),
    browserify  = require('gulp-browserify'),
    coffee      = require('gulp-coffee'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect');

var paths = {
  coffeeSrc:  ['src/components/coffee/tagline.coffee'],
  coffeeDst:  'src/components/js',
  jsSrc:      [
    'src/components/js/rclick.js',
    'src/components/js/pixgrid.js',
    'src/components/js/tagline.js',
    'src/components/js/template.js'
  ],
  jsDevDst:   'src/js',
  jsonSrc:    ['src/js/*.json'],
//    imgSrc: './src/images/**/*',
//    imgDst: './build/images',
  htmlSrc:    ['src/*.html'],
  htmlDst:    'build',
  scssSrc:    ['./src/_scss/style.scss'],
  scssDst:    './src/css/'
//    cssSrc: './src/css/**/*.css',
//    cssDst: './build/css'
};


gulp.task('coffee', function() {
  gulp.src(paths.coffeeSrc)
    .pipe(coffee({ bare: true })
      .on('error', util.log))
    .pipe(gulp.dest(paths.coffeeDst))
});

gulp.task('js', function() {
  gulp.src(paths.jsSrc)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulp.dest(paths.jsDevDst))
    .pipe(connect.reload())
});

gulp.task('compass', function() {
  gulp.src(paths.scssSrc)
    .pipe(compass({
      sass: 'src/_scss',
      image: 'src/imgs',
      style: 'expanded'
    }))
    .on('error', util.log)
    .pipe(gulp.dest(paths.scssDst))
});

gulp.task('connect', function() {
  connect.server({
    root: 'src/',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(paths.htmlSrc)
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(paths.jsonSrc)
    .pipe(connect.reload())
});

gulp.task('watch', function() {
  gulp.watch(paths.coffeeSrc, ['coffee']);
  gulp.watch(paths.jsSrc, ['js']);
  gulp.watch('src/_scss/**/*.scss', ['compass']);
  gulp.watch(paths.htmlSrc, ['html']);
  gulp.watch(paths.jsonSrc, ['json']);
});

gulp.task('default', [
  'coffee', 
  'js',
  'json',
  'compass', 
  'connect', 
  'html', 
  'watch'
]);