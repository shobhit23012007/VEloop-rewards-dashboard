
import { useEffect, useRef, useState } from 'react';

import {
  Gamepad2,
  Clock3,
  Trophy,
  RotateCcw,
  Play,
  Zap,
  Target,
  Bomb,
  Gift,
  Heart,
  ArrowRight,
} from 'lucide-react';

import styles from './XPCatcher.module.css';

const GAME_DURATION = 30;
const MAX_LIVES = 3;

const SPAWN_INTERVAL = 700;
const MOVE_INTERVAL = 40;
const TOKEN_SPEED = 1.4;

const XP_REWARD = 5;
const GIFT_REWARD = 15;

function getRandomType() {
  const random = Math.random();

  if (random < 0.75) return 'xp';
  if (random < 0.90) return 'bomb';

  return 'gift';
}

function createToken(id) {
  return {
    id,
    type: getRandomType(),
    x: Math.floor(Math.random() * 84) + 8,
    y: -8,
  };
}

function XPCatcher({ onXPEarned, onActivity }) {
  const [gameState, setGameState] = useState('ready');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [bonusXP, setBonusXP] = useState(0);
  const [lives, setLives] = useState(MAX_LIVES);
  const [tokens, setTokens] = useState([]);
  const [lastEvent, setLastEvent] = useState('');

  const nextId = useRef(0);
  const claimedTokens = useRef(new Set());
  const livesRef = useRef(MAX_LIVES);
  const gameStateRef = useRef('ready');
  const rewardSubmittedRef = useRef(false);

  const scoreRef = useRef(0);
  const bonusXPRef = useRef(0);

  const earnedXP = score * XP_REWARD + bonusXP;

  const updateGameState = (nextState) => {
    gameStateRef.current = nextState;
    setGameState(nextState);
  };

  // Record an individual game activity
  const recordActivity = (activity) => {
    if (typeof onActivity !== 'function') return;

    onActivity({
      id: `${Date.now()}-${nextId.current}`,
      ...activity,
      timestamp: new Date().toISOString(),
    });
  };

  // Finish game and submit total XP only once
  const finishGame = () => {
    if (gameStateRef.current !== 'playing') return;

    updateGameState('finished');

    if (rewardSubmittedRef.current) return;

    rewardSubmittedRef.current = true;

    const totalXP =
      scoreRef.current * XP_REWARD + bonusXPRef.current;

    if (totalXP > 0 && typeof onXPEarned === 'function') {
      onXPEarned(totalXP);
    }
  };

  // Countdown timer
  useEffect(() => {
    if (gameState !== 'playing') return;

    if (timeLeft <= 0) {
      finishGame();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState, timeLeft]);

  // Spawn and move tokens
  useEffect(() => {
    if (gameState !== 'playing') return;

    const spawnTimer = setInterval(() => {
      setTokens((previous) => {
        if (previous.length >= 12) return previous;

        return [
          ...previous,
          createToken(nextId.current++),
        ];
      });
    }, SPAWN_INTERVAL);

    const movementTimer = setInterval(() => {
      setTokens((previous) =>
        previous
          .map((token) => ({
            ...token,
            y: token.y + TOKEN_SPEED,
          }))
          .filter((token) => token.y < 108)
      );
    }, MOVE_INTERVAL);

    return () => {
      clearInterval(spawnTimer);
      clearInterval(movementTimer);
    };
  }, [gameState]);

  // Start or restart game
  const startGame = () => {
    nextId.current = 0;
    claimedTokens.current.clear();

    livesRef.current = MAX_LIVES;
    scoreRef.current = 0;
    bonusXPRef.current = 0;

    rewardSubmittedRef.current = false;

    setTimeLeft(GAME_DURATION);
    setScore(0);
    setBonusXP(0);
    setLives(MAX_LIVES);
    setTokens([]);
    setLastEvent('');

    updateGameState('playing');
  };

  // Catch a token
  const catchToken = (token) => {
    if (gameStateRef.current !== 'playing') return;

    if (claimedTokens.current.has(token.id)) return;

    claimedTokens.current.add(token.id);

    setTokens((previous) =>
      previous.filter((item) => item.id !== token.id)
    );

    if (token.type === 'xp') {
      scoreRef.current += 1;

      setScore(scoreRef.current);

      setLastEvent(`+${XP_REWARD} XP · Nice catch!`);

      recordActivity({
        type: 'game',
        title: 'XP Catcher',
        description: 'XP token collected',
        xp: XP_REWARD,
      });

      return;
    }

    if (token.type === 'gift') {
      bonusXPRef.current += GIFT_REWARD;

      setBonusXP(bonusXPRef.current);

      setLastEvent(`Mystery Gift! +${GIFT_REWARD} bonus XP`);

      recordActivity({
        type: 'gift',
        title: 'Mystery Gift',
        description: 'Bonus XP collected in XP Catcher',
        xp: GIFT_REWARD,
      });

      return;
    }

    if (token.type === 'bomb') {
      const remainingLives = livesRef.current - 1;

      livesRef.current = remainingLives;
      setLives(remainingLives);

      if (remainingLives <= 0) {
        setLastEvent('All lives lost! Game over.');
        finishGame();
      } else {
        setLastEvent(
          `Bomb hit! ${remainingLives} lives remaining.`
        );
      }
    }
  };

  // Reset game
  const resetGame = () => {
    nextId.current = 0;
    claimedTokens.current.clear();

    livesRef.current = MAX_LIVES;
    scoreRef.current = 0;
    bonusXPRef.current = 0;

    rewardSubmittedRef.current = false;

    setTimeLeft(GAME_DURATION);
    setScore(0);
    setBonusXP(0);
    setLives(MAX_LIVES);
    setTokens([]);
    setLastEvent('');

    updateGameState('ready');
  };

  const getTokenIcon = (type) => {
    if (type === 'bomb') return Bomb;
    if (type === 'gift') return Gift;

    return Zap;
  };

  return (
    <section id="xp-catcher" className={styles.gameSection}>

      {/* Header */}
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>SKILL-BASED MINI GAME</p>

          <h2>XP Catcher</h2>

          <p className={styles.subtitle}>
            Catch falling XP tokens, avoid bombs and grab mystery gifts!
          </p>
        </div>

        <div className={styles.headingIcon}>
          <Gamepad2 size={26} />
        </div>
      </div>

      {/* Statistics */}
      <div className={styles.gameStats}>
        <div className={styles.statCard}>
          <span>
            <Clock3 size={15} /> TIME LEFT
          </span>
          <strong>{timeLeft}s</strong>
        </div>

        <div className={styles.statCard}>
          <span>
            <Target size={15} /> XP TOKENS
          </span>
          <strong>{score}</strong>
        </div>

        <div className={styles.statCard}>
          <span>
            <Zap size={15} /> GAME XP
          </span>
          <strong>{earnedXP}</strong>
        </div>

        <div className={styles.statCard}>
          <span>
            <Heart size={15} /> LIVES
          </span>
          <strong>{lives}/{MAX_LIVES}</strong>
        </div>
      </div>

      {/* Token Legend */}
      <div className={styles.gameLegend}>
        <span><Zap size={16} /> +5 XP</span>
        <span><Bomb size={16} /> -1 Life</span>
        <span><Gift size={16} /> +15 Bonus XP</span>
      </div>

      {/* Game Area */}
      <div className={styles.gameArea}>

        {/* Ready Screen */}
        {gameState === 'ready' && (
          <div className={styles.overlay}>
            <div className={styles.overlayIcon}>
              <Gamepad2 size={32} />
            </div>

            <h3>Ready for the challenge?</h3>

            <p>
              Multiple tokens fall continuously. Catch XP and gifts,
              but avoid bombs!
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={startGame}
            >
              <Play size={17} fill="currentColor" />
              Start Game
            </button>
          </div>
        )}

        {/* Playing Screen */}
        {gameState === 'playing' && (
          <>
            <div className={styles.playingInfo}>
              <span>Catch XP · Avoid bombs · Find gifts</span>
              <span>{timeLeft} seconds remaining</span>
            </div>

            {tokens.map((token) => {
              const Icon = getTokenIcon(token.type);

              return (
                <button
                  key={token.id}
                  type="button"
                  className={`${styles.token} ${
                    token.type === 'bomb'
                      ? styles.bombToken
                      : token.type === 'gift'
                        ? styles.surpriseToken
                        : styles.xpToken
                  }`}
                  style={{
                    left: `${token.x}%`,
                    top: `${token.y}%`,
                  }}
                  onClick={() => catchToken(token)}
                  aria-label={`Catch ${token.type}`}
                >
                  <Icon size={25} />
                </button>
              );
            })}

            {lastEvent && (
              <div
                className={styles.gameMessage}
                aria-live="polite"
              >
                {lastEvent}
              </div>
            )}
          </>
        )}

        {/* Result Screen */}
        {gameState === 'finished' && (
          <div className={styles.overlay}>
            <div className={styles.overlayIcon}>
              <Trophy size={32} />
            </div>

            <h3>
              {lives === 0 ? 'Game Over!' : 'Game Completed!'}
            </h3>

            <p>
              You caught <strong>{score}</strong> XP tokens,
              collected <strong>{bonusXP}</strong> bonus XP
              and scored <strong>{earnedXP} demo XP</strong>.
            </p>

            <button
              type="button"
              className={styles.primaryButton}
              onClick={startGame}
            >
              <RotateCcw size={17} />
              Play Again
            </button>
          </div>
        )}
      </div>

      {/* How to Play */}
      <div className={styles.gameRules}>

        <div className={styles.rulesHeading}>
          <div>
            <span className={styles.rulesEyebrow}>GAME GUIDE</span>

            <h3>How to Play</h3>

            <p>Follow these simple steps to earn XP.</p>
          </div>

          <button
            type="button"
            className={styles.resetButton}
            onClick={resetGame}
          >
            <RotateCcw size={15} />
            Reset
          </button>
        </div>

        {/* Three Steps */}
        <div className={styles.rulesSteps}>

          <div className={styles.ruleStep}>
            <div className={`${styles.ruleNumber} ${styles.purple}`}>
              1
            </div>

            <div className={styles.ruleContent}>
              <strong>Catch XP Tokens</strong>
              <p>
                Catch golden tokens and earn +5 XP for each one.
              </p>
            </div>
          </div>

          <ArrowRight className={styles.ruleArrow} size={20} />

          <div className={styles.ruleStep}>
            <div className={`${styles.ruleNumber} ${styles.gold}`}>
              2
            </div>

            <div className={styles.ruleContent}>
              <strong>Avoid Bombs</strong>
              <p>
                Stay away from bombs. Every hit costs one life.
              </p>
            </div>
          </div>

          <ArrowRight className={styles.ruleArrow} size={20} />

          <div className={styles.ruleStep}>
            <div className={`${styles.ruleNumber} ${styles.green}`}>
              3
            </div>

            <div className={styles.ruleContent}>
              <strong>Collect Rewards</strong>
              <p>
                Catch mystery gifts to earn +15 bonus XP.
              </p>
            </div>
          </div>

        </div>

        {/* Game Information */}
        <div className={styles.rulesBottom}>
          <span><Clock3 size={13} /> 30 Seconds</span>
          <span><Heart size={13} /> 3 Lives</span>
          <span><Zap size={13} /> 700ms Token Spawn</span>
          <span><CheckCircleIcon /> Missed Tokens = No Penalty</span>
        </div>

      </div>

      {/* Disclaimer */}
      <p className={styles.disclaimer}>
        Demo game only · Scores and rewards are illustrative and do not
        update your actual VELOOP XP balance until the game finishes.
      </p>

    </section>
  );
}

function CheckCircleIcon() {
  return <Target size={13} />;
}

export default XPCatcher;
