// Replace with your deployed contract address
const contractAddress = '0xE41f1500e3b8207e3C283574fe84CA9B94Bec6ED';

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
        "name": "addMerchandise",
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
        "name": "purchaseMerchandise",
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
                "name": "_itemName",
                "type": "string"
            }
        ],
        "name": "checkMerchandiseQuantity",
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
        "name": "checkMerchandiseValue",
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
    }
];

let provider;
let signer;
let contract;

document.addEventListener('DOMContentLoaded', () => {
    async function connect() {
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

    async function addMerchandise() {
        const itemName = document.getElementById('itemName').value;
        const quantity = document.getElementById('quantity').value;
        const value = document.getElementById('value').value;

        try {
            const result = await contract.addMerchandise(itemName, quantity, value);
            console.log('Merchandise added:', result);
            alert('Merchandise added successfully!');
        } catch (error) {
            console.error('Error adding merchandise:', error);
            alert('Error adding merchandise. Check console for details.');
        }
    }

    async function purchaseMerchandise() {
        const itemName = document.getElementById('purchaseItemName').value;

        try {
            const result = await contract.purchaseMerchandise(itemName);
            console.log('Purchase result:', result);
            alert(result);
        } catch (error) {
            console.error('Error purchasing merchandise:', error);
            alert('Error purchasing merchandise. Check console for details.');
        }
    }

    async function checkMerchandiseQuantity() {
        const itemName = document.getElementById('checkQuantityItemName').value;

        try {
            const quantity = await contract.checkMerchandiseQuantity(itemName);
            console.log('Merchandise quantity:', quantity);
            alert(`Quantity: ${quantity}`);
        } catch (error) {
            console.error('Error checking merchandise quantity:', error);
            alert('Error checking merchandise quantity. Check console for details.');
        }
    }

    async function checkMerchandiseValue() {
        const itemName = document.getElementById('checkValueItemName').value;

        try {
            const value = await contract.checkMerchandiseValue(itemName);
            console.log('Merchandise value:', value);
            alert(`Value: ${value}`);
        } catch (error) {
            console.error('Error checking merchandise value:', error);
            alert('Error checking merchandise value. Check console for details.');
        }
    }

    // Expose functions to the global scope
    window.connect = connect;
    window.addMerchandise = addMerchandise;
    window.purchaseMerchandise = purchaseMerchandise;
    window.checkMerchandiseQuantity = checkMerchandiseQuantity;
    window.checkMerchandiseValue = checkMerchandiseValue;
});
