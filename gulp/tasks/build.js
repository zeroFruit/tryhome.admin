const gulp = require('gulp');
const del = require('del');

gulp.task('deleteDistFolder', () => {
  return del('./dist/*');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], () => {
  let pathsToCopy = [
    './assets/html/index.html'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles']);
