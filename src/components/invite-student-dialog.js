
import React, { Component } from 'react';
import {
    ToolbarAndroid,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Modal,
    TouchableHighlight,
    Alert
} from 'react-native';
import { gap, color, font } from '../common/standard';
import RootSiblings from 'react-native-root-siblings';

const { width, height } = Dimensions.get('window');

export class DialogStudent extends Component {
    constructor(props) {
        super(props)
    }

    static show(title = "", code="", onPressInvite = {},onCopy={}) {
        this.handle = new RootSiblings(<DialogView title={title}  code={code} onPressInvite={onPressInvite} onCopy={onCopy} close={() => this.handle.destroy()} />);
        return this.handle;
    }

    static hide = dialog => {
        if (dialog instanceof RootSiblings) {
            dialog.destroy();
        }
    }

    render() {
        return null;
    }
}

class DialogView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { title, code, onPressInvite,onCopy, close } = this.props;
        return (
            //   <Modal
            //   animationType = 'fade'
            //   visible = {true}
            //   transparent = {true}
            //   onRequestClose = {() => {}} >
            <TouchableOpacity style={{ position: "absolute", width: Dimensions.get("window").width, height: Dimensions.get("window").height }} activeOpacity={1}>
                <TouchableHighlight style={styles.mask} >
                    <TouchableHighlight style={styles.backgroundView}>
                        <View>
                            <View style={styles.tipBackgroundView}>
                                {title ? <Text style={styles.tipTitle}> {title}</Text> : null}
                                {/* {content ? <Text style={styles.tipContent}>  {content} </Text> : null} */}
                            </View>
                            <View style={styles.buttonBackgroundView}>

                                <Text Text style={styles.Text1}>班级编号 :</Text>
                                <Text Text style={styles.Text2}>{code}</Text>
                                <TouchableOpacity  onPress={()=> onCopy()}>
                                    <Text Text style={styles.Text3}> 复制! </Text>
                                </TouchableOpacity>

                            </View>
                            <View style={styles.Text4}>
                                <Text style={styles.Text5}>复制班级编号进行分享</Text>
                                <Text style={styles.Text5}>让学生赶快加入到班级吧～</Text>
                            </View>
                            <View style={styles.buttonView}>
                            <TouchableOpacity onPress={() =>  close()}>
                            <Text Text style={styles.Text1}>取消</Text>
                            </TouchableOpacity>
                                <TouchableOpacity onPress={()=> onPressInvite()}>
                                    <Text Text style={styles.Text6}> 立即邀请 </Text>
                                </TouchableOpacity>
                            </View>
                            {/* {buttons.map(({ text, onPress = () => { } }, index) => {
                                return (
                                    <TouchableHighlight key={index} style={styles.buttonBackgroundView} underlayColor={color.c18} onPress={() => { close(); onPress(); }}>
                                        <Text style={styles.buttonText}>{text}</Text>
                                    </TouchableHighlight>
                                );
                            })} */}
                        </View>
                    </TouchableHighlight>
                </TouchableHighlight>
            </TouchableOpacity>
            //   </Modal>

        )
    }
}

const styles = StyleSheet.create({
    mask: {
        // justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width,
        height: height,
        marginLeft: 0,
        marginTop: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    backgroundView: {
        width: 250,
        backgroundColor: "#121212",
        borderRadius: 12
    },
    tipBackgroundView: {
        paddingTop: 10,
        paddingHorizontal: 15,
        // paddingBottom: 30,
        //  justifyContent: "center"
    },

    tipTitle: {
        // marginBottom: 20,
        // textAlign: "center",
        color: "#FFFFFF",
        fontSize: 16,
        borderColor: "#707070",
        borderBottomWidth: 0.5,
        paddingBottom: 10,
    },
    tipContent: {
        textAlign: "center",
        color: color['c2'],
        fontSize: font['f6'],

    },
    buttonBackgroundView: {
        // width: 250,
        // height: 44,
        paddingTop: 8,
        flexDirection: "row",
        //   backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: "#707070",
        // borderBottomWidth: 0.5,
        // borderRadius: 4
    },
    buttonView: {
        paddingTop:16,
        paddingBottom: 16,
        flexDirection: "row",
        justifyContent: 'space-around',
        alignItems: "center"
    },
    Text1: {
        fontSize: 12,
        color: "#fff"
    },
    Text5: {
        fontSize: 14,
        color: "#fff"
    },
    Text2: {
        fontSize: 12,
        color: "#fff",
        marginLeft: 10,
    },
    Text3: {
        padding: 4,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginLeft: 10,
        fontSize: 10,
        color: "#1D1D1D"
    },
    Text4: {
        paddingTop: 18,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text6: {
        padding: 6,
        borderRadius: 8,
        backgroundColor: '#fff',
        marginLeft: 10,
        fontSize: 10,
        color: "#1D1D1D"
    },
})