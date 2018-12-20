/**
 * Created by yanqiu_ge on 2018/6/9.
 */
/**
 * Bootstrap of PickerTest
 */
import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
 // DatePickerIOS
} from 'react-native';

import Picker from 'react-native-picker';
import { gap, color, font } from '../common/standard';
export class DatePicked extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pickedDate: new Date(),
      dateText:'', //选择的日期转为文本
      dataValidTextStyle:'',
    }
  }

  _createDateData() {
    let date = [];
    for(let i=1970;i<2100;i++){
      let month = [];
      for(let j = 1;j<13;j++){
        let day = [];
        if(j === 2){
          for(let k=1;k<29;k++){
            day.push(k+'日');
          }
          //Leap day for years that are divisible by 4, such as 2000, 2004
          if(i%4 === 0){
            day.push(29+'日');
          }
        }
        else if(j in {1:1, 3:1, 5:1, 7:1, 8:1, 10:1, 12:1}){
          for(let k=1;k<32;k++){
            day.push(k+'日');
          }
        }
        else{
          for(let k=1;k<31;k++){
            day.push(k+'日');
          }
        }
        let _month = {};
        _month[j+'月'] = day;
        month.push(_month);
      }
      let _date = {};
      _date[i+'年'] = month;
      date.push(_date);
    }
    return date;
  }


 DateToStr(dateArry){

  let title = dateArry.toString();
  let reg=/[\u4E00-\u9FA5]/g;
  let result=title.replace(reg,'').split(',');

  let [ year,month,day]=result;
  if(day.length<=1){

    day ="0"+day;
  }

  if(month.length<=1){

    month="0"+month;
  }

   let last =[year, month, day].join('-');

  return last;
 }
  getValue(){
    return this.state.dateText;
  }
  _showDatePicker() {
    let { onPress=()=>{} ,onChange=()=>{} } =this.props;
    var date= new Date();
    var year = date.getFullYear()+'年';
    var month =date.getMonth()+1+"月";
    var date =date.getDate()+'日';
    Picker.init({
      pickerData: this._createDateData(),
      pickerFontColor: [255, 144 ,0, 1],
      pickerConfirmBtnText:'确定',
      pickerToolBarFontSize:16,
      pickerRowHeight:30,
      pickerCancelBtnText:'长期有效',
      pickerFontSize:20,
      pickerBg:[255,255,255,255],
      pickerToolBarBg:[255,255,255,255],
      pickerTitleText:'',
      selectedValue:[year,month,date],
      pickerFontFamily: '微软雅黑", "宋体", Arial, Helvetica, sans-serif',
      onPickerConfirm: (pickedValue, pickedIndex) => {
        let pickedValueStr = this.DateToStr(pickedValue);
        this.setState({
          pickedDate: pickedValueStr,
          dateText:pickedValueStr,
          onPickerCancel:false,
          dataValidTextStyle:{ color:color["c2"], fontSize: font["f6"]},
          choosed:'#111',
        });
      },
      onPickerCancel: (pickedValue, pickedIndex) => {
        this.setState({
          dateText:'长期有效',
          onPickerConfirm:false,
          dataValidTextStyle:{ color:color["c2"], fontSize: font["f6"]},
          choosed:'#111',
        });
      },
    });
    Picker.show();
  }
  _toggle() {
    Picker.toggle();
  }
  _isPickerShow(){
    let {isPickerShow} =this.props;
    Picker.isPickerShow(status => {
      alert(status);
    });
  }
  render() {
    let { style,dateText,onPress} =this.props;
    return (
      <View>
        <TouchableOpacity onPress={this._showDatePicker.bind(this)} activeOpacity={1}>
          <Text style ={this.state.dataValidTextStyle||style}>{this.state.dateText||dateText}</Text>
        </TouchableOpacity>
      </View>

    );
  }
};