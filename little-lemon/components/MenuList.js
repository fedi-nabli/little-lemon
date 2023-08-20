import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native'
import Search from './Search'
import menuData from '../utils/menuData'

function MenuList() {
  const [selectedCategories, setSelectedCategories] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [...new Set(menuData.menu.map(item => item.category))]
  const filteredMenu = menuData.menu.filter(item => {
    return (
      (selectedCategories.size === 0 || selectedCategories.has(item.category)) &&
      (searchTerm === '' || item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const toggleCategory = (category) => {
    const updatedCategories = new Set(selectedCategories)
    if (updatedCategories.has(category)) {
      updatedCategories.delete(category)
    } else {
      updatedCategories.add(category)
    }
    setSelectedCategories(updatedCategories)
  }

  const handleClear = () => {
    setSearchTerm('')
    setSelectedCategories(new Set())
  }

  return (
    <ScrollView contentContainerStyle={styles.menuList}>
      <Search onSearch={handleSearch} onClear={handleClear} />

      <View style={styles.deliveryTextContainer}>
        <Text style={styles.deliveryText}>Order for Delivery!</Text>
      </View>

      <ScrollView
        horizontal
        contentContainerStyle={styles.categories}
        showsHorizontalScrollIndicator={false}
      >
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.categoryButton,
              selectedCategories.has(cat) && styles.activeCategory
            ]}
            onPress={() => toggleCategory(cat)}
          >
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.line} />

      <View style={styles.menuItems}>
        {filteredMenu.map(item => (
          <View key={item.name} style={styles.menuItem}>
            <View style={styles.menuItemContent}>
              <View style={styles.menuItemText}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
                <Text style={styles.menuItemPrice}>${item.price.toFixed(2)}</Text>
              </View>
              <View style={styles.menuItemImageContainer}>
                <Image source={item.image} style={styles.menuItemImage} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  menuList: {
    padding: 16,
  },
  deliveryTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  deliveryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  categories: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eee',
    borderRadius: 20,
    marginHorizontal: 6,
  },
  activeCategory: {
    backgroundColor: '#f4ce14',
  },
  categoryText: {
    color: '#333',
    textTransform: 'uppercase',
  },
  menuItems: {
    marginTop: 16,
  },
  menuItem: {
    marginBottom: 16,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    flex: 2,
    marginRight: 16,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#495e57',
  },
  menuItemImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  menuItemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  }
})

export default MenuList