const navMenu = document.getElementById('sidebar'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

// Function to open the sidebar
if (navToggle) {
    navToggle.addEventListener("click", () => {
        navMenu.classList.add('show-sidebar');
    });
}

// Function to close the sidebar
if (navClose) {
    navClose.addEventListener("click", () => {
        navMenu.classList.remove('show-sidebar');
    });
}

// Function to close sidebar on link click
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-sidebar');
    });
});



const tabs = document.querySelectorAll('[data-target]'),
tabContent = document.querySelectorAll('[data-content]')

tabs.forEach(tab=> {
    tab.addEventListener("click",()=>{
        const target = document.querySelector(tab.dataset.target)
        tabContent.forEach(tabContents =>{
            tabContents.classList.remove('skills__active')
        })

        target.classList.add('skills__active')


        tabs.forEach(tab =>{
            tab.classList.remove('skills__active')
        })

        tab.classList.add('skills__active')
    })
})


/*mixitup*/
let mixerPortfolio = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});


const linkwork = document.querySelectorAll('.work__item');

function activeWork(event) {
  
    linkwork.forEach(l => l.classList.remove('active-work'));
    
   
    event.currentTarget.classList.add('active-work');
}


linkwork.forEach(l => l.addEventListener("click", activeWork));



document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("work__button")){
        togglePortfolioPopup();
        portfolioItemDetails(e.target.parentElement)
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio__popup").classList.toggle("open");
}

document.querySelector(".portfolio__popup-close").addEventListener("click",togglePortfolioPopup)


function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp__thumnail img").src=portfolioItem.querySelector(".work__img").src;
   document. querySelector(".portfolio__popup-subtitle span").innerHTML=portfolioItem.querySelector(".work__title").innerHTML;
   document. querySelector(".portfolio__popup-body").innerHTML=portfolioItem.querySelector(".portfolio__item-details").innerHTML;
   
}


const modalViews = document.querySelectorAll('.services__modal'),
modelBtns = document.querySelectorAll('.services__button'),
modalCloses=document.querySelectorAll('.services__modal-close')


let modal=function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modelBtns.forEach((modelBtn,i)=>{
    modelBtn.addEventListener('click',()=>{
        modal(i)
    })
})


modalCloses.forEach((modalClose) =>{
    modalClose.addEventListener("click",()=>{
        modalViews.forEach((modalView) =>{
            modalView.classList.remove('active-modal')
        })
    })
})

const inputs = document.querySelectorAll(".input");

function focusFunc(){
    let parent = this.parentNode;
    parent.classList.add("focus");
}

function blurFunc(){
    let parent=this.parentNode;
    if(this.value==""){
        parent.classList.remove("focus");
    }
}

inputs.forEach((input)=>{
    input.addEventListener("focus",focusFunc);
    input.addEventListener("blur",blurFunc)
})


const sections = document.querySelectorAll("section[id]");
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
    let scrollY = window.pageYOffset; // Changed from pageXOffset to pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute("id");

        // Use a variable to store the selector and ensure correct escaping
        const link = document.querySelector(`.nav__menu a[href*="${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            if (link) {
                link.classList.add("active-link");
            }
        } else {
            if (link) {
                link.classList.remove("active-link");
            }
        }
    });
}


function openEmailClient() {
    const email = 'Rukminijinka2712@gmail.com';
    const subject = 'Subject Here';
    const body = 'Message Here';
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if the form is valid
    if (this.checkValidity()) {
        // Form is valid, submit the form
        const formData = new FormData(this);
        
        fetch(this.action, {
            method: this.method,
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Show success notification
                showNotification('Message sent successfully!');
                this.reset(); // Reset form fields

                // Optionally navigate to home after a delay
                setTimeout(() => {
                    window.location.href = '#home'; // Navigate to home
                }, 1000); // Adjust the delay as needed
            } else {
                showNotification('Error sending message. Please try again.');
            }
        })
        .catch(error => {
            showNotification('Error sending message. Please try again.');
        });
    } else {
        // If the form is not valid, show validation messages
        this.reportValidity();
    }
});

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    // Automatically hide the notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function () {
    // Select the share button by its ID
    const shareButton = document.getElementById('btnShare');

    // Check if the button exists before adding an event listener
    if (shareButton) {
        shareButton.addEventListener('click', function () {
            // Check if the Web Share API is supported
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this website!',
                    text: 'Visit this amazing website for more information.',
                    url: window.location.href, // Current URL of the page
                })
                .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
            } else {
                alert('Web Share API is not supported in your browser.');
            }
        });
    } else {
        console.error('Share button not found!');
    }
});