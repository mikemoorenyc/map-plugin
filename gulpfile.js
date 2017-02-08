var   gulp = require('gulp'),
      sass = require('gulp-sass'),
  //    plumber = require('gulp-plumber'),
      babel = require('gulp-babel'),
      replace = require('gulp-replace');

gulp.task('move', function () {
  return gulp.src(['**/*.php','**/*.html','!./node_modules/**'])
    .pipe(replace('Plugin Name: Kindling DEV', 'Plugin Name: Kindling'))
    .pipe(gulp.dest('../kindling'));
});
gulp.task('sass', function () {
  return gulp.src(['**/entry.scss'])
//  .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('../kindling'));
});
gulp.task('js', function(){
  return gulp.src(['**/*.js', '!./node_modules/**'])
          .pipe(plumber())
          .pipe(babel({
              presets: ['es2015']
          }))
          .pipe(replace('$(', 'jQuery('))
          .pipe(gulp.dest('../kindling'));

});

gulp.task('watch', function() {
    gulp.watch(['**/*.php','**/*.html'], ['move']);
  //  gulp.watch(['**/entry.scss'], ['sass']);
//   gulp.watch(['**/*.js', '!./node_modules/**'], ['js']);
});
