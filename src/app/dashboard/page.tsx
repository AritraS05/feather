import Dashboard from '@/components/Dashboard'
import { db } from '@/db'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import { KindeUser } from '@kinde-oss/kinde-auth-nextjs/types'
import { redirect } from 'next/navigation'
import React from 'react'

const page = async () => {
    const {getUser} = getKindeServerSession()
    const user: KindeUser<Record<string, any>> =await  getUser();

    if(!user || !user.id) redirect('/auth-callback?origin=dashboard');

    const dbUser = await db.user.findFirst({
        where:{
            id:user.id
        }
    })

    if(!dbUser) redirect('/auth-callback?origin=dashboard');
  return (
    <Dashboard />
  )
}

export default page