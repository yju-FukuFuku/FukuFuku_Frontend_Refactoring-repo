import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  Favorite
}from '@mui/icons-material';
import { Link } from 'react-scroll';
import styles from './board.module.scss';
import { Button } from '@mui/material';
import Comment from './Comment';

interface Board {
  id: number;
  title: string;
  content: string;
  like: number;
}

const PostPage = () => {

  const test = [
    {
      userImg: 'https://avatars.githubusercontent.com/u/121005861?v=4',
      userName: 'hetame',
      date: '1일 전',
      comment: '댓글입니다.'
    },
    {
      userImg: 'https://avatars.githubusercontent.com/u/121005861?v=4',
      userName: 'hetame',
      date: '1일 전',
      comment: '댓글입니다.'
    }
  ]

  const { boardId } = useParams();
  const [board, setBoard] = useState<Board | null>({} as Board)
  const [fixed, setFixed] = useState<boolean>(false)
  const [headerArray, setHeaderArray] = useState<string[]>([])

  const navigate = useNavigate();

  // 스크롤 위치를 확인하고 옆에 사이드에 있는 목차, 좋아요 버튼을 fixed 로 바꿔주는 함수
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setFixed(true)  
      } else {
        setFixed(false)
      }
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 글 내용이 바뀔때마다 idTag 실행
  useEffect(() => {
    idTag();
  }, [board]);

  // 글 내용에서 h1~h6 태그를 찾아서 id를 부여해주고 그 id를 배열에 담아줌
  const idTag = () => {
    if(!document) return;

    const content = document.getElementById('content');
    const header = content?.querySelectorAll('h1, h2, h3, h4, h5, h6');

    header?.forEach((el) => {
      el.setAttribute('id', el.textContent || '');
    });
    
    const headerIds = Array.from(header || []).map((el) => el.textContent || '');
    setHeaderArray(headerIds);

  };

  // 현재 id를 가지고 글 찾고 글이 없으면 error 페이지로 이동
  useEffect(() => {
    async function getBoard() {
      await axios.get(`http://localhost:3000/boards/${boardId}`).then((response) => {
        setBoard(response.data);
      }).catch((error) => {
        console.log(error);
        navigate('/error');
      });
    }
    getBoard();
  }, [boardId, navigate])

  if (!board) {
    return null;
  }

  // 글이 있으면 글의 제목, 내용, 좋아요를 가져옴
  const { title, content, like } = board;

  return (
    <Container>
      <Wrapper>

        <HeadWrapper>
          <Title>{title}</Title>

          <SideContainer>
            <SideWrapper>
              <SideTool fixed={fixed ? 'true' : 'false'}>
                <Favorite
                  color='disabled'
                  sx={{ mb: 1, backgroundColor: 'white',
                        border: '1px solid lightgrey', borderRadius: '50%', padding: '8px', cursor: 'pointer', 
                        '&:hover': { color: 'black', border: '1px solid black' 
                      }}}
                />
                {like}
              </SideTool>
            </SideWrapper>
          </SideContainer>

          <SideContainer>
            <SideNavWrapper>
              <SideNav fixed={fixed ? 'true' : 'false'}>
              {
                headerArray.map((item, index) => (
                  <SideNavTitle key={index}>
                    <Link 
                      activeClass='active'
                      to={item}
                      spy={true}
                      smooth={true}
                      offset={-100}
                      duration={500}
                    >
                      {item}
                    </Link>
                  </SideNavTitle>
                ))
              }
              </SideNav>
            </SideNavWrapper>
          </SideContainer>

        </HeadWrapper>
        
        <BodyWrapper>
          <Content id='content' dangerouslySetInnerHTML={{__html: content}} />
        </BodyWrapper>

        <ProfileWrapper>
          <div className={styles.main__profile}>
            <a href='javascript:void(0)'>
              <img src='https://avatars.githubusercontent.com/u/121005861?v=4' alt='profile' />
            </a>

            <div className={styles.profile__info}>
              <a href='javascript:void(0)'>hetame</a>
              <span>한줄소개 적는 부분</span>
            </div>
          </div>
        </ProfileWrapper>

        <FooterWrapper>
          <FooterHead>
            <h4>0개의 댓글</h4>
          </FooterHead>
          
          <FooterInput>
            <textarea className={styles.inputComment} placeholder='댓글을 입력하세요' />
            <ButtonWrapper>
              <Button variant='contained' color='primary'>댓글 작성</Button>
            </ButtonWrapper>
          </FooterInput>

          <FooterBody>
            {
              <Comment item={test}/>
            }
          </FooterBody>
          
        </FooterWrapper>

      </Wrapper>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  top: 150px;
  position: relative;
  height: 1000vh;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 768px;

  @media screen and (max-width: 1023px) {
    width: 900px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
  }
`

const ProfileWrapper = styled.div`
  width: 100%;
  margin-top: 10rem;
  margin-bottom: 10rem;
`

const FooterWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`

const FooterHead = styled.div`
  padding: 0.4rem;
  line-height: 1.5;
  font-weight: 600;
`

const FooterInput = styled.div``

const FooterBody = styled.div`
  margin-top: 1rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`

const HeadWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  margin-bottom: 1.rem;
`

const SideContainer = styled.div`
  position: relative;
`

const SideWrapper = styled.div`
  position: absolute;
  left: -150px;
`

const SideNavWrapper = styled.div`
  position: absolute;
  left: 100%;
`
const SideNav = styled.div <{fixed: string}>`
  position: ${props => (props.fixed === 'true' ? 'fixed' : 'relative')};
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
`

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
`

const SideTool = styled.div <{fixed: string}>`
  position: ${props => (props.fixed === 'true' ? 'fixed' : 'absolute')};
  background-color: #f8f9fa;
  top: 122px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 3rem;
  border: 1px solid #e9ecef;
  border-radius: 2rem;
  padding: 1rem 0;
`

const Title = styled.div`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`

const BodyWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
`

const Content = styled.div`
  font-size: 20px;
`

export default PostPage