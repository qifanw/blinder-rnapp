import React, { Component } from 'react';
import {
  Image, TouchableOpacity
} from 'react-native';
import { back as backFunc} from '../router'

export class BackButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const { back =  backFunc} = this.props;
    
    return (
      <TouchableOpacity onPress={() => back()}>
        <Image source={require('./images/ic_dhfh.png')} style={{marginLeft: 15}}/>
      </TouchableOpacity>
    )
  }
}
