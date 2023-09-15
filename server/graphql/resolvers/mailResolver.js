const ObjectId = require("mongodb").ObjectId;
const nodemailer = require("nodemailer")
const Mailgen = require("mailgen")
const dotenv = require("dotenv")
dotenv.config()
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
          host: 'smtp.gmail.com',
          port: 465,
          //secure: true, // use SSL
          auth: {
              user: process.env.MAIL_NAME,
              pass: process.env.MAIL_PASSWORD
          }
      };
        let transporter = nodemailer.createTransport(smtpConfig)
        
        let MailGenertor = new Mailgen({
          theme: "default",
          product: {
            name: "AdnanFurkanAKTEMUR",
            link:"https://www.npmjs.com/package/mailgen"
          }
        })

        let response = {
          body:{
            name:"name",
            intro: "asd",
            table:{
              data:[
                {
                  gereklilik: "asd",
                  zaman:"Hemen asd",
                  yoksa: "asd"
                }
              ]
            },
            outro:"Aslında daha da fazlasını istiyorum"
          }
        }

        let mail = MailGenertor.generate(response)


        let message = {
          from: process.env.MAIL_NAME,
          to: input.to,
          subject:input.subject,
          html: mail
        }
        transporter.sendMail(message).then(() => {
          console.log("başarılı");
        }).catch((error)=>{
          console.log(error);
        })
        
        return null

      } catch (e) {
        console.log(e);
        throw new Error(e);
      }
    },
  },
};

        // const transporter = nodemailer.createTransport({
        //   host: "smtp.forwardemail.net",
        //   port: 465,
        //   secure: true,
        //   auth: {
        //     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        //     user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        //     pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
        //   }
        // });
        
        // let message = {
        //   from: '"Fred Foo 👻" <foo@example.com>', // sender address
        //   to: "bar@example.com, baz@example.com", // list of receivers
        //   subject: "Hello ✔", // Subject line
        //   text: "Hello world?", // plain text body
        //   html: "<b>Hello world?</b>", // html body
        // }

        // const mail = await transporter.sendMail(message)