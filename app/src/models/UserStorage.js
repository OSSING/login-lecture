"use strict";

const fs = require("fs").promises;     // Promise가 수행하는 동작이 끝남과 동시에 상태를 알려줌

const { reduce } = require("async");

class UserStorage {      // #처리로 public 변수를 private 변수로 만들어 외부에서 접근 불가
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = userKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {}); // reduce의 초기값

        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data); // 파라미터 데이터를 parsing해서 우리가 다룰 수 있는 데이터로 바꿈
        if (isAll) return users;
        const newUsers = fields.reduce((newUsers, field) => {  // fields 배열의 초기 값이 newUsers에 들어가고 다음 변수들은 fields에 들어감
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers; // 은닉화된 private 변수를 반환
    }

    static getUsers(isAll, ...fields) {     // static으로 클래스에서 변수에 직접 접근 가능
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUsers(data, isAll, fields); // 은닉화된 메서드
            })
            .catch(console.error);
    }

    static getUserInfo(id) {  // #getUserInfo랑 다름
        return fs
            .readFile("./src/databases/users.json")
            .then((data) => {
                return this.#getUserInfo(data, id); // 은닉화된 메서드
            })
            .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);   // 데이터 추가
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.psword.push(userInfo.psword);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));   // writeFile(저장할 파일의 경로, 저장할 데이터);
        return { success: true };
    }
}

module.exports = UserStorage;   // 해당 클래스를 밖에서 사용할 수 있도록 함.