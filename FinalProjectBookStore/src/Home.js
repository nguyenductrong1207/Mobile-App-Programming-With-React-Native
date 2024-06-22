import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [categories, setCategories] = useState([
    { id: 1, title: 'Best Seller Books', data: [] },
    { id: 2, title: 'Recommendation', data: [] },
    { id: 3, title: 'Education', data: [] },
    { id: 4, title: 'Technology', data: [] },
    { id: 5, title: 'Business', data: [] },
  ]);

  useEffect(() => {
    const fetchData = async (url, index) => {
      try {
        const response = await axios.get(url);
        setCategories(prevCategories => {
          const updatedCategories = [...prevCategories];
          updatedCategories[index].data = response.data;
          return updatedCategories;
        });
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData('https://freetestapi.com/api/v1/books?category=bestseller&limit=5', 0);
    fetchData('https://freetestapi.com/api/v1/books?category=recommendation&limit=5', 1);
    fetchData('https://freetestapi.com/api/v1/books?category=education&limit=5', 2);
    fetchData('https://freetestapi.com/api/v1/books?category=technology&limit=5', 3);
    fetchData('https://freetestapi.com/api/v1/books?category=business&limit=5', 4);
  }, []);

  const renderCard = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Book Details', { id: item.id })}
      style={styles.cardContainer}
    >
      <Card elevation={5} style={styles.card}>
        <Card.Cover source={{ uri: item.cover_image }} style={styles.cardImage} />
        <Card.Content>
          <Paragraph style={styles.cardTitle} numberOfLines={1}>{item.title}</Paragraph>
          <Paragraph style={styles.cardAuthor}>{item.author}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.introductionContainer}>
        <Text style={styles.introductionText}>
          Welcome to our Bookstore! Discover the latest in various categories below
        </Text>
      </View>

      {categories.map(category => (
        <View key={category.id} style={styles.sectionContainer}>
          <Title style={styles.sectionTitle}>{category.title}</Title>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollView}
          >
            {category.data.map(item => (
              <View key={item.id} style={styles.cardWrapper}>
                {renderCard({ item })}
              </View>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFD5C3',
    paddingVertical: 10,
  },
  introductionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  introductionText: {
    fontSize: 27,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 10,
  },
  horizontalScrollView: {
    paddingStart: 10,
    paddingEnd: 20,
  },
  cardWrapper: {
    marginRight: 10,
  },
  cardContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  card: {
    width: 180,
    borderRadius: 10,
  },
  cardImage: {
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardAuthor: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;
