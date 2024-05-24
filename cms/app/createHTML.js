export default class html {
    constructor(user, imgs) {

        this.imgs = []
        imgs.forEach(element => { if (element.selected) this.imgs.push(element) });
        // this.imgs = imgs

        this.title = user.title
        this.desc = user.desc
        this.autor = user.autor
        this.favicon = user.favicon
        this.theme = user.theme
        this.type = user.type
        this.path = "https://qwxbnqtgqvaccdburxbp.supabase.co/storage/v1/object/public/"

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
    <section id='left'></section>
    <section id='center'>${this.themes[this.type]()}</section>
    <section id='right'></section>
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
body{
    display: flex;
    width: 100svw;
    overflow-x: hidden;

    #left {
        width: 20svw;
    }
    #right {
        width: 20svw;
    }
    #center {
        width: 60svw;
    }
}
@media (min-width: 0px) and (max-width: 600px) {
    body {
    
        #center {
            width: 100svw;
         }
        #left {
            display: none;
        }
        #right {
            display: none;
        }
    }
}
@media (min-width: 600px) and (max-width: 800px) {
    body {
    
        #center {
            width: 80svw;
        }
        #left {
            width: 10svw;
        }
        #right {
            width: 10svw;
        }
    }
}
@media (min-width: 800px) and (max-width: 1000px) {
    body {
    
        #center {
            width: 70svw;
        }
        #left {
            width: 15svw;
        }
        #right {
            width: 15svw;
        }
    }
}
@media (min-width: 1000px) and (max-width: 1200px) {
    body {

        #center {
            width: 60svw;
        }
        #left {
            width: 20svw;
        }
        #right {
            width: 20svw;
        }
    }
}
</style>
`


    }

    themes = [
        () => {

            this.arr = ['', '', '', '']
            for (let i = 0; i < this.imgs.length; i++) {

                // this.arr[i % 4].push(this.imgs[i])

                this.arr[i % 4] += `<img alt='an image made by ${this.autor}' src='${this.path + this.imgs[i].img}'   />`
            }
            // console.log(this.arr)


            return `
            <div class='row'>
            <div class='column'>${this.arr[0]}</div>
            <div class='column'>${this.arr[1]}</div>
            <div class='column'>${this.arr[2]}</div>
            <div class='column'>${this.arr[3]}</div>
            </div>
            <style>
            .row {
                display: -ms-flexbox; 
                display: flex;
                -ms-flex-wrap: wrap; 
                flex-wrap: wrap;
                padding: 0 4px;
              }
              
              .column {
                -ms-flex: 25%;
                flex: 25%;
                max-width: 24%;
                padding: 0 4px;
              }
              
              .column img {
                margin-top: 8px;
                vertical-align: middle;
                width: 100%;
              }
              
              @media screen and (max-width: 800px) {
                .column {
                  -ms-flex: 50%;
                  flex: 50%;
                  max-width: 50%;
                }
              }
              
              @media screen and (max-width: 600px) {
                .column {
                  -ms-flex: 100%;
                  flex: 100%;
                  max-width: 100%;
                }
              }
              </style>`
        }
    ]
}