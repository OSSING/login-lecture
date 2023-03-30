"use strict";

const { reduce } = require("async");

class UserStorage {      // #처리로 public 변수를 private 변수로 만들어 외부에서 접근 불가
    static #users = {    // static 으로 정적 변수를 만들어 줌으로써 클래스 자체에서 변수에 접근 가능
        id: ["ohsing", "yeling", "이인턴"],
        psword: ["1234", "1234", "123456"],
        name: ["길오성", "이예린", "이종명"],
    };

    static getUsers(...fields) {     // static으로 클래스에서 변수에 직접 접근 가능
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {  // fields 배열의 초기 값이 newUsers에 들어가고 다음 변수들은 fields에 들어감
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers; // 은닉화된 private 변수를 반환
    }

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = userKeys.reduce((newUser, info) => { 
            newUser[info] = users[info][idx];
            return newUser;
        }, {}); // reduce의 초기값

        return userInfo;
    }

    static save(userInfo) {
        const users = this.#users;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        return { success: true };
    }
}

module.exports = UserStorage;   // 해당 클래스를 밖에서 사용할 수 있도록 함.