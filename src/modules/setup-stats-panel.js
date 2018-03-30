define([], () => {
  // Setup the stats panel, so that it's ready to show data when debug mode is turned on.
  // Note: this code must only be called once, not multiple times, otherwise the stats won't build up.
  const setupStatsPanel = () => {
    const stats = new Stats();
    stats.showPanel(false);
    document.body.appendChild(stats.dom);

    // todo: when a key is pressed, 

    const toggleStats = (e) => {
      stats.showPanel(0);
    };

    document.addEventListener('toggle-stats', toggleStats);

    return stats;
  }

  return setupStatsPanel;
});
