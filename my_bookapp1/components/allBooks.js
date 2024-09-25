import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { useState, useEffect } from "react";

export default function BookList({ navigation }) {
  const [books, setBooks] = useState(null);

// Fetch data from Firebase
  useEffect(() => {
    const db = getDatabase();
    const booksRef = ref(db, "Books");

    const unsubscribe = onValue(
      booksRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          //debugging
          console.log("Data received from Firebase: ", data);

          // Convert object to array
          const booksList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setBooks(booksList);
        } else {
          console.log("No books found");
        }
      },
      (error) => {
        console.error("Error fetching data: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  if (!books) {
    return <Text>Loading...</Text>;
  }

  // Function to handle selecting a book
  const handleSelectBook = (id) => {
    const selectedBook = books.find((books) => books.id === id);
    if (selectedBook) {
      console.log("Selected book: ", selectedBook); 
      navigation.navigate("BookDetails", { book: selectedBook }); 
    } else {
      console.error("Book with ID " + id + " not found"); 
    }
  };

  // Render each book in the FlatList
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id} 
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.container}
          onPress={() => handleSelectBook(item.id)}
        >
          <Text>
            {item.Bookname} {item.Publisher} ({item.Year})
          </Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
