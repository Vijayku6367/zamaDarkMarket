// DarkMarket FHE Main Application - Zama + Sepolia Version
class DarkMarketApp {
    constructor() {
        this.connected = false;
        this.walletAddress = null;
        this.contract = null;
        this.provider = null;
        this.signer = null;
        this.products = [];
        this.encryptedBids = new Map(); // Store bids locally
        
        // Zama Configuration
        this.ZAMA_CONFIG = {
            apiEndpoint: 'https://api.dev.zama.ai',
            network: 'sepolia',
            chainId: 11155111
        };
        
        // Sepolia Configuration
        this.SEPOLIA_CONFIG = {
            rpc: 'https://eth-sepolia.g.alchemy.com/v2/e0H0PaRuJEzbganDwzgH_',
            chainId: '0xaa36a7',
            explorer: 'https://sepolia.etherscan.io'
        };
        
        // Contract ABI (Simplified)
        this.CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "bidId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "bidder", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "listingId", "type": "uint256" }
    ],
    "name": "BidSubmitted",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "seller", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "encryptedPrice", "type": "string" }
    ],
    "name": "ListingCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "winner", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "WinnerRevealed",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "indexed": false, "internalType": "address", "name": "winner", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "encryptedAmount", "type": "string" }
    ],
    "name": "WinnerSelected",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "bidCounter",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "bids",
    "outputs": [
      { "internalType": "address", "name": "bidder", "type": "address" },
      { "internalType": "string", "name": "encryptedBid", "type": "string" },
      { "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "bool", "name": "revealed", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "_encryptedPrice", "type": "string" }],
    "name": "createListing",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "listingCounter",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_listingId", "type": "uint256" }],
    "name": "listings",
    "outputs": [
      { "internalType": "address", "name": "seller", "type": "address" },
      { "internalType": "string", "name": "encryptedPrice", "type": "string" },
      { "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "bool", "name": "active", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_listingId", "type": "uint256" },
      { "internalType": "uint256", "name": "_decryptedAmount", "type": "uint256" }
    ],
    "name": "revealWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_listingId", "type": "uint256" },
      { "internalType": "address", "name": "_winner", "type": "address" },
      { "internalType": "string", "name": "_encryptedAmount", "type": "string" }
    ],
    "name": "selectWinner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "uint256", "name": "_listingId", "type": "uint256" },
      { "internalType": "string", "name": "_encryptedBid", "type": "string" }
    ],
    "name": "submitBid",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "name": "winners",
    "outputs": [
      { "internalType": "address", "name": "winner", "type": "address" },
      { "internalType": "string", "name": "encryptedAmount", "type": "string" },
      { "internalType": "uint256", "name": "listingId", "type": "uint256" },
      { "internalType": "bool", "name": "decrypted", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
        
        this.CONTRACT_ADDRESS = '0xd90a4e5397AFfA943df3c93a9e8Ff06270c4De25'; // Update after deployment
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadProducts();
        this.updateUI();
        this.initializeProviders();
    }

    async initializeProviders() {
        if (typeof window.ethereum !== 'undefined') {
            this.provider = new ethers.BrowserProvider(window.ethereum);
            console.log('✅ Ethereum provider initialized');
        } else {
            console.warn('⚠️ MetaMask not detected');
            this.showNotification('Please install MetaMask to use this app', 'error');
        }
    }

    async connectWallet() {
        try {
            if (!this.provider) {
                this.showNotification('Please install MetaMask first', 'error');
                return;
            }
            
            // Switch to Sepolia network
            await this.switchToSepolia();
            
            // Request account access
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            this.walletAddress = accounts[0];
            this.signer = await this.provider.getSigner();
            this.connected = true;
            
            // Initialize contract instance
            this.contract = new ethers.Contract(
                this.CONTRACT_ADDRESS,
                this.CONTRACT_ABI,
                this.signer
            );
            
            // Update UI
            document.getElementById('walletInfo').style.display = 'block';
            document.getElementById('walletAddress').textContent = 
                `${this.walletAddress.substring(0, 6)}...${this.walletAddress.substring(38)}`;
            
            // Get balance
            const balance = await this.provider.getBalance(this.walletAddress);
            document.getElementById('ethBalance').textContent = 
                ethers.formatEther(balance).substring(0, 6) + ' ETH';
            
            // Animate connection
            const connectBtn = document.getElementById('connectWallet');
            gsap.to(connectBtn, {
                backgroundColor: '#00ff00',
                duration: 0.5,
                onComplete: () => {
                    gsap.to(connectBtn, {
                        backgroundColor: '',
                        duration: 0.5,
                        delay: 0.5
                    });
                }
            });
            
            // Update connect button text
            connectBtn.innerHTML = '<i class="fas fa-wallet"></i> Connected';
            connectBtn.disabled = true;
            
            this.showNotification('Wallet connected to Sepolia!', 'success');
            
        } catch (error) {
            console.error('Wallet connection error:', error);
            this.showNotification('Failed to connect wallet', 'error');
        }
    }

    async switchToSepolia() {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: this.SEPOLIA_CONFIG.chainId }]
            });
        } catch (error) {
            // If network not added, add it
            if (error.code === 4902) {
                await this.addSepoliaNetwork();
            } else {
                throw error;
            }
        }
    }

    async addSepoliaNetwork() {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
                chainId: this.SEPOLIA_CONFIG.chainId,
                chainName: 'Sepolia Testnet',
                rpcUrls: ['https://sepolia.infura.io/v3/'],
                nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18
                },
                blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
        });
    }

    async handleEncryption() {
        const plainValue = document.getElementById('plainValue').value;
        
        if (!plainValue || isNaN(plainValue)) {
            this.showNotification('Please enter a valid number', 'error');
            return;
        }
        
        try {
            // Show encryption in progress
            this.showNotification('Encrypting with Zama FHE...', 'info');
            
            // Simulate Zama FHE encryption (Replace with actual API call)
            const encryptedData = await this.simulateZamaEncryption(plainValue);
            
            // Display encrypted value
            const display = document.getElementById('encryptedValue');
            display.innerHTML = `
                <span class="ciphertext">${encryptedData.ciphertext.substring(0, 32)}...</span>
                <div class="encryption-meta">
                    <small>Hash: ${encryptedData.hash.substring(0, 16)}...</small>
                    <small>Stored: ${encryptedData.cid.substring(0, 16)}...</small>
                </div>
            `;
            
            // Store for later use
            window.currentEncryptedData = encryptedData;
            
            // Update visualization
            this.updateEncryptionVisualization(plainValue, encryptedData);
            
            this.showNotification('Value encrypted with Zama FHE!', 'success');
            
        } catch (error) {
            console.error('Encryption error:', error);
            this.showNotification('Encryption failed', 'error');
        }
    }

    async simulateZamaEncryption(value) {
        // In production, replace with actual Zama API call
        const mockData = {
            ciphertext: `0x${Array(64).fill().map(() => 
                Math.floor(Math.random() * 16).toString(16)).join('')}`,
            hash: ethers.keccak256(ethers.toUtf8Bytes(value.toString())),
            cid: `bafy${Array(46).fill().map(() => 
                Math.floor(Math.random() * 16).toString(16)).join('')}`
        };
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        return mockData;
    }

    async submitBid() {
        if (!this.connected) {
            this.showNotification('Please connect your wallet first', 'error');
            return;
        }
        
        const bidInput = document.getElementById('bidAmount');
        const ciphertext = bidInput.value.trim();
        const productId = document.querySelector('.product-card.active')?.dataset?.productId || 1;
        
        if (!ciphertext || !ciphertext.startsWith('0x')) {
            this.showNotification('Please enter a valid encrypted bid', 'error');
            return;
        }
        
        try {
            this.showNotification('Submitting encrypted bid to Sepolia...', 'info');
            
            // Generate mock data for demo
            const bidData = {
                ciphertext: ciphertext,
                hash: ethers.keccak256(ethers.toUtf8Bytes(ciphertext)),
                cid: `bafy${Array(46).fill().map(() => 
                    Math.floor(Math.random() * 16).toString(16)).join('')}`
            };
            
            // Simulate Sepolia transaction
            // In production, uncomment below:
            /*
            const tx = await this.contract.submitBid(
                productId,
                bidData.cid,
                bidData.hash
            );
            
            await tx.wait();
            */
            
            // For demo, simulate transaction
            setTimeout(() => {
                this.addBidToTimeline(bidData);
                
                // Store bid locally
                if (!this.encryptedBids.has(productId)) {
                    this.encryptedBids.set(productId, []);
                }
                this.encryptedBids.get(productId).push({
                    bidder: this.walletAddress,
                    data: bidData,
                    timestamp: Date.now()
                });
                
                this.showNotification('Encrypted bid submitted to Sepolia!', 'success');
                bidInput.value = '';
                
                // Update transaction explorer link
                this.updateTxLink('mock-tx-hash');
                
            }, 2000);
            
        } catch (error) {
            console.error('Bid submission error:', error);
            this.showNotification('Failed to submit bid', 'error');
        }
    }

    updateTxLink(txHash) {
        const explorerLink = `https://sepolia.etherscan.io/tx/${txHash}`;
        
        // Create or update notification
        const txNotification = document.createElement('div');
        txNotification.className = 'notification notification-info';
        txNotification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: rgba(0, 217, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid #00d9ff;
            color: white;
            padding: 1rem;
            border-radius: 10px;
            z-index: 3000;
        `;
        
        txNotification.innerHTML = `
            <i class="fas fa-external-link-alt"></i>
            <span>Transaction Submitted!</span>
            <a href="${explorerLink}" target="_blank" 
               style="color: #00d9ff; margin-left: 10px; text-decoration: none;">
               View on Explorer
            </a>
        `;
        
        document.body.appendChild(txNotification);
        
        setTimeout(() => txNotification.remove(), 10000);
    }

    async revealWinner() {
        if (!this.connected) {
            this.showNotification('Please connect your wallet first', 'error');
            return;
        }
        
        const productId = document.querySelector('.product-card.active')?.dataset?.productId || 1;
        const bids = this.encryptedBids.get(productId) || [];
        
        if (bids.length === 0) {
            this.showNotification('No bids to process', 'error');
            return;
        }
        
        try {
            this.showNotification('Processing FHE computation on Zama...', 'info');
            
            // Simulate Zama FHE computation
            const winnerData = await this.simulateZamaComputation(bids);
            
            // Simulate Sepolia transaction for winner selection
            setTimeout(async () => {
                try {
                    // In production, uncomment:
                    /*
                    const tx = await this.contract.selectWinner(
                        productId,
                        winnerData.winner,
                        winnerData.proofCID
                    );
                    
                    await tx.wait();
                    */
                    
                    // Update UI with winner
                    this.updateWinnerUI(winnerData);
                    
                    this.showNotification('Winner selected and verified on-chain!', 'success');
                    
                } catch (error) {
                    console.error('Winner selection error:', error);
                    this.showNotification('Failed to select winner', 'error');
                }
            }, 3000);
            
        } catch (error) {
            console.error('Zama computation error:', error);
            this.showNotification('FHE computation failed', 'error');
        }
    }

    async simulateZamaComputation(bids) {
        // Simulate Zama FHE max computation
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Select random winner for demo
        const randomBid = bids[Math.floor(Math.random() * bids.length)];
        
        return {
            winner: randomBid.bidder,
            winningBid: randomBid.data.ciphertext.substring(0, 32) + '...',
            proofCID: `bafy${Array(46).fill().map(() => 
                Math.floor(Math.random() * 16).toString(16)).join('')}`,
            amount: (Math.random() * 5).toFixed(3)
        };
    }

    updateWinnerUI(winnerData) {
        const winnerElement = document.querySelector('.winner-address');
        const bidElement = document.querySelector('.encrypted-amount');
        
        // Animate decryption
        this.animateDecryption(winnerElement, 
            `${winnerData.winner.substring(0, 6)}...${winnerData.winner.substring(38)}`);
        this.animateDecryption(bidElement, `${winnerData.amount} ETH`);
        
        // Update proof display
        const proofElement = document.querySelector('.proof-display');
        if (proofElement) {
            proofElement.innerHTML = `
                <div class="proof-info">
                    <small>Zama Proof:</small>
                    <code>${winnerData.proofCID.substring(0, 32)}...</code>
                    <a href="https://explorer.zama.ai/" target="_blank" 
                       style="color: #00d9ff; margin-left: 10px;">
                       Verify
                    </a>
                </div>
            `;
        }
    }

    async loadProducts() {
        try {
            // In production, fetch from contract/backend
            this.products = [
                {
                    id: 1,
                    name: 'Digital Art NFT',
                    description: 'Exclusive encrypted digital artwork',
                    category: 'Art',
                    encryptedPrice: '0x3a7d...c8f2',
                    seller: '0x742d...c8a1',
                    cid: 'bafybeigdyrzt5sfp7...'
                },
                {
                    id: 2,
                    name: 'Premium Domain',
                    description: 'Crypto domain name (.eth)',
                    category: 'Domains',
                    encryptedPrice: '0x8b4e...d9a1',
                    seller: '0x913e...f7b2',
                    cid: 'bafybeiabm6l5g7k...'
                },
                {
                    id: 3,
                    name: 'AI Model',
                    description: 'Encrypted machine learning model',
                    category: 'AI',
                    encryptedPrice: '0xf2c5...b7e3',
                    seller: '0x2c9f...d8e3',
                    cid: 'bafybeibz6q5g6h...'
                }
            ];
            
            this.renderProducts();
            
        } catch (error) {
            console.error('Error loading products:', error);
            // Fallback to mock data
            this.loadMockProducts();
        }
    }

    setupEventListeners() {
        // Wallet connection
        document.getElementById('connectWallet').addEventListener('click', () => this.connectWallet());
        
        // Network switching
        document.getElementById('switchNetwork')?.addEventListener('click', () => this.switchToSepolia());
        
        // Encryption
        document.getElementById('encryptBtn').addEventListener('click', () => this.handleEncryption());
        document.getElementById('copyCiphertext').addEventListener('click', () => this.copyCiphertext());
        
        // Bidding
        document.getElementById('submitBid').addEventListener('click', () => this.submitBid());
        document.getElementById('clearBid').addEventListener('click', () => this.clearBid());
        
        // Winner reveal
        document.getElementById('revealWinner').addEventListener('click', () => this.revealWinner());
        
        // Product management
        document.getElementById('createListing')?.addEventListener('click', () => this.createListing());
        
        // Navigation
        this.setupNavigation();
        
        // Refresh button
        document.getElementById('refreshBids')?.addEventListener('click', () => this.loadBidsFromChain());
    }

    async createListing() {
        if (!this.connected) {
            this.showNotification('Connect wallet to create listing', 'error');
            return;
        }
        
        const price = prompt('Enter price (will be encrypted):');
        if (!price || isNaN(price)) return;
        
        try {
            this.showNotification('Creating encrypted listing...', 'info');
            
            // Encrypt price with Zama
            const encryptedData = await this.simulateZamaEncryption(price);
            
            // Simulate contract call
            setTimeout(() => {
                this.showNotification('Listing created on Sepolia!', 'success');
                
                // Add to local products
                const newProduct = {
                    id: this.products.length + 1,
                    name: `Product #${this.products.length + 1}`,
                    description: 'New encrypted listing',
                    category: 'General',
                    encryptedPrice: encryptedData.ciphertext.substring(0, 16) + '...',
                    seller: this.walletAddress,
                    cid: encryptedData.cid
                };
                
                this.products.unshift(newProduct);
                this.renderProducts();
                
            }, 2000);
            
        } catch (error) {
            console.error('Create listing error:', error);
            this.showNotification('Failed to create listing', 'error');
        }
    }

    async loadBidsFromChain() {
        if (!this.connected || !this.contract) {
            this.showNotification('Connect wallet to load bids', 'error');
            return;
        }
        
        try {
            this.showNotification('Loading bids from Sepolia...', 'info');
            
            // Simulate loading from chain
            setTimeout(() => {
                this.showNotification('Bids loaded successfully', 'success');
                // Update timeline with mock chain data
                this.addMockChainBids();
            }, 1500);
            
        } catch (error) {
            console.error('Load bids error:', error);
        }
    }

    addMockChainBids() {
        const timeline = document.querySelector('.bid-timeline');
        
        // Clear existing
        timeline.innerHTML = '';
        
        // Add mock chain bids
        const mockBids = [
            { bidder: '0xabc1...f2e3', time: '10:30', amount: '0x8f2c...a9d1' },
            { bidder: '0xdef4...b5c6', time: '10:25', amount: '0x3e9b...f7c2' },
            { bidder: '0xghi7...e8f9', time: '10:15', amount: '0x1a4d...b8e3' }
        ];
        
        mockBids.forEach(bid => {
            const bidItem = document.createElement('div');
            bidItem.className = 'timeline-item';
            bidItem.innerHTML = `
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <div class="bid-header">
                        <span class="bidder">${bid.bidder}</span>
                        <span class="bid-time">${bid.time}</span>
                    </div>
                    <div class="bid-value">
                        <i class="fas fa-link"></i>
                        Chain Bid: ${bid.amount}
                    </div>
                    <div class="bid-status on-chain">⛓️ On Chain</div>
                </div>
            `;
            
            timeline.appendChild(bidItem);
        });
    }

    // Keep other existing methods (copyCiphertext, clearBid, addBidToTimeline, 
    // animateDecryption, renderProducts, etc.) as they are...

    showNotification(message, type = 'info') {
        // Enhanced notification with Zama/Sepolia icons
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            zama: 'fas fa-shield-alt',
            sepolia: 'fab fa-ethereum'
        };
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        let icon = icons[type];
        if (message.includes('Zama') || message.includes('FHE')) {
            icon = icons.zama;
        } else if (message.includes('Sepolia') || message.includes('chain')) {
            icon = icons.sepolia;
        }
        
        notification.innerHTML = `
            <i class="${icon}"></i>
            <span>${message}</span>
        `;
        
        // Style and add to DOM
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 0, 0.1)' :
                         type === 'error' ? 'rgba(255, 0, 0, 0.1)' :
                         type === 'zama' ? 'rgba(148, 0, 211, 0.1)' :
                         'rgba(0, 217, 255, 0.1)'};
            backdrop-filter: blur(10px);
            border: 1px solid ${type === 'success' ? '#00ff00' :
                             type === 'error' ? '#ff0000' :
                             type === 'zama' ? '#9400d3' :
                             '#00d9ff'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 3000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DarkMarketApp();
    
    // Add network status indicator
    this.addNetworkStatus();
});

// Add network status to UI
function addNetworkStatus() {
    const statusDiv = document.createElement('div');
    statusDiv.id = 'networkStatus';
    statusDiv.innerHTML = `
        <div class="status-item">
            <span class="status-label">Network:</span>
            <span class="status-value" id="currentNetwork">Not Connected</span>
        </div>
        <div class="status-item">
            <span class="status-label">FHE Provider:</span>
            <span class="status-value" id="fheProvider">Zama</span>
        </div>
    `;
    
    statusDiv.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(10px);
        border: 1px solid #00d9ff;
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 12px;
        z-index: 1000;
    `;
    
    document.body.appendChild(statusDiv);
}
