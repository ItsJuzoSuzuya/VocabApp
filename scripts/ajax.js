export function saveLanguageToDB(language) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/db.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send language as POST parameter
    let data = "action=language&language=" + encodeURIComponent(language);
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
                history.back();
        }
    };
}

export function saveTopicToDB(language, topic) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/db.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Send language as POST parameter
    let data = "action=topic&topic=" + encodeURIComponent(topic) + "&language=" + encodeURIComponent(language);
    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            history.back();
        }
    };
}

export function getLanguages(): Promise<any[]>{
    return fetch("http://localhost:8080/db.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "action=Get_Lang"
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .catch(error => {
            console.log(error);
        });
}

