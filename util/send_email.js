import { logger } from 'express-glass';
import nodemailer from 'nodemailer';
import env from '../config/env';
import ejs from 'ejs';
import certificateService from '../service/certificate_service';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.MAILER_ADDRESS,
        pass: env.MAILER_PASSWORD
    }
});

export const sendEmail = async (to, subject, template, param) => {
    const html = await ejs.renderFile(__dirname + "/../assets/" + template, param);
    logger().info(`Send email to = ${to}, subject = ${subject}`);
    var options = {
        from: env.MAILER_ADDRESS,
        to,
        subject,
        html
    };
    
    return new Promise((resolve, reject) => {
        transporter.sendMail(options, (err, info) => {
            if (err) {
                logger().error(`Failed to send email, error = ${err}`);
                reject(err);
            }

            resolve(info);
        });
    });
}

export const notifySigner = async (certificateId) => {
    const certificate = await certificateService.getByCertificateId(certificateId);
    let certificateSigners = certificate.CertificateSigners;
    certificateSigners = certificateSigners.sort((a, b) => {
        return a - b;
    });

    let actorToNotify;
    let isReceiver = false;
    for (const signer of certificateSigners) {
        if (!signer.is_sign) {
            actorToNotify = signer.User;
            break;
        }
    }

    if (!actorToNotify) {
        actorToNotify = certificate.User;
        isReceiver = true;
    }

    sendEmail(actorToNotify.email, 'Your Turn To Signing', 'signing-notification.html', {
        receiver_name: actorToNotify.name,
        message: isReceiver ? 
            `Mohon segera menerima ijazah/sertificate dengan contract address ${certificate.sc_address}` : 
            `Mohon segera menandatangani ijazah/sertificate dengan contract address ${certificate.sc_address}`
    })
}