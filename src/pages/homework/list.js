import React, { Component } from 'react';
import {
    View, Text, StyleSheet
} from 'react-native';
import { jump, init, refresh } from '../../router'
import { initRN } from '../../init';
export class HomeworkList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text onPress={() => jump('/homework/detail')}> jump to HomeworkDetail </Text>
                <Text onPress={() => jump('/homework/recode')}> jump to audioStemp </Text>
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