import React, { useState } from 'react'
import { styled } from 'styled-components'
import {
  MoreVert,
} from '@mui/icons-material';

import { Menu, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { store } from '../store';
import { fire } from '../util/fire';

const Category = () => {

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const options = [
    { name: '트렌딩' },
    { name: '최신' },
  ];

  const selectCategory = (index: number, name: string) => {
    setSelectedIndex(index);
    if (name === '트렌딩') navigate('/');
    else navigate('/recent');
  }

  const menuHandleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CategoryWrapper>

      <CategoryLeft>
        {options.map((option, index) => (
          <ItemText
            className={index === selectedIndex ? 'active' : ''}
            key={option.name}
            onClick={() => selectCategory(index, option.name)}
          >
            {option.name}
          </ItemText>
        ))}
        <Line $selectedIndex={selectedIndex} />
      </CategoryLeft>

      <CategoryRight>
        <Write onClick={() => {
          const isLogin = store.getState().token.isLogin;

          if (!isLogin) {
            fire("로그인 후에 이용 가능합니다.");
            return;
          }

          navigate('/write');
        }}>
          <Typography sx={{ color: '#000', fontWeight: 600 }}>새 글 작성</Typography>
        </Write>

        <MoreVert
          sx={{ cursor: 'pointer', color: "#ECECEC" }}
          id="mav-menu-button"
          onClick={menuHandleClick}
        />
      </CategoryRight>

      <MenuWrapper>
        <Menu
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          sx={{ left: 0 }}
        >
          <MenuItem
            onClick={handleClose}
            sx={{ fontWeight: 700, width: '150px', height: '40px', borderBottom: '1px solid lightgray', display: 'flex', alignItems: 'center' }}
          >공지사항</MenuItem>

          <MenuItem
            onClick={handleClose}
            sx={{ fontWeight: 700, width: '150px', height: '40px', display: 'flex', alignItems: 'center' }}
          >태그 목록</MenuItem>
        </Menu>
      </MenuWrapper>

    </CategoryWrapper>
  )
}

export default Category

const CategoryWrapper = styled.div`
  width: 1728px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  justify-content: space-between;

  @media all and (max-width:1919px) {
    width: 1376px;
  }

  @media all and (max-width:1440px) {
    width: 1024px;
  }

  @media all and (max-width:1056px) {
    width: calc(100% - 2rem);
  } 
`

const CategoryLeft = styled.div`
  display: flex;
  position: relative;
  width: 14rem;
`

const CategoryRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const ItemText = styled.div`
  width: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  font-size: 1.125rem;
  color: #868E96;
  cursor: pointer;

  &.active {
    font-weight: 700;
    color: #000;
  }
`

const Line = styled.div<{ $selectedIndex: number }>`
  left: ${({ $selectedIndex }) => $selectedIndex === 0 ? '0' : '50%'};
  width: 50%;
  height: 2px;
  position: absolute;
  bottom: 0;
  background-color: #000;
  transition: all 0.3s ease-in-out;
`

const Write = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  margin-right: 1rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: 100px;
  height: 40px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.4);
  cursor: pointer;

  &:hover {
    background-color: #ECECEC;
  }
`

const MenuWrapper = styled.div`
  position: absolute;
`