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

export class HomeworkDetail extends Component {
    //构造函数
    constructor(props) {
        super(props);
        // this.spinValue = new Animated.Value(0)
        this.state = {
            
            backgroundPic:'',//背景图片
            file_duration:10.0, //歌曲时间
            pause:false,     //播放/暂停
            currentTime:0.0, //当前时间
            sliderValue:1.0,
            duration:10.0,
            isplayBtn:require('./images/播放.png')  //播放暂停按钮背景图
        };
    }
    componentDidMount(){

        NetInfo.isConnected.fetch().done((isConnected) => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });
    }
    playAction = () =>{
        this.setState({
            pause:!this.state.pause
        })
        //判断按钮显示什么
        if(this.state.pause == true){
            this.setState({
                isplayBtn:require('./images/播放.png')
            })
        }else{
            this.setState({
                isplayBtn:require('./images/暂停.png')
            })
        }
    }
    //渲染
    render() {
        return (
            <View style={styles.container}>
                <View style ={styles.VideoView}>
                    <Video source={{ uri: 'http://www.ytmp3.cn/down/56158.mp3' }}
                        ref={(ref) => { this.player = ref }}
                        paused={this.state.paused}//暂停
                        onBuffer={this.onBuffer}
                        onError={this.videoError}
                        style={styles.backgroundVideo}
                    />
                    <View style = {styles.SliderView}>
                        <TouchableOpacity onPress={() => this.playAction()}>
                            <Image source={this.state.isplayBtn} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        <Text style={{marginLeft:10,marginRight:10}}>{this.state.currentTime}</Text>
                        {/*进度条*/}
                        <Slider
                            ref='slider'
                            style={{ width: (Dimensions.get('window').width-120) }}
                            value={this.state.sliderValue}
                            maximumValue={this.state.file_duration}
                            step={1}
                            minimumTrackTintColor='#FFDB42'
                            onValueChange={(value) => {
                                this.setState({
                                    currentTime: value
                                })
                            }
                            }
                            onSlidingComplete={(value) => {
                                // this.refs.player.seek(value)
                            }}
                        />
                        <Text style={{ marginLeft: 10, marginRight: 10 }}>{this.state.file_duration}</Text>
                    </View>
                    
                </View>
                
            </View>
        );
    }

    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    VideoView:{
        marginTop: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 200,
        backgroundColor:'#999',
        flexDirection: 'row',
        alignItems:'flex-end'
    },
    SliderView:{
        marginBottom: 10,
        marginLeft:10,
        marginRight:10,
        height:60,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'flex-end',
        backgroundColor:'white'
    }
});