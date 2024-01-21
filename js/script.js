
const $idCard = document.querySelector(`.id__card`)

const windowResizedHandle = e => {
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, clickIdHandle)
    } else {
        $idCard.removeEventListener('click', clickIdHandle);
        $idCard.classList.remove(`id__card--big`);
    }

}

const clickIdHandle = e => {
    console.log(`card pressed`);
    $idCard.classList.toggle(`id__card--big`);
    console.log($idCard.classList);
}

const init = () => {
    window.addEventListener('resize', windowResizedHandle);
    if (window.innerWidth >= 500) {
        $idCard.addEventListener(`click`, clickIdHandle);
    }
}

init();
