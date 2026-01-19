//burgermenu
const burgerBar = document.querySelector('.burger-bar');
const navMenu = document.querySelector('.nav1 ul');

burgerBar.addEventListener('click', () => {
    
    navMenu.classList.toggle('active');
    
    const icon = burgerBar.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark'); 
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

//form validation
const form = document.querySelector('section form');

form.addEventListener('submit', (e) => {
    // ვირჩევთ ყველა ტექსტურ ინპუტს (სახელი, გვარი, მისამართი)
    const inputs = form.querySelectorAll('input[type="text"]');
    let hasError = false;

    inputs.forEach(input => {
        // 1. ვშლით ძველ ერორებს (რომ არ გამრავლდეს ტექსტები)
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-text')) {
            existingError.remove();
        }
        input.style.border = "1px solid #c9dff3"; // ვაბრუნებთ ძველ ფერს

        // 2. ვამოწმებთ, არის თუ არა ცარიელი
        if (input.value.trim() === "") {
            e.preventDefault(); // ვაჩერებთ გაგზავნას
            hasError = true;

            // ვუცვლით ჩარჩოს ფერს
            input.style.border = "2px solid red";

            // ვქმნით ერორ ტექსტს
            const errorMsg = document.createElement('span');
            errorMsg.innerText = "Fill the field";
            errorMsg.classList.add('error-text'); // კლასს ვანიჭებთ სტილისთვის
            
            // ვსვამთ ინპუტის ქვემოთ
            input.insertAdjacentElement('afterend', errorMsg);
        }
    });

    if (hasError) {
        // თუ სადმე ერორია, აქ შეგიძლია კონსოლშიც გამოიტანო რამე
        console.log("Validation Failed");
    }
});


//პაროლის ჩვენება/დამალვა,regex, empty field check
const passwordInput = document.getElementById('password');
const togglePasswordIcon = document.getElementById('togglePassword');

// 1. პაროლის გამოჩენა/დამალვა (Show/Hide)
togglePasswordIcon.addEventListener('click', function () {
    // ვამოწმებთ ტიპს
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // ვცვლით აიკონს (თვალი / გადახაზული თვალი)
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

// 2. ვალიდაცია გაგზავნისას
form.addEventListener('submit', (e) => {
    // Regex წესები
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // მარტივი იმეილის შემოწმება
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // მინიმუმ 8 სიმბოლო, 1 ასო და 1 ციფრი მაინც

    // ვირჩევთ ყველა საჭირო ველს
    const inputs = form.querySelectorAll('input:not([type="submit"]), select');
    let hasError = false;

    inputs.forEach(input => {
        // ძველი ერორების გასუფთავება
        const existingError = input.parentElement.querySelector('.error-text');
        // პაროლისთვის მშობელი div-ია, სხვებისთვის პირდაპირ form, ამიტომ input.parentElement ვიყენოთ უსაფრთხოებისთვის
        // ან უფრო მარტივად, თუ input პაროლია, error text უნდა იყოს wrapper-ის გარეთ ან შიგნით.
        
        // მოდი გავამარტივოთ ერორის წაშლა:
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-text')) {
            input.nextElementSibling.remove();
        }
        // პაროლის შემთხვევაში ერორი div-ის გარეთ შეიძლება იყოს, ამიტომ ვამოწმებთ wrapper-ის შემდეგაც
        if (input.parentElement.classList.contains('password-wrapper')) {
             if (input.parentElement.nextElementSibling && input.parentElement.nextElementSibling.classList.contains('error-text')) {
                input.parentElement.nextElementSibling.remove();
            }
            input.parentElement.style.border = "none"; 
        }

        input.style.border = "1px solid #c9dff3"; // Reset border

        // ---- ვალიდაციის ლოგიკა ----
        let errorMessage = "";

        // 1. ცარიელის შემოწმება
        if (input.value.trim() === "") {
            errorMessage = "Fill the field";
        } 
        // 2. იმეილის შემოწმება Regex-ით
        else if (input.type === "email" && !emailRegex.test(input.value)) {
            errorMessage = "Invalid email format";
        }
        // 3. პაროლის შემოწმება Regex-ით
        else if (input.type === "password" || (input.id === "password" && input.type === "text")) {
             // შენიშვნა: როცა პაროლი ჩანს, type="text"-ია, ამიტომ ID-ითაც ვამოწმებთ
             if (!passwordRegex.test(input.value)) {
                 errorMessage = "Pass must be 8+ chars & include numbers";
             }
        }

        // თუ ერორი დაფიქსირდა
        if (errorMessage) {
            hasError = true;
            input.style.border = "2px solid red";

            // ერორ ტექსტის შექმნა
            const errorSpan = document.createElement('span');
            errorSpan.innerText = errorMessage;
            errorSpan.classList.add('error-text');

            // სად ჩავსვათ ერორი?
            if (input.parentElement.classList.contains('password-wrapper')) {
                // თუ პაროლია, wrapper-ის ქვემოთ ჩავსვათ
                input.parentElement.insertAdjacentElement('afterend', errorSpan);
            } else {
                // თუ სხვა ინპუტია, პირდაპირ მის ქვემოთ
                input.insertAdjacentElement('afterend', errorSpan);
            }
        }
    });

    if (hasError) {
        e.preventDefault(); // არ ვაგზავნით ფორმას
    }
});


//დამატებითი ლოგიკა 
// სქროლის ეფექტი ჰედერზე
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    // თუ 50px-ზე მეტია ჩამოსქროლილი
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        // თუ ზევით დაბრუნდა
        header.classList.remove('scrolled');
    }
});

