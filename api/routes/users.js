import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

/*
router.get("/prueba",verifyToken,(req,res,next)=>{
    res.send("Hola estoy autenticado")
})

router.get("/prueba/:id",verifyUser,(req,res,next)=>{
    res.send("Hola estoy autenticado y puedo eliminar")
})
router.get("/admin/:id",verifyAdmin,(req,res,next)=>{
    res.send("Hola ADMIN ESTA AUTENTICADO Y PUEDE HACER TODAS LAS ACCIIONES")
})
*/



//UPDATE

router.put("/:id", verifyUser,updateUser);

//Delete

router.delete("/:id", verifyUser,deleteUser);

//GET

router.get("/:id", verifyUser, getUser);

//GET ALL

router.get("/", verifyAdmin, getAllUser);

export default router;