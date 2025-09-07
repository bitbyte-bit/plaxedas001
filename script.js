document.addEventListener('DOMContentLoaded', function() {
    
    


    // Handle permalink on load
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('item');
    if (itemId) {
        const item = document.querySelector(`.image-item[data-id="${itemId}"]`);
        if (item) {
            item.scrollIntoView({ behavior: 'smooth' });
            item.style.border = '2px solid #3498db';
        }
    }

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        // Clear the form
        document.getElementById('contact-form').reset();
        // Email sending removed
    });

});


function downloadImage(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function shareImage(id) {
    const url = `${window.location.origin}${window.location.pathname}?item=${id}`;
    if (navigator.share) {
        navigator.share({
            title: 'Carp Furniture',
            text: 'Check out this item',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Link copied to clipboard!');
        });
    }
}

const otherProducts = [
    { name: "saachi standing fun black", id: 101, price: "SHs.70000", img: "fan 1.webp", desc: "Saachi standing fan (black).3ft tall and pocket friendly.2months warranty" },
    { name: "", id: 102, price: "", img: "", desc: "" },
    { name: "", id: 103, price: "", img: "", desc: "" },
    { name: "", id: 104, price: "", img: "", desc: "" }
];
// Populate other products
const otherContainer = document.getElementById('other-products-container');
otherProducts.forEach(product => {
    const productItem = document.createElement('div');
    productItem.className = 'image-item';
    productItem.setAttribute('data-id', product.id);

    const img = document.createElement('img');
    img.src = product.img;
    img.alt = product.name;

    const itemName = document.createElement('h3');
    itemName.textContent = product.name;
    itemName.style.textTransform = 'capitalize';

    const priceTag = document.createElement('p');
    priceTag.textContent = product.price;
    priceTag.style.color = '#27ae60';
    itemName.appendChild(priceTag);

    const desc = document.createElement('p');
    desc.textContent = product.desc;
    desc.style.fontSize = '14px';
    desc.style.color = '#7f8c8d';

    const imageActions = document.createElement('div');
    imageActions.className = 'image-actions';

    const likeBtn = document.createElement('button');
    likeBtn.className = 'btn like-btn';
    likeBtn.setAttribute('data-id', product.id);
    likeBtn.innerHTML = '<i class="fa fa-heart"></i> <span class="like-count">0</span>';

    const shareBtn = document.createElement('button');
    shareBtn.className = 'btn share-btn';
    shareBtn.setAttribute('data-id', product.id);
    shareBtn.innerHTML = '<span class="material-icons">share</span>';

    const negotiateBtn = document.createElement('button');
    negotiateBtn.className = 'btn negotiate-btn';
    negotiateBtn.setAttribute('data-id', product.id);
    negotiateBtn.innerHTML = '<i class="fa fa-whatsapp"></i> Negotiate';

    imageActions.appendChild(likeBtn);
    imageActions.appendChild(shareBtn);
    imageActions.appendChild(negotiateBtn);

    productItem.appendChild(img);
    productItem.appendChild(itemName);
    productItem.appendChild(desc);
    productItem.appendChild(imageActions);

    otherContainer.appendChild(productItem);
});
// Event delegation for buttons
document.body.addEventListener('click', function(e) {
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const id = btn.dataset.id;
        let likeCount = parseInt(localStorage.getItem(`likeCount_${id}`)) || 0;
        const likedItems = JSON.parse(localStorage.getItem('likedItems')) || [];
        if (likedItems.includes(id)) {
            likeCount = Math.max(0, likeCount - 1);
            btn.classList.remove('liked');
            const index = likedItems.indexOf(id);
            if (index > -1) likedItems.splice(index, 1);
        } else {
            likeCount += 1;
            btn.classList.add('liked');
            likedItems.push(id);
        }
        localStorage.setItem(`likeCount_${id}`, likeCount);
        localStorage.setItem('likedItems', JSON.stringify(likedItems));
        btn.querySelector('.like-count').textContent = likeCount;
    } else if (e.target.closest('.share-btn')) {
        const btn = e.target.closest('.share-btn');
        const id = btn.dataset.id;
        shareImage(id);
    } else if (e.target.closest('.negotiate-btn')) {
        const btn = e.target.closest('.negotiate-btn');
        const id = btn.dataset.id;
        const product = otherProducts.find(p => p.id == id);
        const message = `Hello, I am interested in negotiating the price for ${product.name} (${product.price}). Please provide more details.`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
});

