var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['babel-compile', 'copy-view', 'start']);

gulp.task('babel-compile', () => {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-view', () => {
  return gulp.src('src/**/*.jade')
    .pipe(gulp.dest('dist'));
});

gulp.task('start', () => {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    env: { 'NODE_ENV': 'development', 'PORT': '8000' }
  });
});

gulp.watch(['src/**/*.js', 'src/**/*.jade'], ['babel-compile', 'copy-view'])
  .on('change', event => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); // eslint-disable-line
  });
