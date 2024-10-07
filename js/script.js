import '@dotlottie/player-component';

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const $hamburger = document.querySelector(`.hamburger`);

let touchDevice;

const $idCard = document.querySelector(`.id__card`);

const $foodDropzone = document.querySelector(`.dropzone`);
const $imgages = document.querySelectorAll(`img`);
const $foodImages = document.querySelectorAll(`.table__wrapper div img`);
const $foodJournalText = document.querySelector(`.dropzone p`);
const foodJournal = {
    dragging: false,
    dragged: null,
    dragImg: null,
    pos: null,
    url: null,
    name: null,
}

const $citiesButton = document.querySelector(`.journal__wrapper--cities`);
const $citiesButtons = document.querySelectorAll(`.city__add`);
const $citiesJournalText = $citiesButton.querySelector(`p`);
const citiesJournal = {
    city: {
        name: null,
        url: null,
    },
    carousel: {
        closestCity: null,
        closestCityName: null,
        closestDist: Infinity,
    }
}

const $addStation = document.querySelector(`.journal__wrapper--station`);
let stationHighlight;
const station = { size: [], top: [], left: [] };

const $citiesWrapper = document.querySelector(`.cities__wrapper`);
const $cityButtons = document.querySelectorAll(`.city__button`);
const $cityPopups = document.querySelectorAll(`.city__popup`);
const $closePopups = document.querySelectorAll(`.popup__close`);
const $nextPopups = document.querySelectorAll(`.city__next`);
const $lastPopups = document.querySelectorAll(`.city__last`);
let currentPopup;

const $peopleButtons = document.querySelectorAll(`.person__button`);
const $peoplePopups = document.querySelectorAll(`.person__popup`);
const $signatureButtons = document.querySelectorAll(`.ask__signature`);
const peopleJournal = [];

const $journal = document.querySelector(`.notebook__wrapper`);
const $journalSignatures = document.querySelectorAll(`.notebook__signature`);
const $createJournal = document.querySelector(`.create__notebook`);

const windowResizedHandle = e => {
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, openIdHanle)
    } else {
        $idCard.removeEventListener('click', openIdHanle);
        $idCard.classList.remove(`id__card--big`);
    }

    if (window.innerWidth < 550) {
        showAllCityPopups();
    } else {
        closeAllCityPopups();
    }

    if (window.innerWidth >= 1000) {
        document.querySelector(`.download__notebook`).classList.add(`hide`);
    } else {
        document.querySelector(`.download__notebook`).classList.remove(`hide`);
    }

    setStationValues();
    addCityJournal();
}

const clickHamburgerHandle = e => {
    $hamburger.classList.toggle(`hamburger--active`);
}

const openIdHanle = e => {
    $idCard.classList.toggle(`id__card--big`);
    e.stopPropagation()
}

const documentClickHandle = e => {
    $idCard.classList.remove(`id__card--big`);
}

const passengersHorizontalScroll = () => {
    if (window.innerWidth < 800) {

        const tl = gsap.timeline();

        const imageWidth = document.querySelector(`.passengers__img`).offsetWidth;
        const scrollAmount = imageWidth - window.innerWidth - 150;
        let parallexValue = 200;
        let parallexScrollAmount;

        const $backgroundPassengers = document.querySelectorAll(`.passengers__img > img`);
        for (let i = 0; i < $backgroundPassengers.length; i++) {
            parallexScrollAmount = scrollAmount - i * parallexValue;

            tl.to($backgroundPassengers[i], {
                x: -parallexScrollAmount,
                ease: 'linear',
            }, 0);
        }

        const $labels = document.querySelectorAll(`.passengers__img div`);
        const $passengers = document.querySelectorAll(`.passengers__img picture`);

        for (let i = 0; i < $passengers.length; i++) {
            const xPos = $passengers[i].getBoundingClientRect().left;
            parallexValue = 10;
            parallexScrollAmount = scrollAmount - xPos + i * parallexValue;

            const labelTween = gsap.to($labels[i], {
                x: -parallexScrollAmount,
                ease: 'linear',
            }, 0);
            const passengerTween = gsap.to($passengers[i], {
                x: -parallexScrollAmount,
                ease: 'linear',
            }, 0);
            tl.add([labelTween, passengerTween], 0);
        }

        ScrollTrigger.create({
            // markers: {},
            trigger: `.passengers__container`,
            start: 'bottom bottom',
            end: 'bottom center',
            scrub: true,
            pin: true,
            animation: tl,
        });
    }
}

const convoAnimation = () => {
    gsap.from(".intro__convo", {
        scrollTrigger: {
            // markers: {},
            trigger: ".intro__convo",
            start: "top 70%",
            toggleClass: "intro__convo--animation",
        },
        duration: 1.5,
        ease: "power1.out",
    })
}

