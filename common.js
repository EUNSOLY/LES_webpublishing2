// 1번 : 나 일단 API를 활용할꺼야
// 2번 : 그럼 API를 받아오자
// 3번 : 받아온 데이터가 맞다면 어떤실행을 하는 콜백함수를 쓸꺼야
// 4번 : 그러면 그 콜백함수는 뭔데?
// 5번 : 그래서 그 콜백함수를 만들꺼야 근데 순서가 있어
// 6번 : 1번 내가 가져온 데이터를 html에 넣기 위한 함수를 만들꺼야//(startData)
// 7번 : html에 넣을 수 있는 함수를 만들었으니 html로 보낼꺼야(loadData실행)
// 7-1번 : 근데 loadData가 뭔데? => 그래서 LoadData함수를 만들꺼야
// 8번 : 그런데 loadDate가 실행될 때 조건이 붙을 것 같아
// 8-1번 : 그 조건은 내가 어떤 이벤트를 실행했을 때를 기준으로 만들어질꺼야
//8-2번 : 조건이 뭐냐면 이벤트가 실행됬을 때 일단 이벤트 값을 가져올꺼야 그리고 그걸 loadDate에 넣어줄꺼야
// 9번 : 이벤트가 만들어졌다면 json데이터를 돌아다니며 이 조건을 만족시키는 값을 찾아줘 그리고 그 조건이 맞다면 html에 데이터를 보내줘 (loadData를 실행)
// 10번 : 만약 첫번째 조건이 아니라면? 그다음 조건을 실행 시켜줘(else)
// 11번 : json의 모든 데이터를 돌아다니면서 내가 말한 행동을 반복해줘
// 12번 : 그럼 끝인가....

const $btn = document.querySelectorAll(".btn");
const $grid = document.querySelector("#grid");

function loadJson() {
  return fetch("./data.json") //
    .then((respons) => respons.json())
    .then((json) => json.items)
    .catch(console.log);
}

loadJson() //
  .then((items) => {
    displayItems(items);
    console.log(items);
  });

function displayItems(items) {
  function startDate(item, i) {
    let listL = document.createElement("li");
    listL.innerHTML = `
    <div class="position">
    <img src="${item[i].image}" alt="${item[i].pname}" />
            <p class="hover">${item[i].brand}</p>
          </div>
    <p class="cate">${item[i].cate1}</p>
    <p class="pname">${item[i].pname}</p>
    <p class="price">
      <sapn>${item[i].price}원</sapn>
      <span class="point">${item[i].point}point</span>
    </p>
    `;
    // console.log("음..");
    $grid.appendChild(listL);
  }

  loadDate();

  function loadDate(a) {
    $grid.innerHTML = "";
    items.forEach((_, idx, array) => {
      if (!a || a == "전체") {
        startDate(array, idx);
      } else if (a === array[idx].cate1) {
        startDate(array, idx);
      }
    });
  }

  $btn.forEach((btn, i) => {
    btn.addEventListener("click", (e) => {
      let event = e.target.getAttribute("date-name");
      $btn.forEach((btn, i) => {
        btn.classList.remove("active");
      });
      $btn[i].classList.add("active");
      //   console.log(event);
      loadDate(event);
    });
  });
}
