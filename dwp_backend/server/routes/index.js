const userCtrl = require("../controller").user;
const actCtrl = require("../controller").activity;
const grpCtrl = require("../controller").group;
const frCtrl = require("../controller").friends;
const useractCtrl = require("../controller").user_activity;
const usergrpCtrl = require("../controller").user_group;

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: "Hello World!"
  }));


  //User
  app.post("/api/getUserData", userCtrl.getUserData);
  app.post("/api/createAccount", userCtrl.createAccount);
  app.post("/api/editProfile", userCtrl.editProfile);
  app.post("/api/delUser", userCtrl.delUser);
  app.post("/api/listUsers", userCtrl.listUsers);
  app.post("/api/updatePoints", userCtrl.updatePoints);
  app.post("/api/getPoints", userCtrl.getPoints);

  //Group
  app.post("/api/createGroup", grpCtrl.createGroup);
  app.post("/api/delGroup", grpCtrl.delGroup);
  app.post("/api/getGroupData", grpCtrl.getGroupData);

  //Friend
  app.post("/api/follow", frCtrl.follow);
  app.post("/api/unfollow", frCtrl.unfollow);
  app.post("/api/isFriend", frCtrl.isFriend);
  app.post("/api/listFollowings", frCtrl.listFollowings);
  app.post("/api/listFollowers", frCtrl.listFollowers);

  //User_Activity
  app.post("/api/addStat", useractCtrl.addStat);
  app.post("/api/delStat", useractCtrl.delStat);
  app.post("/api/getUserStats", useractCtrl.getUserStats);
  app.post("/api/getLeaders", useractCtrl.getLeaders);

  //User_Group
  app.post("/api/joinGroup", usergrpCtrl.joinGroup);
  app.post("/api/leaveGroup", usergrpCtrl.leaveGroup);
  app.post("/api/isBelongTo", usergrpCtrl.isBelongTo);
  app.post("/api/getMyGroups", usergrpCtrl.getMyGroups);
  app.post("/api/getMembers", usergrpCtrl.getMembers);
}
