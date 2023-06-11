import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');

  const calculateDiscount = () => {
    const discount = (originalPrice * discountPercent) / 100;
    const discountedPrice = originalPrice - discount;

    navigation.navigate('Result', {
      originalPrice,
      discountPercent,
      discountedPrice: discountedPrice.toFixed(2),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discount Calculator</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter original price"
        keyboardType="numeric"
        value={originalPrice}
        onChangeText={setOriginalPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter discount percentage"
        keyboardType="numeric"
        value={discountPercent}
        onChangeText={setDiscountPercent}
      />
      <TouchableOpacity style={styles.button} onPress={calculateDiscount}>
        <Text style={styles.buttonText}>Calculate Discount</Text>
      </TouchableOpacity>
    </View>
  );
};

const ResultScreen = ({ route, navigation }) => {
  const { originalPrice, discountPercent, discountedPrice } = route.params;

  const addToHistory = async () => {
    const historyItem = {
      originalPrice,
      discountPercent,
      discountedPrice,
    };

    try {
      const existingHistory = await AsyncStorage.getItem('history');
      let newHistory = [];

      if (existingHistory) {
        newHistory = JSON.parse(existingHistory);
      }

      newHistory.push(historyItem);
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.log('Error adding to history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Original Price: {originalPrice}</Text>
      <Text>Discount Percentage: {discountPercent}</Text>
      <Text>Discounted Price: {discountedPrice}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          await addToHistory();
          navigation.navigate('History');
        }}>
        <Text style={styles.buttonText}>View History</Text>
      </TouchableOpacity>
    </View>
  );
};

const HistoryScreen = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    retrieveHistory();
  }, []);

  const retrieveHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.log('Error retrieving history:', error);
    }
  };

  const deleteHistoryItem = async (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);

    try {
      await AsyncStorage.setItem('history', JSON.stringify(newHistory));
    } catch (error) {
      console.log('Error deleting history item:', error);
    }
  };

  const clearHistory = async () => {
    setHistory([]);

    try {
      await AsyncStorage.removeItem('history');
    } catch (error) {
      console.log('Error clearing history:', error);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  };

  const renderHistoryItem = ({ item, index }) => (
    <View style={styles.historyItem}>
      <Text>Original Price: {item.originalPrice}</Text>
      <Text>Discount Percentage: {item.discountPercent}</Text>
      <Text>Discounted Price: {item.discountedPrice}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteHistoryItem(index)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.historyList}
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHistoryItem}
      />
      <TouchableOpacity style={styles.button} onPress={clearHistory}>
        <Text style={styles.buttonText}>Clear History</Text>
      </TouchableOpacity>
    </View>
  );
};

const DiscountCalculator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="History" component={HistoryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyList: {
    width: '100%',
  },
  historyItem: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 3,
    marginTop: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default DiscountCalculator;
