#Para iniciar node
npm init -y
npm install
#Instalar typeorm
npm install typeorm mysql reflect-metadata
#Para instalar express
npm install express
#Para instalar ts-node
npm install ts-node
#Para instalar typescript y que me lo añada a las dependencias del proyecto
npm install typescript --save-dev
#Instalar tsconfig.json
npx tsc --init

# Así creo las migraciones
npx typeorm migration:create ./src/database/migrations/CreateUser
npx typeorm migration:create ./src/database/migrations/CreateStudent
npx typeorm migration:create ./src/database/migrations/CreateTeacher
npx typeorm migration:create ./src/database/migrations/CreateClass
npx typeorm migration:create ./src/database/migrations/CreateInscription

# Ejecutar migraciones para crear las tablas
npx typeorm-ts-node-commonjs migration:run -d ./src/database/data-source.ts

# Revertir migraciones para desarrollo y produccion 
npx typeorm-ts-node-commonjs migration:revert -d ./src/data-source.ts

# Ejecución de seeders
npx ts-node src/database/seeders/userSeeder.ts
npx ts-node src/database/seeders/classSeeder.ts
npx ts-node src/database/seeders/inscriptionSeeder.ts
npx ts-node src/database/seeders/studentSeeder.ts
npx ts-node src/database/seeders/teacherSeeder.ts