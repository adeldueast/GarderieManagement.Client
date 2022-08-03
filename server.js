let express = require("express");
let app = express();
app.use(express.static(__dirname + "/dist/garderie.client"));

app.get("/*", (req, res) => {
  res.sendFile(__dirname + "/dist/garderie.client/index.html");
});

app.listen(process.env.PORT || 8080);
