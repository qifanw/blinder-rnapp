import React, { Component } from 'react';
import {
  View, Text, StyleSheet, ScrollView, FlatList, Image, TouchableWithoutFeedback, Alert, Dimensions, RefreshControl
} from 'react-native';
import { gap, color, font } from '../../common/standard';
import { RowFunc, Dialog, Toast, Loading } from '../../components';
import { jump, jumpApp, jumpRNApp, refresh } from '../../router';
import { service, logger } from '../../services';
import { getUserInfo, ENV } from '../../communication'
import { formatMoney } from '../../common/format'
import Config from '../../config'



const mineService = service.$getMineService();
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      userInfo: {},
      roleInfo: {},
      workerKindArr: [],
      balance: "",
      isRefreshing: false

    }
  }

  _noFinishing() {
    Dialog.show('', '功能开发中...', [{ text: "确认", onPress: () => { } }]);
  }
  getData(checkRole) {
    getUserInfo().then(result => {
      console.log('----------+++---------------', result)
      let userInfo = result
      if (this.state.userInfo.userId == null) {
        var handle = Loading.show()
      }
      Promise.all([mineService.$getWokerInfo(userInfo.userId), mineService.$getBalance(userInfo.userId)]).then(result => {
        let [workerInfo, balance] = result;
        // console.log('-------------------------', result)
        if (balance.message.code == 0) {
          this.setState({
            balance: balance.data.balance ? balance.data.balance : (userInfo.accountStatus == 1 ? '0.00' : "--"),
          })

        } else {
          // Toast.show("服务器异常，请稍后重试");
        }
        if (workerInfo.message.code == 0) {
          if(checkRole == 'checkRole'){
            if (!workerInfo.data.role) {
              jump('/mine/role', { _back: false })
            }
          }
          
          this.setState({
            refreshing: true,
            roleInfo: workerInfo ? workerInfo.data : {},
            workerKindArr: workerInfo.data.workerKind ? workerInfo.data.workerKind : [],
            userInfo: userInfo || {},
          })
        } else {
          Toast.show("服务器异常，请稍后重试");
        }
        Loading.hide(handle)

      }).catch(err => {
        Loading.hide(handle)
        Toast.show("服务器异常，请稍后重试");
        // logger.error("react native mine error!", err.message);
      })
    })
  }


  getNewInfo() {
    this.setState({ isRefreshing: true });
    mineService.$getNewInfo().then(result => {
      this.setState({ isRefreshing: false })
      refresh({ sum: result.data.newInfoLines })
      console.log("新消息个数" + result.data.newInfoLines)
    })
  }

  componentWillReceiveProps(nextProps) {
  //   this.getNewInfo()
    
    // this.getData('noCheckRole')
    
  //   console.log('----------+++---------------111')
   }
  componentDidMount() {
    // this.getData('checkRole')
    // this.getNewInfo()
    // console.log('----------+++---------------222')
  }
  _bindingCardAction(userInfo) {
    // // jumpApp('/user/add-bank')
    // jumpApp('/user/qrCode-RN', {
    //   userId: userInfo.userId,
    //   accountStatus: userInfo.accountStatus,
    //   flag: '0'
    // })

  }
  _jumpQRcodeAction(userInfo) {
    if (userInfo.accountStatus != 1 || !userInfo.accountStatus) {
      Dialog.show('', '您还未进行实名，请先进行实名绑卡', [{ text: "知道了", onPress: () => this._bindingCardAction(userInfo) }]);
    } else {
      jump('/mine/qrcode', {
        userId: userInfo.userId,
        accountStatus: userInfo.accountStatus
      })
    }

  }
  render() {
    const { userInfo, roleInfo, workerKindArr, balance, workerInfo } = this.state;
    let roleStr = '';
    if (roleInfo.role == 1) {
      roleStr = '工人'
    } else if (roleInfo.role == 2) {
      roleStr = '项目管理员/出纳/班组长'
    } else {
      roleStr = '工人&建筑单位'
    }
    return (
      <View>
        <ScrollView
          refreshControl={
            <RefreshControl
              enabled={true}
              colors={['#ff0000', '#00ff00', '#0000ff', '#3ad564']}
              refreshing={this.state.isRefreshing}
              onRefresh={() => this.getNewInfo()}
            />
          }>

          <TopView name={userInfo.clientName} mobile={userInfo.mobile} imageUrl={roleInfo.headPortraitsUrl} userInfo={userInfo} workerInfo={roleInfo} />
          <View style={styles.subcontainer}>
            <RowFunc source={require('./images/ic_wdjs.png')} text="班級管理" onPress={() => jump('/class/administration')} />
            {/* jump('/mine/account/authentication') 身份认证待开发 */}
            {/* <RowFunc source={require('./images/ic_sfrz.png')} text="身份认证" onPress = {() =>  this._noFinishing()} desc=" 已认证" descStyle={styles.descstyle}/>  */}
            {roleInfo.role == 1 ? <RowFunc source={require('./images/ic_wdgz.png')} text="我的工种" onPress={() => jump('/mine/skill')} desc={workerKindArr.join(' ') ? '已选' : "未选"} descStyle={styles.descstyle} /> : null}
            {roleInfo.role == 1 ? <RowFunc source={require('./images/ic_wdzs.png')} text="我的证书" onPress={() => jump('/mine/certificate/list', { hasHeader: false, userId: userInfo.userId })} /> : null}
            {roleInfo.role == 1 ? <RowFunc source={require('./images/ic_wdxs.png')} text="我的协商" onPress={() => jump('/negotiate/list', { userId: userInfo.userId, roleId: 4 })} /> : null}
            <RowFunc source={require('./images/ic_wdgzxg.png')} text="登录验证码" onPress={() => jump('/login/login-code')} />
            {roleInfo.role == 1 ? <RowFunc source={require('./images/ic_wdht.png')} text="登录验证码" onPress={() => jump('/login/login-code')} /> : null}
            {roleInfo.role == 1 ? <RowFunc source={require('./images/ic_wdewm.png')} text="我的二维码" onPress={() => this._jumpQRcodeAction(userInfo)} hasBottomBorder={false} /> : null}
          </View>
          <View style={styles.subcontainer}>
            <RowFunc source={require('./images/ic_ye.png')} text="设置" onPress={() => jump('/mine/setting')} />
            <RowFunc source={require('./images/ic_wdyhk.png')} text="作业详情" onPress={() => jump('/homework/WorkTab')} />
            <RowFunc source={require('./images/ic_wdgzk.png')} text="我的工资卡" onPress={() => jump('/mine/salarycard')} />
            <RowFunc source={require('./images/ic_wdzd.png')} text="我的账单" onPress={() => jumpApp('/assets/order-record-list')} hasBottomBorder={false} />
          </View>
          <View style={styles.subcontainer}>
            <RowFunc source={require('./images/ic_xgdlsj.png')} text="修改登录手机号" onPress={() => jumpApp('/user/update-mobile')} />
            <RowFunc source={require('./images/ic_xgdlmm.png')} text="修改登录密码" onPress={() => jumpApp('/user/update-password')} />
            <RowFunc source={require('./images/ic_xgzfmm.png')} text="修改支付密码" onPress={() => jumpApp('/user/tradekey-manger')} />
            <RowFunc source={require('./images/ic_xgczmm.png')} text="修改操作密码" onPress={() => this._noFinishing()} hasBottomBorder={false} />
          </View>
          {
            ENV == "staging" &&
            <View style={styles.subcontainer}>
              <Text style={{ height: 50, lineHeight: 50, textAlign: "center", color: color.c2 }}>版本号：{Config.getConfig('version')}</Text>
            </View>
          }
        </ScrollView>

      </View>
    )
  }
}
class TopView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { name, mobile, imageUrl, userInfo, workerInfo } = this.props;

    return <View style={styles.topcontainer}>

      <View style={styles.topbgview}></View>

      <TouchableWithoutFeedback onPress={() => jump('/mine/account/detail', { userInfo: userInfo, workerInfo: workerInfo })}>
        <View style={styles.imagebgviewbtn}>
          <Image source={require('../../components/images/ic_ejjt.png')} style={{ marginRight: 10 }} />
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => jump('/mine/account/detail', { userInfo: userInfo, workerInfo: workerInfo })}>
        <View style={styles.imageview}>
          <Image source={require('./images/ic_tx_wd.png')}></Image>
          <Text style={[{ fontSize: font.f6 }, { color: color.c2 }, { marginTop: 20 }]}>{name || '--'}</Text>
          <Text style={[{ fontSize: font.f3 }, { color: color.c3 }, { marginTop: 10 }]}>{mobile || '--'}</Text>
        </View>
      </TouchableWithoutFeedback>



      {/* <View style = {styles.topbgview}>
      <View style = {styles.topview}></View>
        <TouchableWithoutFeedback style={{position: "absolute", }} onPress = {() =>  jump('/mine/account/detail',{ userInfo: userInfo , workerInfo: workerInfo })}>
          <View style = {styles.imagebgview}>
          </View>
        </TouchableWithoutFeedback>

        
      </View> */}

    </View>
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 10,
  },
  subcontainer: {
    marginTop: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: color['c1'],
  },
  topcontainer: {
    height: 175,
    backgroundColor: color['c17'],
  },
  topbgview: {
    height: 145,
    backgroundColor: color['c6'],
    width: this.window.width,
  },
  topview: {
    flex: 1,
    marginLeft: 15,
    marginTop: 50,
    backgroundColor: color['c1'],
  },

  imagebgviewbtn: {
    position: "absolute",
    top: 50,
    left: 15,
    width: Dimensions.get('window').width - 30,
    height: 125,
    backgroundColor: color['c1'],
    borderRadius: 10,
    justifyContent: "center",
    alignItems: 'flex-end'
  },
  imagebgview: {
    height: 125,
    backgroundColor: color['c1'],
    borderRadius: 10,
  },
  imageview: {
    height: 150,
    width: Dimensions.get('window').width,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,

  },
  descstyle: {
    color: color.c4
  }
});