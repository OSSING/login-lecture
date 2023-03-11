"use strict";   // HTML과 연결된 JS 파일 부분 (front 영역)

const id  = document.querySelector("#id"),  // # -> id에 부여된 id를 가져옴
    psword = document.querySelector("#psword"),
    loginBtn = document.querySelector("button"); // 질의 선택자

loginBtn.addEventListener("click", login);

function login() {
    const req = {
        id: id.value,
        psword: psword.value
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())          // res.json()의 반환 값은 Promise
    .then((res) => {
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인 중 에러 발생");
    });
}