"use strict";
const dirTree = require('directory-tree');
const fs = require('fs');

module.exports = (gulp, config) => {

  gulp.task('content', () => {

    //GenerateCcontent Tree JSON
    fs.writeFile('./tree.json', JSON.stringify( dirTree( config.contentRoot ) ));

    return gulp.src('./content/**/*')
      .pipe(gulp.dest('./dist/content'));
  });

  // gulp.task('remark', () => {
  //   return gulp.src('./content/**/*')
  //     .pipe(gulp.dest('./dist/content'));
  // });

};
