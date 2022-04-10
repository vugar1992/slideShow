class Animation {
    constructor(slideBlock, img, full, prev, next) {
        this.slideBlock = document.getElementById(slideBlock);
        this.img = document.querySelectorAll(img);
        this.full = document.querySelector(full);
        this.prev = document.getElementById(prev);
        this.next = document.getElementById(next);
        this.width = this.img[1].offsetWidth;
        this.style = {
            positiont: 0,
            index: 0,
            inline: () => {
                this.slideBlock.style.left= this.style.positiont + 'px'
            },
            end: true,
        };

        this.render();
        this.listeners();
    }



    direction(step) {

        if (this.style.end) {
            if(step === 1) {
                this.choiceStep(1);
            } else {
                this.choiceStep(-1);
            }
            this.style.end = !this.style.end
        }
        
    }



    choiceStep(step) {
        if (step === 1) {
            this.slideBlock.classList.add('trs');
            this.style.positiont += this.width;
            this.style.inline()
            this.style.index--;
        } else {
            this.slideBlock.classList.add('trs');
            this.style.positiont -= this.width;
            this.style.inline()
            this.style.index++;
        }
    }



    trsEnd() {
        if (this.style.index === 0) {
            this.style.positiont = -this.width * this.img.length;
            this.style.inline()
            this.style.index = this.img.length;
        } 
        else if (this.style.index === this.img.length + 1) {
            this.style.positiont = -this.width;
            this.style.inline()
            this.style.index = 1;
        }
        
        this.slideBlock.classList.remove('trs');
        this.style.end = !this.style.end
    }



    listeners() {
        this.prev.addEventListener('click', () => {
            this.direction(1);
        });

        this.next.addEventListener('click', () => {
            this.direction(-1);
        })

        this.slideBlock.addEventListener('transitionend', () => {
           this.trsEnd();
        })
    }



    render() {
        this.style.positiont -= this.width;
        this.style.inline();
        this.style.index++;
        
        const firstSlide = this.img[0].cloneNode(true);
        const lastSlide = this.img[this.img.length - 1].cloneNode(true);

        this.slideBlock.insertAdjacentElement('afterbegin', lastSlide)
        this.slideBlock.insertAdjacentElement('beforeend', firstSlide)

    }

}

const ani = new Animation('slideBlock', '#slideBlock img', '.fa-expand', 'prev', 'next')