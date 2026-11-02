
import { useCallback, useEffect, useRef, useState } from 'react';

import styles from './LevelDashboard.module.css';

import CommonHeader from '../../components/CommonHeader/CommonHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import GameRewardsSpotlight from '../../components/GameRewardsSpotlight/GameRewardsSpotlight';
import LevelRoadmap from '../../components/LevelRoadmap/LevelRoadmap';
import EarnMoreXP from '../../components/EarnMoreXP/EarnMoreXP';
import XPCatcher from '../../components/PlayAndEarn/XPCatcher';
import LevelUpCelebration from '../../components/LevelUpCelebration/LevelUpCelebration';
import NextLevelReward from '../../components/NextLevelReward/NextLevelReward';
import XPActivity from '../../components/XPActivity/XPActivity';

import { dashboardData } from '../../data/dashboardData';

const XP_STORAGE_KEY = 'velop-current-xp-v2';
const LEVEL_STORAGE_KEY = 'velop-current-level-v2';
const ACTIVITY_STORAGE_KEY = 'velop-xp-activities-v2';
const AD_DATA_KEY = 'velop-ad-data-v1';
const LOGIN_DATA_KEY = 'velop-login-data-v1';

const DAILY_AD_LIMIT = 6;
const AD_REWARDS = [10, 15, 10, 20, 15, 10];

// Get today's date.
function getToday() {
  const date = new Date();

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Get yesterday's date.
function getYesterday() {
  const date = new Date();
  date.setDate(date.getDate() - 1);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// Safely read localStorage.
function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved === null ? fallback : JSON.parse(saved);
  } catch {
    return fallback;
  }
}

// Load saved XP.
function getSavedXP() {
  try {
    const saved = localStorage.getItem(XP_STORAGE_KEY);

    if (saved === null) {
      return Number(dashboardData.currentXP) || 0;
    }

    const parsed = Number(saved);

    return Number.isFinite(parsed) && parsed >= 0
      ? parsed
      : 0;
  } catch {
    return Number(dashboardData.currentXP) || 0;
  }
}

// Calculate level according to XP.
function getLevelForXP(xp) {
  const sortedLevels = [...dashboardData.levels].sort(
    (a, b) => Number(a.requiredXP) - Number(b.requiredXP)
  );

  const eligibleLevels = sortedLevels.filter(
    (item) => xp >= Number(item.requiredXP)
  );

  return eligibleLevels.length
    ? Number(eligibleLevels[eligibleLevels.length - 1].level)
    : Number(sortedLevels[0]?.level ?? 1);
}

// Load saved activities.
function getSavedActivities() {
  const saved = readStorage(ACTIVITY_STORAGE_KEY, []);
  return Array.isArray(saved) ? saved : [];
}

// Load daily login data.
function getSavedLoginData() {
  const saved = readStorage(LOGIN_DATA_KEY, {});

  return {
    lastLoginDate: saved?.lastLoginDate ?? null,
    streak: Math.max(0, Number(saved?.streak) || 0),
  };
}

// Load advertisement data.
function getSavedAdData() {
  const saved = readStorage(AD_DATA_KEY, {});
  const today = getToday();

  return {
    date: today,
    watchedAds:
      saved?.date === today && Array.isArray(saved?.watchedAds)
        ? saved.watchedAds
        : [],
    lifetimeXP: Math.max(0, Number(saved?.lifetimeXP) || 0),
  };
}

