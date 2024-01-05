import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Link } from 'react-router-dom';

function Login() {

const navigate = useNavigate();

const style = {
    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/4d237e46-3105-4671-8b17-4fba0ec80f25/KR-ko-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg")`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
};

const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
};

const logoStyle = {
    color: '#E10909', 
    fontWeight: 'bold', 
    fontSize: '45px', 
    fontFamily: 'Arial, sans-serif',
    position: 'absolute', 
    top: '10px', 
    left: '10px',
    width: '138px', 
    height: '48px',
    textDecoration: 'none',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '450px',
    height: '500px',
    backgroundColor: 'black',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
};

const titleStyle = {
    color: 'white',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'left',
    width: '314px',
    height: '43px'
};

const inputStyle = {
    width: '314px',
    height: '50px',
    backgroundColor: '#333333',
    color: 'white',
    padding: '16px 20px 0px',
    marginBottom: '10px',
    borderRadius: '5px'
};

const loginButtonStyle = {
    width: '314px',
    height: '50px',
    backgroundColor: '#E10909',
    color: 'white',
    borderRadius: '5px',
    border: 'none',
    marginBottom: '10px',
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    cursor: 'pointer'
};

const findButtonStyle = {
    display: 'flex', // flex를 활용
    alignItems: 'center', // 수직 중앙 정렬
    justifyContent: 'center', // 수평 중앙 정렬
    width: '150px',
    height: '50px',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '5px',
    border: '1px solid white',
    marginBottom: '10px',
    padding: '0px', // padding을 0으로 조정
    cursor: 'pointer',
    marginRight: '7px',
};

const buttonContainerStyle = {
    display: 'flex', // 버튼들을 가로로 배치합니다.
    justifyContent: 'center', // 버튼들을 중앙에 배치합니다.
    marginBottom: '20px',
};

const notMemberTextStyle = {
    color: '#737373',
    fontSize: '16px',
    textAlign: 'center',
    marginTop: '20px'
};

const signupTextStyle = {
    color: 'white',
    fontSize: '16px',
    marginLeft: '5px',
    textDecoration: 'none'
};

const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

/*const { setIsLoggedIn } = useContext(AuthContext);*/
const { login } = useContext(AuthContext);

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:4000/api/Login', {
            email,
            password
        });

        if(response.status === 200) {
            alert('로그인에 성공했습니다.');
            login();
            navigate("/tv");
        } else {
            alert('로그인에 실패했습니다.');
        }
    } catch (error) {
        if (error.response) {
            console.error(error.response);
            switch (error.response.status) {
                case 401:
                    alert('로그인에 실패했습니다.');
                    break;
                default:
                    alert('서버 오류로 로그인에 실패했습니다.');
                    break;
            }
        } else {
            console.error(error);
            alert('요청 처리 중 오류가 발생했습니다.');
        }
    }
};

return (
    <div style={style}>
        <div style={overlayStyle}>
        <a href="/" style={logoStyle}>HAKFLIX</a>
            <form style={formStyle} onSubmit={handleLogin}>
                <div style={titleStyle}>로그인</div>
                <input style={inputStyle} type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} />
                <input style={inputStyle} type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                <button style={loginButtonStyle} type="submit">로그인</button>
                <div style={buttonContainerStyle}>
                    <button style={findButtonStyle} onClick={() => alert('아이디 찾기 기능은 준비 중입니다.')}>아이디 찾기</button>
                    <button style={findButtonStyle} onClick={() => alert('비밀번호 찾기 기능은 준비 중입니다.')}>비밀번호 찾기</button>
                </div>
                <div>
                    <span style={notMemberTextStyle}>HAKFLIX 회원이 아닌가요?</span>
                    <Link to="/signup" style={signupTextStyle}>지금 가입하세요</Link> {/* 새로 추가된 문구 */}
                </div>
            </form>
        </div>
    </div>
);
}

export default Login;