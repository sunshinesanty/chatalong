import * as React from 'react';
import * as Draft from 'draft-js';
import { action, observable } from 'mobx';
import config from '../../../common/config';

export interface ITextEditor {
    content?: string;
    onChange?: (textRawContent: string, textContent: string) => void;
    readComponent?: (component: Draft.Editor) => void;
    placeholder?: string;
    isReadOnly: boolean;
}

class TextEditor extends React.Component<ITextEditor, {}> {
    public editorControl: Draft.Editor;
    @observable private editorState: Draft.EditorState;
    constructor(props: ITextEditor) {
        super(props);
        this.editorState = Draft.EditorState.createEmpty();
    }

    componentWillMount() {
        this.setContent(this.props.content);
    }

    handleKeyCommand = (command: string) => {
        const newState = Draft.RichUtils.handleKeyCommand(this.editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    setContent = (content?: string) => {
        if (!content) {
            const emptyEditorState = Draft.EditorState.createEmpty();
            this.onChange(emptyEditorState);
            return;
        }
        let contentState: Draft.ContentState;
        try {
            let contentJSON = JSON.parse(content);
            contentState = Draft.convertFromRaw(contentJSON);
        } catch (e) {
            contentState = Draft.ContentState.createFromText(content);
        }
        const editorState = Draft.EditorState.push(this.editorState, contentState, 'apply-entity');
        this.onChange(editorState);
    }

    @action('draftr JS On Change')
    onChange = (editorState: Draft.EditorState) => {
        this.editorState = editorState;
        const ContentState = editorState.getCurrentContent();
        const rawContent = Draft.convertToRaw(ContentState);
        const rawContentString = JSON.stringify(rawContent);
        const plainText = ContentState.getPlainText();
        if (this.props.onChange) {
            this.props.onChange(rawContentString, plainText);
        }
    }

    focus = () => {
        if (this.editorControl) {
            this.editorControl.focus();
        }
    }

    render() {
        const { isReadOnly, placeholder } = this.props;
        const textForPlaceHolder = !isReadOnly ? (placeholder ? placeholder : config.defaultUser) : '';
        return (
            <div
                className={!isReadOnly ? 'form-control' : ''}
                onClick={this.focus}
                style={{ display: 'inline-table', textAlign: 'left', minHeight: '120px' }}
            >
                <Draft.Editor
                    ref={(ref: Draft.Editor) => this.editorControl = ref}
                    editorState={this.editorState}
                    onChange={this.onChange}
                    placeholder={textForPlaceHolder}
                    handleKeyCommand={this.handleKeyCommand}
                    readOnly={isReadOnly}
                />
            </div>
        );
    }
}

export default TextEditor;