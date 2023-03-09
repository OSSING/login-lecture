"use strict";

const id  = document.querySelector("#id"),  // # -> id에 부여된 id를 가져옴
    psword = document.querySelector("#password"),
    loginBtn = document.querySelector("button"); // 질의 선택자

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        psword: id.value
    };

    fetch("/login", {
        mothod: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req)
    });
}