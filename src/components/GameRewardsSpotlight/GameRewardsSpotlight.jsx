
import {
  Gamepad2,
  Play,
  Coins,
  Gift,
  Clock3,
  ArrowUpRight,
  Sparkles,
  Target,
} from 'lucide-react';

import styles from './GameRewardsSpotlight.module.css';

function GameRewardsSpotlight() {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <section className={styles.spotlight}>
      <div className={styles.glow} />

      {/* Left Content */}
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          <Sparkles size={14} />
          VELOOP ARCADE
        </span>

        <h2>
          Play. Earn.
          <br />
          <span>Level Up.</span>
        </h2>

        <p className={styles.description}>
          Explore mini-games, collect XP and unlock exciting
          rewards as you progress through VELOOP.
        </p>

        {/* Features */}
        <div className={styles.featureList}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <Gamepad2 size={18} />
            </span>

            <div>
              <strong>Mini Games</strong>
              <small>Play and earn XP</small>
            </div>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <Coins size={18} />
            </span>

            <div>
              <strong>XP Rewards</strong>
              <small>Build your progress</small>
            </div>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureIcon}>
              <Gift size={18} />
            </span>

            <div>
              <strong>Reward Milestones</strong>
              <small>Unlock new achievements</small>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => scrollToSection('xp-catcher')}
          >
            <Play size={16} fill="currentColor" />
            Play Game
            <ArrowUpRight size={16} />
          </button>

          <button
            type="button"
            className={styles.secondaryButton}
            onClick={() => scrollToSection('watch-ads')}
          >
            Explore Ads
            <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      {/* Right Gaming Illustration */}
      <div className={styles.visual}>
        <div className={`${styles.orbit} ${styles.orbitOne}`} />
        <div className={`${styles.orbit} ${styles.orbitTwo}`} />

        <div className={styles.gameScreen}>
          <div className={styles.screenTop}>
            <div className={styles.windowDots}>
              <span />
              <span />
              <span />
            </div>

            <small>VELOOP ARCADE</small>
          </div>

          <div className={styles.gameIcon}>
            <Gamepad2 size={65} strokeWidth={1.5} />
          </div>

          <div className={styles.screenBottom}>
            <span>XP CHALLENGE</span>
            <strong>READY TO PLAY?</strong>
          </div>
        </div>

        {/* Floating Coins */}
        <div className={`${styles.coin} ${styles.coinOne}`}>
          <Coins size={25} />
        </div>

        <div className={`${styles.coin} ${styles.coinTwo}`}>
          XP
        </div>

        {/* Floating Labels */}
        <div className={styles.rewardTag}>
          <Gift size={16} />
          <span>Unlock Rewards</span>
        </div>

        <div className={styles.floatingStat}>
          <Target size={16} />
          <span>New challenges await</span>
        </div>
      </div>

      {/* Bottom Information */}
      <div className={styles.bottomNote}>
        <Clock3 size={15} />

        <span>
          New activities and demo reward opportunities
          are added to your journey.
        </span>
      </div>
    </section>
  );
}

export default GameRewardsSpotlight;
