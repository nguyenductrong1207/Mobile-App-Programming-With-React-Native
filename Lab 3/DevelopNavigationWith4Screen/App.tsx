
import React, { useState } from 'react';
import Products from './products/products';
import ProductAdd from './products/productAdd';
import ProductSearch from './products/productSearch';
import ProductDetail from './products/productDetail';
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  const [index, setInex] = useState(0);
  const [routes] = useState([
    { key: "Products", title: "Products", focusedIcon: "folder" },
    { key: "ProductAdd", title: "Add", focusedIcon: "folder" },
    { key: "ProductSearch", title: "Search", focusedIcon: "find" },
    { key: "ProductDetail", title: "Detail", focusedIcon: "calendar" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    Products: Products,
    ProductAdd: ProductAdd,
    ProductSearch: ProductSearch,
    ProductDetail: ProductDetail,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setInex}
        renderScene={renderScene}
      />
    </SafeAreaProvider>
  );
}

export default App;
