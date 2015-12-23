var gulp       = require('gulp')
  , sass       = require('gulp-sass')
  , rename     = require('gulp-rename')
  , livereload = require('gulp-livereload')
  , concat     = require('gulp-concat')
  , uglify     = require('gulp-uglify')

gulp.task('sass', function() {
  gulp.src('./app/sass/index.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(livereload())
});

gulp.task('sass:watch', function() {
  livereload.listen();
  gulp.watch("./app/sass/**/*.scss", ['sass']);
});

var jsFiles = [
  './app/js/vendor/jquery.easing.min.js',
  './app/js/vendor/modernizr.custom.js',
  './app/js/vendor/classie.min.js',
  './app/js/vendor/uiMorphingButton_fixed.js',
  './app/js/progressbar.js',
  './app/js/validateSignupForm.js',
  './app/js/morphbuttonsNoscroll.js'
]

gulp.task('js', function() {
  return gulp.src(jsFiles)
    .pipe(concat('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(livereload())
});

gulp.task('js:watch', function() {
  livereload.listen();
  return gulp.watch(jsFiles, ['js'])
})

gulp.task('default', ['sass']);
gulp.task('build:production', ['sass', 'js'])
