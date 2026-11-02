
import { useEffect, useState } from 'react';

import {
  Check,
  Lock,
  Trophy,
  Star,
  ArrowUpRight,
  Sprout,
  Compass,
  Target,
  TrendingUp,
  Crown,
  Gem,
  Gift,
  Zap,
  Shield,
  Sparkles,
} from 'lucide-react';

import styles from './LevelRoadmap.module.css';
import { dashboardData } from '../../data/dashboardData';

const levelIcons = [
  Sprout,
  Compass,
  Target,
  TrendingUp,
  Crown,
  Gem,
];

const badgeThemes = [
  'goldBadge',
  'purpleBadge',
  'silverBadge',
  'silverBadge',
  'silverBadge',
  'masterBadge',
];

function LevelRoadmap({
  currentXP = dashboardData.currentXP,
  currentLevel = dashboardData.currentLevel,
}) {
  const levels = dashboardData.levels ?? [];

  const [selectedLevel, setSelectedLevel] = useState(
    Number(currentLevel)
  );

  useEffect(() => {
    setSelectedLevel(Number(currentLevel));
  }, [currentLevel]);

  const getStatus = (level) => {
    if (level < currentLevel) return 'completed';
    if (level === currentLevel) return 'current';
    if (level === currentLevel + 1) return 'next';
    return 'locked';
  };

  const statusLabels = {
    completed: 'Completed',
    current: 'Current',
    next: 'Next Level',
    locked: 'Locked',
  };

  const getRequiredXP = (item) =>
    Number(item.requiredXP ?? item.xpRequired ?? item.xp ?? 0);

  const getReward = (item) =>
    item.reward ?? item.rewardName ?? 'Not configured';

  const getLevelIcon = (level) => {
    const Icon = levelIcons[(Number(level) - 1) % levelIcons.length];
    return Icon || Star;
  };

  if (!levels.length) {
    return (
      <section className={styles.roadmap}>
        <p className={styles.eyebrow}>YOUR JOURNEY</p>
        <h2 className={styles.mainTitle}>Level Progression</h2>
        <p className={styles.subtitle}>
          Level information is currently unavailable.
        </p>
      </section>
    );
  }

  const selectedItem = levels.find(
    (item) => Number(item.level) === selectedLevel
  );

  if (!selectedItem) {
    return (
      <section className={styles.roadmap}>
        <p className={styles.subtitle}>
          Selected level information is unavailable.
        </p>
      </section>
    );
  }

  const selectedLevelNumber = Number(selectedItem.level);
  const selectedStatus = getStatus(selectedLevelNumber);
  const requiredXP = getRequiredXP(selectedItem);

  const nextMilestone = levels.find(
    (item) => Number(item.level) === selectedLevelNumber + 1
  );

  const targetXP =
    selectedStatus === 'current' && nextMilestone
      ? getRequiredXP(nextMilestone)
      : requiredXP;

  const remainingXP =
    selectedStatus === 'completed'
      ? 0
      : Math.max(0, targetXP - currentXP);

  const SelectedIcon = getLevelIcon(selectedLevelNumber);

  const currentLevelData = levels.find(
    (item) => Number(item.level) === Number(currentLevel)
  );

  const CurrentIcon = getLevelIcon(currentLevel);

  return (
    <section className={styles.roadmap}>

      {/* SECTION HEADING */}
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>
            <Sparkles size={15} />
            YOUR JOURNEY
          </p>

          <h2 className={styles.mainTitle}>
            Level Progression
          </h2>

          <p className={styles.subtitle}>
            Unlock milestones, collect rewards and keep moving forward.
          </p>
        </div>

        <div className={styles.trophyIcon}>
          <Trophy size={27} />
        </div>
      </div>

      {/* CURRENT LEVEL SUMMARY */}
      <div className={styles.currentSummary}>
        <div className={styles.summaryIcon}>
          <Shield size={25} />
        </div>

        <div className={styles.summaryInfo}>
          <span>YOUR CURRENT LEVEL</span>

          <strong>
            Level {String(currentLevel).padStart(2, '0')}
            {' · '}
            {currentLevelData?.name ?? 'Member'}
          </strong>
        </div>

        <div className={styles.summaryXP}>
          <Zap size={19} />
          <strong>{currentXP.toLocaleString('en-IN')} XP</strong>
        </div>
      </div>

      {/* LEVEL BADGE CARDS */}
      <div className={styles.levelList}>
        {levels.map((item, index) => {
          const levelNumber = Number(item.level);
          const status = getStatus(levelNumber);
          const isSelected = selectedLevel === levelNumber;

          const LevelIcon = getLevelIcon(levelNumber);

          const theme =
            badgeThemes[index % badgeThemes.length];

          return (
            <button
              type="button"
              key={item.level}
              className={`
                ${styles.levelItem}
                ${styles[status]}
                ${isSelected ? styles.selectedItem : ''}
              `}
              onClick={() => setSelectedLevel(levelNumber)}
              aria-pressed={isSelected}
              aria-label={`View Level ${levelNumber}: ${item.name}`}
            >
              <div className={styles.cardTop}>
                <span className={styles.levelLabel}>
                  LEVEL {String(levelNumber).padStart(2, '0')}
                </span>

                <span className={styles.status}>
                  {status === 'completed' ? (
                    <Check size={13} />
                  ) : status === 'locked' ? (
                    <Lock size={13} />
                  ) : (
                    <Star size={13} />
                  )}

                  {statusLabels[status]}
                </span>
              </div>

              {/* PREMIUM LEVEL BADGE */}
              <div className={styles.badgeArea}>
                <div
                  className={`
                    ${styles.badgeVisual}
                    ${styles[theme]}
                  `}
                >
                  <div className={styles.badgeOuter}>
                    <div className={styles.badgeInner}>
                      <LevelIcon
                        className={styles.badgeIcon}
                        size={25}
                      />

                      <span className={styles.badgeNumber}>
                        {String(levelNumber).padStart(2, '0')}
                      </span>

                      <span className={styles.badgeCaption}>
                        LEVEL
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.levelInfo}>
                <strong>{item.name}</strong>
                <span>{item.reward}</span>
              </div>

              <div className={styles.cardFooter}>
                <span>
                  <Zap size={17} />
                  {getRequiredXP(item).toLocaleString('en-IN')} XP
                </span>

                <ArrowUpRight
                  size={19}
                  className={styles.selectIcon}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED LEVEL DETAILS */}
      <div
        className={styles.levelDetails}
        aria-live="polite"
        key={selectedItem.level}
      >
        <div className={styles.detailsHeading}>
          <div>
            <p className={styles.eyebrow}>
              <Sparkles size={14} />
              LEVEL DETAILS
            </p>

            <h3>
              Level {String(selectedLevelNumber).padStart(2, '0')}
              {' · '}
              {selectedItem.name}
            </h3>

            <p className={styles.subtitle}>
              Explore this milestone and its associated reward.
            </p>
          </div>

          <div className={styles.detailStar}>
            <SelectedIcon size={29} />
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <span>
              <Zap size={15} /> Required XP
            </span>

            <strong>
              {requiredXP.toLocaleString('en-IN')} XP
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Gift size={15} /> Level Reward
            </span>

            <strong>{getReward(selectedItem)}</strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Trophy size={15} /> Level Status
            </span>

            <strong className={styles[`${selectedStatus}Text`]}>
              {statusLabels[selectedStatus]}
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Target size={15} /> XP Remaining
            </span>

            <strong>
              {remainingXP.toLocaleString('en-IN')} XP
            </strong>
          </div>
        </div>

        <p className={styles.detailMessage}>
          {selectedStatus === 'completed' &&
            'You have successfully completed this level.'}

          {selectedStatus === 'current' &&
            (nextMilestone
              ? `You are currently at this level. Earn ${remainingXP.toLocaleString('en-IN')} more XP to reach your next milestone.`
              : 'Congratulations! You have reached the highest available level.')}

          {selectedStatus === 'next' &&
            'You are getting closer to this milestone. Keep earning XP!'}

          {selectedStatus === 'locked' &&
            'This milestone is locked. Complete the previous levels to progress further.'}
        </p>
      </div>
    </section>
  );
}

export default LevelRoadmap;
