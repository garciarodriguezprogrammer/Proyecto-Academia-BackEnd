import { Teacher } from "../../models/teacher";
import { User } from "../../models/user";
import AppDataSource from "../data-source";

AppDataSource.initialize()
  .then(async () => {
    const teacherRepository = AppDataSource.getRepository(Teacher);
    const userRepository = AppDataSource.getRepository(User);

    // Asegúrate de que existan usuarios para estos profesores
    const user3 = await userRepository.findOneBy({ id: 5 });
    const user4 = await userRepository.findOneBy({ id: 6 });

    // Para los profesores
    const teachersData = [
      user3 ? { user: user3 } : null,
      user4 ? { user: user4 } : null,
    ].filter((data): data is { user: User } => data !== null);

    const teachers = teacherRepository.create(teachersData); // Crea instancias de profesores
    await teacherRepository.save(teachers); // Guarda los profesores en la base de datos
    console.log("Seeders de profesores ejecutados");
  })
  .catch((error) =>
    console.log("Error ejecutando seeders de profesores: " + error)
  );
