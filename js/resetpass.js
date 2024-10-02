// ฟังก์ชันสำหรับรีเซ็ตรหัสผ่าน
async function resetPassword(event) {
    event.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้า

    const email = document.getElementById('Email').value;
    const recentPassword = document.getElementById('recentPassword').value;
    const newPassword = document.getElementById('NewPass').value;
    const confirmPassword = document.getElementById('ConfirmPass').value;

    // ดึงข้อมูลผู้ใช้จาก Local Storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email); // ค้นหาผู้ใช้ตามอีเมล

    if (!user) {
        alert('Account not found.');
        return;
    }

    // ตรวจสอบรหัสผ่านปัจจุบัน
    const isRecentPasswordValid = user.password === recentPassword; // ตรวจสอบรหัสผ่าน (ต้องปรับหากมีการ hash รหัสผ่าน)
    if (!isRecentPasswordValid) {
        alert('The current password is incorrect.');
        return;
    }

    // ตรวจสอบรหัสผ่านใหม่และยืนยัน
    if (newPassword !== confirmPassword) {
        alert('New password and confirmation do not match.');
        return;
    }

    // อัปเดตรหัสผ่าน
    user.password = newPassword; // อัปเดตรหัสผ่าน (ต้องทำการ hash หากมีการ hash รหัสผ่าน)
    users.forEach((u, index) => {
        if (u.email === email) {
            users[index] = user; // อัปเดตผู้ใช้ใน array
        }
    });

    // บันทึกข้อมูลผู้ใช้กลับเข้าไปใน Local Storage
    localStorage.setItem('users', JSON.stringify(users));

    alert('Your password has been reset!');
    window.location.href = 'login.html'; // เปลี่ยนไปยังหน้า login.html
}

// เพิ่ม event listener
document.getElementById('Reset-Form').addEventListener('submit', resetPassword);