import React from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import atoms from '../../atoms';
import HandUpButton from './HandUpButton';
import ReactionsButton from './ReactionsButton';
import SettingsButton from './SettingsButton';

const MainTray = styled.div`
  background-color: rgba(0, 0, 0, 0.541);
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 2px 6px 2px rgba(60, 64, 67, 0.149);
  right: auto;
  animation-name: fade;
  animation-duration: 0.5s;
  z-index: 100000;
  display: flex;
  height: 48px;
  opacity: 1;
  position: absolute;
  top: 0;
  transform: translateY(0);
  transition-duration: 0.25s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  border-radius: ${({ isOpen }) => (isOpen ? '0' : '0 0 8px')};
`;

const InnerTray = styled.div`
  background-color: #fff;
  display: flex;
  border-radius: 0 0 8px;
`;

const Divider = styled.div`
  background-color: #f1f3f4;
  margin: 12px 0;
  width: 1px;
`;

const ReactionTray = () => {
  const areDropdownsOpen = useRecoilValue(atoms.areDropdownsOpen);

  return (
    <MainTray>
      <InnerTray isOpen={areDropdownsOpen}>
        <ReactionsButton />
        <Divider />
        <HandUpButton />
        <Divider />
        <SettingsButton />
      </InnerTray>
    </MainTray>
  );
};

export default ReactionTray;
