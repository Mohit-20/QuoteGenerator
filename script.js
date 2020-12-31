const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtm = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Showloading
function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading
function removeLoadingSpinner()
{
    if(!loader.hidden)
    {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

async function getQuote(){
    showLoadingSpinner()
    const proxyUrl = 'https://floating-stream-67197.herokuapp.com/'
    const apiUrl =  'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        authorText.innerText = data.quoteAuthor;
        if(data.quoteAuthor === '')
        {
            authorText.innerText = 'Unkonwn'
        }
        else{
            quoteText.innerText = data.quoteText;
        }
        // Reduce Font Size for long quote
        if(data.quoteText.length > 120)
        {
            quoteText.classList.add('long-quote')
        }
        else{
            quoteText.classList.remove('long-quote')
        }
        removeLoadingSpinner()
    } catch (error) {
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtm.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

getQuote();