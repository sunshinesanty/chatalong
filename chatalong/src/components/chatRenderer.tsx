import * as React from 'react';

import { observer, inject } from 'mobx-react';
import PerChat from './perChat';
import { IConversation, Iprops } from '../interfaces/ChatInterfaces';
import LikeRenderer from './like';

@inject('chatStore')
@observer
export class ChatRenderer extends React.Component<Iprops, {}> {
    constructor(props: Iprops) {
        super(props);
        this.loadData();
    }

    loadData = async () => {
        if (this.props.chatStore) {
            await this.props.chatStore.chat.getAllConversations();
        } else {
            throw new ReferenceError('Chat Store not being passed as Property');
        }
    }

    render() {
        const { chatStore } = this.props;       
        let content;
        if (chatStore) {
            content = chatStore.chat.conversations.map(function (element: IConversation, idx: number) {
                return (
                    <PerChat key={element.id} chatElement={element} />
                );
            });
        }
        return (
            <div className="container Chat" >
                <ul className="list-group">
                    {content}
                </ul>
            </div>
        );
    }
}
