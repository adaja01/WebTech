# Web Technology Course Assignments

This monorepo contains all the assignments for INFOB2WT

## Structure

- `.github/workflows/validate.yml` - GitHub Actions workflow for validating HTML/CSS
- `.github/workflows/deploy.yml` - Github Actions workflow for deploying to Cloudflare Pages
- `hw1/` - First assignment, static website in plain HTML/CSS with info on FaZe clan
- `hw2/` - Second assignment, dynamic version of the first assignment using JavaScript
- `hw3/` - Third assignment, continuation of mainly hw1 using Node.js and SQLite
- `scripts/` - Contains validation logic for HTML/CSS using W3C Validator
- `package.json` - Contains dev dependencies and scripts for validation

## W3C Validation

- Run `npm install` first to install the dev dependencies
- Use `npm run validate:hw1` to validate the HTML/CSS of the first assignment
- Likewise for other assignments
- Additionally, GitHub Actions will automatically run these scripts on push and pull requests

## Contributing
- Please ensure that your code is well-formatted by using the validation scripts or GitHub Actions
- Work on separate branches to avoid conflicts and ensure a clean commit history

## Credits
Written by Group 41, consisting of:
- Arjan Polhaar [4926501]
- Sander Bertram [0288705]
- Lukas Mouthaan [7681534]
