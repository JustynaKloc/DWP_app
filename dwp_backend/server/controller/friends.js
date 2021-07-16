const Friends = require("../models").Friends;
const User = require("../models").User;
module.exports = {
  follow(req, res){
    var data = {
      follower_uid: req.body.follower_uid,
      following_uid: req.body.following_uid
    }
    return Friends.create(data).then(fid => {
      res.status(200).send(fid);
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    });
  },
  unfollow(req, res){
    return Friends.destroy({
      where:{
        fid: req.body.fid
      }
    }).then(() => {
      res.status(200).send("Success");
      return;
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    })
  },
  isFriend(req, res){
    var isFriend = false;
    Friends.findOne({
      where:{
        follower_uid: req.body.follower_uid,
        following_uid: req.body.following_uid
      }
    }).then(data =>{
      res.status(200).send(data);
      return true;
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    });

    return false;
  },
  listFollowings(req, res){
    return Friends.findAll({
      where:{
        follower_uid: req.body.uid
      },
      include: [
        {
          model: User,
          attributes: ['uid', 'f_name', 'l_name', 'totalpoints'],
          as: "following"
        }
      ]
    }).then(data =>{
      res.status(200).send(data);
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    })
  },
  listFollowers(req, res){
    return Friends.findAll({
      where:{
        following_uid: req.body.uid
      },
      include: [
        {
          model: User,
          attributes: ['uid', 'f_name', 'l_name', 'totalpoints'],
          as: "follower"
        }
      ]
    }).then(data =>{
      res.status(200).send(data);
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    })
  }
}
