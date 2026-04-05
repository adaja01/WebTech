//main server js for webtech assignment 3.
// Sets up express, sessions, logging, database and security, and the routes.
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const path = require("path");
const db = require("./db.js")

const app = express();
const PORT = 3000;

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

//session
app.use(session({
    secret: 'fazewebsite_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

function requireAdmin(req, res, next) {
    if (!req.session.user || !req.session.user.is_admin) {
        return res.status(403).json({ error: "Forbidden" });
    }
    next();
}

function requireLogin(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }
    next();
}

//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//team route 
app.get("/api/teams", (req, res) => {
    db.all("SELECT * FROM teams", [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(rows);
        }
    });
});

//single team
app.get("/api/teams/:id", (req, res) => {
    db.get("SELECT * FROM teams WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else if (!row) {
            return res.status(404).json({ error: "Team not found" });
        }
        else {
            res.json(row);
        }
    });
});

//all players 
app.get("/api/players", (req, res) => {
    db.all("SELECT * FROM players", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else {
            res.json(rows);
        }
    });
});

//single player 
app.get("/api/players/:id", (req, res) => {
    db.get("SELECT * FROM players WHERE id = ?", [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        else if (!row) {
            return res.status(404).json({ error: "Player not found" });
        }
        else {
            res.json(row);
        }
    });
});

