class Hangman{
    constructor(lifeA,scoreA,questionA,wordA,loserA,buttonsA){
        this.lifeScreen = lifeA;
        this.scoreScreen = scoreA;
        this.questionScreen = questionA;
        this.wordScreen = wordA;
        this.loseScreen = loserA;
        this.buttonsScreen = buttonsA;

        this.oldPassword = "";
        this.oldWord = "";
        this.wordCheck = "";
        this.life = 7;
        this.score = 0;
        this.passwords = [
            ["WHICH MOUNTAIN WE LOVE",   "ARARAT"],
            ["POPULAR SPORT",           "FOOTBALL"],
            ["WEB PROGRAMMING LANGUAGE", "JAVASCIPT"],
            ["CITY IN ARMENIA ", "KAPAN"]
        ]
        this.isCont = true;
    }
    restart(){
        this.loseScreen.style.transform = "translateY(-100%)";
        this.oldWord = this.oldPassword;
        this.oldPassword = "";
        this.wordCheck = "";
        this.life = 7;
        this.score = 0;
        
        this.start()
        this.display();
        this.isCont = true;
    }
    randNum() {
        return Math.floor(Math.random() * (this.passwords.length - 0) + 0);
    }
    start(){
        do{
            let theNum = this.randNum();
            this.questionScreen.textContent = this.passwords[theNum][0]; 
            this.wordCheck =  this.passwords[theNum][1];
        }while(this.oldWord == this.wordCheck);
        this.oldWord = ""
        for(let i in this.wordCheck){
            this.oldPassword+="_"    
        }
        console.log(this.wordCheck)
    }
    checkLetter(letter){
        if(!this.isCont) return;
        letter.setAttribute("disabled","")
        
        if(this.wordCheck.includes(letter.textContent)){
            let arr = this.oldPassword.split("");
            for(let i in this.wordCheck.split("")){
                if(this.wordCheck.split("")[i] == letter.textContent){
                    arr[i] = `${letter.textContent}`;
                }
            }
            this.oldPassword = arr.join('')
            if(!this.oldPassword.includes("_")){
                this.ifWon();
            }
        }
        else{
            this.life--
            if(this.life == 0){
                this.lose()
            }
        }
    }
    lose(){
        this.loseScreen.style.transform = "translateY(0%)";
        this.lifeScreen.textContent = "0";
        this.isCont = false;
    }
    ifWon(){
        this.score++;
        this.oldWord = this.oldPassword;
        this.oldPassword = ""
        this.buttonsScreen.forEach((button) => button.removeAttribute("disabled"))
        this.start();
    }
    display(){
        this.lifeScreen.textContent = this.life;
        this.wordScreen.textContent = this.oldPassword;
        this.scoreScreen.textContent = this.score;
    }
    
}