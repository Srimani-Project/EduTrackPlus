
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';

const newCourses = [
  /*{
    id: '1',
    title: 'Web Development Bootcamp',
    description: 'HTML, CSS, JS, Node.js and backend with projects.',
    thumbnail: 'https://img.icons8.com/color/96/html-5--v1.png',
  },*/
  {
    id: '1',
    title: 'React Native Basics',
    description:'Build cross-platform mobile apps using React Native and Expo.',
    thumbnail: 'https://img.icons8.com/color/96/react-native.png',

  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    description: 'Deep dive into JS concepts',
    thumbnail: 'https://img.icons8.com/color/96/javascript.png',
  },
  {
    id: '3',
    title: 'UI/UX Design Fundamentals',
    description: 'Master the basics of UI/UX design',
    thumbnail: 'https://img.icons8.com/color/96/design.png',
  },
  {
    id: '4',
    title: 'Python for Data Science',
    description: 'Data science using Python libraries',
    thumbnail: 'https://img.icons8.com/color/96/python.png',
  },
  {
    id: '5',
    title: 'Machine Learning 101',
    description: 'Get started with ML models and tools',
    thumbnail: 'https://img.icons8.com/color/96/artificial-intelligence.png',
  },
  {
    id: '6',
    title: 'SQL & Databases',
    description: 'Master SQL queries and relational database design.',
    thumbnail: 'https://img.icons8.com/fluency/96/database.png',
  },
  {
    id: '7',
    title: 'Cloud Computing with AWS',
    description: 'Basics of AWS cloud services',
    thumbnail: 'https://img.icons8.com/color/96/amazon-web-services.png',
  },
  {
  id: '8',
  title: 'Web Development Bootcamp',
  description: 'HTML, CSS, JS, Node.js and backend with projects.',
  thumbnail: 'https://img.icons8.com/color/96/html-5--v1.png',
  },
  {
    id: '10',
    title: 'Full-Stack Web Development',
    description: 'Learn HTML, CSS, JavaScript, React, Node.js & databases with hands-on projects.',
    thumbnail: 'https://img.icons8.com/color/96/source-code.png',
  },
];

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const filteredCourses = newCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCourse = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({ pathname: '../course-details/[id]', params: { id: item.id } })
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Discover New Courses</Text>

      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        autoCorrect={false}
        autoCapitalize="none"
      />

      {filteredCourses.length === 0 ? (
        <Text style={styles.noResults}>No courses found.</Text>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={item => item.id}
          renderItem={renderCourse}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
        />
      )}
    </ScrollView>
  );
};

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E88E5',
    marginBottom: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 14,
  },
  cardText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 30,
  },
});
