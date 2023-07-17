import { Add, DeleteForever, Edit } from '@mui/icons-material';
import styles from './comment.module.scss';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Comment from './Comment';
import axios from 'axios';
import { Button } from '@mui/material';
import { store } from '../../store';

interface ReCommentProps {
  item: {
    id: number;
    content: string;
    u_id: number;
    boardId?: number;
    c_id?: number;
    commenter: string;
    img: string;
  }
}

interface Reply {
  id: number;
  content: string;
  c_id: number;
  u_id: number;
  commenter: string;
  img: string;
}[]

const ReComment = ({ item }: ReCommentProps) => {

  const [show, setShow] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [replys, setReplys] = useState<Reply[]>([])
  const [valid, setValid] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)

  const user = store.getState().user;

  useEffect(() => {
    const validUser = () => {
  
      if (user.id === item.u_id) {
        setValid(true)
      }
      
    }
    validUser();
  }, [user])

  const handleShow = () => {
    setShow(!show)
  }

  const getReply = async () => {
    await axios.get(`/replys/${item.id}`)
      .then((res) => {
        setReplys(res.data)
      }
    ).catch((err) => {
      console.log(err)
    })
  }
  
  useEffect(() => {
    getReply();
  }, [])

  const handleReply = async () => {
    const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`;

    const data = {
      content: comment,
      c_id: Number(item.id),
      commenter: name,
      img: user.picture,
      u_id: user.id,
    };

    await axios.post('/replys', data)
      .then(() => {
        getReply();
      }
    ).catch((err) => {
      console.log(err)
    })

    setComment('')
  }

  const handleDelete = async () => {
    await axios.delete(`/comments/${item.id}`)
      .then(() => {
        console.log('삭제 성공');
      }
    ).catch((err) => {
      console.log(err)
    })
  }

  const editShow = () => {
    setEdit(!edit)
  }

  return (
    <>
      <div className={styles.comment__head}>
        <div className={styles.profile}>
          <a href='#'>
            <img src={item.img} alt='profile' />
          </a>

          <div className={styles.profile__info}>
            <a href='#'>{item.commenter}</a>
            {/* <span>{item.date}</span> */}
          </div>
        </div>
      </div>

        {
          edit ? (
            <>
            <div className={styles.comment__body}>
              <textarea
                className={styles.inputComment}
                value={item.content}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <Button 
              variant='contained' 
              color='primary'
              sx={{ display: 'flex', justifyContent: 'flex-end'}}
            >수정</Button>
            </>
          ) : (
            <div className={styles.comment__body}>
              <p>{item.content}</p>
              {
                valid && (
                  <div className={styles.comment__toolbox}>
                    <Edit
                      onClick={editShow}
                      sx={{ mr: '0.5rem' }}
                    />
                    <DeleteForever 
                      onClick={handleDelete}
                      sx={{ cursor: 'pointer' }}
                    />
                  </div>
                )        
              }
            </div>
          )
        }

        {
          item?.boardId ? (
            <div className={styles.comment__recomment}>
              <div className={styles.info} onClick={handleShow}>
                <Add />
                <span>
                  {
                    replys.length > 0 ? `${replys.length}개의 답글` : '답글 달기'
                  }
                </span>
              </div>
            </div>  
          ) : null
        }

        {
          show && (
            <Container>
              {
                <Comment item={replys}/>
              }

              <FooterInput>
                <textarea 
                  className={styles.inputComment} 
                  placeholder='댓글을 입력하세요'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)} 
                />
                <ButtonWrapper>
                  <Button variant='contained' color='primary' onClick={handleReply}>댓글 작성</Button>
                </ButtonWrapper>
              </FooterInput>
            </Container>
          )
        }
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