const trainArrival = () => {
    gsap.from(".train__img", {
        marginInlineEnd: `100vw`,
        scrollTrigger: {
            // markers: {},
            trigger: ".train__container",
            start: "top 70%",
            end: "30% 30%",
            toggleActions: "play none reverse reset",
        },
        duration: 1.5,
        ease: "power1.out",
    })
}

const setStationValues = () => {
    if (window.matchMedia('(min-width: 1600px)').matches) {
        station.top = [32, 319, 461, 466, 473, 475, 22, 0];
        station.left = [137, 369, 102, 684, 198, 542, 0, 753];
        station.size = ['37.5rem', '8.3rem', '5rem', '5rem', '7.5rem', '8rem', '7.8rem', '7.25rem'];
    } else if (window.matchMedia('(min-width: 1200px)').matches) {
        station.top = [25, 250, 365, 370, 375, 377, 16, 0];
        station.left = [110, 293, 80, 543, 155, 430, 0, 598];
        station.size = ['29.7rem', '6.625rem', '4rem', '4rem', '6.125rem', '6.3rem', '6.2rem', '5.75rem'];
    } else if (window.matchMedia('(min-width: 700px)').matches) {
        station.top = [20, 208, 303, 305, 309, 310, 14, 0];
        station.left = [89, 241, 68, 448, 129, 355, 0, 493];
        station.size = ['24.6rem', '5.5rem', '3.3rem', '3.3rem', '5rem', '5.125rem', '5.1rem', '4.74rem'];
    } else {
        station.top = [11, 105, 154, 156, 157, 158, 8, 0];
        station.left = [45, 121, 34, 227, 66, 182, 0, 250];
        station.size = ['12.5rem', '2.8rem', '1.625rem', '1.625rem', '2.5rem', '2.57rem', '2.58rem', '2.41rem'];
    }
}

const stationBuilding = () => {
    const mm = gsap.matchMedia();

    mm.add(
        {
            isMobile: "(max-width: 699px)",
            isTablet: "(min-width: 700px) and (max-width: 999px)",
            isDesktop: "(min-width: 1000px)",
        },
        (context) => {
            const { conditions } = context;
            const $stationElements = document.querySelectorAll(`.station__img picture img`);

            for (let i = 0; i < $stationElements.length - 1; i++) {
                const tl = gsap.timeline();

                tl.to($stationElements[i], {
                    inlineSize: station.size[i],
                    top: station.top[i],
                    left: station.left[i],
                    rotate: 0,
                    ease: "power1.out",
                })

                if (conditions.isDesktop) {
                    ScrollTrigger.create({
                        // markers: {},
                        trigger: ".station__img",
                        scrub: 1,
                        start: "top 30%",
                        end: "bottom 70%",
                        animation: tl,
                    })
                } else if (conditions.isTablet) {
                    ScrollTrigger.create({
                        // markers: {},
                        trigger: ".station__img",
                        start: "50% 50%",
                        end: "150% 50%",
                        animation: tl,
                        scrub: 1,
                    })
                } else {
                    ScrollTrigger.create({
                        // markers: {},
                        trigger: ".station__img",
                        start: "bottom 50%",
                        end: "200% 50%",
                        animation: tl,
                        scrub: 1,
                    })
                }
            }
        }
    )
}

const dragStartHandle = e => {
    if (!touchDevice) e.preventDefault();

    foodJournal.dragged = e.currentTarget;
    foodJournal.url = e.currentTarget.src
    foodJournal.name = e.currentTarget.getAttribute(`alt`);
    foodJournal.dragImg = document.createElement(`img`);
    foodJournal.dragImg.classList.add(`dragging`);
    foodJournal.dragImg.setAttribute(`src`, foodJournal.url);
    foodJournal.dragImg.setAttribute(`width`, e.target.width);
    foodJournal.dragging = true;
};

const draggingHandle = e => {
    e.preventDefault();
    if (foodJournal.dragging) {
        if (!document.querySelector(`.dragging`)) {
            document.querySelector(`.table__wrapper`).appendChild(foodJournal.dragImg);
        }

        const clientX = touchDevice ? e.touches[0].clientX : e.clientX;
        const clientY = touchDevice ? e.touches[0].clientY : e.clientY;

        foodJournal.dragImg.style.rotate = foodJournal.dragged.style.rotate;
        foodJournal.dragImg.style.top = clientY + 'px';
        foodJournal.dragImg.style.left = clientX + 'px';
        foodJournal.pos = { x: clientX, y: clientY }

        if (checkBoundingBox($foodDropzone)) {
            $foodDropzone.classList.add(`dropzone--hover`);
        } else {
            $foodDropzone.classList.remove(`dropzone--hover`);
        }
    }
}

