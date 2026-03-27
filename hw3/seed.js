const db = require("./db.js");
const bcrypt = require("bcrypt");

const teams = [
    {name : "FaZe Clan", logo : "assets/images/faze-logo-og.png", country : "United States"},
    {name : "Astralis", logo : "assets/images/teams/astralis_team.png", country : "Denmark"},
    {name : "BIG", logo : "assets/images/teams/BIG-logo.png", country : "Germany"},
    {name : "G2 Esports", logo : "assets/images/teams/G2-logo.png", country : "Spain"},
    {name : "Team Liquid", logo : "assets/images/teams/Liquid-logo.png", country : "United States"},
    {name : "Fnatic", logo : "assets/images/teams/Fnatic-logo.png", country : "United Kingdom"},
    {name : "Ninjas in Pyjamas", logo : "assets/images/teams/NIP-logo.png", country : "Sweden"},
    {name : "MOUZ", logo : "assets/images/teams/MOUZ-logo.png", country : "Germany"},
    {name : "HEROIC", logo : "assets/images/HEROIC-logo.png", country : "Denmark"},
    {name : "Natus Vincere", logo : "assets/images/NV-logo.png", country : "Ukraine"}
];

const players = [
    {
        first_name: "Finn",
        last_name: "Andersen",
        nationality: "Denmark",
        born: "1990-04-14",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Finn-Andersen.jpg",
        team_id: 1
    },
    {
        first_name: "Helvijs",
        last_name: "Saukants",
        nationality: "Latvia",
        born: "2001-02-14",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Helvijs-Saukants.jpg",
        team_id: 1
    },
    {
        first_name: "David",
        last_name: "Čerňanský",
        nationality: "Slovakia",
        born: "2002-07-18",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/David-Čerňanský.jpg",
        team_id: 1
    },
    {
        first_name: "Jakub",
        last_name: "Pietruszewski",
        nationality: "Poland",
        born: "2004-01-27",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Jakub-Pietruszweski.jpg",
        team_id: 1
    },
    {
        first_name: "Russel",
        last_name: "Van Dulken",
        nationality: "Canada",
        born: "1999-11-14",
        role: "Support",
        number: null,
        photo: "assets/images/players/Russel-Van-Dulken.jpg",
        team_id: 1
    },

    {
        first_name: "Victor",
        last_name: "Hansen",
        nationality: "Denmark",
        born: "2004-07-19",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Victor-Staehr.jpg",
        team_id: 2
    },
    {
        first_name: "Jakob",
        last_name: "Sørensen",
        nationality: "Denmark",
        born: "2003-07-23",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Jakob-Nygaard.jpg",
        team_id: 2
    },
    {
        first_name: "Rasmus",
        last_name: "Nielsen",
        nationality: "Denmark",
        born: "1995-05-21",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Rasmus-Nielsen.jpg",
        team_id: 2
    },
    {
        first_name: "Nils",
        last_name: "Smidebrant",
        nationality: "Sweden",
        born: "2002-09-24",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Nils-Smidebrant.jpg",
        team_id: 2
    },
    {
        first_name: "Gytis",
        last_name: "Glušauskas",
        nationality: "Lithuania",
        born: "2004-07-25",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Gytis-Glušauskas.jpg",
        team_id: 2
    },

    {
        first_name: "Johannes",
        last_name: "Wodarz",
        nationality: "Germany",
        born: "1995-04-05",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Johannes-Wodarz.jpg",
        team_id: 3
    },
    {
        first_name: "Jon",
        last_name: "de Castro",
        nationality: "Germany",
        born: "2000-04-07",
        role: "Support",
        number: null,
        photo: "assets/images/players/Jon-de-Castro.jpg",
        team_id: 3
    },
    {
        first_name: "Gleb",
        last_name: "Gazin",
        nationality: "Belarus",
        born: "2005-10-24",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Gleb-Gazin.jpg",
        team_id: 3
    },
    {
        first_name: "Benjamin",
        last_name: "Bremer",
        nationality: "Denmark",
        born: "1997-06-10",
        role: "Lurker",
        number: null,
        photo: "assets/images/players/Benjamin-Bremer.jpg",
        team_id: 3
    },
    {
        first_name: "Josef",
        last_name: "Baumann",
        nationality: "Germany",
        born: "2000-02-08",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Josef-Baumann.jpg",
        team_id: 3
    },

    {
        first_name: "Nemanja",
        last_name: "Kovač",
        nationality: "Bosnia and Herzegovina",
        born: "1996-01-03",
        role: "Lurker",
        number: null,
        photo: "assets/images/players/Nemanja-Kovač.jpg",
        team_id: 4
    },
    {
        first_name: "Nikita",
        last_name: "Martynenko",
        nationality: "Israel",
        born: "2002-07-24",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Nikita-Martynenko.jpg",
        team_id: 4
    },
    {
        first_name: "Álvaro",
        last_name: "García",
        nationality: "Spain",
        born: "1998-11-19",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Álvaro-García.jpg",
        team_id: 4
    },
    {
        first_name: "Matúš",
        last_name: "Šimko",
        nationality: "Slovakia",
        born: "2002-04-21",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Matúš-Šimko.jpg",
        team_id: 4
    },
    {
        first_name: "Guy",
        last_name: "Iluz",
        nationality: "Israel",
        born: "1999-07-12",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Guy-Iluz.jpg",
        team_id: 4
    },

    {
        first_name: "Keith",
        last_name: "Markovic",
        nationality: "Canada",
        born: "1997-11-24",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Keith-Markovic.jpg",
        team_id: 5
    },
    {
        first_name: "Roland",
        last_name: "Tomkowiak",
        nationality: "Poland",
        born: "2003-11-29",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Roland-Tomkowiak.jpg",
        team_id: 5
    },
    {
        first_name: "Kamil",
        last_name: "Szkaradek",
        nationality: "Poland",
        born: "2002-08-26",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Kamil-Szkaradek.jpg",
        team_id: 5
    },
    {
        first_name: "Jonathan",
        last_name: "Jablonowski",
        nationality: "United States",
        born: "1997-07-16",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Jonathan-Jablonowski.jpg",
        team_id: 5
    },
    {
        first_name: "Mario",
        last_name: "Diaz",
        nationality: "Guatemala",
        born: "2002-10-17",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Mario-Diaz.jpg",
        team_id: 5
    },

    {
        first_name: "Lars",
        last_name: "Johansson",
        nationality: "Sweden",
        born: "1994-04-25",
        role: "Support",
        number: null,
        photo: "assets/images/players/Freddy-Johansson.jpg",
        team_id: 6
    },
    {
        first_name: "Rodion",
        last_name: "Smyk",
        nationality: "Ukraine",
        born: "2000-11-20",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Rodion-Smyk.jpg",
        team_id: 6
    },
    {
        first_name: "Dmytro",
        last_name: "Semera",
        nationality: "Ukraine",
        born: "2004-10-14",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Dmytro-Semera.jpg",
        team_id: 6
    },
    {
        first_name: "Mykyta",
        last_name: "Skyba",
        nationality: "Ukraine",
        born: "2007-05-28",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Mykyta-Skyba.jpg",
        team_id: 6
    },
    {
        first_name: "Viktor",
        last_name: "Kondratets",
        nationality: "Ukraine",
        born: "2006-02-21",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Viktor-Kondratets.jpg",
        team_id: 6
    },

    {
        first_name: "Artem",
        last_name: "Moroz",
        nationality: "Ukraine",
        born: "2004-10-27",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Artem-Moroz.jpg",
        team_id: 7
    },
    {
        first_name: "Rasmus",
        last_name: "Beck",
        nationality: "Denmark",
        born: "1999-01-03",
        role: "Support",
        number: null,
        photo: "assets/images/players/Rasmus-Beck.jpg",
        team_id: 7
    },
    {
        first_name: "Marco",
        last_name: "Pfeiffer",
        nationality: "Denmark",
        born: "1990-06-09",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Marco-Pfeiffer.jpg",
        team_id: 7
    },
    {
        first_name: "Kacper",
        last_name: "Gabara",
        nationality: "Poland",
        born: "2006-10-22",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Kacper-Gabara.jpg",
        team_id: 7
    },
    {
        first_name: "Artem",
        last_name: "Mushynskyi",
        nationality: "Ukraine",
        born: "2002-10-25",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Artem-Mushynskyi.jpg",
        team_id: 7
    },

    {
        first_name: "Ádám",
        last_name: "Torzsás",
        nationality: "Hungary",
        born: "2002-05-17",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Ádám-Torzsás.jpg",
        team_id: 8
    },
    {
        first_name: "Dorian",
        last_name: "Berman",
        nationality: "Israel",
        born: "2004-07-22",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Dorian-Berman.jpg",
        team_id: 8
    },
    {
        first_name: "Jimi",
        last_name: "Salo",
        nationality: "Finland",
        born: "2006-09-09",
        role: "Support",
        number: null,
        photo: "assets/images/players/Jimi-Salo.jpg",
        team_id: 8
    },
    {
        first_name: "Ludvig",
        last_name: "Brolin",
        nationality: "Sweden",
        born: "2002-06-17",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Ludvig-Brolin.jpg",
        team_id: 8
    },
    {
        first_name: "Lotan",
        last_name: "Giladi",
        nationality: "Israel",
        born: "2000-09-13",
        role: "Lurker",
        number: null,
        photo: "assets/images/players/Lotan-Giladi.jpg",
        team_id: 8
    },

    {
        first_name: "Yasin",
        last_name: "Koç",
        nationality: "Turkey",
        born: "2002-12-23",
        role: "Support",
        number: null,
        photo: "assets/images/players/Yasin-Koç.jpg",
        team_id: 9
    },
    {
        first_name: "Linus",
        last_name: "Bergman",
        nationality: "Sweden",
        born: "2005-01-04",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Linus-Bergman.jpg",
        team_id: 9
    },
    {
        first_name: "Älımjan",
        last_name: "Bıtımbai",
        nationality: "Kazakhstan",
        born: "2007-06-26",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Älımjan-Bıtımbai.jpg",
        team_id: 9
    },
    {
        first_name: "Christoffer",
        last_name: "Storgaard",
        nationality: "Denmark",
        born: "2006-08-21",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Christoffer-Storgaard.jpg",
        team_id: 9
    },
    {
        first_name: "Tim",
        last_name: "Ångström",
        nationality: "Sweden",
        born: "2005-01-07",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Tim-Ångström.jpg",
        team_id: 9
    },

    {
        first_name: "Valerii",
        last_name: "Vakhovskyi",
        nationality: "Ukraine",
        born: "2003-01-05",
        role: "Support",
        number: null,
        photo: "assets/images/players/Valerii-Vakhovskyi.jpg",
        team_id: 10
    },
    {
        first_name: "Aleksi",
        last_name: "Virolainen",
        nationality: "Finland",
        born: "1997-03-30",
        role: "Leader",
        number: null,
        photo: "assets/images/players/Aleksi-Virolainen.jpg",
        team_id: 10
    },
    {
        first_name: "Mihai",
        last_name: "Ivan",
        nationality: "Romania",
        born: "1999-07-29",
        role: "Entry",
        number: null,
        photo: "assets/images/players/Mihai-Ivan.jpg",
        team_id: 10
    },
    {
        first_name: "Ihor",
        last_name: "Zhdanov",
        nationality: "Ukraine",
        born: "2004-12-14",
        role: "AWPer",
        number: null,
        photo: "assets/images/players/Ihor-Zhdanov.jpg",
        team_id: 10
    },
    {
        first_name: "Drin",
        last_name: "Shaqiri",
        nationality: "Kosovo",
        born: "2006-12-21",
        role: "Rifler",
        number: null,
        photo: "assets/images/players/Drin-Shaqiri.jpg",
        team_id: 10
    }
];

