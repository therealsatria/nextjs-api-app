import { v4 as uuidv4 } from 'uuid';
import { pool } from '@/shared/infrastructure/database/db-config';
import { IInventoryRepository } from '../domain/interfaces/inventory.repository.interface';
import { Inventory } from '../domain/entities/inventory';
import { CreateInventoryDto, UpdateInventoryDto } from '../domain/dtos/inventory.dto';

export class InventoryRepository implements IInventoryRepository {
  async create(dto: CreateInventoryDto): Promise<Inventory> {
    const client = await pool.connect();
    try {
      const inventoryId = uuidv4();
      const result = await client.query(
        'INSERT INTO inventory (id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [inventoryId, dto.productId, dto.quantity]
      );

      return new Inventory(
        result.rows[0].id,
        result.rows[0].product_id,
        result.rows[0].quantity,
        result.rows[0].updated_at
      );
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Inventory | null> {
    const result = await pool.query(
      'SELECT * FROM inventory WHERE id = $1',
      [id]
    );

    if (!result.rows[0]) return null;

    return new Inventory(
      result.rows[0].id,
      result.rows[0].product_id,
      result.rows[0].quantity,
      result.rows[0].updated_at
    );
  }

  async findByProductId(productId: string): Promise<Inventory | null> {
    const result = await pool.query(
      'SELECT * FROM inventory WHERE product_id = $1',
      [productId]
    );

    if (!result.rows[0]) return null;

    return new Inventory(
      result.rows[0].id,
      result.rows[0].product_id,
      result.rows[0].quantity,
      result.rows[0].updated_at
    );
  }

  async findAll(): Promise<Inventory[]> {
    const result = await pool.query('SELECT * FROM inventory');

    return result.rows.map(row => new Inventory(
      row.id,
      row.product_id,
      row.quantity,
      row.updated_at
    ));
  }

  async update(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE inventory SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
        [dto.quantity, id]
      );

      if (!result.rows[0]) throw new Error('Inventory not found');

      return new Inventory(
        result.rows[0].id,
        result.rows[0].product_id,
        result.rows[0].quantity,
        result.rows[0].updated_at
      );
    } finally {
      client.release();
    }
  }

  async delete(id: string): Promise<void> {
    const result = await pool.query('DELETE FROM inventory WHERE id = $1', [id]);
    if (result.rowCount === 0) throw new Error('Inventory not found');
  }
} 