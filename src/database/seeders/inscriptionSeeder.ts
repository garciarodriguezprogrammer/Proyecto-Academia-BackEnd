import { Inscripcion } from "../../models/inscription";
import { Student } from "../../models/student";
import { Clase } from "../../models/class";
import AppDataSource from "../data-source";

const inscriptionData = [
    { studentId: 1, claseId: 1 },
    { studentId: 2, claseId: 1 },
    // Añade más inscripciones según sea necesario
];

AppDataSource.initialize()
    .then(async () => {
        const inscriptionRepository = AppDataSource.getRepository(Inscripcion);
        const studentRepository = AppDataSource.getRepository(Student);
        const claseRepository = AppDataSource.getRepository(Clase);

        const inscriptions = await Promise.all(inscriptionData.map(async data => {
            const student = await studentRepository.findOneBy({ id: data.studentId });
            const clase = await claseRepository.findOneBy({ id: data.claseId });
            if (student && clase) {
                // Crea y retorna una nueva inscripción solo si se encontraron tanto el estudiante como la clase
                return inscriptionRepository.create({ student, clase });
            }
            return null;
        }));

        // Filtrar cualquier inscripción nula y asegurar el tipo
        const validInscriptions = inscriptions.filter(inscription => inscription !== null) as Inscripcion[];

        if (validInscriptions.length > 0) {
            await inscriptionRepository.save(validInscriptions);
            console.log("Seeders de inscripciones ejecutados");
        } else {
            console.log("No se crearon inscripciones debido a la falta de estudiantes o clases correspondientes.");
        }
    })
    .catch(error => console.log('Error ejecutando seeders de inscripciones: ' + error));
