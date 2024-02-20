class PanelManager {
    #panels;
    #maxWidth;
    #maxHeight;

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
        function random(n) {
            return Math.floor(Math.random() * n)
        }

        const w = this.#maxWidth;
        const h = this.#maxHeight;

        let y1, y2, x1, x2;
        do{
        y1 = random(w) + 1;
        y2 = (y1 + random(w - 1)) % w + 1;
        x1 = random(h) + 1;
        x2 = (x1 + random(h - 1)) % h + 1;
        }
        while((y1==w && x1==h) || (y2==w && x2==h))

        [this.#panels[y1][x1], this.#panels[y2][x2]] =
            [this.#panels[y2][x2], this.#panels[y1][x1]];

        // this.#panels[y1][x1].getPanel().attr("data-now-Y",y1);
        // this.#panels[y1][x1].getPanel().attr("data-now-X",x1);
        // this.#panels[y2][x2].getPanel().attr("data-now-Y",y2);
        // this.#panels[y2][x2].getPanel().attr("data-now-X",x2);
        this.#panels[y1][x1].updatePosition(y1,x1);
        this.#panels[y2][x2].updatePosition(y2,x2);

    }

    shufflePanels() {
        for (let i = 0; i < 100 ; i++) {
            this.random_exchange();
        }
    }




    movePanel(y, x) { 
        let emp_y=$(".empty").attr("data-now-y");
        let emp_x=$(".empty").attr("data-now-x");
        
        if(Math.abs(y-emp_y)+Math.abs(x-emp_x)==1){
            [this.#panels[y][x],this.#panels[emp_y][emp_x]]=
            [this.#panels[emp_y][emp_x],this.#panels[y][x]]

            this.#panels[y][x].getPanel().attr("data-now-Y",y);
            this.#panels[y][x].getPanel().attr("data-now-X",x);
            this.#panels[emp_y][emp_x].getPanel().attr("data-now-Y",emp_y);
            this.#panels[emp_y][emp_x].getPanel().attr("data-now-X",emp_x);
        
            let allCorrect=true;
            for(let i=1; i<=this.#maxWidth; i++){
                for(let j=1; j<=this.#maxHeight; j++){
                    allCorrect=allCorrect && this.#panels[i][j].isCorrect()
                }
            }
            if(allCorrect){
                console.log("!!");
                $(".empty").addClass("visible");

            }
            // for(let panel of this.getViewPanels()){
            //     allCorrect = panel.isCorrect() && allCorrect;
            // }
            // if(allCorrect){
            //     $(".empty").addClass("visible");
            //}
        }

    }
}