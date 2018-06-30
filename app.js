
const SlackBot=require('slackbots');
const axios=require('axios');
const request=require('request');
const argv = require('yargs').argv;
var prompt = require('password-prompt');
var password = prompt('password: ');

const apiKey = '927b954eda8ee4485661b4054036b4a6';
const city = argv.c || 'portland';
//const root_url=`http://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}`;
const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

const baseAPI = "https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Login";
var KIOSKuid='';
var KIOSKpwd='';
const KIOSKsession = "";
const bot=new SlackBot({
    token:'xoxb-385157682791-383419815680-4PJJKI7fjhuB9mN0N4jwvXxm',
    name:'general_bot'
});
bot.on('start',()=>{
const params={
    icon_emoji:':smiley:'
};


bot.postMessageToChannel('general','What do you want please let us know?',params);


}); 
bot.on('error',err=>console.log(err));
    bot.on('message',data=>{
        if(data.type!='message'){
            return;
        }
       handleMessage(data.text);
    }); 
    function handleMessage(message){
        if(message.includes(' chucknorris')){
            chuckJoke();
        }
        else if(message.includes(' yomama')){
            yomama();
        }
        else if(message.includes(' weather')){
            get_weather();
        }
        else if(message.includes('help')){
            help();
        }
        else if(message.includes('attendance')){
            getAttendance();

        }
        else if(message.includes('faculty')){
            getFaculty();
        }
        else if(message.includes('sgcg')){
            getSGPACGPA();
        }
        else if(message.includes('userdetails'))
    {
        UserDetails();
    }
    }
    

function chuckJoke(){
        axios.get('http://api.icndb.com/jokes/random')
        .then(res=>{
           
     const joke=res.data.value.joke;
     const params={
         icon_emoji:':laughing:'
     };
     bot.postMessageToChannel('general',`Chuck norris is at your service:${joke}`,params);
        });
    }
    function yomama(){
        axios.get('http://api.yomomma.info')
        .then(res=>{
            const joke=res.data.joke;
            const params={
icon_emoji:':laughing:'
            };
            bot.postMessageToChannel('general',`Yomama is here bro:${joke}`,params);
        });
    }   
    function help() {
        const params = {
          icon_emoji: ':question:'
        };
      
        bot.postMessageToChannel(
          'general',
          `Type @generalbot with information you want like @generalbot attendance`,
          params
        );
      }
      function get_weather(){
       
       const params = {
            icon_emoji: ':question:'
          };
        request(url, function (err, response, body) {
            if(err){
              console.log('error:', error);
            } 
            else {
              const weather = JSON.parse(body);
             // console.log(weather);
             const  message = `Its ${weather.main.temp} degrees in ${weather.name}!`;
             bot.postMessageToChannel(
                'general',
                `Its ${weather.main.temp} degrees in ${weather.name}!`,
                params
              );
              
            }
           
        });
             
    }
    //Login
    
