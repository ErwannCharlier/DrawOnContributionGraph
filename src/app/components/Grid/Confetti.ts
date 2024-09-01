import confetti from 'canvas-confetti';

const count = 200;
const defaults = {
    origin: { y: 0.7 },
};

export function fireConfetti(particleRatio: number, opts: any) {
    confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
    });
}
export function launchConfetti() {
    fireConfetti(0.25, {
        spread: 26,
        startVelocity: 55,
    });

    fireConfetti(0.2, {
        spread: 60,
    });

    fireConfetti(0.35, {
        spread: 100,
        decay: 0.91,
    });

    fireConfetti(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
    });

    fireConfetti(0.1, {
        spread: 120,
        startVelocity: 45,
    });
}