import React, { Component } from 'react';
import {
  StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Dimensions, TouchableHighlight, Platform
} from 'react-native';
import { merge } from 'lodash'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import NativeSwiper from 'react-native-swiper';

export class Swiper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
  }

  setCurrentIndex(index) {
    this.setState({
      currentIndex: index
    });
  }

  getCurrentIndex() {
    return this.state.currentIndex;
  }

  render() {
    const { data, height, width, renderItem, onScrollToItem = () => {}, dotStyle = {}, activeDotStyle = {}, paginationStyle = {}, autoplay = true, autoplayDelay = 3000 } = this.props;

    let containerStyle = merge({...paginationStyle}, {
      top: paginationStyle.top ? height - 45 + paginationStyle.top : height - 45,
      left: paginationStyle.left ? -20 + paginationStyle.left : -20,
      position: 'absolute',
      flexDirection: "row",
      justifyContent: "flex-start",
      alignItems: "center",
      height: 70
    })

    return (
      <View style={{height: height, width: width}}>
          <View>
            <Carousel
              data={data}
              sliderWidth={width}
              sliderHeight={height}
              itemWidth={width}
              itemHeight={height}
              loop={true}
              enableSnap={true}
              autoplay={autoplay}
              autoplayDelay={autoplayDelay}
              renderItem={({item, index}) => renderItem(item)}
              onSnapToItem={index => {this.setCurrentIndex(index);onScrollToItem(data[index], index)}}
            />

            <Pagination
              dotsLength={data.length}
              activeDotIndex={this.state.currentIndex}
              containerStyle={containerStyle}
              dotElement={<View style={dotStyle} />}
              inactiveDotElement={<View style={activeDotStyle} />}
            />
          </View>

        {/* {
          Platform.OS == "android" && 
          <NativeSwiper 
            height={height}
            loop={true}
            autoplay={autoplay}
            autoplayTimeout={autoplayDelay/1000}
            paginationStyle={[paginationStyle, {right: 0}]} 
            dot={<View style={activeDotStyle} />} 
            activeDot={<View style={dotStyle} />}
            onMomentumScrollEnd={(e, state, context) => {this.setCurrentIndex(state.index);onScrollToItem(data[state.index], state.index)}}
          >
            { 
              data.map(item => renderItem(item))
            }
          </NativeSwiper>
        } */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pagination: {
    position: 'absolute',
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    height: 70
  }
});