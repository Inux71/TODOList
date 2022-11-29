function GET(filename, callback) {
    const request = new XMLHttpRequest();
    let data = [];
    let xmlData = [];

    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            data = request.responseXML;

            if (!data) {
                callback([]);

                return;
            }

            const xmlRoot = data.querySelector("Data");

            xmlData = [...xmlRoot.children].map(element => {
                return element.textContent;
            });

            callback?.(xmlData);
        }
    };

    request.open("GET", filename, true);
    request.responseType = "document";
    request.overrideMimeType("text/xml");
    request.send();
}

function POST(filename, data) {
    const request = new XMLHttpRequest();
    const xmlData = 
        `<?xml version='1.0'?>
            <Data>
            ${data.map(element => {
                return `<element>${element}</element>`
            }).join('\n')}
            </Data>`

    request.open("POST", filename);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(xmlData);
}