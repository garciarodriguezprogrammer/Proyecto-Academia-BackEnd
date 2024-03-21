import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateClass1710856661807 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "classes",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "dance",
                        type: "varchar",
                        length: "100",
                    },
                    {
                        name: "day",
                        type: "varchar",
                    },
                    {
                        name: "startTime",
                        type: "time",
                    },
                    {
                        name: "endTime",
                        type: "time",
                    },
                    {
                        name: "teacher_id",
                        type: "int",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["teacher_id"],
                        referencedTableName: "teachers",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE", // Asumiendo que quieras desvincular las clases si se elimina un profesor, sino podrías usar "CASCADE"
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("classes");
    }
}
