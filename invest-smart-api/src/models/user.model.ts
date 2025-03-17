import pool from '../utils/db';

export interface User {
  id?: number;
  name: string;
  email: string;
}

export const createUserModel = async (user: User): Promise<User> => {
  const { name, email } = user;
  const result = await pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

export const getUsersModel = async (): Promise<User[]> => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};