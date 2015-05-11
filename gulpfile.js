(function () {
    'use strict';

    var del = require('del');
    var path = require('path');
    var gulp = require('gulp');
    var sass = require('gulp-sass');
    var babel = require('gulp-babel');
    var sourcemaps = require('gulp-sourcemaps');

    var paths = {
        styles: {
            sass_files: [
                path.join(__dirname, 'app', 'styles', 'sass', '*.scss'),
                path.join(__dirname, 'app', 'styles', 'sass', '**', '*.scss')
            ],
            css_directory: path.join(__dirname, 'app', 'styles', 'css')
        },
        scripts: {
            files: [
                path.join(__dirname, 'app', 'scripts', 'core', '*.js'),
                path.join(__dirname, 'app', 'scripts', 'core', '**', '*.js')
            ],
            main: path.join(__dirname, 'app', 'scripts', 'core', 'main.js'),
            bundle: path.join(__dirname, 'app', 'scripts', 'bundle')
        }
    };

    // -----------------------------------------------------------------------

    gulp.task('sass', function () {
        del(paths.styles.css_directory, function () {
            gulp.src(paths.styles.sass_files)
                .pipe(sourcemaps.init())
                .pipe(sass().on('error', sass.logError))
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest(paths.styles.css_directory));
        });
    });

    gulp.task('es6', function () {
        del(paths.scripts.bundle, function () {
            gulp.src(paths.scripts.main)
                .pipe(sourcemaps.init())
                .pipe(babel())
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(paths.scripts.bundle));
        });
    });

    // -----------------------------------------------------------------------

    gulp.task('watch:styles', ['sass'], function () {
        gulp.watch(paths.styles.sass_files, ['sass']);
    });

    gulp.task('watch:scripts', ['es6'], function () {
        gulp.watch(paths.scripts.files, ['es6']);
    });

}());
