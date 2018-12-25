/**
 * Created by L on 18/5/8.
 */
const gulp = require('gulp');
const zip = require('gulp-zip');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const replace = require('gulp-replace');
const fs = require('fs');
const history = require('./history');
const distpath = './dist';
const releasepath = './release'
const config = {
  ios: {
    mingonghui: {
      zipname: 'ios.zip'
    }
  },
  android: {
    mingonghui: {
      zipname: 'android-rn.zip'
    }
  }
}

// 清除src/config/index.js, src/app.js
gulp.task('clear', function () {
  console.log('当前构建平台：' + gulp.env.platform);
  console.log('当前构建版本：' + gulp.env.buildnumber);
  return runSequence('clear-config')
});

gulp.task('clear-config', function() {
  return gulp.src(['src/config/index.js'])
    .pipe(clean());
})

// gulp环境变量初始化
gulp.task('set-env', function() {
  return runSequence('set-platform', 'set-buildnumber')
});

// 设置gulp打包平台
gulp.task('set-platform', function () {
  gulp.env.platform = gulp.env.platform || 'maojiuhui';
});

// 设置build_number
gulp.task('set-buildnumber', function() {
  gulp.env.buildnumber = gulp.env.buildnumber || '';
});

// 修改config配置文件
gulp.task('change-config', function () {
  return gulp.src('src/config/'+gulp.env.platform+'.js')
    .pipe(rename("index.js"))
    .pipe(replace(/version:\s*(\'|\")[1-9]\d*\.[0-9]\d*\.[0-9]\d*(\'|\")/g, `version: '${history[gulp.env.platform][0].version}${gulp.env.buildnumber ? '.' + gulp.env.buildnumber : ''}'`))
    .pipe(gulp.dest('src/config'));
});

// 生成info.json文件
gulp.task('generate-info', function() {
  let version = `${history[gulp.env.platform][0].version}${gulp.env.buildnumber ? '.' + gulp.env.buildnumber : ''}`;
  let jsonfile = JSON.stringify({version: version});
  fs.writeFileSync('dist/android/info.json', jsonfile)
  fs.writeFileSync('dist/ios/info.json', jsonfile)
  fs.writeFileSync(`release/${version}`, JSON.stringify(history[gulp.env.platform][0]))
});

// android包压缩
gulp.task('android-zip', function () {
  
  return gulp.src(`${distpath}/android/**/*`)
    .pipe(zip(config.android[gulp.env.platform].zipname))
    .pipe(gulp.dest(releasepath))
});

// ios包压缩
gulp.task('ios-zip', function () {
  return gulp.src(`${distpath}/ios/**/*`)
    .pipe(zip(config.ios[gulp.env.platform].zipname))
    .pipe(gulp.dest(releasepath))
});



gulp.task('set-config', function() {
  return runSequence('clear', 'set-env', 'change-config')
});

gulp.task('zip', ['set-env', 'generate-info', 'android-zip', 'ios-zip'])