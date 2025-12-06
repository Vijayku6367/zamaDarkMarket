// DarkMarket FHE - REAL IMPLEMENTATION
class DarkMarketApp {
    constructor() {
        this.connected = false;
        this.walletAddress = null;
        this.contract = null;
        this.provider = null;
        this.signer = null;
        this.products = [];
        this.bids = new Map();
        this.listings = new Map();
        
        // REAL CONFIGURATION
        this.CONTRACT_ADDRESS = '0xd90a4e5397AFfA943df3c93a9e8Ff06270c4De25'; // Your deployed contract
        this.CONTRACT_ABI = [
{
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "bidId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "bidder",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                }
              ],
              "name": "BidSubmitted",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "seller",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "encryptedPrice",
                  "type": "string"
                }
              ],
              "name": "ListingCreated",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "winner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "amount",
                  "type": "uint256"
                }
              ],
              "name": "WinnerRevealed",
              "type": "event"
            },
            {
              "anonymous": false,
              "inputs": [
                {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "indexed": false,
                  "internalType": "address",
                  "name": "winner",
                  "type": "address"
                },
                {
                  "indexed": false,
                  "internalType": "string",
                  "name": "encryptedAmount",
                  "type": "string"
                }
              ],
              "name": "WinnerSelected",
              "type": "event"
            },
            {
              "inputs": [],
              "name": "bidCounter",
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
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "bids",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "bidder",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "encryptedBid",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "revealed",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "string",
                  "name": "_encryptedPrice",
                  "type": "string"
                }
              ],
              "name": "createListing",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [],
              "name": "listingCounter",
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
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "listings",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "seller",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "encryptedPrice",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "active",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "uint256",
                  "name": "_decryptedAmount",
                  "type": "uint256"
                }
              ],
              "name": "revealWinner",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "address",
                  "name": "_winner",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "_encryptedAmount",
                  "type": "string"
                }
              ],
              "name": "selectWinner",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "_listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "string",
                  "name": "_encryptedBid",
                  "type": "string"
                }
              ],
              "name": "submitBid",
              "outputs": [],
              "stateMutability": "nonpayable",
              "type": "function"
            },
            {
              "inputs": [
                {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
                }
              ],
              "name": "winners",
              "outputs": [
                {
                  "internalType": "address",
                  "name": "winner",
                  "type": "address"
                },
                {
                  "internalType": "string",
                  "name": "encryptedAmount",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "listingId",
                  "type": "uint256"
                },
                {
                  "internalType": "bool",
                  "name": "decrypted",
                  "type": "bool"
                }
              ],
              "stateMutability": "view",
              "type": "function"
            }
        ];
        this.ZAMA_API = 'https://api.dev.zama.ai'; // Zama API endpoint
        this.SEPOLIA_RPC = 'https://eth-sepolia.g.alchemy.com/v2/e0H0PaRuJEzbganDwzgH_'; 
        
        this.init();
    }

    async init() {
        await this.loadContractABI();
        this.setupEventListeners();
        this.initializeProviders();
    }

    async loadContractABI() {
        // Load ABI from your Hardhat artifacts
        const response = await fetch('/artifacts/contracts/DarkMarket.sol/DarkMarket.json');
        const artifact = await response.json();
        this.CONTRACT_ABI = artifact.abi;
    }

    async initializeProviders() {
        if (window.ethereum) {
            this.provider = new ethers.BrowserProvider(window.ethereum);
            await this.setupContract();
        } else {
            console.error('Install MetaMask');
        }
    }

    async setupContract() {
        if (this.provider && this.CONTRACT_ABI.length > 0) {
            this.contract = new ethers.Contract(
                this.CONTRACT_ADDRESS,
                this.CONTRACT_ABI,
                await this.provider.getSigner()
            );
            this.setupContractEvents();
        }
    }

    // ✅ REAL ZAMA ENCRYPTION
    async realZamaEncrypt(value) {
        try {
            const response = await fetch(`${this.ZAMA_API}/encrypt`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    plaintext: value.toString(),
                    network: 'sepolia' 
                })
            });
            
            if (!response.ok) throw new Error('Zama API failed');
            
            const data = await response.json();
            return {
                ciphertext: data.ciphertext,
                hash: data.hash,
                cid: data.cid
            };
        } catch (error) {
            console.error('Zama encryption failed:', error);
            throw error;
        }
    }

    // ✅ REAL ZAMA COMPUTE (Max bid)
    async realZamaComputeMax(bidsArray) {
        const response = await fetch(`${this.ZAMA_API}/compute/max`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ciphertexts: bidsArray.map(b => b.ciphertext),
                operation: 'max' 
            })
        });
        
        const result = await response.json();
        return {
            winnerIndex: result.winner_index,
            proof: result.proof,
            encryptedMax: result.encrypted_result
        };
    }

    // ✅ REAL CONTRACT CALLS
    async realCreateListing(encryptedPrice) {
        if (!this.connected || !this.contract) {
            throw new Error('Wallet not connected');
        }
        
        const tx = await this.contract.createListing(encryptedPrice);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    }

    async realSubmitBid(listingId, encryptedBid) {
        const tx = await this.contract.submitBid(listingId, encryptedBid);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    }

    async realSelectWinner(listingId, winnerAddress, encryptedAmount) {
        const tx = await this.contract.selectWinner(listingId, winnerAddress, encryptedAmount);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    }

    async realRevealWinner(listingId, decryptedAmount) {
        const tx = await this.contract.revealWinner(listingId, decryptedAmount);
        const receipt = await tx.wait();
        return { txHash: tx.hash, receipt };
    }

    // ✅ REAL-TIME CHAIN DATA FETCH
    async fetchRealListings() {
        if (!this.contract) return [];
        
        const totalListings = await this.contract.listingCounter();
        const listings = [];
        
        for (let i = 1; i <= totalListings; i++) {
            const listing = await this.contract.listings(i);
            if (listing.active) {
                listings.push({
                    id: listing.listingId,
                    seller: listing.seller,
                    encryptedPrice: listing.encryptedPrice,
                    timestamp: listing.timestamp,
                    active: listing.active
                });
            }
        }
        
        this.listings = new Map(listings.map(l => [l.id, l]));
        this.updateListingsUI(listings);
        return listings;
    }

    async fetchRealBids(listingId) {
        if (!this.contract) return [];
        
        const totalBids = await this.contract.bidCounter();
        const bids = [];
        
        for (let i = 1; i <= totalBids; i++) {
            const bid = await this.contract.bids(i);
            if (bid.listingId == listingId && !bid.revealed) {
                bids.push({
                    id: i,
                    bidder: bid.bidder,
                    encryptedBid: bid.encryptedBid,
                    listingId: bid.listingId,
                    timestamp: bid.timestamp,
                    revealed: bid.revealed
                });
            }
        }
        
        this.bids.set(listingId, bids);
        this.updateBidsUI(listingId, bids);
        return bids;
    }

    // ✅ REAL EVENT LISTENERS
    setupContractEvents() {
        // Listen to new listings
        this.contract.on("ListingCreated", (listingId, seller, encryptedPrice) => {
            console.log('New listing created:', listingId);
            this.addNewListing({
                id: listingId,
                seller: seller,
                encryptedPrice: encryptedPrice,
                timestamp: Date.now(),
                active: true
            });
        });

        // Listen to new bids
        this.contract.on("BidSubmitted", (bidId, bidder, listingId) => {
            console.log('New bid submitted:', bidId);
            this.fetchRealBids(listingId); // Refresh bids
        });

        // Listen to winner selection
        this.contract.on("WinnerSelected", (listingId, winner, encryptedAmount) => {
            console.log('Winner selected:', winner);
            this.updateWinnerUI(listingId, winner, encryptedAmount);
        });

        // Listen to winner reveal
        this.contract.on("WinnerRevealed", (listingId, winner, amount) => {
            console.log('Winner revealed:', amount);
            this.updateRevealedWinnerUI(listingId, winner, amount);
        });
    }

    // ✅ COMPLETE WORKFLOW FUNCTIONS
    async handleCreateListing(price) {
        try {
            // 1. Encrypt with Zama
            const encrypted = await this.realZamaEncrypt(price);
            
            // 2. Create on chain
            const result = await this.realCreateListing(encrypted.ciphertext);
            
            // 3. Update UI
            this.showNotification(`Listing created! TX: ${result.txHash}`, 'success');
            this.updateTxLink(result.txHash);
            
            return result;
        } catch (error) {
            console.error('Create listing failed:', error);
            this.showNotification('Failed to create listing', 'error');
        }
    }

    async handleSubmitBid(listingId, bidAmount) {
        try {
            // 1. Encrypt bid with Zama
            const encrypted = await this.realZamaEncrypt(bidAmount);
            
            // 2. Submit to chain
            const result = await this.realSubmitBid(listingId, encrypted.ciphertext);
            
            // 3. Update UI
            this.showNotification(`Bid submitted! TX: ${result.txHash}`, 'success');
            this.updateTxLink(result.txHash);
            
            return result;
        } catch (error) {
            console.error('Submit bid failed:', error);
            this.showNotification('Failed to submit bid', 'error');
        }
    }

    async handleSelectWinner(listingId) {
        try {
            // 1. Get all encrypted bids for this listing
            const bids = this.bids.get(listingId) || [];
            if (bids.length === 0) throw new Error('No bids');
            
            // 2. Compute max bid using Zama
            const computeResult = await this.realZamaComputeMax(bids);
            
            // 3. Get winner address
            const winnerBid = bids[computeResult.winnerIndex];
            
            // 4. Select winner on chain
            const result = await this.realSelectWinner(
                listingId, 
                winnerBid.bidder, 
                computeResult.encryptedMax
            );
            
            // 5. Update UI
            this.showNotification(`Winner selected! TX: ${result.txHash}`, 'success');
            this.updateWinnerUI(listingId, winnerBid.bidder, computeResult.encryptedMax);
            
            return result;
        } catch (error) {
            console.error('Select winner failed:', error);
            this.showNotification('Failed to select winner', 'error');
        }
    }

    async handleRevealWinner(listingId, decryptedAmount) {
        try {
            // 1. Reveal on chain
            const result = await this.realRevealWinner(listingId, decryptedAmount);
            
            // 2. Update UI
            this.showNotification(`Winner revealed! Amount: ${decryptedAmount}`, 'success');
            this.updateRevealedWinnerUI(listingId, null, decryptedAmount);
            
            return result;
        } catch (error) {
            console.error('Reveal winner failed:', error);
            this.showNotification('Failed to reveal winner', 'error');
        }
    }

    // ✅ UI UPDATE FUNCTIONS
    updateListingsUI(listings) {
        const container = document.getElementById('listings-container');
        if (!container) return;
        
        container.innerHTML = listings.map(listing => `
            <div class="listing-card" data-id="${listing.id}">
                <div class="listing-header">
                    <span>Listing #${listing.id}</span>
                    <span class="seller">${listing.seller.substring(0, 8)}...</span>
                </div>
                <div class="encrypted-price">
                    <i class="fas fa-lock"></i>
                    ${listing.encryptedPrice.substring(0, 20)}...
                </div>
                <button onclick="app.viewListing(${listing.id})">View Bids</button>
            </div>
        `).join('');
    }

    updateBidsUI(listingId, bids) {
        const container = document.getElementById(`bids-${listingId}`);
        if (!container) return;
        
        container.innerHTML = bids.map(bid => `
            <div class="bid-item">
                <div class="bidder">${bid.bidder.substring(0, 8)}...</div>
                <div class="bid-encrypted">
                    <i class="fas fa-shield-alt"></i>
                    ${bid.encryptedBid.substring(0, 20)}...
                </div>
            </div>
        `).join('');
    }

    updateWinnerUI(listingId, winner, encryptedAmount) {
        const container = document.getElementById(`winner-${listingId}`);
        if (!container) return;
        
        container.innerHTML = `
            <div class="winner-card">
                <h4><i class="fas fa-crown"></i> Winner Selected</h4>
                <div class="winner-address">${winner.substring(0, 12)}...</div>
                <div class="encrypted-amount">
                    <i class="fas fa-lock"></i>
                    ${encryptedAmount.substring(0, 20)}...
                </div>
                <button onclick="app.revealWinnerPrompt(${listingId})">
                    Reveal Amount
                </button>
            </div>
        `;
    }

    updateRevealedWinnerUI(listingId, winner, amount) {
        const container = document.getElementById(`winner-${listingId}`);
        if (!container) return;
        
        container.innerHTML = `
            <div class="winner-card revealed">
                <h4><i class="fas fa-trophy"></i> Winner Revealed</h4>
                <div class="amount">${amount} ETH</div>
                <div class="winner-address">${winner ? winner.substring(0, 12) + '...' : 'Unknown'}</div>
            </div>
        `;
    }

    // ✅ HELPER FUNCTIONS
    async connectWallet() {
        if (!window.ethereum) return;
        
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            
            this.walletAddress = accounts[0];
            this.signer = await this.provider.getSigner();
            this.connected = true;
            
            // Setup contract with signer
            this.contract = this.contract.connect(this.signer);
            
            // Load initial data
            await this.fetchRealListings();
            
            this.showNotification('Wallet connected!', 'success');
        } catch (error) {
            console.error('Wallet connection failed:', error);
            this.showNotification('Connection failed', 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Your notification implementation
        console.log(`${type}: ${message}`);
    }

    updateTxLink(txHash) {
        const link = `https://sepolia.etherscan.io/tx/${txHash}`;
        console.log('View transaction:', link);
    }

    // Public methods for HTML buttons
    viewListing(listingId) {
        this.fetchRealBids(listingId);
    }

    revealWinnerPrompt(listingId) {
        const amount = prompt('Enter decrypted winning amount:');
        if (amount) {
            this.handleRevealWinner(listingId, amount);
        }
    }
}

// Initialize app
window.app = new DarkMarketApp();
