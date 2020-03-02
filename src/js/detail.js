$(function () {
    // 1. 初始化顶部区域
    initNavTop();

    // 2. 初始化头部区域
    initHeaderInfo();

    // 3. 初始化详情区域
    initMain()

    // 4.初始化选购区域
    initmainMlddle();


});

function initmainMlddle() {
    $("#yangse a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    $(".bangben a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });

    var num = 1;
    $(".bth-up").click(function () {
        num++;
        if (num > 1) {
            $(".bth-down").css("backgroundColor", "#fff");
        }

        $(".num>p").text(num);
    });


    $(".bth-down").click(function () {
        if (num <= 1) {
            $(".bth-down").css("backgroundColor", "#ddd");
            return;
        }
        num--;
        $(".num>p").text(num);

    });
}

function initMain() {
    var oMaskWidth = parseInt($(".mask").css("width"));
    var oMaskHeight = parseInt($(".mask").css("height"));
    var maxWidth = parseInt($(".box-middle").css("width")) - oMaskWidth;
    var maxHeight = parseInt($(".box-middle").css("height")) - oMaskHeight;

    // var bigImg = parseInt($(".box-bg").css("width")) - parseInt($(".bgImg").css("width"));
    // console.log($(".bgImg").css("width"));

    $(".box-middle").hover(function (e) {
        $(".mask").show();
        $(".box-bg").show();

        $(".box-middle").mousemove((e) => {
            var moveX = this.parentNode.parentNode.offsetLeft;
            var moveY = this.parentNode.parentNode.offsetTop;

            var disX = e.pageX - moveX - oMaskWidth / 2;
            var disY = e.pageY - moveY - oMaskHeight / 2;

            // 判断临界值
            disX = disX < 0 ? 0 : disX;
            disY = disY < 0 ? 0 : disY;
            disX = disX > maxWidth ? maxWidth : disX;
            disY = disY > maxHeight ? maxHeight : disY;

            // 给蒙版赋予跟随鼠标移动的功能
            $(".mask").css({
                "left": disX,
                "top": disY
            });

            // 蒙版移动距离 / 蒙版最大能移动的距离 = 大图移动的距离 / 大图最大能移动的距离
            // 蒙版移动距离 / 蒙版最大能移动的距离 * 大图最大能移动的距离 = 大图移动的距离
            $(".box-bg").children("img").css({
                "left": disX / maxWidth * -350,
                "top": disY / maxHeight * -350
            });
        });

    }, function () {
        $(".mask").hide();
        $(".box-bg").hide();
    });

    $(".sub-list li").mouseenter(function () {
        $(".middleImg").prop("src", `../images/${$(this).index() + 1}_2.jpeg`);
        $(".bigImg").prop("src", `../images/${$(this).index() + 1}_3.jpeg`);
    });
}

function initHeaderInfo() {
    $.ajax({
        url: "../data/Dheader-info.json",
        type: "GET",
        success: function (res) {
            var html = "";
            res.forEach(function (item, index) {

                item.success.forEach((ele) => {
                    html += `<li>${ele}</li>`
                })
            });

            $(".header-info").html(html);
        }
    })



    $.ajax({
        url: "../data/header-category.json",
        type: "GET",
        success: function (res) {
            var html = "";
            // res 是整个二维数组
            res.forEach(function (item) {
                // item 是数组里面的每一项
                // item.title 是每一个标题, dt 标签渲染
                // item.des 是一个数组里面的小数组, 需要渲染成好多的 dd 标签
                //   => dd 标签是放在 dt 后面, </dl> 闭合标签的前面
                html += `            
              <dl class="clearfix">
              <dt>${item.title}</dt>
            `

                // 在这里通过 item.des 数组添加好多 dd 放在这里
                item.des.forEach(item2 => {
                    html += `<dd>${item2}</dd>`
                })

                html += `</dl>`;
            })
            $(".category-list").html(html);
        }
    });
}

function initNavTop() {
    var num = 0;
    setInterval(function () {
        num += 30;
        if (num >= 120) {
            $(".guangbo").css("top", 0);
            num = 30;
        }
        $(".guangbo").animate({ top: -num });
    }, 2000);
}