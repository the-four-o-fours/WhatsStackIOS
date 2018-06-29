import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import TopNavigation, {
  IconTab,
  Badge,
} from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'


const styles = StyleSheet.create({
    conatiner: {
      flex: 1,
      backgroundColor: 'white',
      flexDirection: 'column',
    //   height: '100%'
    }
  })
  


export default class BottomNav extends React.Component {
  state = {
    activeTab: 'games',
  }

  tabs = [
    // {
    //   key: 'games',
    //   label: 'Games',
    //   barColor: '#388E3C',
    //   pressColor: 'rgba(255, 255, 255, 0.16)',
    //   icon: 'rocket',
    // },
    {
      key: 'movies-tv',
      label: '',
      barColor: '#00695C',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'bars',
    },
    {
      key: 'music',
      label: 'Music',
      barColor: '#6A1B9A',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'reddit-alien',
    },
 
    {
      key: 'newChat',
      label: 'newChat',
      barColor: '#1565C0',
      pressColor: 'rgba(255, 255, 255, 0.16)',
      icon: 'plus-square',
    },
  ]

  state = {
    activeTab: this.tabs[0].key,
  }

  renderIcon = icon => ({isActive}) => (
    <Icon size={24} color="white" name={icon} />
  )

  renderTab = ({tab, isActive}) => (
    <IconTab
      isActive={isActive}
      showBadge={tab.key === 'movies-tv'}
      renderBadge={() => <Badge>2</Badge>}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  )

  render() {
    return (
      <View >
       
        <TopNavigation
          tabs={this.tabs}
          activeTab={this.state.activeTab}
          onTabPress={newTab => this.setState({activeTab: newTab.key})}
          renderTab={this.renderTab}
          useLayoutAnimation
          style={{
            alignItems: 'flex-end',
          }}
        />
      </View>
    )
  }
}

