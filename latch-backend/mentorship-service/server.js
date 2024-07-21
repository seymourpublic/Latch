const app = require('./app');
const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`Mentorship service running on port ${port}`);
});
