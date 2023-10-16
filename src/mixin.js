//e.clientX和e.clientY 相对于浏览器可视区的位置
//元素.offsetLeft\ 元素.offsetTop  获取元素、节点位置 参照已定位的祖先元素的位置，
//当所有祖先都未定位则参照 body 元素
//原理：鼠标移动前后相对于浏览器可视区的位置的差值+元素相对于已定位的祖先元素的位置
 
// 鼠标拖拽事件
export const dragglableFun = {
  methods: {
    draggableFun(val) {
      let div = document.getElementById("back");
      let dragFlag = false;
      let x, y;
     
      div.onmousedown = function (e) {
        dragFlag = true;
        e = e || window.event;
        // 获取鼠标在元素上的位置（鼠标按下时在元素上得位置）
        x = e.clientX - div.offsetLeft;
        y = e.clientY - div.offsetTop;
        
      };
     
      div.onmousemove = function (e) {
        if (dragFlag) {
          e = e || window.event;
          div.style.left = e.clientX - x + "px";
          div.style.top = e.clientY - y + "px";
        }
      };
      // 鼠标抬起事件
      div.onmouseup = function (e) {
        dragFlag = false;
      };
    }
  }
}