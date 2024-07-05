let provider;
let signer;
let contract;

const contractAddress = '0x8C3b745Ff0e9e1B607cD22adDB11eCF37C1B686C';

// ABI for EasyTrade contract
const contractABI = [ 
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_itemName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Merchandise_add",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_itemName",
                "type": "string"
            }
        ],
        "name": "Merchandise_purchase",
        "outputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "",
                "type": "string"
            }
        ],
        "name": "inventory",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_itemName",
                "type": "string"
            }
        ],
        "name": "Merchandise_checkQuantity",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_itemName",
                "type": "string"
            }
        ],
        "name": "Merchandise_checkValue",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // Function to connect to the wallet
    async function connectWallet() {
        if (window.ethereum) {
            try {
                // Request account access if needed
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Account access granted');
                // Initialize ethers provider and signer
                provider = new ethers.providers.Web3Provider(window.ethereum);
                signer = provider.getSigner();
                // Create a connection to the smart contract
                contract = new ethers.Contract(contractAddress, contractABI, signer);
                alert('Wallet connected');
            } catch (error) {
                console.error('Error connecting wallet:', error);
                alert('Failed to connect wallet');
            }
        } else {
            alert('No wallet found. Please install MetaMask.');
        }
    }

    // Function to add merchandise
    async function addMerchandise(event) {
        event.preventDefault();
        const itemName = document.getElementById('itemName').value;
        const quantity = document.getElementById('quantity').value;
        const value = document.getElementById('value').value;

        try {
            const result = await contract.Merchandise_add(itemName, quantity, value);
            console.log('Merchandise added:', result);
            alert('Merchandise added successfully!');
        } catch (error) {
            console.error('Error adding merchandise:', error);
            alert('Error adding merchandise. Check console for details.');
        }
    }

    // Function to purchase merchandise
    async function purchaseMerchandise(event) {
        event.preventDefault();
        const itemName = document.getElementById('purchaseItemName').value;

        try {
            const result = await contract.Merchandise_purchase(itemName);
            console.log('Purchase result:', result);
            alert(result);
        } catch (error) {
            console.error('Error purchasing merchandise:', error);
            alert('Error purchasing merchandise. Check console for details.');
        }
    }

    // Function to check merchandise quantity
    async function checkMerchandiseQuantity(event) {
        event.preventDefault();
        const itemName = document.getElementById('checkQuantityItemName').value;

        try {
            const quantity = await contract.Merchandise_checkQuantity(itemName);
            console.log('Merchandise quantity:', quantity);
            alert(Quantity: ${quantity});
        } catch (error) {
            console.error('Error checking merchandise quantity:', error);
            alert('Error checking merchandise quantity. Check console for details.');
        }
    }

    // Function to check merchandise value
    async function checkMerchandiseValue(event) {
        event.preventDefault();
        const itemName = document.getElementById('checkValueItemName').value;

        try {
            const value = await contract.Merchandise_checkValue(itemName);
            console.log('Merchandise value:', value);
            alert(Value: ${value});
        } catch (error) {
            console.error('Error checking merchandise value:', error);
            alert('Error checking merchandise value. Check console for details.');
        }
    }

    // Add event listeners to forms
    document.getElementById('connectWalletButton').addEventListener('click', connectWallet);
    document.getElementById('addMerchandiseForm').addEventListener('submit', addMerchandise);
    document.getElementById('purchaseMerchandiseForm').addEventListener('submit', purchaseMerchandise);
    document.getElementById('checkQuantityForm').addEventListener('submit', checkMerchandiseQuantity);
    document.getElementById('checkValueForm').addEventListener('submit', checkMerchandiseValue);
});
