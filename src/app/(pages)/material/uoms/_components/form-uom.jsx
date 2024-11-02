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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet"
import { createUom, getListUnit, updateUom } from "@/actions/masters"
import { useFetchOptions } from "@/hooks/use-options"
import { Combobox } from "@/components/Combobox"
import NumericInput from "@/helper/numeric-formatter"
import { LoadingButton } from '@/components/ui/loading-button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function FormUom({ data = null, savedAndCloseSheet = () => {}, savedSheet = () => {}, closeSheet = () => {} }) {
  // Fetching Options / Masters
  const unit = useFetchOptions(getListUnit, {showall: true})

  const initialValues = {
    from_unit_id:null,
    to_unit_id:null,
    conversion_factor:1,
    multiply_divided:'multiply'
  }
  const validationSchema = Yup.object().shape({
    from_unit_id: Yup.mixed().required('From unit is required.'),
    to_unit_id: Yup.mixed().required('To unit name is required.'),
    conversion_factor: Yup.number().required('Conversion Factor is required.'),
  });

  const form = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: data ? data : initialValues
  })

  React.useEffect(() => {
    form.reset({
      from_unit_id: data?.from_unit_id || null,
      to_unit_id: data?.from_unit_id || null,
      conversion_factor: data?.from_unit_id || 1,
      multiply_divided: data?.from_unit_id || 'multiply'
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
        res = await updateUom(payload)
      } else {
        delete payload.id
        res = await createUom(payload)
      }

      if(res.status !== 200){
        toast.error(`${res.error}`)
        return
      }

      savedAndCloseSheet()
      toast.success(`${data?.id ? 'Update' : 'Create'} Uom`)
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
          name="from_unit_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>From Unit</FormLabel>
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
          name="to_unit_id"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>To Unit</FormLabel>
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
          name="multiply_divided"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-2"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="multiply" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Multiply
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="divided" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Divided
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="conversion_factor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conversion Factor</FormLabel>
              <NumericInput initialValue={field.value} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
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