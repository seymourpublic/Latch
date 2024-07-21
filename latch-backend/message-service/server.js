const app = require('./app');
const port = process.env.PORT || 3006;

app.listen(port, () => {
  console.log(`Message service running on port ${port}`);
});
