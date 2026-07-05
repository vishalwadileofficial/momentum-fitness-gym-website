import { 
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, 
  deleteDoc, query, where, orderBy, limit, serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

// Safe wrapper to catch Firestore errors (e.g., config missing or permissions denied)
// and fallback to localStorage for a fully functional mock dashboard offline/unconfigured.
const executeSafe = async (firebaseOp, fallbackOp) => {
  try {
    return await firebaseOp();
  } catch (error) {
    console.warn('Firestore operation failed. Falling back to local state:', error.message);
    return fallbackOp();
  }
};

// Local storage helper
const getLocalJSON = (key, defaultVal) => {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch {
    return defaultVal;
  }
};

const setLocalJSON = (key, val) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Error writing to local storage:', e);
  }
};

/* ============================================================================
   1. MEMBERSHIPS MODULE
   ============================================================================ */
export const purchaseMembership = async (userId, planName, duration = 'monthly') => {
  const priceMap = { basic: 29, standard: 49, premium: 89, elite: 199 };
  const basePrice = priceMap[planName.toLowerCase()] || 49;
  const price = duration === 'annual' ? Math.round(basePrice * 0.8 * 12) : basePrice;

  const membershipData = {
    userId,
    planName,
    status: 'active',
    billingCycle: duration,
    price,
    startDate: new Date().toISOString(),
    expiresAt: new Date(Date.now() + (duration === 'annual' ? 365 : 30) * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };

  return executeSafe(
    async () => {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, { plan: planName });
      
      const membershipRef = doc(db, 'memberships', userId);
      await setDoc(membershipRef, membershipData);
      
      // Log transaction in history
      const historyCollection = collection(db, 'memberships', userId, 'history');
      await addDoc(historyCollection, {
        planName,
        price,
        billingCycle: duration,
        date: new Date().toISOString(),
        status: 'paid'
      });
      return membershipData;
    },
    () => {
      // Local storage fallback
      const users = getLocalJSON('local_users', {});
      if (users[userId]) {
        users[userId].plan = planName;
        setLocalJSON('local_users', users);
      }
      setLocalJSON(`membership_${userId}`, membershipData);
      
      const history = getLocalJSON(`membership_history_${userId}`, []);
      history.unshift({
        planName,
        price,
        billingCycle: duration,
        date: new Date().toISOString(),
        status: 'paid'
      });
      setLocalJSON(`membership_history_${userId}`, history);
      return membershipData;
    }
  );
};

export const getMembershipData = async (userId) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'memberships', userId);
      const snap = await getDoc(docRef);
      return snap.exists() ? snap.data() : null;
    },
    () => getLocalJSON(`membership_${userId}`, null)
  );
};

export const getMembershipHistory = async (userId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'memberships', userId, 'history');
      const q = query(colRef, orderBy('date', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => d.data());
    },
    () => getLocalJSON(`membership_history_${userId}`, [
      { planName: 'Elite Performance', price: 149, billingCycle: 'monthly', date: '2026-07-01T12:00:00.000Z', status: 'paid' },
      { planName: 'Elite Performance', price: 149, billingCycle: 'monthly', date: '2026-06-01T12:00:00.000Z', status: 'paid' }
    ])
  );
};

export const freezeMembership = async (userId, duration, reason) => {
  const freezeRequest = {
    userId,
    status: 'requested',
    duration,
    reason,
    date: new Date().toISOString()
  };
  return executeSafe(
    async () => {
      const ref = collection(db, 'membership_freezes');
      await addDoc(ref, freezeRequest);
      return freezeRequest;
    },
    () => {
      const freezes = getLocalJSON('local_freezes', []);
      freezes.unshift(freezeRequest);
      setLocalJSON('local_freezes', freezes);
      return freezeRequest;
    }
  );
};

/* ============================================================================
   2. CLASS BOOKINGS
   ============================================================================ */
export const getAvailableClasses = async () => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'classes');
      const snap = await getDocs(colRef);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_classes', [
      { id: 'c1', name: 'Power & Barbell Club', trainer: 'Marcus Vance', time: '18:00', date: 'Monday', capacity: 15, booked: 11, room: 'Strength Zone 1' },
      { id: 'c2', name: 'HIIT Performance Track', trainer: 'Sarah Rodriguez', time: '07:00', date: 'Friday', capacity: 20, booked: 14, room: 'Athletic Turf' },
      { id: 'c3', name: 'Zen Flow Yoga', trainer: 'Elena Rostova', time: '09:00', date: 'Wednesday', capacity: 25, booked: 18, room: 'Mind & Body Studio' },
      { id: 'c4', name: 'CrossFit Core Engine', trainer: 'Dmitry Petrov', time: '12:00', date: 'Tuesday', capacity: 12, booked: 8, room: 'CrossFit Box' },
      { id: 'c5', name: 'Metabolic Conditioning', trainer: 'Cole Vance', time: '17:30', date: 'Thursday', capacity: 18, booked: 15, room: 'Athletic Turf' }
    ])
  );
};

