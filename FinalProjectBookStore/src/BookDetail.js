import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Divider, Button } from 'react-native-paper';
import axios from 'axios';
import { CartContext } from './CartContext';

const BookDetail = ({ route }) => {
  const { id } = route.params;
  const [book, setBook] = useState(null);
  const { addToCart } = useContext(CartContext);
  const comments = [
    {
      id: 1,
      name: 'John Doe',
      date: 'June 20, 2024',
      text: 'Great book, loved it!',
    },
    {
      id: 2,
      name: 'Jane Smith',
      date: 'June 21, 2024',
      text: 'Interesting read, highly recommended.',
    },
    {
      id: 3,
      name: 'David Brown',
      date: 'June 22, 2024',
      text: 'The cover image looks amazing!',
    },
  ];

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://freetestapi.com/api/v1/books/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToCart = () => {
    if (book) {
      addToCart(book); 
      Alert.alert('Success', 'Book added to cart!');
    }
  };

  if (!book) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Card style={styles.card}>
        <Card.Cover source={{ uri: book.cover_image }} style={styles.image} />
        <Card.Content>
          <Text style={styles.cardTitle}>{book.title}</Text>
          <Text style={styles.cardText}>Author: {book.author}</Text>
          <Text style={styles.cardText}>
            Publication Year: {book.publication_year}
          </Text>
          <Divider style={styles.divider} />
          <Text style={styles.description}>{book.description}</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            color="#FF6347"
            onPress={handleAddToCart} 
            style={styles.addButton}
          >
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>

      <View style={styles.commentsContainer}>
        <Text style={styles.commentsTitle}>Comments</Text>
        {comments.map((comment) => (
          <Card key={comment.id} style={styles.commentCard}>
            <Card.Content>
              <Text style={styles.commentText}>{comment.text}</Text>
              <Text style={styles.commentDetails}>
                {comment.name} - {comment.date}
              </Text>
            </Card.Content>
          </Card>
        ))}
        {comments.length === 0 && (
          <Text style={styles.noCommentsText}>No comments yet.</Text>
        )}
      </View>
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
    height: 200,
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
  divider: {
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  addButton: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  commentsContainer: {
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  commentCard: {
    marginVertical: 5,
    borderRadius: 10,
    elevation: 2,
  },
  commentText: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 5,
  },
  commentDetails: {
    fontSize: 14,
    color: '#666',
  },
  noCommentsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default BookDetail;
