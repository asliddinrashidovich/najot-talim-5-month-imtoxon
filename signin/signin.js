const formSignin = document.getElementById('form_signin');
const messageLogin = document.getElementById('message_login');
const messagePassword = document.getElementById('message_password');
const errorSignin = document.getElementById('error_signin');

let userData = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : [];

formSignin.addEventListener('submit', (e) => {
    e.preventDefault();

    let loginEl = formSignin.login
    let passwordEl = formSignin.password

    if(!loginEl.value.trim().length) {
        messageLogin.classList.remove('hidden');
        loginEl.classList.add('border-[red]')
        setTimeout(() => {
            messageLogin.classList.add('hidden');
            loginEl.classList.remove('border-[red]')
        }, 3000)
    } 
    if(!passwordEl.value.length) {
        messagePassword.classList.remove('hidden');
        passwordEl.classList.add('border-[red]')
        setTimeout(() => {
            messagePassword.classList.add('hidden');
            passwordEl.classList.remove('border-[red]')
        }, 3000)
    } 
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
                    window.location.href = '/dashboard/dashboard.html'
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
