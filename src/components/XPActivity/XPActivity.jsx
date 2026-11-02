
import {
  Zap,
  Gift,
  Trophy,
  Gamepad2,
  Clock3,
  CalendarCheck,
  PlayCircle,
} from 'lucide-react';

import styles from './XPActivity.module.css';

function XPActivity({ activities = [] }) {
  const getIcon = (type) => {
    switch (type) {
      case 'gift':
        return Gift;

      case 'level':
        return Trophy;

      case 'login':
        return CalendarCheck;

      case 'ad':
        return PlayCircle;

      case 'game':
      default:
        return Gamepad2;
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Recently';

    const date = new Date(timestamp);

    if (Number.isNaN(date.getTime())) return 'Recently';

    return date.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className={styles.activitySection}>
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>YOUR JOURNEY</p>

          <h2>Recent XP Activity</h2>

          <p className={styles.subtitle}>
            Keep track of your XP earnings and achievements.
          </p>
        </div>

        <div className={styles.headingIcon}>
          <Zap size={25} />
        </div>
      </div>

      {activities.length > 0 ? (
        <div className={styles.activityList}>
          {activities.slice(0, 10).map((activity) => {
            const Icon = getIcon(activity.type);

            return (
              <div
                className={styles.activityItem}
                key={activity.id}
              >
                <div className={styles.activityIcon}>
                  <Icon size={21} />
                </div>

                <div className={styles.activityInfo}>
                  <strong>{activity.title}</strong>

                  <span>{activity.description}</span>

                  <small>
                    <Clock3 size={12} />
                    {formatDate(activity.timestamp)}
                  </small>
                </div>

                <strong className={styles.xpValue}>
                  +{Number(activity.xp || 0).toLocaleString('en-IN')} XP
                </strong>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <Zap size={27} />
          </div>

          <strong>No XP activity yet</strong>

          <p>
            Claim your daily login reward or watch an ad to see your activity here.
          </p>
        </div>
      )}
    </section>
  );
}

export default XPActivity;
