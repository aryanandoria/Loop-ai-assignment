const express = require('express');
const app = express();
const port = 5000;
const { addIngestionRequest, getIngestionStatus } = require('./queue');
const { startProcessor } = require('./processor');
app.use(express.json());

app.post('/ingest', (req, res) => {
  const { ids, priority } = req.body;
  if (!Array.isArray(ids) || !priority) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const ingestion_id = addIngestionRequest(ids, priority);
  res.json({ ingestion_id });
});


app.get('/status/:ingestion_id', (req, res) => {
  const ingestion = getIngestionStatus(req.params.ingestion_id);
  if (!ingestion) {
    return res.status(404).json({ error: 'Ingestion ID not found' });
  }
  res.json(ingestion);
});

startProcessor();


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
