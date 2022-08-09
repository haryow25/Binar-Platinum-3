const router = require("express").Router();

const usersController = require("../api/controllers/usersController");
const leaderboardController = require("../api/controllers/leaderboardController");
const ProfilesController = require("../api/controllers/profileController");

const jwtAuth = require("../middleware/jwt");
const upload = require("../middleware/upload");

// get
router.get("/user/:id", jwtAuth.jwtAuth, ProfilesController.readOne);
router.get("/user", jwtAuth.jwtAuth, ProfilesController.readAll);
router.get("/leaderboard", jwtAuth.jwtAuth, leaderboardController.readAll);
router.get("/leaderboard/:id", jwtAuth.jwtAuth, leaderboardController.readOne);


// post
router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/forgot", jwtAuth.jwtAuth,  usersController.forgotPassword);
router.post("/reset/:id", jwtAuth.jwtAuth, usersController.resetPassword);
router.post("/leaderboard", jwtAuth.jwtAuth, leaderboardController.create);
// router.post("/user/profile", jwtAuth.jwtAuth, upload.single("image"), ProfilesController.create);

// put
router.put("/user/:id", jwtAuth.jwtAuth, upload.single("image"), ProfilesController.updateOne);
router.put("/leaderboard/:id", jwtAuth.jwtAuth, leaderboardController.update);

// delete
router.delete("/user/:id", jwtAuth.jwtAuth, ProfilesController.deleteOne);
router.delete("/leaderboard/:id", jwtAuth.jwtAuth, leaderboardController.destroy);

module.exports = router;
