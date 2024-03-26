import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
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
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/lib/validation"
import { Link } from "react-router-dom"

const SignupForm = () => {

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name:"",
      username: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = (values: z.infer<typeof signupSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <div className="mb-8 flex flex-col gap-y-2 items-center">
        <h1 className="text-3xl font-bold">Create an account</h1>
        <p className="text-gray-400">To access Blogject, please create an account.</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input className="bg-gray-600" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-y-3 items-center">
          <p className="text-gray-400">Already have an account? <Link to="/sign-in" className="text-indigo-400">Sign in</Link></p>
          <Button type="submit">Create an account</Button>
        </div>
      </form>
    </Form>
  )
}

export default SignupForm