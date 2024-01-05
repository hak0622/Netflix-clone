import React, { useContext } from 'react';
import isMobile from 'ismobilejs';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BREAKPOINTS, SIDE_PADDING } from '../constants';
import GithubIcon from '../icons/GithubIcon';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../AuthContext';
/**
 * @param {Object} props
 * @param {function} props.scrollToTop
 */
function Header({ scrollToTop }) {
  const { isLoggedIn, logout } = useContext(AuthContext); // AuthContext로부터 isLoggedIn과 logout 가져옴
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // AuthContext의 logout 함수 호출
      navigate('/Lobby'); // 로그아웃 후 Lobby 페이지로 이동
    } catch(err) {
      console.error(err); // 에러 처리
    }
  };

  return (
    <HeaderBlock
      className={isMobile().any ? 'mobile' : ''}
      data-testid="header"
    >
      <LogoLink to="/tv" aria-label="홈" onClick={scrollToTop}>
        HAKFLIX
      </LogoLink>
      <Nav>
        <NavTab to="/tv" aria-label="시리즈" onClick={scrollToTop}>
          시리즈
        </NavTab>
        <NavTab to="/movie" aria-label="영화" onClick={scrollToTop}>
          영화
        </NavTab>
      </Nav>
      <GithubLink
        href="https://github.com/woochul2/netflix-clone"
        aria-label="깃허브 저장소"
      >
        <GithubIcon />
      </GithubLink>
      {isLoggedIn && ( // 로그인 상태일 때만 로그아웃 버튼을 보여줌
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      )}
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  // 모달을 제외한 나머지 중에서 가장 위에 보이도록 z-index 설정
  z-index: 2;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-image: linear-gradient(
    hsla(0, 0%, 0%, 0.7) 10%,
    hsla(0, 0%, 0%, 0)
  );
  background-color: hsl(0, 0%, 8%);

  @media (min-width: ${BREAKPOINTS.xxl}) {
    padding: 0.875rem 3.75rem;
  }

  padding: 0.875rem 4%;
  font-size: 1rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 0.75rem;
    &:not(.mobile) {
      padding: 0.875rem ${SIDE_PADDING.md};
    }
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.625rem;
  }
`;

const LogoLink = styled(NavLink)`
  user-select: none;
  text-decoration: none;
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 2em;
  color: hsl(0, 92%, 46%);
`;

const GithubLink = styled.a`
  font-size: 1.25em;
  color: hsl(0, 0%, 80%);
  transition: color 0.2s;
  margin-right: 20px;
  
  @media (hover: hover) {
    &:hover {
      color: hsl(0, 0%, 65%);
    }
  }
`;

const LogoutButton = styled.button`
  background-color: hsl(0, 92%, 46%); // 버튼 배경색 설정
  color: white; // 글자색은 흰색
  border: none; // 테두리 없음
  border-radius: 5px; // 버튼 모서리 둥글게
  padding: 5px 10px; // 패딩으로 버튼 내부 여백 설정
  font-size: 0.8em; // 글자 크기 설정
  cursor: pointer; // 마우스 커서를 버튼 모양으로
  transition: background-color 0.2s; // 배경색 변경 애니메이션 효과

  &:hover {
    background-color: hsl(0, 92%, 56%); // 마우스 오버시 배경색 변경
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-grow: 1;

  gap: 1.5rem;
  margin-left: 1.5rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    gap: 1rem;
    margin-left: 1rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    gap: 0.875rem;
    margin-left: 0.875rem;
  }
`;

export const NavTab = styled(NavLink)`
  text-decoration: none;
  color: hsl(0, 0%, 80%);
  transition: color 0.2s;

  font-size: 0.875rem;

  @media (max-width: ${BREAKPOINTS.md}) {
    font-size: 0.75rem;
  }

  @media (max-width: ${BREAKPOINTS.sm}) {
    font-size: 0.625rem;
  }

  @media (hover: hover) {
    &:hover {
      color: hsl(0, 0%, 65%);
    }
  }

  &.active {
    color: hsl(0, 0%, 100%);
  }
`;

export default Header;
