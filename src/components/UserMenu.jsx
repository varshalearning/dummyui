import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiUser, FiLogOut } from 'react-icons/fi';

const UserMenuContainer = styled.div`
  position: relative;
`;

const UserButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text-primary);
  transition: all var(--transition-hover);

  &:hover {
    background: var(--bg-sidebar);
  }
`;

// Rename this styled component from UserMenu to UserMenuDropdown
const UserMenuDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: var(--bg-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 9999; // Add this line to ensure menu stays on top
`;

const MenuItem = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--transition-hover);

  &:hover {
    background: var(--bg-sidebar);
  }
`;

const UserInfo = styled.div`
  padding: 16px;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 8px;
`;

const UserName = styled.h4`
  margin: 0;
  font-size: 14px;
  font-weight: 600;
`;

const UserRole = styled.p`
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--color-text-secondary);
`;

const UserMenu = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    onLogout();
  };

  return (
    <UserMenuContainer ref={menuRef}>
      <UserButton onClick={() => setIsOpen(!isOpen)}>
        <FiUser size={20} />
      </UserButton>
      
      {isOpen && (
        <UserMenuDropdown>
          <UserInfo>
            <UserName>{user?.username || 'User'}</UserName>
            <UserRole>{user?.role || 'Guest'}</UserRole>
          </UserInfo>
          
          <MenuItem onClick={handleLogout}>
            <FiLogOut size={16} />
            Logout
          </MenuItem>
        </UserMenuDropdown>
      )}
    </UserMenuContainer>
  );
};

export default UserMenu;