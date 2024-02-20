$(() => {

    //起動時
    let panemane = new PanelManager(3, 3);

    for (let panel of panemane.getViewPanels()) {

        $(".field").append(panel);

        panel.on("click", function () {

            panemane.movePanel(panel.attr("data-now-y"), panel.attr("data-now-x"))

            for (let panel of panemane.getViewPanels()) {

                $(".field").append(panel);
            }
        })
    }


    //シャッフルボタンを押す
    $(".shuffle").on("click", () => {

        const width = $("#width").val();
        const height = $("#height").val();

        panemane = new PanelManager(width, height);



        panemane.shufflePanels();

        $(".empty").removeClass("visible");

        $(".field").empty();



        for (let panel of panemane.getViewPanels()) {

            $(".field").append(panel);

            panel.on("click", function () {

                panemane.movePanel(panel.attr("data-now-y"), panel.attr("data-now-x"))

                for (let panel of panemane.getViewPanels()) {

                    $(".field").append(panel);
                }
            })
        }

        $(".field>div").css("width", 600 / width)
            .css("height", 600 / height);

    });


    $(".lt").on("click", () => {
        $(".side").toggleClass("show");
    })

    $(".reset").on("click", () => {

        $(".field").empty();

        const width = $("#width").val();
        const height = $("#height").val();



        panemane = new PanelManager(width, height);

        for (let panel of panemane.getViewPanels()) {

            $(".field").append(panel);

            panel.on("click", function () {

                panemane.movePanel(panel.attr("data-now-y"), panel.attr("data-now-x"))

                for (let panel of panemane.getViewPanels()) {

                    $(".field").append(panel);
                }
            })
        }

        $(".field>div").css("width", 600 / width)
            .css("height", 600 / height);

    })


    //動かすパネルを押す
    // for(let panel of panemane.getViewPanels()){

    //     panel.on("click",function(){
    //         console.log();
    //         let this_y = Number($(this).attr("data-now-y"))
    //         let this_x = Number($(this).attr("data-now-x"))
    //         let emp_y = Number($(".empty").attr("data-now-y"))
    //         let emp_x = Number($(".empty").attr("data-now-x"))

    //         if(Math.abs(this_y,emp_y)+Math.abs(this_x,emp_x)==1){
    //             console.log("tonari");
    //         }
    //     })
    // }

    // $("body").on("click",function(){
    //     console.log("aaa");
    // })

    //メニュー表示ボタンを押す(表示・非表示をトグル)


    //リセットして反映ボタンを押す

})
