import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Header from '../components/Header'
import Footer from '../components/Footer'

const OnboardingScreen = ({ navigation }) => {
  const [name, setName] = useState('')
  const [nameError, setNameError] = useState('')
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      setName('')
      setEmail('')
      clearValidationErrors()
    }
  }, [isFocused])

  const clearValidationErrors = () => {
    setNameError('')
    setEmailError('')
  }

  const validateName = () => {
    if (!name) setNameError('Name is required')
    else setNameError('')
  }

  const validateEmail = () => {
    if (!email) setEmailError('Email is required')
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      setEmailError('Invalid email format')
    else setEmailError('')
  }

  const handleSave = async () => {
    try {
      validateName()
      validateEmail()

      if (name && email && !nameError && !emailError) {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify({
            name,
            email,
            orderStatuses: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false,
          })
        )
        navigation.navigate('Home')
      }
    } catch (error) {
      console.error('Error saving user info:', error)
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Header />
      <Text style={styles.paragraph}>Welcome! We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. Please register to continue.</Text>
      <View>
        <View style={styles.fieldContainer}>      
        <Text style={styles.label}>Name</Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={text => setName(text)}
          onBlur={validateName}
          style={styles.input}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            onBlur={validateEmail}
            style={styles.input}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        </View>
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save and Continue</Text>
        </Pressable>
      </View>
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
  paragraph: {
    fontSize: 18,
    margin: 12,
    textAlign: 'center',
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
  errorText: {
    color: 'red',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    fontWeight: 500,
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
  }
})

export default OnboardingScreen