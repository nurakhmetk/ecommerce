import confetti from 'canvas-confetti';

export const runFireWorks = () => {
  var end = Date.now() + 5 * 1000;

  // go Buckeyes!
  // var colors = ['#bb0000', '#ffffff'];

  (function frame() {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 100,
      origin: { x: 0 },
      // colors: colors
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 100,
      origin: { x: 1 },
      // colors: colors
    });
    // confetti({
    //   particleCount: 5,
    //   angle: 120,
    //   spread: 155,
    //   origin: { x: 1 },
    //   // colors: colors
    // });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
