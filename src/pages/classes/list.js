import React, { Component } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
export class ClassList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text> ClassList </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});