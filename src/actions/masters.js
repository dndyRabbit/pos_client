"use server"

import { auth } from "@/app/_lib/auth"
import AxiosAPI from "@/services/Axios"
import { revalidatePath } from "next/cache"

export async function createIngredient(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.post(`/material/ingredient`, payload.data, config)
    revalidatePath(`/material/ingredients`)
    return { data:null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function updateIngredient(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.put(`/material/ingredient/${payload.id}`, payload.data, config)
    revalidatePath(`/material/ingredients`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function deleteIngredient(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.delete(`/material/ingredient/${payload.id}`, config)
    revalidatePath(`/material/ingredients`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function getListIngredients(params) {
  try {
    const config = {
      params,
      headers: await auth(),
    }

    const res = await AxiosAPI.get(`/material/ingredients`, config)
    const result = res.data.data?.result?.map(val => {
      return {
        ...val, 
        value: val.id,
        label: val.code
      }
    })
    
    return {
      pagination: res.data.data.pagination,
      result
    } || { pagination: null, result: []}
  } catch (err) {
    return { pagination: null, result: []}
  }
}

export async function getListUnit(params) {
  try {
    const config = {
      params: params,
      headers: await auth()
    }

    const res = await AxiosAPI.get(`/material/unit`, config)

    const result = res.data.data?.result?.map(val => {
      return {
        ...val, 
        value: val.id,
        label: val.code
      }
    })

    return {
      pagination: res.data.data.pagination,
      result
    } || { pagination: null, result: []}
  } catch (err) {
    return { pagination: null, result: []}
  }
}
