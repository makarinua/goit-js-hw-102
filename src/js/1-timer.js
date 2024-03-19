// Описаний в документації
import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

const buttonCalendar = document.querySelector('button[data-start]');
const inputCalendar = document.querySelector('#datetime-picker');
const daysToHTML = document.querySelector('[data-days]');
const hoursToHTML = document.querySelector('[data-hours]');
const minutesToHTML = document.querySelector('[data-minutes]');
const secondsToHTML = document.querySelector('[data-seconds]');

buttonCalendar.disabled = true;

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      iziToast.show({
        title: '',
        message: 'Please choose a date in the future',
      });
      buttonCalendar.disabled = true;
    } else {
      buttonCalendar.disabled = false;
      userSelectedDate = selectedDates[0];
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(inputCalendar, options);

buttonCalendar.addEventListener('click', doCount);

function doCount() {
  inputCalendar.disabled = true;
  buttonCalendar.disabled = true;
  const timeCount = setInterval(() => {
    const currentDate = Date.now();
    const ms = userSelectedDate - currentDate;
    const difference = convertMs(ms);
    const result = addLeadingZero(difference);
    daysToHTML.textContent = result[0];
    hoursToHTML.textContent = result[1];
    minutesToHTML.textContent = result[2];
    secondsToHTML.textContent = result[3];

    if (
      daysToHTML.textContent === '00' &&
      hoursToHTML.textContent === '00' &&
      minutesToHTML.textContent === '00' &&
      secondsToHTML.textContent === '00'
    ) {
      clearInterval(timeCount);
      inputCalendar.disabled = false;
      buttonCalendar.disabled = true;
    }
  }, 1000);
}

function addLeadingZero(value) {
  const result = [
    value.days.toString().padStart(2, '0'),
    value.hours.toString().padStart(2, '0'),
    value.minutes.toString().padStart(2, '0'),
    value.seconds.toString().padStart(2, '0'),
  ];
  return result;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


