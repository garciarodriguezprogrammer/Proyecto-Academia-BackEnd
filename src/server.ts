import app from "./app";
import AppDataSource from "./database/data-source";
const port = process.env.PORT || 5000;

(async () => {
    try {
       await AppDataSource.initialize();
       console.log("====================================");
       console.log("🛢️  Data Source has been initialized!");
 
       app.listen(port, () => {
          console.log(`🚀 Server running on port ${port}`);
          console.log("====================================");
       });
    } catch (error) {
       console.error("⛔ Error during Data Source initialization", error);
    }
 })();



