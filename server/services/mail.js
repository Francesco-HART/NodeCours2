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
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "ben.francesco23@gmail.com",
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Bonjour voila ton nouveau mot de passe", // plain text body
    html: "<b>" + newPassword + "</b>", // html body
  });
}
export { send };
