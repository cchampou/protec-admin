import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NewUser from './views/user/NewUser';
import ListUsers from './views/user/ListUsers';
import NewEvent from './views/event/NewEvent';
import DisplayEvent from './views/event/DisplayEvent';
import { Drawer } from 'baseui/drawer';
import { HeadingLarge } from 'baseui/typography';
import { Block } from 'baseui/block';
import { StatefulMenu } from 'baseui/menu';
import { useState } from 'react';
import HamburgerButton from './components/HamburgerButton';
import ListEvents from './views/event/ListEvents';
import SideNav from 'baseui/side-navigation/nav';
import { NavigationProps } from 'baseui/side-navigation';

const NAVIGATION_ITEMS = [
  {
    title: 'Événements',
    itemId: '/event/list',
    subNav: [{ title: 'Nouvel événement', itemId: '/event/new' }],
  },

  { title: 'Utilisateurs', itemId: '/user/list' },
];

const Router = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemClickedHandler: NavigationProps['onChange'] = ({ item, event }) => {
    event.preventDefault();
    if (!item.itemId) return;
    setIsOpen(false);
    navigate(item.itemId);
  };

  return (
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
      <Routes>
        <Route path="/user/list" element={<ListUsers />} />
        <Route path="/user/new" element={<NewUser />} />
        <Route path="/event/new" element={<NewEvent />} />
        <Route path="/event/list" element={<ListEvents />} />
        <Route path="/event/:id" element={<DisplayEvent />} />
      </Routes>
    </>
  );
};

export default Router;
