var gulp        = require('gulp'),
	plumber     = require('gulp-plumber'),
	browserSync = require('browser-sync').create(),
	uglify      = require('gulp-uglify'),
	concat      = require('gulp-concat'),
	imagemin    = require('gulp-imagemin'),
  ghPages     = require('gulp-gh-pages'),
  sass        = require('gulp-sass'),
  bourbon     = require('node-bourbon').includePaths,
	cp          = require('child_process');

var messages = {
	jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};


/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
	browserSync.notify(messages.jekyllBuild);
	return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
		.on('close', done);
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

/**
 * Watch stylus files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
	gulp.watch('src/js/**/*.js', ['js']);
	gulp.watch('src/json/**/*.json', ['json']);
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
