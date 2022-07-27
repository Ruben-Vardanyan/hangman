class Hangman{
    constructor(lifeA,scoreA,questionA,wordA,loserA,buttonsA,drawManA){
        this.lifeScreen = lifeA;
        this.scoreScreen = scoreA;
        this.questionScreen = questionA;
        this.wordScreen = wordA;
        this.loseScreen = loserA;
        this.buttonsScreen = buttonsA;
        this.drawManScreen = drawManA;


        this.oldPassword = "";
        this.oldWord = "";
        this.wordCheck = "";
        this.life = 7;
        this.score = 0;
        this.passwords = [
            ["THE LARGEST OCEAN",   "PACIFIC"],
            ["THE HIGHEST MOUNTAIN IN ARMENIA",   "ARAGATS"],
            ["POPULAR SPORT",           "FOOTBALL"],
            ["POPULAR SPORT",           "RUGBY"],
            ["WEB PROGRAMMING LANGUAGE", "JAVASCIPT"],
            ["WEB PROGRAMMING LANGUAGE", "HTML"],
            ["PROGRAMMING LANGUAGE", "PYTHON"],
            ["PROGRAMMING LANGUAGE", "RUBY"],
            ["PROGRAMMING LANGUAGE", "ANDROID"],
            ["CITY IN ARMENIA", "KAPAN"],
            ["CITY IN ARMENIA", "STEPANAVAN"],
            ["CITY IN ARMENIA", "VANADZOR"],
            ["CITY IN ARMENIA", "GYUMRI"],
            ["CITY IN ARMENIA", "YEREVAN"],
            ["FAMOUS ROBOT", "TERMINATOR"],
            ["SWEET LAKE IN ARMENIA", "SEVAN"],
            ["CAPITAL CITY OF BRITAIN", "LONDON"],
            ["CAPITAL CITY OF SPAIN", "MADRID"],
            ["CAPITAL CITY OF FRANCE", "PARIS"],
        ]
        this.isCont = true;
    }
    restart(){
        this.loseScreen.style.transitionDelay = "0s";
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
    quit(){
        this.loseScreen.style.transitionDelay = "0s";
        this.loseScreen.style.transform = "translateY(-100%)";
        this.oldWord = "";
        this.oldPassword = "";
        this.wordCheck = "";
        this.life = 7;
        this.score = 0;
        this.isCont = false;
        this.buttonsScreen.forEach((button) => button.removeAttribute("disabled"))
    }
    randNum() {
        return Math.floor(Math.random() * (this.passwords.length - 0) + 0);
    }
    start(){
        this.isCont = true;
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
        this.loseScreen.style.transitionDelay = "1s";
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
        this.drawManScreen.src = `imgs/l${this.life}.svg`
    }
    
}