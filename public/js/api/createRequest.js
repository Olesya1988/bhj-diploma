const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('readystatechange', () => {
        if (xhr.status === 200 && xhr.readyState === xhr.DONE) {
            callback = (err, response) => {
                console.log(err);
                console.log(response);
            }
        } else {
            console.log(err);
        }
    });

    if (method === "GET") {
        xhr.open("GET", 'https://example.com?mail=${data.mail}&password=${data.password}');
        xhr.responseType = 'json';
        xhr.send();
    } else {
        const formData = new FormData;
        formData.append('mail', 'data.mail');
        formData.append('password', 'data.password');
        xhr.open('POST', 'https://example.com');        
        xhr.send(formData);
    }
};