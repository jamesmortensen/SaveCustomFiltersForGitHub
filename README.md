## Usage

This script adds a button to the GitHub issue tracker "filter" dropdown to save a custom filter. Here is how to use it:

- Do a search, using labels and other options to create a custom filter.
- In the filter dropdown, click the green "save" button.
- Enter a name for the filter.
- The filter now appears in the drop-down list amongst the default filter options.


## Installation

- This script requires the ["Custom JavaScript for Websites 2"](https://chrome.google.com/webstore/detail/custom-javascript-for-web/ddbjnfjiigjmcpcpkmhogomapikjbjdk?hl=en) Chrome extension. Install it in any Chromium-based browser from the Chrome Web Store.

- Next, copy the contents of this repository script to your clipboard.

- Browse to https://github.com.

- Afterwards, click the "CJS" icon in your browser's extension list, which opens an empty code editor.  

- Paste the script into the editor, and click "Save" at the top left.

- Reload the page. You should now see the green "Save Filter" button in the filters dropdown. 


## Troubleshooting Installation

- Did you open the CJS editor while on https://github.com? This extension only injects the code on the actively visible domain. Try browsing to https://github.com and checking the CJS editor to make sure the script is visible.

- For any bugs, please open a ticket.


## Development

This may end up becoming a user-script or a Chrome Extension. 

### Resources:
- https://stackoverflow.com/a/52834898/552792
- https://github.com/Mottie/GitHub-userscripts/blob/master/github-diff-files-filter.user.js
- https://ahmadmostafa.com/2020/05/17/top-ten-chrome-extensions-for-github/
- https://fsymbols.com/signs/tick/


## Release Notes

- v0.8 - Had ability to load hard coded filters
- v0.9 - Had ability to save filters to local storage and load them again, but needed to reload to see them.
- v1.0 - Save filter to local storage and it shows up in real time.
