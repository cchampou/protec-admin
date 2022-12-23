import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { Drawer } from 'baseui/drawer';
import { HeadingLarge } from 'baseui/typography';
import { Block } from 'baseui/block';
import SideNav from 'baseui/side-navigation/nav';
import { useEffect, useState } from 'react';
import { NavigationProps } from 'baseui/side-navigation';
import Login from './views/Login';
import ListUsers from './views/user/ListUsers';
import NewUser from './views/user/NewUser';
import DisplayUser from './views/user/DisplayUser';
import NewEvent from './views/event/NewEvent';
import ListEvents from './views/event/ListEvents';
import DisplayEvent from './views/event/DisplayEvent';
import Auth from './services/Auth';
import HamburgerButton from './components/HamburgerButton';
import Recover from './views/Recover';
import Password from './views/Password';

const NAVIGATION_ITEMS = [
  {
    title: 'Événements',
    itemId: '/dashboard/event/list',
    subNav: [{ title: 'Nouvel événement', itemId: '/dashboard/event/new' }],
  },
  { title: 'Utilisateurs', itemId: '/dashboard/user/list' },
  { title: 'Déconnexion', itemId: '/login' },
];

const Router = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemClickedHandler: NavigationProps['onChange'] = ({ item, event }) => {
    event.preventDefault();
    if (!item.itemId) return;
    setIsOpen(false);
    if (item.itemId === '/login') {
      Auth.logout();
    }
    navigate(item.itemId);
  };

  useEffect(() => {
    if (pathname.startsWith('/dashboard') && !Auth.isAuthenticated) {
      navigate('/login');
    } else if (pathname === '/login' && Auth.isAuthenticated) {
      navigate('/dashboard/event/list');
    }
  }, [pathname, navigate]);

  return (
    <>
      {Auth.isAuthenticated && (
        <>
          <HamburgerButton onClick={() => setIsOpen(true)} />
          <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
            <HeadingLarge>Menu</HeadingLarge>
            <Block margin="scale400">
              <SideNav
                onChange={itemClickedHandler}
                activeItemId={pathname}
                items={NAVIGATION_ITEMS}
              />
            </Block>
          </Drawer>
        </>
      )}
      <Routes>
        <Route path="login" index element={<Login />} />
        <Route path="recover" element={<Recover />} />
        <Route path="password" element={<Password />} />
        <Route path="dashboard">
          <Route path="user/list" element={<ListUsers />} />
          <Route path="user/new" element={<NewUser />} />
          <Route path="user/:id" element={<DisplayUser />} />
          <Route path="event/new" element={<NewEvent />} />
          <Route path="event/list" element={<ListEvents />} />
          <Route path="event/:id" element={<DisplayEvent />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
