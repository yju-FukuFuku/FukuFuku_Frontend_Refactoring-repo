import { TextField } from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  styled as muiStyled,
} from "@mui/material/styles"; // @mui/styles 패키지에서 styled 불러오기
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import useDebounce from "../../hooks/useDebounce";

interface Board {
  id: number;
  title: string;
  content: string;
  view: number;
  createdAt: string;
  img?: string;
  user: {
    nickname: string;
    email: string;
    lastName: string;
    firstName: string;
    picture: string;
  };
}
[];

const SearchPage = () => {
  // data 불러오기
  const [postData, setPostData] = useState<Board[]>();

  const getData = async (debounce: string) => {
    await axios
      .get(`http://localhost:3000/boards/search/${debounce}`)
      .then((res) => {
        setPostData(res.data);
      });
  };

  const [searchValue, setSearchValue] = useState<string>("");
  const navigate = useNavigate();

  // 검색 값 가져오기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`/search?query=${e.target.value}`);
  };

  const debounce = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debounce) {
      getData(debounce);
    }
  }, [debounce]);

  // 배열에서 검색한 값만 불러오기
  const getSearchList = () => {
    if (postData?.length !== 0 && searchValue != "") {
      return (
        <Wrapper>
          <SearchLength>
            총 <Length>{postData?.length}</Length> 개의 포스터를 찾았습니다.
          </SearchLength>
          {postData?.map((item) => (
            <SearchPost key={item.id}>
              {/* 게시판 만들기 */}
              <Profile>
                <ProfileImg src={item.user.picture} />
                <ProfileName>
                  {item.user.nickname
                    ? item.user.nickname
                    : item.user.firstName + item.user.lastName}
                </ProfileName>
              </Profile>
              <PostLink to={`/boards/${item.id}`}>
                {item.img && (
                  <PostImgBox>
                    <PostImg src={item.img} />
                  </PostImgBox>
                )}
              </PostLink>
              <PostLink to={`/boards/${item.id}`}>
                <H3>{item.title}</H3>
              </PostLink>
              <PostContent>
                <BoardContent
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </PostContent>
              <SubInFo>
                <span>{item.createdAt.split("T")[0]}</span>
                <Separator>·</Separator>
                <span>comment</span>
                <Separator>·</Separator>
                <span>like</span>
              </SubInFo>
            </SearchPost>
          ))}
        </Wrapper>
      );
    } else {
      return (
        <NotFind>
          <p>일치하는 게시글이 없습니다.</p>
        </NotFind>
      );
    }
  };

  return (
    <Container>
      <Content>
        <TextField
          onChange={handleChange}
          value={searchValue}
          id="outlined-search"
          label="검색어를 입력하세요"
          type="search"
          size="medium"
          sx={{ minHeight: "80px" }}
        />

        {getSearchList()}
      </Content>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  width: 768px;
  top: 5rem;
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

const NotFind = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchLength = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.125rem;
  line-height: 1.5;
  color: rgb(55, 55, 55);
  font-weight: 300;
`;

const Length = styled.b`
  color: black;
  box-sizing: inherit;
  margin-left: 0.25rem;
`;

const PostLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

function then(arg0: (res: any) => void) {
  throw new Error("Function not implemented.");
}
