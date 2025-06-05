const store = require('./store');

function startProcessor() {
  setInterval(() => {
    if (store.queue.length === 0) return;

    // Sort by priority and timestamp
    store.queue.sort((a, b) => {
      if (a.priorityValue !== b.priorityValue) return a.priorityValue - b.priorityValue;
      return a.timestamp - b.timestamp;
    });

    const job = store.queue.shift();
    const batch = job.batch;

    // Update status to triggered
    batch.status = 'triggered';
    updateOverallStatus(batch.ingestion_id);

    // Simulate API processing (1 sec per ID)
    let totalTime = batch.ids.length * 1000;

    setTimeout(() => {
      batch.status = 'completed';
      updateOverallStatus(batch.ingestion_id);
    }, totalTime);
  }, 5000); // Process one batch every 5 seconds
}

function updateOverallStatus(ingestion_id) {
  const ingestion = store.ingestionRequests[ingestion_id];
  if (!ingestion) return;
  ingestion.status = require('./utils').calculateOverallStatus(ingestion.batches);
}

module.exports = { startProcessor };
