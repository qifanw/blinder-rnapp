import { StyleSheet, Platform, PixelRatio, Dimensions } from 'react-native';

const isIos = Platform.OS === 'ios';
const SW = Dimensions.get('window').width;

function getRealDP(designPx) {
    return PixelRatio.roundToNearestPixel(designPx / 3);
}

// 验证码输入组件样式
export default StyleSheet.create({
    // textInput样式
    textInput: {
        height: isIos ? 0 : getRealDP(1),
        width: SW,
        // position: 'absolute',
        bottom: 0,
        left: 0
    },
    // 验证码输入框总容器
    verifyContainer: {
        width: SW,
        height: getRealDP(150),
    },
    // 验证码带下划线输入格
    textInputItem: {
        width: getRealDP(120),
        borderBottomWidth: getRealDP(1),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#707070'
    },
    textInputItemIn: {
        width: getRealDP(120),
        borderBottomWidth: getRealDP(4),
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#707070'
    },
    // 输入验证码样式
    verifyText: {
        fontSize: getRealDP(72),
        color: '#707070'
    },
    // 验证码文本框容器
    verifyTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: SW,
        height: getRealDP(150),
        paddingHorizontal: getRealDP(40),
        position: 'absolute',
        left: 0,
        top: 0,
        paddingLeft: 70,
        paddingRight: 70,
    }
});