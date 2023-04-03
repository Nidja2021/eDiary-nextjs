import React, { useState } from 'react';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Post } from '@prisma/client';

interface IPost {
  post: Post
}

function UpdatePost({ post } : IPost) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(post.text.toString()))
  );
  const router = useRouter()

  const splitDate = post.createdAt.toString().split('T')

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
    
    const response = await axios.put(`http://localhost:3000/api/posts/${post.id}`, { text: jsonParse.blocks[0].text })

    if (response.status === 200) router.push('/')
  }

  return (
    <div className='w-[70%] m-auto min-h-[200px] flex flex-col items-center gap-y-5 mt-5'>
      <h1 className='font-bold text-[24px]'>{`Date: ${splitDate[0]}`}</h1>
      <div className='w-full border-[1px] border-gray-400 p-2'>
        <Editor 
          editorState={editorState} 
          onEditorStateChange={handleChange}
          toolbar={toolbarOptions}
        />
      </div>
      
      <button 
        className='self-end px-[30px] py-[15px] bg-gray-800 text-white hover:bg-gray-700'
        onClick={handleSavePost}
      >Save</button>
    </div>
    
  );
}

export default UpdatePost;
