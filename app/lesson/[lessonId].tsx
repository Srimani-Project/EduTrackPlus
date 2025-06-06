//perfect code



import React, { useRef, useMemo, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';

export default function LessonScreen() {
  const { lessonId, courseId } = useLocalSearchParams();
  const [isComplete, setIsComplete] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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
        This is the lesson content for "{lessonId}". You can replace this with a video, text, or any rich content.
      </Text>

      {!isComplete && (
        <TouchableOpacity style={styles.button} onPress={markAsComplete}>
          <Text style={styles.buttonText}>Mark as Complete</Text>
        </TouchableOpacity>
      )}

      {isComplete && (
        <Text style={styles.completed}>✅ Completed</Text>
      )}

      {/* Button to Open Bottom Sheet */}
      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => {
          console.log('Open Options Pressed');
          bottomSheetRef.current?.expand();
        }}
      >
        <Text style={styles.bottomButtonText}>Open Options</Text>
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#fff' }}
      >
        <View style={styles.sheetContent}>
          <Text style={styles.sheetTitle}>📜 Transcript</Text>
          <Text>This lesson covers basic React Native concepts...</Text>

          <Text style={styles.sheetTitle}>💾 Save</Text>
          <TouchableOpacity onPress={() => Alert.alert('Saved!')}>
            <Text style={styles.sheetOption}>Save this lesson</Text>
          </TouchableOpacity>

          <Text style={styles.sheetTitle}>🚩 Report</Text>
          <TouchableOpacity onPress={() => Alert.alert('Reported!')}>
            <Text style={styles.sheetOption}>Report Issue</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
    marginBottom: 10,
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
    marginBottom: 10,
  },
  bottomButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sheetContent: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  sheetOption: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 5,
  },
});

  