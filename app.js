const gallery = document.getElementById('gallery');

const images = [
    { name: "two seater sofa black", id: 1, price: "$122", img: "sofa1.jpeg" },
    { name: "5 seater sofa brown", id: 2, price: "$370", img: "sofa2.jpeg" },
    { name: "5 seater sofa blue", id: 3, price: "$450", img: "sofa3.jpeg" },
    { name: "5 seater sofa blue and hard wooden table", id: 4, price: "$800", img: "sofa4.jpeg" },
    { name: "5 seater sofa brown", id: 5, price: "$500", img: "sofa5.jpeg" },
   
];

images.forEach(image => {
    const imageItem = document.createElement('div');
    imageItem.className = 'image-item';
    imageItem.setAttribute('data-id', image.id);

    const itemName = document.createElement('h3');
    itemName.textContent = image.name;
    itemName.style.textTransform = 'capitalize';

    const priceTag = document.createElement('p');
    priceTag.textContent = image.price;
    priceTag.style.color = '#27ae60';
    itemName.appendChild(priceTag);

    const img = document.createElement('img');
    img.src = image.img;
    img.alt = image.name;

    const imageActions = document.createElement('div');
    imageActions.className = 'image-actions';

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn like-btn';
    likeBtn.setAttribute('data-id', image.id);
    likeBtn.innerHTML = '<i class="fa fa-heart"></i> <span class="like-count">0</span>';

    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn share-btn';
    shareBtn.setAttribute('data-id', image.id);
    shareBtn.innerHTML = '<span class="material-icons">share</span>';

    const negotiateBtn = document.createElement('button');
    negotiateBtn.className = 'btn negotiate-btn';
    negotiateBtn.setAttribute('data-id', image.id);
    negotiateBtn.innerHTML = '<i class="fa fa-whatsapp"></i> Negotiate';

    imageActions.appendChild(likeBtn);
    imageActions.appendChild(shareBtn);
    imageActions.appendChild(negotiateBtn);

    imageItem.appendChild(img);
    imageItem.appendChild(itemName);
    imageItem.appendChild(imageActions);

    gallery.appendChild(imageItem);
});


// Set up event listeners for buttons
document.querySelectorAll('.like-btn').forEach(btn => {
    const id = btn.dataset.id;
    const likeCount = localStorage.getItem(`likeCount_${id}`) || 0;
    btn.querySelector('.like-count').textContent = likeCount;
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    if (likedItems.includes(id)) {
        btn.classList.add('liked');
    }
    btn.addEventListener('click', function() {
        toggleLike(id, btn);
    });
});

function toggleLike(id, btn) {
    const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
    const index = likedItems.indexOf(id);
    let likeCount = parseInt(localStorage.getItem(`likeCount_${id}`)) || 0;
    if (index > -1) {
        likedItems.splice(index, 1);
        btn.classList.remove('liked');
        likeCount = Math.max(0, likeCount - 1);
    } else {
        likedItems.push(id);
        btn.classList.add('liked');
        likeCount += 1;
        // Email notification removed
    }
    localStorage.setItem('likedItems', JSON.stringify(likedItems));
    localStorage.setItem(`likeCount_${id}`, likeCount);
    btn.querySelector('.like-count').textContent = likeCount;
}

