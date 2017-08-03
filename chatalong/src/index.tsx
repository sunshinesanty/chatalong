import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import config from './common/config';
import { Provider, observer } from 'mobx-react';
import ChatStore from './Store/chatStore';

const renderComponent = (): any => {  
  if (config.useDevTools) {
    const DevTools = require('mobx-react-devtools').default;
    return observer(class extends React.Component<any, any>{
      render() {
        return (
          <div>
            <DevTools />
            <Provider chatStore={ChatStore}>
              <App />
            </Provider>
          </div>
        );
      }
    });
  } else {
    return observer(class extends React.Component<any, any>{
      render() {
        return (
          <Provider chatStore={ChatStore}>
            <App />
          </Provider>
        );
      }
    });
  }
};

ReactDOM.render(
  React.createElement(renderComponent()),
  document.getElementById('root') as HTMLElement
);