import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LessonScreen() {
  const { lessonId, courseId } = useLocalSearchParams();
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (courseId && lessonId) {
      checkCompletion(courseId as string, lessonId as string);
    }
  }, [courseId, lessonId]);

  const checkCompletion = async (cid: string, lid: string) => {
    try {
      const stored = await AsyncStorage.getItem(`progress_${cid}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setIsComplete(parsed.includes(lid));
      }
    } catch (error) {
      console.error('Error checking completion:', error);
    }
  };

  const markAsComplete = async () => {
    try {
      const cid = courseId as string;
      const lid = lessonId as string;

      const stored = await AsyncStorage.getItem(`progress_${cid}`);
      let progress = stored ? JSON.parse(stored) : [];

      if (!progress.includes(lid)) {
        progress.push(lid);
        await AsyncStorage.setItem(`progress_${cid}`, JSON.stringify(progress));
        setIsComplete(true);
        Alert.alert('✅ Lesson Completed');
      } else {
        Alert.alert('Info', 'This lesson is already marked as complete.');
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lessonId}</Text>
      <Text style={styles.content}>
        {/* Placeholder lesson content */}
        This is the lesson content for "{lessonId}". You can replace this with a video, text,
        or any rich content.
      </Text>

      {!isComplete && (
        <TouchableOpacity style={styles.button} onPress={markAsComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      )}

      {isComplete && (
        <Text style={styles.completed}>✅ Completed</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completed: {
    color: 'green',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
