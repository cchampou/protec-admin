import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import NewEvent from './views/event/NewEvent';
import {
  BrowserRouter,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import NewUser from './views/user/NewUser';
import ListUsers from './views/user/ListUsers';
import { Block } from 'baseui/block';
import Router from './Router';
import { Drawer } from 'baseui/drawer';
import { HeadingLarge, HeadingSmall, HeadingXSmall } from 'baseui/typography';
import { FlexGrid } from 'baseui/flex-grid';
import { StatefulMenu } from 'baseui/menu';

const engine = new Styletron();

const App = () => {
  return (
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Block width={['200px', '300px', '600px', '1000px']} margin="auto">
            <Router />
          </Block>
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
  );
};

export default App;
