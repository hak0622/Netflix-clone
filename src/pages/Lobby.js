import React from 'react';
import { useNavigate } from 'react-router-dom';

function Lobby() {
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
        fontSize: '40px', 
        fontFamily: 'Arial, sans-serif',
        position: 'absolute', 
        top: '10px', 
        left: '80px',
        width: '138px', 
        height: '48px',
        textDecoration: 'none', // 추가된 줄
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
    
    const signUpButtonStyle = {  // 추가된 줄
        ...buttonStyle,  // 로그인 버튼의 스타일을 동일하게 적용
        right: '50px',  // 로그인 버튼의 오른쪽에 위치하도록 right 값을 조정
    };  

    const textStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        height: '42px',
        color: 'white',
        fontSize: '3vw',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap',
    };

    const subTextStyle = {  
        position: 'absolute',
        top: '60%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: 'white',
        fontSize: '35px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        whiteSpace: 'nowrap',
    };  

    return (
        <div style={style}>
            <div style={overlayStyle}>
            <a href="/" style={logoStyle}>HAKFLIX</a>
                <div style={buttonStyle} onClick={() => navigate('/Login')}>로그인</div>
                <div style={signUpButtonStyle} onClick={() => navigate('/signup')}>회원가입</div>
                <div style={textStyle}>
                    <font style={{verticalAlign: 'inherit'}}>영화, TV 프로그램 등을 무제한으로 시청하세요</font>
                </div>
                <div style={subTextStyle}>
                    <font style={{verticalAlign: 'inherit'}}>어디서나 시청하세요. 언제든지 취소하세요.</font>
                </div> 
            </div>
        </div>
    );
};

export default Lobby;