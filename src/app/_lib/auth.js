"use server"

import { cookies } from "next/headers"

export const auth = async () => {
  const cookieStore = cookies()
  const access_token = cookieStore.get('access_token')?.value 
  const company_id = cookieStore.get('X-companies')?.value 

  return {
    Authorization: `bearer ${access_token}`,
    ['X-companies']: Number(company_id)
  }
}