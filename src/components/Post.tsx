import React from "react";
import styled from "styled-components";

interface PostProps {
    postTitle: string;
    postContent: string;
    postDate: string;
    postComment: number;
    postWriter: string;
    postLike: number;
    postImg: string;
    postProfileImg: string;
}

// Post > PostCase
// 게시물
const PostCase = styled.div`
    flex-basis: calc(20% - 32px);
    width: 18%;
    margin: 16px;
    height: 377px;
    background-color: #1e1e1e;
    border-radius: 4px;
    font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", "Apple SD Gothic Neo", "Malgun Gothic", "맑은 고딕", 나눔고딕, "Nanum Gothic", "Noto Sans KR", "Noto Sans CJK KR", arial, 돋움, Dotum, Tahoma, Geneva, sans-serif;
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
    background-color: yellow;
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
`

// Post > PostCase > PostFooter
// 게시물의 작성자, 하트수를 표시
const PostFooter = styled.div`
    height: 24px;
    width: 288px;
    border-top: 1px solid gray;
    padding: 10px 16px;
    background-color: teal;
    display: flex;
    justify-content: space-between;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`

const PostProfileLink = styled.a`
    display: flex;
`

const PostProfileImg = styled.img`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
`

const PostProfileName = styled.span`
    font-size: 14px;
    text-align: center;
    line-height: 1.5;
`

const PostProfileLike = styled.div`
    font-size: 12px;
    text-align: center;
    display: flex;
    align-items: center;
`

const PostProfileLikeImg = styled.svg`
    width: 12px;
    height: 12px;
    margin-right: 8px;
`

const Post = ({postTitle, postContent, postDate, postComment, postWriter, postLike, postImg, postProfileImg}:PostProps) => {
    return (
        <PostCase>
            <PostImgLink href="/게시물 링크">
                <PostImg src={postImg} />
            </PostImgLink>
            <PostMiddle>
                <PostMiddleLink href="/게시물 링크">
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
                <PostProfileLink>
                    <PostProfileImg src={postProfileImg} />
                    <PostProfileName>by <b>{ postWriter }</b></PostProfileName>
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