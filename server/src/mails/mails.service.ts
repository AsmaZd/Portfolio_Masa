import { Injectable, Logger } from '@nestjs/common';
import nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    })

    async sendContactNotification(name: string, email: string, content: string){
        const mailOptions = {
            from: `"Portfolio" <${process.env.MAIL_FROM}>`,
            to: process.env.MAIL_FROM,
            replyTo: email,
            subject: `Nouveau message de ${name}`,
            html: `
            <h2>Nouveau message via le formulaire de contact<h2>
            <p><strong>Nom :</strong> ${name}</p>
            <p><strong>Email :</strong> ${email}</p>
            <p><strong>Message :</strong></p>
            <p style=white-space: pre-wrap>${content}</p>
            `
        }

        try {
            await this.transporter.sendMail(mailOptions);
        } catch (error: any) {
            Logger.error(`Envoie d'email échoué: ${error.message}`, `MailService`)
        }
    }

    
}
