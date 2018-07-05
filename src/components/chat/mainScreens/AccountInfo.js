import React from 'react'
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import {Avatar, Text, Button} from 'react-native-elements'
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'react-native-firebase'
import {connect} from 'react-redux'
import {getUser} from '../../../store/actions'
import download from '../../download'

class AccountInfo extends React.Component {
  state = {
    change: false,
    displayName: '',
    loading: false,
  }

  signOut = () => {
    firebase.auth().signOut()
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

  setAvatar = async () => {
    const cloudUrl = await this.uploadAvatar()
    const localUrl = await download(cloudUrl)
    const userImageRef = firebase
      .database()
      .ref(`/Users/${this.props.user.uid}/img`)
    userImageRef.set(cloudUrl)
    this.props.getUser({img: localUrl})
  }

  uploadAvatar = () => {
    const ref = firebase
      .storage()
      .ref(`/Users/${this.props.user.uid}/avatar.jpg`)
    return new Promise((resolve, reject) => {
      ImagePicker.openPicker({multiple: false, mediaType: 'photo'}).then(
        images => {
          const metadata = {
            contentType: images.mime,
          }
          ref
            .putFile(images.sourceURL, metadata)
            .then(res => {
              if (res.state === 'success') resolve(res.downloadURL)
            })
            .catch(err => reject(err))
        },
      )
    })
  }

  exitNameChange = () => {
    this.setState({change: false})
  }

  render() {
    const user = this.props.user
    const img = user.img === 'default' ? user.default : user.img
    return (
      <View style={styles.accountContainer}>
        <TouchableWithoutFeedback onPress={this.exitNameChange}>
          <View style={styles.accountProfile}>
            <View>
              <View style={styles.accountAvatar}>
                <Avatar
                  rounded
                  xlarge
                  activeOpacity={0.7}
                  source={{
                    uri: img,
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.accountActions}>
          <View>
            <TouchableWithoutFeedback style={styles.accountContainer}>
              <View>
                {!this.state.change ? (
                  <Text
                    h4
                    style={{
                      textAlign: 'center',
                      fontFamily: 'Gill Sans',
                      color: '#20AAB2',
                    }}
                  >
                    {user.displayName}
                  </Text>
                ) : (
                  ''
                )}
              </View>
            </TouchableWithoutFeedback>
            {this.state.change ? (
              <View style={styles.accountButtons}>
                <View>
                  <TextInput
                    style={styles.changeName}
                    value={this.state.displayName}
                    maxLength={30}
                    autoFocus={true}
                    placeholder="Change your display name"
                    onChangeText={displayName => this.setState({displayName})}
                    onSubmitEditing={this.changeDisplayName}
                  />
                </View>
                <View>
                  <Button
                    title="Save"
                    onPress={this.changeDisplayName}
                    textStyle={{
                      fontSize: 14,
                    }}
                    buttonStyle={{
                      backgroundColor: '#20AAB2',
                      borderRadius: 8,
                      padding: 4,
                      marginTop: 20,
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={this.changeDisplayName}
                  disabled={!this.state.displayName.length}
                />
              </View>
            ) : (
              <Button
                buttonStyle={{
                  backgroundColor: 'transparent',
                  borderBottomColor: '#eee',
                  borderBottomWidth: 1,
                }}
                icon={{
                  name: 'address-card',
                  type: 'font-awesome',
                  color: '#006994',
                  size: 24,
                }}
                textStyle={{
                  fontSize: 20,
                }}
                title="Change display name"
                color="#006994"
                onPress={this.changeView}
              />
            )}
          </View>
          <View style={styles.upLoadAvatar}>
            <Button
              buttonStyle={{
                backgroundColor: 'transparent',
                borderBottomColor: '#eee',
                borderBottomWidth: 1,
              }}
              textStyle={{
                fontSize: 20,
              }}
              icon={{
                name: 'upload',
                type: 'font-awesome',
                color: '#006994',
                size: 24,
              }}
              title="Upload profile image"
              color="#006994"
              onPress={this.setAvatar}
            />
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
  getUser: user => dispatch(getUser(user)),
})

const styles = StyleSheet.create({
  accountContainer: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  accountProfile: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  accountAvatar: {
    marginTop: 10,
  },
  accountName: {
    color: '#fff',
  },
  accountActions: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  accountButtons: {
    flex: 1,
    flexDirection: 'row',
  },
  changeName: {
    borderBottomColor: '#aaa',
    borderBottomWidth: 1,
    fontSize: 20,
    marginTop: 20,
    textAlign: 'center',
    alignItems: 'flex-end',
    width: 210,
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AccountInfo)
