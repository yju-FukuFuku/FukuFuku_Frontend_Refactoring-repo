import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import {
  Favorite
}from '@mui/icons-material';
import { Link } from 'react-scroll';

interface Board {
  id: number;
  title: string;
  content: string;
}

interface Heading {
  [key: string]: string;
}

const PostPage = () => {

  const { boardId } = useParams();
  const [board, setBoard] = useState<Board | null>({} as Board)
  const [fixed, setFixed] = useState<boolean>(false)
  const [heading, setHeading] = useState<Heading>({});

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setFixed(true)
        console.log(boardId);
        
      } else {
        setFixed(false)
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    idTag();
  }, [board]);

  const idTag = () => {
    if(!document) return;

    const content = document.getElementById('content');
    const header = content?.querySelectorAll('h1, h2, h3, h4, h5, h6');

    const headers: { [key: number]: string } = {};

    header?.forEach((el, index) => {
      el.setAttribute('id', el.innerText);
      headers[index] = el.innerText;
    });

    setHeading(headers as { [key: number]: string });
  };

  useEffect(() => {
    async function getBoard() {
      const res = await axios.get(`http://localhost:3000/boards/${boardId}`)
      setBoard(res.data)
    }
    getBoard();
  }, [boardId])

  if (!board) {
    return null;
  }

  const { title, content } = board;

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
                12
              </SideTool>
            </SideWrapper>
          </SideContainer>

          <SideContainer>
            <SideNavWrapper>
              <SideNav fixed={fixed ? 'true' : 'false'}>
              {
                Object.keys(heading).map((index) => {
                  return (
                    <SideNavTitle>
                      <Link
                        key={index}
                        activeClass='active'
                        to={heading[index]}
                        spy={true}
                        smooth={true}
                        offset={-100}
                        duration={500}
                      >
                        {heading[index]}
                      </Link>
                    </SideNavTitle>
                  )
                })
              }
              </SideNav>
            </SideNavWrapper>
          </SideContainer>

        </HeadWrapper>
        
        <BodyWrapper>
          <Content id='content' dangerouslySetInnerHTML={{__html: content}} />
        </BodyWrapper>
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

const HeadWrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
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
  font-size: 14px;
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
  font-size: 40px;
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