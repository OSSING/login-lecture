"use strict";

const UserStorage = require("./UserStorage");

class User {
    constructor(body) {
        this.body = body;
    }

    async login() {   // await 함수는 async 안에서만 사용 가능
        const client = this.body;
        try {
            const user = await UserStorage.getUserInfo(client.id); // this.body.id => 웹에서 로그인 요청된 id 값, await은 promise를 반환하는 곳에만 적용

            if (user) {
                if (user.id === client.id && user.psword === client.psword) {
                    return { success: true };
                }
                return { success: false, msg: "비밀번호가 틀렸습니다." };
            }
            return { success: false, msg: "존재하지 않는 아이디입니다." };
        } catch (err) {
            return { success: false, msg: err };
        }
    }

    async register() {
        const client = this.body;
        try {
            const response = await UserStorage.save(client);
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = User;