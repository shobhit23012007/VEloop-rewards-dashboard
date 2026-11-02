
export const dashboardData = {
  member: {
    name: 'Shobhit',
    initials: 'ST',
    membership: 'Rewards Member',
  },

  // Fresh starting configuration
  currentXP: 0,
  currentLevel: 1,

  nextReward: {
    title: 'Explorer Badge',
    unlockLevel: 2,
    description: 'Unlock your reward at Level 02.',
  },

  levels: [
    {
      level: 1,
      name: 'Starter',
      requiredXP: 0,
      reward: 'Welcome Badge',
    },
    {
      level: 2,
      name: 'Explorer',
      requiredXP: 1000,
      reward: 'Explorer Badge',
    },
    {
      level: 3,
      name: 'Achiever',
      requiredXP: 3000,
      reward: 'Achiever Badge',
    },
    {
      level: 4,
      name: 'Rising Achiever',
      requiredXP: 5000,
      reward: 'Rising Badge',
    },
    {
      level: 5,
      name: 'Elite Member',
      requiredXP: 8000,
      reward: '500 VEs',
    },
    {
      level: 6,
      name: 'Master',
      requiredXP: 12000,
      reward: 'Master Badge',
    },
  ],
};
