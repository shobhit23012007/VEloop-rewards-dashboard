
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
    next: 'Next',
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
        <h2 className={styles.mainTitle}>Progression Atlas</h2>
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

  return (
    <section className={styles.roadmap}>
      {/* Heading */}
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>YOUR JOURNEY</p>

          <h2 className={styles.mainTitle}>
            Progression Atlas
          </h2>

          <p className={styles.subtitle}>
            Explore your progression and upcoming milestones.
          </p>
        </div>

        <div className={styles.trophyIcon}>
          <Trophy size={27} />
        </div>
      </div>

      {/* Level Cards */}
      <div className={styles.levelList}>
        {levels.map((item) => {
          const levelNumber = Number(item.level);
          const status = getStatus(levelNumber);
          const isSelected = selectedLevel === levelNumber;
          const LevelIcon = getLevelIcon(levelNumber);

          return (
            <button
              type="button"
              key={item.level}
              className={`${styles.levelItem} ${styles[status]}`}
              data-selected={isSelected}
              onClick={() => setSelectedLevel(levelNumber)}
              aria-pressed={isSelected}
              aria-label={`View Level ${item.level}: ${item.name}`}
            >
              <div className={styles.levelIcon}>
                {status === 'completed' ? (
                  <Check size={21} />
                ) : status === 'locked' ? (
                  <Lock size={19} />
                ) : (
                  <LevelIcon size={22} />
                )}
              </div>

              <div className={styles.levelInfo}>
                <strong>Level {item.level}</strong>
                <span>{item.name}</span>
              </div>

              <span className={styles.status}>
                {statusLabels[status]}
              </span>

              <ArrowUpRight
                size={17}
                className={styles.selectIcon}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {/* Selected Level Details */}
      <div
        className={styles.levelDetails}
        aria-live="polite"
        key={selectedItem.level}
      >
        <div className={styles.detailsHeading}>
          <div>
            <p className={styles.eyebrow}>LEVEL DETAILS</p>

            <h3>
              Level {selectedItem.level} · {selectedItem.name}
            </h3>
          </div>

          <div className={styles.detailStar}>
            <SelectedIcon size={27} />
          </div>
        </div>

        <div className={styles.detailsGrid}>
          <div className={styles.detailCard}>
            <span>
              <Zap size={14} /> Required XP
            </span>
            <strong>
              {requiredXP.toLocaleString('en-IN')} XP
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Gift size={14} /> Level Reward
            </span>
            <strong>{getReward(selectedItem)}</strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Trophy size={14} /> Level Status
            </span>
            <strong className={styles[`${selectedStatus}Text`]}>
              {statusLabels[selectedStatus]}
            </strong>
          </div>

          <div className={styles.detailCard}>
            <span>
              <Target size={14} /> XP Remaining
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
              ? 'You are currently at this level. Keep earning XP to reach your next milestone.'
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
