import { useState } from 'react';
import ReactQuill, { QuillDeltaStatic } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorState {
  content: string;
}

function TextEditor() {
  const [state, setState] = useState<TextEditorState>({ content: '' });

  function handleChange(value: string | QuillDeltaStatic) {
    setState({ content: value.toString() });
  }

  return (
    
    <ReactQuill
      value={state.content}
      onChange={handleChange}
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
      }}
      formats={[
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'color',
        'background',
        'align',
        'list',
        'bullet',
        'link',
        'image',
      ]}
      placeholder="Enter your text here..."
    />
  );
}

export default TextEditor;
