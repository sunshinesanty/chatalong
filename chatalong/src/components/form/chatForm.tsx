import * as React from 'react';
import { IChatFormProps } from '../../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';
import { observable } from 'mobx';
import config from '../../common/config';
import TextEditor from '../form/controls/TextEditor';

@inject('chatStore')
@observer
export class ChatForm extends React.Component<IChatFormProps, {}> {
    txtEditor: TextEditor | null;
    @observable username: string;
    @observable contentRaw: string;
    content: string;
    constructor(props: IChatFormProps) {
        super(props);
        const { content, username } = this.props;
        this.username = username || config.defaultUser;
        this.contentRaw = content;
    }
    onChange = (e: any) => {
        if (e.target.id.toLowerCase() === 'chatusername') {
            this.username = e.target.value;
            const { chatStore } = this.props;
            if (chatStore) {
                chatStore.activeUserName = e.target.value;
            } else {
                throw new ReferenceError('Chat Store not being passed as Property');
            }
        }
    }
    onTextChange = (textRawContent: string, textContent: string) => {
        this.contentRaw = textRawContent;
        this.content = textContent;
    }
    onClick = (e: any) => {
        e.preventDefault();
        if (this.content && this.username) {
            this.props.onSave({ content: this.contentRaw, username: this.username });
            this.contentRaw = '';
            if (this.txtEditor) {
                this.txtEditor.setContent();
            }
        }
    }
    render() {
        return (
            <div className="container">
                <div className="form-group row">
                    <div className="col-12">
                        <select
                            id="chatUserName"
                            value={this.username || config.defaultUser}
                            onChange={this.onChange}
                            className="form-control"
                        >
                            <option value={config.defaultUser}>{config.defaultUser}</option>
                            <option value="Sam">Sam</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-12">
                        <TextEditor
                            isReadOnly={false}
                            onChange={this.onTextChange}
                            content={this.contentRaw}
                            placeholder={config.editorPlaceholderText}
                            ref={txtEditor => this.txtEditor = txtEditor}
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
