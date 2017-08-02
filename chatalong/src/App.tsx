import * as React from 'react';
import './App.css';
import { ChatRenderer } from './components/chatRenderer';
import { ChatForm } from './components/chatForm';
import ChatStore from './Store/chatStore';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import { IChatFormState, IConversation } from './interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';
const logo = require('./logo.svg');

@inject('chatStore')
@observer
class App extends React.Component<any, any> {
  onSave = ({ username, content }: IChatFormState): void => {
    const conv: IConversation = {
      username,
      text: content,
      id: 0,
      likes: [],
      created: new Date().toISOString(),
      modifed: new Date().toISOString()
    };
    if (this.props.chatStore) {
      this.props.chatStore.chat.saveConversation(conv);
    }
  }
  render() {
    return (
      <Provider chatStore={ChatStore}>
        <div className="App container-fluid">
          <div className="App-header jumbotron">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="page-header">
              <h2 className="">Welcome to React- Sample chat</h2>
            </div>
          </div>
          <DevTools />
          <ChatForm username="" content="" onSave={this.onSave} isDisabled={false} />
          <ChatRenderer />
        </div>
      </Provider>
    );
  }
}

export default App;
