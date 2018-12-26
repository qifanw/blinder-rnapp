import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Platform,
    PermissionsAndroid,
    Image,
    TouchableOpacity
} from 'react-native';
import { RowFunc, Dialog, } from '../../components';
<<<<<<< HEAD
// import { AudioRecorder, AudioUtils } from 'react-native-audio';
import Camera from 'react-native-camera'
=======
import { AudioRecorder, AudioUtils } from 'react-native-audio';
// import { RNCamera } from 'react-native-camera';
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
>>>>>>> f2a8d32715b16e51620afe9264ce8cf5b2eaf29b
export class AudioExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraType: Camera.constants.Type.back,
            pictureUri:'',
            // currentTime: 0.0,
            // recording: false,
            // paused: false,
            // stoppedRecording: false,
            // finished: false,
            // audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac',
            // hasPermission: undefined,
        };
    }
    // prepareRecordingPath(audioPath) {
    //     AudioRecorder.prepareRecordingAtPath(audioPath, {
    //         SampleRate: 22050,
    //         Channels: 1,
    //         AudioQuality: "Low",
    //         AudioEncoding: "aac",
    //         AudioEncodingBitRate: 32000
    //     });
    // }

    // componentDidMount() {
    //     AudioRecorder.requestAuthorization().then((isAuthorised) => {
    //         this.setState({ hasPermission: isAuthorised });

    //         if (!isAuthorised) return;

    //         this.prepareRecordingPath(this.state.audioPath);

    //         AudioRecorder.onProgress = (data) => {
    //             this.setState({ currentTime: Math.floor(data.currentTime) });
    //         };

    //         AudioRecorder.onFinished = (data) => {
    //             // Android callback comes in the form of a promise instead.
    //             if (Platform.OS === 'ios') {
    //                 this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
    //             }
    //         };
    //     });
    // }

    // _renderButton(title, onPress, active) {
    //     var style = (active) ? styles.activeButtonText : styles.buttonText;

    //     return (
    //         <TouchableHighlight style={styles.button} onPress={onPress}>
    //             <Text style={style}>
    //                 {title}
    //             </Text>
    //         </TouchableHighlight>
    //     );
    // }

    // _renderPauseButton(onPress, active) {
    //     var style = (active) ? styles.activeButtonText : styles.buttonText;
    //     var title = this.state.paused ? "RESUME" : "PAUSE";
    //     return (
    //         <TouchableHighlight style={styles.button} onPress={onPress}>
    //             <Text style={style}>
    //                 {title}
    //             </Text>
    //         </TouchableHighlight>
    //     );
    // }

    // async _pause() {
    //     if (!this.state.recording) {
    //         console.warn('Can\'t pause, not recording!');
    //         return;
    //     }

    //     try {
    //         const filePath = await AudioRecorder.pauseRecording();
    //         this.setState({ paused: true });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _resume() {
    //     if (!this.state.paused) {
    //         console.warn('Can\'t resume, not paused!');
    //         return;
    //     }

    //     try {
    //         await AudioRecorder.resumeRecording();
    //         this.setState({ paused: false });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _stop() {
    //     if (!this.state.recording) {
    //         console.warn('Can\'t stop, not recording!');
    //         return;
    //     }

    //     this.setState({ stoppedRecording: true, recording: false, paused: false });

    //     try {
    //         const filePath = await AudioRecorder.stopRecording();

    //         if (Platform.OS === 'android') {
    //             this._finishRecording(true, filePath);
    //         }
    //         console.warn(filePath)
    //         return filePath;
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // async _play() {
    //     if (this.state.recording) {
    //         await this._stop();
    //     }
    //     console.warn(this.state.audioPath)
    //     this.setState({
    //         pause: !this.state.pause
    //     })
    // }

    // async _record() {
    //     if (this.state.recording) {
    //         console.warn('Already recording!');
    //         return;
    //     }

    //     if (!this.state.hasPermission) {
    //         console.warn('Can\'t record, no permission granted!');
    //         return;
    //     }

    //     if (this.state.stoppedRecording) {
    //         this.prepareRecordingPath(this.state.audioPath);
    //     }

    //     this.setState({ recording: true, paused: false });

    //     try {
    //         const filePath = await AudioRecorder.startRecording();
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    // _finishRecording(didSucceed, filePath, fileSize) {
    //     this.setState({ finished: didSucceed });
    //     console.log(`Finished recording of duration ${this.state.currentTime} seconds at path: ${filePath} and size of ${fileSize || 0} bytes`);
    // }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                    captureTarget={Camera.constants.CaptureTarget.disk}
                    type={this.state.cameraType}
                    style={styles.preview}
                    aspect={Camera.constants.Aspect.fill}>
                    <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
                </Camera>
                <Image source={{ uri: this.state.pictureUri }} style={{ width: 200, height: 150 }} />
                {/* <View style={styles.controls}>
                    {this._renderButton("RECORD", () => { this._record() }, this.state.recording)}
                    {this._renderButton("PLAY", () => { this._play() })}
                    {this._renderButton("STOP", () => { this._stop() })}
                    {/* {this._renderButton("PAUSE", () => {this._pause()} )} */}
                    {/* {this._renderPauseButton(() => { this.state.paused ? this._resume() : this._pause() })}
                    <Text style={styles.progressText}>{this.state.currentTime}s</Text>
                </View> */} 
            </View>
        );
    }

    //切换前后摄像头
    switchCamera() {
        var state = this.state;
        if (state.cameraType === Camera.constants.Type.back) {
            state.cameraType = Camera.constants.Type.front;
        } else {
            state.cameraType = Camera.constants.Type.back;
        }
        this.setState(state);
    }

    //拍摄照片
    
    takePicture() {
        const options = { quality: 0.5, base64: true }
        //options.location = ...
        this.camera.capture({ options })
            .then((data) => {
                console.warn(data.path)
                this.setState({
                    pictureUri: data.path
                })
            })
            .catch(err => console.error(err));
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#2b608a",
    },
    controls: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    progressText: {
        paddingTop: 50,
        fontSize: 50,
        color: "#fff"
    },
    button: {
        padding: 20
    },
    disabledButtonText: {
        color: '#eee'
    },
    buttonText: {
        fontSize: 20,
        color: "#fff"
    },
    activeButtonText: {
        fontSize: 20,
        color: "#B81F00"
    },
    backgroundVideo: {
        width: 375,
        height: 200
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
