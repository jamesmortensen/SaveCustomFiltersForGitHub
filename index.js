if(window.location.pathname.includes('/issues')) {
  var doc = document;
  var log = console.log;
  
  function run() {
    let filters = getFiltersFromLocalStorage();
    filters.forEach((filter) => {
      addCustomFilter(filter);
      markFilterAsCheckedIfInUse(filter);
    });
    repeatAddingFiltersIfDOMChanges();
    addSaveFilterButton();
    styleAndPositionSaveFilterButton();
    makeSaveFilterButtonClickable();
  }
  
  function getFiltersFromLocalStorage() {
    let filtersJSON = localStorage.getItem('custom-filters');
    let filters = filtersJSON != null ? JSON.parse(filtersJSON) : [];
    return filters == null ? [] : filters;
  }
  
  function addCustomFilter(filter) {
    let filterHrefStr = filter.href;
    //console.log('addCustomFilter called...');
    let filterMenuListDiv = doc.querySelector("#filters-select-menu > details-menu > div > div.SelectMenu-list");
    let filterElem = doc.createElement('a');
    filterElem.setAttribute('data-filters', 'james-unevaluated');
    filterElem.setAttribute('class', 'SelectMenu-item');
    filterElem.setAttribute('role', 'menuitemradio');
    filterElem.setAttribute('aria-checked', 'false');
    filterElem.setAttribute('href', filterHrefStr);
    filterElem.setAttribute('data-ga-click', 'Open issues, Not evaluated by evaluation group');
    let svgElem = doc.createElement('svg');
    svgElem.setAttribute('class', 'octicon octicon-check SelectMenu-icon SelectMenu-icon--check');
    svgElem.setAttribute('height', '16');
    svgElem.setAttribute('viewBox', '0 0 16 16');
    svgElem.setAttribute('version', '1.1');
    svgElem.setAttribute('width', '16');
    svgElem.setAttribute('aria-hidden', 'true');
    let pathElem = doc.createElement('path');
    pathElem.setAttribute('fill-rule', 'evenodd');
    pathElem.setAttribute('d', 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z');
    svgElem.appendChild(pathElem);
    filterElem.appendChild(svgElem);
    filterElem.insertAdjacentHTML('beforeend', filter.text);
    filterMenuListDiv.insertBefore(filterElem, filterMenuListDiv.childNodes[0]);
  }
  
  function markFilterAsCheckedIfInUse(filter) {
    var element = doc.querySelector('[href="'+ filter.href +'"]');
    if(window.location.href === element.href) {
      element.setAttribute('aria-checked', 'true');
    } else {
      element.setAttribute('aria-checked', 'false');
    }
    element.getElementsByTagName('svg')[0].innerHTML = element.getAttribute('aria-checked') === 'true' ? '✔' : '';
  }
  
  function repeatAddingFiltersIfDOMChanges() {
    observer.observe(doc.body, {childList: true, subtree: true});
  }
  
  function addFilterIfDOMChanges() {
    //console.log('run MutationObserver callback...');
    let filters = getFiltersFromLocalStorage();
    filters.forEach((filter, index) => {
      var filterWrapperElem = doc.querySelector("#repo-content-pjax-container > div > div.d-flex.flex-justify-between.mb-md-3.flex-column-reverse.flex-md-row.flex-items-end");
      var element = filterWrapperElem.querySelector('[href="'+ filter.href +'"]');
      var in_dom = doc.body.contains(element);
      if(!in_dom) {
        addCustomFilter(filter);
        markFilterAsCheckedIfInUse(filter);
      }
    });
    if(!doc.querySelector('[data-filters=save')) {
      addSaveFilterButton();
      styleAndPositionSaveFilterButton();
      makeSaveFilterButtonClickable();
    }
  }
  
  function addSaveFilterButton() {
    var saveFilterBtn = doc.createElement('button');
    saveFilterBtn.setAttribute('data-filters','save');
    saveFilterBtn.setAttribute('class','btn btn-primary');
    doc.querySelector('#filters-select-menu > details-menu > div > div.SelectMenu-header > h3').insertAdjacentElement('afterend', saveFilterBtn);
  }
  
  function styleAndPositionSaveFilterButton() {
    doc.querySelector('[data-filters=save]').style = 'width:100px;height: 20px;display: padding-bottom: 1px; text-align: center; display:inline-block; padding-bottom:25px;position:absolute;left:44%;border-radius:6px;';
    doc.querySelector('[data-filters=save]').textContent = 'Save Filter';
  }
  
  function makeSaveFilterButtonClickable() {
    doc.querySelector('[data-filters=save]').onclick = function() {
      let filter = saveNewFilterInLocalStorage();
      addCustomFilter(filter);
      markFilterAsCheckedIfInUse(filter)
    }
  }
  
  function saveNewFilterInLocalStorage() {
    let href = window.location.pathname + window.location.search;
    console.log(href);
    let filters = getFiltersFromLocalStorage();
    var filterExists = false;
    filters.forEach((filter) => {
      if(filter.href === href && !filterExists) {
        alert('Filter already exists...');
        filterExists = true;
      }
    });
    if(filterExists) return;
    var newFilterName = prompt('Enter name for saved filter:');
    if(newFilterName === '' || newFilterName == null) {
      alert('Not saved. Please enter a name.');
      return;
    }
    var filter = { text: newFilterName, href: href };
    filters.push(filter);
    localStorage.setItem('custom-filters', JSON.stringify(filters));
    return filter;
  }
  
  var observer = new MutationObserver(addFilterIfDOMChanges);
  
  customjsReady('body', function() {
    run();
  });
}
