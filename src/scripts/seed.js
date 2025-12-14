import ConnectDB from "../lib/mongo.js";
import Student from "../model/student.js";


const students = [
    { name: "Ali Khan", gender: "male", age: 18, class: "10th", city: "Lahore", },
    { name: "Ahmed Raza", gender: "male", age: 19, class: "11th", city: "Karachi", },
    { name: "Usman Ali", gender: "male", age: 20, class: "12th", city: "Islamabad", },
    { name: "Bilal Ahmad", gender: "male", age: 18, class: "10th", city: "Gujranwala", },
    { name: "Hamza Noor", gender: "male", age: 21, class: "BS 1st", city: "Faisalabad", },

    { name: "Ayesha Khan", gender: "female", age: 18, class: "10th", city: "Lahore", },
    { name: "Fatima Ahmed", gender: "female", age: 19, class: "11th", city: "Karachi", },
    { name: "Zainab Ali", gender: "female", age: 20, class: "12th", city: "Lahore", },
    { name: "Hira Malik", gender: "female", age: 21, class: "BS 1st", city: "Islamabad", },
    { name: "Masfa Azmi", gender: "female", age: 22, class: "BS 2nd", city: "Multan", },

    { name: "Hassan Riaz", gender: "male", age: 22, class: "BS 2nd", city: "Lahore", },
    { name: "Adeel Butt", gender: "male", age: 20, class: "12th", city: "Sialkot", },
    { name: "Saad Malik", gender: "male", age: 19, class: "11th", city: "Multan", },
    { name: "Umar Farooq", gender: "male", age: 23, class: "BS 3rd", city: "Karachi", },
    { name: "Zain Abbas", gender: "male", age: 21, class: "BS 1st", city: "Lahore", },

    { name: "Maryam Iqbal", gender: "female", age: 18, class: "10th", city: "Rawalpindi", },
    { name: "Sara Sheikh", gender: "female", age: 20, class: "12th", city: "Peshawar", },
    { name: "Noor Fatima", gender: "female", age: 22, class: "BS 2nd", city: "Hyderabad", },
    { name: "Laiba Aslam", gender: "female", age: 21, class: "BS 1st", city: "Gujrat", },
    { name: "Anum Yousaf", gender: "female", age: 19, class: "11th", city: "Sargodha", }
];



async function seed() {
    await ConnectDB();
    await Student.deleteMany();
    await Student.insertMany(students);
    console.log("Students added successfully ✅");
    process.exit();
}

seed();
