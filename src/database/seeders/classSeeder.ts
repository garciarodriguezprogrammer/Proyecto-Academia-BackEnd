import { Clase } from "../../models/class";
import { Teacher } from "../../models/teacher";
import AppDataSource from "../data-source";

const classData = [
    { dance: "Salsa", day: "Monday", startTime: "18:00", endTime: "19:00", teacherId: 1 },
    { dance: "Bachata", day: "Tuesday", startTime: "20:00", endTime: "21:00", teacherId: 2 },
    // Añade más clases según sea necesario
];

AppDataSource.initialize()
    .then(async () => {
        const classRepository = AppDataSource.getRepository(Clase);
        const teacherRepository = AppDataSource.getRepository(Teacher);

        const classes = await Promise.all(classData.map(async data => {
            const teacher = await teacherRepository.findOneBy({ id: data.teacherId });
            console.log(`Profesor con ID ${data.teacherId}:`, teacher);

            if (teacher) {
                const { teacherId, ...classInfo } = data; // Desestructuración para excluir teacherId
                return classRepository.create({ ...classInfo, teacher });
            }
            return null;
        }));

        const validClasses = classes.filter(clase => clase !== null) as Clase[]; // Filtrar clases nulas y asegurar el tipo
        console.log(validClasses);
        if (validClasses.length > 0) {
            await classRepository.save(validClasses);
            console.log("Seeders de clases ejecutados");
        } else {
            console.log("No se crearon clases debido a la falta de profesores correspondientes.");
        }
    })
    .catch(error => console.log('Error ejecutando seeders de clases: ' + error));
