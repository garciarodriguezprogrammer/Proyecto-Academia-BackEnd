import app from "./app";
import AppDataSource from "./database/data-source";
const port = process.env.PORT || 5000;

(async () => {
    try {
       await AppDataSource.initialize();
       console.log("---------------------------------------");
       console.log("Base de Datos Iniciada🛢️");
 
       app.listen(port, () => {
         console.log(`🚀 Servidor corriendo en el Puerto ${port}`);
         console.log("---------------------------------------");
       });
    } catch (error) {
       console.error("Error al inicializar la base de Datos⛔", error);
    }
 })();



