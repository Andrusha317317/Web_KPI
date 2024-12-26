window.onload = () => {
    const text = localStorage.getItem("text_for_4");
    if(text){
        document.getElementById("imp_text").innerText = localStorage.getItem("text_for_4");
    }

    let images = JSON.parse(localStorage.getItem("images"));
    if (images) {
        const impText = document.getElementById("imp_text");
        images.forEach(imageUrl => {

            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = "Inserted Image";
            img.style.maxWidth = "100%";
            img.style.height = "auto";

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-button");

            deleteButton.onclick = function() {
                deleteImage(imageUrl);
            };


            const imageContainer = document.createElement("div");
            imageContainer.classList.add("image-container");

            imageContainer.appendChild(img);
            imageContainer.appendChild(deleteButton);

            impText.appendChild(imageContainer);
        });
    }
}

function changeText() {
    const a = document.getElementById('c3');
    const b = document.getElementById('c6');

    const temp = a.innerText;
    a.innerText = b.innerText;
    b.innerText = temp;
}

function findArea() {
    const l = parseInt(document.getElementById("l").value);
    const h = parseInt(document.getElementById("h").value);

    if(!l || !h || h < 1 || l < 1 || l > 100 || h > 100 ) {
        alert("Некоректне значення, потрібно вводити від 1 до 100, усі нецілі числа будуть конвертовані в цілі")
        return;
    }

    const result = document.getElementById("res")
    result.innerHTML = `Результат: ${h*l}`;
}

function getDividers() {
    const h = parseInt(document.getElementById("n").value);

    if(!h || h < 1 || h > 50) {
        alert("Некоректне значення, потрібно вводити від 1 до 50, усі нецілі числа будуть конвертовані в цілі")
        return;
    }

    const dividers = [];
    for (let i = 1; i <= h; i++) {
        if (h % i === 0) {
            dividers.push(i);
        }
    }

    alert(`Дільники числа ${h}: ${dividers.join(", ")}`);

    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
        const [key, _] = cookie.split("=");
        if (key.startsWith("dividers")) {
            document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            break;
        }
    }

    document.cookie = `dividers${h}=${dividers.join(", ")}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
}


function getDividersFromCookies() {
    let number;
    let dividers;
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
        const [key, value] = cookie.split("=");

        if (key.startsWith("dividers")) {
            number = key.replace("dividers", "");
            dividers = value.split(", ");
            break;
        }
    }

    if(!number || !dividers) {
        alert('Нема збережених в кукіс даних')
        return;
    }

    alert(`Дільники числа ${number}: ${dividers.join(", ")}`)
}


function setUpper() {
    const text = document.getElementById("imp_text");

    const cap = text.innerText
        .split(' ')
        .map(word =>
            word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()  // Змінюємо першу літеру на велику
        )
        .join(' ');

    text.innerText = cap;
    localStorage.setItem('text_for_4', cap);
}

function displayFifth() {
    const fifth = document.getElementById("fifth");
    const others = document.getElementsByClassName('isv');

    if(fifth.style.display !== 'none') {
        fifth.style.display = "none";

        for(let other of others) {
            other.style.display = "flex";
        }

        return;
    }
    fifth.style.display = "flex";

    for(let other of others) {
        other.style.display = "none";
    }
}

// function setImage() {
//     const imageUrl = document.getElementById("f").value;
//     if (!imageUrl) {
//         alert('Ну це ж не посилання... :(');
//         return;
//     }
//
//     const img = document.createElement("img");
//     img.src = imageUrl;
//     document.getElementById("imp_text").appendChild(img);
//
//     const deleteButton = document.createElement("button");
//     deleteButton.textContent = "Delete";
//     deleteButton.classList.add("delete-button");
//
//     deleteButton.onclick = function() {
//         deleteImage(imageUrl);
//     };
//
//     let images = JSON.parse(localStorage.getItem("images")) || [];
//     images.push(imageUrl);
//     localStorage.setItem("images", JSON.stringify(images));
// }
//
// function deleteImage() {
//
// }

function setImage() {
    const imageUrl = document.getElementById("f").value;
    if (imageUrl) {
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Inserted Image";
        img.style.maxWidth = "100%";
        img.style.height = "auto";
        img.classList.add("inserted-image");

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");

        deleteButton.onclick = function() {
            deleteImage(imageUrl);
        };

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");

        imageContainer.appendChild(img);
        imageContainer.appendChild(deleteButton);

        document.getElementById("imp_text").appendChild(imageContainer);

        let images = JSON.parse(localStorage.getItem("images")) || [];
        images.push(imageUrl);
        localStorage.setItem("images", JSON.stringify(images));
    } else {
        alert("Будь ласка, введіть URL зображення!");
    }
}

function deleteImage(imageUrl) {
    const impText = document.getElementById("imp_text");
    const imageContainers = impText.getElementsByClassName("image-container");

    for (let container of imageContainers) {
        const img = container.querySelector("img");
        if (img.src === imageUrl) {
            impText.removeChild(container);
            break;
        }
    }

    let images = JSON.parse(localStorage.getItem("images")) || [];
    images = images.filter(url => url !== imageUrl);
    localStorage.setItem("images", JSON.stringify(images));
}

