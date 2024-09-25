import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Button,
  Alert,
  View,
  Text,
} from "react-native";
import { getDatabase, ref, push, update } from "firebase/database";

export default function AddBook({ navigation, route }) {
  const db = getDatabase();

  const initialState = {
    Bookname: "",
    Publisher: "",
    Year: "",
    Condition: "",
  };

  //state for the new book
  const [newBook, setNewBook] = useState(initialState);
  const isEditBook = route?.name === "Edit Book";

  useEffect(() => {
    if (isEditBook) {
      // Get book details from navigation
      const book = route.params.book;
      // Set book details into state
      setNewBook(book);
    }
    return () => {
      setNewBook(initialState);
    };
  }, [isEditBook, route.params]);

  //function to change the text input
  const changeTextInput = (name, event) => {
    setNewBook({ ...newBook, [name]: event });
  };

  // function to save changes or add a new book
  const handleSave = async () => {
    const {
      Bookname: Bookname,
      Publisher: Publisher,
      Year: Year,
      Condition: Condition,
    } = newBook;

    //check if all fields are filled
    if (
      Bookname.length === 0 ||
      Publisher.length === 0 ||
      Year.length === 0 ||
      Condition.length === 0
    ) {
      return Alert.alert("Error", "All fields must be filled.");
    }

    if (isEditBook) {
      
      const id = route.params.book.id;
      const carRef = ref(db, `Books/${id}`);

      const updatedFields = {
        Bookname: Bookname,
        Publisher: Publisher,
        Year: Year,
        Condition: Condition,
      };

      try {
        await update(carRef, updatedFields);
        Alert.alert("Success", "Car updated successfully!");
        navigation.navigate("CarDetails", { Book: newBook }); 
      } catch (error) {
        console.error(`Error updating car: ${error.message}`);
      }
    } else {
     // Add a new book
      const bookRef = ref(db, "Books/");
      try {
        await push(bookRef, newBook);
        Alert.alert("Success", "Book added successfully!");
        setNewBook(initialState); // Nulstil inputfelterne
      } catch (error) {
        console.error(`Error adding Book: ${error.message}`);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* iterate over the initial state object to create text inputs*/}
        {Object.keys(initialState).map((key, index) => (
          <View style={styles.row} key={index}>
            <Text style={styles.label}>{key}</Text>
            <TextInput
              value={newBook[key]}
              onChangeText={(event) => changeTextInput(key, event)}
              style={styles.input}
              placeholder={`Enter ${key}`}
            />
          </View>
        ))}
        <Button
          title={isEditBook ? "Save changes" : "Add book"}
          onPress={handleSave}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 8,
  },
});
