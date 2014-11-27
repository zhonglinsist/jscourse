/**
 * Created by wangjiewen on 14-11-27.
 */

var ImageSwitcher = {
    container: null, //容器，包含多个图片
    childList: [], //图片对象的列表
    timer: null, //定时器

    direction: -1, //切换的方向，1代表像右，-1代表向左
    navWidth: 0, //每一个图片的宽度
    curIndex: 0, //现在显示的图片的id

    isSwitching: false,//判断此刻是否正在切换，用于阻塞动画，避免用户多次点击切换按钮

    init: function () {
        var self = this;
        self.container = document.getElementById('banner');
        self.childList = self.container.children;
        var len = self.childList.length;
        var conWidth = 0;
        for(var i = 0; i < len; i++){
            var nav = self.childList[i];
            var navW = nav.clientWidth;
            conWidth += navW;
        }

        //动态初始化
        self.navWidth = self.childList[0].clientWidth;
        self.container.style.width = conWidth + 'px';
        self.container.style.left = 0 + 'px';
        self.container.style.top = 0 + 'px';

        //进行切换
        self.switch();
    },

    /**
     * 具体的切换实现
     */
    switch: function(){
        var self = this;
        self.timer = setInterval(function(){
            if(self.isSwitching){
                return;
            }
            self.isSwitching = true;

            //判断是否到了最后一张，这里我只是简单的设置了一下
            //你们回去写一个循环队列，当切换到最后一张时，把前面4张图片移到最后一张的后面
            if(self.curIndex == 5){
                self.curIndex = 0;
                Util.setStyle(self.container, 'left', 0);
            }

            //计算要目标位置
            var left = self.navWidth * self.curIndex * self.direction;
            var attr = {
              left: left
            };
            Util.animate(self.container, attr, function(){
                self.curIndex++;
                self.isSwitching = false;
            });
        }, 3000);

    }
}