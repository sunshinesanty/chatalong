import * as React from 'react';
import { IPerChatProps } from '../../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';
import LikeRenderer from './like';
import Delete from './delete';
import TextEditor from '../form/controls/TextEditor';

@inject('chatStore') @observer
class PerChat extends React.Component<IPerChatProps, any> {
    render() {
        const { chatElement, chatStore } = this.props;
        const activeUserName = chatStore ? chatStore.activeUserName : '';
        return (
            <div>
                <li className="list-group-item">
                    <div className="row chatRow">
                        <div className="col-md-1 col-sm-2 col-xs-2 uname badge">{chatElement.username} : </div>
                        <div className="col-md-9 col-sm-8 col-xs-6">                            
                            <TextEditor 
                                isReadOnly={true}
                                content={chatElement.text}
                            />
                        </div>
                        <div className="col-md-2 col-sm-2 col-xs-2 delContainer" >
                            <div className="row">
                                <LikeRenderer
                                    postID={chatElement.id}
                                    likes={chatElement.likes}
                                    username={activeUserName}
                                />
                                <Delete conversationID={chatElement.id} createdBy={chatElement.username} />
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

export default PerChat;
