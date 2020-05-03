var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//routers
var indexRouter = require('./routes/index');
var User = require('./src/models/User');
var Device = require('./src/models/Device');
var Data = require('./src/models/RawDataLog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/user', usersRouter);
//app.use('/data', deviceRouter);

router.route('/user')
    .get(function(req, res) {
        User.find({'username': req.body.username}, function (err, user) {
            if (err) {
                if (!user)
                    res.status(401).send({success: false, msg: 'user does not exist'});
                else
                    res.send(err);
            } else res.json(user)

        })
    })
    .post(function (req, res) {
        console.log(req.body);
        var user = new User();
        user.name = req.body.name;
        user.username = req.body.username;
        user.password = req.body.password;
        user.deviceID = req.body.deviceID;

        newUser.save(function (err) {
            if (err) {
                //duplicate entry
                if (err.code === 11000)
                    return res.json({success: false, message: 'A device with that username already exists. '});
                else
                    return res.send(err);
            }
        })

    })
    .put(function (reg, res) {
        var user = req.body.user;
        if (User.findOne({username: user}) != null) {
            var newUser = {$set: req.body};
            User.updateOne({username: user}, newUser, function (err, user) {
                if (err) {
                    if (!user)
                        res.status(401).send({success: false, msg: 'user does not exist'});
                    else res.send(err);
                } else res.json({success: true, message: 'Updated user'})
            })
        }
    })
    .delete(function (req, res) {
        var user = user.deleteOne({username: req.body.username}, function (err) {
            if (err) {
                if (!user)
                    res.status(401).send({success: false, msg: 'user does not exist'});
                else res.send(err)
            } else res.json({success: true, msg: 'user deleted from database'});

        })
    });
/* Do we need this if we aren't doing authentication?
router.post('/signin', function(req, res) {
    var userNew = new User();
    userNew.username = req.body.username;
    userNew.password = req.body.password;        

    User.findOne({ username: userNew.username }).select('name username password').exec(function(err, user) {
         if (err) res.send(err);
         //auth

            user.comparePassword(userNew.password, function(isMatch){
                if (isMatch) {
                    var userToken = {id: user._id, username: user.username};
                    var token = jwt.sign(userToken, process.env.SECRET_KEY);
                    res.json({success: true, token: 'JWT ' + token});
                    }
                else {
                    res.status(401).send({success: false, message: 'Authentication failed.'});
                    }
                });
            });
        })        

router.post('/signup', function(req, res) {
      if (!req.body.username || !req.body.password) {
                res.json({success: false, message: 'Please pass username and password.'});
            }
            else {
                var user = new User();
                user.username = req.body.username;
                user.password = req.body.password;
                // save the user
                user.save(function(err) {
                    if (err) {
                        // duplicate entry
                        if (err.code == 11000)
                            return res.json({ success: false, message: 'A user with that username already exists. '});
                        else
                            return res.send(err);
                    }

                    res.json({ success: true, message: 'User created!' });
                });
            }
        })              
        */                

router.route('/device')
    .get(function(req, res) {
        Device.find({'id': req.body.id}, function (err, device) {
            if (err) {
                if (!device)
                    res.status(401).send({success: false, msg: 'user does not exist'});
                else
                    res.send(err);
            } else res.json(user)
        })
    })
    .post(function(req,res){

        console.log(req.body);
        var device = new Device();
        device.id = req.body.id;
        device.owners = [{username: req.body.username, userID: req.body.userID}];

        if(Device.findOne({device: device.id}) != null){
            device.save(function (err) {
                if (err){
                    if (err.code === 11000)
                        res.json({success: false, message: 'That device already exists. '});
                    else
                        return res.send(err);
                }
                else
                    res.json({success: true, message: 'device created'});
            });
        }
    })
    .put(function(reg,res) {
        var device = req.body.device;
        if (Device.findOne({id:device}) != null){
            var newDevice = {$set: req.body};
            Device.updateOne({id:device}, newDevice, function(err,device){
                if (err){
                    if (!device)
                        res.status(401).send({success: false, msg: 'device does not exist'});
                    else res.send(err);
                }
                else res.json({success: true, message: 'Updated device'})
            })
        }
    })
    .delete(function(req,res) {
        Device.deleteOne({id: req.body.id}, function (err, device) {
            if (err) {
                if (!device)
                    res.status(401).send({success: false, msg: 'device does not exist'});
                else res.send(err)
            } else res.json({success: true, msg: 'device deleted from database'});
        })
    });
router.rout('/data')
    .get(function(req, res) {
        Data.find({'timestamp': req.body.timestamp}, function (err, data) {
            if (err) {
                if (!data)
                    res.status(401).send({success: false, msg: 'timestamp does not exist'});
                else
                    res.send(err);
            } else res.json(user)
        })
    })
    .post(function (req, res) {

        console.log(req.body);
        var data = new Data();
        data.timestamp = req.body.timestamp;
        data.vocConcentration = req.body.vocConcentration;
        data.humidity = req.body.humidity;
        data.barometricPressure = req.body.barometricPressure;
        data.massConcentration = req.body.massConcentration;

        if (Data.findOne({data: data.timestamp}) != null) {
            data.save(function (err) {
                if (err) {
                    if (err.code === 11000)
                        res.json({success: false, message: 'That timestamp already exists. '});
                    else
                        return res.send(err);
                } else
                    res.json({success: true, message: 'timestamp created'});
            });
        }
    })

    .put(function (reg, res) {
        var data = req.body.data;
        if (Data.findOne({timestamp: data}) != null) {
            var newData = {$set: req.body};
            Data.updateOne({timestamp: data}, newData, function (err, data) {
                if (err) {
                    if (!data)
                        res.status(401).send({success: false, msg: 'timestamp does not exist'});
                    else res.send(err);
                } else res.json({success: true, message: 'Updated timestamp'})
            })
        }
    })
    .delete(function (req, res) {
        Data.deleteOne({timestamp: req.body.timestamp}, function (err, data) {
            if (err) {
                if (!data)
                    res.status(401).send({success: false, msg: 'timestamp does not exist'});
                else res.send(err)
            } else res.json({success: true, msg: 'timestamp deleted from database'});
        })
    }); 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => console.log('listening on port 3000'));
module.exports = app;
