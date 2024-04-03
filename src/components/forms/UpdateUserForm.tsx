import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { userSchema } from "@/lib/validation"
import FileUploader from "./FileUploader"
import { Models } from "appwrite"
import { useUserContext } from "@/providers/auth-provider"
import { useCreatePost, useUpdatePost, useUpdateUser } from "@/lib/react-query/queries-and-mutations"

interface UserFormProps {
  user?: Models.Document
}

const UpdateUserForm = ({ user } : UserFormProps) => {

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user ? user?.name : "",
      email: user ? user?.email : "",
      bio: user ? user?.bio : "",
      file: [],
    },
  })

  const onSubmit = async (values: z.infer<typeof userSchema>) => {
    if (user){
      const updatedUser = await updateUser({
        ...values,
        id: user.$id,
        imageId: user?.imageId,
        imageUrl: user?.imageUrl
      })

      if (!updatedUser){
        toast({
          title: 'There was an error updating the user, please try again.',
          variant: 'destructive'
        })
      } else {
        toast({
          title: 'Successfully updated the user',
        })
        navigate(`/`)
      }
    }
  }

  return (
    <Form {...form}>
      {/* <div className="mb-8 flex flex-col gap-y-2 items-center">
        <h1 className="text-3xl font-bold">Sign in to Blogject</h1>
        <p className="text-gray-400">Please enter your details</p>
      </div> */}

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Username <span className="text-red-500">*</span></FormLabel>
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
                <Input className="bg-gray-600" {...field} readOnly/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Bio</FormLabel>
              <FormControl>
                <Textarea className="bg-gray-600 h-[200px] resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Upload image</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={user?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-4 justify-end">
          <Button type="button" variant="secondary" disabled={isUpdating}>
            Cancel
          </Button>
          <Button type="submit" className="text-base bg-indigo-600 hover:bg-indigo-400 text-white" disabled={isUpdating}>
            {isUpdating ? 'Updating...' : 'Update user'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateUserForm