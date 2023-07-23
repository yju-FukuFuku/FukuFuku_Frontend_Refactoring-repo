import { atom, selector } from "recoil";
import { lightTheme, darkTheme } from "./theme";

export const themeState = atom({
  key: 'themeState',
  default: true,
});

export const themeSelector = selector({
    key: "recoilSelector",
    get: ({ get }) => {
        const theme = get(themeState);
        return theme === true ? lightTheme : darkTheme;
    }
})

export const themeSelectorString = selector({
    key: "recoilSelectorString",
    get: ({ get }) => {
        const theme = get(themeState);
        return theme === true ? "lightTheme" : "darkTheme";
    }
})

export const prevThemeState = atom({
    key: "prevThemeState",
    default: true,
})

type postType = {
        // title: string; // 게시물 제목
        // content: string; // 게시물 내용
        // writeDate: string; // 게시물 작성 일자
        // postComment: number; // 게시물 댓글 개수
        // postWriter: string; // 게시물 작성자 이름
        // postLike: number; // 게시물 좋아요 개수
        // PostImage.url: string; // 게시물 이미지
        // UserImage.url: string; // 게시물 작성자 이미지
        // p_id: string; // 게시물 주소
        // User.u_id: string; // 게시물 작성자 프로필 주소

        // 임시값
        albumId: number;
        id: number;
        title: string;
        url: string;
        thumbnailUrl: string;
    }

export const postState = atom({
    key: "postState",
    default: <postType[]>[],
})

export const boardNumber = atom({
    key: "boardNumber",
    default: 1,
})