import ReComment from "./ReComment";
import { styled } from "styled-components";
import styles from "./comment.module.scss";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RootState } from "../../store";
import { Button } from "@mui/material";
import { deleteComment, getComment, postComment } from "../../api/Comments";
import { useSelector } from "react-redux";

interface Comment {
  id: number;
  content: string;
  boardId: number;
  commenter: string;
  img: string;
  u_id: number;
}
[];

const Comment = () => {
  const [comments, setComments] = useState<Comment[]>();
  const [commentValue, setCommentValue] = useState<string>("");

  const { boardId } = useParams();

  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async () => {
    if (boardId) {
      await getComment(Number(boardId)).then((res) => {
        setComments(res);
      });
    }
  };

  // 댓글 작성
  const handleComment = async () => {
    if (!user.id) {
      alert("로그인이 필요합니다.");
      return;
    }

    const data = {
      content: commentValue,
      boardId: Number(boardId),
      commenter: user.nickName,
      img: user.picture,
      u_id: user.id,
    };

    try {
      await postComment(data);
      setCommentValue("");
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?") === false) return;
    try {
      await deleteComment(id);
      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <FooterWrapper>
        <FooterHead>
          <h4>0개의 댓글</h4>
        </FooterHead>

        <FooterInput>
          <textarea
            className={styles.inputComment}
            placeholder="댓글을 입력하세요"
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <ButtonWrapper>
            <Button variant="contained" color="primary" onClick={handleComment}>
              댓글 작성
            </Button>
          </ButtonWrapper>
        </FooterInput>
      </FooterWrapper>

      <Container>
        {comments?.map((comment, index) => (
          <div className={styles.comment__list} key={index}>
            <ReComment
              key={index}
              comment={comment}
              handleDelete={handleDelete}
            />
          </div>
        ))}
      </Container>
    </>
  );
};

export default Comment;

const Container = styled.div`
  margin-bottom: 5rem;
`;

const FooterWrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;

const FooterHead = styled.div`
  padding: 0.4rem;
  line-height: 1.5;
  font-weight: 600;
`;

const FooterInput = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
