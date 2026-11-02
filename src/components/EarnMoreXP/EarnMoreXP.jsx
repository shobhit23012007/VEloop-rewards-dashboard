import { useEffect, useState } from 'react';

import {
  CalendarCheck,
  Gamepad2,
  Target,
  Compass,
  ArrowUpRight,
  PlayCircle,
  Flame,
  CheckCircle2,
  X,
  Coins,
  Eye,
  TrendingUp,
  Zap,
  Gift,
  Clock3,
  Lock,
} from 'lucide-react';

import styles from './EarnMoreXP.module.css';

const AD_REWARDS = [10, 15, 10, 20, 15, 10];
const AD_DURATION = 5;
const COOLDOWN_DURATION = 10 * 60 * 1000;
const COOLDOWN_KEY = 'velop-next-ad-time-v1';

function getSavedCooldown() {
  try {
    return Number(localStorage.getItem(COOLDOWN_KEY)) || 0;
  } catch {
    return 0;
  }
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function formatTime(milliseconds) {
  const totalSeconds = Math.max(
    0,
    Math.ceil(milliseconds / 1000)
  );

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function EarnMoreXP({
  onDailyLogin,
  onWatchAd,
  dailyClaimed = false,
  adClaimedIds = [],
  adsWatchedToday = 0,
  dailyAdXP = 0,
  lifetimeAdXP = 0,
  streak = 0,
  lastClaimDate = null,
  dailyAdLimit = 6,
}) {
  const [adPlaying, setAdPlaying] = useState(false);
  const [adCountdown, setAdCountdown] = useState(AD_DURATION);
  const [cooldownUntil, setCooldownUntil] = useState(getSavedCooldown);
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [selectedFeature, setSelectedFeature] = useState(null);

  const claimedAds = new Set(adClaimedIds);

  const nextAdId = Array.from(
    { length: dailyAdLimit },
    (_, index) => index + 1
  ).find((id) => !claimedAds.has(id));

  const remainingAds = Math.max(
    0,
    dailyAdLimit - adsWatchedToday
  );

  const cooldownRemaining = Math.max(
    0,
    cooldownUntil - currentTime
  );

  const isCoolingDown = cooldownRemaining > 0;

  const dailyGoal = AD_REWARDS
    .slice(0, dailyAdLimit)
    .reduce((total, reward) => total + reward, 0);

  const dailyProgress = dailyGoal
    ? Math.min(100, (dailyAdXP / dailyGoal) * 100)
    : 0;

  const nextAdReward = nextAdId
    ? AD_REWARDS[nextAdId - 1]
    : 0;

  // Update cooldown timer.
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save cooldown.
  useEffect(() => {
    try {
      if (cooldownUntil > 0) {
        localStorage.setItem(
          COOLDOWN_KEY,
          String(cooldownUntil)
        );
      }
    } catch (error) {
      console.error('Unable to save ad cooldown:', error);
    }
  }, [cooldownUntil]);

  // Simulated advertisement playback.
  useEffect(() => {
    if (!adPlaying) return;

    if (adCountdown <= 0) {
      const completedAdId = nextAdId;
      const reward = AD_REWARDS[completedAdId - 1];

      setAdPlaying(false);
      setAdCountdown(AD_DURATION);

      const nextUnlockTime =
        Date.now() + COOLDOWN_DURATION;

      setCooldownUntil(nextUnlockTime);

      onWatchAd?.(completedAdId, reward);

      return;
    }

    const timer = setTimeout(() => {
      setAdCountdown((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [adPlaying, adCountdown, nextAdId, onWatchAd]);

  // Start advertisement.
  const startAd = () => {
    if (
      !nextAdId ||
      remainingAds <= 0 ||
      isCoolingDown ||
      adPlaying
    ) {
      return;
    }

    setAdCountdown(AD_DURATION);
    setAdPlaying(true);
  };

  // Cancel advertisement.
  const cancelAd = () => {
    setAdPlaying(false);
    setAdCountdown(AD_DURATION);
  };

  // Open XP Catcher.
  const openGame = () => {
    document.getElementById('xp-catcher')?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  // Calculate streak days.
  const streakDays = Array.from(
    { length: 7 },
    (_, index) => {
      const date = new Date();

      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));

      const dateKey = getDateKey(date);

      let active = false;

      if (lastClaimDate && streak > 0) {
        const lastDate = new Date(
          `${lastClaimDate}T00:00:00`
        );

        const streakStart = new Date(lastDate);

        streakStart.setDate(
          streakStart.getDate() - Math.min(streak - 1, 6)
        );

        active = date >= streakStart && date <= lastDate;
      }

      return {
        dateKey,
        label: date.toLocaleDateString('en-US', {
          weekday: 'short',
        }),
        active,
      };
    }
  );

  // Other earning options.
  const earningOptions = [
    {
      title: 'Complete Challenges',
      description:
        'Take on challenges and track your progress.',
      reward: '+100 XP',
      icon: Target,
      tag: 'CHALLENGES',
      details:
        'Complete exciting tasks, achieve milestones and earn bonus XP through special challenges.',
    },
    {
      title: 'Explore VELOOP',
      description:
        'Discover activities and upcoming reward opportunities.',
      reward: '+30 XP',
      icon: Compass,
      tag: 'DISCOVER',
      details:
        'Explore the VELOOP ecosystem, discover new activities and unlock additional reward opportunities.',
    },
  ];

  return (
    <section className={styles.section}>
      {/* Section Heading */}
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>GROW YOUR REWARDS</p>

          <h2>Earn More XP</h2>

          <p className={styles.subtitle}>
            Discover activities that can help you reach your next milestone.
          </p>
        </div>

        <div className={styles.headingIcon}>
          <Target size={25} />
        </div>
      </div>

      {/* Daily Streak */}
      <article className={styles.streakCard}>
        <div className={styles.cardTop}>
          <div className={styles.iconBox}>
            <Flame size={23} />
          </div>

          <span className={styles.tag}>DAILY STREAK</span>
        </div>

        <h3>
          {streak} Day{streak !== 1 ? 's' : ''} Streak
        </h3>

        <p className={styles.description}>
          Log in every day. Complete 7 consecutive days to earn a bonus of 50 XP.
        </p>

        <div className={styles.streakDays}>
          {streakDays.map((day) => (
            <div
              className={styles.streakDay}
              key={day.dateKey}
            >
              <div
                className={`${styles.streakCircle} ${
                  day.active ? styles.streakActive : ''
                }`}
              >
                {day.active ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <Flame size={18} />
                )}
              </div>

              <small>{day.label}</small>
            </div>
          ))}
        </div>

        <div className={styles.cardBottom}>
          <div className={styles.rewardInfo}>
            <span>NEXT STREAK BONUS</span>
            <strong>+50 XP</strong>
          </div>

          <span className={styles.tag}>
            {streak % 7}/7 DAYS
          </span>
        </div>
      </article>

      {/* Daily Login and XP Catcher */}
      <div className={styles.grid}>
        {/* Daily Login - Sidebar target */}
        <article
          id="daily-xp"
          className={styles.card}
        >
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>
              <CalendarCheck size={23} />
            </div>

            <span className={styles.tag}>DAILY ACTIVITY</span>
          </div>

          <h3>Daily Login</h3>

          <p className={styles.description}>
            Visit VELOOP daily and maintain your activity streak.
          </p>

          <div className={styles.cardBottom}>
            <div className={styles.rewardInfo}>
              <span>DAILY REWARD</span>
              <strong>+20 XP</strong>
            </div>

            <button
              type="button"
              className={styles.action}
              onClick={onDailyLogin}
              disabled={dailyClaimed}
            >
              {dailyClaimed ? 'Claimed' : 'Claim Reward'}

              {dailyClaimed ? (
                <CheckCircle2 size={16} />
              ) : (
                <ArrowUpRight size={16} />
              )}
            </button>
          </div>
        </article>

        {/* XP Catcher Shortcut */}
        <article className={styles.card}>
          <div className={styles.cardTop}>
            <div className={styles.iconBox}>
              <Gamepad2 size={23} />
            </div>

            <span className={styles.tag}>PLAY NOW</span>
          </div>

          <h3>Play XP Catcher</h3>

          <p className={styles.description}>
            Test your speed in the skill-based XP Catcher mini-game.
          </p>

          <div className={styles.cardBottom}>
            <div className={styles.rewardInfo}>
              <span>GAME MODE</span>
              <strong>DEMO GAME</strong>
            </div>

            <button
              type="button"
              className={styles.action}
              onClick={openGame}
            >
              Play Game <ArrowUpRight size={16} />
            </button>
          </div>
        </article>
      </div>

      {/* Watch Ads Section */}
      <section className={styles.adsSection}>
        <div className={styles.adsHeading}>
          <div>
            <p className={styles.eyebrow}>WATCH & EARN</p>

            <h2>Watch Ads, Earn XP</h2>

            <p className={styles.subtitle}>
              Complete advertisements and collect daily XP rewards.
            </p>
          </div>

          <div className={styles.headingIcon}>
            <PlayCircle size={25} />
          </div>
        </div>

        {/* Earnings Progress */}
        <div className={styles.adsBanner}>
          <div className={styles.adsBannerTop}>
            <strong>Daily Earnings Progress</strong>

            <strong className={styles.goldText}>
              {dailyAdXP} / {dailyGoal} XP
            </strong>
          </div>

          <div className={styles.adsProgressTrack}>
            <div
              className={styles.adsProgressFill}
              style={{ width: `${dailyProgress}%` }}
            />
          </div>

          <p className={styles.adsHint}>
            <Zap size={15} />
            Complete ads to make progress toward your daily XP goal.
          </p>
        </div>

        {/* Statistics */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Coins size={20} />
            </div>

            <p>Today's Earnings</p>
            <strong>{dailyAdXP} XP</strong>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <TrendingUp size={20} />
            </div>

            <p>Lifetime Earnings</p>
            <strong>{lifetimeAdXP} XP</strong>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <Eye size={20} />
            </div>

            <p>Ads Watched Today</p>
            <strong>{adsWatchedToday}</strong>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <PlayCircle size={20} />
            </div>

            <p>Remaining Ads</p>
            <strong>{remainingAds}</strong>
          </div>
        </div>

        {/* Single Advertisement Card */}
        <div className={styles.singleAdCard}>
          <div className={styles.singleAdVisual}>
            <div className={styles.adPlayCircle}>
              {remainingAds === 0 ? (
                <CheckCircle2 size={32} />
              ) : isCoolingDown ? (
                <Lock size={32} />
              ) : (
                <PlayCircle size={34} />
              )}
            </div>

            <span className={styles.adLiveTag}>
              {remainingAds === 0
                ? 'DAILY LIMIT REACHED'
                : isCoolingDown
                  ? 'NEXT AD LOCKED'
                  : 'READY TO WATCH'}
            </span>

            <div className={styles.adVisualText}>
              <span>VELOOP REWARDS</span>

              <strong>
                {remainingAds === 0
                  ? 'Great work!'
                  : `Advertisement ${adsWatchedToday + 1}`}
              </strong>

              <small>
                {remainingAds === 0
                  ? 'Come back tomorrow for more ads.'
                  : 'Watch a demo ad and earn XP.'}
              </small>
            </div>
          </div>

          <div className={styles.singleAdInfo}>
            <div>
              <span className={styles.cardLabel}>
                {remainingAds === 0
                  ? 'ALL ADS COMPLETED'
                  : `ADVERTISEMENT ${adsWatchedToday + 1} OF ${dailyAdLimit}`}
              </span>

              <h3>
                {remainingAds === 0
                  ? 'Daily limit completed'
                  : 'Watch & Earn'}
              </h3>

              <p className={styles.description}>
                {remainingAds === 0
                  ? 'You have watched all available advertisements for today.'
                  : isCoolingDown
                    ? 'Your next advertisement will unlock when the timer finishes.'
                    : 'Watch the short demo advertisement to collect your XP reward.'}
              </p>
            </div>

            <div className={styles.adActionRow}>
              <div className={styles.rewardInfo}>
                <span>YOUR REWARD</span>

                <strong>
                  {remainingAds === 0
                    ? 'COMPLETED'
                    : `+${nextAdReward} XP`}
                </strong>
              </div>

              <button
                type="button"
                className={styles.action}
                disabled={
                  remainingAds === 0 ||
                  isCoolingDown ||
                  adPlaying
                }
                onClick={startAd}
              >
                {remainingAds === 0
                  ? 'Completed'
                  : adPlaying
                    ? `Watching ${adCountdown}s`
                    : isCoolingDown
                      ? `Next Ad ${formatTime(cooldownRemaining)}`
                      : 'Watch Ad'}

                {isCoolingDown ? (
                  <Clock3 size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </button>
            </div>

            {isCoolingDown && remainingAds > 0 && (
              <div className={styles.cooldownBox}>
                <Clock3 size={17} />

                <div>
                  <strong>Next ad unlocks in</strong>
                  <span>{formatTime(cooldownRemaining)}</span>
                </div>
              </div>
            )}

            {adPlaying && (
              <div className={styles.watchingBox}>
                <PlayCircle size={19} />

                <span>
                  Demo advertisement playing — {adCountdown} seconds remaining
                </span>
              </div>
            )}
          </div>
        </div>

        <p className={styles.disclaimer}>
          Demo advertisements only · XP values are illustrative and do not represent real ad revenue.
        </p>
      </section>

      {/* Other Earning Options */}
      <div className={styles.grid}>
        {earningOptions.map((item) => {
          const Icon = item.icon;

          return (
            <article
              className={styles.card}
              key={item.title}
            >
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <Icon size={23} />
                </div>

                <span className={styles.tag}>
                  {item.tag}
                </span>
              </div>

              <h3>{item.title}</h3>

              <p className={styles.description}>
                {item.description}
              </p>

              <div className={styles.cardBottom}>
                <div className={styles.rewardInfo}>
                  <span>DEMO REWARD</span>
                  <strong>{item.reward}</strong>
                </div>

                <button
                  type="button"
                  className={styles.comingSoon}
                  onClick={() => setSelectedFeature(item)}
                >
                  Coming Soon <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Feature Modal */}
      {selectedFeature && (
        <div
          className={styles.featureBackdrop}
          onClick={() => setSelectedFeature(null)}
        >
          <div
            className={styles.featureModal}
            role="dialog"
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => setSelectedFeature(null)}
              aria-label="Close"
            >
              <X size={21} />
            </button>

            <div className={styles.modalIcon}>
              <Gift size={32} />
            </div>

            <p className={styles.eyebrow}>COMING SOON</p>

            <h2>{selectedFeature.title}</h2>

            <p>{selectedFeature.details}</p>

            <div className={styles.modalReward}>
              <strong>{selectedFeature.reward}</strong>
              <span>Potential demo reward</span>
            </div>

            <p className={styles.modalNote}>
              <Clock3 size={15} />
              This feature is under development.
            </p>

            <button
              type="button"
              className={styles.action}
              onClick={() => setSelectedFeature(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Advertisement Player */}
      {adPlaying && (
        <div className={styles.adBackdrop}>
          <div
            className={styles.adModal}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className={styles.modalClose}
              onClick={cancelAd}
              aria-label="Cancel advertisement"
            >
              <X size={21} />
            </button>

            <PlayCircle
              size={54}
              className={styles.adPlayerIcon}
            />

            <p className={styles.eyebrow}>
              VELOOP DEMO ADVERTISEMENT
            </p>

            <h2>Watch & Earn</h2>

            <p className={styles.modalDescription}>
              Complete this demo advertisement to collect your reward.
            </p>

            <div className={styles.adCountdown}>
              {adCountdown}
            </div>

            <p className={styles.adReward}>
              Reward: +{nextAdReward} XP
            </p>

            <p className={styles.modalNote}>
              <Clock3 size={15} />
              This is a simulated ad experience, not a real advertisement.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default EarnMoreXP;