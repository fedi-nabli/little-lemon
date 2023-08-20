import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Footer = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        All rights reserved by &copy; Little Lemon 2023
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4CE14',
    marginBottom: 20,
    paddingVertical: 14
  },
  text: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center'
  }
})

export default Footer