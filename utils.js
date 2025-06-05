const PRIORITY_MAP = { HIGH: 1, MEDIUM: 2, LOW: 3 };

function getPriorityValue(priority) {
  return PRIORITY_MAP[priority] || 4;
}

function calculateOverallStatus(batches) {
  const statuses = batches.map(b => b.status);
  if (statuses.every(s => s === 'yet_to_start')) return 'yet_to_start';
  if (statuses.every(s => s === 'completed')) return 'completed';
  return 'triggered';
}

module.exports = {
  getPriorityValue,
  calculateOverallStatus
};
