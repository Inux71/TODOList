function GET(filename, callback) {

}

function POST(filename, data) {
    const request = new XMLHttpRequest();
    const xmlData = 
        `<?xml version='1.0'?>
            ${data.map(element => {
                return `<element>${element}</element>`
            }).join('\n')}`

    request.open("POST", filename);
    request.setRequestHeader("Content-Type", "text/xml");
    request.send(xmlData);
}