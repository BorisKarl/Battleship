import { GameBoard } from "./Gameboard.js";
import { randDirection, randomStartingPoint, makePlayer } from "./Functions.js";
import { doc } from "prettier";

const body = document.querySelector("body");

const displayHeader = () => {
  const header_wrapper = document.createElement("div");
  header_wrapper.setAttribute("id", "header_wrapper");
  const header = document.createElement("h1");
  const p = document.createElement("p");
  header.setAttribute("id", "header");
  header.textContent = "Drug Run";
  header.style.backgroundColor = "white";
  p.textContent =
    "Play against the biggest druglords and become the next Kingpin of Rotterdam!";
  header.appendChild(p);
  header_wrapper.appendChild(header)
  body.insertBefore(header_wrapper, body.firstChild);
};

const removeHeader = () => {
  const header = document.getElementById("header_wrapper");
  body.removeChild(header);
};

// const button = document.getElementById("button");

const makeContainer = () => {
    const flexContainer = document.createElement("div");
    flexContainer.setAttribute("id", "flexContainer");
    body.appendChild(flexContainer);
}


const displayText = (text) => {
  const textContainer = document.createElement("div");
  textContainer.setAttribute("class", "textContainer");

  const msg = document.createElement("div");
  msg.setAttribute("class", "msg");
  msg.innerHTML = `
    <p class="text">${text}</p>
    <style>

    .msg {
      display: flex;       
      justify-content: center;
      align-items: center;
    }
    
    p {
        backgroundColor: white;
        font-family: Arial, Helvetica, sans-serif;
        text-align: center;
    }
</style>
  `;  
  textContainer.appendChild(msg);
  body.appendChild(textContainer);
};

const removeText = () => {
  
  const msgArray = document.querySelectorAll(".textContainer");
  msgArray.forEach((e) => body.removeChild(e));
};


const buildBlock = (string, length) => {
  let block_content = document.createElement("div");
  block_content.setAttribute("id", string);
  block_content.setAttribute("class", "v");


  for (let i = 0; i < length; i++) {
    let div = document.createElement("div");
    div.setAttribute("class", "block");
    block_content.appendChild(div);
  }

  return block_content;
};

const displayBlocks = () => {
  const button = document.createElement("button");
  button.setAttribute("id", "switch_button");
  button.textContent = "SWITCH POSITION";
  const content = document.createElement("div");
  content.setAttribute("id", "UI-content");
  const block_wrapper = document.createElement("div");
  block_wrapper.setAttribute("class", "block_wrapper");

  const cocaine = buildBlock("cocaine", 5);
  const meth = buildBlock("meth", 4);
  const crack = buildBlock("crack", 3);
  const weed = buildBlock("weed", 2);
  const shrooms = buildBlock("shrooms", 2);

  block_wrapper.appendChild(cocaine);
  block_wrapper.appendChild(meth);
  block_wrapper.appendChild(crack);
  block_wrapper.appendChild(weed);
  block_wrapper.appendChild(shrooms);
  content.appendChild(button);
  content.appendChild(block_wrapper);
  body.appendChild(content);
};

const switchBlocks = () => {
  const button = document.getElementById("switch_button");
  const block = document.querySelectorAll(".v");
  button.addEventListener("click", () => {
    block.forEach((e) => {
      if (e.classList.contains("v")) {
        e.classList.remove("v");
        e.classList.add("h");
      } else {
        e.classList.remove("h");
        e.classList.add("v");
      }
    });
  });
};

const removeBlocks = () => {
  const body = document.querySelector("body");
  const content = document.getElementById("UI-content");
  body.removeChild(content);
};

