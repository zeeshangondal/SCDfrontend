import Axios from "axios"

const KEYS = {
    employees: 'employees',
    employeeId: 'employeeId'
}
//const URL="http://localhost:3001/api/v1/employees/"

const URL="https://scd-backend.herokuapp.com/";

export const getEmployeeTypes = () => ([
    { id: 'Doctor', title: 'Doctor' },
    { id: 'Nurse', title: 'Nurse' },
    { id: 'Pharmacist', title: 'Pharmacist' }
])

const asyncWrapper = (fn) => {
    return async () => {
      try {
        await fn()
      } catch (error) {
        console.log(error)
      }
    }
  }



export const insertEmployee= async(employee,getAllEmployees)=> {
    // let employees = getAllEmployees();
    // data['id'] = generateEmployeeId()
    // employees.push(data)
    // localStorage.setItem(KEYS.employees, JSON.stringify(employees))
    const result= await Axios.post(URL, employee);
    console.log(result)
    getAllEmployees()
}

export const updateEmployee= async(employee,getAllEmployees)=> {
    await Axios.patch(URL +employee._id,employee);
    getAllEmployees()
}

export const deleteEmployee=async(email,getAllEmployees)=> {
    // let employees = getAllEmployees();
    // employees = employees.filter(x => x.id != id)
    // localStorage.setItem(KEYS.employees, JSON.stringify(employees));
    await Axios.delete(URL+ email);    
    getAllEmployees()
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}


export const getAllEmployees=async(setRecords)=>{
    let data = await Axios.get(URL);
    setRecords(data.data.employees.reverse()) 
}


export const authenticateHR=async(data,valid,invalid)=>{
    console.log(data)
    try{
        let result = await Axios.get(URL+data.username);
        let HR=result.data.HR
        if(data.username== HR.username && data.password== HR.password)
            valid()
        else
            invalid()
    }catch(e){
        invalid()
    }
}


  
// export const updateEmployee= async(employee,getAllEmployees) {
//     let employees = getAllEmployees();
//     let recordIndex = employees.findIndex(x => x.id == data.id);
//     employees[recordIndex] = { ...data }
//     localStorage.setItem(KEYS.employees, JSON.stringify(employees));
// }
