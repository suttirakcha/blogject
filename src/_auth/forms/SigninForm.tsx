import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signinSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { useSignInAccount } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"

const SigninForm = () => {
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    const isLoggedIn = await checkAuthUser()

    if (!session) return toast({ 
      title: "Email or password is incorrect, please try again.",
      variant: "destructive"
    })

    if (isLoggedIn){
      form.reset();
      navigate('/')
    } else {
      toast({
        title: "Failed to log in, please try again.",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <div className="mb-8 flex flex-col gap-y-2 items-center">
        <h1 className="text-3xl font-bold">Log in to Blogject</h1>
        <p className="text-gray-400">Please enter your details</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Email</FormLabel>
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
              <FormLabel className="text-base">Password</FormLabel>
              <FormControl>
                <Input className="bg-gray-600" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-y-4 items-center">
          <Button type="submit" className="text-base text-white" disabled={isSigningIn}>
            {isSigningIn ? 'Signing in...' : 'Sign in'}
          </Button>
          <p className="text-gray-400">Don't have an account? <Link to="/sign-up" className="text-indigo-400">Sign up</Link></p>
        </div>
      </form>
    </Form>
  )
}

export default SigninForm