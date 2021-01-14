const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'ishu11jain@gmail.com',
           pass: 'Gshock@2028'
       },
    tls: { rejectUnauthorized: false }
   });

// const Survey_Recivers = [
//     {
//         mail:'Ayush.ayushjain12@gmail.com'
//     }, 
//     {   mail:'ishu11jain@gmail.com'
//     }
// ];

const generateMailOptions =(reciverObj, senderObj,body,subject) => {
    return{
        messageId: reciverObj.mail,
        from: `SURVEY GENERATOR <${senderObj.mail}>`, // sender address
        to:   reciverObj.mail, // list of receivers
        subject: subject, // Subject line
        html: `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body style="background-color: rgb(32, 32, 32);">
                    <div style='text-align: center; margin: 100px 20px;'>
                        <h1 style="color: coral; font-weight: bold; font-size: 4rem;">           Please fill out the survey</h1>
                        <h3 style="color: cadetblue; font-weight: bold; font-size: 2.5rem;" >
                            ${body}
                        </h3> 
                        <h3 style="color: cadetblue; font-weight: bold; font-size: 2.5rem;" >      Do you like our survey creator?</h3>
                        </div>
                    <div style="text-align: center;">
                        <a href="${process.env.CLIENT_APP_ROUTES}/SurveyResponse?surveyGeneratorId=${senderObj.id}&reciverMailId=${reciverObj.mail}&response=Yes" style="color: cornflowerblue; font-weight: bold; font-size: 2rem;">  YES</a>
                        <a href="${process.env.CLIENT_APP_ROUTES}/SurveyResponse?surveyGeneratorId=${senderObj.id}&reciverMailId=${reciverObj.mail}&response=No" style="color: cornflowerblue;  margin-left:100px; font-weight: bold; font-size: 2rem;">  NO</a>
                    </div>
            </body>
            </html>
        `
      };
    }

const sendMail = (reciverObj, senderObj, {body, subject}) =>{
    const allPromisesGeneratorForSendingEmails =[];
    reciverObj.forEach(async (reciver,index) =>{
        const mailOptions =  generateMailOptions(reciver, senderObj,body,subject);
        allPromisesGeneratorForSendingEmails.push(() => transporter.sendMail(mailOptions))  
    })

   return Promise.all(allPromisesGeneratorForSendingEmails.map(eachPromiseGenerator => eachPromiseGenerator()))
}

// sendMail(Survey_Recivers, {id: 123, mail: 'Ayush.ayushjain12@gmail.com'})

module.exports = sendMail;

//  let a =https://www.google.com/url?q=http://localhost:3000/result&source=gmail&ust=1610378181212000&usg=AFQjCNH5JGmq-y-jYq9Ers2kE0-BhbHzpA

//  https://www.google.com/url?q=http://localhost:3000/&source=gmail&ust=1610378338289000&usg=AFQjCNHj10U86jpuGBDtkE4Xr1HFvTjgBg