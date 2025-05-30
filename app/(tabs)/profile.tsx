
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  dateEarned: string;
  imageUrl?: string;
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [userEmail] = useState('john.doe@example.com');
  const [userBio, setUserBio] = useState('Passionate learner exploring new technologies');
  const [tempName, setTempName] = useState(userName);
  const [tempBio, setTempBio] = useState(userBio);

  const [certificates] = useState<Certificate[]>([
    {
      id: '1',
      title: 'React Native Fundamentals',
      issuer: 'TechAcademy',
      dateEarned: 'Dec 2023',
    },
    {
      id: '2',
      title: 'JavaScript ES6+',
      issuer: 'CodeSchool',
      dateEarned: 'Nov 2023',
    },
    {
      id: '3',
      title: 'Mobile App Development',
      issuer: 'DevInstitute',
      dateEarned: 'Oct 2023',
    },
  ]);

  const handleSaveProfile = () => {
    setUserName(tempName);
    setUserBio(tempBio);
    setShowEditModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const handleCancelEdit = () => {
    setTempName(userName);
    setTempBio(userBio);
    setShowEditModal(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            
            Alert.alert('Logged Out', 'You have been successfully logged out.');
          }
        },
      ]
    );
  };

  const handleProfilePictureEdit = () => {
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => console.log('Open camera') },
        { text: 'Gallery', onPress: () => console.log('Open gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/120/4A90E2/FFFFFF?text=JD' }}
            style={styles.profileImage}
          />
          <TouchableOpacity 
            style={styles.editImageButton}
            onPress={handleProfilePictureEdit}
          >
            <Ionicons name="camera" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{userEmail}</Text>
          <Text style={styles.userBio}>{userBio}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => setShowEditModal(true)}
        >
          <Ionicons name="pencil" size={20} color="#1e90ff" />
        </TouchableOpacity>
      </View>

      {/* Stats Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Certificates</Text>
        </View>
      </View>

      {/* Certificates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Certificates</Text>
        {certificates.map((certificate) => (
          <View key={certificate.id} style={styles.certificateCard}>
            <View style={styles.certificateIcon}>
              <Ionicons name="medal" size={24} color="#FFD700" />
            </View>
            <View style={styles.certificateInfo}>
              <Text style={styles.certificateTitle}>{certificate.title}</Text>
              <Text style={styles.certificateIssuer}>{certificate.issuer}</Text>
              <Text style={styles.certificateDate}>{certificate.dateEarned}</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Ionicons name="eye" size={20} color="#1e90ff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="notifications" size={24} color="#666" />
          <Text style={styles.settingText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="shield-checkmark" size={24} color="#666" />
          <Text style={styles.settingText}>Privacy</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.settingItem}>
          <Ionicons name="help-circle" size={24} color="#666" />
          <Text style={styles.settingText}>Help & Support</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCancelEdit}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Enter your name"
            />
            
            <Text style={styles.inputLabel}>Bio</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              value={tempBio}
              onChangeText={setTempBio}
              placeholder="Tell us about yourself"
              multiline
              numberOfLines={3}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1e90ff',
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1e90ff',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  userBio: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  editButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 20,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e90ff',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  certificateCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  certificateIcon: {
    marginRight: 15,
  },
  certificateInfo: {
    flex: 1,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  certificateIssuer: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  certificateDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  viewButton: {
    padding: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#ff4757',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#1e90ff',
    marginLeft: 10,
  },
  saveButtonText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
