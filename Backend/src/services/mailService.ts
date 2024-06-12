import nodemailer from 'nodemailer';


class MailService {
    private transporter: any;

  constructor() {
    // Configuración del transporte SMTP
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'pencaucucopaamerica2024@gmail.com',
        pass: 'wcrm qukj uavd ejpv', 
      },
    });
  }

  async sendMail(to: string, subject: string, text: string): Promise<void> {
    const mailOptions = {
      from: 'pencaucucopaamerica2024@gmail.com',
      to,
      subject,
      text,
    };

    return new Promise((resolve, reject) => {
        this.transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          console.log('Email sent: ' + info.response);
          resolve();
        });
      });
    }
  }

export default MailService;
