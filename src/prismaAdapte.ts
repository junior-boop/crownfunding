import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'


export default function Prisma(env: CloudflareBindings){
    const adapter = new PrismaD1(env.DB)
    const prisma = new PrismaClient({ adapter })
    
    return prisma
}