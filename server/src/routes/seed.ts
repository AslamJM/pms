import express, { Request, Response } from 'express';
import { userModel } from '../models/user';
const router = express.Router();

router.get('/seed/:secret', async (req: Request<{ secret: string }>, res: Response) => {
    try {
        const secret = req.params.secret
        if (secret === "spm123@") {
            const admin = await userModel.create({
                username: 'admin',
                password: "spm123@A",
                role: "ADMIN"
            })

            const employee = await userModel.create({
                username: 'emp',
                password: "emp123@A",
                role: "EMPLOYEE"
            })

            return res.status(201).json({
                message: "admin users created successfully"
            })
        }
        else {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Failed"
        })
    }
})

export default router;