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

gulp.task('sass:form', function() {
  gulp.src('./app/sass/form.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
});

gulp.task('sass:watch', function() {
  livereload.listen();
  gulp.watch("./app/sass/**/*.scss", ['sass']);
});

gulp.task('svg', function() {
  gulp.src("./app/resources/svg/**/*.svg")
    .pipe(rename("svgstore.hbs"))
    .pipe(gulp.dest("views/partials"))
})

gulp.task('svg:watch', function() {
  gulp.watch("./app/resources/svg/**/*.svg")
})


gulp.task('default', ['sass']);
gulp.task('build:production', ['sass', 'sass:form'])
