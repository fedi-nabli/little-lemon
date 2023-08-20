import React, { useState, useEffect } from 'react'
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import Checkbox from 'expo-checkbox'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [orderStatus, setOrderStatus] = useState(false)
  const [passwordChanges, setPasswordChanges] = useState(false)
  const [specialOffers, setSpecialOffers] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        // Fetch user info from AsyncStorage
        const userInfo = await AsyncStorage.getItem('userInfo')
        if (userInfo) {
          const parsedUserInfo = JSON.parse(userInfo)
          setName(parsedUserInfo.name)
          setEmail(parsedUserInfo.email)
          setOrderStatus(parsedUserInfo.orderStatus === 'true')
          setPasswordChanges(parsedUserInfo.passwordChanges === 'true')
          setSpecialOffers(parsedUserInfo.specialOffers === 'true')
          setNewsletter(parsedUserInfo.newsletter === 'true')
        }
      } catch (error) {
        console.error('Error fetching user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.match(emailRegex)) {
      setEmailError('Invalid email format')
    } else {
      setEmailError('')
    }
  }

  const handleSave = async () => {
    if (emailError) {
      return
    }

    try {
      // Convert boolean to string before saving
      await AsyncStorage.setItem('userInfo', JSON.stringify({
        name,
        email,
        orderStatus: orderStatus.toString(),
        passwordChanges: passwordChanges.toString(),
        specialOffers: specialOffers.toString(),
        newsletter: newsletter.toString(),
      }))
      setMessage('Information saved successfully.')
    } catch (error) {
      console.error('Error saving user info:', error)
    }
  }

  const handleExit = () => {
    setMessage('')
    navigation.navigate('Home')
  }

  const handleLogout = async () => {
    try {
      // Clear all stored data in AsyncStorage
      await AsyncStorage.clear()
      // Remove Message
      setMessage('')
      // Navigate to OnboardingScreen
      navigation.navigate('Onboarding')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header />
      <View>
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder='Name'
          value={name}
          onChangeText={text => setName(text)}
          style={styles.input}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          placeholder='Email'
          value={email}
          onChangeText={text => setEmail(text)}
          onBlur={validateEmail}
          style={styles.input}
          keyboardType='email-address'
        />
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}
        <Text style={styles.label}>Notifications</Text>
        <View style={styles.checkboxSection}>
          <Checkbox
            style={styles.checkbox}
            value={orderStatus}
            onValueChange={() => setOrderStatus(!orderStatus)}
            color={orderStatus ? '#f4ce14' : undefined}
          />
          <Text style={styles.paragraph}>Order Status</Text>
        </View>
        <View style={styles.checkboxSection}>
          <Checkbox
            style={styles.checkbox}
            value={passwordChanges}
            onValueChange={() => setPasswordChanges(!passwordChanges)}
            color={passwordChanges ? '#f4ce14' : undefined}
          />
          <Text style={styles.paragraph}>Password Changes</Text>
        </View>
        <View style={styles.checkboxSection}>
          <Checkbox
            style={styles.checkbox}
            value={specialOffers}
            onValueChange={() => setSpecialOffers(!specialOffers)}
            color={specialOffers ? '#f4ce14' : undefined}
          />
          <Text style={styles.paragraph}>Special Offers</Text>
        </View>
        <View style={styles.checkboxSection}>
          <Checkbox
            style={styles.checkbox}
            value={newsletter}
            onValueChange={() => setNewsletter(!newsletter)}
            color={newsletter ? '#f4ce14' : undefined}
          />
          <Text style={styles.paragraph}>Newsletters</Text>
        </View>
      </View>
      <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
      </Pressable>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleExit}>
            <Text style={styles.buttonText}>Exit</Text>
        </Pressable>
      </View>
      <Text style={styles.messageText}>{message}</Text>
      <Footer />
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  label: {
    fontWeight: 500,
    marginLeft: 12,
    marginRight: 12,
  },
  checkboxSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    margin: 12,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    elevation: 3,
    borderRadius: 10,
    padding: 10,
    marginLeft: 12,
    marginRight: 12,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',
  },
  messageText: {
    textAlign: 'center',
    color: 'green',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    fontWeight: 500,
  },
})

export default ProfileScreen