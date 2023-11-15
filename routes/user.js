const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/protect");

const {
    getUsers,
    getLogin,
    createUser,
    getUser,
    getProfile,
    updateProfile,
    updateUser,
    changeProfile,
    updateProfileImage
} = require("../controller/user");

//"/api/v1/user"
router
  .route("/")
  .get(protect, authorize(1, 2, 3), getUsers)
  .post(getLogin);

router
  .route("/:id")
  .get(protect, authorize(1, 2, 3), getUser)
  .post(protect, authorize(1, 2), updateUser);

router
  .route("/login/signup")
  .post(createUser);

router
  .route("/profile/me")
  .get(protect, authorize(1, 2, 3, 4, 5), getProfile)
  .post(protect, authorize(1, 2, 3, 4, 5), updateProfile);

router
  .route("/profile/image")
  .post(protect, authorize(1, 2, 3, 4, 5), changeProfile);

router
  .route("/profile/update/:id")
  .post(protect, authorize(1, 2), updateProfileImage);

module.exports = router;