const checkBoundingBox = (element) => {
    const boundingBox = element.getBoundingClientRect();
    if (foodJournal.pos.x >= boundingBox.left && foodJournal.pos.x <= boundingBox.right) {
        if (foodJournal.pos.y >= boundingBox.top && foodJournal.pos.y <= boundingBox.bottom) {
            return true;
        }
    } else {
        return false;
    }
}

const dropHandle = e => {
    if (foodJournal.dragging) {

        foodJournal.dragging = false;

        if (document.querySelector(`.dragging`)) {
            document.querySelector(`.table__wrapper`).removeChild(foodJournal.dragImg);
        }

        if (foodJournal.pos) {
            if (checkBoundingBox($foodDropzone)) {
                updateJournalText($foodJournalText, foodJournal.name, `meal`);
            } else {
                foodJournal.dragged = null;
                foodJournal.dragImg = null;
                foodJournal.name = null;
                foodJournal.url = null;
            }
        }

        foodJournal.pos = null;
        $foodDropzone.classList.remove(`dropzone--hover`);
    }
};

const addCityJournal = () => {
    $citiesButton.addEventListener(`click`, addCityCarouselHandle);
    if (window.innerWidth >= 550) {
        $citiesButton.removeEventListener(`click`, addCityCarouselHandle);
        $citiesButtons.forEach($cityButton => {
            $cityButton.addEventListener(`click`, addCityMapHandle)
        });
    }
}

const addCityCarouselHandle = e => {
    citiesJournal.carousel.closestCity = null;
    citiesJournal.carousel.closestCityName = null;
    citiesJournal.carousel.closestDist = Infinity;

    findCurrentCity();

    citiesJournal.city.name = citiesJournal.carousel.closestCityName;
    citiesJournal.city.url = citiesJournal.carousel.closestCity.querySelector(`.city__img img`).getAttribute(`src`);

    updateJournalText($citiesJournalText, citiesJournal.city.name, `city`);
}

const findCurrentCity = () => {
    const screenCenter = window.innerWidth / 2;

    const $cities = document.querySelectorAll(`.city__wrapper`);

    $cities.forEach(city => {
        const bb = city.getBoundingClientRect();
        const distToCenter = Math.abs(bb.left + bb.width / 2 - screenCenter);

        if (distToCenter < citiesJournal.carousel.closestDist) {
            citiesJournal.carousel.closestDist = distToCenter;
            citiesJournal.carousel.closestCity = city
            citiesJournal.carousel.closestCityName = city.querySelector(`.city__name`).textContent
        }
    });
}

const addCityMapHandle = e => {
    const info = e.currentTarget.parentElement;

    citiesJournal.city.name = info.querySelector(`.city__name`).textContent;
    citiesJournal.city.url = info.querySelector(`.city__img img`).getAttribute(`src`);

    e.currentTarget.querySelector(`p`).textContent = `added as favorite city`
    updateJournalText($citiesJournalText, citiesJournal.city.name, `city`);
}

const updateJournalText = (element, name, type) => {
    element.innerHTML = `<strong>${name}</strong> is added as your favorite ${type}`;
}

const showAllCityPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.show();
        $cityPopup.setAttribute(`inert`, true);
    });

    if ($citiesWrapper) {
        $citiesWrapper.scrollLeft = 0;
    }
}

const closeAllCityPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.close();
        $cityPopup.setAttribute(`inert`, false);
    });
}

const openCityPopupHadle = e => {
    const cityPopup = e.currentTarget.nextElementSibling;
    currentPopup = Array.from($cityPopups).indexOf(cityPopup);
    cityPopup.showModal();
}

const clickPopupHandle = e => {
    const popup = e.currentTarget;
    const popupDimeensions = popup.getBoundingClientRect();
    if (
        e.clientX < popupDimeensions.left ||
        e.clientX > popupDimeensions.right ||
        e.clientY < popupDimeensions.top ||
        e.clientY > popupDimeensions.bottom
    ) {
        popup.close();
    }
}

const closeCityPopupHandle = e => {
    e.currentTarget.parentElement.parentElement.close();
}

const nextStopHandle = () => {
    if (currentPopup < $cityPopups.length - 1) {
        currentPopup++;
        switchCityPopup(currentPopup);
    }
};

const lastStopHandle = () => {
    if (currentPopup > 0) {
        currentPopup--;
        switchCityPopup(currentPopup);
    }
};

const switchCityPopup = (currentPopup) => {
    $cityPopups.forEach(($cityPopup, i) => {
        if (i === currentPopup) {
            $cityPopup.showModal();
        } else {
            $cityPopup.close();
        }
    });
}

const addStationHandle = e => {
    e.currentTarget.querySelector(`p`).textContent = `this moment is added to your journal`;
    stationHighlight = true;
}

