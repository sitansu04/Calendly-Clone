const nodemailer = require("nodemailer");

const sendMail = async (subject, body, userMail) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'jigentech2021@gmail.com',
      pass: 'eazygplmowrusuaz'
    }
  });
  let info = await transporter.sendMail({
    from: 'MyCal.com <mycal@mail.com>',
    to: userMail,
    subject: subject,
    html: body,
  });
  console.log("Email Sent");
};

module.exports = { sendMail };
