import React, { useState } from 'react'
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'

function Search({ onSearch, onClear }) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = () => {
    onSearch(searchTerm)
  }

  const handleClear = () => {
    setSearchTerm('')
    onClear()
  }

  const handleInputSubmit = () => {
    handleSearch()
  }

  return (
    <View style={styles.search}>
      <TextInput
        style={styles.input}
        placeholder="Search Menu"
        value={searchTerm}
        onChangeText={(text) => setSearchTerm(text)}
        onSubmitEditing={handleInputSubmit} // Handle Enter/Return key press
      />
      <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
        <FontAwesomeIcon icon={faSearch} size={20} color="#333" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={handleClear}>
        <FontAwesomeIcon icon={faTimes} size={20} color="#333" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 5,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  iconButton: {
    padding: 10,
  }
})

export default Search