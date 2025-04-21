// Developer Quotes Module
const quotesModule = (() => {
  let currentQuoteIndex = 0;
  let quoteItems = [];
  
  function initQuotes() {
    quoteItems = document.querySelectorAll('.quote-item');
  }
  
  function nextQuote() {
    // Hide current quote
    quoteItems[currentQuoteIndex].classList.remove('active');
    
    // Move to next quote
    currentQuoteIndex = (currentQuoteIndex + 1) % quoteItems.length;
    
    // Show new quote
    quoteItems[currentQuoteIndex].classList.add('active');
  }
  
  function prevQuote() {
    // Hide current quote
    quoteItems[currentQuoteIndex].classList.remove('active');
    
    // Move to previous quote
    currentQuoteIndex = (currentQuoteIndex - 1 + quoteItems.length) % quoteItems.length;
    
    // Show new quote
    quoteItems[currentQuoteIndex].classList.add('active');
  }
  
  function addQuote() {
    const quoteInput = document.getElementById('newQuote');
    const authorInput = document.getElementById('quoteAuthor');
    
    const quoteText = quoteInput.value.trim();
    const author = authorInput.value.trim() || 'Unknown';
    
    if (quoteText) {
      const carousel = document.querySelector('.quotes-carousel');
      
      const quoteItem = document.createElement('div');
      quoteItem.className = 'quote-item';
      
      quoteItem.innerHTML = `
        <div>
          <div class="quote-text">"${quoteText}"</div>
          <div class="quote-author">${author}</div>
        </div>
      `;
      
      carousel.appendChild(quoteItem);
      
      // Update quotes array
      quoteItems = document.querySelectorAll('.quote-item');
      
      // Clear inputs
      quoteInput.value = '';
      authorInput.value = '';
      
      // Save to localStorage
      saveData();
    }
  }
  
  // Public API
  return {
    initQuotes,
    nextQuote,
    prevQuote,
    addQuote
  };
})();