document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = btn.dataset.id;
        const img = document.querySelector(`.image-item[data-id="${id}"] img`);
        const alt = img.alt;
        const url = `${window.location.origin}${window.location.pathname}?item=${id}`;
        const text = `Check out this ${alt}: ${url}`;

        // Create share menu
        const shareMenu = document.createElement('div');
        shareMenu.className = 'share-menu';
        shareMenu.innerHTML = `
            <div class="share-overlay"></div>
            <div class="share-popup">
                <h4>Share this item</h4>
                <a href="https://wa.me/?text=${encodeURIComponent(text)}" target="_blank"><span class="material-icons">whatsapp</span> WhatsApp</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}" target="_blank"><span class="material-icons">facebook</span> Facebook</a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}" target="_blank"><span class="material-icons">twitter</span> Twitter</a>
                <a href="mailto:?subject=Carp Furniture&body=${encodeURIComponent(text)}"><span class="material-icons">email</span> Email</a>
                <button class="close-share">Close</button>
            </div>
        `;
        document.body.appendChild(shareMenu);

        // Close share menu
        shareMenu.querySelector('.close-share').addEventListener('click', () => {
            document.body.removeChild(shareMenu);
        });
        shareMenu.querySelector('.share-overlay').addEventListener('click', () => {
            document.body.removeChild(shareMenu);
        });
    });
    
    // View other products button
    document.getElementById('view-other-products').addEventListener('click', function() {
        const container = document.getElementById('other-products-container');
        if (container.style.display === 'none' || container.style.display === '') {
            container.style.display = 'flex';
            this.textContent = 'Hide Other Products List';
        } else {
            container.style.display = 'none';
            this.textContent = 'View Other Products List';
        }
    });
    
    // Hire service buttons
    document.querySelectorAll('.hire-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const service = this.getAttribute('data-service');
            const desc = this.getAttribute('data-desc');
            const siteUrl = window.location.origin;
            const pageUrl = window.location.href;
            const message = `Hi, I'm interested in hiring the ${service} service. ${desc}. Site: ${siteUrl}. Page: ${pageUrl}`;
            const whatsappUrl = `https://wa.me/256744759181?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});

document.querySelectorAll('.negotiate-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const id = btn.dataset.id;
        const img = document.querySelector(`.image-item[data-id="${id}"] img`);
        const alt = img.alt;
        const price = 'Price: $300'; // Assuming price
        const url = `${window.location.origin}${window.location.pathname}?item=${id}`;
        const message = `Hi, I'm interested in negotiating for this item: ${alt}. ${price}. View image: ${img.src}. Link: ${url}`;
        const whatsappUrl = `https://wa.me/256744759181?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
});

// Search functionality
const searchInput = document.querySelector('.search');
searchInput.addEventListener('keyup', function() {
    const searchTerm = this.value.toLowerCase();
    const imageItems = document.querySelectorAll('.image-item');
    let hasResults = false;

    imageItems.forEach(item => {
        const alt = item.querySelector('img').alt.toLowerCase();
        if (alt.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Handle no results message
    let noResultsMsg = document.getElementById('no-results');
    if (!noResultsMsg) {
        noResultsMsg = document.createElement('p');
        noResultsMsg.id = 'no-results';
        noResultsMsg.textContent = 'No item found for your search, try again with a different term or search for "sofa", "table", "chair",or by number of seaters etc.\n\nFor further assistance, contact us on WhatsApp at +256744759181.';
        noResultsMsg.style.textAlign = 'center';
        noResultsMsg.style.padding = '20px';
        noResultsMsg.style.color = '#7f8c8d';
        document.getElementById('gallery').appendChild(noResultsMsg);
    }

    if (hasResults) {
        noResultsMsg.style.display = 'none';
    } else {
        noResultsMsg.style.display = 'block';
    }
});


const sideMenu = document.getElementById('menu');
sideMenu.addEventListener('click', function() {
    const side = document.createElement('div');
    side.className = 'side-menu';
    side.innerHTML = `
        <div class="side-overlay"></div>
        <div class="side-content">
            <div class="side-header">
                <h3>Menu</h3>
                <button class="close-side">Close</button>
            </div>
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="services.html">Services</a>
            
            <a href="blog.html">Blog</a>
            <a href="faq.html">FAQ</a>
            <a href="support.html">Support</a>
        </div>
    `;
    document.body.appendChild(side);
    side.querySelector('.close-side').addEventListener('click', () => {
        document.body.removeChild(side);
    });
    side.querySelector('.side-overlay').addEventListener('click', () => {
        document.body.removeChild(side);
    });
});

// Get and display user location
fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
        const locationElem = document.getElementById('location');
        locationElem.textContent = `Location: ${data.city}, ${data.country_name}`;
    })
    .catch(err => {
        console.error('Error fetching location:', err);
        const locationElem = document.getElementById('location');
        locationElem.textContent = 'Location: Unknown';
    });
