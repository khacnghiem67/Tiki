var slideImgUrl = [
    './res/slider/be81e2156103e22f037fadcb4d8c4f9f.jpg',
    './res/slider/f369ff760fa03210821fa57f43c9da0d.png.jpg',
    './res/slider/f2e35478fbef7664e273a3c448e6e3a2.png.jpg',
];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const listCateHighlight = $('.categorys-highlights__list');


var handle = {

    //handle click slide
    handleSlide: function() {
        let slideArrowLeft = document.querySelector(
            '.slider .slider__left-arrow-left'
        );
        let slideArrowRight = document.querySelector(
            '.slider .slider__left-arrow-right'
        );
        let slideImg = document.querySelector(
            '.slider__left-list .list__link .list__link-img'
        );
        let slideListDot = document.querySelectorAll(
            '.slider__left .slider__left-list-dot .dot__item'
        );
        let count = 0,
            size = slideImgUrl.length;
        handleCount = function() {
            if (count == -1) {
                count = size - 1;
            } else if (count == size) {
                count = 0;
            }
            slideImg.src = slideImgUrl[count];
            handleDot();
        };
        handleDot = function() {
            document
                .querySelector('.slider__left .slider__left-list-dot .dot__item.show')
                .classList.remove('show');
            slideListDot[count].classList.add('show');
        };
        setInterval(function() {
            count++;
            handleCount();
        }, 10000);
        slideArrowRight.onclick = () => {
            count++;
            handleCount();
        };
        slideArrowLeft.onclick = () => {
            count--;
            handleCount();
        };
        slideListDot.forEach((dot, index) => {
            dot.onclick = function() {
                count = index;
                handleCount();
            };
        });
    },
    fetchData: function() {
        fetch('./data.json')
            .then((response) => response.json())
            .then((data) => {
                this.renderData(data);
            })
            .catch((err) => {
                console.log('There was some problemed:', err.message);
            });
    },
    renderData: function(data) {
        this.renderCategorysHightlights(data['category-hightlights']);
    },
    renderCategorysHightlights: function(data) {
        let html = data.map((item) =>{
            return `<li class="list__item">
                        <a href="#" class="list__item-link">
                            <div class="block-img">
                                <div class="contain-img">
                                    <img src="${item.image}" alt="" class="link__img">
                                </div>
                            </div>
                            <span class="link__text">${item.description}</span>
                        </a>
                    </li>`;
        })
        listCateHighlight.innerHTML = html.join('');
    },
    start: function() {
        this.fetchData();
        this.handleSlide();
    }
};


handle.start();