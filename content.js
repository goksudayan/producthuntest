// Function to hide vote buttons and other elements
function hideElements() {
    // Hide all elements with data-test="vote-button" by setting display to none
    const voteButtons = document.querySelectorAll('button[data-test="vote-button"]');
    voteButtons.forEach(button => {
      button.style.display = 'none';
    });
  
    // Hide the 'Featured' link with the specific class and href
    const featuredLink = document.querySelector('a[href="/"][class="text-14 font-semibold text-light-gray"]');
    if (featuredLink) {
      featuredLink.style.display = 'none';
    }
  }
  
  // Function to shuffle an array
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }
  
  let scrambled = false

  // Function to scramble post-item divs (only once)
  function scrambleItems() {

    // Get all sections with data-test starting with "homepage-section-"
    const homepageSections = document.querySelectorAll('[data-test^="homepage-section-"]');
  
    homepageSections.forEach(section => {
      // Get all post-item divs within this section
      const postItems = section.querySelectorAll('[data-test^="post-item-"]');

      if (postItems.length > 0) {
        // Convert NodeList to Array for shuffling
        const postItemsArray = Array.from(postItems);
  
        // Shuffle the array of post-item divs
        const shuffledItems = shuffle(postItemsArray);

        // Remove the existing items from the section
        shuffledItems.forEach(item => section.removeChild(item));
  
        // Append the shuffled items back to the section
        shuffledItems.forEach(item => section.appendChild(item));
      }

    })
    
    scrambled = true;
  }
  
  // Function to handle URL changes and apply hiding logic
  function handleURLChange() {
    const currentURL = window.location.href;
  
    // If the user is on the homepage, redirect to /all
    if (currentURL === 'https://www.producthunt.com/') {
      window.location.href = 'https://www.producthunt.com/all';
    } else {

      hideElements(); // Apply the hiding logic for other pages
    }
  }

  setInterval(() => {
    if (!scrambled) {
        scrambleItems()
    }
    hideElements()
  }, 500)
  
  // Run the function when the script loads
  handleURLChange();
  
  // Listen for URL changes (for navigating within a single-page app)
  let lastURL = window.location.href;
  const observer = new MutationObserver(() => {
    const newURL = window.location.href;
    if (newURL !== lastURL) {
      lastURL = newURL;
      handleURLChange(); // Reapply hiding logic when URL changes
    }
  });
  
  // Start observing changes to the document
  observer.observe(document, { subtree: true, childList: true });
  