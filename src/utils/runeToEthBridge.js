import web3 from "./web3";
import RuneToEth from "./RuneToEth.json";
// Replace with your deployed contract's address
const contractAddress = "0xdA96f3D08c790D22761bd31613CfC8b019B52F36";

const runeToEthBridge = new web3.eth.Contract(RuneToEth, contractAddress);

export default runeToEthBridge;
