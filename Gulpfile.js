const path = require('path')
const gulp = require('gulp')
const gulpLoadPlugins = require('gulp-load-plugins')
const $ = gulpLoadPlugins()
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')


const PATHS = {
  js: path.resolve('./assets/js'),
  scss: path.resolve('./assets/scss'),
  public: path.resolve('./public'),
}

gulp.task('babel', () => {
  return browserify({ entries: PATHS.js + '/main.js', debug: true })
    .transform('babelify', { presets: ['latest'] })
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(gulp.dest(PATHS.public + '/js'))
})

gulp.task('scss', () => {
  return gulp.src(PATHS.scss + '/main.scss')
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.cssmin())
    .pipe($.rename({ suffix: '.min' }))
    .pipe(gulp.dest(PATHS.public + '/css/'))
})

/**
 * Runtimes
 */
gulp.task('default', ['babel', 'scss'])

gulp.task('watch', () => {
  gulp.watch(PATHS.js + '/**/**.js', ['babel'])
  gulp.watch(PATHS.scss + '/**/**.scss', ['scss'])
})
