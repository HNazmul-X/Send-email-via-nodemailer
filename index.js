const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
var nodemailer = require("nodemailer");
require("dotenv").config()
const PORT = process.env.PORT || 8080


app.use(cors())
app.use(bodyParser())


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

    console.log(req.body)
    

    const mailOptions = {
        from: "nazmul.sarlex@gmail.com",
        to: `${req.body.email}`,
        subject: `Portfolio Email From ${req.body?.name}`,
        html: `
                  <div style="width:600px;padding:20px;border-radius: 20px; margin:auto;margin-top: 50px; background:lightskyblue; font-family:montserrat, Arial, Helvetica, sans-serif ">
                    <h1>Hello <br> I am <em><b style="color:yellow">${req.body?.name}</b></em></h1>

                    <article style="margin-top:20px">
                        <p style="font-size: 14px;">${req.body?.massage}</p>
                    </article>
                    
                </div>

        
        `,
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

app.listen(PORT , ()=> console.log("app start succesfully"))