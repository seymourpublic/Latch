const app = require('./app');
const port = process.env.PORT || 3007;

app.listen(port, () => {
  console.log(`Notification service running on port ${port}`);
});
