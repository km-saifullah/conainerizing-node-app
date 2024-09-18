import app from "./app.js";

// port
const PORT = process.env.PORT || 8000;
const hostname = "127.0.0.10";

app.listen(PORT, hostname, () => console.log("Server is running"));
