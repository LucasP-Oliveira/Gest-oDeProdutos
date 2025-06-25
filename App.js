import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserProvider } from './src/contexts/UserContext'; 
import { ProductsProvider } from './src/contexts/ProductsContext';
import LoginScreen from './src/screens/auth/LoginScreen';
import ListProductsScreen from './src/screens/products/ListProductsScreen';
import AddProductScreen from './src/screens/products/AddProductScreen';
import EditProductScreen from './src/screens/products/EditProductScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ProductsProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={{
              headerStyle: { backgroundColor: '#6200ee' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListProducts" component={ListProductsScreen} />
            <Stack.Screen name="AddProduct" component={AddProductScreen} options={{ title: 'Adicionar Produto' }} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} options={{ title: 'Editar Produto' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </ProductsProvider>
    </UserProvider>
  );
}
