import ReComment from './ReComment';
import { styled } from 'styled-components';
import styles from './comment.module.scss';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { store } from '../../store';

interface Comment {
  id: number;
  content: string;
  boardId: number;
  commenter: string;
  img: string;
  u_id: number;
}[]

const Comment = () => {
  const [comments, setComments] = useState<Comment[]>();

  const { boardId } = useParams();
  
  useEffect(() => {
    getComment();
  }, [])

  async function getComment() {
    await axios.get(`comments/${boardId}`).then((res) => {
      setComments(res.data);
    }).catch((error) => {
      console.log(error);
    }); 
  }
  

  return (
    <Container>
      {comments?.map((comment, index) => (
        <div className={styles.comment__list} key={index}>
          <ReComment key={index} comment={comment}/>
        </div>
      ))}
    </Container>
  );
  
};

export default Comment;

const Container = styled.div``