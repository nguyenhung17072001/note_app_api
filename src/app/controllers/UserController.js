const User = require("../models/User");
const {
  mutipleMongooseToObject,
  mongooseToObject,
} = require("../../util/mongoose");
const success = {
  status: 200,
  code: "SUCCESS",
  message: "Thành công",
};

const fail = {
  message: "Tài khoản không tồn tại",
};

class NewsControllers {
  // [Post] api/user/login
  login(req, res, next) {
    //console.log("body: ", req.body)
    User.findOne({
      username: req.body.username,
      password: req.body.password,
    })
      .then((user) => {
        if (user) {
          res.json({
            ...success,
            data: user,
          });
        } else {
          res.json(fail);
        }
      })
      .catch(next);
  }

  //[POST]/api/user/register
  register(req, res, next) {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
      position: req.body.position,
      name: req.body.name,
    });

    User.findOne({ username: req.body.username }).then((username) => {
        if (!username) {
            user.save()
            .then((user) => {
                if (user) {
                    res.json({
                        ...success,
                        data: user,
                    });
                } else {
                    res.json(fail);
                }
            })
            .catch(next);
        }
        else {
            res.json({
                data: {
                    message: "Tài khoản đã tồn tại"
                }
            })
        }
    });
  }
}

module.exports = new NewsControllers();