import { Add } from '@mui/icons-material';
import styles from './board.module.scss';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { Button } from '@mui/material';
import Comment from './Comment';
import axios from 'axios';

interface ReCommentProps {
  item: {
    id: number;
    content: string;
    boardId?: number;
    c_id?: number;
    commenter: string;
  }
}

interface Reply {
  id: number;
  content: string;
  c_id: number;
  commenter: string;
}[]

const ReComment = ({ item }: ReCommentProps) => {

  const [show, setShow] = useState<boolean>(false)
  const [comment, setComment] = useState<string>('')
  const [replys, setReplys] = useState<Reply[]>([])

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

    console.log(item);
    
  
  useEffect(() => {
    getReply();
  }, [])

  const handleReply = async () => {
    const data = {
      content: comment,
      c_id: Number(item.id),
      commenter: 'hetame',
    };

    await axios.post('/replys', data)
      .then((res) => {
        console.log(res)
        getReply();
      }
    ).catch((err) => {
      console.log(err)
    })

    setComment('')
  }

  return (
    <>
      <div className={styles.comment__head}>
        <div className={styles.profile}>
          <a href='javascript:void(0)'>
            {/* <img src={item.userImg} alt='profile' /> */}
          </a>

          <div className={styles.profile__info}>
            <a href='javascript:void(0)'>{item.commenter}</a>
            {/* <span>{item.date}</span> */}
          </div>
        </div>
      </div>

      <div className={styles.comment__body}>
        <p>{item.content}</p>
      </div>

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
                <Comment item={replys} />
              }
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