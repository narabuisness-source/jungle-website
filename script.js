
const exploreButton = document.querySelector(".explore-button");
const sections = document.querySelectorAll(".hero, .fact");

const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

let isAnimating = false;

function currentIndex() {
    const y = window.scrollY;
    let index = 0;
    sections.forEach((s, i) => {
        if (s.getBoundingClientRect().top + y <= y + 40) index = i;
    });
    return index;
}

function smoothScrollTo(targetY, duration = 1000) {
    if (isAnimating) return;
    isAnimating = true;

    const startY = window.scrollY;
    const distance = targetY - startY;
    const start = performance.now();

    function frame(now) {
        const progress = Math.min((now - start) / duration, 1);
        window.scrollTo(0, startY + distance * easeInOutCubic(progress));
        if (progress < 1) {
            requestAnimationFrame(frame);
        } else {
            isAnimating = false;
        }
    }

    requestAnimationFrame(frame);
}

exploreButton.addEventListener("click", () => {
    smoothScrollTo(sections[1].getBoundingClientRect().top + window.scrollY);
});

window.addEventListener("wheel", (evt) => {
    const index = currentIndex() + (evt.deltaY > 0 ? 1 : -1);
    const next = Math.max(0, Math.min(index, sections.length - 1));
    smoothScrollTo(sections[next].getBoundingClientRect().top + window.scrollY);
}, { passive: true });

window.addEventListener("keydown", (evt) => {
    if (evt.key === "ArrowDown") {
        const next = Math.min(currentIndex() + 1, sections.length - 1);
        smoothScrollTo(sections[next].getBoundingClientRect().top + window.scrollY);
    }
    if (evt.key === "ArrowUp") {
        const next = Math.max(currentIndex() - 1, 0);
        smoothScrollTo(sections[next].getBoundingClientRect().top + window.scrollY);
    }
});
