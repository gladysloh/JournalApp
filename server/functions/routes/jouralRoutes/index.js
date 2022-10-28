const express = require("express");
const router = express.Router();
const firebaseAuth = require("../middleware/firebase-auth");

router.post("/createjournal", firebaseAuth, require("./createjournal"));
router.post("/editjournal", firebaseAuth, require("./editjournal"));
router.post("/getalljournals", firebaseAuth, require("./getalljournal"));
router.post("/getonejournalbydate", firebaseAuth, require("./getonejournalbydate"));
router.post("/getonejournalbyid", firebaseAuth, require("./getonejournalbyid"));
router.post("/removejournal", firebaseAuth, require("./removejournal"));
router.get("/randomq", require("./getrandomquestion"));


module.exports = router;
