// Here You can type your custom JavaScript...

if(window.location.pathname.includes('/issues')) {
  var doc = document;
  console.log('EXECUTED')
  
  
  function fireEventOnStateChange(evt) {
    (function(history){
        var pushState = history.pushState;
        history.pushState = function(state) {
            if (typeof history.onpushstate == "function") {
                history.onpushstate({state: state});
            }
            console.log('state change');
            evt();
            return pushState.apply(history, arguments);
        };
    })(window.history);
  }
  
  function addCustomFilter() {
    console.log('addCustomFilter called...');
    let filterMenuListDiv = doc.querySelector("#filters-select-menu > details-menu > div > div.SelectMenu-list");
    let filterElem = doc.createElement('a');
    filterElem.setAttribute('id', 'james-unevaluated');
    filterElem.setAttribute('class', 'SelectMenu-item');
    filterElem.setAttribute('role', 'menuitemradio');
    filterElem.setAttribute('aria-checked', 'false');
    filterElem.setAttribute('href', '/issues?q=is%3Aopen+is%3Aissue+-label%3A%22%23+Evaluation%3A+Bug%22+-label%3A%22%23+Evaluation%3A+Critical+Issue%22+-label%3A%22%23+Evaluation%3A+Enhancement%22+-label%3A%22%23+Evaluation%3A+Feature%22+-label%3A%22All%3A+Support+Assistance%22');
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
    fireEventOnStateChange(function() {
      var interval = setInterval(function() {
        var elem = document.getElementById('james-unevaluated');
        console.log(elem)
        if(!elem) {
          console.log('add filter')
          addCustomFilter();
        } else {
          console.log('stop checking for existing filter in 3 seconds')
          setTimeout(function() { clearInterval(interval);},3000);
        }
      },400);
    });
    
      //   document.body.contains()
      // })
      //observeMutations();
  });
}


