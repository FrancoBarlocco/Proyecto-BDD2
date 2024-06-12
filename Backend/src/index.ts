import Server from './db/server';
import cron from 'node-cron';
import { sendEmails } from './controllers/predictController';

const server = new Server()
server.listen()

cron.schedule('00 8 * * *', async () => {
    console.log('Ejecutando tarea programada para enviar correos');
    const result = await sendEmails();
    console.log(result);
  });






