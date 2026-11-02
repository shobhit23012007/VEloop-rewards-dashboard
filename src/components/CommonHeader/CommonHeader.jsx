
import { useState } from 'react';

import {
  RefreshCw,
  Bell,
  Wallet,
  ChevronDown,
  UserRound,
  Trophy,
  History,
  Settings,
  X,
  Zap,
  CheckCircle2,
} from 'lucide-react';

import styles from './CommonHeader.module.css';

function CommonHeader({
  member = {},
  currentXP = 0,
  currentLevel = 1,
  activities = [],
}) {
  // Open notifications only when the user clicks the bell.
  const [activePanel, setActivePanel] = useState(null);
  const [notificationsRead, setNotificationsRead] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showResetSuccess, setShowResetSuccess] = useState(false);

  const initials = member.initials || 'VM';
  const name = member.name || 'VELOOP Member';
  const membership = member.membership || 'Rewards Member';

  const togglePanel = (panel) => {
    setActivePanel((previous) =>
      previous === panel ? null : panel
    );
  };

  const closePanel = () => setActivePanel(null);

  const handleRefresh = () => {
    setActivePanel(null);
    setShowResetConfirm(true);
  };

  const handleConfirmReset = () => {
    try {
      const keysToRemove = [
        'velop-current-xp-v2',
        'velop-current-level-v2',
        'velop-xp-activities-v2',
        'velop-unlocked-rewards-v2',
        'velop-current-xp',
        'velop-current-level',
        'velop-xp-activities',
        'velop-unlocked-rewards',
      ];

      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      setShowResetConfirm(false);
      setShowResetSuccess(true);

      window.setTimeout(() => {
        window.location.reload();
      }, 2500);
    } catch (error) {
      console.error('Dashboard reset failed:', error);
    }
  };

  const recentActivities = activities.slice(0, 4);

  return (
    <header className={styles.header}>
      {/* BRAND */}
      <div className={styles.brandArea}>
        <div className={styles.brandIcon}>
          <Trophy size={23} />
        </div>

        <div className={styles.brandText}>
          <strong>VELOOP</strong>
          <span>REWARDS</span>
        </div>
      </div>

      {/* HEADER ACTIONS */}
      <div className={styles.headerActions}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={handleRefresh}
          aria-label="Reset dashboard"
          title="Reset dashboard"
        >
          <RefreshCw size={19} />
        </button>

        <button
          type="button"
          className={`${styles.iconButton} ${
            activePanel === 'notifications'
              ? styles.activeButton
              : ''
          }`}
          onClick={() => togglePanel('notifications')}
          aria-label="Notifications"
          aria-expanded={activePanel === 'notifications'}
        >
          <Bell size={19} />

          {!notificationsRead && (
            <span className={styles.notificationDot} />
          )}
        </button>

        <button
          type="button"
          className={`${styles.walletButton} ${
            activePanel === 'wallet'
              ? styles.activeWallet
              : ''
          }`}
          onClick={() => togglePanel('wallet')}
          aria-expanded={activePanel === 'wallet'}
        >
          <span className={styles.walletIcon}>
            <Wallet size={17} />
          </span>

          <span className={styles.walletBalance}>
            {Number(currentXP).toLocaleString('en-IN')} XP
          </span>

          <ChevronDown
            size={16}
            className={
              activePanel === 'wallet' ? styles.rotated : ''
            }
          />
        </button>

        <button
          type="button"
          className={`${styles.avatarButton} ${
            activePanel === 'profile'
              ? styles.activeAvatar
              : ''
          }`}
          onClick={() => togglePanel('profile')}
          aria-label="Open profile menu"
          aria-expanded={activePanel === 'profile'}
        >
          {initials}
        </button>
      </div>

      {/* DROPDOWN PANELS */}
      {activePanel && (
        <>
          <button
            type="button"
            className={styles.dismissLayer}
            onClick={closePanel}
            aria-label="Close menu"
          />

          <section className={styles.dropdown}>
            <div className={styles.dropdownHeader}>
              <div>
                <span className={styles.dropdownEyebrow}>
                  {activePanel === 'wallet'
                    ? 'YOUR REWARDS'
                    : activePanel === 'notifications'
                    ? 'LATEST UPDATES'
                    : 'ACCOUNT'}
                </span>

                <h3>
                  {activePanel === 'wallet'
                    ? 'XP Wallet'
                    : activePanel === 'notifications'
                    ? 'Notifications'
                    : 'Your Profile'}
                </h3>
              </div>

              {activePanel === 'notifications' && (
                <button
                  type="button"
                  className={styles.markReadButton}
                  onClick={() => setNotificationsRead(true)}
                  disabled={notificationsRead}
                >
                  {notificationsRead ? 'All read' : 'Mark all read'}
                </button>
              )}

              <button
                type="button"
                className={styles.closeButton}
                onClick={closePanel}
                aria-label="Close panel"
              >
                <X size={18} />
              </button>
            </div>

            {/* WALLET */}
            {activePanel === 'wallet' && (
              <div className={styles.walletPanel}>
                <div className={styles.balanceCard}>
                  <div className={styles.balanceLabel}>
                    <Wallet size={17} />
                    Available XP
                  </div>

                  <strong>
                    {Number(currentXP).toLocaleString('en-IN')}
                    <small> XP</small>
                  </strong>

                  <span>
                    Your earned experience points
                  </span>
                </div>

                <div className={styles.walletStats}>
                  <div>
                    <span>Current Level</span>
                    <strong>
                      {String(currentLevel).padStart(2, '0')}
                    </strong>
                  </div>

                  <div>
                    <span>Activities</span>
                    <strong>{activities.length}</strong>
                  </div>
                </div>

                <div className={styles.panelNote}>
                  <Zap size={17} />
                  <p>
                    Play games and complete activities to earn
                    more XP and unlock new levels.
                  </p>
                </div>

                <button
                  type="button"
                  className={styles.panelAction}
                  onClick={() => {
                    closePanel();

                    document
                      .getElementById('xp-activity')
                      ?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      });
                  }}
                >
                  View XP Activity
                  <History size={16} />
                </button>
              </div>
            )}

            {/* NOTIFICATIONS */}
            {activePanel === 'notifications' && (
              <div className={styles.notificationPanel}>
                <article
                  className={`${styles.welcomeNotification} ${
                    notificationsRead ? styles.notificationRead : ''
                  }`}
                >
                  <div className={styles.welcomeNotificationTop}>
                    <strong>Welcome to VELOOP Rewards! 🎉</strong>
                    <span>Just now</span>
                  </div>
                  <p>
                    Start watching sponsor ads today to collect your first
                    VEs and earn real cash.
                  </p>
                </article>

                {recentActivities.map((activity) => (
                  <div
                    className={styles.notificationItem}
                    key={activity.id}
                  >
                    <span className={styles.notificationIcon}>
                      <CheckCircle2 size={18} />
                    </span>

                    <div>
                      <strong>
                        {activity.title || 'XP Activity'}
                      </strong>

                      <p>
                        {activity.description || 'Activity completed'}
                      </p>

                      {Number(activity.xp) > 0 && (
                        <span className={styles.notificationXP}>
                          +{activity.xp} XP
                        </span>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            )}

            {/* PROFILE */}
            {activePanel === 'profile' && (
              <div className={styles.profilePanel}>
                <div className={styles.profileIdentity}>
                  <span className={styles.profileAvatar}>
                    {initials}
                  </span>

                  <div>
                    <strong>{name}</strong>
                    <span>{membership}</span>
                  </div>
                </div>

                <div className={styles.profileInfo}>
                  <div>
                    <UserRound size={17} />
                    <span>Member Profile</span>
                    <strong>Active</strong>
                  </div>

                  <div>
                    <Trophy size={17} />
                    <span>Current Level</span>
                    <strong>{currentLevel}</strong>
                  </div>

                  <div>
                    <Zap size={17} />
                    <span>Total XP</span>
                    <strong>
                      {Number(currentXP).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>

                <div className={styles.profileFooter}>
                  <Settings size={16} />
                  <span>Profile settings coming soon</span>
                </div>
              </div>
            )}
          </section>
        </>
      )}

      {/* RESET CONFIRMATION */}
      {showResetConfirm && (
        <div
          className={styles.resetBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowResetConfirm(false);
            }
          }}
        >
          <section
            className={styles.resetModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-title"
          >
            <div className={styles.resetIcon}>
              <RefreshCw size={28} />
            </div>

            <span className={styles.dropdownEyebrow}>
              RESET DASHBOARD
            </span>

            <h2 id="reset-title">Are you sure?</h2>

            <p>
              Resetting your dashboard will clear your current
              XP, level progress, recent activity and unlocked
              rewards from this browser.
            </p>

            <div className={styles.resetWarning}>
              <strong>XP will become 0</strong>
              <span>Your level will return to Level 01.</span>
            </div>

            <div className={styles.resetActions}>
              <button
                type="button"
                className={styles.cancelResetButton}
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>

              <button
                type="button"
                className={styles.confirmResetButton}
                onClick={handleConfirmReset}
              >
                <RefreshCw size={16} />
                Reset
              </button>
            </div>
          </section>
        </div>
      )}

      {/* RESET SUCCESS NOTIFICATION */}
      {showResetSuccess && (
        <div className={styles.successToast} role="status">
          <div className={styles.successIcon}>
            <CheckCircle2 size={25} />
          </div>

          <div className={styles.successContent}>
            <strong>XP Successfully Reset!</strong>

            <p>
              Your XP, level progress and recent activity
              have been reset to zero.
            </p>
          </div>

          <button
            type="button"
            className={styles.successClose}
            onClick={() => setShowResetSuccess(false)}
            aria-label="Close notification"
          >
            <X size={17} />
          </button>
        </div>
      )}
    </header>
  );
}

export default CommonHeader;
