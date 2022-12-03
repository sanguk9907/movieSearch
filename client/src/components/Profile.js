import axios from "../apis/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { StoreContext } from "../App";
import Unchange from "./Unchange";
axios.defaults.withCredentials = true;
function Profile() {
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const { id, nick, userIntroduction, email, phoneNumber } = loginUser;
  const [textAreaCount, setTextAreaCount] = React.useState(0);
  const [updateUser, setUpdateUser] = React.useState({
    nick: nick,
    userIntroduction: userIntroduction,
  });
  const [profileImage, setProfileImage] = React.useState("");
  const [bigImage, setBigImage] = React.useState(false);
  const textareaLength = React.useRef();
  const navigation = useNavigate();

  //사진 올리기(db저장,클라이언트폴더에 저장)
  const submitFile = async () => {
    const file_element = document.querySelector(".file");
    const file = file_element.files[0];
    const form = new FormData();
    if (file) {
      form.append("file", file);
      await axios({
        url: "/file",
        method: "post",
        data: {
          file,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then(() => {
        loadProfileImage();
      });
    }
  };
  //사진 불러오기
  const loadProfileImage = async () => {
    await axios({
      url: "/profileImage",
    }).then(({ data, config }) => {
      const PUBLIC_URL =
        config.baseURL === "http://52.196.233.251:5000"
          ? "http://52.196.233.251"
          : process.env.PUBLIC_URL;
      setProfileImage(`${PUBLIC_URL}/img/${data}`);
      console.log(PUBLIC_URL);
      navigation("/profile");
    });
  };

  const profile = async () => {
    await axios({
      url: "/profile",
      method: "get",
      params: {
        id: loginUser.id,
        nick: updateUser.nick,
        userIntroduction: updateUser.userIntroduction,
      },
    }).then(({ data }) => {
      console.log(data);
      const cloneLogin = { ...loginUser };
      cloneLogin.nick = data.nick;
      cloneLogin.userIntroduction = data.userIntroduction;
      setLoginUser(cloneLogin);
      if (localStorage.loginUser) {
        localStorage.setItem("loginUser", JSON.stringify(cloneLogin));
      } else {
        sessionStorage.setItem("loginUser", JSON.stringify(cloneLogin));
      }
      alert("수정이 완료되었습니다.");
      window.scroll({
        top: 0,
      });
    });
  };
  React.useEffect(() => {
    loadProfileImage();
  }, []);
  return (
    <>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="profile-image">
          <div className="img-box">
            <img
              src={profileImage}
              alt="프로필이미지"
              onClick={(e) => {
                console.log(e.target.src);
                setBigImage(true);
              }}
            ></img>
          </div>
          <input
            style={{
              width: "50%",
              padding: "0",
              color: "#fff",
              backgroundColor: "inherit",
            }}
            className="file"
            type="file"
            accept="image/*"
          />
          <Button onClick={submitFile} type="button">
            등록하기
          </Button>
          <p>나를 표현하는 프로필 이미지를 등록해보세요</p>
        </div>
        <Form.Field>
          <Unchange
            label={"아이디"}
            content={id}
            description={
              "회원가입 시 입력하신 회원님의 아이디 입니다 비밀번호찾기에 사용되며 변경은 불가능합니다."
            }
          />
        </Form.Field>
        <Form.Field>
          <Unchange
            label={"비밀번호"}
            content={
              <Button
                onClick={() => {
                  navigation("/newpaddword");
                }}
              >
                비밀번호 변경
              </Button>
            }
            description={"비밀번호는 열람이 불가능하며 변경만 가능합니다."}
          />
        </Form.Field>
        <Form.Field>
          <Unchange
            label={"전화번호"}
            content={phoneNumber}
            description={
              "회원가입 시 입력하신 회원님의 전화번호입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
            }
          />
        </Form.Field>
        <Form.Field>
          <Unchange
            label={"이메일"}
            content={email}
            description={
              "회원가입 시 입력하신 회원님의 이메일입니다. 아이디, 비밀번호 찾기에 사용되며 변경은 불가능합니다."
            }
          />
        </Form.Field>
        <Form.Field>
          <label>닉네임</label>
          <input
            value={updateUser.nick}
            placeholder="닉네임"
            onChange={(e) => {
              const cloneUpdate = { ...updateUser };
              cloneUpdate.nick = e.target.value;
              if (e.target.value.length > 10) {
                alert("10자를 초과하셨습니다.");
                return;
              }
              setUpdateUser(cloneUpdate);
            }}
          />
          <p>10글자 이내로 자신을 나타내는 이름을 지어주세요!</p>
        </Form.Field>
        <Form.Field>
          <label>소개 </label>
          <textarea
            rows="4"
            cols="50"
            value={updateUser.userIntroduction}
            placeholder="나를 소개해주세요!"
            ref={textareaLength}
            onChange={(e) => {
              setTextAreaCount(e.target.value.length);
              if (e.target.value.length >= 100) {
                alert("100자를 초과하셨습니다.");
                return;
              }

              const cloneUpdate = { ...updateUser };
              cloneUpdate.userIntroduction = e.target.value;
              setUpdateUser(cloneUpdate);
            }}
          />

          <p>100자 이내의 짧은 글로 자신을 소개해보세요!</p>
          <p>{textAreaCount}/100</p>
        </Form.Field>
        <Form.Field>
          <Button
            onClick={(e) => {
              e.preventDefault();

              if (updateUser.nick === "") {
                alert("닉네임을 확인해주세요");
                return;
              }
              profile();
            }}
          >
            수정하기
          </Button>
        </Form.Field>
      </Form>
      {bigImage && (
        <div
          className="big-profile-img"
          onClick={() => {
            setBigImage(false);
          }}
        >
          <img
            src={process.env.PUBLIC_URL + profileImage}
            alt="프로필이미지"
          ></img>
        </div>
      )}
    </>
  );
}

export default Profile;
