var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['babel-compile', 'copy-view', 'start']);

gulp.task('babel-compile', () => {
  return gulp.src('server/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-view', () => {
  return gulp.src('server/**/*.ejs')
    .pipe(gulp.dest('dist'));
});

gulp.task('start', () => {
  nodemon({
    script: './bin/www',
    ext: 'js html',
    ignore: [
      'client/',
      'node_modules/',
      'dist/public/'
    ],
    env: { 'NODE_ENV': 'development', 'PORT': '8000' }
  });
});

gulp.watch(['server/**/*.js', 'server/**/*.ejs'], ['babel-compile', 'copy-view'])
  .on('change', event => {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...'); // eslint-disable-line
  });
