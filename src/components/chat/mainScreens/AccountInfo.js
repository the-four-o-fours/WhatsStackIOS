import React from 'react'
import {View, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {Avatar, Text, Button} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'

import download from '../../download'
import {getUser} from '../../../store/actions'

class AccountInfo extends React.Component {
  state = {
    change: false,
    displayName: ''
  }

  signOut = () => {
    firebase
      .auth()
      .signOut()
  }

  changeDisplayName = () => {
    const userRef = firebase
      .database()
      .ref(`/Users/${this.props.user.uid}/displayName`)
    userRef.set(this.state.displayName)
    this.setState({displayName: '', change: false})
  }

  changeView = () => {
    this.setState({change: true})
  }

  setAvatar = async() => {
    const cloudUrl = await this.uploadAvatar()
    const localUrl = await download(cloudUrl)
    this.props.getUser({img: localUrl})
  }

  uploadAvatar = () => {
    const ref = firebase
      .storage()
      .ref(`/Users/${this.props.user.uid}/avatar.jpg`)
    return new Promise((resolve, reject) => {
      ImagePicker
        .openPicker({multiple: false, mediaType: 'photo'})
        .then(images => {
          const metadata = {
            contentType: images.mime
          }
          ref
            .putFile(images.sourceURL, metadata)
            .then(res => {
              if (res.state === 'success') 
                resolve(res.downloadURL)
            })
            .catch(err => reject(err))
        })
    })
  }

  render() {
    const user = this.props.user
    return (

      <View style={styles.accountContainer}>
        <View style={styles.accountProfile}>
          {this.state.change
            ? (
              <View>
                <Text>Change your displayname:</Text>
                <TextInput
                  value={this.state.displayName}
                  maxLength={20}
                  onChangeText={displayName => this.setState({displayName})}
                  onSubmitEditing={this.changeDisplayName}/>
                <TouchableOpacity
                  onPress={this.changeDisplayName}
                  disabled={!this.state.displayName.length}>
                  <Text>Enter</Text>
                </TouchableOpacity>
              </View>
            )
            : (
              <View>
                <View style={styles.accountAvatar}>
                  <Avatar
                    rounded
                    large
                    activeOpacity={0.7}
                    source={{
                    uri: user.img
                  }}/>
                </View>
              </View>
            )}
        </View>
        <View style={styles.accountActions}>
          <View>
            <View style={styles.accountName}>
              <Text
                h4
                style={{
                textAlign: 'center',
                fontFamily: 'Gill Sans',
                color: '#20AAB2'
              }}>{user.displayName}</Text>
            </View>
            <Button
              buttonStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "#eee",
              borderBottomWidth: 1
            }}
              icon={{
              name: 'address-card',
              type: 'font-awesome',
              color: '#006994',
              size: 24
            }}
              textStyle={{
              fontSize: 20
            }}
              title='Change display name'
              color='#006994'
              onPress={this.changeView}/>
          </View>
          <View style={styles.upLoadAvatar}>
            <Button
              buttonStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "#eee",
              borderBottomWidth: 1
            }}
              textStyle={{
              fontSize: 20
            }}
              icon={{
              name: 'upload',
              type: 'font-awesome',
              color: '#006994',
              size: 24
            }}
              title='Upload profile image'
              color='#006994'
              onPress={this.setAvatar}/>
          </View>
          {/* <View style={styles.signOut}>
            <Button
              buttonStyle={{
              backgroundColor: "transparent",
              borderBottomColor: "#eee",
              borderBottomWidth: 1
            }}
              icon={{
              name: 'address-card',
              type: 'font-awesome',
              color: '#006994',
              size: 24
            }}
              title='signout'
              color='#006994'
              onPress={this.signOut}/>
          </View> */}
        </View>
      </View>

    )
  }
}

const mapStateToProps = state => ({user: state.user})

const mapDispatchToProps = dispatch => ({
  getUser: user => dispatch(getUser(user))
})

const styles = StyleSheet.create({
  accountContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: '40%'
  },
  accountProfile: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  accountAvatar: {
    margin: 5
  },
  accountName: {
    color: '#fff'
  },
  accountActions: {
    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'flex-start'
  }
})

export default connect(mapStateToProps, mapDispatchToProps,)(AccountInfo)
