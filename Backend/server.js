import app from "./src/app/app.js";
import { config } from "./src/config/config.js";


app.listen(config.PORT , "0.0.0.0", () => {
    console.log("Server is running at PORT: ", config.PORT);
});