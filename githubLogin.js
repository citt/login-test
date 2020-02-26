const account = 'citt',
      repo = 'confluence-backup',
      branch = 'master';

function onSubmit(form) {
    const login = form.username || form.querySelector('#login').value;
    const password = form.token || form.querySelector('#password').value;
    // Encode string/login information with btoa()
    const loginToken = btoa(`${login}:${password}`);
    const request = new Request(
        `https://api.github.com/repos/${account}/${repo}/contents/${page}?ref=${branch}`,
        {
            method: 'GET',
            credentials: 'omit',
            headers: {
                Accept: 'application/json',
                Authorization: `Basic ${loginToken}`
            },
        });
        fetch(request)
            .then(function (response) {
              if (response.status !== 200) { 
                document.querySelector('#loginForm').innerHTML = `Failed to load document (status: ${response.status})`;
              } else {
                response.json()
                  .then(function (json) {
                    const content = json.encoding === 'base64' ? atob(json.content) : json.content,
                          replaceBody = content.indexOf('<body');
                    document.body.innerHTML = content.substring(
                        content.indexOf('>', replaceBody) + 1,
                        content.indexOf('</body>'));
                  });
                  // localStorage.setItem('githubPagesAuth', JSON.stringify({ username: login, token: password }));
              }
            });
        
    return false;
}

// const existingAuth = JSON.parse(localStorage.getItem('githubPagesAuth'));
// if (existingAuth) {
//     onSubmit(existingAuth);
// }