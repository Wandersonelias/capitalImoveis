var express = require('express');
var router = express.Router();
var User = require('../model/User');
var bcrypt = require('bcryptjs');


/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('users/login');
});
router.post('/validar',(req,res)=>{
  var login = req.body.login;
  var password = req.body.password;
  User.findOne({where: {login: login}}).then(user => {
    if(user != undefined){
      var validador = bcrypt.compareSync(password, user.password);
      if(validador){
        req.session.user = {
          id: user.id,
          login: user.login
        };
        res.redirect('/emprestimos');
      }else{
        res.redirect('/login');
      }
    }else{
      res.redirect('/login');
    }
  });

});

router.get('/listar',(req,res)=>{
  User.findAll({}).then(users =>{
    res.render('users/index', {users: users, user: req.session.user});
  });
});
router.get('/new',(req,res)=>{
  res.render('users/new',{user: req.session.user});
});
router.post('/salvar',(req,res)=>{
        var login = req.body.login;
        var password = req.body.password;
        User.findOne({where: {login: login}}).then(user =>{
                  if(user == undefined){
                  var salt = bcrypt.genSaltSync(10);
                  var hash = bcrypt.hashSync(password, salt);
                  User.create({login: login, password: hash}).then(() => {
                      res.redirect("/users/listar");
                    });
          }else{
              res.redirect("/users/new");
          }
        
        });
});
router.get('/logout',(req,res)=>{
  req.session.user = undefined;
  res.redirect("/");
});


module.exports = router;
