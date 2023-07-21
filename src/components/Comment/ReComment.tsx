import { Add, DeleteForever, Edit } from '@mui/icons-material';
import styles from './comment.module.scss';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import axios from 'axios';
import { Button } from '@mui/material';
import { store } from '../../store';

interface ReCommentProps {
  comment: {
    id: number;
    content: string;
    u_id: number;
    c_id?: number;
    boardId?: number;
    commenter: string;
    img: string;
  }

  handleDelete: (id: number) => void;
}

interface Reply {
  id: number;
  content: string;
  c_id: number;
  u_id: number;
  commenter: string;
  img: string;
}[]

const ReComment = ({ comment, handleDelete }: ReCommentProps) => {

  const [show, setShow] = useState<boolean>(false)
  const [commentValue, setCommentValue] = useState<string>('')
  const [replys, setReplys] = useState<Reply[]>([])
  const [valid, setValid] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)
  const [editComment, setEditComment] = useState<string>('')

  const user = store.getState().user;

  useEffect(() => {
    const validUser = () => {
      if (user.id === comment.u_id) {
        setValid(true)
      }
    }
    validUser();
  }, [])

  const getReply = async () => {
    await axios.get(`/replys/${comment.id}`)
      .then((res) => {
        setReplys(res.data);
      }).catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getReply();
  }, [])

  const handleShow = () => {
    setShow(!show)
  }

  const editShow = () => {
    setEditComment(comment.content)
    setEdit(!edit)
  }

  const handleEdit = async () => {
    const data = {
      content: editComment,
    }

    if (comment.boardId) {
      await axios.patch(`/comments/${comment.id}`, data)
      .then(() => {
        setEdit(!edit)
        comment.content = editComment;
      }).catch((err) => {
        console.log(err);
      })
    } else {
      await axios.patch(`/replys/${comment.id}`, data)
      .then(() => {
        setEdit(!edit)
        comment.content = editComment;
      })
      .catch((err) => {
        console.log(err);
      })
    }

    
  }

  const handleReply = async () => {

    if (!user.id) {
      alert('로그인 후 이용해주세요');
      return;
    }

    const name = user.nickName ? user.nickName : `${user?.firstName ?? 'Unknown'} ${user?.lastName ?? ''}`;

    const data = {
      content: commentValue,
      c_id: comment.id,
      u_id: user.id,
      commenter: name,
      img: user.picture,
    }

    await axios.post('/replys', data)
    .then(() => {
      getReply();
      setCommentValue('');
    }
    ).catch((err) => {
      console.log(err);
    })
  }

  const replyDelete = async (id: number) => {
    await axios.delete(`/replys/${id}`)
    .then(() => {
      getReply();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <>
      <div className={styles.comment__head}>
        <div className={styles.profile}>
          <a href='#'>
            <img src={comment.img} alt='profile' />
          </a>

          <div className={styles.profile__info}>
            <a href='#'>{comment.commenter}</a>
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
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                />
              </div>
              <Button 
                variant='contained' 
                color='primary'
                sx={{ display: 'flex', justifyContent: 'flex-end'}}
                onClick={handleEdit}
              >수정</Button>
            </>
          ) : (
            <div className={styles.comment__body}>
              <p>{comment.content}</p>
              {
                valid && (
                  <div className={styles.comment__toolbox}>
                    <Edit
                      onClick={editShow}
                      sx={{ mr: '0.5rem', cursor: 'pointer' }}
                    />
                    <DeleteForever 
                      onClick={() => handleDelete(comment.id)}
                      sx={{ cursor: 'pointer' }}
                    />
                  </div>
                )        
              }
            </div>
          )
        }

        {
          comment.boardId ? (
            <div className={styles.comment__recomment}>
              <div className={styles.info} onClick={handleShow}>
                <Add />
                <span>
                  {
                    replys.length > 0 ? `${replys.length}개의 답글` : "답글이 없습니다."
                  }
                </span>
              </div>
            </div>
          ) : null
        }
        {
          show && (
            <ReplyContainer>
            {
              replys.map((reply: Reply) => (
                <ReComment comment={reply} handleDelete={replyDelete} />
              ))
            }

            <FooterInput>
              <textarea 
                className={styles.inputComment} 
                placeholder='댓글을 입력하세요'
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
              />
              <ButtonWrapper>
                <Button 
                  variant='contained' 
                  color='primary'
                  onClick={handleReply}
                >댓글 작성</Button>
              </ButtonWrapper>
            </FooterInput>
          </ReplyContainer>
          )
        }
    </>
  );
};

export default ReComment;

const ReplyContainer = styled.div`
  padding: 1.5rem;
  border: 1px solid #e1e4e8;
  margin-top: 1.3rem;
  border-radius: 4px;
  background-color: #f1f3f5;
`

const FooterInput = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e1e4e8;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`