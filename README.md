# VELOOP Rewards – Level-Up Dashboard

### Task | Complete Level-Up Dashboard Redesign

<p align="center">
  <strong>A Gamified Level Progression, Rewards & Engagement Hub</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Project-VELOOP%20Rewards-eac56d?style=for-the-badge" alt="Project"/>
  <img src="https://img.shields.io/badge/Status-In%20Progress-8b5cf6?style=for-the-badge" alt="Status"/>
  <img src="https://img.shields.io/badge/Frontend-React-blue?style=for-the-badge" alt="React"/>
  <img src="https://img.shields.io/badge/Build-Vite-646cff?style=for-the-badge" alt="Vite"/>
</p>

---

## About The Project

**VELOOP Rewards** is a gamified dashboard redesign developed as part of the VELOOP Rewards Frontend Development Task Assignment.

The project focuses on creating an engaging and interactive user experience where users can explore activities, earn Experience Points (XP), progress through different levels, play mini-games, and track their reward journey.

The dashboard combines level-based progression, interactive earning activities, reward milestones, and a modern interface to make user engagement more enjoyable.

The main objective is to build a visually appealing, responsive, and user-friendly dashboard with reusable React components and interactive frontend functionality.

---

## Project Overview

| Project Detail | Information |
|---|---|
| Project Name | VELOOP Rewards |
| Assignment | Task 16 – Complete Level-Up Dashboard Redesign |
| Project Domain | Frontend Development |
| Application Type | Gamified Rewards Dashboard |
| Frontend Framework | React.js |
| Build Tool | Vite |
| Styling | CSS3, CSS Modules, Bootstrap |
| Programming Language | JavaScript |
| Version Control | Git & GitHub |
| Current Status | In Progress |
| Completion | Approximately 70–80% |

---

## Key Features

### 1. Level Progression Dashboard

- Displays the user's current level and level title.
- Shows accumulated XP and progress towards the next level.
- Provides a visual progress indicator.
- Displays the remaining XP required to reach the next level.
- Helps users understand their progression journey.

### 2. Interactive Level Roadmap

- Displays the available progression levels.
- Allows users to explore different level milestones.
- Shows level-related information and reward details.
- Provides a visual representation of progression.

### 3. Daily XP Rewards

- Daily login reward functionality.
- XP claiming interaction.
- Login streak tracking.
- Additional streak-based XP bonus.
- Daily claim status management.

### 4. Watch Ads & Earn XP

- Interactive Watch Ads section.
- Simulated advertisement reward flow.
- XP rewards for eligible demo activities.
- Daily advertisement limit.
- Reward tracking and cooldown handling.

### 5. XP Catcher Mini-Game

An interactive mini-game designed to make XP collection more engaging.

**Game Elements:**

- XP tokens for collecting points.
- Mystery gift rewards.
- Bomb obstacles.
- Game timer.
- Limited player lives.
- Score and reward tracking.
- Replay functionality.

The mini-game uses a time-based gameplay system with different collectible and obstacle elements.

### 6. Reward Milestones

- Displays upcoming reward milestones.
- Connects reward information with level progression.
- Highlights progression-based achievements.
- Helps users understand their next reward goals.

### 7. XP Activity History

- Displays recent XP-related activities.
- Tracks reward and earning events.
- Shows changes in the user's XP balance.
- Helps users review their recent progress.

### 8. Level-Up Celebration

- Interactive level-up celebration interface.
- Visual effects and confetti animation.
- Displays the newly achieved level.
- Provides feedback when a progression milestone is reached.

### 9. Collapsible Sidebar Navigation

- Expandable and collapsible sidebar.
- Icon-based navigation in collapsed mode.
- Smooth navigation between dashboard sections.
- Mobile navigation with a toggle menu.
- Account navigation options for Profile, Settings, and Help & Support.

### 10. Responsive User Interface

- Responsive dashboard layout.
- Desktop and laptop support.
- Tablet-friendly navigation.
- Mobile-friendly component layouts.
- Consistent visual styling across different screen sizes.

---

## Technology Stack

| Technology | Usage |
|---|---|
| React.js | Component-based frontend development |
| Vite | Fast development server and production build |
| JavaScript (ES6+) | Application logic and interactions |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| CSS Modules | Scoped component styling |
| Bootstrap | Responsive utilities and UI support |
| Lucide React | Interface icons |
| Browser LocalStorage | Local demo data persistence |
| Git | Version control |
| GitHub | Source code hosting |

---

## Application Architecture

The application follows a component-based React architecture.

Major interface sections are separated into reusable components to keep the code organized and easier to maintain.

### Main Application Flow

