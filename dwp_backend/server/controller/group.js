const Group = require("../models").Group;
const User_Group = require("../models").User_Group;

module.exports = {
  createGroup(req, res){
    var data = {
      g_name: req.body.g_name
    };

    return Group.create(data).then(group =>{
      User_Group.create({
        gid: group.dataValues.gid,
        uid: req.body.uid
      }).then(ugid => {
        res.status(200).send("Group id: " + group.dataValues.gid + " User_Group id: " + ugid.dataValues.ugid);
      }).catch(err => {
        res.status(400).send(err);
        console.log(err);
      })
    }).catch(err =>{
      res.status(400).send(err);
      console.log(err);
    });

  },
  delGroup(req, res){
    return Group.destroy({
      where: {
        gid: req.body.gid
      }
    }).then(() =>{
      res.status(200).send("Success");
    }).catch(err => {
      res.status(400).send(err);
      console.log(err);
    });
  },
  getGroupData(req, res){
    return Group.findOne({
      where: {
        gid: req.body.gid
      }
    }).then(group => {
      res.status(200).send(group);
    }).catch(err => {
      res.status(400).send(err);
      console.log(err);
    });
},
     getGroupDist(req, res){
        return Group.findOne({
          where: {
            gid: req.body.gid
          }
        }).then(group => {
          res.status(200).send(group);
        }).catch(err => {
          res.status(400).send(err);
          console.log(err);
        });
  }

}
