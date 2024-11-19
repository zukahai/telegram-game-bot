export class Item {
    constructor(game, index) {
        this.game = game;
        this.index = index
        this.size = this.game.gameWidth * this.game.gameHeight / 20000
        this.x = Math.random() * (this.game.gameWidth - 2 * this.size) + this.size;
        this.y = Math.random() * (this.game.gameHeight - 2 * this.size) + this.size;
        this.image = this.game.images[this.index - 1];

        this.randomDxDy();
        
    }

    setIndex(index) {
        this.index = index;
        this.image = this.game.images[this.index - 1];
    }

    randomDxDy() {
        this.dx = Math.random() * this.size / 30;
        this.dy = Math.sqrt(this.size/30 * this.size/30 - this.dx * this.dx);
        this.dx = Math.random() * this.size / 40;
        this.dy = Math.sqrt(this.size/40 * this.size/40 - this.dx * this.dx);
        this.angle = Math.random() * 2 * Math.PI;
        this.dAnger =  Math.PI / 300;
        if (Math.random() < 0.5) {
            this.dAnger = -this.dAnger;
        }
        if (Math.random() < 0.5) {
            this.dx = -this.dx;
        }
        if (Math.random() < 0.5) {
            this.dy = -this.dy;
        }
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x + this.size > this.game.gameWidth || this.x < 0) {
            this.dx = -this.dx;
            while (this.x + this.size > this.game.gameWidth || this.x < 0) {
                this.x += this.dx;
            }
        }
        if (this.y + this.size > this.game.gameHeight || this.y < 0) {
            this.dy = -this.dy;
            while (this.y + this.size > this.game.gameHeight || this.y < 0) {
                this.y += this.dy;
            }
        }

        this.angle += this.dAnger;
    }

    checkCollision(item) {
        let distance = Math.sqrt((this.x - item.x) * (this.x - item.x) + (this.y - item.y) * (this.y - item.y));
        return distance < this.size;
    }

    checkWin(item) {
        if (this.index == 1) {
            return item.index == 2;
        }
        if (this.index == 2) {
            return item.index == 3;
        }
        if (this.index == 3) {
            return item.index == 1;
        }
    }


    draw() {
        this.game.context.save();
        this.game.context.translate(this.x + this.size / 2, this.y + this.size / 2);
        this.game.context.rotate(this.angle);
        this.game.context.drawImage(this.image, -this.size / 2, -this.size / 2, this.size, this.size);
        this.game.context.restore();
    }
}