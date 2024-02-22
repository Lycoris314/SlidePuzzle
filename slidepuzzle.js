
$(() => {

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

        panemane = new PanelManager(width, height);

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

            if (!$(".empty").hasClass("visible")) {

                panemane.movePanel(panel.attr("data-now-y"), panel.attr("data-now-x"))

                for (let panel of panemane.getViewPanels()) {

                    $(".field").append(panel);
                }
            }
        })
    }
})
