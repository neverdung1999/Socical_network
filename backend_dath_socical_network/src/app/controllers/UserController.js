const userModel = require("../models/account");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require("express");
const saltRounds = 10;
const { S_TOKEN } = require("../../constants/.env");

class UserController {
  async register(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const passwordEncrypted = await bcrypt.hash(password, saltRounds);
    console.log(isNaN(name));

    const user = await userModel.findOne({ email: email });
    if (typeof name == "number") {
      console.log("This is not number");
    }
    if (user) {
      return res.json({ message: "account already exist" });
    } else {
      res.json({ message: "sign up successfully" });
      return userModel.create({
        name: name,
        email: email,
        password: passwordEncrypted,
      });
    }
  }

  async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.json({ message: "account does not exist" });
    } else {
      const matches = await bcrypt.compare(password, user.password);
      if (!matches) {
        return res.json({ message: "wrong password" });
      } else {
        const payload = {
          _id: user._id,
          name: user.name,
          email: user.email,
        };
        const token = jwt.sign(payload, "Shhhhh");
        return res.status(200).json({ token: token });
      }
    }
  }

  async verifyToken(req, res, next) {
    const idToken = req.user._id;
    console.log(idToken);
    const user = await userModel.findOne({ _id: idToken });
    console.log(user);
  }

  async listAllFriend(req, res, next) {
    userModel.find({}).then((listFriend) => {
      const list = listFriend.map((listFr) => listFr.toObject());
      if (list) {
        res.json(list);
      }
    });
  }

  async appenAddfr(req, res, next) {

    const idFriend = req.body.idFriend; //duc
    const idUser = req.body.idUser; //huy
    const status = req.body.status; //null
    const In4user = await userModel.findOne({ _id: idUser });
    const In4friend = await userModel.findOne({ _id: idFriend });

    if (status == "choxacnhan") {
      In4user.friend.push(idFriend);
      In4friend.friend.push(idUser);
      //đổ ra các dữ liệu có id không trùng nhau
      In4user.friend = In4user.friend.filter(data => data.idFriend !== idFriend);
      In4friend.friend = In4friend.friend.filter(
        (data) => data.idFriend !== idUser
      );
    }

    if (status == "") {
      const user = {
        idFriend: idFriend,
        status: "guiloimoi",
        // sendByMe: true,
      };
      const friend = {
        idFriend: idUser,
        status: "choxacnhan",
        // sendByMe: false,
      };
      In4user.information.push(user);
      In4friend.information.push(friend);
    }
    In4friend.save();
    In4user.save();

  }

}

module.exports = new UserController();
