#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    static counter = 50000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = student.counter++;
        this.name = name;
        this.courses = []; // inaitiative or empth arry for courses
        this.balance = 10000;
    }
    //method to enroll the student in the course
    enroll_course(course) {
        this.courses.push(course);
    }
    //method to view student balamce
    view_balance() {
        console.log(chalk.magentaBright(`\n \t Balance for ${this.name} : ${this.balance}\n`));
    }
    //Method to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(chalk.magentaBright(`\n \t ${amount} Fees paid SUCCESSFULLY ${this.name} `));
        console.log(chalk.greenBright(`\t Remainning balance : ${this.balance}\n`));
    }
    //method to display student status
    show_status() {
        console.log(chalk.yellowBright(`\n\t ID : ${this.id}`));
        console.log(chalk.yellowBright(`\t Name : ${this.name}`));
        console.log(chalk.yellowBright(`\t Courses : ${this.courses}`));
        console.log(chalk.yellowBright(`\t Balance : ${this.balance}\n`));
    }
}
//definnig a student manager class to manage student
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //method to add a new student
    add_student(name) {
        let studnt = new student(name);
        this.students.push(studnt);
        console.log(chalk.magentaBright(`\n\t Student ${name} add SUCCESSFULLY. Student ID: ${studnt.id}\n`));
    }
    //method to enroll a student in a course
    enroll_student(student_id, course) {
        let std_found = this.find_student(student_id);
        if (std_found) {
            std_found.enroll_course(course);
            console.log(chalk.magentaBright(`\n \t ${std_found.name} Enrolled in ${course} SUCCESSFULLY\n`));
        }
    }
    //method to view student balance
    view_sudent_balance(student_id) {
        let std_bal = this.find_student(student_id);
        if (std_bal) {
            std_bal.view_balance();
        }
        else {
            console.log(chalk.redBright(" \t\n Student not found. Please enter a correct Syudent:ID\n"));
        }
    }
    //method to pay student fee
    pay_student_fee(student_id, amount) {
        let std_fee = this.find_student(student_id);
        if (std_fee) {
            std_fee.pay_fees(amount);
        }
        else {
            console.log(chalk.redBright(" \n\t Student not found. Please enter a correct Syudent:ID\n"));
        }
    }
    //method to display student method
    show_student_status(student_id) {
        let std_status = this.find_student(student_id);
        if (std_status) {
            std_status.show_status();
        }
    }
    //method to find student
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
;
//main function to run the program
async function main() {
    console.log("-".repeat(60));
    console.log(chalk.bold.italic.greenBright("\n\t WELCOME TO RIZA Student Management System\n"));
    console.log("-".repeat(60));
    let Student_manager = new student_manager();
    //while loap to keep program runing
    while (true) {
        let choices = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select a option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        //sing switch case to handle user choice
        switch (choices.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.bold.blueBright("Enter a student name:"),
                    }
                ]);
                Student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let enroll_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.blueBright("Enter a Student ID:")
                    },
                    {
                        name: "courses",
                        type: "input",
                        message: chalk.bold.blueBright("Enter a Course Name:")
                    }
                ]);
                Student_manager.enroll_student(enroll_input.student_id, enroll_input.courses);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.blueBright("Enter a Student ID:")
                    }
                ]);
                Student_manager.view_sudent_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fee_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.blueBright("Enter a student ID:")
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.bold.blueBright("Enter the amount to PAY:")
                    }
                ]);
                Student_manager.pay_student_fee(fee_input.student_id, fee_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: chalk.bold.blueBright("Enter a Student ID:")
                    }
                ]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log("-".repeat(60));
                console.log(chalk.bold.italic.redBright("\t Exiting..... "));
                console.log("-".repeat(60));
                process.exit();
                break;
        }
    }
}
;
//calling a main function
main();
