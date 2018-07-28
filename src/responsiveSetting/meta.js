/**
 * @author duantao
 * @file 设置 meta 标签
 * @date 2018/7/28
 */
function setMetaEl(doc, win) {
    let docEl = win.document.documentElement;
    
    let metaEl = doc.querySelector('meta[name="viewport"]');
    
    let dpr = 0;
    
    let scale = 0;
    
    if (!dpr && !scale) {
        
        let devicePixelRatio = win.devicePixelRatio || 1;
        
        dpr = devicePixelRatio;
        
        if (dpr === 1) {
            dpr = 1
        } else if (dpr > 1 && dpr < 1.5) {
            dpr = 1
        }
        else if (dpr >= 1.5 && dpr < 2.5) {
            dpr = 2
        }
        else if (dpr >= 2.5 && dpr < 3.5 ) {
            dpr = 3
        }
        else {
            dpr = 4
        }
        
        scale = 1 / dpr
    }
    
    
    docEl.setAttribute('data-dpr', dpr);
    
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        
        metaEl.setAttribute('name', 'viewport');
        metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
        document.documentElement.firstElementChild.appendChild(metaEl);
    }
    else {
        metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    }
}

export default setMetaEl;