export const bookClass = async (userId, userName, classItem) => {
  const booking = {
    userId,
    userName,
    classId: classItem.id,
    className: classItem.name,
    trainer: classItem.trainer,
    date: classItem.date,
    time: classItem.time,
    room: classItem.room,
    bookedAt: new Date().toISOString()
  };

  return executeSafe(
    async () => {
      const bookingRef = collection(db, 'appointments');
      await addDoc(bookingRef, { ...booking, type: 'class' });
      return booking;
    },
    () => {
      const bookings = getLocalJSON(`bookings_${userId}`, []);
      bookings.unshift({ ...booking, type: 'class', id: Math.random().toString() });
      setLocalJSON(`bookings_${userId}`, bookings);
      return booking;
    }
  );
};

export const cancelClassBooking = async (userId, bookingId) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'appointments', bookingId);
      await deleteDoc(docRef);
      return true;
    },
    () => {
      let bookings = getLocalJSON(`bookings_${userId}`, []);
      bookings = bookings.filter(b => b.id !== bookingId);
      setLocalJSON(`bookings_${userId}`, bookings);
      return true;
    }
  );
};

/* ============================================================================
   3. PERSONAL TRAINER APPOINTMENTS
   ============================================================================ */
export const getTrainersRoster = async () => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'trainers');
      const snap = await getDocs(colRef);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => [
      { id: 't1', name: 'Marcus Vance', specialty: 'Power & Barbell Training', rating: '4.9', bio: 'Corrective barbell periodization specialist.', experience: '12 Years' },
      { id: 't2', name: 'Sarah Rodriguez', specialty: 'HIIT & Metabolic Conditioning', rating: '5.0', bio: 'Former Division 1 track athlete & conditioning expert.', experience: '8 Years' },
      { id: 't3', name: 'Elena Rostova', specialty: 'Yoga & Mobility Coordinator', rating: '4.8', bio: 'Mobility and contrasts recovery specialist.', experience: '10 Years' },
      { id: 't4', name: 'Dmitry Petrov', specialty: 'Olympic Weightlifting', rating: '4.9', bio: 'Competitor weightlifting mechanics lead.', experience: '15 Years' }
    ]
  );
};

export const requestTrainerAppointment = async (userId, userName, apptDetails) => {
  const appt = {
    userId,
    userName,
    trainerId: apptDetails.trainerId,
    trainerName: apptDetails.trainerName,
    date: apptDetails.date,
    time: apptDetails.time,
    focus: apptDetails.focus,
    status: 'pending',
    type: 'trainer',
    requestedAt: new Date().toISOString()
  };

  return executeSafe(
    async () => {
      const ref = collection(db, 'appointments');
      const docRef = await addDoc(ref, appt);
      return { id: docRef.id, ...appt };
    },
    () => {
      const bookings = getLocalJSON(`bookings_${userId}`, []);
      const newAppt = { ...appt, id: Math.random().toString() };
      bookings.unshift(newAppt);
      setLocalJSON(`bookings_${userId}`, bookings);
      return newAppt;
    }
  );
};

export const getMemberBookings = async (userId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'appointments');
      const q = query(colRef, where('userId', '==', userId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON(`bookings_${userId}`, [
      { id: 'b1', type: 'class', className: 'Power & Barbell Club', trainer: 'Marcus Vance', date: 'Monday', time: '18:00', room: 'Strength Zone 1', bookedAt: new Date().toISOString() },
      { id: 'b2', type: 'trainer', trainerName: 'Sarah Rodriguez', date: '2026-07-10', time: '07:00', focus: 'Lactate threshold testing', status: 'confirmed', requestedAt: new Date().toISOString() }
    ])
  );
};

/* ============================================================================
   4. MEMBER PROGRESS TRACKING
   ============================================================================ */
export const saveMemberProgress = async (userId, progressItem) => {
  const data = {
    userId,
    ...progressItem,
    date: new Date().toISOString().split('T')[0]
  };

  return executeSafe(
    async () => {
      const colRef = collection(db, 'progress');
      await addDoc(colRef, data);
      return data;
    },
    () => {
      const history = getLocalJSON(`progress_${userId}`, []);
      history.unshift({ ...data, id: Math.random().toString() });
      setLocalJSON(`progress_${userId}`, history);
      return data;
    }
  );
};

