const store = require('./store');

function startProcessor() {
  setInterval(() => {
    if (store.queue.length === 0) return;


    store.queue.sort((a, b) => {
      if (a.priorityValue !== b.priorityValue) return a.priorityValue - b.priorityValue;
      return a.timestamp - b.timestamp;
    });

    const job = store.queue.shift();
    const batch = job.batch;


    batch.status = 'triggered';
    updateOverallStatus(batch.ingestion_id);


    let totalTime = batch.ids.length * 1000;

    setTimeout(() => {
      batch.status = 'completed';
      updateOverallStatus(batch.ingestion_id);
    }, totalTime);
  }, 5000); 
}

function updateOverallStatus(ingestion_id) {
  const ingestion = store.ingestionRequests[ingestion_id];
  if (!ingestion) return;
  ingestion.status = require('./utils').calculateOverallStatus(ingestion.batches);
}

module.exports = { startProcessor };
