"use client"

import * as React from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { createUnit, getListUnit, updateUnit } from "@/actions/masters"
import { Input } from "@/components/ui/input"
import { LoadingButton } from '@/components/ui/loading-button';

export default function FormUnit({ data = null, savedAndCloseSheet = () => {}, savedSheet = () => {}, closeSheet = () => {} }) {
  const initialValues = {
    code: "",
    name: "",
    quantity: 1,
  }
  const validationSchema = Yup.object().shape({
    code: Yup.string().required('Unit code is required.'),
    name: Yup.string().required('Unit name is required.'),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: data ? data : initialValues
  })
  // const watchUseStockAlert = form.watch("use_stock_alert", false) 

  React.useEffect(() => {
    form.reset({
      code: data?.code || "",
      name: data?.name || "",
    })
  }, [data, form])

  async function onSubmit(values) {
    try {
      let payload = {
        data:{
          ...values
        },
        id: data?.id
      }
      let res

      if(data?.id){
        res = await updateUnit(payload)
      } else {
        delete payload.id
        res = await createUnit(payload)
      }

      if(res.status !== 200){
        toast.error(`${res.error}`)
        return
      }

      savedAndCloseSheet()
      toast.success(`${data?.id ? 'Update' : 'Create'} Unit`)
      form.reset()
    } catch (err) {
      console.log(err)
      toast.error(`Something went wrong`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit ID</FormLabel>
              <Input
                placeholder="e.g KG"
                className="resize-none"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Description</FormLabel>
              <Input
                placeholder="e.g Kilogram"
                className="resize-none"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
    
        <SheetFooter className="gap-2 pt-4 sm:space-x-0">
          <SheetClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </SheetClose>
          <Button disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && (
              <LoadingButton />
            )}
            Save
          </Button>
        </SheetFooter>
      </form>
    </Form>
  )
}
