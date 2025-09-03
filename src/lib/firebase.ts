// Firebase configuration and functions for SIH 2025 registration
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import { RegistrationData } from '@/pages/Register';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhp3H9q-nanPjviMqxpt37qIG0t2yrpoU",
  authDomain: "mailcrow-by-cz.firebaseapp.com",
  projectId: "mailcrow-by-cz",
  storageBucket: "mailcrow-by-cz.firebasestorage.app",
  messagingSenderId: "880746661306",
  appId: "1:880746661306:web:cb6f7a40db26bba332c983"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Check if a team name already exists in Firestore
 * @param teamName - The team name to check
 * @returns Promise<boolean> - true if exists, false otherwise
 */
export async function checkTeamNameExists(teamName: string): Promise<boolean> {
  try {
    const q = query(
      collection(db, 'sih-registrations'), 
      where('teamName', '==', teamName.trim())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error('Error checking team name:', error);
    throw new Error('Failed to validate team name');
  }
}

/**
 * Submit registration data to Firestore
 * @param registrationData - Complete registration form data
 * @returns Promise<string> - Document ID of the created registration
 */
export async function submitRegistration(registrationData: RegistrationData): Promise<string> {
  try {
    // Get user's IP address
    let ipAddress = 'Unknown';
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json');
      const ipData = await ipResponse.json();
      ipAddress = ipData.ip;
    } catch (ipError) {
      console.warn('Could not fetch IP address:', ipError);
    }

    // Add timestamp and format data for storage
    const submissionData = {
      ...registrationData,
      submittedAt: new Date().toISOString(),
      ipAddress,
      userAgent: navigator.userAgent,
      status: 'pending',
      // Calculate team statistics
      teamStats: {
        totalMembers: 6,
        femaleMembers: [registrationData.teamLeader, ...registrationData.teamMembers]
          .filter(member => member.gender === 'Female').length,
        branches: [registrationData.teamLeader, ...registrationData.teamMembers]
          .reduce((acc, member) => {
            if (member.branch) {
              acc[member.branch] = (acc[member.branch] || 0) + 1;
            }
            return acc;
          }, {} as Record<string, number>)
      }
    };

    const docRef = await addDoc(collection(db, 'sih-registrations'), submissionData);
    return docRef.id;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw new Error('Failed to submit registration');
  }
}

/**
 * Get all registrations from Firestore for admin view
 * @returns Promise<any[]> - Array of all registration documents
 */
export async function getAllRegistrations(): Promise<any[]> {
  try {
    const q = query(
      collection(db, 'sih-registrations'),
      orderBy('submittedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
}