const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());


const nodemailer = require("nodemailer");

mongoose.connect("mongodb+srv://Sathishjk:Sathish.j@cluster0.q4okqo0.mongodb.net/passkey?retryWrites=true&w=majority").then(function () {
    console.log("Connected to DB");
}).catch(() => {
    console.log("failed connection")
})

const credential = mongoose.model("credential", {}, "bulkmail")


app.post("/sendmail", function (req, res) {

    var msg = req.body.msg;
    var emailList = req.body.emailList;
    credential.find().then(function (data) {
        // covert data into json,otherwise it shows undefined
        console.log(data[0].toJSON().user)
        const transporter = nodemailer.createTransport(
            {
                host: "smtp.gmail.com", // Use Gmail SMTP server
                port: 587,
                secure: false, // true for 465, false for other ports
                auth:
                {
                    user: data[0].toJSON().user,
                    pass: data[0].toJSON().pass
                }
            });
        new Promise(async function (resolve, reject) {
            try {
                for (var i = 0; i < emailList.length; i++) {
                    await transporter.sendMail(
                        {
                            from: "sathishjk01@gmail.com",
                            to: emailList[i],
                            subject: "Test Mail",
                            text: msg
                        },

                        function (error, info) {
                            if (error) {
                                console.log(error);
                                res.send(false)
                            } else {
                                console.log(info);
                                res.send(true)
                            }
                        }
                    );
                }
                console.log("Email sent to:" + emailList[i])
            }
            catch (error) {
                console.log(error)
                res.send(false)
            }
        })
    }).catch(function (err) {
        console.log(err);
    })

    // using for loop to iterate each email from emaillist

})


app.listen(5000, function () {
    console.log("Server Started...")
})