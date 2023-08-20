import React from 'react'
import { ScrollView, KeyboardAvoidingView, StyleSheet, Platform } from 'react-native'
import Header from '../components/Header'
import Hero from '../components/Hero'
import MenuList from '../components/MenuList'
import Footer from '../components/Footer'

const HomeScreen = () => {

  const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : null

  return (
    <KeyboardAvoidingView style={styles.container} behavior={keyboardBehavior} enabled>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        <Hero />
        <MenuList />
        <Footer />
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
})

export default HomeScreen