import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { useFonts } from 'expo-font'

function Hero() {
  const [loaded] = useFonts({
    Markazi: require('../assets/fonts/MarkaziText-Regular.ttf'),
  })

  if (!loaded) {
    return null
  }

  return (
    <View style={styles.hero}>
      <View style={styles.heroBackground}>
        <Image source={require('../assets/restaurantfood.png')} style={styles.backgroundImage} />
        <View style={styles.overlay} />
      </View>
      <View style={styles.heroContent}>
        <Text style={styles.heroTitle}>Little Lemon</Text>
        <Text style={styles.heroSubtitle}>Chicago</Text>
        <Text style={styles.heroText}>
          We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  hero: {
    position: 'relative',
    overflow: 'hidden',
    height: 300,
  },
  heroBackground: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  heroContent: {
    position: 'absolute',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontFamily: 'Markazi',
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: 'Markazi',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#f4ce14',
    marginBottom: 16,
  },
  heroText: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  }
})

export default Hero