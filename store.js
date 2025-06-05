// In-memory store
const store = {
  ingestionRequests: {}, // { ingestion_id: { status, batches: [] } }
  queue: [] // [{ priorityValue, timestamp, batch }]
};

module.exports = store;
