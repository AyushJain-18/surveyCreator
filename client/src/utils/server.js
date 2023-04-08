const SERVER_URL = process.env.NODE_ENV ==="development" ? 
  'http://localhost:5000/' : 
  'https://survey-creator-ayush-jain-18.herokuapp.com/' ;


export default SERVER_URL;