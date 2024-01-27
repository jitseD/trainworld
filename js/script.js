import '@dotlottie/player-component';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

let hoverSupported = false;

const $idCard = document.querySelector(`.id__card`);

const $foodDropzone = document.querySelector(`.dropzone`);
const $imgages = document.querySelectorAll(`img`);
const $foodImages = document.querySelectorAll(`.table__wrapper img`)
let dragged;

const station = { size: [], top: [], left: [] };

const $citiesWrapper = document.querySelector(`.cities__wrapper`);
const $cityButtons = document.querySelectorAll(`.city__button`);
const $cityPopups = document.querySelectorAll(`.city__popup`);
const $closePopups = document.querySelectorAll(`.popup__close`);
const $nextPopups = document.querySelectorAll(`.city__next`);
const $lastPopups = document.querySelectorAll(`.city__last`);
let currentPopup;

const checkHoverSupport = () => {
    const hoverQuery = window.matchMedia('(hover: hover)');
    console.log(hoverQuery);
    hoverSupported = hoverQuery.matches;
    console.log(hoverSupported);

    const canHover = window.matchMedia('(hover: hover)').matches;
    console.log(canHover);
}

const windowResizedHandle = e => {
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, openIdHanle)
    } else {
        $idCard.removeEventListener('click', openIdHanle);
        $idCard.classList.remove(`id__card--big`);
    }

    if (window.innerWidth <= 550) {
        showAllCityPopups();
    } else {
        closeAllCityPopups();
    }

    setStationValues();
}

const openIdHanle = e => {
    $idCard.classList.toggle(`id__card--big`);
    closeAllCityPopups();
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
            markers: {},
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

const tableFood = () => {
    const $tableObjects = document.querySelectorAll(`.table__wrapper > *`);
    // const objectMargins = {
    //     top: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    //     bottom: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    //     left: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    //     right: ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
    // }

    for (let i = 0; i < $tableObjects.length; i++) {
        gsap.from([i], {
            // marginTop: objectMargins.top[i],
            // marginBottom: objectMargins.bottom[i],
            scrollTrigger: {
                // markers: {},
                trigger: ".table__wrapper",
                start: "top 0%",
                end: "bottom 100%",
                scrub: 1,
            },
            duration: 1.5,
            ease: "power1.out",
            stagger: 0.5,
        })
    }
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

const dragStartHandle = (e) => {
    dragged = e.target;
    console.log(`dragStartHandle`);
    e.dataTransfer.effectAllowed = 'copy';
};

const dragOverHandle = (e) => {
    e.preventDefault();
    console.log(`dragEnterHandle`);
    e.currentTarget.style.backgroundColor = '#A3C3CE';
};

const dragLeaveHandle = (e) => {
    e.preventDefault();
    console.log(`dragLeaveHandle`);
    e.currentTarget.style.backgroundColor = 'unset';
};

const dropHandle = (e) => {
    e.preventDefault();
    console.log(`dropHandle`);
    e.currentTarget.style.backgroundColor = 'unset';
    const clone = dragged.cloneNode(true);
    e.currentTarget.appendChild(clone);
};

const showAllCityPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.show();
    });

    if ($citiesWrapper) {
        $citiesWrapper.scrollLeft = 0;
    }
}

const closeAllCityPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.close();
    });
}

const openCityPopupHadle = e => {
    const cityPopup = e.currentTarget.nextElementSibling;
    currentPopup = Array.from($cityPopups).indexOf(cityPopup);
    cityPopup.showModal();
}

const clickCityPopupHandle = e => {
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

const init = () => {
    gsap.registerPlugin(ScrollTrigger);

    checkHoverSupport();
    window.addEventListener(`resize`, windowResizedHandle);
    window.addEventListener(`hover`, checkHoverSupport);

    //  --- idCard --- //

    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, openIdHanle);
    }

    // --- scrolltriggers --- //
    passengersHorizontalScroll();
    convoAnimation();
    trainArrival();
    tableFood();
    setStationValues();
    stationBuilding();

    // --- food --- //

    document.addEventListener('dragstart', dragStartHandle);

    $imgages.forEach($image => {
        $image.setAttribute(`draggable`, false);
    });
    $foodImages.forEach(($foodImage) => {
        $foodImage.setAttribute('draggable', true);
        // $foodImage.addEventListener('dragenter', dragOverHandle);
        // $foodImage.addEventListener('dragleave', dragLeaveHandle);
        // $foodImage.addEventListener('drop', dropHandle);
    });

    $foodDropzone.addEventListener('dragover', dragOverHandle);
    $foodDropzone.addEventListener('drop', dropHandle);
    $foodDropzone.addEventListener('dragleave', dragLeaveHandle);

    // --- cityPopups --- //

    if (window.innerWidth <= 550) {
        showAllCityPopups();
    }
    if (window.innerWidth >= 550) {
        closeAllCityPopups();
    }

    $cityButtons.forEach($cityButton => {
        $cityButton.addEventListener(`click`, openCityPopupHadle);
    });
    $cityPopups.forEach($cityPopup => {
        $cityPopup.addEventListener(`click`, clickCityPopupHandle);
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
}

init();
