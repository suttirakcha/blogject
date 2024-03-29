import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "@/components/ui/use-toast"
import { postSchema } from "@/lib/validation"
import FileUploader from "./FileUploader"
import { Models } from "appwrite"
import { useUserContext } from "@/providers/auth-provider"
import { useCreatePost } from "@/lib/react-query/queries-and-mutations"

interface PostFormProps {
  post?: Models.Document
}

const PostForm = ({ post } : PostFormProps) => {

  const { mutateAsync: createPost, isPending: isCreating } = useCreatePost()
  const { user } = useUserContext()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post ? post.title : "",
      content: post ? post.content : "",
      file: [],
      tags: post ? post.tags.join(',') : ''
    },
  })

  const onSubmit = async (values: z.infer<typeof postSchema>) => {
    const newPost = await createPost({...values, userId: user.id })

    if (!newPost){
      toast({
        title: 'There was an error creating the post, please try again.',
        variant: 'destructive'
      })
    } else {
      toast({
        title: 'Successfully created the post',
      })
      navigate('/')
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
              <FormLabel className="text-base">Upload images</FormLabel>
              <FormControl>
                <FileUploader 
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base">Tags</FormLabel>
              <FormDescription>Separate tags using the comma ( , )</FormDescription>
              <FormControl>
                <Input className="bg-gray-600" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-4 justify-end">
          <Button type="button" variant="secondary" disabled={isCreating}>
            Cancel
          </Button>
          <Button type="submit" className="text-base bg-indigo-600 hover:bg-indigo-400 text-white" disabled={isCreating}>
            {isCreating ? 'Creating...' : 'Create post'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default PostForm