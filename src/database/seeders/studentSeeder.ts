import { Student, Level } from "../../models/student";
import { User } from "../../models/user";
import { AppDataSource } from "../data-source";

AppDataSource.initialize()
  .then(async () => {
    const studentRepository = AppDataSource.getRepository(Student);
    const userRepository = AppDataSource.getRepository(User);

    // Asegúrate de que existan usuarios para estos estudiantes
    const user1 = await userRepository.findOneBy({ id: 3 });
    const user2 = await userRepository.findOneBy({ id: 4 });

    // Para los estudiantes
    const studentsData = [
      user1 ? { user: user1, level: Level.beginner } : null,
      user2 ? { user: user2, level: Level.advanced } : null,
    ].filter((data): data is { user: User; level: Level } => data !== null);

    const students = studentRepository.create(studentsData); // Crea instancias de estudiantes
    await studentRepository.save(students); // Guarda los estudiantes en la base de datos
    console.log("Seeders de estudiantes ejecutados");
  })
  .catch((error) =>
    console.log("Error ejecutando seeders de estudiantes: " + error)
  );
