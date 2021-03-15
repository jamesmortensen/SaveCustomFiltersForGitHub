// Here You can type your custom JavaScript...

if(window.location.pathname.includes('/issues')) {
  var doc = document;
  
  var observer = new MutationObserver(function(mutations) {
    var element = document.getElementById('james-unevaluated');
    // https://stackoverflow.com/a/52834898/552792
    var in_dom = document.body.contains(element);
    if(!in_dom) {
        console.log("element not found, so re-inserted");
        addCustomFilter();
        var element = document.getElementById('james-unevaluated');
        if(window.location.href === element.href) {
          element.setAttribute('aria-checked', 'true');
        } else {
          element.setAttribute('aria-checked', 'false');
        }
        element.getElementsByTagName('svg')[0].innerHTML = element.getAttribute('aria-checked') === 'true' ? '✔' : '';
    } else if (in_dom) {
        //in_dom = false;
        console.log("element removed, so re-add it.");
    }

  });
  observer.observe(document.body, {childList: true, subtree: true});

  
  function addCustomFilter(isChecked) {
    isChecked = isChecked === undefined ? false : isChecked;
    var filterHrefStr = '/issues?q=is%3Aopen+is%3Aissue+-label%3A%22%23+Evaluation%3A+Bug%22+-label%3A%22%23+Evaluation%3A+Critical+Issue%22+-label%3A%22%23+Evaluation%3A+Enhancement%22+-label%3A%22%23+Evaluation%3A+Feature%22+-label%3A%22All%3A+Support+Assistance%22';
    
    console.log('addCustomFilter called...');
    let filterMenuListDiv = doc.querySelector("#filters-select-menu > details-menu > div > div.SelectMenu-list");
    let filterElem = doc.createElement('a');
    filterElem.setAttribute('id', 'james-unevaluated');
    filterElem.setAttribute('class', 'SelectMenu-item');
    filterElem.setAttribute('role', 'menuitemradio');
    filterElem.setAttribute('aria-checked', isChecked.toString());
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
    filterElem.insertAdjacentHTML('beforeend', 'Unevaluated, Open issues');
    //filterElem.textContent += 'Unevaluated, Open issues';
    filterMenuListDiv.insertBefore(filterElem, filterMenuListDiv.childNodes[0]);
  }
  
  customjsReady('body', function() {
    addCustomFilter();
    
  });
}


