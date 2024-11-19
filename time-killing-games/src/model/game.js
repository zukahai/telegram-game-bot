import { sendScore } from './telegram.js';
import { Item } from './item.js';

export class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.numberOfItems = 120;
        this.running = true;
        this.init();
    }

    init() {
        this.gameWidth = document.documentElement.clientWidth;
        this.gameHeight = document.documentElement.clientHeight;
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.initImage();
        this.render();
        this.initItems();
        this.start();
    }

    initImage() {
        this.images = [];
        for (let i = 1; i <= 3; i++) {
            let image = new Image();
            image.src = "./assets/images/" + i + ".png";
            this.images.push(image);
        }
    }

    initItems() {
        this.items = [];
        for (let index = 1; index <= 3; index++) {
            for (let i = 0; i < this.numberOfItems / 3; i++) {
                let item = new Item(this, index);
                this.items.push(item);
            }
        }
    }


    loop(timestamp) {
        
        let startStorage = localStorage.getItem("start");
        
        if (!this.running) {
            return;
        }
        if (startStorage == "true") {
            this.update();
            this.draw();
        }
        
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    start() {
        requestAnimationFrame((timestamp) => this.loop(timestamp));
    }

    update() {
        for (let i = 0; i < this.items.length; i++) {
            let flag = -1;
            for (let j = 0; j < this.items.length; j++) {
                if (this.items[i].checkCollision(this.items[j]) && this.items[i].index != this.items[j].index) {
                    flag = j
                    break;
                }
            }
            if (flag != -1) {
                if (this.items[i].checkWin(this.items[flag])) {
                    this.items[flag].setIndex(this.items[i].index);
                    this.items[flag].randomDxDy();
                } else {
                    this.items[i].setIndex(this.items[flag].index);
                    this.items[i].randomDxDy();
                }
            }
        }

        if (this.checkWin() != -1) {
            let text = ["Búa", "Kéo", "Bao"];
            let icon = ["🥊", "✂️", "🧻"];
            let yourChoice = localStorage.getItem("choice");
            yourChoice = parseInt(yourChoice);
        
            let resultChoice = this.checkWin();
            let resultText = `👉 Lựa chọn của bạn: ${icon[yourChoice - 1]} ${text[yourChoice - 1]}\n` +
                             `🎯 Kết quả: ${icon[resultChoice - 1]} ${text[resultChoice - 1]}`;
        
            // Gửi thông báo về Telegram
            sendScore(resultText);
        
            // Hiển thị kết quả và kết thúc trò chơi
            alert(resultText);
            localStorage.setItem("start", false);
            this.running = false;
        
            // Tắt trò chơi trên trình duyệt
            window.close();
        }
        

        this.render();
    }

    render() {
        if (this.canvas.width != document.documentElement.clientWidth || this.canvas.height != document.documentElement.clientHeight) {
            this.canvas.width = document.documentElement.clientWidth;
            this.canvas.height = document.documentElement.clientHeight;
            this.gameWidth = this.canvas.width;
            this.gameHeight = this.canvas.height;
        }
    }

    draw() {
        this.clearScreen();
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].update();
            this.items[i].draw();
        }
    }

    checkWin() {
        let count = [0, 0, 0];
        for (let i = 0; i < this.items.length; i++) {
            count[this.items[i].index - 1]++;
        }
        for (let i = 0; i < 3; i++) {
            if (count[i] == this.numberOfItems) {
                return i + 1;
            }
        }
        return -1;
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.gameWidth, this.gameHeight);
        this.context.fillStyle = '#000000';
        this.context.fillRect(0, 0, this.gameWidth, this.gameHeight);
    }
}

var g = new Game();