class Panel {

    #isEmpty;
    #panelElem;
    #maxWidth;
    #maxHeight;

    #correctY;
    #correctX;
    #nowY;
    #nowX;

    constructor(y, x, num, maxWidth, maxHeight, img) {

        this.#isEmpty = (y == maxWidth - 1 && x == maxHeight - 1)
        this.#panelElem = $(`<div class='panel'>${num}</div>`);

        this.#maxWidth = maxWidth;
        this.#maxHeight = maxHeight;

        [this.#correctY, this.#correctX] = [y, x];
        [this.#nowY, this.#nowX] = [y, x];

        this.#panelElem.data("now-y", y);
        this.#panelElem.data("now-x", x);

        if (this.#isEmpty) {
            this.#panelElem.addClass("empty")
                .prepend("<div class=on-empty></div>")
        }

        let leftPosi = 100 * y / maxWidth + "%";
        let topPosi = 100 * x / maxHeight + "%";

        this.#panelElem
            .css("left", leftPosi)
            .css("top", topPosi);

        let leftPosiImg = 100 * y / (maxWidth - 1) + "% ";
        let topPosiImg = 100 * x / (maxHeight - 1) + "%";

        this.#panelElem.css("background-image", "url(" + img + ")")
            .css("background-position", leftPosiImg + topPosiImg);

        this.#panelElem.css("width", `${100 / maxWidth}%`)
            .css("height", `${100 / maxHeight}%`);

    }

    getPanel() {
        return this.#panelElem;
    }

    isEmpty() {
        return this.#isEmpty;
    }

    getNowX() {
        return this.#nowX;
    }

    getNowY() {
        return this.#nowY;
    }

    getCorrectX() {
        return this.#correctX;
    }

    getCorrectY() {
        return this.#correctY;
    }

    isCorrect() {

        return this.getNowX() == this.getCorrectX() &&
            this.getNowY() == this.getCorrectY();
    }

    updatePosition(y, x) {

        this.#nowY = y;
        this.#nowX = x;
        this.#panelElem.data("now-y", y).data("now-x", x);

        let leftPosi = 100 * y / this.#maxWidth + "%";
        let topPosi = 100 * x / this.#maxHeight + "%";


        this.#panelElem
            .css("left", leftPosi)
            .css("top", topPosi);
    }


    visible() {
        this.#panelElem.addClass("visible");
    }

    // reset() {
    //     this.#panelElem.removeClass("visible");
    // }


}


