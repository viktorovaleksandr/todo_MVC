const {src, dest, series, watch} = require('gulp'); 
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();

function copyIndexHtml() {
 return src('src/**/*.html').pipe(dest('docs/'));
}

function buildIndexCss() {
 return src('src/**/*.css')
 	.pipe(concat('style.css'))
 	.pipe(cssnano())
  	.pipe(rename({ suffix: '.min' }))
  	.pipe(dest('docs/css/'))
}

function copyVendorsCss() {
 return src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
 .pipe(concat('vendors.css'))
 .pipe(dest('docs/css'))
}

function copyImage() {
 return src('src/**/*.png').pipe(dest('docs/'));
}

function copyVendorsJs() {
 return src([
 	'node_modules/jquery/dist/jquery.js',
 	'node_modules/jquery-ui-dist/jquery-ui.js'
 	])
 	.pipe(concat('vendors.js'))
  	.pipe(dest('docs/js'))
}

function buildIndexJs() {
 return src('src/**/*.js')
 	.pipe(concat('app.js'))
  	.pipe(dest('docs/js'))
}

function startSerwer(cd) {
 	browserSync.init({
      server: {
         baseDir: "./docs"
      }
   });
 	watch('src/**/*.js',series(buildIndexJs, reloadBrowser));
 	watch('src/**/*.css',series(buildIndexCss, reloadBrowser));
 	watch('src/**/*.html',series(copyIndexHtml, reloadBrowser));
  	cd()
}

function reloadBrowser(cd) {
	browserSync.reload();
	cd();
}

module.exports = {
	default: series(copyIndexHtml,buildIndexCss,copyVendorsCss,copyImage,copyVendorsJs,buildIndexJs,startSerwer),
	build: series(copyIndexHtml,buildIndexCss,copyVendorsCss,copyImage,copyVendorsJs,buildIndexJs)
}