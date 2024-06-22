import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-paper';
import { CartContext } from './CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Cart</Text>
      </View>
      {cart.length > 0 ? (
        cart.map((book, index) => (
          <Card key={index} style={styles.card}>
            <Card.Cover source={{ uri: book.cover_image }} style={styles.image} />
            <Card.Content>
              <Text style={styles.cardTitle}>{book.title}</Text>
              <Text style={styles.cardText}>Author: {book.author}</Text>
              <Text style={styles.cardText}>
                Publication Year: {book.publication_year}
              </Text>
            </Card.Content>
          </Card>
        ))
      ) : (
        <Text style={styles.emptyCartText}>Your cart is empty.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  card: {
    marginBottom: 10,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  emptyCartText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Cart;
