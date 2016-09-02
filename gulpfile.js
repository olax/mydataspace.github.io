var gulp = require('gulp');
var Server = require('karma').Server;
var bower = require('gulp-bower');
var runSequence = require('run-sequence');
var del = require('del');
var less = require('gulp-less');
var concat = require('gulp-concat');
var fs = require('fs');
var uglify = require('gulp-uglifyjs');

gulp.task('api', function() {
  return gulp.src([
      './vendor/socket.io.js',
      './js/common.js',
      './js/formatters.js',
      './js/api/Entities.js',
      './js/api/Myda.js'
    ])
    .pipe(concat('v1.5.js'))
    .pipe(gulp.dest('./js/api/'));
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
  }, done).start();
});

gulp.task('bower', function() {
  return bower();
});



//
// Bootstrap
//

gulp.task('vendor:bootstrap:js', function() {
  return gulp.src(
    ['bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js']
  ).pipe(gulp.dest('vendor/bootstrap'));
});

gulp.task('vendor:bootstrap:css', function() {
  return gulp.src(
    'bower_components/bootstrap-sass/assets/stylesheets/**/*'
  ).pipe(gulp.dest('vendor/bootstrap/stylesheets'));
});

gulp.task('vendor:bootstrap', ['vendor:bootstrap:js', 'vendor:bootstrap:css']);


gulp.task('vendor:jquery', function() {
  return gulp.src(
    'bower_components/jquery/dist/jquery.js'
  ).pipe(gulp.dest('vendor'));
});



gulp.task('vendor:fa:css', function () {
  return gulp.src('bower_components/fontawesome/css/*').pipe(gulp.dest('vendor/fontawesome/css'));
});

gulp.task('vendor:fa:fonts', function () {
  return gulp.src('bower_components/fontawesome/fonts/*').pipe(gulp.dest('vendor/fontawesome/fonts'));
});

gulp.task('vendor:fa', ['vendor:fa:fonts', 'vendor:fa:css']);

gulp.task('vendor:webix:fonts', function () {
  return gulp.src('bower_components/webix/codebase/fonts/PTS-*.woff').pipe(gulp.dest('vendor/webix/fonts'));
});

gulp.task('vendor:webix:code', function () {
  return gulp.src('bower_components/webix/codebase/*.*').pipe(gulp.dest('vendor/webix'));
});

gulp.task('vendor:webix', ['vendor:webix:fonts', 'vendor:webix:code']);


// gulp.task('vendor:jquery', function () {
//   return gulp.src('bower_components/jquery/dist/*').pipe(gulp.dest('vendor/jquery'));
// });

gulp.task('vendor:sio', function () {
  return gulp.src('bower_components/socket.io-client/socket.io.js').pipe(gulp.dest('vendor'));
});

gulp.task('vendor:ace', function () {
  return gulp.src([
    'bower_components/ace-builds/src-noconflict/ace.js',
    'bower_components/ace-builds/src-noconflict/ext-searchbox.js',
    'bower_components/ace-builds/src-noconflict/theme-monokai.js',
    'bower_components/ace-builds/src-noconflict/mode-javascript.js'
  ]).pipe(gulp.dest('vendor/ace/src-noconflict'));
});

gulp.task('vendor:clean', function() {
  return del(['vendor/**/*']);
});

gulp.task('jekyll:build', function (done){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit', shell: true});
  jekyll.on('exit', function(code) {
    done(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('jekyll:clean', function() {
  return del(['_site']);
});

gulp.task('jekyll:serve', function (done){
  var spawn = require('child_process').spawn;
  var jekyll = spawn('jekyll', ['serve', '--incremental', '--watch'], {stdio: 'inherit', shell: true});
  jekyll.on('exit', function(code) {
    done(code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code);
  });
});

gulp.task('default', function() {
  runSequence(
    'bower',
    'vendor:clean',
    [
      'vendor:jquery',
      'vendor:fa',
      'vendor:sio',
      'vendor:webix',
      'vendor:bootstrap',
      'api',
      'vendor:ace'
    ],
    'jekyll:clean',
    'jekyll:build');
});

gulp.task('serve', function() {
  runSequence(
    'bower',
    'vendor:clean',
    [
      'vendor:jquery',
      'vendor:fa',
      'vendor:sio',
      'vendor:webix',
      'vendor:bootstrap',
      'api',
      'vendor:ace'
    ],
    'jekyll:clean',
    'jekyll:serve');
});
