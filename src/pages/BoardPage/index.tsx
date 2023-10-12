import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Favorite } from "@mui/icons-material";
import { Link } from "react-scroll";
import { Skeleton } from "@mui/material";
import Comment from "../../components/Comment/Comment";
import styles from "./board.module.scss";
import { RootState, store } from "../../store";
import { deleteBoard, getBoardById } from "../../api/BoardAPI";
import { BoardType } from "../../types/BoardType";
import { useSelector } from "react-redux";

const PostPage = () => {
  const { boardId } = useParams();
  const [board, setBoard] = useState<BoardType>();
  const [fixed, setFixed] = useState<boolean>(false);
  const [headerArray, setHeaderArray] = useState<string[]>([]);

  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  // 게시글 가져오기
  useEffect(() => {
    const getBoard = async () => {
      try {
        const board = await getBoardById(Number(boardId));
        setBoard(board);
      } catch (error) {
        console.log(error);
      }
    };
    getBoard();
  }, []);

  // 스크롤 위치를 확인하고 옆에 사이드에 있는 목차, 좋아요 버튼을 fixed 로 바꿔주는 함수
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setFixed(true);
      } else {
        setFixed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 글 내용에서 h1~h6 태그를 찾아서 id를 부여해주고 그 id를 배열에 담아줌
  const idTag = () => {
    if (!document) return;
    if (!document) return;

    const content = document.getElementById("content");
    const header = content?.querySelectorAll("h1, h2, h3");

    header?.forEach((el) => {
      el.setAttribute("id", el.textContent || "");
    });

    const headerIds = Array.from(header || []).map(
      (el) => el.textContent || ""
    );
    setHeaderArray(headerIds);
  };

  const editBoard = () => {
    navigate(`/write?id=${boardId}`);
  };

  const delBoard = async () => {
    await deleteBoard(Number(boardId), user.id)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // board 가 빈 객체이면 로딩중을 띄워주고, 아니면 게시글을 보여줌
  if (!board) {
  if (!board) {
    return (
      <Container>
        <Wrapper>
          <HeadWrapper style={{ display: "flex" }}>
            <Skeleton sx={{ mr: 1 }} variant="text" width="30%" height="80px" />
            <Skeleton sx={{ mr: 1 }} variant="text" width="20%" height="80px" />
            <Skeleton sx={{ mr: 1 }} variant="text" width="20%" height="80px" />
          </HeadWrapper>

          <InfoWrapper
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <Skeleton sx={{ mr: 1 }} variant="text" width="10%" height="30px" />
            <Skeleton variant="text" width="10%" height="30px" />
          </InfoWrapper>

          <TagWrapper style={{ display: "flex", marginTop: "1rem" }}>
            <Skeleton
              sx={{ mr: 1 }}
              variant="rounded"
              width="10%"
              height="30px"
            />
            <Skeleton variant="rounded" width="10%" height="30px" />
          </TagWrapper>

          <BodyWrapper style={{ marginTop: 0 }}>
            <Skeleton
              sx={{ position: "relative", top: -220 }}
              variant="text"
              width="100%"
              height={1300}
            />
          </BodyWrapper>
        </Wrapper>
      </Container>
    );
  } else {
    return (
      <Container>
        <Wrapper>
          <HeadWrapper>
            <Title>{board.title}</Title>

            <InfoWrapper>
              <Info>
                <span className={styles.author__Name}>
                  {board.user.nickName}
                </span>
                <span className={styles.separator}>·</span>
                {board.createdAt && (
                  <span className={styles.board__date}>
                    {board.createdAt.slice(0, 10)}
                  </span>
                )}
              </Info>
              {store.getState().user.id === board.u_id && (
                <Toolbox>
                  <span className={styles.tool__edit} onClick={editBoard}>
                    수정
                  </span>
                  <span className={styles.tool_delete} onClick={delBoard}>
                    삭제
                  </span>
                </Toolbox>
              )}
            </InfoWrapper>

            <TagWrapper>
              {board.board_tag
                ? board.board_tag.map((item) => (
                    <span
                      key={item.tag.id}
                      className={styles.board__tag}
                      onClick={() => {
                        navigate(`/tags/${item.tag.name}`);
                      }}
                    >
                      {item.tag.name}
                    </span>
                  ))
                : null}
            </TagWrapper>


            <SideContainer>
              <SideWrapper>
                <SideTool fixed={fixed ? "true" : "false"}>
                  <Favorite
                    color="disabled"
                    sx={{
                      mb: 1,
                      backgroundColor: "white",
                      border: "1px solid lightgrey",
                      borderRadius: "50%",
                      padding: "8px",
                      cursor: "pointer",
                      "&:hover": { color: "black", border: "1px solid black" },
                    }}
                  />
                  {board.views}
                </SideTool>
              </SideWrapper>
            </SideContainer>


            <SideContainer>
              <SideNavWrapper>
                <SideNav fixed={fixed ? "true" : "false"}>
                  {headerArray.map((item, index) => (
                    <SideNavTitle key={index}>
                      <Link
                        activeClass="active"
                        to={item}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                      >
                        {item}
                      </Link>
                    </SideNavTitle>
                  ))}
                </SideNav>
              </SideNavWrapper>
            </SideContainer>
          </HeadWrapper>


          <BodyWrapper>
            <Content
              id="content"
              dangerouslySetInnerHTML={{ __html: board.content }}
            />
          </BodyWrapper>


          <ProfileWrapper>
            <div className={styles.main__profile}>
              <a href="#">
                <img src={board.user.picture} alt="profile" />
              </a>


              <div className={styles.profile__info}>
                <a href="#">{board.user.nickName}</a>
                <span>한줄소개 적는 부분</span>
              </div>
            </div>
          </ProfileWrapper>

          <FooterBody>{<Comment />}</FooterBody>
        </Wrapper>
      </Container>
    );
  }
};

const Container = styled.div`
  width: 100%;
  top: 150px;
  position: relative;
  height: 1000vh;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 768px;

  @media screen and (max-width: 1023px) {
    width: 900px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
  }
`;

const Toolbox = styled.div`
  display: flex;
  align-items: center;
`;

const Info = styled.div``;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const TagWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 10rem;
`;

const FooterBody = styled.div`
  margin-top: 1rem;
`;

const HeadWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e9ecef;
`;

const SideContainer = styled.div`
  position: relative;
`;

const SideWrapper = styled.div`
  position: absolute;
  left: -150px;
`;

const SideNavWrapper = styled.div`
  position: absolute;
  left: 100%;
`;
const SideNav = styled.div<{ fixed: string }>`
  position: ${(props) => (props.fixed === "true" ? "fixed" : "relative")};
  top: 122px;
  width: 240px;
  max-height: calc(100vh - 128px);
  border-left: 2px solid #f1f3f5;
  color: #868e96;
  font-size: 1rem;
  line-height: 1.5;
  overflow: hidden auto;
  margin-left: 5rem;
  padding-left: 1rem;
`;

const SideNavTitle = styled.div`
  display: block;
  margin-left: 0;
  margin-top: 4px;
  cursor: pointer;
  transition: all 0.125s ease-in 0s;

  a.active {
    transform: scale(1.1);
    color: #212529;
  }

  &:hover {
    color: #212529;
  }
`;

const SideTool = styled.div<{ fixed: string }>`
  position: ${(props) => (props.fixed === "true" ? "fixed" : "absolute")};
  background-color: #f8f9fa;
  top: 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  border: 1px solid #e9ecef;
  border-radius: 2rem;
  padding: 1rem 0;
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const BodyWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Content = styled.div`
  font-size: 1.5rem;
`;

export default PostPage;
