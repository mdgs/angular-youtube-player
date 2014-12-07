// load all gulp tasks matching the `gulp*` pattern
require('matchdep')
    .filterDev(['gulp*']) //by default it loads the nearest package.json
    .forEach(function(module) {
        global[module.replace(/^gulp-/, '')] = require(module);
    });

gulp.task('clean', function () {
    return gulp.src('./build/*', {read: false})
        .pipe(clean());
});

gulp.task('jshint', function () {
    gulp.src(['app/scripts/**/*.js'])
        .pipe(jshint('config/.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['jshint'], function () {
    gulp.src(['app/scripts/**/*.js'])
        .pipe(concat('angularYoutubePlayer.js'))
        .pipe(gulp.dest('./build'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify({mangle: false})) //mangle should be false to keep angular dependency injections working properly
        .pipe(gulp.dest('./build'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['clean', 'scripts']);

gulp.task('demo', function () {
    gulp.src(['./build/**/*', './bower_components/angular/angular.js'])
        .pipe(gulp.dest('./demo/vendor/'));
});