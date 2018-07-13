/*eslint-env node */

/*
 * Variables declaration
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var eslint = require("gulp-eslint");
var jasmine = require("gulp-jasmine-phantom");


/*
 * Gulp functions
 */
// Function setting up Sass & Autoprefixer
gulp.task("styles", function () {
  gulp.src("sass/**/*.scss")      // Look for sass file in the sass directory and any potential sub-folders
    .pipe(sass().on("error", sass.logError))  // Convert the file(s) found in css
    .pipe(autoprefixer({          // Pipe autoprefixer
            browsers: ["last 2 versions"],
            cascade: false
        }))
    .pipe(gulp.dest("./css"))     // Save the converted file(s) in the css folder
    .pipe(browserSync.stream());
});




gulp.task("lint", function () {
  return gulp.src(["js/**/*.js"])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError());
});

gulp.task("tests", function () {
  gulp.src("tests/spec/extraSpec.js")
    .pipe(jasmine({
      integration: true,
      vendor: "js/**/*.js"
    }));
});


// Collection of the watch functions
// Ensure 'watch' is also called in the gilp.watch to ensure
// the watch is re-esatblished upon any change
gulp.task("watch", function() {
  // Setting up a 'watch' for 'styles' (css/sass)
  gulp.watch("sass/**/*.scss", gulp.parallel("styles", "watch"));
  // Setting up a 'watch' for 'lint' (js)
  gulp.watch("js/**/*.js", gulp.parallel("lint", "watch"));
});

// Default function called anytime the 'gulp' command is used alone in the
// command-prompt/terminal without specifying any function(s) after it
gulp.task("default", gulp.parallel("styles", "lint", "tests", "watch", function() {
  // Create a browser-sync object and initialize the server
  browserSync.init({
    server: "./"
  });
}));
