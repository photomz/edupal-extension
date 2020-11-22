import styled, { keyframes } from 'styled-components';

const fade = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const TrayButtonBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00796b;
  opacity: 0;
`;

const TrayButton = styled.button`
  display: flex;
  overflow: visible !important;
  padding: 0 10px;

  -webkit-box-align: center;
  box-align: center;
  align-items: center;
  box-pack: center;
  -webkit-box-pack: center;
  justify-content: center;
  border-radius: 0;
  color: #5f6368;
  height: 100%;
  min-width: 66px;

  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  -webkit-font-smoothing: antialiased;
  -webkit-user-select: none;
  transition: background 0.2s 0.1s;
  border: 0;
  cursor: pointer;
  font-family: 'Google Sans', Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.25px;
  line-height: 36px;
  text-decoration: none;
  text-transform: none;
  outline: none;
  position: relative;
  text-align: center;
  -webkit-tap-highlight-color: transparent;
  z-index: 0;

  &:hover {
    background-color: transparent;
    ${TrayButtonBackground} {
      opacity: 0.04;
    }
  }
`;

export default {};
export { fade, TrayButton, TrayButtonBackground };
