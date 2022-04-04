import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className='flex flex-col align-center p-20 border-2 m-4 text-gray-700 border-dashed rounded-md bg-gray-50' {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ?
          <p>Glissez les fichiers ici ...</p> :
          <p>Glissez les fichiers ici, ou cliquez pour séléctionner des fichiers</p>
      }
    </div>
  )
}