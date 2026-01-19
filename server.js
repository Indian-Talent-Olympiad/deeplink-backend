const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

/**
 * Serve association files
 */
app.use('/.well-known', express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Deep link route
 */
app.get('/olympiad-result', (req, res) => {
  const query = req.originalUrl.split('?')[1] || '';

  res.setHeader('Content-Type', 'text/html');
  res.send(`
<!DOCTYPE html>
<html>
<head>
  <title>Opening Indian Talent Olympiad App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script>
    (function () {
      const query = "${query}";
      const ua = navigator.userAgent.toLowerCase();

      try {
        localStorage.setItem('deep_link', query);
      } catch (e) {}

      if (ua.includes('android')) {
        window.location.replace(
          'https://play.google.com/store/apps/details?id=com.ito.onlineexam.app'
        );
      } else if (ua.includes('iphone') || ua.includes('ipad')) {
        window.location.replace(
          'https://apps.apple.com/in/app/ito-indian-talent-olympiad/id6443736601'
        );
      }
        else {
  document.body.innerHTML =
    '<h2>Open this link on a mobile device</h2>';
}
    })();
  </script>
</head>
<body></body>
</html>
  `);
});

/**
 * Health check
 */
app.get('/', (_, res) => {
  res.send('ITO Deep Link Backend Running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
