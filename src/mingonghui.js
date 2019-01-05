import React from 'react';
import { Router, Scene, Tabs, Stack, Actions } from 'react-native-router-flux';
import { StyleSheet, Text, Dimensions, View, Image, Alert } from 'react-native'
import { initRN } from './init'
import { NavScene, BackButton, Bla, RightButton, LeftButton, RightImage, Loading, Dialog } from './components'
import { getTitleStyle, getNavigationBarStyle } from './components/nav-scene'
import { color, font } from './common/standard'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
  Login, ClassAdministration, LoginCode, Setting, WorkTab, TeacherInformation, StudentInformation, PatriarchOneInformation,
  Mine, MineNews, MineNewsDetail, PatriarchTwoInformation,
  HomeworkList, HomeworkDetail, AudioExample,
  ClassList,
  ClassMember,
  ReleaseHomework,
} from './pages'
import { jump, pop, close, back, popTo, replace, reset } from './router';
import { getUserInfo } from './communication';
import { setItem, getItem } from './common/local-store';
import LocalStorage from './common/localstorage';
const instance = LocalStorage.getInstance();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      userPackage:{}
    }

    // RN初始化
    initRN(this.props).then(result => {
      console.log('==============', result)
      this.subscription = result;
    });
      // // 取出用户信息
    instance.getItem("userPackage").then(result =>{
      console.log("=====userPackage===getItem====result==", result)
      this.setState({
        userPackage: result,
      })
    })
  }
 
  componentDidMount() {
    getUserInfo().then(result => {
      this.setState(
        userInfo = result
      )
    })
  }
  componentWillUnmount() {
    this.subscription();
  }
  render() {
    console.log('========userPackage===render=', this.state.userPackage)
    const TabIcon = (props) => {
      return <View style={styles.tabView}>
        <Image source={props.focused ? props.activeImage : props.image} />
        <View style={{ height: 4 }}></View>
        <Text style={{ color: props.focused ? color.c6 : '#999', fontSize: font.f1 }}>{props.title}</Text>
      </View>
    };
    const customTabIcon = (props) => {
      return <View style={styles.coustomTabView}>
        <Image source={props.focused ? props.activeImage : props.image} resizeModel='contain' style={{ width: 80, height: 80, marginTop: 0, }} />
        <View style={{ height: 4 }}></View>
        <Text style={{ color: props.focused ? color.c6 : '#999', fontSize: font.f1 }}>{props.title}</Text>
      </View>
    };
    const onBackPress = () => {
      if (Actions.state.index !== 0) {
        return false
      }
      Actions.pop()
      return true
    }
    return (
      <Router>
        <Scene key="root" hideNavBar={true} panHandlers={null}
          backAndroidHandler={() => onBackPress()}
          transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}>
          <NavScene key="Bla" component={Bla} back={false} renderBackButton={false} />

          <NavScene key="home" component={Login} renderBackButton={false} hideNavBar={true} back={false} gesturesEnabled={false} />

          <Tabs
            // key={this.state.userInfo?'home':'tab'}
            key={this.state.userPackage? 'tab' : 'home'}
            lazy={true}
            // swipeEnabled
            showLabel={false}
            tabBarStyle={styles.tabBarStyle}
            tabBarPosition="bottom"
            activeBackgroundColor="white"
            inactiveBackgroundColor={color.c1}
          >
            {/* 首页 */}
            <Stack key="tab_first" title="作业中心" icon={TabIcon} image={require('./images/homecenter.png')} activeImage={require('./images/homecenter.png')}>
              <NavScene
                key="/home"
                component={HomeworkList}
                back={false}
                renderBackButton={false}
                titleStyle={[getTitleStyle(), { color: color.c1 }]}
                navigationBarStyle={[getNavigationBarStyle(), { backgroundColor: color.c6 }]}
                onEnter={() => { Actions.refresh({ __refreshType: `tabRefresh`, timestamp: new Date().getTime() }) }}
              />
            </Stack>
            {/* 班级列表 */}
            <Stack key="tab_second" title="班级" icon={TabIcon} image={require('./images/group.png')} activeImage={require('./images/group.png')}>
              <NavScene
                key="/classlist"
                component={ClassList}
                back={false}
                renderBackButton={false}
                titleStyle={[getTitleStyle(), { color: color.c1 }]}
                navigationBarStyle={[getNavigationBarStyle(), { backgroundColor: color.c6 }]}
                onEnter={() => { Actions.refresh({ __refreshType: `tabRefresh`, timestamp: new Date().getTime() }) }}
              />
            </Stack>
            {/* 发布作业*/ }
            <Stack key="tab_third" title="" icon={customTabIcon} image={require('./images/homework.png')} activeImage={require('./images/homework.png')}>
              <NavScene
                key="/homework/release"
                title="发布作业"
                component={ReleaseHomework}
                back={false}
                renderBackButton={false}
                titleStyle={[getTitleStyle(), { color: color.c1 }]}
                navigationBarStyle={[getNavigationBarStyle(), { backgroundColor: color.c6 }]}
                onEnter={() => { Actions.refresh({ __refreshType: `tabRefresh`, timestamp: new Date().getTime() }) }}
              />
            </Stack>
            {/* 聊天 */}
            <Stack key="tab_forth" title="聊天" icon={TabIcon} image={require('./images/message.png')} activeImage={require('./images/message.png')}>
              <NavScene
                key="/message"
                component={Mine}
                back={false}
                renderBackButton={false}
                titleStyle={[getTitleStyle(), { color: color.c1 }]}
                navigationBarStyle={[getNavigationBarStyle(), { backgroundColor: color.c6 }]}
                renderLeftButton={() => <LeftButton onPress={() => jump('/mine/organ/list')} text='机构管理' textStyle={{ color: color.c1, fontSize: font.f3 }} />}
                renderRightButton={props => <RightImage onPress={() => jump('/mine/news')} {...props} />}
                onEnter={() => { Actions.refresh({ __refreshType: `tabRefresh`, timestamp: new Date().getTime() }) }}
              />
            </Stack>
            {/* 我的 */}
            <Stack key="tab_fifth" title="我的" icon={TabIcon} image={require('./images/personcenter.png')} activeImage={require('./images/personcenter.png')}>
              <NavScene
                key="/mine"
                component={Mine}
                back={false}
                renderBackButton={false}
                titleStyle={[getTitleStyle(), { color: color.c1 }]}
                navigationBarStyle={[getNavigationBarStyle(), { backgroundColor: color.c6 }]}
                renderLeftButton={() => <LeftButton onPress={() => jump('/mine/organ/list')} text='机构管理' textStyle={{ color: color.c1, fontSize: font.f3 }} />}
                renderRightButton={props => <RightImage onPress={() => jump('/mine/news')} {...props} />}
                onEnter={() => { Actions.refresh({ __refreshType: `tabRefresh`, timestamp: new Date().getTime() }) }}
              />
            </Stack>
          </Tabs>
          <Stack key="scene_stack" transitionConfig={() => ({ screenInterpolator: CardStackStyleInterpolator.forHorizontal })}>
            {/* 栈底页面，直接退出 */}
            <NavScene key="Bla" component={Bla} back={false} renderBackButton={false} onEnter={props => pop(props)} />
            {/* 登录相关 */}
            <NavScene key="/login/login-code" component={LoginCode}    renderBackButton={false} hideNavBar={true} back={false} gesturesEnabled={false}/>
            {/* 老师  完善个人信息 */}
            <NavScene key="/login/TeacherInformation" component={TeacherInformation} renderBackButton={false} hideNavBar={true} back={false} gesturesEnabled={false} />
            {/* 学生  完善个人信息 */}
            <NavScene key="/login/StudentInformation" component={StudentInformation} renderBackButton={false} hideNavBar={true} back={false} gesturesEnabled={false} />
            {/* 家长  完善个人信息  */}
            <NavScene key="/login/PatriarchOneInformation" component={PatriarchOneInformation} renderBackButton={false} hideNavBar={true} back={false} gesturesEnabled={false} />
            <NavScene key="/login/PatriarchTwoInformation" component={PatriarchTwoInformation} />


            {/* 作业相关  WorkTab*/}
            <NavScene key="/homework/list" component={HomeworkList} title="作业列表" />
            <NavScene key="/homework/detail" component={HomeworkDetail} title="作业详情" />
            <NavScene key="/homework/WorkTab"  component={WorkTab} title="作业详情" />
            <NavScene key="/homework/recode" component={AudioExample} title="录音" />
            {/* 班级相关 */}
            {/* <NavScene key="/classes/list" component={ClassList} title="班级列表" /> */}
            <NavScene key="/class/administration" component={ClassAdministration} title="班级管理" />
            <NavScene key="/class/member" component={ClassMember} title={props => props.title} />
            {/* 我的 相关 */}
            <NavScene key="/mine/setting" component={Setting} title="设置" />

            {/* <NavScene key="/mine/account/detail" component={Setting} title="设置" />
            <NavScene key="/mine/account/birthplace" component={AccountBirthplace} title="籍贯" />
            <NavScene key="/mine/account/authentication" component={AccountAuthentication} title="身份认证" />
            <NavScene key="/mine/role" component={Role} title="我的角色" />
            <NavScene key="/mine/skill" component={Skill} title="我的工种" />
            <NavScene key="/mine/skill/choose" component={SkillChoose} title="我的工种" />
            <NavScene key="/mine/certificate/list" component={CertificateList} title="我的证书" />
            <NavScene key="/mine/contract/list" component={ContractList} title="我的合同" />
            <NavScene key="/mine/qrcode" component={QRCode} title="我的二维码" />
            <NavScene key="/mine/salarycard" component={SalaryCard} title="我的工资卡" />
            <NavScene key="/mine/salarycard/choose" component={SalaryCardChoose} title="选择工资卡" />
            <NavScene key="/mine/organ/list" component={ManageOrgan} title="管理机构" renderBackButton={props => <BackButton back={() => replace("/mine")} />} />
            <NavScene key="/mine/organ/register" component={OrganRegister} title="机构注册" renderBackButton={props => <BackButton back={() => pop()} />} />
            <NavScene key="/mine/organ/openAccount" component={OrganOpen} title="机构开户" />
            <NavScene key="/mine/organ/protocl" component={OrganProtocolList} title="协议列表" renderBackButton={props => <BackButton back={() => pop()} />} />
            <NavScene key="OpenResult" component={OpenResult} renderBackButton={props => <BackButton back={() => pop()} />} />
            <NavScene key="fourth" component={Fourth} title="fourth" />
            <NavScene key="fifth" component={Fifth} title="fifth" />
            <NavScene key="/worker/mineJobList" component={MyMineJobList} title="工作评价" />
            <NavScene key="/worker/workerSheet" component={WorkerSheet} title="工作记录" />
            <NavScene key="/mine/minegradeDetail" component={MineGradeDetail} title="评价详情" /> */}
          </Stack>
        </Scene>
      </Router>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: color.c1,
  },
  tabView: {
    alignItems: "center",
    justifyContent: "center"
  },
  coustomTabView: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: 80,
    height: 80,
    borderRadius: 40
  },
  text: {
    color: color["c2"],
    fontSize: font["f3"]
  }
});