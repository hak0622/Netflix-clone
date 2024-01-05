import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; 

function SignUp() {
const navigate = useNavigate();

const handleLoginClick = () => {
  navigate('/Login'); // 이 부분을 로그인 페이지의 경로로 바꿔주세요.
}

const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
//const [isDuplicated, setIsDuplicated] = useState(false);
const [emailStatus, setEmailStatus] = useState(null);

useEffect(() => {
  const checkDuplicateEmail = async () => {
    if (!email) {
      setEmailStatus(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:4000/api/check-email?email=${email}`);
      setEmailStatus(!response.data.isDuplicated); // 이메일 상태 업데이트
    } catch (error) {
      console.error(error);
      alert('서버 오류로 이메일 중복 확인에 실패했습니다.');
    }
  };

  checkDuplicateEmail();
}, [email]);

const handleSignUp = async (e) => {
  e.preventDefault();

  if (!username || !email || !password) {
    alert('모든 필드를 채워주세요.');
    return;
  }

  if(emailStatus === false) {
    alert('사용할 수 없는 이메일입니다.');
    return;
  }

  try {
    const response = await axios.post('http://localhost:4000/api/signup', {
      username,
      email,
      password
    });

    if(response.status === 200) {
      alert('회원가입에 성공했습니다.');
      navigate('/'); 
    } else {
      alert('회원가입에 실패했습니다.');
    }
  } catch (error) {
    console.error(error.response);
    alert('서버 오류로 회원가입에 실패했습니다.');
  }
};


const style = {
    backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/c31c3123-3df7-4359-8b8c-475bd2d9925d/4d237e46-3105-4671-8b17-4fba0ec80f25/KR-ko-20231225-popsignuptwoweeks-perspective_alpha_website_large.jpg")`,
    height: '100vh',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'relative'
};
const overlayStyle = {
backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 검정색 배경
position: 'absolute', // 부모 요소(여기서는 배경 이미지)에 대한 절대적 위치 지정
top: 0, // 상단에 붙이기
bottom: 0, // 하단에 붙이기
left: 0, // 왼쪽에 붙이기
right: 0, // 오른쪽에 붙이기
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
textDecoration: 'none', // 추가된 줄
};

const buttonStyle = {
position: 'absolute',
top: '10px',
right: '20px',
width: '90px',
height: '40px',
backgroundColor: '#E10909',
color: 'white',
borderRadius: '0.1875rem',
borderWidth: '0.0625rem',
borderStyle: 'solid',
borderColor: '#E10909',
textAlign: 'center',
lineHeight: '32px',
cursor: 'pointer',
};

const formStyle = {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
justifyContent: 'center',
width: '450px',
height: '550px',
backgroundColor: 'black',
color: 'white',
padding: '20px',
borderRadius: '10px',
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)' // 화면 중앙에 배치
};

const titleStyle = {
color: 'white',
fontSize: '32px',
fontWeight: 'bold',
marginBottom: '20px',
textAlign: 'left', // 좌측 정렬
width: '314px', // 너비 설정
height: '43px' // 높이 설정
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

const signUpButtonStyle = {
width: '314px',
height: '50px',
backgroundColor: buttonStyle.backgroundColor,
color: buttonStyle.color,
borderRadius: '5px',
border: 'none',
marginBottom: '10px',
padding: '16px 20px 0px',
cursor: 'pointer'
};

const inputContainerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative'
};

return (
  <div style={style}>
    <div style={overlayStyle}></div>
    <a href="/" style={logoStyle}>HAKFLIX</a>
    <button style={buttonStyle} onClick={handleLoginClick}>로그인</button>
    <form style={formStyle} onSubmit={handleSignUp}>
      <div style={titleStyle}>회원가입</div>
      <input style={inputStyle} type="text" placeholder="이름" value={username} onChange={e => setUsername(e.target.value)} required/>
      <div style={{ ...inputContainerStyle, position: 'relative' }}>
        <input style={inputStyle} type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
        {/* 이메일 상태에 따라 아이콘 표시 */}
        {emailStatus === true && <FaCheckCircle style={{ position: 'absolute', top: '10px', right: '10px' }} color="green" />}
        {emailStatus === false && <FaTimesCircle style={{ position: 'absolute', top: '10px', right: '10px' }} color="red" />}
      </div>
      <input style={inputStyle} type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required/>
      <button style={signUpButtonStyle} type="submit">회원가입</button>
    </form>
  </div>
);
}

export default SignUp;