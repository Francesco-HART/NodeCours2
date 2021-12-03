import {
  createTestAccount,
  createTransport,
  getTestMessageUrl,
} from "nodemailer";

/**
 * Services of mail
 * @param newPassword
 * @param email
 * @returns {Promise<void>}
 */
// async..await is not allowed in global scope, must use a wrapper
async function send(newPassword, email) {
  // create reusable transporter object using the default SMTP transport
  let transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "pete.strosin43@ethereal.email",
      pass: "Pgddx23wYANFVCyGJu",
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: "equipecoding@gmail.com",
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Bonjour voila ton nouveau mot de passe", // plain text body
    html: "<b>" + newPassword + "</b>", // html body
  });
}
export { send };
