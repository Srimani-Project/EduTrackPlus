//run-2 proficient

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const userName = 'John';

const enrolledCourses = [
  {
    id: '1',
    title: 'React Native Basics',
    progress: 45,
    thumbnail: 'https://img.icons8.com/color/96/react-native.png',
  },
  {
    id: '2',
    title: 'Advanced JavaScript',
    progress: 70,
    thumbnail: 'https://img.icons8.com/color/96/javascript.png',
  },
];

const recommendedCourses = [
  {
    id: '4',
    title: 'Python for Data Science',
    thumbnail: 'https://img.icons8.com/color/96/python.png',
  },
  {
    id: '9',
    title: 'Machine Learning Essentials',
    thumbnail: 'https://img.icons8.com/color/96/artificial-intelligence.png',
  },
];

const categories = [
  { id: '10', name: 'Development' },
  { id: '11', name: 'Design' },
  { id: '12', name: 'Marketing' },
 { id: '13', name: 'Business' },
];

const Dashboard = () => {
  const router = useRouter();

  const renderEnrolledCourse = ({ item }: any) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() =>
        router.push({ pathname: '../course-details/[id]', params: { id: item.id } })
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={{ flex: 1 }}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${item.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>Progress: {item.progress}%</Text>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendedCourse = ({ item }: any) => (
    <TouchableOpacity
      style={styles.recommendCard}
      onPress={() =>
        router.push({ pathname: '../course-details/[id]', params: { id: item.id } })
      }
    >
      <Image source={{ uri: item.thumbnail }} style={styles.recommendImage} />
      <Text style={styles.recommendTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.welcome}>Hi {userName} 👋</Text>
      <Text style={styles.subHeading}>Ready to continue your learning?</Text>

      <View style={styles.streakCard}>
        <Text style={styles.streakTitle}>🔥 5-Day Learning Streak</Text>
        <Text style={styles.streakSubtitle}>You're doing great! Keep going!</Text>
      </View>

      <Text style={styles.sectionTitle}>Continue Learning</Text>
      <FlatList
        data={enrolledCourses}
        keyExtractor={item => item.id}
        renderItem={renderEnrolledCourse}
        scrollEnabled={false}
      />

      <Text style={styles.sectionTitle}>Top Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
        {categories.map(category => (
          <TouchableOpacity key={category.id} style={styles.categoryCard}>
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.sectionTitle}>Recommended for You</Text>
      <FlatList
        data={recommendedCourses}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderRecommendedCourse}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1e88e5',
  },
  subHeading: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
    marginBottom: 16,
  },
  streakCard: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  streakTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fb8c00',
  },
  streakSubtitle: {
    fontSize: 14,
    color: '#a66400',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 16,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 14,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#ddd',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#4caf50',
  },
  progressText: {
    fontSize: 13,
    marginTop: 4,
    color: '#555',
  },
  categoryCard: {
    backgroundColor: '#e8f0fe',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e88e5',
  },
  horizontalList: {
    marginBottom: 20,
  },
  recommendCard: {
    backgroundColor: '#f1f8e9',
    padding: 12,
    borderRadius: 12,
    marginRight: 14,
    width: 160,
    alignItems: 'center',
  },
  recommendTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#33691e',
    marginTop: 10,
  },
  recommendImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
});
