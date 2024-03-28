import { ImageUp, Upload } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'

interface FileUploaderProps {
  fieldChange: (FILES: File[]) => void
  mediaUrl: string
}

const FileUploader = ({ fieldChange, mediaUrl } : FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState('')

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    // Do something with the files
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='border rounded-md p-10 flex flex-col items-center gap-y-2'>
        {fileUrl ? (
          <div className='flex gap-x-4 items-center justify-start'>
            <img src={fileUrl} width={300} height={300} className='object-cover rounded-md' alt={file[0].name}/>

            <div>
              {file[0].name}
            </div>
          </div>
        ) : (
          <>
            <ImageUp className='w-16 h-16'/>

            <h3 className='text-xl font-bold'>Upload or drag photo here</h3>
            <p>(Accepted PNG, SVG, and JPG)</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUploader