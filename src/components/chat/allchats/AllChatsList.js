import React, {Component} from 'react'
import {FlatList, Text, StyleSheet} from 'react-native'
import {connect} from 'react-redux'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})

// const signOut = () => {   firebase     .auth()     .signOut() } const
// extractKey = ({id}) => id
class AllChatView extends Component {
  state = {
    conversations: []
  }

  render() {
    console.log('!!!!', this.props.user)
    return (
      <Text>Hello!</Text>
    )
  }

  // renderItem = ({item}) => {   return (     <View>       <ListItem roundAvatar
  //       title={`${item.text}`} subtitle={item.dateLastMsg}         avatar={{
  //    uri: item.img       }}        onPress={() => {         console.log('You
  // tapped a room!')       }}      onLongPress={() => {         console.log('Long
  // press show drawer') }}/>     </View>   ) } render() {   return (     <View
  // style={styles.container}>       <Button title="Sign Out" color="red"
  // onPress={signOut}/>       <FlatList data={rows} renderItem={this.renderItem}
  // keyExtractor={extractKey}/>     </View>   ) }
}

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(AllChatView)