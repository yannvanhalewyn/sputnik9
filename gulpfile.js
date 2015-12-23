var gulp = require('gulp')
  , sass = require('gulp-sass')
  , rename = require('gulp-rename')
  , livereload = require('gulp-livereload')

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

gulp.task('default', ['sass']);
gulp.task('build:production', ['sass'])
