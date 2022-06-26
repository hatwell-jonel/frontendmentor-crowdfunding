import { data as pledges } from "./modules/data.js";

$(document).ready(() => {
  let pledgeWithReward = $(".pledge_with_reward");
  let modalClose = $(".close_modal");

  let backedData = 10000;
  let backersData = 5007;
  let daysLeftData = 56;

  $("#progressbar").val(backedData);

  // BACKERS DATA
  $(".data__container").html(`
        <div class="data_box data__backed">
              <p class="data__number">$${backedData.toLocaleString()}</p>
              <p class="data__def">of $100,000 backed</p>
            </div>

            <div class="data_box data__backers">
              <p class="data__number">${backersData.toLocaleString()}</p>
              <p class="data__def">total backers</p>
            </div>

            <div class="data_box data__daysleft">
              <p class="data__number">${daysLeftData}</p>
              <p class="data__def">days left</p>
        </div>
  `);

  // PLEDGES DATA
  $(".about__pledges").html(
    pledges.map((data, index) => {
      const { id, name, desc, min_amount, items_left } = data;
      return `  
      <div class="pledge">
        <div class="pledge--flex">
          <p class="pledge__text">${name}</p>
          <p class="pledge__amount">Pledge $${min_amount} or more</p>
        </div>

        <p class="pledge__desc">${desc}</p>

        <div class="pledge--flex">
          <p class="pledge__itemLeft"> <span>${items_left}</span> left </p>
          <button class="btn__selectreward" data-id=${index} title="select reward">select reward</button>
        </div>
      </div> `;
    })
  );

  // MODAL PLEDGES
  $(".modal__content").append(
    pledges.map((data, index) => {
      const { id, name, desc, min_amount, items_left } = data;
      return `  
      
        <div class="pledge ">
            <div class="pledge__header">
              <div class="circle__container">
                <div class="button__circle" data-id=${id}></div>
              </div>
              <div class="flex">
                <h2 class="pledge__text">${name}</h2>
                <p class="pledge__amount">Plege $${min_amount} or more</p>
              </div>
            </div>

            <div class="pledge__body">
              <p class="pledge__desc">
              ${desc}
              </p>
              <p class="pledge__itemLeft"><span>${items_left}</span> left</p>
            </div>

            <div class="pledge__footer pledge__footer--hidden">
              <p class="text__enter-pledge">Enter your pledge</p>

              <div class="pledge__input">
                <div class="input__group">
                  <input type="text" class="input_amount" />
                  <p>$</p>
                </div>
                <button type="submit">Continue</button>
              </div>
            </div>
          </div>`;
    })
  );

  // CLOSE MAIN MODAL
  $(".modal__button--close").on("click", () => {
    $("#modal-pledges").fadeOut(250);
  });

  let selectReward = $(".btn__selectreward");

  selectReward.on("click", () => {
    $("#modal-pledges").fadeIn();
  });

  $(".button__circle").on("click", (e) => {
    let data = e.target.dataset.id;
    let target = e.target;

    $(".pledge__footer--hidden").slideToggle();
  });

  $(".modal__box").on("submit", (e) => {
    e.preventDefault();
    $(".modal").fadeOut();

    let val = Number($(".input_amount").val());

    backedData += val;
    return backedData;
  });

  $(".btn__menu").on("click", () => {
    $(".btn__menu").toggleClass("close");

    if ($(".btn__menu").hasClass("close")) {
      $(".nav__list").slideDown();
    } else {
      $(".nav__list").slideUp();
    }
  });
});
