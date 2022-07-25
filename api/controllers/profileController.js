const { Profiles } = require("../../models");

const readAll = async (req, res) => {
  try {
    const users = await Profiles.findAll();

    return res.status(200).json({
      message: "Users list",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error getting users",
    });
  }
};

const readOne = async (req, res) => {
  try {
    const user = await Profiles.findOne({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "User",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error getting user",
    });
  }
};

// const create = async (req, res) => {
//   try {
//     const user = await Profiles.create({
//       image: req.file.originalname,
//     });
//     return res.status(200).json({
//       message: "image user add",
//       data: user,
//     });
//   } catch (error) {
//     return res.status(400).json({
//       message: "Error adding image user",
//     });
//   }
// };

const updateOne = async (req, res) => {
  try {
    const user = await Profiles.update(
      {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone,
        image: req.file.filename,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    return res.status(200).json({
      message: "User updated",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error updating user",
    });
  }
};

const deleteOne = async (req, res) => {
  try {
    const user = await Profiles.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      message: "User deleted",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error deleting user",
    });
  }
};

module.exports = {
  readAll,
  readOne,
  updateOne,
  deleteOne,
  // create,
};
