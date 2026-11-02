# VELOOP Rewards – Level-Up Dashboard

**Task 16 – Complete Level-Up Dashboard Redesign**

A gamified level progression and rewards engagement dashboard designed to make user interaction more engaging through XP points, mini-games, daily activities, and reward milestones.

**Project Status:** In Progress (70–80% Complete)

## About the Project

VELOOP Rewards is a frontend dashboard redesign focused on gamified user engagement and level progression.

Users can explore dashboard activities, earn experience points (XP), track their progress, play mini-games, and view upcoming reward milestones through an interactive interface.

## Key Features

- **Level Progression:** Displays the current level, XP progress, and remaining XP required for the next level.
- **Level Roadmap:** Explore different levels and progression milestones.
- **Daily XP Rewards:** Claim daily login XP and track login streaks.
- **Watch Ads:** Earn simulated XP rewards through the ads section.
- **XP Catcher Game:** Interactive mini-game with XP tokens, rewards, and game challenges.
- **Reward Milestones:** View upcoming rewards and level-based achievements.
- **XP Activity History:** Track recent XP earning activities.
- **Level-Up Celebration:** Visual celebration when a user reaches a new level.
- **Collapsible Sidebar:** Expandable and collapsible dashboard navigation.
- **Responsive UI:** Layout improvements for desktop, tablet, and mobile screens.

## Technology Stack

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- CSS Modules
- Bootstrap
- Lucide React
- Browser LocalStorage
- Git and GitHub

## Project Structure

```text
VELOOP-Rewards-Dashboard/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── CommonHeader/
│   │   ├── EarnMoreXP/
│   │   ├── GameRewardsSpotlight/
│   │   ├── LevelHero/
│   │   ├── LevelRoadmap/
│   │   ├── LevelUpCelebration/
│   │   ├── LevelUpModal/
│   │   ├── NextLevelReward/
│   │   ├── PlayAndEarn/
│   │   ├── Sidebar/
│   │   ├── XPActivity/
│   │   └── XPProgress/
│   │
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   │   └── LevelDashboard/
│   │
│   ├── styles/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shobhit23012007/VEloop-rewards-dashboard.git
```

### 2. Navigate to the Project Folder

```bash
cd VEloop-rewards-dashboard
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Start the Development Server

```bash
npm run dev
```

Open the localhost URL displayed in the terminal.

### 5. Build for Production

```bash
npm run build
```

The production build will be generated in the `dist` folder.

## XP and Level Progression

The dashboard follows an XP-based progression system.

- Users earn XP through available activities.
- XP contributes towards level progression.
- Progress indicators display advancement towards the next level.
- Level-up events trigger a celebration interface.
- Recent XP activities are displayed in the activity history.

## Current Development Progress

**Approximately 70–80% Complete**

The main dashboard structure and core interactive features have been implemented.

Current development focuses on:

- UI/UX refinement.
- Responsive design improvements.
- Component styling and consistency.
- Functional testing and bug fixing.

## Demo Limitations

This is currently a frontend development project.

- XP and activity data are stored in browser LocalStorage.
- Data persistence is limited to the current browser profile.
- Reward values are for demonstration purposes.
- Watch Ads uses simulated rewards and does not play actual advertisements.
- No real-money transactions or reward transfers are implemented.
- Backend authentication and centralized user data management are not currently connected.

## Future Improvements

- Backend integration and user authentication.
- Centralized user profiles and XP synchronization.
- Real reward management and redemption.
- Additional mini-games and engagement features.
- Improved analytics and activity tracking.
- Further accessibility and responsive design enhancements.

## Author

**Shobhit**

B.Tech – Computer Science Engineering

GitHub: [shobhit23012007](https://github.com/shobhit23012007)

---

**VELOOP Rewards – Play, Earn, and Level Up!**
