import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { BoardType } from "../../types/BoardType";
import { getBoardByTag } from "../../api/BoardAPI";

const TagPage = () => {
  const { tagName } = useParams();
  const [postData, setPostData] = useState<BoardType[]>();

  // 태그 아이디 가져오기
  const getTag = async () => {
    if (tagName) {
      const encodedTagName = encodeURIComponent(tagName);
      try {
        const data = await getBoardByTag(encodedTagName);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getTag();
  }, []);

  return (
    <Container>
      <Content></Content>
    </Container>
  );
};

export default TagPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3.5rem auto;
  position: relative;
  top: 100px;
  width: 768px;
`;

const BoardContent = styled.div`
  font-size: 1rem;
`;

const Wrapper = styled.div`
  box-sizing: inherit;
`;

const SearchPost = styled.div`
  padding: 2rem 0;
  line-height: 1.5;
`;

const Profile = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ProfileImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 1.5rem;
  margin-right: 1rem;
`;

const ProfileName = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

const PostImgBox = styled.div`
  width: 100%;
  padding-top: 52.356%;
  margin-bottom: 1rem;
  position: relative;
`;

const PostImg = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const H3 = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const PostContent = styled.p`
  font-size: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  word-break: keep-all;
  overflow-wrap: break-word;
`;

const SubInFo = styled.div`
  display: flex;
  align-item: center;
  margin-top: 1rem;
  font-size: 0.875rem;
  color: rgb(155, 155, 155);
`;

const Separator = styled.div`
  margin: 0px 0.5rem;
`;

const TagName = styled.div`
  display: flex;
  font-size: 3rem;
  font-weight: 600;
`;

const TagLength = styled.div`
  font-size: 1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  color: #868e96;
`;

const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;
