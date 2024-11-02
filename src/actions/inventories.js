"use server"

import { auth } from "@/app/_lib/auth"
import AxiosAPI from "@/services/Axios"
import { revalidatePath } from "next/cache"

export async function createProduct(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.post(`/inventories/product`, payload.data, config)
    revalidatePath(`/inventories/products`)
    return { data:null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function updateProduct(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.put(`/inventories/product/${payload.id}`, payload.data, config)
    revalidatePath(`/inventories/products`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function deleteProduct(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.delete(`/inventories/product/${payload.id}`, config)
    revalidatePath(`/inventories/products`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function getListProducts(params) {
  try {
    const config = {
      params,
      headers: await auth(),
    }

    const res = await AxiosAPI.get(`/inventories/product`, config)
    const result = res.data.data?.result?.map(val => {
      return {
        ...val, 
        value: val.id,
        label: val.name
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

export async function createCategories(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.post(`/inventories/categories`, payload.data, config)
    revalidatePath(`/inventories/categories`)
    return { data:null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function updateCategories(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.put(`/inventories/categories/${payload.id}`, payload.data, config)
    revalidatePath(`/inventories/categories`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    console.log(error.data)
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function deleteCategories(payload) {
  try {
    const config = {
      headers: await auth(),
    }

    const res = await AxiosAPI.delete(`/inventories/categories/${payload.id}`, config)
    revalidatePath(`/inventories/categories`)
    return { data: null, message:'OK!', status: res.status, error: null }
  } catch (err) {
    const error = err.response
    return { data:null, message:'ERR!', status: error?.status, error: error?.data?.message }
  }
}
export async function getListCategories(params) {
  try {
    const config = {
      params: params,
      headers: await auth()
    }

    const res = await AxiosAPI.get(`/inventories/categories`, config)

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
