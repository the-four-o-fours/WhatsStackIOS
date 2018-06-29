import React, {Component} from 'react'
import firebase from 'react-native-firebase'
import {FlatList, Text, StyleSheet, Image, View} from 'react-native'
import {ListItem, Avatar} from 'react-native-elements'

const fakeContacts = [
    {
      id: '1',
      text: 'Tacos',
      img: 'https://randomuser.me/api/portraits/men/47.jpg',
      dateLastMsg: '1/22/22',
    },
    {
      id: '2',
      text: 'Beer',
      img: 'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/86.png',
      dateLastMsg: '1/22/22',
    },
    {
      id: '3',
      text: 'Code',
      img: 'https://cdn.psychologytoday.com/sites/default/files/styles/image-article_inline_full/public/blogs/34554/2011/01/52987-43921.jpg?itok=1-Cfw5CD',
      dateLastMsg: '1/22/22',
    }
]

const extractKey = ({id}) => id

export default class NewChat extends Component{
    state = {
        sender: uid,
        reciever: null,

    }

    componentDidMount() {
        const {uid} = firebase.auth().currentUser
        this.setState({uid})
        this.listener()
      }
      renderItem = ({item}) => {
        return (
          <View>
            <ListItem
                roundAvatar
                title={`${item.text}`}
                subtitle={item.dateLastMsg}
                avatar={{ uri: item.img} }
                  
                onPress={() => {
                  console.log('You tapped a room!');
                }}
              
              /> 
          </View>
        )
      }
      render(){
         if(this.state.reciever === null) {
            return (
                <View >
                  
                  <FlatList
                    // style={styles.container}
                    data={fakeContacts}
                    renderItem={this.renderItem}
                    keyExtractor={extractKey}
                  />
                  </ View>
              )
         }
      }
}