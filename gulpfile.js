const {src, dest, series, watch} = require('gulp'); 
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
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
 return src([
 	'node_modules/bootstrap/dist/css/bootstrap.min.css',
 	'node_modules/@icon/bootstrap-icons/bootstrap-icons.css'
 	])
 .pipe(concat('vendors.css'))
 .pipe(dest('docs/css'))
}

function buildIndexJs() {
 return src('src/**/*.js')
 	.pipe(concat('app.js'))
 	.pipe(uglify())
 	.pipe(rename({ suffix: '.min' }))
  	.pipe(dest('docs/js'))
}

function copyVendorsJs() {
 return src([
 	'node_modules/jquery/dist/jquery.js',
 	'node_modules/jquery-ui-dist/jquery-ui.js'
 	])
 	.pipe(concat('vendors.js'))
  	.pipe(dest('docs/js'))
}

function copyBootstrapIcons() {
 return src([
 	'node_modules/@icon/bootstrap-icons/*.woff2',
 	'node_modules/@icon/bootstrap-icons/*.ttf',
 	'node_modules/@icon/bootstrap-icons/*.woff'
 	])
 .pipe(dest('docs/css'));
}

function copyJqueryIcons() {
 return src('src/**/*.png').pipe(dest('docs/'));
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
	default: series(copyIndexHtml,buildIndexCss,copyVendorsCss,copyJqueryIcons,copyBootstrapIcons,copyVendorsJs,buildIndexJs,startSerwer),
	build: series(copyIndexHtml,buildIndexCss,copyVendorsCss,copyJqueryIcons,copyBootstrapIcons,copyVendorsJs,buildIndexJs)
}