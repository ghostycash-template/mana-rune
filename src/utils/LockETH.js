import { getWeb3Instance, getContractInstance } from "./web3Utils";
import contractABI from "./contractABI.json";
const CONTRACT_ADDRESS = "0xdA96f3D08c790D22761bd31613CfC8b019B52F36";

export const lockETH = async (runeAddress, ethAmount, account) => {
  const web3 = getWeb3Instance();
  q;
  if (!web3) {
    return {
      status: "error",
      message: "MetaMask is not installed",
    };
  }

  const contract = getContractInstance(web3, CONTRACT_ADDRESS, contractABI);

  if (contract) {
    try {
      const amountInWei = web3.utils.toWei(ethAmount, "ether");
      await contract.methods
        .lockETH(runeAddress)
        .send({ from: account, value: amountInWei });

      return {
        status: "success",
        message: "ETH locked successfully!",
      };
    } catch (error) {
      return {
        status: "error",
        message: error.message || "Transaction failed",
      };
    }
  } else {
    return {
      status: "error",
      message: "Contract instance is null",
    };
  }
};
