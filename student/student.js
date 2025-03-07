const userName = document.getElementById('user_name');
const logOut = document.getElementById('logout');
const fileInput = document.getElementById("fileInput");
const profilePicture = document.querySelector('#profilePicture');
// local datas
let userData = JSON.parse(localStorage.getItem('userData')) ? JSON.parse(localStorage.getItem('userData'))  : [];
let selectUser = JSON.parse(localStorage.getItem('selectUser'));
let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];



// ==========================change img to profile========================== 
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

// ===========================render userData=======================
function setRenderImage() {
    profilePicture.innerHTML = `
        <img id="preview" src=${selectUser.profileImg} alt="user img" class="rounded-full mb-[20px] w-[60px] h-[60px] lg:w-[200px] lg:h-[200px] object-cover mx-auto">
    `
}
setRenderImage()

userName.innerHTML = `${selectUser.firstName} ${selectUser.lastName}`

logOut.addEventListener("click", () => {
    window.open('/index.html')
    window.close();
});

//=================== sidebar to responsive====================

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

// =========================render user data=============================
const profileImage = document.getElementById('profileImage');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const studentPhone = document.getElementById('studentPhone');
const studentDate = document.getElementById('studentDate');

const studentData = JSON.parse(sessionStorage.getItem('selectStudent'));
console.log(studentData)

profileImage.innerHTML = `
    <img  src=${studentData[0].photo} class="object-cover h-full w-full rounded-[10px]" alt="profile image">
`
studentName.innerHTML = studentData[0].name;
studentEmail.innerHTML = studentData[0].email;
studentPhone.innerHTML = studentData[0].phone;
studentDate.innerHTML = studentData[0].time;
