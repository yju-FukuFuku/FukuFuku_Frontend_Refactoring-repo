import { Add } from '@mui/icons-material';
import styles from './board.module.scss';
import { useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import Comment from './Comment';

interface ReCommentProps {
  item: {
    userImg: string;
    userName: string;
    date: string;
    comment: string;
  }
}

const ReComment = ({ item }: ReCommentProps) => {

  const [show, setShow] = useState<boolean>(false)

  const recommendTest = [
    {
      userImg: 'https://avatars.githubusercontent.com/u/121005861?v=4',
      userName: 'hetame',
      date: '1일 전',
      comment: '대댓글입니다.'
    }
  ]

  const handleShow = () => {
    setShow(!show)
  }

  return (
    <>
      <div className={styles.comment__head}>
        <div className={styles.profile}>
          <a href='javascript:void(0)'>
            <img src={item.userImg} alt='profile' />
          </a>

          <div className={styles.profile__info}>
            <a href='javascript:void(0)'>{item.userName}</a>
            <span>{item.date}</span>
          </div>
        </div>
      </div>

      <div className={styles.comment__body}>
        <p>{item.comment}</p>
      </div>

      <div className={styles.comment__recomment}>
        <div className={styles.info} onClick={handleShow}>
          <Add />
          <span>1개의 답글</span>
        </div>

        {
          show && (
            <Container>

              {
                <Comment item={recommendTest} />
              }

              <FooterInput>
                <textarea className={styles.inputComment} placeholder='댓글을 입력하세요' />
                <ButtonWrapper>
                  <Button variant='contained' color='primary'>댓글 작성</Button>
                </ButtonWrapper>
              </FooterInput>
            </Container>
          )
        }

      </div>
    </>
  );
};

export default ReComment;

const Container = styled.div`
  padding: 1.5rem;
  border: 1px solid #e1e4e8;
  margin-top: 1.3rem;
  border-radius: 4px;
  background-color: #f1f3f5;
`

const FooterInput = styled.div``

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`