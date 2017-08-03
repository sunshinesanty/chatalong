import * as React from 'react';
import { IDelete } from '../../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';

@inject('chatStore') @observer
class Delete extends React.Component<IDelete, {}> {
    constructor(props: IDelete) {
        super(props);
    }
    onClicked = (e: any) => {
        e.preventDefault();
        const { chatStore, conversationID } = this.props;
        if (chatStore) {
            chatStore.chat.removeConversation(conversationID);
        } else {
            throw new ReferenceError('Chat Store not being passed as Property');
        }
    }
    render() {
        const { chatStore, createdBy } = this.props;
        if (chatStore && chatStore.activeUserName !== createdBy) {
            return <div />;
        }
        return (
            <div className="col-xs-6">
                <button type="button" className="btn btn-danger btn-sm" onClick={this.onClicked}>
                    <span className="glyphicon glyphicon-trash" />
                </button>
            </div>
        );
    }
}

export default Delete;