function LevelDashboard() {
  // =====================================
  // DASHBOARD STATES
  // =====================================

  const [currentXP, setCurrentXP] = useState(getSavedXP);

  const [currentLevel, setCurrentLevel] = useState(
    () => getLevelForXP(getSavedXP())
  );

  const [activities, setActivities] = useState(getSavedActivities);
  const [loginData, setLoginData] = useState(getSavedLoginData);
  const [adData, setAdData] = useState(getSavedAdData);

  // Sidebar state.
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Date state.
  const [dashboardDate, setDashboardDate] = useState(getToday);

  // Level-up celebration states.
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationLevel, setCelebrationLevel] = useState(null);
  const [unlockedReward, setUnlockedReward] = useState(null);

  // =====================================
  // REFS
  // =====================================

  const xpRef = useRef(currentXP);
  const levelRef = useRef(currentLevel);

  const claimedAdsRef = useRef(
    new Set(adData.watchedAds)
  );

  const loginClaimedRef = useRef(
    loginData.lastLoginDate === getToday()
  );

  const dateRef = useRef(getToday());

  const { member, levels } = dashboardData;

  // =====================================
  // SIDEBAR TOGGLE
  // =====================================

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((previous) => !previous);
  }, []);

  // =====================================
  // DAILY DATE CHANGE
  // =====================================

  useEffect(() => {
    const checkDateChange = () => {
      const today = getToday();

      if (today === dateRef.current) return;

      dateRef.current = today;
      setDashboardDate(today);

      loginClaimedRef.current =
        loginData.lastLoginDate === today;

      claimedAdsRef.current = new Set();

      setAdData((previous) => ({
        date: today,
        watchedAds: [],
        lifetimeXP: previous.lifetimeXP,
      }));
    };

    const interval = setInterval(checkDateChange, 15000);

    checkDateChange();

    return () => clearInterval(interval);
  }, [loginData.lastLoginDate]);

  // =====================================
  // SAVE DASHBOARD DATA
  // =====================================

  useEffect(() => {
    try {
      localStorage.setItem(XP_STORAGE_KEY, String(currentXP));
      localStorage.setItem(LEVEL_STORAGE_KEY, String(currentLevel));

      localStorage.setItem(
        ACTIVITY_STORAGE_KEY,
        JSON.stringify(activities)
      );

      localStorage.setItem(
        LOGIN_DATA_KEY,
        JSON.stringify(loginData)
      );

      localStorage.setItem(
        AD_DATA_KEY,
        JSON.stringify(adData)
      );
    } catch (error) {
      console.error('Unable to save dashboard data:', error);
    }
  }, [
    currentXP,
    currentLevel,
    activities,
    loginData,
    adData,
  ]);

  // =====================================
  // ADD ACTIVITY
  // =====================================

  const handleActivity = useCallback((activity) => {
    if (!activity) return;

    const newActivity = {
      id: `${Date.now()}-${Math.random()}`,
      timestamp: new Date().toISOString(),
      ...activity,
    };

    setActivities((previous) =>
      [newActivity, ...previous].slice(0, 50)
    );
  }, []);

  // =====================================
  // ADD XP AND DETECT LEVEL-UP
  // =====================================

  const addXP = useCallback(
    (amount, title, description, type, shouldRecord = true) => {
      const rewardXP = Number(amount);

      if (!Number.isFinite(rewardXP) || rewardXP <= 0) {
        return;
      }

      const updatedXP = xpRef.current + rewardXP;
      const updatedLevel = getLevelForXP(updatedXP);

      xpRef.current = updatedXP;
      setCurrentXP(updatedXP);

      if (shouldRecord) {
        handleActivity({
          type,
          title,
          description,
          xp: rewardXP,
        });
      }

      if (updatedLevel > levelRef.current) {
        const newLevelData = levels.find(
          (item) => Number(item.level) === updatedLevel
        );

        levelRef.current = updatedLevel;
        setCurrentLevel(updatedLevel);

        if (newLevelData) {
          setCelebrationLevel(newLevelData);
          setUnlockedReward(newLevelData.reward);
          setShowCelebration(true);
        }
      }
    },
    [handleActivity, levels]
  );

  // =====================================
  // XP CATCHER REWARD
  // =====================================

  const handleXPEarned = useCallback(
    (amount) => {
      addXP(
        amount,
        'XP Catcher',
        'XP earned from the mini-game',
        'game',
        false
      );
    },
    [addXP]
  );

  // =====================================
  // DAILY LOGIN REWARD
  // =====================================

  const handleDailyLogin = useCallback(() => {
    const today = getToday();

    if (loginClaimedRef.current) return;

    loginClaimedRef.current = true;

    const newStreak =
      loginData.lastLoginDate === getYesterday()
        ? loginData.streak + 1
        : 1;

    const updatedLoginData = {
      lastLoginDate: today,
      streak: newStreak,
    };

    setLoginData(updatedLoginData);

    addXP(
      20,
      'Daily Login',
      'Daily login reward claimed',
      'login'
    );

    if (newStreak % 7 === 0) {
      addXP(
        50,
        '7 Day Streak Bonus',
        'Completed seven consecutive days',
        'gift'
      );
    }
  }, [loginData, addXP]);

  // =====================================
  // WATCH ADS REWARD
  // =====================================

  const handleWatchAd = useCallback(
    (adId) => {
      const today = getToday();
      const numericAdId = Number(adId);
      const reward = AD_REWARDS[numericAdId - 1];

      if (
        !Number.isInteger(numericAdId) ||
        numericAdId < 1 ||
        numericAdId > DAILY_AD_LIMIT ||
        !Number.isFinite(reward) ||
        reward <= 0 ||
        claimedAdsRef.current.has(numericAdId)
      ) {
        return;
      }

      claimedAdsRef.current.add(numericAdId);

      setAdData((previous) => {
        const previousAds =
          previous.date === today
            ? previous.watchedAds
            : [];

        const updated = {
          date: today,
          watchedAds: [...previousAds, numericAdId],
          lifetimeXP: previous.lifetimeXP + reward,
        };

        try {
          localStorage.setItem(
            AD_DATA_KEY,
            JSON.stringify(updated)
          );
        } catch (error) {
          console.error('Unable to save ad data:', error);
        }

        return updated;
      });

      addXP(
        reward,
        'Watch Ads Reward',
        `Completed demo advertisement ${numericAdId}`,
        'ad'
      );
    },
    [addXP]
  );

  // =====================================
  // CURRENT AND NEXT LEVEL
  // =====================================

  const currentLevelData = levels.find(
    (item) => Number(item.level) === Number(currentLevel)
  );

  const nextLevelData = levels.find(
    (item) => Number(item.level) === Number(currentLevel) + 1
  );

  // =====================================
  // XP PROGRESS
  // =====================================

  const currentLevelXP = Number(
    currentLevelData?.requiredXP ?? 0
  );

  const nextLevelXP = Number(
    nextLevelData?.requiredXP ?? currentLevelXP
  );

  const xpNeeded = Math.max(0, nextLevelXP - currentXP);

  const progress = nextLevelData
    ? Math.min(
        100,
        Math.max(
          0,
          ((currentXP - currentLevelXP) /
            (nextLevelXP - currentLevelXP)) *
            100
        )
      )
    : 100;

  // =====================================
  // TODAY'S AD STATISTICS
  // =====================================

  const today = dashboardDate;

  const todayAdData =
    adData.date === today
      ? adData
      : {
          watchedAds: [],
          lifetimeXP: adData.lifetimeXP,
        };

  const adsWatchedToday = todayAdData.watchedAds.length;

  const dailyAdXP = todayAdData.watchedAds.reduce(
    (total, adId) =>
      total + (AD_REWARDS[Number(adId) - 1] || 0),
    0
  );

  const dailyClaimed = loginData.lastLoginDate === today;

  // =====================================
  // CLOSE LEVEL-UP CELEBRATION
  // =====================================

  const closeCelebration = () => {
    setShowCelebration(false);
    setCelebrationLevel(null);
    setUnlockedReward(null);
  };

  // =====================================
  // MAIN DASHBOARD
  // =====================================

  return (
    <div
      className={`${styles.appLayout} ${
        sidebarCollapsed ? styles.sidebarCollapsed : ''
      }`}
    >
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <main
        className={styles.dashboard}
        id="dashboard-top"
      >
        {/* Header */}
        <CommonHeader
          member={member}
          currentXP={currentXP}
          currentLevel={currentLevel}
          activities={activities}
        />

        {/* Hero Section */}
        <section className={styles.heroGrid}>
          <div className={styles.levelCard}>
            <p className={styles.label}>CURRENT LEVEL</p>

            {/* Dynamic premium badge - only the level number changes */}
            <div className={styles.currentBadge}>
              <svg
                className={styles.badgeArtwork}
                viewBox="0 0 300 340"
                role="img"
                aria-label={`Current level ${currentLevel} badge`}
              >
                <defs>
                  <linearGradient id="badgeGoldFrame" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#fff6b8" />
                    <stop offset="24%" stopColor="#ffd85b" />
                    <stop offset="55%" stopColor="#e89a20" />
                    <stop offset="78%" stopColor="#fff0a0" />
                    <stop offset="100%" stopColor="#a95713" />
                  </linearGradient>
                  <linearGradient id="badgeGoldRibbon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff0a0" />
                    <stop offset="42%" stopColor="#ffd34e" />
                    <stop offset="100%" stopColor="#d58b19" />
                  </linearGradient>
                  <linearGradient id="badgePurpleFill" x1="0" y1="0" x2="0.8" y2="1">
                    <stop offset="0%" stopColor="#482044" />
                    <stop offset="58%" stopColor="#24132f" />
                    <stop offset="100%" stopColor="#160f27" />
                  </linearGradient>
                  <filter id="badgeGlow" x="-35%" y="-35%" width="170%" height="170%">
                    <feGaussianBlur stdDeviation="4" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Layered stepped shield frame */}
                <path d="M150 7 L174 27 L257 76 L257 101 L282 119 L282 207 L264 231 L264 250 L150 333 L36 250 L36 231 L18 207 L18 119 L43 101 L43 76 L126 27 Z" fill="url(#badgeGoldFrame)" stroke="#fff0a0" strokeWidth="3" filter="url(#badgeGlow)" />
                <path d="M150 19 L178 43 L246 83 L246 109 L269 126 L269 202 L248 229 L248 244 L150 319 L52 244 L52 229 L31 202 L31 126 L54 109 L54 83 L122 43 Z" fill="#35172f" stroke="#f4a92c" strokeWidth="3" />
                <path d="M150 34 L177 55 L234 91 L234 117 L254 132 L254 195 L233 220 L233 237 L150 304 L67 237 L67 220 L46 195 L46 132 L66 117 L66 91 L123 55 Z" fill="url(#badgePurpleFill)" stroke="#e59aff" strokeWidth="2.2" />
                <path d="M150 43 L174 63 L225 96 L225 121 L244 136 L244 191 L224 216 L224 230 L150 294 L76 230 L76 216 L56 191 L56 136 L75 121 L75 96 L126 63 Z" fill="none" stroke="#a95a9d" strokeWidth="1.8" />

                {/* Top star and sprout */}
                <path d="M150 52 L156 65 L170 67 L160 77 L163 91 L150 84 L137 91 L140 77 L130 67 L144 65 Z" fill="#ffd86b" stroke="#fff0a0" strokeWidth="1.5" />
                <g fill="#ffd66a" stroke="#ffdc78" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M150 111 V151 M136 151 H164" fill="none" />
                  <path d="M150 132 C127 130 116 111 120 101 C137 102 148 114 150 132Z" />
                  <path d="M150 132 C173 130 184 111 180 101 C163 102 152 114 150 132Z" />
                </g>

                {/* Left laurel */}
                <g fill="#e9a64a" stroke="#ffd078" strokeWidth="1.3">
                  <path d="M105 238 C63 207 54 151 91 111" fill="none" strokeWidth="3" />
                  <ellipse cx="72" cy="207" rx="6" ry="14" transform="rotate(-48 72 207)" />
                  <ellipse cx="61" cy="184" rx="6" ry="14" transform="rotate(-34 61 184)" />
                  <ellipse cx="61" cy="160" rx="6" ry="14" transform="rotate(-12 61 160)" />
                  <ellipse cx="71" cy="137" rx="6" ry="14" transform="rotate(20 71 137)" />
                  <ellipse cx="88" cy="119" rx="6" ry="14" transform="rotate(42 88 119)" />
                  <ellipse cx="94" cy="228" rx="6" ry="14" transform="rotate(-58 94 228)" />
                </g>

                {/* Right laurel */}
                <g fill="#e9a64a" stroke="#ffd078" strokeWidth="1.3">
                  <path d="M195 238 C237 207 246 151 209 111" fill="none" strokeWidth="3" />
                  <ellipse cx="228" cy="207" rx="6" ry="14" transform="rotate(48 228 207)" />
                  <ellipse cx="239" cy="184" rx="6" ry="14" transform="rotate(34 239 184)" />
                  <ellipse cx="239" cy="160" rx="6" ry="14" transform="rotate(12 239 160)" />
                  <ellipse cx="229" cy="137" rx="6" ry="14" transform="rotate(-20 229 137)" />
                  <ellipse cx="212" cy="119" rx="6" ry="14" transform="rotate(-42 212 119)" />
                  <ellipse cx="206" cy="228" rx="6" ry="14" transform="rotate(58 206 228)" />
                </g>

                {/* Dynamic number: 1, 2, 3... no leading zero */}
                <text x="150" y="204" textAnchor="middle" dominantBaseline="middle" className={styles.badgeNumber}>
                  {currentLevel}
                </text>

                {/* Front ribbon */}
                <path d="M18 231 L57 214 L243 214 L282 231 L261 269 L224 251 L76 251 L39 269 Z" fill="url(#badgeGoldRibbon)" stroke="#ffe99a" strokeWidth="2.5" />
                <path d="M39 269 L76 251 L224 251 L261 269" fill="none" stroke="#9f5b18" strokeWidth="2" />
                <text x="150" y="243" textAnchor="middle" className={styles.badgeRibbonText}>★ LEVEL ★</text>

                {/* Bottom star */}
                <path d="M150 267 L159 283 L176 286 L163 298 L166 315 L150 306 L134 315 L137 298 L124 286 L141 283 Z" fill="#ffdc70" stroke="#fff0a0" strokeWidth="2" />
              </svg>
            </div>

            <h2>{currentLevelData?.name ?? 'Member'}</h2>

            <p className={styles.muted}>
              Your journey is gaining momentum.
            </p>

            <div className={styles.progressHeader}>
              <span>XP Progress</span>

              <strong>
                {currentXP.toLocaleString('en-IN')} /{' '}
                {nextLevelXP.toLocaleString('en-IN')}
              </strong>
            </div>

            <div
              className={styles.progressTrack}
              role="progressbar"
              aria-label="XP progress to next level"
              aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className={styles.progressFooter}>
              <span>{Math.round(progress)}% completed</span>

              <span>
                {nextLevelData
                  ? `${xpNeeded.toLocaleString('en-IN')} XP remaining`
                  : 'Maximum level reached'}
              </span>
            </div>
          </div>

          <GameRewardsSpotlight />
        </section>

        {/* Next Milestone */}
        <section className={styles.comingSection}>
          <h2>Your next milestone</h2>

          <p>
            {nextLevelData
              ? `Earn ${xpNeeded.toLocaleString('en-IN')} more XP to unlock ${nextLevelData.name}.`
              : 'Congratulations! You have completed all available levels.'}
          </p>
        </section>

        {/* Next Level Reward */}
        <NextLevelReward
          currentXP={currentXP}
          levels={levels}
        />

        {/* Level Roadmap */}
        <LevelRoadmap
          currentXP={currentXP}
          currentLevel={currentLevel}
        />

        {/* Watch Ads and Daily XP */}
        <div
          id="watch-ads"
          className={styles.sectionAnchor}
        >
          <EarnMoreXP
            onDailyLogin={handleDailyLogin}
            onWatchAd={handleWatchAd}
            dailyClaimed={dailyClaimed}
            adClaimedIds={todayAdData.watchedAds}
            adsWatchedToday={adsWatchedToday}
            dailyAdXP={dailyAdXP}
            lifetimeAdXP={adData.lifetimeXP}
            streak={loginData.streak}
            lastClaimDate={loginData.lastLoginDate}
            dailyAdLimit={DAILY_AD_LIMIT}
          />
        </div>

        {/* XP Catcher */}
        {/* XP Catcher component owns the xp-catcher ID */}
        <XPCatcher
          onXPEarned={handleXPEarned}
          onActivity={handleActivity}
        />

        {/* Recent XP Activity */}
        <div
          id="xp-activity"
          className={styles.sectionAnchor}
        >
          <XPActivity activities={activities} />
        </div>

        {/* Demo Note */}
        <p className={styles.demoNote}>
          Development preview · Sample rewards only
        </p>

        {/* Level-Up Celebration */}
        {showCelebration && celebrationLevel && (
          <LevelUpCelebration
            level={celebrationLevel}
            reward={unlockedReward}
            onClose={closeCelebration}
          />
        )}
      </main>
    </div>
  );
}

export default LevelDashboard;
