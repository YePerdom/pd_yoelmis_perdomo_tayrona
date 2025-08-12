import "dotenv/config";
import app from "./services/app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});