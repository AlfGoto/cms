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
    ${this.style()}
</head>
<body>
    ${this.body()}
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


    body() {


        return `
        <p>Hello</p>
        `
    }



    style() {
        // console.log(this.theme)

        switch (this.theme) {
            case 0:
                this.color1 = '';
                this.color2 = '';
                this.color3 = '';
                this.color4 = '';
                this.color5 = '';
                break;
            case 1:
                this.color1 = '#3e2d56';
                this.color2 = '#654476';
                this.color3 = '#9f60a7';
                this.color4 = '#f186e4';
                this.color5 = '#ffc3f4';
                break;

        }

        return `
<style>
:root{
    --color1 : ${this.color1};
    --color2: ${this.color2};
    --color3: ${this.color3};
    --color4: ${this.color4};
    --color5: ${this.color5};
}
</style>
`


    }
}