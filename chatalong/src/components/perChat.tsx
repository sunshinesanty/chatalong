import * as React from 'react';
import { IPerChatProps } from '../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';
import LikeRenderer from './like';

@inject('chatStore') @observer
class PerChat extends React.Component<IPerChatProps, any> {
    render() {
        const { chatElement, chatStore } = this.props;
        const activeUserName = chatStore ? chatStore.activeUserName : '';
        return (
            <div>
                <li className="list-group-item">
                    <div className="row chatRow">
                        <div className="col-md-1 col-sm-2 col-xs-2 uname">{chatElement.username} : </div>
                        <div className="col-md-10 col-sm-8 col-xs-8">{chatElement.text}</div>
                        <div className="col-md-1 col-sm-2 col-xs-2 delContainer" >
                            <div>
                                <LikeRenderer
                                    postID={chatElement.id}
                                    likes={chatElement.likes}
                                    username={activeUserName}
                                />
                            </div>
                            <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </li>
            </div>
        );
    }
}

export default PerChat;
