class PanelManager {
    #panels;
    #maxWidth;
    #maxHeight;
    #emptyPanel;

    constructor(maxWidth, maxHeight) {

        this.#maxWidth = maxWidth;
        this.#maxHeight = maxHeight;

        //二次元配列を用意
        this.#panels = [];
        for (let i = 1; i <= maxWidth; i++) {
            this.#panels[i] = [];
        }


        for (let i = 1; i <= maxWidth; i++) {
            for (let j = 1; j <= maxHeight; j++) {

                let n = i + maxWidth * (j - 1);

                this.#panels[i][j] = new Panel(i, j, n, maxWidth, maxHeight);
            }
        }
        this.#emptyPanel = this.#panels[maxWidth][maxHeight];

        //console.log(this.#panels[0]);
    }

    getViewPanels() {

        let arr = [];

        for (let j = 1; j <= this.#maxHeight; j++) {
            for (let i = 1; i <= this.#maxWidth; i++) {

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
            y1 = random(w) + 1;
            y2 = (y1 + random(w - 1)) % w + 1;
            x1 = random(h) + 1;
            x2 = (x1 + random(h - 1)) % h + 1;
            //console.log(y1,y2,x1,x2);
        }
        while ((y1 == w && x1 == h) || (y2 == w && x2 == h))

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
            //console.log(isGameClear);

        }
    }
}