import ReComment from './ReComment';
import { styled } from 'styled-components';
import styles from './comment.module.scss';

interface CommentProps {
  item: {
    id: number;
    content: string;
    boardId?: number;
    c_id?: number;
    commenter: string;
    img: string;
    u_id: number;
  }[]
}


const Comment = ({item}: CommentProps) => {
  return (
    <Container>
      {item.map((reply, index) => (
        <div className={styles.comment__list} key={index}>
          <ReComment key={index} item={reply} />
        </div>
      ))}
    </Container>
  );
};

export default Comment;

const Container = styled.div``
