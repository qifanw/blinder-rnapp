import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
    Animated,
    Slider,
    NetInfo,
} from 'react-native';
import Video from 'react-native-video';
import { gap, color, font } from '../../common/standard';
export class HomeworkDetail extends Component {
    //构造函数
    constructor(props) {
        super(props);
        // this.spinValue = new Animated.Value(0)
        this.state = {
            fileUrl: 'http://www.ytmp3.cn/down/56158.mp3',//文件地址
            backgroundPic: '',//背景图片
            paused: true,     //播放/暂停
            currentTime: 0.0, //当前时间
            sliderValue: 0.0,
            duration: 10.0,
            isplayBtn: require('./images/暂停.png')  //播放暂停按钮背景图
        };
    }
    componentDidMount() {
        this.setState({
            fileUrl: 'http://www.ytmp3.cn/down/56158.mp3',
            paused:false,
        })
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
    }
    playAction = () => {
        this.setState({
            paused: !this.state.paused
        })
        //判断按钮显示什么
        if (this.state.paused == true) {
            this.setState({
                isplayBtn: require('./images/暂停.png')
            })
        } else {
            this.setState({
                isplayBtn: require('./images/播放.png')
            })
        }
    }
    //把秒数转换为时间类型
    formatTime(time) {
        // 71s -> 01:11
        let min = Math.floor(time / 60)
        let second = time - min * 60
        min = min >= 10 ? min : '0' + min
        second = second >= 10 ? second + '' : '0' + second
        let timeStr = min + ':' + second
        let arr = timeStr.split('.')
        return arr[0]
    }

    onLoad = (data) => {
        this.setState({ duration: data.duration });
    }
    onEnd = () => {
        // this.player.seek(0)
        // this.setState({ paused: true });
    };
    //播放器每隔250ms调用一次
    onProgress = (data) => {
        let val = parseInt(data.currentTime)
        this.setState({
            sliderValue: val,
            currentTime: this.formatTime(data.currentTime)
        })
    }
    //渲染
    render() {
        const { duration } = this.state
        return (
            <View style={styles.container}>
                <View style={styles.VideoView}>
                    <Video source={{ uri: this.state.fileUrl }}
                        ref={(ref) => { this.player = ref }}
                        volume={1}
                        paused={this.state.paused}//暂停
                        onBuffer={this.onBuffer}
                        onError={this.videoError}
                        onLoad={this.onLoad}//加载媒体并准备播放时调用的回调函数。
                        onEnd={this.onEnd}//视频播放结束时的回调函数
                        onProgress={this.onProgress}//视频播放过程中每个间隔进度单位调用的回调函数
                        style={styles.backgroundVideo}
                        repeat={false}
                    />
                </View>
                <View style={styles.SliderView}>
                    <View style={{flexDirection:'row',marginLeft:15,marginRight:6,height:55,alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.playAction()}>
                            <Image source={this.state.isplayBtn} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>

                        {/*进度条*/}
                        <Slider
                            ref='slider'
                            style={{ width: (Dimensions.get('window').width - 90),marginLeft:10,marginTop:5 }}
                            value={this.state.sliderValue}
                            maximumValue={this.state.duration}
                            step={1}
                            minimumTrackImage={require('./images/矩形.png')}
                            maximumTrackImage={require('./images/矩形.png')}
                            thumbImage={require('./images/椭圆.png')}
                            thumbTintColor={color.c5}
                            onValueChange={(value) => {
                                this.setState({
                                    currentTime: value
                                })
                            }
                            }
                            onSlidingComplete={(value) => {
                                this.player.seek(value)
                            }}
                        />
                    </View>
                    <View style= {{flexDirection:'row-reverse'}}>
                        <Text style={{ marginRight: 10 }}>{this.state.currentTime}/{this.formatTime(duration)}</Text>
                    </View>

                </View>

            </View>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    VideoView: {
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 200,
        backgroundColor: '#999',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    SliderView: {
        margin: 10,
        height: 75,
        backgroundColor: 'white',
        borderRadius: 10,
    }
});