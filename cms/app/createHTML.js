export default class html {
    constructor(user, imgs) {

        this.imgs = imgs

        this.title = user.title
        this.desc = user.desc
        this.autor = user.autor
        this.favicon = user.favicon
        this.theme = user.theme
        this.type = user.type

        console.log(this)
        this.build()
    }
    build() {
        this.html = `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.title}</title>
    <meta name="description" content="${this.desc}">
    <meta name="autor" content="${this.autor}">
    <link rel="shortcut icon" href="${this.favicon}">
</head>
<body>
    
</body>
</html>

        `

        this.download('index.html', this.html)
    }
    download(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
      
        element.style.display = 'none';
        document.body.appendChild(element);
      
        element.click();
      
        document.body.removeChild(element);
      }
}