function check_pw() {
    var id = document.getElementById("id").innerText;
    var url = "check_pw.php?id=" + id;
    window.open(url, "chkpw", 'width=500,height=800,scrollbars=no,resizable=no');
}

function change_pw() {
    document.getElementById("pw").disabled = false;
    var pwButton = document.getElementById("pw_button");
    pwButton.value = "확정";
    pwButton.style.color = "hotpink";
    pwButton.setAttribute("onclick", "decide_pw()");
}

function decide_pw() {
    var pwField = document.getElementById("pw");
    var pwButton = document.getElementById("pw_button");
    
    if (pwField.value.length < 6) {
        alert("비밀번호는 최소 6자 이상이어야 합니다.");
        return;
    }

    document.getElementById("submit").disabled = false;
    document.getElementById("pw2").value = pwField.value;
    pwField.disabled = true;
    pwButton.disabled = true;
    pwButton.value = "확정됨";
    pwButton.style.color = "#ccc";
    pwButton.style.backgroundColor = "#ddd";
}

function change_phone() {
    document.getElementById("phone").disabled = false;
    document.getElementById("phone_button").value = "확정";
    document.getElementById("phone_button").style.color = "gold";
    document.getElementById("phone_button").setAttribute("onclick", "decide_phone()");
}

function decide_phone() {
    var phoneField = document.getElementById("phone");
    
    if (!/^\d{10,15}$/.test(phoneField.value)) {
        alert("전화번호는 10자에서 15자 사이의 숫자만 입력할 수 있습니다.");
        return;
    }

    document.getElementById("submit").disabled = false;
    document.getElementById("phone2").value = phoneField.value;
    phoneField.disabled = true;
    document.getElementById("phone_button").disabled = true;
    document.getElementById("phone_button").value = "확정됨";
    document.getElementById("phone_button").style.color = "gold";
    document.getElementById("phone_button").style.backgroundColor = "rgb(245,240,221)";
    alert("전화번호가 변경되었습니다.");
}

function change_email() {
    document.getElementById("email").disabled = false;
    document.getElementById("email_button").value = "확정";
    document.getElementById("email_button").style.color = "gold";
    document.getElementById("email_button").setAttribute("onclick", "decide_email()");
}

function decide_email() {
    var emailField = document.getElementById("email");
    
    // Basic email validation
    if (!/\S+@\S+\.\S+/.test(emailField.value)) {
        alert("유효한 이메일 주소를 입력해 주세요.");
        return;
    }

    document.getElementById("submit").disabled = false;
    document.getElementById("email2").value = emailField.value;
    emailField.disabled = true;
    document.getElementById("email_button").disabled = true;
    document.getElementById("email_button").value = "확정됨";
    document.getElementById("email_button").style.color = "gold";
    document.getElementById("email_button").style.backgroundColor = "rgb(245,240,221)";
    alert("이메일이 변경되었습니다.");
}

function showPasswordModal() {
    document.getElementById("passwordModal").style.display = "block";
}

function closePasswordModal() {
    document.getElementById("passwordModal").style.display = "none";
}

function submitPasswordChange() {
    var currentPassword = document.getElementById("currentPassword").value;
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword.length < 6) {
        alert("새 비밀번호는 최소 6자 이상이어야 합니다.");
        return;
    }

    if (newPassword !== confirmPassword) {
        alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
        return;
    }

    document.getElementById("pw").value = newPassword;
    document.getElementById("pw2").value = newPassword;
    document.getElementById("pw").disabled = true;

    var pwButton = document.getElementById("pw_button");
    pwButton.value = "확정됨";
    pwButton.style.color = "gold";
    pwButton.style.backgroundColor = "rgb(245,240,221)";
    pwButton.disabled = true;

    document.getElementById("submit").disabled = false;

    alert("비밀번호가 변경되었습니다.");
    closePasswordModal();
}

document.getElementById('myForm').onsubmit = function (event) {
    event.preventDefault();

    // Add form validation here
    var email = document.getElementById("email2").value;
    var phone = document.getElementById("phone2").value;
    var pw = document.getElementById("pw2").value;

    if (!/\S+@\S+\.\S+/.test(email)) {
        alert("유효한 이메일 주소를 입력해 주세요.");
        return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
        alert("전화번호는 10자에서 15자 사이의 숫자만 입력할 수 있습니다.");
        return;
    }

    if (pw.length < 6) {
        alert("비밀번호는 최소 6자 이상이어야 합니다.");
        return;
    }

    alert('개인정보 변경이 완료 되었습니다.\n메인 홈페이지로 이동합니다.');
    setTimeout(function () {
        window.location.href = 'http://127.0.0.1:5500/%EA%B3%B5%EC%9A%A9/main.html';
    }, 1000);
};
