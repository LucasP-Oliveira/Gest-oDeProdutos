import React, { useLayoutEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  Button, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { useProducts } from '../../contexts/ProductsContext';
import { useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../../services/firestore/products';

const ListProductsScreen = () => {
  const { products, loading, error, refreshProducts } = useProducts();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Produtos',
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={{ marginRight: 10 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Perfil</Text>
        </TouchableOpacity>
      ),
      headerLeft: () => null,
    });
  }, [navigation]);

  const handleDelete = (productId, productName) => {
    Alert.alert(
      "Confirmar Exclusão",
      `Tem a certeza que deseja apagar o produto "${productName}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Apagar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await deleteProduct(productId);
              Alert.alert("Sucesso!", "Produto apagado com sucesso.");
              refreshProducts();
            } catch (err) {
              Alert.alert("Erro", "Não foi possível apagar o produto.");
              console.error(err);
            }
          }
        }
      ]
    );
  };

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>R$ {Number(item.price).toFixed(2)}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => navigation.navigate('EditProduct', { product: item })}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id, item.name)}>
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>A carregar produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Tentar Novamente" onPress={refreshProducts} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
          style={styles.addButton} 
          onPress={() => navigation.navigate('AddProduct')}>
        <Text style={styles.addButtonText}>Adicionar Novo Produto</Text>
      </TouchableOpacity>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto registado.</Text>}
        onRefresh={refreshProducts}
        refreshing={loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, padding: 10, backgroundColor: '#f5f5f5' },
  errorText: { marginBottom: 10, color: 'red' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },
  card: { 
    backgroundColor: 'white', 
    borderRadius: 8, 
    padding: 15, 
    marginVertical: 8,
    marginHorizontal: 5,
    elevation: 3,
  },
  cardContent: { marginBottom: 10 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  productPrice: { fontSize: 16, color: '#6200ee', marginVertical: 5 },
  productDescription: { fontSize: 14, color: '#666' },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  button: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 5, marginLeft: 10 },
  editButton: { backgroundColor: '#ffab00' },
  deleteButton: { backgroundColor: '#d32f2f' },
  buttonText: { color: 'white', fontWeight: 'bold' },
  addButton: {
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default ListProductsScreen;
