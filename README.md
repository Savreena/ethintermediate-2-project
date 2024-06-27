# Merchandise Management

The methodical handling of products in a retail setting is known as merchandise management. It involves activities including tracking quantities, setting prices, and adding new items to the inventory. Optimising stock levels and optimising sales prospects are guaranteed by effective management. Maintaining a balanced supply and demand is essential to this process, which in turn drives corporate success.

# Explanation

Part of the Smart Contract: Using the Ethereum blockchain, the smart contract controls the inventory of goods. It contains features for adding things, buying them, and safely verifying quantities and values.

Frontend Section: Using MetaMask, the frontend interface links users to the blockchain. It offers a smooth user experience for managing merchandise by enabling the addition of new merchandise, the purchase of items, and the verification of real-time availability and values.

# Beginning
# Carrying out the programme
Create a directory first, then navigate to it and open it in Visual Studio Code to begin running this programme.

To install the dependencies, run npm i.
Launch the npx hardhat node to start a local blockchain. Copy any key from the supplied private keys and import it into Metamask.
Run npx hardhat run --network localhost scripts/deploy.js in an opened terminal. This will deploy the contract to the hardhat node and compile it. The contract address can be copied and pasted into the contractAddress value in the src\script.js file after it prints in the terminal.
To copy the abi address, navigate to../artifacts/contracts/MessageSystem.sol/MessageSystem.json and choose the following file: "abi": [ {.....} ]

and copy this to the contractABI value.

Open index.html now.

Set the network to localhost in Metamask.

# Author
Savreena Kaushal

# Licence
The MIT Licence governs the use of this MyToken.
