import { Route, Routes, useNavigate } from 'react-router-dom';
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

const Router = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const itemClickedHandler = ({ item }: { item: { route: string } }) => {
    setIsOpen(false);
    navigate(item.route);
  };

  return (
    <>
      <HamburgerButton onClick={() => setIsOpen(true)} />
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <HeadingLarge>Menu</HeadingLarge>
        <Block margin="scale400">
          <StatefulMenu
            onItemSelect={itemClickedHandler}
            items={[
              { label: 'Événements', route: '/event/list' },
              { label: 'Nouvel événement', route: '/event/new' },
              { label: 'Utilisateurs', route: '/user/list' },
            ]}
          />
        </Block>
      </Drawer>
      <Routes>
        <Route path="/user/list" element={<ListUsers />} />
        <Route path="/user/new" element={<NewUser />} />
        <Route path="/event/new" element={<NewEvent />} />
        <Route path="/event/list" element={<ListEvents />} />
        <Route path="/event/details" element={<DisplayEvent />} />
      </Routes>
    </>
  );
};

export default Router;
