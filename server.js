var faker= require('faker');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(session({secret: 'ssshhhhh',resave:true,saveUninitialized:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var sess;
app.get('/',function(req,res){
sess = req.session;
//Session set when user Request our app via URL
if(sess.email) {
/*
* This line check Session existence.
* If it existed will do some action.
*/
    res.redirect('/admin');
}
else {
        res.render('index.html');
    }   });
    app.post('/login',function(req,res){
      sess = req.session;
    //In this we are assigning email to sess.email variable.
    //email comes from HTML page.
    sess.pass=req.body.pass;
      sess.email=req.body.email;
      res.end('done');
    });
    app.get('/admin',function(req,res){
      sess = req.session;
    if(sess.email) {
        console.log(sess.pass);
    res.write('<h1>Hello'+sess.email+'</h1>');
    res.write('<h1>Hello'+sess.pass+'</h1>');    
    res.write('<a href="/users">Data of users</a>');
    res.end('<a href="/logout">Logout</a>');

    } 
    else {
            res.write('<h1>Please login first.</h1>');
            res.end('<a href="/">Login</a>');
        }
        });
        app.get("/users", function (req, res) { 
            sess = req.session;

            if(sess.email){
            var users = []; 
            var num = 20; 
            if (isFinite(num) && num > 0 ) { 
                for (i = 0; i <= num-1; i++) { 
            users.push({ 
                firstName: faker.name.firstName(), 
                lastName: faker.name.lastName(), 
                username: faker.internet.userName(), 
                email: faker.internet.email() 
                      }); 
                                  } 
            res.status(200).send(users); 
                            } 
                                        }
                                        else{
                                            res.write('<h1>Please login first for Data.</h1>');
                                                res.end('<a href="/">Login</a>'); 
                                        }
                                    }); 
                                               
        app.get('/logout',function(req,res){
        req.session.destroy(function(err) {
          if(err) {
            console.log(err);
          } else {
            res.redirect('/');
          }
        });
        });
        app.listen(3000,function(){
        console.log("App Started on PORT 3000");
        });
            