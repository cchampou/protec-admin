import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import Event from './views/Event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewUser from './views/user/NewUser';
import ListUsers from './views/user/ListUsers';
import { Block } from 'baseui/block';

const engine = new Styletron();

const App = () => {
  return (
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Block width={['200px', '300px', '600px', '1000px']} margin="auto">
            <Routes>
              <Route path="/user/new" element={<NewUser />} />
              <Route path="/" element={<ListUsers />} />
              <Route path="/event/new" element={<Event />} />
            </Routes>
          </Block>
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
  );
};

export default App;
