import { useState } from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
} from 'draft-js';
// import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import 'draft-js/dist/Draft.css';

interface TextEditorState {
  editorState: EditorState;
}

export default function TextEditor() {
  const [state, setState] = useState<TextEditorState>({
    editorState: EditorState.createEmpty(),
  });

  function handleChange(editorState: EditorState) {
    setState({ editorState });
  }

  function handleSave() {
    const contentState = state.editorState.getCurrentContent();
    // const html = stateToHTML(contentState);
    // console.log(html);
  }

  return (
    <>
      <Editor
        editorState={state.editorState}
        onChange={handleChange}
        placeholder="Enter your text here..."
      />
      <button onClick={handleSave}>Save</button>
    </>
  );
}
