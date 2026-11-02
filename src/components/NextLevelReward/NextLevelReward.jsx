import { useEffect, useState } from 'react';

import {
  Gift,
  Lock,
  CheckCircle2,
  Sparkles,
  Trophy,
  Award,
  Coins,
  Crown,
  Gem,
  Star,
  Zap,
} from 'lucide-react';

import styles from './NextLevelReward.module.css';

const STORAGE_KEY = 'velop-unlocked-rewards-v2';

function getSavedRewards() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getRewardIcon(reward = '') {
  const name = String(reward).toLowerCase();

  if (name.includes('ve') || name.includes('coin')) {
    return Coins;
  }

  if (name.includes('crown') || name.includes('master')) {
    return Crown;
  }

  if (name.includes('gem')) {
    return Gem;
  }

  if (name.includes('badge')) {
    return Award;
  }

  if (name.includes('trophy')) {
    return Trophy;
  }

  return Gift;
}

function NextLevelReward({ currentXP = 0, levels = [] }) {
  const xp = Math.max(0, Number(currentXP) || 0);

  const [unlockedRewards, setUnlockedRewards] =
    useState(getSavedRewards);

  // Save newly unlocked rewards
  useEffect(() => {
    const newlyUnlocked = levels
      .filter((item) => {
        return (
          xp >= Number(item.requiredXP ?? 0) &&
          item.reward
        );
      })
      .map((item) => Number(item.level));

    setUnlockedRewards((previous) => {
      const combined = [
        ...new Set([...previous, ...newlyUnlocked]),
      ];

      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(combined)
        );
      } catch (error) {
        console.error(
          'Unable to save unlocked rewards:',
          error
        );
      }

      return combined;
    });
  }, [xp, levels]);

  // Find next upcoming reward
  const nextReward = levels
    .filter(
      (item) => Number(item.requiredXP ?? 0) > xp
    )
    .sort(
      (a, b) =>
        Number(a.requiredXP) - Number(b.requiredXP)
    )[0];

  // Get unlocked reward history
  const unlockedRewardItems = levels
    .filter((item) =>
      unlockedRewards.includes(Number(item.level))
    )
    .sort(
      (a, b) => Number(b.level) - Number(a.level)
    );

  const NextIcon = nextReward
    ? getRewardIcon(nextReward.reward)
    : Sparkles;

  return (
    <section className={styles.rewardSection}>

      {/* SECTION HEADING */}
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>
            <Sparkles size={14} />
            VELOOP REWARDS
          </p>

          <h2>Reward Vault</h2>

          <p className={styles.subtitle}>
            Track your unlocked rewards and upcoming milestones.
          </p>
        </div>

        <div className={styles.headingIcon}>
          <Trophy size={26} />
        </div>
      </div>

      {/* UPCOMING REWARD */}
      <div className={styles.featuredReward}>

        <div className={styles.featuredGlow} />

        <div className={styles.featuredIcon}>
          <NextIcon size={30} />
        </div>

        <div className={styles.featuredContent}>
          <span className={styles.cardLabel}>
            {nextReward
              ? 'UPCOMING REWARD'
              : 'ALL REWARDS UNLOCKED'}
          </span>

          <h3>
            {nextReward
              ? nextReward.reward
              : 'Congratulations!'}
          </h3>

          <p>
            {nextReward
              ? `Reach Level ${String(nextReward.level).padStart(2, '0')} with ${Number(nextReward.requiredXP).toLocaleString('en-IN')} XP to unlock this reward.`
              : 'You have unlocked every currently configured reward.'}
          </p>

          {nextReward && (
            <div className={styles.targetInfo}>
              <Zap size={15} />
              <span>
                {Number(nextReward.requiredXP).toLocaleString('en-IN')} XP milestone
              </span>
            </div>
          )}
        </div>

        {nextReward && (
          <span className={styles.lockedBadge}>
            <Lock size={13} />
            LOCKED
          </span>
        )}

      </div>

      {/* UNLOCKED REWARD HISTORY */}
      <div className={styles.historySection}>

        <div className={styles.historyHeading}>
          <div>
            <h3>Unlocked Rewards</h3>
            <p>Your reward collection</p>
          </div>

          <span className={styles.rewardCount}>
            <CheckCircle2 size={15} />
            {unlockedRewardItems.length} UNLOCKED
          </span>
        </div>

        {unlockedRewardItems.length > 0 ? (
          <div className={styles.rewardList}>
            {unlockedRewardItems.map((item) => {
              const RewardIcon = getRewardIcon(item.reward);

              return (
                <div
                  className={styles.rewardItem}
                  key={item.level}
                >
                  <div className={styles.rewardItemIcon}>
                    <RewardIcon size={23} />
                  </div>

                  <div className={styles.rewardItemInfo}>
                    <strong>{item.reward}</strong>

                    <span>
                      <Star size={13} />
                      Level {String(item.level).padStart(2, '0')}
                      {' · '}
                      {item.name}
                    </span>
                  </div>

                  <span className={styles.unlockedBadge}>
                    <CheckCircle2 size={15} />
                    Unlocked
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <Gift size={28} />
            </div>

            <strong>No rewards unlocked yet</strong>

            <p>
              Keep earning XP to build your reward collection.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}

export default NextLevelReward;