import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'mobx-react';
import ChatStore from './Store/chatStore';
import LikeRenderer from './components/like';
import { ChatRenderer } from './components/chatRenderer';
import PerChat from './components/perChat';
import * as renderer from 'react-test-renderer';
import commonUtils from './common/utils';
import { ChaceKeys, IConversation } from './interfaces/ChatInterfaces';
import DataCache from './api/storageHandler';

describe('general app test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider chatStore={ChatStore}>
        <App />
      </Provider>,
      div);
  });
});

const initializeTestData = (generatedID: number, currDate: string) => {
  if (ChatStore.chat.conversations.length === 0) {
    ChatStore.activeUserName = 'Santy';
    ChatStore.chat.conversations.push({
      id: generatedID,
      created: currDate,
      modifed: currDate,
      likes: [{
        concersationID: generatedID,
        created: currDate,
        modified: currDate,
        id: commonUtils.generateID(),
        username: ChatStore.activeUserName
      }],
      text: 'Sample Test',
      username: ChatStore.activeUserName
    });
  }
  DataCache.setItem(ChaceKeys.convs, JSON.stringify(ChatStore.chat.conversations));
};

describe('Components rendering', () => {
  const generatedID = commonUtils.generateID();
  const currDate = new Date().toISOString();
  beforeEach(() => {
    initializeTestData(generatedID, currDate);
  });
  afterEach(() => {
    ChatStore.chat.conversations = [];
  });
  it('like should be rendered withut crashing', () => {
    const conv: IConversation | undefined = ChatStore.chat.conversations.find(c => c.id === generatedID); 
    const component = renderer.create(
      <Provider chatStore={ChatStore}>
        <LikeRenderer
          postID={generatedID}
          likes={conv ? conv.likes : []}
          username={ChatStore.activeUserName}
        />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('individual Chat should be rendered without crashing', () => {    
    const conv: any = ChatStore.chat.conversations.find(c => c.id === generatedID);
    const component = renderer.create(
      <Provider chatStore={ChatStore}>
        <PerChat chatElement={conv} />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  it('chat window to be rendered should be toggled', () => {
    const component = renderer.create(
      <Provider chatStore={ChatStore}>
        <ChatRenderer />
      </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
