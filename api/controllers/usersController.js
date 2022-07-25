const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { Users, Profiles } = require("../../models");


const jwtsecret = process.env.JWT_SECRET || "secret";

const register = async (req, res) => {
  const { name, password, phone_number, email } = req.body;

  try {
    const userExist = await Users.findOne({
      where: {
        email,
      },
    });
    if (!userExist) {
      return res.status(400).json({
        message: "User already exist",
      });
      // console.log(!userExist);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create(
      {
        name,
        password: hashedPassword,
        phone_number,
        email,
        Profiles: {
          name,
          phone_number,
          email,
        },
      },
      {
        include: [Profiles],
      }

    );
    return res.status(201).json({
      message: "User created",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error creating user",
    });
    // console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userLogin = await Users.findOne({
      where: { email },
    });

    if (!userLogin) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    let isPasswordTrue = await bcrypt.compare(password, userLogin.password);
    if (!isPasswordTrue) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const tokenPayload = {
      id: userLogin.id,
      name: userLogin.name,
      email: userLogin.email,
    };

    const token = jwt.sign(tokenPayload, jwtsecret, {
      expiresIn: "30 days",
    });
    return res.status(200).json({
      message: "Login success",
      data: {
        id: userLogin.id,
        email: userLogin.email,
        token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error login",
    });
  }
};

module.exports = {
  register,
  login,
};
