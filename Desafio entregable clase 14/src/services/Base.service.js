class BaseService {
  constructor(dao) {
    this.dao = dao;
  }

  async create(object) {
    try {
      const createdObject = await this.dao.create(object);

      return createdObject;
    } catch (error) {
      throw error;
    }
  }

  async getAll(filter) {
    try {
      const foundObjects = await this.dao.getAll(filter);

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      const foundObject = await this.dao.getById(id);

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async getByFilter(filter) {
    try {
      const foundObject = await this.dao.getByFilter(filter);

      return foundObject;
    } catch (error) {
      throw error;
    }
  }

  async updateById(id, object) {
    try {
      const updatedObject = await this.dao.updateById(id, object);

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async updateByFilter(filter, object) {
    try {
      const updatedObject = await this.dao.updateByFilter(filter, object);

      return updatedObject;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(id) {
    try {
      const deletedObject = await this.dao.deleteById(id);

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }

  async deleteByFilter(filter) {
    try {
      const deletedObject = await this.dao.deleteByFilter(filter);

      return deletedObject;
    } catch (error) {
      throw error;
    }
  }

  async deleteManyByFilter(filter) {
    try {
      const deletedObjects = await this.dao.deleteManyByFilter(filter);

      return deletedObjects;
    } catch (error) {
      throw error;
    }
  }

  async aggregate(aggregateQuery) {
    try {
      const foundObjects = await this.dao.aggregate(aggregateQuery);

      return foundObjects;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseService;
