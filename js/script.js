
let hoverSupported = false;

const $idCard = document.querySelector(`.id__card`);

// const $tipsButtons = document.querySelectorAll(`.tip`);
// const $tipsPopups = document.querySelectorAll(`.tip__popup`);

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
}

const openIdHanle = e => {
    $idCard.classList.toggle(`id__card--big`);
    closeAllCityPopups();
}

const trainArrival = () => {
    gsap.from(".train__img", {
        marginInlineEnd: `100vw`,
        scrollTrigger: {
            markers: {},
            trigger: ".train__container",
            start: "top 70%",
            end: "30% 30%",
            toggleActions: "play none reverse reset",
        },
        duration: 1.5,
        ease: "power1.out",
    })
}

// const closeAllTipsPopups = () => {
//     $tipsPopups.forEach($tipPopup => {
//         $tipPopup.close();
//     });
// }

// const openTipPopupHandle = e => {
//     console.log(e.type);
//     const tipPopup = e.currentTarget.nextElementSibling;
//     tipPopup.show();
// }

// const clickTipPopupHandle = e => {
//     console.log(e.type);
//     const popup = e.currentTarget;
//     popup.close();
// }

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

    // --- train --- //

    trainArrival();

    // --- tipPopup --- //
    // closeAllTipsPopups();
    // $tipsButtons.forEach($tipButton => {
    //     $tipButton.addEventListener('click', openTipPopupHandle);
    // });
    // $tipsPopups.forEach($tipPopup => {
    //     $tipPopup.addEventListener('click', clickTipPopupHandle);
    // });

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
