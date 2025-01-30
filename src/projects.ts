import { Hono } from 'hono'
import Prisma from './prismaAdapte'

const project = new Hono<{ Bindings: CloudflareBindings }>()


project.get('/', async ({env, json }) => {
    const prisma = Prisma(env)

    try{
        const project_all = await prisma.project.findMany()
    
        return json({message: 'Project found', data: project_all})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})


project.get('/:id', async ({env, text, req, res, json, status }) => {
    const { id } = req.param()

    const prisma = Prisma(env)

    try{
        const Project = await prisma.project.findUnique({
            where: {
                id: id
            }
        })
    
        return json({message: 'Project found', data: Project})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})


project.post('/new', async ({env, req, json }) => {
    const value = await req.formData()   

    const prisma = Prisma(env)
    try{
        const new_user = await prisma.project.create({
            data: {
                creatorId: value.get('userId') as string,
                title: value.get('title') as string,
                description : value.get('description') as string,
                category : value.get('category') as string,
                startDate : value.get('startDate') as string,
                endDate : value.get('endDate') as string,
                goalAmount : parseFloat(value.get('goalAmount') as string),
                currentAmount : parseFloat(value.get('currentAmount') as string),
            }
        })
    
        return json({message: 'Project created', data: new_user})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
  
})


project.put('/update/:id', async ({env, req, json }) => {
    const { id } = req.param() 
    const value = await req.formData()

    const prisma = Prisma(env)

    try{
        const updated_project = await prisma.project.update({
            where: {
                id: id
            },
            data: {
                title: value.get('title') as string,
                description : value.get('description') as string,
                category : value.get('category') as string,
                startDate : value.get('startDate') as string,
                endDate : value.get('endDate') as string,
                goalAmount : parseFloat(value.get('goalAmount') as string),
                currentAmount : parseFloat(value.get('currentAmount') as string),
            }
        })
    
        return json({message: 'Project updated', data: updated_project})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }
})


project.delete('/delete/:id', async ({env, req, res, json }) => {
    const { id } = req.param()

    const prisma = Prisma(env)

    try{
        const deleted_project = await prisma.project.delete({
            where: {
                id: id
            }
        })
    
        return json({message: 'Project deleted', data: deleted_project})
    } catch (e){
        return json({ message : 'error', data : e, code : 400})
    }


})

export default project;