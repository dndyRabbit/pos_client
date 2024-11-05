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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { createOrUpdateFormula, createProduct, getListCategories, getListProducts, updateProduct } from "@/actions/inventories"
import { useFetchOptions } from "@/hooks/use-options"
import { Combobox } from "@/components/Combobox"
import { Input } from "@/components/ui/input"
import NumericInput from "@/helper/numeric-formatter"
import { Switch } from "@/components/ui/switch"
import { LoadingButton } from '@/components/ui/loading-button';
import { getListIngredients, getListUnit } from '@/actions/materials';
import { PlusCircle } from 'lucide-react';
import MultiSelectIngredient from './multi-select-ingredient';
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FormFormula({ data = null, savedAndCloseSheet = () => {} }) {
  // Fetching Options / materials
  const products = useFetchOptions(getListProducts, {showAll: true})
  const ingredients = useFetchOptions(getListIngredients, {showAll: true})
  const unit = useFetchOptions(getListUnit, {showAll: true})
  const categories = useFetchOptions(getListCategories, {showAll: true})

  const initialValues = {
    is_new_product: false,
    product_id: null,
    formulas: [],
    product:{
      name: "",
      sku: "",
      category_id:null,
      unit_id:null,
      cost_price:0,
      sale_price:0,
      supplier_id:null,
      use_stock_alert:false,
      min_stock:0,
      max_stock:0,
      stock_alert: 0
    }
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required.'),
    quantity: Yup.number().required('Quantity is required.'),
    category_id: Yup.number().required('Category is required.'),
    unit_id: Yup.number().required('Unit is required.'),
    sale_price: Yup.number().required('Sale price is required.'),
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
    // resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  const isNewProduct = form.watch("is_new_product", false) 
  const useStockAlert = form.watch("product.use_stock_alert", false) 
  const selectedIngredients = form.watch("formulas", []) 

  React.useEffect(() => {
    form.reset({
      is_new_product: data.id ? false : true,
      product_id: data.id,
      formulas: data.formulas?.length > 0 ? data?.formulas : [],
      product: {
        name: "",
        sku: "",
        category_id:null,
        unit_id:null,
        cost_price:0,
        sale_price:0,
        supplier_id:null,
        use_stock_alert:false,
        min_stock:0,
        max_stock:0,
        stock_alert: 0
      }
    })
  }, [data, form])

  async function onSubmit(values) {
    try {
      let payload = {
        data:{
          ...values,
          formulas: values.formulas?.map(val => {
            return {
              ingredient_id: val.id, 
              quantity_used: val.quantity_used, 
              unit_id: val.base_unit_id, 
              cost_unit: val.unit_price
            }
          })
        },
      }

      if(!values.is_new_product) delete payload.data.product

      const res = await createOrUpdateFormula(payload)

      if(res.status !== 200){
        toast.error(`${res.error}`)
        return
      }

      savedAndCloseSheet()
      toast.success(`Saved Formula`)
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
        <div className='flex w-full items-center justify-between my-4'>
          <SheetHeader>
            <SheetTitle>Create Formula / Recipe</SheetTitle>
            <SheetDescription>
              Create a formula / recipe of your product. Click save when you're done.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="gap-2 mt-4 sm:space-x-0">
            <div className='flex w-full items-center justify-end gap-2'>
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </SheetClose>
              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting && (
                  <LoadingButton />
                )}
                Save
              </Button>
            </div>
          </SheetFooter>
        </div>
        <div className='max-h-[73vh] w-full overflow-auto p-2 px-4'>
          <div className='grid grid-cols-4 space-x-4'>
            {/* Form Products */}
            <div className='w-full space-y-4 items-center'>
              {!isNewProduct &&
                <FormField
                  control={form.control}
                  name="product_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Select Product</FormLabel>
                      <Combobox
                        items={products.options}
                        selectedValue={field.value}
                        onSelect={field.onChange}
                        className='w-full'
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                /> 
              }
              <FormField
                control={form.control}
                name="is_new_product"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                      <FormLabel>New Product</FormLabel>
                      <FormDescription>
                        Create a new product for the formula
                      </FormDescription>
                    </div>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormItem>
                )}
              />

              {isNewProduct && <React.Fragment>
                <FormField
                  control={form.control}
                  name="product.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <Input
                        placeholder="e.g Macha Latte"
                        className="resize-none"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product.sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <Input
                        placeholder="e.g XXXX-XXX-XX-X"
                        className="resize-none"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product.unit_id"
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
                  name="product.category_id"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Category</FormLabel>
                      <Combobox
                        items={categories.options}
                        selectedValue={field.value}
                        onSelect={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product.cost_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cost Price</FormLabel>
                      <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product.sale_price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Price</FormLabel>
                      <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right"  {...field} onCallback={field.onChange} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product.supplier_id"
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
                  name="product.use_stock_alert"
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
                {useStockAlert && (<div className="grid grid-cols-3 space-x-2">
                  <FormField
                    control={form.control}
                    name="product.min_stock"
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
                    name="product.max_stock"
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
                    name="product.stock_alert"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Stock Alert</FormLabel>
                        <NumericInput initialValue={parseFloat(field.value)} placeholder="0" className="text-right" {...field} onCallback={field.onChange} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>)}
              </React.Fragment>}
            </div>
            
            {/* Form Ingredient */}
            <div className='w-full h-full space-y-4 col-span-3'>
              <FormField
                control={form.control}
                name="formulas"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Select Ingredients</FormLabel>
                    <MultiSelectIngredient
                      items={ingredients.options}
                      value={field.value}
                      onChange={field.onChange}
                      multiple={true}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              /> 
              <div className='border'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="truncate w-[250px]">Ingredient</TableHead>
                      <TableHead className="text-right w-[150px]">Qty used</TableHead>
                      <TableHead className="text-left w-[100px]">Unit</TableHead>
                      <TableHead className="text-right w-[200px]">Cost per Unit</TableHead>
                      <TableHead className="text-right w-[200px]">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  {selectedIngredients?.length > 0 ? 
                    <TableBody>
                      {selectedIngredients.map((val, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium truncate">{val.name}</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`formulas[${index}].quantity_used`}
                                render={({ field }) => (
                                  <FormItem>
                                    <NumericInput 
                                      {...field} 
                                      initialValue={parseFloat(field.value)} 
                                      placeholder="0" 
                                      className="text-right"  
                                      onCallback={(value) => {
                                        field.onChange(value)
                                      }} 

                                      doSomething={(value) => {
                                        const qtyUsed = form.watch(`formulas[${index}].quantity_used`, 0) 
                                        const amount = form.watch(`formulas[${index}].amount`, 0) 

                                        let costUnit = amount / qtyUsed
                                        if(qtyUsed && amount){
                                          form.setValue(`formulas[${index}].unit_price`, costUnit)
                                        } else {
                                          form.setValue(`formulas[${index}].unit_price`, 0)
                                        }
                                      }}
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>{val?.base_unit?.code}</TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`formulas[${index}].unit_price`}
                                render={({ field }) => (
                                  <FormItem>
                                    <NumericInput 
                                      {...field} 
                                      initialValue={field.value} 
                                      placeholder="0" 
                                      className="text-right"  
                                      onCallback={field.onChange} 
                                      doSomething={(value) => {
                                        const unitPrice = form.watch(`formulas[${index}].unit_price`, 0) 
                                        const amount = form.watch(`formulas[${index}].amount`, 0) 

                                        let qtyUsed = amount / unitPrice
                                        if(unitPrice && amount){
                                          form.setValue(`formulas[${index}].quantity_used`, qtyUsed)
                                        } else {
                                          form.setValue(`formulas[${index}].quantity_used`, 0)
                                        }
                                      }}
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`formulas[${index}].amount`}
                                render={({ field }) => (
                                  <FormItem>
                                    <NumericInput 
                                      {...field} 
                                      initialValue={parseFloat(field.value)} 
                                      placeholder="0" 
                                      className="text-right"  
                                      onCallback={field.onChange} 
                                    />
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody> : <TableBody>
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">No Data. Select ingredient first.</TableCell>
                      </TableRow>
                    </TableBody>
                  }

                  {selectedIngredients?.length ? <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>Total Cost Price</TableCell>
                      <TableCell className="text-right">{selectedIngredients?.reduce((acc, obj) => acc + obj.amount, 0)?.toLocaleString()}</TableCell>
                    </TableRow>
                  </TableFooter> : <></>}
                </Table>
              </div>
      
            </div>
          </div>
        </div>
      </form>
    </Form>
  )
}


