// const{ CronJob } = require('cron');


// console.log('Before job instantiation');
// const job = new CronJob('0 */1 14-22 * * *', function () {
// 	const d = new Date();
//     d.setHours(d.getHours() - 5)
// 	console.log('Every 30 minutes between 9-17:', d);
// });
// console.log('After job instantiation');
// job.start();
const { CronJob } = require('cron');
const { exec } = require('child_process');

console.log('Before job instantiation');

const job = new CronJob('0 */1 14-22 * * *', function () {
    const d = new Date();
    d.setHours(d.getHours() - 5);
    console.log('Every 30 minutes between 9-17:', d);
    const fecha = d.toString();
    console.log(typeof(fecha));
    exec(`cmd /c start /min C:\\Program" "Files\\PostgreSQL\\15\\bin\\pg_dump --host localhost --port 5432 --username "postgres" --format custom --file "C:\\Users\\USUARIO\\Desktop\\Respaldos_BD\\pruebaGeo_${fecha}.backup" "pruebaGeo"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing backup script: ${error}`);
            return;
        }
        console.log(`Backup script output: ${stdout}`);
        console.error(`Backup script errors: ${stderr}`);
    });
});

console.log('After job instantiation');
job.start();