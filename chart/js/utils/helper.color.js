;
(function() {

    const HelperColor = window.HelperColor = Class.extend({
        /**
        * RGB(A)颜色转换为HEX十六进制的颜色值
        * rgba(178,123,138,1)
        */ 
        rgbToHex: function(val) {
            var r, g, b, a,
                regRgba = /rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/, //判断rgb颜色值格式的正则表达式，如rgba(255,20,10,.54)
                rsa = val.replace(/\s+/g, '').match(regRgba);
            if (!!rsa) {
                r = parseInt(rsa[1]).toString(16);
                r = r.length == 1 ? '0' + r : r;
                g = (+rsa[2]).toString(16);
                g = g.length == 1 ? '0' + g : g;
                b = (+rsa[3]).toString(16);
                b = b.length == 1 ? '0' + b : b;
                a = (+(rsa[5] ? rsa[5] : 1)) * 100;
                return { hex: '#' + r + g + b, alpha: Math.ceil(a) };
            } else {
                return { hex: val, alpha: 100 };
            }
        },
        /**
        * HEX十六进制颜色值转换为RGB(A)颜色值
        * 如 #ffffff => rgb(255,255,255)
        */ 
        hexToRgb: function(val) {
            var a, b, c;
            if ((/^#/g).test(val)) {
                a = val.slice(1, 3);
                b = val.slice(3, 5);
                c = val.slice(5, 7);
                return { rgba: 'rgb(' + parseInt(a, 16) + ',' + parseInt(b, 16) + ',' + parseInt(c, 16) + ')' };
            } else {
                return { rgba: '无效值：' + val };
            }
        }
    });
})();