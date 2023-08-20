import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import logo from '../assets/logo.png'
import avatarImage from '../assets/blank_profile_photo.png'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const Header = () => {
  const route = useRoute() // Get the current route
  const navigation = useNavigation() // Get the navigation object

  const handleAvatarPress = () => {
    if (route.name === 'Home') {
      navigation.navigate('Profile') // Navigate to the Profile screen if on the Home screen
    }
  }

  const handleBackPress = () => {
    navigation.goBack() // Go back to the previous screen (HomeScreen)
  }

  return (
    <View style={styles.container}>
      {route.name === 'Profile' && (
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} color='#333' />
        </TouchableOpacity>
      )}
      <View style={styles.logoContainer}>
        <Image
          style={styles.headerImg}
          source={logo}
          resizeMode='contain'
          accessible={true}
          accessibilityLabel={'Little Lemon Logo'}
        />
      </View>
      {route.name === 'Home' && (
        <TouchableOpacity onPress={handleAvatarPress}>
          <Image style={styles.avatar} source={avatarImage} />
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerImg: {
    height: 50,
    width: 200,
    resizeMode: 'contain',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
})

export default Header