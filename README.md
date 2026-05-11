# 🧠 Dakshana DSA Tracker

A group DSA progress tracker for **Dakshana Sophomores**, built on [Striver's A2Z DSA Sheet](https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z).

Track problems, compete on the leaderboard, and grind together! 💪

---

## ✨ Features

- **460+ DSA Problems** from Striver's A2Z sheet across 18 topics
- **Group leaderboard** — see who's ahead, compare progress
- **Streaks & Points** — Easy (+1), Medium (+2), Hard (+3)
- **Rank system** — 🌱 Newbie → 👑 Legend
- **Admin panel** — manage users, view/edit anyone's progress
- **Topic-wise progress** — filter by difficulty, search problems
- **Compare mode** — see your solved vs a friend's solved
- **Shared cloud storage** — all progress synced across devices
- **Mobile-first UI** — works great on phones

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js v16+ and npm

### Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/dakshana-tracker.git
cd dakshana-tracker

# Install dependencies
npm install

# Start the dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploying to GitHub Pages

### 1. Install gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Update `package.json`

Add these two lines:

```json
{
  "homepage": "https://YOUR_USERNAME.github.io/dakshana-tracker",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### 3. Deploy

```bash
npm run deploy
```

Your app will be live at `https://YOUR_USERNAME.github.io/dakshana-tracker` 🎉

---

## 🌐 Deploying to Vercel (Recommended — Easier)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Leave all settings as default → click **Deploy**

Done! Vercel auto-deploys on every push to `main`. ✅

---

## 🔑 Access Codes

> ⚠️ Change these before deploying publicly!

In `src/App.jsx`, at the top:

```js
const GROUP_CODE = "DAKSHANA2025";   // Code to join as a member
const ADMIN_CODE  = "1979";          // Code to register as admin
```

**Never share ADMIN_CODE publicly.**

---

## 🗂️ Project Structure

```
dakshana-tracker/
├── public/
│   └── index.html          # HTML shell
├── src/
│   ├── App.jsx             # Main app (all logic + UI)
│   └── index.js            # React entry point
├── .gitignore
├── package.json
└── README.md
```

---

## 🛣️ Roadmap

- [ ] CP (Competitive Programming) Tracker
- [ ] Daily problem notifications
- [ ] Notes/solutions per problem
- [ ] Dark/light theme toggle
- [ ] Export progress as PDF
- [ ] Weekly digest / email report

---

## 🤝 Contributing

1. Fork this repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes and commit: `git commit -m "Add: your feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — free to use and modify.

---

Built with ❤️ for Dakshana Sophomores · Powered by [Striver's A2Z Sheet](https://takeuforward.org/dsa/strivers-a2z-sheet-learn-dsa-a-to-z)
