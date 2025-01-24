import { Hono } from 'hono'
import Prisma from './prismaAdapte'
import generateHashPassword from './hashpassword'

const users = new Hono<{ Bindings: CloudflareBindings }>()

users.get('/', ({env, text, json}) => {
    const tableau = generateHashPassword('azerty1234')
    
    return json({message: 'user created', data: tableau})
})

users.post('/new', async ({env, text, req, res, json, status }) => {
    const value = await req.formData()   

    const prisma = Prisma(env)
    const number = '1234567890'
    const randomNum = Array.from({length : 2}, () => number[Math.floor(Math.random() * number.length)]).join('')
    const username = value.get('firstName')?.toString().split(' ')[0] + value.get('lastName')?.toString().split(' ')[0] + randomNum
    try{
        const new_user = await prisma.user.create({
            data: {
                username: username,
                email: value.get('email') as string,
                firstName : value.get('firstName') as string,
                lastName: value.get('lastName') as string,
                passwordHash: generateHashPassword(value.get('password') as string),
    
            }
        })
    
        return json({message: 'user created', data: new_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
  
})


export default users;



function generateRandomAttribute(letter) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@_';
    const randomChars = Array.from(
      { length: 5 }, 
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join('');
    
    return `${randomChars}`;
  }
  
  // Exemple d'utilisation
  const randomAttr = generateRandomAttribute('A');
  console.log(randomAttr);