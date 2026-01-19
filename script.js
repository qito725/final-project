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

const form = document.querySelector('section form');

form.addEventListener('submit', (e) => {
    const inputs = form.querySelectorAll('input[type="text"]');
    let hasError = false;

    inputs.forEach(input => {
        const existingError = input.nextElementSibling;
        if (existingError && existingError.classList.contains('error-text')) {
            existingError.remove();
        }
        input.style.border = "1px solid #c9dff3"; 

        if (input.value.trim() === "") {
            e.preventDefault();
            hasError = true;

            input.style.border = "2px solid red";

            const errorMsg = document.createElement('span');
            errorMsg.innerText = "Fill the field";
            errorMsg.classList.add('error-text'); 
            
            input.insertAdjacentElement('afterend', errorMsg);
        }
    });

    if (hasError) {
        console.log("Validation Failed");
    }
});


const passwordInput = document.getElementById('password');
const togglePasswordIcon = document.getElementById('togglePassword');

togglePasswordIcon.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

form.addEventListener('submit', (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; 

   
    const inputs = form.querySelectorAll('input:not([type="submit"]), select');
    let hasError = false;

    inputs.forEach(input => {
     
        const existingError = input.parentElement.querySelector('.error-text');
        
        
        if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-text')) {
            input.nextElementSibling.remove();
        }
        if (input.parentElement.classList.contains('password-wrapper')) {
             if (input.parentElement.nextElementSibling && input.parentElement.nextElementSibling.classList.contains('error-text')) {
                input.parentElement.nextElementSibling.remove();
            }
            input.parentElement.style.border = "none"; 
        }

        input.style.border = "1px solid #c9dff3"; 

     
        let errorMessage = "";

       
        if (input.value.trim() === "") {
            errorMessage = "Fill the field";
        } 
       
        else if (input.type === "email" && !emailRegex.test(input.value)) {
            errorMessage = "Invalid email format";
        }
        
        else if (input.type === "password" || (input.id === "password" && input.type === "text")) {
             
             if (!passwordRegex.test(input.value)) {
                 errorMessage = "Pass must be 8+ chars & include numbers";
             }
        }

        
        if (errorMessage) {
            hasError = true;
            input.style.border = "2px solid red";

            const errorSpan = document.createElement('span');
            errorSpan.innerText = errorMessage;
            errorSpan.classList.add('error-text');

        
            if (input.parentElement.classList.contains('password-wrapper')) {
                
                input.parentElement.insertAdjacentElement('afterend', errorSpan);
            } else {
              
                input.insertAdjacentElement('afterend', errorSpan);
            }
        }
    });

    if (hasError) {
        e.preventDefault();
    }
});



const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});


const productsContainer = document.querySelector('.div4');

function fetchProducts() {
    axios.get('https://dummyjson.com/recipes?limit=6')
        .then(response => {
            const recipes = response.data.recipes;

            recipes.forEach(item => {
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

                productsContainer.innerHTML += productHTML;
            });
        })
        .catch(error => {
            console.error("შეცდომა ინფორმაციის წამოღებისას:", error);
            productsContainer.innerHTML = "<p style='color:red;'>სერვერთან კავშირი ვერ დამყარდა</p>";
        });
}

fetchProducts();

const cookieBox = document.getElementById('cookieBox');
const acceptBtn = document.getElementById('acceptBtn');

if (!localStorage.getItem('cookieAccepted')) {
    cookieBox.style.display = "flex"; 
}

acceptBtn.addEventListener('click', () => {
    cookieBox.style.display = "none";
    
    localStorage.setItem('cookieAccepted', 'true');

});
