var gulp = require('gulp');
var babel = require('gulp-babel');
var mocha = require('gulp-mocha');

const JS_SRC='./src';
const JS_DEST='./';
const JS_BUNDLE='SpreeApiClient';
process.env.NODE_ENV = 'production'

gulp.task("watch", function() {
  process.env.NODE_ENV = 'development'
  gulp.watch((JS_SRC + '/**/*.js'), ['build']);
});

gulp.task('build', function() {
  return gulp.src(JS_SRC + '/SpreeApiClient.js').
    pipe(babel()).
    pipe(gulp.dest(JS_DEST))
});

gulp.task('test', function () {
  return gulp.src('test/SpreeApiClient.js', {read: false}).
    pipe(mocha({reporter: 'spec'}));
});

gulp.task('dist', ['build']);
gulp.task('default', ['build']);
