import dynamic from 'next/dynamic'
const QuillNoSSRWrapper = dynamic(import('react-quill'), {	
	ssr: false,
	loading: () => <p>Loading ...</p>,
	})

    const modules = {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline',  'blockquote'],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
          ],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        },
      }

      const formats = [
        'header',
        'font',
        'size',
        'bold',
        'italic',
        'underline',
        
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
        'video',
      ]

export default function JobDescription() {
    return(
    <div className='flex  flex-col w-1/2 border-r-2 border-t-2 h-screen'>
        <QuillNoSSRWrapper modules={modules} formats={formats} theme="snow" />
        <button
                    type="button"
                    className="inline-flex justify-center m-4 px-4 py-2 w-40 text-sm font-medium text-white bg-black border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    
                  >
                    Save changes
                  </button>
        </div>)
}