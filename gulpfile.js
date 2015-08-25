var gulp          = require('gulp'),
    protractor    = require('gulp-protractor').protractor
    plumber       = require('gulp-plumber'),
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
    karmaConf     = require('./karma.conf.js');

var CONFIG = {
  PROTRACTOR_FILE: 'protractor.conf.js'
};

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

function getProtractorBinary(binaryName){
    var winExt = /^win/.test(process.platform)? '.cmd' : '';
    var pkgPath = require.resolve('protractor');
    var protractorDir = path.resolve(path.join(path.dirname(pkgPath), '..', 'bin'));
    return path.join(protractorDir, '/'+binaryName+winExt);
}

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

gulp.task('protractor-run', function (done) {
    childProcess.spawn(getProtractorBinary('protractor'), [CONFIG.PROTRACTOR_FILE], {
        stdio: 'inherit'
    }).once('close', done);
});

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
    gulp.watch(['*.html','index.html', '_includes/*.html', '_layouts/*.html', '_posts/*', '**/*.md', '**/*.html'], ['jekyll-rebuild']);
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
gulp.task('default', ['js', 'json', 'sass', 'browser-sync', 'watch']);
