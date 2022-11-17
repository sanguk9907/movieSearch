import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { StoreContext } from "../App";
import { MobileHeader, Header } from "../components";
axios.defaults.withCredentials = true;
function ChangePassword() {
  const { loginUser, showMobileHeader } = React.useContext(StoreContext);
  const navigation = useNavigate();

  const [newPassword, setNewPassword] = React.useState({
    password: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const passwordChange = async () => {
    await axios({
      url: "http://localhost:5000/changepassword",
      method: "post",
      data: newPassword,
    }).then(({ data }) => {
      alert(data.message);
      if (data.code === "success") {
        newPassword.password = "";
        newPassword.newPassword = "";
        newPassword.newPasswordConfirm = "";
        navigation("/");
      }
    });
  };
  return (
    <>
      {showMobileHeader ? <MobileHeader /> : <Header />}
      <div className="change-password">
        <div className="form-wrap">
          <Form>
            <Form.Field>
              <label>현재 비밀번호</label>
              <input
                value={newPassword.password}
                type="password"
                placeholder="현재 비밀번호"
                onChange={(e) => {
                  const cloneNewPassword = { ...newPassword };
                  cloneNewPassword.password = e.target.value;
                  setNewPassword(cloneNewPassword);
                }}
              />
              <p>현재 사용중인 비밀번호를 입력해주세요</p>
            </Form.Field>

            <Form.Field>
              <label>새 비밀번호</label>
              <input
                value={newPassword.newPassword}
                type="password"
                placeholder="새 비밀번호"
                onChange={(e) => {
                  const cloneNewPassword = { ...newPassword };
                  cloneNewPassword.newPassword = e.target.value;
                  setNewPassword(cloneNewPassword);
                }}
              />
              <p>새로 사용하실 비밀번호를 입력해주세요</p>
            </Form.Field>

            <Form.Field>
              <label>새 비밀번호 확인</label>
              <input
                value={newPassword.newPasswordConfirm}
                type="password"
                placeholder="새 비밀번호 확인"
                onChange={(e) => {
                  const cloneNewPassword = { ...newPassword };
                  cloneNewPassword.newPasswordConfirm = e.target.value;
                  setNewPassword(cloneNewPassword);
                }}
              />
              <p>새로 사용하실 비밀번호를 다시 한 번 입력해주세요</p>
            </Form.Field>
            <Button
              onClick={() => {
                passwordChange();
              }}
            >
              확인
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
