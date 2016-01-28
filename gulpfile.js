var gulp     = require('gulp'),
    ts       = require('gulp-typescript'),
    less     = require('gulp-less'),
    path     = require('path'),
    htmlmin  = require('gulp-html-minifier'),
    concat   = require('gulp-concat'),
    uglify   = require('gulp-uglify'),
    flatten  = require('gulp-flatten');

gulp.task('default', [
    'minify-html',
    'copy-libs',
    'copy-assets',
    'less',
    'scripts'
]);

gulp.task('minify-html', function () {
    return gulp.src('./src/*.html')
               .pipe(htmlmin({collapseWhitespace: true}))
               .pipe(gulp.dest('./dist'))
});

gulp.task('less', function () {
  return gulp.src('./src/less/**/*.less')
             .pipe(less({
                paths: [ path.join(__dirname, 'less', 'includes') ]
             }))
             .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-libs', function () {
    return gulp.src(['node_modules/phaser/build/phaser.min.js'])
               .pipe(flatten())
               .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-assets', function() {
    return gulp.src('src/assets/**/*')
               .pipe(gulp.dest('dist/assets'));
});

gulp.task('scripts', function () {
    var tsProject = ts.createProject('tsconfig.json'),
        tsResult  = gulp.src('./src/typescript/**/*.ts')
                        .pipe(ts(tsProject));

    return tsResult.pipe(concat('game.js'))
                   .pipe(uglify())
                   .pipe(gulp.dest('dist/js'))
});

