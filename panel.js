class Panel {

    #isEmpty;
    #panelElem;

    constructor(y, x, num, maxWidth, maxHeight) {

        this.#isEmpty = (y == maxWidth && x == maxHeight)
        this.#panelElem = $(`<div>${num}</div>`);

        if (this.#isEmpty) {
            this.#panelElem.addClass("empty")
        } else {
            this.#panelElem.addClass("no_empty")
        }

        this.#panelElem
            .attr("data-correct-y", y)
            .attr("data-correct-x", x)
            .attr("data-now-y", y)
            .attr("data-now-x", x)

    }

    getPanel() {
        return this.#panelElem;
    }

    isEmpty() {
        return this.#isEmpty;
    }

    getNowX() {
        return this.#panelElem.attr("data-now-x")
    }

    getNowY() {
        return this.#panelElem.attr("data-now-y")
    }

    getCorrectX() {
        return this.#panelElem.attr("data-correct-x")
    }

    getCorrectY() {
        return this.#panelElem.attr("data-correct-y")
    }

    isCorrect() {
        // return this.#panelElem.attr("data-now-x") == this.#panelElem.attr("data-correct-x") &&
        //     this.#panelElem.attr("data-now-y") == this.#panelElem.attr("data-correct-y")
        return this.getNowX()==this.getCorrectX() &&
               this.getNowY()==this.getCorrectY() ;
    }

    updatePosition(y, x) {
        this.#panelElem.attr("data-now-y", y);
        this.#panelElem.attr("data-now-x", x);
    }

    // visible() {
    //     $(".empty").addClass("visible");
    // }

    // reset() {
    //     $(".empty").removeClass("visible");
    // }


}


