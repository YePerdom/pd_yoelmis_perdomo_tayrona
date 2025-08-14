import "dotenv/config";
import app from "./services/app.js";
import { pool } from "./config/db.js";

const PORT = process.env.PORT || 3000;

try {
    app.listen(PORT, () => {
    console.log(`servidor corriendo en http://localhost:${PORT}`);
});
} catch (error) {
   console.error(error);
}