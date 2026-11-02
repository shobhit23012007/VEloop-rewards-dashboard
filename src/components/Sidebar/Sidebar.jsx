import { useState } from 'react';

import {
  LayoutDashboard,
  Gamepad2,
  MonitorPlay,
  CalendarCheck,
  History,
  UserRound,
  Settings,
  CircleHelp,
  Trophy,
  ChevronRight,
  Menu,
  X,
  PanelLeftClose,
} from 'lucide-react';

import styles from './Sidebar.module.css';

const navigationItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    target: 'dashboard-top',
  },
  {
    label: 'Play Game',
    icon: Gamepad2,
    target: 'xp-catcher',
  },
  {
    label: 'Watch Ads',
    icon: MonitorPlay,
    target: 'watch-ads',
  },
  {
    label: 'Get Daily XP',
    icon: CalendarCheck,
    target: 'daily-xp',
  },
  {
    label: 'History',
    icon: History,
    target: 'xp-activity',
  },
];

function Sidebar({ collapsed = false, onToggle }) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Navigate to dashboard sections.
  const scrollToSection = (target, label) => {
    const element = document.getElementById(target);

    if (!element) {
      console.warn(`Sidebar target not found: ${target}`);
      return;
    }

    setActiveItem(label);
    setMobileOpen(false);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  // Mobile sidebar toggle.
  const toggleMobileSidebar = () => {
    setMobileOpen((previous) => !previous);
  };

  // Close mobile sidebar.
  const closeMobileSidebar = () => {
    setMobileOpen(false);
  };

  // Expand sidebar using Trophy logo.
  const handleBrandClick = () => {
    if (collapsed) {
      onToggle?.();
    }
  };

  // Account items have no navigation action yet.
  const handleAccountClick = (item) => {
    console.log(`${item} clicked`);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        className={styles.mobileToggle}
        onClick={toggleMobileSidebar}
        aria-label={mobileOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={mobileOpen}
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <button
          type="button"
          className={styles.mobileBackdrop}
          onClick={closeMobileSidebar}
          aria-label="Close navigation"
        />
      )}

      {/* Main Sidebar */}
      <aside
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.collapsed : ''}
          ${mobileOpen ? styles.sidebarOpen : ''}
        `}
      >
        {/* Brand */}
        <div className={styles.brand}>
          <button
            type="button"
            className={styles.brandIcon}
            onClick={handleBrandClick}
            disabled={!collapsed}
            title={collapsed ? 'Expand sidebar' : 'VELOOP Rewards'}
            aria-label={collapsed ? 'Expand sidebar' : 'VELOOP Rewards'}
          >
            <Trophy size={25} />
          </button>

          <div className={styles.brandText}>
            <strong>VELOOP</strong>
            <span>REWARDS</span>
          </div>

          {/* Desktop Collapse Button */}
          {!collapsed && (
            <button
              type="button"
              className={styles.collapseButton}
              onClick={onToggle}
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <PanelLeftClose size={19} />
            </button>
          )}
        </div>

        {/* Main Navigation */}
        <div className={styles.navSection}>
          <p className={styles.sectionLabel}>MAIN MENU</p>

          <nav className={styles.navigation}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.label;

              return (
                <button
                  key={item.label}
                  type="button"
                  title={collapsed ? item.label : undefined}
                  className={`
                    ${styles.navItem}
                    ${isActive ? styles.active : ''}
                  `}
                  onClick={() =>
                    scrollToSection(item.target, item.label)
                  }
                >
                  <Icon size={20} />

                  <span className={styles.navText}>
                    {item.label}
                  </span>

                  {isActive && (
                    <span className={styles.activeIndicator} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Account Section */}
        <div className={styles.bottomSection}>
          <p className={styles.sectionLabel}>ACCOUNT</p>

          {/* Profile */}
          <button
            type="button"
            className={`${styles.navItem} ${styles.accountItem}`}
            onClick={() => handleAccountClick('Profile')}
            title={collapsed ? 'Profile' : undefined}
          >
            <UserRound size={20} />

            <span className={styles.navText}>
              Profile
            </span>
          </button>

          {/* Settings */}
          <button
            type="button"
            className={`${styles.navItem} ${styles.accountItem}`}
            onClick={() => handleAccountClick('Settings')}
            title={collapsed ? 'Settings' : undefined}
          >
            <Settings size={20} />

            <span className={styles.navText}>
              Settings
            </span>
          </button>

          {/* Help & Support */}
          <button
            type="button"
            className={`${styles.navItem} ${styles.accountItem}`}
            onClick={() => handleAccountClick('Help & Support')}
            title={collapsed ? 'Help & Support' : undefined}
          >
            <CircleHelp size={20} />

            <span className={styles.navText}>
              Help &amp; Support
            </span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className={styles.sidebarFooter}>
          <div className={styles.footerIcon}>
            <Trophy size={18} />
          </div>

          <div className={styles.footerText}>
            <strong>Keep leveling up!</strong>

            <p>
              Every activity brings you closer to your next reward.
            </p>
          </div>

          <ChevronRight
            size={17}
            className={styles.footerArrow}
          />
        </div>
      </aside>
    </>
  );
}

export default Sidebar;