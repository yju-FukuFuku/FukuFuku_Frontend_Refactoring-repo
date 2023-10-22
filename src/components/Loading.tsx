import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const Loading = () => {
  return (
    <Container>
      <LoadingContainer>
        <FadeLoader color={"#3f51b5"} />
      </LoadingContainer>
    </Container>
  );
};

export default Loading;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const LoadingContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, 50%);
`;
