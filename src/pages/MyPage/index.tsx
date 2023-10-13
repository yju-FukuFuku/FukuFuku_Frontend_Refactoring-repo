import Setting from "./Setting";
import WriteList from "./WriteList";
import style from "./myPage.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import { verifyUser } from "../../api";

const MyPage = () => {
  const user = useSelector((state: RootState) => state.user);
  
  verifyUser();

  const [setting, setSetting] = useState<boolean>(true);

  return (
    <div
      className={style.container}
      style={{ display: `${user.isLogin ? "block" : "none"}` }}
    >
      <div className={style.navbar}>
        <button
          onClick={() => {
            setSetting(true);
          }}
        >
          {" "}
          내 정보{" "}
        </button>
        <button
          onClick={() => {
            setSetting(false);
          }}
        >
          {" "}
          쓴 글 목록{" "}
        </button>
      </div>
      <div className={style.myPage}>
        {setting ? <Setting /> : <WriteList />}
      </div>
    </div>
  );
};

export default MyPage;
