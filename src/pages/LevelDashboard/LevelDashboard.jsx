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

            <div className={styles.levelNumber}>
              {String(currentLevel).padStart(2, '0')}
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