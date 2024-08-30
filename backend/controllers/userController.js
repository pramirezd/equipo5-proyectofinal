import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const users = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

const register = async (req, res) => {
  const { name, lastname, address, phone, email, password, isadmin } = req.body;
  try {
    // Verificar si el usuario ya existe
    const userExist = await userModel.findUser(email);
    if (userExist) {
      return res.status(409).json({
        message: "Este usuario ya existe",
      });
    }
    // Hashear la contraseña
    const hashPassword = await bcrypt.hash(password, 10);
    // Crear el usuario
    const newUser = await userModel.createUser({
      name,
      lastname,
      address,
      phone,
      email,
      password: hashPassword,
      isadmin: isadmin || false,
    });
    // Crear el payload del JWT
    const payload = {
      id: newUser.id,
      name: newUser.name,
      lastname: newUser.lastname,
      email: newUser.email,
      isadmin: newUser.isadmin,
    };
    // Crear el token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    };
    res.cookie("token_access", token, cookieOptions);
    return res.status(201).json({
      message: "Usuario registrado con éxito",
      user: payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const userExist = await userModel.findUser(email);
  if (!userExist) {
    return res.status(404).json({
      message: "Este usuario no está registrado",
    });
  }
  const match = await bcrypt.compare(password, userExist.password);
  if (!match) {
    return res.status(401).json({
      message: "Las contraseñas no coinciden",
    });
  }
  try {
    const payload = {
      id: userExist.id,
      name: userExist.name,
      lastname: userExist.lastname,
      email: userExist.email,
      isAdmin: userExist.isadmin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const cookieOptions = {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "lax",
    };
    res.cookie("token_access", token, cookieOptions);
    return res.status(200).json({
      message: "Sesión iniciada con éxito",
      user: payload,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const logout = async (req, res) => {
  res
    .clearCookie("token_access", {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .json({
      message: "Usuario deslogeado",
    });
};
const user = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.deleteUser(id);
    return res.status(200).json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const myProfile = async (req, res) => {
  const { email } = req.user;
  try {
    const user = await userModel.findUser(email);
    if (!user) {
      return res.status(404).json({
        message: "No se encontro la sesion del usuario",
      });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastname, address, phone, email, password, isadmin } = req.body;

  const fieldsToUpdate = {};
  if (name) fieldsToUpdate.name = name;
  if (lastname) fieldsToUpdate.lastname = lastname;
  if (address) fieldsToUpdate.address = address;
  if (phone) fieldsToUpdate.phone = phone;
  if (email) fieldsToUpdate.email = email;
  if (password) fieldsToUpdate.password = password;
  if (isadmin !== undefined) fieldsToUpdate.isadmin = isadmin;

  try {
    const user = await userModel.updateUser(fieldsToUpdate, id);
    console.log(user);
    return res.status(200).json({
      message: "Usuario actualizado",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};
export const userController = {
  users,
  register,
  login,
  logout,
  user,
  deleteUser,
  myProfile,
  updateUser,
};
