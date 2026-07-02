/**
 * Maps a Firebase auth error code to a user-friendly error message.
 * @param {Object|string} error The Firebase error object or error code string.
 * @returns {string} User-friendly message.
 */
export const getFriendlyErrorMessage = (error) => {
  const code = typeof error === 'string' ? error : error?.code;
  
  switch (code) {
    case 'auth/weak-password':
      return 'The password is too weak. It must be at least 6 characters long.';
    case 'auth/email-already-in-use':
      return 'This email address is already registered to another account.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/invalid-credential':
      return 'Invalid login credentials. Please check your email and password.';
    case 'auth/too-many-requests':
      return 'Too many login attempts. Please try again later.';
    case 'auth/popup-closed-by-user':
      return 'The sign-in popup was closed before completion. Please try again.';
    case 'auth/cancelled-popup-request':
      return 'The sign-in popup request was cancelled.';
    case 'auth/network-request-failed':
      return 'A network error occurred. Please check your internet connection.';
    default:
      return error?.message || 'An unexpected error occurred. Please try again.';
  }
};
