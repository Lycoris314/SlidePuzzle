class PanelManager {
    #panels;
    #maxWidth;
    #maxHeight;
    #emptyPanel;
    #img;

    constructor(maxWidth, maxHeight, img) {

        this.#maxWidth = maxWidth;
        this.#maxHeight = maxHeight;
        this.#img = img

        //二次元配列を用意
        this.#panels = [];
        for (let i = 0; i < maxWidth; i++) {
            this.#panels[i] = [];
        }


        for (let i = 0; i < maxWidth; i++) {
            for (let j = 0; j < maxHeight; j++) {

                let n = i + maxWidth * j + 1;

                this.#panels[i][j] = new Panel(i, j, n, maxWidth, maxHeight);

                let left_posi = 100 * i / (maxWidth - 1) + "% ";
                let top_posi = 100 * j / (maxHeight - 1) + "%";

                this.#panels[i][j].getPanel().css("background-image", "url(" + this.#img + ")")
                    .css("background-position", left_posi + top_posi)
            }
        }
        this.#emptyPanel = this.#panels[maxWidth - 1][maxHeight - 1];

    }

    getViewPanels() {

        let arr = [];

        for (let j = 0; j < this.#maxHeight; j++) {
            for (let i = 0; i < this.#maxWidth; i++) {

                arr.push(this.#panels[i][j].getPanel())
            }
        }
        return arr;
    }



    randomExchange() {
        //0,1,...,n-1をランダムに
        function random(n) {
            return Math.floor(Math.random() * n)
        }

        const w = this.#maxWidth;
        const h = this.#maxHeight;

        let y1, y2, x1, x2;
        do {
            y1 = random(w);
            y2 = (y1 + random(w - 1) + 1) % w;
            x1 = random(h);
            x2 = (x1 + random(h - 1) + 1) % h;
            //console.log(y1,y2,x1,x2);
        }
        while ((y1 == w - 1 && x1 == h - 1) || (y2 == w - 1 && x2 == h - 1))

        [this.#panels[y1][x1], this.#panels[y2][x2]] =
            [this.#panels[y2][x2], this.#panels[y1][x1]];

        this.#panels[y1][x1].updatePosition(y1, x1);
        this.#panels[y2][x2].updatePosition(y2, x2);
    }

    shufflePanels() {
        for (let i = 0; i < 100; i++) {
            this.randomExchange();
        }
    }


    movePanel(y, x) {

        let empY = this.#emptyPanel.getNowY();
        let empX = this.#emptyPanel.getNowX();

        //if内は隣接条件を表現
        if (Math.abs(y - empY) + Math.abs(x - empX) == 1) {

            [this.#panels[y][x], this.#panels[empY][empX]] =
                [this.#panels[empY][empX], this.#panels[y][x]]

            this.#panels[y][x].updatePosition(y, x);
            this.#panels[empY][empX].updatePosition(empY, empX);

            //クリア判定
            const isGameClear = this.#panels.flat().every((x) => x.isCorrect());
            if (isGameClear) {
                this.#emptyPanel.visible();
            }

        }
    }
}