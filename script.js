const contractAddress = '0x70760eC2422FFF4b10C1b750f1564B319C17a5E2'; // Replace with your deployed contract address
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
    }
];

let provider;
let signer;
let contract;

async function connect() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            console.log(`Connected account: ${accounts[0]}`);
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            contract = new ethers.Contract(contractAddress, contractABI, signer);
            alert('Wallet connected');
        } catch (error) {
            console.error(error);
            alert('Failed to connect wallet');
        }
    } else {
        alert('No wallet found');
    }
}

// Function to add merchandise
async function addMerchandise() {
    const itemName = document.getElementById('itemName').value;
    const itemQuantity = document.getElementById('itemQuantity').value;
    const itemValue = document.getElementById('itemValue').value;

    try {
        await contract.addMerchandise(itemName, itemQuantity, itemValue);
        alert('Merchandise added successfully!');
    } catch (error) {
        console.error('Error adding merchandise:', error);
        alert('Error adding merchandise. Check console for details.');
    }
}

// Function to purchase merchandise
async function purchaseMerchandise() {
    const itemName = document.getElementById('merchandiseName').value;

    try {
        const tx = await contract.purchaseMerchandise(itemName);
        await tx.wait();
        const result = await contract.checkMerchandiseQuantity(itemName);
        document.getElementById('purchaseMerchandiseResult').innerText = `Purchase complete, thank you! Remaining quantity: ${result}`;
    } catch (error) {
        console.error('Error purchasing merchandise:', error);
        document.getElementById('purchaseMerchandiseResult').innerText = 'Error purchasing merchandise. Check console for details.';
    }
}

// Function to check merchandise quantity
async function checkMerchandiseQuantity() {
    const itemName = document.getElementById('checkMerchandiseName').value;

    try {
        const result = await contract.checkMerchandiseQuantity(itemName);
        document.getElementById('checkMerchandiseQuantityResult').innerText = `Quantity available: ${result}`;
    } catch (error) {
        console.error('Error checking merchandise quantity:', error);
        document.getElementById('checkMerchandiseQuantityResult').innerText = 'Error checking merchandise quantity.';
    }
}

// Function to check merchandise value
async function checkMerchandiseValue() {
    const itemName = document.getElementById('checkMerchandiseValueName').value;

    try {
        const value = await contract.checkMerchandiseValue(itemName);
        document.getElementById('checkMerchandiseValueResult').innerText = `Value of merchandise: ${value}`;
    } catch (error) {
        console.error('Error checking merchandise value:', error);
        document.getElementById('checkMerchandiseValueResult').innerText = 'Error checking merchandise value.';
    }
}
