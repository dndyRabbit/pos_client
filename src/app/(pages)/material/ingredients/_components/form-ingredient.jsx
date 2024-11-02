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
import { Icons } from "@/components/icons"
import { createIngredient, getListUnit, updateIngredient } from "@/actions/masters"
import { useFetchOptions } from "@/hooks/use-options"
import { Combobox } from "@/components/Combobox"
import { Input } from "@/components/ui/input"
import NumericInput from "@/helper/numeric-formatter"
import { Switch } from "@/components/ui/switch"
import { LoadingButton } from '@/components/ui/loading-button';

export default function FormIngredient({ data = null, savedAndCloseSheet = () => {}, savedSheet = () => {}, closeSheet = () => {} }) {
  // Fetching Options / Masters
  const unit = useFetchOptions(getListUnit, {showall: true})

  const initialValues = {
    name: "",
    quantity: 1,
    unit_id:null,
    unit_price:0,
    supplier_id:null,
    use_stock_alert:false,
    min_stock:0,
    max_stock:0,
    stock_alert: 0
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Ingredient name is required.'),
    quantity: Yup.number().required('Quantity is required.'),
    unit_price: Yup.number().required('Unit price is required.'),
    use_stock_alert: Yup.boolean(),
    min_stock: Yup.number()
      .when('use_stock_alert', {
        is: true,
        then: () => Yup.number()
          .required('Minimum stock is required.'),
        otherwise: () => Yup.number().notRequired(),
      }),
    max_stock: Yup.number()
      .when('use_stock_alert', {
        is: true,
        then: () => Yup.number()
          .required('Maximum stock is required.')
          .typeError('Maximum stock must be a number')
          .positive('Maximum stock must be a positive number')
          .moreThan(Yup.ref('min_stock'), 'Maximum stock must be greater than minimum stock'),
        otherwise: () => Yup.number().notRequired(),
      }),
    stock_alert: Yup.number()
      .when('use_stock_alert', {
        is: true,
        then: () => Yup.number()
          .required('Stock alert is required.')
          .typeError('Maximum stock must be a number')
          .positive('Stock alert cant be 0')
          .lessThan(Yup.ref('max_stock'), 'Stock alert must be less than maximum stock'),
        otherwise: () => Yup.number().notRequired(),
      }),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: data ? data : initialValues
  })
  const watchUseStockAlert = form.watch("use_stock_alert", false) 

  React.useEffect(() => {
    form.reset({
      name: data?.name || "",
      quantity: data?.quantity || 0,
      unit_id: data?.unit_id || null,
      unit_price: data?.unit_price || 0,
      supplier_id: data?.supplier_id || null,
      use_stock_alert: data?.stock_alert ? true : false,
      min_stock: data?.stock_alert?.min_stock || 0,
      max_stock: data?.stock_alert?.max_stock || 0,
      stock_alert:  data?.stock_alert?.stock_alert || 0
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
        res = await updateIngredient(payload)
      } else {
        delete payload.id
        res = await createIngredient(payload)
      }

      if(res.status !== 200){
        toast.error(`${res.error}`)
        return
      }

      savedAndCloseSheet()
      toast.success(`${data?.id ? 'Update' : 'Create'} Ingredient`)
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ingredient Name</FormLabel>
              <Input
                placeholder="e.g Sugar"
                className="resize-none"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <NumericInput initialValue={field.value} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Unit</FormLabel>
              <Combobox
                items={unit.options}
                selectedValue={field.value}
                onSelect={field.onChange}
              />
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="unit_price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit Price</FormLabel>
              <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supplier_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Supplier</FormLabel>
              <Combobox
                items={[]}
                selectedValue={field.value}
                onSelect={field.onChange}
                placeholder="Select supplier..."
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="use_stock_alert"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Active Stock Alert</FormLabel>
                <FormDescription>
                  If active, the system will provide notification if the quantity of material matches the stock alert that has been set.
                </FormDescription>
              </div>
              <Switch
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormItem>
          )}
        />
        {watchUseStockAlert && (<div className="grid grid-cols-3 space-x-2">
          <FormField
            control={form.control}
            name="min_stock"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Min. Stock</FormLabel>
                <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="max_stock"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Max. Stock</FormLabel>
                <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock_alert"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Stock Alert</FormLabel>
                <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right" {...field} onCallback={field.onChange} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>)}
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
