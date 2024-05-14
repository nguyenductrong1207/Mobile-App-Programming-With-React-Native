import {useState} from 'react';
import productStyles from '../styles/productsStyle';
import {Text, Button, Input} from 'react-native-paper';
import {Alert, SafeAreaView, TextInput, TouchableOpacity, View} from 'react-native';

const ProductAdd = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [imgages, setImgages] = useState('');

  handleSubmit = () => {
    fetch('https://dummyjson.com/products/add', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title,
        description: description,
        price: price,
        discountPercentage: discountPercentage,
        rating: rating,
        stock: stock,
        brand: brand,
        category: category,
        imgages: imgages,
      }),
    })
      .then(res => res.json())
      .then(console.log);

    Alert.alert('Add Sucessfully!');
  };

  return (
    <SafeAreaView>
      <View>
        <Text>Add a New Product</Text>

        <View>
          <View>
            <Text>Title</Text>
            <TextInput
              placehoder="Enter Title"
              onChangeText={text => setTitle(text)}></TextInput>
          </View>

          <View>
            <Text>Description</Text>
            <TextInput
              placehoder="Enter Description"
              onChangeText={text => setDescription(text)}></TextInput>
          </View>

          <View>
            <Text>Price</Text>
            <TextInput
              placehoder="Enter Price"
              onChangeText={text => setPrice(text)}></TextInput>
          </View>

          <View>
            <Text>Discount Percentage</Text>
            <TextInput
              placehoder="Enter Discount Percentage"
              onChangeText={text => setDiscountPercentage(text)}></TextInput>
          </View>

          <View>
            <Text>Rating</Text>
            <TextInput
              placehoder="Enter Rating"
              onChangeText={text => setRating(text)}></TextInput>
          </View>

          <View>
            <Text>Stock</Text>
            <TextInput
              placehoder="Enter Stock"
              onChangeText={text => setStock(text)}></TextInput>
          </View>

          <View>
            <Text>Brand</Text>
            <TextInput
              placehoder="Enter Brand"
              onChangeText={text => setBrand(text)}></TextInput>
          </View>

          <View>
            <Text>Category</Text>
            <TextInput
              placehoder="Enter Category"
              onChangeText={text => setCategory(text)}></TextInput>
          </View>

          <View>
            <Text>Imgages</Text>
            <TextInput
              placehoder="Enter Imgages"
              onChangeText={text => setImages(text)}></TextInput>
          </View>
        </View>

        <View>
          <TouchableOpacity>
            <Button
              mode="contained"
              buttonColor="#6495ED"
              textColor="white"
              onPress={handleSubmit}>
              Submit
            </Button>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductAdd;
