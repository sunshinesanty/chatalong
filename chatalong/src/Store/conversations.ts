import { observable, action } from 'mobx';
import { IConversation } from '../interfaces/ChatInterfaces';
import { loadData, SaveData, RemoveData } from '../api/chatMockApi';

export default class Chat {
    @observable conversations: IConversation[] = [];

    @action('load conversation')
    public getAllConversations = async () => {
        this.conversations = await loadData();
    }

    @action('save conversation')
    public saveConversation = async (conversation: IConversation) => {
        this.conversations = await SaveData(conversation);
    }

    @action('remove conversation')
    public removeConversation = async (conversationID: number) => {
        const isRemoved = await RemoveData(conversationID);
        if (isRemoved) {
            const index = this.conversations.findIndex(c => c.id === conversationID);
            if (index > -1) {
                this.conversations.splice(index, 1);
            }
        }
    }
}