var gulp         = require('gulp')
  , sass         = require('gulp-sass')
  , rename       = require('gulp-rename')
  , livereload   = require('gulp-livereload')
  , concat       = require('gulp-concat')
  , uglify       = require('gulp-uglify')
  , autoprefixer = require('gulp-autoprefixer')
  , browserify   = require('browserify')
  , babelify     = require('babelify')
  , source       = require('vinyl-source-stream')
  , buffer       = require('vinyl-buffer')

gulp.task('sass', function() {
  gulp.src(['./app/sass/home.scss', './app/sass/premium.scss', './app/sass/admin.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ["> 1%"]}))
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

var entry = 'app/js/admin/index.jsx'

gulp.task('bundle', function() {
  browserify(entry)
    .transform(babelify, {presets: ['es2015', 'react']})
    .bundle()
    .on('error', (e) => console.log(e.toString()))
    .pipe(source('admin.bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
})

gulp.task('bundle:watch', () => {
  gulp.watch('app/js/admin/**/*.jsx', ['bundle'])
})

gulp.task('default', ['sass']);
gulp.task('build:production', ['sass', 'js', 'bundle'])
