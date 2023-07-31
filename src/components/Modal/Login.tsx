import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import styles from './loginModal.module.scss'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';


const TextFiledTheme = styled(TextField)`
  background-color: white;
  color: white;
  border-color: yellow;
  
  placeholder {
    color: white;
  }
`



interface LoginProps {
  register: boolean;
}

type FormValues = {
  username: string;
  password: string;
  passwordCheck?: string;
}

const Login = ({register}: LoginProps) => {
  
  const [form, setForm] = useState<FormValues>({
    username: '',
    password: ''
  } as FormValues);

  const [idError, setIdError] = useState<boolean>(true);
  const [idCheckError, setIdCheckError] = useState<boolean>(true);
  const [passwordError, setPasswordError] = useState<boolean>(true);
  const [passwordCheckError, setPasswordCheckError] = useState<boolean>(true);

  useEffect(() => {
    if (form.username.length >= 4) {
      setIdError(false);
      if (register) {
        axios.get(`http://localhost:3000/auth/${form.username}`)
        .then(() => {
          setIdCheckError(true);
        })
        .catch(() => {
          setIdCheckError(false);
        })
      }
    } else {
      setIdError(true);
    }
  }, [form.username, register])

  useEffect(() => {
    const regExp = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/;
    if(regExp.test(form.password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }, [form.password])

  useEffect(() => {
    if (form.passwordCheck === form.password || !form.passwordCheck) {
      setPasswordCheckError(false);
    } else {
      setPasswordCheckError(true);
    }
  }, [form.password, form.passwordCheck])

  const onSubmit = async (data: FormValues) => {
    if (register) {
      data.passwordCheck = undefined;

      try {
        await axios.post('http://localhost:3000/auth/signup', data);
      }
      catch (error) {
        console.log();
      }
    }
  }

  return (
    <div className={styles.modal__right__body}>
      <TextFiledTheme
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, username: e.target.value})}
        {...(idError && form.username ) && {error: true, helperText: '아이디는 4자 이상 입력해주세요.'}}
        {...(idCheckError && form.username && !idError && register ) && {error: true, helperText: '이미 존재하는 아이디입니다.'}}
        {...(!idCheckError && form.username && !idError && register) && {error: false, helperText: '사용 가능한 아이디입니다.', color: 'success'}}
        required
        id="outlined-required"
        label="아이디"
        fullWidth
        sx={{mb: 3}}
      />

      <TextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, password: e.target.value})}
        {...( passwordError && form.password ) && {error: true, helperText: '비밀번호는 6자 이상 영문자 숫자를 포함하세요.'}}
        required
        id="outlined-password-input"
        label={register ? '비밀번호 (영문자 + 숫자 6자리 이상)' : '비밀번호'}
        type="password"
        autoComplete="current-password"
        fullWidth
        sx={{mb: 3}}
      />

      {
        register && (
          <TextField
            required
            id="outlined-password-input"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setForm({...form, passwordCheck: e.target.value})}
            {...(passwordCheckError && {error: true, helperText: '비밀번호가 일치하지 않습니다.'})}
            label="비밀번호 확인"
            type="password"
            autoComplete="current-password"
            fullWidth
            sx={{mb: 3}}
          />
        )
      }

      <Button 
        type='submit'
        variant='contained' 
        sx={{mb: 3, width: '100%'}}
        {...(idError || passwordError || passwordCheckError || idCheckError || !form.username || !form.password || (register && !form.passwordCheck) ) && {disabled: true}}
        onClick={() => onSubmit(form)}
      >
      {register ? '회원가입' : '로그인'}
      </Button>
    </div>
  )
}

export default Login