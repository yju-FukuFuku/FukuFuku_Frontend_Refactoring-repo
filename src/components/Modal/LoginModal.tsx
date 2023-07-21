import React, { useRef, useState } from 'react'
import { styled } from 'styled-components'
import {
  Close,
  Google,
} from '@mui/icons-material/';
import styles from './loginModal.module.scss'
import { Typography } from '@mui/material';
import useOutsideClick from '../../hooks/useOutsideClick';
import Login from './Login';
import { useNavigate } from 'react-router-dom'; 
import { login, onLoginSuccess } from '../../api/Login';

interface LoginModalProps {
  setModalopen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({setModalopen}: LoginModalProps) => {
  const [register, setRegister] = useState<boolean>(false);
  const navigate = useNavigate();

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick({ divRef: ref, handler: () => setModalopen(false) });

  const googleHandler = async () => {
    // login();
    onLoginSuccess()
    setModalopen(false);
  }

  return (
    <Container>
      <Wrapper>
        <Modal ref={ref}>
          <div className={styles.modal__left}>
            <img 
              src='https://yju-fukufuku.s3.amazonaws.com/logo.svg'
              alt='Logo'
            />
            <Typography variant='h3' sx={{mt: 3}}>Fukufuku</Typography>
          </div>

          <div className={styles.modal__right}>
            <Close 
              onClick={() => {setModalopen(false)}}
              sx={{cursor: 'pointer', position: 'absolute', top: '20px', right: '20px'}}
            />
            <div className={styles.modal__right__top}>
              <Typography variant='h4' sx={{fontWeight: 600, mb: 1}}>
                {register ? '회원가입' : '로그인'}
              </Typography>

              <Typography variant='overline' sx={{fontSize: '16px', color:'gray'}}>
                {register ? '아이디로 회원가입' : '아이디로 로그인'}
              </Typography>
            </div>

            <Login register={register} />
            
            <div className={styles.modal__right__bottom}>
              <Typography 
                variant='overline' 
                sx={{fontSize: '16px', color:'gray'}}
              >
              {register ? '소셜 계정으로 회원가입' : '소셜 계정으로 로그인'}
              </Typography>

              <Google
                sx={{cursor: 'pointer', fontSize: '40px', alignSelf: 'center', border: '1px solid gray', borderRadius: '50%', p: 1}}
                onClick={googleHandler}
              />
            </div>

            <div className={styles.modal__right__footer}>
              <Typography variant='overline' sx={{fontSize: '16px', color:'gray'}}>
                {register ? '이미 계정이 있으신가요?' : '아직 계정이 없으신가요?'}
              </Typography>

              <Typography
                onClick={() => {
                  setRegister(!register)
                }}
                variant='overline' 
                sx={{fontSize: '16px', color:'green', cursor: 'pointer'}}> 
              {register ? '로그인' : '회원가입'}
              </Typography>

            </div>
          </div>

        </Modal>
      </Wrapper>
    </Container>
  )
}

export default LoginModal

const Container = styled.div`
  position: absolute;
  z-index: 100;
`
const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 71%);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Modal = styled.div`
  background-color: white;
  position: relative;
  display: flex;
  width: 800px;
  height: 700px;
  border-radius: 8px;
  animation: fadeIn 400ms;
  
  @media all and (min-width:768px) and (max-width:1023px) {
    width: 600px;
  } 
  
  @media all and (max-width:767px) {
    width: 400px;
  }

  @keyframes fadeIn {
    from {
      bottom: -150px;
      scale: 0.5;
    }

    to {
      bottom: 0;
      scale: 1;
    }
  }
`