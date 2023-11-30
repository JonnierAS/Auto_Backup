const { CronJob } = require('cron');
const { exec } = require('child_process');
require('dotenv').config();
console.log('Before job instantiation');

const { DB, HOST, PORT, USER } = process.env;

const job = new CronJob('9 8,11 * * *', function () {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 5);

    const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC'
    }).replace(/[\/\,\:\s]/g, "_");

    console.log('Every 270 minutes between 9-17:', formattedDate);

    const command = `cmd /c start /min C:\\Program" "Files\\PostgreSQL\\15\\bin\\pg_dump --host ${HOST} --port ${PORT} --username ${USER} --format custom --file "C:\\Users\\USUARIO\\Desktop\\Respaldos_BD\\pruebaGeo_${formattedDate}.sql" ${DB}`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup script: ${error}`);
            console.error(`Error details: ${stderr}`);
            return;
        }
        console.log(`Backup script output: ${stdout}`);
        console.log(`Backup script errors: ${stderr}`);
    });
});

console.log('After job instantiation');
job.start();