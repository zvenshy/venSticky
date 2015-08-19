(function() {
    var $, w;
    $ = this.jQuery || window.jQuery;
    w = $(window);

    $.fn.venSticky = function (opts) {
        var opts = opts || {};
        var box = this;
        if (!opts.scrollBox) {
            opts.scrollBox = w;
        }
        if (!opts.parent) {
            opts.parent = this.parent();
        }
        if (!opts.bottom) {
            opts.bottom = 0;
        }

        var beforeTop = w.scrollTop();
        opts.scrollBox.on('scroll', function () {
            var afterTop = $(this).scrollTop(),
                detal = afterTop - beforeTop || 0;
            opts.direction = detal >= 0 ? 'down' : 'top';
            opts.stickyBox = box;
            sticky(opts);
            beforeTop = afterTop;
        });
    };
    function sticky(opts) {
        var stickyBox = opts.stickyBox,
            boxTop = stickyBox.offset().top,           
            boxHeight = stickyBox.height(),
            winHeight = opts.scrollBox.height(),

            stickyBoxParent = opts['parent'],
            parTop = stickyBoxParent.offset().top,
            bottom = stickyBoxParent.height() + parTop,
            width = stickyBoxParent.width(),

            direction = opts.direction,
            y = $(this).scrollTop();
        
        if (boxHeight < winHeight) {
            stickyBox.css({
                position: 'fixed',
                top: 0
            });  
        } else {
            //direction: 滚动方向
            if (direction === 'down') {
                //sticky-box到达父元素底部
                if (y + winHeight >= bottom) {
                    stickyBox.css({
                        position: 'absolute',
                        top: 'auto',
                        bottom: opts.bottom
                    }); 
                //sticky-box还未触发sticky条件
                } else if (y + winHeight < boxHeight + boxTop) {
                    stickyBox.css({
                        position: 'absolute',
                        top: boxTop - parTop,
                        bottom: 'auto'
                    }); 
                //sticky-box底部fixed
                } else {
                    stickyBox.css({
                        position: 'fixed',
                        top: 'auto',
                        bottom: opts.bottom
                    }); 
                }
            } else {
                //向上滚
                //滚动到页首，恢复到默认位置
                if (y <= parTop) {
                    stickyBox.css({
                        position: 'static'
                    });
                //向下滚动过程中向上滚，已到达box顶部
                } else if (y <= boxTop) {
                    stickyBox.css({
                        position: 'fixed',
                        top: 0,
                        bottom: 'auto'
                    });
                //向下滚动过程中向上滚，未到达box顶部
                } else {
                    stickyBox.css({
                        position: 'absolute',
                        top: boxTop - parTop,
                        bottom: 'auto'
                    }); 
                }
            }
        }
        stickyBox.css('width', width);
    }
}).call(this);

