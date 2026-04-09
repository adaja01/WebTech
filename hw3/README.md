# HW3 - FaZe clan, Node

Website for the third assignment of INFOB2WT, showcasing information about the FaZe clan.

## Structure
- `assets/` - directory for images and other media assets
- `css/` - directory for CSS files
- `data/` - directory for data files
    - `database.db` - SQLite database file containing all the data for the website
    - `schema.sql` - SQL schema for the database
- `html/` - directory for HTML files
- `js/` - directory for JavaScript files
  - `auth.js` - handles authentication and session management
- `db.js` - database connection
- `package.json` - npm package manifest
- `package-lock.json` - pinned dependencies
- `README.md` - this file
- `seed.js` - seeds the database with some initial data
- `server.js` - entry point for the server, handles routing and serving of files

## Database
- The SQL definition can be found in `data/schema.sql`.
- The database has the following tables:
  - `teams` - contains information about the teams
  - `players` - contains information about the players
  - `games` - contains information about the games
  - `users` - contains information about the users

## Login
### Users
- `admin@uu.nl` - password: `faze123`
- `l.a.mouthaan@students.uu.nl` - password: `faze123`
- `a.g.polhaar@students.uu.nl` - password: `faze123`
- `s.l.bertram@students.uu.nl` - password: `faze123`

## Sources
### Team
- [FaZe Clan Official Website](https://fazeclan.com/)
- [FaZe Clan Wikipedia](https://en.wikipedia.org/wiki/FaZe_Clan)
- [FaZe Results](https://liquipedia.net/counterstrike/FaZe_Clan/Results)
- [FaZe Clan Archive](https://faze4ever.com/)
### Assets
- [FaZe Clan Logos](https://logos-world.net/faze-logo)
- [Fonts](https://fonts.google.com/share?selection.family=Climate+Crisis:YEAR@1979|Cormorant+Garamond:ital,wght@1,300..700|Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000)
- [Icons](https://cdnjs.com/libraries/font-awesome)
- [Favicon](https://favicon.io/favicon-converter)
- [Background Image (Screenshotted at around 4:51)](https://www.youtube.com/watch?v=CBM-NZdWyk4)
### Learning
- [HTML](https://www.w3schools.com/html/)
- [CSS](https://www.w3schools.com/css/)
- And the lectures of course!

## Deployment
### Production
- The website is available at http://webtech.science.uu.nl/group41
### Development
- Run `npm install` to install dependencies
- Run `npm start` to start the server

## Credits
Written by Group 41, consisting of:
- Arjan Polhaar [4926501]
- Sander Bertram [0288705]
- Lukas Mouthaan [7681534]