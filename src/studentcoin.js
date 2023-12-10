import web3 from './web3';
const address='0x9fEC8855e57c7856eeDe0b4298b40e126Cce3eB3';
const abi= [{"inputs":[{"internalType":"string","name":"argContractName","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"newAdminAddress","type":"address"}],"name":"addAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"studentName","type":"string"},{"internalType":"uint256","name":"numberOfCoins","type":"uint256"}],"name":"awardStudentPoints","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"contractName","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getStudentLeaderboard","outputs":[{"internalType":"string[]","name":"","type":"string[]"},{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"studentName","type":"string"}],"name":"getStudentPoints","outputs":[{"components":[{"internalType":"uint256","name":"totalCoins","type":"uint256"}],"internalType":"struct StudentCoin.CoinStruct","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"","type":"string"}],"name":"studentCoinMap","outputs":[{"internalType":"uint256","name":"totalCoins","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"studentName","type":"string"},{"internalType":"uint256","name":"numberOfCoins","type":"uint256"}],"name":"studentPurchase","outputs":[],"stateMutability":"nonpayable","type":"function"}];

export default new web3.eth.Contract(abi, address);
