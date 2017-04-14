var gulp = require('gulp');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var htmlmin = require('gulp-htmlmin');
var ngAnnotate = require('gulp-ng-annotate');
var revReplace = require('gulp-rev-replace'); //html路径替换
var rev = require('gulp-rev'); //生成版本号
var gls = require('gulp-live-server');
var open = require('gulp-open');
var os = require('os');
var del = require('del');
gulp.task('index', function() {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', ngAnnotate({ single_quotes: true })))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', uglifycss()))
    .pipe(gulp.dest('www'));
});
gulp.task('imgcopy', function() {
    return gulp.src('sources/images/*')
        .pipe(gulp.dest('www/sources/images'))
});
gulp.task('htmlmin', function() {
    return gulp.src('sources/tpls/**/*.html')
        // .pipe(templateCache())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('www/sources/tpls'))
});
gulp.task('build', ['index', 'imgcopy', 'htmlmin']);
gulp.task('serve', function() {
    //1. serve with default settings 
    var server = gls.static('.', '8000'); //equals to gls.static('public', 3000); 
    server.start();
    var browser = os.platform() === 'linux' ? 'google-chrome' : (
        os.platform() === 'darwin' ? 'google chrome' : (
            os.platform() === 'win32' ? 'chrome' : 'firefox'));
    var options = {
        uri: 'http://localhost:8000',
        app: browser
    };
    gulp.src('.')
        .pipe(open(options));
    //use gulp.watch to trigger server actions(notify, start or stop) 
    gulp.watch(['sources/css/*.css', 'sources/tpls/**/*.html', 'sources/js/*.js'], function(file) {
        server.notify.apply(server, [file]);
    });
});
gulp.task('clear', function() {
    del(['www/*']);
});
