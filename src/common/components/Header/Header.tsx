import { AppBar, Container, IconButton, Switch, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { selectThemeMode } from '@/app/app-selector';
import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { getTheme } from '@/common/theme/theme';
import { changeThemeMode } from '@/app/app-reducer';
import { containerSx } from '@/common/styles/container.styles';
import { NavButton } from '../NavButton/NavButton';


export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode);

  const dispatch = useAppDispatch();

  const theme = getTheme(themeMode);

  const changeMode = () => {
    dispatch(changeThemeMode(themeMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar>
          <Container maxWidth={'lg'} sx={containerSx}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <div>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign up</NavButton>
              <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
              <Switch color={'default'} onChange={changeMode} />
            </div>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
};
