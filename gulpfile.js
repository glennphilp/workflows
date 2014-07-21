// include gulp
var gulp        = require('gulp'),
    util        = require('gulp-util'),
    browserify  = require('gulp-browserify'),
    coffee      = require('gulp-coffee'),
    compass     = require('gulp-compass'),
    concat      = require('gulp-concat'),
    connect     = require('gulp-connect'),
    gulpIf      = require('gulp-if'),
    minifyCss   = require('gulp-minify-css'),
    minifyHtml  = require('gulp-minify-html'),
    minifyImg   = require('gulp-imagemin'),
    minifyJson  = require('gulp-jsonminify'),
    pngcrush    = require('imagemin-pngcrush'),
//    styleguide  = require('gulp-livingstyleguide'),
    uglify      = require('gulp-uglify'),
    uncss       = require('gulp-uncss');

var env,
    outputDir;

env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  outputDir = 'src/';
} else {
  outputDir = 'build/';
}

var paths = {
  coffeeSrc:  ['src/components/coffee/tagline.coffee'],
  coffeeDst:  'src/components/js',
  jsSrc:      [
    'src/components/js/vendor/jquery.js',
    'src/components/js/vendor/fastclick.js',
    'src/components/js/vendor/placeholder.js',
    'src/components/js/vendor/jquery.cookie.js',
    'src/components/js/vendor/jquery.slideme-1.21.71.js',
    'src/components/js/vendor/foundation.abide.js',
    'src/components/js/vendor/foundation.accordion.js',
    'src/components/js/vendor/foundation.alert.js',
    'src/components/js/vendor/foundation.clearing.js',
    'src/components/js/vendor/foundation.dropdown.js',
    'src/components/js/vendor/foundation.equalizer.js',
    'src/components/js/vendor/foundation.interchange.js',
    'src/components/js/vendor/foundation.joyride.js',
    'src/components/js/vendor/foundation.magellan.js',
    'src/components/js/vendor/foundation.offcanvas.js',
    'src/components/js/vendor/foundation.orbit.js',
    'src/components/js/vendor/foundation.reveal.js',
    'src/components/js/vendor/foundation.slider.js',
    'src/components/js/vendor/foundation.tab.js',
    'src/components/js/vendor/foundation.tooltip.js',
    'src/components/js/vendor/foundation.topbar.js'
  ],
  ieJsSrc: [
    'src/components/js/vendor/jquery-1.11.1.js',
    'src/components/js/vendor/fastclick.js',
    'src/components/js/vendor/placeholder.js',
    'src/components/js/vendor/jquery.cookie.js',
    'src/components/js/vendor/jquery.slideme-1.21.71.js',
    'src/components/js/vendor/foundation.abide.js',
    'src/components/js/vendor/foundation.accordion.js',
    'src/components/js/vendor/foundation.alert.js',
    'src/components/js/vendor/foundation.clearing.js',
    'src/components/js/vendor/foundation.dropdown.js',
    'src/components/js/vendor/foundation.equalizer.js',
    'src/components/js/vendor/foundation.interchange.js',
    'src/components/js/vendor/foundation.joyride.js',
    'src/components/js/vendor/foundation.magellan.js',
    'src/components/js/vendor/foundation.offcanvas.js',
    'src/components/js/vendor/foundation.orbit.js',
    'src/components/js/vendor/foundation.reveal.js',
    'src/components/js/vendor/foundation.slider.js',
    'src/components/js/vendor/foundation.tab.js',
    'src/components/js/vendor/foundation.tooltip.js',
    'src/components/js/vendor/foundation.topbar.js'
  ],
  jsDst:      outputDir + 'js',
  jsonSrc:    ['src/js/*.json'],
  imgSrc:     ['src/imgs/**/*.*'],
  htmlSrc:    ['src/*.html'],
  htmlDst:    outputDir,
  scssSrc:    [
    'src/_scss/style.scss',
    'src/_scss/style-desktop.scss',
    'src/_scss/style-tablet.scss',
    'src/_scss/style-mobile.scss',
    'src/_scss/style-ie.scss'
  ],
  scssDst:    outputDir + 'css'
};


gulp.task('coffee', function() {
  gulp.src(paths.coffeeSrc)
    .pipe(coffee({ bare: true })
      .on('error', util.log))
    .pipe(gulp.dest(paths.coffeeDst));
});

gulp.task('js', function() {
  gulp.src(paths.jsSrc)
    .pipe(concat('script.js'))
    .pipe(browserify())
    .pipe(gulpIf(env === 'production', uglify()))
    .pipe(gulp.dest(paths.jsDst))
    .pipe(connect.reload());
});

gulp.task('ieJs', function() {
  gulp.src(paths.ieJsSrc)
    .pipe(concat('script-ie.js'))
    .pipe(browserify())
    .pipe(gulpIf(env === 'production', uglify()))
    .pipe(gulp.dest(paths.jsDst))
    .pipe(connect.reload());
});

gulp.task('json', function() {
  gulp.src(paths.jsonSrc)
    .pipe(gulpIf(env === 'production', minifyJson()))
    .pipe(gulpIf(env === 'production', gulp.dest('build/js')))
    .pipe(connect.reload());
});

gulp.task('compass', function() {
  gulp.src(paths.scssSrc)
    .pipe(compass({
      sass:     'src/_scss',
      image:    outputDir + 'imgs',
      font:     outputDir + 'fonts',
      require:  ['SassyIcons', 'modernizr-mixin']
    }))
    .on('error', util.log)
    .pipe(gulpIf(env === 'production', minifyCss()))
    .pipe(gulp.dest(paths.scssDst));
});

gulp.task('html', function() {
  gulp.src(paths.htmlSrc)
    .pipe(gulpIf(env === 'production', minifyHtml()))
    .pipe(gulpIf(env === 'production', gulp.dest(outputDir)))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(paths.imgSrc)
    .pipe(gulpIf(env === 'production', minifyImg({
      progessive:   true,
      svgoPlugins:  [{ removeViewBox: false }],
      use:          [pngcrush()]
    })))
    .pipe(gulpIf(env === 'production', gulp.dest(outputDir + 'imgs')))
    .pipe(connect.reload());
});

//gulp.task('styleguide', function () {
//    gulp.src('styleguide.html.lsg')
//        .pipe(styleguide())
//        .pipe(gulp.dest('dist'));
//});

gulp.task('connect', function() {
  connect.server({
    root: 'src/',
    livereload: true
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.coffeeSrc, ['coffee']);
  gulp.watch(paths.jsSrc, ['js']);
  gulp.watch(paths.ieJsSrc, ['ieJs']);
  gulp.watch('src/_scss/**/*.scss', ['compass']);
  gulp.watch(paths.htmlSrc, ['html']);
  gulp.watch(paths.jsonSrc, ['json']);
  gulp.watch(paths.imgSrc, ['images']);
});

gulp.task('default', [
  'coffee',
  'js',
  'ieJs',
  'json',
  'compass', 
  'connect', 
  'html',
  'images',
  'watch'
]);