const users = [
    {
        first_name: "Arjan",
        last_name: "Polhaar",
        email: "a.g.polhaar@uu.nl",
        password: "faze123",
        favorite_team_id: 4,
        is_admin: 0
    },
    {
        first_name: "Sander",
        last_name: "Bertram",
        email: "s.l.bertram@uu.nl",
        password: "faze123",
        favorite_team_id: 7,
        is_admin: 0
    },
    {
        first_name: "Lukas",
        last_name: "Mouthaan",
        email: "l.a.mouthaan@students.uu.nl",
        password: "faze123",
        favorite_team_id: 1,
        is_admin: 0
    },
    {
        first_name: "Admin",
        last_name: "Admin",
        email: "admin@uu.nl",
        password: "admin123",
        favorite_team_id: 10,
        is_admin: 1
    }
];

const games = [
    // Past games (is_upcoming = 0)
    { home_team_id: 1, away_team_id: 2, home_score: 2, away_score: 0, date: "2025-01-05", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 3, home_score: 2, away_score: 1, date: "2025-01-12", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 4, home_score: 0, away_score: 2, date: "2025-01-19", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 5, home_score: 2, away_score: 1, date: "2025-01-26", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 3, home_score: 1, away_score: 2, date: "2025-02-02", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 4, home_score: 2, away_score: 0, date: "2025-02-09", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 5, home_score: 0, away_score: 2, date: "2025-02-16", is_upcoming: 0 },
    { home_team_id: 3, away_team_id: 4, home_score: 2, away_score: 1, date: "2025-02-23", is_upcoming: 0 },
    { home_team_id: 3, away_team_id: 5, home_score: 1, away_score: 2, date: "2025-03-02", is_upcoming: 0 },
    { home_team_id: 4, away_team_id: 5, home_score: 2, away_score: 0, date: "2025-03-09", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 6, home_score: 2, away_score: 1, date: "2025-03-16", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 6, home_score: 0, away_score: 2, date: "2025-03-23", is_upcoming: 0 },
    { home_team_id: 3, away_team_id: 6, home_score: 2, away_score: 0, date: "2025-03-30", is_upcoming: 0 },
    { home_team_id: 4, away_team_id: 6, home_score: 1, away_score: 2, date: "2025-04-06", is_upcoming: 0 },
    { home_team_id: 5, away_team_id: 6, home_score: 2, away_score: 1, date: "2025-04-13", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 7, home_score: 0, away_score: 2, date: "2025-04-20", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 7, home_score: 2, away_score: 1, date: "2025-04-27", is_upcoming: 0 },
    { home_team_id: 3, away_team_id: 7, home_score: 2, away_score: 0, date: "2025-05-04", is_upcoming: 0 },
    { home_team_id: 4, away_team_id: 7, home_score: 1, away_score: 2, date: "2025-05-11", is_upcoming: 0 },
    { home_team_id: 5, away_team_id: 7, home_score: 2, away_score: 0, date: "2025-05-18", is_upcoming: 0 },
    { home_team_id: 6, away_team_id: 7, home_score: 0, away_score: 2, date: "2025-05-25", is_upcoming: 0 },
    { home_team_id: 1, away_team_id: 8, home_score: 2, away_score: 1, date: "2025-06-01", is_upcoming: 0 },
    { home_team_id: 2, away_team_id: 8, home_score: 1, away_score: 2, date: "2025-06-08", is_upcoming: 0 },

    // Upcoming games (is_upcoming = 1)
    { home_team_id: 3, away_team_id: 8, home_score: null, away_score: null, date: "2026-04-01", is_upcoming: 1 },
    { home_team_id: 4, away_team_id: 8, home_score: null, away_score: null, date: "2026-04-03", is_upcoming: 1 },
    { home_team_id: 5, away_team_id: 8, home_score: null, away_score: null, date: "2026-04-05", is_upcoming: 1 },
    { home_team_id: 6, away_team_id: 8, home_score: null, away_score: null, date: "2026-04-07", is_upcoming: 1 },
    { home_team_id: 7, away_team_id: 8, home_score: null, away_score: null, date: "2026-04-09", is_upcoming: 1 },
    { home_team_id: 1, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-11", is_upcoming: 1 },
    { home_team_id: 2, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-13", is_upcoming: 1 },
    { home_team_id: 3, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-15", is_upcoming: 1 },
    { home_team_id: 4, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-17", is_upcoming: 1 },
    { home_team_id: 5, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-19", is_upcoming: 1 },
    { home_team_id: 6, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-21", is_upcoming: 1 },
    { home_team_id: 7, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-23", is_upcoming: 1 },
    { home_team_id: 8, away_team_id: 9, home_score: null, away_score: null, date: "2026-04-25", is_upcoming: 1 },
    { home_team_id: 1, away_team_id: 10, home_score: null, away_score: null, date: "2026-04-27", is_upcoming: 1 },
    { home_team_id: 2, away_team_id: 10, home_score: null, away_score: null, date: "2026-04-29", is_upcoming: 1 },
    { home_team_id: 3, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-01", is_upcoming: 1 },
    { home_team_id: 4, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-03", is_upcoming: 1 },
    { home_team_id: 5, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-05", is_upcoming: 1 },
    { home_team_id: 6, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-07", is_upcoming: 1 },
    { home_team_id: 7, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-09", is_upcoming: 1 },
    { home_team_id: 8, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-11", is_upcoming: 1 },
    { home_team_id: 9, away_team_id: 10, home_score: null, away_score: null, date: "2026-05-13", is_upcoming: 1 },
];



db.serialize(()=> {
    teams.forEach(team =>{
        db.run(
            "INSERT INTO teams (name, logo, country) VALUES (?, ?, ?)",
            [team.name, team.logo, team.country]
        );
    });
    players.forEach(player => {
        db.run(
            "INSERT INTO players (first_name, last_name, nationality, date_of_birth, role, number, photo, team_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            [player.first_name, player.last_name, player.nationality, player.born, player.role, player.number, player.photo, player.team_id]
        );
    });
    games.forEach(game => {
        db.run(
            "INSERT INTO games (home_team_id, away_team_id, home_score, away_score, date, is_upcoming) VALUES (?, ?, ?, ?, ?, ?)",
            [game.home_team_id, game.away_team_id, game.home_score, game.away_score, game.date, game.is_upcoming]
        );
    });
    users.forEach(async user => {
        const hashedpw = await bcrypt.hash(user.password, 10);
        db.run(
            "INSERT INTO users (first_name, last_name, email, password, favorite_team_id, is_admin) VALUES (?, ?, ?, ?, ?, ?)",
            [user.first_name, user.last_name, user.email, hashedpw, user.favorite_team_id, user.is_admin]
        );
    });

    console.log("Database seeding succesfull!");
});