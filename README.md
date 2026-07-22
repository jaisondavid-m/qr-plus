# QR-Plus

A simple web app that lets you turn any link or piece of text into a QR code and then see who's actually scanning it.

Generate a code, drop it on a poster, a business card, a menu, anywhere - and watch where, when and how often it gets scanned.

---

## What it does

- **Create QR codes** - paste in a link (or any text) and get back a scannable QR code image
- **Track scans** - every time someone scans your code, we log it
- **See analytics** - check total scan counts, what kind of device people used (phone, tablet, computer) and a history of every scan
- **Accounts** - each user has their own login and only see their own QR codes

Think of it like a mini version of link-shortener service (like Bitly), but instead of a shortened link, you get a QR code and instead of just click counts, you get a bit more detail about each scan.

---

## How it works

1. You **sign up / login** to your account
2. You paste in whatever you want to encode - a website link, a not, anything
3. The app generates a **QR code image** for you to download and user however you like
4. Behind the scences, the QR code doesn't point straight to your link - it points to *our* server first
5. When someone scans it, our server quietly notes down a few details (what kind of device, roughly when) and then instantly sends them on to your real link
6. You can come back anytime and look at **Analytics** page to see how your code is performing

This "point to us first, then redirect" trick is what makes the scan tracking possible - It's the same idea services like Bitly or Tinyurl.

---

## Main pages in the app

| Page | What it's for |
| --- | --- |
| **Login / Register** | Create an account or sign back in |
| **Create** | Paste in your content and generate a new QR code |
| **Analytics** | See a list of all your QR codes and their scan counts |
| **QR Code Details** | Dig into one specific code - see a device breakdown and full scan histroy |

---

## What it's built with 

**Frontend (what you see in the browser) **
- **React** - the framework used to build the interface
- **Tailwind CSS** - used for styling and layout
- **Axios** - handles talking to the backend server
- **Zustand** - keeps track of whether you're logged in

**Backend (the engine behind the scences) **
- **Go (Golang)** with the **Gin** frameword - handles requests like "create a QR code" or "log me in
- **MySQL** - the database where users, QR codes and scan records are stored
- **JWT (JSON Web Token) ** - use to keep you securely logged in without needing a password on every request
- **bcrypt** - used to safely scramble (hash) passwords so they're never stored in plain, readable text

---

## Data that gets stored

- **Users** - your login ID and a securely hashed password
- **QR Codes** - the unique code, and whatever content it points to 
- **Scans** - a record for every scan: rough device type, IP address and timestamp

No personal scanner information beyond that is collected - just enough to give you usefull analytics.

---

## Running it yourself

You'll need:
- **Go** installed for backend
- **Node.js** installed for frontend
- A **MySQL** database

**Backend**
1. Set up a `.env` file with your database details (`DB_USER`, `DB_HOST`, `DB_PORT`, `DB_NAME`), a `JWT_SECRET` and an `APP_BASE_URL`
2. Run the SQL setup script to create the databasse tables
3. Start the Go server

**Frontend**
1. Set the `VITE_API_BACKEND_URL` environment variable to point at your backend
2. Install dependencies and start the dev server

Once both are running, open the frontend in your browser, create an account and start generating QR codes.

--- 

## Deployment

This app is a deployed on a **VPS** (hackclub.app's vps) using **Docker**. Each part of the app - database, backend and frontend - runs in its own cotainer and **Nginx** sits in front as a **reverse proxy**, routing incoming traffic to the right place.

- **Docker Compose** builds and runs three containers: `db` (MySQL), `backend` (Go/Gin API) and `web` (the React app)
- **Nginx** running inside the `web` container, serves the frontend and forwards `/api/`, `/qr/` and `/r/` requests to the backend - so the whole site is reachable through one single port (80)

To deplpy:

```bash
# on the VPS
git clone https://github.com/jaisondavid-m/qr-plus.git
cd qr-plus

#add real secrets
touch .env #fill in DB_USER, DB_PASSWORD, DB_NAME, APP_BASE_URL, etc,..

# build and start everything
docker compose up -d --build
```

That's it - the site becomes reachable at the server's IP or domain. To push an update later, just `git pull` and re-run `docker compose up -d --build`

---

## A note on security

- Passwords are never stored as plain text - they're hashed with bcrypt before sacing
- Logging in gives you a signed token (JWT) instead of repeatedly sending your password
- Each QR code is tied to the account that created it, so users can only view their own codes and analytics

---

*Buit as a lightweight tool for generating trackable QR codes - simple to use with just enough analytics to be genuienly useful.