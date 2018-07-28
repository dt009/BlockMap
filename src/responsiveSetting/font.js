/**
 * @author duantao
 * @file 设置响应字体
 * @date 2018/7/28
 */

function setHtmlFont() {
    
    var dpr = document.documentElement.getAttribute('data-dpr');
    document.body.style.fontSize = 12 * dpr + 'px';
    let width = document.documentElement.offsetWidth;
    let fontSize = 100 / 750 * width * dpr;
    
    if (window.screen.width > 800) {
        fontSize = 100;
    }
    document.querySelector('html').style.fontSize = (fontSize) + 'px';
    
    window.addEventListener('resize', function () {
        let width = document.querySelector('html').offsetWidth;
        let fontSize = 100 / 750 * width * dpr;
        if (window.screen.width > 800) {
            fontSize = 100;
        }
        document.querySelector('html').style.fontSize = (fontSize) + 'px';
        
    })
}

export default setHtmlFont;