//last 10 scores sorted on how recent they were.
app.get("/api/games/scores", (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;

    db.all(
        `SELECT games.*,
        home.name as home_team, away.name as away_team
        FROM games 
        JOIN teams home ON games.home_team_id = home.id
        JOIN teams away ON games.away_team_id = away.id 
        WHERE is_upcoming = 0 
        ORDER BY date DESC LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            else {
                res.json(rows);
            }
        }
    );
});

//upcoming 10 games sorted in ascending order.
app.get("/api/games/upcoming", (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const offset = parseInt(req.query.offset) || 0;
    db.all(
        `SELECT games.*,
        home.name as home_team, away.name as away_team
        FROM games
        JOIN teams home ON games.home_team_id = home.id
        JOIN teams away ON games.away_team_id = away.id
        WHERE is_upcoming = 1
        ORDER BY date ASC LIMIT ? OFFSET ?`,
        [limit, offset],
        (err, rows) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            else {
                res.json(rows);
            }
        }
    );
});

//leaderboard api call sorted on points with map diff as tie breaker in case of same amount of points.
app.get("/api/leaderboard", (req, res) => {
    db.all("SELECT * FROM teams", [], (err, teams) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        db.all("SELECT * FROM games WHERE is_upcoming = 0", [], (err, games) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            const leaderboard = teams.map(team => {
                const homeGames = games.filter(g => g.home_team_id === team.id);
                const awayGames = games.filter(g => g.away_team_id === team.id);

                const homeWins = homeGames.filter(g => g.home_score > g.away_score).length;
                const awayWins = awayGames.filter(g => g.away_score > g.home_score).length;
                const wins = homeWins + awayWins;
                const total = homeGames.length + awayGames.length;
                const losses = total - wins;

                const mapsWon = homeGames.reduce((sum, g) => sum + g.home_score, 0)
                    + awayGames.reduce((sum, g) => sum + g.away_score, 0);
                const mapsLost = homeGames.reduce((sum, g) => sum + g.away_score, 0)
                    + awayGames.reduce((sum, g) => sum + g.home_score, 0);
                return {
                    id: team.id,
                    name: team.name,
                    logo: team.logo,
                    total,
                    wins,
                    losses,
                    points: wins * 2,
                    map_diff: mapsWon - mapsLost
                };
            });

            leaderboard.sort((a, b) => b.points - a.points || b.map_diff - a.map_diff);
            res.json(leaderboard);
        });
    });
});

//players from a specific team
app.get("/api/teams/:id/players", (req, res) => {
    db.all("SELECT * FROM players WHERE team_id = ?", [req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

//games from a specific team
app.get("/api/teams/:id/games", (req, res) => {
    db.all("SELECT * FROM games WHERE home_team_id = ? OR away_team_id = ?", [req.params.id, req.params.id], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// API auth routes

//register api call 
app.post("/api/register", async (req, res) => {
    const { first_name, last_name, email, password, favorite_team_id } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (row) {
            return res.status(400).json({ error: "Email already in use." });
        }

        const hashedpw = await bcrypt.hash(password, 10);

        db.run(
            "INSERT INTO users (first_name, last_name, email, password, favorite_team_id, is_admin) VALUES (?, ?, ?, ?, ?, 0)",
            [first_name, last_name, email, hashedpw, favorite_team_id],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                res.json({ message: "Registration succesful!" });
            }
        );
    });

});

// login api call
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!user) {
            return res.status(401).json({ error: "Invalid Credentials!" });
        }

        const pwMatch = await bcrypt.compare(password, user.password);

        if (!pwMatch) {
            return res.status(401).json({ error: "Invalid Credentials" });
        }

        req.session.user = {
            id: user.id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            is_admin: user.is_admin,
            favorite_team_id: user.favorite_team_id
        };
        res.json({ message: "Login succesful!", user: req.session.user });
    });
});

//logout api call
app.post("/api/logout", (req, res) => {
    req.session.destroy();
    res.json({ message: "Logged out succesfully!" });
});

//Get current logged in user
app.get("/api/me", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Not logged in" });
    }
    res.json(req.session.user);
});

//Profile api routes

//Update profile
app.put("/api/profile", requireLogin, async (req, res) => {
    const { first_name, last_name, email, current_pw, new_pw, favorite_team_id } = req.body;

    const updatedFirstName = first_name || req.session.user.first_name;
    const updatedLastName = last_name || req.session.user.last_name;
    const updatedTeam = favorite_team_id || req.session.user.favorite_team_id;

    //check if new email is not in use
    if (email && email !== req.session.user.email) {
        const existing = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        if (existing) {
            return res.status(400).json({ error: "Email already in use." });
        }
    }
    const updatedEmail = email || req.session.user.email;

    //handle password change if a new password was entered
    let updatedPassword = null;
    if (new_pw) {
        if (!current_pw) {
            return res.status(400).json({ error: "Current password required!" });
        }
        //get current hashed pw
        const user = await new Promise((resolve, reject) => {
            db.get("SELECT * FROM users WHERE id = ?", [req.session.user.id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
        const pwMatch = await bcrypt.compare(current_pw, user.password);
        if (!pwMatch) {
            return res.status(401).json({ error: "Current password incorrect!" });
        }
        updatedPassword = await bcrypt.hash(new_pw, 10);
    }

    //update user, depending on if password has been changed
    if (updatedPassword) {
        db.run(
            "UPDATE users SET first_name=?, last_name=?, email=?, password=?, favorite_team_id=? WHERE id=?",
            [updatedFirstName, updatedLastName, updatedEmail, updatedPassword, updatedTeam, req.session.user.id],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                req.session.user = { ...req.session.user, first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail, favorite_team_id: updatedTeam };
                res.json({ message: "Profile updated!" });
            }
        );
    }
    else {
        db.run(
            "UPDATE users SET first_name=?, last_name=?, email=?, favorite_team_id=? WHERE id=?",
            [updatedFirstName, updatedLastName, updatedEmail, updatedTeam, req.session.user.id],
            (err) => {
                if (err) {
                    return res.status(500).json({ error: err.message });
                }
                req.session.user = { ...req.session.user, first_name: updatedFirstName, last_name: updatedLastName, email: updatedEmail, favorite_team_id: updatedTeam };
                res.json({ message: "Profile updated!" });
            }
        );
    }
});

//Admin routes

//update score
app.put("/api/games/:id/score", requireAdmin, (req, res) => {
    const { home_score, away_score } = req.body;

    db.run(
        "UPDATE games SET home_score=?, away_score=?, is_upcoming=0 WHERE id=?",
        [home_score, away_score, req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Score updated succesfully!" });
        }
    );
});

//add player
app.post("/api/players", requireAdmin, (req, res) => {
    const { first_name, last_name, nationality, date_of_birth, role, number, photo, team_id } = req.body;
    db.run(
        "INSERT INTO players (first_name, last_name, nationality, date_of_birth, role, number, photo, team_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [first_name, last_name, nationality, date_of_birth, role, number, photo, team_id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Player added succesfully!" });
        }
    );
});

//remove player
app.delete("/api/players/:id", requireAdmin, (req, res) => {
    db.run(
        "DELETE FROM players WHERE id=?",
        [req.params.id],
        (err) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.json({ message: "Player deleted succesfully!" });
        }
    );
});

//start server
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