const openPersonPopupHadle = e => {
    const personPopup = e.currentTarget.nextElementSibling;
    personPopup.showModal();
}

const addSignatureHandle = e => {
    const signature = e.currentTarget.parentElement.nextElementSibling.nextElementSibling;
    const person = e.currentTarget.parentElement.querySelector(`.person__name`).textContent;
    const buttonText = e.currentTarget.querySelector(`p`);
    const personPopup = e.currentTarget.parentElement.parentElement.parentElement;
    const currentPerson = Array.from($peoplePopups).indexOf(personPopup);

    signature.play();
    peopleJournal.push(currentPerson);

    setTimeout(() => {
        buttonText.textContent = `${person} signed your travel journal`;
    }, "2000");
}

const createJournaHandle = e => {
    if (foodJournal.url) {
        $journal.querySelector(`.notebook__food`).classList.remove(`hide`);
        $journal.querySelector(`.food__img`).setAttribute(`src`, foodJournal.url);
        $journal.querySelector(`.food__label`).textContent = foodJournal.name;
    }
    if (citiesJournal.city.url) {
        $journal.querySelector(`.notebook__city`).classList.remove(`hide`);
        $journal.querySelector(`.city__img`).setAttribute(`src`, citiesJournal.city.url);
        $journal.querySelector(`.city__label`).textContent = citiesJournal.city.name;
    }
    for (let i = 0; i < peopleJournal.length; i++) {
        const num = peopleJournal[i];
        $journalSignatures[num].classList.remove(`hide`);
    }
    if (stationHighlight) {
        $journal.querySelector(`.notebook__highlight`).classList.remove(`hide`);
    }

    $journal.querySelector(`.notebook__img`).classList.remove(`hide`);
    document.querySelector(`.download__notebook`).classList.remove(`hide`);
    $createJournal.classList.add(`hide`);
}

const init = () => {
    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener(`resize`, windowResizedHandle);
    touchDevice = 'ontouchstart' in window;

    // --- nav --- //

    $hamburger.addEventListener(`click`, clickHamburgerHandle);

    //  --- idCard --- //

    if (window.innerWidth >= 500) {
        document.addEventListener(`click`, documentClickHandle)
        $idCard.addEventListener(`click`, openIdHanle);
    }

    // --- scrolltriggers --- //

    passengersHorizontalScroll();
    convoAnimation();
    trainArrival();
    setStationValues();
    stationBuilding();

    // --- foodJournal --- //

    $imgages.forEach($image => {
        $image.setAttribute(`draggable`, false);
    });
    $foodImages.forEach(($foodImage) => {
        $foodImage.setAttribute('draggable', false);

        if (touchDevice) {
            $foodImage.addEventListener('touchstart', dragStartHandle);
            $foodImage.addEventListener('touchmove', draggingHandle);
            $foodImage.addEventListener('touchend', dropHandle);
        } else {
            $foodImage.addEventListener('mousedown', dragStartHandle);
            document.addEventListener('mousemove', draggingHandle);
            document.addEventListener('mouseup', dropHandle);
        }
    })

    // --- citiesJournal --- //

    addCityJournal();

    // --- cityPopups --- //

    if (window.innerWidth < 550) {
        showAllCityPopups();
    }
    if (window.innerWidth >= 550) {
        closeAllCityPopups();
    }

    $cityButtons.forEach($cityButton => {
        $cityButton.addEventListener(`click`, openCityPopupHadle);
    });
    $cityPopups.forEach($cityPopup => {
        $cityPopup.addEventListener(`click`, clickPopupHandle);
    })
    $closePopups.forEach($closePopup => {
        $closePopup.addEventListener(`click`, closeCityPopupHandle);
    })
    $nextPopups.forEach(($nextPopup) => {
        $nextPopup.addEventListener(`click`, nextStopHandle);
    });
    $lastPopups.forEach(($lastPopup) => {
        $lastPopup.addEventListener(`click`, lastStopHandle);
    });

    // --- station --- //

    $addStation.addEventListener(`click`, addStationHandle);

    // --- people --- //

    $peopleButtons.forEach($personButton => {
        $personButton.addEventListener(`click`, openPersonPopupHadle);
    });
    $peoplePopups.forEach($personPopup => {
        $personPopup.addEventListener(`click`, clickPopupHandle);
    })
    $signatureButtons.forEach($signatureBuuton => {
        $signatureBuuton.addEventListener(`click`, addSignatureHandle);
    })

    // --- journal --- //

    if (window.innerWidth >= 1000) {
        document.querySelector(`.download__notebook`).classList.add(`hide`);
    }

    $createJournal.addEventListener(`click`, createJournaHandle);
}

init();
