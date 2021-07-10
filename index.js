const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
var nodemailer = require("nodemailer");
require("dotenv").config()


app.use(cors())
app.use(bodyParser.json())


console.log(process.env.GMAIL_PASSWORD);

app.get("/", (req, res)=> {
    res.send(" <h1>Hello, Don't Worry I am working</h1> ")
})

app.post("/sendEmail", (req, res)=> {
    const sendingResponse = (sentResponse) => {
        res.send(sentResponse)
    }
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "nazmul.sarlex@gmail.com",
            pass: `${process.env.GMAIL_PASSWORD}`,
        },
    });

    const mailOptions = {
        from: "nazmul.sarlex@gmail.com",
        to: `jesmin.w3@gmail.com`,
        subject: "Massage from your web-hnazmul.com website",
        html: "<h1>Hi Smartherd</h1><p>Your Messsage</p>",
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            sendingResponse("something Went wrong Please try agin later");
        } else {
            sendingResponse(`${JSON.stringify(info)}`);
        }
    });


    
})

app.listen(8080 , ()=> console.log("app start succesfully"))