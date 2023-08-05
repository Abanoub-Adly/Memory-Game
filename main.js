let startButton = document.querySelector(".start");
let controlButtons = document.querySelector(".control-buttons");
let minSpan = document.querySelector(".time .min");
let secSpan = document.querySelector(".time .sec");
let tries = document.querySelector(".tries span");
let min = 3;
let sec = 60;
let interval;
minSpan.innerHTML = min;
secSpan.innerHTML = sec;
    let duration = 1000;
    let blockContainer = document.querySelector(".memory-game-blocks");
    let blocks = Array.from(blockContainer.children);
    let orderRange = [...Array(blocks.length).keys()];
    startButton.addEventListener("click",()=>{
        let yourName = prompt("whats your name");
        if(yourName == null || yourName == ""){
            document.querySelector(".name span").innerHTML = "Unknown";
        }else{
            document.querySelector(".name span").innerHTML = yourName;
        }
        controlButtons.remove();
        interval = setInterval(() => {
            secSpan.innerHTML--;
            if(parseInt(secSpan.innerHTML) === 0){
                if(parseInt(minSpan.innerHTML) === 0){
                    secSpan.innerHTML = 0;
                }else{
                    secSpan.innerHTML = sec;
                    minSpan.innerHTML--;
                }
                if(parseInt(minSpan.innerHTML) === 0 && parseInt(secSpan.innerHTML) === 0){
                        clearInterval(interval);
                        resetElements();
                }
            }
        }, 1000);
    })
    shufle(orderRange);
    blocks.forEach((block,index)=>{
        block.style.order = orderRange[index];
        block.onclick = function(){
            flipBlock(block);
        }
    })
    function flipBlock(selectedBlock){
        selectedBlock.classList.add("is-flipped");
        let flipedBlocks = blocks.filter((block)=>block.classList.contains("is-flipped"));
        if(flipedBlocks.length === 2){
            stopCliking();
            checkMatchedBlocks(flipedBlocks);
        }
        let hasMatch = blocks.filter(block=>block.classList.contains("has-match"));
        if(hasMatch.length === blocks.length){
            let div = document.createElement("div");
            div.className = "success";
            div.appendChild(document.createTextNode(`Congratz You Win!`));
            document.body.appendChild(div);
            setTimeout(() => {
                document.querySelector(".success").remove();
            }, 1000);
            clearInterval(interval);
            blocks.forEach(block=>{
                block.classList.remove("has-match");
                block.classList.remove("is-flipped");
                })
                document.body.appendChild(controlButtons);
        }
    }
    function stopCliking(){
        blockContainer.classList.add("no-clicking");
        setTimeout(() => {
        blockContainer.classList.remove("no-clicking");
        }, duration);
    }
    function checkMatchedBlocks(array){
        if(array[0].dataset.animal === array[1].dataset.animal){
            array[0].classList.remove("is-flipped");
            array[1].classList.remove("is-flipped");
            array[0].classList.add("has-match");
            array[1].classList.add("has-match");
            document.getElementById("success").play();
        }else{
            tries.innerHTML = parseInt(tries.innerHTML) + 1;
            setTimeout(() => {
                array[0].classList.remove("is-flipped");
                array[1].classList.remove("is-flipped");
            }, duration);
            document.getElementById("nagative").play();
        }
    }
    function shufle(arr){
        let current = arr.length;
        let temp;
        let random;
        while(current > 0){
            random = Math.floor(Math.random() * current);
            current--;
            temp = arr[current];
            arr[current] = arr[random];
            arr[random] = temp;
        }
        return arr;
    }
    function resetElements(){
        let hasMatch = blocks.filter(block=>block.classList.contains("has-match"));
        if(hasMatch.length === blocks.length){
            let div = document.createElement("div");
            div.className = "success";
            div.appendChild(document.createTextNode(`Congratz You Win!`));
            document.body.appendChild(div);
        }else{
            let div = document.createElement("div");
            div.className = "fill";
            div.appendChild(document.createTextNode(`Timeout You Lose`));
            document.body.appendChild(div);
            setTimeout(() => {
                document.querySelector(".fill").remove();
            }, 1000);
            minSpan.innerHTML = min;
            secSpan.innerHTML = sec;
            tries.innerHTML = "0";
            blocks.forEach(block=>{
            block.classList.remove("has-match");
            block.classList.remove("is-flipped");
            })
            document.body.appendChild(controlButtons);
        }
    }