var gulp          = require('gulp'),
    protractor    = require('gulp-protractor').protractor,
    gutil         = require('gulp-util'),
    jshint        = require('gulp-jshint'),
    stylish       = require('jshint-stylish'),
    map           = require('map-stream')
    plumber       = require('gulp-plumber'),
    htmlmin       = require('gulp-htmlmin'),
    browserSync   = require('browser-sync').create(),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    imagemin      = require('gulp-imagemin'),
    ghPages       = require('gulp-gh-pages'),
    sass          = require('gulp-sass'),
    bourbon       = require('node-bourbon').includePaths,
    cp            = require('child_process'),
    os            = require('os'),
    _             = require('lodash'),
    isWindows     = os.type() === 'Windows_NT',
    karma         = require('karma').server,
    path          = require('path'),
    childProcess  = require('child_process'),
    complexity    = require('gulp-complexity'),
    connect       = require('gulp-connect'),
    karmaConf     = require('./karma.conf.js');

var CONFIG = {
  PROTRACTOR_FILE: 'protractor.conf.js'
};

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

var exitCode = 0;
var totalLintErrors = 0;

function lintOnEnd() {
  var errString = totalLintErrors + '';
  if (exitCode) {
    console.log(gutil.colors.magenta(errString), 'errors\n');
    gutil.beep();
  }
}

function getProtractorBinary(binaryName){
    var winExt = /^win/.test(process.platform)? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/'+binaryName+winExt);
}


gulp.task('jshint', function() {
  return gulp.src('./src/js/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(map(function (file, cb) {
      if (!file.jshint.success) {
        totalLintErrors += file.jshint.results.length;
        exitCode = 1;
      }
      cb(null, file);
    }))
    .on('end', function () {
      lintOnEnd();
      if (exitCode) {
        process.emit('exit');
      }
    });
});

process.on('exit', function () {
  process.nextTick(function () {
    var msg = 'gulp ' + gulp.seq + ' failed';
    console.log(gutil.colors.red(msg));
    process.exit(exitCode);
  });
});

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    if (isWindows){
        return cp.exec('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
     }else {
        return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}).on('close', done);
    }
});

gulp.task('minify-html', function() {
  return gulp.src('_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_site'));
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
	browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync.init({
        server: {
        baseDir: '_site'
        },
        port: 4000
    });
});

gulp.task('complexity', function(){
    return gulp.src('src/js/components/**/*.js')
        .pipe(complexity({
          halstead: 29,
          cyclomatic: 6
        }));
});

gulp.task('coverage', ['test'], function() {
    browserSync.init({
        server: {
        baseDir: 'coverage/PhantomJS 1.9.8 (Mac OS X 0.0.0)'
        },
        port: 4000
    });
});

gulp.task('sass', function () {
  gulp.src('src/sass/main.scss')
    .pipe(plumber())
    .pipe(sass({
        includePaths: ['styles'].concat(bourbon)
    }).on('error', sass.logError))
        .pipe(gulp.dest('_site/assets/css'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('assets/css/'));
});

/**
 * Javascript Task
 */
gulp.task('js', function(){
	return gulp.src([
			'src/js/packages/*.js',
			'src/js/components/**/*.js',
			'src/js/*.js'
		])
		.pipe(plumber())
		.pipe(concat('main.js'))
		.pipe(uglify())
		.pipe(gulp.dest('assets/js/'))
		.pipe(gulp.dest('_site/assets/js/'))
});

/**
 * JSON Task
 */
gulp.task('json', function(){
    return gulp.src('src/json/**/*.json')
    .pipe(plumber())
    .pipe(gulp.dest('assets/json/'))
		.pipe(gulp.dest('_site/assets/json/'))
});

/**
 * Apply assets Task
 */
gulp.task('apply-assets', function(){
    return gulp.src('assets/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('_site/assets/'))
});

/**
 * Imagemin Task
 */
gulp.task('imagemin', function() {
    return gulp.src('src/img/**/*.{jpg,png,gif}')
    .pipe(plumber())
    .pipe(gulp.dest('assets/img/'));
});


gulp.task('test', function(done) {
  karma.start(_.assign({}, karmaConf, { singleRun: true }), done);
});

gulp.task('protractor-install', function(done){
    childProcess.spawn(getProtractorBinary('webdriver-manager'), ['update'], {
        stdio: 'inherit'
    }).once('close', done);
});

gulp.task('protractor-start', function(done){
    childProcess.spawn(getProtractorBinary('webdriver-manager'), ['start'], {
        stdio: 'inherit'
    }).once('close', done);
});

gulp.task('protractor-run', function (done) {
    childProcess.exec('npm run e2e', function (error, stdout, stderr) {
        if(error === null) {
            process.exit(1);
            done();
        }
    });
});

gulp.task('connect', function() {
  connect.server({
    root: '_site',
    port: 4000,
    livereload: false
  });
});

gulp.task('e2e', ['connect', 'protractor-start', 'protractor-run'])

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/json/**/*.json', ['json']);
    gulp.watch('test/spec/**/*.js', ['test']);
    gulp.watch('src/img/**/*.{jpg,png,gif}', ['imagemin']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
    gulp.watch(['*.html','index.html', '_includes/*.html', '_layouts/*.html', '_posts/*', '**/*.md', '**/*.html'], ['jekyll-rebuild', 'minify-html']);
});

gulp.task('deploy', function() {
  return gulp.src('./_site/**/*')
  .pipe(ghPages());
});

gulp.task('build', ['js', 'json',  'sass']);

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js', 'json', 'sass', 'browser-sync', 'minify-html', 'watch']);
