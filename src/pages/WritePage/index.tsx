import ReactQuill from "react-quill";

import "./writepage.module.scss";
import { styled } from "styled-components";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchBoard, postBoard } from "../../api/BoardAPI";
import { RootState } from "../../store";
import { Tag } from "@mui/icons-material";
import axios from "axios";
import { postImage } from "../../api/Image";
import { useSelector } from "react-redux";
import useImage from "../../hooks/useImage";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    height: "100px",
    fontSize: "40px",
    fontWeight: 600,
  },
});

const StyledTagTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    height: "50px",
  },
});

type Tag = {
  name: string;
}[];

interface getTag {
  tag: {
    name: string;
  };
}

const WritePage = () => {
  const [title, setTitle] = useState<string>("");
  const [tag, setTag] = useState<Tag>([] as Tag);
  const [tagValue, setTagValue] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const quillRef = useRef<ReactQuill>(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const user = useSelector((state: RootState) => state.user);

  const query = useQuery();
  const editId = query.get("id");

  useEffect(() => {
    const getBoard = async () => {
      if (editId) {
        await axios
          .get(`boards/${editId}`)
          .then((response) => {
            getTags(response.data.board_tag);
            setTitle(response.data.title);
            setContent(response.data.content);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
    getBoard();
  }, [editId]);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 태그 추가, 삭제
  const handleTag = (value: string) => {
    const duplication = tag.find((item) => item.name === value);
    if (duplication) {
      return;
    }
    if (value.length < 2) {
      return;
    }
    setTag([...tag, { name: value }]);
  };

  // 수정 부분 태그 가져오기
  const getTags = async (getTag: getTag[]) => {
    const tags = getTag.map((item) => item.tag.name);
    setTag(tags.map((item) => ({ name: item })));
  };

  // 저장 눌렀을 때
  const save = async () => {
    // 만약 지금 수정하는 중이라면
    if (editId) {
      const data = {
        id: user.id,
        b_id: Number(editId),
        title: title,
        content: content,
        tags: tag.map((item) => item.name),
        images: [],
      };

      await fetchBoard(data)
        .then(() => {
          navigate(`/boards/${editId}`);
        })
        .catch((error) => {
          console.log(error);
        });
      return;
    }

    const images = useImage(content);

    const data = {
      id: user.id,
      title: title,
      content: content,
      images: [],
      tags: tag.map((item) => item.name),
    };

    // try {
    //   const response = await postBoard(data);
    //   navigate(`/boards/${response.data.id}`);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const imageHandler = () => {
    // 1. 이미지를 저장할 input type=file DOM을 만든다.
    const input = document.createElement("input");
    // 속성 써주기
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    // 2. input에 이미지를 넣으면 발생하는 이벤트를 감지한다.
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const url = await postImage(file, user.id);

      // 4. quill에 이미지를 삽입한다.
      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined && quill) {
        quill.getEditor().insertEmbed(range, "image", url);
      }
    };
  };

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
      },
    };
  }, []);

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
            if (e.key === "Enter") {
              if (tagValue === "") return;
              handleTag(tagValue);
              setTagValue("");
            } else if (e.key === "Backspace") {
              if (tagValue === "") {
                setTag([...tag.slice(0, tag.length - 1)]);
              }
            }
          }}
        />
      </TagContainer>

      <EditorContainer>
        <ReactQuill
          ref={quillRef}
          onChange={setContent}
          modules={moudles}
          value={content}
          style={{ height: "400px", paddingBottom: "40px" }}
        />
      </EditorContainer>

      <EditorFooter>
        <Button
          variant="contained"
          color="error"
          sx={{ ml: 2 }}
          onClick={() => {
            navigate("/");
          }}
        >
          취소
        </Button>

        <Button
          variant="contained"
          color="success"
          sx={{ mr: 2 }}
          onClick={save}
        >
          저장
        </Button>
      </EditorFooter>
    </Container>
  );
};

export default WritePage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 1240px;
  margin: 0 auto;
  height: 100vh;
`;

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
  flex-wrap: wrap;
  position: relative;
  margin: 20px 0;
`;

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
  }
`;

const EditorContainer = styled.div`
  width: 100%;
`;

const EditorFooter = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  border: 1px solid #e9ecef;
  padding: 1rem 0;
  align-items: center;
  justify-content: space-between;
  position: relative;
  bottom: 0;
`;
