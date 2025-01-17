#! /usr/bin/env node 
import inquirer from "inquirer";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import { se } from "date-fns/locale";


const response = await inquirer.prompt({
    type:"number",
    name:"userInput",
    message:"Please Enter the amount of second",

    validate: (input) => {
        if(isNaN(input)){
            return "please enter a valid number";
            
        } else if (input > 60){
            return "second must be in 60"
        }else{
            return true;
        }
    }
});

let input = response.userInput

function startTime (val:number){
    const initialTime = new Date().setSeconds(new Date().getSeconds() + val )
    const intervalTime = new Date(initialTime);
    setInterval(()=>{
        const currentTime =new Date()
        const timeDiffernce = differenceInSeconds(intervalTime,currentTime);

        if(timeDiffernce <= 0){
           console.log("Timer has been expired");
           process.exit();
        }
        const min = Math.floor((timeDiffernce%(3600 * 24))/3600);
        const sec = Math.floor(timeDiffernce %60);
        console.log(`${min.toString().padStart(2,"0")} : ${sec.toString().padStart(2,"0")}`);
    },1000);
}

startTime(input);