function getAttendance(){
    const access_headers={
        'x-api-key':'GndNiXz3c59ttMaNKTuG7apFfMuByCIm23zQC3r9'
    }
    var loginOptions = {
        url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Login',
        method: 'GET',
        headers: access_headers,
        qs: { 'uid': '151309', 'pwd': 'abc123' }
    }
    request(loginOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var jsonLoginResponse = JSON.parse(body);
            var loginResult = jsonLoginResponse.loginResult;
            if(loginResult==1){
                // Login Success, Get Attendance
                var loginCookies = jsonLoginResponse.loginCookies;
                var attendanceOptions = {
                    url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Attendance',
                    method: 'GET',
                    headers: access_headers,
                    qs: { 'session': loginCookies }
                }
                request(attendanceOptions, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        //console.log(body);
                        var res=JSON.parse(body);
                        for(i=0;i<12;i++)
                        {
                            var code=res.attendance[i].code;
                        var name=res.attendance[i].name;
                        var total=res.attendance[i].Total;
                        console.log('Code :'+code);
                        console.log('Name :'+name);
                        console.log('Total :'+total);
                        const params = {
                            icon_emoji: ':question:'
                          };
                        
                          bot.postMessageToChannel(
                            'general',
                            `CODE : ${res.attendance[i].code}  NAME : ${res.attendance[i].name}   TOTAL:${res.attendance[i].Total}`,
                            params
                          );
                        }
                        var pers_name=res.name;
                       var number=res.EnrNo;


console.log("Name is"+pers_name + ' and enrollment number is'+number);
                        // console.log('Attendance body is'+result);
                        
                       //console.log('Response is'+response);
                       /* res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(body);
                        */  
                       
                    }
                })
            }          
        }
    })
}	
function getFaculty(){
    const APIAccess_Headers = {
        'x-api-key': 'GndNiXz3c59ttMaNKTuG7apFfMuByCIm23zQC3r9'
    }
    var loginOptions = {
        url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Login',
        method: 'GET',
        headers: APIAccess_Headers,
        qs: { 'uid': '151309', 'pwd': 'abc123' }
    }
    request(loginOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var jsonLoginResponse = JSON.parse(body);
            var loginResult = jsonLoginResponse.loginResult;
            if(loginResult==1){
                // Login Success, Get Attendance
                var loginCookies = jsonLoginResponse.loginCookies;
                var attendanceOptions = {
                    url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Academics_SubjectFaculty',
                    method: 'GET',
                    headers: APIAccess_Headers,
                    qs: { 'session': loginCookies }
                }
                request(attendanceOptions, function (error, response, body) {
                    var res=JSON.parse(body);
                    if (!error && response.statusCode == 200) {
                        console.log('Subject is:'+res.teachers[0].subject+'Faculty name is'+res.teachers[0].lecture);
                        console.log('Subject is:'+res.teachers[2].subject+'Faculty name is'+res.teachers[2].lecture);
                        console.log('Subject is:'+res.teachers[4].subject+'Faculty name is'+res.teachers[0].lecture);
                        console.log('Subject is:'+res.teachers[6].subject+'Faculty name is'+res.teachers[0].lecture);
                        console.log('Subject is:'+res.teachers[9].subject+'Faculty name is'+res.teachers[0].lecture);
                       /* res.writeHead(200, { 'Content-Type': 'text/html' });
                        res.end(body);
                        */  
                        for(i=0;i<10;i+2)
                        {
                            const params = {
                                icon_emoji: ':question:'
                              };
                            
                              bot.postMessageToChannel(
                                'general',
                                `Subject is: ${res.teachers[i].subject}  Faculty : ${res.teachers[i].lecture}`,
                                params
                              );
                        }
                    }
                })
            }          
        }
    })
}	
function getSGPACGPA(){
    const APIAccess_Headers = {
        'x-api-key': 'GndNiXz3c59ttMaNKTuG7apFfMuByCIm23zQC3r9'
    }
    var loginOptions = {
        url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Login',
        method: 'GET',
        headers: APIAccess_Headers,
        qs: { 'uid': '151309', 'pwd':'abc123' }
    }
    request(loginOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var jsonLoginResponse = JSON.parse(body);
            var loginResult = jsonLoginResponse.loginResult;
            if(loginResult==1){
                // Login Success, Get Attendance
                var loginCookies = jsonLoginResponse.loginCookies;
                var attendanceOptions = {
                    url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_ExamInfo_SGPA_CGPA',
                    method: 'GET',
                    headers: APIAccess_Headers,
                    qs: { 'session': loginCookies }
                }
                request(attendanceOptions, function (error, response, body) {
                    var res=JSON.parse(body);
                    if (!error && response.statusCode == 200) {
                        for(i=0;i<6;i++)
                        {
                            var j=i+1
                        
                        
                        console.log('Sem :'+j);
                            console.log('SGPA :'+res.cgsg[i].sgpa+'CGPA:'+res.cgsg[i].cgpa);
                       
                        
                        const params = {
                            icon_emoji: ':question:'
                          };
                        
                          bot.postMessageToChannel(
                            'general',
                            ` SEM: ${i+1} SGPA :${res.cgsg[i].sgpa} CGPA:${res.cgsg[i].cgpa}`,
                            params
                          );
                        }
                      //  res.writeHead(200, { 'Content-Type': 'text/html' });
                        //res.end(body);  
                    }
                })
            }          
        }
    })
}
function UserDetails(){
    const APIAccess_Headers = {
        'x-api-key': 'GndNiXz3c59ttMaNKTuG7apFfMuByCIm23zQC3r9'
    }
    var loginOptions = {
        url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_Login',
        method: 'GET',
        headers: APIAccess_Headers,
        qs: { 'uid': '151309', 'pwd': 'abc123' }
    }
    request(loginOptions, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            var jsonLoginResponse = JSON.parse(body);
            var loginResult = jsonLoginResponse.loginResult;
            if(loginResult==1){
                // Login Success, Get Attendance
                var loginCookies = jsonLoginResponse.loginCookies;
                var attendanceOptions = {
                    url: 'https://12s51emmid.execute-api.ap-south-1.amazonaws.com/v1/JUITKiosk_UserDetails',
                    method: 'GET',
                    headers: APIAccess_Headers,
                    qs: { 'session': loginCookies }
                }
                request(attendanceOptions, function (error, response, body) {
                    var res=JSON.parse(body);
                    if (!error && response.statusCode == 200) {
                        console.log('Name:'+res.name);
                        console.log('E-mail:'+res.StudentEmail);
                        console.log('Father name'+res.FatherName);
                        console.log('Course name:'+res.Course);

                        const params = {
                            icon_emoji: ':question:'
                          };
                        
                          bot.postMessageToChannel(
                            'general',
                            ` NAME: ${res.name} E-mail :${res.StudentEmail}
Father Name:${res.FatherName} Couse Name:${res.Course}`,
                            params
                          );
                    }
                })
            }          
        }
    })
}
	