import pool from "../utils/db";

export type Investment ={
 investment_name: string,
 minimum_interest: number,
 maximum_interest:number
}

export type Investments={
  investments: Investment[]
}

export const getInvestmentsModel = async (): Promise<Investments>=>{
  console.log('Here')
  try {const result = await pool.query('SELECT * FROM investment');
    console.log(result)
    return {investments:result.rows};
  } catch (error) {
    console.log(error)
  }

  return {investments:[{
    investment_name:'',
    minimum_interest:0,
    maximum_interest:0
  }]}
  
 
 
}