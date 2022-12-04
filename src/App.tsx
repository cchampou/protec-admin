import Api from './services/Api';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import { Button } from 'baseui/button';
import Event from './views/Event';

const engine = new Styletron();

const App = () => {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
        <Event />
      </BaseProvider>
    </StyletronProvider>
  );
};

export default App;
