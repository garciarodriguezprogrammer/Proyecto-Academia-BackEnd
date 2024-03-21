import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateInscription1711052273261 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "inscriptions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "student_id",
                        type: "int",
                    },
                    {
                        name: "class_id",
                        type: "int",
                    }
                ],
                foreignKeys: [
                    {
                        columnNames: ["student_id"],
                        referencedTableName: "students",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["class_id"],
                        referencedTableName: "classes",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("inscriptions");
    }

}