export const getMemberProgressHistory = async (userId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'progress');
      const q = query(colRef, where('userId', '==', userId), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => d.data());
    },
    () => getLocalJSON(`progress_${userId}`, [
      { date: '2026-07-01', weight: 84.2, bodyFat: 14.5, chest: 108, waist: 82, arms: 41.5 },
      { date: '2026-06-24', weight: 84.5, bodyFat: 14.7, chest: 107.8, waist: 82.3, arms: 41.4 },
      { date: '2026-06-17', weight: 84.9, bodyFat: 14.9, chest: 107.5, waist: 82.8, arms: 41.2 }
    ])
  );
};

/* ============================================================================
   5. NUTRITION PLANNER
   ============================================================================ */
export const getNutritionLog = async (userId) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'nutrition', userId);
      const snap = await getDoc(docRef);
      return snap.exists() ? snap.data() : null;
    },
    () => getLocalJSON(`nutrition_${userId}`, {
      proteinTarget: 180,
      carbTarget: 320,
      fatTarget: 80,
      waterTarget: 3.5,
      waterIntake: 1.5,
      meals: [
        { id: 1, name: 'Breakfast: Oatmeal, Whey Protein, Banana & Almond Butter', checked: true, protein: 45, carbs: 65, fats: 18, calories: 602 },
        { id: 2, name: 'Lunch: Grilled Chicken Breast, Jasmine Rice & Steamed Broccoli', checked: true, protein: 55, carbs: 70, fats: 8, calories: 572 },
        { id: 3, name: 'Mid-day Snack: Rice Cakes, Almond Butter & Protein Shake', checked: false, protein: 35, carbs: 45, fats: 14, calories: 446 },
        { id: 4, name: 'Dinner: Wild Caught Salmon, Baked Sweet Potato & Asparagus', checked: false, protein: 45, carbs: 50, fats: 22, calories: 578 }
      ]
    })
  );
};

export const updateNutritionLog = async (userId, nutritionData) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'nutrition', userId);
      await setDoc(docRef, nutritionData);
      return nutritionData;
    },
    () => {
      setLocalJSON(`nutrition_${userId}`, nutritionData);
      return nutritionData;
    }
  );
};

/* ============================================================================
   6. TRAINER OPERATIONS
   ============================================================================ */
export const getTrainerSchedule = async (trainerId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'appointments');
      const q = query(colRef, where('trainerId', '==', trainerId));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => [
      { id: 'a1', userName: 'Marcus Chen', date: '2026-07-06', time: '18:00', focus: 'Heavy squats depth checks', status: 'confirmed', type: 'trainer' },
      { id: 'a2', userName: 'Sarah Miller', date: '2026-07-06', time: '09:00', focus: 'Metabolic threshold metrics review', status: 'pending', type: 'trainer' }
    ]
  );
};

export const updateAppointmentStatus = async (apptId, status, notes = '') => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'appointments', apptId);
      await updateDoc(docRef, { status, notes });
      return true;
    },
    () => {
      // Find appt in local storage keys
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('bookings_')) {
          let list = getLocalJSON(key, []);
          list = list.map(item => item.id === apptId ? { ...item, status, notes } : item);
          setLocalJSON(key, list);
        }
      });
      return true;
    }
  );
};

export const getAssignedClients = async (trainerId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'users');
      const q = query(colRef, where('assignedTrainerId', '==', trainerId));
      const snap = await getDocs(q);
      return snap.docs.map(d => d.data());
    },
    () => [
      { uid: 'u1', name: 'Marcus Chen', email: 'marcus.chen@gmail.com', plan: 'Elite Performance', targetCalories: 2800, progress: 'Strength Phase 2' },
      { uid: 'u2', name: 'Sarah Miller', email: 'sarah.miller@yahoo.com', plan: 'Premium Athlete', targetCalories: 2100, progress: 'Lactate conditioning' }
    ]
  );
};

export const updateTrainerScheduleAvailability = async (trainerId, availability) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'trainerSchedules', trainerId);
      await setDoc(docRef, { availability });
      return true;
    },
    () => {
      setLocalJSON(`trainer_sched_${trainerId}`, availability);
      return true;
    }
  );
};

export const getTrainerScheduleAvailability = async (trainerId) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'trainerSchedules', trainerId);
      const snap = await getDoc(docRef);
      return snap.exists() ? snap.data().availability : null;
    },
    () => getLocalJSON(`trainer_sched_${trainerId}`, {
      workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      workingHours: '08:00 - 18:00',
      activeSlots: ['09:00', '10:30', '14:00', '16:00', '17:30']
    })
  );
};

