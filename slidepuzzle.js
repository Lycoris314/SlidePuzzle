
$(() => {

    $.ajax({
        url: "imglist.php",
        type: "get",
        data: "exclude=default.jpg",
        //dataType: "json",
        cache: false,
    }).done((data) => {

        console.log("データ取得に成功しました。");
        //console.log(data);

        let imageList = JSON.parse(data);

        for (let image of imageList.values()) {
            let div = $("<div class=flame>");

            div.append($("<img>").attr("src", "img/thumbnail/" + image))
                .attr("data-imgPath", "img/" + image);

            $(".image_list").append(div);
        }

        $(".flame").on("click", function () {

            $(".flame").removeClass("on");
            $(this).addClass("on");

            $(".reset").attr("data-imgPath", $(this).attr("data-imgPath"));//リセットして反映ボタンに反映する画像のパスを入れておく

            $("<img>").attr("src", $(this).attr("data-imgPath")); //プリロード
        })

    }).fail(() => {
        console.log("データ取得に失敗しました。")
    })


    // これでパズル全体が小さくなる
    // $("body").get(0).style.setProperty("--field-width", "300px");
    // $("body").get(0).style.setProperty("--field-height","300px");


    //初期配置
    replacePanels();

    //シャッフルボタンを押す
    $(".shuffle").on("click", () => {

        replacePanels("shuffle");
    });


    //サイドメニュー表示ボタンクリック
    $(".arrow").on("click", () => {

        $(".side").toggleClass("show");
        $(".arrow").toggleClass("lt gt");
        $(".gray_cover").toggleClass("on");
    })

    //リセットして反映ボタンクリック
    $("form").on("submit", (e) => {
        e.preventDefault();

        replacePanels();

        $(".side").removeClass("show");
        $(".gray_cover").removeClass("on");
        $(".arrow").toggleClass("lt gt");
    })


    function replacePanels(shuffle = "") {

        $(".field").empty();

        const width = $("#width").val();
        const height = $("#height").val();
        const imgPath = $(".reset").attr("data-imgPath");

        panemane = new PanelManager(width, height, imgPath);

        if (shuffle == "shuffle") { panemane.shufflePanels(); }

        for (let panel of panemane.getViewPanels()) {

            $(".field").append(panel);
            addPanelEvent(panel);
        }

        $(".field>div").css("width", `${100 / width}%`)
            .css("height", `${100 / height}%`);
    }


    //パネルをクリックすると発生するイベントを追加する関数
    function addPanelEvent(panel) {

        panel.on("click", function () {

            //if内はまだ未クリアなら、という条件
            if (!$(".empty").hasClass("visible")) {

                panemane.movePanel(panel.attr("data-now-y"), panel.attr("data-now-x"));

                for (let panel of panemane.getViewPanels()) {

                    $(".field").append(panel);
                }
            }
        })
    }
})
