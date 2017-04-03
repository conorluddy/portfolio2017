"use strict";
let gulp = require('gulp');
let webpack2 = require('webpack');
let webpackStream = require('webpack-stream');
let browserSync = require('browser-sync').create();
let modRewrite  = require('connect-modrewrite');

let config = {
  contentRoot: './content'
};

require('./gulp_modules/content.js')(gulp, config);
require('./gulp_modules/css.js')(gulp);
require('./gulp_modules/generate.js')(gulp);
require('./gulp_modules/documentation.js')(gulp);
require('./gulp_modules/js.js')(gulp);
require('./gulp_modules/images.js')(gulp);
require('./gulp_modules/fonts.js')(gulp);

/**
 * Default: Webpack, BrowserSync, Watch
 */
gulp.task('default', ['sass', 'images', 'fonts', 'content'], () => {
  gulp.src('./index.js')
    .pipe(webpackStream({
      watch: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 500
      },
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader?presets[]=es2015&presets[]=react'
          }
          // ,{
          //   test: /\.json$/,
          //   loader: 'json-loader'
          // }
        ]
      }
    }, webpack2
  )).pipe(gulp.dest('dist/'));

  browserSync.init({
      port: 6969,
      server: {
          baseDir: "./dist",
          middleware: [
              modRewrite([
                  '!\\.\\w+$ /index.html [L]'
              ])
          ]
      }
  });

  gulp.watch(['./index.js', './dist/*'], () => {
    browserSync.reload();
  });

  gulp.watch(['sass/**/*','components/**/*.scss'], () => {
    gulp.start('sass');
  });

  gulp.watch(['images/**/*'], () => {
    gulp.start('images');
  });

  gulp.watch(['content/**/*'], () => {
    gulp.start('content');
  });

});
