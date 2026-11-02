# VELOOP Rewards – Level-Up Dashboard

### Task: Complete Level-Up Dashboard Redesign

**A Gamified Level Progression, Rewards & Engagement Hub**

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
  <img src="https://img.shields.io/badge/Status-In%20Progress-8A63D2?style=for-the-badge" alt="Status" />
</p>

<p align="center">
  <a href="https://v-eloop-rewards-dashboard.vercel.app/"><strong>Live Demo</strong></a>
  &nbsp; | &nbsp;
  <a href="https://github.com/shobhit23012007/VEloop-rewards-dashboard"><strong>GitHub Repository</strong></a>
</p>

---

## 1. Project Overview

**VELOOP Rewards** is a gamified Level-Up Dashboard developed as part of the VELOOP Rewards Frontend Development Task Assignment.

The project focuses on creating an engaging and interactive user experience through an XP-based progression system, reward milestones, daily earning activities, and interactive mini-games.

Users can explore their current level, monitor accumulated Experience Points (XP), participate in different earning activities, and track their progression through a visually engaging dashboard.

The application combines modern UI design, reusable React components, interactive frontend functionality, and responsive layouts to provide a consistent experience across different devices.

### Project Objectives

- Create an engaging and interactive gamified dashboard.
- Display current levels, XP balances, and progression indicators.
- Provide an interactive level roadmap and reward milestones.
- Encourage daily participation through login rewards and streak bonuses.
- Introduce mini-games and simulated XP earning activities.
- Track recent XP transactions and activity history.
- Develop a responsive and user-friendly interface.
- Maintain reusable and modular React components.

### Project Highlights

| Area | Description |
|---|---|
| Gamification | XP-based progression and level milestones |
| Engagement | Daily login rewards and interactive activities |
| Mini-Games | Interactive XP Catcher game |
| Rewards | Upcoming reward and milestone information |
| Tracking | XP balance and recent activity history |
| Navigation | Expandable and collapsible sidebar |
| UI/UX | Modern dark-themed responsive interface |

---

## 2. Project Information

| Project Detail | Information |
|---|---|
| Project Name | VELOOP Rewards |
| Assignment | Task – Complete Level-Up Dashboard Redesign |
| Project Domain | Frontend Development |
| Application Type | Gamified Rewards Dashboard |
| Frontend Framework | React.js |
| Build Tool | Vite |
| Programming Language | JavaScript |
| Styling | CSS3, CSS Modules, Bootstrap |
| Icons | Lucide React |
| Data Persistence | Browser LocalStorage |
| Version Control | Git & GitHub |
| Deployment Platform | Vercel |
| Current Status | In Progress |
| Project Completion | Approximately 70–80% |

---

## 3. Live Application

The application is deployed on Vercel and can be accessed through the following link.

