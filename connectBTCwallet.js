mongodb+srv://joblawal33:joblawal33@cluster0.kcjbv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0





To add BTC wallet connection and send RUNE tokens when a button is clicked in your React project, you'll need to integrate a Bitcoin wallet (like Ledger or MetaMask with support for BTC) and interact with the Thorchain protocol for sending RUNE. Here’s a step-by-step guide to achieve this:

### Steps to Add BTC Wallet and Send RUNE:

#### 1. **Set Up a Bitcoin Wallet Connector**
   You'll need to integrate a Bitcoin wallet into your project. 
   There are libraries that support Bitcoin wallets like `Unisat`, 
   `XVerse`, or you can work with hardware wallets like `Ledger`. 
   Here's an example with the `Unisat` wallet:

   - Install Unisat API:
     ```bash
     npm install @unisat/wallet
     ```

   - Add the following code to connect to the wallet:

     ```javascript
     import React, { useState } from 'react';

     const ConnectBTCWallet = () => {
       const [walletAddress, setWalletAddress] = useState(null);

       const connectWallet = async () => {
         try {
           const wallet = window.unisat; // Unisat wallet object
           if (!wallet) {
             alert("Unisat Wallet not found. Please install Unisat extension.");
             return;
           }

           // Request access to the user's wallet
           const accounts = await wallet.requestAccounts();
           setWalletAddress(accounts[0]);
         } catch (error) {
           console.error("Error connecting to wallet:", error);
         }
       };

       return (
         <div>
           <button onClick={connectWallet}>
             {walletAddress ? `Connected: ${walletAddress}` : "Connect BTC Wallet"}
           </button>
         </div>
       );
     };

     export default ConnectBTCWallet;
     ```

   This will connect to a Bitcoin wallet and fetch the user's address.

#### 2. **Install Asgardex or Thorchain SDK for Sending RUNE**
   To send RUNE tokens through Thorchain, you'll need the 
   `@thorchain/asgardex` package or Thorchain SDK. Install it using:

   ```bash
   npm install @thorchain/asgardex
   ```

   Import the relevant libraries to your component:

   ```javascript
   import { Client as ThorchainClient } from '@thorchain/asgardex-client';
   ```

#### 3. **Send RUNE After Wallet Connection**
   Once the wallet is connected, you can send RUNE tokens by 
   interacting with Thorchain's RUNE network. Here's an example 
   function to send RUNE:

   ```javascript
   import React, { useState } from 'react';
   import { Client as ThorchainClient } from '@thorchain/asgardex-client';

   const SendRune = () => {
     const [btcAddress, setBtcAddress] = useState(null);

     const connectBTCWallet = async () => {
       try {
         const wallet = window.unisat;
         const accounts = await wallet.requestAccounts();
         setBtcAddress(accounts[0]);
       } catch (error) {
         console.error("Error connecting to BTC wallet:", error);
       }
     };

     const sendRune = async () => {
       try {
         const thorchainClient = new ThorchainClient({
           network: 'testnet', // or 'mainnet' depending on your needs
           phrase: 'your-seed-phrase-here', // Use an environment variable in production
         });

         // Create transaction to send RUNE
         const txHash = await thorchainClient.transfer({
           asset: 'THOR.RUNE', // RUNE asset
           amount: thorchainClient.getDecimalValue(1), // Amount in RUNE (1 RUNE here)
           recipient: btcAddress, // The connected BTC wallet address
           memo: '', // Any memo required by Thorchain
         });

         console.log('Transaction Hash:', txHash);
       } catch (error) {
         console.error('Error sending RUNE:', error);
       }
     };

     return (
       <div>
         <button onClick={connectBTCWallet}>
           {btcAddress ? `Connected: ${btcAddress}` : 'Connect BTC Wallet'}
         </button>

         {btcAddress && (
           <button onClick={sendRune}>
             Send 1 RUNE to {btcAddress}
           </button>
         )}
       </div>
     );
   };

   export default SendRune;
   ```

#### 4. **Test the Application**
   - **Development Mode**: Use Thorchain's testnet or sandbox for testing transactions to avoid real RUNE token transfers.
   - **Security Considerations**: Do not expose the seed phrase in production. Use environment variables (`process.env.SEED_PHRASE`) to store it securely.

### Additional Notes:
- Thorchain supports cross-chain swaps, so if you want to swap BTC for RUNE, you’ll need to handle more complex logic for cross-chain swaps.
- Make sure to properly handle errors and transaction failures, especially when dealing with user wallets and blockchain transactions.

This basic setup connects a Bitcoin wallet and sends RUNE tokens using Thorchain. You can extend this by adding UI feedback and handling edge cases like failed transactions.
