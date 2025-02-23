import logger from '../../../utils/logs/logger';
import { EmployeeBasicRepository } from '../../../repositories/hrm/employee/EmployeeBasicRepository';
// import * as jwt from 'jsonwebtoken';
// import { SignOptions } from 'jsonwebtoken';
// import bcrypt from 'bcryptjs';
import { IEmployeeBasicAttributes } from '../../../models/hrm/employee/employeeBasic';
export class EmployeeBasicService {

    public empBasicRepository: EmployeeBasicRepository;
    
      constructor() {
        this.empBasicRepository = new EmployeeBasicRepository();
      }

    async funcBasicEntry(data: IEmployeeBasicAttributes,
      currentUserId: number): Promise<IEmployeeBasicAttributes | any> {

        try {
           // const hashedPassword = bcrypt.hashSync(password, 10);
            const employeeResponse = await this.empBasicRepository.create(data, { userId: currentUserId });
            return employeeResponse;
          } catch (error: any) {
            logger.error(`Error creating employee: ${error.message}`, { stack: error.stack });
            throw error; // Optionally rethrow or handle error
          }


    }

    async funcGetEmployeeByEmpCode(emp_code:number):Promise <any>{

      const employeeObj = await this.empBasicRepository.getEmployeeByEmpCode(emp_code);

      if (!employeeObj) {
        logger.error(`Employee data not found for emp_code  "${emp_code}".`);
        return null;
      }
  //console.log(employeeObj);return;
      return employeeObj;
      //console.log(employeeObj);return;
    }

    // Retrieve all employees
    async getAllEmployees(): Promise<IEmployeeBasicAttributes[]> {
      try {
        return await this.empBasicRepository.findAll();
      } catch (error: any) {
        logger.error(`Error fetching employees: ${error.message}`, { stack: error.stack });
        throw error;
      }
    }

     // Update an employee record
  async updateEmployee(emp_code: number, data: Partial<IEmployeeBasicAttributes>): Promise<IEmployeeBasicAttributes | null> {
    try {
      //console.log(emp_code);return;
      return await this.empBasicRepository.updateEmployee(emp_code, data);
    } catch (error: any) {
      logger.error(`Error updating employee with id ${emp_code}: ${error.message}`, { stack: error.stack });
      throw error;
    }
  }



}