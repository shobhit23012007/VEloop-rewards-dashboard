
import {
  Trophy,
  Sparkles,
  Gift,
  X,
  ArrowRight,
} from 'lucide-react';

import styles from './LevelUpCelebration.module.css';

function LevelUpCelebration({ level, reward, onClose }) {
  if (!level) return null;

  const confettiPieces = Array.from({ length: 30 }, (_, i) => i);
  const fireworkParticles = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="celebration-title"
      >
        {/* Celebration effects */}
        <div className={styles.celebrationEffects} aria-hidden="true">

          {/* Firework 1 */}
          <div className={`${styles.firework} ${styles.fireworkOne}`}>
            {fireworkParticles.map((i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>

          {/* Firework 2 */}
          <div className={`${styles.firework} ${styles.fireworkTwo}`}>
            {fireworkParticles.map((i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>

          {/* Firework 3 */}
          <div className={`${styles.firework} ${styles.fireworkThree}`}>
            {fireworkParticles.map((i) => (
              <span key={i} style={{ '--i': i }} />
            ))}
          </div>

          {/* Falling confetti */}
          <div className={styles.confettiRain}>
            {confettiPieces.map((i) => (
              <span
                key={i}
                style={{
                  '--i': i,
                  '--delay': `${(i % 10) * 0.25}s`,
                  '--duration': `${3 + (i % 4) * 0.5}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Close button */}
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close celebration"
        >
          <X size={20} />
        </button>

        <div className={styles.sparkleTop}>✦</div>

        {/* Trophy */}
        <div className={styles.trophyCircle}>
          <Trophy size={44} />
        </div>

        <p className={styles.eyebrow}>
          VELOOP REWARDS
        </p>

        <h2 id="celebration-title" className={styles.title}>
          LEVEL UP!
        </h2>

        <p className={styles.message}>
          Congratulations! You've unlocked a new milestone.
        </p>

        {/* Level information */}
        <div className={styles.levelBadge}>
          <span className={styles.levelLabel}>LEVEL</span>

          <strong>
            {String(level.level).padStart(2, '0')}
          </strong>

          <span className={styles.levelName}>
            {level.name}
          </span>
        </div>

        {/* Reward information */}
        <div className={styles.reward}>
          <div className={styles.rewardIcon}>
            <Gift size={25} />
          </div>

          <div className={styles.rewardInfo}>
            <span>NEW REWARD UNLOCKED</span>
            <strong>{reward || level.reward}</strong>
          </div>
        </div>

        {/* Continue button */}
        <button
          type="button"
          className={styles.continueButton}
          onClick={onClose}
        >
          Continue
          <ArrowRight size={18} />
        </button>

        <div className={styles.sparkleBottom}>
          <Sparkles size={22} />
        </div>
      </div>
    </div>
  );
}

export default LevelUpCelebration;