/* ============================================================================
   7. ADMIN OPERATIONS (CRUD & ANALYTICS)
   ============================================================================ */
export const getAdminOverviewMetrics = async () => {
  return executeSafe(
    async () => {
      // Aggregate queries
      const uSnap = await getDocs(collection(db, 'users'));
      const activeCount = uSnap.size;
      return { activeMembers: activeCount, monthlyRevenue: activeCount * 89, growthRate: 15.4 };
    },
    () => ({
      activeMembers: 120,
      monthlyRevenue: 10680,
      growthRate: 15.4,
      totalTrainers: 6,
      totalClassesBooked: 242
    })
  );
};

export const getAdminUsers = async () => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'users');
      const snap = await getDocs(colRef);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_users_db', [
      { id: 'u1', name: 'Marcus Chen', email: 'marcus.chen@gmail.com', role: 'member', plan: 'Elite Performance', status: 'Active' },
      { id: 'u2', name: 'Sarah Miller', email: 'sarah.miller@yahoo.com', role: 'member', plan: 'Premium Athlete', status: 'Active' },
      { id: 'u3', name: 'James Foster', email: 'james.foster@company.com', role: 'member', plan: 'Basic Strength', status: 'Active' },
      { id: 't1', name: 'Marcus Vance', email: 'marcus@momentumfitness.com', role: 'trainer', status: 'Active' },
      { id: 't2', name: 'Sarah Rodriguez', email: 'sarah@momentumfitness.com', role: 'trainer', status: 'Active' },
      { id: 'admin1', name: 'Root Administrator', email: 'admin@momentum.com', role: 'admin', status: 'Active' }
    ])
  );
};

export const updateAdminUser = async (userId, fields) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'users', userId);
      await updateDoc(docRef, fields);
      return true;
    },
    () => {
      const list = getLocalJSON('local_users_db', []);
      const updated = list.map(u => u.id === userId ? { ...u, ...fields } : u);
      setLocalJSON('local_users_db', updated);
      return true;
    }
  );
};

export const deleteAdminUser = async (userId) => {
  return executeSafe(
    async () => {
      const docRef = doc(db, 'users', userId);
      await deleteDoc(docRef);
      return true;
    },
    () => {
      const list = getLocalJSON('local_users_db', []);
      const updated = list.filter(u => u.id !== userId);
      setLocalJSON('local_users_db', updated);
      return true;
    }
  );
};

/* ============================================================================
   8. NOTIFICATION CENTER
   ============================================================================ */
export const getMemberNotifications = async (userId) => {
  return executeSafe(
    async () => {
      const colRef = collection(db, 'notifications');
      const q = query(colRef, where('userId', '==', userId), orderBy('date', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON(`notifications_${userId}`, [
      { id: 'n1', title: 'Workout Program Updated', message: 'Coach Marcus Vance updated heavy squat load requirements.', date: 'Today, 14:15', read: false, type: 'workout' },
      { id: 'n2', title: 'Coaching Session Confirmed', message: 'Your squat form review session is confirmed for Monday.', date: 'Today, 09:30', read: false, type: 'calendar' }
    ])
  );
};

export const markNotificationsAsRead = async (userId, notificationId = null) => {
  return executeSafe(
    async () => {
      if (notificationId) {
        const ref = doc(db, 'notifications', notificationId);
        await updateDoc(ref, { read: true });
      } else {
        const colRef = collection(db, 'notifications');
        const q = query(colRef, where('userId', '==', userId), where('read', '==', false));
        const snap = await getDocs(q);
        const batchPromises = snap.docs.map(d => updateDoc(doc(db, 'notifications', d.id), { read: true }));
        await Promise.all(batchPromises);
      }
      return true;
    },
    () => {
      let list = getLocalJSON(`notifications_${userId}`, []);
      if (notificationId) {
        list = list.map(n => n.id === notificationId ? { ...n, read: true } : n);
      } else {
        list = list.map(n => ({ ...n, read: true }));
      }
      setLocalJSON(`notifications_${userId}`, list);
      return true;
    }
  );
};

export const deleteNotification = async (userId, notificationId) => {
  return executeSafe(
    async () => {
      const ref = doc(db, 'notifications', notificationId);
      await deleteDoc(ref);
      return true;
    },
    () => {
      let list = getLocalJSON(`notifications_${userId}`, []);
      list = list.filter(n => n.id !== notificationId);
      setLocalJSON(`notifications_${userId}`, list);
      return true;
    }
  );
};
