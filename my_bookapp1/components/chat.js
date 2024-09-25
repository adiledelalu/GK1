import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const users = [
  {
    id: '1',
    name: 'Julie',
    message: 'Bog: VØS',
    time: 'Today',  },
  {
    id: '2',
    name: 'Thomas',
    message: 'Bog: Informationsteknologi',
    time: '2 days ago',

  },
]

const Chat = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* Message Details */}
      <View style={styles.messageContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>

      {/* Time */}
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      style={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },

  messageContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: '#666',
  },
  time: {
    color: '#999',
    fontSize: 12,
  },
});

export default Chat;
