const dateElement = document.querySelector(".todo__date");
const timeElement = document.querySelector(".todo__time");

function getDate() {
  const [getDay, getFullYear] = [
    new Date().getDate(),
    new Date().getFullYear(),
  ];
  // Get various components of the current date and time
  const monthName = new Date().toLocaleString("en-US", { month: "long" });
  const time = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  dateElement.innerHTML = `
    <sup class="todo__date-day">${getDay}</sup>
    <span class="todo__date-month">${monthName}</span>
    <sub class="todo__date-year">${getFullYear}</sub>
  `;
  timeElement.innerHTML = `${time}`;
}
window.addEventListener("load", getDate);

setInterval(getDate, 1000);
