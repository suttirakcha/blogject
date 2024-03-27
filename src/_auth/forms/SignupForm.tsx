import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { signupSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queries-and-mutations"
import { useUserContext } from "@/providers/auth-provider"

const SignupForm = () => {
  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()
  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    const newUser = await createUserAccount(values)

    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    const isLoggedIn = await checkAuthUser()

    if (!newUser) return toast({ title: "Failed to sign up, please try again." })
    if (!session) return toast({ title: "Failed to sign in, please try again." })

    if (isLoggedIn){
      form.reset();
      navigate('/')
    } else {
      toast({
        title: "Failed to sign up, please try again."
      })
    }
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
              <FormLabel className="text-base">Username</FormLabel>
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
          <Button type="submit" className="text-base bg-indigo-600 hover:bg-indigo-400 text-white" disabled={isCreatingAccount}>
            {isCreatingAccount ? 'Creating...' : 'Create an account'}
          </Button>
          <p className="text-gray-400">Already have an account? <Link to="/sign-in" className="text-indigo-400">Sign in</Link></p>
        </div>
      </form>
    </Form>
  )
}

export default SignupForm