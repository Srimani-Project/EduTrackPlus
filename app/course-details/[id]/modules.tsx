
//fully updated code

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import courseData from '../../../assets/data/courses.json';
import { Ionicons } from '@expo/vector-icons';

export default function Modules() {
  const { id } = useLocalSearchParams();
  const course = courseData[id as keyof typeof courseData];
  const router = useRouter();

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      loadProgress(id as string);
    }
  }, [id]);

  const loadProgress = async (courseId: string) => {
    try {
      const stored = await AsyncStorage.getItem(`progress_${courseId}`);
      if (stored) {
        setCompletedLessons(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const isLessonComplete = (lesson: string) => completedLessons.includes(lesson);

  const handleLessonPress = (lesson: string) => {
    router.push(`/lesson/${encodeURIComponent(lesson)}?courseId=${id}`);
  };

  if (!course) return <Text style={styles.message}>Course not found</Text>;

  const allComplete = course.modules.every((lesson) => isLessonComplete(lesson));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📚 Course Modules</Text>

      {allComplete && (
        <View style={styles.completedBanner}>
          <Ionicons name="checkmark-done-circle" size={24} color="green" />
          <Text style={styles.completedText}>Course Completed</Text>
        </View>
      )}

      <FlatList
        data={course.modules}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          const completed = isLessonComplete(item);
          return (
            <TouchableOpacity onPress={() => handleLessonPress(item)} style={[styles.moduleCard, completed && styles.completedModule]}>
              <Ionicons
                name={completed ? 'checkmark-circle' : 'ellipse-outline'}
                size={22}
                color={completed ? '#4CAF50' : '#aaa'}
                style={{ marginRight: 12 }}
              />
              <Text style={[styles.moduleText, completed && styles.checkedText]}>{item}</Text>
            </TouchableOpacity>
          );
        }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  moduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef2f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  moduleText: {
    fontSize: 16,
    color: '#333',
  },
  checkedText: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  completedModule: {
    backgroundColor: '#d6f5d6',
  },
  message: {
    padding: 20,
    fontSize: 18,
    color: 'gray',
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ffed',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  completedText: {
    fontSize: 16,
    marginLeft: 8,
    color: 'green',
    fontWeight: '600',
  },
});
