const userName = document.getElementById('user_name');
const logOut = document.getElementById('logout');
const dayEl = document.getElementById('day');
const hourEl = document.getElementById('hours');
const fileInput = document.getElementById("fileInput");
const profilePicture = document.querySelector('#profilePicture');

// add students elements
const formCreate = document.getElementById('formCreate');
const addStudentBtn = document.getElementById('add_student');
const overlay = document.getElementById('overlay');

// local datas
let userData = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))  : [];
let selectUser = JSON.parse(localStorage.getItem('selectUser'));


//======================== Clock start ============================= 
function setTime() {
    let now = new Date();

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    let hours = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    let minutes = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    let seconds = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()
    let day = now.getDate() < 10 ? '0' + now.getDate() :  now.getDate()
    let month = now.getMonth();
    let year = now.getFullYear();

    hourEl.innerHTML = `${hours} : ${minutes} : ${seconds}`
    dayEl.innerHTML = `${day} ${months[month]}, ${year}`
    return `${hours} : ${minutes}, ${day} ${months[month]}, ${year}`
}
setInterval(() => setTime(), 1000) 

//======================== Change img to profile ============================= 
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result)
        };
        reader.readAsDataURL(file);
    }
});

function setImage(url) {
    selectUser.profileImg = url;
    const newArray = userData.map((item) => {
        if(item.id == selectUser.id) {
            return {...item, profileImg: url}
        } else {
            return {...item}
        }
    })
    userData = newArray;
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('selectUser', JSON.stringify(selectUser));
    setRenderImage()
}

function setRenderImage() {
    profilePicture.innerHTML = `
        <img id="preview" src=${selectUser.profileImg} alt="user img" class="rounded-full mb-[20px] w-[60px] h-[60px] lg:w-[200px] lg:h-[200px] object-cover mx-auto">
    `
}

//==================================== Render userData ============================= 
setRenderImage()

userName.innerHTML = `${selectUser.firstName} ${selectUser.lastName}`

logOut.addEventListener("click", () => {
    window.open('/index.html')
    window.close();
});

//==================================== sidebar to responsive=============================
const toLeft = document.getElementById('toLeft');
const sidebar = document.getElementById('sidebar');
const sidebarHeader = document.getElementById('siderbar_header');
const preview = document.getElementById('preview');
const setProfilePicture = document.getElementById('setProfilePicture');
const logoutText = document.getElementById('logout_text');
const hatText = document.getElementById('hat_text');
const hatBtn = document.getElementById('hat_btn');
const adminText = document.getElementById('admin_text');
const studentBox = document.getElementById('student_box');
let sidebarStylesCase = false;

toLeft.addEventListener('click', () => {
    if(!sidebarStylesCase) {
        sidebar.style.width = '80px'
        sidebarHeader.style.fontSize = '10px'
        sidebarHeader.style.marginBottom = '30px'
        sidebarHeader.style.marginLeft = '15px'
        preview.style.width = '60px'
        preview.style.height = '60px'
        setProfilePicture.style.display = 'none'
        logoutText.style.display = 'none'
        hatText.style.display = 'none'
        hatBtn.style.width = '40px'
        userName.style.fontSize = '10px'
        adminText.style.fontSize = '10px'
        adminText.style.marginBottom = '10px'
        studentBox.style.width = 'calc(100vw - 80px)'
        toLeft.style.rotate = '180deg'
        sidebarStylesCase = true
    } else {
        sidebar.style.width = '270px'
        sidebarHeader.style.fontSize = '20px'
        sidebarHeader.style.marginBottom = '54px'
        sidebarHeader.style.marginLeft = '0'
        preview.style.width = '200px'
        preview.style.height = '200px'
        setProfilePicture.style.display = 'block'
        logoutText.style.display = 'block'
        hatText.style.display = 'block'
        hatBtn.style.width = '100%'
        userName.style.fontSize = '17px'
        adminText.style.fontSize = '14px'
        adminText.style.marginBottom = '63px'
        studentBox.style.width = 'calc(100vw - 270px)'
        toLeft.style.rotate = '0deg'
        sidebarStylesCase = false
    }
})

//========================= Add student ==================================
const messageName = document.getElementById('message_name');
const messageEmail = document.getElementById('message_email');
const messagePhone = document.getElementById('message_phone');
const messageEnroll = document.getElementById('message_enroll');
const messagePhoto = document.getElementById('message_photo');
const userLists = document.getElementById('user_lists');
let editId;

let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];

function setLocal() {
    localStorage.setItem('students', JSON.stringify(students)) 
}

addStudentBtn.addEventListener('click', () => {
    overlay.classList.remove('hidden')
})
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('overlay')) {
        overlay.classList.add('hidden')
    }
})

// setting data to html by inner html and data mmapping
function setStudentData() {
    userLists.innerHTML = '';
    students.map((student, i) => {
        userLists.innerHTML += `
            <tr ondblclick="goStudentPage(${i})"> 
                <td class="min-w-[100px] bg-white pl-[13px] py-[7px] md:py-[15px] rounded-l-[8px] mb-[20px]">
                    <img src=${student.photo} class="object-cover w-[45px] md:w-[55px] h-[45px] md:h-[55px] rounded-[6px]" alt="profile">
                </td>
                <td id="searchName" class="min-w-[130px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">${student.name}</td>
                <td class="min-w-[200px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">${student.email}</td>
                <td class="min-w-[120px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">${student.phone}</td>
                <td class="min-w-[140px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">${student.enroll}</td>
                <td class="min-w-[130px] pr-[20px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">${student.time}</td>
                <td class="min-w-[30px] bg-white " >
                    <img src="/images/dot-bar.svg" alt="dot bar" class="w-[25px] mx-auto cursor-pointer translate-y-[50%]">
                </td>
                <td class="min-w-[30px] text-[12px] md:text-[14px] font-[400] leading-[100%] bg-white">
                    <img onclick="editStudent(${i})" src="/images/edit.svg" alt="edit" class="w-[20px] mx-auto cursor-pointer">
                </td>
                <td class="min-w-[50px] text-[12px] md:text-[14px] font-[400] pr-[20px] leading-[100%] bg-white rounded-r-[8px]">
                    <img onclick="deleteStudent(${i})" src="/images//delete.svg" alt="delete" class="w-[17px] mx-auto cursor-pointer">
                </td>
            </tr>
        `
    })
}
setStudentData()

