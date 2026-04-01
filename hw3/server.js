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

app.get("/api/games/scores", (req, res) => {
    db.all(
        `SELECT games.*,
        home.name as home_team, away.name as away_team
        FROM games 
        JOIN teams home ON games.home_team_id = home.id
        JOIN teams away ON games.away_team_id = away.id 
        WHERE is_upcoming = 0 
        ORDER BY date DESC LIMIT 10`,
        [],
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

app.get("/api/games/upcoming", (req, res) => {
    db.all(
        `SELECT games.*,
        home.name as home_team, away.name as away_team
        FROM games
        JOIN teams home ON games.home_team_id = home.id
        JOIN teams away ON games.away_team_id = away.id
        WHERE is_upcoming = 1
        ORDER BY date ASC LIMIT 10`,
        [],
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

//start server
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
