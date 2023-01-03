import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Block } from 'baseui/block';
import Router from './Router';
import { NotificationProvider } from './hooks/useNotification';

const engine = new Styletron();

const App = () => {
  return (
    <BrowserRouter>
      <StyletronProvider value={engine}>
        <BaseProvider theme={LightTheme}>
          <NotificationProvider>
            <Block width={['200px', '300px', '600px', '1000px']} margin="auto">
              <Router />
            </Block>
          </NotificationProvider>
        </BaseProvider>
      </StyletronProvider>
    </BrowserRouter>
  );
};

export default App;
