export class User {
    public name: string;
    public email: string;
    public uid: string;

    constructor(userInfo: UserInterface) {
        this.name = userInfo && userInfo.name || null;
        this.email = userInfo && userInfo.email || null;
        this.uid = userInfo && userInfo.uid || null;
    }

}

interface UserInterface {
    name: string;
    email: string;
    uid: string;
}
