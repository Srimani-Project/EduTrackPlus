/*
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

interface Course {
  id: string;
  title: string;
  progress: number; // 0-100%
}

const enrolledCourses: Course[] = [
  { id: '1', title: 'React Native Basics', progress: 30 },
  { id: '2', title: 'Advanced JavaScript', progress: 70 },
];

const CourseCard = ({ title, progress }: { title: string; progress: number }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.progress}>Progress: {progress}%</Text>
  </View>
);

const renderCourse = ({ item }: { item: Course }) => (
  <TouchableOpacity onPress={() => console.log('Tapped:', item.title)}>
    <CourseCard title={item.title} progress={item.progress} />
  </TouchableOpacity>
);

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Enrolled Courses</Text>
      <FlatList
        data={enrolledCourses}
        keyExtractor={(item) => item.id}
        renderItem={renderCourse}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  card: {
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: { fontSize: 18, fontWeight: '600' },
  progress: { fontSize: 14, marginTop: 5, color: '#555' },
});
*/
// app/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/(tabs)/dashboard'); // 🔁 Redirect to Dashboard tab
  }, []);

  return null;
}
