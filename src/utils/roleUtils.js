/**
 * Checks if a user has the 'admin' role.
 * @param {Object} user - The user object containing role property
 * @returns {boolean}
 */
export const isAdmin = (user) => {
  return user?.role === 'admin';
};

/**
 * Checks if a user has the 'trainer' role.
 * @param {Object} user - The user object containing role property
 * @returns {boolean}
 */
export const isTrainer = (user) => {
  return user?.role === 'trainer';
};

/**
 * Checks if a user has the 'member' role.
 * @param {Object} user - The user object containing role property
 * @returns {boolean}
 */
export const isMember = (user) => {
  return user?.role === 'member';
};

/**
 * Checks if a user has any of the specified roles.
 * @param {Object} user - The user object containing role property
 * @param {string[]} allowedRoles - List of allowed roles
 * @returns {boolean}
 */
export const hasRole = (user, allowedRoles) => {
  if (!user || !allowedRoles || !Array.isArray(allowedRoles)) {
    return false;
  }
  return allowedRoles.includes(user.role);
};
