const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const { Users, Profiles } = require("../../models");

const jwtsecret = process.env.JWT_SECRET || "secret";

const register = async (req, res) => {
  const { name, password, phone_number, email, role } = req.body;
  // console.log(req.body);
  try {
    // console.log("hello world");
    const userExist = await Users.findOne({
      where: {
        email,
      },
    });
    // if (!userExist) {
    //   return res.status(400).json({
    //     message: "User already exist",
    //   });
    //   // console.log(!userExist);
    // }
    if (userExist) {
      console.log("user exist");
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create(
      {
        name,
        phone_number,
        email,
        role,
        Profiles: {
          name,
          phone_number,
          email,
          role,
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
    // return res.status(400).json({
    //   message: "Error creating user",
    // });
    console.log(error);
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
      // console.log(!userLogin);
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

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const userForgot = await Users.findOne({
      where: { email },
    });

    if (!userForgot) {
      return res.status(400).json({
        message: "User not found",
      });
      // console.log(!userForgot);
    }

    const tokenPayload = {
      id: userForgot.id,
      name: userForgot.name,
      email: userForgot.email,
    };

    const token = jwt.sign(tokenPayload, jwtsecret, {
      expiresIn: "30 days",
    });

    return res.status(200).json({
      message: "Forgot password success",
      data: {
        id: userForgot.id,
        email: userForgot.email,
        token,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error forgot password",
    });
  }
}

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  try {
    const userReset = await Users.findOne({
      where: { id },
    });

    if (!userReset) {
      return res.status(400).json({
        message: "User not found",
      });
      // console.log(!userForgot);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.update(
      {
        password: hashedPassword,
      },
      {
        where: { id },
      }
    );
    return res.status(200).json({
      message: "Reset password success",
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error reset password",
    });
  }
}


module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
};
