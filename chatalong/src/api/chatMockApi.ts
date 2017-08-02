import { IConversation, ILike, ChaceKeys } from '../interfaces/ChatInterfaces';
import DataCache from './storageHandler';
import commonUtils from '../common/utils';

let conversations: IConversation[] = [];

export const loadData = (rowlimit?: number): Promise<IConversation[]> => {
    return new Promise<IConversation[]>((response, reject) => {
        setTimeout(
            () => {
                const data = DataCache.getItem(ChaceKeys.convs);
                if (data) {
                    conversations = JSON.parse(data);
                }
                response(conversations);
            },
            600);
    });
};

export const GetPostByID = (conversationID: number): Promise<IConversation> => {
    return new Promise<IConversation>((response, reject) => {
        setTimeout(
            (conv: number) => {
                const data = DataCache.getItem(ChaceKeys.convs);
                if (data) {
                    conversations = JSON.parse(data);
                }
                response(conversations.find(c => c.id === conv));
            },
            600,
            conversationID);
    });
};

export const GetPostLikeForUser = (conversationID: number, userName: string): Promise<boolean> => {
    return new Promise<boolean>((response, reject) => {
        setTimeout(
            (convID: number, uName: string) => {
                const data = DataCache.getItem(ChaceKeys.convs);
                if (data) {
                    conversations = JSON.parse(data);
                }
                const post = conversations.find(c => c.id === convID);

                if (post) {
                    const likeIndex = post.likes.findIndex(l => l.username.toLowerCase() === uName.toLowerCase());
                    response(likeIndex > -1);
                } else {
                    response(false);
                }
            },
            600,
            conversationID,
            userName);
    });
};

export const GetPostLikesByID = (conversationID: number): Promise<ILike[]> => {
    return new Promise<ILike[]>((response, reject) => {
        setTimeout(
            (convID: number) => {
                const data = DataCache.getItem(ChaceKeys.convs);
                if (data) {
                    conversations = JSON.parse(data);
                }
                const post = conversations.find(c => c.id === convID);
                let likes: ILike[] = [];
                if (post) {
                    likes = post.likes;
                } else {
                    console.warn('conversationID invalid for likes retrievable.');
                }
                response(likes);
            },
            600,
            conversationID);
    });
};

export const LoadUsers = (): string[] => {
    let users: string[] = DataCache.getItem('usernames');
    if (!users) { users = ['Santy']; }
    return users;
};

export const AddUser = (user: string): string[] => {
    let users: string[] = DataCache.getItem('usernames');
    if (users) {
        users.push(user);
        DataCache.setItem('usernames', users);
    }
    return users;
};

export const RemoveUser = (user: string): string[] => {
    let users: string[] = DataCache.getItem('usernames');
    if (users) {
        const idx = users.findIndex(x => x === user);
        users.splice(idx, 1);
        DataCache.setItem('usernames', users);
    }
    return users;
};

export const ToggleLike = (postID: number, userName: string): Promise<ILike[]> => {
    return new Promise<ILike[]>((response, reject) => {
        setTimeout(
            (pId: number, uName: string) => {
                if (!userName) {
                    reject('no user selected');
                    return;
                }
                let converse;
                let index = -1;
                if (pId > 0) {
                    converse = conversations.find((c, idx) => {
                        const result = c.id === pId;
                        if (result) {
                            index = idx;
                        }
                        return result;
                    });
                    if (converse) {
                        let likeIndex = converse.likes.findIndex(l =>
                            l.username.toLowerCase() === uName.toLowerCase());
                        if (likeIndex > -1) {
                            converse.likes.splice(likeIndex, 1);
                        } else {
                            converse.likes.push({
                                id: commonUtils.generateID(),
                                concersationID: pId,
                                created: new Date().toISOString(),
                                modified: new Date().toISOString(),
                                username: uName
                            });
                        }
                        conversations.splice(index, 1, converse);
                        DataCache.setItem(ChaceKeys.convs, JSON.stringify(conversations));
                        response(converse.likes);
                    } else {
                        reject('post ID not defined');
                    }
                } else {
                    reject('post ID not defined');
                }
            },
            600,
            postID, userName);
    });
};

export const SaveData = (conversation: IConversation): Promise<IConversation[]> => {
    return new Promise<IConversation[]>((response, reject) => {
        setTimeout(
            (conv: IConversation) => {
                let existingIndex = -1;
                if (conv.id > 0) {
                    existingIndex = conversations.findIndex(c => c.id === conv.id);
                } else {
                    conv.id = commonUtils.generateID();
                }

                if (existingIndex > -1) {
                    conversations.splice(existingIndex, 1, conv);
                } else {
                    conversations.unshift(conv);
                }

                DataCache.setItem(ChaceKeys.convs, JSON.stringify(conversations));

                response(conversations);
            },
            600,
            conversation);
    });
};

export const RemoveData = (conversationID: number): Promise<boolean> => {
    return new Promise<boolean>((response, reject) => {
        setTimeout(
            (idTORemove: number) => {
                let existingIndex = -1;
                if (idTORemove > 0) {
                    existingIndex = conversations.findIndex(c => c.id === idTORemove);

                    if (existingIndex > -1) {
                        conversations.splice(existingIndex, 1);
                    }

                    DataCache.setItem(ChaceKeys.convs, JSON.stringify(conversations));

                    response(true);
                }
            },
            600,
            conversationID);
    });
};