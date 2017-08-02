import chatPost from '../Store/conversations';
import Like from '../Store/likes';
import { observable } from 'mobx';

export class ChatStoreObject {
    chat: chatPost;
    likes: Like;
    @observable activeUserName: string = '';
    constructor() {
        this.chat = new chatPost();
        this.likes = new Like();
    }
}

export default new ChatStoreObject();
