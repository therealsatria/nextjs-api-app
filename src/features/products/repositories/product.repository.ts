import { v4 as uuidv4 } from 'uuid';
import { pool } from '@/shared/infrastructure/database/db-config';
import { IProductRepository } from '../domain/interfaces/product.repository.interface';
import { Product } from '../domain/entities/product';
import { Inventory } from '@/features/inventory/domain/entities/inventory';
import { CreateProductDto, UpdateProductDto } from '../domain/dtos/product.dto';
import { UpdateInventoryDto } from '@/features/inventory/domain/dtos/inventory.dto';

export class ProductRepository implements IProductRepository {
  async create(dto: CreateProductDto): Promise<Product> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const productId = uuidv4();
      const inventoryId = uuidv4();

      const productResult = await client.query(
        'INSERT INTO products (id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
        [productId, dto.name, dto.description, dto.price]
      );

      const inventoryResult = await client.query(
        'INSERT INTO inventory (id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
        [inventoryId, productId, dto.initialQuantity]
      );

      await client.query('COMMIT');

      const product = new Product(
        productResult.rows[0].id,
        productResult.rows[0].name,
        productResult.rows[0].description,
        parseFloat(productResult.rows[0].price),
        productResult.rows[0].created_at
      );

      product.inventory = new Inventory(
        inventoryResult.rows[0].id,
        inventoryResult.rows[0].product_id,
        inventoryResult.rows[0].quantity,
        inventoryResult.rows[0].updated_at
      );

      return product;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: string): Promise<Product | null> {
    const result = await pool.query(`
      SELECT p.*, i.id as inventory_id, i.quantity, i.updated_at 
      FROM products p 
      LEFT JOIN inventory i ON p.id = i.product_id 
      WHERE p.id = $1
    `, [id]);

    if (!result.rows[0]) return null;

    const row = result.rows[0];
    const product = new Product(
      row.id,
      row.name,
      row.description,
      parseFloat(row.price),
      row.created_at
    );

    if (row.inventory_id) {
      product.inventory = new Inventory(
        row.inventory_id,
        row.id,
        row.quantity,
        row.updated_at
      );
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    const result = await pool.query(`
      SELECT p.*, i.id as inventory_id, i.quantity, i.updated_at 
      FROM products p 
      LEFT JOIN inventory i ON p.id = i.product_id
    `);

    return result.rows.map(row => {
      const product = new Product(
        row.id,
        row.name,
        row.description,
        parseFloat(row.price),
        row.created_at
      );
      if (row.inventory_id) {
        product.inventory = new Inventory(
          row.inventory_id,
          row.id,
          row.quantity,
          row.updated_at
        );
      }
      return product;
    });
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const client = await pool.connect();
    try {
      const existing = await this.findById(id);
      if (!existing) throw new Error('Product not found');

      const updates: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (dto.name !== undefined) {
        updates.push(`name = $${paramCount++}`);
        values.push(dto.name);
      }
      if (dto.description !== undefined) {
        updates.push(`description = $${paramCount++}`);
        values.push(dto.description);
      }
      if (dto.price !== undefined) {
        updates.push(`price = $${paramCount++}`);
        values.push(dto.price);
      }

      if (updates.length === 0) return existing;

      values.push(id);
      const query = `UPDATE products SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
      const result = await client.query(query, values);

      const updatedProduct = new Product(
        result.rows[0].id,
        result.rows[0].name,
        result.rows[0].description,
        parseFloat(result.rows[0].price),
        result.rows[0].created_at
      );

      const inventoryResult = await client.query(
        'SELECT * FROM inventory WHERE product_id = $1',
        [id]
      );
      if (inventoryResult.rows[0]) {
        updatedProduct.inventory = new Inventory(
          inventoryResult.rows[0].id,
          inventoryResult.rows[0].product_id,
          inventoryResult.rows[0].quantity,
          inventoryResult.rows[0].updated_at
        );
      }

      return updatedProduct;
    } finally {
      client.release();
    }
  }

  async updateInventory(id: string, dto: UpdateInventoryDto): Promise<Inventory> {
    const client = await pool.connect();
    try {
      const result = await client.query(
        'UPDATE inventory SET quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE product_id = $2 RETURNING *',
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
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM inventory WHERE product_id = $1', [id]);
      const result = await client.query('DELETE FROM products WHERE id = $1', [id]);

      if (result.rowCount === 0) throw new Error('Product not found');

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async bulkCreate(dtos: CreateProductDto[]): Promise<Product[]> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const products: Product[] = [];

      for (const dto of dtos) {
        const productId = uuidv4();
        const inventoryId = uuidv4();

        const productResult = await client.query(
          'INSERT INTO products (id, name, description, price) VALUES ($1, $2, $3, $4) RETURNING *',
          [productId, dto.name, dto.description, dto.price]
        );

        const inventoryResult = await client.query(
          'INSERT INTO inventory (id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
          [inventoryId, productId, dto.initialQuantity]
        );

        const product = new Product(
          productResult.rows[0].id,
          productResult.rows[0].name,
          productResult.rows[0].description,
          parseFloat(productResult.rows[0].price),
          productResult.rows[0].created_at
        );

        product.inventory = new Inventory(
          inventoryResult.rows[0].id,
          inventoryResult.rows[0].product_id,
          inventoryResult.rows[0].quantity,
          inventoryResult.rows[0].updated_at
        );

        products.push(product);
      }

      await client.query('COMMIT');
      return products;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async bulkDelete(ids: string[]): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query('DELETE FROM inventory WHERE product_id = ANY($1::uuid[])', [ids]);
      await client.query('DELETE FROM products WHERE id = ANY($1::uuid[])', [ids]);

      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
} 