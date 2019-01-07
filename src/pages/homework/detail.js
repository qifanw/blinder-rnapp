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
    ScrollView,
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
            isplayBtn: require('./images/暂停.png'),  //播放暂停按钮背景图
            rightPresent:'70%'
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
        const { duration,rightPresent } = this.state
        var rightPresentStr = rightPresent?'正确率：'+rightPresent:'正确率：'
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
                    <Image />
                    <Image />
                    <Image />
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
                <View style={{flexShrink:1}}>
                    <ScrollView>
                       <Text style={{ margin: 15,fontSize:16 }}>庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。 予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？ 若夫霪雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。 至若春和景明，波澜不惊，上下天光，一碧万顷；沙鸥翔集，锦鳞游泳；岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。 嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲；居庙堂之高则忧其民；处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎。噫！微斯人，吾谁与归？ 时六年九月十五日。</Text>
                    </ScrollView>
                </View>
                <View style = {{height:50,marginBottom:0,backgroundColor:color.c1,justifyContent:'center'}}>
                    <Text style={{ fontSize: 14, color: '#65C86D', marginLeft: 15 }}>{ rightPresentStr }</Text>
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