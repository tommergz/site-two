document.addEventListener('DOMContentLoaded', initSlider('case-studies'));

    function initSlider(id) {
        let currentSlideIndex;
        let sliderAutoPlayInterval;
        const sliderWrapperEl = document.getElementById(id);
        const sliderViewportEl = sliderWrapperEl.children[0];
        let sliderViewportWidth = sliderViewportEl.getBoundingClientRect().width;
        const slidesListEl = sliderViewportEl.children[0];
        const slidesItemsElArray = [...slidesListEl.children];
        slidesListEl.style.width = sliderViewportWidth * slidesItemsElArray.length + 'px';
        slidesItemsElArray.forEach(item => item.style.width = sliderViewportWidth + 'px');
        const bulletsEl = document.querySelector('#' + id + ' .slider_bullets');
        slidesListEl.style.transition = 'left .5s';


        createBullets(bulletsEl);

        initArrows();

        selectSlide(0);

        initAutoPlay();

        function createBullets(bulletsEl) {
            bulletsEl.innerHTML = '';
            let tempFragment = document.createDocumentFragment(); // подробнее https://developer.mozilla.org/ru/docs/Web/API/Document/createDocumentFragment
            slidesItemsElArray.map((item, i) => {
                const li = document.createElement('li');
                li.dataset.index = i;
                return li;
            }).forEach(item => tempFragment.appendChild(item));
            bulletsEl.appendChild(tempFragment);
            bulletsEl.addEventListener('click', onBulletsClick);
        }

        function onBulletsClick(event) {
            if (event.target.dataset.index) {
                selectSlide(+event.target.dataset.index);
            }
        }

        function selectSlide(slideIndex) {
            [...bulletsEl.children].forEach((item) => item.classList.remove('active'));
            bulletsEl.children[slideIndex].classList.add('active');
            slidesListEl.style.left = -slidesListEl.children[slideIndex].offsetLeft + 'px';
            currentSlideIndex = slideIndex;
        }

        function selectNext() {
            if (currentSlideIndex + 1 === slidesItemsElArray.length) {
                 selectSlide(0);
            } else {
                selectSlide(currentSlideIndex + 1);
            }
        }

        function selectPrevious() {
            if (currentSlideIndex) {
                selectSlide(currentSlideIndex - 1);
            } else {
                selectSlide(slidesItemsElArray.length - 1);
            }
        }

        function initArrows() {
            const arrowBackEl = document.querySelector('#' + id + ' .arrow_back');
            const arrowForwardEl = document.querySelector('#' + id + ' .arrow_forward');
            arrowBackEl.addEventListener('click', selectPrevious);
            arrowForwardEl.addEventListener('click', selectNext);
        }

        function startAutoPlay() {
            if (sliderAutoPlayInterval) {
                clearInterval(sliderAutoPlayInterval)
            }
            console.log('start auto play');
            sliderAutoPlayInterval = setInterval(selectNext, 5000);
        }
      
        function stopAutoPlay() {
          console.log('stop auto play');
          clearInterval(sliderAutoPlayInterval);
        }

        function initAutoPlay() {
            startAutoPlay();

            sliderWrapperEl.addEventListener('mouseenter', stopAutoPlay);

            sliderWrapperEl.addEventListener('mouseleave', startAutoPlay);
        }
    }