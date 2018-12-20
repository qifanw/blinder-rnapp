
 
import React, { Component } from 'react';
import { Platform, View, ActivityIndicator, Modal, Dimensions, TouchableOpacity } from 'react-native';
import RootSiblings from 'react-native-root-siblings';

export class Loading extends Component {
    constructor(props) {
        super(props);
    }
    
    static show() {
        return new RootSiblings(<LoadingView/>);
    }
 
    static hide = loading => {
        if (loading instanceof RootSiblings) {
            loading.destroy();
        }
    };

    render() {
        return (
            null
        );
    }
}

class LoadingView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // <Modal
            //     animationType={"none"}
            //     transparent={true}
            //     visible={true}
            //     onRequestClose={() => {}}
            // >
                // <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={{position: "absolute", width:Dimensions.get("window").width, height: Dimensions.get("window").height}} activeOpacity={1}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.5)', width: 100, height: 100, alignItems: 'center'}}>
                            <ActivityIndicator
                                animating={true}
                                color='white'
                                style={{
                                    marginTop: 20,
                                    width: 60,
                                    height: 60,
                                }}
                                size="large" />
                        </View>
                    </View>
                </TouchableOpacity>
            // </Modal>
        )
    }
}