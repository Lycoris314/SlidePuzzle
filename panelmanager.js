class PanelManager {
    #panels;
    #maxWidth;
    #maxHeight;
    #empty_panel;

    constructor(maxWidth, maxHeight) {
        console.log("manager-start");

        this.#maxWidth = maxWidth;
        this.#maxHeight = maxHeight;

        //二次元配列を用意
        this.#panels = Array(maxWidth);
        for (let i = 1; i <= maxWidth; i++) {
            this.#panels[i] = new Array();
        }

        for (let i = 1; i <= this.#maxWidth; i++) {
            for (let j = 1; j <= this.#maxHeight; j++) {

                let n = i + this.#maxWidth * (j - 1);

                this.#panels[i][j] = new Panel(i, j, n, this.#maxWidth, this.#maxHeight);
            }
        }
        this.#empty_panel=this.#panels[maxWidth][maxHeight];
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



    random_exchange() {
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
            this.random_exchange();
        }
    }


    movePanel(y, x) {

        let emp_y = this.#empty_panel.getNowY();
        let emp_x = this.#empty_panel.getNowX();

        //if内は隣接条件を表現
        if (Math.abs(y - emp_y) + Math.abs(x - emp_x) == 1) {

            [this.#panels[y][x], this.#panels[emp_y][emp_x]] =
                [this.#panels[emp_y][emp_x], this.#panels[y][x]]

            this.#panels[y][x].updatePosition(y, x);
            this.#panels[emp_y][emp_x].updatePosition(emp_y, emp_x);

            //クリア判定
            let allCorrect = true;
            for (let i = 1; i <= this.#maxWidth; i++) {
                for (let j = 1; j <= this.#maxHeight; j++) {
                    allCorrect = allCorrect && this.#panels[i][j].isCorrect()
                }
            }
            if (allCorrect) {
                this.#empty_panel.visible();
            }
        }
    }
}