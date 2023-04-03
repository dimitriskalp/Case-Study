const apiKey = 'b248c55faae44e5e8d1265464c343c0c';
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsList = document.getElementById('results-list');
const languageInput = document.getElementById('language');
const dateFromInput = document.getElementById('date-from');
const dateToInput = document.getElementById('date-to');
const resultCounter = document.getElementById('result-count');
const errorSpan = document.createElement('span');



searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  const dateFromValue = dateFromInput.value;
  const dateToValue = dateFromInput.value;
  const languageValue = languageInput.value;

  if(!dateFromValue == "" && !dateToValue == "" && !languageValue == "" && !searchTerm == ""){
    const apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&from=${dateFromValue}&to=${dateToValue}&language=${languageValue}&pageSize=25&apiKey=${apiKey}`;
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        resultsList.innerHTML = '';

        const numArticles = data.totalResults;
        resultCounter.textContent = "Number of results: " + numArticles + "";

        data.articles.forEach(article => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          const dateSpan = document.createElement('span');
          dateSpan.className = "ml-2";
          const dateArt = article.publishedAt;
          
          link.href = article.url;
          link.target = '_blank';
          link.textContent = article.title;
          li.appendChild(link);
          dateSpan.textContent = "Date: " + dateArt.slice(0,-10) + " ";
          li.appendChild(dateSpan);
          resultsList.appendChild(li);
        });
        
      });
  }else{
    resultsList.innerHTML = '';
    resultCounter.innerHTML = '';
    errorSpan.className = 'text-danger';
    errorSpan.textContent = "Please fill all the requirment fields";
    resultCounter.appendChild(errorSpan);
  }
});
