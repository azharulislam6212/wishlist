class Wishlist {
  constructor() {
    this.wishlist = JSON.parse(localStorage.getItem('user_wishlist')) || [];
    this.wishlistButtons = document.querySelectorAll('.wishlist-btn-js');
    this.wishlistCount = document.querySelector('.wishlist_count');
    this.wishlistContainer = document.querySelector('.wishlist-grid');

    this.init();
  }

  init() {
    this.updateWishlistCount();
    this.activateButtons();
    this.bindEvents();
  }

  updateWishlistCount() {
    const countElement = document.querySelector('.wishlist_count');
    if (countElement) countElement.textContent = this.wishlist.length;
  }

  toggleWishlist(button) {
    const productHandle = button.dataset.productHandle;
    const isActive = button.classList.contains('is-active');

    if (isActive) {
      // Remove from wishlist
      this.wishlist = this.wishlist.filter((handle) => handle !== productHandle);
      button.classList.remove('is-active');
    } else {
      // Add to wishlist
      this.wishlist.push(productHandle);
      button.classList.add('is-active');
    }

    localStorage.setItem('user_wishlist', JSON.stringify(this.wishlist));
    this.updateWishlistCount();
  }

  activateButtons() {
    this.wishlistButtons.forEach((button) => {
      const productHandle = button.dataset.productHandle;
      if (this.wishlist.includes(productHandle)) {
        button.classList.add('is-active');
      }
    });
  }

  bindEvents() {
    document.addEventListener('click', (event) => {
      if (event.target.closest('.wishlist-btn-js')) {
        event.preventDefault();
        const button = event.target.closest('.wishlist-btn-js');
        this.toggleWishlist(button);
      }
    });
  }
}

// Initialize the Wishlist
document.addEventListener('DOMContentLoaded', () => {
  new Wishlist();
});
