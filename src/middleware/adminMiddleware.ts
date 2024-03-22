import { Request, Response, NextFunction } from "express";

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
    // Cambia 'rol' por 'role' para que coincida con tu payload del token
    if (req.user && req.user.role === "admin") {
        console.log('Access granted for admin.');
        next(); // El usuario es admin, se procede a la siguiente función middleware/ruta
    } else {
        // Cambia 'rol' por 'role' aquí también
        console.log(`Access denied. User role: ${req.user ? req.user.role : 'undefined'}`);
        res.status(403).json({
            message: "Access denied. Requires admin role."
        });
    }
};

export default isAdmin;
