$(() => {
    // $.ajax({
    //     url: "imglist.php",
    //     type: "get",
    //     data: "exclude=default.jpg",
    //     //dataType: "json",
    //     cache: false,
    // }).done((data) => {

    //     console.log("データ取得に成功しました。");
    //     //console.log(data);

    //     let imageList = JSON.parse(data);

    //     for (let image of imageList.values()) {
    //         let div = $("<div class=frame>");

    //         div.append($("<img>").attr("src", "img/thumbnail/" + image))
    //             .attr("data-imgPath", "img/" + image);

    //         $(".image_list").append(div);
    //     }

    //     $(".frame").on("click", function () {

    //         $(".frame").removeClass("on");
    //         $(this).addClass("on");

    //         $(".img-path").val($(this).attr("data-imgPath"))

    //         $("<img>").attr("src", $(this).attr("data-imgPath")); //プリロード
    //     })

    // }).fail(() => {
    //     console.log("データ取得に失敗しました。")
    // })

    //起動時
    let panemane = "";
    createPanels();
    addPanelEvent();

    function createPanels(shuffle) {
        $(".field").empty();

        const width = $("#width").val();
        const height = $("#height").val();
        const imgPath = $(".img-path").val();

        panemane = new PanelManager(width, height, imgPath);

        for (let panel of panemane.getViewPanels()) {
            $(".field").append(panel);
        }
        if (shuffle == "shuffle") {
            panemane.shufflePanels();
        }
    }

    function addPanelEvent() {
        $(".panel").on("click", function () {
            if (!$(".empty").hasClass("visible")) {
                count += panemane.movePanel(
                    $(this).data("now-y"),
                    $(this).data("now-x")
                );
                $(".count").text(count);
            }
        });
    }

    //シャッフルボタンを押す
    $(".shuffle").on("click", () => {
        createPanels("shuffle");
        addPanelEvent();
        numbering();
        resetCount();
    });

    //サイドメニュー表示ボタンクリック
    $(".arrow").on("click", () => {
        $(".side").toggleClass("show");
        $(".arrow").toggleClass("lt gt");
        $(".gray_cover").toggleClass("on");
    });

    $(".frame").on("click", function () {
        $(".frame").removeClass("on");
        $(this).addClass("on");

        $(".img-path").val($(this).attr("data-imgPath"));

        $("<img>").attr("src", $(this).attr("data-imgPath")); //プリロード
    });

    //リセットして反映ボタンクリック
    $("form").on("submit", (e) => {
        e.preventDefault();

        createPanels();
        addPanelEvent();

        $(".side").removeClass("show");
        $(".gray_cover").removeClass("on");
        $(".arrow").toggleClass("lt gt");

        numbering();
        resetCount();
    });

    function numbering() {
        if ($("#radio1").prop("checked")) {
            $(".panel").removeClass("no-num white");
        } else if ($("#radio2").prop("checked")) {
            $(".panel").removeClass("no-num").addClass("white");
        } else if ($("#radio3").prop("checked")) {
            $(".panel").removeClass("white").addClass("no-num");
        }
    }

    //カウント
    let count = 0;
    function resetCount() {
        count = 0;
        $(".count").text(0);
    }

    //テキスト選択禁止
    document.onselectstart = () => false;
});
