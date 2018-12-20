# 文件结构初始化
[[ -d dist ]] && rm -rf dist
[[ -d release ]] && rm -rf release

[[ ! -d node_modules ]] && npm install && npm run postinstall

mkdir dist
mkdir dist/android
mkdir dist/ios
mkdir release

# 变量声明初始化
platform=$1
[[ -z $platform ]] && platform="mingonghui"
buildnumber=$2

# 生成配置文件index.js
gulp set-config --platform $platform --buildnumber "$buildnumber"

# RN编译
react-native bundle --platform android --dev false  --entry-file $platform/index.android.js  --bundle-output dist/android/index.android.bundle --assets-dest dist/android
react-native bundle --platform ios --dev false  --entry-file $platform/index.ios.js  --bundle-output dist/ios/index.ios.bundle --assets-dest dist/ios

# 生成压缩包
gulp zip --platform $platform --buildnumber "$buildnumber"
