/******************************************************
 * PATTERN LAB NODE
 * EDITION-NODE-GULP
 * The gulp wrapper around patternlab-node core, providing tasks to interact with the core library.
 ******************************************************/
const gulp = require('gulp');
const argv = require('minimist')(process.argv.slice(2));
const bulkSass = require('gulp-sass-bulk-import');
var sass = require('gulp-sass');

/******************************************************
 * PATTERN LAB  NODE WRAPPER TASKS with core library
 ******************************************************/
const config = require('./patternlab-config.json');
const patternlab = require('@pattern-lab/patternlab-node')(config);

function build() {
  return patternlab
    .build({
      watch: argv.watch,
      cleanPublic: config.cleanPublic
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

function serve() {
  return patternlab
    .serve({
      cleanPublic: config.cleanPublic
    })
    .then(() => {
      // do something else when this promise resolves
    });
}

gulp.task('patternlab:version', function() {
  patternlab.version();
});

gulp.task('patternlab:help', function() {
  patternlab.help();
});

gulp.task('patternlab:patternsonly', function() {
  patternlab.patternsonly(config.cleanPublic);
});

gulp.task('patternlab:liststarterkits', function() {
  patternlab.liststarterkits();
});

gulp.task('patternlab:loadstarterkit', function() {
  patternlab.loadstarterkit(argv.kit, argv.clean);
});

gulp.task('patternlab:build', function() {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', function() {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:build', ['compilesass'], function() {
  build().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:serve', ['compilesass'], function() {
  serve().then(() => {
    // do something else when this promise resolves
  });
});

gulp.task('patternlab:installplugin', function() {
  patternlab.installplugin(argv.plugin);
});

gulp.task('default', ['patternlab:help']);

// SASS Compilation
gulp.task('compilesass', function() {
  const sassOptions = {
    includePaths: [config.paths.source.scss] // set any additional directories to use when @import statements are found in our sass files
  };

  return gulp
    .src('source/scss/app.scss')
    .pipe(bulkSass())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(gulp.dest('public/styles'));
});

gulp.task('manualReload', function() {
  return patternlab.server.reload();
});

gulp.watch(['source/scss/**/*.scss'], ['compilesass', 'manualReload']);
