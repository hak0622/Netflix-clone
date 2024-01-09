import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const findButtonStyle = {
  width: '314px',
  height: '50px',
  backgroundColor: '#E10909',
  color: 'white',
  borderRadius: '5px',
  border: 'none',
  marginBottom: '10px',
  padding: '16px 0px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const buttonStyle = {
    position: 'absolute', 
    top: '10px', 
    right: '170px', 
    width: '110px', 
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

const signUpButtonStyle = {  
    ...buttonStyle,  
    right: '50px',  
};  

function FindPW() {
    const [username, setUsername] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [email, setEmail] = useState(''); // 이메일 상태 추가
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
  
    const findPassword = async (e) => {
      e.preventDefault();
  
      if(!username || !birthDate || !email) {
        setMessage('모든 필드를 채워주세요.');
        return;
      }
  
      try {
        const response = await axios.post(`http://localhost:4000/api/find-password`, {
          username,
          birthDate,
          email
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if(response.data.password) {
          setMessage(`당신의 비밀번호는 ${response.data.password} 입니다.`); 
        } else {
          setMessage('일치하는 비밀번호를 찾을 수 없습니다.'); 
        }
      } catch (error) {
        console.error(error.response);
        if (error.response && error.response.status === 400) {
          setMessage('해당 이름과 이메일을 가진 사용자가 없습니다.'); 
        } else {
          setMessage('서버 오류로 비밀번호 찾기에 실패했습니다.'); 
        }
      }
    };
  
    return (
      <div style={style}>
        <div style={overlayStyle}>
        <form style={formStyle} onSubmit={findPassword}>
          <div style={titleStyle}>비밀번호 찾기</div>
          <input style={inputStyle} type="text" placeholder="이름" value={username} onChange={e => setUsername(e.target.value)} required/>
          <input style={inputStyle} type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required/> 
          <input style={inputStyle} type="date" placeholder="생년월일" value={birthDate} onChange={e => setBirthDate(e.target.value)} required />
          <button style={findButtonStyle} type="submit">비밀번호 찾기</button>
          {message && <p style={{color: 'white'}}>{message}</p>} 
        </form>
        <div style={buttonStyle} onClick={() => navigate('/Login')}>로그인</div>
        <div style={signUpButtonStyle} onClick={() => navigate('/signup')}>회원가입</div>
        </div>
      </div>
    );
  }

export default FindPW;