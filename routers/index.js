const router = require("express").Router();

const usersController = require("../api/controllers/usersController");
const ProfilesController = require("../api/controllers/profileController");

const jwtAuth = require("../middleware/jwt");
const upload = require("../middleware/upload");

// get
router.get("/user/:id", jwtAuth.jwtAuth, ProfilesController.readOne);
router.get("/user", jwtAuth.jwtAuth, ProfilesController.readAll);

// post
router.post("/register", usersController.register);
router.post("/login", usersController.login);
// router.post("/user/profile", jwtAuth.jwtAuth, upload.single("image"), ProfilesController.create);

// put
router.put("/user/:id", jwtAuth.jwtAuth, upload.single("image"), ProfilesController.updateOne);

// delete
router.delete("/user/:id", jwtAuth.jwtAuth, ProfilesController.deleteOne);

module.exports = router;
