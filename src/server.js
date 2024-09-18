import app from "./app.js";

// port
const PORT = process.env.PORT || 8000;
const hostname = "0.0.0.0";

app.listen(PORT, hostname, () => console.log("Server is running"));
