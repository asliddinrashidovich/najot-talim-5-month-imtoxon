const formSignin = document.getElementById('form_signin');
const messageLogin = document.getElementById('message_login');
const messagePassword = document.getElementById('message_password');
const errorSignin = document.getElementById('error_signin');

let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

function checkValue(inputName, message) {
    if(!inputName.value.trim().length) {
        message.classList.remove('hidden');
        inputName.classList.add('border-[red]')
        setTimeout(() => {
            message.classList.add('hidden');
            inputName.classList.remove('border-[red]')
        }, 3000)
    } 
}

// ==================== Sign In ===============================
formSignin.addEventListener('submit', (e) => {
    e.preventDefault();

    let loginEl = formSignin.login
    let passwordEl = formSignin.password

    checkValue(loginEl, messageLogin)
    checkValue(passwordEl, messagePassword)

    if(loginEl.value.trim().length && passwordEl.value.length) {
        const user = {
            firstName: '',
            lastName: '',
            id: 0,
            profileImg: "",
            login: loginEl.value,
            password: passwordEl.value,
        }
        function promiseUser() {
            return  new Promise((resolve, reject) => {
                let userFind = userData.find((item, i) => {
                    if(item.login === user.login && item.password === user.password) {
                        user.firstName = item.firstName;
                        user.lastName = item.lastName;
                        user.id = item.id;
                        user.profileImg = item.profileImg;
                        return true
                    }
                });
                if (userFind) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
        }
        promiseUser()
            .then((res) => {
                if(res) {
                    localStorage.setItem('selectUser', JSON.stringify(user))
                    window.close();
                    window.open('/dashboard/dashboard.html')
                }
            })
            .catch((err) => {
                if(!err) {
                    errorSignin.classList.remove('hidden');
                    setTimeout(() => {
                        errorSignin.classList.add('hidden');
                    }, 3000)
                }
            })
    }
})
