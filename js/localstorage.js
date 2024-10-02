// ฟังก์ชันสำหรับสุ่ม Token
function generateToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

// ฟังก์ชันสำหรับบันทึกข้อมูลผู้ใช้ลงใน Local Storage
function CreateAcc(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า

    const email = document.getElementById('createEmail').value;
    const username = document.getElementById('createUsername').value;
    const password = document.getElementById('createPassword').value;
    const telNumber = document.getElementById('createTelNumber').value;

    const token = generateToken(16); // สุ่ม Token

    const user = {
        email: email,
        username: username,
        password: password,
        telNumber: telNumber,
        token: token // เพิ่ม Token เข้าไปในอ็อบเจ็กต์ผู้ใช้
    };

    // ดึงข้อมูลผู้ใช้จาก Local Storage หรือสร้างใหม่
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // เพิ่มผู้ใช้เข้าไปใน array
    users.push(user);

    // บันทึกข้อมูลผู้ใช้กลับเข้าไปใน Local Storage
    localStorage.setItem('users', JSON.stringify(users));

    document.getElementById('signup-Form').reset(); // รีเซ็ตฟอร์ม
    alert('You have created an account.');

    // เปลี่ยนไปที่หน้า login.html
    window.location.href = 'login.html';
}

// ฟังก์ชันสำหรับโหลดข้อมูลผู้ใช้จาก Local Storage
async function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || []; // ดึงข้อมูลผู้ใช้

    const userList = document.getElementById('user-list');
    userList.innerHTML = ''; // เคลียร์รายการผู้ใช้ก่อนหน้า

    // แสดงข้อมูลผู้ใช้ในรายการ
    for (const user of users) {
        const li = document.createElement('li');
        li.textContent = `อีเมล: ${user.email}, ชื่อผู้ใช้: ${user.username}, หมายเลขโทรศัพท์: ${user.telNumber}, Token: ${user.token}`;
        userList.appendChild(li);
    }
}

// ฟังก์ชันสำหรับลบข้อมูลผู้ใช้ทั้งหมดใน Local Storage
function clearUsers() {
    localStorage.removeItem('users'); // ลบข้อมูลผู้ใช้ทั้งหมด
    document.getElementById('user-list').innerHTML = ''; // เคลียร์รายการผู้ใช้
    alert('ลบผู้ใช้ทั้งหมดเรียบร้อยแล้ว!');
}

// เพิ่ม event listeners
document.getElementById('signup-Form')?.addEventListener('submit',CreateAcc);