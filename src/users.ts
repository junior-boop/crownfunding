import { Hono } from 'hono'
import Prisma from './prismaAdapte'
import generateHashPassword from './hashpassword'
import Metadata_images from './image_name'
import { Image_object } from './type'
import { sign, verify, decode } from 'hono/jwt'

const users = new Hono<{ Bindings: CloudflareBindings }>()
const sercetKey = generateHashPassword("jeVitPourTeGlorifier")
users.get('/', async ({env, json }) => {
    const prisma = Prisma(env)

    try{
        const user_all = await prisma.user.findMany()
    
        return json({message: 'Users found', data: user_all})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})

users.get('/token', async({json, req, res, env, status}) => {
    try{
        const {v} = req.query()
        const prisma = Prisma(env)
        
        const data = await prisma.user.findFirst({
            where : {
                token : v
            }
        })
        
        return json({
            user : data, 
            statut : 1
        })
    } catch (error) {
        return json({
            user : {}, 
            statut : 4
        })
    }
})

users.post('/login', async({json, status, req, env}) => {
    const value = req.formData()
    const prisma = Prisma(env)
    const data = await prisma.user.findUnique({
        where : {
            email : (await value).get("email")?.toString() as string,
        }
    })

    console.log(data)

    try{
    
        if(data !== null){
            return json({
                user : data,
                statut : 1
            })
        } else {
            return json({
                user : {},
                statut : 3
            })
        }
    } catch (error) {
        return json({
            error : error, 
            status : 4
        })
    }

    return json({
        teste : "je suis dans le place"
    })
})

users.get('/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param()

    const prisma = Prisma(env)

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })
    
        return json({message: 'User found', data: user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})

users.post('/new', async ({env, text, req, res, json, status }) => {
    const value = await req.formData() 
      

    const payload = {
        email: value.get('email') as string,
        firstName : value.get('firstName') as string,
        lastName: value.get('lastName') as string,
        exp: Math.floor(Date.now() / 1000) + 60 * 30,
    }

    const token = await sign(payload, sercetKey)

    const prisma = Prisma(env)
    const number = '1234567890'
    const randomNum = Array.from({length : 2}, () => number[Math.floor(Math.random() * number.length)]).join('')
    const username = value.get('firstName')?.toString().split(' ')[0] + value.get('lastName')?.toString().split(' ')[0] + randomNum
    try{
        const new_user = await prisma.user.create({
                data : {
                    username, 
                    email: value.get('email') as string,
                    firstName : value.get('firstName') as string,
                    lastName: value.get('lastName') as string,
                    passwordHash : generateHashPassword(value.get('password') as string),
                    token
                }
         })
    
        return json({message: 'User created', data: new_user, token, id: new_user.id})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }

})

users.put('/update/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param() 
    const value = await req.formData()

    const prisma = Prisma(env)

    try{
        const updated_user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                email: value.get('email') as string,
                firstName : value.get('firstName') as string,
                lastName: value.get('lastName') as string,
            }
        })
    
        return json({message: 'user updated', data: updated_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})

users.put('/update/password/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param()
    const value = await req.formData()

    const prisma = Prisma(env)

    try{
        const updated_user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                passwordHash: generateHashPassword(value.get('password') as string),
            }
        })
    
        return json({message: 'user updated', data: updated_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})

users.put('/update/image/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param()
    const value = await req.formData()
    const bucket = env.MY_BUCKET

    const prisma = Prisma(env)

    const { images } = (await req.parseBody()) as { images: File };

    try{
        const metadata = Metadata_images(images) as Image_object;

        const object = {
            ...metadata,
            path: "/" + metadata?.name,
        };

        const updated_user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                profilePictureUrl: object.name,
            }
        })

        await bucket.put(object.name as string, images, {
            customMetadata: {
              name: object.name,
              size: object.size,
              type: object.minetype,
              lastModified: object.lastmodified,
            },
            httpMetadata: {
              contentType: object.minetype,
            },
          });
    
        return json({message: 'user updated', data: updated_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }

})

users.delete('/delete/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param()

    const prisma = Prisma(env)

    try{
        const deleted_user = await prisma.user.delete({
            where: {
                id: id
            }
        })
    
        return json({message: 'user deleted', data: deleted_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }


})


export default users;