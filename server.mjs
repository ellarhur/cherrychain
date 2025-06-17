import { app } from './app.mjs';
import authRouter from './src/routes/authRoutes.mjs';
import usersRouter from '../src/routes/userRoutes.mjs';
import blockchainRoutes from './src/routes/blockchainRoutes.mjs';
import networkServer from './network.mjs';
import Blockchain from './src/models/Blockchain.mjs';

const blockChain = new Blockchain();
const server = new networkServer({ blockchain: blockChain });

const PORT = process.env.PORT || 5002;

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/blocks', blockchainRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
