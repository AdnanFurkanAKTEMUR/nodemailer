const ObjectId = require("mongodb").ObjectId;
const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  Query: {
    getAllMail: async (_, { input }, { req, res, client }) => {
      try {
        const mailCollection = await client.db("nodemailer").collection("mail");
        const allMail = await mailCollection.find({}).toArray();
        return allMail;
      } catch (e) {
        throw new Error(e);
      }
    },
  },

  Mutation: {
    sendMail: async (_, { input }, { req, res, client }) => {
      try {
        const mailCollection = await client.db("nodemailer").collection("mail");

        var smtpConfig = {
          host: "smtp.gmail.com",
          port: 465,
          //secure: true, // use SSL
          auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PASSWORD,
          },
        };
        let transporter = nodemailer.createTransport(smtpConfig);

        let MailGenertor = new Mailgen({
          theme: "default",
          product: {
            name: "AdnanFurkanAKTEMUR",
            link: "https://github.com/AdnanFurkanAKTEMUR",
          },
        });

        let response = {
          body: {
            name: "User",
            intro: input.text,
            outro: input.html,
          },
        };

        let mail = MailGenertor.generate(response);

        let message = {
          from: process.env.MAIL_NAME,
          to: input.to,
          subject: input.subject,
          html: mail,
        };
        
        await transporter.sendMail(message);
        const emailToDatabase = await mailCollection.insertOne({ to: input.to, text: input.text, subject: input.subject, html: input.html });
        const emailInfo = await mailCollection.findOne({ _id: emailToDatabase.insertedId });
        return emailInfo ? emailInfo : null;
      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
  },
};