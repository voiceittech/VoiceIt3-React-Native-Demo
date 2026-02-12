import {NativeModules} from 'react-native';
import React, {Component} from 'react';
import {TouchableOpacity,StyleSheet, Image, Text, View} from 'react-native';
import logo from "./res/logo.png";

const voiceItModule = NativeModules.Voiceit;
const options = {
  user_id: "USER_ID_HERE",
  group_id: "GROUP_ID_HERE",
  content_language: "CONTENT_LANGUAGE_HERE",
  phrase: "PHRASE",
  apiKey: "API_KEY_HERE",
  apiToken: "API_TOKEN_HERE"
  };

export default class App extends Component{
  constructor () {
    super();
    this.state = {
      index: 0
    }
  }
  componentDidMount() {
    voiceItModule.initVoiceIt(options.apiKey, options.apiToken, (response)=>{
      //
    });
  }
  render() {
    return(
      <View style={styles.container}>
      <Image resizeMode='contain' style={styles.image} source={logo}/>
      <View style={styles.buttonPanel}>
      <TouchableOpacity
        activeOpacity = {.65}
        style={this.state.index == 0 ? styles.selectedPanel : styles.unselectedPanel}
        onPress={()=>{this.setState({ index: 0});}}>
       <Text style={{color:'#000000'}}>Voice</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity = {.65}
        style={this.state.index == 1 ? styles.selectedPanel : styles.unselectedPanel}
        onPress={()=>{this.setState({ index: 1});}}>
       <Text style={{color:'#000000'}}>Face</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity = {.65}
        style={this.state.index == 2 ? styles.selectedPanel : styles.unselectedPanel}
        onPress={()=>{this.setState({ index: 2});}}>
       <Text style={{color:'#000000'}}>Video</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.action}>
      <Action index={this.state.index}></Action>
      </View>
      </View>
    );
  }
}

 class Action extends Component {
  enrollVoice(callback){
    voiceItModule.encapsulatedVoiceEnrollment(options.user_id,options.content_language, options.phrase,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  verifyVoice(callback){
    voiceItModule.encapsulatedVoiceVerification(options.user_id,options.content_language, options.phrase,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  enrollFace(callback){
      voiceItModule.encapsulatedFaceEnrollment(options.user_id,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  verifyFace(callback){
      voiceItModule.encapsulatedFaceVerification(options.user_id,options.content_language,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  enrollVideo(callback){
    voiceItModule.encapsulatedVideoEnrollment(options.user_id,options.content_language, options.phrase,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  verifyVideo(callback){
    voiceItModule.encapsulatedVideoVerification(options.user_id,options.content_language, options.phrase,
      (successResponse)=>{callback(successResponse);},
      (failureResponse)=>{callback(failureResponse);}
    );
  }
  resolveEnrollment(index, callback){
    if (index == 0){
      this.enrollVoice((res)=>{callback(res);});
    } else if (index == 1){
      this.enrollFace((res)=>{callback(res);});
    } else {
      this.enrollVideo((res)=>{callback(res);});
    }
  }
  resolveVerification(index, callback){
    if (index == 0){
      this.verifyVoice((res)=>{callback(res);});
    } else if (index == 1){
      this.verifyFace((res)=>{callback(res);});
    } else {
      this.verifyVideo((res)=>{callback(res);});
    }
  }
  render() {
  return (
    <View>
      <View>
        <TouchableOpacity
          activeOpacity = {.5}
          style={[styles.button]}
          onPress={() => this.resolveEnrollment(this.props.index, (res)=>{console.log(res);})}
          >
         <Text style={{color:'#000000'}}>Enrollment</Text>
        </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            activeOpacity = {.5}
            style={[styles.button]}
            onPress={() => this.resolveVerification(this.props.index, (res)=>{console.log(res);})}
            >
           <Text style={{color:'#000000'}}>Verification</Text>
          </TouchableOpacity>
          </View>
      </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#494949",
    justifyContent: "center",
    marginTop: -100
  },
  holder: {
    flexWrap:'wrap',
    flex: 1,
    alignItems: 'center',
    backgroundColor: "#494949",
    justifyContent: "center",
    marginTop: -100,
    flexDirection: "row"
  },
  action: {
    margin:20
  },
  button: {
    borderRadius: 7,
    borderColor: '#eeeeee',
    padding: 13,
    alignItems: 'center',
    margin: 7,
    backgroundColor: '#eeeeee'
  },
  selectedPanel:{
    paddingHorizontal:25,
    paddingVertical: 15,
    backgroundColor: "rgba(238,238,238,0.65)"
  },
  unselectedPanel:{
    paddingHorizontal:25,
    paddingVertical: 15,
    backgroundColor: "rgb(238,238,238)"
  },
  buttonPanel: {
    flexDirection: "row",
    marginTop: 10
  },
  image: {
    width: '75%',
    height: '20%'
  }
});
