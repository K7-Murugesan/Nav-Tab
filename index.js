document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.nav-link');
    const tabContent = document.querySelectorAll('.tab-pane');
  
    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        const targetTabId = this.getAttribute('aria-controls');
        const targetTabContent = document.getElementById(targetTabId);
  
        console.log('Fetching content for tab:', targetTabId);
        fetchContent(this.getAttribute('data-api'), targetTabContent);
      });
    });
  
    function fetchContent(apiUrl, targetElement) {
      console.log('Fetching content from API:', apiUrl);
  
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log('API response:', data);
          targetElement.innerHTML = JSON.stringify( data );
          const table = document.createElement('table');
          table.classList.add('table');
  
        // Create table header
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        for (const key in data[0]) {
          const th = document.createElement('th');
          th.textContent = key.toUpperCase();
          headerRow.appendChild(th);
        }
        thead.appendChild(headerRow);
        table.appendChild(thead);
  
        // Create table body
        const tbody = document.createElement('tbody');
        data.forEach(item => {
          const row = document.createElement('tr');
          for (const key in item) {
            const td = document.createElement('td');
            td.textContent = item[key];
            row.appendChild(td);
          }
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
  
        // Replace the content with the table
        targetElement.innerHTML = '';
        targetElement.appendChild(table);
        })
        .catch(error => console.error('Error fetching content:', error));
    }
  });
  