
//styleed
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import courseData from '../../../assets/data/courses.json';

export default function Overview() {
  const { id } = useLocalSearchParams();
  const course = courseData[id as keyof typeof courseData];

  if (!course) return <Text style={styles.notFound}>Course not found</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📘 {course.title}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Overview</Text>
        <Text style={styles.description}>{course.overview}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  notFound: {
    padding: 16,
    fontSize: 18,
    color: 'red',
  },
});
