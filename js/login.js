
function LoginForm() {
    window.location.href = 'login.html';// redirect to login

}

function SignUpSuccess() {
    window.location.href = "login.html"; // redirect to signup
}
function LoginSuccess() {
    window.location.href = "index.html"; // redirect to login
}
//  let patternEmail = document.getElementById("Email");
//  let patternPassword = document.getElementById("Password");
//  let patternTelNumber = document.getElementById("TelNumber");


//  function Pattern() {

//    patternEmail.setAttribute("pattern", "/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/"); //(\. = dot) //
//     patternEmail.setAttribute("title", "Invalid Emai");
//     patternPassword.setAttribute("pattern", "[A-Z]{1}[a-9]{8,}"); // (\d = 0-9) //
//      patternPassword.setAttribute("title", "Your passwort least A-Z 1 digit and a-z or 0-9 1-20 digits");

//     patternTelNumber.setAttribute("pattern", "/[0]{1}\d{2}-\d{3}-\d{4}/"); // (\d = 0-9) //
//     patternTelNumber.setAttribute("title", "Your TelNumber must have 0-9 10 digits");
//  }
// function checkEmail(){
//     const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const emails = ["example@gmail.com", "test@hotmail.com", "invalidemail.com"];

//     emails.forEach(email => {
//         if (emailPattern.test(email)) {
//             console.log('${email} is a valid email');
//         } else {
//             console.log('${email} is an invalid email');
//         }
//     });
// }

// ฟังก์ชันสำหรับล็อกอินผู้ใช้
function loginUser(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        // หากล็อกอินสำเร็จ
        alert('ล็อกอินสำเร็จ!');
        localStorage.setItem('loggedInUser', JSON.stringify(user)); // บันทึกข้อมูลผู้ใช้ที่ล็อกอิน
        window.location.href = 'index.html'; // เปลี่ยนไปยังหน้าโปรไฟล์
    } else {
        alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง!');
    }
}

// ฟังก์ชันสำหรับโหลดข้อมูลโปรไฟล์ผู้ใช้
function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (user) {
        const userProfileDiv = document.getElementById('user-profile');
        userProfileDiv.innerHTML = `
            <input>ชื่อผู้ใช้: ${user.username}
            <input>อีเมล: ${user.email}
            <input>หมายเลขโทรศัพท์: ${user.telNumber}
            <input>สถานะ: ${user.status || 'ไม่มีข้อมูล'}
        `;
    } else {
        alert('ไม่พบข้อมูลผู้ใช้!');
        window.location.href = 'login.html'; // หากไม่มีข้อมูลผู้ใช้ เปลี่ยนกลับไปที่หน้า login
    }
}

// ฟังก์ชันสำหรับล็อกเอาต์ผู้ใช้
function logoutUser() {
    localStorage.removeItem('loggedInUser'); // ลบข้อมูลผู้ใช้ที่ล็อกอิน
    alert('คุณได้ล็อกเอาต์เรียบร้อยแล้ว!');
    window.location.href = 'login.html'; // เปลี่ยนไปยังหน้า login
}

// เพิ่ม event listeners
document.getElementById('login-form').addEventListener('submit', loginUser);
document.getElementById('logout-btn').addEventListener('click', logoutUser); // เพิ่ม event listener สำหรับล็อกเอาต์
window.onload = loadUserProfile;

// document.addEventListener('DOMContentLoaded', function () {
//     const loggedInElement = document.getElementById('loggedin');
//     if (loggedInElement === null) {
//         console.error("Element with ID 'loggedin' not found.");
//     } else {
//         loggedInElement.addEventListener('submit', loginUser);
//     }

//     const logoutBtnElement = document.getElementById('logout-btn');
//     if (logoutBtnElement === null) {
//         console.error("Element with ID 'logout-btn' not found.");
//     } else {
//         logoutBtnElement.addEventListener('click', logoutUser);
//     }
// });











