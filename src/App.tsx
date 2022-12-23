import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Block } from 'baseui/block';
import Router from './Router';

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
