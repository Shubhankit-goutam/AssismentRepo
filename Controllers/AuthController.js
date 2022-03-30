const User = require('../models/User');
const AddPost = require('../models/AddPost');
const FriendRequest = require('../models/FriendRequest');
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");


//signup api
const register = (req, res, next) => {
    console.log(req.body);
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.phoneno = req.body.phoneno;
    user.password = req.body.password;
    user.delete = req.body.delete;
    user.unfriend = req.body.unfriend;
    user.friendship = req.body.friendship;
    user.save((err, result) => {
        if (!err) {
            res.send({
                "data": result,
                "data": "successfully register ",
                "status": "200"
            })
        } else {
            res.send(err);
        }
    });
}
//Signin api
const login = (req, res, next) => {
    var useremail = req.body.email;
    var password = req.body.password;
    User.findOne({
            $or: [{
                email: useremail
            }, {
                password: password
            }]
        })
        .then(User => {
            if ((User.role == req.body.role) && (User.password == req.body.password)) {

                let token = jwt.sign({
                    UserId: User._id
                }, 'verySecretValue')
                res.send({
                    "message": 'User login Successfull',
                    token: token
                })
            } else {
                res.send({
                    "error": "Creditional is not matched"
                })
            }
        })
}

//Get User profile details

const userProfile = async (req, res, next) => {
    const userID = req.body.id
    try {
        const user = await User.findById(userID).exec();
        user.friendship.forEach(async element => {
            FriendRequest.find({}, function (err, result) {
                result.forEach(element => {
                        FriendRequest.findOne({
                            $or: [{
                                friendId: element.friendId
                            }]
                        })
                        .then(FriendRequest => {
                                    var newvalue = {
                                        $set: {
                                            'requester': "2",
                                        }
                                    }
                                    FriendRequest.updateOne({
                                        requester:"2"
                                    }, newvalue, function (err, result) {
                                        if (err) {
                                            res.send({
                                                'status': 400,
                                                'message': err.message
                                            })
                                        } else {
                                        }
                                    });
                        })
                
                });
               
            });
         
        });
        res.send({
            'status': 200,
            'result': user

        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

//friend list api
const Friendlist = (req, res, next) => {
    User.find({}, function (err, result) {
        res.send({
            "Friendlist": result
        })
    });
}
//unfriend  and delete friend request
const deleteFriend = (req, res, next) => {
    var id = req.body.id;
    User.findOne({
            $or: [{
                _id: id
            }]
        })
        .then(User => {
            if ((User._id == req.body.id)) {
                if (req.body.type == 'delete') {
                    var deleteR = req.body.deleteR;
                    var newvalue = {
                        $set: {
                            'delete': deleteR,
                        }
                    }
                    User.updateOne({
                        delete: req.body.deleteR
                    }, newvalue, function (err, result) {
                        if (err) {
                            res.send({
                                'status': 400,
                                'message': err.message
                            })
                        } else {
                            res.send({
                                'status': 200,
                                'result': result,
                                'message': " successfully delete"
                            })
                        }
                    });
                } else {
                    var unfriend = req.body.unfriend;
                    var newvalue = {
                        $set: {
                            'unfriend': unfriend,
                        }
                    }
                    User.updateOne({
                        unfriend: req.body.unfriend
                    }, newvalue, function (err, result) {
                        if (err) {
                            res.send({
                                'status': 400,
                                'message': err.message
                            })
                        } else {
                            res.send({
                                'status': 200,
                                'result': result,
                                'message': " successfully unfriend"
                            })
                        }
                    });
                }
            } else {
                res.send({
                    "msg": "friend not found "
                })
            }
        })

}
//send friend request
const friendrequest = async (req, res, next) => {
    console.log(req.body);
    var userObj = new User();
    var frz = new FriendRequest();
    frz.friendId = req.body.friendId;
    frz.requester = req.body.requester;
    frz.recipient = req.body.recipient;

            const user = await  User.findById(req.body.friendId).exec();
            var adduserreq = user.friendship.push(req.body.friendId);
      User.findOne({
        $or: [{
            _id: req.body.friendId
        }]
    })
    .then(User => {
        if ((User._id == req.body.friendId)) {
          
                var newvalue = {
                    $set: {
                        'friendship': user.friendship,
                    }
                }
                User.updateOne({
                    friendship:user.friendship
                }, newvalue, function (err, result) {
                    if (err) {
                        res.send({
                            'status': 400,
                            'message': err.message
                        })
                    } else {
                        frz.save((err, result) => {
                            if (!err) {
                                res.send({
                                    "data": result,
                                    "data": "successfully sent friend request ",
                                    "status": "200"
                                })
                            } else {
                                res.send(err);
                            }
                        });
                    }
                });
           
        } else {
            res.send({
                "msg": "friend not found "
            })
        }
    })
 
}
//Add post api
const addPost = async (req, res, next) => {
    const addpost = new AddPost({
        title: req.body.title,
        content: req.body.content,
        imageURL: req.body.imageURL,
        user: req.body.user,
        userId: req.body.userId,
        status: '1',
        countSee: '0'
    });
    addpost.save(function (err, news) {
        if (err) {
            return res.status(500).json({
                "error": err
            })
        } else {
            return res.status(200).json({
                "message": "Added Succesfully "
            })
        }
    });
}

const deletePost = (req, res, next) => {
    AddPost.find({
        $or: [{
            _id: req.body.id
        }]
    }, function (err, result) {
        if (result.length > 0) {
            AddPost.deleteOne({
                _id: req.body.id
            }, function (err, result) {
                console.log(result._id);
                if (err) {
                    res.send({
                        "error": err
                    })
                } else {
                    res.send({
                        "result": "Successfully delete Post"
                    })
                }
            });
        } else {
            res.send({
                "result": "Post not found",
            })
        }

    });

}

module.exports = {
    register,
    login,
    friendrequest,
    deleteFriend,
    addPost,
    deletePost,
    Friendlist,
    userProfile,
}