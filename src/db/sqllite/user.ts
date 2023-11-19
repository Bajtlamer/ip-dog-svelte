import { db } from '$lib/db.server'
import type { User, UserInterface } from '../../models/user'



export const addUser = async (user: UserInterface) => {
  
  const found = await db.user.findUnique({
    where: {
      username: user.username
    }
  })

  console.log('found:',found);

  if(found) {
  return await db.user.update({
      where: {
        username: user.username,
      }, 
        data: user
      }    
    )
  }

  return await db.user.create({
    data: user
  })
}

export const getUserByEmail = async (email: string) => {
  return await db.user.findFirst({
    where: {
      email
    }
  })
}

export const getUserByName = async (username: string) => {
  return await db.user.findUnique({
    where: {
      username
    }
  })
}

export const getUserBySessionToken = async (token: string) => {
  return await db.user.findFirst({
    where: {
      token
    }
  })
}

export const updateUser = async (user: UserInterface) => {
  return await db.user.update({
    where: {
      username: user.username,
    }, 
      data: user
    }    
  )
}

export const updateUsersToken = async (user: UserInterface) => {
  return await db.user.update({
    where: {
      username: user.username,
    }, 
      data: {token: user.token}
    }    
  )
}