```text
                   VELOOP REWARDS
                          |
                          |
                   Level Dashboard
                          |
          +---------------+---------------+
          |               |               |
      Level Progress   Reward Hub     Navigation
          |               |               |
      Level Roadmap   Earn More XP    Sidebar
          |               |               |
      Next Reward     +---+---+       Dashboard Sections
                      |       |
                  Daily XP  Watch Ads
                      |
                  XP Catcher
                      |
                 XP Activity
                      |
                Level-Up Event
                      |
              Celebration Interface
```

---

## Project Folder Structure

```text
VELOOP-Rewards-Dashboard/
│
├── public/
│
├── src/
│   │
│   ├── assets/
│   │
│   ├── components/
│   │   │
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
│   │
│   ├── hooks/
│   │
│   ├── pages/
│   │   └── LevelDashboard/
│   │       ├── LevelDashboard.jsx
│   │       └── LevelDashboard.module.css
│   │
│   ├── styles/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

---

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/shobhit23012007/VEloop-rewards-dashboard.git
```

### 2. Navigate to the Project Directory

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

Vite will start the local development server.

Open the localhost URL displayed in your terminal to access the dashboard.

### 5. Create Production Build

```bash
npm run build
```

The optimized production files will be generated inside the `dist/` directory.

---

## XP & Level Progression Workflow

The dashboard uses an XP-based progression model.

1. Users interact with available earning activities.
2. Eligible activities generate demo XP rewards.
3. Earned XP updates the dashboard progress.
4. The dashboard calculates progression towards the next level.
5. Reaching the required XP triggers the level-up experience.
6. Recent earning activities appear in the XP activity section.

### XP Earning Activities

| Activity | Reward / Behaviour |
|---|---|
| Daily Login | +20 XP |
| 7-Day Login Streak | Additional +50 XP |
| Watch Ads | Simulated XP rewards |
| XP Catcher | XP based on collected game items |

*Reward values are demonstration values used by the current frontend implementation.*

---

## Data Persistence

The current implementation uses the browser's LocalStorage for demo data persistence.

It supports local storage of selected application data such as:

- Current XP.
- Current level.
- Recent XP activity.
- Daily login information.
- Advertisement reward information.

**Important:** LocalStorage is browser-profile-specific. Data is not synchronized between different users or devices.

---

## Screenshots

Screenshots of the dashboard will be added here to demonstrate the application's interface and functionality.

Suggested screenshots:

| Screenshot | Description |
|---|---|
| Dashboard Overview | Main dashboard and current level |
| Sidebar Navigation | Expanded and collapsed navigation |
| Level Roadmap | Level progression interface |
| Daily XP & Watch Ads | Earning activity section |
| XP Catcher | Mini-game interface |
| XP Activity | Recent XP history |
| Level-Up Celebration | Level-up animation |

To add screenshots, create a `screenshots/` folder in the project root and reference the image files here.

Example:

```md
![Dashboard Overview](screenshots/dashboard-overview.png)
```

---

## Current Development Progress

**Overall Completion: Approximately 70–80%**

### Completed Work

- Main dashboard structure.
- Component-based React implementation.
- Sidebar navigation and collapse functionality.
- Level progression interface.
- XP progress tracking.
- Daily login reward functionality.
- Watch Ads reward flow.
- XP Catcher mini-game.
- XP activity history.
- Level-up celebration interface.
- Initial responsive styling.

### Currently Working On

- UI/UX refinement.
- Responsive design improvements.
- Visual consistency across components.
- Interface polishing.
- Functional testing and bug fixing.

The project is actively under development and is not yet considered fully complete.

---

## Demo Limitations

This is currently a frontend development implementation.

- No backend server or centralized database is connected.
- User authentication is not implemented.
- XP and activity data are stored locally in the browser.
- Reward values are for demonstration purposes only.
- Watch Ads functionality does not play real advertisements.
- No real-money transactions or actual reward transfers are supported.
- LocalStorage data is not synchronized across devices.

---

## Future Enhancements

The following improvements can be considered in future development:

- Backend integration and secure user authentication.
- Centralized XP and activity management.
- Real reward management and redemption functionality.
- Additional interactive mini-games.
- Enhanced dashboard analytics.
- Improved accessibility.
- Further UI/UX optimization.
- Production deployment and performance improvements.

---

## Version Control

This project uses Git for version control and GitHub for source code management.

Clone the repository:

```bash
git clone https://github.com/shobhit23012007/VEloop-rewards-dashboard.git
```

To contribute changes locally:

```bash
git add .
git commit -m "Update dashboard features"
git push
```

---

## Author

**Shobhit**

B.Tech – Computer Science Engineering

GitHub: [@shobhit23012007](https://github.com/shobhit23012007)

Project Repository: [VELOOP Rewards Dashboard](https://github.com/shobhit23012007/VEloop-rewards-dashboard)

---

<p align="center">
  <strong>VELOOP Rewards</strong>
  <br/>
  Play. Earn. Level Up.
</p>

<p align="center">
  Developed as part of Task 16 – Complete Level-Up Dashboard Redesign.
</p>