**Live Website:** [VELOOP Rewards Dashboard](https://v-eloop-rewards-dashboard.vercel.app/)

**GitHub Repository:** [VELOOP Rewards – Source Code](https://github.com/shobhit23012007/VEloop-rewards-dashboard)

---

## 4. Key Features

### 4.1 Level Progression Dashboard

- Displays the user's current level and level title.
- Shows accumulated Experience Points (XP).
- Provides a visual progress indicator.
- Displays remaining XP required for the next level.
- Helps users understand their progression journey.

### 4.2 Interactive Level Roadmap

- Displays available progression levels.
- Allows users to explore different level milestones.
- Shows relevant level and reward information.
- Provides a visual representation of progression.

### 4.3 Daily XP Rewards

- Daily login reward functionality.
- XP claiming interaction.
- Login streak tracking.
- Additional streak-based XP rewards.
- Daily claim status management.

### 4.4 Watch Ads & Earn XP

- Interactive advertisement earning section.
- Simulated advertisement reward flow.
- XP rewards for eligible demo activities.
- Daily advertisement limit.
- Reward tracking and cooldown handling.

### 4.5 XP Catcher Mini-Game

An interactive mini-game designed to make XP collection more engaging.

**Game Elements:**

- XP tokens for collecting points.
- Mystery gift rewards.
- Bomb obstacles.
- Game timer.
- Limited player lives.
- Score and reward tracking.
- Replay functionality.

### 4.6 Reward Milestones

- Displays upcoming reward milestones.
- Connects reward information with level progression.
- Highlights progression-based achievements.
- Helps users understand their next reward goals.

### 4.7 XP Activity History

- Displays recent XP-related activities.
- Tracks XP earning events.
- Shows activity-related XP changes.
- Helps users review their recent progress.

### 4.8 Level-Up Celebration

- Interactive level-up celebration interface.
- Confetti and visual effects.
- Displays the newly achieved level.
- Provides feedback when a progression milestone is reached.

### 4.9 Collapsible Sidebar Navigation

- Expandable and collapsible sidebar.
- Icon-based navigation in collapsed mode.
- Navigation between dashboard sections.
- Mobile navigation with a toggle menu.
- Organized dashboard and account navigation options.

### 4.10 Responsive User Interface

- Responsive dashboard layout.
- Desktop and laptop support.
- Tablet-friendly navigation.
- Mobile-friendly component layouts.
- Consistent visual styling across different screen sizes.

---

## 5. Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Component-based frontend development |
| Vite | Development server and production build |
| JavaScript (ES6+) | Application logic and interactions |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| CSS Modules | Component-level scoped styling |
| Bootstrap | Responsive utilities and UI support |
| Lucide React | Interface icons |
| Browser LocalStorage | Local demo data persistence |
| Git | Version control |
| GitHub | Source code hosting |
| Vercel | Application deployment |

---

## 6. Application Architecture

The project follows a component-based React architecture.

Individual dashboard sections are separated into reusable components to improve code organization, maintainability, and scalability.

### Application Workflow

```text
                    VELOOP REWARDS
                           |
                           |
                    Level Dashboard
                           |
          +----------------+----------------+
          |                |                |
     Level Progress    Reward Hub      Navigation
          |                |                |
     Level Roadmap    Earn More XP       Sidebar
          |                |
     Next Reward       +---+---+
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

### Component Architecture

| Component | Responsibility |
|---|---|
| CommonHeader | Header navigation and user-related controls |
| Sidebar | Dashboard section navigation |
| LevelRoadmap | Level progression display |
| EarnMoreXP | Daily XP and advertisement earning activities |
| XPCatcher | Interactive XP mini-game |
| NextLevelReward | Upcoming level reward information |
| XPActivity | Recent XP activity history |
| LevelUpCelebration | Level-up celebration interface |
| GameRewardsSpotlight | Gamification and rewards highlights |

---

## 7. Project Folder Structure

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

## 8. XP & Level Progression Workflow

The dashboard follows an XP-based progression model.

1. Users interact with available earning activities.
2. Eligible activities generate demonstration XP rewards.
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

## 9. Data Persistence

The current implementation uses browser LocalStorage for demo data persistence.

Selected application data includes:

- Current XP.
- Current level.
- Recent XP activity.
- Daily login information.
- Advertisement reward information.

**Important:** LocalStorage is specific to the current browser profile. Data is not synchronized between different users or devices.

---

## 10. Getting Started

Follow these instructions to run the project locally.

### Prerequisites

Make sure the following tools are installed:

- Node.js
- npm
- Git
- Visual Studio Code (recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/shobhit23012007/VEloop-rewards-dashboard.git
```

### Step 2: Navigate to the Project Directory

```bash
cd VEloop-rewards-dashboard
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Vite will start the local development server.

Open the localhost URL displayed in your terminal to access the dashboard.

### Step 5: Create Production Build

```bash
npm run build
```

The optimized production files will be generated inside the `dist/` directory.

---

## 11. Screenshots

Screenshots of the actual application will be added here to showcase the dashboard interface and its major features.

Suggested screenshots:

- Dashboard Overview
- Expanded and Collapsed Sidebar
- Level Progression Roadmap
- Daily XP and Watch Ads
- XP Catcher Mini-Game
- XP Activity History
- Level-Up Celebration

To add screenshots, create a `screenshots/` folder in the project root and place your application screenshots inside it.

Example:

```md
![Dashboard Overview](screenshots/dashboard-overview.png)
```

---

## 12. Current Development Progress

**Overall Completion: Approximately 70–80%**

### Work Completed

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
- GitHub repository setup.
- Initial Vercel deployment.

### Currently Working On

- UI/UX refinement.
- Responsive design improvements.
- Visual consistency across components.
- Interface polishing.
- Functional testing and bug fixing.

The project is actively under development and is not yet considered fully complete.

---

## 13. Demo Limitations

This is currently a frontend development implementation.

- No backend server or centralized database is connected.
- User authentication is not implemented.
- XP and activity data are stored locally in the browser.
- Reward values are for demonstration purposes only.
- Watch Ads functionality does not play actual advertisements.
- No real-money transactions or actual reward transfers are supported.
- LocalStorage data is not synchronized across devices.

---

## 14. Future Enhancements

The following improvements can be considered in future development:

- Backend integration and secure user authentication.
- Centralized XP and activity management.
- Real reward management and redemption functionality.
- Additional interactive mini-games.
- Enhanced dashboard analytics.
- Improved accessibility.
- Further UI/UX optimization.
- Additional testing and performance improvements.

---

## 15. Deployment

The application is deployed using Vercel and connected to the GitHub repository.

**Live URL:**  
https://v-eloop-rewards-dashboard.vercel.app/

Future commits pushed to the connected GitHub branch can trigger automatic deployments through Vercel.

---

## 16. Version Control

This project uses Git for version control and GitHub for source code management.

To push future changes:

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

Live Demo: [Visit VELOOP Rewards](https://v-eloop-rewards-dashboard.vercel.app/)

---

<p align="center">
  <strong>VELOOP REWARDS</strong>
  <br />
  <em>Play. Earn. Level Up.</em>
  <br /><br />
  Developed as part of the VELOOP Rewards Frontend Development Task.
</p>
