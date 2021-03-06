var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");



router.get("/", function(req, res) {

  burger.all(function(data) {

    var hbsObject = {
      burger: data
    };

    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burger", function(req, res) {

  burger.insert([
    req.body.burger_name
  ], 
  
  function(result) {

    res.redirect('/');
  });
});

router.put("/api/burger/:id", function(req, res) {

  var condition = req.params.id;
  console.log("condition", condition);

  burger.update({
    devoured: req.body.status
  }, condition, function(result) {

    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();

    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;