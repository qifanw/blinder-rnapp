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
} from 'react-native';
import { RowFunc, Dialog,} from '../../components';
import Video from 'react-native-video';
// import { RNCamera } from 'react-native-camera';
// const PendingView = () => (
//     <View
//         style={{
//             flex: 1,
//             backgroundColor: 'lightgreen',
//             justifyContent: 'center',
//             alignItems: 'center',
//         }}
//     >
//         <Text>Waiting</Text>
//     </View>
// );
export class HomeworkDetail extends Component {
    //构造函数
    constructor(props) {
        super(props);
        // this.spinValue = new Animated.Value(0)
        this.state = {
            // cameraType: RNCamera.constants.Type.back
            // pictureUri:''
            backgroundPic:'',//背景图片
            file_duration:10.0, //歌曲时间
            pause:false,     //播放/暂停
            currentTime:0.0, //当前时间
            sliderValue:1.0,
            duration:10.0,
            isplayBtn:require('./images/播放.png')  //播放暂停按钮背景图
        };
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
                {/* <RNCamera
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    zoom={0.5}
                    // flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                >
                    {({ camera, status }) => {
                        if (status !== 'READY') return <PendingView />;
                        return (
                            <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => this.takePicture(camera)} style={styles.capture}>
                                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    }}
                </RNCamera>
                <Image source={{ uri: this.state.pictureUri }} style = {{width:200,height: 150}} /> */}
            </View>
        );
    }

    // //切换前后摄像头
    // switchCamera() {
    //     var state = this.state;
    //     if (state.cameraType === RNCamera.constants.Type.back) {
    //         state.cameraType = RNCamera.constants.Type.front;
    //     } else {
    //         state.cameraType = RNCamera.constants.Type.back;
    //     }
    //     this.setState(state);
    // }

    // //拍摄照片
    
    // takePicture = async function(camera) {
    //     const options = { quality: 0.01, base64: true, doNotSave:false}
    //     const data = await camera.takePictureAsync(options)
    //     Dialog.show('', "拍照成功！图片保存地址：\n" + data.uri, [{ text: "确认", onPress: () => { } }])
    //     this.setState({
    //         pictureUri: data.uri
    //     })
    //     // this.camera.capture(options)
    //     //     .then(function (data) {
    //     //         Dialog.show('',"拍照成功！图片保存地址：\n" + data.uri, [{ text: "确认", onPress: () => { } }])
    //     //     })
    //     //     .catch(err => console.error(err));
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
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