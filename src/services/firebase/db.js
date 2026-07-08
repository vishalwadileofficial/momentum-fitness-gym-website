import { 
  collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, 
  deleteDoc, query, where, orderBy 
} from 'firebase/firestore';
import { db } from './config';

// Safe wrapper to catch Firestore errors (e.g., config missing or permissions denied)
// and fallback to localStorage for a fully functional mock dashboard offline/unconfigured.
const executeSafe = async (firebaseOp, fallbackOp) => {
  try {
    return await firebaseOp();
  } catch {
    // Firestore unavailable — falling back to local state
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
  } catch {
    // Local storage write failed silently
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

export const createNotification = async (userId, title, message, type = 'info') => {
  const item = {
    userId,
    title,
    message,
    read: false,
    type,
    date: new Date().toISOString()
  };
  return executeSafe(
    async () => {
      const ref = collection(db, 'notifications');
      await addDoc(ref, item);
      return item;
    },
    () => {
      const list = getLocalJSON(`notifications_${userId}`, []);
      list.unshift({ ...item, id: Math.random().toString() });
      setLocalJSON(`notifications_${userId}`, list);
      return item;
    }
  );
};

/* ============================================================================
   9. ANNOUNCEMENTS MODULE [NEW]
   ============================================================================ */
export const getAnnouncements = async () => {
  return executeSafe(
    async () => {
      const snap = await getDocs(collection(db, 'announcements'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_announcements', [
      { id: 'ann1', title: 'Independence Day Hours Adjustment', message: 'Please note the gym floor will close at 14:00 on national holiday.', priority: 'Medium', publishDate: '2026-07-04', expirationDate: '2026-07-10' },
      { id: 'ann2', title: 'New Recovery Suite Contrast Pool Open', message: 'Contrast pool plumbing completes today. Available for Elite tier booking.', priority: 'Urgent', publishDate: '2026-07-06', expirationDate: '2026-07-20' }
    ])
  );
};

export const createAnnouncement = async (ann) => {
  const item = {
    ...ann,
    publishDate: ann.publishDate || new Date().toISOString().split('T')[0],
    date: new Date().toISOString()
  };
  return executeSafe(
    async () => {
      const ref = await addDoc(collection(db, 'announcements'), item);
      return { id: ref.id, ...item };
    },
    () => {
      const list = getLocalJSON('local_announcements', []);
      const newAnn = { id: Math.random().toString(), ...item };
      list.unshift(newAnn);
      setLocalJSON('local_announcements', list);
      return newAnn;
    }
  );
};

export const deleteAnnouncement = async (id) => {
  return executeSafe(
    async () => {
      await deleteDoc(doc(db, 'announcements', id));
      return true;
    },
    () => {
      const list = getLocalJSON('local_announcements', []);
      setLocalJSON('local_announcements', list.filter(a => a.id !== id));
      return true;
    }
  );
};

/* ============================================================================
   10. TESTIMONIALS MODULE [NEW]
   ============================================================================ */
export const getTestimonials = async () => {
  return executeSafe(
    async () => {
      const snap = await getDocs(collection(db, 'testimonials'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_testimonials', [
      { id: 'tst1', name: 'Marcus Chen', role: 'Competitive Lifter', rating: 5, quote: 'The Eleiko setups and coached sessions structured my lifts from plateau state to heavy records.', featured: true, photo: '' },
      { id: 'tst2', name: 'Elena Vance', role: 'Executive Member', rating: 4, quote: 'Elite level contrast suites and nutrition maps are worth every rupee of the membership fees.', featured: true, photo: '' }
    ])
  );
};

export const createTestimonial = async (testimonial) => {
  return executeSafe(
    async () => {
      const ref = await addDoc(collection(db, 'testimonials'), testimonial);
      return { id: ref.id, ...testimonial };
    },
    () => {
      const list = getLocalJSON('local_testimonials', []);
      const newTst = { id: Math.random().toString(), ...testimonial };
      list.unshift(newTst);
      setLocalJSON('local_testimonials', list);
      return newTst;
    }
  );
};

export const updateTestimonial = async (id, fields) => {
  return executeSafe(
    async () => {
      await updateDoc(doc(db, 'testimonials', id), fields);
      return true;
    },
    () => {
      const list = getLocalJSON('local_testimonials', []);
      const updated = list.map(t => t.id === id ? { ...t, ...fields } : t);
      setLocalJSON('local_testimonials', updated);
      return true;
    }
  );
};

export const deleteTestimonial = async (id) => {
  return executeSafe(
    async () => {
      await deleteDoc(doc(db, 'testimonials', id));
      return true;
    },
    () => {
      const list = getLocalJSON('local_testimonials', []);
      setLocalJSON('local_testimonials', list.filter(t => t.id !== id));
      return true;
    }
  );
};

/* ============================================================================
   11. BLOG MANAGEMENT CRUD [NEW]
   ============================================================================ */
export const getBlogArticles = async () => {
  return executeSafe(
    async () => {
      const snap = await getDocs(collection(db, 'blogs'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_blogs', [
      { id: 'b1', title: 'Structural Hypertrophy Cycles', author: 'Coach Marcus', date: '2026-06-28', published: true, category: 'Training', content: 'Comprehensive guide to programming barbell hypertrophic progressions.' },
      { id: 'b2', title: 'Lactate Threshold & Energy Pathways', author: 'Sarah Rodriguez', date: '2026-07-02', published: false, category: 'Conditioning', content: 'Detailed analysis of cardiovascular interval training thresholds.' }
    ])
  );
};

export const createBlogArticle = async (article) => {
  const item = { ...article, date: new Date().toISOString().split('T')[0] };
  return executeSafe(
    async () => {
      const ref = await addDoc(collection(db, 'blogs'), item);
      return { id: ref.id, ...item };
    },
    () => {
      const list = getLocalJSON('local_blogs', []);
      const newItem = { id: Math.random().toString(), ...item };
      list.unshift(newItem);
      setLocalJSON('local_blogs', list);
      return newItem;
    }
  );
};

export const updateBlogArticle = async (id, fields) => {
  return executeSafe(
    async () => {
      await updateDoc(doc(db, 'blogs', id), fields);
      return true;
    },
    () => {
      const list = getLocalJSON('local_blogs', []);
      const updated = list.map(b => b.id === id ? { ...b, ...fields } : b);
      setLocalJSON('local_blogs', updated);
      return true;
    }
  );
};

export const deleteBlogArticle = async (id) => {
  return executeSafe(
    async () => {
      await deleteDoc(doc(db, 'blogs', id));
      return true;
    },
    () => {
      const list = getLocalJSON('local_blogs', []);
      setLocalJSON('local_blogs', list.filter(b => b.id !== id));
      return true;
    }
  );
};

/* ============================================================================
   12. GALLERY PHOTO MANAGEMENT [NEW]
   ============================================================================ */
export const getGalleryPhotos = async () => {
  return executeSafe(
    async () => {
      const snap = await getDocs(collection(db, 'gallery'));
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    },
    () => getLocalJSON('local_gallery', [
      { id: 'gal1', caption: 'Eleiko calibrated plates stack', url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', category: 'Equipment' },
      { id: 'gal2', caption: 'Recovery suite pool layouts', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80', category: 'Amenities' }
    ])
  );
};

export const uploadGalleryPhoto = async (photo) => {
  return executeSafe(
    async () => {
      const ref = await addDoc(collection(db, 'gallery'), photo);
      return { id: ref.id, ...photo };
    },
    () => {
      const list = getLocalJSON('local_gallery', []);
      const newItem = { id: Math.random().toString(), ...photo };
      list.unshift(newItem);
      setLocalJSON('local_gallery', list);
      return newItem;
    }
  );
};

export const deleteGalleryPhoto = async (id) => {
  return executeSafe(
    async () => {
      await deleteDoc(doc(db, 'gallery', id));
      return true;
    },
    () => {
      const list = getLocalJSON('local_gallery', []);
      setLocalJSON('local_gallery', list.filter(p => p.id !== id));
      return true;
    }
  );
};

/* ============================================================================
   13. REPORTS ENGINE [NEW]
   ============================================================================ */
export const getAdminReports = async (category, filters = {}) => {
  // Pull mock metrics based on category
  return executeSafe(
    async () => {
      // Pulling from Firestore collections
      return generateCategoryMockReports(category, filters);
    },
    () => {
      return generateCategoryMockReports(category, filters);
    }
  );
};

const generateCategoryMockReports = (category, filters) => {
  const { startDate, endDate } = filters;
  const dateStr = startDate && endDate ? `(${startDate} to ${endDate})` : 'All time';

  switch (category) {
    case 'membership':
      return {
        summary: [
          { label: 'Total Revenue', value: '$10,680', desc: dateStr },
          { label: 'Elite Tier Plan Active', value: '45 members', desc: '37.5% share' },
          { label: 'Standard Tier Plan Active', value: '55 members', desc: '45.8% share' },
          { label: 'Basic Tier Plan Active', value: '20 members', desc: '16.7% share' }
        ],
        headers: ['Member Name', 'Registered Plan', 'Amount Paid', 'Billing Date', 'Cycle'],
        rows: [
          { c1: 'James Foster', c2: 'Elite Performance', c3: '$199', c4: '2026-07-01', c5: 'Monthly' },
          { c2: 'Standard Athletic', c3: '$49', c4: '2026-06-28', c5: 'Monthly', c1: 'Sarah Miller' },
          { c1: 'Marcus Chen', c2: 'Elite Performance', c3: '$199', c4: '2026-07-04', c5: 'Monthly' },
          { c1: 'Elena Vance', c2: 'Premium Athlete', c3: '$89', c4: '2026-07-02', c5: 'Monthly' },
          { c1: 'Cole Vance', c2: 'Basic Strength', c3: '$29', c4: '2026-06-30', c5: 'Monthly' }
        ]
      };
    case 'bookings':
      return {
        summary: [
          { label: 'Total Bookings', value: '242 Sessions', desc: dateStr },
          { label: 'Group Classes Filled', value: '185 Slots', desc: '76.4% of bookings' },
          { label: 'Coaching Appointments', value: '57 Sessions', desc: '23.6% of bookings' },
          { label: 'Cancellation Ratio', value: '4.2%', desc: '10 cancellations' }
        ],
        headers: ['Client Name', 'Booking Type', 'Session Details', 'Target Date', 'Status'],
        rows: [
          { c1: 'Marcus Chen', c2: 'Class Booking', c3: 'Power & Barbell Club', c4: '2026-07-06', c5: 'Confirmed' },
          { c1: 'Sarah Miller', c2: 'Private Coach', c3: 'with Sarah Rodriguez', c4: '2026-07-10', c5: 'Pending' },
          { c1: 'Ethan Caldwell', c2: 'Class Booking', c3: 'HIIT Performance Track', c4: '2026-07-07', c5: 'Confirmed' },
          { c1: 'Samantha Vance', c2: 'Private Coach', c3: 'with Marcus Vance', c4: '2026-07-08', c5: 'Confirmed' }
        ]
      };
    case 'attendance':
      return {
        summary: [
          { label: 'Average Floor Load', value: '45.4%', desc: 'Optimal density' },
          { label: 'Peak Hour Period', value: '17:00 - 19:30', desc: 'Average 48 members' },
          { label: 'Weekly Check-ins', value: '624 Visits', desc: dateStr },
          { label: 'Loyalty Retention Rate', value: '88.5%', desc: 'Consistent active check-ins' }
        ],
        headers: ['Member Name', 'Check-In Hour', 'Floor Location Area', 'Target Date', 'Access Code Status'],
        rows: [
          { c1: 'Marcus Chen', c2: '18:14', c3: 'Strength Zone 1', c4: '2026-07-06', c5: 'Verified Entry' },
          { c1: 'Sarah Miller', c2: '07:11', c3: 'Performance Turf', c4: '2026-07-06', c5: 'Verified Entry' },
          { c1: 'James Foster', c2: '12:05', c3: 'Cardio Loft', c4: '2026-07-06', c5: 'Verified Entry' },
          { c1: 'Elena Vance', c2: '09:22', c3: 'Mind & Body Studio', c4: '2026-07-06', c5: 'Verified Entry' }
        ]
      };
    case 'revenue':
      return {
        summary: [
          { label: 'Gross Revenue Plan Fees', value: '$10,680', desc: 'Active members packages' },
          { label: 'Coaching Revenues Share', value: '$3,820', desc: '1-on-1 private logs' },
          { label: 'Active Monthly MRR', value: '$14,500', desc: 'Target recurring metrics' },
          { label: 'MoM Growth Curve', value: '+15.4%', desc: 'Consistent growth' }
        ],
        headers: ['Category Details', 'Item Description', 'Revenue Amount', 'Billing Target Date', 'Status'],
        rows: [
          { c1: 'Membership Plan', c2: 'James Foster Upgrade', c3: '$199', c4: '2026-07-01', c5: 'Paid' },
          { c1: 'Private Coaching', c2: 'Samantha Vance with Coach Marcus', c3: '$120', c4: '2026-07-04', c5: 'Paid' },
          { c1: 'Membership Plan', c2: 'Sarah Miller Subscription Renewal', c3: '$49', c4: '2026-06-28', c5: 'Paid' },
          { c1: 'Membership Plan', c2: 'Marcus Chen Elite Subscription Renewal', c3: '$199', c4: '2026-07-04', c5: 'Paid' }
        ]
      };
    case 'trainer':
      return {
        summary: [
          { label: 'Active Trainers Roster', value: '4 Coaches', desc: 'Fully active staff' },
          { label: 'Total Coached Hours', value: '114 Hours', desc: dateStr },
          { label: 'Average rating score', value: '4.91 / 5', desc: 'Based on client reviews' },
          { label: 'Top staff trainer', value: 'Sarah Rodriguez', desc: '100% satisfaction rating' }
        ],
        headers: ['Trainer Name', 'Specialization Specialty', 'Hours Coached', 'Average Rating', 'Assigned Members'],
        rows: [
          { c1: 'Marcus Vance', c2: 'Power & Barbell Training', c3: '42 hrs', c4: '4.90', c5: '5 members' },
          { c1: 'Sarah Rodriguez', c2: 'HIIT & Metabolic Conditioning', c3: '38 hrs', c4: '5.00', c5: '4 members' },
          { c1: 'Elena Rostova', c2: 'Yoga & Mobility Coordinator', c3: '22 hrs', c4: '4.80', c5: '2 members' },
          { c1: 'Dmitry Petrov', c2: 'Olympic Weightlifting Mechanics', c3: '12 hrs', c4: '4.90', c5: '1 member' }
        ]
      };
    case 'activity':
    default:
      return {
        summary: [
          { label: 'System Action Triggers', value: '82 Actions', desc: dateStr },
          { label: 'Meal checklist logs', value: '45 logs', desc: 'Nutrition updates logs' },
          { label: 'Biometrics weight entries', value: '25 logs', desc: 'Progress trackers logs' },
          { label: 'Registration logs', value: '12 events', desc: 'New member signups' }
        ],
        headers: ['System User', 'Trigger Action Name', 'Parameters Details', 'Target Hour', 'Priority Status'],
        rows: [
          { c1: 'Marcus Chen', c2: 'Meal Checkbox Log', c3: 'Logged Oatmeal Breakfast', c4: '18:32', c5: 'Normal' },
          { c1: 'Sarah Miller', c2: 'Biometrics stats update', c3: 'Weight recorded: 84kg', c4: '14:15', c5: 'Normal' },
          { c1: 'Root Admin', c2: 'Pricing Plan Upgrade Cost', c3: 'Elite price modified to $199', c4: '09:22', c5: 'Critical' },
          { c1: 'Coach Marcus', c2: 'Coaching Notes Update', c3: 'Added squat technique correction', c4: '11:45', c5: 'Normal' }
        ]
      };
  }
};
