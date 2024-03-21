import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateStudent1710543922807 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "students",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                    },
                    {
                        name: "level",
                        type: "enum",
                        enum: ["beginner", "medium", "advanced"],
                        default: "'beginner'", // Los valores por defecto de los enums deben estar entre comillas simples
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE", // Asegura que si se elimina un User, el Student relacionado también se elimine.
                    }
                ]
            }),
            true // Indica si debe crear la tabla de nuevo si ya existe.
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("students");
    }
}
