// Definde interface Student
interface Student {
	firstName: string;
	lastName: string;
	age: number;
	location: string;
}

// Create two students
const student1: Student = {
	firstName: 'Selomon',
	lastName: 'Teshome',
	age: 21,
	location: 'Addis Ababa'
};

const student2: Student = {
	firstName: 'Dagm',
	lastName: 'Haddis',
	age: 23,
	location: 'Mekelle'
};

// Create an array, studentList, contain two list
const studentsList: Student[] = [student1, student2];

// Render a table
const table = document.createElement('table');
const tabbody = document.createElement('tabbody');

studentsList.forEach(student => {
	const row = document.createElement('tr');
	const firstNameCell = document.createElement('td');
	firstNameCell.textContent = student.firstName;
	const locationCell = document.createElement('td');
	row.appendChild(firstNameCell);
	row.appendChild(locationCell);
	tabbody.appendChild(row);
});

table.appendChild(tabbody);
document.body.appendChild(table);
