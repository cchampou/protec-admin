import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import Event from './views/Event';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NewUser from './views/user/NewUser';
import ListUsers from './views/user/ListUsers';

const engine = new Styletron();

const App = () => {
  return (
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <Routes>
            <Route path="/user/new" element={<NewUser />} />
            <Route path="/" element={<ListUsers />} />
            <Route path="/event/new" element={<Event />} />
          </Routes>
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
  );
};

export default App;
