import React, { useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { useRouter } from 'next/router';

interface TextEditorState {
  text: string;
}

function CreatePost () {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(''))
  );
  const router = useRouter()

  const toolbarOptions = {
    options: ['inline', 'fontSize', 'list']
  }

  function handleChange(newState: EditorState) {
    setEditorState(newState);
  }

  const handleSavePost = async () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent())
    const jsonString = JSON.stringify(rawContentState)
    const jsonParse = JSON.parse(jsonString)
    
    const response = await axios.post('http://localhost:3000/api/posts', { text: jsonParse.blocks[0].text })

    if (response.status === 201) router.push('/')
  }

  return (
    <div className='w-[70%] m-auto min-h-[200px] flex flex-col items-center gap-y-5 mt-5'>
      <h1>Write a new post</h1>
      <div className='w-full border-[1px] border-gray-400 p-2'>
        <Editor 
          editorState={editorState} 
          onEditorStateChange={handleChange}
          toolbar={toolbarOptions}
          placeholder='You can write a new post...'
        />
      </div>
      
      <button 
        className='self-end px-[30px] py-[15px] bg-gray-800 text-white hover:bg-gray-700'
        onClick={handleSavePost}
      >Save</button>
    </div>
    
  );
}

export default CreatePost;
