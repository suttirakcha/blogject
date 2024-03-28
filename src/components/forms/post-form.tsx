import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { signinSchema } from "@/lib/validation"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { postSchema } from "@/lib/validation"

const PostForm = () => {

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
      image: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    console.log(values)
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Title <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Content <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Textarea className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Upload images</FormLabel>
              <FormControl>
                <Textarea className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="button" className="text-base bg-indigo-600 hover:bg-indigo-400 text-white" >
          Cancel
        </Button>
        <Button type="submit" className="text-base bg-indigo-600 hover:bg-indigo-400 text-white" >
          Create post
        </Button>
      </form>
    </Form>
  )
}

export default PostForm