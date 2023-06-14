const quotes = [
  {
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    tags: ["inspiration", "life"],
  },
  {
    text: "The way to get started is to quit talking and begin doing.",
    tags: ["motivation", "action"],
  },
  {
    text: "Your time is limited, don't waste it living someone else's life.",
    tags: ["life", "wisdom"],
  },
  {
    text: "If life were predictable it would cease to be life, and be without flavor.",
    tags: ["life", "uncertainty"],
  },
  {
    text: "Life is what happens when you're busy making other plans.",
    tags: ["life", "surprises"],
  },
  {
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    tags: ["future", "doubts"],
  },
  {
    text: "In the end, it's not the years in your life that count. It's the life in your years.",
    tags: ["life", "perspective"],
  },
  {
    text: "It is during our darkest moments that we must focus to see the light",
    tags: ["life", "philosophy"],
  },
  {
    text: "Do not go where the path may lead, go instead where there is no path and leave a trail..",
    tags: ["life", "purpose"],
  },
  {
    text: "Life is either a daring adventure or nothing at all.",
    tags: ["life", "adventure"],
  },
];
  
  function searchQuotes() {
    const searchInput = document.getElementById("searchInput");
    const searchValue = searchInput.value.toLowerCase();
  
    const filteredQuotes = quotes.filter(quote => {
        const lowerCaseTags = quote.tags.map(tag => tag.toLowerCase());
        return lowerCaseTags.some(tag => tag.includes(searchValue));
      });
      
    if (filteredQuotes.length > 0) {
      displayQuotes(filteredQuotes);
    } else {
      const matchingQuotes = quotes.filter(quote => quote.text.toLowerCase().includes(searchValue));
      displayQuotes(matchingQuotes);
    }
  }
  
  function displayQuotes(quotesArray) {
    const quotesList = document.getElementById("quotesList");
    quotesList.innerHTML = "";
  
    if (quotesArray.length > 0) {
      quotesArray.forEach(quote => {
        const quoteElement = document.createElement("div");
        quoteElement.classList.add("quote");
  
        const quoteTextElement = document.createElement("div");
        quoteTextElement.classList.add("quote-text");
        quoteTextElement.textContent = quote.text;
        quoteElement.appendChild(quoteTextElement);
  
        const quoteTagsElement = document.createElement("div");
        quoteTagsElement.classList.add("quote-tags");
        quote.tags.forEach(tag => {
          const tagElement = document.createElement("span");
          tagElement.classList.add("bracket");
          tagElement.textContent = tag;
          quoteTagsElement.appendChild(tagElement);
        });
        quoteElement.appendChild(quoteTagsElement);
  
        const copyButton = document.createElement("button");
        copyButton.classList.add("copy-button");
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", () => {
          copyQuote(quote.text);
        });
        quoteElement.appendChild(copyButton);
  
        quotesList.appendChild(quoteElement);
      });
    } else {
      const quoteElement = document.createElement("div");
      quoteElement.classList.add("quote");
      quoteElement.textContent = "No matching quotes found.";
      quotesList.appendChild(quoteElement);
    }
  }
  
  
  function copyQuote(quoteText) {
    const textarea = document.createElement("textarea");
    textarea.value = quoteText;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  
    const toastContainer = document.getElementById("toastContainer");
    const toastElement = document.createElement("div");
    toastElement.className = "toast show";
    toastElement.textContent = "Quote copied!";
    toastContainer.appendChild(toastElement);
  
    setTimeout(() => {
      toastElement.remove();
    }, 2000);
  }
  
  function showTagSuggestions() {
    const tagSuggestions = document.getElementById("tagSuggestions");
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();
    tagSuggestions.innerHTML = "";
  
    if (searchTerm === "") {
      return;
    }
  
    const matchingTags = [];
  
    quotes.forEach(quote => {
      quote.tags.forEach(tag => {
        if (tag.toLowerCase().includes(searchTerm)) {
          matchingTags.push(tag);
        }
      });
    });
  
    matchingTags.forEach(tag => {
      const tagElement = document.createElement("div");
      tagElement.className = "tag-suggestion";
      tagElement.textContent = tag;
      tagElement.addEventListener("click", () => {
        searchInput.value = tag;
        searchQuotes();
      });
      tagSuggestions.appendChild(tagElement);
    });
  
    searchQuotes();
  }
  
  document.getElementById("searchButton").addEventListener("click", searchQuotes);
  document.getElementById("searchInput").addEventListener("input", showTagSuggestions);
  
  searchQuotes();
  