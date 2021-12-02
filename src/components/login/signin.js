import React, { Component ,createRef } from 'react';
import { View, Text, TextInput , TouchableOpacity , ScrollView , Platform} from 'react-native';
import { connect } from 'react-redux';
import { UpdateUrl } from '../../actions/updateURL';
import { Login , UserInfo } from "../../actions/userAction";
import NetInfo from "@react-native-community/netinfo";
import styles from '../../style/signin';
import globalStyles from '../../style/global';

let loginSuccess = false;
let loginFail = false;
let userInfoCheck = false;

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
          "grant_type": "password",
          "username": "",
          "password": ""
      },
      tenent: "",
      url: "",
      tenentSuffix: ".groovepacker.com",
      error_show: false,
      errorMessage: "",
      toggle: false
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.username = React.createRef();
    this.password = React.createRef();
  }

  validation = () => {
    let data = this.state.data
    let tenent = this.state.tenent
    if(data.username === "" || data.password === "" || tenent === "")
    {
      if(tenent === ""){
        this.setState({tenent_validate: true})
      }
      if(data.username === ""){
        this.setState({username_validate: true})
      }
      if(data.password === ""){
        this.setState({password_validate: true})
      }
    }
    else{
      return true;
    }
  }

  componentDidUpdate(){
    let state = this.state
    if(this.state.clickTime < this.props.login.time){
      if(loginSuccess === false && this.props.status === 200 && this.props.login.login === true ){
        loginSuccess = true
        this.props.UserInfo()
        userInfoCheck = true
      }
      if(loginFail === false && this.props.status === "" && this.props.login.login === false){
        loginFail = true
        this.setState({errorMessageShow: true , errorMessage: "Unable to log in. Please check your username and password" })
      }
    }

    if(userInfoCheck === true && this.props && this.props.userInfo && this.props.userInfo !== this.state.userInfo){
      userInfoCheck = false
      if(this.props.userInfo.is_active === false){
        this.setState({errorMessageShow: true , errorMessage: "The username is no longer active. Please contact your SuperAdmin." })
      }else{
        this.props.navigation.navigate("ScanPack")
      }
      this.props.UserInfo(false)
    }

  }

  InternetCheck = async(data) => {
    const connectionInfo = await NetInfo.fetch();
    if(connectionInfo.isConnected){
      this.props.Login(data)
      this.setState({clickTime: new Date()})
      loginSuccess = false
      loginFail = false
    }else{
      this.setState({errorMessageShow: true , errorMessage: "Please check your connection"})
    }
  }

  onSubmit = () => {
    let data = this.state.data
    if(this.validation() === true){
      if(Platform.OS === "web"){
        this.props.Login(data)
        this.setState({clickTime: new Date()})
        loginSuccess = false
        loginFail = false
      }else{
        this.InternetCheck(data)
      }
    }
  }

  onChange = (name ,value) => {
    let data = this.state.data;
    let tenent = this.state.tenent;
    let suffix = this.state.tenentSuffix
    if(name === "username"){
      data["username"] = value
      this.setState({username_validate: false})
    }
    if(name === "password"){
      data["password"] = value
      this.setState({password_validate: false})
    }
    if(name === "tenent"){
      this.setState({tenent: value , tenent_validate: false})
      tenent = value;
    }
    let urlDomain = suffix === ".groovepacker.com" ? ".groovepackerapi.com" : suffix 
    let url =  "https://" + tenent + urlDomain
    this.props.UpdateUrl(url)
    this.setState({data , errorMessageShow: false})
  }

  changeTenant = () => {
    let toggle = this.state.toggle;
    let tenentSuffix;
    this.setState({toggle: !this.state.toggle});
    if(toggle === true){
      tenentSuffix = ".groovepacker.com";
    } else {
      tenentSuffix = ".dreadheadsports.com";
    }
    this.setState({tenentSuffix});
    let urlDomain = tenentSuffix === ".groovepacker.com" ? ".groovepackerapi.com" : tenentSuffix 
    let url =  "https://" + this.state.tenent + urlDomain;
    this.props.UpdateUrl(url);
  }

  testFun = (data) => {
    let val = data*2
    return val
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.errorMessageShow &&
            <Text style={styles.error}>
                {this.state.errorMessage}
            </Text>
        }
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.m_30}>
              <View>
                <Text style={styles.labelText}>Tenent</Text>
                <TextInput placeholder="Type your tenent name"
                           name="tenent"
                           autoFocus={true}
                           onChangeText={(text) => {this.onChange("tenent", text)}}
                           style={styles.inputBox}
                           autoCapitalize = 'none'
                           onSubmitEditing={() => {this.username.current.focus()} }
                           />
                <TouchableOpacity onPress={this.changeTenant.bind(this)}>
                  <Text style={styles.tenentSuffix}>
                    {this.state.tenentSuffix === ".dreadheadsports.com" ? "Staging" : this.state.tenentSuffix}
                  </Text>
                </TouchableOpacity>
                {
                  this.state.tenent_validate &&
                    <Text style={styles.inputError}>
                        Field are require to submit
                    </Text>
                }
              </View>
              <View>
                <Text style={styles.labelText}>Username</Text>
                <TextInput placeholder="Type your name"
                           name="username"
                           ref={this.username}
                           onChangeText={(text) => {this.onChange("username", text)}}
                           style={[styles.inputBox, globalStyles.mb_5]}
                           autoCapitalize = 'none'
                           onSubmitEditing={() => {this.password.current.focus()}}
                           />
                {
                  this.state.username_validate &&
                    <Text style={styles.inputError}>
                        Field are require to submit
                    </Text>
                }
              </View>
              <View>
                <Text style={styles.labelText}>Password</Text>
                <TextInput placeholder="Type your password"
                           name="Password"
                           ref={this.password}
                           secureTextEntry
                           onChangeText={(text) => {this.onChange("password", text)}}
                           style={[styles.inputBox, globalStyles.mb_5]}
                           autoCapitalize = 'none'
                           onSubmitEditing={this.onSubmit}
                           />
                {
                  this.state.password_validate &&
                    <Text style={styles.inputError}>
                        Field are require to submit
                    </Text>
                }
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={this.onSubmit}>
                <Text style={styles.button}>
                   Login
                </Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={styles.button}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    updateUrl:  state.updateUrl.url,
    status: state.user.status,
    login: state.user,
    userInfo: state.user.userInfo
  }
};

const mapDispatchToProps = {
  UpdateUrl,
  Login,
  UserInfo
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
