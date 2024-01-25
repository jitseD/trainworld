
const $idCard = document.querySelector(`.id__card`);

const $citiesWrapper = document.querySelector(".cities__wrapper");
const $cityButtons = document.querySelectorAll(`.city__button`);
const $cityPopups = document.querySelectorAll(`.city__popup`);
const $closePopups = document.querySelectorAll(`.popup__close`);
const $nextPopups = document.querySelectorAll(`.city__next`);
const $lastPopups = document.querySelectorAll(`.city__last`);
let currentPopup;

const windowResizedHandle = e => {
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, openIdHanle)
    } else {
        $idCard.removeEventListener('click', openIdHanle);
        $idCard.classList.remove(`id__card--big`);
    }

    if (window.innerWidth <= 550) {
        showAllPopups();
    } else {
        closeAllPopups();
    }
}

const openIdHanle = e => {
    $idCard.classList.toggle(`id__card--big`);
}

const showAllPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.show();
    });

    if ($citiesWrapper) {
        $citiesWrapper.scrollLeft = 0;
    }
}

const closeAllPopups = () => {
    $cityPopups.forEach($cityPopup => {
        $cityPopup.close();
    });
}

const openPopupHadle = e => {
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
        popup.close()
    }
}

const closePopupHandle = e => {
    e.currentTarget.parentElement.parentElement.close();
}

const nextStopHandle = () => {
    if (currentPopup < $cityPopups.length - 1) {
        currentPopup++;
        switchPopup(currentPopup);
    }
};

const lastStopHandle = () => {
    if (currentPopup > 0) {
        currentPopup--;
        switchPopup(currentPopup);
    }
};

const switchPopup = (currentPopup) => {
    $cityPopups.forEach(($cityPopup, i) => {
        if (i === currentPopup) {
            $cityPopup.showModal();
        } else {
            $cityPopup.close();
        }
    });
}

const init = () => {
    window.addEventListener('resize', windowResizedHandle);
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, openIdHanle);
    }

    if (window.innerWidth <= 550) {
        showAllPopups();
    }
    
    if (window.innerWidth >= 550) {
        closeAllPopups();
    }

    $cityButtons.forEach($cityButton => {
        $cityButton.addEventListener(`click`, openPopupHadle);
    });

    $cityPopups.forEach($cityPopup => {
        $cityPopup.addEventListener(`click`, clickPopupHandle);
    })

    $closePopups.forEach($closePopup => {
        $closePopup.addEventListener(`click`, closePopupHandle);
    })

    $nextPopups.forEach(($nextPopup) => {
        $nextPopup.addEventListener(`click`, nextStopHandle);
    });

    $lastPopups.forEach(($lastPopup) => {
        $lastPopup.addEventListener(`click`, lastStopHandle);
    });
}

init();
