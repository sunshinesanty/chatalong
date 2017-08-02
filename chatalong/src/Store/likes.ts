import { observable, action } from 'mobx';
import { ILike } from '../interfaces/ChatInterfaces';
import { GetPostLikesByID, ToggleLike, GetPostLikeForUser } from '../api/chatMockApi';
export default class Like {
    @observable likes: ILike[] = [];

    @action('get likes')
    public getLike = async (postID: number) => {
        this.likes = await GetPostLikesByID(postID);
    }

    @action('get like for user')
    public isLikedByUser = async (postID: number, userName: string): Promise<boolean> => {
        return GetPostLikeForUser(postID, userName);
    }

    @action('toggle Like')
    public toggleLike = async (postID: number, userName: string) => {
        const updatedlikes = await ToggleLike(postID, userName);
        this.likes = !updatedlikes ? updatedlikes : [];
    }
}
