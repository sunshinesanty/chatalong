import * as React from 'react';
import { IChatFormProps, IChatFormState } from '../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';

@inject('chatStore')
@observer
export class ChatForm extends React.Component<IChatFormProps, IChatFormState> {
    contentControl: HTMLTextAreaElement | null;
    // usernameControl: HTMLInputElement;
    constructor(props: IChatFormProps) {
        super(props);
        const { content, username } = this.props;
        this.state = {
            username,
            content
        };
    }
    onChange = (e: any) => {
        if (e.target.id.toLowerCase() === 'chatusername') {
            this.setState({ username: e.target.value });
            const { chatStore } = this.props;
            if (chatStore) {
                chatStore.activeUserName = e.target.value;
            } else {
                throw new ReferenceError('Chat Store not being passed as Property');
            }
        } else {
            this.setState({ content: e.target.value });
        }
    }
    onClick = (e: any) => {
        e.preventDefault();
        this.props.onSave(this.state);
        this.setState({ content: '' });
        if (this.contentControl) {
            this.contentControl.value = '';
        }
    }
    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <div className="col-12">                        
                        <input
                            type="text"
                            id="chatUserName"
                            value={this.state.username || ''}
                            onChange={this.onChange}
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-12">
                        <textarea
                            id="chatContent"
                            cols={30}
                            rows={10}
                            onChange={this.onChange}
                            className="form-control"
                            defaultValue={this.state.content || ''}
                            ref={txtControl => this.contentControl = txtControl}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-12">
                        <button
                            id="postBtn"
                            disabled={this.props.isDisabled}
                            style={(!this.props.isDisabled) ? { backgroundColor: 'grey' } : { backgroundColor: 'auto' }}
                            onClick={this.onClick}
                            title="add a comment then click to post"
                            className="btn btn-primary"
                        >
                            POST
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
