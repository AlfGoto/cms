export default class html {
    constructor(user, imgs) {


        this.rightArrow = '<svg id="rightArrow" version="1.1" id="icons_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}</style><g id="row1_1_"><g id="_x31__3_"><path class="st2" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z" id="_x32__2_"/></g></g></svg>'
        this.leftArrow = '<svg id="leftArrow" version="1.1" id="icons_1_" xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 128 128" style="enable-background:new 0 0 128 128" xml:space="preserve"><style>.st0{display:none}.st1{display:inline}</style><g id="row2_1_"><g id="_x31__4_"><path class="st2" d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm1.3-82.8L41.6 64l23.6 25.5h13.5L54.4 64l24.4-25.5H65.3z" id="left_3_"/></g></g></svg>'

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

        this.preview = `
        ${this.style()}
        ${this.themes[this.type]()}
        `
        // console.log(this)
        // this.download('index.html', this.html)
    }
    download(filename) {
        // console.log(this.html)
        // console.log(this)
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.html));
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
.st2{
    fill:${this.color1}
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
        },
        () => {

            this.str = ''
            for (let i = 0; i < this.imgs.length; i++) {

                // this.arr[i % 4].push(this.imgs[i])

                this.str += `
            <img src="${this.path + this.imgs[i].img}" class='imgs' alt='an image uploaded by ${this.autor}' style="display:none;"/>
                `
            }


            let ml = `ml_${Date.now()}`;
            return `

        <div id='carroussel'>
${this.leftArrow}
${this.rightArrow}
${this.str}
        </div>

<script>

let ${ml} = 0

Array.from(document.getElementsByClassName('imgs'))[0].style.display = 'block'

document.getElementById('rightArrow').addEventListener('click', ()=>{
    Array.from(document.getElementsByClassName('imgs'))[${ml}].style.display = 'none'
    ${ml}++
    if(${ml} == Array.from(document.getElementsByClassName('imgs')).length)${ml} = 0
    Array.from(document.getElementsByClassName('imgs'))[${ml}].style.display = 'block'
})
document.getElementById('leftArrow').addEventListener('click', ()=>{
    Array.from(document.getElementsByClassName('imgs'))[${ml}].style.display = 'none'
    ${ml}--
    if(${ml} == -1)${ml} = Array.from(document.getElementsByClassName('imgs')).length - 1  
    Array.from(document.getElementsByClassName('imgs'))[${ml}].style.display = 'block'
})

// console.log(right, left)
</script>
<style>
*{
    user-select: none;
}
#carroussel{
    position: relative;
    width: 100%;
    height: 100svh;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        position: absolute;
        object-fit: cover;
        max-width: 75%;
        max-height: 80svh;
        width: auto;
        height: auto;
    }
}
#rightArrow{
    height: 100px;
    position: absolute;
    top: 40svh;
    right: 1px;
    z-index:1;
}
#leftArrow{
    height: 100px;
    position: absolute;
    top: 40svh;
    left: 1px;
    z-index:1;
}
</style>
            `
        }
    ]
}