function displayBoard(id) {
  const content = document.getElementById("flexContainer");
  const board = document.createElement("div");
  const url =
    "../src/assets/imgs/architecture-building-transport-facade-industry-colorful-722194-pxhere.com.jpg";
  board.style.backgroundImage = `url('${url}')`;
  board.style.backgroundSize = "cover";
  board.setAttribute("id", id);
  const gameBoard = new GameBoard("human");
  const array = gameBoard.buildBoard();
  array.forEach((e) => {
    let element = document.createElement("div");
    element.setAttribute("id", e);
    element.setAttribute("data-id", e);
    element.className = "dropzone";
    element.classList.add(id);
    element.addEventListener("mouseover", (e) => {
      console.log(e.target.getAttribute("data-id"));
      e.target.style.transform = "scale(1.2)";
      e.target.style.backgroundColor = "yellow";
      e.target.style.opacity = "0.3";
      
    });
    element.addEventListener("mouseout", (e) => {
      e.target.style.transform = "scale(1)";
      e.target.style.backgroundColor = "transparent";
    });
    
    board.appendChild(element);
  });
  content.appendChild(board);
  //body.appendChild(content);
 
}
const showPosition = (ship) => {
  let selector = ship.board;
  let position = ship.position;
  if (!position || !Array.isArray(position)) {
    let direction = randDirection();
    let start = randomStartingPoint(ship.name, direction);
    ship.position = [];
    //console.log(start);
    ship.pos(start, direction);
    console.log(ship);
    return;
  }
  let selector_class = "." + selector;
  let array = document.querySelectorAll(selector_class);
  // array.forEach((e) => console.log(e));
  position.forEach((e) => {
    let id = e.toString();
    // console.log(`ShowPosition(). Value e hat den Wert: ${e}.`);
    let div = document.querySelector(`[data-id="${id}"]`);
    array.forEach((e) => {
      if (e.dataset.id === id) e.style.backgroundColor = "green";
    });
  });
};

const clickShip = (ship, player) => {
  let position = ship.position;
  position.forEach((e) => {
    let id = player + e.toString();
    let div = document.getElementById(id);
    console.log("clickShip: " + id + div);
    div.addEventListener("click", function () {
      this.style.backgroundColor = "black";
    });
  });
};


const checkPlayer = (player) => {
  const checkPlayerButton = document.createElement("button");
  checkPlayerButton.textContent = "Check Player";
  checkPlayerButton.addEventListener("click", () => {
    console.log(player);
  });
  document.body.appendChild(checkPlayerButton);
};

const makePopUp = () => {
  const popUp = document.createElement("div");
  popUp.innerHTML = `
    <div id="popUp" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <input type="text" id="popUpInput" autofocus>
        Let's go! Input your name!
        <button id="submitPopup">Submit</button>
      </div>
    </div>
`;
  body.appendChild(popUp);
 const pop = document.getElementById("popUp");
  pop.style.display = "block";
};

const displayName = (playerName) => {
  const content = document.createElement("div");
  content.setAttribute("id", "playerNameContainer");
  content.innerHTML = `<div class="player_name" id="playerName">${playerName.name}</div>
  <div class="machine_name" id="machineName">MACHINE</div>`;
  body.insertBefore(content, body.firstChild);
};

const closePopUp = () => {
  const popUp = document.getElementById("popUp");
  popUp.style.display = "none";
};

const clickPopUp = (player) => {
  const popUpButton = document.getElementById("submitPopup");
  popUpButton.addEventListener("click", () => {
    let popUpValue = document.getElementById("popUpInput").value;
    player.changeName(popUpValue);
    closePopUp();
    displayName(player);
  });
};

const enterPopUp = (player) => {
  const input = document.getElementById("popUpInput");
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      player.changeName(input.value);
      closePopUp();
      displayName(player);
    }
  });
}; 


const setBackground = () => {
  const url =
    "../src/assets/imgs/texture-usa-money-business-paper-cash-1354491-pxhere.com.jpg";
    body.style.backgroundImage = `url('${url}')`;
    body.style.backgroundPosition = "25% 75%;";

}

export {
  displayBoard,
  showPosition,
  clickShip,
  displayHeader,
  displayText,
  displayBlocks,
  switchBlocks,
  removeHeader,
  removeBlocks,
  removeText,
  checkPlayer,
  makePopUp,
  closePopUp,
  displayName,
  makeContainer,
  clickPopUp,
  enterPopUp,
  setBackground
};
