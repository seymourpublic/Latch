const app = require('./app');
const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`Job service running on port ${port}`);
});
