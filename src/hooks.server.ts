import { getUserBySessionToken } from '$db/sqllite/users';
import type { Handle } from '@sveltejs/kit'
// import { db } from '$lib/database'

export const handle: Handle = async ({ event, resolve }) => {
  // get cookies from browser
  const session = event.cookies.get('session');

  if (!session) {
    // if there is no session load page as normal
    return await resolve(event);
  }

  // find the user based on the session
  const user = await getUserBySessionToken(session);
  // console.log(user)

  // if `user` exists set `events.local`
  if (user) {
    event.locals.user = {
      username: user.username,
      fullname: user.fullname || '',
      isAdmin: user.isAdmin
    }
  }

  // load page as normal
  return await resolve(event)
}
