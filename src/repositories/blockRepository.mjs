import Block from '../models/Block.mjs';

export default class BlockRepository {
  async add(block) {
    const blockData = {
      timestamp: block.timestamp,
      hash: block.hash,
      lastHash: block.lastHash,
      data: block.data,
      nonce: block.nonce,
      difficulty: block.difficulty,
    };

    return await blockModel.create(blockData);
  }

  async list() {
    return await blockModel.find();
  }

  async findByHash(hash) {
    return await blockModel.findOne({ hash });
  }

  async replaceChain(newChain) {
    await blockModel.deleteMany({});
    await blockModel.insertMany(newChain.map(block => ({
      timestamp: block.timestamp,
      hash: block.hash,
      lastHash: block.lastHash,
      data: block.data,
      nonce: block.nonce,
      difficulty: block.difficulty,
    })));
  }
}
