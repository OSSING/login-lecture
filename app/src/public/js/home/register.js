"use strict";   // HTML과 연결된 JS 파일 부분 (front 영역)

const id  = document.querySelector("#id"),  // # -> id에 부여된 id를 가져옴
    name = document.querySelector("#name"),
    psword = document.querySelector("#psword"),
    confirmPsword = document.querySelector("#confirm-psword"),
    registerBtn = document.querySelector("#button"); // 질의 선택자
    
registerBtn.addEventListener("click", register);

function register() {
    if (!id.value) return alert("아이디를 입력해주십시오.");
    if (psword.value !== confirmPsword.value) return alert("비밀번호가 일치하지 않습니다.");

    const req = {
        id: id.value,
        name: name.value,
        psword: psword.value,
    };

    fetch("/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),  // 회원가입 시 회원 정보를 body에 저장
    })
    .then((res) => res.json())          // res.json()의 반환 값은 Promise
    .then((res) => {
        if (res.success) {
            location.href = "/login";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("회원가입 중 에러 발생");
    });
}