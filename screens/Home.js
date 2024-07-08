import React, { useEffect, useState } from 'react';
import { Text, FlatList, Image, StyleSheet, ActivityIndicator, View ,TouchableOpacity} from 'react-native';
import { fetchProducts } from '../Api/timbuService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        console.log('Fetched Products:', data);
        console.log('Fetched Products items:', data.items);
        setProducts(data.items);
      } catch (err) {
        console.error('Error in getProducts:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading Please wait...</Text>
      </View>
    );
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.product}>
          <Image source={{ uri: `https://api.timbu.cloud/images/${item.photos[0].url}` }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.Price}>Price: R {item.current_price[0]['ZAR'][0]}</Text>
          <Text style={styles.name}>Description:</Text>
          <Text style={styles.description}>{item.description}</Text>
          <TouchableOpacity 
                style={styles.button}
                onPress={() => handlePress(item)}
              >
                <Text style={styles.buy}>Add to Cart</Text>
              </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  Price:{ 
    fontSize: 15,
    color: 'green',
    fontWeight: 'bold',
    marginTop: 5,
    width: 320,
   
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    fontSize: 16,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderWidth: 1,
    backgroundColor: 'green',
    borderRadius: 10,
    width: '100%',
    marginTop: 20,
  },
  buy: { 
    fontSize: 20,
    color: 'white',
    margin: 2,
    fontWeight: 'bold',
  },
  image: {
    width: 320,
    height: 320,
    borderRadius: 20,
  },
  description: {
    marginTop: 15,
    width: 320,
    fontSize: 13,
    fontWeight: 'bold',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 30,
  },
  product: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderColor: 'black',
    borderStyle: 'solid',
    margin: 4,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  name: {
    fontSize: 15,
    width: 320,
    fontWeight: 'bold',
    marginTop: 15,
  },
});

export default Home;
