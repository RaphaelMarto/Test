const express = require("express")
const app = express()
const cors = require('cors')
const PORT = 3001

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json({ message: "ok" });
  });

// Routers
const PlatRouter = require('./routes/Plat')
app.use("/plat", PlatRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });

app.listen(PORT, () => {
    console.log(`app listening at http://localhost:${PORT}`);
});

module.exports = app;