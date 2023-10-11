import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Board from '../../components/board'
import { getBoard } from '../../api/BoardAPI'
import { PostType } from '../../components/board'
import { debounce } from '@mui/material'

const MainPage = () => {

  // 데이터 렌더링
  useEffect(() => {
    loadMoreData()
  }, [])

  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // 데이터 불러오기
  const loadMoreData = useCallback(async () => {
    if( loading || !hasMore) return;
    setLoading(true);
    try {
      const newData = await getBoard(page + 1, 6);
      console.log(newData)
      setPosts([...posts, ...newData ]);
      if (newData.length === 0){
        setHasMore(false);
        console.log("more end");
        
      }
      setPage(page + 1)
    } catch(error) {
      console.error('Error loading more data: ', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, posts])
  
  // 스크롤
  useEffect(() => {
      // 스크롤 체크  
    const container = containerRef.current;
    if(!container) return;
    
    const handleScroll = () => {
      console.log("scrollHeight  " + container.scrollHeight);
      console.log("clientHeight  " + container.clientHeight);
      console.log("scrollTop  " + window.scrollY);
      
      if (container.scrollHeight - container.clientHeight <= window.scrollY) {
        console.log("loadMore");
        
        loadMoreData();
      }
    };
    window.addEventListener('scroll', debounce(handleScroll));

    return () => {
      window.removeEventListener('scroll', debounce(handleScroll));
    };
  }, [])

  

  return (
    <>
        {/* <div>MainPage
          <Link to='/login'>Login</Link>
        </div> */}
        <Container ref={containerRef}>
          {
            posts ? (
              <Board posts={posts} />
              ) : (
                "none"
                )
              }
        </Container>
    </>

  )
}

export default MainPage

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2vw;
  /* overflow: scroll; */

  @media (max-width: 767px){
    padding: 0;
  }
`
