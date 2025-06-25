import { db } from '../../config/firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

export const addProduct = (product) => {
  return addDoc(productsCollection, {
    ...product,
    createdAt: serverTimestamp(),
  });
};

export const getProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const updateProduct = (productId, updatedData) => {
  const productDoc = doc(db, 'products', productId);
  return updateDoc(productDoc, {
    ...updatedData,
    updatedAt: serverTimestamp(),
  });
};

export const deleteProduct = (productId) => {
  const productDoc = doc(db, 'products', productId);
  return deleteDoc(productDoc);
};
