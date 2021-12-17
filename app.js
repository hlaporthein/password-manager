//local storage functions
Storage.prototype.setObject = function(key, value) {
    return this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

//variables
const list = document.querySelector("#list");
const infoBox = document.querySelector("#info-box");
const infoBoxTitle = infoBox.querySelector(".title");
const tableBody = infoBox.querySelector("tbody");
const closeButton = document.querySelector(".close-btn");
const buttonCreate = document.querySelector(".btn-create");
const buttonEdit = document.querySelector(".btn-edit");
const buttonDelete = document.querySelector(".btn-delete");
const formWrapper = document.querySelector("#form-wrapper");
const form = document.querySelector("#form");

const initData = [
    {
        id: 1,
        title: "Gmail",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://gmail.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 2,
        title: "Yahoo",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://yahoo.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 3,
        title: "Twitter",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://twitter.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 4,
        title: "Linkedin",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://linkedin.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 5,
        title: "Dribbble",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://dribbble.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 6,
        title: "Stackoverflow",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://stackoverflow.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 7,
        title: "Hotmail",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://hotmail.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
    {
        id: 8,
        title: "Flickr",
        username: "hlaporthein",
        email: "contact@hlaporthein.com",
        password: "123456",
        website: "http://flickr.com",
        phone: "+9494949494",
        one_time_code: 20202,
        security_question: "What is your pet name?",
        security_answer: "Jack"
    },
];

const _passwords = localStorage.getObject("passwords"); // [] or null
const passwords = ( _passwords !== null && _passwords.length) ? _passwords : initData;


renderPasswordList();
function renderPasswordList() {
    if ( passwords.length ) {
        const fragment = new DocumentFragment(); 
        list.innerHTML = '';    
        passwords.forEach(function(password) {
            const li = document.createElement("li");
            li.textContent = password.title;
            li.setAttribute("data-id", password.id);
    
            fragment.appendChild(li);
        });
    
        list.appendChild(fragment);
    }
}

//show detial
list.addEventListener("click", function(event) {
    if ( event.target.nodeName === "LI" ) {
        const li = event.target;
        const currentId = parseInt(li.getAttribute("data-id"), 10);

        const currentItem = passwords.find(function(password) {
            return password.id === currentId;
        });

        infoBoxTitle.textContent = currentItem.title;
        document.body.classList.remove("show-form");
        document.body.classList.add("show-info");
        buttonEdit.setAttribute("data-id", currentItem.id);
        buttonDelete.setAttribute("data-id", currentItem.id);
        tableBody.innerHTML = `
        <tr>
                    <td>Username</td>
                    <td>${currentItem.username ? currentItem.username : '-'}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${currentItem.email ? currentItem.email : '-'}</td>
                </tr>
                <tr>
                    <td>Password</td>
                    <td>${currentItem.password ? currentItem.password : '-'}</td>
                </tr>
                <tr>
                    <td>Website</td>
                    <td>${currentItem.website ? `<a target="_blank" href="${currentItem.website}">${currentItem.website}</a>` : '-'}</td>
                </tr>
                <tr>
                    <td>Phone</td>
                    <td>${currentItem.phone ? `<a target="_blank" href="tel:${currentItem.phone}">${currentItem.phone}</a>` : '-'}</td>
                </tr>
                <tr>
                    <td>One Time Code</td>
                    <td>${currentItem.one_time_code ? currentItem.one_time_code : '-'}</td>
                </tr>
                <tr>
                    <td>Security Question</td>
                    <td>${currentItem.security_question ? currentItem.security_question : '-'}</td>
                </tr>

                <tr>
                    <td>Security Answer</td>
                    <td>${currentItem.security_answer ? currentItem.security_answer : '-'}</td>
                </tr>
        `;
        
    }
});

document.addEventListener("click", function(event){
    if ( event.target.className === "close-btn" ) {
        document.body.classList.remove("show-info");
        document.body.classList.remove("show-form");
    }
});

document.addEventListener("keydown", function(event) {
    if ( event.key === "Escape" ) {
        document.body.classList.remove("show-info");
        document.body.classList.remove("show-form");
    }
});

buttonCreate.addEventListener("click", function() {
    document.body.classList.add("show-form");
});

function showMessage(text = "Cool!", duration = 3000 ) {
    
    const messageELement = document.querySelector("#message");
    messageELement.textContent = text;
    document.body.classList.add("show-message");

    setTimeout(function(){
        document.body.classList.remove("show-message");
        messageELement.textContent = '';
    }, duration)

}

form.addEventListener("submit", function(event) {
    const title = event.target.title;
    const username = event.target.username;
    const email = event.target.email;
    const password = event.target.password;
    const website = event.target.website;
    const phone = event.target.phone;
    const one_time_code = event.target.one_time_code;
    const security_question = event.target.security_question;
    const security_answer = event.target.security_answer;
    const id = event.target.password_id;


    if ( title.value.trim().length ) {

        const data = {
            id: id.value.trim().length ? id.value : new Date().getTime(),
            title: title.value,
            username: username.value,
            email: email.value,
            password: password.value,
            website: website.value,
            phone: phone.value,
            one_time_code: one_time_code.value,
            security_question: security_question.value,
            security_answer: security_answer.value,
        }

        if ( id.value.trim().length ) {
            const currentIndex = passwords.findIndex(function(item) {
                return item.id === parseInt(id.value, 10);
            });
            passwords[currentIndex] = data;
        } else {
            //create
            passwords.push(data);
        }

        localStorage.setObject("passwords", passwords);
    }
    

    renderPasswordList();
    showMessage('Password is saved!');
    form.reset();
    document.body.classList.remove("show-form");
    event.preventDefault();
});

//edit form
buttonEdit.addEventListener("click", function(event) {

    const currentId = parseInt(event.target.getAttribute("data-id"), 10);

    const currentItem = passwords.find(function(item) {
        return item.id === currentId;
    });

    form.elements.title.value = currentItem.title;
    form.elements.username.value = currentItem.username;
    form.elements.email.value = currentItem.email;
    form.elements.password.value = currentItem.password;
    form.elements.website.value = currentItem.website;
    form.elements.phone.value = currentItem.phone;
    form.elements.one_time_code.value = currentItem.one_time_code;
    form.elements.security_question.value = currentItem.security_question;
    form.elements.security_answer.value = currentItem.security_answer;
    form.elements.password_id.value = currentItem.id;

    document.body.classList.remove("show-info");
    document.body.classList.add("show-form");

});

//delete record
buttonDelete.addEventListener("click", function(event) {
    const currentId = parseInt(event.target.getAttribute("data-id"), 10);

    const currentIndex = passwords.findIndex(function(password) {
        return password.id === currentId;
    });

    showMessage("Deleted successfully!");
    passwords.splice(currentIndex, 1);
    localStorage.setObject("passwords", passwords);
    document.body.classList.remove("show-info");
    renderPasswordList();


});