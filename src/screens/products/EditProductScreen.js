import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  StyleSheet, 
  Alert, 
  ActivityIndicator,
  ScrollView 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updateProduct } from '../../services/firestore/products';
import { useProducts } from '../../contexts/ProductsContext';

const EditProductScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { product } = route.params;
  const { refreshProducts } = useProducts();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(String(product.price));
      setDescription(product.description);
    }
  }, [product]);

  const handleUpdate = async () => {
    if (!name.trim() || !price.trim() || !description.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const priceNumber = parseFloat(price.replace(',', '.'));
    if (isNaN(priceNumber)) {
        Alert.alert("Erro", "O preço inserido não é um número válido.");
        return;
    }

    setLoading(true);

    try {
      const updatedData = {
        name: name,
        price: priceNumber,
        description: description,
      };
      
      await updateProduct(product.id, updatedData);
      
      await refreshProducts();
      Alert.alert("Sucesso!", "Produto atualizado com sucesso.");
      navigation.goBack();

    } catch (error) {
      Alert.alert("Erro na Atualização", "Não foi possível atualizar o produto.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Nome do Produto</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Preço</Text>
      <TextInput
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline={true}
        numberOfLines={4}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />
      ) : (
        <Button title="Salvar Alterações" onPress={handleUpdate} color="#6200ee" />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    label: {
      fontSize: 16,
      marginBottom: 5,
      color: '#333',
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 15,
      paddingVertical: 10,
      marginBottom: 20,
      fontSize: 16,
    },
    textArea: {
      height: 100,
      textAlignVertical: 'top',
    },
    loader: {
        marginTop: 20,
    }
});

export default EditProductScreen;
