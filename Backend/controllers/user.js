const { User, Permissions } = require("../models");
const JWT = require("jsonwebtoken");
const {
  hashPassword,
  comparePassword,
} = require("../helpers/encryptDecryptPass");
//creating user controller
const createUser = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      department,
      role,
      canRead,
      canCreate,
      canDelete,
      canUpdate,
    } = req.body;
    if (!firstname) {
      return res.status(400).json({ message: "firstname cannot be empty" });
    }
    if (!lastname) {
      return res.status(400).json({ message: "lastname cannot be empty" });
    }
    if (!email) {
      return res.status(400).json({ message: "email cannot be empty" });
    }
    if (!password) {
      return res.status(400).json({ message: "password cannot be empty" });
    }
    if (!department) {
      return res.status(400).json({ message: "department cannot be empty" });
    }
    if (!role) {
      return res.status(400).json({ message: "role cannot be empty" });
    }
    if (canRead === undefined) {
      return res.status(400).json({ message: "read access cannot be empty" });
    }
    if (canCreate === undefined) {
      return res.status(400).json({ message: "create access cannot be empty" });
    }
    if (canDelete === undefined) {
      return res.status(400).json({ message: "delete access cannot be empty" });
    }
    if (canUpdate === undefined) {
      return res.status(400).json({ message: "update access cannot be empty" });
    }
    const checkExistingEmail = await User.findOne({ where: { email: email } });
    if (checkExistingEmail) {
      return res.status(400).json({
        success: false,
        message: "email already exists",
      });
    }
    const hashedPass = await hashPassword(password);
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPass,
      department: department,
      role: role,
      superUser: false,
    });
    const permissions = await Permissions.create({
      create: !!canCreate,
      canUpdate: !!canUpdate,
      delete: !!canDelete,
      read: !!canRead,
      userId: user.id,
    });
    const responseDetail = {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      department: user.department,
      role: user.role,
      superUser: user.superUser,
      create: permissions.create,
      update: permissions.update,
      delete: permissions.delete,
      read: permissions.read,
    };
    res.status(200).send({
      status: true,
      message: "Successfully created the user",
      responseDetail,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error while creating user",
      error,
    });
  }
};
// user logged in
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email cannot be empty" });
    }
    if (!password) {
      return res.status(400).json({ message: "password cannot be empty" });
    }
    const checkUser = await User.findOne({ where: { email: email } });
    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "user does not exist",
      });
    }
    if (checkUser.superUser) {
      return res.status(400).json({
        status: false,
        message: "SuperUser Cannot be logged in from this route",
      });
    }
    const compare = await comparePassword(password, checkUser.password);
    if (!compare) {
      return res.status(400).json({
        status: false,
        message: "incorrect password",
      });
    }
    const token = JWT.sign({ id: checkUser.id }, process.env.SECRET_SIGNATURE, {
      expiresIn: "7d",
    });
    res.status(200).json({
      status: true,
      message: "successfully logged in as a user",
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error while Login",
      error,
    });
  }
};

// fetching the user and his permissions

const fetchingUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["password", "email"] },
      include: [Permissions],
    });
    if (!user) {
      res.status(400).send({
        status: false,
        message: "User Doesnot exits",
        user,
      });
    }
    res.status(200).send({
      status: true,
      message: "Successfully fetched the user",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in fetching user details",
      error,
    });
  }
};

// deleting user and its permission
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const existingUser = await User.findByPk(userId);
    if (!existingUser) {
      return res.status(400).json({
        status: false,
        message: "User does not exist",
      });
    }
    if (existingUser.superUser) {
      return res.status(400).json({
        status: false,
        message: "SuperUser cannot be deleted",
      });
    }
    await User.destroy({
      where: { id: userId },
      include: [Permissions],
    });
    res.status(200).json({
      status: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in deleting user",
      error,
    });
  }
};
//updating the user details and his permissions
const updateUserDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      firstname,
      lastname,
      email,
      password,
      department,
      role,
      canRead,
      canCreate,
      canDelete,
      canUpdate,
    } = req.body;
    if (!firstname) {
      return res.status(400).json({ message: "firstname cannot be empty" });
    }
    if (!lastname) {
      return res.status(400).json({ message: "lastname cannot be empty" });
    }
    if (!email) {
      return res.status(400).json({ message: "email cannot be empty" });
    }
    if (!password) {
      return res.status(400).json({ message: "password cannot be empty" });
    }
    if (!department) {
      return res.status(400).json({ message: "department cannot be empty" });
    }
    if (!role) {
      return res.status(400).json({ message: "role cannot be empty" });
    }
    if (canRead === undefined) {
      return res.status(400).json({ message: "read access cannot be empty" });
    }
    if (canCreate === undefined) {
      return res.status(400).json({ message: "create access cannot be empty" });
    }
    if (canDelete === undefined) {
      return res.status(400).json({ message: "delete access cannot be empty" });
    }
    if (canUpdate === undefined) {
      return res.status(400).json({ message: "update access cannot be empty" });
    }
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "user doesnot exists",
      });
    }
    if (user.superUser) {
      return res.status(400).json({
        status: false,
        message: "super user cannot be update",
      });
    }
    await User.update(
      { firstname, lastname, email, password, department, role },
      { where: { id: userId } }
    );
    await Permissions.update(
      {
        create: canCreate,
        canUpdate: canUpdate,
        delete: canDelete,
        read: canRead,
      },
      { where: { id: userId } }
    );
    res.status(200).json({
      status: true,
      message: "User and permissions updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Error in updating user",
      error,
    });
  }
};

module.exports = {
  createUser,
  fetchingUser,
  deleteUser,
  userLogin,
  updateUserDetails,
};
