const { v4: uuidv4 } = require('uuid');
const store = require('./store');
const { getPriorityValue } = require('./utils');

function addIngestionRequest(ids, priority) {
  const ingestion_id = uuidv4();
  const timestamp = Date.now();
  const priorityValue = getPriorityValue(priority);

  const batches = [];
  for (let i = 0; i < ids.length; i += 3) {
    const batch_ids = ids.slice(i, i + 3);
    const batch = {
      batch_id: uuidv4(),
      ids: batch_ids,
      status: 'yet_to_start',
      ingestion_id,
      priority,
      timestamp
    };
    batches.push(batch);
    store.queue.push({ priorityValue, timestamp, batch });
  }

  store.ingestionRequests[ingestion_id] = {
    ingestion_id,
    status: 'yet_to_start',
    batches
  };

  return ingestion_id;
}

function getIngestionStatus(ingestion_id) {
  return store.ingestionRequests[ingestion_id];
}

module.exports = { addIngestionRequest, getIngestionStatus };
