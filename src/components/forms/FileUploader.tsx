import { ImageUp, X } from 'lucide-react'
import React, { useState, useCallback } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'

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
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
  }, [file])
  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.png', '.jpeg', '.jpg', '.svg']
    }
  })

  const checkFileSize = (size: number): string => {
    if (size >= (1024 * 1024)){
      return `${(size / (1024 * 1024)).toFixed(2)}MB`
    } else if (size >= 1024){
      return `${(size / 1024).toFixed(2)}KB`
    } else {
      return `${size.toFixed(2)}B`
    }
  }

  const resetImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFileUrl("")
  }

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <div className='border rounded-md p-10 flex flex-col items-center gap-y-2 relative'>
        {fileUrl ? (
          <div className='flex gap-x-4 items-center'>
            <img src={fileUrl} width={80} height={80} className='object-cover rounded-md' alt={file[0].name}/>
            <div>
              <p className='font-bold'>{file[0].name}</p>
              <p className='text-sm'>{checkFileSize(file[0].size)}</p>
            </div>

            <X className='absolute top-4 right-4 cursor-pointer' onClick={resetImage}/>
          </div>
        ) : (
          <>
            <ImageUp className='w-16 h-16'/>

            <h3 className='text-xl font-bold'>Upload or drag photo here</h3>
            <p>(Accept PNG, SVG, and JPG)</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUploader