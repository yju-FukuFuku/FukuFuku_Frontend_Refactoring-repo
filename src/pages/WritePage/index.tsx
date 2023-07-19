import ReactQuill from "react-quill";

import './writepage.module.scss'
import { styled } from 'styled-components';
import { Button, TextField } from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postBoard } from '../../api/Board';
import { store } from '../../store';
import { Tag } from "@mui/icons-material";

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
  const [content, setContent] = useState<string>("")

  const navigate = useNavigate();

  const quillRef = useRef<ReactQuill>(null);

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
    const { id } = store.getState().user;

    const data = {
      title: title,
      content: content,
      u_id: id,
      tags: tag.map((item) => item.name),
    }

    console.log(data);

    postBoard(data);
  }

  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement('input');
    // 속성 써주기
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    // 2. input에 이미지를 넣으면 발생하는 이벤트를 감지한다.
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      console.log(file);
      

      // 3. 이미지를 서버에 업로드한다.
      const formData = new FormData();
      formData.append('image', file);

      // const url = await res.text();

      // 4. quill에 이미지를 삽입한다.
      // const quill = quillRef.current;
      // const range = quill?.getEditor().getSelection()?.index;
      // if (range !== undefined && quill) {
      //   quill.getEditor().insertEmbed(range, 'image', url);
      // }
    }
  }
 
  const moudles = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic"],
          ["image"],
        ],
        handlers: {
          image: imageHandler,
        },
      }
    }
  }, [])

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
        <ReactQuill
          ref={quillRef}
          style={{ height: '400px' }}
          onChange={setContent}
          modules={moudles}
          value={content}
        />
      </EditorContainer>

      <EditorFooter>
        <Button 
          variant="contained" color="error"
          sx={{ ml: 2 }}
          onClick={() => {navigate('/')}}
        >취소</Button>

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
  width: 100%;
`

const EditorFooter = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 0;
`