/**
 * auth.js - Client-side authentication and user session management
 * Handles login, logout, registration, and user session state
 * Provides utilities for updating UI based on user role and favorite team
 */

/**
 * Fetch current logged-in user from server
 * @returns {Promise<Object|null>} User object if logged in, null otherwise
 */
async function getCurrentUser() {
  try {
    const response = await fetch("/api/me");
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}

/**
 * Register a new user account
 * @param {string} firstName - User's first name
 * @param {string} lastName - User's last name
 * @param {string} email - User's email (login)
 * @param {string} password - User's password
 * @param {number} favoriteTeamId - ID of user's favorite team
 * @returns {Promise<Object>} Response object with message or error
 */
async function register(
  firstName,
  lastName,
  email,
  password,
  favoriteTeamId
) {
  const response = await fetch("/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      favorite_team_id: favoriteTeamId,
    }),
  });

  return await response.json();
}

/**
 * Login user with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise<Object>} Response object with user data or error
 */
async function login(email, password) {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return await response.json();
}

/**
 * Logout current user
 * @returns {Promise<Object>} Response object with message
 */
async function logout() {
  const response = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

/**
 * Update user profile
 * @param {Object} updates - Object containing fields to update (first_name, last_name, email, new_pw, current_pw, favorite_team_id)
 * @returns {Promise<Object>} Response object with message or error
 */
async function updateProfile(updates) {
  const response = await fetch("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return await response.json();
}

/**
 * Build and insert header with auth UI based on user session state
 * Handles both guest and logged-in user displays
 */
async function initializeHeader() {
  const user = await getCurrentUser();
  const headerContainer = document.querySelector("header");

  if (!headerContainer) {
    console.warn("No header element found");
    return;
  }

  // Create auth section in header
  const authSection = document.createElement("div");
  authSection.className = "auth-section";

  if (user) {
    // Logged-in user UI
    authSection.innerHTML = `
      <div class="auth-section__user">
        <span class="auth-section__welcome">Welcome, ${user.first_name}!</span>
        <a href="profile.html" class="auth-section__link">Profile</a>
        <button class="auth-section__logout-btn" onclick="handleLogout()">Logout</button>
      </div>
    `;
  } else {
    // Guest UI
    authSection.innerHTML = `
      <div class="auth-section__guest">
        <a href="login.html" class="auth-section__link">Login</a>
        <a href="register.html" class="auth-section__link">Register</a>
      </div>
    `;
  }

  headerContainer.insertBefore(authSection, headerContainer.firstChild);
}

/**
 * Handle logout button click
 */
async function handleLogout() {
  await logout();
  window.location.href = "index.html";
}

/**
 * Get CSS class name for highlighting favorite team
 * Used to apply special styling to user's favorite team
 * @param {number} teamId - The team ID to check
 * @param {Object} user - Current user object
 * @returns {string} CSS class name or empty string
 */
function getFavoriteTeamClass(teamId, user) {
  if (user && user.favorite_team_id === teamId) {
    return "favorite-team";
  }
  return "";
}

/**
 * Highlight all elements related to user's favorite team
 * Applies "favorite-team" class to team rows, player rows, etc.
 */
async function highlightFavoriteTeam() {
  const user = await getCurrentUser();
  if (!user) return;

  // Find all team elements with data-team-id attribute
  const teamElements = document.querySelectorAll("[data-team-id]");
  teamElements.forEach((el) => {
    if (parseInt(el.dataset.teamId) === user.favorite_team_id) {
      el.classList.add("favorite-team");
    }
  });
}

// Auto-initialize header when script loads if header exists
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("header")) {
    initializeHeader();
  }
  highlightFavoriteTeam();
});

