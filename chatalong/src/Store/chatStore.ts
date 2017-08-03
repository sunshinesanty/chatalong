import chatPost from '../Store/conversations';
import Like from '../Store/likes';
import { observable } from 'mobx';
import * as apis from '../api/chatMockApi';

export class ChatStoreObject {
    chat: chatPost;
    likes: Like;
    @observable activeUserName: string = '';
    constructor() {
        this.chat = new chatPost();
        this.likes = new Like();
        this.activeUserName = apis.GetLoggedInUser();
    }
}

export default new ChatStoreObject();
