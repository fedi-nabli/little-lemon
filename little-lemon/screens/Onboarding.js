import React, {useState} from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'

import { validateEmail } from '../utils'

const Onboarding = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require('../assets/little-lemon.png')}
        />
      </View>
      <View>
        <Text>Let us get to know you</Text>
        <View>
          <Text>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder='full name'
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
          />
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {}}
        >
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
  },
  image: {
    resizeMode: 'cover'
  }
})