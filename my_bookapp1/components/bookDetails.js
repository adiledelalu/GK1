import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, Alert, Platform } from "react-native";
import { getDatabase, ref, remove } from "firebase/database";

export default function BookDetails({ navigation, route }) {

    const [book, setBook] = useState(null);
  
    // Set book values from route params
    useEffect(() => {
      setBook(route.params.book); 
  
    
      return () => {
        setBook({});
      };
    }, [route.params.book]);
  
    // Function to navigate to the edit screen
    const handleEdit = () => {
      const book = route.params.book;
      navigation.navigate("Edit book", { book });
    };
  
    // Function to confirm deletion (not done yet)
    const confirmDelete = () => {
      if (Platform.OS === "ios" || Platform.OS === "android") {
        Alert.alert("Are you sure?", "Do you want to delete the book?", [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: () => handleDelete() },
        ]);
      }
    };
  
    // Function to delete the book from Firebase
    const handleDelete = async () => {
      const id = route.params.book.id;  // Use book.id
      const db = getDatabase();
      const bookRef = ref(db, `books/${id}`); 
      try {
        await remove(bookRef);
        navigation.goBack(); 
      } catch (error) {
        Alert.alert(error.message);
      }
    };
  
    // If there's no book to show
    if (!book) {
      return <Text>No books available</Text>;
    }
  
    return (
      <View style={styles.container}>
        {/* Show book details */}
        {Object.entries(book).map((item, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{item[0]}: </Text>
            <Text style={styles.value}>{item[1]}</Text>
          </View>
        ))}
  
        {/* Buttons for editing and deleting */}
        <Button title="Edit book" onPress={handleEdit} />
        <Button title="Delete book" color="red" onPress={confirmDelete} />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    row: {
      flexDirection: "row",
      marginBottom: 10,
    },
    label: {
      fontWeight: "bold",
      marginRight: 10,
    },
    value: {
      color: "gray",
    },
  });
  