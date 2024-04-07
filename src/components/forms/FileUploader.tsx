import { ImageUp, X } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { toast } from '@/components/ui/use-toast'

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void
  mediaUrl: string
}

const FileUploader = ({ fieldChange, mediaUrl } : FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl)

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    if (acceptedFiles[0].size > 1024 * 512){
      toast({
        title: 'The maximum file size exceeds 512KB, please upload the image with the smaller file size.',
        variant: 'destructive'
      })
    } else {
      setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }
  }, [file])
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })

  const resetImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFileUrl("")
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='border rounded-md p-10 flex flex-col items-center gap-y-2 relative'>
        {fileUrl ? (
          <div className='items-center'>
            <img src={fileUrl} width={240} height={240} className='object-cover rounded-md' alt={fileUrl}/>
            <X className='absolute top-4 right-4 cursor-pointer' onClick={resetImage}/> 
          </div>
        ) : (
          <>
            <ImageUp className='w-16 h-16'/>

            <h3 className='text-xl font-bold'>Upload or drag photo here</h3>
            <p className='text-center text-sm'>(Accept PNG, SVG, and JPG) <br/> Maximum file size: 512KB</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUploader