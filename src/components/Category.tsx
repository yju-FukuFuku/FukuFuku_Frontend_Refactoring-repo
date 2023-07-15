import React, { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import
{
  TrendingUp,
  AccessTime,
  MoreVert
} from '@mui/icons-material';

import { Menu, MenuItem, Select, Tab, Tabs, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const StyledTabs = styled(Tabs)(
  {
    "& .MuiTabs-indicator": {
      backgroundColor: "#000"
    },
    "& .MuiTab-textColorPrimary": {
      color: "lightgray",
      fontWeight: 300
    },
    "& .MuiTab-textColorPrimary.Mui-selected": {
      color: "#000"
    }
  }
)

const Category = () => {

  const [page, setPage] = useState<number>(0);

  const [anchorEl, setAnchorEl] = useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);
  const [date, setDate] = useState<string>('이번 주');

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === '/') {
      setPage(0);
      setDate('이번 주');
    } else if (pathname === '/recent') {
      setPage(1);
    }
  }, [pathname])  

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setPage(newValue);
    if (newValue === 0) {
      navigate('/');
    } else if(newValue === 1) {
      navigate('/recent');
    }
  }

  const menuHandleClick = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <CategoryWrapper>
    <StyledTabs 
    value={page} 
    onChange={handleChange}>
      <Tab
        label={
          <CategoryItem>
            <TrendingUp fontSize="medium" sx={{ mr: '5px' }} />
            <Typography 
              variant="h6" 
              sx={{ 
                cursor: 'pointer', 
                ...page === 0 && { fontWeight: 700 }, ...page !== 0 && { fontWeight: 300 }
              }}
            >
              트렌딩
            </Typography>
          </CategoryItem>
        }
      />
      <Tab
        label={
          <CategoryItem>
            <AccessTime fontSize="medium" sx={{ mr: '5px' }} />
            <Typography variant="h6" sx={{ cursor: 'pointer', ...page === 1 && { fontWeight: 700 }, ...page !== 1 && { fontWeight: 300 }}}>
              최신
            </Typography>
          </CategoryItem>
        }
      />
    </StyledTabs>
  
    {
      pathname === '/' && (
        <>
          <Select
            value={date}
            onChange={(e) => setDate(e.target.value as string)}
            sx={{width: '110px', height: '40px', marginLeft: '10px', boxShadow: 'none', border: '1px solid lightgray', borderRadius: '5px', boxSizing: 'border-box'}}
          >
            <MenuItem value={"오늘"}>오늘</MenuItem>
            <MenuItem value={"이번 주"}>이번 주</MenuItem>
            <MenuItem value={"이번 달"}>이번 달</MenuItem>
            <MenuItem value={"올해"}>올해</MenuItem>
          </Select>
        </>
      )
    }
    

    <MoreVert 
      sx={{position: 'absolute', right: 0, cursor: 'pointer'}}
      id="mav-menu-button"
      onClick={menuHandleClick}
    />

    <MenuWrapper>
      <Menu 
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        sx={{left: 0}}
      >
        <MenuItem 
          onClick={handleClose}
          sx={{fontWeight: 700, width: '150px', height: '40px', borderBottom: '1px solid lightgray', display: 'flex', alignItems: 'center'}}
        >공지사항</MenuItem>

        <MenuItem 
          onClick={handleClose}
          sx={{fontWeight: 700, width: '150px', height: '40px', display: 'flex', alignItems: 'center'}}
        >태그 목록</MenuItem>

      </Menu>
    </MenuWrapper>
    
  </CategoryWrapper>
  )
}

export default Category

const CategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  width: 1700px;
  position: relative;

  @media screen and (max-width: 1023px) {
    width: 900px;
  }

  @media screen and (max-width: 767px) {
    width: 400px;
  }
`

const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 90px;
  height: 20px;
`

const MenuWrapper = styled.div`
  position: absolute;
`