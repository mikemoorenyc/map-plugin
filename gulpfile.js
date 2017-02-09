var   gulp = require('gulp'),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      babel = require('gulp-babel'),
      replace = require('gulp-replace');

gulp.task('move', function () {
  return gulp.src(['kindling.php','component-maker.php', 'modules/**/*.html','modules/**/*.php'])
    .pipe(replace('Plugin Name: Map Plugin DEV', 'Plugin Name: Map Plugin'))
    .pipe(gulp.dest('../map-plugin_prod'));
});
gulp.task('sass', function () {
  return gulp.src(['modules/**/entry.scss'])
//  .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('../map-plugin_prod'));
});
gulp.task('js', function(){
  return gulp.src(['modules/**/*.js'])
          .pipe(plumber())
          .pipe(babel({
              presets: ['es2015']
          }))
          .pipe(replace('$(', 'jQuery('))
          .pipe(gulp.dest('../map-plugin_prod'));

});

gulp.task('watch', function() {
    gulp.watch(['kindling.php','component-maker.php', 'modules/**/*.html','modules/**/*.php'], ['move']);
    gulp.watch(['modules/**/entry.scss'], ['sass']);
	gulp.watch(['modules/**/*.js'], ['js']);
});