// ვირჩევთ ადგილს, სადაც პროდუქტები უნდა ჩაიყაროს
const productsContainer = document.querySelector('.div4');

// ფუნქცია ინფორმაციის წამოსაღებად
function fetchProducts() {
    // ვიყენებთ axios-ს (dummyjson API - 6 ცალი რეცეპტი)
    axios.get('https://dummyjson.com/recipes?limit=6')
        .then(response => {
            const recipes = response.data.recipes; // სერვერიდან მოსული სია

            // თითოეული რეცეპტისთვის ვქმნით HTML-ს
            recipes.forEach(item => {
                // რადგან API-ს ფასი არ აქვს, ჩვენ მოვიფიქროთ (მაგ: 10-დან 30-მდე)
                const randomPrice = (Math.random() * (30 - 10) + 10).toFixed(2);

                const productHTML = `
                    <div class="products">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="productbody">
                            <h4>${item.name}</h4>
                            <span class="rate">⭐ ${item.rating} (${item.reviewCount})</span>
                            <div class="addbutton">
                                <button>Add To Cart</button>
                                <span class="price1">$${randomPrice}</span>
                            </div>
                        </div>
                    </div>
                `;

                // ვამატებთ HTML-ში
                productsContainer.innerHTML += productHTML;
            });
        })
        .catch(error => {
            console.error("შეცდომა ინფორმაციის წამოღებისას:", error);
            productsContainer.innerHTML = "<p style='color:red;'>სერვერთან კავშირი ვერ დამყარდა</p>";
        });
}

// გამოვიძახოთ ფუნქცია საიტის ჩატვირთვისას
fetchProducts();

//local storage 
const cookieBox = document.getElementById('cookieBox');
const acceptBtn = document.getElementById('acceptBtn');

// 1. ვამოწმებთ, აქვს თუ არა უკვე დაჭერილი მომხმარებელს
if (!localStorage.getItem('cookieAccepted')) {
    // თუ არ აქვს დაჭერილი (მეხსიერებაში არ არის), გამოვაჩინოთ ბანერი
    cookieBox.style.display = "flex"; 
}

// 2. ღილაკზე დაჭერის ლოგიკა
acceptBtn.addEventListener('click', () => {
    // 1. ბანერის გაქრობა
    cookieBox.style.display = "none";
    
    // 2. ბრაუზერის მეხსიერებაში ჩაწერა (localStorage)
    localStorage.setItem('cookieAccepted', 'true');
});