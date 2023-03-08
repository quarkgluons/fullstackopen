```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: The POST request contains the data in parameter *note*
    activate server
    Note right of server: The data sent as part of the POST request is saved at the <br/> server through some persistent mechanism
    server-->>browser: Response with status code 302, redirect to location /exampleapp/notes 
    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    Note right of server: Server sends the HTML file
    server-->>browser: send HTML file
    activate browser
    Note right of browser: parse the html and request the css and javascript files
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: sends the main.js file
    activate browser
    Note right of browser: parse the main.js file and execute the javascript code
    browser->>Server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: Send the JSON file containing the 100 notes
    
```
