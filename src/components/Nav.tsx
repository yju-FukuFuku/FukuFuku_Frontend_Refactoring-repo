import { styled } from 'styled-components'
import 
{
  SearchRounded, 
  LightMode
} from '@mui/icons-material';

import { Typography } from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './Modal/LoginModal';
import Category from './Category';
import { useRecoilState } from "recoil";
import { themeState } from '../atom';
import { store } from '../store';

interface NavProps {
  user: {
    id: number | null;
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    picture: string | null;
  }
}

const Nav = ({user} : NavProps) => {
  const [headMargin, setHeadMargin] = useState<boolean>(true);
  const [modalopen, setModalopen] = useState<boolean>(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { isLogin } = store.getState().token;

  useEffect(() => {
    if (isLogin) {
      setModalopen(false);
    }
  }, [isLogin])

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > scrollYRef.current) {
      setHeadMargin(false);
    } else {
      setHeadMargin(true);
    }
    scrollYRef.current = currentScrollY;
  }, []);

  const scrollYRef = useRef(0);

  useEffect(() => {
    scrollYRef.current = window.scrollY;
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  const handleClick = () => {
    navigate('/search');
  }

  const [theme, setTheme] = useRecoilState(themeState);

  const handleTheme = () => {
    theme === true ? setTheme(false) : setTheme(true)
    console.log("밝은 테마", theme);
    
  }
  
  return (
    <>
      <Container headmargin={headMargin ? 'true' : 'false'}>
        <Wrapper>
          
          <Typography 
            sx={{cursor: "pointer", fontFamily: 'Oswald, sans-serif'}} 
            variant='h4'
            onClick={() => navigate('/')}
            color={theme === true ? "#212529" : "#ECECEC"}
          >
          Fukufuku
          </Typography>

          <Item>
            <Icon>
              <LightMode onClick={handleTheme} />
            </Icon>
            <Icon onClick={handleClick}>
              <SearchRounded />
            </Icon>
            {
              isLogin ? (
                <Write onClick={() => {navigate('/write')}}>
                  <Typography sx={{ color: '#000', fontWeight: 600 }}>새글작성</Typography>
                </Write>
              ) : null
            }

            {
              isLogin ? (
                <Icon onClick={() => navigate('/mypage')}>
                  { user.picture ? (
                    <img 
                      src={user.picture}
                      alt="profile"
                      style={{width: '40px', height: '40px', borderRadius: '50%'}}
                    />
                    ) : null
                  }
                  
                </Icon>
              ) : (
                <Login onClick={() => {setModalopen(true)}}>
                  <Typography sx={{ color: `${theme === true ? "#ECECEC" : "#212529"}` }}>로그인</Typography>
                </Login>
              )
            }
            
          </Item>

        </Wrapper>

        {
          (pathname === '/' || pathname === '/recent') && (
            <Category />
          )
        }

      </Container>

      {
        modalopen && (
          <LoginModal setModalopen={setModalopen} />
        )
      }

    </>
  )
}

export default Nav

const Container = styled.div<{headmargin?: string}>`
  position: fixed;
  width: 100vw;
  justify-content: center;
  background-color: #fff;
  margin-top: ${props => props.headmargin === 'true' ? '0' : '-140px'};
  background-color: ${props => props.theme.bgColor1};
  transition: margin-top 0.3s ease-in-out;
  z-index: 10;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  align-items: center;
  margin: 20px auto;
  width: 1700px;

  @media screen and (max-width: 1023px) {
    width: 900px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
  }
`

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Login = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: ${props => props.theme.textColor1};
  cursor: pointer;
  margin-left: 10px;
`

const Write = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
  border: 1px solid #000;
  margin-right: 1rem;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
  cursor: pointer;
  width: 40px;
  height: 40px;

  &:hover {
    background-color: #c2c2c2;
    border-radius: 50%;
  }
`