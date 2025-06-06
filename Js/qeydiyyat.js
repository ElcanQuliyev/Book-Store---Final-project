document.addEventListener("DOMContentLoaded", () => {
    // Qeydiyyat (sign up)
    const registerBtn = document.getElementById("signUP-btn");
    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
            const username = document.getElementById("signUp-email").value;
            const password = document.getElementById("signUp-password").value;

            if (username && password) {
                localStorage.setItem("user", JSON.stringify({ username, password }));
                alert("Qeydiyyat uğurla tamamlandı! İndi giriş edin.");
                window.location.href = "login.html";
            } else {
                alert("Zəhmət olmasa, bütün məlumatları doldurun.");
            }
        });
    }

    // Giriş (login)
    const loginBtn = document.getElementById("logIn-btn");
    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
            const loginUsername = document.getElementById("login-email").value;
            const loginPassword = document.getElementById("login-password").value;
            const savedUser = JSON.parse(localStorage.getItem("user"));

            if (savedUser && savedUser.username === loginUsername && savedUser.password === loginPassword) {
                localStorage.setItem("loggedIn", "true");
                alert("Giriş uğurludur!");
                window.location.href = "main.html";
            } else {
                alert("İstifadəçi adı və ya şifrə yanlışdır!");
            }
        });
    }
});