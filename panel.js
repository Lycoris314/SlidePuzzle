class Panel {

    #isEmpty;
    #panelElem;

    constructor(y, x, num, maxWidth, maxHeight) {

        this.#isEmpty = (y == maxWidth-1 && x == maxHeight-1)
        this.#panelElem = $(`<div>${num}</div>`);

        if (this.#isEmpty) {
            this.#panelElem.addClass("empty")
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

        return this.getNowX() == this.getCorrectX() &&
            this.getNowY() == this.getCorrectY();
    }

    updatePosition(y, x) {
        this.#panelElem.attr("data-now-y", y);
        this.#panelElem.attr("data-now-x", x);
    }

    visible() {
        this.#panelElem.addClass("visible");
    }

    // reset() {
    //     this.#panelElem.removeClass("visible");
    // }


}


