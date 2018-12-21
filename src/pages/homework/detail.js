import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import { RowFunc, Dialog,} from '../../components';
import { RNCamera } from 'react-native-camera';
const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Text>Waiting</Text>
    </View>
);
export class HomeworkDetail extends Component {
    //构造函数
    constructor(props) {
        super(props);
        this.state = {
            // cameraType: RNCamera.constants.Type.back
            pictureUri:''
        };
    }

    //渲染
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
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
                <Image source={{ uri: this.state.pictureUri }} style = {{width:200,height: 150}} />
            </View>
        );
    }

    //切换前后摄像头
    switchCamera() {
        var state = this.state;
        if (state.cameraType === RNCamera.constants.Type.back) {
            state.cameraType = RNCamera.constants.Type.front;
        } else {
            state.cameraType = RNCamera.constants.Type.back;
        }
        this.setState(state);
    }

    //拍摄照片
    
    takePicture = async function(camera) {
        const options = { quality: 0.01, base64: true, doNotSave:false}
        const data = await camera.takePictureAsync(options)
        Dialog.show('', "拍照成功！图片保存地址：\n" + data.uri, [{ text: "确认", onPress: () => { } }])
        this.setState({
            pictureUri: data.uri
        })
        // this.camera.capture(options)
        //     .then(function (data) {
        //         Dialog.show('',"拍照成功！图片保存地址：\n" + data.uri, [{ text: "确认", onPress: () => { } }])
        //     })
        //     .catch(err => console.error(err));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
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
});