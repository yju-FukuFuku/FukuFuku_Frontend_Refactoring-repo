import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import Board from '../../components/board'
import { getBoard } from '../../api/BoardAPI'
import { PostType } from '../../components/board'

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
  
  // GetData
  // const getData = () => {
  //   console.log("데이터 렌더링")
  //   //   
  //   getBoards().then((data) => {
  //     console.log(data)
  //     setPost(data)
  //   })
  // }

  // 데이터 불러오기
  const loadMoreData = useCallback(async () => {
    if( loading || !hasMore) return;
    setLoading(true);
    try {
      const newData = await getBoard(page + 1, 6);
      setPosts([...posts, ...newData ]);
      if (newData.length === 0){
        setHasMore(false);
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
      if (container.scrollHeight - container.clientHeight <= container.scrollTop + 100) {
        loadMoreData();
      }
    };
    
    container.addEventListener('scroll', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [loadMoreData])

  

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
  overflow: scroll;

  @media (max-width: 767px){
    padding: 0;
  }
`
