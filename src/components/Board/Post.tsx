import styled from "styled-components";

interface PostProps {
    postTitle: string; // 게시물 제목
    postContent: string; // 게시물 내용
    postDate: string; // 게시물 작성 일자
    postComment: number; // 게시물 댓글 개수
    postWriter: string; // 게시물 작성자 이름
    postLike: number; // 게시물 좋아요 개수
    postImg: string; // 게시물 이미지
    postProfileImg: string; // 게시물 작성자 이미지
    postLink: string; // 게시물 주소
    postWriterLink: string; // 게시물 작성자 프로필 주소
}

// Post > PostCase
// 게시물
const PostCase = styled.div`
    flex-basis: calc(20% - 32px);
    width: 18%;
    margin: 16px;
    height: 377px;
    background-color: ${props => props.theme.bgColor2};
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
    transition: margin-top 0.5s ease;
    &:hover {
        margin-top: 6px;
    }
`

// Post > PostCase > PostImgLink
// 게시물의 이미지를 감싸고 있는 링크
const PostImgLink = styled.a`
    height: 167px;
    display: block;
`

// Post > PostCase > PostImgLink > PostImg
// 게시물의 이미지
const PostImg = styled.img`
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-top-right-radius: 4px;
    border-top-left-radius: 4px;
`

// Post > PostCase > PostMiddle
// 게시물의 제목, 내용, 날짜, 댓글 수가 포함
const PostMiddle = styled.div`
    height: 133px;
    width: 288px;
    padding: 16px;
`
// Post > PostCase > PostMiddle > PostMiddleLink
// 게시물의 제목, 내용을 감싸는 링크
const PostMiddleLink = styled.a`
    height: 115px;
    width: 100%;
    text-decoration: none;
`
// Post > PostCase > PostMiddle > PostMiddleLink > PostTitle
// 게시물의 제목
const PostTitle = styled.h4`
    margin: 0px;
    margin-bottom: 4px;
    height: 24px;
    color: ${props => props.theme.textColor1};
`
// Post > PostCase > PostMiddle > PostMiddleLink > PostContentCase
// 게시물의 내용을 감싸는 div
const PostContentCase = styled.div`
    width: 100%;
    height: auto;
`
// Post > PostCase > PostMiddle > PostMiddleLink > PostContentCase > PostContent
// 게시물의 내용
const PostContent = styled.p`
    margin: 0px;
    margin-bottom: 24px;
    height: 63px;
    font-size: 14px;
    color: ${props => props.theme.textColor2};
`
// Post > PostCase > PostMiddle > PostSubInfo
// 게시물의 날짜, 댓글수를 포함하는 부가 정보
const PostSubInfo = styled.div`
    width: 100%;
    height: 18px;
`
// Post > PostCase > PostMiddle > PostSubInfo > PostDateAndComment
// 게시물의 날짜, 댓글수
const PostDateAndComment = styled.span`
    font-size: 12px;
    color: ${props => props.theme.textColor3};
`

// Post > PostCase > PostFooter
// 게시물의 작성자, 하트수를 표시
const PostFooter = styled.div`
    height: 24px;
    width: 288px;
    border-top: 1px solid ${props => props.theme.borderColor};
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`

// Post > PostCase > PostFooter > PostProfileLink
// 게시물 작성자의 프로필 링크 (작성자의 프로필 사진, 이름 포함)
const PostProfileLink = styled.a`
    display: flex;
    text-decoration: none;
`

// Post > PostCase > PostFooter > PostProfileLink > PostProfileImg
// 게시물 작성자의 프로필 이미지
const PostProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
`

// Post > PostCase > PostFooter > PostProfileLink > PostProfileText
// 게시물 작성자의 이름을 포함하는 text
const PostProfileText = styled.span`
    font-size: 14px;
    text-align: center;
    line-height: 1.5;
    color: ${props => props.theme.textColor3};
`

// Post > PostCase > PostFooter > PostProfileLink > PostProfileText > PostProfileWriter
// 게시물 작성자의 이름
const PostProfileWriter = styled.b`
    color: ${props => props.theme.textColor1};
`

// Post > PostCase > PostFooter > PostProfileLike
// 게시물의 좋아요 이미지 및 좋아요 수를 포함
const PostProfileLike = styled.div`
    font-size: 12px;
    text-align: center;
    display: flex;
    align-items: center;
    color: ${props => props.theme.textColor1};
`

// Post > PostCase > PostFooter > PostProfileLike > PostProfileLikeImg
// 게시물의 좋아요 이미지
const PostProfileLikeImg = styled.svg`
    width: 12px;
    height: 12px;
    margin-right: 8px;
`

const Post = ({postTitle, postContent, postDate, postComment, postWriter, postLike, postImg, postProfileImg, postLink, postWriterLink}:PostProps) => {
    return (
        <PostCase>
            <PostImgLink href={postLink}>
                <PostImg src={postImg} />
            </PostImgLink>
            <PostMiddle>
                <PostMiddleLink href={postLink}>
                    <PostTitle>{postTitle}</PostTitle>
                    <PostContentCase>
                        <PostContent>{postContent}</PostContent>
                    </PostContentCase>
                </PostMiddleLink>
                <PostSubInfo>
                    <PostDateAndComment>
                        {postDate} · {postComment}개의 댓글
                    </PostDateAndComment>
                </PostSubInfo>
            </PostMiddle>
            <PostFooter>
                <PostProfileLink href={postWriterLink}>
                    <PostProfileImg src={postProfileImg} />
                    <PostProfileText>by <PostProfileWriter>{ postWriter }</PostProfileWriter></PostProfileText>
                </PostProfileLink>
                <PostProfileLike >
                    <PostProfileLikeImg viewBox="0 0 24 24">
                        <path fill="currentColor" d="M18 1l-6 4-6-4-6 5v7l12 10 12-10v-7z"></path>
                    </PostProfileLikeImg>
                    {postLike}
                </PostProfileLike>
            </PostFooter>
        </PostCase>
    )
}

export default Post