//============================= create strudent form submit event ================

// if else code functions input length function 
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


formCreate.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameCreate = formCreate.name;
    let emailCreate = formCreate.email;
    let phoneCreate = formCreate.phone;
    let enrollCreate = formCreate.enroll;
    let photoCreate = formCreate.photo;

    checkValue(nameCreate, messageName)
    checkValue(emailCreate, messageEmail)
    checkValue(phoneCreate, messagePhone)
    checkValue(enrollCreate, messageEnroll)
    checkValue(photoCreate, messagePhoto)

    if(nameCreate.value.trim().length && emailCreate.value.trim().length && phoneCreate.value.trim().length && enrollCreate.value.trim().length && photoCreate.value.trim().length) {
        const user = {
            name: nameCreate.value,
            email: emailCreate.value,
            phone: phoneCreate.value,
            enroll: enrollCreate.value,
            photo: photoCreate.value,
            time: setTime()
        }
        students.push(user)
        setLocal()
        setStudentData()
        formCreate.reset()
        overlay.classList.add('hidden')
    }
})

//==================================== Delete student ==================================
function deleteStudent(id) {
    const deletedArr = students.filter((user, i) => {
        return i != id
    })
    students = deletedArr;
    setLocal()
    setStudentData()
    loadNoData()
}

// =================================== EditStudent ==================================== 
const formEdit = document.getElementById('formEdit');
const overlayEdit = document.getElementById('overlayEdit');
// form inputs 
const nameEdit = document.querySelector('#formEdit #name');
const emailEdit = document.querySelector('#formEdit #email');
const phoneEdit = document.querySelector('#formEdit #phone');
const enrollEdit = document.querySelector('#formEdit #enroll');
const photoEdit = document.querySelector('#formEdit #photo');
// error message dom
const messageNameEdit = document.getElementById('message_nameEdit');
const messageEmailEdit = document.getElementById('message_emailEdit');
const messagePhoneEdit = document.getElementById('message_phoneEdit');
const messageEnrollEdit = document.getElementById('message_enrollEdit');
const messagephotoEdit = document.getElementById('message_photoEdit');

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('overlay')) {
        overlayEdit.classList.add('hidden')
    }
})

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    
    checkValue(nameEdit, messageNameEdit)
    checkValue(emailEdit, messageEmailEdit)
    checkValue(phoneEdit, messagePhoneEdit)
    checkValue(enrollEdit, messageEnrollEdit)
    checkValue(photoEdit, messagephotoEdit)

    if(nameEdit.value.trim().length && emailEdit.value.trim().length && phoneEdit.value.trim().length && enrollEdit.value.trim().length && photoEdit.value.trim().length) {
        const user = {
            name: nameEdit.value,
            email: emailEdit.value,
            phone: phoneEdit.value,
            enroll: enrollEdit.value,
            photo: photoEdit.value,
            time: setTime(),
        }
        let editStudents = students.map((item, i) => {
            if(editId == i) {
                return {name: user.name, email: user.email, phone: user.phone, enroll: user.enroll, photo: user.photo, time: user.time}
            } else {
                return {...item}
            }
        })
        students = editStudents;
        setLocal()
        setStudentData()
        formCreate.reset()
        overlayEdit.classList.add('hidden')
    }
})

// give a id to edit 
function editStudent(id) {
    overlayEdit.classList.remove('hidden')
    students.forEach((item, i) => {
        if(i == id) {
            nameEdit.value = item.name;
            nameEdit.focus()
            emailEdit.value = item.email
            phoneEdit.value = item.phone
            enrollEdit.value = item.enroll
        }
    })
    editId = id
}

// ======================================== sort students========================================
const sortBtn = document.getElementById('sort_btn');

sortBtn.addEventListener('click', ()=> {
    const sortedArray = Array.from(students).sort((a, b) => a.name.localeCompare(b.name))
    students = sortedArray;
    setLocal()
    setStudentData()
})

//========================================= search students========================================
const searchInput = document.getElementById('search_input');

searchInput.addEventListener('input', (e) => {
    document.querySelectorAll('tbody tr #searchName').forEach((item, i) => {
        if(item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
            item.parentElement.classList.remove('hidden')
        } else {
            item.parentElement.classList.add('hidden')
        }
    })
    const dataHidden = document.querySelectorAll('tbody .hidden')
    const imgNot = document.getElementById('notFound');
    if(dataHidden.length == students.length) {
        imgNot.classList.add('z-[123]')
        imgNot.classList.remove('z-[-123]')
    } else {
        imgNot.classList.add('z-[-123]')
        imgNot.classList.remove('z-[123]')
    }
})

//================================ go to student page ================================

function goStudentPage(id) {
    window.location.href = `/student/student.html?id=${id}`
}

//================================ No data? Get image to screen =====================
function loadNoData() {
    if(!students.length) {
        userLists.innerHTML += `
            <div class="w-full absolute top-[100px] flex justify-center">
                <img src="/images/no-users.jpg" alt="no data" class="w-[200px] md:w-[400px]">
            </div>
        `
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadNoData()
})

