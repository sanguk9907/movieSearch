import axios from "../apis/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Icon } from "semantic-ui-react";
import { StoreContext } from "../App";
import Unchange from "./Unchange";
import { userDelete } from "../apis/fetchData";

function Delete() {
  const Navigation = useNavigate();
  const { loginUser, setLoginUser } = React.useContext(StoreContext);
  const { seq, id } = loginUser;
  const [userCheckInfo, setUserCheckInfo] = React.useState({
    seq: seq,
    id: id,
    password: "",
  });
  const [activeDeleteBtn, setActiveDeleteBtn] = React.useState(false);

  return (
    <Form>
      <Form.Field>
        <Unchange
          label={"회원탈퇴"}
          content={
            <Button
              type="button"
              onClick={() => {
                setActiveDeleteBtn(true);
              }}
            >
              탈퇴하기
            </Button>
          }
          description={"회원 탈퇴 시 사용하시던 계정의 모든 정보가 사라집니다."}
        />
      </Form.Field>
      {activeDeleteBtn && (
        <div className="delete-modal-bg">
          <div className="delete-modal">
            <Icon
              name="close"
              onClick={() => {
                setActiveDeleteBtn(false);
              }}
            />
            <Form.Field>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호"
                onChange={(e) => {
                  const cloneUserCheckInfo = { ...userCheckInfo };
                  cloneUserCheckInfo.password = e.target.value;
                  setUserCheckInfo(cloneUserCheckInfo);
                }}
              />
              <p>확인을 위해 비밀번호를 입력해주세요</p>

              <Button
                onClick={async () => {
                  const deletecheck = await userDelete(userCheckInfo);
                  if (deletecheck.code === "success") {
                    localStorage.removeItem("loginUser");
                    sessionStorage.removeItem("loginUser");
                    const cloneLogin = { ...loginUser };
                    cloneLogin.email = "";
                    cloneLogin.id = "";
                    cloneLogin.nick = "";
                    cloneLogin.phoneNumber = "";
                    cloneLogin.seq = "";
                    cloneLogin.userIntroduction = "";
                    setLoginUser(cloneLogin);

                    alert(deletecheck.message);
                    Navigation("/");
                  } else {
                    alert(deletecheck.message);
                  }
                }}
              >
                탈퇴하기
              </Button>
            </Form.Field>
          </div>
        </div>
      )}
    </Form>
  );
}

export default Delete;
