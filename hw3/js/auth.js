const API_BASE = "/group41";

async function apiCall(endpoint, options = {}) {
  return fetch(API_BASE + endpoint, options);
}

/**
 * Fetch current logged-in user from server
 */
async function getCurrentUser() {
  try {
    const response = await apiCall("/api/me");
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
 */
async function register(
  firstName,
  lastName,
  email,
  password,
  favoriteTeamId
) {
  const response = await apiCall("/api/register", {
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
 */
async function login(email, password) {
  const response = await apiCall("/api/login", {
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
 */
async function logout() {
  const response = await apiCall("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}

/**
 * Update user profile
 */
async function updateProfile(updates) {
  const response = await apiCall("/api/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updates),
  });

  return await response.json();
}

async function initializeHeader() {
  const user = await getCurrentUser();
  const headerContainer = document.querySelector("header");

  if (!headerContainer) {
    console.warn("No header element found");
    return;
  }

  // Only add auth section to headers with the main nav (not team-specific pages)
  const mainNav = headerContainer.querySelector(".nav:not(.team-nav)");
  if (!mainNav) {
    return; // Skip adding auth section on team detail pages
  }

  // Create auth section in header
  const authSection = document.createElement("div");
  authSection.className = "auth-section";

  if (user) {
     // Logged-in user UI
     const adminLink = user.is_admin ? "<a href=\"admin.html\" class=\"auth-section__link\">Admin</a>" : "";
     authSection.innerHTML = `
       <div class="auth-section__user">
         <span class="auth-section__welcome">Welcome, ${user.first_name}!</span>
         <a href="profile.html" class="auth-section__link">Profile</a>
         ${adminLink}
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
 */
function getFavoriteTeamClass(teamId, user) {
  if (user && user.favorite_team_id === teamId) {
    return "favorite-team";
  }
  return "";
}

/**
 * Highlight all elements related to user's favorite team
 */
async function highlightFavoriteTeam() {
  const user = await getCurrentUser();
  if (!user) {return;}

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

