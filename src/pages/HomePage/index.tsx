import { useState, useEffect, useRef, useCallback } from "react";
import { styled } from "styled-components";
import Board from "../../components/board";
import { getBoard } from "../../api/BoardAPI";
import { PostType } from "../../components/board";
import { debounce } from "@mui/material";

const MainPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [lastId, setLastId] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [request, setRequest] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 데이터 렌더링
  useEffect(() => {
    loadMoreData();
  }, []);

  useEffect(() => {
    if (request && hasMore) {
      loadMoreData();
    }
  }, [request]);

  // 데이터 불러오기
  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newData = await getBoard(lastId, 6);
      console.log(newData);
      if (JSON.stringify(posts) === JSON.stringify(newData)) {
        console.log("같음");
        return;
      }
      setPosts((prev) => [...prev, ...newData]);
      // console.log("new Data");
      // console.log(posts);

      if (newData.length <= 9) {
        setHasMore(false);
        // console.log("more end");
      }
      const newLastId = newData[newData.length - 1]?.id;
      setLastId(newLastId);
      // console.log("lastId up");
    } catch (error) {
      console.error("Error loading more data: ", error);
    } finally {
      setLoading(false);
      setRequest(false);
    }
  }, [loading, hasMore, lastId, posts]);

  // 스크롤
  useEffect(() => {
    // 스크롤 체크
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      // console.log("scrollHeight  " + container.scrollHeight);
      // console.log("clientHeight  " + container.clientHeight);
      // console.log("scrollTop  " + window.scrollY);

      if (
        container.scrollHeight - container.clientHeight + 100 <=
        window.scrollY
      ) {
        // console.log("loadMore");
        setRequest(true);
      }
    };
    window.addEventListener("scroll", debounce(handleScroll));

    return () => {
      window.removeEventListener("scroll", debounce(handleScroll));
      setRequest(false);
    };
  }, []);

  useEffect(() => {
    // console.log("lastId 변경");
    console.log(`lastId: ${lastId}`);
  }, [lastId]);

  return (
    <>
      {/* <div>MainPage
          <Link to='/login'>Login</Link>
        </div> */}
      <Container ref={containerRef}>
        {posts ? <Board posts={posts} /> : "none"}
      </Container>
    </>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw;
  /* overflow: scroll; */

  @media (max-width: 767px) {
    padding: 0;
  }
`;
