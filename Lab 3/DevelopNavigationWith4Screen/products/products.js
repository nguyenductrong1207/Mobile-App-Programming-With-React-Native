import {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import productStyles from '../styles/productsStyle';
import {Text, Button} from 'react-native-paper';

const Products = () => {
  const [data, setData] = useState([]);
  const filePath = 'https://dummyjson.com/products/';

  useEffect(() => {
    // Alert.alert(filePath);
    fetch(filePath)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })

      .then(d => {
        setData(d.products);
      })

      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  });

  const Item = ({data}) => (
    <View style={productStyles.container}>
      <View style={productStyles.imgageBlock}>
        <Image style={productStyles.imgage} source={{uri: data.thumbnail}} />
      </View>

      <View style={productStyles.contentBlock}>
        <Text variant="titleMedium" style={productStyles.title}>
          Title: {data.title}
        </Text>
        <Text style={productStyles.contentItem}>
          Desciption: {data.description}
        </Text>
        <Text style={productStyles.contentItem}>Price: {data.price}</Text>
        <Text style={productStyles.contentItemDiscount}>
          Discount: {data.discountPercentage}
        </Text>
        <Text style={productStyles.contentItem}>Rating: {data.rating}</Text>
        <Text style={productStyles.contentItem}>Stock: {data.stock}</Text>
        <Text style={productStyles.contentItem}>Brand: {data.brand}</Text>
        <Text>Category: {data.category}</Text>

        <View style={productStyles.buttonBlock}>
          <TouchableOpacity>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed Detail')}
              buttonColor="#6495ED"
              textColor="white">
              Detail
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed Add')}
              buttonColor="#6495ED"
              textColor="white">
              Add
            </Button>
          </TouchableOpacity>
          <TouchableOpacity>
            <Button
              mode="contained"
              onPress={() => console.log('Pressed Delete')}
              buttonColor="#6495ED"
              textColor="white">
              Delete
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <Text variant="headlineMedium" style={productStyles.heading}>
        Product List
      </Text>
      <FlatList
        data={data}
        renderItem={({item}) => <Item data={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default Products;
