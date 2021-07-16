const User_Activity = require("../models").User_Activity;
const User = require("../models").User;

module.exports = {
  addStat(req, res){
    var data = {
      aid: req.body.aid,
      uid: req.body.uid,
      name: req.body.name,
      type: req.body.type,
      duration: req.body.duration,
      points: req.body.points,
      updatedAt: req.body.updatedAt
    }

    return User_Activity.create(data).then(id => {
      res.status(200).send("Success");
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err)
    });
  },
  delStat(req, res){
    var uaid = req.body.uaid;on
    return User_Activity.destroy({
      where:{
        uaid: uaid
      }
    }).then(() => {
      res.status(200).send("Successfully deleted");
    }).catch(err => {
      res.status(400).send(err);
    });
  },

  updateStat(req, res){
  },
  getUserStats(req, res){
    return User_Activity.findAll({
      where: {
        uid: req.body.uid
      }
    }).then(stats => {
      res.send(stats);
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    });
  },
  //TODO: order by count(uid) group by uid
  getLeaders(req, res){
    return User_Activity.findAll({
      group:['User_Activity.uid', 'User.uid'],
      attributes:['uid'],
      include:[
        {
          model: User,
          as:'User',
          attributes:['f_name', 'l_name']
        }
      ]
    }).then(leaders => {
      res.send(leaders);
    })
  }
}
