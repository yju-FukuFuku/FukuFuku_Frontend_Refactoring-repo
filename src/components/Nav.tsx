import { styled } from 'styled-components'
import 
{
  SearchRounded, 
  LightMode
} from '@mui/icons-material';

import { Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginModal from './Modal/LoginModal';
import Category from './Category';

const Nav = () => {
  const [headMargin, setHeadMargin] = useState<number>(0);
  const [prevScrollY, setPrevScrollY] = useState<number>(0);
  const [modalopen, setModalopen] = useState<boolean>(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > prevScrollY) {
      setHeadMargin(-140);
    } else {
      setHeadMargin(0);
    }
    setPrevScrollY(currentScrollY);
  }, [prevScrollY]);

  useEffect(() => {
    setPrevScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleClick = () => {
    navigate('/search');
  }
  
  return (
    <>
      <Container headMargin={headMargin}>
        <Wrapper>
          <Typography 
            sx={{cursor: "pointer", fontFamily: 'Oswald, sans-serif'}} 
            variant='h4'
            onClick={() => navigate('/')}
          >
          Fukufuku
          </Typography>

          <Item>
            <Icon>
              <LightMode />
            </Icon>
            <Icon onClick={handleClick}>
              <SearchRounded />
            </Icon>

            <Login onClick={() => {setModalopen(true)}}>
              <Typography sx={{color: 'white'}}>로그인</Typography>
            </Login>
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

const Container = styled.div<{headMargin: number}>`
  position: fixed;
  width: 100%;
  background-color: #fff;
  margin-top: ${props => props.headMargin}px;
  transition: all 0.3s ease-in-out;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
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
  background-color: #000;
  cursor: pointer;
  margin-left: 10px;
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