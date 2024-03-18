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