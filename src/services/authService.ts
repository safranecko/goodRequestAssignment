import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {models} from '../db'
import {USER_ROLE} from '../utils/enums'

const {User} = models

export const registerUser = async ({
                                       name,
                                       surname,
                                       nickName,
                                       email,
                                       age,
                                       password,
                                       role
                                   }: {
    name: string
    surname: string
    nickName?: string
    email: string
    age: number
    password: string
    role?: USER_ROLE
}) => {
    const existingUser = await User.findOne({where: {email}})
    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name,
        surname,
        nickName,
        email,
        age,
        password: hashedPassword,
        role: role ?? USER_ROLE.USER
    })

    const token = jwt.sign(
        {id: newUser.id, role: newUser.role},
        process.env.JWT_SECRET!,
        {expiresIn: '1h'}
    )

    return {
        user: {
            id: newUser.id,
            email: newUser.email,
            role: newUser.role
        },
        token
    }
}

export const loginUser = async ({
                                    email,
                                    password
                                }: {
    email: string
    password: string
}) => {
    const user = await User.findOne({where: {email}})

    if (!user) {
        throw new Error('Invalid email or password')
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Invalid email or password')
    }

    const token = jwt.sign(
        {id: user.id, role: user.role},
        process.env.JWT_SECRET!,
        {expiresIn: '1h'}
    )

    return {
        user: {
            id: user.id,
            email: user.email,
            role: user.role
        },
        token
    }
}
