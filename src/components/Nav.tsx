import { styled } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../store/User';
import { SearchRounded } from '@mui/icons-material';
import Category from './Category';
import { login } from '../api/Login';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';

const Nav = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);
  
  const handleClick = () => {
    navigate('/search');
  }

  const handleLogOut = () => {
    googleLogout();
    dispatch(clearUser());
    navigate('/');
  }

  const googleHandler = async (credential: string | undefined) => {
    login(credential);
  }

  if (pathname === '/write') {
    return null;
  }

  return (
    <>
      <Header>
        <HeaderInner>
          <HeaderWrapper>
            <LogoText
              onClick={() => navigate('/')}
            >
              Fukufuku
            </LogoText>

            <Item>
              <Icon onClick={handleClick}>
                <SearchRounded sx={{ color: "#000", fontSize: '1.5rem' }} />
              </Icon>
              {
                user.id ? (
                  <Login onClick={handleLogOut}>
                    <Sign>로그아웃</Sign>
                  </Login>
                ) : null
              }
              {
                user.id ? (
                  <Icon onClick={() => navigate('/setting')}>
                    {user.picture ? (
                      <img
                        src={user.picture}
                        alt="profile"
                        style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                      />
                    ) : null
                    }

                  </Icon>
                ) : (
                  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID as string}>
                    <GoogleLogin
                      type={"icon"}
                      shape={"pill"}
                      onSuccess={({credential}) => {
                        googleHandler(credential);
                      }}
                    />
                  </GoogleOAuthProvider>
                )
              }

            </Item>

          </HeaderWrapper>
        </HeaderInner>
        {
          pathname === '/' || pathname === '/recent' ? <Category /> : null
        }
      </Header>
    </>
  )
}

export default Nav

const Header = styled.header`
  background-color: #D8CEF6;
  border-bottom: 1px solid #eee;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 999;
`

const HeaderInner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  position: relative;

  @media screen and(max-width: 1023px) {
    max-width: 900px;
  }

  @media screen and(max-width: 767px) {
    max-width: 300px;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
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
  width: 7rem;
  height: 3rem;
  border-radius: 20px;
  background-color: #fff; 
  cursor: pointer;
  margin-left: 10px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);

  color: #000;
  font-weight: 700;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 3rem;
  height: 3rem;
  margin-left: 1rem;

  &:hover {
  background-color: #c2c2c2;
  border-radius: 50%;
}
`

const LogoText = styled.div`
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  cursor: pointer;
  text-shadow: 3px 3px rgba(0, 0, 0, 0.4);
`

const Sign = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.125rem;
`