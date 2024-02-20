$(() => {

    //起動時
    let panemane = new PanelManager(3, 3);

    for (let panel of panemane.getViewPanels()) {

        $(".field").append(panel);
        add_panel_event(panel);
    }


    //シャッフルボタンを押す
    $(".shuffle").on("click", () => {

        const width = $("#width").val();
        const height = $("#height").val();

        panemane = new PanelManager(width, height);

        panemane.shufflePanels();

        $(".field").empty();

        for (let panel of panemane.getViewPanels()) {

            $(".field").append(panel);
            add_panel_event(panel);
        }

        $(".field>div").css("width", 600 / width)
            .css("height", 600 / height);

    });


    //サイドメニュー表示ボタンクリック
    $(".arrow").on("click", () => {
        $(".side").toggleClass("show");
        $(".arrow").toggleClass("lt gt");
        $(".gray_cover").toggleClass("on");
    })

    //リセットして反映ボタンクリック
    $("form").on("submit",(e)=>{
        e.preventDefault();

        $(".field").empty();

        const width = $("#width").val();
        const height = $("#height").val();

        panemane = new PanelManager(width, height);

        for (let panel of panemane.getViewPanels()) {

            $(".field").append(panel);
            add_panel_event(panel);
        }

        $(".field>div").css("width", 600 / width)
            .css("height", 600 / height);

        $(".side").removeClass("show");
        $(".gray_cover").removeClass("on");
    })


    //パネルをクリックすると発生するイベントを追加する関数
    function add_panel_event(panel){

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
