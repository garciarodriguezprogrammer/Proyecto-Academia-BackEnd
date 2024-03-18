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
                        name: "idStudent",
                        type: "int"
                    },
                    {
                        name: "level",
                        type: "enum",
                        enum: ["beginner", "medium", "advanced"]
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["idStudent"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]

            }),   //he añadido esta coma
            true  //he añadido este true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
