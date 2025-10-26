document.addEventListener('DOMContentLoaded', () => {
    const modalBackdrop = document.getElementById('modal-backdrop');
    const closeButton = document.getElementById('close-button');

    // Make sure both elements were found before adding the listener
    if (modalBackdrop && closeButton) {
        
        // Function to close the modal
        function closeModal() {
            // 🔑 THE KEY: Remove the 'visible' class to change the CSS 'display' property
            modalBackdrop.classList.remove('visible');
        }

        // Attach the close function to the click event
        closeButton.addEventListener('click', closeModal);

        // Optional: Close if the user clicks on the dark area outside the circle
        modalBackdrop.addEventListener('click', (e) => {
            // Only close if the click target IS the backdrop itself
            if (e.target === modalBackdrop) {
                closeModal();
            }
        });

    } else {
        // This will show an error in the browser's console if an element wasn't found
        console.error("Error: Modal or Close Button element not found. Check your HTML IDs.");
    }
});
window.onload = function () {
  const draggables = document.querySelectorAll('.draggable');
  const originalPositions = new Map();

  // Save original positions
  draggables.forEach(el => {
    originalPositions.set(el, {
      left: el.style.left || el.offsetLeft + 'px',
      top: el.style.top || el.offsetTop + 'px',
      transform: el.style.transform || 'scale(0.7)',
      position: el.style.position || 'absolute',
      zIndex: el.style.zIndex || 2
    });
  });

  draggables.forEach(el => {
    let dragging = false;
    let offsetX = 0, offsetY = 0;

    function startDrag(e) {
      dragging = true;
      const event = e.type.startsWith('touch') ? e.touches[0] : e;
      offsetX = event.clientX - el.offsetLeft;
      offsetY = event.clientY - el.offsetTop;
      el.style.position = 'absolute';
      el.style.zIndex = 1000;
      el.style.cursor = 'grabbing';
      el.style.transform = 'scale(0.7)';
      e.preventDefault();
    }

    function onDrag(e) {
      if (!dragging) return;
      const event = e.type.startsWith('touch') ? e.touches[0] : e;
      el.style.left = (event.clientX - offsetX) + 'px';
      el.style.top = (event.clientY - offsetY) + 'px';
      e.preventDefault();
    }

    function stopDrag() {
      dragging = false;
      el.style.cursor = 'grab';
    }

    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', startDrag, { passive: false });

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });

    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
    document.addEventListener('touchcancel', stopDrag);
  });

  // Reset button
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      draggables.forEach(el => {
        const orig = originalPositions.get(el);
        el.style.left = orig.left;
        el.style.top = orig.top;
        el.style.transform = orig.transform;
        el.style.position = orig.position;
        el.style.zIndex = orig.zIndex;
      });
    });
  }
};

function aud_play_pause() {
  var myAudio = document.getElementById("myTune");
  if (myAudio.paused) {
    myAudio.play();
  } else {
    myAudio.pause();
  }
}