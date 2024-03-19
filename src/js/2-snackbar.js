import iziToast from 'izitoast';

const form = document.querySelector('.form');
form.addEventListener('submit', doSubmit);

function doSubmit(event) {
  event.preventDefault();
  const value = event.target.elements.state.value;
  const delayValue = event.target.elements.delay.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value === 'fulfilled') {
        resolve(delayValue);
      } else {
        reject(delayValue);
      }
    }, delayValue);
  });
  promise
    .then(value =>
      iziToast.show({
        message: `✅ Fulfilled promise in ${value}ms`,
        backgroundColor: 'rgb(89, 161, 13)',
        closeOnEscape: true,
        position: 'topRight',
        messageColor: 'white',
      })
    )
    .catch(value =>
      iziToast.show({
        message: `❌ Rejected promise in ${delayValue}ms`,
        backgroundColor: 'rgb(239, 64, 64)',
        closeOnEscape: true,
        position: 'topRight',
        messageColor: 'white',
      })
    );
}