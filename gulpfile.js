var gulp     = require('gulp');
var gulpIf   = require('gulp-if');
var gulpUglify   = require('gulp-uglify');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var gls		 = require('gulp-live-server');
var concat	 = require('gulp-concat');
var install  = require("gulp-install");
var tempCache = require("gulp-angular-templatecache");
var argv     = require('yargs').argv;

/*
	gulp logic:
	1. rm -rf everything in build folder
	2. copy client files that don't need processing to build
	3. [parallel]: 
*/

var paths = {
	// frontend files excluding js, css, and templates
	assets: [
		'./client/**/*.*',
		'!./client/assets/{css,scss,js}/**/*.*'
	],
	// Sass will check these folders for files when you use @import.
	sass: [
		'client/assets/scss'
	],
	// These files are for your app's JavaScript
	appJs: [
		'node_modules/jquery/dist/jquery.js',
		'node_modules/angular/angular.js',
		'client/assets/js/**/*.js'
		//'!client/assets/js/libs/jquery.min.js'
	],
	finalJs: [
		'build/assets/js/combined.js'
	]
};

// Check for --production flag
var isProduction = !!(argv.production);

// Default task: builds your app, starts a server, and recompiles assets when they change
gulp.task('default', ['server'], function () {
	// Watch Sass
	//gulp.watch(['./client/assets/scss/**/*', './scss/**/*'], ['sass']);
	
	// Watch JavaScript
	//gulp.watch(['./client/assets/js/**/*', './js/**/*'], ['uglify:app']);
	
	// Watch Routes
	//gulp.watch(['./client/assets/js/routes.js'], ['uglify:app']);
	
	// Watch static files
	//gulp.watch(['./client/**/*.*', '!./client/templates/**/*.*', '!./client/assets/{scss,js}/**/*.*'], ['copy']);
	
	// Watch app templates
	//gulp.watch(['./client/templates/**/*.html'], ['copy:templates']);
	//gulp.watch(['./client/templates/**/**/*.html'], ['copy:templates']);
});

// Starts a test server, which you can view at http://localhost:8080
gulp.task('server', ['build'], function() {
	var server = gls.new("app.js");
	server.start();
});

// Builds your entire app once, without starting a server
gulp.task('build', function(callback) {
	//sequence('install','clean', ['copy', 'uglify'], 'copy:templates','combine', callback);
	sequence('install','clean', ['copy', 'uglify'], 'copy:templates', callback);
});

gulp.task('install', function() {
  return gulp.src(['./package.json'])
      .pipe(install());
});

// Cleans the build directory
gulp.task('clean', function(cb) {
  rimraf('./build', cb);
});

// Copies everything in the client folder except templates, Sass, and JS
gulp.task('copy', function() {
  return gulp.src(paths.assets, {
    base: './client/'
  })
    .pipe(gulp.dest('./build'))
  ;
});

gulp.task('uglify', function() {
// if production, uglifies; finally, combines into one file
  var uglify = gulpIf(isProduction, gulpUglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(paths.appJs)
      //.pipe(sourcemaps.init())
      .pipe(uglify)
      .pipe(concat('clientApp.js'))
      //.pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./build/assets/js/'))
  ;
});

// Combine templates into one js file, put in js location
gulp.task('copy:templates', function() {
  return gulp.src('./client/templates/**/*{.html,.htm}')
    .pipe(tempCache())
    .pipe(gulp.dest('./build/assets/js'))
  ;
});



