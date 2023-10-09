import React, { useState, useEffect, useRef } from 'react'
import style from './myPage.module.css'
import Swal from 'sweetalert2'  // 경고창 라이브러리
import { fire } from '../../util/fire';
import { useSelector } from 'react-redux';
import { RootState, store } from '../../store';
import { clearUser, setUser } from '../../store/User';
import { useNavigate } from 'react-router-dom';
import { deleteUser, introChange, editName } from '../../api/User';
import { editUserImage } from '../../api/Image';
import { useDispatch } from 'react-redux';

const MyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const userEmail = user.email || '불러오지 못했습니다.';
  const [userId, setUserId] = useState<number>(0);
  const [userName, setName] = useState<string>('');
  const [content, setContent] = useState<string | undefined>('')    // 한 줄 소개
  const [reName, setReName] = useState<boolean>(false)  // 닉네임 수정 check
  const fileInputRef = useRef<HTMLInputElement | null>(null); // 이미지 불러오기
  const [introCheck, setIntroCheck] = useState<boolean>(false)

  // 유저 정보 불러오기 (한 줄 소개, 닉네임, 이미지가 바뀔 떄마다)
  useEffect(() => {
    if (!user.isLogin) {
      fire("로그인 후에 사용하실 수 있습니다.");
      navigate('/');
    }
    getData();
  }, []);

  const getData = () => {
    setName(user.nickName ? user.nickName : (userName ? userName : userEmail));
    setContent(user.introduction || `${user.nickName} 입니다.`)
    setUserId(user.id ? user.id : 0)
  }


  const handleImageUpdate = () => { // 이미지 변경 요청
    fileInputRef.current?.click();
  }

  const extension = ['png', 'jpg', 'jpeg'] // 파일 확장자 제한 변수

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length !== 1) {
      fire("이미지 하나를 선택하세요.");
      return;
    }

    const fileType = e.target.files[0].type.split("/")[1];

    if (!extension.includes(fileType)) {
      fire("올바르지 않은 확장자입니다. (jpg, jpeg, png)");
      return;
    }

    handlePostImg(e.target.files[0])
    e.target.files = null;
  };

  // 이미지 변경 Post
  const handlePostImg = (e: File) => {
    const formData = new FormData();
    formData.append('file', e);

    editUserImage(formData, userId)
      .then((data) => {
        const userInfo = { ...user };
        userInfo.picture = data.data.picture;
        store.dispatch(setUser(userInfo));
        fire("이미지 변경 성공", "success", "success");
      })
      .catch(({ response }) => {
        const errorMessage = response?.data?.statusCode;
        let message = "문제가 생겼습니다. 나중에 다시 시도해주세요.";

        if (errorMessage === 422) {
          message = "이미지를 넣으세요.";
        }
        if (errorMessage === 415) {
          message = "올바르지 않은 확장자입니다. (jpg, jpeg, png)";
        }
        fire(message);
      })
  }

  // 버튼 클릭시 reName 입력
  const checkTry = () => {
    setReName(true)
  }

  const [inputName, setInputName] = useState<string>(userName)

  const handleInputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 띄어쓰기 막기.
    if (!e.target.value.includes(" ")) {
      setInputName(e.target.value)
    }
  }

  // 닉네임 수정 - Put
  const handleNameUpdate = () => {
    if (!inputName || user.nickName === inputName) {
      fire("기존의 닉네임과 다른 한 글자 이상의 닉네임을 입력하세요");
      setReName(false);
      return;
    }

    editName(user.id as number, inputName)
      .then(({ data }) => {
        const userInfo = { ...user };
        userInfo.nickName = data.data.nickName;
        store.dispatch(setUser(userInfo));
        fire("닉네임 변경 성공", "success", "success");
      })
      .catch(({ response }) => {
        const isConflict = response.data.statusCode === 409;
        const message = isConflict
          ? "누군가 사용중인 닉네임입니다."
          : "문제가 생겼습니다. 나중에 다시 시도해주세요."

        fire(message);
      })
    setInputName('');
    setReName(false);
  }

  // 회원탈퇴 fetch요청
  const handleUserRemove = () => {

    Swal.fire({
      title: "정말 탈퇴하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const deleteObj = {
            data: {
              where: {
                id: userId
              }
            }
          }
          deleteUser(deleteObj)
            .then(() => {
              dispatch(clearUser());
              window.localStorage.clear();
              navigate('/');
            })
            .catch(() => {
              fire();
            })
        }
      });
  }
  // INTRO
  let userData = ''
  // intro 수정 요청
  const handleUpdateCheck = () => {
    setIntroCheck(true)
  }

  // intro 내용 수정
  const changeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    userData = e.target.value
    setContent(userData);
  }

  const handleUpdateContent = () => {
    if (!content || user.introduction === content) {
      fire("기존의 내용과 다른 한 글자 이상의 내용을 입력하세요");
      setIntroCheck(false);
      return;
    }

    introChange(user.id as number, content)
      .then(({ data }) => {
        const userInfo = { ...user };
        userInfo.introduction = data.data.introduction;
        store.dispatch(setUser(userInfo));
        fire("한 줄 소개 수정 성공", "success", "success");
      })
      .catch(() => {
        fire();
        setContent(user.introduction || `${user.nickName} 입니다.`);
      })
    setIntroCheck(false)
  }

  return (
    <div
      className={style.container}
      style={{ display: `${user.isLogin ? "block" : "none"}` }}
    >
      <div className={style.myPage}>
        <div className={style.profileBox}>
          <div className={style.profile}>
            <div className={style.myImage}>
              <img src={user.picture as string || "https://yju-fukufuku.s3.amazonaws.com/logo.svg"} alt="image" className={style.myImage} />
            </div>
            <button className={style.imgBtn} onClick={handleImageUpdate}>이미지 수정</button>
            {/* <button className={style.modifyBtn} onClick={handleImageRemove}>이미지 제거</button> */}
            <input type="file" className={style.file} ref={fileInputRef} onChange={handleFileChange} accept='image/*' id="image" />
          </div>

          {/* intro 수정 */}
          {introCheck ? (
            <div className={style.introBox}>
              <input type="text" defaultValue={user.introduction as string} onChange={changeContent} maxLength={100} />
              <div className={style.inputBlock}>
                <button className={style.modifyBtn} onClick={handleUpdateContent}>완료</button>
              </div>
            </div>
          ) : (
            <div className={style.introBox}>
              <h2>한 줄 소개</h2>
              <div className={style.intro}>
                {user.introduction || `${user.nickName} 입니다.`}
              </div>
              <button className={style.modifyBtn} onClick={handleUpdateCheck}>수정</button>
            </div>
          )}
        </div>
        <div>
          <hr />
        </div>
        <div className={style.setting}>
          <div className={style.wrapper}>
            <div className={style.wrapperList}>
              <label>아이디</label>
              <div>{userEmail}</div>
            </div>
            <p>회원가입 하신 ID입니다.</p>
          </div>
          <div className={style.wrapper}>
            {/* nickname 수정 */}
            {reName ? (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <input type="text" className={style.username} defaultValue={user.nickName as string} onChange={handleInputName} maxLength={20} />
                <span className={style.updateName}>
                  <button className={style.updateBtn} onClick={handleNameUpdate}>저장</button>
                </span>
              </div>
            ) : (
              <div className={style.wrapperList}>
                <label>닉네임</label>
                <div>
                  {user.nickName || user.email}
                </div>
                <span>
                  <button className={style.modifyBtn} onClick={checkTry}>수정</button>
                </span>
              </div>
            )}
            <p>페이지 내에서 사용하는 닉네임입니다.</p>
          </div>
          <div className={style.wrapper}>
            <div className={style.wrapperList}>
              <label>회원탈퇴</label>
              <button type='button' className={style.removeBtn} onClick={handleUserRemove}>회원탈퇴</button>
            </div>
            <p>탈퇴 시 작성한 게시글은 모두 삭제되며 복구되지 않습니다.</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default MyPage