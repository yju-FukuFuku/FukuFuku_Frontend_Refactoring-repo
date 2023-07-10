import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import './writepage.module.scss'
import { styled } from 'styled-components';
import { Button, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StyledTextField = styled(TextField) (
  {
    '& .MuiInputBase-root': {
      height: '100px',
      fontSize: '40px',
      fontWeight: 600
    }
  }
)

const StyledTagTextField = styled(TextField) (
  {
    '& .MuiInputBase-root': {
      height: '50px',
    }
  }
)

type Tag = {
  name: string;
}[]

const WritePage = () => {
  const [title, setTitle] = useState<string>("")
  const [tag, setTag] = useState<Tag>([] as Tag)
  const [tagValue, setTagValue] = useState<string>("")

  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (editorRef.current) {
      const defaultValue = editorRef.current.getInstance();
      defaultValue.setMarkdown('');
    }
  }, []);


  const handleTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const handleTag = (value: string) => {
    const duplication = tag.find((item) => item.name === value);
    if (duplication) {
      return;
    }
    setTag([...tag, { name: value }]);
  };

  const save = async () => {
    const content = editorRef.current?.getInstance();
    
    const data = {
      title: title,
      content: content?.getHTML(),
      tags: tag
    }
    
    console.log(data);
    
  } 

  return (
    <Container>

      <StyledTextField
        value={title}
        onChange={handleTitle}
        id="standard-required"
        variant="standard"
        placeholder="제목을 입력하세요"
      />

      <TagContainer>
        {tag.map((item) => (
          <TagItem key={item.name}>{item.name}</TagItem>
        ))}
        <StyledTagTextField
          variant="standard"
          placeholder="태그를 입력하세요"
          value={tagValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTagValue(e.target.value);
          }}

          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" || e.key === ",") {
              if (tagValue === "") return;
              handleTag(tagValue);
              setTagValue("");
            }
            else if(e.key === "Backspace") {
              if(tagValue === "") {
                setTag([...tag.slice(0, tag.length - 1)])
              }
            }
          }}
        />
      </TagContainer>
      
      <EditorContainer>
        <Editor
          ref={editorRef}
          defaultValue=""
          previewStyle="vertical"
          placeholder="글을 작성하세요"
          initialEditType="wysiwyg"
          useCommandShortcut={false}
          hideModeSwitch={true}
        />
      </EditorContainer>

      <EditorFooter>
        <OutContainer>
          <Button 
            variant="contained" color="error"
            onClick={() => {navigate('/')}}
          >취소</Button>
        </OutContainer>

        <Button 
          variant="contained" 
          color="success"
          sx={{ mr: 2 }}
          onClick={save}
        >저장</Button>
      </EditorFooter>    
      
    </Container>
    
  )
}

export default WritePage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80vw;
  margin: 0 auto;
`

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
  flex-wrap: wrap;
  position: relative;
  margin: 20px 0;
`

const TagItem = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #faf9fa;
  padding: 0 10px;
  color: #12b886;
  border-radius: 10%;
  height: 40px;
  margin: 5px;
  white-space: nowrap;

  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
`

const EditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const EditorFooter = styled.div`
  width: 100%;
  height: 40px;
  padding: 20px 0;
  display: flex;
  justify-content: flex-end;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  position: relative;
`

const OutContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  left: 0;
  margin-left: 20px;
`