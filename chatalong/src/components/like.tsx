import * as React from 'react';
import { ILikeRendererProps, ILikeRendererState } from '../interfaces/ChatInterfaces';
import { observer, inject } from 'mobx-react';

@inject('chatStore') @observer
class LikeRenderer extends React.Component<ILikeRendererProps, ILikeRendererState> {
    constructor(props: ILikeRendererProps) {
        super(props);
        const { username } = this.props;
        this.state = {
            isLiked: this.props.likes.findIndex(l =>
                l.username.toLowerCase() === username.toLowerCase()) > -1,
            likeCount: this.props.likes.length
        };
    }
    componentWillReceiveProps(nextProps: ILikeRendererProps) {
        const { chatStore } = this.props;
        if (chatStore) {
            chatStore.likes.isLikedByUser(nextProps.postID, nextProps.username).then((isLiked: boolean) => {
                this.setState({ isLiked });
            });
        } else {
            throw new ReferenceError('Chat Store not being passed as Property');
        }
    }
    onClicked = (e: any) => {
        e.preventDefault();
        let { isLiked, likeCount } = this.state;
        isLiked = !isLiked;
        likeCount = isLiked ? ++likeCount : --likeCount;
        this.setState({ isLiked, likeCount });
        const { chatStore } = this.props;
        if (chatStore) {
            chatStore.likes.toggleLike(this.props.postID, this.props.username);
        } else {
            throw new ReferenceError('Chat Store not being passed as Property');
        }
    }
    render() {
        const buttonStyle = `btn ${this.state.isLiked ? 'btn-info' : 'btn-default'} btn-sm`;
        const likeCountText = this.state.likeCount > 0 ? `(${this.state.likeCount})` : '';
        return (
            <div>
                <button type="button" className={buttonStyle} onClick={this.onClicked}>
                    <span className="glyphicon glyphicon-thumbs-up" /> {likeCountText}
                </button>
            </div>
        );
    }
}

export default LikeRenderer;
