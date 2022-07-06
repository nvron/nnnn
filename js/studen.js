
function emailIsvalid(email){
   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
function save(){
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if(document.getElementById('male').checked){
        gender = document.getElementById('male').value;
    }else if(document.getElementById('famale').checked){
        gender = document.getElementById('famale').value;
    }

    //kiểm tra họ tên
    if(_.isEmpty(fullname)){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'vui lòng nhập họ và  tên!';
    }else if(fullname.trim().length <=2){
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'họ và tên không nhỏ hơn 2 kí tự'
    }
    else{
        document.getElementById('fullname-error').innerHTML = '';
    }

    //kiểm tra email
    if(_.isEmpty(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'vui lòng nhập Email!';
    }else if(!emailIsvalid(email)){
        email = '';
        document.getElementById('email-error').innerHTML = 'email không đúng định dạng'
    }else{
        document.getElementById('email-error').innerHTML = '';
    }

    //kiểm tra sdt
    if(_.isEmpty(phone)){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'vui lòng nhập số điện thoại';
    }else if(phone.trim().length> 10){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'số điện thoại không lớn hơn 10'
    }else if(phone.trim().length< 10){
        phone = '';
        document.getElementById('phone-error').innerHTML = 'số điện thoại không bé hơn 10'
    }else{
        document.getElementById('phone-error').innerHTML ='';
    }

    //kiểm tra địa chỉ
    if(_.isEmpty(address)){
        address = '';
        document.getElementById('address-error').innerHTML ='vui lòng nhập đại chỉ'
    }else{
        document.getElementById('address-error').innerHTML ='';
    }
    //kiểm tra giới tính
    if(_.isEmpty(gender)){
        gender = '';
        document.getElementById('gender-error').innerHTML ='vui lòng chọn giới tính!'
    }else{
        document.getElementById('gender-error').innerHTML = '';
    }

    if(fullname && email && phone && address && gender){
        let students = localStorage.getItem('student')  ? JSON.parse(localStorage.getItem('student')) : [];
        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });
        localStorage.setItem('student',JSON.stringify(students));

        this.renderListStudent();
        
    }
    
}
function renderListStudent(){
    let students = localStorage.getItem('student')  ? JSON.parse(localStorage.getItem('student')) : [];
    if(students.length === 0) {
        document.getElementById('list-student').style.display = 'none';
        return false;
    }
    document.getElementById('list-student').style.display = 'block';
    let tableConten =`<tr>
        <td width='20'>#</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện Thoại</td>
        <td>Giới tính</td>
        <td>Địa chỉ</td>
        <td>Hành động</td>
    </tr>`;

    students.forEach((student, index) => {

        let studentId = index;
        let genderLabel = parseInt(student.gender) ===1 ? 'Nam' : 'Nữ';
        index++;
        tableConten += `<tr>
        <td>${index}</td>
        <td>${student.fullname}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>${genderLabel}</td>
        <td>${student.address}</td>
        <td>
        <a href ='#'>Edit</a> | <a href ='#' onclick='deleteStudent(${studentId})'>Delete</a>
        </td>
    </tr>`;
    })
    document.getElementById('prin-list-student').innerHTML = tableConten;
}
function deleteStudent(id){
    let students = localStorage.getItem('student')  ? JSON.parse(localStorage.getItem('student')) : [];
    students.splice(id,1)
    localStorage.setItem('student',JSON.stringify(students));
    renderListStudent();

}