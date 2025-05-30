

import { View, Text, StyleSheet, Linking, Pressable } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import courseData from '../../../assets/data/courses.json';

export default function Resources() {
  const { id } = useLocalSearchParams();
  const course = courseData[id as keyof typeof courseData];

  if (!course) return <Text>Course not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resources</Text>
      {course.resources.map((resource, index) => (
        <Pressable key={index} onPress={() => Linking.openURL(resource)}>
          <Text style={styles.link}>
            {index + 1}. {resource}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  link: { fontSize: 16, color: '#1e88e5', marginBottom: 6 },
});





