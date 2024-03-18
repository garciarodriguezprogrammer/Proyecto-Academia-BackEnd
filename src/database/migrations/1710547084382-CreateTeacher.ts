import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTeacher1710547084382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "teachers",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "idTeacher",
                        type: "int"
                    }
                ],
                foreignKeys:[
                    {
                        columnNames:["idTeacher"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE"
                    }
                ]
            }), //la coma la he añadido
          true  //este true lo he añadido
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
