import ReComment from './ReComment';
import { styled } from 'styled-components';
import styles from './board.module.scss';

interface CommentProps {
  item: {
    userImg: string;
    userName: string;
    date: string;
    comment: string;
  }[]
}

const Comment = ({item}: CommentProps) => {

  return (
    <Container>
        {item.map((item, index) => (
          <div className={styles.comment__list}>
            <ReComment key={index} item={item} />
          </div>
        ))}
    </Container>
  );
};

export default Comment;

const Container = styled.div``
