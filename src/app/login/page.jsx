"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LucideEye, LucideEyeOff } from "lucide-react";

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form"
import * as yup from "yup";
import { LoadingButton } from "@/components/ui/loading-button";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCurrentUser, setMenus } from "@/utils/cookies";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [show, setShow] = useState(false)

  const validation = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const form = useForm({
    resolver: yupResolver(validation),
    defaultValues: {
      email: "",
      password: ''
    },
  });

  const onSubmit = async (values) => {
    try {
      setLoading(true)

      let payload = {
        ...values
      }

      const res = await axios.post('/api/login', payload)

      if(res?.status === 200){
        const menus = res?.data?.data?.menu
        const userData = res.data.data
        delete userData.token
        delete userData.menu

        setMenus(menus)
        setCurrentUser(userData)
        router.push('dashboard')
        toast.success('Login Successfully.')
      }

      setLoading(false)
    } catch (err) {
      console.error("Login error:", err);
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen min-w-full items-center justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-[500px] md:mx-14">
            <CardHeader>
              <CardTitle className="text-xl text-center">Rabbit Dev</CardTitle>
              <CardDescription className="text-sm">Point-of-sale (POS) systems.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <Label>Email</Label>
                      <Input type="email" placeholder="example@example.com" {...field} />
                      <small className="text-red-500 capitalize">{form.formState.errors?.email?.message}</small>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-1.5">
                      <Label>Password</Label>
                      <Input type={`${show ? "text" : "password"}`} placeholder="Password..." {...field}  />
                      <small className="text-red-500 capitalize">{form.formState.errors?.password?.message}</small>
                      <div className="flex items-center space-x-1 cursor-pointer" onClick={() => setShow(!show)}>
                        {!show ? <>
                          <LucideEye size={14} /> 
                          <span className="text-xs">Show Password</span>
                        </> : <>
                          <LucideEyeOff size={14} /> 
                          <span className="text-xs">Hide Password</span>
                        </>}
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end ">
              <Button type="submit" disabled={loading}>
                {loading ? <>
                  <LoadingButton />
                  Loading...
                </> : 'Login'}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
